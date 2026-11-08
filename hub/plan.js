// ============================================================
// BONCE: study plans
// A parent sets each student's plan: exam dates and an intensity.
//   relaxed  🌱  a light daily habit (e.g. Abi between exams)
//   steady   📘  normal term time
//   push     🚀  the run-up to exams
//   final    🔥  the last few days before an exam
// In "auto" the level follows the next exam date: steady until three
// weeks out, push for the final two weeks, final in the last three
// days, and back to relaxed the day after the exams end.
// Saved on the student's record:
//   plan = { mode, exams:[{ id, name, start:'YYYY-MM-DD', end, packId }] }
//   planGoals = { 'YYYY-MM-DD': level }   (days the goal was hit)
// Targets can be changed by an admin (settings/plans).
// ============================================================

import { db } from './firebase-config.js';
import { doc, getDoc } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";
import { dueEntries } from './srs.js';

export const LEVEL_DEFAULTS = {
  relaxed: { label: 'Relaxed',   emoji: '🌱', mins: 15, quizzes: 1, reviews: false, either: true,  days: 4, blurb: 'A little and often' },
  steady:  { label: 'Steady',    emoji: '📘', mins: 30, quizzes: 0, reviews: true,  either: false, days: 5, blurb: 'Normal term time' },
  push:    { label: 'Exam push', emoji: '🚀', mins: 60, quizzes: 2, reviews: true,  either: false, days: 7, blurb: 'The run-up to exams' },
  final:   { label: 'Final days', emoji: '🔥', mins: 75, quizzes: 2, reviews: true, either: false, days: 7, blurb: 'The last few days before an exam' },
};
export const LEVELS = JSON.parse(JSON.stringify(LEVEL_DEFAULTS));
export const MODES = [
  { id: 'auto',    label: 'Auto: follow the exam dates' },
  { id: 'relaxed', label: '🌱 Relaxed' },
  { id: 'steady',  label: '📘 Steady' },
  { id: 'push',    label: '🚀 Exam push' },
];
export const GOAL_XP = 10;

let settingsPromise = null;
export function loadPlanSettings(force = false) {
  if (!settingsPromise || force) {
    settingsPromise = getDoc(doc(db, 'settings', 'plans'))
      .then(s => {
        const d = s.exists() ? s.data() : {};
        Object.keys(LEVEL_DEFAULTS).forEach(k => Object.assign(LEVELS[k], LEVEL_DEFAULTS[k], d[k] || {}));
        return d;
      })
      .catch(() => ({}));
  }
  return settingsPromise;
}

export function isoDay(d = new Date(Date.now())) {
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
}
function dayTime(day) { const [y, m, d] = String(day).split('-').map(Number); return new Date(y, m - 1, d).getTime(); }
export function daysBetween(a, b) { return Math.round((dayTime(b) - dayTime(a)) / 86400000); }
function addDays(day, n) { const t = new Date(dayTime(day)); t.setDate(t.getDate() + n); return isoDay(t); }

// The next (or current) exam on or after `day`
export function nextExam(profile, day = isoDay()) {
  const exams = (profile?.plan?.exams || []).filter(e => e && e.start && (e.end || e.start) >= day);
  return exams.sort((a, b) => (a.start < b.start ? -1 : 1))[0] || null;
}

// Which level applies on a given day
export function levelFor(profile, day = isoDay()) {
  const mode = profile?.plan?.mode || 'auto';
  if (mode !== 'auto') return mode;
  const ex = nextExam(profile, day);
  if (!ex) return 'relaxed';
  const to = daysBetween(day, ex.start);
  if (to <= 0) return 'push';            // during the exams
  if (to <= 3) return 'final';
  if (to <= 14) return 'push';
  return 'steady';
}

// What a student did on a given day
export function dayActivity(profile, day = isoDay()) {
  const studySecs = Object.values(profile?.study?.[day] || {}).reduce((a, b) => a + (b || 0), 0);
  const sessions = (profile?.sessions || []).filter(s => s.date && isoDay(new Date(s.date)) === day);
  const quizSecs = sessions.reduce((a, s) => a + (typeof s.secondsSpent === 'number' ? s.secondsSpent : (s.minutesSpent || 0) * 60), 0);
  return { mins: Math.floor((studySecs + quizSecs) / 60), quizzes: sessions.length };
}

// Progress towards the goal on a day (reviews only checked for today)
export function goalStatus(profile, day = isoDay()) {
  const level = levelFor(profile, day);
  const L = LEVELS[level];
  const a = dayActivity(profile, day);
  const isToday = day === isoDay();
  const reviewsLeft = L.reviews && isToday ? dueEntries(profile).length : 0;
  const minsOk = a.mins >= L.mins, quizOk = a.quizzes >= L.quizzes, revOk = reviewsLeft === 0;
  const done = L.either ? (minsOk || (L.quizzes > 0 && quizOk)) : (minsOk && quizOk && revOk);
  const pct = L.either
    ? Math.min(1, Math.max(a.mins / L.mins, L.quizzes ? a.quizzes / L.quizzes : 0))
    : Math.min(1, ((Math.min(a.mins, L.mins) / L.mins) + (L.quizzes ? Math.min(a.quizzes, L.quizzes) / L.quizzes : 1) + (revOk ? 1 : 0)) / 3);
  return { level, L, ...a, reviewsLeft, minsOk, quizOk, revOk, done: done || !!profile?.planGoals?.[day], pct: done ? 1 : pct };
}

// The last n days (oldest first), for the week view
export function planHistory(profile, n = 7, today = isoDay()) {
  const out = [];
  for (let i = n - 1; i >= 0; i--) {
    const day = addDays(today, -i);
    const g = goalStatus(profile, day);
    out.push({ day, ...g, today: i === 0 });
  }
  return out;
}

// Is the student behind their plan? Returns a short reason, or null
export function behindPlan(profile, today = isoDay()) {
  const level = levelFor(profile, today);
  const past = planHistory(profile, 8, today).slice(0, 7);          // last 7 days, not today
  const met = past.filter(d => d.done).length;
  if (level === 'push' || level === 'final') {
    const last4 = past.slice(-4).filter(d => !d.done).length;
    return last4 >= 2 ? `${last4} of the last 4 days below target` : null;
  }
  if (level === 'steady') return met < LEVELS.steady.days - 2 ? `goal hit on ${met} of the last 7 days` : null;
  const any = past.some(d => d.mins > 0 || d.quizzes > 0);
  return any ? null : 'nothing in the last 7 days';
}

// Short line about the plan, e.g. "🚀 Exam push · exams in 7 days"
export function planSummary(profile, today = isoDay()) {
  const level = levelFor(profile, today);
  const L = LEVELS[level];
  const ex = nextExam(profile, today);
  let when = '';
  if (ex) {
    const to = daysBetween(today, ex.start);
    when = to > 1 ? `${ex.name || 'Exams'} in ${to} days` : to === 1 ? `${ex.name || 'Exams'} tomorrow` : `${ex.name || 'Exams'} now`;
  }
  return { level, L, exam: ex, when, text: `${L.emoji} ${L.label}${when ? ' · ' + when : ''}` };
}

export function targetText(L) {
  const parts = [`${L.mins} min`];
  if (L.quizzes) parts.push(`${L.quizzes} quiz${L.quizzes === 1 ? '' : 'zes'}`);
  if (L.reviews) parts.push('reviews cleared');
  return L.either ? `${L.mins} min or ${L.quizzes || 1} quiz` : parts.join(' + ');
}
