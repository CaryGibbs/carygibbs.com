// ============================================================
// CLASP — Gamification Engine
// XP, levels, badges, streaks
// ============================================================

import { db } from './firebase-config.js?v=20261110k';
import { logEvent } from './log.js?v=20261110k';
import { goalStatus, loadPlanSettings, isoDay as planDay, GOAL_XP } from './plan.js?v=20261110k';
import {
  doc, getDoc, updateDoc, arrayUnion
} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";

/* ── XP values ───────────────────────────────────────────── */
export const XP = {
  QUIZ_BASE:      10,
  QUIZ_SCORE_MAX: 10,   // bonus scales with score %
  MINDMAP_VIEW:    2,
  STREAK_BONUS:    5,
  TIME_PER_5MIN:   1,
  LEARN_POINT:     2,   // marking a key point as learnt
  CHEATSHEET:      3,   // first time reading a topic's cheat sheet
};

/* ── Level thresholds ────────────────────────────────────── */
export const LEVELS = [
  { level: 1, name: 'Beginner',  xpRequired: 0,    icon: '🌱', colour: '#8888aa' },
  { level: 2, name: 'Explorer',  xpRequired: 100,  icon: '🧭', colour: '#6c63ff' },
  { level: 3, name: 'Scholar',   xpRequired: 250,  icon: '📚', colour: '#0ea5e9' },
  { level: 4, name: 'Expert',    xpRequired: 500,  icon: '🔬', colour: '#12b886' },
  { level: 5, name: 'Master',    xpRequired: 1000, icon: '⭐', colour: '#f59f00' },
  { level: 6, name: 'Legend',    xpRequired: 2500, icon: '🏆', colour: '#ff6b6b' },
];

/* ── Level helpers ───────────────────────────────────────── */
export function getLevelInfo(totalXp) {
  let current = LEVELS[0];
  let next    = LEVELS[1];
  for (let i = LEVELS.length - 1; i >= 0; i--) {
    if (totalXp >= LEVELS[i].xpRequired) {
      current = LEVELS[i];
      next    = LEVELS[i + 1] || null;
      break;
    }
  }
  const xpIntoLevel = totalXp - current.xpRequired;
  const xpNeeded    = next ? next.xpRequired - current.xpRequired : 0;
  const progress    = next ? Math.min(100, Math.round((xpIntoLevel / xpNeeded) * 100)) : 100;
  return { current, next, xpIntoLevel, xpNeeded, progress };
}

export function calcQuizXp(pct) {
  return XP.QUIZ_BASE + Math.round((pct / 100) * XP.QUIZ_SCORE_MAX);
}

/* ── Streak helpers ──────────────────────────────────────── */
// Whole calendar days between two times (local time), e.g. 23:00 yesterday
// to 07:00 today is 1, even though it's only 8 hours.
export function calendarDaysBetween(earlier, later = Date.now()) {
  const a = new Date(earlier), b = new Date(later);
  const da = Date.UTC(a.getFullYear(), a.getMonth(), a.getDate());
  const db_ = Date.UTC(b.getFullYear(), b.getMonth(), b.getDate());
  return Math.round((db_ - da) / 86400000);
}

// The streak to show right now: it only counts if they revised today or
// yesterday; otherwise it has lapsed (even though it's not reset until
// they next revise).
export function currentStreak(profile) {
  if (!profile) return 0;
  // Shields keep a streak alive through 1 or 2 missed days
  const cover = SHIELDS.ENABLED ? Math.min(profile.shields || 0, SHIELDS.MAX) : 0;
  const stored = (profile.lastRevisionDate && calendarDaysBetween(profile.lastRevisionDate) <= 1 + cover) ? (profile.streak || 0) : 0;
  return Math.max(stored, streakFromHistory(profile));
}

/* ── Streak shields and streak repair ─────────────────────────
   Shields: earned one per 7 days in a row (hold up to 2). A missed day
   uses one automatically and the streak carries on.
   Repair: if a streak of 2+ days ends after missing 1 or 2 days (and no
   shield covers it), the student can win it back by revising for an
   hour that day: study time counts minute for minute, and each quiz or
   review scoring 60%+ counts as 10 minutes. Once a fortnight at most. */
// Defaults; an admin can change them in Admin → Settings → Streaks
// (saved at settings/streaks and loaded by loadStreakSettings()).
export const REPAIR_DEFAULTS  = { ENABLED: true, MINUTES: 60, QUIZ_MINUTES: 10, QUIZ_PASS: 60, MAX_MISSED: 2, MIN_STREAK: 2, COOLDOWN_DAYS: 14, BONUS_XP: 20 };
export const SHIELD_DEFAULTS  = { ENABLED: true, EVERY: 7, MAX: 2 };
export const REPAIR  = { ...REPAIR_DEFAULTS };
export const SHIELDS = { ...SHIELD_DEFAULTS };

