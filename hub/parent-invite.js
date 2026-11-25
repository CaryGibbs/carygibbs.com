// ============================================================
// LOBE LIMPET: Invite a parent (students)
// A student makes a link (AI Worker, action parentInvite: lasts 14 days,
// works once) and sends it by WhatsApp, text or email. The parent opens
// login.html?parent=CODE, signs up or signs in as a parent, and is linked
// straight away (the student asked, so there's no accept step). Then
// they can see progress and, if asked, get Family Plus.
//   openInviteParent({ why })   why 'plus' takes the parent to Pricing after
//   inviteParentCardHtml(...)    a small card for the hub
// ============================================================

import { workerAction } from './ai.js?v=20261125a';

const esc = s => String(s ?? '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

export async function openInviteParent({ why = '' } = {}) {
  document.getElementById('inv-parent')?.remove();
  injectStyle();
  document.body.insertAdjacentHTML('beforeend', `
    <div class="ip-overlay" id="inv-parent" role="dialog" aria-modal="true" aria-labelledby="ip-title">
      <div class="ip-box">
        <div class="ip-head"><h2 id="ip-title">Invite a parent or carer</h2><button class="ip-x" aria-label="Close">✕</button></div>
        <p class="ip-hint">${why === 'plus'
          ? 'Send this link to a parent or carer. When they join, they can get Family Plus for you, and see how your revision is going.'
          : 'Send this link to a parent or carer. When they join, they can see how your revision is going and help you plan it.'}</p>
        <p class="ip-hint">Only send it to your own parent or carer. It works once, for 14 days.</p>
        <div class="ip-link" id="ip-link">Making your link…</div>
        <div class="ip-row" id="ip-row" hidden>
          <button class="btn btn-primary" id="ip-share">Share</button>
          <a class="btn btn-secondary" id="ip-wa" target="_blank" rel="noopener">WhatsApp</a>
          <button class="btn btn-ghost" id="ip-copy">Copy link</button>
        </div>
        <p class="ip-msg" id="ip-msg" role="status"></p>
      </div>
    </div>`);
  const box = document.getElementById('inv-parent');
  const close = () => box.remove();
  box.querySelector('.ip-x').onclick = close;
  box.addEventListener('click', e => { if (e.target === box) close(); });
  try {
    const r = await workerAction('parentInvite', { why });
    const text = why === 'plus'
      ? `Hi! I'm revising with Lobe Limpet. Please could you join, so you can see how I'm getting on and get Family Plus for me? ${r.link}`
      : `Hi! I'm revising with Lobe Limpet. Please could you join, so you can see how I'm getting on? ${r.link}`;
    document.getElementById('ip-link').textContent = r.link;
    document.getElementById('ip-row').hidden = false;
    document.getElementById('ip-wa').href = `https://wa.me/?text=${encodeURIComponent(text)}`;
    const share = document.getElementById('ip-share');
    if (!navigator.share) share.hidden = true;
    share.onclick = () => navigator.share({ title: 'Lobe Limpet', text }).catch(() => {});
    document.getElementById('ip-copy').onclick = () => navigator.clipboard?.writeText(text)
      .then(() => { document.getElementById('ip-msg').textContent = 'Copied. Paste it into a message to your parent or carer.'; })
      .catch(() => { document.getElementById('ip-msg').textContent = 'Copy the link above.'; });
  } catch (e) {
    document.getElementById('ip-link').textContent = '';
    document.getElementById('ip-msg').textContent = e.message || "The link couldn't be made. Please try again.";
  }
}

// Card for the student hub. trialLeft: days left (13 to 15s waiting for a parent), or null
export function inviteParentCardHtml({ trialLeft = null } = {}) {
  injectStyle();
  return `<div class="ip-card" id="ip-card">
    <div><strong>${trialLeft !== null ? `Invite a parent to keep using Lobe Limpet` : 'Invite a parent or carer'}</strong>
    <span>${trialLeft !== null
      ? `Under 16s need a parent or carer linked to their account. ${trialLeft > 0 ? `${trialLeft} day${trialLeft === 1 ? '' : 's'} left to try it in the meantime.` : ''}`
      : 'They can see how you\'re getting on, help you plan, and get Family Plus for you.'}</span></div>
    <button class="btn btn-primary" data-invite-parent>Invite a parent</button>
  </div>`;
}

// Full-page stop for 13 to 15s whose week has run out
export function inviteParentGateHtml(first) {
  injectStyle();
  return `<div class="ip-gate">
    <h2>Nearly there${first ? `, ${esc(first)}` : ''}!</h2>
    <p>To keep using Lobe Limpet, under 16s need a parent or carer linked to their account. Send them a link: when they join, you can carry on straight away, with everything you've done so far.</p>
    <button class="btn btn-primary" data-invite-parent>Invite a parent or carer</button>
    <p class="ip-hint" style="margin-top:14px;">Already sent it? Ask them to open the link and create a parent account, then refresh this page.</p>
  </div>`;
}

function injectStyle() {
  if (document.getElementById('ip-style')) return;
  document.head.insertAdjacentHTML('beforeend', `<style id="ip-style">
  .ip-overlay { position: fixed; inset: 0; z-index: 3300; background: rgba(10,12,20,0.5); display: flex; align-items: flex-start; justify-content: center; padding: 10vh 14px; overflow-y: auto; }
  .ip-box { background: var(--color-surface, #fff); color: var(--color-text, #111); border-radius: 18px; width: 100%; max-width: 460px; box-shadow: 0 20px 60px rgba(0,0,0,0.25); padding: 8px 22px 20px; }
  .ip-head { display: flex; justify-content: space-between; align-items: center; padding: 12px 0 6px; }
  .ip-head h2 { font-size: 1.2rem; margin: 0; }
  .ip-x { background: none; border: 0; font-size: 1.1rem; cursor: pointer; color: var(--color-text-muted); }
  .ip-hint { color: var(--color-text-muted); font-size: 0.88rem; line-height: 1.5; margin: 0 0 10px; }
  .ip-link { background: var(--color-surface-2, #f3f6f7); border-radius: 10px; padding: 10px 12px; font-size: 0.85rem; word-break: break-all; margin: 6px 0 12px; }
  .ip-row { display: flex; gap: 8px; flex-wrap: wrap; }
  .ip-row .btn { text-decoration: none; }
  .ip-msg { font-size: 0.85rem; color: var(--color-text-muted); margin: 10px 0 0; }
  .ip-card { display: flex; gap: 14px; align-items: center; justify-content: space-between; flex-wrap: wrap; background: var(--color-surface); border: 2px solid var(--color-primary); border-radius: var(--radius-card, 16px); padding: 14px 18px; margin-bottom: var(--space-lg, 20px); }
  .ip-card strong { display: block; margin-bottom: 2px; }
  .ip-card span { color: var(--color-text-muted); font-size: 0.88rem; }
  .ip-gate { max-width: 480px; margin: 12vh auto; text-align: center; padding: 28px 22px; background: var(--color-surface); border-radius: 18px; }
  .ip-gate h2 { margin: 0 0 10px; }
  .ip-gate p { color: var(--color-text-muted); line-height: 1.55; }
  </style>`);
}

// Any [data-invite-parent] button on the page opens it
document.addEventListener('click', e => {
  const b = e.target.closest('[data-invite-parent]');
  if (b) { e.preventDefault(); openInviteParent({ why: b.dataset.why || '' }); }
});
