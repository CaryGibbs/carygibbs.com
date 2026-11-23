// ============================================================
// LOBE LIMPET: email look-up index
// The security rules stop anyone browsing the list of users, so
// "find the account with this email" can't search users any more.
// Instead each account has a small entry at emailIndex/{email}
// holding just { uid, name, role }.
// Only admins and the AI Worker can read it (safeguarding): the app asks
// the Worker with checkAccount(), which says only whether the email is
// used and by what kind of account, never a name or account id.
// ============================================================

import { db } from './firebase-config.js?v=20261123g';
import { doc, setDoc } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";
import { workerAction } from './ai.js?v=20261123g';

const key = email => String(email || '').trim().toLowerCase();

// Write (or refresh) the entry for an account. Never throws.
export async function saveEmailIndex(uid, email, name = '', roles = []) {
  const k = key(email);
  if (!uid || !k) return;
  try { await setDoc(doc(db, 'emailIndex', k), { uid, name: name || '', roles: Array.isArray(roles) ? roles : [roles].filter(Boolean), updatedAt: Date.now() }); }
  catch (e) { console.warn('Email index not saved:', e.message); }
}

// Is this email used? { exists, kind: 'student' | 'adult' | 'self', mine }
export async function checkAccount(email) {
  const k = key(email);
  if (!k) return { exists: false };
  return workerAction('checkEmail', { email: k });
}
