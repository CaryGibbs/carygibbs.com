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

/* ── Web pages to read ("Read first") ────────────────────────
   topic.reads = [{ label, url, site }]: pages a topic was made from
   with Create with AI → "A web page" (e.g. BBC Bitesize), or added in
   Edit topic. Only the link is kept (never the page's words), so
   students go back to the original page to read it. */
const MAX_READS = 8;

// A friendly name for the site a link is on ("BBC Bitesize", not "bbc.co.uk")
export function siteOf(url) {
  try {
    const x = new URL(url); const h = x.hostname.replace(/^www\./, '');
    if (/^bbc\.(co\.uk|com)$/.test(h)) return /^\/bitesize/.test(x.pathname) ? 'BBC Bitesize' : 'BBC';
    return { 'thenational.academy': 'Oak National Academy', 'savemyexams.com': 'Save My Exams', 'senecalearning.com': 'Seneca',
      'en.wikipedia.org': 'Wikipedia', 'physicsandmathstutor.com': 'Physics & Maths Tutor', 'docbrown.info': "Doc Brown's", 'youtube.com': 'YouTube' }[h] || h;
  } catch (e) { return 'Web'; }
}
// Pages with no real name (blank, or just the web address) are called
// "BBC Bitesize page", numbered when there are several
export function readsOf(topic) {
  const list = (Array.isArray(topic?.reads) ? topic.reads : [])
    .filter(r => r && /^https?:\/\//i.test(r.url || ''))
    .slice(0, MAX_READS)
    .map(r => {
      let label = String(r.label || '').trim();
      if (!label || label.replace(/^www\./, '') === hostOf(r.url) || label === r.url) label = '';
      return { label, url: r.url, site: String(r.site || '').trim() || siteOf(r.url), named: !!label };
    });
  const unnamed = list.filter(r => !r.named);
  unnamed.forEach(r => {
    const same = unnamed.filter(x => x.site === r.site);
    r.label = `${r.site} page${same.length > 1 ? ' ' + (same.indexOf(r) + 1) : ''}`;
  });
  return list.map(({ named, ...r }) => r);
}

// Add pages to a list, without repeats (same link), newest last
export function mergeReads(list, add) {
  const out = readsOf({ reads: list });
  readsOf({ reads: add }).forEach(r => { if (!out.some(x => sameUrl(x.url, r.url))) out.push(r); });
  return out.slice(-MAX_READS);
}
const sameUrl = (a, b) => String(a).replace(/[#?].*$/, '').replace(/\/$/, '') === String(b).replace(/[#?].*$/, '').replace(/\/$/, '');

export function readLines(list) {
  return readsOf({ reads: list }).map(r => `${r.label.replace(/\|/g, '-')} | ${r.url}`).join('\n');
}
// What students see: "River management (BBC Bitesize)"
export const readLabel = r => r.site && !r.label.toLowerCase().includes(r.site.toLowerCase()) ? `${r.label} (${r.site})` : r.label;
// "Label | link" per line, keeping the site name of pages already there
export function parseReadLines(text, before = []) {
  const p = parseVideoLines(text);
  const old = readsOf({ reads: before });
  return { ...p, list: p.list.map(r => ({ ...r, site: old.find(o => sameUrl(o.url, r.url))?.site || '' })) };
}


// A strip of "Read first" links (Learn page)
export function readStripHtml(list, { title = 'Read first' } = {}) {
  const reads = readsOf({ reads: list });
  if (!reads.length) return '';
  return `<div class="watch-strip read-strip"><span class="watch-strip-title">📖 ${escv(title)}</span>${reads.map(r =>
    `<a class="watch-link" href="${escv(r.url)}" target="_blank" rel="noopener">${escv(readLabel(r))} <span aria-hidden="true">↗</span></a>`).join('')}</div>`;
}
export function readLinksHtml(list, cls = 'watch-link') {
  return readsOf({ reads: list }).map(r => `<a class="${cls}" href="${escv(r.url)}" target="_blank" rel="noopener">📖 ${escv(readLabel(r))} ↗</a>`).join('');
}
