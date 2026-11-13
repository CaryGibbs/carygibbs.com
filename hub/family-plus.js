// ============================================================
// LOBE LIMPET: a parent's Plus covers their children
// A student's users/{uid}.plusFrom names one of their parents (parentUid
// or guardianIds) who has Plus. The page (auth.js withFamilyPlus), the
// security rules (iHavePlus) and the AI Worker all check that the named
// parent really is theirs and really has Plus, so a stale or made-up
// value gives nothing.
// A co-parent (another parent of the same student) is covered too:
// plusFrom names the parent with Plus and plusVia the student they share.
// Kept in step by: the parent page (each time a parent opens it) and
// Admin → Users (on load, and when Plus is switched on or off).
// ============================================================

import { db } from './firebase-config.js?v=20261113v';
import { doc, getDoc, updateDoc, deleteField } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";
import { isPlusTier, coversFamily } from './auth.js?v=20261113v';

const isStudentRec = u => (Array.isArray(u?.roles) && u.roles.length ? u.roles : [u?.role || 'student']).includes('student');
const parentsOf = s => [s.parentUid, ...(s.guardianIds || [])].filter(Boolean);

// Which parent should cover this student, given the set of uids with Plus.
// Keeps the current one if it still works. null: nobody (or own Plus).
export function expectedPlusFrom(student, plusUids) {
  if (!isStudentRec(student) || isPlusTier(student)) return null;
  const parents = parentsOf(student);
  if (student.plusFrom && parents.includes(student.plusFrom) && plusUids.has(student.plusFrom)) return student.plusFrom;
  return parents.find(p => plusUids.has(p)) || null;
}

async function setPlusFrom(uid, from, via = null) {
  await updateDoc(doc(db, 'users', uid), { plusFrom: from || deleteField(), plusVia: via || deleteField() });
}
const isParentRec = u => (Array.isArray(u?.roles) ? u.roles : []).concat(u?.role || []).includes('parent');

// A parent without Plus of their own: { from, via } for another parent of one
// of their students who has Plus (keeps the current one if it still works)
export function expectedCoParent(parentId, parent, users, plusUids) {
  if (!isParentRec(parent) || isPlusTier(parent) || plusUids.has(parentId)) return null;
  const options = [];
  users.forEach(s => {
    if (!isStudentRec(s)) return;
    const ps = parentsOf(s);
    if (!ps.includes(parentId)) return;
    ps.filter(p => p !== parentId && plusUids.has(p)).forEach(p => options.push({ from: p, via: s.id }));
  });
  return options.find(o => o.from === parent.plusFrom && o.via === parent.plusVia) || options[0] || null;
}

// Admin: bring every student's plusFrom in line. users: [{ id, ...data }]
// (updated in place). Returns how many changed.
export async function syncFamilyPlus(users) {
  const plusUids = new Set(users.filter(u => coversFamily(u)).map(u => u.id));
  let changed = 0;
  for (const u of users) {
    if (isStudentRec(u)) {
      const want = expectedPlusFrom(u, plusUids);
      if ((u.plusFrom || null) === want && !u.plusVia) continue;
      try { await setPlusFrom(u.id, want); want ? (u.plusFrom = want) : delete u.plusFrom; delete u.plusVia; changed++; }
      catch (e) { console.warn('Could not update family Plus for', u.id, e.message); }
    } else if (isParentRec(u) || u.plusFrom) {
      // Co-parents share the family's Plus
      const want = expectedCoParent(u.id, u, users, plusUids);
      if ((u.plusFrom || null) === (want?.from || null) && (u.plusVia || null) === (want?.via || null)) continue;
      try {
        await setPlusFrom(u.id, want?.from, want?.via);
        if (want) { u.plusFrom = want.from; u.plusVia = want.via; } else { delete u.plusFrom; delete u.plusVia; }
        changed++;
      } catch (e) { console.warn('Could not update family Plus for', u.id, e.message); }
    }
  }
  return changed;
}

// Parent page, for me as a co-parent: if I've no Plus of my own and another
// parent of one of my students has it, I'm covered (I can only edit my own
// record, so this runs on my page). students: { id: record }
export async function syncMyCoParentPlus(me, myProfile, students) {
  if (!myProfile || !isParentRec(myProfile) || isPlusTier(myProfile) || coversFamily(myProfile)) return;
  const others = [];
  Object.entries(students || {}).forEach(([sid, s]) => {
    if (!s || !isStudentRec(s) || !parentsOf(s).includes(me)) return;
    parentsOf(s).filter(p => p !== me).forEach(p => others.push({ from: p, via: sid }));
  });
  const plusOf = {};
  for (const p of new Set(others.map(o => o.from))) plusOf[p] = await getDoc(doc(db, 'users', p)).then(d => coversFamily(d.data())).catch(() => false);
  const valid = others.filter(o => plusOf[o.from]);
  const want = valid.find(o => o.from === myProfile.plusFrom && o.via === myProfile.plusVia) || valid[0] || null;
  if ((myProfile.plusFrom || null) === (want?.from || null) && (myProfile.plusVia || null) === (want?.via || null)) return;
  try {
    await setPlusFrom(me, want?.from, want?.via);
    if (want) { myProfile.plusFrom = want.from; myProfile.plusVia = want.via; } else { delete myProfile.plusFrom; delete myProfile.plusVia; }
  } catch (e) { console.warn('Could not update family Plus', e.message); }
}

// Parent page: I can only vouch for my own Plus. Cover each of my students
// who has no working cover, and drop cover that names me if I no longer
// have Plus. student: their users record.
export async function syncMyChildPlus(me, myProfile, studentId, student) {
  if (!student || !isStudentRec(student) || isPlusTier(student)) return;
  const mine = parentsOf(student).includes(me);
  if (!mine) return;
  const iHave = coversFamily(myProfile);
  const cur = student.plusFrom;
  const curValid = cur && parentsOf(student).includes(cur);
  try {
    // Another parent already covering them, and still with Plus? Leave it.
    const otherStillPlus = curValid && cur !== me
      && await getDoc(doc(db, 'users', cur)).then(d => coversFamily(d.data())).catch(() => true);
    if (iHave && cur !== me && !otherStillPlus) { await setPlusFrom(studentId, me); student.plusFrom = me; }
    else if (!iHave && cur === me) { await setPlusFrom(studentId, null); delete student.plusFrom; }
  } catch (e) { console.warn('Could not update family Plus', e.message); }
}
