// ============================================================
// LOBE LIMPET: deleting an account
// Used by: the adult sidebar ("Delete my account"), the student Profile,
// a parent removing a student who has no other parent, and Admin → Users.
//
// The browser first deletes the person's own revision packs (whole trees),
// which it's allowed to do and which can be large. Then the AI Worker,
// which holds a Firebase service account, finishes the job: the sign-in
// itself, their record, their links to parents, teachers and classes,
// their email look-up, library reports and their activity log entries.
// The Worker checks who is asking: yourself, a parent who is a student's
// only parent, or an admin (only the owner can delete an admin).
// ============================================================

import { auth, db } from './firebase-config.js?v=20261109x';
import { PROXY_URL } from './ai.js?v=20261109x';
import { logEvent } from './log.js?v=20261109x';
import { collection, getDocs, deleteDoc, doc, query, where } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";
import { signOut } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";

const esc = s => String(s ?? '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

// A pack's subjects, topics, questions and notes, then the pack itself
async function deletePackTree(packId) {
  const kids = async path => { const s = await getDocs(collection(db, path)).catch(() => null); const ids = []; s?.forEach(d => ids.push(d.id)); return ids; };
  for (const sid of await kids(`content/${packId}/subjects`)) {
    const sPath = `content/${packId}/subjects/${sid}`;
    for (const tid of await kids(`${sPath}/topics`)) {
      const tPath = `${sPath}/topics/${tid}`;
      for (const sub of ['questions', 'notes']) {
        await Promise.all((await kids(`${tPath}/${sub}`)).map(id => deleteDoc(doc(db, `${tPath}/${sub}`, id)).catch(() => {})));
      }
      await deleteDoc(doc(db, tPath)).catch(() => {});
    }
    await deleteDoc(doc(db, sPath)).catch(() => {});
  }
  await deleteDoc(doc(db, 'content', packId)).catch(() => {});
}

// Delete an account. Returns { ok: true } or throws with a message to show.
export async function deleteAccount(uid, { name = '' } = {}) {
  const me = auth.currentUser;
  if (!me) throw new Error('Please sign in again.');
  const ask = async check => {
    const r = await fetch(PROXY_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${await me.getIdToken()}` },
      body: JSON.stringify({ action: 'deleteAccount', uid, check }),
    });
    const data = await r.json().catch(() => ({}));
    if (!r.ok || !data.ok) throw new Error(data.error?.message || `Couldn't delete the account (${r.status}). Please try again.`);
    return data;
  };
  // 1. Is this allowed? (checked by the Worker before anything is deleted)
  await ask(true);
  // 2. Their own packs (and library copies they wrote). Allowed for the owner and admins.
  const own = await getDocs(query(collection(db, 'content'), where('ownerUid', '==', uid))).catch(() => null);
  for (const d of own?.docs || []) await deletePackTree(d.id);
  // 3. Everything else, and the sign-in itself
  const data = await ask(false);
  if (uid !== me.uid) logEvent('account.delete', { target: 'A deleted account', detail: name ? 'Deleted by a parent or admin' : '' });
  return data;
}

/* ── Confirm dialog ──────────────────────────────────────────
   self: deleting your own account (type DELETE to confirm, then sign out).
   Otherwise: deleting someone else's (a student, or a user in Admin). */
export function openDeleteAccount({ uid, name = '', self = false, onDone = null } = {}) {
  document.getElementById('del-acct')?.remove();
  const who = self ? 'your account' : `${esc(name || 'this account')}'s account`;
  document.body.insertAdjacentHTML('beforeend', `
    <div class="da-overlay" id="del-acct" role="dialog" aria-modal="true" aria-labelledby="da-title">
      <div class="da-box">
        <h2 id="da-title">Delete ${who}?</h2>
        <p>This permanently deletes ${self ? 'your' : 'their'} sign-in, ${self ? 'your' : 'their'} progress (quizzes, streaks, badges, reviews and study plan)${self ? ', and any revision packs you made' : ''}. It can't be undone.</p>
        ${self ? '<p>Students you look after must be removed or deleted first, unless another parent also looks after them.</p>' : ''}
        <label class="da-label">Type <b>DELETE</b> to confirm<input id="da-input" autocomplete="off" autocapitalize="characters"></label>
        <div class="da-msg" id="da-msg" role="status"></div>
        <div class="da-actions">
          <button class="btn btn-secondary" id="da-cancel">Cancel</button>
          <button class="btn btn-danger" id="da-ok" disabled>Delete ${self ? 'my account' : 'account'}</button>
        </div>
      </div>
    </div>`);
  if (!document.getElementById('da-style')) document.head.insertAdjacentHTML('beforeend', `<style id="da-style">
    .da-overlay { position: fixed; inset: 0; z-index: 3000; background: rgba(10,12,20,0.5); display: flex; align-items: flex-start; justify-content: center; padding: 10vh 16px; overflow-y: auto; }
    .da-box { background: var(--color-surface, #fff); color: var(--color-text, #111); border-radius: 16px; padding: 22px; max-width: 440px; width: 100%; box-shadow: 0 20px 60px rgba(0,0,0,0.25); font-family: var(--font-body, system-ui); }
    .da-box h2 { font-family: var(--font-heading, system-ui); font-size: 1.2rem; margin: 0 0 10px; }
    .da-box p { font-size: 0.9rem; line-height: 1.5; color: var(--color-text-muted, #555); margin: 0 0 10px; }
    .da-label { display: flex; flex-direction: column; gap: 6px; font-size: 0.85rem; margin-top: 6px; }
    .da-label input { padding: 10px 12px; border-radius: 10px; font-size: 1rem; letter-spacing: 0.08em; }
    .da-msg { min-height: 1.2em; font-size: 0.85rem; margin-top: 8px; color: var(--color-danger, #c0392b); }
    .da-actions { display: flex; gap: 8px; justify-content: flex-end; margin-top: 12px; }
  </style>`);
  const box = document.getElementById('del-acct');
  const input = document.getElementById('da-input'), ok = document.getElementById('da-ok'), msg = document.getElementById('da-msg');
  const close = () => box.remove();
  document.getElementById('da-cancel').onclick = close;
  box.addEventListener('click', e => { if (e.target === box) close(); });
  input.oninput = () => { ok.disabled = input.value.trim().toUpperCase() !== 'DELETE'; };
  input.focus();
  ok.onclick = async () => {
    ok.disabled = true; ok.textContent = 'Deleting…'; msg.textContent = '';
    try {
      await deleteAccount(uid, { name });
      if (self) {
        msg.style.color = 'inherit'; msg.textContent = 'Your account has been deleted.';
        await signOut(auth).catch(() => {});
        setTimeout(() => { window.location.href = 'login.html'; }, 1200);
        return;
      }
      close();
      onDone && onDone();
    } catch (e) {
      msg.textContent = e.message;
      ok.textContent = `Delete ${self ? 'my account' : 'account'}`;
      ok.disabled = input.value.trim().toUpperCase() !== 'DELETE';
    }
  };
}
