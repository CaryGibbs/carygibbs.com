// ============================================================
// LOBE LIMPET: read the text out of a document for AI generation
// PDFs (pdf.js), Word .docx (mammoth) and plain text files are read in
// the browser; nothing is uploaded. The text goes into the "Paste content"
// box, so the existing AI generation works on it unchanged.
// Scanned PDFs (pictures of pages) have no text to read: the user is told.
// ============================================================

const PDFJS = 'https://cdn.jsdelivr.net/npm/pdfjs-dist@3.11.174/legacy/build/pdf.min.js';
const PDFJS_WORKER = 'https://cdn.jsdelivr.net/npm/pdfjs-dist@3.11.174/legacy/build/pdf.worker.min.js';
const MAMMOTH = 'https://cdn.jsdelivr.net/npm/mammoth@1.6.0/mammoth.browser.min.js';
export const MAX_CHARS = 80000;   // about 13,000 words: the most one generation can take
const MAX_FILE = 30 * 1024 * 1024;

const loaded = {};
function loadScript(src) {
  if (!loaded[src]) loaded[src] = new Promise((resolve, reject) => {
    const s = document.createElement('script');
    s.src = src; s.onload = resolve;
    s.onerror = () => { delete loaded[src]; reject(new Error("Couldn't load the document reader. Check your connection and try again.")); };
    document.head.appendChild(s);
  });
  return loaded[src];
}

const tidy = t => String(t || '')
  .replace(/\r/g, '').replace(/[ \t ]+/g, ' ').replace(/ *\n */g, '\n')
  .replace(/\n{3,}/g, '\n\n').trim();

async function pdfText(file, onProgress) {
  await loadScript(PDFJS);
  const lib = window.pdfjsLib;
  lib.GlobalWorkerOptions.workerSrc = PDFJS_WORKER;
  const pdf = await lib.getDocument({ data: new Uint8Array(await file.arrayBuffer()) }).promise;
  const pages = [];
  for (let i = 1; i <= pdf.numPages; i++) {
    onProgress && onProgress(`Reading page ${i} of ${pdf.numPages}…`);
    const content = await (await pdf.getPage(i)).getTextContent();
    // Keep line breaks where the PDF moves to a new line
    let line = '', lastY = null; const lines = [];
    content.items.forEach(it => {
      const y = Math.round(it.transform?.[5] ?? 0);
      if (lastY !== null && Math.abs(y - lastY) > 2 && line.trim()) { lines.push(line); line = ''; }
      line += (line && !line.endsWith(' ') && !it.str.startsWith(' ') ? ' ' : '') + it.str;
      if (it.hasEOL && line.trim()) { lines.push(line); line = ''; }
      lastY = y;
    });
    if (line) lines.push(line);
    pages.push(lines.join('\n'));
  }
  return { text: tidy(pages.join('\n\n')), pages: pdf.numPages };
}

async function docxText(file) {
  await loadScript(MAMMOTH);
  const r = await window.mammoth.extractRawText({ arrayBuffer: await file.arrayBuffer() });
  return { text: tidy(r.value) };
}

// Returns { text, note } where note says what was read (or trimmed)
export async function readDocument(file, onProgress) {
  if (!file) throw new Error('No file chosen');
  if (file.size > MAX_FILE) throw new Error('That file is too big (over 30 MB). Try a smaller section.');
  const name = file.name.toLowerCase();
  let r;
  if (name.endsWith('.pdf') || file.type === 'application/pdf') r = await pdfText(file, onProgress);
  else if (name.endsWith('.docx')) r = await docxText(file);
  else if (name.endsWith('.doc')) throw new Error("Older Word files (.doc) can't be read. In Word, choose File → Save As → Word Document (.docx), then try again.");
  else if (/\.(txt|md|csv)$/.test(name) || file.type.startsWith('text/')) r = { text: tidy(await file.text()) };
  else throw new Error('Please choose a PDF, Word (.docx) or text file.');

  if (r.text.replace(/\s/g, '').length < 40) {
    throw new Error(r.pages
      ? "This PDF doesn't have any text to read: it's probably a scan or photos of pages. Try copying the text from the original, or a typed version."
      : "There's no text in that file.");
  }
  const words = r.text.split(/\s+/).length;
  let note = `Read ${words.toLocaleString('en-GB')} words${r.pages ? ` from ${r.pages} page${r.pages === 1 ? '' : 's'}` : ''} of ${file.name}.`;
  if (r.text.length > MAX_CHARS) {
    r.text = r.text.slice(0, MAX_CHARS).replace(/\s+\S*$/, '');
    note += ` That's more than one go can use, so only the first ${r.text.split(/\s+/).length.toLocaleString('en-GB')} words were kept. For the rest, split the document into topics.`;
  }
  return { text: r.text, note };
}

/* Add an "Upload a document" button above a text box. The read text is
   added to whatever's already in the box. */
export function addDocumentButton(textarea) {
  if (!textarea || textarea.dataset.docButton) return;
  textarea.dataset.docButton = '1';
  if (!document.getElementById('doc-text-style')) document.head.insertAdjacentHTML('beforeend', `<style id="doc-text-style">
    .doc-up { display: flex; align-items: center; gap: 10px; flex-wrap: wrap; margin-bottom: 8px; }
    .doc-up label { display: inline-flex; align-items: center; gap: 6px; cursor: pointer; font-family: var(--font-ui); font-size: 0.82rem; font-weight: 600;
      padding: 6px 12px; border-radius: var(--radius-button); border: 1px solid var(--color-border); background: var(--color-surface); color: var(--color-text); }
    .doc-up label:hover { border-color: var(--color-primary); color: var(--color-primary); }
    .doc-up input { display: none; }
    .doc-up-msg { font-size: 0.8rem; color: var(--color-text-muted); }
    .doc-up-msg.err { color: var(--color-danger); }
  </style>`);
  const wrap = document.createElement('div');
  wrap.className = 'doc-up';
  wrap.innerHTML = `<label><i data-icon="file-text"></i> Upload a document<input type="file" accept=".pdf,.docx,.txt,.md,application/pdf,application/vnd.openxmlformats-officedocument.wordprocessingml.document,text/plain"></label>
    <span class="doc-up-msg">PDF, Word (.docx) or text. The words are read on this device and added below.</span>`;
  textarea.before(wrap);
  const input = wrap.querySelector('input'), msg = wrap.querySelector('.doc-up-msg');
  input.addEventListener('change', async () => {
    const file = input.files[0];
    if (!file) return;
    msg.className = 'doc-up-msg'; msg.textContent = 'Reading…';
    try {
      const { text, note } = await readDocument(file, t => { msg.textContent = t; });
      const before = textarea.value.trim();
      textarea.value = before ? `${before}\n\n${text}` : text;
      textarea.dispatchEvent(new Event('input', { bubbles: true }));
      msg.textContent = note + ' Check it below, then generate.';
    } catch (e) {
      msg.className = 'doc-up-msg err'; msg.textContent = e.message;
    } finally { input.value = ''; }
  });
}
