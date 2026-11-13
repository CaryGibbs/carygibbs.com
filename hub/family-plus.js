// ============================================================
// LOBE LIMPET: a parent's Plus covers their children
// A student's users/{uid}.plusFrom names one of their parents (parentUid
// or guardianIds) who has Plus. The page (auth.js withFamilyPlus), the
// security rules (iHavePlus) and the AI Worker all check that the named
// parent really is theirs and really has Plus, so a stale or made-up
// value gives nothing.
// Kept in step by: the parent page (each time a parent opens it) and
// Admin → Users (on load, and when Plus is switched on or off).
// ============================================================

import { db } from './firebase-config.js?v=20261113j';
import { doc, getDoc, updateDoc, deleteField } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";
import { isPlusTier, coversFamily } from './auth.js?v=20261113j';

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

async function setPlusFrom(uid, from) {
  await updateDoc(doc(db, 'users', uid), { plusFrom: from || deleteField() });
}

// Admin: bring every student's plusFrom in line. users: [{ id, ...data }]
// (updated in place). Returns how many changed.
export async function syncFamilyPlus(users) {
  const plusUids = new Set(users.filter(u => coversFamily(u)).map(u => u.id));
  let changed = 0;
  for (const u of users) {
    if (!isStudentRec(u)) continue;
    const want = expectedPlusFrom(u, plusUids);
    if ((u.plusFrom || null) === want) continue;
    try { await setPlusFrom(u.id, want); want ? (u.plusFrom = want) : delete u.plusFrom; changed++; }
    catch (e) { console.warn('Could not update family Plus for', u.id, e.message); }
  }
  return changed;
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
