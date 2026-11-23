// ============================================================
// LOBE LIMPET: Account settings (parents, teachers, admins)
// Opened from your name at the bottom of the sidebar. Holds your
// details, password reset, plan, terms, and (at the very bottom, out
// of the way) deleting your account.
// ============================================================

import { auth, db } from './firebase-config.js?v=20261123g';
import { doc, updateDoc } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";
import { workerAction } from './ai.js?v=20261123g';
import { hasPlus, hasFamilyPlus, aiTrialLeft, trialSheetsText, viewsOf } from './auth.js?v=20261123g';
import { openDeleteAccount } from './account.js?v=20261123g';
import { formatAccountNo } from './account-no.js?v=20261123g';
import { getBilling, getPricing, paidPlus, giftOf, gbp, dateText as shortDate, openBillingPortal } from './billing.js?v=20261123g';
import { sendPasswordEmail } from './mail.js?v=20261123g';

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
  const isParent = viewsOf(profile).includes('parent');
  const isTeacher = viewsOf(profile).includes('teacher');
  const weeklyOn = profile.emailPrefs?.weekly !== false;
  const classOn = profile.emailPrefs?.teacherWeekly !== false;
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
          <p id="as-plan">${plan}</p>
          <span class="as-msg" id="as-plan-msg" role="status"></span>
        </section>

        <section class="as-sec" id="as-emails">
          <h3>Emails</h3>
          <label class="as-check"><input type="checkbox" id="as-news" ${profile.emailPrefs?.news ? 'checked' : ''}>
            <span>Occasional news and revision tips<small>About once a month at most. Account emails, like password links, always come.</small></span></label>
          <span class="as-msg" id="as-news-msg" role="status"></span>
          ${isParent ? `<label class="as-check" style="margin-top:10px;"><input type="checkbox" id="as-weekly" ${weeklyOn ? 'checked' : ''}>
            <span>Weekly summary of your students' revision<small>Sundays at 6pm: time spent, quiz scores, topics to revisit.</small></span></label>
          <span class="as-msg" id="as-weekly-msg" role="status"></span>` : ''}
          ${isTeacher ? `<label class="as-check" style="margin-top:10px;"><input type="checkbox" id="as-class" ${classOn ? 'checked' : ''}>
            <span>Weekly summary of your classes<small>Sundays at 6pm: who's revising, who's gone quiet, topics the class found hardest.</small></span></label>
          <span class="as-msg" id="as-class-msg" role="status"></span>` : ''}
          ${isAdmin ? `<p class="as-hint" style="margin-top:10px;">Admin: send yourself this week's summary for your own students, as it would look on Sunday.</p>
          <button class="btn btn-secondary" id="as-weekly-preview">Email me a preview</button>
          <span class="as-msg" id="as-preview-msg" role="status"></span>
          <p class="as-hint" style="margin-top:10px;">The teachers' Sunday class summary, for your own classes.</p>
          <button class="btn btn-secondary" id="as-class-preview">Email me a class summary preview</button>
          <span class="as-msg" id="as-class-prev-msg" role="status"></span>
          <p class="as-hint" style="margin-top:10px;">The two getting-started emails new parents get if they haven't added a student (days 2 and 7).</p>
          <button class="btn btn-secondary" id="as-start-preview">Email me the getting-started emails</button>
          <span class="as-msg" id="as-start-msg" role="status"></span>` : ''}
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
          <p>Permanently deletes your sign-in, your progress and any revision packs you made, and cancels Plus if you pay for it. Students you look after must be removed first, unless another parent also looks after them. This can't be undone.</p>
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
    try { await sendPasswordEmail(email); rmsg.textContent = `Sent to ${email}. Check your inbox (and spam).`; }
    catch (e) { rmsg.textContent = `Couldn't send it: ${e.message}`; reset.disabled = false; }
  };
  const news = document.getElementById('as-news'), nmsg = document.getElementById('as-news-msg');
  if (news) news.onchange = async () => {
    const on = news.checked;
    nmsg.textContent = 'Saving…';
    try {
      await updateDoc(doc(db, 'users', user.uid), on ? { 'emailPrefs.news': true, 'emailPrefs.newsAt': Date.now(), 'emailPrefs.newsHow': 'settings' } : { 'emailPrefs.news': false });
      profile.emailPrefs = { ...(profile.emailPrefs || {}), news: on };
      nmsg.textContent = on ? "On. Thanks!" : "Off.";
    } catch (e) { news.checked = !on; nmsg.textContent = `Couldn't save: ${e.message}`; }
  };
  const weekly = document.getElementById('as-weekly'), wmsg = document.getElementById('as-weekly-msg');
  if (weekly) weekly.onchange = async () => {
    const on = weekly.checked;
    wmsg.textContent = 'Saving…';
    try {
      await updateDoc(doc(db, 'users', user.uid), { 'emailPrefs.weekly': on });
      profile.emailPrefs = { ...(profile.emailPrefs || {}), weekly: on };
      wmsg.textContent = on ? "On. You'll get it on Sunday evenings." : "Off. You won't get the weekly summary.";
    } catch (e) { weekly.checked = !on; wmsg.textContent = `Couldn't save: ${e.message}`; }
  };
  const prev = document.getElementById('as-weekly-preview'), pmsg = document.getElementById('as-preview-msg');
  if (prev) prev.onclick = async () => {
    prev.disabled = true; pmsg.textContent = 'Sending…';
    try { const r = await workerAction('weeklyPreview'); pmsg.textContent = `Sent to ${r.to}.`; }
    catch (e) { pmsg.textContent = e.message; }
    finally { prev.disabled = false; }
  };
  const cls = document.getElementById('as-class'), cmsg = document.getElementById('as-class-msg');
  if (cls) cls.onchange = async () => {
    const on = cls.checked;
    cmsg.textContent = 'Saving…';
    try {
      await updateDoc(doc(db, 'users', user.uid), { 'emailPrefs.teacherWeekly': on });
      profile.emailPrefs = { ...(profile.emailPrefs || {}), teacherWeekly: on };
      cmsg.textContent = on ? "On. You'll get it on Sunday evenings." : "Off. You won't get the class summary.";
    } catch (e) { cls.checked = !on; cmsg.textContent = `Couldn't save: ${e.message}`; }
  };
  const cprev = document.getElementById('as-class-preview'), cpmsg = document.getElementById('as-class-prev-msg');
  if (cprev) cprev.onclick = async () => {
    cprev.disabled = true; cpmsg.textContent = 'Sending…';
    try { const r = await workerAction('teacherPreview'); cpmsg.textContent = `Sent to ${r.to}.`; }
    catch (e) { cpmsg.textContent = e.message; }
    finally { cprev.disabled = false; }
  };
  const sprev = document.getElementById('as-start-preview'), smsg2 = document.getElementById('as-start-msg');
  if (sprev) sprev.onclick = async () => {
    sprev.disabled = true; smsg2.textContent = 'Sending…';
    try { const r = await workerAction('startPreview'); smsg2.textContent = `Sent both to ${r.to}.`; }
    catch (e) { smsg2.textContent = e.message; }
    finally { sprev.disabled = false; }
  };
  fillPlan(user, profile).catch(e => console.warn('Plan details not loaded', e.message));
  const del = document.getElementById('as-delete');
  if (del) del.onclick = () => { close(); openDeleteAccount({ uid: user.uid, name: profile.name || '', self: true }); };
}

