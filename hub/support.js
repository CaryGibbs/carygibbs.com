// ============================================================
// LOBE LIMPET: "Get help" and "Report this question"
// openSupport() shows a short form over the page. The message is saved
// to supportRequests (read only by admins, in Admin → Support) with what
// we need to help: account number, role, the page, the device and, for a
// question report, the pack, subject, topic and question.
// Anything on any page with data-get-help opens it (site.js loads this
// file only when such a button is pressed). Signed out, it offers email.
// One message every 20 seconds and 20 a day per account (supportLimits,
// checked by the database rules).
// ============================================================

import { auth, db } from './firebase-config.js?v=20261126f';
import { doc, getDoc, collection, writeBatch, serverTimestamp, Timestamp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";

const SUPPORT_EMAIL = 'support@lobelimpet.com';
const VERSION = '20261120d';
const DAY = 86400000;
const esc = s => String(s ?? '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

export const HELP_TOPICS = [
  ['broken', "Something isn't working"],
  ['account', 'My account, signing in or linking'],
  ['plus', 'Plus, payments or a refund'],
  ['content', 'A revision pack or its content'],
  ['idea', 'An idea or suggestion'],
  ['other', 'Something else'],
];
export const QUESTION_TOPICS = [
  ['wrong', 'The right answer is wrong'],
  ['unclear', "The question is unclear or doesn't make sense"],
  ['typo', 'A spelling mistake or typo'],
  ['marking', 'My answer was marked unfairly'],
  ['other', 'Something else'],
];
export const TOPIC_LABEL = Object.fromEntries([...HELP_TOPICS, ...QUESTION_TOPICS.map(([k, v]) => ['q-' + k, v])]);

function addStyles() {
  if (document.getElementById('sp-style')) return;
  const s = document.createElement('style');
  s.id = 'sp-style';
  s.textContent = `
  .sp-scrim{position:fixed;inset:0;background:rgba(18,58,74,.45);z-index:10000;opacity:0;transition:opacity .2s;}
  .sp-scrim.on{opacity:1;}
  .sp-panel{position:fixed;z-index:10001;left:50%;top:50%;transform:translate(-50%,-46%);opacity:0;transition:opacity .2s,transform .2s;
    width:min(520px,calc(100vw - 32px));max-height:min(88vh,720px);display:flex;flex-direction:column;background:#fff;color:#1d2b33;
    border-radius:18px;box-shadow:0 24px 60px rgba(18,58,74,.28);font-family:Inter,system-ui,sans-serif;text-align:left;}
  .sp-panel.on{opacity:1;transform:translate(-50%,-50%);}
  .sp-head{display:flex;align-items:flex-start;gap:12px;padding:20px 20px 6px 22px;}
  .sp-head h2{flex:1;margin:0;font:700 1.15rem/1.35 "Plus Jakarta Sans",Inter,sans-serif;color:#123a4a;}
  .sp-close{flex-shrink:0;border:0;background:#f1f4f5;border-radius:50%;width:34px;height:34px;font-size:1.2rem;line-height:1;cursor:pointer;color:#123a4a;}
  .sp-close:hover,.sp-close:focus-visible{background:#e2e9eb;}
  .sp-body{overflow:auto;padding:4px 22px 6px;font-size:.95rem;line-height:1.55;}
  .sp-body p{margin:0 0 12px;}
  .sp-body a{color:#e85f3d;}
  .sp-label{display:block;font-weight:600;color:#123a4a;margin:12px 0 6px;font-size:.9rem;}
  .sp-body select,.sp-body textarea{width:100%;box-sizing:border-box;font:inherit;font-size:16px;color:#1d2b33;background:#fff;border:1.5px solid #cfdadd;border-radius:10px;padding:10px 12px;}
  .sp-body textarea{min-height:120px;resize:vertical;}
  .sp-body select:focus,.sp-body textarea:focus{outline:none;border-color:#1f8a8a;box-shadow:0 0 0 3px rgba(31,138,138,.15);}
  .sp-q{background:#f4f8f9;border-radius:10px;padding:10px 12px;font-size:.88rem;margin:0 0 4px;}
  .sp-q b{color:#123a4a;}
  .sp-q small{display:block;color:#5d7c89;margin-top:4px;}
  .sp-count{font-size:.78rem;color:#5d7c89;text-align:right;margin-top:4px;}
  .sp-note{font-size:.82rem;color:#5d7c89;background:#fdf6ec;border-radius:10px;padding:10px 12px;margin-top:12px;}
  .sp-note.safe{background:#eef6f3;}
  .sp-err{color:#c0392b;font-size:.88rem;margin-top:10px;}
  .sp-foot{display:flex;gap:10px;justify-content:flex-end;align-items:center;padding:12px 22px 18px;border-top:1px solid #eef2f3;}
  .sp-foot .sp-sent-btn{margin-left:auto;}
  .sp-btn{border:0;border-radius:999px;padding:10px 18px;font:600 .95rem Inter,system-ui,sans-serif;cursor:pointer;}
  .sp-btn.go{background:#ff7a59;color:#fff;} .sp-btn.go:hover{background:#e8643f;} .sp-btn.go:disabled{opacity:.6;cursor:default;}
  .sp-btn.no{background:#f1f4f5;color:#123a4a;} .sp-btn.no:hover{background:#e2e9eb;}
  .sp-done{text-align:center;padding:10px 0 6px;}
  .sp-done img{width:96px;height:auto;}
  .sp-done h3{margin:6px 0 6px;color:#123a4a;font:700 1.1rem "Plus Jakarta Sans",Inter,sans-serif;}
  @media (max-width:560px){
    .sp-panel{left:0;right:0;bottom:0;top:auto;width:100%;max-height:92vh;border-radius:18px 18px 0 0;transform:translateY(30px);}
    .sp-panel.on{transform:translateY(0);} .sp-foot{padding-bottom:calc(18px + env(safe-area-inset-bottom));}
  }`;
  document.head.appendChild(s);
}

// What device and browser, in words (for the admin, not shown to the user)
function deviceText() {
  const ua = navigator.userAgent || '';
  const os = /iPad|Macintosh.*Mobile|Macintosh.*Touch/.test(ua) && 'ontouchend' in document ? 'iPad'
    : /iPhone/.test(ua) ? 'iPhone' : /Android/.test(ua) ? 'Android' : /Windows/.test(ua) ? 'Windows'
    : /CrOS/.test(ua) ? 'Chromebook' : /Mac OS X|Macintosh/.test(ua) ? 'Mac' : /Linux/.test(ua) ? 'Linux' : 'Other';
  const br = /Edg\//.test(ua) ? 'Edge' : /OPR\//.test(ua) ? 'Opera' : /SamsungBrowser/.test(ua) ? 'Samsung Internet'
    : /CriOS|Chrome\//.test(ua) ? 'Chrome' : /FxiOS|Firefox\//.test(ua) ? 'Firefox' : /Safari\//.test(ua) ? 'Safari' : 'Other';
  const app = matchMedia('(display-mode: standalone)').matches || navigator.standalone ? ' (installed app)' : '';
  return `${os} · ${br}${app}`;
}

function pageContext() {
  let viewingAs = '';
  try { viewingAs = sessionStorage.getItem('clasp_viewAs') || ''; } catch (e) {}
  return {
    page: (location.pathname.split('/').pop() || 'index.html') + location.hash,
    url: location.href.slice(0, 500),
    title: document.title.replace(/^DEV · /, '').slice(0, 160),
    device: deviceText(),
    ua: (navigator.userAgent || '').slice(0, 300),
    screen: `${innerWidth}×${innerHeight}`,
    site: location.hostname,
    version: VERSION,
    viewingAs,
  };
}

let open = null;
function close() {
  if (!open) return;
  const { scrim, panel, onKey } = open;
  open = null;
  document.removeEventListener('keydown', onKey);
  scrim.classList.remove('on'); panel.classList.remove('on');
  setTimeout(() => { scrim.remove(); panel.remove(); }, 220);
}

// kind: 'help' | 'question'.  question: { packId, subjectId, topicId,
// questionId, packName, subjectName, topicName, type, text, right, yours, marks }
export async function openSupport({ kind = 'help', question = null, topic = '' } = {}) {
  close();
  addStyles();
  // On website pages the sign-in may still be loading when the button is pressed
  try { if (auth.authStateReady) await auth.authStateReady(); } catch (e) {}
  const user = auth.currentUser;
  const isQ = kind === 'question' && question;
  const scrim = document.createElement('div'); scrim.className = 'sp-scrim';
  const panel = document.createElement('div'); panel.className = 'sp-panel';
  panel.setAttribute('role', 'dialog'); panel.setAttribute('aria-modal', 'true'); panel.setAttribute('aria-labelledby', 'sp-title');
  const onKey = e => { if (e.key === 'Escape') close(); };
  open = { scrim, panel, onKey };
  scrim.onclick = close;
  document.addEventListener('keydown', onKey);

  const head = title => `<div class="sp-head"><h2 id="sp-title">${title}</h2><button class="sp-close" aria-label="Close">×</button></div>`;

  if (!user) {
    panel.innerHTML = head('Get help') + `<div class="sp-body">
      <p>Please <a href="login.html">sign in</a> to send us a message from the app, so we know which account it's about.</p>
      <p>Can't sign in? Try "Forgot your password?" on the sign-in page, or email us at <a href="mailto:${SUPPORT_EMAIL}">${SUPPORT_EMAIL}</a>.</p>
      <p>You may also find your answer in <a href="help.html">Help &amp; FAQs</a>.</p></div>
      <div class="sp-foot"><button class="sp-btn no" data-sp-close>Close</button></div>`;
    show(); return;
  }

  // Who's asking (for the note under the form)
  let profile = {};
  try { profile = (await getDoc(doc(db, 'users', user.uid))).data() || {}; } catch (e) {}
  const roles = [...new Set([...(profile.roles || []), profile.role].filter(Boolean))];
  const student = roles.includes('student') && !roles.some(r => ['parent', 'teacher', 'admin'].includes(r));

  const topics = isQ ? QUESTION_TOPICS : HELP_TOPICS;
  const qBox = isQ ? `<div class="sp-q"><b>${esc(question.text || 'This question')}</b>
      <small>${esc([question.subjectName, question.topicName].filter(Boolean).join(' › '))}${question.right ? ` · Answer given: ${esc(String(question.right).slice(0, 160))}` : ''}</small></div>` : '';
  panel.innerHTML = head(isQ ? 'Report this question' : 'Get help') + `<div class="sp-body">
    ${isQ ? `<p>Thanks for telling us. We'll check it and fix it if it's wrong.</p>${qBox}` : `<p>Tell us what's up and we'll get back to you by email, usually within two working days.</p>`}
    <label class="sp-label" for="sp-topic">${isQ ? "What's wrong with it?" : 'What is it about?'}</label>
    <select id="sp-topic">${topics.map(([k, v]) => `<option value="${k}"${k === topic ? ' selected' : ''}>${esc(v)}</option>`).join('')}</select>
    <label class="sp-label" for="sp-msg">${isQ ? 'Anything to add? (optional)' : 'Your message'}</label>
    <textarea id="sp-msg" maxlength="2000" placeholder="${isQ ? 'For example, what the right answer should be' : 'What happened, and what were you trying to do?'}"></textarea>
    <div class="sp-count"><span id="sp-n">0</span>/2000</div>
    ${student
      ? `<div class="sp-note safe">Please don't include your address, phone number or passwords. If you're worried about something that isn't about Lobe Limpet, talk to a parent, teacher or another adult you trust, or call Childline free on 0800 1111.</div>`
      : `<div class="sp-note">We'll reply to ${esc(user.email || 'the email on your account')}. Your account number${profile.accountNo ? ` (${esc(profile.accountNo)})` : ''} and the page you're on are sent with your message to help us find the problem.</div>`}
    <div class="sp-err" id="sp-err" hidden></div></div>
    <div class="sp-foot"><button class="sp-btn no" data-sp-close>Cancel</button><button class="sp-btn go" id="sp-send">Send</button></div>`;
  show();

  const msg = panel.querySelector('#sp-msg');
  msg.oninput = () => { panel.querySelector('#sp-n').textContent = msg.value.length; };
  if (!isQ) setTimeout(() => msg.focus(), 250);
  panel.querySelector('#sp-send').onclick = async () => {
    const btn = panel.querySelector('#sp-send');
    const err = panel.querySelector('#sp-err');
    const text = msg.value.trim();
    const cat = panel.querySelector('#sp-topic').value;
    err.hidden = true;
    if (!isQ && text.length < 5) { err.textContent = 'Please tell us a little about it first.'; err.hidden = false; msg.focus(); return; }
    btn.disabled = true; btn.textContent = 'Sending…';
    try {
      await saveRequest({ user, profile, roles, kind: isQ ? 'question' : 'help', category: isQ ? 'q-' + cat : cat, message: text, question: isQ ? question : null });
      panel.querySelector('.sp-body').innerHTML = `<div class="sp-done"><img src="assets/images/brand/mascot/limpet-mail.svg?v=${VERSION}" alt="">
        <h3>${isQ ? 'Thanks, report sent' : 'Message sent'}</h3>
        <p>${isQ ? "We'll take a look at that question." : `We'll reply to ${esc(user.email || 'your email')} as soon as we can.`}</p></div>`;
      panel.querySelector('.sp-foot').innerHTML = `<button class="sp-btn go sp-sent-btn" data-sp-close>Done</button>`;
      wireClose();
    } catch (e) {
      btn.disabled = false; btn.textContent = 'Send';
      const limited = /permission|insufficient/i.test(e?.message || e?.code || '');
      err.innerHTML = limited
        ? `That didn't send. If you've just sent one, wait a minute and try again, or email <a href="mailto:${SUPPORT_EMAIL}">${SUPPORT_EMAIL}</a>.`
        : `That didn't send (${esc(e?.message || 'no connection')}). Please try again, or email <a href="mailto:${SUPPORT_EMAIL}">${SUPPORT_EMAIL}</a>.`;
      err.hidden = false;
    }
  };

  function wireClose() { panel.querySelectorAll('.sp-close,[data-sp-close]').forEach(b => b.onclick = close); }
  function show() {
    document.body.append(scrim, panel);
    wireClose();
    requestAnimationFrame(() => { scrim.classList.add('on'); panel.classList.add('on'); });
  }
}

