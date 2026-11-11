// ============================================================
// LOBE LIMPET: study plans
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

import { db } from './firebase-config.js?v=20261111r';
import { doc, getDoc } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";
import { dueEntries } from './srs.js?v=20261111r';

export const LEVEL_DEFAULTS = {
  relaxed: { label: 'Relaxed',   emoji: '🌱', mins: 15, quizzes: 1, reviews: false, either: true,  days: 4, blurb: 'A little and often' },
  steady:  { label: 'Steady',    emoji: '📘', mins: 30, quizzes: 0, reviews: true,  either: false, days: 5, blurb: 'Normal term time' },
  push:    { label: 'Exam push', emoji: '🚀', mins: 60, quizzes: 2, reviews: true,  either: false, days: 7, blurb: 'The run-up to exams' },
  final:   { label: 'Final days', emoji: '🔥', mins: 75, quizzes: 2, reviews: true, either: false, days: 7, blurb: 'The last few days before an exam' },
};
export const LEVELS = JSON.parse(JSON.stringify(LEVEL_DEFAULTS));
// A day off set by a parent: no goal, and it never counts as missed
const REST = { label: 'Rest day', emoji: '😴', mins: 0, quizzes: 0, reviews: false, either: false, days: 0, blurb: 'A day off' };
LEVELS.rest = REST;
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
        LEVELS.rest = REST;
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

// Which level applies on a given day (a parent's change for that day wins)
export function levelFor(profile, day = isoDay()) {
  const ov = profile?.plan?.overrides?.[day];
  if (ov?.level && LEVELS[ov.level]) return ov.level;
  const mode = profile?.plan?.mode || 'auto';
  if (mode !== 'auto') return mode;
  const ex = nextExam(profile, day);
  if (!ex) return 'relaxed';
  const to = daysBetween(day, ex.start);
  if (to <= 0) return 'steady';          // during the exams: lighter, revise between papers
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
  if (level === 'rest') return { level, L, ...a, reviewsLeft: 0, minsOk: true, quizOk: true, revOk: true, rest: true, done: false, pct: 0 };
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
  const past = planHistory(profile, 8, today).slice(0, 7).filter(d => !d.rest);   // last 7 days, not today, not rest days
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

// How much a subject needs attention: weak average, reviews due, time
// since last revised. Returns { score, why: [reasons] }
export function subjectNeed(profile, s, packId, today = isoDay()) {
  const ses = (profile?.sessions || []).filter(x => !x.review && (x.subjectId === s.id || x.subject === s.name));
  const recent = ses.slice(-6);
  const avg = recent.length ? recent.reduce((a, x) => a + (x.pct || 0), 0) / recent.length : null;
  const dueN = dueEntries(profile, packId).filter(e => e.s === s.id).length;
  const lastQuiz = Math.max(0, ...ses.map(x => x.date || 0));
  const studyDays = Object.keys(profile?.study || {}).filter(d => (profile.study[d] || {})[s.id] > 0).sort();
  const last = Math.max(lastQuiz ? dayTime(isoDay(new Date(lastQuiz))) : 0, studyDays.length ? dayTime(studyDays[studyDays.length - 1]) : 0);
  const since = last ? daysBetween(isoDay(new Date(last)), today) : 30;
  const score = (avg === null ? 40 : 100 - avg) + dueN * 3 + Math.min(since, 14) * 4;
  const why = [];
  if (avg !== null && avg < 65) why.push(`average ${Math.round(avg)}%`);
  if (dueN) why.push(`${dueN} review${dueN === 1 ? '' : 's'} due`);
  if (since >= 3) why.push(last ? `not revised for ${since} days` : 'not started yet');
  if (!why.length) why.push(avg !== null ? `keep it ticking over (${Math.round(avg)}% average)` : 'keep every subject ticking over');
  return { score, why, avg };
}

// Day-by-day plan from a few days ago up to the end of the next exams
// (or two weeks ahead when there are none). Each future day gets a
// suggested subject: weaker subjects come up more often, every subject
// at least once a round. A parent's choices (plan.overrides) win.
export function planSchedule(profile, subjects = [], packId = null, { back = 3 } = {}) {
  const today = isoDay();
  const ex = nextExam(profile, today);
  const last = ex ? (ex.end || ex.start) : addDays(today, 13);
  const first = addDays(today, -back);
  const byId = Object.fromEntries(subjects.map(s => [s.id, s]));
  // Rotation: weakest third ×3, middle ×2, rest ×1 per cycle
  const ranked = subjects.map(s => ({ s, ...subjectNeed(profile, s, packId, today) })).sort((a, b) => b.score - a.score);
  const n = ranked.length, seq = [];
  for (let r = 0; r < 3; r++) ranked.forEach((x, i) => { const w = i < Math.ceil(n / 3) ? 3 : i < Math.ceil(2 * n / 3) ? 2 : 1; if (w > r) seq.push(x.s); });
  const exams = (profile?.plan?.exams || []).filter(e => e && e.start);
  const out = [];
  let k = 0;
  for (let day = first; day <= last; day = addDays(day, 1)) {
    const ov = profile?.plan?.overrides?.[day] || {};
    const g = goalStatus(profile, day);
    const exam = exams.find(e => day >= e.start && day <= (e.end || e.start));
    const isPast = day < today;
    let subject = null;
    if (ov.subjectId && byId[ov.subjectId]) subject = byId[ov.subjectId];
    else if (!isPast && g.level !== 'rest' && seq.length) subject = seq[k++ % seq.length];
    else if (isPast) {
      // what they actually spent most time on that day
      const st = profile?.study?.[day] || {};
      const top = Object.entries(st).sort((a, b) => b[1] - a[1])[0];
      subject = top && byId[top[0]] ? byId[top[0]] : null;
    }
    out.push({ day, ...g, past: isPast, today: day === today, exam: exam || null, subject, override: ov,
      status: isPast ? (g.rest ? 'rest' : g.done ? 'met' : (g.mins || g.quizzes) ? 'part' : 'missed') : (day === today ? (g.done ? 'met' : 'today') : 'ahead') });
  }
  return { days: out, exam: ex, ranked };
}

// Which pack the plan is for
export function planPack(profile) {
  const ex = nextExam(profile);
  return ex?.packId || profile?.currentPackId || (profile?.groupIds || [])[0] || Object.values(profile?.classPacks || {}).flat()[0] || null;
}

export function targetText(L) {
  if (L === REST || L.label === 'Rest day') return 'day off';
  const parts = [`${L.mins} min`];
  if (L.quizzes) parts.push(`${L.quizzes} quiz${L.quizzes === 1 ? '' : 'zes'}`);
  if (L.reviews) parts.push('reviews cleared');
  return L.either ? `${L.mins} min or ${L.quizzes || 1} quiz` : parts.join(' + ');
}
