// ============================================================
// LOBE LIMPET: reminders on a student's phone (push notifications)
// Profile → Reminders. A student turns them on for this device. Under
// 16s with a parent need the parent to allow it first (Manage student,
// users.remindersAllowed); 16+ and students with no parent choose
// themselves. The AI Worker sends at most one a day: 4:30pm if reviews
// are waiting, 7pm if a streak would end. iPhones and iPads only get
// them in the installed app (Add to Home Screen), iOS 16.4 or later.
// Subscriptions: users/{uid}/push/{id}.
// ============================================================

import { db } from './firebase-config.js?v=20261120d';
import { doc, setDoc, deleteDoc } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";
import { workerAction } from './ai.js?v=20261120d';

const esc = s => String(s ?? '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
const isIOS = () => /iphone|ipad|ipod/i.test(navigator.userAgent) || (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);
const installed = () => window.matchMedia?.('(display-mode: standalone)').matches || navigator.standalone === true;
const supported = () => 'serviceWorker' in navigator && 'PushManager' in window && 'Notification' in window;

export function remindersAllowed(profile) {
  const hasParent = !!(profile?.parentUid || (profile?.guardianIds || []).length);
  return profile?.remindersAllowed === true || !hasParent || profile?.ageBand === '16+';
}

const subId = async endpoint => [...new Uint8Array(await crypto.subtle.digest('SHA-256', new TextEncoder().encode(endpoint)))]
  .slice(0, 12).map(b => b.toString(16).padStart(2, '0')).join('');
const keyBytes = b64 => Uint8Array.from(atob(b64.replace(/-/g, '+').replace(/_/g, '/') + '==='.slice((b64.length + 3) % 4)), c => c.charCodeAt(0));

async function registration() {
  const reg = await navigator.serviceWorker.getRegistration() || await navigator.serviceWorker.register('sw.js', { scope: './' });
  await navigator.serviceWorker.ready;
  return reg;
}
async function currentSub() {
  if (!supported()) return null;
  try { return await (await registration()).pushManager.getSubscription(); } catch (e) { return null; }
}

async function turnOn(uid) {
  const perm = await Notification.requestPermission();
  if (perm !== 'granted') throw new Error(perm === 'denied'
    ? 'Notifications are blocked for Lobe Limpet. Turn them on in your phone\'s Settings, then try again.'
    : 'You need to allow notifications to get reminders.');
  const { publicKey } = await workerAction('pushKey');
  const reg = await registration();
  const sub = await reg.pushManager.getSubscription() || await reg.pushManager.subscribe({ userVisibleOnly: true, applicationServerKey: keyBytes(publicKey) });
  const j = sub.toJSON();
  await setDoc(doc(db, 'users', uid, 'push', await subId(j.endpoint)), {
    endpoint: j.endpoint, p256dh: j.keys.p256dh, auth: j.keys.auth, at: Date.now(), ua: navigator.userAgent.slice(0, 200),
  });
  await workerAction('pushTest').catch(() => {});
}
async function turnOff(uid) {
  const sub = await currentSub();
  if (!sub) return;
  await deleteDoc(doc(db, 'users', uid, 'push', await subId(sub.endpoint))).catch(() => {});
  await sub.unsubscribe().catch(() => {});
}

// Fill the Profile section
export async function mountReminders(box, uid, profile) {
  if (!box) return;
  const render = async (msg = '') => {
    let html;
    if (!remindersAllowed(profile)) {
      html = `<p class="card-length-help">Your parent or carer can turn on reminders for you: they tick "Allow reminders" in Manage student on their page.</p>`;
    } else if (!supported() || (isIOS() && !installed())) {
      html = `<p class="card-length-help">${isIOS()
        ? 'On iPhone and iPad, reminders work in the Lobe Limpet app: tap Share, then <strong>Add to Home Screen</strong>, open Lobe Limpet from your home screen and come back here.'
        : "This browser can't show reminders. Try Chrome, Edge or Firefox, or install Lobe Limpet as an app."}</p>`;
    } else {
      const on = !!(await currentSub()) && Notification.permission === 'granted';
      html = `<label class="rm-row"><input type="checkbox" id="rm-on" ${on ? 'checked' : ''}>
        <span>Remind me on this device<small>At most one a day: at 4:30pm if reviews are waiting, or 7pm if your streak needs you. Never if you've already revised.</small></span></label>`;
    }
    box.innerHTML = html + `<p class="rm-msg" role="status">${esc(msg)}</p>`;
    const cb = box.querySelector('#rm-on');
    if (cb) cb.onchange = async () => {
      cb.disabled = true;
      try {
        if (cb.checked) { await turnOn(uid); await render('Reminders are on. A test one is on its way.'); }
        else { await turnOff(uid); await render('Reminders are off on this device.'); }
      } catch (e) { cb.checked = !cb.checked; cb.disabled = false; box.querySelector('.rm-msg').textContent = e.message; }
    };
  };
  if (!document.getElementById('rm-style')) document.head.insertAdjacentHTML('beforeend', `<style id="rm-style">
    .rm-row { display: flex; gap: 10px; align-items: flex-start; cursor: pointer; font-weight: 600; }
    .rm-row input { width: 20px; height: 20px; margin-top: 2px; accent-color: var(--color-primary); flex-shrink: 0; }
    .rm-row small { display: block; font-weight: 400; color: var(--color-text-muted); font-size: 0.82rem; margin-top: 3px; line-height: 1.45; }
    .rm-msg { font-size: 0.85rem; color: var(--color-text-muted); margin: 8px 0 0; min-height: 1em; }
  </style>`);
  await render();
}
