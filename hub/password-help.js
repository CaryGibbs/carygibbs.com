// ============================================================
// LOBE LIMPET: helping someone with their password
// Used by Admin → Users, a parent's Manage student and a teacher's class list.
//   Email a reset link: anyone can be sent one (the same email as "Forgot
//   password?" on the sign-in page), sent by the Worker (mail.js), or by Firebase as a fallback.
//   Set a new password: done by the AI Worker (action setPassword), which
//   allows admins (only the owner for other admins), and the parent or
//   teacher who made a student's account. Logged in the activity log.
// ============================================================

import { auth } from './firebase-config.js?v=20261126j';
import { sendPasswordEmail } from './mail.js?v=20261126j';
import { workerAction } from './ai.js?v=20261126j';
import { generatePassword } from './auth.js?v=20261126j';
import { logEvent } from './log.js?v=20261126j';

const esc = s => String(s ?? '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

// uid, name, email: whose password. canSet: show "Set a new password"
// (the Worker checks again). note: an extra line, e.g. why setting isn't offered.
export function openPasswordHelp({ uid, name = '', email = '', canSet = true, note = '' } = {}) {
  document.getElementById('pw-help')?.remove();
  injectStyle();
  const first = (name || 'them').split(' ')[0];
  document.body.insertAdjacentHTML('beforeend', `
    <div class="pwh-overlay" id="pw-help" role="dialog" aria-modal="true" aria-labelledby="pwh-title">
      <div class="pwh-box">
        <div class="pwh-head"><h2 id="pwh-title">Password: ${esc(name || email)}</h2><button class="pwh-x" aria-label="Close">✕</button></div>
        <p class="pwh-hint">Signs in as <strong>${esc(email || 'no email on this account')}</strong></p>

        <section class="pwh-sec">
          <h3>Email a reset link</h3>
          <p class="pwh-hint">We'll email ${esc(first)} a link to choose a new password. Best if they can get to that inbox.</p>
          <button class="btn btn-secondary" id="pwh-send" ${email ? '' : 'disabled'}>Email a reset link</button>
          <span class="pwh-msg" id="pwh-send-msg" role="status"></span>
        </section>

        ${canSet ? `<section class="pwh-sec">
          <h3>Or set a new password</h3>
          <p class="pwh-hint">For when ${esc(first)} can't get to their email. Give them the new password yourself. They'll be signed out on their other devices.</p>
          <div class="pwh-row">
            <input type="text" id="pwh-pw" placeholder="At least 8 characters" autocomplete="off" spellcheck="false" maxlength="128">
            <button class="btn btn-ghost" id="pwh-gen" type="button">Generate</button>
          </div>
          <button class="btn btn-primary" id="pwh-set">Set password</button>
          <span class="pwh-msg" id="pwh-set-msg" role="status"></span>
        </section>` : ''}
        ${note ? `<p class="pwh-hint" style="margin-top:10px;">${note}</p>` : ''}
      </div>
    </div>`);
  const box = document.getElementById('pw-help');
  const close = () => { box.remove(); document.removeEventListener('keydown', onKey); };
  const onKey = e => { if (e.key === 'Escape') close(); };
  document.addEventListener('keydown', onKey);
  box.querySelector('.pwh-x').onclick = close;
  box.addEventListener('click', e => { if (e.target === box) close(); });

  const send = document.getElementById('pwh-send'), smsg = document.getElementById('pwh-send-msg');
  send.onclick = async () => {
    send.disabled = true; smsg.textContent = 'Sending…';
    try {
      const how = await sendPasswordEmail(email);
      smsg.textContent = how === 'ours' ? `Sent to ${email}. The link works for an hour and can take a few minutes to arrive (check spam).` : `Sent to ${email}. It may say "reset your password" and can take a few minutes (check spam).`;
      logEvent('account.reset_sent', { target: name || email, targetId: uid });
    } catch (e) { smsg.textContent = `Couldn't send it: ${e.message}`; send.disabled = false; }
  };

  if (!canSet) return;
  const pw = document.getElementById('pwh-pw'), set = document.getElementById('pwh-set'), msg = document.getElementById('pwh-set-msg');
  document.getElementById('pwh-gen').onclick = () => { pw.value = generatePassword(); pw.focus(); pw.select(); };
  set.onclick = async () => {
    const value = pw.value.trim();
    if (value.length < 8) { msg.textContent = 'Use at least 8 characters.'; return; }
    set.disabled = true; msg.textContent = 'Setting…';
    try {
      await workerAction('setPassword', { uid, password: value });
      msg.innerHTML = `Done. ${esc(first)} can now sign in with <strong class="pwh-new">${esc(value)}</strong> <button class="pwh-copy" type="button">Copy</button>`;
      msg.querySelector('.pwh-copy').onclick = e => navigator.clipboard?.writeText(value).then(() => { e.target.textContent = 'Copied'; }).catch(() => {});
      pw.value = '';
    } catch (e) { msg.textContent = e.message; }
    finally { set.disabled = false; }
  };
}

function injectStyle() {
  if (document.getElementById('pwh-style')) return;
  document.head.insertAdjacentHTML('beforeend', `<style id="pwh-style">
  .pwh-overlay { position: fixed; inset: 0; z-index: 3200; background: rgba(10,12,20,0.5); display: flex; align-items: flex-start; justify-content: center; padding: 8vh 14px; overflow-y: auto; }
  .pwh-box { background: var(--color-surface, #fff); color: var(--color-text, #111); border-radius: 18px; width: 100%; max-width: 480px; box-shadow: 0 20px 60px rgba(0,0,0,0.25); padding: 8px 22px 20px; font-family: var(--font-body, system-ui); }
  .pwh-head { display: flex; justify-content: space-between; align-items: center; padding: 12px 0 2px; gap: 10px; }
  .pwh-head h2 { font-family: var(--font-heading, system-ui); font-size: 1.15rem; margin: 0; }
  .pwh-x { background: none; border: 0; font-size: 1.1rem; cursor: pointer; color: var(--color-text-muted); padding: 4px 8px; }
  .pwh-sec { border-top: 1px solid var(--color-border, #e5e5e5); padding: 14px 0 6px; margin-top: 10px; }
  .pwh-sec h3 { font-family: var(--font-ui, system-ui); font-size: 0.8rem; text-transform: uppercase; letter-spacing: 0.05em; color: var(--color-text-muted); margin: 0 0 6px; }
  .pwh-hint { color: var(--color-text-muted, #666); font-size: 0.85rem; line-height: 1.45; margin: 0 0 10px; }
  .pwh-row { display: flex; gap: 8px; margin-bottom: 10px; }
  .pwh-row input { flex: 1; min-width: 0; padding: 9px 11px; border: 1px solid var(--color-border, #ddd); border-radius: 8px; font: inherit; font-family: ui-monospace, SFMono-Regular, Menlo, monospace; background: var(--color-surface, #fff); color: var(--color-text, #111); }
  .pwh-msg { display: block; margin-top: 8px; font-size: 0.86rem; color: var(--color-text-muted, #666); }
  .pwh-new { font-family: ui-monospace, SFMono-Regular, Menlo, monospace; color: var(--color-text, #111); }
  .pwh-copy { background: none; border: 1px solid var(--color-border, #ddd); border-radius: 999px; padding: 1px 8px; font: inherit; font-size: 0.75rem; cursor: pointer; color: var(--color-text-muted); margin-left: 4px; }
  </style>`);
}
