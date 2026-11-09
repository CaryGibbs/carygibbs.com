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
//   task 'generation'  writing questions, key points, links   Plus or admin only
//   task 'learning'    learning notes, cheat sheets, cards    any signed-in user
//   task 'marking'     marking written quiz answers           any signed-in user
//   action 'checkLinks'  checking resource links load        any signed-in user
// Only the models below can be used, and each task has a size limit.
//
// Settings (Cloudflare → Workers → this Worker → Settings → Variables):
//   ANTHROPIC_API_KEY   secret: the Anthropic API key
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

export default {
  async fetch(request, env) {
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

    // ── Who is asking? ──
    const token = (request.headers.get('Authorization') || '').replace(/^Bearer\s+/i, '');
    let user = null;
    if (token) {
      try { user = await verifyFirebaseToken(token); }
      catch (e) { return fail(401, 'Please sign in again (' + e.message + ')'); }
    } else if (String(env.ALLOW_ANON) !== 'true') {
      return fail(401, 'Please sign in to use this');
    }

    // ── Link checking ──
    if (body.action === 'checkLinks') {
      const urls = (Array.isArray(body.urls) ? body.urls : []).slice(0, MAX_LINKS);
      const results = {};
      await Promise.all(urls.map(async u => { results[u] = await checkLink(u); }));
      return reply(200, { results });
    }

    // ── AI request ──
    // Unsigned (only while ALLOW_ANON is on): behave as the old Worker did
    const taskName = String(request.headers.get('X-Task') || body.task || (user ? '' : 'generation'));
    const task = TASKS[taskName];
    if (!task) return fail(400, 'Unknown task');
    if (task.needsPlus && user) {
      const allowed = await hasPlus(user, token);
      if (!allowed) return fail(403, 'AI generation is part of Lobe Limpet Plus');
    }
    const model = MODELS.includes(body.model) ? body.model : 'claude-sonnet-4-5';
    const messages = Array.isArray(body.messages) ? body.messages : [];
    if (!messages.length) return fail(400, 'Nothing to send');
    const size = JSON.stringify(messages).length;
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

/* ── Plus or admin? Read the user's own record (their token lets them) ── */
async function hasPlus(user, token) {
  if (user.uid === OWNER_UID) return true;
  const r = await fetch(`https://firestore.googleapis.com/v1/projects/${PROJECT_ID}/databases/(default)/documents/users/${user.uid}`,
    { headers: { Authorization: `Bearer ${token}` } });
  if (!r.ok) return false;
  const f = (await r.json()).fields || {};
  const roles = (f.roles?.arrayValue?.values || []).map(v => v.stringValue);
  if (f.role?.stringValue) roles.push(f.role.stringValue);
  return f.plan?.stringValue === 'plus' || roles.includes('admin');
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