let streakSettingsPromise = null;
export function loadStreakSettings(force = false) {
  if (!streakSettingsPromise || force) {
    streakSettingsPromise = getDoc(doc(db, 'settings', 'streaks'))
      .then(s => {
        const d = s.exists() ? s.data() : {};
        Object.assign(REPAIR, REPAIR_DEFAULTS, d.repair || {});
        Object.assign(SHIELDS, SHIELD_DEFAULTS, d.shields || {});
        return d;
      })
      .catch(() => ({}));
  }
  return streakSettingsPromise;
}

function isoDay(d = new Date(Date.now())) {
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
}
function isoToTime(day) { const [y, m, d] = String(day).split('-').map(Number); return new Date(y, m - 1, d).getTime(); }

// Today's progress towards winning a streak back
export function repairProgress(profile, day = isoDay()) {
  const studyMins = Math.floor(Object.values(profile?.study?.[day] || {}).reduce((a, b) => a + (b || 0), 0) / 60);
  const quizzes = (profile?.sessions || []).filter(s => s.date && isoDay(new Date(s.date)) === day && (s.pct || 0) >= REPAIR.QUIZ_PASS).length;
  const total = studyMins + quizzes * REPAIR.QUIZ_MINUTES;
  return { mins: Math.min(total, REPAIR.MINUTES), studyMins, quizzes, done: total >= REPAIR.MINUTES };
}

function repairAllowed(profile, missed) {
  if (!REPAIR.ENABLED) return false;
  if (missed < 1 || missed > REPAIR.MAX_MISSED) return false;
  if ((profile.streak || 0) < REPAIR.MIN_STREAK) return false;
  if (profile.lastRepairDay && calendarDaysBetween(isoToTime(profile.lastRepairDay)) < REPAIR.COOLDOWN_DAYS) return false;
  return true;
}

// The repair on offer today, if any: { from, progress, started, done }
export function repairOffer(profile) {
  if (!profile) return null;
  const today = isoDay();
  const r = profile.streakRepair;
  if (r && r.day === today) return { from: r.from, progress: repairProgress(profile), started: true, done: !!r.done };
  if (!profile.lastRevisionDate) return null;
  const missed = calendarDaysBetween(profile.lastRevisionDate) - 1;
  if (SHIELDS.ENABLED && missed <= Math.min(profile.shields || 0, SHIELDS.MAX)) return null;   // a shield will cover it
  if (!repairAllowed(profile, missed)) return null;
  return { from: profile.streak, progress: repairProgress(profile), started: false, done: false };
}

// Count consecutive days of activity (quizzes, study time, last revision)
// ending today or yesterday. Corrects streaks recorded before the
// calendar-day fix.
export function streakFromHistory(profile, { endingYesterday = false } = {}) {
  const days = new Set();
  (profile.sessions || []).forEach(s => { if (s.date) days.add(localDayKey(s.date)); });
  studyEntries(profile).forEach(e => days.add(localDayKey(e.date)));
  if (profile.lastRevisionDate) days.add(localDayKey(profile.lastRevisionDate));
  const now = new Date(Date.now());
  let offset = (!endingYesterday && days.has(localDayKey(now))) ? 0 : 1;
  let count = 0;
  for (;; offset++) {
    const d = new Date(now.getFullYear(), now.getMonth(), now.getDate() - offset);
    if (!days.has(localDayKey(d))) break;
    count++;
  }
  return count;
}

// Longest run of consecutive revision days ever (from history)
export function longestStreak(profile) {
  const days = new Set();
  (profile.sessions || []).forEach(s => { if (s.date) days.add(localDayKey(s.date)); });
  studyEntries(profile).forEach(e => days.add(localDayKey(e.date)));
  if (profile.lastRevisionDate) days.add(localDayKey(profile.lastRevisionDate));
  const sorted = [...days].map(k => { const [y, m, d] = k.split('-').map(Number); return new Date(y, m, d).getTime(); }).sort((a, b) => a - b);
  let best = 0, run = 0, prev = null;
  sorted.forEach(t => {
    run = (prev !== null && calendarDaysBetween(prev, t) === 1) ? run + 1 : 1;
    best = Math.max(best, run); prev = t;
  });
  return best;
}

// Best streak ever: saved value, last streak, or worked out from history
export function bestStreak(profile) {
  if (!profile) return 0;
  return Math.max(profile.bestStreak || 0, profile.streak || 0, longestStreak(profile), currentStreak(profile));
}

// What to show: { current, best, lapsed } (lapsed = had a streak, now 0)
export function streakStatus(profile) {
  const current = currentStreak(profile), best = bestStreak(profile);
  return { current, best, lapsed: current === 0 && best > 0 };
}