// Paid Plus (renewal date, Manage billing) or free Plus from an admin (end date)
async function fillPlan(user, profile) {
  const el = document.getElementById('as-plan');
  if (!el) return;
  const [billing, pricing] = await Promise.all([getBilling(user.uid), getPricing()]);
  const name = esc(pricing.planName || 'Plus');
  if (paidPlus(billing)) {
    const amt = billing.amountPence ? `, ${gbp(billing.amountPence)} a year` : '';
    const end = billing.cancelAt || billing.currentPeriodEnd;
    const when = billing.state === 'cancelling' ? `Cancelled: ends on ${shortDate(end)}`
      : billing.state === 'past_due' ? `<strong style="color:var(--color-danger,#c0392b)">Your last payment didn't go through.</strong> Update your card to keep Plus`
      : billing.trialEnd > Date.now() ? `Free until ${shortDate(billing.trialEnd)}, then renews each year`
      : `Renews on ${shortDate(billing.currentPeriodEnd)}`;
    el.innerHTML = `<strong>${name}</strong> (paid${amt}) · ${when} · <button class="as-copy" id="as-billing">Manage billing</button>`;
    document.getElementById('as-billing').onclick = async e => {
      e.target.disabled = true; document.getElementById('as-plan-msg').textContent = 'Opening…';
      try { await openBillingPortal(); } catch (err) { document.getElementById('as-plan-msg').textContent = err.message; e.target.disabled = false; }
    };
    return;
  }
  const gift = giftOf(profile);
  if (gift) el.innerHTML = `<strong>Plus</strong> (free${gift.until ? ` until ${shortDate(gift.until)}` : ''})${gift.until ? ' · <a href="plus.html">Keep Plus</a>' : ''}`;
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
  .as-check { display: flex; gap: 10px; align-items: flex-start; cursor: pointer; font-size: 0.92rem; }
  .as-check input { width: 18px; height: 18px; margin-top: 2px; accent-color: var(--color-primary); flex-shrink: 0; }
  .as-check small { display: block; color: var(--color-text-muted); font-size: 0.8rem; margin-top: 2px; }
  .as-danger { border: 1px solid color-mix(in srgb, var(--color-danger, #c0392b) 45%, transparent); border-radius: 12px; padding: 14px; margin-top: 10px; }
  .as-danger h3 { color: var(--color-danger, #c0392b); }
  .as-del { background: none; border: 1px solid var(--color-danger, #c0392b); color: var(--color-danger, #c0392b); border-radius: 999px; padding: 8px 16px; font: inherit; font-weight: 600; font-size: 0.88rem; cursor: pointer; }
  .as-del:hover { background: color-mix(in srgb, var(--color-danger, #c0392b) 10%, transparent); }
  </style>`);
}
