// ============================================================
// LOBE LIMPET: Account settings (parents, teachers, admins)
// Opened from your name at the bottom of the sidebar. Holds your
// details, password reset, plan, terms, and (at the very bottom, out
// of the way) deleting your account.
// ============================================================

import { auth } from './firebase-config.js?v=20261113v';
import { hasPlus, hasFamilyPlus, aiTrialLeft, trialSheetsText, viewsOf } from './auth.js?v=20261113v';
import { openDeleteAccount } from './account.js?v=20261113v';
import { formatAccountNo } from './account-no.js?v=20261113v';
import { sendPasswordResetEmail } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";

const esc = s => String(s ?? '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
const ROLE = { admin: 'Admin', teacher: 'Teacher', parent: 'Parent', student: 'Student' };
// The site owner (same as the security rules and the AI Worker, which refuses to delete it)
const OWNER_UID = '0hFoAiW9YFhqk2BovndPnoT1Ul22';
const dateText = ms => new Date(ms).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' });

export function openAccountSettings({ user, profile = {} } = {}) {
  if (!user) return;
  document.getElementById('acct-set')?.remove();
  injectStyle();
  const isAdmin = user.uid === OWNER_UID || viewsOf(profile).includes('admin');
  const roles = viewsOf(profile).map(v => ROLE[v] || v).join(', ') || 'Account';
  const email = profile.email || user.email || '';
  const plus = hasPlus(profile);
  const trial = aiTrialLeft(profile);
  const plan = plus
    ? `<strong>Plus</strong>${hasFamilyPlus(profile) ? ' (through your family)' : viewsOf(profile).includes('admin') && profile.tier !== 'plus' ? ' (included as an admin)' : ''}`
    : `<strong>Free</strong>${trial > 0 ? ` · free try of creating with AI: about ${trialSheetsText(profile)} left` : ''} · <a href="plus.html">See Plus</a>`;
  const terms = profile.terms?.at
    ? `You agreed to the <a href="terms.html" target="_blank" rel="noopener">Terms of use</a> on ${dateText(profile.terms.at)}.`
    : `Read the <a href="terms.html" target="_blank" rel="noopener">Terms of use</a>.`;

  document.body.insertAdjacentHTML('beforeend', `
    <div class="as-overlay" id="acct-set" role="dialog" aria-modal="true" aria-labelledby="as-title">
      <div class="as-box">
        <div class="as-head">
          <h2 id="as-title">Account settings</h2>
          <button class="as-x" aria-label="Close">✕</button>
        </div>

        <section class="as-sec">
          <h3>Your details</h3>
          <dl class="as-dl">
            <dt>Name</dt><dd>${esc(profile.name || user.displayName || '')}</dd>
            <dt>Email</dt><dd>${esc(email)}</dd>
            <dt>Roles</dt><dd>${esc(roles)}</dd>
            ${profile.accountNo ? `<dt>Account no.</dt><dd><span class="as-no">${esc(formatAccountNo(profile.accountNo))}</span> <button class="as-copy" id="as-copy" title="Copy">Copy</button></dd>` : ''}
          </dl>
          <p class="as-hint">${profile.accountNo ? 'Quote your account number if you contact us. ' : ''}To change your name or email, <a href="contact.html" target="_blank" rel="noopener">contact us</a> from this email address.</p>
        </section>

        <section class="as-sec">
          <h3>Password</h3>
          <p class="as-hint">We'll email you a link to set a new password.</p>
          <button class="btn btn-secondary" id="as-reset">Email me a reset link</button>
          <span class="as-msg" id="as-reset-msg" role="status"></span>
        </section>

        <section class="as-sec">
          <h3>Your plan</h3>
          <p>${plan}</p>
        </section>

        <section class="as-sec">
          <h3>Terms and privacy</h3>
          <p>${terms} How we look after your details: <a href="privacy.html" target="_blank" rel="noopener">Privacy notice</a>.</p>
        </section>

        ${isAdmin ? `<section class="as-sec">
          <h3>Delete account</h3>
          <p class="as-hint">${user.uid === OWNER_UID
            ? "This is the site owner's account, so it can't be deleted."
            : "Admin accounts can't be deleted here. Ask the site owner to remove your admin role first."}</p>
        </section>` : `<section class="as-sec as-danger">
          <h3>Delete account</h3>
          <p>Permanently deletes your sign-in, your progress and any revision packs you made. Students you look after must be removed first, unless another parent also looks after them. This can't be undone.</p>
          <button class="as-del" id="as-delete">Delete my account…</button>
        </section>`}
      </div>
    </div>`);

  const box = document.getElementById('acct-set');
  const close = () => { box.remove(); document.removeEventListener('keydown', onKey); };
  const onKey = e => { if (e.key === 'Escape') close(); };
  document.addEventListener('keydown', onKey);
  box.querySelector('.as-x').onclick = close;
  box.addEventListener('click', e => { if (e.target === box) close(); });
  box.querySelector('.as-x').focus();

  document.getElementById('as-copy')?.addEventListener('click', e => {
    navigator.clipboard?.writeText(formatAccountNo(profile.accountNo)).then(() => { e.target.textContent = 'Copied'; }).catch(() => {});
  });
  const reset = document.getElementById('as-reset'), rmsg = document.getElementById('as-reset-msg');
  reset.onclick = async () => {
    if (!email) { rmsg.textContent = 'No email address on this account.'; return; }
    reset.disabled = true; rmsg.textContent = 'Sending…';
    try { await sendPasswordResetEmail(auth, email); rmsg.textContent = `Sent to ${email}. Check your inbox (and spam).`; }
    catch (e) { rmsg.textContent = `Couldn't send it: ${e.message}`; reset.disabled = false; }
  };
  const del = document.getElementById('as-delete');
  if (del) del.onclick = () => { close(); openDeleteAccount({ uid: user.uid, name: profile.name || '', self: true }); };
}

function injectStyle() {
  if (document.getElementById('as-style')) return;
  document.head.insertAdjacentHTML('beforeend', `<style id="as-style">
  .as-overlay { position: fixed; inset: 0; z-index: 2900; background: rgba(10,12,20,0.5); display: flex; align-items: flex-start; justify-content: center; padding: 6vh 14px; overflow-y: auto; }
  .as-box { background: var(--color-surface, #fff); color: var(--color-text, #111); border-radius: 18px; width: 100%; max-width: 520px; box-shadow: 0 20px 60px rgba(0,0,0,0.25); padding: 8px 22px 20px; font-family: var(--font-body, system-ui); }
  .as-head { display: flex; justify-content: space-between; align-items: center; padding: 12px 0 4px; }
  .as-head h2 { font-family: var(--font-heading, system-ui); font-size: 1.25rem; margin: 0; }
  .as-x { background: none; border: 0; font-size: 1.1rem; cursor: pointer; color: var(--color-text-muted); padding: 4px 8px; }
  .as-sec { border-top: 1px solid var(--color-border); padding: 14px 0; }
  .as-sec h3 { font-family: var(--font-ui, system-ui); font-size: 0.8rem; text-transform: uppercase; letter-spacing: 0.05em; color: var(--color-text-muted); margin: 0 0 8px; }
  .as-sec p { font-size: 0.9rem; line-height: 1.5; margin: 0 0 8px; }
  .as-sec a { color: var(--color-primary); }
  .as-no { font-family: ui-monospace, SFMono-Regular, Menlo, monospace; letter-spacing: 0.04em; }
  .as-copy { background: none; border: 1px solid var(--color-border); border-radius: 999px; padding: 1px 8px; font: inherit; font-size: 0.75rem; cursor: pointer; color: var(--color-text-muted); margin-left: 4px; }
  .as-dl { display: grid; grid-template-columns: 90px 1fr; gap: 4px 12px; margin: 0 0 6px; font-size: 0.92rem; }
  .as-dl dt { color: var(--color-text-muted); } .as-dl dd { margin: 0; word-break: break-word; }
  .as-hint { color: var(--color-text-muted); font-size: 0.82rem !important; }
  .as-msg { display: inline-block; margin-left: 10px; font-size: 0.85rem; color: var(--color-text-muted); }
  .as-danger { border: 1px solid color-mix(in srgb, var(--color-danger, #c0392b) 45%, transparent); border-radius: 12px; padding: 14px; margin-top: 10px; }
  .as-danger h3 { color: var(--color-danger, #c0392b); }
  .as-del { background: none; border: 1px solid var(--color-danger, #c0392b); color: var(--color-danger, #c0392b); border-radius: 999px; padding: 8px 16px; font: inherit; font-weight: 600; font-size: 0.88rem; cursor: pointer; }
  .as-del:hover { background: color-mix(in srgb, var(--color-danger, #c0392b) 10%, transparent); }
  </style>`);
}
