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
const AI_MAX_PAGES = 30;          // pages read with AI in one go (cost and time)
const AI_BATCH = 4;               // pages per AI request

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

/* ── Reading with AI (Plus): scans, diagrams, graphs, tables ──
   Each page is drawn as a picture and the AI writes out its text and
   describes every diagram in words, a few pages at a time. */
async function pagePictures(file, onProgress) {
  await loadScript(PDFJS);
  const lib = window.pdfjsLib;
  lib.GlobalWorkerOptions.workerSrc = PDFJS_WORKER;
  const pdf = await lib.getDocument({ data: new Uint8Array(await file.arrayBuffer()) }).promise;
  const total = pdf.numPages, n = Math.min(total, AI_MAX_PAGES);
  const pics = [];
  for (let i = 1; i <= n; i++) {
    onProgress && onProgress(`Preparing page ${i} of ${n}…`);
    const page = await pdf.getPage(i);
    const base = page.getViewport({ scale: 1 });
    const scale = Math.min(2, 1500 / Math.max(base.width, base.height));   // about 1500px on the long side
    const vp = page.getViewport({ scale });
    const canvas = document.createElement('canvas');
    canvas.width = Math.round(vp.width); canvas.height = Math.round(vp.height);
    const ctx = canvas.getContext('2d');
    ctx.fillStyle = '#fff'; ctx.fillRect(0, 0, canvas.width, canvas.height);
    await page.render({ canvasContext: ctx, viewport: vp }).promise;
    pics.push(canvas.toDataURL('image/jpeg', 0.8).split(',')[1]);
    canvas.width = canvas.height = 0;
  }
  return { pics, total };
}

// askClaude: from ai.js (passed in, so this file has no AI dependency)
export async function readDocumentWithAI(file, askClaude, onProgress) {
  if (!file) throw new Error('No file chosen');
  if (file.size > MAX_FILE) throw new Error('That file is too big (over 30 MB). Try a smaller section.');
  const name = file.name.toLowerCase();
  let pics, total;
  if (name.endsWith('.pdf') || file.type === 'application/pdf') ({ pics, total } = await pagePictures(file, onProgress));
  else if (/^image\/(jpeg|png|webp|gif)$/.test(file.type)) {
    // A photo of notes or a worksheet
    pics = [await new Promise((res, rej) => { const r = new FileReader(); r.onload = () => res(String(r.result).split(',')[1]); r.onerror = rej; r.readAsDataURL(file); })];
    total = 1;
  } else throw new Error('Reading with AI works with PDFs and photos. For Word files, use Upload a document.');
  const type = name.endsWith('.pdf') || file.type === 'application/pdf' ? 'image/jpeg' : file.type;
  const parts = [];
  for (let i = 0; i < pics.length; i += AI_BATCH) {
    const batch = pics.slice(i, i + AI_BATCH);
    const first = i + 1, last = i + batch.length;
    onProgress && onProgress(`Reading page${batch.length > 1 ? `s ${first} to ${last}` : ` ${first}`} of ${pics.length} with AI…`);
    const content = [];
    batch.forEach((data, k) => {
      content.push({ type: 'text', text: `Page ${first + k}:` });
      content.push({ type: 'image', source: { type: 'base64', media_type: type, data } });
    });
    content.push({ type: 'text', text: `These are pages of revision material for a UK GCSE student. Write out everything on them as plain text, so it can be used to make revision notes and questions:
- Copy all the text accurately, in reading order, keeping headings and lists. Include handwriting if it's readable.
- For every diagram, graph, chart, map, table or picture, write "[Diagram: …]" (or Graph, Table, Map, Picture) and describe it fully in words: what it shows, every label, value, axis, arrow and key, and what it means. Write tables out row by row.
- Don't add anything that isn't on the page, and don't summarise.
Start each page with "Page N" on its own line. Reply with the text only.` });
    const data = await askClaude('generation', content, 8000);
    parts.push((data.content || []).map(c => c.text || '').join('').trim());
  }
  let text = tidy(parts.join('\n\n'));
  if (!text) throw new Error("The AI couldn't read anything on those pages. Try a clearer copy.");
  let note = `Read ${pics.length} page${pics.length === 1 ? '' : 's'} of ${file.name} with AI, including diagrams.`;
  if (total > pics.length) note += ` Only the first ${pics.length} of ${total} pages were read; upload the rest separately.`;
  if (text.length > MAX_CHARS) {
    text = text.slice(0, MAX_CHARS).replace(/\s+\S*$/, '');
    note += ' That was more than one go can use, so the end was cut off.';
  }
  return { text, note };
}

/* Add an "Upload a document" button above a text box. The read text is
   added to whatever's already in the box. */
// options.askClaude: when given (Plus), also offer "Read with AI" for scans and diagrams
export function addDocumentButton(textarea, { askClaude = null } = {}) {
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
  wrap.innerHTML = `<label><i data-icon="file-text"></i> Upload a document<input type="file" data-mode="text" accept=".pdf,.docx,.txt,.md,application/pdf,application/vnd.openxmlformats-officedocument.wordprocessingml.document,text/plain"></label>
    ${askClaude ? `<label title="For scanned pages, photos, diagrams, graphs and tables. Uses AI, so takes a little longer."><i data-icon="sparkles"></i> Read with AI (scans &amp; diagrams)<input type="file" data-mode="ai" accept=".pdf,application/pdf,image/png,image/jpeg,image/webp"></label>` : ''}
    <span class="doc-up-msg">${askClaude
      ? 'Upload a document reads the words in a PDF, Word or text file. Read with AI also reads scans, photos and diagrams (PDF or photo, up to 30 pages).'
      : 'PDF, Word (.docx) or text. The words are read on this device and added below.'}</span>`;
  textarea.before(wrap);
  const msg = wrap.querySelector('.doc-up-msg');
  wrap.querySelectorAll('input').forEach(input => input.addEventListener('change', async () => {
    const file = input.files[0];
    if (!file) return;
    msg.className = 'doc-up-msg'; msg.textContent = 'Reading…';
    try {
      const { text, note } = input.dataset.mode === 'ai'
        ? await readDocumentWithAI(file, askClaude, t => { msg.textContent = t; })
        : await readDocument(file, t => { msg.textContent = t; });
      const before = textarea.value.trim();
      textarea.value = before ? `${before}\n\n${text}` : text;
      textarea.dispatchEvent(new Event('input', { bubbles: true }));
      msg.textContent = note + ' Check it below, then generate.';
    } catch (e) {
      msg.className = 'doc-up-msg err';
      // A scan read as text: point to the AI reader when it's available
      msg.textContent = e.message + (askClaude && input.dataset.mode === 'text' && /scan/.test(e.message) ? ' Or use Read with AI, which can read scans.' : '');
    } finally { input.value = ''; }
  }));
}
