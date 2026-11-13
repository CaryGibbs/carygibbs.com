// ============================================================
// LOBE LIMPET: AI proxy (Cloudflare Worker)
// The trust boundary between the app and the Anthropic API.
//
// Every request must come from a signed-in Lobe Limpet user:
//   Authorization: Bearer <Firebase ID token>
// The token is checked here (signature, project, expiry), so nobody can
// use this Worker, and the API key behind it, from outside the app.
//
// What each person may do is decided here, not in the browser:
//   task 'generation'  writing questions, key points, links   Plus or admin only,
//                      plus a one-off free try for parents and teachers
//                      (aiTrial/{uid}, settings/aiLimits.trial tokens)
//   task 'learning'    learning notes, cheat sheets, cards    any signed-in user
//   task 'marking'     marking written quiz answers           any signed-in user
//   (generation may include page pictures, to read scanned PDFs and diagrams)
//   action 'checkLinks'  checking resource links load        any signed-in user
//   action 'readPage'    the words of up to 3 web pages, for  parents, teachers, admins
//                        Create with AI (one page a link, as  and Plus; 40 pages a day;
//                        a person would open it; robots.txt  nothing is stored here)
//                        respected)
//   action 'deleteAccount'  delete a user's account and data  yourself, a student's
//                       only parent (the one who made the account), or an admin (only the owner can delete admins)
//   action 'logSignedOut'   log a failed sign-in or password reset  anyone (no sign-in),
//                       at most 30 a day from one internet address
//   action 'storageSweep'   delete pictures nothing uses any more    admins only
//                       (also runs on a schedule if a Cron Trigger is set)
// AI use is counted per person per day (aiUsage/{uid}_{day}) and per month
// (aiUsageMonth/{uid}_{YYYY-MM}), capped by the daily and monthly token
// allowances in settings/aiLimits (free, plus, freeMonth, plusMonth; personal
// users.aiLimit / users.aiLimitMonth; admins unlimited).
// Only the models below can be used, and each task has a size limit.
//
// Settings (Cloudflare → Workers → this Worker → Settings → Variables):
//   ANTHROPIC_API_KEY   secret: the Anthropic API key
//   FIREBASE_SERVICE_ACCOUNT  secret: the whole JSON file from Firebase console →
//                       Project settings → Service accounts → Generate new private
//                       key. Used for deleting accounts, AI usage limits, sign-in
//                       logs and picture clean-up.
// Optional Cron Trigger (Settings → Triggers), e.g. "0 3 * * 0" (Sundays 3am):
//   runs the picture clean-up automatically.
//   ALLOW_ANON          "true" only while switching over from the old Worker,
//                       so pages that haven't updated yet keep working
//                       (unsigned requests then work as they did before).
//                       Delete it, or set "false", once the new app is live.
// ============================================================

const PROJECT_ID = 'clasp-revision';
const OWNER_UID = '0hFoAiW9YFhqk2BovndPnoT1Ul22';
const ALLOWED_ORIGINS = ['https://carygibbs.com', 'https://www.carygibbs.com'];

const MODELS = ['claude-opus-5-5', 'claude-sonnet-5-5', 'claude-haiku-5-5', 'claude-sonnet-4-5'];
const TASKS = {
  generation: { maxTokens: 16000, maxPrompt: 120000, needsPlus: true },
  learning:   { maxTokens: 4000,  maxPrompt: 40000,  needsPlus: false },
  marking:    { maxTokens: 1000,  maxPrompt: 20000,  needsPlus: false },
};
const MAX_LINKS = 20;
// Page pictures (reading scanned PDFs and diagrams): generation only, so Plus only
const MAX_IMAGES = 8;                    // per request
const MAX_IMAGE_B64 = 5 * 1024 * 1024;   // per picture (base64 characters)
const IMAGE_TYPES = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'];
const BUCKET = 'clasp-revision.firebasestorage.app';
// Daily AI allowance in tokens (prompt + reply), unless settings/aiLimits says otherwise
const LIMIT_DEFAULTS = { free: 50000, plus: 200000, freeMonth: 150000, plusMonth: 400000 };
// Free try of AI building for parents and teachers without Plus: tokens, once
// per account (about two worksheets turned into notes and questions)
const TRIAL_DEFAULT = 60000;
const TRIAL_USED_UP = "You've used your free try of creating with AI. Lobe Limpet Plus lets you keep turning class notes into revision.";
const londonMonth = (d = new Date()) => londonDay(d).slice(0, 7);
// "1 December": when this month's allowance starts again
const nextMonthText = (d = new Date()) => {
  const [y, m] = londonMonth(d).split('-').map(Number);
  return new Date(Date.UTC(m === 12 ? y + 1 : y, m % 12, 1)).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', timeZone: 'UTC' });
};
const SIGNED_OUT_ACTIONS = ['account.signin_fail', 'account.reset'];
const SIGNED_OUT_PER_DAY = 30;
const londonDay = (d = new Date()) => new Intl.DateTimeFormat('en-CA', { timeZone: 'Europe/London', year: 'numeric', month: '2-digit', day: '2-digit' }).format(d);

