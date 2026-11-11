// ============================================================
// LOBE LIMPET: finding a pack in a long list
// Lobe Limpet (official) packs are grouped by level (GCSE, A level), then
// subject, with the exam board as a tag. A filter bar on top: level
// buttons, a board menu and a search box (subject, board, spec code, name).
// "My packs" stay first, untouched by the level and board filters.
// Used by the parent and teacher assign dialogs and My packs → "Start from
// a Lobe Limpet pack".
//
// A pack's level, subject and board come from its own fields (level,
// subject, examBoard, specCode) or, failing that, from a name written
// like "GCSE Biology (AQA 8461)" or "A level Economics A (Edexcel 9EC0)".
// ============================================================

const esc = s => String(s ?? '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
const LEVELS = ['GCSE', 'AS level', 'A level'];
const normLevel = l => {
  const s = String(l || '').trim();
  if (/^gcse/i.test(s)) return 'GCSE';
  if (/^as[ -]?level/i.test(s)) return 'AS level';
  if (/^a[ -]?level/i.test(s)) return 'A level';
  return '';
};
const normBoard = b => {
  const s = String(b || '').trim();
  if (/edexcel|pearson/i.test(s)) return 'Edexcel';
  if (/eduqas/i.test(s)) return 'Eduqas';
  if (/wjec/i.test(s)) return 'WJEC';
  if (/^ocr/i.test(s)) return 'OCR';
  if (/^aqa/i.test(s)) return 'AQA';
  if (/ccea/i.test(s)) return 'CCEA';
  return s;
};

export function packMeta(p = {}) {
  const name = String(p.name || '');
  const m = name.match(/^(GCSE|AS[ -]level|A[ -]level)\s+(.+?)(?:\s*\(([^)]*)\))?\s*$/i);
  const level = normLevel(p.level) || normLevel(m?.[1]);
  const inBrackets = (m?.[3] || '').trim();                 // "AQA 8461", "Edexcel 9EC0", "demo"
  const bm = inBrackets.match(/^(AQA|OCR|WJEC Eduqas|Eduqas|WJEC|Pearson Edexcel|Edexcel|CCEA)\b\s*(.*)$/i);
  const board = normBoard(p.examBoard) || (bm ? normBoard(bm[1]) : '');
  const code = String(p.specCode || (bm ? bm[2] : '') || '').trim();
  const subject = String(p.subject || (m ? m[2] : '') || '').trim();
  return { level, subject, board, code };
}

export const PICKER_CSS = `
  .pp-bar { display: flex; flex-wrap: wrap; gap: 8px; align-items: center; margin: 2px 0 10px; }
  .pp-levels { display: inline-flex; border: 1px solid var(--color-border); border-radius: 999px; overflow: hidden; }
  .pp-levels button { border: 0; background: none; padding: 6px 12px; font-family: var(--font-ui); font-size: 0.8rem; font-weight: 700; color: var(--color-text-muted); cursor: pointer; }
  .pp-levels button.on { background: var(--color-primary); color: var(--color-on-primary, #fff); }
  .pp-bar select, .pp-bar input { font: inherit; font-size: 0.85rem; padding: 6px 10px; border: 1px solid var(--color-border); border-radius: 999px; background: var(--color-surface); color: var(--color-text); }
  .pp-bar input { flex: 1; min-width: 140px; }
  .pp-level { font-family: var(--font-ui); font-size: 0.8rem; font-weight: 800; color: var(--color-text); margin: 12px 0 2px; }
  .pp-subject { font-family: var(--font-ui); font-size: 0.72rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.04em; color: var(--color-text-muted); margin: 8px 0 4px; }
  .pp-board { display: inline-block; margin-left: 6px; padding: 1px 7px; border-radius: 999px; border: 1px solid var(--color-border); font-family: var(--font-ui); font-size: 0.68rem; font-weight: 700; color: var(--color-text-muted); vertical-align: middle; white-space: nowrap; }
  .pp-none { font-size: 0.85rem; color: var(--color-text-muted); padding: 6px 0; }
  .pp-items { display: flex; flex-direction: column; gap: 8px; }
`;
export function addPickerCss() {
  if (!document.getElementById('pack-picker-css')) document.head.insertAdjacentHTML('beforeend', `<style id="pack-picker-css">${PICKER_CSS}</style>`);
}
export const boardTagHtml = p => { const b = packMeta(p).board; return b ? `<span class="pp-board">${esc(b)}</span>` : ''; };

