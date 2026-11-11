/* ── Topic videos ("Watch first") ─────────────────────────────
   A topic can carry a short list of links to explainer videos:
   topic.videos = [{ label, url }]. Set in the builder (Edit topic),
   shown to students on the hub topic row and in Learn.
   Links open on the video site in a new tab; nothing is embedded. */

const MAX_VIDEOS = 8;

const escv = s => String(s ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

// Only http(s) links with a label
export function videosOf(topic) {
  return (Array.isArray(topic?.videos) ? topic.videos : [])
    .filter(v => v && /^https?:\/\//i.test(v.url || ''))
    .map(v => ({ label: String(v.label || '').trim() || hostOf(v.url), url: v.url }))
    .slice(0, MAX_VIDEOS);
}

function hostOf(url) {
  try { return new URL(url).hostname.replace(/^www\./, ''); } catch (e) { return 'Video'; }
}

// "Label | link" per line (label optional) → { list, bad }
export function parseVideoLines(text) {
  const list = [], bad = [];
  String(text || '').split('\n').map(l => l.trim()).filter(Boolean).forEach(line => {
    const bar = line.lastIndexOf('|');
    const raw = (bar >= 0 ? line.slice(bar + 1) : line).trim();
    let u = null; try { u = new URL(raw); } catch (e) { /* not a link */ }
    if (!u || !/^https?:$/.test(u.protocol)) { bad.push(raw || line); return; }
    const label = (bar >= 0 ? line.slice(0, bar).trim() : '') || hostOf(u.href);
    list.push({ label: label.slice(0, 100), url: u.href });
  });
  return { list: list.slice(0, MAX_VIDEOS), bad, tooMany: list.length > MAX_VIDEOS };
}

export function videoLines(list) {
  return videosOf({ videos: list }).map(v => `${v.label.replace(/\|/g, '-')} | ${v.url}`).join('\n');
}

// A strip of "Watch first" links (Learn page)
export function watchStripHtml(list, { title = 'Watch first' } = {}) {
  const vids = videosOf({ videos: list });
  if (!vids.length) return '';
  return `<div class="watch-strip"><span class="watch-strip-title">▶ ${escv(title)}</span>${vids.map(v =>
    `<a class="watch-link" href="${escv(v.url)}" target="_blank" rel="noopener">${escv(v.label)} <span aria-hidden="true">↗</span></a>`).join('')}</div>`;
}

export const WATCH_CSS = `
.watch-strip { display:flex; flex-shrink:0; flex-wrap:wrap; align-items:center; gap:6px 10px; padding:8px 14px;
  background:var(--color-surface-2); border-bottom:1px solid var(--color-border); font-family:var(--font-ui); font-size:0.85rem; }
.watch-strip-title { font-weight:700; color:var(--color-text); }
.watch-link { color:var(--color-primary); text-decoration:none; font-weight:600; padding:3px 10px; border-radius:999px;
  background:var(--color-surface); border:1px solid var(--color-border); }
.watch-link:hover { border-color:var(--color-primary); }
.outline-watch { display:flex; flex-wrap:wrap; gap:6px; margin:4px 0 8px; }
`;
