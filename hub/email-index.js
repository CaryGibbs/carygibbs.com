// ============================================================
// LOBE LIMPET: email look-up index
// The security rules stop anyone browsing the list of users, so
// "find the account with this email" can't search users any more.
// Instead each account has a small entry at emailIndex/{email}
// holding just { uid, name, role }. You can only look up an exact
// email you already know; you can't list them.
// ============================================================

import { db } from './firebase-config.js?v=20261109s';
import { doc, getDoc, setDoc } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";

const key = email => String(email || '').trim().toLowerCase();

// Write (or refresh) the entry for an account. Never throws.
export async function saveEmailIndex(uid, email, name = '', roles = []) {
  const k = key(email);
  if (!uid || !k) return;
  try { await setDoc(doc(db, 'emailIndex', k), { uid, name: name || '', roles: Array.isArray(roles) ? roles : [roles].filter(Boolean), updatedAt: Date.now() }); }
  catch (e) { console.warn('Email index not saved:', e.message); }
}

// Find an account by exact email: { id, name, role } or null
export async function findByEmail(email) {
  const k = key(email);
  if (!k) return null;
  const snap = await getDoc(doc(db, 'emailIndex', k));
  if (!snap.exists()) return null;
  const d = snap.data();
  return { id: d.uid, name: d.name || '', roles: d.roles || [], email: k };
}