export default {
  // Weekly picture clean-up, if a Cron Trigger is set on the Worker
  async scheduled(event, env, ctx) {
    ctx.waitUntil(storageSweep(env, false).catch(e => console.warn('Sweep failed', e.message)));
  },

  async fetch(request, env, ctx) {
    const origin = request.headers.get('Origin') || '';
    const cors = {
      'Access-Control-Allow-Origin': ALLOWED_ORIGINS.includes(origin) ? origin : ALLOWED_ORIGINS[0],
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization, X-Task',
      'Access-Control-Max-Age': '86400',
      'Vary': 'Origin',
    };
    const reply = (status, body) => new Response(JSON.stringify(body), { status, headers: { ...cors, 'Content-Type': 'application/json' } });
    const fail = (status, message) => reply(status, { error: { message } });

    if (request.method === 'OPTIONS') return new Response(null, { status: 204, headers: cors });
    if (request.method !== 'POST') return fail(405, 'Use POST');
    if (origin && !ALLOWED_ORIGINS.includes(origin)) return fail(403, 'Not allowed from this site');

    let body;
    try { body = await request.json(); } catch (e) { return fail(400, 'Bad request'); }

    // ── Signed out: a failed sign-in or a password reset, for the activity log ──
    if (body.action === 'logSignedOut') {
      try { return reply(200, await logSignedOut(env, request, body)); }
      catch (e) { return reply(200, { ok: false }); }
    }

    // ── Who is asking? ──
    const token = (request.headers.get('Authorization') || '').replace(/^Bearer\s+/i, '');
    let user = null;
    if (token) {
      try { user = await verifyFirebaseToken(token); }
      catch (e) { return fail(401, 'Please sign in again (' + e.message + ')'); }
    } else if (String(env.ALLOW_ANON) !== 'true') {
      return fail(401, 'Please sign in to use this');
    }

    // ── Deleting an account ──
    if (body.action === 'deleteAccount') {
      if (!user) return fail(401, 'Please sign in to use this');
      try { return reply(200, await deleteAccount(env, user, String(body.uid || ''), !!body.check)); }
      catch (e) { return fail(e.status || 500, e.message || 'Could not delete the account'); }
    }

    // ── Picture clean-up (admins) ──
    if (body.action === 'storageSweep') {
      if (!user) return fail(401, 'Please sign in to use this');
      try {
        const tok = await serviceToken(env);
        const me = await fsGet(tok, `users/${user.uid}`);
        if (!(user.uid === OWNER_UID || rolesOf(me).has('admin'))) return fail(403, 'Admins only');
        return reply(200, await storageSweep(env, !!body.dryRun));
      } catch (e) { return fail(e.status || 500, e.message || 'Clean-up failed'); }
    }

    // ── Link checking ──
    if (body.action === 'checkLinks') {
      const urls = (Array.isArray(body.urls) ? body.urls : []).slice(0, MAX_LINKS);
      const results = {};
      await Promise.all(urls.map(async u => { results[u] = await checkLink(u); }));
      return reply(200, { results });
    }

    // ── Reading a web page for Create with AI (parents, teachers, admins, Plus) ──
    if (body.action === 'readPage') {
      if (!user) return fail(401, 'Please sign in to use this');
      try { return reply(200, await readPages(env, user, body.urls)); }
      catch (e) { return fail(e.status || 500, e.message || 'Could not read that page'); }
    }

    // ── AI request ──
    // Unsigned (only while ALLOW_ANON is on): behave as the old Worker did
    const taskName = String(request.headers.get('X-Task') || body.task || (user ? '' : 'generation'));
    const task = TASKS[taskName];
    if (!task) return fail(400, 'Unknown task');
    // Who they are (plan, roles) and what they've used today
    let who = null, used = null, usedMonth = null, limits = null, svc = null;
    const day = londonDay(), month = londonMonth();
    if (user && env.FIREBASE_SERVICE_ACCOUNT) {
      try {
        svc = await serviceToken(env);
        [who, used, usedMonth, limits] = await Promise.all([
          fsGet(svc, `users/${user.uid}`), fsGet(svc, `aiUsage/${user.uid}_${day}`),
          fsGet(svc, `aiUsageMonth/${user.uid}_${month}`), fsGet(svc, 'settings/aiLimits'),
        ]);
      } catch (e) { console.warn('Usage check skipped:', e.message); svc = null; }
    }
    const isAdmin = !!user && (user.uid === OWNER_UID || rolesOf(who).has('admin'));
    // A student is covered by a parent's Plus: plusFrom names that parent
    // (it must be one of their parents, and that parent must have Plus)
    let familyPlus = false;
    if (who && svc && !(who.tier === 'plus' || who.plan === 'plus') && familyOf(who)) {
      familyPlus = await fsGet(svc, `users/${who.plusFrom}`).then(isPlusRecord).catch(() => false);
    }
    if (who) who._familyPlus = familyPlus;   // (shown in usage as "plus (family)")
    const isPlus = isAdmin || who?.tier === 'plus' || who?.plan === 'plus' || familyPlus;
    let onTrial = false;
    if (task.needsPlus && user) {
      const allowed = who ? isPlus : await hasPlus(user, token);
      if (!allowed) {
        // Parents and teachers get a one-off free try (counted here, not in the browser)
        const r = rolesOf(who);
        if (!(svc && who && (r.has('parent') || r.has('teacher')))) return fail(403, 'AI generation is part of Lobe Limpet Plus');
        const trial = await fsGet(svc, `aiTrial/${user.uid}`).catch(() => null);
        const cap = Number(limits?.trial ?? TRIAL_DEFAULT);
        if (!(cap > 0) || (trial?.tokens || 0) >= cap) return fail(403, TRIAL_USED_UP);
        onTrial = true;
      }
    }
    if (user && who && !isAdmin) {
      const lim = { ...LIMIT_DEFAULTS, ...(limits || {}) };
      const cap = Number(who.aiLimit) > 0 ? Number(who.aiLimit) : Number(isPlus ? lim.plus : lim.free);
      if (cap > 0 && (used?.tokens || 0) >= cap) {
        return fail(429, "You've used today's AI allowance. It resets at midnight. If you need more, ask Lobe Limpet to raise your limit.");
      }
      const capMonth = Number(who.aiLimitMonth) > 0 ? Number(who.aiLimitMonth) : Number(isPlus ? lim.plusMonth : lim.freeMonth);
      if (capMonth > 0 && (usedMonth?.tokens || 0) >= capMonth) {
        return fail(429, `You've used this month's AI allowance. It starts again on ${nextMonthText()}. If you need more, ask Lobe Limpet to raise your limit.`);
      }
    }
    const model = MODELS.includes(body.model) ? body.model : 'claude-sonnet-4-5';
    const messages = Array.isArray(body.messages) ? body.messages : [];
    if (!messages.length) return fail(400, 'Nothing to send');
    // Pictures are checked separately and don't count towards the text limit
    let images = 0, bad = false;
    const textOnly = messages.map(m => {
      if (!Array.isArray(m.content)) return m;
      return { ...m, content: m.content.map(c => {
        if (c?.type !== 'image') return c;
        images++;
        const src = c.source || {};
        if (src.type !== 'base64' || !IMAGE_TYPES.includes(src.media_type) || typeof src.data !== 'string' || src.data.length > MAX_IMAGE_B64) bad = true;
        return { type: 'text', text: '' };
      }) };
    });
    if (images && taskName !== 'generation') return fail(403, 'Reading pictures is part of Lobe Limpet Plus');
    if (bad) return fail(413, 'A page picture was too big or not a picture');
    if (images > MAX_IMAGES) return fail(413, `Send at most ${MAX_IMAGES} pages at a time`);
    const size = JSON.stringify(textOnly).length;
    if (size > task.maxPrompt) return fail(413, 'That is too much text in one go. Try a smaller piece.');
    const maxTokens = Math.max(1, Math.min(Number(body.max_tokens) || 1000, task.maxTokens));

    // Only these fields are passed on, whatever else the browser sent
    const upstream = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
        'x-api-key': env.ANTHROPIC_API_KEY,
        'anthropic-version': '2023-06-01',
      },
      body: JSON.stringify({ model, max_tokens: maxTokens, messages }),
    });
    const text = await upstream.text();
    // Count what was used (after replying, so it doesn't slow anything down)
    if (svc && upstream.ok) {
      try {
        const u = JSON.parse(text).usage || {};
        const input = (u.input_tokens || 0) + (u.cache_creation_input_tokens || 0) + (u.cache_read_input_tokens || 0);
        const output = u.output_tokens || 0;
        ctx.waitUntil(recordUsage(svc, user, who, day, taskName, model, input, output).catch(e => console.warn('Usage not saved:', e.message)));
        if (onTrial) ctx.waitUntil(recordTrial(svc, user, who, input + output).catch(e => console.warn('Trial not saved:', e.message)));
      } catch (e) { /* reply wasn't JSON: nothing to count */ }
    }
    return new Response(text, { status: upstream.status, headers: { ...cors, 'Content-Type': 'application/json' } });
  },
};

