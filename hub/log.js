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

import { db, auth } from './firebase-config.js?v=20261112b';
import { PROXY_URL } from './ai.js?v=20261112b';
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
  'account.delete':      { label: 'Deleted an account',      cat: 'account' },
  'admin.view_as':       { label: 'Viewed as a student',     cat: 'admin' },
  'admin.view_student':  { label: "Opened a student's progress", cat: 'admin' },
  'admin.forget_progress': { label: "Removed a subject from a student's progress", cat: 'admin' },
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
  'class.takedown_set':  { label: 'Took down a shared flashcard set', cat: 'class' },
  'cards.create':        { label: 'Made a flashcard set',    cat: 'cards' },
  'cards.edit':          { label: 'Edited a flashcard set',  cat: 'cards' },
  'cards.delete':        { label: 'Deleted a flashcard set', cat: 'cards' },
  'cards.ai':            { label: 'Made flashcards with AI', cat: 'cards' },
  'cards.share':         { label: 'Shared a flashcard set',  cat: 'cards' },
  'cards.unshare':       { label: 'Stopped sharing a flashcard set', cat: 'cards' },
  'cards.copy':          { label: "Copied a classmate's flashcards", cat: 'cards' },
  'cards.study':         { label: 'Studied flashcards',      cat: 'cards' },
  'account.plus_request': { label: 'Asked for Plus',         cat: 'account' },
  'account.getting_started': { label: 'Finished getting started', cat: 'account' },
  'class.pack_given':    { label: 'Gave a class a pack',     cat: 'class' },
  'student.pack_given':  { label: 'Gave a student a pack',   cat: 'family' },
  'account.plus':        { label: 'Changed Plus',            cat: 'account' },
  'student.add':         { label: 'Added a student',         cat: 'family' },
  'student.edit':        { label: 'Updated a student',       cat: 'family' },
  'student.share':       { label: 'Shared a student',        cat: 'family' },
  'student.unlink':      { label: 'Removed a student',       cat: 'family' },
  'student.reset':       { label: 'Reset progress',          cat: 'family' },
  'student.delete':      { label: 'Deleted a student',       cat: 'family' },
  'student.message':     { label: 'Sent a message',          cat: 'family' },
  'student.link_request': { label: 'Asked to link a student', cat: 'family' },
  'student.link_cancel': { label: 'Cancelled a link request', cat: 'family' },
  'student.link_accept': { label: 'Accepted a parent link',  cat: 'family' },
  'student.link_decline': { label: 'Declined a parent link', cat: 'family' },
  'student.link_remove': { label: 'Removed a linked parent', cat: 'family' },
  'plan.change':         { label: 'Changed a study plan',    cat: 'plan' },
  'plan.day':            { label: 'Changed a plan day',      cat: 'plan' },
  'study.quiz':          { label: 'Finished a quiz',         cat: 'study' },
  'study.review':        { label: 'Finished a review',       cat: 'study' },
  'study.learn':         { label: 'Studied',                 cat: 'study' },
  'study.repair':        { label: 'Repaired a streak',       cat: 'study' },
};

export const CATS = {
  account: 'Accounts', admin: 'Admin', content: 'Content', class: 'Classes',
  family: 'Students', plan: 'Study plans', study: 'Studying', cards: 'Flashcards',
};

// Who is acting. Set by auth.js once the profile has loaded; the role
// is the view in use (an admin on the parent page logs as parent).
let actor = null;
export function setLogActor(uid, profile, role) {
  actor = { uid, name: profile?.name || profile?.email || '', role: role || 'student' };
}
export function pageRole() {
  const p = location.pathname;
  if (/admin\.html$/.test(p)) {
    const mine = new URLSearchParams(location.search).get('mine');   // "My packs" for a parent or teacher
    return ['parent', 'teacher'].includes(mine) ? mine : 'admin';
  }
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
    // Not signed in (failed sign-in, password reset): the AI Worker writes it
    if (who.uid === 'signed-out') {
      return fetch(PROXY_URL, { method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'logSignedOut', logAction: action, name: clip(who.name, 120), detail: clip(opts.detail, 160) }) })
        .catch(e => console.warn('Log not saved:', e.message));
    }
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
