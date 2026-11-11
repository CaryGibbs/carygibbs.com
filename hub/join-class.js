// ============================================================
// CLASP: join a class with the code a teacher gives out
// Used at sign-up and from the student hub ("Join a class").
// Adds the class to the student's record, gives them the class's
// revision packs, and adds them to the teacher's class list.
// ============================================================

import { db } from './firebase-config.js?v=20261111n';
import { doc, getDoc, setDoc, updateDoc, arrayUnion } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";
import { flatPackIds } from './packs.js?v=20261111n';

export function cleanCode(code) {
  return String(code || '').toUpperCase().replace(/[^A-Z0-9]/g, '');
}

// Look up a code: returns { classId, teacherUid, className, packIds } or null
export async function findClass(code) {
  code = cleanCode(code);
  if (code.length !== 6) return null;
  const snap = await getDoc(doc(db, 'classCodes', code));
  if (!snap.exists()) return null;
  const info = snap.data();
  // The class itself has the up-to-date pack list
  const cls = await getDoc(doc(db, 'users', info.teacherUid, 'classes', info.classId)).catch(() => null);
  const packIds = (cls?.exists() && cls.data().packIds) || info.packIds || [];
  return { ...info, className: (cls?.exists() && cls.data().name) || info.className, packIds };
}

// Join (the student's own record must already exist)
// The class list entry goes first: the security rules only let a student add
// a teacher (teacherIds) for a class whose list they're already on (lastJoin).
export async function joinClass(uid, profile, info) {
  await setDoc(doc(db, 'users', info.teacherUid, 'classes', info.classId, 'students', uid),
    { name: profile.name || '', email: profile.email || '', joinedAt: Date.now() });
  await updateDoc(doc(db, 'users', uid), {
    [`classes.${info.classId}`]: true,
    [`classPacks.${info.classId}`]: info.packIds || [],
    // every pack the student has, so the security rules can let them read it
    packIds: flatPackIds({ ...profile, classPacks: { ...(profile.classPacks || {}), [info.classId]: info.packIds || [] } }),
    teacherIds: arrayUnion(info.teacherUid),   // lets the teacher see this student's progress
    lastJoin: { teacherUid: info.teacherUid, classId: info.classId, at: Date.now() },
  });
}
