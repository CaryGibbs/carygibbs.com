// ============================================================
// LOBE LIMPET: "This is part of Plus" message
// Plus features are shown to everyone. Choosing one without Plus opens
// this dialog, with a link to the Plus page to upgrade.
// ============================================================

const esc = s => String(s ?? '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

export const PLUS_FEATURES = [
  'Create notes and questions with AI, from your own notes, a document or just a topic name',
  'Make flashcards with AI, and fill in meanings for the terms you type',
  'Upload PDFs and Word documents to build revision from',
  'Read scanned pages, photos and diagrams with AI',
  'Suggested links to official exam board resources',
];

// feature: what they tried to use, e.g. "Create with AI"
export function showPlusUpsell(feature = '') {
  document.getElementById('plus-upsell')?.remove();
  if (!document.getElementById('plus-upsell-style')) document.head.insertAdjacentHTML('beforeend', `<style id="plus-upsell-style">
    .pu-overlay { position: fixed; inset: 0; z-index: 3500; background: rgba(10,12,20,0.5); display: flex; align-items: flex-start; justify-content: center; padding: 10vh 16px; overflow-y: auto; }
    .pu-box { background: var(--color-surface, #fff); color: var(--color-text, #111); border-radius: 18px; padding: 24px; max-width: 440px; width: 100%; box-shadow: 0 20px 60px rgba(0,0,0,0.25); font-family: var(--font-body, system-ui); }
    .pu-badge { display: inline-flex; align-items: center; gap: 6px; font-family: var(--font-ui, system-ui); font-size: 0.75rem; font-weight: 800; letter-spacing: 0.04em; text-transform: uppercase; color: #fff; background: linear-gradient(135deg, #ff7a59, #e0643f); padding: 4px 10px; border-radius: 999px; }
    .pu-box h2 { font-family: var(--font-heading, system-ui); font-size: 1.25rem; margin: 12px 0 6px; }
    .pu-box p { font-size: 0.92rem; line-height: 1.5; color: var(--color-text-muted, #555); margin: 0 0 12px; }
    .pu-box ul { margin: 0 0 16px; padding: 0; list-style: none; display: flex; flex-direction: column; gap: 8px; }
    .pu-box li { display: flex; gap: 8px; font-size: 0.9rem; line-height: 1.4; }
    .pu-box li::before { content: '✓'; color: #0d8a7c; font-weight: 800; flex-shrink: 0; }
    .pu-actions { display: flex; gap: 8px; justify-content: flex-end; flex-wrap: wrap; }
  </style>`);
  document.body.insertAdjacentHTML('beforeend', `
    <div class="pu-overlay" id="plus-upsell" role="dialog" aria-modal="true" aria-labelledby="pu-title">
      <div class="pu-box">
        <span class="pu-badge">✨ Plus</span>
        <h2 id="pu-title">${feature ? `${esc(feature)} is part of Lobe Limpet Plus` : 'This is part of Lobe Limpet Plus'}</h2>
        <p>Upgrade to Plus to unlock it. Everything else, including writing your own notes and questions, stays free.</p>
        <ul>${PLUS_FEATURES.map(f => `<li>${esc(f)}</li>`).join('')}</ul>
        <div class="pu-actions">
          <button class="btn btn-secondary" id="pu-close">Not now</button>
          <a class="btn btn-primary" href="plus.html" id="pu-go">Upgrade to Plus</a>
        </div>
      </div>
    </div>`);
  const box = document.getElementById('plus-upsell');
  const close = () => box.remove();
  document.getElementById('pu-close').onclick = close;
  box.addEventListener('click', e => { if (e.target === box) close(); });
  document.addEventListener('keydown', function esc(e) { if (e.key === 'Escape') { close(); document.removeEventListener('keydown', esc); } });
  document.getElementById('pu-go').focus();
}
