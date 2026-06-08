// ============================================================
// CLASP — Gamification Engine
// XP, levels, badges, streaks
// ============================================================

import { db } from './firebase-config.js';
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

/* ── Badge definitions ───────────────────────────────────── */
export const BADGES = [
  // Quiz milestones
  { id: 'first_quiz',     name: 'First Steps',      icon: '🎯', desc: 'Completed your first quiz' },
  { id: 'quiz_10',        name: 'Committed',         icon: '🔟', desc: 'Completed 10 quizzes' },
  { id: 'quiz_25',        name: 'Dedicated',         icon: '💪', desc: 'Completed 25 quizzes' },
  { id: 'quiz_50',        name: 'Quiz Legend',       icon: '🏅', desc: 'Completed 50 quizzes' },
  // Score milestones
  { id: 'perfect_score',  name: 'Perfectionist',     icon: '💯', desc: 'Scored 100% on a quiz' },
  { id: 'high_scorer',    name: 'High Achiever',     icon: '🌟', desc: 'Scored 80%+ five times' },
  // Streaks
  { id: 'streak_3',       name: 'On a Roll',         icon: '🔥', desc: '3-day revision streak' },
  { id: 'streak_7',       name: 'Week Warrior',      icon: '⚡', desc: '7-day revision streak' },
  { id: 'streak_30',      name: 'Unstoppable',       icon: '🚀', desc: '30-day revision streak' },
  // Exploration
  { id: 'first_mindmap',  name: 'Map Reader',        icon: '🗺️',  desc: 'Viewed your first mindmap' },
  { id: 'mindmap_10',     name: 'Visual Learner',    icon: '🕸️',  desc: 'Viewed 10 mindmaps' },
  // Level ups
  { id: 'level_explorer', name: 'Explorer',          icon: '🧭', desc: 'Reached Explorer level' },
  { id: 'level_scholar',  name: 'Scholar',           icon: '📚', desc: 'Reached Scholar level' },
  { id: 'level_expert',   name: 'Expert',            icon: '🔬', desc: 'Reached Expert level' },
  { id: 'level_master',   name: 'Master',            icon: '⭐', desc: 'Reached Master level' },
  { id: 'level_legend',   name: 'Legend',            icon: '🏆', desc: 'Reached Legend level' },
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
export function updateStreak(profile) {
  const now       = Date.now();
  const lastDate  = profile.lastRevisionDate || 0;
  const oneDayMs  = 86400000;
  const daysSince = Math.floor((now - lastDate) / oneDayMs);

  let streak = profile.streak || 0;
  let streakBonus = 0;

  if (daysSince === 0) {
    // Same day — no change
  } else if (daysSince === 1) {
    // Consecutive day — extend streak
    streak++;
    streakBonus = XP.STREAK_BONUS;
  } else {
    // Streak broken
    streak = 1;
  }

  return { streak, lastRevisionDate: now, streakBonus };
}

/* ── Badge checker ───────────────────────────────────────── */
export function checkBadges(profile, newSessionPct, source) {
  const earned       = new Set(profile.badges || []);
  const newlyEarned  = [];
  const sessions     = profile.sessions || [];
  const totalQuizzes = sessions.length + (source === 'quiz' ? 1 : 0);
  const highScores   = sessions.filter(s => s.pct >= 80).length + (source === 'quiz' && newSessionPct >= 80 ? 1 : 0);
  const mindmaps     = (profile.mindmapsViewed || 0) + (source === 'mindmap' ? 1 : 0);
  const streak       = profile.streak || 0;
  const totalXp      = (profile.xp || 0);
  const level        = getLevelInfo(totalXp).current;

  const checks = [
    { id: 'first_quiz',     pass: source === 'quiz' && totalQuizzes >= 1 },
    { id: 'quiz_10',        pass: totalQuizzes >= 10 },
    { id: 'quiz_25',        pass: totalQuizzes >= 25 },
    { id: 'quiz_50',        pass: totalQuizzes >= 50 },
    { id: 'perfect_score',  pass: source === 'quiz' && newSessionPct === 100 },
    { id: 'high_scorer',    pass: highScores >= 5 },
    { id: 'streak_3',       pass: streak >= 3 },
    { id: 'streak_7',       pass: streak >= 7 },
    { id: 'streak_30',      pass: streak >= 30 },
    { id: 'first_mindmap',  pass: source === 'mindmap' && mindmaps >= 1 },
    { id: 'mindmap_10',     pass: mindmaps >= 10 },
    { id: 'level_explorer', pass: level.level >= 2 },
    { id: 'level_scholar',  pass: level.level >= 3 },
    { id: 'level_expert',   pass: level.level >= 4 },
    { id: 'level_master',   pass: level.level >= 5 },
    { id: 'level_legend',   pass: level.level >= 6 },
  ];

  checks.forEach(({ id, pass }) => {
    if (pass && !earned.has(id)) {
      earned.add(id);
      newlyEarned.push(id);
    }
  });

  return { badges: [...earned], newlyEarned };
}

/* ── Main award function ─────────────────────────────────── */
export async function awardXp(uid, source, options = {}) {
  // source: 'quiz' | 'mindmap' | 'time'
  // options: { pct, minutes }
  const snap = await getDoc(doc(db, 'users', uid));
  if (!snap.exists()) return null;
  const profile = snap.data();

  let xpGained = 0;

  if (source === 'quiz') {
    xpGained = calcQuizXp(options.pct || 0);
  } else if (source === 'mindmap') {
    xpGained = XP.MINDMAP_VIEW;
  } else if (source === 'time') {
    xpGained = Math.floor((options.minutes || 0) / 5) * XP.TIME_PER_5MIN;
  }

  const { streak, lastRevisionDate, streakBonus } = updateStreak(profile);
  xpGained += streakBonus;

  const newXp   = (profile.xp || 0) + xpGained;
  const oldLevel = getLevelInfo(profile.xp || 0).current;
  const newLevel = getLevelInfo(newXp).current;
  const levelledUp = newLevel.level > oldLevel.level;

  // Check badges (pass updated xp for level checks)
  const profileForBadges = { ...profile, xp: newXp, streak, sessions: profile.sessions || [] };
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
    lastRevisionDate,
    badges,
    mindmapsViewed,
  };

  await updateDoc(doc(db, 'users', uid), updates);

  return {
    xpGained,
    streakBonus,
    newXp,
    newLevel,
    oldLevel,
    levelledUp,
    streak,
    newlyEarned,
    badges,
  };
}
