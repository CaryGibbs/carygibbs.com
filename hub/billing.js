// ============================================================
// LOBE LIMPET: paying for Plus (Stripe), shared by the pages
//
// The price and the payments switch live in Firestore and are set in
// Admin → Settings → Payments and pricing. The dev site (carygibbs.com)
// uses Stripe's test mode and its own settings; the live site
// (lobelimpet.com) uses live mode:
//   settings/pricing    | settings/pricingDev    plan name, price, Stripe price id
//   settings/payments   | settings/paymentsDev   mode: 'off' | 'admins' | 'on'
//   billing/{uid}       | billingTest/{uid}      the person's subscription
// Only the AI Worker talks to Stripe and writes billing records. The page
// asks it for a checkout or "Manage billing" link and goes there.
// ============================================================

import { db } from './firebase-config.js?v=20261124j';
import { doc, getDoc } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";
import { workerAction } from './ai.js?v=20261124j';

export const IS_DEV = (() => {
  const h = location.hostname;
  return /(^|\.)carygibbs\.com$/.test(h) || h === 'localhost' || h === '127.0.0.1';
})();
export const PRICING_DOC = IS_DEV ? 'pricingDev' : 'pricing';
export const PAYMENTS_DOC = IS_DEV ? 'paymentsDev' : 'payments';
export const BILLING_COLL = IS_DEV ? 'billingTest' : 'billing';
export const STRIPE_DASH = `https://dashboard.stripe.com/${IS_DEV ? 'test/' : ''}`;
// Shown until a price is saved in Admin (the Worker never charges these)
export const DEFAULT_PLAN = 'Family Plus';
export const DEFAULT_PENCE = 3999;

// "£39.99", "£40"
export function gbp(pence) {
  const n = Number(pence) || 0;
  return '£' + (n % 100 ? (n / 100).toFixed(2) : String(n / 100));
}
// "about 77p a week"
export function perWeekText(pence) {
  const w = (Number(pence) || 0) / 52;
  return w >= 100 ? `about ${gbp(Math.round(w))} a week` : `about ${Math.round(w)}p a week`;
}
export const dateText = ms => new Date(ms).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });

export async function getPricing() {
  const d = await getDoc(doc(db, 'settings', PRICING_DOC)).catch(() => null);
  const p = d?.exists() ? d.data() : {};
  return { planName: p.planName || DEFAULT_PLAN, amountPence: Number(p.amountPence) || DEFAULT_PENCE, priceId: p.priceId || '', history: p.history || [] };
}
export async function getPaymentsMode() {
  const d = await getDoc(doc(db, 'settings', PAYMENTS_DOC)).catch(() => null);
  const m = d?.exists() ? d.data().mode : 'off';
  return ['off', 'admins', 'on'].includes(m) ? m : 'off';
}
export async function getBilling(uid) {
  if (!uid) return null;
  const d = await getDoc(doc(db, BILLING_COLL, uid)).catch(() => null);
  return d?.exists() ? d.data() : null;
}

// Who can buy: adults (parents, teachers, admins). Students ask a parent.
const rolesOf = p => new Set([...(Array.isArray(p?.roles) ? p.roles : []), p?.role].filter(Boolean));
export function canBuy(profile) {
  const r = rolesOf(profile);
  return r.has('parent') || r.has('teacher') || r.has('admin');
}
export function isAdminProfile(profile) { return rolesOf(profile).has('admin'); }
// Payments open to this person?
export function paymentsOpenFor(mode, profile) {
  return mode === 'on' || (mode === 'admins' && isAdminProfile(profile));
}

// A paid subscription that gives Plus right now
export const PAID_STATES = ['active', 'cancelling', 'past_due'];
export function paidPlus(billing) { return !!billing && PAID_STATES.includes(billing.state); }

// Plus given free by an admin: { until: ms|null, note } or null
export function giftOf(profile) {
  if (profile?.tier !== 'plus' || profile?.tierSource === 'stripe') return null;
  const until = Number(profile.plusUntil) || null;
  if (until && until <= Date.now()) return null;
  return { until, note: profile.plusNote || '' };
}

// Go to Stripe's checkout page (the Worker checks everything again)
export async function startCheckout() {
  const back = location.href.split(/[?#]/)[0];
  const r = await workerAction('billingCheckout', { returnTo: back });
  if (!r.url) throw new Error('No checkout link came back');
  location.href = r.url;
}
// Stripe's page for cancelling, changing card and seeing receipts
export async function openBillingPortal() {
  const r = await workerAction('billingPortal', { returnTo: location.href.split('#')[0] });
  if (!r.url) throw new Error('No billing link came back');
  location.href = r.url;
}