async function saveRequest({ user, profile, roles, kind, category, message, question }) {
  const limRef = doc(db, 'supportLimits', user.uid);
  const today = Math.floor(Date.now() / DAY);
  const lim = (await getDoc(limRef).catch(() => null))?.data();
  const count = lim && lim.day === today ? (lim.count || 0) + 1 : 1;
  if (count > 20) throw new Error("You've sent a lot of messages today. Please email us instead");
  const q = question ? Object.fromEntries(Object.entries({
    packId: question.packId, subjectId: question.subjectId, topicId: question.topicId, questionId: question.questionId,
    packName: question.packName, subjectName: question.subjectName, topicName: question.topicName, type: question.type,
    text: question.text, right: question.right, yours: question.yours, marks: question.marks,
  }).filter(([, v]) => v != null && v !== '').map(([k, v]) => [k, String(v).slice(0, 1000)])) : null;

  const b = writeBatch(db);
  b.set(limRef, { at: serverTimestamp(), day: today, count });
  b.set(doc(collection(db, 'supportRequests')), {
    uid: user.uid,
    at: serverTimestamp(),
    expireAt: Timestamp.fromMillis(Date.now() + 365 * DAY),
    status: 'new',
    kind, category, message,
    name: String(profile.name || '').slice(0, 120),
    email: String(user.email || profile.email || '').slice(0, 200),
    accountNo: String(profile.accountNo || ''),
    roles: roles.slice(0, 5),
    ctx: pageContext(),
    ...(q ? { question: q } : {}),
  });
  await b.commit();
}
