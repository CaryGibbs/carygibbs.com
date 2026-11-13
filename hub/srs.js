// ============================================================
// LOBE LIMPET: "Review today" (spaced repetition)
// Every question a student answers gets a box number and a due day.
//   Right  -> up a box, comes back later (3, 7, 14, 30, 60 days)
//   Wrong  -> back to box 0, comes back tomorrow
// Saved on the student's record as  srs.<questionId> = { b, d, p, s, t }
//   b = box, d = due day 'YYYY-MM-DD', p/s/t = pack, subject, topic ids
// The hub shows what's due; quiz.html?review=1 runs a review quiz.
// ============================================================

import { db } from './firebase-config.js?v=20261113g';
import { doc, updateDoc } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";

export const INTERVALS = [1, 3, 7, 14, 30, 60];   // days, by box
export const REVIEW_SIZE = 15;                    // questions per review session

export function dayKey(d = new Date(Date.now())) {
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
}
function addDays(days, from = new Date(Date.now())) {
  const d = new Date(from.getFullYear(), from.getMonth(), from.getDate() + days);
  return dayKey(d);
}

// Next schedule after an answer
export function nextEntry(prev, ok, loc) {
  const b = ok ? Math.min((prev ? prev.b : 0) + 1, INTERVALS.length - 1) : 0;
  return { b, d: addDays(INTERVALS[b]), p: loc.p, s: loc.s, t: loc.t };
}

// Questions due today or earlier, optionally for one pack; oldest first
export function dueEntries(profile, packId = null, today = dayKey()) {
  return Object.entries(profile?.srs || {})
    .filter(([, e]) => e && e.d && e.d <= today && (!packId || e.p === packId))
    .sort((a, b) => (a[1].d < b[1].d ? -1 : a[1].d > b[1].d ? 1 : a[1].b - b[1].b))
    .map(([id, e]) => ({ id, ...e }));
}

// When the next review is due (for "all caught up" messages)
export function nextDueDay(profile, packId = null) {
  const days = Object.values(profile?.srs || {}).filter(e => e && (!packId || e.p === packId)).map(e => e.d).sort();
  return days[0] || null;
}

export function scheduledCount(profile, packId = null) {
  return Object.values(profile?.srs || {}).filter(e => e && (!packId || e.p === packId)).length;
}

// Save the results of a quiz. answers: [{ id, ok, loc:{p,s,t} }]
// Also schedules questions answered before this feature existed (seed),
// so a student's past work counts straight away.
export async function recordAnswers(uid, profile, answers, seed = []) {
  if (!uid || !answers.length && !seed.length) return;
  const srs = profile.srs = profile.srs || {};
  const update = {};
  seed.forEach(s => {
    if (srs[s.id] || answers.some(a => a.id === s.id)) return;
    const b = s.ok ? 1 : 0;
    const e = { b, d: addDays(INTERVALS[b], new Date(s.when)), p: s.loc.p, s: s.loc.s, t: s.loc.t };
    srs[s.id] = e; update[`srs.${s.id}`] = e;
  });
  answers.forEach(a => {
    if (!a.id || !a.loc?.p) return;
    const e = nextEntry(srs[a.id], a.ok, a.loc);
    srs[a.id] = e; update[`srs.${a.id}`] = e;
  });
  if (!Object.keys(update).length) return;
  await updateDoc(doc(db, 'users', uid), update);
}

// Friendly "next review" text
export function whenText(day) {
  if (!day) return '';
  const today = dayKey();
  if (day <= today) return 'today';
  if (day === addDays(1)) return 'tomorrow';
  const [y, m, d] = day.split('-').map(Number);
  return new Date(y, m - 1, d).toLocaleDateString('en-GB', { weekday: 'long', day: 'numeric', month: 'short' });
}
