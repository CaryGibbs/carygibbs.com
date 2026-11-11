// ============================================================
// CLASP: study time tracker
// Counts *active* time on learning pages (the Learn screen: map, learn panel,
// cheat sheets). The clock pauses when the page is hidden or nobody
// has touched it for 2 minutes, so leaving it open doesn't count.
// Saved per day and subject on the student's record (and the parent's
// copy), and every 5 minutes earns XP and updates the streak.
// ============================================================

import { db } from './firebase-config.js?v=20261111c';
import { isPreview, isStudent } from './auth.js?v=20261111c';
import { logEvent } from './log.js?v=20261111c';
import { awardXp, repairOffer, loadStreakSettings } from './gamification.js?v=20261111c';
import { doc, updateDoc, increment } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";

const IDLE_MS  = 2 * 60 * 1000;   // no activity for this long = paused
const TICK_MS  = 5000;
const FLUSH_MS = 60 * 1000;       // save at least once a minute

let state = null;

function dayKey(d = new Date()) {
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
}

export function startStudyTimer({ user, profile, subjectId, subjectName, onBadges }) {
  if (!user || !isStudent(profile) || isPreview() || !subjectId) return;
  if (state) return;
  loadStreakSettings();
  state = { user, profile, subjectId, subjectName, onBadges, pending: 0, xpBank: 0, lastActive: Date.now(), lastTick: Date.now(), lastFlush: Date.now() };

  const active = () => { state.lastActive = Date.now(); };
  ['pointerdown', 'pointermove', 'keydown', 'wheel', 'touchstart', 'scroll'].forEach(ev =>
    window.addEventListener(ev, active, { passive: true, capture: true }));

  setInterval(() => {
    const now = Date.now();
    const gap = now - state.lastTick;
    state.lastTick = now;
    const visible = document.visibilityState === 'visible';
    const recent = now - state.lastActive < IDLE_MS;
    if (visible && recent) state.pending += Math.min(gap, TICK_MS * 2) / 1000;
    if (now - state.lastFlush >= FLUSH_MS) flush();
  }, TICK_MS);

  document.addEventListener('visibilitychange', () => { if (document.visibilityState === 'hidden') flush(); });
  window.addEventListener('pagehide', () => flush());
}

export async function flush() {
  if (!state) return;
  state.lastFlush = Date.now();
  const secs = Math.round(state.pending);
  if (secs < 5) return;
  state.pending -= secs;
  const { user, profile, subjectId, subjectName } = state;
  const update = {
    [`study.${dayKey()}.${subjectId}`]: increment(secs),
    [`studySubjects.${subjectId}`]: subjectName || 'Subject',
  };
  try {
    await updateDoc(doc(db, 'users', user.uid), update);
    if (profile.parentUid) updateDoc(doc(db, 'users', profile.parentUid, 'children', user.uid), update).catch(() => {});
    // One log entry per subject per visit, not every save
    if (!state.logged) { state.logged = true; logEvent('study.learn', { target: subjectName || 'Subject', detail: 'Learn (key points, map or flashcards)' }); }
  } catch (e) {
    state.pending += secs;   // try again next time
    return;
  }
  // Winning a streak back: check after every save, so it completes the
  // moment the hour is reached (not just on the next 5-minute XP award)
  if (!state.repairDone && repairOffer(state.profile)) {
    try {
      const r = await awardXp(user.uid, 'time', { minutes: 0 });
      if (r?.repaired || !r) state.repairDone = true;
      if (r?.newlyEarned?.length && state.onBadges) state.onBadges(r.newlyEarned);
    } catch (e) { /* try again next save */ }
  }
  // Every full 5 minutes: XP, streak and badge check
  state.xpBank += secs;
  if (state.xpBank >= 300) {
    const minutes = Math.floor(state.xpBank / 300) * 5;
    state.xpBank -= minutes * 60;
    try {
      const r = await awardXp(user.uid, 'time', { minutes });
      if (r?.newlyEarned?.length && state.onBadges) state.onBadges(r.newlyEarned);
    } catch (e) { /* not critical */ }
  }
}
