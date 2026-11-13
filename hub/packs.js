// ============================================================
// LOBE LIMPET: revision pack ownership
// A pack is content/{packId}. Who can see it depends on two fields:
//   ownerUid    who made it (missing on packs made by an admin)
//   visibility  'official' (admin packs, everyone can use them)
//               'private'  (only the owner and the students it's assigned to)
//               'library'  (a frozen copy approved for the shared library; anyone
//                           signed in can read it and make their own copy)
// Students carry a flat list of every pack they've been given,
// users/{uid}.packIds, so the security rules can check access
// (groupIds from a parent + every list in classPacks from teachers + the
// student's own flashcard pack, myPackId).
// ============================================================

import { db } from './firebase-config.js?v=20261113b';
import {
  collection, getDocs, getDoc, doc, query, where, updateDoc
} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";

// (a published library copy of my pack isn't one of "my packs": it's in the library)
export const isOwnPack = (p, uid) => !!p && !!p.ownerUid && p.ownerUid === uid && p.visibility !== 'library';
// Admin packs made before ownership existed have neither field
export const isOfficialPack = p => !!p && (p.visibility === 'official' || !p.ownerUid);

// Every pack a student has been given, from all sources
export function flatPackIds(profile = {}) {
  const ids = [...(profile.groupIds || (profile.groupId ? [profile.groupId] : []))];
  Object.values(profile.classPacks || {}).forEach(list => (list || []).forEach(id => ids.push(id)));
  if (profile.myPackId) ids.push(profile.myPackId);   // the student's own flashcard sets
  return [...new Set(ids.filter(Boolean))];
}
export function samePackIds(a = [], b = []) {
  return a.length === b.length && [...a].sort().join('|') === [...b].sort().join('|');
}

// Packs this person can choose from: the official ones and their own.
// Returns [{ id, name, description, mine, official, ...data }], own packs first.
// Under the older rules one read returns every pack; under the newer ones
// that is refused, so official and own packs are asked for separately.
export async function listPacks(uid) {
  const found = new Map();
  const add = d => found.set(d.id, { id: d.id, ...d.data() });
  try {
    const all = await getDocs(collection(db, 'content'));
    all.forEach(add);
  } catch (e) {
    const [official, mine] = await Promise.all([
      getDocs(query(collection(db, 'content'), where('visibility', '==', 'official'))).catch(() => null),
      uid ? getDocs(query(collection(db, 'content'), where('ownerUid', '==', uid))).catch(() => null) : null,
    ]);
    official?.forEach(add); mine?.forEach(add);
  }
  const list = [...found.values()]
    .map(p => ({ ...p, name: p.name || 'Untitled pack', mine: isOwnPack(p, uid), official: isOfficialPack(p) }))
    .filter(p => p.mine || p.official);
  return list.sort((a, b) => (b.mine - a.mine) || (a.name || '').localeCompare(b.name || ''));
}

// Names for packs that may not be in the list above (e.g. another parent's
// private pack given to a shared student). Unreadable ones are skipped.
export async function packNames(ids = []) {
  const out = {};
  await Promise.all(ids.map(id => getDoc(doc(db, 'content', id))
    .then(s => { if (s.exists()) out[id] = s.data().name || 'Untitled pack'; })
    .catch(() => {})));
  return out;
}

// Keep users/{uid}.packIds in step after groupIds or classPacks change.
// `changes` are the fields about to be written (dotted classPacks.x keys
// allowed). Returns the changes with packIds added.
export function withPackIds(student = {}, changes = {}) {
  const next = { ...student, classPacks: { ...(student.classPacks || {}) } };
  Object.entries(changes).forEach(([k, v]) => {
    if (k.startsWith('classPacks.')) {
      const cid = k.slice('classPacks.'.length);
      if (Array.isArray(v)) next.classPacks[cid] = v; else delete next.classPacks[cid]; // deleteField()
    } else next[k] = v;
  });
  return { ...changes, packIds: flatPackIds(next) };
}

// Read a student, apply the changes plus a fresh packIds, in one write
export async function updateStudentPacks(uid, changes) {
  const snap = await getDoc(doc(db, 'users', uid)).catch(() => null);
  return updateDoc(doc(db, 'users', uid), withPackIds(snap?.data() || {}, changes));
}

// One <optgroup>-style list for assign dialogs: own packs, then official
export function packSections(list) {
  return [
    { title: 'My packs', packs: list.filter(p => p.mine) },
    { title: 'Lobe Limpet packs', packs: list.filter(p => !p.mine) },
  ].filter(s => s.packs.length);
}