export function updateStreak(profile) {
  const now       = Date.now();
  const lastDate  = profile.lastRevisionDate || 0;
  const daysSince = lastDate ? calendarDaysBetween(lastDate, now) : Infinity;

  // Days in a row up to yesterday (today's quiz may already be saved, so
  // it's left out here and added once below)
  const before = streakFromHistory(profile, { endingYesterday: true });
  let streak = profile.streak || 0;
  let streakBonus = 0;
  let shields = profile.shields || 0;
  let shieldUsed = null;
  let streakRepair = profile.streakRepair || null;
  const missed = daysSince - 1;
  const today = isoDay(new Date(now));

  if (daysSince === 0) {
    // Already revised today: no change (but correct an undercount)
    streak = Math.max(streak, before + 1);
  } else if (daysSince === 1) {
    // Consecutive day: extend the streak
    streak = Math.max(streak, before) + 1;
    streakBonus = XP.STREAK_BONUS;
  } else if (SHIELDS.ENABLED && lastDate && missed >= 1 && missed <= shields) {
    // Missed a day or two, but shields cover it: the streak carries on
    shields -= missed;
    shieldUsed = { day: today, count: missed };
    streak = streak + 1;
    streakBonus = XP.STREAK_BONUS;
  } else {
    // First revision, or a day was missed: today is day 1, but they can
    // win the old streak back today
    if (lastDate && repairAllowed(profile, missed)) streakRepair = { from: profile.streak, day: today, done: false };
    streak = 1;
  }
  // A shield for every 7 days in a row
  if (SHIELDS.ENABLED && streak > (profile.streak || 0) && streak % SHIELDS.EVERY === 0) shields = Math.min(SHIELDS.MAX, shields + 1);

  return { streak, lastRevisionDate: now, streakBonus, shields, shieldUsed, streakRepair };
}

/* ── Badge definitions ───────────────────────────────────── */
// Badges are grouped into families. Each family has tiers that get
// progressively harder, so there is always a next goal to aim for.
// `metric` is computed by computeMetrics(); a badge is earned when
// metrics[metric] >= target. IDs of the original badges are kept so
// nothing already earned is lost.

export const TIERS = {
  1: { name: 'Bronze',   colour: '#cd7f32' },
  2: { name: 'Silver',   colour: '#8a9bb0' },
  3: { name: 'Gold',     colour: '#e0a800' },
  4: { name: 'Platinum', colour: '#7c6cf0' },
};

export const BADGE_FAMILIES = [
  { id: 'days',     name: 'Showing up',       icon: '📅', blurb: 'Revise on lots of different days' },
  { id: 'streak',   name: 'Streaks',          icon: '🔥', blurb: 'Revise on days in a row' },
  { id: 'comeback', name: 'Comebacks',        icon: '🦸', blurb: 'Win back a streak, or let a shield save it' },
  { id: 'plan',     name: 'Study plan',       icon: '🎯', blurb: 'Hit your daily study goal' },
  { id: 'time',     name: 'Time invested',    icon: '⏱️', blurb: 'Build up total revision time' },
  { id: 'week',     name: 'Big weeks',        icon: '💪', blurb: 'Put the hours in within one week' },
  { id: 'quizzes',  name: 'Quizzes',          icon: '🎯', blurb: 'Finish quizzes' },
  { id: 'improve',  name: 'Getting better',   icon: '📈', blurb: 'Retry a topic and beat your first score' },
  { id: 'leap',     name: 'Big leaps',        icon: '🚀', blurb: 'Make a big jump on a topic you found hard' },
  { id: 'mastery',  name: 'Topic mastery',    icon: '🎓', blurb: 'Score 80%+ on different topics' },
  { id: 'scores',   name: 'High scores',      icon: '🌟', blurb: 'Score 80% or more' },
  { id: 'perfect',  name: 'Perfect scores',   icon: '💯', blurb: 'Score 100%' },
  { id: 'subjects', name: 'All-round',        icon: '🌍', blurb: 'Revise across different subjects' },
  { id: 'written',  name: 'Written answers',  icon: '✏️', blurb: 'Take on written-answer questions' },
  { id: 'types',    name: 'Question types',   icon: '🧩', blurb: 'Try every kind of question' },
  { id: 'mindmaps', name: 'Mind maps',        icon: '🗺️', blurb: 'Use mind maps to review topics' },
  { id: 'learner',  name: 'Learning',         icon: '🧠', blurb: 'Mark key points as learnt' },
  { id: 'topicsDone', name: 'Topics learnt',  icon: '📗', blurb: 'Learn every point in a topic' },
  { id: 'sheets',   name: 'Cheat sheets',     icon: '📄', blurb: 'Read topic cheat sheets' },
  { id: 'review',   name: 'Review today',     icon: '🔁', blurb: 'Come back to review what\'s due' },
  { id: 'memory',   name: 'Long-term memory', icon: '🧲', blurb: 'Keep questions right for weeks at a time' },
  { id: 'study',    name: 'Study time',       icon: '📖', blurb: 'Time spent learning, not just quizzing' },
  { id: 'levels',   name: 'Levels',           icon: '🏆', blurb: 'Earn XP to level up' },
];

