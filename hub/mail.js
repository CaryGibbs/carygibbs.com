// ============================================================
// LOBE LIMPET: account emails
// Sent by the Worker through Resend, from lobelimpet.com, in our own
// words. If email isn't set up on the Worker yet (or fails), password
// emails fall back to Firebase's own "reset your password" email, so
// nothing stops working.
//   sendWelcome()            once, just after someone signs up
//   sendStudentSetup(uid)    "choose your password" to a new student
//   sendPasswordEmail(email) "Forgot your password?" and reset links
// ============================================================

import { auth } from './firebase-config.js?v=20261124m';
import { sendPasswordResetEmail } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";
import { PROXY_URL, workerAction } from './ai.js?v=20261124m';

const timeout = (ms) => new Promise((_, no) => setTimeout(() => no(new Error('Timed out')), ms));

// Never throws: a welcome email must never get in the way of signing up
export async function sendWelcome() {
  try { await Promise.race([workerAction('sendEmail', { kind: 'welcome' }), timeout(4000)]); return true; }
  catch (e) { console.warn('Welcome email not sent:', e.message); return false; }
}

// true if our email went; false if the caller should use the old way
export async function sendStudentSetup(uid) {
  try { await Promise.race([workerAction('sendEmail', { kind: 'studentSetup', uid }), timeout(10000)]); return true; }
  catch (e) { console.warn('Set-password email not sent:', e.message); return false; }
}

// Our email if we can, Firebase's if not. Returns 'ours' or 'firebase'; throws if neither sent.
export async function sendPasswordEmail(email) {
  try {
    const r = await Promise.race([fetch(PROXY_URL, {
      method: 'POST', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ action: 'passwordEmail', email }),
    }), timeout(10000)]);
    const d = await r.json().catch(() => ({}));
    if (d.ok) return 'ours';
    if (d.error && !d.notSetUp && /valid email/i.test(d.error)) throw Object.assign(new Error(d.error), { shown: d.error });
  } catch (e) { if (e.shown) throw e; console.warn('Password email via Worker failed:', e.message); }
  await sendPasswordResetEmail(auth, email, { url: new URL('login.html', location.href).href });
  return 'firebase';
}
