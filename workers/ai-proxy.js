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
//   task 'marking'     marking written quiz answers           any signed-in user;
//                      without Plus, a number of marks a week (aiMarks/{uid}_{monday},
//                      settings/aiLimits.freeMarksWeek, default 15, 0 = no limit)
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
//   action 'setPassword'  give someone a new password       admins (only the owner for
//                       other admins; never the owner's), or the parent or
//                       teacher who made a student's account
//   action 'billingCheckout'  a Stripe checkout link for Plus     parents, teachers, admins,
//                       when Admin → Settings → Payments allows it
//   action 'billingPortal'    Stripe's "Manage billing" page      anyone with a subscription
//   action 'billingPrice'     set the Plus price (makes a new      admins only
//                       Stripe price; settings/pricing)
//   POST /stripe/webhook (live) and /stripe/webhook/test: Stripe's
//                       payment events, checked by signature; switch Plus on/off
//   action 'sendEmail'    emails sent through Resend (see emails section)
//                       kind 'welcome': to yourself, once, just after sign-up
//                       kind 'studentSetup': "choose your password" to a new
//                       student, by the parent or teacher who made the account
//                       (or an admin); 30 a day per sender
//   action 'checkEmail'   parents, teachers, admins: does an account use this
//                       email? Answers only exists / student or adult / already
//                       yours (never names). 100 a day.
//   action 'requestLink'  parents: ask to link to a student by email. Accounts
//                       under a day old can't; the student's existing parents
//                       are emailed. 20 a day.
//   action 'shareStudent' a student's parent shares them with another parent
//                       account (by email)
//   action 'startPreview'   admins: both getting-started emails, sent to you now
//   action 'weeklyPreview'  admins: this week's parent summary for a parent
//                       (yourself by default), sent to your own email now
//   GET/POST /email/unsubscribe  turns off a parent's weekly summary
//                       (signed, so it can't be guessed). Used by mail apps'
//                       one-click unsubscribe and by lobelimpet.com/unsubscribe.html
//   action 'passwordEmail'  "Forgot your password?" (no sign-in): our own
//                       email with a link to set-password.html; 10 a day from
//                       one internet address, 3 a day per email address
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
// Cron Trigger "0 17,18 * * SUN" (exactly this): the weekly parent summary,
//   Sundays at 6pm UK time (17:00 UTC in summer, 18:00 UTC in winter).
// Cron Trigger "30 9 * * *": getting-started emails to parents with no
//   students yet (day 2 and day 7 after sign-up), every morning.
//   STRIPE_SECRET_KEY_TEST, STRIPE_WEBHOOK_SECRET_TEST, STRIPE_PRODUCT_ID_TEST
//                       secrets for Stripe's test mode (used from carygibbs.com, the dev site)
//   STRIPE_SECRET_KEY_LIVE, STRIPE_WEBHOOK_SECRET_LIVE, STRIPE_PRODUCT_ID_LIVE
//                       the same for live mode (lobelimpet.com). Restricted keys:
//                       write access to Checkout Sessions, Customers, Subscriptions,
//                       Customer portal, Prices and Products.
//   RESEND_API_KEY      secret: API key from resend.com (Sending access is enough).
//                       Without it, the app falls back to Firebase's own emails.
//   EMAIL_FROM          optional, e.g. "Lobe Limpet <hello@lobelimpet.com>" (the default)
//   ALLOW_ANON          "true" only while switching over from the old Worker,
//                       so pages that haven't updated yet keep working
//                       (unsigned requests then work as they did before).
//                       Delete it, or set "false", once the new app is live.
// ============================================================