/* ── Firebase ID token check (RS256, Google's published keys) ── */
let jwksCache = { keys: null, until: 0 };
async function googleKeys() {
  if (jwksCache.keys && Date.now() < jwksCache.until) return jwksCache.keys;
  const r = await fetch('https://www.googleapis.com/service_accounts/v1/jwk/securetoken@system.gserviceaccount.com');
  if (!r.ok) throw new Error('could not fetch signing keys');
  const { keys } = await r.json();
  const maxAge = Number((r.headers.get('cache-control') || '').match(/max-age=(\d+)/)?.[1] || 3600);
  jwksCache = { keys, until: Date.now() + maxAge * 1000 };
  return keys;
}
const b64urlBytes = s => Uint8Array.from(atob(s.replace(/-/g, '+').replace(/_/g, '/') + '==='.slice((s.length + 3) % 4)), c => c.charCodeAt(0));
const b64urlJson = s => JSON.parse(new TextDecoder().decode(b64urlBytes(s)));

async function verifyFirebaseToken(token) {
  const parts = token.split('.');
  if (parts.length !== 3) throw new Error('bad token');
  const header = b64urlJson(parts[0]), claims = b64urlJson(parts[1]);
  if (header.alg !== 'RS256') throw new Error('bad token');
  const now = Math.floor(Date.now() / 1000);
  if (claims.aud !== PROJECT_ID || claims.iss !== `https://securetoken.google.com/${PROJECT_ID}`) throw new Error('wrong project');
  if (!claims.sub || claims.exp < now || claims.iat > now + 300) throw new Error('token expired');
  const jwk = (await googleKeys()).find(k => k.kid === header.kid);
  if (!jwk) throw new Error('unknown key');
  const key = await crypto.subtle.importKey('jwk', jwk, { name: 'RSASSA-PKCS1-v1_5', hash: 'SHA-256' }, false, ['verify']);
  const ok = await crypto.subtle.verify('RSASSA-PKCS1-v1_5', key, b64urlBytes(parts[2]), new TextEncoder().encode(parts[0] + '.' + parts[1]));
  if (!ok) throw new Error('bad signature');
  return { uid: claims.sub, email: claims.email || '' };
}

/* ── Plus through a parent: plusFrom must be one of the student's parents ── */
function familyOf(who) {
  const from = who?.plusFrom;
  return !!from && typeof from === 'string' && (who.parentUid === from || (who.guardianIds || []).includes(from));
}
// (an admin's children are covered too)
const isPlusRecord = d => !!d && (d.tier === 'plus' || d.plan === 'plus' || rolesOf(d).has('admin'));

/* ── Plus or admin? Read the user's own record (their token lets them) ── */
async function hasPlus(user, token) {
  if (user.uid === OWNER_UID) return true;
  const read = async uid => {
    const r = await fetch(`https://firestore.googleapis.com/v1/projects/${PROJECT_ID}/databases/(default)/documents/users/${uid}`,
      { headers: { Authorization: `Bearer ${token}` } });
    return r.ok ? ((await r.json()).fields || {}) : null;
  };
  const f = await read(user.uid);
  if (!f) return false;
  const roles = (f.roles?.arrayValue?.values || []).map(v => v.stringValue);
  if (f.role?.stringValue) roles.push(f.role.stringValue);
  if (f.tier?.stringValue === 'plus' || f.plan?.stringValue === 'plus' || roles.includes('admin')) return true;
  // Covered by a parent's Plus (students can read their parents' records)
  const from = f.plusFrom?.stringValue;
  const guardians = (f.guardianIds?.arrayValue?.values || []).map(v => v.stringValue);
  if (!from || !(f.parentUid?.stringValue === from || guardians.includes(from))) return false;
  const p = await read(from).catch(() => null);
  const pRoles = (p?.roles?.arrayValue?.values || []).map(v => v.stringValue).concat(p?.role?.stringValue || []);
  return !!p && (p.tier?.stringValue === 'plus' || p.plan?.stringValue === 'plus' || pRoles.includes('admin'));
}

/* ── Does a link load? ── */
async function checkLink(url) {
  let u;
  try { u = new URL(url); } catch (e) { return { ok: false, status: 0 }; }
  if (!['http:', 'https:'].includes(u.protocol)) return { ok: false, status: 0 };
  if (/^(localhost|127\.|10\.|192\.168\.|169\.254\.|0\.)/.test(u.hostname)) return { ok: false, status: 0 };
  const opts = { redirect: 'follow', headers: { 'User-Agent': 'Mozilla/5.0 (compatible; LobeLimpetLinkCheck/1.0)' } };
  try {
    let r = await fetch(u.toString(), { ...opts, method: 'HEAD' });
    if (r.status === 405 || r.status === 403) r = await fetch(u.toString(), { ...opts, method: 'GET' });
    return { ok: r.ok, status: r.status, finalUrl: r.url };
  } catch (e) {
    return { ok: false, status: 0 };
  }
}

/* ============================================================
   Reading a web page (Create with AI → "A web page")
   A person pastes a link (e.g. a BBC Bitesize page); we fetch that one
   page, as their browser would, and hand back its main words so AI can
   write notes and questions IN ITS OWN WORDS. The words aren't stored
   anywhere; the app keeps only the link, shown to students as "Read first".
   Sites that ask robots not to read a page (robots.txt) are respected:
   the person is told to copy and paste the text instead.
   ============================================================ */
const READ_MAX_URLS = 3;
const READ_PER_DAY = 40;
const READ_MAX_BYTES = 3 * 1024 * 1024;
const READ_MAX_CHARS = 30000;            // per page, after tidying
const READ_UA = 'Mozilla/5.0 (compatible; LobeLimpet/1.0; +https://carygibbs.com/hub/help.html)';
const READ_UA_TOKEN = 'lobelimpet';
const PASTE_INSTEAD = 'Copy the words from the page and paste them in instead.';
const NO_APPS = "That site doesn't let apps read its pages.";