const B = (id, family, tier, metric, target, name, icon, desc) =>
  ({ id, family, tier, metric, target, name, icon, desc });

export const BADGES = [
  // Showing up: distinct days with a quiz (rewards consistency without the pressure of an unbroken streak)
  B('days_3',   'days', 1, 'studyDays', 3,   'Getting Going',   '📅', 'Revised on 3 different days'),
  B('days_10',  'days', 2, 'studyDays', 10,  'Regular',         '🗓️', 'Revised on 10 different days'),
  B('days_25',  'days', 3, 'studyDays', 25,  'Habit Formed',    '📆', 'Revised on 25 different days'),
  B('days_50',  'days', 4, 'studyDays', 50,  'Part of Life',    '🏛️', 'Revised on 50 different days'),

  // Streaks
  B('streak_3',  'streak', 1, 'streak', 3,  'On a Roll',        '🔥', '3-day revision streak'),
  B('streak_7',  'streak', 2, 'streak', 7,  'Week Warrior',     '⚡', '7-day revision streak'),
  B('streak_14', 'streak', 3, 'streak', 14, 'Fortnight Focus',  '🌋', '14-day revision streak'),
  B('streak_30', 'streak', 4, 'streak', 30, 'Unstoppable',      '🚀', '30-day revision streak'),
  B('repair_1',  'comeback', 1, 'repairsDone', 1, 'Comeback Kid', '🦸', 'Won back a lost streak with an hour of revision'),
  B('goal_1',    'plan', 1, 'goalsHit', 1,  'On Target',   '🎯', 'Hit your daily study goal'),
  B('goal_10',   'plan', 2, 'goalsHit', 10, 'Goal Getter', '🥅', 'Hit your daily study goal 10 times'),
  B('goal_30',   'plan', 3, 'goalsHit', 30, 'Clockwork',   '⏰', 'Hit your daily study goal 30 times'),
  B('exam_week', 'plan', 4, 'examRun', 7,   'Exam Ready',  '🎓', 'Hit your goal every day for a week in an exam push'),
  B('shield_1',  'comeback', 1, 'shieldsUsed', 1, 'Safety Net',   '🛡️', 'A streak shield kept your streak going'),

  // Total time (minutes)
  B('time_60',   'time', 1, 'totalMins', 60,   'First Hour',     '⏱️', '1 hour of quiz revision in total'),
  B('time_300',  'time', 2, 'totalMins', 300,  'Five Hours',     '⏳', '5 hours of quiz revision in total'),
  B('time_600',  'time', 3, 'totalMins', 600,  'Ten Hours',      '🕰️', '10 hours of quiz revision in total'),
  B('time_1500', 'time', 4, 'totalMins', 1500, 'Marathon',       '🏃', '25 hours of quiz revision in total'),

  // Best week (Monday to Sunday, minutes)
  B('week_60',  'week', 1, 'bestWeekMins', 60,  'Solid Week',     '💪', '1 hour of revision in one week'),
  B('week_120', 'week', 2, 'bestWeekMins', 120, 'Strong Week',    '🏋️', '2 hours of revision in one week'),
  B('week_240', 'week', 3, 'bestWeekMins', 240, 'Power Week',     '⚙️', '4 hours of revision in one week'),
  B('week_420', 'week', 4, 'bestWeekMins', 420, 'Exam Mode',      '🧠', '7 hours of revision in one week'),

  // Quiz count
  B('first_quiz', 'quizzes', 1, 'quizzes', 1,   'First Steps',   '🎯', 'Completed your first quiz'),
  B('quiz_10',    'quizzes', 1, 'quizzes', 10,  'Committed',     '🔟', 'Completed 10 quizzes'),
  B('quiz_25',    'quizzes', 2, 'quizzes', 25,  'Dedicated',     '💼', 'Completed 25 quizzes'),
  B('quiz_50',    'quizzes', 3, 'quizzes', 50,  'Quiz Legend',   '🏅', 'Completed 50 quizzes'),
  B('quiz_100',   'quizzes', 4, 'quizzes', 100, 'Centurion',     '💎', 'Completed 100 quizzes'),

  // Improvement: topics where a later attempt beat the first
  B('improve_1',  'improve', 1, 'improvedTopics', 1,  'Comeback',       '📈', 'Beat your first score on a topic'),
  B('improve_5',  'improve', 2, 'improvedTopics', 5,  'Improver',       '📊', 'Beat your first score on 5 topics'),
  B('improve_15', 'improve', 3, 'improvedTopics', 15, 'Always Better',  '🧗', 'Beat your first score on 15 topics'),
  B('improve_30', 'improve', 4, 'improvedTopics', 30, 'Growth Mindset', '🌱', 'Beat your first score on 30 topics'),

  // Big leaps: biggest gain over the first attempt on any topic (percentage points)
  B('leap_20', 'leap', 1, 'bestLeap', 20, 'Step Up',     '🪜', 'Improved a topic by 20 points'),
  B('leap_35', 'leap', 2, 'bestLeap', 35, 'Big Leap',    '🦘', 'Improved a topic by 35 points'),
  B('leap_50', 'leap', 3, 'bestLeap', 50, 'Turnaround',  '🔄', 'Improved a topic by 50 points'),

  // Mastery: distinct topics scored 80%+
  B('master_1',  'mastery', 1, 'masteredTopics', 1,  'Nailed It',     '✅', 'Scored 80%+ on a topic'),
  B('master_5',  'mastery', 2, 'masteredTopics', 5,  'Topic Tamer',   '🎓', 'Scored 80%+ on 5 different topics'),
  B('master_15', 'mastery', 3, 'masteredTopics', 15, 'Subject Ace',   '🥇', 'Scored 80%+ on 15 different topics'),
  B('master_30', 'mastery', 4, 'masteredTopics', 30, 'Grand Master',  '👑', 'Scored 80%+ on 30 different topics'),

  // High scores
  B('high_scorer', 'scores', 1, 'highScores', 5,  'High Achiever', '🌟', 'Scored 80%+ five times'),
  B('high_20',     'scores', 2, 'highScores', 20, 'Consistent',    '✨', 'Scored 80%+ twenty times'),
  B('high_50',     'scores', 3, 'highScores', 50, 'Top Form',      '💫', 'Scored 80%+ fifty times'),

  // Perfect scores
  B('perfect_score', 'perfect', 1, 'perfectScores', 1,  'Perfectionist', '💯', 'Scored 100% on a quiz'),
  B('perfect_5',     'perfect', 2, 'perfectScores', 5,  'Flawless',      '💠', 'Scored 100% five times'),
  B('perfect_15',    'perfect', 3, 'perfectScores', 15, 'Untouchable',   '🔱', 'Scored 100% fifteen times'),

  // Breadth: distinct subjects
  B('subjects_2', 'subjects', 1, 'subjects', 2, 'Branching Out', '🌿', 'Revised 2 different subjects'),
  B('subjects_4', 'subjects', 2, 'subjects', 4, 'All-Round',     '🌍', 'Revised 4 different subjects'),
  B('subjects_6', 'subjects', 3, 'subjects', 6, 'Polymath',      '🪐', 'Revised 6 different subjects'),

  // Written answers
  B('pen_to_paper', 'written', 1, 'writtenQuizzes', 1,  'Pen to Paper', '✏️', 'Finished a quiz with written answers'),
  B('wordsmith',    'written', 2, 'writtenQuizzes', 5,  'Wordsmith',    '🖋️', 'Finished 5 quizzes with written answers'),
  B('essayist',     'written', 3, 'writtenQuizzes', 15, 'Essayist',     '📜', 'Finished 15 quizzes with written answers'),
  B('writer_ace',   'written', 4, 'writtenHigh',    5,  'Written Ace',  '🏆', 'Scored 80%+ on 5 quizzes with written answers'),

  // Question types
  B('all_rounder', 'types', 1, 'typesTried', 5,      'All-Rounder', '🧩', 'Tried every question type'),
  B('mix_master',  'types', 2, 'fullMixQuizzes', 1,  'Mix Master',  '🎨', 'Finished a quiz with all 5 question types'),
  B('mix_10',      'types', 3, 'fullMixQuizzes', 10, 'Mix Pro',     '🎭', 'Finished 10 quizzes with all 5 question types'),

  // Mind maps
  B('first_mindmap', 'mindmaps', 1, 'mindmaps', 1,  'Map Reader',     '🗺️', 'Viewed your first mind map'),
  B('mindmap_10',    'mindmaps', 2, 'mindmaps', 10, 'Visual Learner', '🕸️', 'Viewed 10 mind maps'),
  B('mindmap_30',    'mindmaps', 3, 'mindmaps', 30, 'Cartographer',   '🧭', 'Viewed 30 mind maps'),

  // Learning: key points marked as learnt
  B('learn_10',  'learner', 1, 'pointsLearned', 10,  'Curious Mind',      '🧠', 'Marked 10 key points as learnt'),
  B('learn_50',  'learner', 2, 'pointsLearned', 50,  'Knowledge Builder', '🧱', 'Marked 50 key points as learnt'),
  B('learn_150', 'learner', 3, 'pointsLearned', 150, 'Walking Textbook',  '📘', 'Marked 150 key points as learnt'),
  B('learn_300', 'learner', 4, 'pointsLearned', 300, 'Encyclopedia',      '🏛️', 'Marked 300 key points as learnt'),

  // Learning: whole topics learnt
  B('topic_done_1',  'topicsDone', 1, 'topicsLearned', 1,  'Topic Complete',  '📗', 'Learnt every point in a topic'),
  B('topic_done_5',  'topicsDone', 2, 'topicsLearned', 5,  'Topic Collector', '📚', 'Learnt every point in 5 topics'),
  B('topic_done_15', 'topicsDone', 3, 'topicsLearned', 15, 'Master of Topics','🎓', 'Learnt every point in 15 topics'),

  // Learning: cheat sheets read
  B('sheet_1',  'sheets', 1, 'cheatSheets', 1,  'Quick Reference', '📄', 'Read your first cheat sheet'),
  B('sheet_5',  'sheets', 2, 'cheatSheets', 5,  'Note Taker',      '🗒️', 'Read 5 different cheat sheets'),
  B('sheet_15', 'sheets', 3, 'cheatSheets', 15, 'Revision Pro',    '📑', 'Read 15 different cheat sheets'),

  // Review today (spaced repetition)
  B('review_1',   'review', 1, 'reviews', 1,   'Comeback',       '🔁', 'Finish your first review'),
  B('review_10',  'review', 2, 'reviews', 10,  'Memory Builder', '🧱', 'Finish 10 reviews'),
  B('review_30',  'review', 3, 'reviews', 30,  'Steel Trap',     '🪤', 'Finish 30 reviews'),
  B('review_100', 'review', 4, 'reviews', 100, 'Elephant',       '🐘', 'Finish 100 reviews'),
  B('memory_25',  'memory', 1, 'longTerm', 25,  'Locked In',     '🔒', '25 questions remembered for 2 weeks or more'),
  B('memory_100', 'memory', 2, 'longTerm', 100, 'The Vault',     '🏦', '100 questions remembered for 2 weeks or more'),
  B('memory_250', 'memory', 3, 'longTerm', 250, 'Encyclopedia',  '📚', '250 questions remembered for 2 weeks or more'),

  // Learning: time spent studying (Learn screen: map, learn panel, cards, cheat sheets)
  B('study_30',  'study', 1, 'studyMins', 30,  'Bookworm',        '📖', '30 minutes of studying'),
  B('study_120', 'study', 2, 'studyMins', 120, 'Deep Diver',      '🤿', '2 hours of studying'),
  B('study_300', 'study', 3, 'studyMins', 300, 'Study Champion',  '🥇', '5 hours of studying'),
  B('study_600', 'study', 4, 'studyMins', 600, 'Scholar',         '🦉', '10 hours of studying'),

  // Levels
  B('level_explorer', 'levels', 1, 'level', 2, 'Explorer', '🧭', 'Reached Explorer level'),
  B('level_scholar',  'levels', 1, 'level', 3, 'Scholar',  '📚', 'Reached Scholar level'),
  B('level_expert',   'levels', 2, 'level', 4, 'Expert',   '🔬', 'Reached Expert level'),
  B('level_master',   'levels', 3, 'level', 5, 'Master',   '⭐', 'Reached Master level'),
  B('level_legend',   'levels', 4, 'level', 6, 'Legend',   '🏆', 'Reached Legend level'),
];