const PROJECT_ID = 'clasp-revision';
const OWNER_UID = '0hFoAiW9YFhqk2BovndPnoT1Ul22';
const ALLOWED_ORIGINS = ['https://lobelimpet.com', 'https://www.lobelimpet.com', 'https://carygibbs.com', 'https://www.carygibbs.com'];

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
// Free AI marks of written answers a week (Monday to Sunday, UK time), without Plus
const FREE_MARKS_DEFAULT = 15;
// The Monday that starts this week, UK time: "2026-11-16"
const londonWeek = (d = new Date()) => {
  const [y, m, dd] = londonDay(d).split('-').map(Number);
  const t = new Date(Date.UTC(y, m - 1, dd));
  t.setUTCDate(t.getUTCDate() - ((t.getUTCDay() + 6) % 7));
  return t.toISOString().slice(0, 10);
};
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
    // Weekly parent summary: Cron Trigger "0 17,18 * * SUN" fires at 17:00 and
    // 18:00 UTC on Sundays; only the one that is 6pm in London sends
    // Getting-started emails: Cron Trigger "30 9 * * *" (every morning)
    if (String(event.cron || '').startsWith('30 9 ')) {
      ctx.waitUntil(startNudges(env).catch(e => console.warn('Getting-started emails failed', e.message)));
      return;
    }
    if (/17,18/.test(String(event.cron || ''))) {
      ctx.waitUntil(weeklySummaries(env).catch(e => console.warn('Weekly summary failed', e.message)));
      return;
    }
    ctx.waitUntil(storageSweep(env, false).catch(e => console.warn('Sweep failed', e.message)));
  },

  async fetch(request, env, ctx) {
    // ── Stripe telling us about a payment (no sign-in: checked by signature) ──
    const path = new URL(request.url).pathname.replace(/\/+$/, '');
    // Turning off the weekly email from its link (no sign-in: checked by a signed code)
    if (path === '/email/unsubscribe') return unsubscribePage(request, env);
    if (path === '/stripe/webhook' || path === '/stripe/webhook/test') {
      return stripeWebhook(request, env, path.endsWith('/test') ? 'test' : 'live');
    }

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

    // ── Signed out: "Forgot your password?" email (our own wording, via Resend) ──
    if (body.action === 'passwordEmail') {
      try { return reply(200, await passwordEmail(env, request, body, origin)); }
      catch (e) { return reply(200, { ok: false, error: e.message }); }
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

    // ── Setting someone's password ──
    if (body.action === 'setPassword') {
      if (!user) return fail(401, 'Please sign in to use this');
      try { return reply(200, await setPassword(env, user, String(body.uid || ''), String(body.password || ''))); }
      catch (e) { return fail(e.status || 500, e.message || "The password couldn't be changed"); }
    }

    // ── Emails: welcome after sign-up, choose-a-password for a new student ──
    if (body.action === 'sendEmail') {
      if (!user) return fail(401, 'Please sign in to use this');
      try { return reply(200, await sendEmailAction(env, user, body, origin)); }
      catch (e) { return fail(e.status || 500, e.message || "The email couldn't be sent"); }
    }

    // ── Accounts by email: checked here so nobody can look up names or roles ──
    if (['checkEmail', 'requestLink', 'shareStudent'].includes(body.action)) {
      if (!user) return fail(401, 'Please sign in to use this');
      try { return reply(200, await accountAction(env, user, body)); }
      catch (e) { return fail(e.status || 500, e.message || 'Something went wrong'); }
    }

    // ── Getting-started emails: send yourself both now (admins) ──
    if (body.action === 'startPreview') {
      if (!user) return fail(401, 'Please sign in to use this');
      try { return reply(200, await startPreview(env, user)); }
      catch (e) { return fail(e.status || 500, e.message || "The preview couldn't be sent"); }
    }

    // ── Weekly parent summary: send yourself a preview now (admins) ──
    if (body.action === 'weeklyPreview') {
      if (!user) return fail(401, 'Please sign in to use this');
      try { return reply(200, await weeklyPreview(env, user, body)); }
      catch (e) { return fail(e.status || 500, e.message || "The preview couldn't be sent"); }
    }

    // ── Paying for Plus (Stripe) ──
    if (['billingCheckout', 'billingPortal', 'billingPrice'].includes(body.action)) {
      if (!user) return fail(401, 'Please sign in to use this');
      try { return reply(200, await billingAction(env, user, body, origin)); }
      catch (e) { return fail(e.status || 500, e.message || 'Something went wrong with payments'); }
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
    if (who && svc && !ownPlus(who) && familyOf(who)) {
      familyPlus = await fsGet(svc, `users/${who.plusFrom}`).then(isPlusRecord).catch(() => false);
    } else if (who && svc && !ownPlus(who) && coParentOf(who, user.uid)) {
      // A co-parent: plusVia is a student whose parents include both of them
      familyPlus = await Promise.all([fsGet(svc, `users/${who.plusVia}`), fsGet(svc, `users/${who.plusFrom}`)])
        .then(([s, p]) => parentsOfRec(s).includes(user.uid) && parentsOfRec(s).includes(who.plusFrom) && isPlusRecord(p))
        .catch(() => false);
    }
    if (who) who._familyPlus = familyPlus;   // (shown in usage as "plus (family)")
    const isPlus = isAdmin || ownPlus(who) || familyPlus;
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
    // Free AI marks a week without Plus (counted here, not in the browser)
    let marksCap = 0, marksWeek = '';
    if (taskName === 'marking' && user && who && svc && !isPlus) {
      marksCap = Number(limits?.freeMarksWeek ?? FREE_MARKS_DEFAULT);
      if (marksCap > 0) {
        marksWeek = londonWeek();
        const marks = await fsGet(svc, `aiMarks/${user.uid}_${marksWeek}`).catch(() => null);
        if ((marks?.count || 0) >= marksCap) {
          return reply(402, { error: { code: 'marks_used_up', cap: marksCap,
            message: `You've used this week's ${marksCap} free AI marks. They start again on Monday. Lobe Limpet Plus gives unlimited marking.` } });
        }
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
        if (marksWeek) ctx.waitUntil(recordMark(svc, user, who, marksWeek, marksCap).catch(e => console.warn('Mark not counted:', e.message)));
        // Creating with AI on Plus: noted once a day, so a refund request can be checked
        else if (task.needsPlus && !isAdmin && isPlus) ctx.waitUntil(notePlusUse(svc, user, who, day).catch(() => {}));
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
// A co-parent (another parent of the same student): plusFrom and plusVia set
function coParentOf(who, uid) {
  return typeof who?.plusFrom === 'string' && !!who.plusFrom && who.plusFrom !== uid && typeof who.plusVia === 'string' && !!who.plusVia;
}
const parentsOfRec = d => [d?.parentUid, ...(d?.guardianIds || [])].filter(Boolean);
// (an admin's children are covered too)
// Plus of their own: tier 'plus' (until plusUntil, if an admin gave it for a set time)
const ownPlus = d => !!d && ((d.tier === 'plus' && !(Number(d.plusUntil) > 0 && Number(d.plusUntil) <= Date.now())) || d.plan === 'plus');
const isPlusRecord = d => !!d && (ownPlus(d) || rolesOf(d).has('admin'));

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
  const restPlus = x => (x?.tier?.stringValue === 'plus' && !(Number(x?.plusUntil?.integerValue ?? x?.plusUntil?.doubleValue) > 0
    && Number(x?.plusUntil?.integerValue ?? x?.plusUntil?.doubleValue) <= Date.now())) || x?.plan?.stringValue === 'plus';
  if (restPlus(f) || roles.includes('admin')) return true;
  // Covered by a parent's Plus (students can read their parents' records),
  // or as a co-parent through a student both parents look after
  const from = f.plusFrom?.stringValue;
  const guardians = (f.guardianIds?.arrayValue?.values || []).map(v => v.stringValue);
  const parentsOfF = x => [x?.parentUid?.stringValue, ...((x?.guardianIds?.arrayValue?.values || []).map(v => v.stringValue))].filter(Boolean);
  if (!from) return false;
  if (!(f.parentUid?.stringValue === from || guardians.includes(from))) {
    const via = f.plusVia?.stringValue;
    if (!via || from === user.uid) return false;
    const s = await read(via).catch(() => null);
    if (!s || !parentsOfF(s).includes(user.uid) || !parentsOfF(s).includes(from)) return false;
  }
  const p = await read(from).catch(() => null);
  const pRoles = (p?.roles?.arrayValue?.values || []).map(v => v.stringValue).concat(p?.role?.stringValue || []);
  return !!p && (restPlus(p) || pRoles.includes('admin'));
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
    const ok = user.uid === OWNER_UID || r.has('admin') || r.has('parent') || r.has('teacher') || ownPlus(who);
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

  // A paid Plus subscription is cancelled first (stops here if Stripe says no)
  const writes = await cancelBillingFor(env, tok, uid);
  // Their record, and the things only they had
  if (target) writes.push(del(`users/${uid}`));
  if (target?.email) writes.push(del(`emailIndex/${String(target.email).trim().toLowerCase()}`));
  if (target?.accountNo) writes.push(del(`accountNos/${target.accountNo}`));   // their account number, freed
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
  const [packs, reports, logsBy, logsAbout, invites, support] = await Promise.all([
    fsQuery(tok, 'content', 'ownerUid', 'EQUAL', uid),
    fsQuery(tok, 'libraryReports', 'by', 'EQUAL', uid),
    fsQuery(tok, 'logs', 'uid', 'EQUAL', uid),
    fsQuery(tok, 'logs', 'targetId', 'EQUAL', uid),
    fsQuery(tok, 'invites', 'by', 'EQUAL', uid),
    fsQuery(tok, 'supportRequests', 'uid', 'EQUAL', uid),
  ]);
  packs.forEach(p => writes.push(del(`content/${p.id}`)));
  reports.forEach(x => writes.push(del(`libraryReports/${x.id}`)));
  new Set([...logsBy, ...logsAbout].map(x => x.id)).forEach(id => writes.push(del(`logs/${id}`)));
  invites.forEach(x => writes.push(del(`invites/${x.id}`)));
  support.forEach(x => writes.push(del(`supportRequests/${x.id}`)));   // messages they sent us
  writes.push(del(`supportLimits/${uid}`));

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
      plan: { stringValue: ownPlus(who) ? 'plus' : who?._familyPlus ? 'plus (family)' : 'free' },
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
// One free AI mark used this week. When the last one goes, the student's
// record says so (aiMarksFull = the week), so their parent can see it.
async function recordMark(tok, user, who, week, cap) {
  const inc = (fieldPath, n) => ({ fieldPath, increment: { integerValue: String(n) } });
  await fsCommit(tok, [{
    update: { name: `${DOCS}/aiMarks/${user.uid}_${week}`, fields: {
      uid: { stringValue: user.uid }, week: { stringValue: week }, lastAt: tsv(new Date()),
      expireAt: tsv(new Date(Date.now() + 60 * 86400000)),
    } },
    updateMask: { fieldPaths: ['uid', 'week', 'lastAt', 'expireAt'] },
    updateTransforms: [inc('count', 1)],
  }]);
  const now = await fsGet(tok, `aiMarks/${user.uid}_${week}`).catch(() => null);
  if ((now?.count || 0) >= cap && who?.aiMarksFull !== week) {
    await fsCommit(tok, [{
      update: { name: `${DOCS}/users/${user.uid}`, fields: { aiMarksFull: { stringValue: week } } },
      updateMask: { fieldPaths: ['aiMarksFull'] },
    }]);
  }
}

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

/* ============================================================
   Paying for Plus (Stripe)
   The dev site (carygibbs.com) uses Stripe's test mode, the live site
   (lobelimpet.com) live mode; each has its own price, payments switch and
   billing records (billingTest / billing). Stripe tells us about payments
   through the webhook; we then read the subscription fresh from Stripe and
   copy where it stands, so repeated or out-of-order events do no harm.
   ============================================================ */
const STRIPE_API = 'https://api.stripe.com/v1';
const LIVE_ORIGINS = ['https://lobelimpet.com', 'https://www.lobelimpet.com'];
const PAID_STATES = ['active', 'cancelling', 'past_due'];
const stripeCfg = mode => mode === 'live'
  ? { key: 'STRIPE_SECRET_KEY_LIVE', whsec: 'STRIPE_WEBHOOK_SECRET_LIVE', product: 'STRIPE_PRODUCT_ID_LIVE', billing: 'billing', pricing: 'settings/pricing', payments: 'settings/payments' }
  : { key: 'STRIPE_SECRET_KEY_TEST', whsec: 'STRIPE_WEBHOOK_SECRET_TEST', product: 'STRIPE_PRODUCT_ID_TEST', billing: 'billingTest', pricing: 'settings/pricingDev', payments: 'settings/paymentsDev' };
const gbpText = p => '£' + (p % 100 ? (p / 100).toFixed(2) : String(p / 100));

// Stripe's API takes form fields: a[b][0][c]=x
function formEncode(obj, prefix = '', out = []) {
  for (const [k, v] of Object.entries(obj || {})) {
    if (v === undefined || v === null || v === '') continue;
    const key = prefix ? `${prefix}[${k}]` : k;
    if (typeof v === 'object') formEncode(v, key, out);
    else out.push(`${encodeURIComponent(key)}=${encodeURIComponent(String(v))}`);
  }
  return out.join('&');
}
async function stripeApi(env, mode, method, path, params) {
  const name = stripeCfg(mode).key;
  if (!env[name]) throw oops(503, `Payments aren't set up yet (${name} is missing on the Worker)`);
  const q = params ? formEncode(params) : '';
  const r = await fetch(`${STRIPE_API}/${path}${method === 'GET' && q ? '?' + q : ''}`, {
    method, headers: { Authorization: `Bearer ${env[name]}`, ...(method === 'GET' ? {} : { 'Content-Type': 'application/x-www-form-urlencoded' }) },
    body: method === 'GET' ? undefined : q,
  });
  const d = await r.json().catch(() => ({}));
  if (!r.ok) throw oops(r.status >= 500 ? 502 : 400, `Stripe: ${d.error?.message || `error ${r.status}`}`);
  return d;
}

// Plain values → Firestore REST values
function fsVal(v) {
  if (v === null || v === undefined) return { nullValue: null };
  if (typeof v === 'boolean') return { booleanValue: v };
  if (typeof v === 'number') return Number.isInteger(v) ? { integerValue: String(v) } : { doubleValue: v };
  if (Array.isArray(v)) return { arrayValue: { values: v.map(fsVal) } };
  if (typeof v === 'object') return { mapValue: { fields: Object.fromEntries(Object.entries(v).map(([k, x]) => [k, fsVal(x)])) } };
  return { stringValue: String(v) };
}
const fsSetDoc = (path, obj) => ({ update: { name: `${DOCS}/${path}`, fields: fsVal(obj).mapValue.fields } });

// An entry in the activity log, written here
async function workerLog(tok, uid, who, action, detail, about = null) {
  const now = new Date();
  const id = crypto.randomUUID().replace(/-/g, '').slice(0, 20);
  await fsCommit(tok, [{ update: { name: `${DOCS}/logs/${id}`, fields: {
    ts: { integerValue: String(now.getTime()) }, at: tsv(now),
    uid: { stringValue: uid }, name: { stringValue: String(who?.name || who?.email || '').slice(0, 120) },
    role: { stringValue: [...rolesOf(who)][0] || 'account' },
    action: { stringValue: action }, cat: { stringValue: action.split('.')[0] },
    target: { stringValue: String(about?.name || who?.name || who?.email || '').slice(0, 120) }, targetId: { stringValue: about?.id || uid },
    detail: { stringValue: String(detail || '').slice(0, 160) },
    expireAt: tsv(new Date(now.getTime() + 365 * 86400000)),
  } }, currentDocument: { exists: false } }]).catch(e => console.warn('Log not saved:', e.message));
}

// Where Stripe sends people back to: a page on one of our own sites
function safeReturn(raw, origin) {
  try {
    const u = new URL(String(raw || ''));
    if (ALLOWED_ORIGINS.includes(u.origin)) { u.search = ''; u.hash = ''; return u.toString(); }
  } catch (e) { /* not a web address */ }
  return (ALLOWED_ORIGINS.includes(origin) ? origin : 'https://lobelimpet.com') + '/';
}

async function billingAction(env, user, body, origin) {
  const mode = LIVE_ORIGINS.includes(origin) ? 'live' : 'test';
  const c = stripeCfg(mode);
  const tok = await serviceToken(env);
  const who = await fsGet(tok, `users/${user.uid}`);
  if (!who) throw oops(403, 'No account found');
  const roles = rolesOf(who);
  const isAdmin = user.uid === OWNER_UID || roles.has('admin');
  const back = safeReturn(body.returnTo, origin);

  // ── Setting the price (admins): a new Stripe price on the Plus product ──
  if (body.action === 'billingPrice') {
    if (!isAdmin) throw oops(403, 'Admins only');
    const pence = Math.round(Number(body.amountPence));
    if (!Number.isInteger(pence) || pence < 100 || pence > 50000) throw oops(400, 'Choose a price between £1 and £500');
    const planName = String(body.planName || '').replace(/\s+/g, ' ').trim().slice(0, 40) || 'Plus';
    const product = env[c.product];
    if (!product) throw oops(503, `Payments aren't set up yet (${c.product} is missing on the Worker)`);
    const cur = await fsGet(tok, c.pricing) || {};
    const productName = /lobe limpet/i.test(planName) ? planName : `Lobe Limpet ${planName}`;
    const now = Date.now();
    let priceId = cur.priceId || '';
    let history = Array.isArray(cur.history) ? cur.history : [];
    if (!priceId || Number(cur.amountPence) !== pence) {
      // Stripe prices can't be changed: make a new one. People already
      // subscribed stay on the price they signed up at.
      const price = await stripeApi(env, mode, 'POST', 'prices', {
        product, currency: 'gbp', unit_amount: pence, recurring: { interval: 'year' },
        nickname: `${planName} ${gbpText(pence)} a year`, metadata: { setBy: user.uid },
      });
      history = history.map(h => h.priceId === priceId && !h.to ? { ...h, to: now } : h);
      history.push({ priceId: price.id, amountPence: pence, planName, from: now, by: String(who.name || user.email || '').slice(0, 80) });
      priceId = price.id;
      await stripeApi(env, mode, 'POST', `products/${product}`, { name: productName, default_price: priceId });
    } else {
      await stripeApi(env, mode, 'POST', `products/${product}`, { name: productName });
    }
    await fsCommit(tok, [fsSetDoc(c.pricing, {
      planName, amountPence: pence, currency: 'gbp', interval: 'year', priceId, mode,
      updatedAt: now, updatedBy: String(who.name || user.email || '').slice(0, 80), history: history.slice(-50),
    })]);
    await workerLog(tok, user.uid, who, 'admin.settings', `Plus price: ${planName}, ${gbpText(pence)} a year${mode === 'test' ? ' (dev, test mode)' : ''}`);
    return { ok: true, priceId, amountPence: pence, planName };
  }

  // ── "Manage billing": Stripe's own page for their subscription ──
  if (body.action === 'billingPortal') {
    const b = await fsGet(tok, `${c.billing}/${user.uid}`);
    if (!b?.customerId) throw oops(404, "There's no billing account for you yet");
    const s = await stripeApi(env, mode, 'POST', 'billing_portal/sessions', { customer: b.customerId, return_url: back });
    return { url: s.url };
  }

  // ── Buying Plus: a Stripe checkout page ──
  const [payments, pricing, billing] = await Promise.all([
    fsGet(tok, c.payments), fsGet(tok, c.pricing), fsGet(tok, `${c.billing}/${user.uid}`),
  ]);
  const open = payments?.mode === 'on' || (payments?.mode === 'admins' && isAdmin);
  if (!open) throw oops(403, "Payments aren't open yet");
  if (!(roles.has('parent') || roles.has('teacher') || isAdmin)) throw oops(403, 'Ask a parent or guardian to get Plus. One Plus covers the whole family.');
  if (billing && PAID_STATES.includes(billing.state)) throw oops(409, 'You already have Plus. Use Manage billing to change it.');
  if (!pricing?.priceId) throw oops(503, "Plus can't be bought yet: no price has been set");
  const meta = { uid: user.uid, accountNo: who.accountNo || '' };
  const sub = { metadata: meta };
  // Free Plus from an admin still running: no charge until it ends
  // (Stripe needs that to be at least 2 days away)
  const until = Number(who.plusUntil) || 0;
  if (who.tier === 'plus' && who.tierSource !== 'stripe' && until > Date.now() + 49 * 3600000) sub.trial_end = Math.floor(until / 1000);
  const site = back.replace(/[^/]*$/, '');
  const plan = pricing.planName || 'Plus';
  const params = {
    mode: 'subscription',
    line_items: [{ price: pricing.priceId, quantity: 1 }],
    client_reference_id: user.uid, metadata: meta, subscription_data: sub,
    billing_address_collection: 'required', allow_promotion_codes: 'true',
    consent_collection: { terms_of_service: 'required' },
    custom_text: { terms_of_service_acceptance: { message: `I agree to the [Terms of use](${site}terms.html#plus-terms). I want ${plan} to start straight away and understand that once I've used it I lose my right to cancel and get a refund. It renews each year until I cancel.` } },
    success_url: back + '?paid=1', cancel_url: back + '?paid=0',
  };
  if (billing?.customerId) params.customer = billing.customerId;
  else params.customer_email = who.email || user.email || undefined;
  const s = await stripeApi(env, mode, 'POST', 'checkout/sessions', params);
  return { url: s.url };
}

// Stripe-Signature: t=timestamp,v1=hex HMAC-SHA256 of "t.body" (within 5 minutes)
async function stripeSigOK(raw, header, secret) {
  let t = '', sigs = [];
  header.split(',').forEach(p => { const [k, v] = p.split('='); if (k === 't') t = v; if (k === 'v1' && v) sigs.push(v); });
  if (!t || !sigs.length || Math.abs(Date.now() / 1000 - Number(t)) > 300) return false;
  const enc = new TextEncoder();
  const key = await crypto.subtle.importKey('raw', enc.encode(secret), { name: 'HMAC', hash: 'SHA-256' }, false, ['sign']);
  const mac = [...new Uint8Array(await crypto.subtle.sign('HMAC', key, enc.encode(`${t}.${raw}`)))].map(b => b.toString(16).padStart(2, '0')).join('');
  return sigs.some(s => s.length === mac.length && [...s].reduce((d, ch, i) => d | (ch.charCodeAt(0) ^ mac.charCodeAt(i)), 0) === 0);
}

async function stripeWebhook(request, env, mode) {
  const text = (status, msg) => new Response(msg, { status, headers: { 'Content-Type': 'text/plain' } });
  if (request.method !== 'POST') return text(405, 'Use POST');
  const secret = env[stripeCfg(mode).whsec];
  if (!secret) return text(500, `${stripeCfg(mode).whsec} is missing on the Worker`);
  const raw = await request.text();
  if (!(await stripeSigOK(raw, request.headers.get('Stripe-Signature') || '', secret))) return text(400, 'Bad signature');
  let ev;
  try { ev = JSON.parse(raw); } catch (e) { return text(400, 'Bad JSON'); }
  const o = ev.data?.object || {};
  let subId = null, uidHint = null;
  if (o.object === 'subscription') subId = o.id;
  else if (o.object === 'checkout.session') { subId = o.subscription; uidHint = o.client_reference_id || o.metadata?.uid || null; }
  else if (o.object === 'invoice') subId = o.subscription || o.parent?.subscription_details?.subscription || o.lines?.data?.[0]?.subscription || null;
  if (subId && typeof subId === 'object') subId = subId.id;
  if (!subId) return text(200, `Nothing to do for ${ev.type}`);
  try { await syncSubscription(env, mode, subId, uidHint); }
  catch (e) { console.warn('Stripe sync failed:', e.message); return text(500, 'Sync failed: ' + e.message); }   // Stripe will try again
  return text(200, 'ok');
}

// Copy where a subscription stands to billing(Test)/{uid}, and switch Plus on or off
async function syncSubscription(env, mode, subId, uidHint) {
  const c = stripeCfg(mode);
  const sub = await stripeApi(env, mode, 'GET', `subscriptions/${subId}`);
  const tok = await serviceToken(env);
  const customerId = typeof sub.customer === 'string' ? sub.customer : sub.customer?.id || '';
  let uid = sub.metadata?.uid || uidHint;
  if (!uid && customerId) uid = (await fsQuery(tok, c.billing, 'customerId', 'EQUAL', customerId))[0]?.id;
  if (!uid) throw oops(400, `No account for subscription ${subId}`);
  const [who, cur] = await Promise.all([fsGet(tok, `users/${uid}`), fsGet(tok, `${c.billing}/${uid}`)]);
  if (!who) return;   // the account has been deleted
  // An older subscription ending doesn't touch a newer one that's running
  if (cur?.subscriptionId && cur.subscriptionId !== sub.id && PAID_STATES.includes(cur.state) && !['active', 'trialing', 'past_due'].includes(sub.status)) return;
  const item = sub.items?.data?.[0] || {};
  const base = { active: 'active', trialing: 'active', past_due: 'past_due', canceled: 'ended', unpaid: 'ended', incomplete_expired: 'ended', paused: 'ended' }[sub.status] || 'pending';
  const state = base === 'active' && (sub.cancel_at_period_end || sub.cancel_at) ? 'cancelling' : base;
  const rec = {
    uid, mode, customerId, subscriptionId: sub.id, status: sub.status, state,
    currentPeriodEnd: (Number(sub.current_period_end || item.current_period_end) || 0) * 1000,
    cancelAt: (Number(sub.cancel_at) || 0) * 1000, cancelAtPeriodEnd: !!sub.cancel_at_period_end,
    trialEnd: (Number(sub.trial_end) || 0) * 1000,
    priceId: item.price?.id || '', amountPence: Number(item.price?.unit_amount) || 0,
    accountNo: who.accountNo || sub.metadata?.accountNo || '',
    name: String(who.name || '').slice(0, 80), email: String(who.email || '').slice(0, 120),
    startedAt: cur?.subscriptionId === sub.id && cur.startedAt ? cur.startedAt : (Number(sub.start_date) || 0) * 1000,
    updatedAt: Date.now(),
  };
  const writes = [fsSetDoc(`${c.billing}/${uid}`, rec)];
  const userDoc = `${DOCS}/users/${uid}`;
  if (PAID_STATES.includes(state)) {
    // Paid Plus: replaces any free Plus an admin gave (and its end date)
    writes.push({ update: { name: userDoc, fields: { tier: { stringValue: 'plus' }, tierSource: { stringValue: 'stripe' } } },
      updateMask: { fieldPaths: ['tier', 'tierSource', 'plusUntil', 'plusNote'] }, currentDocument: { exists: true } });
  } else if (state === 'ended' && who.tierSource === 'stripe') {
    // Only Plus that was paid for is taken away; Plus an admin gave stays
    writes.push({ update: { name: userDoc, fields: { tier: { stringValue: 'free' } } },
      updateMask: { fieldPaths: ['tier', 'tierSource'] }, currentDocument: { exists: true } });
  }
  await fsCommit(tok, writes);
  if (!cur || cur.state !== state || cur.subscriptionId !== sub.id) {
    const words = { active: 'Paid Plus is on', cancelling: 'Cancelled: Plus continues to the end of the paid year', past_due: "Payment didn't go through: Plus continues while Stripe retries", ended: 'Paid Plus ended', pending: 'Payment started' }[state];
    await workerLog(tok, uid, who, 'account.billing', `${words} (${gbpText(rec.amountPence)} a year${mode === 'test' ? ', test mode' : ''})`);
  }
}

// Deleting an account: stop its subscriptions so nobody is charged for an account that's gone
async function cancelBillingFor(env, tok, uid) {
  const writes = [];
  for (const mode of ['test', 'live']) {
    const c = stripeCfg(mode);
    const b = await fsGet(tok, `${c.billing}/${uid}`);
    if (!b) continue;
    if (b.subscriptionId && b.state !== 'ended') {
      try { await stripeApi(env, mode, 'DELETE', `subscriptions/${b.subscriptionId}`); }
      catch (e) { if (!/No such subscription|canceled/i.test(e.message)) throw oops(502, `Their Plus subscription couldn't be cancelled, so nothing was deleted. ${e.message}`); }
    }
    writes.push(del(`${c.billing}/${uid}`));
  }
  return writes;
}

/* ============================================================
   Setting someone's password (Admin → Users, Manage student, class list).
   Admins: anyone but the owner (other admins only by the owner).
   Parents and teachers: only a student account they made themselves
   (parentUid / teacherUid), and only if it's a student account and nothing else.
   ============================================================ */
async function setPassword(env, caller, uid, password) {
  if (!uid) throw oops(400, 'No account given');
  if (password.length < 8 || password.length > 128) throw oops(400, 'Use a password of at least 8 characters');
  if (uid === caller.uid) throw oops(400, 'To change your own password, use Account settings → Email me a reset link');
  if (uid === OWNER_UID) throw oops(403, "The owner's password can't be changed here");
  const tok = await serviceToken(env);
  const [target, me] = await Promise.all([fsGet(tok, `users/${uid}`), fsGet(tok, `users/${caller.uid}`)]);
  if (!target) throw oops(404, 'No account found');
  const isAdmin = caller.uid === OWNER_UID || rolesOf(me).has('admin');
  const tRoles = rolesOf(target);
  const studentOnly = tRoles.size === 1 && tRoles.has('student');
  if (isAdmin) {
    if (tRoles.has('admin') && caller.uid !== OWNER_UID) throw oops(403, "Only the owner can change another admin's password");
  } else if (!(studentOnly && (target.parentUid === caller.uid || target.teacherUid === caller.uid))) {
    throw oops(403, 'Only the person who made this account (or an admin) can set its password. Send a reset link instead.');
  }
  const r = await fetch(`https://identitytoolkit.googleapis.com/v1/projects/${PROJECT_ID}/accounts:update`, {
    method: 'POST', headers: { Authorization: `Bearer ${tok}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({ localId: uid, password }),
  });
  if (!r.ok) {
    const t = await r.text();
    if (/WEAK_PASSWORD/.test(t)) throw oops(400, 'That password is too weak. Try a longer one.');
    if (/USER_NOT_FOUND/.test(t)) throw oops(404, "That account doesn't have a sign-in");
    throw oops(500, `The password couldn't be changed (${r.status})`);
  }
  await workerLog(tok, caller.uid, me, 'account.password', `Set a new password for ${String(target.name || target.email || 'an account').slice(0, 80)}`,
    { name: target.name || target.email || '', id: uid });
  return { ok: true };
}

/* ── "Used Plus": one activity log entry per person per day (fixed id, so
   repeats are ignored). Terms: refunds only if Plus hasn't been used. ── */
async function notePlusUse(tok, user, who, day) {
  const now = new Date();
  await fsCommit(tok, [{ update: { name: `${DOCS}/logs/plusused_${user.uid}_${day}`, fields: {
    ts: { integerValue: String(now.getTime()) }, at: tsv(now),
    uid: { stringValue: user.uid }, name: { stringValue: String(who?.name || who?.email || '').slice(0, 120) },
    role: { stringValue: [...rolesOf(who)][0] || 'account' },
    action: { stringValue: 'plus.used' }, cat: { stringValue: 'account' },
    target: { stringValue: '' }, targetId: { stringValue: '' },
    detail: { stringValue: 'Created with AI' },
    expireAt: tsv(new Date(now.getTime() + 365 * 86400000)),
  } }, currentDocument: { exists: false } }]);
}

/* ============================================================
   Emails (sent through Resend, from lobelimpet.com)
   Account emails only: welcome, choose-your-password, forgot password.
   No news or marketing here: those need the person's consent and an
   unsubscribe link, so they'll go out separately.
   ============================================================ */
const EMAIL_FROM_DEFAULT = 'Lobe Limpet <hello@lobelimpet.com>';
const EMAIL_REPLY_TO = 'support@lobelimpet.com';
const SETUP_EMAILS_PER_DAY = 30;      // choose-your-password emails, per sender
const RESET_PER_IP_DAY = 10;          // forgot-password emails from one internet address
const RESET_PER_EMAIL_DAY = 3;        // and to one email address
const LOGO_URL = 'https://lobelimpet.com/assets/images/brand/email-logo.png';   // transparent Lobey (no tile)

// The app's address for links in emails: the live site, or the dev copy
function siteFor(origin) {
  if (LIVE_ORIGINS.includes(origin)) return 'https://lobelimpet.com';
  if (ALLOWED_ORIGINS.includes(origin)) return `${origin}/hub`;
  return 'https://lobelimpet.com';
}
const escH = s => String(s ?? '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
const firstName = n => String(n || '').trim().split(/\s+/)[0] || '';

async function resendSend(env, { to, subject, html, text, kind }) {
  if (!env.RESEND_API_KEY) throw oops(503, 'Email is not set up yet');
  const r = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: { Authorization: `Bearer ${env.RESEND_API_KEY}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({ from: env.EMAIL_FROM || EMAIL_FROM_DEFAULT, to: [to], reply_to: EMAIL_REPLY_TO,
      subject, html, text, tags: [{ name: 'kind', value: kind }] }),
  });
  if (!r.ok) {
    console.warn('Resend failed', r.status, (await r.text()).slice(0, 300));
    throw oops(502, `The email couldn't be sent (${r.status})`);
  }
  return (await r.json()).id || '';
}

// One look for every email: logo, words, a button, a small footer
function emailHtml({ heading, paras, button, after = [], footer }) {
  const p = t => `<p style="margin:0 0 16px;font-size:16px;line-height:1.55;color:#1f3440;">${t}</p>`;
  return `<!DOCTYPE html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>${escH(heading)}</title></head>
<body style="margin:0;padding:0;background:#eef5f6;">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#eef5f6;"><tr><td align="center" style="padding:28px 12px;">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:520px;background:#ffffff;border-radius:16px;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Arial,sans-serif;">
<tr><td style="padding:28px 28px 8px;">
  <table role="presentation" cellpadding="0" cellspacing="0"><tr>
    <td style="padding-right:10px;"><img src="${LOGO_URL}" width="40" height="40" alt="" style="display:block;"></td>
    <td style="font-size:22px;font-weight:800;color:#123a4a;letter-spacing:-0.01em;">lobe <span style="color:#e8603e;">limpet</span></td>
  </tr></table>
</td></tr>
<tr><td style="padding:12px 28px 8px;">
  <h1 style="margin:0 0 16px;font-size:22px;line-height:1.3;color:#123a4a;">${escH(heading)}</h1>
  ${paras.map(p).join('')}
  ${button ? `<table role="presentation" cellpadding="0" cellspacing="0" style="margin:8px 0 20px;"><tr><td style="background:#123a4a;border-radius:10px;">
    <a href="${escH(button.url)}" style="display:inline-block;padding:14px 26px;font-size:16px;font-weight:700;color:#ffffff;text-decoration:none;">${escH(button.label)}</a>
  </td></tr></table>` : ''}
  ${after.map(p).join('')}
</td></tr>
<tr><td style="padding:8px 28px 26px;border-top:1px solid #e3ecee;">
  <p style="margin:14px 0 0;font-size:13px;line-height:1.5;color:#5d7c89;">${footer}</p>
</td></tr>
</table>
<p style="margin:14px 0 0;font-size:12px;color:#7d97a1;font-family:Arial,sans-serif;">Lobe Limpet · Knowledge that sticks.</p>
</td></tr></table></body></html>`;
}
const stripTags = s => String(s).replace(/<br\s*\/?>/g, '\n').replace(/<[^>]+>/g, '').replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&quot;/g, '"');
function emailText({ heading, paras, button, after = [], footer }) {
  return [heading, '', ...paras.map(stripTags), ...(button ? [`${button.label}: ${button.url}`] : []), '', ...after.map(stripTags), '', stripTags(footer)].join('\n\n').replace(/\n{3,}/g, '\n\n');
}

// The words for each email
function welcomeEmail(role, name, site) {
  const hi = firstName(name) ? `Hi ${escH(firstName(name))},` : 'Hi,';
  const signIn = `${site}/login.html`;
  const help = `Any questions, just reply to this email or use Help in the app. We read every message.`;
  const footer = `You're getting this because you created a Lobe Limpet account with this email address. If that wasn't you, reply and let us know.`;
  const steps = {
    parent: [
      '<strong>Add your student.</strong> They get their own sign-in, and you see how they\'re getting on.',
      '<strong>Pick their revision packs,</strong> or turn class notes and worksheets into your own.',
      '<strong>Keep an eye on progress</strong> and set a simple weekly plan if it helps.',
    ],
    teacher: [
      '<strong>Make a class</strong> and share its join code with your students.',
      '<strong>Add revision packs to the class,</strong> or make your own from your notes.',
      '<strong>See who\'s revising</strong> and which topics need another look.',
    ],
    student: [
      '<strong>Choose a pack</strong> and try a 10-question quiz.',
      '<strong>Come back for your daily review.</strong> It brings questions back just before you\'d forget them.',
      '<strong>Use flashcards and the subject map</strong> to learn the bits that don\'t stick yet.',
    ],
  }[role] || [];
  const content = {
    heading: 'Welcome to Lobe Limpet',
    paras: [hi, 'Thanks for joining. Here\'s how to get going:', ...steps.map((t, i) => `${i + 1}. ${t}`)],
    button: { label: 'Open Lobe Limpet', url: signIn },
    after: [help, 'The Lobe Limpet team'],
    footer,
  };
  return { subject: 'Welcome to Lobe Limpet', html: emailHtml(content), text: emailText(content) };
}
function setupEmail(studentName, email, inviterName, byTeacher, link) {
  const who = inviterName ? escH(inviterName) : (byTeacher ? 'Your teacher' : 'Your parent or carer');
  const whoMid = inviterName ? escH(inviterName) : (byTeacher ? 'your teacher' : 'your parent or carer');
  const content = {
    heading: 'Choose your password',
    paras: [
      firstName(studentName) ? `Hi ${escH(firstName(studentName))},` : 'Hi,',
      `${who} has made you a Lobe Limpet account, for revising with quizzes, flashcards and a daily review.`,
      'Choose a password to get started:',
    ],
    button: { label: 'Choose my password', url: link },
    after: [
      `You'll sign in with this email address: <strong>${escH(email)}</strong>.`,
      'The button works for one hour. If it has run out, go to the sign-in page, tap "Forgot your password?" and we\'ll send a new one.',
      'The Lobe Limpet team',
    ],
    footer: `You're getting this because ${whoMid} added this email address to Lobe Limpet. Not expecting it? Reply and let us know.`,
  };
  return { subject: byTeacher ? 'Your Lobe Limpet account is ready' : `${inviterName ? firstName(inviterName) : 'Someone'} has set up Lobe Limpet for you`, html: emailHtml(content), text: emailText(content) };
}
function resetEmail(email, link) {
  const content = {
    heading: 'Choose a new password',
    paras: [`We had a request to change the password for <strong>${escH(email)}</strong>.`],
    button: { label: 'Choose a new password', url: link },
    after: ['The button works for one hour. If you didn\'t ask for this, you can ignore this email: your password stays the same.', 'The Lobe Limpet team'],
    footer: 'You\'re getting this because someone entered this email address on the Lobe Limpet sign-in page.',
  };
  return { subject: 'Choose a new Lobe Limpet password', html: emailHtml(content), text: emailText(content) };
}

// A password link for an account, pointing at our own page rather than Firebase's
async function passwordLink(tok, email, site) {
  const r = await fetch(`https://identitytoolkit.googleapis.com/v1/projects/${PROJECT_ID}/accounts:sendOobCode`, {
    method: 'POST', headers: { Authorization: `Bearer ${tok}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({ requestType: 'PASSWORD_RESET', email, returnOobLink: true }),
  });
  const d = await r.json().catch(() => ({}));
  if (!r.ok || !d.oobLink) {
    if (/EMAIL_NOT_FOUND|USER_NOT_FOUND/.test(JSON.stringify(d))) return null;
    throw oops(500, `Couldn't make a password link (${r.status})`);
  }
  const code = new URL(d.oobLink).searchParams.get('oobCode');
  if (!code) throw oops(500, "Couldn't make a password link");
  return `${site}/set-password.html?oobCode=${encodeURIComponent(code)}`;
}
async function authEmailOf(tok, uid) {
  const r = await fetch(`https://identitytoolkit.googleapis.com/v1/projects/${PROJECT_ID}/accounts:lookup`, {
    method: 'POST', headers: { Authorization: `Bearer ${tok}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({ localId: [uid] }),
  });
  const d = await r.json().catch(() => ({}));
  return d.users?.[0]?.email || '';
}
// Create a marker document only if it isn't there yet: true if we made it
async function claimOnce(tok, path, extra = {}) {
  const r = await fetch(`${FS}:commit`, {
    method: 'POST', headers: { Authorization: `Bearer ${tok}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({ writes: [{ update: { name: `${DOCS}/${path}`, fields: { at: tsv(new Date()), ...extra } }, currentDocument: { exists: false } }] }),
  });
  return r.ok;
}
// Add one to a daily counter (expires after two days); returns the count before
async function bumpCounter(tok, path) {
  const seen = await fsGet(tok, path);
  await fsCommit(tok, [{ update: { name: `${DOCS}/${path}`, fields: { expireAt: tsv(new Date(Date.now() + 2 * 86400000)) } },
    updateMask: { fieldPaths: ['expireAt'] }, updateTransforms: [{ fieldPath: 'count', increment: { integerValue: '1' } }] }]);
  return seen?.count || 0;
}

async function sendEmailAction(env, user, body, origin) {
  if (!env.RESEND_API_KEY) throw oops(503, 'Email is not set up yet');
  const tok = await serviceToken(env);
  const site = siteFor(origin);
  const kind = String(body.kind || '');

  if (kind === 'welcome') {
    const me = await fsGet(tok, `users/${user.uid}`);
    if (!me || !user.email) return { ok: false, skipped: 'no account' };
    if (!(Number(me.createdAt) > Date.now() - 86400000)) return { ok: false, skipped: 'not a new account' };
    if (!(await claimOnce(tok, `emailSent/welcome_${user.uid}`))) return { ok: true, already: true };
    const roles = rolesOf(me);
    const role = roles.has('teacher') ? 'teacher' : roles.has('student') ? 'student' : 'parent';
    try {
      const id = await resendSend(env, { to: user.email, kind: 'welcome', ...welcomeEmail(role, me.name, site) });
      await workerLog(tok, user.uid, me, 'email.welcome', `Welcome email sent to ${user.email}`);
      return { ok: true, id };
    } catch (e) {
      await fsCommit(tok, [del(`emailSent/welcome_${user.uid}`)]).catch(() => {});   // so it can be tried again
      throw e;
    }
  }

  if (kind === 'studentSetup') {
    const uid = String(body.uid || '');
    if (!uid) throw oops(400, 'No account given');
    const [target, me] = await Promise.all([fsGet(tok, `users/${uid}`), fsGet(tok, `users/${user.uid}`)]);
    if (!target) throw oops(404, 'No account found');
    const tRoles = rolesOf(target);
    const studentOnly = tRoles.size === 1 && tRoles.has('student');
    const isAdmin = user.uid === OWNER_UID || rolesOf(me).has('admin');
    const maker = target.parentUid === user.uid || target.teacherUid === user.uid;
    if (!studentOnly || !(maker || isAdmin)) throw oops(403, 'Only the person who made this account (or an admin) can send this');
    const day = londonDay();
    if ((await bumpCounter(tok, `rateLimits/email_${user.uid}_${day}`)) >= SETUP_EMAILS_PER_DAY) throw oops(429, 'That\'s a lot of emails today. Please try again tomorrow.');
    const email = await authEmailOf(tok, uid);
    if (!email) throw oops(404, "That account doesn't have an email address");
    const link = await passwordLink(tok, email, site);
    if (!link) throw oops(404, "That account doesn't have a sign-in");
    const byTeacher = target.teacherUid === user.uid && target.parentUid !== user.uid;
    const id = await resendSend(env, { to: email, kind: 'student_setup', ...setupEmail(target.name, email, me?.name || '', byTeacher, link) });
    await workerLog(tok, user.uid, me, 'email.student_setup', `Choose-a-password email sent to ${email}`, { name: target.name || email, id: uid });
    return { ok: true, id };
  }

  throw oops(400, 'Unknown email');
}

// "Forgot your password?": always says ok (so nobody can test which emails have accounts)
async function passwordEmail(env, request, body, origin) {
  if (!env.RESEND_API_KEY || !env.FIREBASE_SERVICE_ACCOUNT) return { ok: false, notSetUp: true };
  const email = String(body.email || '').trim().toLowerCase();
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || email.length > 200) return { ok: false, error: 'Please enter a valid email address.' };
  const tok = await serviceToken(env);
  const day = londonDay();
  const ip = request.headers.get('CF-Connecting-IP') || 'unknown';
  if ((await bumpCounter(tok, `rateLimits/reset_ip_${await sha(ip + PROJECT_ID)}_${day}`)) >= RESET_PER_IP_DAY) return { ok: true };
  if ((await bumpCounter(tok, `rateLimits/reset_em_${await sha(email + PROJECT_ID)}_${day}`)) >= RESET_PER_EMAIL_DAY) return { ok: true };
  const link = await passwordLink(tok, email, siteFor(origin));
  if (link) await resendSend(env, { to: email, kind: 'password_reset', ...resetEmail(email, link) });
  return { ok: true };
}

/* ============================================================
   Weekly parent summary (Sundays, 6pm UK time)
   One email per parent, a card per student they look after: time
   revising (and the change on last week), days revised, quizzes and
   average, streak or reviews waiting, topics going well and worth
   another look, exam countdown and daily goals, and a suggestion.
   On for every parent unless users.emailPrefs.weekly is false (Account
   settings, or the link in the email). Families with no revision in
   the last 4 weeks (and no new account) aren't sent one.
   ============================================================ */
const WEEKLY_CRON = '0 17,18 * * SUN';
const WORKER_URL = 'https://curly-recipe-8b84.clasp-hub-app.workers.dev';
const WEEKLY_FIELDS = ['name', 'email', 'role', 'roles', 'parentUid', 'guardianIds', 'sessions', 'study', 'streak',
  'lastRevisionDate', 'shields', 'srs', 'plan', 'planGoals', 'emailPrefs', 'createdAt'];

const dayAdd = (day, n) => { const [y, m, d] = day.split('-').map(Number); return new Date(Date.UTC(y, m - 1, d + n)).toISOString().slice(0, 10); };
const dayGap = (a, b) => { const t = s => { const [y, m, d] = s.split('-').map(Number); return Date.UTC(y, m - 1, d); }; return Math.round((t(b) - t(a)) / 86400000); };
const dayLabel = (day, opts) => { const [y, m, d] = day.split('-').map(Number); return new Date(Date.UTC(y, m - 1, d)).toLocaleDateString('en-GB', { timeZone: 'UTC', ...opts }); };
const londonHour = (d = new Date()) => Number(new Intl.DateTimeFormat('en-GB', { timeZone: 'Europe/London', hour: '2-digit', hour12: false }).format(d));
const fmtMins = mins => { const h = Math.floor(mins / 60), m = mins % 60; return h ? `${h}h${m ? ` ${String(m).padStart(2, '0')}m` : ''}` : `${m}m`; };
const listAnd = a => a.length <= 1 ? (a[0] || '') : `${a.slice(0, -1).join(', ')} and ${a[a.length - 1]}`;

// Everyone, with just the fields the summary needs
async function usersForWeekly(tok) {
  const out = []; let page = '';
  const mask = WEEKLY_FIELDS.map(f => `mask.fieldPaths=${f}`).join('&');
  do {
    const r = await fetch(`${FS}/users?pageSize=300&${mask}${page ? `&pageToken=${page}` : ''}`, { headers: { Authorization: `Bearer ${tok}` } });
    if (!r.ok) throw oops(500, `Couldn't read accounts (${r.status})`);
    const d = await r.json();
    (d.documents || []).forEach(x => out.push({ id: x.name.split('/').pop(), ...fields(x.fields) }));
    page = d.nextPageToken || '';
  } while (page);
  return out;
}

// One student's week, ending on `today` (a London day)
function studentWeek(st, today) {
  const start = dayAdd(today, -6), prevStart = dayAdd(today, -13);
  const inRange = (day, a, b) => day >= a && day <= b;
  const sessions = (st.sessions || []).filter(s => s && s.date).map(s => ({ ...s, day: londonDay(new Date(s.date)) }));
  const secsOf = s => typeof s.secondsSpent === 'number' ? s.secondsSpent : (s.minutesSpent || 0) * 60;
  const study = st.study || {};
  const secsBetween = (a, b) => {
    let t = 0;
    Object.entries(study).forEach(([day, subs]) => { if (inRange(day, a, b)) Object.values(subs || {}).forEach(v => { t += Number(v) || 0; }); });
    sessions.forEach(s => { if (inRange(s.day, a, b)) t += secsOf(s); });
    return t;
  };
  const mins = Math.round(secsBetween(start, today) / 60);
  const prevMins = Math.round(secsBetween(prevStart, dayAdd(start, -1)) / 60);
  const days = new Set();
  Object.entries(study).forEach(([day, subs]) => { if (inRange(day, start, today) && Object.values(subs || {}).some(v => v > 0)) days.add(day); });
  sessions.forEach(s => { if (inRange(s.day, start, today)) days.add(s.day); });
  const week = sessions.filter(s => inRange(s.day, start, today));
  const quizzes = week.filter(s => !s.review);
  const reviews = week.filter(s => s.review).length;
  const avg = quizzes.length ? Math.round(quizzes.reduce((a, s) => a + (Number(s.pct) || 0), 0) / quizzes.length) : null;
  // Topics this week: average score per topic
  const byTopic = {};
  quizzes.forEach(s => {
    const name = String(s.topic || s.subject || '').trim(); if (!name) return;
    (byTopic[name] = byTopic[name] || []).push(Number(s.pct) || 0);
  });
  const topics = Object.entries(byTopic).map(([name, a]) => ({ name, pct: Math.round(a.reduce((x, y) => x + y, 0) / a.length) }));
  const good = topics.filter(t => t.pct >= 80).sort((a, b) => b.pct - a.pct).slice(0, 2);
  const weak = topics.filter(t => t.pct < 65).sort((a, b) => a.pct - b.pct).slice(0, 2);
  // Streak (as the app shows it: only if they revised recently enough)
  const cover = Math.min(Number(st.shields) || 0, 2);
  const lastRev = st.lastRevisionDate ? londonDay(new Date(st.lastRevisionDate)) : null;
  const streak = lastRev && dayGap(lastRev, today) <= 1 + cover ? (Number(st.streak) || 0) : 0;
  const waiting = Object.values(st.srs || {}).filter(e => e && e.d && e.d <= today).length;
  // Last time they revised at all
  const allDays = [...Object.keys(study).filter(d => Object.values(study[d] || {}).some(v => v > 0)), ...sessions.map(s => s.day)].sort();
  const lastDay = allDays.length ? allDays[allDays.length - 1] : null;
  const lastSession = sessions.filter(s => s.day === lastDay).pop();
  // Plan: next exam within 60 days, and daily goals hit this week
  const exams = (st.plan?.exams || []).filter(e => e && e.start && (e.end || e.start) >= today).sort((a, b) => (a.start < b.start ? -1 : 1));
  const exam = exams[0] && dayGap(today, exams[0].start) <= 60 ? exams[0] : null;
  const goals = st.plan && typeof st.plan === 'object' ? Object.keys(st.planGoals || {}).filter(d => inRange(d, start, today)).length : null;
  return { mins, prevMins, days: days.size, quizzes: quizzes.length, reviews, avg, good, weak, streak, waiting,
    lastDay, lastSubject: lastSession?.subject || '', exam, goals, recent: !!lastDay && dayGap(lastDay, today) <= 28 };
}

function studentCard(st, w, today) {
  const first = escH(firstName(st.name) || 'Your student');
  const verdict = w.days >= 4 || w.mins >= 90 ? ['A strong week', '#1d7a4f'] : w.days >= 2 ? ['A steady week', '#123a4a'] : w.days === 1 ? ['A quiet week', '#8a6d1f'] : ['No revision this week', '#8a6d1f'];
  const diff = w.mins - w.prevMins;
  const change = w.prevMins || w.mins ? (diff > 0 ? `<span style="color:#1d7a4f;">▲ ${fmtMins(diff)}</span>` : diff < 0 ? `<span style="color:#b4502f;">▼ ${fmtMins(-diff)}</span>` : 'same as last week') : '&nbsp;';
  const tile = (val, label, colour = '#123a4a') => `<td width="25%" align="center" style="background:#fff;border-radius:10px;padding:10px 4px;"><div style="font-size:20px;font-weight:800;color:${colour};">${val}</div><div style="font-size:12px;color:#5d7c89;">${label}</div></td>`;
  const fourth = w.streak >= 2 ? tile(`${w.streak} days`, 'streak<br>&nbsp;', '#e8603e')
    : w.waiting ? tile(String(w.waiting), 'reviews<br>waiting') : tile(String(w.reviews), `review${w.reviews === 1 ? '' : 's'}<br>done`);
  const lines = [];
  if (w.good.length) lines.push(`<strong style="color:#1d7a4f;">Going well:</strong> ${w.good.map(t => `${escH(t.name)} (${t.pct}%)`).join(', ')}`);
  if (w.weak.length) lines.push(`<strong style="color:#b4502f;">Worth another look:</strong> ${w.weak.map(t => `${escH(t.name)} (${t.pct}%)`).join(', ')}`);
  const plan = [];
  if (w.exam) { const n = dayGap(today, w.exam.start); plan.push(n <= 0 ? `${escH(w.exam.name || 'Exams')} now` : n === 1 ? `${escH(w.exam.name || 'Exams')} tomorrow` : `${escH(w.exam.name || 'Exams')} in ${n} days`); }
  if (w.goals !== null && w.days) plan.push(`Daily goal hit on ${w.goals} of 7 days`);
  if (plan.length) lines.push(`<strong style="color:#123a4a;">Plan:</strong> ${plan.join('. ')}.`);
  if (w.days <= 1 && w.lastDay) lines.push(`<strong style="color:#123a4a;">Last revised:</strong> ${dayGap(w.lastDay, today) < 7 ? dayLabel(w.lastDay, { weekday: 'long' }) : dayLabel(w.lastDay, { day: 'numeric', month: 'long' })}${w.lastSubject ? `, ${escH(w.lastSubject)}` : ''}.`);
  let tip;
  if (w.days >= 2 && w.weak.length) tip = `<strong>Try this:</strong> ask ${first} to explain ${escH(w.weak[0].name)} to you. Teaching something is one of the best ways to make it stick.`;
  else if (w.days >= 4) tip = `<strong>Try this:</strong> a good week to say well done. Noticing the effort keeps it going.`;
  else if (w.waiting) tip = `Busy weeks happen. A 10-minute review would clear ${w.waiting > 15 ? 'some' : 'most'} of what's waiting and get things moving again.`;
  else if (w.days <= 1) tip = `Busy weeks happen. A short quiz early in the week is an easy way to get going again.`;
  return `<tr><td style="padding:0 20px 16px;">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#f6fafb;border:1px solid #e3ecee;border-radius:14px;">
<tr><td style="padding:18px 18px 6px;"><table role="presentation" width="100%" cellpadding="0" cellspacing="0"><tr>
  <td style="font-size:20px;font-weight:800;color:#123a4a;">${first}</td>
  <td align="right" style="font-size:14px;font-weight:700;color:${verdict[1]};">${verdict[0]}</td></tr></table></td></tr>
<tr><td style="padding:6px 12px 2px;"><table role="presentation" width="100%" cellpadding="0" cellspacing="6"><tr>
  ${tile(fmtMins(w.mins), `revising<br>${change}`)}${tile(`${w.days} of 7`, 'days<br>&nbsp;')}${tile(String(w.quizzes), `quiz${w.quizzes === 1 ? '' : 'zes'}<br>${w.avg !== null ? `${w.avg}% average` : '&nbsp;'}`)}${fourth}
</tr></table></td></tr>
${lines.length ? `<tr><td style="padding:10px 18px ${tip ? 4 : 14}px;font-size:15px;line-height:1.55;">${lines.map(l => `<p style="margin:0 0 8px;">${l}</p>`).join('')}</td></tr>` : ''}
${tip ? `<tr><td style="padding:${lines.length ? 0 : 10}px 18px 18px;"><table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#fff3ee;border-radius:10px;"><tr><td style="padding:12px 14px;font-size:14px;line-height:1.5;color:#7a3a22;">${tip}</td></tr></table></td></tr>` : ''}
</table></td></tr>`;
}
function studentText(st, w) {
  const out = [`${firstName(st.name) || 'Your student'}: ${fmtMins(w.mins)} revising on ${w.days} of 7 days, ${w.quizzes} quiz${w.quizzes === 1 ? '' : 'zes'}${w.avg !== null ? ` (${w.avg}% average)` : ''}${w.streak >= 2 ? `, ${w.streak}-day streak` : ''}${w.waiting ? `, ${w.waiting} reviews waiting` : ''}.`];
  if (w.good.length) out.push(`Going well: ${w.good.map(t => `${t.name} (${t.pct}%)`).join(', ')}`);
  if (w.weak.length) out.push(`Worth another look: ${w.weak.map(t => `${t.name} (${t.pct}%)`).join(', ')}`);
  return out.join('\n');
}

async function unsubToken(env, uid, kind = 'weekly') {
  const sa = JSON.parse(env.FIREBASE_SERVICE_ACCOUNT);
  const key = await crypto.subtle.importKey('raw', new TextEncoder().encode(`${sa.private_key_id || ''}:${sa.private_key}:weekly`), { name: 'HMAC', hash: 'SHA-256' }, false, ['sign']);
  const sig = new Uint8Array(await crypto.subtle.sign('HMAC', key, new TextEncoder().encode(`${uid}:${kind}`)));
  return [...sig].slice(0, 16).map(b => b.toString(16).padStart(2, '0')).join('');
}

async function weeklyEmail(env, parent, students, today) {
  const site = 'https://lobelimpet.com';
  const start = dayAdd(today, -6);
  const sameMonth = start.slice(0, 7) === today.slice(0, 7);
  const range = `${dayLabel(start, sameMonth ? { day: 'numeric' } : { day: 'numeric', month: 'long' })} to ${dayLabel(today, { day: 'numeric', month: 'long' })}`;
  const firsts = students.map(s => firstName(s.st.name) || 'your student');
  const who = listAnd(firsts);
  const q = `u=${encodeURIComponent(parent.id)}&k=${await unsubToken(env, parent.id)}`;
  const unsub = `${site}/unsubscribe.html?${q}`;              // the link people click
  const oneClick = `${WORKER_URL}/email/unsubscribe?${q}`;    // what mail apps call directly
  const hi = firstName(parent.name) ? `Hi ${escH(firstName(parent.name))}, here's` : `Here's`;
  const html = `<!DOCTYPE html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Your week in revision</title></head>
<body style="margin:0;padding:0;background:#eef5f6;">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#eef5f6;"><tr><td align="center" style="padding:28px 12px;">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:560px;background:#ffffff;border-radius:16px;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Arial,sans-serif;color:#1f3440;">
<tr><td style="padding:28px 28px 4px;"><table role="presentation" cellpadding="0" cellspacing="0"><tr>
  <td style="padding-right:10px;"><img src="${LOGO_URL}" width="40" height="40" alt="" style="display:block;"></td>
  <td style="font-size:22px;font-weight:800;color:#123a4a;">lobe <span style="color:#e8603e;">limpet</span></td></tr></table></td></tr>
<tr><td style="padding:14px 28px 0;">
  <p style="margin:0 0 4px;font-size:13px;font-weight:700;letter-spacing:.06em;text-transform:uppercase;color:#5d7c89;">Week of ${escH(range)}</p>
  <h1 style="margin:0 0 14px;font-size:24px;line-height:1.3;color:#123a4a;">Your week in revision</h1>
  <p style="margin:0 0 18px;font-size:16px;line-height:1.55;">${hi} how ${escH(who)} got on this week.</p>
</td></tr>
${students.map(s => studentCard(s.st, s.w, today)).join('\n')}
<tr><td style="padding:4px 28px 8px;">
  <table role="presentation" cellpadding="0" cellspacing="0" style="margin:0 0 18px;"><tr><td style="background:#123a4a;border-radius:10px;">
    <a href="${site}/parent.html" style="display:inline-block;padding:14px 26px;font-size:16px;font-weight:700;color:#ffffff;text-decoration:none;">See full progress</a></td></tr></table>
  <p style="margin:0 0 16px;font-size:15px;line-height:1.55;">The Lobe Limpet team</p>
</td></tr>
<tr><td style="padding:8px 28px 26px;border-top:1px solid #e3ecee;">
  <p style="margin:14px 0 0;font-size:13px;line-height:1.5;color:#5d7c89;">You get this every Sunday because you look after ${escH(who)} on Lobe Limpet. <a href="${unsub}" style="color:#5d7c89;">Turn off these emails</a>, or change it any time in Account settings.</p>
</td></tr></table>
<p style="margin:14px 0 0;font-size:12px;color:#7d97a1;font-family:Arial,sans-serif;">Lobe Limpet · Knowledge that sticks.</p>
</td></tr></table></body></html>`;
  const text = [`Your week in revision (${range})`, `${firstName(parent.name) ? `Hi ${firstName(parent.name)}, here's` : `Here's`} how ${who} got on this week.`,
    ...students.map(s => studentText(s.st, s.w)), `See full progress: ${site}/parent.html`, 'The Lobe Limpet team',
    `Turn off these emails: ${unsub}`].join('\n\n');
  let subject = `${firsts.length > 3 ? 'Your students' : who}'s week on Lobe Limpet`.replace(/s's week/, "s' week");
  subject = subject[0].toUpperCase() + subject.slice(1);
  return { from: env.EMAIL_FROM || EMAIL_FROM_DEFAULT, to: [parent.email], reply_to: EMAIL_REPLY_TO, subject, html, text,
    headers: { 'List-Unsubscribe': `<${oneClick}>`, 'List-Unsubscribe-Post': 'List-Unsubscribe=One-Click' },
    tags: [{ name: 'kind', value: 'weekly' }] };
}

// Who gets an email, and with which students
function weeklyPlan(users, today) {
  const byId = Object.fromEntries(users.map(u => [u.id, u]));
  const kids = {};
  users.filter(u => rolesOf(u).has('student')).forEach(st => {
    [...new Set([st.parentUid, ...(st.guardianIds || [])].filter(Boolean))].forEach(p => { (kids[p] = kids[p] || []).push(st); });
  });
  const out = [];
  Object.entries(kids).forEach(([pid, sts]) => {
    const parent = byId[pid];
    if (!parent || !parent.email || parent.emailPrefs?.weekly === false) return;
    const students = sts.sort((a, b) => String(a.name || '').localeCompare(String(b.name || ''))).map(st => ({ st, w: studentWeek(st, today) }));
    const fresh = Number(parent.createdAt) > Date.now() - 28 * 86400000;
    if (!fresh && !students.some(s => s.w.recent)) return;   // nobody has revised for 4 weeks
    out.push({ parent: { id: pid, ...parent }, students });
  });
  return out;
}

async function weeklySummaries(env, { force = false } = {}) {
  if (!env.RESEND_API_KEY || !env.FIREBASE_SERVICE_ACCOUNT) return { sent: 0, skipped: 'not set up' };
  if (!force && (londonHour() !== 18 || new Date().toLocaleDateString('en-GB', { timeZone: 'Europe/London', weekday: 'long' }) !== 'Sunday')) return { sent: 0, skipped: 'not 6pm Sunday' };
  const tok = await serviceToken(env);
  const today = londonDay();
  const plan = weeklyPlan(await usersForWeekly(tok), today);
  // Already sent this week? (one marker per parent per week)
  const marker = id => `emailSent/weekly_${id}_${today}`;
  const done = await fsExisting(tok, plan.map(p => marker(p.parent.id)));
  const todo = plan.filter(p => !done.has(marker(p.parent.id)));
  let sent = 0;
  for (let i = 0; i < todo.length; i += 100) {
    const chunk = todo.slice(i, i + 100);
    const emails = await Promise.all(chunk.map(p => weeklyEmail(env, p.parent, p.students, today)));
    const r = await fetch('https://api.resend.com/emails/batch', {
      method: 'POST', headers: { Authorization: `Bearer ${env.RESEND_API_KEY}`, 'Content-Type': 'application/json' },
      body: JSON.stringify(emails),
    });
    if (!r.ok) { console.warn('Weekly batch failed', r.status, (await r.text()).slice(0, 300)); continue; }
    sent += chunk.length;
    await fsCommit(tok, chunk.map(p => ({ update: { name: `${DOCS}/${marker(p.parent.id)}`, fields: {
      at: tsv(new Date()), expireAt: tsv(new Date(Date.now() + 60 * 86400000)) } } }))).catch(e => console.warn('Markers not saved', e.message));
  }
  await workerLog(tok, 'system', { name: 'Lobe Limpet' }, 'email.weekly', `Weekly summary sent to ${sent} parent${sent === 1 ? '' : 's'}`);
  return { sent };
}

// Admins: send this week's summary for a parent (default: yourself) to your own inbox
async function weeklyPreview(env, user, body) {
  if (!env.RESEND_API_KEY) throw oops(503, 'Email is not set up yet');
  const tok = await serviceToken(env);
  const me = await fsGet(tok, `users/${user.uid}`);
  if (!(user.uid === OWNER_UID || rolesOf(me).has('admin'))) throw oops(403, 'Admins only');
  const pid = String(body.parentUid || user.uid);
  const today = londonDay();
  const parent = pid === user.uid ? me : await fsGet(tok, `users/${pid}`);
  if (!parent) throw oops(404, 'No account found');
  const [a, b] = await Promise.all([fsQuery(tok, 'users', 'parentUid', 'EQUAL', pid), fsQuery(tok, 'users', 'guardianIds', 'ARRAY_CONTAINS', pid)]);
  const seen = new Set();
  const sts = [...a, ...b].filter(s => rolesOf(s).has('student') && !seen.has(s.id) && seen.add(s.id));
  if (!sts.length) throw oops(404, 'This account has no students, so there is nothing to summarise');
  const students = sts.map(st => ({ st, w: studentWeek(st, today) }));
  const email = await weeklyEmail(env, { id: pid, ...parent }, students, today);
  email.to = [user.email];
  email.subject = `[Preview] ${email.subject}`;
  delete email.headers;   // no unsubscribe header on a preview
  const r = await fetch('https://api.resend.com/emails', {
    method: 'POST', headers: { Authorization: `Bearer ${env.RESEND_API_KEY}`, 'Content-Type': 'application/json' }, body: JSON.stringify(email),
  });
  if (!r.ok) throw oops(502, `The preview couldn't be sent (${r.status})`);
  return { ok: true, to: user.email, students: students.length };
}

// The "Turn off these emails" link: a page with a button (GET), then the change (POST,
// also what mail apps send for one-click unsubscribe)
async function unsubscribePage(request, env) {
  const url = new URL(request.url);
  const uid = url.searchParams.get('u') || '', k = url.searchParams.get('k') || '';
  const kind = url.searchParams.get('t') === 'start' ? 'start' : 'weekly';   // which emails: weekly summary or getting-started tips
  const prefOff = { emailPrefs: { mapValue: { fields: { [kind]: { booleanValue: false } } } } };
  const page = (title, body) => new Response(`<!DOCTYPE html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="robots" content="noindex"><title>${title}</title></head>
<body style="margin:0;background:#eef5f6;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Arial,sans-serif;color:#1f3440;">
<div style="max-width:460px;margin:60px auto;background:#fff;border-radius:16px;padding:28px;">
<p style="margin:0 0 18px;font-size:22px;font-weight:800;color:#123a4a;">lobe <span style="color:#e8603e;">limpet</span></p>
<h1 style="font-size:22px;color:#123a4a;margin:0 0 12px;">${title}</h1>${body}</div></body></html>`, { headers: { 'Content-Type': 'text/html; charset=utf-8' } });
  const ok = uid && k && env.FIREBASE_SERVICE_ACCOUNT && k === await unsubToken(env, uid, kind);
  // From the unsubscribe page on lobelimpet.com: answer in JSON
  const origin = request.headers.get('Origin') || '';
  if (ALLOWED_ORIGINS.includes(origin)) {
    const h = { 'Access-Control-Allow-Origin': origin, 'Vary': 'Origin', 'Content-Type': 'application/json' };
    if (request.method === 'OPTIONS') return new Response(null, { status: 204, headers: { ...h, 'Access-Control-Allow-Methods': 'POST' } });
    if (!ok) return new Response(JSON.stringify({ ok: false }), { headers: h });
    if (request.method !== 'POST') return new Response(JSON.stringify({ ok: true }), { headers: h });
    const tok = await serviceToken(env);
    await fsCommit(tok, [{ update: { name: `${DOCS}/users/${uid}`, fields: prefOff },
      updateMask: { fieldPaths: [`emailPrefs.${kind}`] }, currentDocument: { exists: true } }]);
    return new Response(JSON.stringify({ ok: true, done: true }), { headers: h });
  }
  if (!ok) return page('This link doesn\'t work', '<p style="line-height:1.55;">You can turn the weekly email off in Lobe Limpet: tap your name at the bottom of the menu, then Account settings.</p>');
  if (request.method === 'POST') {
    const tok = await serviceToken(env);
    await fsCommit(tok, [{ update: { name: `${DOCS}/users/${uid}`, fields: prefOff },
      updateMask: { fieldPaths: [`emailPrefs.${kind}`] }, currentDocument: { exists: true } }]).catch(() => {});
    if (kind === 'start') return page('Tips turned off', '<p style="line-height:1.55;">We won\'t send you any more getting-started emails.</p><p><a href="https://lobelimpet.com/parent.html" style="color:#123a4a;font-weight:700;">Go to Lobe Limpet</a></p>');
    return page('Weekly emails turned off', '<p style="line-height:1.55;">You won\'t get the Sunday summary any more. You can turn it back on any time in Lobe Limpet, under Account settings.</p><p><a href="https://lobelimpet.com/parent.html" style="color:#123a4a;font-weight:700;">Go to Lobe Limpet</a></p>');
  }
  return page('Turn off the weekly email?', `<p style="line-height:1.55;">You'll stop getting the Sunday summary of your students' revision. Account emails (like password links) still come when you ask for them.</p>
<form method="post"><button style="background:#123a4a;color:#fff;border:0;border-radius:10px;padding:14px 24px;font-size:16px;font-weight:700;cursor:pointer;">Turn off weekly emails</button></form>`);
}

/* ============================================================
   Getting started: parents who haven't added a student yet
   Day 2 (sent between days 2 and 6) and day 7 (days 7 to 13) after
   sign-up, then nothing more. Not sent once they have a student or a
   link request waiting, or if they turned these off (emailPrefs.start).
   Every morning, Cron Trigger "30 9 * * *".
   ============================================================ */
function startEmail(parent, n, unsub) {
  const site = 'https://lobelimpet.com';
  const hi = firstName(parent.name) ? `Hi ${escH(firstName(parent.name))},` : 'Hi,';
  const add = { label: 'Add a student', url: `${site}/parent.html?add=student` };
  const footer = `You're getting this because you signed up to Lobe Limpet and haven't added a student yet. <a href="${unsub}" style="color:#5d7c89;">No more of these emails</a>.`;
  const content = n === 1 ? {
    heading: 'Ready when you are',
    paras: [hi, 'You\'re all set up. The next step is adding the student you\'re helping. It takes about two minutes:',
      '1. <strong>Tap Add student</strong> and enter their name and email. Leave the password blank and we\'ll email them a link to choose their own.',
      '2. <strong>Pick their revision packs,</strong> or turn class notes and worksheets into your own.',
      '3. <strong>They start revising,</strong> and you see how they\'re getting on.'],
    button: add,
    after: ['Already have a Lobe Limpet account for them? Enter their email and we\'ll send them a request to link with you.',
      'Any questions, just reply to this email.', 'The Lobe Limpet team'],
    footer,
  } : {
    heading: 'One step to go',
    paras: [hi, 'Once your student is added, you\'ll get a short summary from us every Sunday evening:',
      '• <strong>How much they revised</strong>, and on how many days',
      '• <strong>Quiz scores</strong>, and the topics that are going well',
      '• <strong>Topics worth another look</strong>, with an idea for helping'],
    button: add,
    after: ['This is the last reminder we\'ll send. If now isn\'t the right time, Lobe Limpet will be here when you\'re ready.', 'The Lobe Limpet team'],
    footer,
  };
  return { subject: n === 1 ? 'Add your student to Lobe Limpet' : 'One step to go on Lobe Limpet', html: emailHtml(content), text: emailText(content) };
}

async function startNudges(env, { dryRun = false } = {}) {
  if (!env.RESEND_API_KEY || !env.FIREBASE_SERVICE_ACCOUNT) return { sent: 0, skipped: 'not set up' };
  const tok = await serviceToken(env);
  const today = londonDay();
  const users = await usersForWeekly(tok);
  const hasStudent = new Set();
  users.filter(u => rolesOf(u).has('student')).forEach(st => [st.parentUid, ...(st.guardianIds || [])].filter(Boolean).forEach(p => hasStudent.add(p)));
  const due = [];
  users.forEach(u => {
    const r = rolesOf(u);
    if (!r.has('parent') || r.has('teacher') || r.has('admin') || !u.email || u.emailPrefs?.start === false || hasStudent.has(u.id)) return;
    if (!(Number(u.createdAt) > 0)) return;
    const age = dayGap(londonDay(new Date(Number(u.createdAt))), today);
    const n = age >= 2 && age <= 6 ? 1 : age >= 7 && age <= 13 ? 2 : 0;
    if (n) due.push({ u, n });
  });
  if (!due.length) return { sent: 0 };
  const marker = d => `emailSent/start${d.n}_${d.u.id}`;
  const done = await fsExisting(tok, due.map(marker));
  let todo = due.filter(d => !done.has(marker(d)));
  // A link request waiting for the student to accept counts as getting started
  const waiting = await Promise.all(todo.map(d => fsQuery(tok, 'parentLinks', 'by', 'EQUAL', d.u.id)));
  todo = todo.filter((d, i) => !waiting[i].some(l => l.status === 'pending' || l.status === 'accepted'));
  if (dryRun) return { wouldSend: todo.map(d => ({ uid: d.u.id, n: d.n })) };
  let sent = 0;
  for (let i = 0; i < todo.length; i += 100) {
    const chunk = todo.slice(i, i + 100);
    const emails = await Promise.all(chunk.map(async d => {
      const q = `u=${encodeURIComponent(d.u.id)}&k=${await unsubToken(env, d.u.id, 'start')}&t=start`;
      const e = startEmail(d.u, d.n, `https://lobelimpet.com/unsubscribe.html?${q}`);
      return { from: env.EMAIL_FROM || EMAIL_FROM_DEFAULT, to: [d.u.email], reply_to: EMAIL_REPLY_TO, ...e,
        headers: { 'List-Unsubscribe': `<${WORKER_URL}/email/unsubscribe?${q}>`, 'List-Unsubscribe-Post': 'List-Unsubscribe=One-Click' },
        tags: [{ name: 'kind', value: `start_${d.n}` }] };
    }));
    const r = await fetch('https://api.resend.com/emails/batch', {
      method: 'POST', headers: { Authorization: `Bearer ${env.RESEND_API_KEY}`, 'Content-Type': 'application/json' }, body: JSON.stringify(emails),
    });
    if (!r.ok) { console.warn('Getting-started batch failed', r.status, (await r.text()).slice(0, 300)); continue; }
    sent += chunk.length;
    await fsCommit(tok, chunk.map(d => ({ update: { name: `${DOCS}/${marker(d)}`, fields: {
      at: tsv(new Date()), expireAt: tsv(new Date(Date.now() + 90 * 86400000)) } } }))).catch(e => console.warn('Markers not saved', e.message));
  }
  if (sent) await workerLog(tok, 'system', { name: 'Lobe Limpet' }, 'email.start', `Getting-started email sent to ${sent} parent${sent === 1 ? '' : 's'}`);
  return { sent };
}

async function startPreview(env, user) {
  if (!env.RESEND_API_KEY) throw oops(503, 'Email is not set up yet');
  const tok = await serviceToken(env);
  const me = await fsGet(tok, `users/${user.uid}`);
  if (!(user.uid === OWNER_UID || rolesOf(me).has('admin'))) throw oops(403, 'Admins only');
  const q = `u=${encodeURIComponent(user.uid)}&k=${await unsubToken(env, user.uid, 'start')}&t=start`;
  for (const n of [1, 2]) {
    const e = startEmail(me || {}, n, `https://lobelimpet.com/unsubscribe.html?${q}`);
    const r = await fetch('https://api.resend.com/emails', {
      method: 'POST', headers: { Authorization: `Bearer ${env.RESEND_API_KEY}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({ from: env.EMAIL_FROM || EMAIL_FROM_DEFAULT, to: [user.email], reply_to: EMAIL_REPLY_TO, ...e, subject: `[Preview ${n} of 2] ${e.subject}` }),
    });
    if (!r.ok) throw oops(502, `The preview couldn't be sent (${r.status})`);
  }
  return { ok: true, to: user.email };
}

/* ============================================================
   Accounts by email (safeguarding). The emailIndex can only be read
   here, so nobody can find out who uses an email address or get a
   name from it. Link requests are made here too, so the checks
   (account at least a day old, student's other parents told) can't be
   skipped.
   ============================================================ */
const normEmail = e => String(e || '').trim().toLowerCase();
async function accountByEmail(tok, email) {
  const idx = await fsGet(tok, `emailIndex/${encodeURIComponent(normEmail(email))}`);
  if (!idx?.uid) return null;
  const u = await fsGet(tok, `users/${idx.uid}`);
  return u ? { id: idx.uid, ...u } : null;
}
const parentsOfDoc = d => [...new Set([d?.parentUid, ...(d?.guardianIds || [])].filter(Boolean))];
async function authCreatedAt(tok, uid) {
  const r = await fetch(`https://identitytoolkit.googleapis.com/v1/projects/${PROJECT_ID}/accounts:lookup`, {
    method: 'POST', headers: { Authorization: `Bearer ${tok}`, 'Content-Type': 'application/json' }, body: JSON.stringify({ localId: [uid] }),
  });
  const d = await r.json().catch(() => ({}));
  return Number(d.users?.[0]?.createdAt) || 0;
}

async function accountAction(env, user, body) {
  const tok = await serviceToken(env);
  const me = await fsGet(tok, `users/${user.uid}`);
  const myRoles = rolesOf(me);
  const isAdmin = user.uid === OWNER_UID || myRoles.has('admin');
  const day = londonDay();
  const email = normEmail(body.email);
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) throw oops(400, 'Please enter a valid email address.');

  if (body.action === 'checkEmail') {
    if (!(isAdmin || myRoles.has('parent') || myRoles.has('teacher'))) throw oops(403, 'Not allowed');
    if ((await bumpCounter(tok, `rateLimits/lookup_${user.uid}_${day}`)) >= 100) throw oops(429, 'Too many look-ups today. Please try again tomorrow.');
    const acc = await accountByEmail(tok, email);
    if (!acc) return { exists: false };
    const r = rolesOf(acc);
    const kind = acc.id === user.uid ? 'self' : (r.has('student') && r.size === 1) ? 'student' : 'adult';
    const mine = kind === 'student' && (parentsOfDoc(acc).includes(user.uid) || (acc.teacherIds || []).includes(user.uid));
    return { exists: true, kind, mine };
  }

  if (body.action === 'requestLink') {
    if (!(isAdmin || myRoles.has('parent'))) throw oops(403, 'Only parent accounts can ask to link with a student');
    const created = await authCreatedAt(tok, user.uid);
    if (!isAdmin && created && Date.now() - created < 86400000) throw oops(403, "New accounts can't send link requests for their first day. Please try again tomorrow, or ask your student to send you an Invite a parent link from their account.");
    if ((await bumpCounter(tok, `rateLimits/link_${user.uid}_${day}`)) >= 20) throw oops(429, 'Too many requests today. Please try again tomorrow.');
    const st = await accountByEmail(tok, email);
    const r = rolesOf(st);
    if (!st || !(r.has('student') && r.size === 1)) throw oops(404, "There's no student account with that email.");
    if (parentsOfDoc(st).includes(user.uid)) return { ok: true, status: 'already' };
    const id = `${user.uid}_${st.id}`;
    const prev = await fsGet(tok, `parentLinks/${id}`);
    if (prev?.status === 'pending') return { ok: true, status: 'waiting' };
    const typed = String(body.typedName || '').trim().slice(0, 80);
    const now = Date.now();
    const sv = v => ({ stringValue: String(v ?? '') });
    await fsCommit(tok, [{ update: { name: `${DOCS}/parentLinks/${id}`, fields: {
      by: sv(user.uid), byName: sv(me?.name || ''), byEmail: sv(me?.email || user.email || ''),
      studentUid: sv(st.id), studentEmail: sv(st.email || email), studentName: sv(typed || st.name || ''),
      status: sv('pending'), at: { integerValue: String(now) },
    } } }]);
    await workerLog(tok, user.uid, me, 'student.link_request', 'Asked to link an existing student account', { name: typed || 'a student', id: st.id });
    // Tell the student's existing parents, so nobody can quietly attach themselves
    const others = parentsOfDoc(st).filter(p => p !== user.uid);
    if (others.length && env.RESEND_API_KEY) {
      const docs = await Promise.all(others.map(p => fsGet(tok, `users/${p}`)));
      const first = escH(firstName(st.name) || 'your student');
      await Promise.all(docs.filter(d => d?.email).map(d => resendSend(env, { to: d.email, kind: 'link_alert',
        ...(() => { const c = {
          heading: `Someone asked to link with ${first}`,
          paras: [firstName(d.name) ? `Hi ${escH(firstName(d.name))},` : 'Hi,',
            `<strong>${escH(me?.name || 'Someone')}</strong> (${escH(me?.email || user.email || '')}) has asked to be a parent or carer on ${first}'s Lobe Limpet account. If ${first} accepts, they'll see ${first}'s revision progress.`,
            `If you know them (for example, another parent or carer), there's nothing to do. If you don't, please ask ${first} to tap <strong>Decline</strong>, and let us know at safeguarding@lobelimpet.com.`],
          after: ['The Lobe Limpet team'],
          footer: `You're getting this because you look after ${first} on Lobe Limpet. We always tell you when someone asks to link with them.`,
        }; return { subject: `Someone asked to link with ${firstName(st.name) || 'your student'} on Lobe Limpet`, html: emailHtml(c), text: emailText(c) }; })(),
      }).catch(e => console.warn('Link alert not sent', e.message))));
    }
    return { ok: true, status: 'sent' };
  }

  if (body.action === 'shareStudent') {
    const sid = String(body.studentUid || '');
    const st = sid ? await fsGet(tok, `users/${sid}`) : null;
    if (!st || !(parentsOfDoc(st).includes(user.uid) || isAdmin)) throw oops(403, 'You can only share your own students');
    const other = await accountByEmail(tok, email);
    if (!other) throw oops(404, 'No Lobe Limpet account uses that email. Ask them to create a parent account first.');
    if (other.id === user.uid) throw oops(400, "That's your own account.");
    const or = rolesOf(other);
    if (!(or.has('parent') || or.has('admin'))) throw oops(400, "That account isn't a parent account. They need to sign up as a parent.");
    if (parentsOfDoc(st).includes(other.id)) return { ok: true, already: true };
    const sv = v => ({ stringValue: String(v ?? '') });
    await fsCommit(tok, [
      { transform: { document: `${DOCS}/users/${sid}`, fieldTransforms: [{ fieldPath: 'guardianIds', appendMissingElements: { values: [sv(other.id)] } }] } },
      { update: { name: `${DOCS}/users/${other.id}/children/${sid}`, fields: {
        name: sv(st.name), email: sv(st.email), theme: sv(st.theme || 'edge'),
        groupIds: { arrayValue: { values: (st.groupIds || []).map(sv) } },
        createdAt: { integerValue: String(Date.now()) }, sharedBy: sv(user.uid) } } },
    ]);
    await workerLog(tok, user.uid, me, 'student.share', `Shared with ${email}`, { name: st.name || '', id: sid });
    return { ok: true };
  }
  throw oops(400, 'Unknown action');
}