async function readPages(env, user, urls) {
  const list = [...new Set((Array.isArray(urls) ? urls : []).map(u => String(u || '').trim()).filter(Boolean))];
  if (!list.length) throw oops(400, 'Paste a link to a web page first');
  if (list.length > READ_MAX_URLS) throw oops(400, `Up to ${READ_MAX_URLS} pages at a time`);
  // Who may, and how many today (so the Worker can't be used as a general fetcher)
  if (env.FIREBASE_SERVICE_ACCOUNT) {
    const tok = await serviceToken(env);
    const who = await fsGet(tok, `users/${user.uid}`);
    const r = rolesOf(who);
    const ok = user.uid === OWNER_UID || r.has('admin') || r.has('parent') || r.has('teacher') || who?.tier === 'plus';
    if (!ok) throw oops(403, 'Making revision from a web page is for parents and teachers');
    const rl = `rateLimits/readpage_${user.uid}_${londonDay()}`;
    const seen = await fsGet(tok, rl);
    if ((seen?.count || 0) + list.length > READ_PER_DAY && !(user.uid === OWNER_UID || r.has('admin'))) {
      throw oops(429, `That's the most web pages for today (${READ_PER_DAY}). ${PASTE_INSTEAD}`);
    }
    await fsCommit(tok, [{ update: { name: `${DOCS}/${rl}`, fields: { expireAt: tsv(new Date(Date.now() + 2 * 86400000)) } },
      updateMask: { fieldPaths: ['expireAt'] }, updateTransforms: [{ fieldPath: 'count', increment: { integerValue: String(list.length) } }] }]);
  }
  const pages = await Promise.all(list.map(u => readPage(u).catch(e => ({ url: u, error: e.message || 'Could not read that page' }))));
  return { pages };
}

