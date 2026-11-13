// ============================================================
// LOBE LIMPET: free sample topics in Lobe Limpet (official) packs
// An admin marks topics in an official pack "Plus only" (topic.plusOnly).
// Everyone sees those topics listed; only people with Plus can learn,
// quiz or review them. The security rules enforce the same thing for the
// topic's questions and notes (firestore.rules: topicOpen).
// A copy of a pack (My packs) drops the marks: it belongs to whoever
// made it, so they and their students use all of it.
// ============================================================

import { hasPlus } from './auth.js?v=20261113c';
import { showPlusUpsell } from './plus.js?v=20261113c';

export const isPlusOnly = topic => topic?.plusOnly === true;
// Locked for this person: a Plus only topic and they don't have Plus
export const topicLocked = (topic, profile) => isPlusOnly(topic) && !hasPlus(profile);

export function showTopicLocked(name = '') {
  showPlusUpsell(name ? `"${name}"` : 'This topic');
}

// "✨ Plus" tag beside a topic name
export const plusTagHtml = (title = 'Part of Lobe Limpet Plus') =>
  `<span class="plus-tag" title="${title}">✨ Plus</span>`;

export const ACCESS_CSS = `
  .plus-tag { display: inline-flex; align-items: center; gap: 3px; margin-left: 6px; padding: 1px 7px; border-radius: 999px;
    font-family: var(--font-ui, system-ui); font-size: 0.68rem; font-weight: 800; letter-spacing: 0.02em; vertical-align: middle;
    color: #fff; background: linear-gradient(135deg, #ff7a59, #e0643f); white-space: nowrap; }
  .topic-row.locked .topic-row-name { opacity: 0.75; }
  .topic-row.locked .topic-btn { opacity: 0.6; }
`;
export function addAccessCss() {
  if (!document.getElementById('access-css')) document.head.insertAdjacentHTML('beforeend', `<style id="access-css">${ACCESS_CSS}</style>`);
}
