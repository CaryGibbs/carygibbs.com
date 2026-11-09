// ============================================================
// LOBE LIMPET: activity log (who did what, for admins)
// One entry per action in the `logs` collection:
//   { ts, at, uid, name, role, action, cat, target, detail, expireAt }
//   ts       when (ms, used for sorting)    at  server time
//   role     the view they were using: student, parent, teacher, admin
//   action   a short code from ACTIONS below, e.g. 'quiz.done'
//   target   what it affected (a student, class, pack, setting)
//   detail   one short line, e.g. "Exam push → Rest day"
//   expireAt a year on: a Firestore TTL policy on this field
//            removes old entries automatically
// Entries hold no passwords and no answer text, only what's needed.
// Logging never blocks or breaks the action it records.
// ============================================================

import { db, auth } from './firebase-config.js?v=20261109e';
import { collection, addDoc, serverTimestamp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";

export const KEEP_DAYS = 365;

// Every action that's logged, with its label and group (for the filters)
export const ACTIONS = {
  'account.signup':      { label: 'Signed up',               cat: 'account' },
  'account.signin':      { label: 'Signed in',               cat: 'account' },
  'account.signin_fail': { label: 'Sign-in failed',          cat: 'account' },
  'account.signout':     { label: 'Signed out',              cat: 'account' },
  'account.reset':       { label: 'Asked for a password reset', cat: 'account' },
  'account.invite':      { label: 'Sent an invite',          cat: 'account' },
  'account.invite_accept': { label: 'Accepted an invite',    cat: 'account' },
  'account.roles':       { label: 'Changed roles',           cat: 'account' },
  'admin.view_as':       { label: 'Viewed as a student',     cat: 'admin' },
  'admin.settings':      { label: 'Changed settings',        cat: 'admin' },
  'content.pack':        { label: 'Revision pack',           cat: 'content' },
  'content.subject':     { label: 'Subject',                 cat: 'content' },
  'content.topic':       { label: 'Topic',                   cat: 'content' },
  'content.questions':   { label: 'Questions',               cat: 'content' },
  'content.keypoints':   { label: 'Key points',              cat: 'content' },
  'content.delete':      { label: 'Deleted content',         cat: 'content' },
  'class.create':        { label: 'Created a class',         cat: 'class' },
  'class.edit':          { label: 'Edited a class',          cat: 'class' },
  'class.delete':        { label: 'Deleted a class',         cat: 'class' },
  'class.packs':         { label: 'Changed class packs',     cat: 'class' },
  'class.add':           { label: 'Added a student',         cat: 'class' },
  'class.remove':        { label: 'Removed a student',       cat: 'class' },
  'class.join':          { label: 'Joined a class',          cat: 'class' },
  'student.add':         { label: 'Added a student',         cat: 'family' },
  'student.edit':        { label: 'Updated a student',       cat: 'family' },
  'student.share':       { label: 'Shared a student',        cat: 'family' },
  'student.unlink':      { label: 'Removed a student',       cat: 'family' },
  'student.reset':       { label: 'Reset progress',          cat: 'family' },
  'student.delete':      { label: 'Deleted a student',       cat: 'family' },
  'student.message':     { label: 'Sent a message',          cat: 'family' },
  'plan.change':         { label: 'Changed a study plan',    cat: 'plan' },
  'plan.day':            { label: 'Changed a plan day',      cat: 'plan' },
  'study.quiz':          { label: 'Finished a quiz',         cat: 'study' },
  'study.review':        { label: 'Finished a review',       cat: 'study' },
  'study.learn':         { label: 'Studied',                 cat: 'study' },
  'study.repair':        { label: 'Repaired a streak',       cat: 'study' },
};

export const CATS = {
  account: 'Accounts', admin: 'Admin', content: 'Content', class: 'Classes',
  family: 'Students', plan: 'Study plans', study: 'Studying',
};

// Who is acting. Set by auth.js once the profile has loaded; the role
// is the view in use (an admin on the parent page logs as parent).
let actor = null;
export function setLogActor(uid, profile, role) {
  actor = { uid, name: profile?.name || profile?.email || '', role: role || 'student' };
}
export function pageRole() {
  const p = location.pathname;
  if (/admin\.html$/.test(p)) return 'admin';
  if (/teacher/.test(p)) return 'teacher';
  if (/parent\.html$/.test(p)) return 'parent';
  return 'student';
}

const clip = (s, n) => String(s ?? '').replace(/\s+/g, ' ').trim().slice(0, n);

// Record an action. opts: { target, targetId, detail, as: {uid,name,role} }
export function logEvent(action, opts = {}) {
  try {
    const who = opts.as || actor || (auth.currentUser ? { uid: auth.currentUser.uid, name: auth.currentUser.displayName || auth.currentUser.email || '', role: pageRole() } : null);
    if (!who || !who.uid || who.uid === 'preview-readonly') return Promise.resolve();
    const now = Date.now();
    const entry = {
      ts: now, at: serverTimestamp(),
      uid: who.uid, name: clip(who.name, 80), role: who.role || 'student',
      action, cat: ACTIONS[action]?.cat || action.split('.')[0],
      target: clip(opts.target, 120), targetId: clip(opts.targetId, 80),
      detail: clip(opts.detail, 200),
      expireAt: new Date(now + KEEP_DAYS * 86400000),
    };
    return addDoc(collection(db, 'logs'), entry).catch(e => console.warn('Log not saved:', e.message));
  } catch (e) { console.warn('Log not saved:', e.message); return Promise.resolve(); }
}
