// ============================================================
// CLASP — Shared Auth Utilities (Firestore version)
// ============================================================

import { auth, db } from './firebase-config.js';
import { onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";
import { doc, getDoc } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";

export async function getUserProfile(uid) {
  const snap = await getDoc(doc(db, 'users', uid));
  return snap.exists() ? snap.data() : null;
}

export function requireAuth(callback) {
  onAuthStateChanged(auth, async (user) => {
    if (!user) { window.location.href = 'index.html'; return; }
    const profile = await getUserProfile(user.uid);
    if (!profile) { await signOut(auth); window.location.href = 'index.html'; return; }
    if (profile.theme) document.body.setAttribute('data-theme', profile.theme);
    callback(user, profile);
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

export async function redirectByRole(uid) {
  const profile = await getUserProfile(uid);
  if (!profile) { window.location.href = 'index.html'; return; }
  const role = profile.role;
  if (role === 'parent')  { window.location.href = 'parent.html'; return; }
  if (role === 'teacher') { window.location.href = 'teacher-dashboard.html'; return; }
  if (role === 'admin')   { window.location.href = 'admin.html'; return; }
  window.location.href = 'hub.html';
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
