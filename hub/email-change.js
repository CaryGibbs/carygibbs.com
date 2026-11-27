// ============================================================
// LOBE LIMPET: changing an account's sign-in email
// Anyone can change their own (Account settings, or a student's Profile).
// The parent or teacher who made a student's account, and admins, can
// change it from Password and email help (password-help.js).
// The AI Worker (emailChangeStart) checks who's allowed and emails a
// confirm link to the NEW address; nothing changes until it's tapped
// (confirm-email.html). The old address, and a student's parents, are told.
// ============================================================

import { workerAction } from './ai.js?v=20261127a';

const esc = s => String(s ?? '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
const VALID = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// The form: a new email box, a button and a message line
export function emailChangeFormHtml(id = 'ec') {
  return `<div class="ec-row">
      <input type="email" id="${id}-new" placeholder="New email address" autocomplete="email" spellcheck="false" maxlength="200">
      <button class="btn btn-primary" id="${id}-go" type="button">Send link</button>
    </div>
    <span class="ec-msg" id="${id}-msg" role="status"></span>`;
}

// Wire up a form made with emailChangeFormHtml
export function wireEmailChangeForm({ id = 'ec', uid, email = '', name = '', self = false } = {}) {
  const input = document.getElementById(`${id}-new`), go = document.getElementById(`${id}-go`), msg = document.getElementById(`${id}-msg`);
  if (!input || !go) return;
  injectStyle();
  const first = (name || '').trim().split(/\s+/)[0] || 'they';
  const send = async () => {
    const next = input.value.trim().toLowerCase();
    msg.className = 'ec-msg';
    if (!VALID.test(next)) { msg.textContent = 'Please enter a valid email address.'; input.focus(); return; }
    if (next === String(email).trim().toLowerCase()) { msg.textContent = 'That is already the email for this account.'; return; }
    go.disabled = true; msg.textContent = 'Sending…';
    try {
      const r = await workerAction('emailChangeStart', { uid, newEmail: next });
      msg.className = 'ec-msg ok';
      msg.innerHTML = self
        ? `Nearly done. We've emailed <strong>${esc(r.sentTo)}</strong> a link to confirm (it works for ${r.hours || 24} hours). Until you tap it, keep signing in with ${esc(email)}. Check spam if it hasn't arrived in a few minutes.`
        : `We've emailed <strong>${esc(r.sentTo)}</strong> a link to confirm (it works for ${r.hours || 24} hours). The change happens when ${esc(first)} (or whoever reads that inbox) taps it. Until then, ${esc(first)} keeps signing in with ${esc(email)}.`;
      input.value = '';
    } catch (e) { msg.className = 'ec-msg err'; msg.textContent = e.message; }
    finally { go.disabled = false; }
  };
  go.onclick = send;
  input.onkeydown = e => { if (e.key === 'Enter') { e.preventDefault(); send(); } };
}

// A small window, for changing your own email
export function openEmailChange({ uid, email = '', name = '', self = true } = {}) {
  document.getElementById('ec-box')?.remove();
  injectStyle();
  document.body.insertAdjacentHTML('beforeend', `
    <div class="ec-overlay" id="ec-box" role="dialog" aria-modal="true" aria-labelledby="ec-title">
      <div class="ec-dialog">
        <div class="ec-head"><h2 id="ec-title">Change ${self ? 'your' : 'their'} email</h2><button class="ec-x" aria-label="Close">✕</button></div>
        <p class="ec-hint">${self ? 'You' : esc(name || 'They')} sign in with <strong>${esc(email || 'no email yet')}</strong>.
          We'll send a link to the new address to make sure it's right. Your password stays the same.</p>
        ${emailChangeFormHtml('ecd')}
      </div>
    </div>`);
  const box = document.getElementById('ec-box');
  const close = () => { box.remove(); document.removeEventListener('keydown', onKey); };
  const onKey = e => { if (e.key === 'Escape') close(); };
  document.addEventListener('keydown', onKey);
  box.querySelector('.ec-x').onclick = close;
  box.addEventListener('click', e => { if (e.target === box) close(); });
  wireEmailChangeForm({ id: 'ecd', uid, email, name, self });
  document.getElementById('ecd-new').focus();
}

function injectStyle() {
  if (document.getElementById('ec-style')) return;
  document.head.insertAdjacentHTML('beforeend', `<style id="ec-style">
  .ec-overlay { position: fixed; inset: 0; z-index: 3300; background: rgba(10,12,20,0.5); display: flex; align-items: flex-start; justify-content: center; padding: 8vh 14px; overflow-y: auto; }
  .ec-dialog { background: var(--color-surface, #fff); color: var(--color-text, #111); border-radius: 18px; width: 100%; max-width: 460px; box-shadow: 0 20px 60px rgba(0,0,0,0.25); padding: 8px 22px 20px; font-family: var(--font-body, system-ui); }
  .ec-head { display: flex; justify-content: space-between; align-items: center; padding: 12px 0 4px; gap: 10px; }
  .ec-head h2 { font-family: var(--font-heading, system-ui); font-size: 1.15rem; margin: 0; }
  .ec-x { background: none; border: 0; font-size: 1.1rem; cursor: pointer; color: var(--color-text-muted); padding: 4px 8px; }
  .ec-hint { color: var(--color-text-muted, #666); font-size: 0.86rem; line-height: 1.45; margin: 0 0 12px; }
  .ec-row { display: flex; gap: 8px; flex-wrap: wrap; }
  .ec-row input { flex: 1; min-width: 180px; padding: 9px 11px; border: 1px solid var(--color-border, #ddd); border-radius: 8px; font: inherit; background: var(--color-surface, #fff); color: var(--color-text, #111); }
  .ec-msg { display: block; margin-top: 8px; font-size: 0.86rem; line-height: 1.45; color: var(--color-text-muted, #666); }
  .ec-msg.ok { color: var(--color-text, #111); }
  .ec-msg.err { color: var(--color-danger, #c0392b); }
  .ec-link { background: none; border: 1px solid var(--color-border, #ddd); border-radius: 999px; padding: 1px 9px; font: inherit; font-size: 0.75rem; cursor: pointer; color: var(--color-text-muted); margin-left: 6px; }
  </style>`);
}
