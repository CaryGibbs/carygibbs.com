// ============================================================
// LOBE LIMPET: flashcard answer length
// Students choose how much of each answer the card shows:
//   full      the whole answer, as written
//   short     a version of 15 words or fewer
//   keywords  just the key words, to jog the memory
// Short and key-word versions are written by the AI once per topic and
// saved on the topic (content/.../topics/{id}.shortAnswers), so every
// student shares them. Until they're ready, a simple cut-down is shown.
// ============================================================

import { db } from './firebase-config.js?v=20261109m';
import { askClaude, jsonOf } from './ai.js?v=20261109m';
import { doc, updateDoc } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";

export const LENGTHS = [
  { id: 'full',     label: 'Full',      desc: 'The whole answer' },
  { id: 'short',    label: 'Short',     desc: '15 words or fewer' },
  { id: 'keywords', label: 'Key words', desc: 'Just the words that matter' },
];
const SHORT_WORDS = 15;   // answers longer than this get a short version
const KEY_WORDS   = 6;    // answers longer than this get a key-words version

const wordCount = s => String(s || '').trim().split(/\s+/).filter(Boolean).length;

export function lengthOf(profile) {
  let v = profile?.cardLength;
  if (!v) { try { v = localStorage.getItem('bonce_cardLength'); } catch (e) {} }
  return LENGTHS.some(l => l.id === v) ? v : 'full';
}

// A short, stable key for an answer's text (changes if the text is edited)
export function textKey(text) {
  let h = 5381;
  const s = String(text || '');
  for (let i = 0; i < s.length; i++) h = ((h << 5) + h + s.charCodeAt(i)) | 0;
  return 'a' + (h >>> 0).toString(36) + s.length.toString(36);
}

function needs(text, mode) {
  const n = wordCount(text);
  return mode === 'short' ? n > SHORT_WORDS : mode === 'keywords' ? n > KEY_WORDS : false;
}

// Quick cut-down used until the AI versions are ready
function fallback(text, mode) {
  const s = String(text || '').replace(/\s+/g, ' ').trim();
  const first = (s.match(/^.*?[.!?](\s|$)/) || [s])[0].trim();
  const limit = mode === 'keywords' ? KEY_WORDS : SHORT_WORDS;
  const words = first.split(' ');
  return words.length > limit ? words.slice(0, limit).join(' ').replace(/[,;:]$/, '') + '…' : first;
}

// The text to show on the back of a card
export function displayAnswer(topic, text, mode) {
  if (!text || mode === 'full' || !needs(text, mode)) return text;
  const e = topic?.shortAnswers?.[textKey(text)];
  if (e) return mode === 'short' ? (e.s || fallback(text, mode)) : (e.k || e.s || fallback(text, mode));
  return fallback(text, mode);
}

// Make sure a topic has short versions for these cards. Returns true if
// anything new was written. cards: [{ front, back }]
const inFlight = new Map();
export function ensureShortAnswers(loc, topic, cards, { subjectName = '', canSave = true } = {}) {
  const missing = [];
  const seen = new Set();
  cards.forEach(c => {
    if (!c.back || !needs(c.back, 'keywords')) return;
    const k = textKey(c.back);
    if (seen.has(k) || topic.shortAnswers?.[k]) return;
    seen.add(k); missing.push({ id: k, front: c.front, answer: c.back });
  });
  if (!missing.length) return Promise.resolve(false);
  const key = `${loc.p}/${loc.s}/${topic.id}`;
  if (inFlight.has(key)) return inFlight.get(key);

  const job = (async () => {
    let added = false;
    for (let i = 0; i < missing.length; i += 25) {
      const batch = missing.slice(i, i + 25);
      const prompt = `You are helping a GCSE student revise with flashcards${subjectName ? ` for ${subjectName}` : ''}, topic "${topic.name || ''}".
For each flashcard answer below, write:
- "s": a shorter version of ${SHORT_WORDS} words or fewer that keeps the key fact and any key terms, in simple, clear language.
- "k": only the key words, 2 to ${KEY_WORDS} words or a very short phrase, that would jog the student's memory.
Keep every fact exactly correct and do not add new information.
Return ONLY JSON in this form: {"items":[{"id":"...","s":"...","k":"..."}]}

Flashcards:
${JSON.stringify(batch)}`;
      const data = jsonOf(await askClaude('learning', prompt, 3000));
      const items = Array.isArray(data) ? data : (data.items || []);
      const update = {};
      topic.shortAnswers = topic.shortAnswers || {};
      items.forEach(it => {
        if (!it || !batch.some(b => b.id === it.id) || !it.s) return;
        const e = { s: String(it.s).trim(), k: String(it.k || '').trim() };
        topic.shortAnswers[it.id] = e;
        update[`shortAnswers.${it.id}`] = e;
        added = true;
      });
      if (canSave && Object.keys(update).length) {
        await updateDoc(doc(db, `content/${loc.p}/subjects/${loc.s}/topics/${topic.id}`), update).catch(err => console.warn('Short answers not saved:', err.message));
      }
    }
    return added;
  })().finally(() => inFlight.delete(key));
  inFlight.set(key, job);
  return job;
}
