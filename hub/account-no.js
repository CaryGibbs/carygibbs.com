// ============================================================
// LOBE LIMPET: account numbers
// Every account gets a short reference like LL-7KQ4M, fixed for life:
// for support ("what's your account number?"), telling people with the
// same name apart, and later as the reference for payments.
// - Random, not counting up (so it doesn't show how many accounts exist)
// - No look-alike characters (no I, O, 0 or 1)
// - Unique: accountNos/{code} = { uid } is created first; the security
//   rules refuse a code that's already taken, and only let users.accountNo
//   be set once, to a code that names that account.
// Given out: on any signed-in page (your own), and by Admin → Users for
// everyone still without one.
// ============================================================

import { db } from './firebase-config.js?v=20261113v';
import { doc, setDoc, updateDoc } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";

const ALPHABET = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
const LEN = 5;

export function newAccountCode() {
  const bytes = crypto.getRandomValues(new Uint8Array(LEN));
  return [...bytes].map(b => ALPHABET[b % ALPHABET.length]).join('');
}
// "LL-7KQ4M" for showing; the stored value is the same
export const formatAccountNo = code => code ? (String(code).startsWith('LL-') ? code : `LL-${code}`) : '';
// For searching: "ll7kq4m" matches "LL-7KQ4M", "7kq4m", "ll-7kq4m"
export const accountSearchText = code => { const c = String(code || '').toLowerCase(); return c ? `${c} ${c.replace('-', '')} ${c.replace(/^ll-/, '')}` : ''; };

// Give this account a number if it hasn't one. profile: their users record
// (updated in place). Returns the number, or '' if it couldn't be done
// (e.g. before the new security rules are published).
export async function ensureAccountNo(uid, profile) {
  if (!uid || !profile) return '';
  if (profile.accountNo) return profile.accountNo;
  for (let i = 0; i < 5; i++) {
    const code = 'LL-' + newAccountCode();
    try {
      // Taken already? The rules treat this as an update and refuse it
      await setDoc(doc(db, 'accountNos', code), { uid, at: Date.now() });
    } catch (e) {
      if (e?.code === 'permission-denied' && i < 4) continue;
      console.warn('Account number not given:', e?.message); return '';
    }
    try {
      await updateDoc(doc(db, 'users', uid), { accountNo: code });
      profile.accountNo = code;
      return code;
    } catch (e) { console.warn('Account number not saved:', e?.message); return ''; }
  }
  return '';
}
