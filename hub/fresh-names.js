/* Current subject and topic names for a student's progress.
   Quiz history (users.sessions) and study time (users.studySubjects) keep
   a copy of the subject and topic name from when the quiz was taken, so a
   subject renamed later (e.g. "Cemistry" → "Chemistry") used to keep its old
   name on Home, Progress and Recent activity.
   freshenNames(profile) looks up the current names (by pack, subject and
   topic id) and swaps them in on the loaded record, in memory only: nothing
   is written back. A subject or topic that has been deleted, or a pack the
   viewer can't read, keeps the name it was saved with.
   Lookups are shared across the page, so several students on the same
   pack cost one read per subject or topic. */
import { db } from './firebase-config.js?v=20261126o';
import { doc, getDoc }
  from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";

const cache = new Map();   // path → Promise<name|null>

function nameAt(path) {
  if (!cache.has(path)) {
    cache.set(path, getDoc(doc(db, path))
      .then(d => (d.exists() && d.data().name) || null)
      .catch(() => null));
  }
  return cache.get(path);
}

// Packs a profile points at for a subject id with no pack on it (study time)
function packFor(profile, sid) {
  const s = (profile.sessions || []).find(x => x.subjectId === sid && x.groupId);
  return s ? s.groupId : null;
}

export async function freshenNames(profile) {
  if (!profile) return profile;
  const sessions = profile.sessions || [];
  const jobs = [];

  sessions.forEach(s => {
    if (s.review || s.topic === 'Review today') return;
    if (!s.groupId || !s.subjectId) return;
    const sp = `content/${s.groupId}/subjects/${s.subjectId}`;
    jobs.push(nameAt(sp).then(name => {
      if (!name || name === s.subject) return;
      const old = s.subject;
      s.subject = name;
      if (!s.topicId && (!s.topic || s.topic === old)) s.topic = name;   // whole-subject quiz
    }));
    if (s.topicId) {
      jobs.push(nameAt(`${sp}/topics/${s.topicId}`).then(name => {
        if (name && name !== s.topic) s.topic = name;
      }));
    }
  });

  const names = profile.studySubjects;
  if (names && typeof names === 'object') {
    Object.keys(names).forEach(sid => {
      const pack = packFor(profile, sid);
      if (!pack) return;
      jobs.push(nameAt(`content/${pack}/subjects/${sid}`).then(name => {
        if (name) names[sid] = name;
      }));
    });
  }

  await Promise.all(jobs);
  return profile;
}
