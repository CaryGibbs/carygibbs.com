// ============================================================
// CLASP: AI requests and model choice
// Admins choose a model for each job in Admin → Settings. The choice
// is saved in Firestore at settings/ai and read here by every page.
// If a chosen model fails, the request is retried with the model the
// app has always used, so nothing breaks.
// ============================================================

import { db } from './firebase-config.js?v=20261109f';
import { doc, getDoc } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";

export const PROXY_URL = 'https://curly-recipe-8b84.clasp-hub-app.workers.dev';
export const FALLBACK_MODEL = 'claude-sonnet-4-5';   // what the app used before settings existed

// Models offered in the settings dropdowns (newest first)
export const MODELS = [
  { id: 'claude-opus-5-5',   name: 'Claude Opus 5.5',   note: 'most in-depth, highest cost' },
  { id: 'claude-sonnet-5-5', name: 'Claude Sonnet 5.5', note: 'balanced quality and cost' },
  { id: 'claude-haiku-5-5',  name: 'Claude Haiku 5.5',  note: 'cheapest and fastest' },
  { id: 'claude-sonnet-4-5', name: 'Claude Sonnet 4.5', note: 'older model, used until now' },
];

// The three jobs, with a recommended model for each
export const TASKS = {
  generation: { label: 'Writing questions and key points', help: 'Used in the admin panel when generating content. Quality matters most here, and it runs rarely.', recommended: 'claude-sonnet-5-5' },
  learning:   { label: 'Learning notes and cheat sheets',   help: 'Written once per point or topic, then saved for everyone.',                                   recommended: 'claude-sonnet-5-5' },
  marking:    { label: 'Marking written answers',           help: 'Runs on every written answer in a quiz, so speed and cost matter most.',                       recommended: 'claude-haiku-5-5' },
};

let settingsPromise = null;
export function loadAiSettings(force = false) {
  if (!settingsPromise || force) {
    settingsPromise = getDoc(doc(db, 'settings', 'ai'))
      .then(s => (s.exists() ? s.data() : {}))
      .catch(() => ({}));
  }
  return settingsPromise;
}

export async function modelFor(task) {
  const s = await loadAiSettings();
  return s[task] || FALLBACK_MODEL;
}

// Send a prompt; returns the raw API response (with .content and .model)
export async function askClaude(task, prompt, maxTokens = 1500, { model, noFallback = false } = {}) {
  const chosen = model || await modelFor(task);
  const send = m => fetch(PROXY_URL, {
    method: 'POST', headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ model: m, max_tokens: maxTokens, messages: [{ role: 'user', content: prompt }] })
  }).then(async r => {
    const data = await r.json().catch(() => ({}));
    if (!r.ok || data.error || !data.content) throw new Error(data.error?.message || `AI request failed (${r.status})`);
    return data;
  });
  try { return await send(chosen); }
  catch (e) {
    if (chosen === FALLBACK_MODEL || noFallback) throw e;
    console.warn(`Model ${chosen} failed (${e.message}); retrying with ${FALLBACK_MODEL}`);
    return send(FALLBACK_MODEL);
  }
}

// Ask the Worker to check that links load (browsers can't, because of CORS).
// Returns { url: { ok, status, finalUrl } }. Throws if the Worker doesn't
// support link checking yet, so callers can fall back to "unchecked".
export async function checkLinks(urls) {
  const r = await fetch(PROXY_URL, {
    method: 'POST', headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ action: 'checkLinks', urls })
  });
  const data = await r.json().catch(() => ({}));
  if (!r.ok || !data.results) throw new Error(data.error?.message || `Link check failed (${r.status})`);
  return data.results;
}

// Text of a response
export function textOf(data) {
  return (data.content || []).map(c => c.text || '').join('');
}

// Parse a JSON object or array from a response, tolerating code fences
export function jsonOf(data) {
  return parseJsonLoose(textOf(data));
}

// Parse JSON from AI text. Copes with code fences, text around the JSON,
// and replies that were cut off part-way (long answers can hit the length
// limit): it keeps everything up to the last complete item and closes the
// brackets, so a long list still loads, just a little shorter.
export function parseJsonLoose(text) {
  const cleaned = String(text || '').replace(/```[a-z]*\n?/gi, '').replace(/```/g, '').trim();
  try { return JSON.parse(cleaned); } catch (e) { /* try harder below */ }
  const start = cleaned.search(/[\[{]/);
  if (start < 0) throw new Error('The AI reply had no data in it. Please try again.');
  const s = cleaned.slice(start);
  // Walk the text, noting each point where an object or list closes
  const stack = [], cuts = [];
  let inStr = false, esc = false;
  for (let i = 0; i < s.length; i++) {
    const ch = s[i];
    if (inStr) { if (esc) esc = false; else if (ch === '\\') esc = true; else if (ch === '"') inStr = false; continue; }
    if (ch === '"') inStr = true;
    else if (ch === '[' || ch === '{') stack.push(ch);
    else if (ch === ']' || ch === '}') {
      stack.pop();
      cuts.push({ i, open: stack.slice() });
      if (!stack.length) { try { return JSON.parse(s.slice(0, i + 1)); } catch (e) { /* keep going */ } }
    }
  }
  // Cut off part-way: close at the latest point that parses
  for (let k = cuts.length - 1; k >= 0; k--) {
    const { i, open } = cuts[k];
    const closers = open.slice().reverse().map(c => (c === '[' ? ']' : '}')).join('');
    try { return JSON.parse(s.slice(0, i + 1) + closers); } catch (e) { /* earlier cut */ }
  }
  throw new Error('The AI reply was incomplete. Please try again, or split the topic into smaller parts.');
}