function safeUrl(raw) {
  let u;
  try { u = new URL(raw); } catch (e) { throw new Error("That isn't a web address"); }
  if (!['http:', 'https:'].includes(u.protocol)) throw new Error('Only web pages (http or https) can be read');
  const h = u.hostname.toLowerCase();
  if (h === 'localhost' || h.endsWith('.local') || h.endsWith('.internal') || /^\[|^(127\.|10\.|192\.168\.|169\.254\.|0\.|172\.(1[6-9]|2\d|3[01])\.)/.test(h) || !h.includes('.')) {
    throw new Error("That address can't be read");
  }
  u.hash = '';
  return u;
}

async function readPage(raw) {
  const u = safeUrl(raw);
  if (!(await robotsAllow(u))) throw new Error(`That site asks not to be read automatically. ${PASTE_INSTEAD}`);
  let r;
  try {
    r = await fetch(u.toString(), { redirect: 'follow', signal: AbortSignal.timeout(12000),
      headers: { 'User-Agent': READ_UA, 'Accept': 'text/html,application/xhtml+xml,text/plain;q=0.8', 'Accept-Language': 'en-GB,en;q=0.8' } });
  } catch (e) { throw new Error(`The page didn't answer. ${PASTE_INSTEAD}`); }
  // A redirect to somewhere private, or to a page robots.txt rules out
  if (r.url && r.url !== u.toString()) {
    const f = safeUrl(r.url);
    if (f.origin !== u.origin && !(await robotsAllow(f))) throw new Error(`That site asks not to be read automatically. ${PASTE_INSTEAD}`);
  }
  if (r.status === 401 || r.status === 403 || r.status === 429) throw new Error(`${NO_APPS} ${PASTE_INSTEAD}`);
  if (r.status === 404) throw new Error('That page wasn\'t found. Check the link.');
  if (!r.ok) throw new Error(`The page couldn't be read (${r.status}). ${PASTE_INSTEAD}`);
  const type = (r.headers.get('content-type') || '').toLowerCase();
  if (/pdf/.test(type)) throw new Error('That link is a PDF: download it and choose "A photo or file" instead.');
  if (type && !/html|text\/plain|xml/.test(type)) throw new Error(`That link isn't a web page. ${PASTE_INSTEAD}`);
  const html = await readCapped(r, READ_MAX_BYTES);
  const page = /text\/plain/.test(type) ? { title: '', site: '', text: tidyText(html) } : pageText(html);
  const text = page.text.slice(0, READ_MAX_CHARS);
  if (text.replace(/\s+/g, ' ').length < 200) throw new Error(`There wasn't enough readable text on that page. ${PASTE_INSTEAD}`);
  const host = new URL(r.url || u.toString()).hostname.replace(/^www\./, '');
  return {
    url: u.toString(), finalUrl: r.url || u.toString(),
    title: page.title.slice(0, 140) || host, site: page.site.slice(0, 60) || siteName(host),
    text, words: text.split(/\s+/).filter(Boolean).length, cut: page.text.length > READ_MAX_CHARS,
  };
}

async function readCapped(r, max) {
  const reader = r.body?.getReader();
  if (!reader) return (await r.text()).slice(0, max);
  const chunks = []; let n = 0;
  while (n < max) {
    const { done, value } = await reader.read();
    if (done) break;
    chunks.push(value); n += value.length;
  }
  try { reader.cancel(); } catch (e) { /* already finished */ }
  const all = new Uint8Array(Math.min(n, max)); let at = 0;
  for (const c of chunks) { const part = c.subarray(0, all.length - at); all.set(part, at); at += part.length; if (at >= all.length) break; }
  return new TextDecoder('utf-8').decode(all);
}

const SITE_NAMES = { 'bbc.co.uk': 'BBC Bitesize', 'thenational.academy': 'Oak National Academy', 'savemyexams.com': 'Save My Exams',
  'senecalearning.com': 'Seneca', 'physicsandmathstutor.com': 'Physics & Maths Tutor', 'docbrown.info': "Doc Brown's", 'en.wikipedia.org': 'Wikipedia' };
function siteName(host) {
  if (/^bbc\.(co\.uk|com)$/.test(host)) return 'BBC';
  return SITE_NAMES[host] || host;
}

// robots.txt: the group for our name if there is one, otherwise "*".
// Longest matching rule wins; Allow wins a tie. No robots.txt = allowed.
const robotsCache = new Map();
async function robotsAllow(u) {
  let rules = robotsCache.get(u.origin);
  if (!rules) {
    let txt = '', status = 0;
    try {
      const r = await fetch(`${u.origin}/robots.txt`, { redirect: 'follow', signal: AbortSignal.timeout(5000), headers: { 'User-Agent': READ_UA } });
      status = r.status;
      if (r.ok) txt = (await r.text()).slice(0, 500000);
    } catch (e) { txt = ''; }
    // The site turns apps away altogether (bot protection): say so plainly
    if (status === 401 || status === 403) throw new Error(`${NO_APPS} ${PASTE_INSTEAD}`);
    rules = parseRobots(txt);
    robotsCache.set(u.origin, rules);
  }
  return robotsAllows(rules, u.pathname + u.search);
}
function parseRobots(txt) {
  const groups = []; let cur = null, lastWasAgent = false;
  String(txt || '').split(/\r?\n/).forEach(line => {
    const m = line.replace(/#.*$/, '').trim().match(/^([A-Za-z-]+)\s*:\s*(.*)$/);
    if (!m) return;
    const key = m[1].toLowerCase(), val = m[2].trim();
    if (key === 'user-agent') {
      if (!lastWasAgent || !cur) { cur = { agents: [], rules: [] }; groups.push(cur); }
      cur.agents.push(val.toLowerCase()); lastWasAgent = true;
    } else {
      lastWasAgent = false;
      if (cur && (key === 'allow' || key === 'disallow')) cur.rules.push({ allow: key === 'allow', path: val });
    }
  });
  const mine = groups.filter(g => g.agents.some(a => a !== '*' && READ_UA_TOKEN.includes(a.replace(/\/.*$/, ''))));
  const pick = mine.length ? mine : groups.filter(g => g.agents.includes('*'));
  return pick.flatMap(g => g.rules).filter(r => r.path || !r.allow);
}
function robotsAllows(rules, path) {
  let best = null;
  for (const r of rules) {
    if (!r.path) continue;   // "Disallow:" (empty) allows everything
    const re = new RegExp('^' + r.path.replace(/[.+?^${}()|[\]\\]/g, '\\$&').replace(/\*/g, '.*').replace(/\\\$$/, '$'));
    if (!re.test(path)) continue;
    const len = r.path.length;
    if (!best || len > best.len || (len === best.len && r.allow)) best = { len, allow: r.allow };
  }
  return !best || best.allow;
}

// The main words of a page: the article (or <main>), without menus,
// cookie banners, scripts, forms or footers. Headings and list items
// stay on their own lines so the notes follow the page's sections.
const ENTITIES = { amp: '&', lt: '<', gt: '>', quot: '"', apos: "'", nbsp: ' ', ndash: '–', mdash: '—', hellip: '…', lsquo: '‘', rsquo: '’', ldquo: '“', rdquo: '”', pound: '£', euro: '€', deg: '°', times: '×', divide: '÷', minus: '−', plusmn: '±', le: '≤', ge: '≥', ne: '≠', frac12: '½', frac14: '¼', frac34: '¾', sup2: '²', sup3: '³', micro: 'µ', middot: '·', bull: '•', copy: '©', reg: '®', eacute: 'é', egrave: 'è', aacute: 'á', uuml: 'ü', ouml: 'ö', auml: 'ä', ccedil: 'ç', rarr: '→', larr: '←', harr: '↔', rlarr: '⇌', alpha: 'α', beta: 'β', gamma: 'γ', delta: 'δ', Delta: 'Δ', pi: 'π', theta: 'θ', lambda: 'λ', mu: 'μ', sigma: 'σ', Omega: 'Ω' };
const decode = s => s.replace(/&(#x[0-9a-f]+|#\d+|[a-z][a-z0-9]*);/gi, (m, e) => {
  if (e[0] === '#') { const n = e[1].toLowerCase() === 'x' ? parseInt(e.slice(2), 16) : parseInt(e.slice(1), 10); try { return String.fromCodePoint(n); } catch (x) { return ''; } }
  return ENTITIES[e] ?? ENTITIES[e.toLowerCase()] ?? m;
});
const metaOf = (html, prop) => {
  const re = new RegExp(`<meta[^>]+(?:property|name)=["']${prop}["'][^>]*>`, 'i');
  const tag = html.match(re)?.[0] || '';
  return decode(tag.match(/content=["']([^"']*)["']/i)?.[1] || '').trim();
};
const JUNK_LINE = /^(back to top|skip to .{0,40}|share this (page|article)|print this page|click to play.{0,60}|play the full .{0,80}|advertisement|cookie settings|accept( all)? cookies|count|\d+ of \d+|\(picture: click to play.*\))$/i;
function tidyText(s) {
  const out = [];
  String(s).split('\n').map(l => l.replace(/[ \t ]+/g, ' ').trim()).forEach(l => {
    if (!l || /^[-#]\s*$/.test(l) || l === out[out.length - 1] || JUNK_LINE.test(l)) return;
    out.push(l);
  });
  return out.join('\n').replace(/\n(#{2,3} )/g, '\n\n$1').trim();
}
function pageText(html) {
  html = String(html || '');
  const site = metaOf(html, 'og:site_name');
  const reSite = site ? site.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') : 'BBC Bitesize|BBC';
  const title = (metaOf(html, 'og:title') || decode((html.match(/<title[^>]*>([\s\S]*?)<\/title>/i)?.[1] || '').replace(/\s+/g, ' ')).trim())
    .replace(new RegExp(`\\s+[-|–:]\\s+(${reSite})$`, 'i'), '');
  let h = html
    .replace(/<!--[\s\S]*?-->/g, ' ')
    .replace(/<(script|style|noscript|svg|template|iframe|object|canvas|form|button|select|textarea|nav|header|footer|aside|figure|dialog)\b[\s\S]*?<\/\1\s*>/gi, ' ')
    .replace(/<(div|section|p|ul|li)\b[^>]*(?:class|id|aria-label|role)=["'][^"']*(?:cookie|consent|advert|newsletter|breadcrumb|skip-?link)[^"']*["'][^>]*>[\s\S]*?<\/\1>/gi, ' ');
  // The article if there is one (the biggest), else <main>, else the body
  const pickBiggest = tag => (h.match(new RegExp(`<${tag}\\b[^>]*>[\\s\\S]*?<\\/${tag}>`, 'gi')) || []).sort((a, b) => b.length - a.length)[0];
  const area = pickBiggest('article') || pickBiggest('main') || h.match(/<body\b[^>]*>([\s\S]*)<\/body>/i)?.[1] || h;
  const text = decode(area
    .replace(/<\/(span|a|strong|b|em|i|dfn|abbr)>\s*<(span|a|strong|b|em|i|dfn|abbr)\b/gi, '</$1> <$2')
    .replace(/<h([1-6])\b[^>]*>/gi, (m, n) => `\n${n <= 2 ? '## ' : '### '}`)
    .replace(/<\/h[1-6]>/gi, '\n')
    .replace(/<li\b[^>]*>/gi, '\n- ')
    .replace(/<(td|th)\b[^>]*>/gi, ' | ')
    .replace(/<(br|hr)\b[^>]*>/gi, '\n')
    .replace(/<\/?(p|div|section|ul|ol|tr|table|blockquote|dl|dt|dd|figcaption|caption|pre)\b[^>]*>/gi, '\n')
    .replace(/<img\b[^>]*alt=["']([^"']{4,})["'][^>]*>/gi, '\n(Picture: $1)\n')
    .replace(/<[^>]+>/g, ''));
  return { title, site, text: tidyText(text) };
}

/* ============================================================
   Deleting an account (needs FIREBASE_SERVICE_ACCOUNT)
   ============================================================ */
const FS = `https://firestore.googleapis.com/v1/projects/${PROJECT_ID}/databases/(default)/documents`;
const DOCS = `projects/${PROJECT_ID}/databases/(default)/documents`;
const oops = (status, message) => Object.assign(new Error(message), { status });

// Google access token for the service account (cached until near expiry)
let saToken = { token: null, until: 0 };
async function serviceToken(env) {
  if (saToken.token && Date.now() < saToken.until) return saToken.token;
  if (!env.FIREBASE_SERVICE_ACCOUNT) throw oops(500, 'Account deletion is not set up yet (missing service account)');
  const sa = JSON.parse(env.FIREBASE_SERVICE_ACCOUNT);
  const now = Math.floor(Date.now() / 1000);
  const enc = o => btoa(JSON.stringify(o)).replace(/=+$/, '').replace(/\+/g, '-').replace(/\//g, '_');
  const unsigned = `${enc({ alg: 'RS256', typ: 'JWT' })}.${enc({
    iss: sa.client_email, scope: 'https://www.googleapis.com/auth/cloud-platform',
    aud: 'https://oauth2.googleapis.com/token', iat: now, exp: now + 3600,
  })}`;
  const pem = sa.private_key.replace(/-----[^-]+-----/g, '').replace(/\s+/g, '');
  const key = await crypto.subtle.importKey('pkcs8', Uint8Array.from(atob(pem), c => c.charCodeAt(0)),
    { name: 'RSASSA-PKCS1-v1_5', hash: 'SHA-256' }, false, ['sign']);
  const sig = new Uint8Array(await crypto.subtle.sign('RSASSA-PKCS1-v1_5', key, new TextEncoder().encode(unsigned)));
  const jwt = `${unsigned}.${btoa(String.fromCharCode(...sig)).replace(/=+$/, '').replace(/\+/g, '-').replace(/\//g, '_')}`;
  const r = await fetch('https://oauth2.googleapis.com/token', {
    method: 'POST', headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: `grant_type=${encodeURIComponent('urn:ietf:params:oauth:grant-type:jwt-bearer')}&assertion=${jwt}`,
  });
  const data = await r.json();
  if (!data.access_token) throw oops(500, 'Could not sign in to Firebase as the service account');
  saToken = { token: data.access_token, until: Date.now() + (data.expires_in - 120) * 1000 };
  return saToken.token;
}

// Firestore REST values ↔ plain values
function plain(v) {
  if (!v) return null;
  if ('stringValue' in v) return v.stringValue;
  if ('booleanValue' in v) return v.booleanValue;
  if ('integerValue' in v) return Number(v.integerValue);
  if ('doubleValue' in v) return v.doubleValue;
  if ('arrayValue' in v) return (v.arrayValue.values || []).map(plain);
  if ('mapValue' in v) return fields(v.mapValue.fields || {});
  return null;
}
function fields(f = {}) { const o = {}; Object.entries(f).forEach(([k, v]) => { o[k] = plain(v); }); return o; }

async function fsGet(tok, path) {
  const r = await fetch(`${FS}/${path}`, { headers: { Authorization: `Bearer ${tok}` } });
  if (r.status === 404) return null;
  if (!r.ok) throw oops(500, `Firestore read failed (${r.status})`);
  return fields((await r.json()).fields);
}
async function fsList(tok, path) {
  const ids = []; let page = '';
  do {
    const r = await fetch(`${FS}/${path}?pageSize=300&mask.fieldPaths=__name__${page ? `&pageToken=${page}` : ''}`, { headers: { Authorization: `Bearer ${tok}` } });
    if (!r.ok) break;
    const d = await r.json();
    (d.documents || []).forEach(x => ids.push(x.name.split('/').pop()));
    page = d.nextPageToken || '';
  } while (page);
  return ids;
}
async function fsQuery(tok, collectionId, field, op, value) {
  const r = await fetch(`${FS}:runQuery`, {
    method: 'POST', headers: { Authorization: `Bearer ${tok}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({ structuredQuery: { from: [{ collectionId }], where: { fieldFilter: { field: { fieldPath: field }, op, value: { stringValue: value } } }, limit: 1000 } }),
  });
  if (!r.ok) return [];
  return (await r.json()).filter(x => x.document).map(x => ({ id: x.document.name.split('/').pop(), ...fields(x.document.fields) }));
}
// Which of these documents exist? (one request for up to 300)
async function fsExisting(tok, paths) {
  const found = new Set();
  for (let i = 0; i < paths.length; i += 300) {
    const r = await fetch(`${FS}:batchGet`, {
      method: 'POST', headers: { Authorization: `Bearer ${tok}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({ documents: paths.slice(i, i + 300).map(p => `${DOCS}/${p}`), mask: { fieldPaths: ['__name__'] } }),
    });
    if (!r.ok) continue;
    (await r.json()).forEach(x => { if (x.found) found.add(x.found.name.slice(DOCS.length + 1)); });
  }
  return found;
}
async function fsCommit(tok, writes) {
  for (let i = 0; i < writes.length; i += 450) {
    const r = await fetch(`${FS}:commit`, {
      method: 'POST', headers: { Authorization: `Bearer ${tok}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({ writes: writes.slice(i, i + 450) }),
    });
    if (!r.ok) throw oops(500, `Firestore write failed (${r.status}): ${(await r.text()).slice(0, 200)}`);
  }
}
const del = path => ({ delete: `${DOCS}/${path}` });
const bt = k => '`' + String(k).replace(/`/g, '\\`') + '`';

const rolesOf = d => { const r = new Set(Array.isArray(d?.roles) ? d.roles : []); if (d?.role) r.add(d.role); return r; };

async function deleteAccount(env, caller, uid, checkOnly) {
  if (!uid) throw oops(400, 'No account given');
  if (uid === OWNER_UID) throw oops(403, "The owner's account can't be deleted here");
  const tok = await serviceToken(env);
  const target = await fsGet(tok, `users/${uid}`);
  const callerDoc = caller.uid === uid ? target : await fsGet(tok, `users/${caller.uid}`);
  const callerAdmin = caller.uid === OWNER_UID || rolesOf(callerDoc).has('admin');
  const tRoles = rolesOf(target);

  // ── Who may do this? ──
  if (caller.uid !== uid) {
    const guardians = [target?.parentUid, ...(target?.guardianIds || [])].filter(Boolean);
    // Only the parent who made the account (parentUid), with no other parent
    // linked. A parent linked to a student's own account (guardianIds only)
    // can unlink but never delete it.
    const onlyParent = target?.parentUid === caller.uid && guardians.every(g => g === caller.uid);
    const isStudentOnly = tRoles.size === 1 && tRoles.has('student');
    if (callerAdmin) {
      if (tRoles.has('admin') && caller.uid !== OWNER_UID) throw oops(403, 'Only the owner can delete an admin');
    } else if (!(onlyParent && isStudentOnly)) {
      throw oops(403, "You can only delete your own account, or a student you're the only parent for");
    }
  }

  // Students this person looks after
  const [asParent, asGuardian] = await Promise.all([
    fsQuery(tok, 'users', 'parentUid', 'EQUAL', uid),
    fsQuery(tok, 'users', 'guardianIds', 'ARRAY_CONTAINS', uid),
  ]);
  const looked = new Map([...asParent, ...asGuardian].filter(s => s.id !== uid).map(s => [s.id, s]));
  const othersOf = s => [s.parentUid, ...(s.guardianIds || [])].filter(g => g && g !== uid);
  const onlyMine = [...looked.values()].filter(s => !othersOf(s).length);
  if (onlyMine.length) {
    throw oops(409, `First remove or delete the student${onlyMine.length > 1 ? 's' : ''} you look after on your own: ${onlyMine.map(s => s.name || s.email || 'a student').join(', ')}.`);
  }
  if (checkOnly) return { ok: true, check: true };

  const writes = [];
  // Their record, and the things only they had
  if (target) writes.push(del(`users/${uid}`));
  if (target?.email) writes.push(del(`emailIndex/${String(target.email).trim().toLowerCase()}`));
  for (const sid of await fsList(tok, `users/${uid}/children`)) writes.push(del(`users/${uid}/children/${sid}`));
  // As a teacher: their classes, join codes, and the class on each student
  for (const cid of await fsList(tok, `users/${uid}/classes`)) {
    const cls = await fsGet(tok, `users/${uid}/classes/${cid}`);
    const sids = await fsList(tok, `users/${uid}/classes/${cid}/students`);
    const live = await fsExisting(tok, sids.map(sid => `users/${sid}`));
    for (const sid of sids) {
      writes.push(del(`users/${uid}/classes/${cid}/students/${sid}`));
      if (sid !== uid && live.has(`users/${sid}`)) {
        writes.push({ update: { name: `${DOCS}/users/${sid}`, fields: {} },
          updateMask: { fieldPaths: [`classes.${bt(cid)}`, `classPacks.${bt(cid)}`] }, currentDocument: { exists: true } });
        writes.push({ transform: { document: `${DOCS}/users/${sid}`, fieldTransforms: [{ fieldPath: 'teacherIds', removeAllFromArray: { values: [{ stringValue: uid }] } }] } });
      }
    }
    if (cls?.joinCode) writes.push(del(`classCodes/${cls.joinCode}`));
    writes.push(del(`users/${uid}/classes/${cid}`));
  }
  // As a student: off their parents' lists and their teachers' classes
  if (target) {
    [target.parentUid, ...(target.guardianIds || [])].filter(Boolean).forEach(g => writes.push(del(`users/${g}/children/${uid}`)));
    const classIds = Object.keys(target.classes || {});
    (target.teacherIds || []).forEach(t => classIds.forEach(c => writes.push(del(`users/${t}/classes/${c}/students/${uid}`))));
  }
  // As a parent who shares students: stay with the other parent
  for (const s of looked.values()) {
    const others = othersOf(s);
    if (s.parentUid === uid) writes.push({ update: { name: `${DOCS}/users/${s.id}`, fields: { parentUid: { stringValue: others[0] } } }, updateMask: { fieldPaths: ['parentUid'] }, currentDocument: { exists: true } });
    writes.push({ transform: { document: `${DOCS}/users/${s.id}`, fieldTransforms: [{ fieldPath: 'guardianIds', removeAllFromArray: { values: [{ stringValue: uid }] } }] } });
  }
  // Anything left that they owned or wrote (pack contents were removed in the app first)
  const [packs, reports, logsBy, logsAbout, invites] = await Promise.all([
    fsQuery(tok, 'content', 'ownerUid', 'EQUAL', uid),
    fsQuery(tok, 'libraryReports', 'by', 'EQUAL', uid),
    fsQuery(tok, 'logs', 'uid', 'EQUAL', uid),
    fsQuery(tok, 'logs', 'targetId', 'EQUAL', uid),
    fsQuery(tok, 'invites', 'by', 'EQUAL', uid),
  ]);
  packs.forEach(p => writes.push(del(`content/${p.id}`)));
  reports.forEach(x => writes.push(del(`libraryReports/${x.id}`)));
  new Set([...logsBy, ...logsAbout].map(x => x.id)).forEach(id => writes.push(del(`logs/${id}`)));
  invites.forEach(x => writes.push(del(`invites/${x.id}`)));

  await fsCommit(tok, writes);

  // The sign-in itself
  const r = await fetch(`https://identitytoolkit.googleapis.com/v1/projects/${PROJECT_ID}/accounts:delete`, {
    method: 'POST', headers: { Authorization: `Bearer ${tok}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({ localId: uid }),
  });
  if (!r.ok && r.status !== 404) {
    const t = await r.text();
    if (!/USER_NOT_FOUND/.test(t)) throw oops(500, `Their data was deleted, but the sign-in couldn't be (${r.status}). Please try again.`);
  }
  return { ok: true, deleted: writes.length };
}

/* ============================================================
   AI usage per person per day: aiUsage/{uid}_{YYYY-MM-DD}
   { uid, day, name, email, plan, tokens, inputTokens, outputTokens,
     requests, tasks.{task}, models.{model}, lastAt, expireAt }
   ============================================================ */
const tsv = d => ({ timestampValue: d.toISOString() });
async function recordUsage(tok, user, who, day, task, model, input, output) {
  const path = `aiUsage/${user.uid}_${day}`;
  const name = `${DOCS}/${path}`;
  const inc = (fieldPath, n) => ({ fieldPath, increment: { integerValue: String(n) } });
  const month = day.slice(0, 7);
  // This month's running total (checked against the monthly allowance)
  const monthWrite = {
    update: { name: `${DOCS}/aiUsageMonth/${user.uid}_${month}`, fields: {
      uid: { stringValue: user.uid }, month: { stringValue: month },
      name: { stringValue: String(who?.name || '').slice(0, 80) },
      lastAt: tsv(new Date()), expireAt: tsv(new Date(Date.now() + 400 * 86400000)),
    } },
    updateMask: { fieldPaths: ['uid', 'month', 'name', 'lastAt', 'expireAt'] },
    updateTransforms: [inc('tokens', input + output), inc('inputTokens', input), inc('outputTokens', output), inc('requests', 1), inc(`models.${bt(model)}`, input + output)],
  };
  await fsCommit(tok, [monthWrite, {
    update: { name, fields: {
      uid: { stringValue: user.uid }, day: { stringValue: day },
      name: { stringValue: String(who?.name || '').slice(0, 80) }, email: { stringValue: String(who?.email || user.email || '').slice(0, 120) },
      plan: { stringValue: who?.tier === 'plus' || who?.plan === 'plus' ? 'plus' : who?._familyPlus ? 'plus (family)' : 'free' },
      lastAt: tsv(new Date()), expireAt: tsv(new Date(Date.now() + 90 * 86400000)),
    } },
    updateMask: { fieldPaths: ['uid', 'day', 'name', 'email', 'plan', 'lastAt', 'expireAt'] },
    updateTransforms: [
      inc('tokens', input + output), inc('inputTokens', input), inc('outputTokens', output), inc('requests', 1),
      inc(`tasks.${bt(task)}`, 1), inc(`models.${bt(model)}`, input + output),
    ],
  }]);
}

/* ── Free try: running total in aiTrial/{uid} (only this Worker can write it),
   copied to users/{uid}.aiTrialUsed so the app can show what's left ── */
async function recordTrial(tok, user, who, tokens) {
  const inc = (fieldPath, n) => ({ fieldPath, increment: { integerValue: String(n) } });
  await fsCommit(tok, [{
    update: { name: `${DOCS}/aiTrial/${user.uid}`, fields: {
      uid: { stringValue: user.uid }, name: { stringValue: String(who?.name || '').slice(0, 80) }, lastAt: tsv(new Date()),
    } },
    updateMask: { fieldPaths: ['uid', 'name', 'lastAt'] },
    updateTransforms: [inc('tokens', tokens), inc('requests', 1)],
  }, {
    transform: { document: `${DOCS}/users/${user.uid}`, fieldTransforms: [inc('aiTrialUsed', tokens)] },
  }]);
}

/* ============================================================
   Failed sign-ins and password resets: the person isn't signed in,
   so the browser can't write the log entry itself
   ============================================================ */
async function sha(s) {
  const h = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(s));
  return [...new Uint8Array(h)].slice(0, 12).map(b => b.toString(16).padStart(2, '0')).join('');
}
async function logSignedOut(env, request, body) {
  const action = String(body.logAction || '');
  if (!SIGNED_OUT_ACTIONS.includes(action)) return { ok: false };
  const tok = await serviceToken(env);
  const day = londonDay();
  const ip = request.headers.get('CF-Connecting-IP') || 'unknown';
  const rl = `rateLimits/signedout_${await sha(ip + PROJECT_ID)}_${day}`;
  const seen = await fsGet(tok, rl);
  if ((seen?.count || 0) >= SIGNED_OUT_PER_DAY) return { ok: false, limited: true };
  const clip = (v, n) => String(v ?? '').replace(/\s+/g, ' ').trim().slice(0, n);
  const now = new Date();
  const where = request.cf?.country ? ` (from ${request.cf.country})` : '';
  const id = crypto.randomUUID().replace(/-/g, '').slice(0, 20);
  await fsCommit(tok, [
    { update: { name: `${DOCS}/logs/${id}`, fields: {
      ts: { integerValue: String(now.getTime()) }, at: tsv(now),
      uid: { stringValue: 'signed-out' }, name: { stringValue: clip(body.name, 120) }, role: { stringValue: 'account' },
      action: { stringValue: action }, cat: { stringValue: 'account' },
      target: { stringValue: '' }, targetId: { stringValue: '' },
      detail: { stringValue: clip(body.detail, 160) + where },
      expireAt: tsv(new Date(now.getTime() + 365 * 86400000)),
    } }, currentDocument: { exists: false } },
    { update: { name: `${DOCS}/${rl}`, fields: { expireAt: tsv(new Date(now.getTime() + 2 * 86400000)) } },
      updateMask: { fieldPaths: ['expireAt'] },
      updateTransforms: [{ fieldPath: 'count', increment: { integerValue: '1' } }] },
  ]);
  return { ok: true };
}

/* ============================================================
   Picture clean-up: delete pictures under content/ that no question,
   flashcard or shared set points to any more (deleted cards, questions,
   packs and accounts, and uploads that were never saved). Pictures
   less than a day old are left alone, in case someone is still editing.
   ============================================================ */
const GCS = `https://storage.googleapis.com/storage/v1/b/${BUCKET}/o`;
function objectNameOf(url) {
  const m = String(url || '').match(/\/o\/([^?#]+)/);
  if (!m) return null;
  try { return decodeURIComponent(m[1]); } catch (e) { return null; }
}
async function collectionGroup(tok, collectionId, select, where) {
  const r = await fetch(`${FS}:runQuery`, {
    method: 'POST', headers: { Authorization: `Bearer ${tok}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({ structuredQuery: { from: [{ collectionId, allDescendants: true }], select: { fields: select.map(f => ({ fieldPath: f })) }, ...(where ? { where } : {}) } }),
  });
  if (!r.ok) throw oops(500, `Could not read ${collectionId} (${r.status}): ${(await r.text()).slice(0, 160)}`);
  return (await r.json()).filter(x => x.document).map(x => fields(x.document.fields));
}
async function storageSweep(env, dryRun) {
  const tok = await serviceToken(env);
  // Everything that points at a picture
  const used = new Set();
  const add = u => { const n = objectNameOf(u); if (n) used.add(n); };
  const [questions, topics, shared] = await Promise.all([
    collectionGroup(tok, 'questions', ['imageUrl']),
    collectionGroup(tok, 'topics', ['cards']),
    collectionGroup(tok, 'sharedSets', ['cards']),
  ]);
  questions.forEach(q => add(q.imageUrl));
  [...topics, ...shared].forEach(t => (Array.isArray(t.cards) ? t.cards : []).forEach(c => add(c?.imageUrl)));
  // Every picture stored
  const objects = []; let page = '';
  do {
    const r = await fetch(`${GCS}?prefix=content%2F&maxResults=1000&fields=items(name,size,timeCreated),nextPageToken${page ? `&pageToken=${encodeURIComponent(page)}` : ''}`, { headers: { Authorization: `Bearer ${tok}` } });
    if (!r.ok) throw oops(500, `Could not list pictures (${r.status}): ${(await r.text()).slice(0, 160)}`);
    const d = await r.json();
    (d.items || []).forEach(o => objects.push(o));
    page = d.nextPageToken || '';
  } while (page);
  const dayAgo = Date.now() - 86400000;
  const unused = objects.filter(o => !used.has(o.name) && Date.parse(o.timeCreated) < dayAgo);
  const bytes = unused.reduce((a, o) => a + Number(o.size || 0), 0);
  let deleted = 0;
  if (!dryRun) {
    for (const o of unused.slice(0, 500)) {
      const r = await fetch(`${GCS}/${encodeURIComponent(o.name)}`, { method: 'DELETE', headers: { Authorization: `Bearer ${tok}` } });
      if (r.ok || r.status === 404) deleted++;
    }
  }
  return { ok: true, dryRun, stored: objects.length, inUse: objects.length - unused.length, unused: unused.length, unusedBytes: bytes, deleted, more: unused.length > 500 };
}
