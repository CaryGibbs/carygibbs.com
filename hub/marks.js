// ============================================================
// LOBE LIMPET: free AI marks a week
// Without Plus, written answers get a number of AI marks a week
// (Monday to Sunday, UK time). The AI Worker counts and enforces them
// (aiMarks/{uid}_{monday}, settings/aiLimits.freeMarksWeek); this file
// only reads them, to show what's left. Plus: unlimited.
// ============================================================

import { db } from './firebase-config.js?v=20261126b';
import { doc, getDoc } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";

export const FREE_MARKS_DEFAULT = 15;

const londonDay = (d = new Date()) => new Intl.DateTimeFormat('en-CA', { timeZone: 'Europe/London', year: 'numeric', month: '2-digit', day: '2-digit' }).format(d);
// The Monday that starts this week, UK time: "2026-11-16"
export function weekKey(d = new Date()) {
  const [y, m, dd] = londonDay(d).split('-').map(Number);
  const t = new Date(Date.UTC(y, m - 1, dd));
  t.setUTCDate(t.getUTCDate() - ((t.getUTCDay() + 6) % 7));
  return t.toISOString().slice(0, 10);
}

let capPromise = null;
export function freeMarksCap() {
  if (!capPromise) capPromise = getDoc(doc(db, 'settings', 'aiLimits'))
    .then(s => { const v = s.exists() ? s.data().freeMarksWeek : undefined; return v === undefined || v === null || v === '' ? FREE_MARKS_DEFAULT : Math.max(0, Number(v) || 0); })
    .catch(() => FREE_MARKS_DEFAULT);
  return capPromise;
}

// { cap, used, left } for this week; cap 0 means no weekly limit
export async function marksLeft(uid) {
  const cap = await freeMarksCap();
  if (!cap || !uid) return { cap: 0, used: 0, left: Infinity };
  const snap = await getDoc(doc(db, 'aiMarks', `${uid}_${weekKey()}`)).catch(() => null);
  const used = snap?.exists?.() ? Number(snap.data().count) || 0 : 0;
  return { cap, used, left: Math.max(0, cap - used) };
}

// Has a student used up this week's free marks? (set by the Worker on their record)
export const marksFullThisWeek = profile => !!profile?.aiMarksFull && profile.aiMarksFull === weekKey();

export const marksLeftText = n => `${n} free AI mark${n === 1 ? '' : 's'} left this week`;