export const QUESTION_TYPES = ['mcq', 'tf', 'fill', 'match', 'short'];

/* ── Metrics: everything badges are measured against ──────── */
function sessionSecs(s) {
  if (typeof s.secondsSpent === 'number') return s.secondsSpent;
  return (s.minutesSpent || 0) * 60;
}
function localDayKey(ts) {
  const d = new Date(ts);
  return `${d.getFullYear()}-${d.getMonth()}-${d.getDate()}`;
}
function weekStartKey(ts) {
  const d = new Date(ts);
  const monday = new Date(d.getFullYear(), d.getMonth(), d.getDate() - ((d.getDay() + 6) % 7));
  return monday.getTime();
}

/* Study time (Learn screen: map, learn panel, cards, cheat sheets) is stored per day
   and subject:  study = { 'YYYY-MM-DD': { subjectId: seconds } },
   studySubjects = { subjectId: 'Subject name' }.  This turns it into a list. */
export function studyEntries(profile) {
  const out = [], names = profile.studySubjects || {};
  Object.entries(profile.study || {}).forEach(([day, subs]) => {
    const [y, m, d] = day.split('-').map(Number);
    if (!y || !m || !d) return;
    const date = new Date(y, m - 1, d, 12).getTime();   // midday that day, local time
    Object.entries(subs || {}).forEach(([sid, secs]) => {
      if (secs > 0) out.push({ date, day, subjectId: sid, subject: names[sid] || 'Other', secs });
    });
  });
  return out;
}

