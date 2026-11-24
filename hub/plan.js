// ============================================================
// LOBE LIMPET: study plans
// A parent sets each student's plan: exam dates and an intensity.
//   relaxed  🌱  a light daily habit (e.g. Abi between exams)
//   steady   📘  normal term time
//   push     🚀  the run-up to exams
//   final    🔥  the last few days before an exam
// In "auto" the level follows the next exam date: steady until three
// weeks out, push for the final two weeks, final in the last three
// days, and back to relaxed the day after the exams end. During a run of
// exams it stays at final while papers are still to come.
// Saved on the student's record:
//   plan = { mode, exams:[{ id, name, start:'YYYY-MM-DD', end, packId,
//                           subjectId, subjectPackId }],   (subject: one paper)
//            overrides: { day: { level, subjectId, packId, subjectId2, packId2 } },
//            reviewsOff: true }   (a parent turned off "reviews count towards
//                                  the daily goal"; missing = on)
//   planGoals = { 'YYYY-MM-DD': level }   (days the goal was hit)
// Targets can be changed by an admin (settings/plans).
// ============================================================

import { db } from './firebase-config.js?v=20261124o';
import { doc, getDoc } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";
import { dueEntries } from './srs.js?v=20261124o';

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
  { id: 'final',   label: '🔥 Final days' },
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

// The next (or current) run of exams: exams within 3 days of each other
// count as one run, so separate papers on separate days (Geography Mon,
// Biology Tue...) work like one week-long span. Returns
// { start, end, name, exams } or null.
export function examRun(profile, day = isoDay()) {
  const exams = (profile?.plan?.exams || []).filter(e => e && e.start).sort((a, b) => (a.start < b.start ? -1 : 1));
  const runs = [];
  exams.forEach(e => {
    const end = e.end && e.end >= e.start ? e.end : e.start;
    const r = runs[runs.length - 1];
    if (r && daysBetween(r.end, e.start) <= 3) { r.exams.push(e); if (end > r.end) r.end = end; }
    else runs.push({ start: e.start, end, exams: [e] });
  });
  const run = runs.find(r => r.end >= day);
  if (!run) return null;
  const span = run.exams.find(e => !e.subjectId);
  run.name = span ? span.name : run.exams.length === 1 ? run.exams[0].name : 'exams';
  return run;
}

