// ============================================================
// CLASP — Shared Auth Utilities (Firestore version)
// ============================================================

import { auth, db } from './firebase-config.js?v=20261113q';
import { onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";
import { doc, getDoc, getDocs, collection } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";
import { logEvent, setLogActor, pageRole } from './log.js?v=20261113q';

// Never wait forever on the network: give up after `ms` so the UI can recover
function withTimeout(promise, ms, label = 'Request') {
  let t;
  return Promise.race([
    promise.finally(() => clearTimeout(t)),
    new Promise((_, reject) => { t = setTimeout(() => {
      const e = new Error(`${label} timed out`); e.code = 'clasp/timeout'; reject(e);
    }, ms); }),
  ]);
}

// Read the profile with a timeout and one retry (first connection on a phone can be slow)
export async function getUserProfile(uid) {
  let lastErr;
  for (const ms of [8000, 12000]) {
    try {
      const snap = await withTimeout(getDoc(doc(db, 'users', uid)), ms, 'Loading your profile');
      return snap.exists() ? snap.data() : null;
    } catch (e) { lastErr = e; console.warn('getUserProfile attempt failed:', e.message); }
  }
  throw lastErr;
}

/* ── "View as" preview ────────────────────────────────────
   An admin or parent opens hub.html?viewAs=<studentUid> in a new window.
   The student id is kept in sessionStorage, which belongs to that one
   window, so every page in it shows the student's view while other
   windows stay normal. The viewer stays signed in as themselves.
   Pages receive a stand-in user whose uid is not a real account, and
   check isPreview() to skip saving anything. */
const VIEW_AS_KEY = 'clasp_viewAs';
(function captureViewAs() {
  try {
    const id = new URLSearchParams(location.search).get('viewAs');
    if (id) sessionStorage.setItem(VIEW_AS_KEY, id);
  } catch (e) {}
})();

let _preview = null; // { viewer, viewerProfile, student }
export function isPreview() { return !!_preview; }
export function previewInfo() { return _preview; }

// Only the student-facing pages can be previewed. Opening any other page
// (admin, parent, teacher) in the window ends the preview.
const PREVIEW_PAGES = ['hub.html', 'profile.html', 'quiz.html', 'mindmap.html', 'cards.html'];
function viewAsId() {
  const page = location.pathname.split('/').pop() || 'login.html';
  try {
    if (!PREVIEW_PAGES.includes(page)) { sessionStorage.removeItem(VIEW_AS_KEY); return null; }
    return sessionStorage.getItem(VIEW_AS_KEY);
  } catch (e) { return null; }
}

export function exitPreview() {
  try { sessionStorage.removeItem(VIEW_AS_KEY); } catch (e) {}
  // back to the view the viewer was last using (admin, teacher or parent)
  let last = null;
  try { last = localStorage.getItem('clasp_view_' + _preview?.viewer?.uid); } catch (e) {}
  const views = viewsOf(_preview?.viewerProfile);
  const back = VIEW_HOME[views.includes(last) ? last : views[views.length - 1]] || 'parent.html';
  window.close();                                   // works when we opened the window
  setTimeout(() => { window.location.href = back; }, 150); // otherwise go back to the dashboard
}

async function canView(user, viewerProfile, studentUid, student) {
  if (hasRole(viewerProfile, 'admin')) return true;
  if (student.parentUid === user.uid || (student.guardianIds || []).includes(user.uid)) return true;
  if (hasRole(viewerProfile, 'teacher') && Object.keys(student.classes || {}).length) {
    // a teacher can preview students in their own classes
    const mine = await getDocs(collection(db, 'users', user.uid, 'classes')).catch(() => null);
    const ids = new Set(); mine?.forEach(d => ids.add(d.id));
    if (Object.keys(student.classes).some(c => ids.has(c))) return true;
  }
  if (!hasRole(viewerProfile, 'parent')) return false;
  const link = await getDoc(doc(db, 'users', user.uid, 'children', studentUid)).catch(() => null);
  return !!link?.exists();
}

function showPreviewBanner(student) {
  if (document.getElementById('clasp-preview-bar')) return;
  const first = (student.name || 'student').split(' ')[0];
  const bar = document.createElement('div');
  bar.id = 'clasp-preview-bar';
  bar.style.cssText = 'position:sticky;top:0;z-index:1000;display:flex;align-items:center;justify-content:center;gap:12px;flex-wrap:wrap;padding:8px 16px;background:#f59f00;color:#1a1a1a;font-family:var(--font-ui,system-ui);font-size:0.85rem;font-weight:700;text-align:center;';
  bar.innerHTML = `<span><i data-icon="eye"></i> Viewing as ${first.replace(/</g,'&lt;')} · preview only, nothing is saved</span>
    <button id="clasp-preview-exit" style="background:#1a1a1a;color:#fff;border:none;border-radius:999px;padding:5px 12px;font:inherit;font-size:0.8rem;cursor:pointer;">Exit preview</button>`;
  document.body.prepend(bar);
  document.getElementById('clasp-preview-exit').onclick = exitPreview;
  // "Sign out" buttons only leave the preview here, so say so
  document.querySelectorAll('[onclick*="doSignOut"]').forEach(b => { b.textContent = 'Exit preview'; });
  // Sticky page headers sit just under the bar
  const h = bar.offsetHeight;
  const style = document.createElement('style');
  style.textContent = `.topnav{top:${h}px !important;} .jumpbar{top:${h + 64}px !important;}`;
  document.head.appendChild(style);
}

// Family Plus. A student: plusFrom must be one of their own parents, and that
// parent must have Plus. A co-parent: plusFrom is another parent with Plus and
// plusVia a student they both look after (checked the same way by the
// security rules and the AI Worker, so a made-up value gives nothing).
export function familyPlusFrom(profile) {
  const from = profile?.plusFrom;
  return typeof from === 'string' && from && (profile.parentUid === from || (profile.guardianIds || []).includes(from)) ? from : null;
}
const parentsOfRec = s => [s?.parentUid, ...(s?.guardianIds || [])].filter(Boolean);
export async function withFamilyPlus(profile, uid = '') {
  if (!profile || isPlusTier(profile)) return profile;
  const from = familyPlusFrom(profile);
  if (from) {
    const p = await getDoc(doc(db, 'users', from)).catch(() => null);
    profile._familyPlus = !!p?.exists?.() && coversFamily(p.data());
  } else if (uid && typeof profile.plusFrom === 'string' && profile.plusFrom && typeof profile.plusVia === 'string' && profile.plusVia) {
    const [s, p] = await Promise.all([
      getDoc(doc(db, 'users', profile.plusVia)).catch(() => null),
      getDoc(doc(db, 'users', profile.plusFrom)).catch(() => null),
    ]);
    const ps = parentsOfRec(s?.data?.());
    profile._familyPlus = ps.includes(uid) && ps.includes(profile.plusFrom) && profile.plusFrom !== uid
      && !!p?.exists?.() && coversFamily(p.data());
  }
  return profile;
}

export function requireAuth(callback) {
  // If the account hasn't loaded after 15 seconds (a stalled connection, e.g.
  // after the computer slept), offer Try again instead of "Loading…" forever
  let loaded = false;
  const stall = setTimeout(() => { if (!loaded) showConnectionProblem(); }, 15000);
  onAuthStateChanged(auth, async (user) => {
    if (!user) { clearTimeout(stall); window.location.href = 'login.html'; return; }
    try {
      let profile = await getUserProfile(user.uid);
      loaded = true; clearTimeout(stall);
      document.getElementById('clasp-conn-problem')?.remove();
      if (!profile) { await signOut(auth); window.location.href = 'login.html'; return; }
      setLogActor(user.uid, profile, pageRole());
      rememberHome(profile);

      const targetId = viewAsId();
      if (targetId && targetId !== user.uid) {
        const student = await getUserProfile(targetId);
        if (student && await canView(user, profile, targetId, student)) {
          _preview = { viewer: user, viewerProfile: profile, student: { id: targetId, ...student } };
          setLogActor(user.uid, profile, hasRole(profile, 'admin') ? 'admin' : hasRole(profile, 'teacher') && !hasRole(profile, 'parent') ? 'teacher' : 'parent');
          showPreviewBanner(student);
          profile = student;
          user = { uid: 'preview-readonly', previewOf: targetId, isPreview: true };
        } else {
          try { sessionStorage.removeItem(VIEW_AS_KEY); } catch (e) {}
        }
      }

      await withFamilyPlus(profile, user.previewOf || user.uid);
      if (profile.theme) document.body.setAttribute('data-theme', profile.theme);
      callback(user, profile);
    } catch(e) {
      // Network trouble: keep them signed in and offer a retry, rather than bouncing to login
      console.error('requireAuth failed:', e);
      clearTimeout(stall);
      showConnectionProblem();
    }
  });
}

/* ── Roles ────────────────────────────────────────────────
   A person can hold several roles: profile.roles = ['parent','admin'].
   Older accounts only have profile.role (one string); both are read.
   Admins can always use the parent view (as before). */
export function rolesOf(profile) {
  const set = new Set(Array.isArray(profile?.roles) && profile.roles.length ? profile.roles : [profile?.role].filter(Boolean));
  if (set.has('admin')) set.add('parent');
  return set;
}
export function hasRole(profile, role) { return rolesOf(profile).has(role); }

// Plans: 'free' (default) or 'plus'. Nothing is locked yet; this lets any
// feature be switched to Plus later with one check: hasPlus(profile).
// Plus is stored in profile.tier. (It used to be profile.plan, which is also
// where the study plan lives, so a few accounts may still have plan 'plus'.)
export function isPlusTier(profile) { return profile?.tier === 'plus' || profile?.plan === 'plus'; }
// A student covered by a parent's Plus: plusFrom names the parent, checked
// when the page loads (withFamilyPlus) and by the security rules
// Whose Plus covers their children: Plus, or an admin
export function coversFamily(profile) { return isPlusTier(profile) || rolesOf(profile).has('admin'); }
export function hasFamilyPlus(profile) { return profile?._familyPlus === true; }
export function planOf(profile) { return isPlusTier(profile) || hasFamilyPlus(profile) ? 'plus' : 'free'; }
export function hasPlus(profile) { return planOf(profile) === 'plus' || hasRole(profile, 'admin'); }
export function isStudent(profile) { return hasRole(profile, 'student'); }
// Free try of creating with AI for parents and teachers without Plus. The AI
// Worker counts and enforces it (aiTrial/{uid}); users.aiTrialUsed is its copy,
// for showing what's left. About 30k tokens turns one worksheet into notes and questions.
export const AI_TRIAL_TOKENS = 60000;
const TOKENS_PER_SHEET = 30000;
export function aiTrialLeft(profile) {
  if (!profile || hasPlus(profile)) return 0;
  const r = rolesOf(profile);
  if (!(r.has('parent') || r.has('teacher'))) return 0;
  return Math.max(0, AI_TRIAL_TOKENS - (Number(profile.aiTrialUsed) || 0));
}
export function onAiTrial(profile) { return aiTrialLeft(profile) > 0; }
export function canUseAI(profile) { return hasPlus(profile) || onAiTrial(profile); }
// "2 worksheets" / "1 worksheet" left on the free try
export function trialSheetsText(profile) {
  const n = Math.max(1, Math.ceil(aiTrialLeft(profile) / TOKENS_PER_SHEET));
  return `${n} worksheet${n === 1 ? '' : 's'}`;
}
// The adult views a person can switch between, in a fixed order
export function viewsOf(profile) {
  const r = rolesOf(profile);
  return ['parent', 'teacher', 'admin'].filter(v => r.has(v));
}
// Highest role, stored in profile.role for older code
export function primaryRole(roles) {
  return ['admin', 'teacher', 'parent', 'student'].find(r => roles.includes(r)) || 'student';
}
const VIEW_HOME = { parent: 'parent.html', teacher: 'teacher-dashboard.html', admin: 'admin.html' };
export function rememberView(uid, view) { try { localStorage.setItem('clasp_view_' + uid, view); localStorage.setItem('ll_home', VIEW_HOME[view] || 'hub.html'); } catch (e) {} }
// Where "Home" (in the footer of every app page) goes: the student hub, or
// the adult view in use (parent, teacher or admin page)
function rememberHome(profile) {
  try {
    const views = viewsOf(profile);
    const role = pageRole();
    let home = 'hub.html';
    if (views.length) home = views.includes(role) ? VIEW_HOME[role] : (localStorage.getItem('ll_home') || VIEW_HOME[views[views.length - 1]]);
    if (home === 'hub.html' && views.length && !isStudent(profile)) home = VIEW_HOME[views[views.length - 1]];
    localStorage.setItem('ll_home', home);
  } catch (e) {}
}
function lastView(uid) { try { return localStorage.getItem('clasp_view_' + uid); } catch (e) { return null; } }

export function requireRole(role, callback) {
  requireAuth((user, profile) => {
    if (!hasRole(profile, role)) { window.location.href = 'login.html'; return; }
    callback(user, profile);
  });
}

export async function handleSignOut() {
  if (_preview) { exitPreview(); return; } // in a preview window, "Sign out" just leaves the preview
  await Promise.race([logEvent('account.signout'), new Promise(r => setTimeout(r, 1500))]);
  await signOut(auth);
  window.location.href = 'login.html';
}

// Throws on failure so the login page can reset its button and show a message.
// Concurrent calls (login handler + auth listener) share one lookup.
let _redirecting = null;
export function redirectByRole(uid) {
  if (_redirecting) return _redirecting;
  _redirecting = (async () => {
    const profile = await getUserProfile(uid);
    if (!profile) {
      await signOut(auth);
      const e = new Error('No profile'); e.code = 'clasp/no-profile'; throw e;
    }
    // Students go to their hub. Adults go to the view they used last,
    // or their highest role.
    const views = viewsOf(profile);
    if (!views.length) { window.location.href = 'hub.html'; return; }
    const last = lastView(uid);
    const view = views.includes(last) ? last : (views.includes('admin') ? 'admin' : views.includes('teacher') ? 'teacher' : 'parent');
    window.location.href = VIEW_HOME[view];
  })().finally(() => { _redirecting = null; });
  return _redirecting;
}

function showConnectionProblem() {
  if (document.getElementById('clasp-conn-problem')) return;
  const el = document.createElement('div');
  el.id = 'clasp-conn-problem';
  el.style.cssText = 'position:fixed;inset:0;z-index:9999;display:flex;align-items:center;justify-content:center;padding:24px;background:var(--color-bg,#111);';
  el.innerHTML = `<div style="max-width:360px;text-align:center;font-family:var(--font-ui,system-ui);color:var(--color-text,#eee);">
    <div style="font-size:2.5rem;margin-bottom:12px;color:var(--color-text-muted,#999);"><i data-icon="wifi-off"></i></div>
    <h2 style="font-family:var(--font-heading,system-ui);margin-bottom:8px;">Connection problem</h2>
    <p style="color:var(--color-text-muted,#aaa);margin-bottom:20px;line-height:1.5;">We couldn't load your account. Check your internet connection and try again.</p>
    <button class="btn btn-primary" style="width:100%;padding:12px;" onclick="location.reload()">Try again</button>
    <button class="btn btn-ghost" style="width:100%;padding:10px;margin-top:8px;" id="clasp-conn-signout">Sign out</button>
  </div>`;
  document.body.appendChild(el);
  document.getElementById('clasp-conn-signout').onclick = () => handleSignOut();
}

// Open a student's view in a new window (used by admin and parent dashboards)
export function openViewAs(studentUid, studentName = '') {
  logEvent('admin.view_as', { target: studentName, targetId: studentUid });
  const w = window.open(`hub.html?viewAs=${encodeURIComponent(studentUid)}`, `clasp-view-${studentUid}`);
  if (!w) window.location.href = `hub.html?viewAs=${encodeURIComponent(studentUid)}`; // pop-up blocked
}

export function generatePassword() {
  const adj  = ['Swift','Bright','Calm','Bold','Kind','Quick','Smart','Cool','Brave','Sharp'];
  const noun = ['Tiger','River','Cloud','Stone','Eagle','Storm','Flame','Wave','Cedar','Frost'];
  return `${adj[Math.floor(Math.random()*adj.length)]}${noun[Math.floor(Math.random()*noun.length)]}${Math.floor(Math.random()*900)+100}`;
}

export function showToast(msg, type = 'info') {
  const container = document.getElementById('toast-container');
  if (!container) return;
  const toast = document.createElement('div');
  toast.className = `toast ${type}`;
  toast.textContent = msg;
  container.appendChild(toast);
  setTimeout(() => toast.remove(), 3500);
}