export function computeMetrics(profile) {
  const sessions = (profile.sessions || []).slice().sort((a, b) => (a.date || 0) - (b.date || 0));
  const days = new Set(), weeks = {}, subjects = new Set(), mastered = new Set(), typesTried = new Set();
  const firstByTopic = {}, bestGainByTopic = {};
  let totalSecs = 0, highScores = 0, perfectScores = 0, writtenQuizzes = 0, writtenHigh = 0, fullMixQuizzes = 0;

  sessions.forEach(s => {
    const pct = s.pct || 0;
    const secs = sessionSecs(s);
    totalSecs += secs;
    if (s.date) {
      days.add(localDayKey(s.date));
      const wk = weekStartKey(s.date);
      weeks[wk] = (weeks[wk] || 0) + secs;
    }
    if (s.subject) subjects.add(s.subject);
    if (pct >= 80) highScores++;
    if (pct === 100) perfectScores++;

    // A review mixes topics, so it doesn't count towards topic mastery or improvement
    if (!s.review) {
      const topicKey = s.topicId || `${s.subject || ''}|${s.topic || ''}`;
      if (pct >= 80) mastered.add(topicKey);
      if (!(topicKey in firstByTopic)) firstByTopic[topicKey] = pct;
      else bestGainByTopic[topicKey] = Math.max(bestGainByTopic[topicKey] || 0, pct - firstByTopic[topicKey]);
    }

    const types = s.types || [];
    types.forEach(t => typesTried.add(t));
    if (types.includes('short')) { writtenQuizzes++; if (pct >= 80) writtenHigh++; }
    if (QUESTION_TYPES.every(t => types.includes(t))) fullMixQuizzes++;
  });

  // Study time counts towards time, days and weeks too
  let studySecs = 0;
  studyEntries(profile).forEach(e => {
    studySecs += e.secs; totalSecs += e.secs;
    days.add(localDayKey(e.date));
    const wk = weekStartKey(e.date);
    weeks[wk] = (weeks[wk] || 0) + e.secs;
    subjects.add(e.subject);
  });
  const pointsLearned = Object.values(profile.learned || {}).reduce((a, ids) => a + (ids || []).length, 0);

  const gains = Object.values(bestGainByTopic);
  return {
    quizzes:        sessions.length,
    studyDays:      days.size,
    streak:         bestStreak(profile),   // streak badges count your best run
    totalMins:      Math.floor(totalSecs / 60),
    bestWeekMins:   Math.floor(Math.max(0, ...Object.values(weeks)) / 60),
    improvedTopics: gains.filter(g => g > 0).length,
    bestLeap:       Math.max(0, ...gains),
    masteredTopics: mastered.size,
    highScores, perfectScores,
    subjects:       subjects.size,
    writtenQuizzes, writtenHigh,
    typesTried:     QUESTION_TYPES.filter(t => typesTried.has(t)).length,
    fullMixQuizzes,
    mindmaps:       profile.mindmapsViewed || 0,
    studyMins:      Math.floor(studySecs / 60),
    pointsLearned,
    topicsLearned:  (profile.topicsCompleted || []).length,
    cheatSheets:    (profile.cheatSheetsViewed || []).length,
    reviews:        sessions.filter(s => s.review).length,
    repairsDone:    profile.repairsDone || 0,
    goalsHit:       Object.keys(profile.planGoals || {}).length,
    examRun:        examRun(profile.planGoals || {}),
    shieldsUsed:    profile.shieldsUsed || 0,
    longTerm:       Object.values(profile.srs || {}).filter(e => e && e.b >= 3).length,
    level:          getLevelInfo(profile.xp || 0).current.level,
  };
}

