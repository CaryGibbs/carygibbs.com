// ============================================================
// LOBE LIMPET: a student's own flashcard sets, for the people who
// look after them (parent Progress, teacher student list, Admin, and
// the student's own Profile). Read only.
// Sets live in the student's own pack (users.myPackId): each set is a
// topic with cardSet: true and cards: [{ term, definition, imageUrl? }].
// Parents, guardians and teachers can read that pack (firestore.rules
// studentPackOfMine). Quiz results come from the student's sessions
// (groupId = the pack, topicId = the set).
// ============================================================

import { db } from './firebase-config.js?v=20261113u';
import { collection, getDocs } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";

const esc = s => String(s ?? '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
const ms = t => t?.toMillis?.() || (typeof t === 'number' ? t : 0);
const ago = t => {
  if (!t) return '';
  const d = Math.floor((Date.now() - t) / 86400000);
  return d <= 0 ? 'today' : d === 1 ? 'yesterday' : d < 7 ? `${d} days ago` : new Date(t).toLocaleDateString('en-GB', { day: 'numeric', month: 'short' });
};

// [{ id, name, subject, cards: [...], shared, updated, quizzes, lastPct, lastQuiz }], newest first
export async function loadCardSets(profile = {}) {
  const pack = profile.myPackId;
  if (!pack) return [];
  const subjects = await getDocs(collection(db, `content/${pack}/subjects`));
  const sets = [];
  await Promise.all(subjects.docs.map(async s => {
    const topics = await getDocs(collection(db, `content/${pack}/subjects/${s.id}/topics`));
    topics.forEach(t => {
      const d = t.data();
      if (!d.cardSet) return;
      sets.push({ id: t.id, name: d.name || 'Untitled set', subject: s.data().name || '', cards: d.cards || [],
        shared: (d.sharedWith || []).length > 0, updated: ms(d.updatedAt) || ms(d.createdAt) });
    });
  }));
  const sessions = profile.sessions || [];
  sets.forEach(set => {
    const mine = sessions.filter(x => x.groupId === pack && x.topicId === set.id && !x.review).sort((a, b) => (a.date || 0) - (b.date || 0));
    set.quizzes = mine.length;
    set.lastPct = mine.length ? (mine[mine.length - 1].pct ?? null) : null;
    set.lastQuiz = mine.length ? mine[mine.length - 1].date || 0 : 0;
  });
  return sets.sort((a, b) => Math.max(b.updated, b.lastQuiz) - Math.max(a.updated, a.lastQuiz));
}

export const CARD_SETS_CSS = `
  .cs-list { display: flex; flex-direction: column; gap: 8px; }
  .cs-set { border: 1px solid var(--color-border); border-radius: var(--radius-button, 10px); background: var(--color-surface); }
  .cs-head { display: flex; gap: 10px; align-items: center; justify-content: space-between; padding: 10px 12px; cursor: pointer; list-style: none; }
  .cs-head::-webkit-details-marker { display: none; }
  .cs-name { font-family: var(--font-ui); font-weight: 700; font-size: 0.92rem; }
  .cs-meta { font-size: 0.78rem; color: var(--color-text-muted); }
  .cs-score { font-family: var(--font-ui); font-weight: 800; font-size: 0.85rem; white-space: nowrap; }
  .cs-cards { border-top: 1px solid var(--color-border); padding: 8px 12px 12px; display: grid; grid-template-columns: minmax(90px, 1fr) 2fr; gap: 6px 14px; font-size: 0.85rem; }
  .cs-cards dt { font-weight: 700; }
  .cs-cards dd { margin: 0; color: var(--color-text-muted); }
  .cs-cards img { max-width: 120px; max-height: 80px; border-radius: 6px; display: block; }
  .cs-empty { font-size: 0.88rem; color: var(--color-text-muted); }
  .cs-tag { display: inline-block; margin-left: 6px; padding: 0 6px; border-radius: 999px; border: 1px solid var(--color-border); font-size: 0.68rem; font-weight: 700; vertical-align: middle; }
`;
export function addCardSetsCss() {
  if (!document.getElementById('card-sets-css')) document.head.insertAdjacentHTML('beforeend', `<style id="card-sets-css">${CARD_SETS_CSS}</style>`);
}

// The list: each set opens to show its cards. first = first name, for the empty message.
export function cardSetsHtml(sets, first = 'They') {
  addCardSetsCss();
  if (!sets.length) return `<p class="cs-empty">${esc(first)} hasn't made any flashcard sets yet.</p>`;
  return `<div class="cs-list">${sets.map(s => {
    const meta = [s.subject, `${s.cards.length} card${s.cards.length === 1 ? '' : 's'}`,
      s.quizzes ? `${s.quizzes} quiz${s.quizzes === 1 ? '' : 'zes'}, last ${ago(s.lastQuiz)}` : 'not quizzed yet',
      s.updated ? `edited ${ago(s.updated)}` : ''].filter(Boolean).join(' · ');
    const col = s.lastPct == null ? '' : s.lastPct >= 80 ? 'var(--color-success, #1a8f5a)' : s.lastPct >= 50 ? 'var(--color-warning, #b97700)' : 'var(--color-danger, #c0392b)';
    return `<details class="cs-set">
      <summary class="cs-head">
        <span><span class="cs-name">${esc(s.name)}</span>${s.shared ? '<span class="cs-tag" title="Shared with a class">Shared</span>' : ''}<br><span class="cs-meta">${esc(meta)}</span></span>
        ${s.lastPct != null ? `<span class="cs-score" style="color:${col}" title="Last quiz score">${s.lastPct}%</span>` : ''}
      </summary>
      <dl class="cs-cards">${s.cards.map(c => `<dt>${c.imageUrl ? `<img src="${esc(c.imageUrl)}" alt="" loading="lazy">` : ''}${esc(c.term || '')}</dt><dd>${esc(c.definition || '')}</dd>`).join('')}</dl>
    </details>`;
  }).join('')}</div>`;
}
