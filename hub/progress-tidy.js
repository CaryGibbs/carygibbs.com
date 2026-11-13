/* Removing a subject or a set from a student's progress.
   Quiz history (users.sessions), review schedule (users.srs) and study time
   (users.study / studySubjects) keep their own copy of where they came from,
   so deleting a set or a subject leaves it on the Progress page. This clears it.
   Used by My flashcards (Delete set, and the subject when it's left empty)
   and by Admin → All students → Progress → "Remove from progress".
   XP, level and badges already earned are kept.

   match is one of:
     { packId, topicId }              a set or topic
     { packId, subjectId }            a subject in a pack
     { subjectName }                  everything shown under that name on Progress */
import { db } from './firebase-config.js?v=20261113q';
import { doc, getDoc, updateDoc, deleteField }
  from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";

const isReview = s => s.review || s.topic === 'Review today';

// What a match would remove from a user record (no writes)
export function progressMatches(user, match) {
  const sessions = user.sessions || [];
  const names = user.studySubjects || {};
  const sids = new Set();
  let hit;
  if (match.topicId) {
    hit = s => s.groupId === match.packId && s.topicId === match.topicId;
  } else if (match.subjectId) {
    sids.add(match.subjectId);
    hit = s => s.subjectId === match.subjectId && (!s.groupId || s.groupId === match.packId);
  } else {
    const name = match.subjectName;
    sessions.forEach(s => { if (!isReview(s) && s.subject === name && s.subjectId) sids.add(s.subjectId); });
    Object.entries(names).forEach(([sid, n]) => { if (n === name) sids.add(sid); });
    hit = s => s.subject === name || (s.subjectId && sids.has(s.subjectId));
  }
  const kept = sessions.filter(s => isReview(s) || !hit(s));

  const srsKeys = Object.entries(user.srs || {}).filter(([, e]) => e && (
    match.topicId ? e.p === match.packId && e.t === match.topicId : sids.has(e.s)
  )).map(([k]) => k);

  const studyPaths = [];
  Object.entries(user.study || {}).forEach(([day, subs]) => {
    Object.keys(subs || {}).forEach(sid => { if (sids.has(sid)) studyPaths.push(`study.${day}.${sid}`); });
  });
  const nameKeys = [...sids].filter(sid => sid in names);

  return {
    sessions: kept,
    quizzes: sessions.length - kept.length,
    srsKeys, studyPaths, nameKeys,
    any: sessions.length !== kept.length || srsKeys.length || studyPaths.length || nameKeys.length,
  };
}

// Read the user fresh (so a quiz finished meanwhile isn't lost), then remove.
// Returns what was removed, or null if there was nothing to remove.
export async function forgetProgress(uid, match) {
  const snap = await getDoc(doc(db, 'users', uid));
  if (!snap.exists()) return null;
  const m = progressMatches(snap.data(), match);
  if (!m.any) return null;
  const update = {};
  if (m.quizzes) update.sessions = m.sessions;
  m.srsKeys.forEach(k => { update[`srs.${k}`] = deleteField(); });
  m.studyPaths.forEach(p => { update[p] = deleteField(); });
  m.nameKeys.forEach(sid => { update[`studySubjects.${sid}`] = deleteField(); });
  await updateDoc(doc(db, 'users', uid), update);
  return { quizzes: m.quizzes, reviews: m.srsKeys.length, studyDays: m.studyPaths.length, sessions: m.sessions };
}

// Subject names on a user's Progress page (not reviews), for a picker
export function progressSubjects(user) {
  const out = {};
  (user.sessions || []).forEach(s => {
    if (isReview(s)) return;
    const n = s.subject || 'Other';
    (out[n] = out[n] || { name: n, quizzes: 0 }).quizzes++;
  });
  Object.values(user.studySubjects || {}).forEach(n => { out[n] = out[n] || { name: n, quizzes: 0 }; });
  return Object.values(out).sort((a, b) => a.name.localeCompare(b.name));
}
