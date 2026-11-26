// ============================================================
// LOBE LIMPET: deleting a pack safely ("Recently deleted")
// Deleting a pack used to be one confirm and gone for good, with every
// subject, topic and question in it. Now:
//   - the Delete dialog says what's in the pack and who has it, and the
//     pack's name must be typed before Delete works
//   - the pack goes to "Recently deleted" for BIN_DAYS: it's taken away
//     from the students/classes that had it (recorded on the pack, in
//     `binned`), hidden from every list, and can be restored in one tap,
//     which gives it back to them
//   - after BIN_DAYS (or "Delete forever") it is deleted for real
// No security-rules change: owners already update their own pack.
// ============================================================

import { db } from './firebase-config.js?v=20261126f';
import { updateStudentPacks } from './packs.js?v=20261126f';
import { givePackToChild, givePackToClass } from './first-steps.js?v=20261126f';
import { logEvent } from './log.js?v=20261126f';
import {
  doc, getDoc, getDocs, updateDoc, collection, query, where, deleteField, getCountFromServer,
} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";

const esc = s => String(s ?? '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
export const BIN_DAYS = 30;
const DAY = 86400000;
export const isBinned = p => !!(p && p.binned && p.binned.at);
export const binDaysLeft = p => Math.max(0, Math.ceil((p.binned.at + BIN_DAYS * DAY - Date.now()) / DAY));
export const binExpired = p => isBinned(p) && Date.now() > p.binned.at + BIN_DAYS * DAY;
const plural = (n, w) => `${n} ${w}${n === 1 ? '' : 's'}`;

// What's in a pack (subjects, topics, questions)
export async function packContents(packId) {
  const out = { subjects: 0, topics: 0, questions: 0 };
  const subs = await getDocs(collection(db, `content/${packId}/subjects`)).catch(() => null);
  const sids = []; subs?.forEach(d => sids.push(d.id));
  out.subjects = sids.length;
  await Promise.all(sids.map(async sid => {
    const ts = await getDocs(collection(db, `content/${packId}/subjects/${sid}/topics`)).catch(() => null);
    const tids = []; ts?.forEach(d => tids.push(d.id));
    out.topics += tids.length;
    const counts = await Promise.all(tids.map(tid => getCountFromServer(collection(db, `content/${packId}/subjects/${sid}/topics/${tid}/questions`))
      .then(c => c.data().count).catch(() => 0)));
    out.questions += counts.reduce((a, n) => a + n, 0);
  }));
  return out;
}

// Who has the pack: my students (parent), my classes (teacher), or any student given it directly (admin, official packs)
export async function packHolders({ packId, role, uid }) {
  const out = { kids: [], classes: [], users: [] };
  if (role === 'parent') {
    const snap = await getDocs(collection(db, 'users', uid, 'children')).catch(() => null);
    const ids = []; snap?.forEach(d => ids.push({ id: d.id, ...d.data() }));
    const live = await Promise.all(ids.map(k => getDoc(doc(db, 'users', k.id)).then(s => ({ ...k, ...(s.data() || {}) })).catch(() => k)));
    out.kids = live.filter(k => (k.groupIds || (k.groupId ? [k.groupId] : [])).includes(packId))
      .map(k => ({ id: k.id, full: k.name || 'Student', groupIds: k.groupIds || (k.groupId ? [k.groupId] : []) }));
  } else if (role === 'teacher') {
    const snap = await getDocs(collection(db, 'users', uid, 'classes')).catch(() => null);
    snap?.forEach(d => { const c = { id: d.id, ...d.data() }; if ((c.packIds || []).includes(packId)) out.classes.push(c); });
  } else if (role === 'admin') {
    const snap = await getDocs(query(collection(db, 'users'), where('groupIds', 'array-contains', packId))).catch(() => null);
    snap?.forEach(d => out.users.push({ id: d.id, full: d.data().name || 'Student', groupIds: d.data().groupIds || [] }));
  }
  return out;
}
const holderNames = h => [...h.kids.map(k => k.full), ...h.classes.map(c => c.name || 'Class'), ...h.users.map(u => u.full)];

// Into the bin: take it from whoever has it, and remember them
export async function binPack({ pack, role, uid, holders = null }) {
  const h = holders || await packHolders({ packId: pack.id, role, uid });
  for (const k of [...h.kids, ...h.users]) {
    const groupIds = (k.groupIds || []).filter(id => id !== pack.id);
    await updateStudentPacks(k.id, { groupIds, groupId: groupIds[0] || null });
    if (role === 'parent') await updateDoc(doc(db, 'users', uid, 'children', k.id), { groupIds }).catch(() => {});
  }
  for (const c of h.classes) {
    const packIds = (c.packIds || []).filter(id => id !== pack.id);
    await updateDoc(doc(db, 'users', uid, 'classes', c.id), { packIds });
    if (c.joinCode) await updateDoc(doc(db, 'classCodes', c.joinCode), { packIds }).catch(() => {});
    const snap = await getDocs(collection(db, 'users', uid, 'classes', c.id, 'students')).catch(() => null);
    const ids = []; snap?.forEach(d => ids.push(d.id));
    await Promise.allSettled(ids.map(id => updateStudentPacks(id, { [`classPacks.${c.id}`]: packIds })));
  }
  await updateDoc(doc(db, 'content', pack.id), { binned: { at: Date.now(), by: uid, kids: h.kids.map(k => k.id), classes: h.classes.map(c => c.id), users: h.users.map(u => u.id) } });
  logEvent('content.delete', { target: pack.name, targetId: pack.id, detail: `Moved revision pack to Recently deleted${holderNames(h).length ? ` (taken from ${holderNames(h).join(', ')})` : ''}` });
}

// Out of the bin: give it back to whoever had it (if they're still there)
export async function restorePack({ pack, role, uid }) {
  const b = pack.binned || {};
  const back = [];
  for (const id of [...(b.kids || []), ...(b.users || [])]) {
    const s = await getDoc(doc(db, 'users', id)).catch(() => null);
    if (!s?.exists()) continue;
    const k = { id, full: s.data().name || 'Student', groupIds: s.data().groupIds || (s.data().groupId ? [s.data().groupId] : []) };
    if (role === 'parent') await givePackToChild(uid, k, pack).catch(() => {});
    else { const groupIds = [...new Set([...k.groupIds, pack.id])]; await updateStudentPacks(id, { groupIds, groupId: groupIds[0] }).catch(() => {}); }
    back.push(k.full);
  }
  for (const cid of b.classes || []) {
    const s = await getDoc(doc(db, 'users', uid, 'classes', cid)).catch(() => null);
    if (!s?.exists()) continue;
    await givePackToClass(uid, { id: cid, ...s.data() }, pack).catch(() => {});
    back.push(s.data().name || 'Class');
  }
  await updateDoc(doc(db, 'content', pack.id), { binned: deleteField() });
  logEvent('content.restore', { target: pack.name, targetId: pack.id, detail: `Restored revision pack${back.length ? ` (given back to ${back.join(', ')})` : ''}` });
  return back;
}

/* ── The Delete dialog ───────────────────────────────────── */
// opts: { pack: {id, name}, role: 'parent'|'teacher'|'admin', uid, onDone(), toast }
export async function openDeletePack({ pack, role, uid, onDone = () => {}, toast = () => {} }) {
  document.getElementById('del-pack')?.remove();
  document.body.insertAdjacentHTML('beforeend', `<div class="modal-overlay open" id="del-pack" role="dialog" aria-modal="true" aria-labelledby="del-pack-title"><div class="modal" style="max-width:480px">
    <div class="modal-header"><h2 id="del-pack-title">Delete “${esc(pack.name)}”?</h2><button class="modal-close" data-dp="close" aria-label="Close">✕</button></div>
    <div id="dp-body"><div class="spinner" style="margin:10px auto"></div></div>
    <div class="error-msg" id="dp-err"></div>
    <div class="modal-footer" style="display:flex;justify-content:flex-end;gap:8px;margin-top:14px">
      <button class="btn btn-secondary" data-dp="close">Keep it</button>
      <button class="btn btn-danger" id="dp-go" disabled>Delete pack</button></div>
  </div></div>`);
  const box = document.getElementById('del-pack');
  box.querySelectorAll('[data-dp="close"]').forEach(b => b.onclick = () => box.remove());
  const [c, h] = await Promise.all([packContents(pack.id), packHolders({ packId: pack.id, role, uid })]);
  if (!box.isConnected) return;
  const who = holderNames(h);
  const what = [plural(c.subjects, 'subject'), plural(c.topics, 'topic'), plural(c.questions, 'question')].join(', ');
  box.querySelector('#dp-body').innerHTML = `
    <p class="dp-line">It has <strong>${esc(what)}</strong>.</p>
    ${who.length ? `<p class="dp-line dp-warn">⚠️ <strong>${esc(who.join(', '))}</strong> ${who.length === 1 ? 'is' : 'are'} revising from it. ${who.length === 1 ? 'They' : 'They'} won't see it any more, and their progress on it stops showing.</p>` : ''}
    <p class="dp-line">It goes to <strong>Recently deleted</strong> for ${BIN_DAYS} days, where you can restore it${who.length ? ` (and give it back to ${who.length === 1 ? 'them' : 'them all'})` : ''}. After that it's deleted for good.</p>
    <label class="dp-type">To delete it, type the pack's name: <b>${esc(pack.name)}</b>
      <input id="dp-name" class="form-input" autocomplete="off" spellcheck="false" placeholder="${esc(pack.name)}"></label>`;
  const input = box.querySelector('#dp-name'), go = box.querySelector('#dp-go');
  const norm = s => String(s || '').trim().toLowerCase().replace(/\s+/g, ' ');
  input.oninput = () => { go.disabled = norm(input.value) !== norm(pack.name); };
  input.onkeydown = e => { if (e.key === 'Enter' && !go.disabled) go.click(); };
  setTimeout(() => input.focus(), 30);
  go.onclick = async () => {
    go.disabled = true; go.classList.add('loading');
    try {
      await binPack({ pack, role, uid, holders: h });
      box.remove();
      toast(`“${pack.name}” moved to Recently deleted. You can restore it for ${BIN_DAYS} days.`, 'success');
      onDone();
    } catch (e) {
      go.disabled = false; go.classList.remove('loading');
      const err = box.querySelector('#dp-err'); err.textContent = 'Could not delete it: ' + e.message; err.classList.add('visible');
    }
  };
  addBinCss();
}
export function addBinCss() {
  if (!document.getElementById('dp-style')) document.head.insertAdjacentHTML('beforeend', `<style id="dp-style">
    .dp-line { margin: 0 0 10px; font-size: 0.92rem; line-height: 1.5; color: var(--color-text); }
    .dp-warn { background: color-mix(in srgb, var(--color-danger) 10%, var(--color-surface)); border-radius: 10px; padding: 10px 12px; }
    .dp-type { display: flex; flex-direction: column; gap: 6px; font-size: 0.88rem; color: var(--color-text-muted); margin-top: 6px; }
    .dp-type input { width: 100%; }
    .bin-list { display: flex; flex-direction: column; gap: 8px; }
    .bin-row { display: flex; align-items: center; gap: 12px; flex-wrap: wrap; padding: 10px 14px; background: var(--color-surface); border: 1px dashed var(--color-border); border-radius: var(--radius-button, 10px); }
    .bin-row > div { flex: 1; min-width: 200px; }
    .bin-row strong { font-family: var(--font-ui); font-size: 0.92rem; }
    .bin-row small { display: block; color: var(--color-text-muted); font-size: 0.8rem; }
    .bin-forever { background: none; border: 0; font: inherit; font-size: 0.82rem; color: var(--color-danger); text-decoration: underline; cursor: pointer; }
  </style>`);
}