// mine: own packs; official: Lobe Limpet packs. item(p) returns one row's
// HTML (anything with a checkbox or button). Returns the picker's HTML;
// call wirePicker(container) once it's in the page.
export function pickerHtml({ mine = [], official = [], item, mineTitle = 'My packs', officialTitle = 'Lobe Limpet packs', filterFrom = 6 }) {
  addPickerCss();
  const row = p => {
    const meta = packMeta(p);
    const hay = [p.name, p.description, meta.subject, meta.board, meta.code, meta.level].join(' ').toLowerCase();
    return `<div class="pp-item" data-level="${esc(meta.level)}" data-board="${esc(meta.board)}" data-hay="${esc(hay)}">${item(p)}</div>`;
  };
  const showBar = official.length >= filterFrom;
  const boards = [...new Set(official.map(p => packMeta(p).board).filter(Boolean))].sort();
  const levelsPresent = LEVELS.filter(l => official.some(p => packMeta(p).level === l));
  const bar = showBar ? `<div class="pp-bar">
      ${levelsPresent.length > 1 ? `<span class="pp-levels" role="group" aria-label="Level">
        <button type="button" class="on" data-pp-level="">All</button>${levelsPresent.map(l => `<button type="button" data-pp-level="${esc(l)}">${esc(l)}</button>`).join('')}</span>` : ''}
      ${boards.length > 1 ? `<select data-pp-board aria-label="Exam board"><option value="">All boards</option>${boards.map(b => `<option>${esc(b)}</option>`).join('')}</select>` : ''}
      <input type="search" data-pp-search placeholder="Search subject, board or spec code" aria-label="Search packs">
    </div>` : '';
  // Lobe Limpet packs: level → subject, A–Z
  const byLevel = {};
  official.forEach(p => { const m = packMeta(p); ((byLevel[m.level || 'Other'] ||= {})[m.subject || 'Other'] ||= []).push(p); });
  const levelOrder = [...LEVELS, 'Other'].filter(l => byLevel[l]);
  const officialHtml = levelOrder.map(l => {
    const subs = Object.keys(byLevel[l]).sort((a, b) => a === 'Other' ? 1 : b === 'Other' ? -1 : a.localeCompare(b, 'en-GB'));
    return `<div class="pp-group" data-pp-group><div class="pp-level">${esc(l === 'Other' ? 'Other packs' : l)}</div>${subs.map(s => `<div class="pp-group" data-pp-group>
        <div class="pp-subject">${esc(s === 'Other' ? (l === 'Other' ? '' : 'Other') : s)}</div>
        <div class="pp-items">${byLevel[l][s].sort((a, b) => (packMeta(a).board || '').localeCompare(packMeta(b).board || '') || a.name.localeCompare(b.name)).map(row).join('')}</div></div>`).join('')}</div>`;
  }).join('');
  return `<div class="pack-picker">${bar}
    ${mine.length ? `<div class="pp-group" data-pp-group data-pp-mine><div class="pp-level">${esc(mineTitle)}</div><div class="pp-items">${mine.map(row).join('')}</div></div>` : ''}
    ${official.length ? `<div class="pp-group" data-pp-group>${officialTitle ? `<div class="pp-level" style="margin-top:14px;">${esc(officialTitle)}</div>` : ''}${officialHtml}</div>` : ''}
    <div class="pp-none" hidden>No packs match. Try another level, board or word.</div></div>`;
}

export function wirePicker(container) {
  const root = container?.querySelector?.('.pack-picker') || container;
  if (!root) return;
  const st = { level: '', board: '', q: '' };
  const apply = () => {
    const words = st.q.toLowerCase().split(/\s+/).filter(Boolean);
    root.querySelectorAll('.pp-item').forEach(el => {
      const mine = !!el.closest('[data-pp-mine]');
      const chosen = !!el.querySelector('input:checked');   // a ticked pack never disappears
      const ok = chosen || ((mine || !st.level || el.dataset.level === st.level)
        && (mine || !st.board || el.dataset.board === st.board)
        && words.every(w => el.dataset.hay.includes(w)));
      el.hidden = !ok;
    });
    // Hide headings with nothing left under them (innermost first)
    [...root.querySelectorAll('[data-pp-group]')].reverse().forEach(g => {
      g.hidden = !g.querySelector('.pp-item:not([hidden])');
    });
    const none = root.querySelector('.pp-none');
    if (none) none.hidden = !!root.querySelector('.pp-item:not([hidden])');
  };
  root.querySelectorAll('[data-pp-level]').forEach(b => b.addEventListener('click', () => {
    st.level = b.dataset.ppLevel;
    root.querySelectorAll('[data-pp-level]').forEach(x => x.classList.toggle('on', x === b));
    apply();
  }));
  root.querySelector('[data-pp-board]')?.addEventListener('change', e => { st.board = e.target.value; apply(); });
  root.querySelector('[data-pp-search]')?.addEventListener('input', e => { st.q = e.target.value; apply(); });
}
