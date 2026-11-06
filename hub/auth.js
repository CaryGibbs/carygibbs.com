// ============================================================
// CLASP — Shared Auth Utilities (Firestore version)
// ============================================================

import { auth, db } from './firebase-config.js';
import { onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";
import { doc, getDoc } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";

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

export function requireAuth(callback) {
  onAuthStateChanged(auth, async (user) => {
    if (!user) { window.location.href = 'index.html'; return; }
    try {
      const profile = await getUserProfile(user.uid);
      if (!profile) { await signOut(auth); window.location.href = 'index.html'; return; }
      if (profile.theme) document.body.setAttribute('data-theme', profile.theme);
      callback(user, profile);
    } catch(e) {
      // Network trouble: keep them signed in and offer a retry, rather than bouncing to login
      console.error('requireAuth failed:', e);
      showConnectionProblem();
    }
  });
}

export function requireRole(role, callback) {
  requireAuth((user, profile) => {
    if (profile.role !== role) { window.location.href = 'index.html'; return; }
    callback(user, profile);
  });
}

export async function handleSignOut() {
  await signOut(auth);
  window.location.href = 'index.html';
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
    const role = profile.role;
    if (role === 'parent')  { window.location.href = 'parent.html'; return; }
    if (role === 'teacher') { window.location.href = 'teacher-dashboard.html'; return; }
    if (role === 'admin')   { window.location.href = 'admin.html'; return; }
    window.location.href = 'hub.html';
  })().finally(() => { _redirecting = null; });
  return _redirecting;
}

function showConnectionProblem() {
  if (document.getElementById('clasp-conn-problem')) return;
  const el = document.createElement('div');
  el.id = 'clasp-conn-problem';
  el.style.cssText = 'position:fixed;inset:0;z-index:9999;display:flex;align-items:center;justify-content:center;padding:24px;background:var(--color-bg,#111);';
  el.innerHTML = `<div style="max-width:360px;text-align:center;font-family:var(--font-ui,system-ui);color:var(--color-text,#eee);">
    <div style="font-size:2.5rem;margin-bottom:12px;">📶</div>
    <h2 style="font-family:var(--font-heading,system-ui);margin-bottom:8px;">Connection problem</h2>
    <p style="color:var(--color-text-muted,#aaa);margin-bottom:20px;line-height:1.5;">We couldn't load your account. Check your internet connection and try again.</p>
    <button class="btn btn-primary" style="width:100%;padding:12px;" onclick="location.reload()">Try again</button>
    <button class="btn btn-ghost" style="width:100%;padding:10px;margin-top:8px;" id="clasp-conn-signout">Sign out</button>
  </div>`;
  document.body.appendChild(el);
  document.getElementById('clasp-conn-signout').onclick = () => handleSignOut();
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