// Which level applies on a given day (a parent's change for that day wins)
export function levelFor(profile, day = isoDay()) {
  const ov = profile?.plan?.overrides?.[day];
  if (ov?.level && LEVELS[ov.level]) return ov.level;
  const mode = profile?.plan?.mode || 'auto';
  if (mode !== 'auto') return mode;
  const ex = examRun(profile, day);
  if (!ex) return 'relaxed';
  const to = daysBetween(day, ex.start);
  if (to <= 0) {
    // During the exams: Final days while papers are still to come
    // (Monday's paper shouldn't drop Friday's revision), then ease off.
    if (ex.exams.some(e => e.start > day)) return 'final';
    return ex.end > day ? 'steady' : 'relaxed';   // a span with no paper dates, or the last day
  }
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

// Does clearing due reviews count towards this student's goal? On unless a
// parent has switched it off (plan.reviewsOff)
export function reviewsRequired(profile, L) {
  return !!L?.reviews && !profile?.plan?.reviewsOff;
}

// Progress towards the goal on a day (reviews only checked for today)
export function goalStatus(profile, day = isoDay()) {
  const level = levelFor(profile, day);
  const L = LEVELS[level];
  const a = dayActivity(profile, day);
  const isToday = day === isoDay();
  const needRev = reviewsRequired(profile, L);
  const reviewsLeft = needRev && isToday ? dueEntries(profile).length : 0;
  const minsOk = a.mins >= L.mins, quizOk = a.quizzes >= L.quizzes, revOk = reviewsLeft === 0;
  if (level === 'rest') return { level, L, ...a, reviewsLeft: 0, needRev: false, minsOk: true, quizOk: true, revOk: true, rest: true, done: false, pct: 0 };
  const done = L.either ? (minsOk || (L.quizzes > 0 && quizOk)) : (minsOk && quizOk && revOk);
  const pct = L.either
    ? Math.min(1, Math.max(a.mins / L.mins, L.quizzes ? a.quizzes / L.quizzes : 0))
    : Math.min(1, ((Math.min(a.mins, L.mins) / L.mins) + (L.quizzes ? Math.min(a.quizzes, L.quizzes) / L.quizzes : 1) + (needRev ? (revOk ? 1 : 0) : 0)) / (needRev ? 3 : 2));
  return { level, L, ...a, reviewsLeft, needRev, minsOk, quizOk, revOk, done: done || !!profile?.planGoals?.[day], pct: done ? 1 : pct };
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
  const ex = examRun(profile, today);
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
  return { score, why, avg, dueN, since };
}

// Day-by-day plan from a few days ago up to the end of the next run of
// exams (or two weeks ahead when there are none). Each future day gets one
// suggested subject, or two on Exam push and Final days. Weaker subjects
// come up more often; a subject with a paper in the next few days gets a
// boost, the day before its paper it comes first, and once its last paper
// is done it drops out. A parent's choices (plan.overrides) win.
// `subjects` are the rotation (the plan's pack); `extra` are subjects from
// the student's other packs, used for a parent's choice or a dated paper.
export function planSchedule(profile, subjects = [], packId = null, { back = 3, extra = [] } = {}) {
  const today = isoDay();
  const ex = examRun(profile, today);
  const last = ex ? ex.end : addDays(today, 13);
  const first = addDays(today, -back);
  const byId = Object.fromEntries([...extra, ...subjects].map(s => [s.id, s]));
  const exams = (profile?.plan?.exams || []).filter(e => e && e.start);
  const papers = exams.filter(e => e.subjectId);
  // The rotation: the plan's pack, plus any subject with a paper still to
  // come. When the next exams are all single-subject papers (no week-long
  // span), only the subjects being examined are revised.
  let pool = [...subjects];
  papers.forEach(p => { if (p.start > today && byId[p.subjectId] && !pool.some(s => s.id === p.subjectId)) pool.push(byId[p.subjectId]); });
  if (ex && ex.exams.every(e => e.subjectId)) pool = pool.filter(s => ex.exams.some(e => e.subjectId === s.id));
  const need = Object.fromEntries(pool.map(s => [s.id, subjectNeed(profile, s, s.packId || packId, today)]));
  const ranked = pool.map(s => ({ s, ...need[s.id] })).sort((a, b) => b.score - a.score);
  const nextPaper = (sid, day) => papers.filter(p => p.subjectId === sid && p.start > day).sort((a, b) => (a.start < b.start ? -1 : 1))[0] || null;
  const finished = (sid, day) => papers.some(p => p.subjectId === sid) && !nextPaper(sid, day);
  const lastPick = {};
  const score = (s, day) => {
    const n = need[s.id] || { avg: null, dueN: 0, since: 30 };
    const gap = lastPick[s.id] ? daysBetween(lastPick[s.id], day) : n.since + daysBetween(today, day);
    // weakness, reviews due, and days since it last came up (so every subject gets a turn)
    let sc = (n.avg === null ? 40 : 100 - n.avg) + n.dueN * 3 + Math.min(gap, 10) * 15;
    const p = nextPaper(s.id, day), to = p ? daysBetween(day, p.start) : null;
    if (to === 1) sc += 1000; else if (to !== null && to <= 5) sc += (6 - to) * 45;
    return sc;
  };
  const examWhy = (s, day) => {
    const p = nextPaper(s.id, day), to = p ? daysBetween(day, p.start) : null;
    return to === 1 ? `${s.name} exam tomorrow` : to !== null && to <= 5 ? `${s.name} exam in ${to} days` : null;
  };
  const out = [];
  for (let day = first; day <= last; day = addDays(day, 1)) {
    const ov = profile?.plan?.overrides?.[day] || {};
    const g = goalStatus(profile, day);
    const dayExams = exams.filter(e => day >= e.start && day <= (e.end || e.start));
    const isPast = day < today;
    let picks = [];
    if (isPast) {
      // what they actually spent most time on that day (two if both had 10+ minutes)
      const st = Object.entries(profile?.study?.[day] || {}).filter(([id]) => byId[id]).sort((a, b) => b[1] - a[1]);
      picks = st.filter(([, secs], i) => i === 0 || (i === 1 && secs >= 600)).map(([id]) => byId[id]);
    } else if (g.level !== 'rest') {
      const slots = ov.subjectId2 === '-' ? 1 : ov.subjectId2 && byId[ov.subjectId2] ? 2 : (g.level === 'push' || g.level === 'final') ? 2 : 1;
      const cands = pool.filter(s => !finished(s.id, day)).map(s => ({ s, sc: score(s, day) })).sort((a, b) => b.sc - a.sc);
      const best = (not) => cands.find(c => !not.includes(c.s.id))?.s || null;
      const one = ov.subjectId && byId[ov.subjectId] ? byId[ov.subjectId] : best([]);
      if (one) picks.push(one);
      if (slots === 2) {
        const two = ov.subjectId2 && byId[ov.subjectId2] ? byId[ov.subjectId2] : best(picks.map(s => s.id));
        if (two && !picks.some(s => s.id === two.id)) picks.push(two);
      }
      picks.forEach(s => { lastPick[s.id] = day; });
    }
    out.push({ day, ...g, past: isPast, today: day === today, exam: dayExams[0] || null, exams: dayExams,
      subject: picks[0] || null, subjects: picks, reasons: picks.map(s => isPast ? null : examWhy(s, day)), override: ov,
      status: isPast ? (g.rest ? 'rest' : g.done ? 'met' : (g.mins || g.quizzes) ? 'part' : 'missed') : (day === today ? (g.done ? 'met' : 'today') : 'ahead') });
  }
  return { days: out, exam: ex, ranked };
}

// Which pack the plan is for: the next exam's pack if one is set, else the
// pack the student is currently using
export function planPack(profile) {
  const ex = examRun(profile);
  // (a single-subject paper's pack doesn't count: the subject sets its own)
  return ex?.exams.find(e => e.packId && !e.subjectId)?.packId || profile?.currentPackId || (profile?.groupIds || [])[0] || Object.values(profile?.classPacks || {}).flat()[0] || null;
}

// Every revision pack the student has, the plan's pack first (not their
// own flashcard sets)
export function planPacks(profile) {
  const ids = [planPack(profile), profile?.currentPackId, ...(profile?.groupIds || []), profile?.groupId,
    ...(profile?.packIds || []), ...Object.values(profile?.classPacks || {}).flat()];
  return [...new Set(ids.filter(id => id && id !== profile?.myPackId))];
}

export function targetText(L) {
  if (L === REST || L.label === 'Rest day') return 'day off';
  const parts = [`${L.mins} min`];
  if (L.quizzes) parts.push(`${L.quizzes} quiz${L.quizzes === 1 ? '' : 'zes'}`);
  if (L.reviews) parts.push('reviews cleared');
  return L.either ? `${L.mins} min or ${L.quizzes || 1} quiz` : parts.join(' + ');
}