// Longest run of consecutive days with the goal hit during an exam push
function examRun(goals) {
  const days = Object.entries(goals).filter(([, l]) => l === 'push' || l === 'final').map(([d]) => d).sort();
  let best = 0, run = 0, prev = null;
  days.forEach(d => {
    const t = new Date(d + 'T12:00:00').getTime();
    run = prev !== null && Math.round((t - prev) / 86400000) === 1 ? run + 1 : 1;
    best = Math.max(best, run); prev = t;
  });
  return best;
}

/* Progress towards each badge, for display */
export function badgeProgress(profile) {
  const m = computeMetrics(profile);
  const earned = new Set(profile.badges || []);
  return BADGES.map(b => {
    const value = Math.min(m[b.metric] || 0, b.target);
    return { ...b, value, earned: earned.has(b.id) || value >= b.target, pct: Math.round(value / b.target * 100) };
  });
}

/* ── Badge checker ───────────────────────────────────────── */
// quiz.html saves the new session before calling awardXp, so it is
// already in profile.sessions. A mind map view is counted here.
export function checkBadges(profile, newSessionPct, source) {
  const earned      = new Set(profile.badges || []);
  const newlyEarned = [];
  const metrics = computeMetrics({
    ...profile,
    mindmapsViewed: (profile.mindmapsViewed || 0) + (source === 'mindmap' ? 1 : 0),
  });
  BADGES.forEach(b => {
    if (!earned.has(b.id) && (metrics[b.metric] || 0) >= b.target) {
      earned.add(b.id);
      newlyEarned.push(b.id);
    }
  });
  return { badges: [...earned], newlyEarned };
}


