// ============================================================
// LOBE LIMPET: linking a parent to a student who already has an account
// A student who signed up themselves owns their account, so a parent
// can't just take it over. Instead:
//   1. The parent asks (Add student with that email): parentLinks/{parentUid}_{studentUid}
//      { by, byName, byEmail, studentUid, studentEmail, studentName, status: 'pending', at }
//   2. The student sees the request in their hub: Accept or Decline.
//   3. Accept adds the parent to the student's guardianIds (never parentUid,
//      so the parent can't delete an account they didn't make), adds the
//      student to the parent's list, and marks the request 'accepted'.
//   4. The student can later remove a parent they linked this way
//      (Profile → Parents who can see your progress): status 'removed'.
// The security rules check each step against the request (lastParentLink).
// ============================================================

import { db } from './firebase-config.js?v=20261113d';
import { logEvent } from './log.js?v=20261113d';
import {
  doc, getDoc, getDocs, setDoc, updateDoc, deleteDoc, collection, query, where, arrayUnion, arrayRemove,
} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";

const esc = s => String(s ?? '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
export const linkId = (parentUid, studentUid) => `${parentUid}_${studentUid}`;

/* ── Parent side ─────────────────────────────────────────── */
export async function sendLinkRequest({ parentUid, parentName, parentEmail, student, typedName }) {
  const id = linkId(parentUid, student.id);
  await setDoc(doc(db, 'parentLinks', id), {
    by: parentUid, byName: parentName || '', byEmail: parentEmail || '',
    studentUid: student.id, studentEmail: student.email || '', studentName: typedName || student.name || '',
    status: 'pending', at: Date.now(),
  });
  logEvent('student.link_request', { target: typedName || student.name || student.email, targetId: student.id, detail: 'Asked to link an existing student account' });
  return id;
}
export async function myLinkRequests(parentUid) {
  const snap = await getDocs(query(collection(db, 'parentLinks'), where('by', '==', parentUid))).catch(() => null);
  const out = []; snap?.forEach(d => out.push({ id: d.id, ...d.data() }));
  return out;
}
export async function cancelLinkRequest(link) {
  await updateDoc(doc(db, 'parentLinks', link.id), { status: 'cancelled', decidedAt: Date.now() });
  logEvent('student.link_cancel', { target: link.studentName || link.studentEmail, targetId: link.studentUid });
}

/* ── Student side ────────────────────────────────────────── */
export async function linksForStudent(uid) {
  const snap = await getDocs(query(collection(db, 'parentLinks'), where('studentUid', '==', uid))).catch(() => null);
  const out = []; snap?.forEach(d => out.push({ id: d.id, ...d.data() }));
  return out;
}
export async function acceptLink(uid, profile, link) {
  // Order matters: the rules check the request is still pending when the parent is added
  await updateDoc(doc(db, 'users', uid), { guardianIds: arrayUnion(link.by), lastParentLink: link.id });
  await setDoc(doc(db, 'users', link.by, 'children', uid), {
    name: profile.name || '', email: profile.email || '', theme: profile.theme || 'edge',
    groupIds: profile.groupIds || [], createdAt: Date.now(), linkedBy: 'request',
  });
  await updateDoc(doc(db, 'parentLinks', link.id), { status: 'accepted', decidedAt: Date.now() });
  logEvent('student.link_accept', { target: link.byName || link.byEmail, targetId: link.by, detail: 'Accepted a parent link' });
}
export async function declineLink(link) {
  await updateDoc(doc(db, 'parentLinks', link.id), { status: 'declined', decidedAt: Date.now() });
  logEvent('student.link_decline', { target: link.byName || link.byEmail, targetId: link.by });
}
export async function removeLinkedParent(uid, link) {
  await updateDoc(doc(db, 'users', uid), { guardianIds: arrayRemove(link.by), lastParentLink: link.id });
  await deleteDoc(doc(db, 'users', link.by, 'children', uid)).catch(() => {});
  await updateDoc(doc(db, 'parentLinks', link.id), { status: 'removed', decidedAt: Date.now() });
  logEvent('student.link_remove', { target: link.byName || link.byEmail, targetId: link.by, detail: 'Removed a linked parent' });
}

// The request card(s) shown at the top of the student hub
export async function showLinkRequests(container, uid, profile) {
  if (!container) return;
  const pending = (await linksForStudent(uid)).filter(l => l.status === 'pending');
  if (!pending.length) return;
  if (!document.getElementById('plink-style')) document.head.insertAdjacentHTML('beforeend', `<style id="plink-style">
    .plink { background: var(--color-surface); border: 2px solid var(--color-primary); border-radius: var(--radius-card); padding: 16px 18px; margin-bottom: var(--space-lg); }
    .plink h3 { font-family: var(--font-heading); font-size: 1.05rem; margin: 0 0 6px; }
    .plink p { font-size: 0.9rem; color: var(--color-text-muted); margin: 0 0 12px; line-height: 1.5; }
    .plink .row { display: flex; gap: 8px; flex-wrap: wrap; }
  </style>`);
  pending.forEach(link => {
    const box = document.createElement('div');
    box.className = 'plink';
    box.innerHTML = `<h3>👪 ${esc(link.byName || 'A parent')} wants to link with your account</h3>
      <p>${esc(link.byName || 'They')} (${esc(link.byEmail || 'parent account')}) asked to be your parent or carer on Lobe Limpet. If you accept, they can see your revision progress and set up revision packs and study plans for you. You can remove them later from your Profile.</p>
      <div class="row"><button class="btn btn-primary" data-acc>Accept</button><button class="btn btn-ghost" data-dec>Decline</button></div>`;
    container.before(box);
    const busy = on => box.querySelectorAll('button').forEach(b => { b.disabled = on; });
    box.querySelector('[data-acc]').onclick = async () => {
      busy(true);
      try { await acceptLink(uid, profile, link); box.innerHTML = `<h3>✅ You're linked with ${esc(link.byName || 'your parent')}</h3><p>They can now see your progress.</p>`; }
      catch (e) { busy(false); alert('Could not accept: ' + e.message); }
    };
    box.querySelector('[data-dec]').onclick = async () => {
      busy(true);
      try { await declineLink(link); box.remove(); }
      catch (e) { busy(false); alert('Could not decline: ' + e.message); }
    };
  });
}