/* ── Main award function ─────────────────────────────────── */
export async function awardXp(uid, source, options = {}) {
  // source: 'quiz' | 'mindmap' | 'time' | 'learn' | 'cheatsheet'
  // options: { pct, minutes }
  const [snap] = await Promise.all([getDoc(doc(db, 'users', uid)), loadStreakSettings(), loadPlanSettings()]);
  if (!snap.exists()) return null;
  const profile = snap.data();

  let xpGained = 0;

  if (source === 'quiz') {
    xpGained = calcQuizXp(options.pct || 0);
  } else if (source === 'mindmap') {
    xpGained = XP.MINDMAP_VIEW;
  } else if (source === 'time') {
    xpGained = Math.floor((options.minutes || 0) / 5) * XP.TIME_PER_5MIN;
  } else if (source === 'learn') {
    xpGained = XP.LEARN_POINT;
  } else if (source === 'cheatsheet') {
    xpGained = XP.CHEATSHEET;
  }

  let { streak, lastRevisionDate, streakBonus, shields, shieldUsed, streakRepair } = updateStreak(profile);
  xpGained += streakBonus;

  // Winning a lost streak back: an hour of revision today
  let repaired = false, repairsDone = profile.repairsDone || 0, lastRepairDay = profile.lastRepairDay || null;
  if (streakRepair && streakRepair.day === isoDay() && !streakRepair.done && repairProgress(profile).done) {
    streak = Math.max(streak, streakRepair.from + 1);
    streakRepair = { ...streakRepair, done: true };
    repaired = true; repairsDone += 1; lastRepairDay = streakRepair.day;
    xpGained += REPAIR.BONUS_XP;
    logEvent('study.repair', { target: `${streak}-day streak`, detail: 'Won back with an hour of revision' });
  }
  const shieldsUsed = (profile.shieldsUsed || 0) + (shieldUsed ? shieldUsed.count : 0);

  // Study plan: hit today's goal for the first time → bonus XP
  const today = planDay();
  let goalHit = null;
  const planGoals = { ...(profile.planGoals || {}) };
  if (!planGoals[today]) {
    const g = goalStatus(profile, today);
    if (g.done) { goalHit = g.level; planGoals[today] = g.level; xpGained += GOAL_XP; }
  }

  const newXp   = (profile.xp || 0) + xpGained;
  const oldLevel = getLevelInfo(profile.xp || 0).current;
  const newLevel = getLevelInfo(newXp).current;
  const levelledUp = newLevel.level > oldLevel.level;

  // Check badges (pass updated xp for level checks)
  const profileForBadges = { ...profile, xp: newXp, streak, repairsDone, shieldsUsed, planGoals, sessions: profile.sessions || [] };
  const { badges, newlyEarned } = checkBadges(
    profileForBadges,
    options.pct || 0,
    source
  );

  const mindmapsViewed = source === 'mindmap'
    ? (profile.mindmapsViewed || 0) + 1
    : (profile.mindmapsViewed || 0);

  // Write to Firestore
  const updates = {
    xp: newXp,
    level: newLevel.level,
    streak,
    bestStreak: Math.max(bestStreak(profile), streak),
    lastRevisionDate,
    badges,
    mindmapsViewed,
    shields,
    shieldsUsed,
    streakRepair: streakRepair || null,
    repairsDone,
    lastRepairDay,
  };
  if (shieldUsed) updates.lastShieldUsed = shieldUsed;
  if (goalHit) updates[`planGoals.${today}`] = goalHit;

  await updateDoc(doc(db, 'users', uid), updates);
  // Keep the parent's summary copy in step (used on the child cards)
  if (profile.parentUid) {
    updateDoc(doc(db, 'users', profile.parentUid, 'children', uid),
      { streak, lastRevisionDate, xp: newXp, level: newLevel.level, shields, streakRepair: streakRepair || null }).catch(() => {});
  }

  return {
    xpGained,
    streakBonus,
    newXp,
    newLevel,
    oldLevel,
    levelledUp,
    streak,
    repaired,
    shieldUsed,
    goalHit,
    newlyEarned,
    badges,
  };
}
