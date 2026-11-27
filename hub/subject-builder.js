// ============================================================
// LOBE LIMPET: "Topics from one sheet" (Plus, or the free try)
// One worksheet, revision list, guide or spec often covers several
// topics. This reads it once, lets AI suggest the topics (matched to
// the subject's existing topics where they're the same thing), the
// user ticks and renames them, then each topic gets notes and quiz
// questions made from ONLY its own part of the document.
//   1. Your sheet  (photo, file or paste, read as in Create with AI)
//   2. The topics  (tick, rename, new or add to an existing topic)
//   3. Building    (notes then questions per topic, saved as they finish)
// The document is split into numbered lines; the AI says which lines
// belong to each topic, so each topic is written from its own part
// without sending the whole document again and again (cost).
// ============================================================

import { db } from './firebase-config.js?v=20261127a';
import { askClaude, textOf, findArrayLoose } from './ai.js?v=20261127a';
import { readDocument, readDocumentWithAI } from './doc-text.js?v=20261127a';
import { notesPromptFromText, notesPromptResearch, questionsPrompt, notesToText, QUESTION_TYPES, injectStyle as injectWizardStyle } from './topic-wizard.js?v=20261127a';
import { logEvent } from './log.js?v=20261127a';
import {
  doc, getDocs, updateDoc, addDoc, collection, serverTimestamp,
} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";

const esc = s => String(s ?? '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
const MAX_TOPICS = 15;
const MAX_LINES = 300;         // numbered lines sent to the AI (long documents are grouped)
const AT_ONCE = 3;             // topics built side by side
export const TOKENS_PER_TOPIC = 15000;   // rough: notes + 20 questions (for the free-try estimate)
const QTY_CHOICES = [10, 15, 20, 30];
const pointCount = kps => (kps || []).reduce((a, g) => a + (g && g.points ? g.points.length : 1), 0);
const asGroups = kps => !kps?.length ? [] : ('group' in (kps[0] || {}) ? kps : [{ group: 'Notes', points: kps }]);
const qText = q => q.question || q.sentence || q.instruction || '';
const tfFix = qs => { (qs || []).forEach(q => { if (q && q.type === 'tf' && typeof q.answer !== 'boolean') q.answer = String(q.answer).trim().toLowerCase() === 'true'; }); return qs; };
const isQuestion = q => q && QUESTION_TYPES.some(t => t.id === q.type);
const norm = s => String(s || '').toLowerCase().replace(/[^a-z0-9]+/g, ' ').trim();

/* ── Splitting the document (exported for testing) ───────── */
// Lines of the document, grouped so there are at most MAX_LINES
export function numberedLines(text, max = MAX_LINES) {
  const lines = String(text || '').split('\n').map(l => l.trim()).filter(Boolean);
  const per = Math.max(1, Math.ceil(lines.length / max));
  const out = [];
  for (let i = 0; i < lines.length; i += per) out.push(lines.slice(i, i + per).join('\n'));
  return out;
}
// "3-9, 14, 20–22" (1-based) → [2..8, 13, 19..21] (0-based), within n lines
export function parseLineList(spec, n) {
  const set = new Set();
  const parts = Array.isArray(spec) ? spec.map(String) : String(spec ?? '').split(/[,;]+/);
  for (const raw of parts) {
    const m = raw.trim().match(/^(\d+)\s*(?:[-–—]|to)\s*(\d+)$/i) || raw.trim().match(/^(\d+)$/);
    if (!m) continue;
    let a = +m[1], b = +(m[2] ?? m[1]);
    if (a > b) [a, b] = [b, a];
    for (let i = Math.max(1, a); i <= Math.min(n, b); i++) set.add(i - 1);
  }
  return [...set].sort((x, y) => x - y);
}
// The part of the document for one topic
export function excerptOf(lines, idx) { return idx.map(i => lines[i]).join('\n'); }
// An existing topic with this name (exact, then ignoring case and punctuation)
export function matchExisting(name, existing) {
  if (!name) return null;
  return existing.find(t => t.name === name) || existing.find(t => norm(t.name) === norm(name)) || null;
}

export function topicsPrompt(lines, existingNames, context) {
  return `You are an experienced UK teacher helping a parent turn ONE revision document into separate revision topics${context ? ` for ${context}` : ''}.

The document is below, split into numbered lines like [12].
${existingNames.length ? `The subject already has these topics: ${existingNames.map(n => `"${n}"`).join(', ')}.` : 'The subject has no topics yet.'}

Work out the separate topics the document covers, divided the way a teacher would divide the course (usually 2 to 10 topics; never more than ${MAX_TOPICS}). Name each topic about the SUBJECT (e.g. "Marriage and the family"), never about the document (not "Page 2" or "Table").
- If a topic is the same thing as one of the existing topics, set "existing" to that exact existing name, and use that name.
- For each topic, list EVERY line number with content for it, as ranges like "3-9, 14". A line can belong to more than one topic (e.g. a table row that covers two). Include a heading line with the lines under it.
- Leave out lines that are only titles, instructions to the student, page layout, or exam admin.
- If the whole document is really about one topic, return just that one.

Return ONLY a JSON array, no markdown, no preamble:
[{"name":"Marriage and the family","existing":"","lines":"3-9, 14","about":"What the religions teach about marriage, divorce and family"}]

Document:
${lines.map((l, i) => `[${i + 1}] ${l}`).join('\n')}`;
}

// No sheet: the topics for a subject from what the parent typed, or from the course itself
export function topicsFromSubjectPrompt(context, typed, existingNames) {
  const list = String(typed || '').trim();
  return `You are an experienced UK teacher helping a parent set up revision for ${context || 'a school subject'}.
${existingNames.length ? `The subject already has these topics: ${existingNames.map(n => `"${n}"`).join(', ')}. If a topic is the same thing as one of these, set "existing" to that exact name and use that name.\n` : ''}
${list ? `The parent typed what the student is revising (between the lines of dashes):
-----
${list.slice(0, 4000)}
-----
Turn this into a list of revision topics. Keep to what they typed: tidy the names (spelling, capitals), split a line that clearly holds two separate topics, and merge exact repeats. Don't add topics they didn't mention. Use any detail they gave (e.g. sub-points) in "about".`
  : `List the topics of this course the way the exam board's specification divides it (usually 4 to 12 topics; never more than ${MAX_TOPICS}). Use the board's own topic names where you know them. If no exam board or level is given, use the usual topics for that subject at that stage in UK schools.`}
Name each topic about the SUBJECT. In "about", list its main sub-topics in a few words, so notes can be written for it.

Return ONLY a JSON array, no markdown, no preamble:
[{"name":"Cell biology","existing":"","about":"Cell structure, microscopy, cell division, transport in cells"}]`;
}

async function askList(prompt, maxTokens, isItem) {
  for (let attempt = 1; ; attempt++) {
    const data = await askClaude('generation', prompt, maxTokens);
    const text = textOf(data);
    const list = findArrayLoose(text, isItem);
    if (list.length) return list;
    console.warn(`Topics from a sheet: no list in the reply (try ${attempt})`, text.slice(0, 3000));
    if (attempt >= 2) throw new Error('Nothing came back. Please try again.');
  }
}
// Running out of AI (allowance or free try) stops the rest; other errors only stop that topic
const isStopError = e => [401, 403, 429].includes(e?.status) || e?.code === 'ai_paused';

/* ── The dialog ──────────────────────────────────────────── */
// opts: { pack: {id, name}, subject: {id, name, examBoard, level}, mode, trialTopics (number, free try only), onDone, onOpenTopic }
// mode: 'sheet' (from a photo, file or pasted words) or 'ai' (no sheet: from the subject, or topics the parent types)
// onDone({ topics, notes, questions, pack, subject }) after building; onOpenTopic(topicId, pack, subject) from the results
// prepare(): optional, makes the pack and subject (and gives the pack) only when building starts,
//   so going back or closing first leaves nothing behind. Returns { pack: {id, name}, subject: {id, …} }.
//   Without an id, the subject has no topics yet to match.
// onBack(): optional, shows a Back button on the first screen (to the screen that opened this)
// onClose(): optional, after the dialog closes any way other than Back
export async function openSubjectBuilder({ pack, subject, mode = 'sheet', trialTopics = null, onDone = null, onOpenTopic = null, prepare = null, onBack = null, onClose = null }) {
  injectWizardStyle(); injectStyle();
  document.getElementById('sb')?.remove();
  let subjPath = pack.id && subject.id ? `content/${pack.id}/subjects/${subject.id}/topics` : null;
  const context = [subject.level, subject.examBoard, subject.name].filter(Boolean).join(' ');
  const st = { step: 1, text: '', note: '', kind: 'auto', files: 0, pics: false, busy: false, stopped: false,
    lines: [], plan: [], qty: 20, existing: [], results: [], done: false };
  // The subject's topics now (to match, and to add notes and questions to)
  const loadExisting = async () => {
    const list = [];
    if (subjPath) (await getDocs(collection(db, subjPath)).catch(() => null))?.forEach(d => list.push({ id: d.id, ...d.data() }));
    list.sort((a, b) => (a.order ?? 999) - (b.order ?? 999));
    st.existing = list;
  };
  await loadExisting();

  document.body.insertAdjacentHTML('beforeend', `
    <div class="tw-overlay sb-overlay" id="sb" role="dialog" aria-modal="true" aria-labelledby="sb-title">
      <div class="tw-box">
        <div class="tw-head">
          <div><div class="tw-kicker" id="sb-kicker">✨ ${mode === 'ai' ? 'Build with AI' : 'Topics from one sheet'}</div><h2 id="sb-title">${esc(subject.name)}</h2></div>
          <button class="tw-x" aria-label="Close">✕</button>
        </div>
        <ol class="tw-steps"><li data-s="1" id="sb-step1">${mode === 'ai' ? 'What to cover' : 'Your sheet'}</li><li data-s="2">The topics</li><li data-s="3">Notes and questions</li></ol>
        <div class="tw-body" id="sb-body"></div>
        <div class="tw-foot" id="sb-foot"></div>
      </div>
    </div>`);
  const box = document.getElementById('sb');
  const body = () => box.querySelector('#sb-body');
  const foot = () => box.querySelector('#sb-foot');
  const msg = (t, err = false) => { const m = box.querySelector('#sb-msg'); if (m) { m.textContent = t; m.className = 'tw-msg' + (err ? ' err' : ''); } };
  const finish = () => {
    box.remove();
    const made = st.results.filter(r => r.notes || r.questions);
    if (made.length) onDone && onDone({ topics: made.length, notes: made.reduce((a, r) => a + r.notes, 0), questions: made.reduce((a, r) => a + r.questions, 0), pack, subject });
    onClose && onClose();
  };
  const back = () => { box.remove(); onBack(); };
  // First screen's left button: Back (to whatever opened this) or Cancel
  const firstLeft = () => onBack ? `<button class="btn btn-secondary" data-go="back">← Back</button>` : `<button class="btn btn-secondary" data-go="close">Cancel</button>`;
  const wireFirstLeft = () => { foot().querySelector('[data-go="back"]')?.addEventListener('click', back); foot().querySelector('[data-go="close"]')?.addEventListener('click', finish); };
  box.querySelector('.tw-x').onclick = () => {
    if (st.step === 3 && !st.done) {
      if (!confirm('Stop making the rest? Topics already finished are kept.')) return;
      st.stopped = true;
    } else if (st.busy && !confirm('Stop and close?')) return;
    finish();
  };
  const busy = (on, label) => {
    st.busy = on;
    foot().querySelectorAll('button').forEach(b => { b.disabled = on; });
    if (on) body().insertAdjacentHTML('beforeend', `<div class="tw-busy" id="sb-busy"><div class="spinner" style="width:22px;height:22px;border-width:2px"></div><span>${esc(label)}</span></div>`);
    else box.querySelector('#sb-busy')?.remove();
  };
  const setBusyText = t => { const b = box.querySelector('#sb-busy span'); if (b) b.textContent = t; };
  function render() {
    box.querySelectorAll('.tw-steps li').forEach(li => { const s = +li.dataset.s; li.className = s === st.step ? 'on' : s < st.step ? 'done' : ''; });
    ({ 1: step1, 2: step2, 3: step3 })[st.step]();
  }

  /* Step 1: the sheet (or, with no sheet, what to cover) */
  // Switch between "from a sheet" and "no sheet: let AI build it" without closing
  function switchMode(to) {
    if (mode === 'sheet') st.text = (box.querySelector('#sb-text')?.value ?? st.text);
    else st.typed = (box.querySelector('#sb-typed')?.value ?? st.typed);
    mode = to; st.note = '';
    box.querySelector('#sb-kicker').textContent = `✨ ${mode === 'ai' ? 'Build with AI' : 'Topics from one sheet'}`;
    box.querySelector('#sb-step1').textContent = mode === 'ai' ? 'What to cover' : 'Your sheet';
    step1();
  }
  function step1() {
    if (mode === 'ai') return step1ai();
    body().innerHTML = `
      <h3 class="tw-h">Add the whole sheet</h3>
      <p class="tw-hint">A revision list, worksheet, knowledge organiser or specification that covers several topics. We'll split it into topics, and each topic gets notes and quiz questions from its own part of the sheet.</p>
      <div class="sb-switch sb-switch-top"><span>No sheet?</span> <button class="tw-link sb-switch-btn" data-switch="ai">✨ Let AI build ${esc(subject.name)} instead</button>
        <small>It suggests the topics from ${esc(context || subject.name)}, or ones you type.</small></div>
      <div class="tw-upload">
        <div class="tw-up-btns">
          <label class="tw-file"><input type="file" id="sb-photo" accept="image/*" capture="environment" multiple><span>📷 ${st.text ? 'Add another photo' : 'Take a photo'}</span></label>
          <label class="tw-file tw-file-2"><input type="file" id="sb-file" multiple accept=".pdf,.docx,.txt,.md,application/pdf,application/vnd.openxmlformats-officedocument.wordprocessingml.document,text/plain,image/png,image/jpeg,image/webp"><span>📄 ${st.text ? 'Add another file' : 'Choose a file'}</span></label>
        </div>
        <label class="tw-check"><input type="checkbox" id="sb-pics" ${st.pics ? 'checked' : ''}> It's a scan, or has diagrams or tables to read (slower; photos are always read this way)</label>
        <p class="tw-hint tw-up-hint">Several pages? Choose them all at once, or add them one at a time. Or paste the words into the box.</p>
        <textarea id="sb-text" class="tw-text" placeholder="The words from your sheet appear here, so you can check them. You can also paste them in.">${esc(st.text)}</textarea>
      </div>
      <div class="tw-kind"><span class="tw-label-s" style="width:auto">What kind of sheet is it?</span>
        ${[['auto', 'Not sure: AI works it out'], ['extract', 'Notes or a textbook: use what it says'], ['teach', 'A checklist or specification: write notes that teach each point']]
          .map(([v, t]) => `<label><input type="radio" name="sb-kind" value="${v}" ${st.kind === v ? 'checked' : ''}> ${t}</label>`).join('')}</div>
      <div class="tw-msg" id="sb-msg"></div>`;
    box.querySelector('[data-switch="ai"]').onclick = () => switchMode('ai');
    box.querySelector('#sb-pics').onchange = e => { st.pics = e.target.checked; };
    box.querySelector('#sb-file').onchange = e => readFiles([...e.target.files]);
    box.querySelector('#sb-photo').onchange = e => readFiles([...e.target.files]);
    box.querySelectorAll('[name="sb-kind"]').forEach(r => r.onchange = () => { st.kind = r.value; });
    box.querySelector('#sb-text').oninput = e => { st.text = e.target.value; };
    if (st.note) msg(st.note);
    foot().innerHTML = `${firstLeft()}
      <button class="btn btn-primary" data-go="next">Next: find the topics →</button>`;
    wireFirstLeft();
    foot().querySelector('[data-go="next"]').onclick = findTopics;
  }
  function step1ai() {
    const course = context || subject.name;
    body().innerHTML = `
      <h3 class="tw-h">What should ${esc(subject.name)} cover?</h3>
      <p class="tw-hint">No sheet needed. Type the topics they're revising (from a test list or the school website, say), or leave it blank to cover the whole ${esc(course)} course.</p>
      <label class="tw-label">Topics (optional, one per line)
        <textarea id="sb-typed" class="tw-text" style="min-height:140px" placeholder="One topic per line, e.g. copied from their test list">${esc(st.typed || '')}</textarea></label>
      ${!subject.level && !subject.examBoard ? `<p class="tw-hint" style="margin-top:8px">Tip: the level and exam board help the notes match their course. You can set them on the subject (the pencil on its card).</p>` : ''}
      <p class="tw-gen-note">The notes are written by AI from what it knows of ${esc(course)}, not from the school's own materials. Have a quick look at a topic or two. If you have the school's sheet, it's even better to use that.</p>
      <div class="sb-switch"><span>Got a sheet after all?</span> <button class="tw-link sb-switch-btn" data-switch="sheet">📷 Use a sheet instead</button></div>
      <div class="tw-msg" id="sb-msg"></div>`;
    box.querySelector('[data-switch="sheet"]').onclick = () => switchMode('sheet');
    box.querySelector('#sb-typed').oninput = e => { st.typed = e.target.value; };
    foot().innerHTML = `${firstLeft()}
      <button class="btn btn-primary" data-go="next">Next: suggest the topics →</button>`;
    wireFirstLeft();
    foot().querySelector('[data-go="next"]').onclick = findTopics;
  }
  async function readFiles(files) {
    files = (files || []).filter(Boolean);
    if (!files.length) return;
    st.text = (box.querySelector('#sb-text')?.value || st.text || '').trim();
    const notes = []; let err = '';
    for (let i = 0; i < files.length; i++) {
      const f = files[i], isImage = /^image\//.test(f.type);
      busy(true, `Reading ${isImage ? 'your photo' : 'your file'}${files.length > 1 ? ` (${i + 1} of ${files.length})` : ''}…`);
      try {
        let r;
        if (isImage || st.pics) r = await readDocumentWithAI(f, askClaude, setBusyText);
        else {
          try { r = await readDocument(f, setBusyText); }
          catch (e) {
            if (!/scan/.test(e.message)) throw e;
            setBusyText('This looks like a scan, so reading it with AI…');
            r = await readDocumentWithAI(f, askClaude, setBusyText);
          }
        }
        st.text = [st.text, r.text].filter(Boolean).join('\n\n');
        st.files++; notes.push(r.note);
      } catch (e) { err = `${f.name}: ${e.message}`; busy(false); break; }
      busy(false);
    }
    if (notes.length) st.note = notes.join(' ') + ' Check the words below, then find the topics.';
    step1();
    if (err) msg(err, true);
  }

  async function findTopics() {
    let prompt;
    if (mode === 'ai') {
      st.typed = (box.querySelector('#sb-typed')?.value ?? st.typed ?? '').trim();
      prompt = topicsFromSubjectPrompt(context || subject.name, st.typed, st.existing.map(t => t.name));
    } else {
      st.text = (box.querySelector('#sb-text')?.value || st.text).trim();
      if (st.text.length < 40) { msg(st.text ? 'There are only a few words there. Add the rest of the sheet, or paste more.' : 'Add your sheet first: take a photo, choose a file or paste the words. No sheet? Use "Let AI build it instead" below.', true); return; }
      st.lines = numberedLines(st.text);
      prompt = topicsPrompt(st.lines, st.existing.map(t => t.name), context);
    }
    busy(true, mode === 'ai' ? 'Working out the topics…' : 'Finding the topics on the sheet…');
    let list;
    try { list = await askList(prompt, 4000, x => x && typeof x.name === 'string'); }
    catch (e) { busy(false); msg(e.message, true); return; }
    busy(false);
    const seen = new Set();
    st.plan = list.slice(0, MAX_TOPICS).map(x => {
      const ex = matchExisting(x.existing, st.existing) || matchExisting(x.name, st.existing);
      const name = String(ex ? ex.name : x.name).trim().slice(0, 80);
      return { name, on: true, target: ex ? ex.id : 'new', about: String(x.about || '').slice(0, 200), idx: mode === 'ai' ? [] : parseLineList(x.lines, st.lines.length) };
    }).filter(t => t.name && !seen.has(norm(t.name)) && seen.add(norm(t.name)));
    if (!st.plan.length) { msg(mode === 'ai' ? 'No topics came back. Try typing the topics.' : 'No topics were found on that sheet. Try a clearer photo, or paste the words.', true); return; }
    logEvent('content.topics_from_sheet', { target: `${subject.name} (${pack.name})`, detail: `${st.plan.length} topics suggested${mode === 'ai' ? ' (no sheet)' : ''}` });
    st.step = 2; render();
  }

  /* Step 2: tick and name the topics */
  function step2() {
    const opts = t => `<option value="new" ${t.target === 'new' ? 'selected' : ''}>New topic</option>` +
      st.existing.map(x => `<option value="${esc(x.id)}" ${t.target === x.id ? 'selected' : ''}>${mode === 'ai' && x.notesSource === 'ai' ? `Rewrite “${esc(x.name)}”` : `Add to “${esc(x.name)}”`}</option>`).join('');
    const matched = st.plan.filter(t => t.target !== 'new').length;
    body().innerHTML = `
      <h3 class="tw-h">${mode === 'ai' ? (st.plan.length === 1 ? 'One topic' : `${st.plan.length} topics`) : st.plan.length === 1 ? 'We found one topic' : `We found ${st.plan.length} topics`}</h3>
      <p class="tw-hint">Untick any you don't want, and change a name if it isn't quite right.${matched ? ` ${matched === 1 ? 'One matches a topic' : `${matched} match topics`} you already have, so the new notes and questions are added there.` : ''}</p>
      <div class="sb-list" id="sb-list">${st.plan.map((t, i) => `
        <div class="sb-row${t.on ? '' : ' off'}" data-i="${i}">
          <input type="checkbox" class="sb-on" ${t.on ? 'checked' : ''} aria-label="Make this topic">
          <div class="sb-main">
            <input class="tw-input sb-name" value="${esc(t.name)}" maxlength="80" aria-label="Topic name">
            ${t.about ? `<small>${esc(t.about)}</small>` : ''}
          </div>
          <select class="sb-target" aria-label="Where it goes">${opts(t)}</select>
        </div>`).join('')}</div>
      <button class="tw-add" id="sb-addrow">＋ Add a topic we missed</button>
      <div class="tw-row" style="margin-top:14px"><span class="tw-label-s" style="width:auto;margin-right:6px">Questions per topic</span>
        ${QTY_CHOICES.map(q => `<button class="tw-chip${st.qty === q ? ' on' : ''}" data-qty="${q}">${q}</button>`).join('')}</div>
      <p class="tw-hint" id="sb-est"></p>
      <div class="tw-msg" id="sb-msg"></div>`;
    const list = box.querySelector('#sb-list');
    list.querySelectorAll('.sb-row').forEach(row => {
      const t = st.plan[+row.dataset.i];
      row.querySelector('.sb-on').onchange = e => { t.on = e.target.checked; row.classList.toggle('off', !t.on); est(); };
      row.querySelector('.sb-name').oninput = e => { t.name = e.target.value; };
      row.querySelector('.sb-target').onchange = e => {
        t.target = e.target.value;
        const ex = st.existing.find(x => x.id === t.target);
        if (ex) { t.name = ex.name; row.querySelector('.sb-name').value = ex.name; }
      };
    });
    box.querySelector('#sb-addrow').onclick = () => { readRows(); st.plan.push({ name: '', on: true, target: 'new', about: '', idx: [] }); step2(); box.querySelector('.sb-row:last-child .sb-name')?.focus(); };
    body().querySelectorAll('[data-qty]').forEach(b => b.onclick = () => { readRows(); st.qty = +b.dataset.qty; step2(); });
    const est = () => {
      const n = st.plan.filter(t => t.on).length;
      const mins = Math.max(1, Math.ceil(n / AT_ONCE) * 2);
      let s = n ? `${n} topic${n === 1 ? '' : 's'}, about ${n * st.qty} questions in all. Takes about ${mins} minute${mins === 1 ? '' : 's'}: keep this open while it works.` : 'Tick at least one topic.';
      if (trialTopics != null && n > trialTopics) s += ` Your free try covers about ${Math.max(1, trialTopics)} of these; the rest need Plus. Fewer questions per topic stretches it further.`;
      box.querySelector('#sb-est').textContent = s;
      const go = foot().querySelector('[data-go="build"]'); if (go) { go.disabled = !n; go.textContent = `✨ Make ${n} topic${n === 1 ? '' : 's'}`; }
    };
    foot().innerHTML = `<button class="btn btn-secondary" data-go="back">← ${mode === 'ai' ? 'Back' : 'Sheet'}</button>
      <button class="btn btn-primary" data-go="build">✨ Make topics</button>`;
    foot().querySelector('[data-go="back"]').onclick = () => { readRows(); st.step = 1; render(); };
    foot().querySelector('[data-go="build"]').onclick = build;
    est();
  }
  function readRows() {
    box.querySelectorAll('#sb-list .sb-row').forEach(row => {
      const t = st.plan[+row.dataset.i]; if (!t) return;
      t.name = row.querySelector('.sb-name').value.trim();
      t.on = row.querySelector('.sb-on').checked;
      t.target = row.querySelector('.sb-target').value;
    });
  }

  /* Step 3: make each topic */
  async function build() {
    readRows();
    const chosen = st.plan.filter(t => t.on);
    const unnamed = chosen.find(t => !t.name);
    if (unnamed) { msg('Give every ticked topic a name.', true); return; }
    // Make the pack and subject now (not before), if they don't exist yet
    if (prepare && !st.prepared) {
      busy(true, 'Setting it up…');
      try {
        const t = await prepare();
        Object.assign(pack, t.pack); Object.assign(subject, t.subject);
        subjPath = `content/${pack.id}/subjects/${subject.id}/topics`;
        st.prepared = true;
        await loadExisting();
      } catch (e) { busy(false); msg(e.message, true); return; }
      busy(false);
    }
    // A "new" topic with the name of one already there goes into that one
    chosen.forEach(t => { if (t.target === 'new') { const ex = matchExisting(t.name, st.existing); if (ex) t.target = ex.id; } });
    // Rows going into the same topic (same existing topic, or the same new name) become one
    st.results = [];
    for (const t of chosen) {
      const key = t.target === 'new' ? 'new:' + norm(t.name) : t.target;
      const same = st.results.find(r => r.key === key);
      if (same) { same.idx = [...new Set([...same.idx, ...t.idx])].sort((a, b) => a - b); if (t.about) same.about = [same.about, t.about].filter(Boolean).join('; '); continue; }
      st.results.push({ ...t, key, state: 'waiting', notes: 0, questions: 0, error: '', topicId: t.target === 'new' ? null : t.target });
    }
    st.step = 3; render();
    st.order = st.existing.length;
    await runAll(st.results);
  }
  // Make these topics, a few at a time (also "Make the rest" after a stop)
  async function runAll(list) {
    st.done = false; st.stopped = false; st.stopReason = '';
    list.forEach(r => { r.state = 'waiting'; r.error = ''; });
    step3();
    let next = 0;
    const worker = async () => {
      while (!st.stopped && next < list.length) {
        const r = list[next++];
        await makeOne(r, () => st.order++);
        step3();
      }
    };
    await Promise.all(Array.from({ length: Math.min(AT_ONCE, list.length) }, worker));
    st.results.filter(r => r.state === 'waiting').forEach(r => { r.state = 'skipped'; });
    st.done = true;
    const made = st.results.filter(r => r.notes || r.questions);
    logEvent('content.topics_from_sheet', { target: `${subject.name} (${pack.name})`, detail: `Made ${made.length} topics: ${made.reduce((a, r) => a + r.notes, 0)} notes, ${made.reduce((a, r) => a + r.questions, 0)} questions` });
    if (box.isConnected) step3();
  }
  async function makeOne(r, nextOrder) {
    const label = `${subject.name} › ${r.name}`;
    const topicCtx = `${context}${context ? ': ' : ''}${r.name}`;
    try {
      // Its own part of the sheet; if the AI gave no lines, the whole sheet with a focus
      const own = r.idx.length ? excerptOf(st.lines, r.idx) : '';
      const source = own.replace(/\s/g, '').length >= 40 ? own : st.text;
      const focus = `Only write notes about the topic "${r.name}"${r.about ? ` (${r.about})` : ''}. ${source === st.text ? 'The document covers other topics too: ignore everything that isn\'t about this one.' : 'If a line is clearly about a different topic, leave it out.'}\n\n`;
      // Notes already saved on an earlier go (stopped before its questions): just make the questions
      let notes = r.savedNotes;
      if (!notes) {
      r.state = 'notes'; step3();
      notes = asGroups(mode === 'ai'
        ? await askList(notesPromptResearch(`${topicCtx}${r.about ? `. Cover: ${r.about}` : ''}`), 16000)
        : await askList(focus + notesPromptFromText(source, st.kind, topicCtx), st.kind === 'extract' ? 8000 : 16000));
      if (!pointCount(notes)) throw new Error('No notes came back');
      // Save the notes (a new topic is made now, so unticked ones never exist)
      let existing = st.existing.find(x => x.id === r.topicId);
      if (!r.topicId) {
        const ref = await addDoc(collection(db, subjPath), { name: r.name, keyPoints: notes, notesSource: mode === 'ai' ? 'ai' : 'material', videos: [], order: nextOrder(), createdAt: serverTimestamp() });
        r.topicId = ref.id;
        existing = { id: ref.id, name: r.name, keyPoints: notes };
        st.existing.push(existing);
        logEvent('content.topic', { target: label, detail: 'Created (topics from a sheet)' });
      } else {
        // Build with AI over a topic whose notes were also written by AI (or that has none): replace, so nothing
        // is repeated. Anything else is added to (a sheet can bring new points to a topic).
        const from = mode === 'ai' ? 'ai' : 'material';
        const had = asGroups(existing?.keyPoints || []);
        const replace = !had.length || (from === 'ai' && existing?.notesSource === 'ai');
        const keyPoints = replace ? notes : [...had, ...notes];
        const notesSource = replace ? from : (existing?.notesSource === from ? from : 'mixed');
        await updateDoc(doc(db, `${subjPath}/${r.topicId}`), { keyPoints, notesSource });
        if (existing) { existing.keyPoints = keyPoints; existing.notesSource = notesSource; }
        r.replaced = replace && had.length > 0;
      }
      r.notes = pointCount(notes);
      r.savedNotes = notes;
      logEvent('content.keypoints', { target: label, detail: `${mode === 'ai' ? 'Build with AI' : 'Topics from a sheet'}: ${r.notes} notes added` });
      }
      if (st.stopped) { r.state = 'part'; return; }

      // Questions from the notes, not repeating any already on the topic
      r.state = 'questions'; step3();
      const saved = [];
      (await getDocs(collection(db, `${subjPath}/${r.topicId}/questions`)).catch(() => null))?.forEach(d => { const t = qText(d.data()); if (t) saved.push(t); });
      const avoid = saved.length ? `\n\nQuestions already written. Do NOT repeat these or test the same facts again; cover different points:\n${saved.slice(-200).map(t => '- ' + t).join('\n')}` : '';
      const qs = tfFix(await askList(questionsPrompt(notesToText(notes) + avoid, st.qty, QUESTION_TYPES.map(t => t.id), topicCtx), 16000, isQuestion))
        .filter(isQuestion).slice(0, st.qty);
      const col = collection(db, `${subjPath}/${r.topicId}/questions`);
      await Promise.all(qs.map(q => addDoc(col, { ...q, createdAt: serverTimestamp(), source: 'ai' })));
      r.questions = qs.length;
      logEvent('content.questions', { target: label, detail: `Topics from a sheet: ${qs.length} questions added` });
      r.state = 'done';
    } catch (e) {
      r.state = 'failed';
      r.error = e.message;
      if (isStopError(e)) {
        st.stopped = true;
        st.stopReason = e.message;
      }
    }
  }
  function step3() {
    if (!box.isConnected) return;
    const icon = { waiting: '○', notes: '…', questions: '…', done: '✓', failed: '!', skipped: '–', part: '½' };
    // The reason everything stopped is shown once at the top, not on every row
    const why = r => st.stopReason && r.error === st.stopReason ? 'AI stopped (see above)' : r.error;
    const what = r => r.state === 'waiting' ? (st.stopped ? 'Not made' : 'Waiting')
      : r.state === 'notes' ? 'Writing the notes…'
      : r.state === 'questions' ? `${r.notes} notes ✓ · writing ${st.qty} questions…`
      : r.state === 'done' ? `${r.notes} notes${r.replaced ? ' (replaced the earlier AI notes)' : ''} · ${r.questions} questions`
      : r.state === 'skipped' ? 'Not made yet'
      : r.state === 'part' ? `${r.notes} notes ✓ · questions not made yet`
      : (r.notes ? `${r.notes} notes ✓ · questions not made: ` : 'Not made: ') + why(r);
    const rest = st.results.filter(r => r.state !== 'done');
    const done = st.results.filter(r => r.state === 'done');
    const working = !st.done;
    body().innerHTML = `
      <h3 class="tw-h">${working ? 'Making your topics' : done.length ? `${done.length} topic${done.length === 1 ? '' : 's'} ready` : 'Nothing was made'}</h3>
      <p class="tw-hint">${working ? 'Each topic is saved as soon as it\'s ready. Keep this open until they\'re all done.'
        : done.length ? 'Students can now learn from the notes and quiz on the questions. Open a topic to check it or change anything.' : ''}</p>
      ${st.stopReason ? `<p class="tw-gen-note">${esc(st.stopReason)}${/free try|Plus/i.test(st.stopReason) ? ' <a href="plus.html">See Plus</a>' : ''}${!working && rest.length ? ` The topics that finished are saved. When it's sorted, tap <b>Make the rest</b>.` : ''}</p>` : ''}
      <div class="sb-results">${st.results.map(r => `
        <div class="sb-res sb-${r.state}">
          <span class="sb-ic">${r.state === 'notes' || r.state === 'questions' ? '<span class="spinner" style="width:14px;height:14px;border-width:2px;display:inline-block"></span>' : icon[r.state]}</span>
          <div class="sb-main"><strong>${esc(r.name)}</strong><small>${esc(what(r))}</small></div>
          ${!working && r.topicId && (r.notes || r.questions) && onOpenTopic ? `<button class="tw-link" data-open="${esc(r.topicId)}">Open</button>` : ''}
        </div>`).join('')}</div>`;
    body().querySelectorAll('[data-open]').forEach(b => b.onclick = () => { const id = b.dataset.open; finish(); onOpenTopic(id, pack, subject); });
    foot().innerHTML = working
      ? `<button class="btn btn-secondary" data-go="stop">Stop after these</button>`
      : `${rest.length ? `<button class="btn btn-secondary" data-go="rest">✨ Make the rest (${rest.length})</button>` : ''}<button class="btn btn-primary" data-go="done" style="margin:0 0 0 auto">Done</button>`;
    foot().querySelector('[data-go="stop"]')?.addEventListener('click', () => { st.stopped = true; step3(); });
    foot().querySelector('[data-go="rest"]')?.addEventListener('click', () => runAll(st.results.filter(r => r.state !== 'done')));
    foot().querySelector('[data-go="done"]')?.addEventListener('click', finish);
  }

  render();
}

function injectStyle() {
  if (document.getElementById('sb-style')) return;
  document.head.insertAdjacentHTML('beforeend', `<style id="sb-style">
  .sb-switch { margin-top: 14px; padding: 10px 14px; border-radius: 12px; background: var(--color-primary-glow); font-size: 0.9rem; display: flex; flex-wrap: wrap; align-items: center; gap: 4px 6px; }
  .sb-switch-top { margin: 0 0 14px; }
  .sb-switch > span { font-family: var(--font-ui); font-weight: 700; }
  .sb-switch-btn { padding: 4px 2px !important; color: var(--color-primary) !important; font-weight: 700 !important; font-size: 0.9rem !important; }
  .sb-switch small { flex-basis: 100%; color: var(--color-text-muted); font-size: 0.8rem; }
  .sb-list { display: flex; flex-direction: column; gap: 8px; margin-bottom: 8px; }
  .sb-row { display: grid; grid-template-columns: auto 1fr minmax(150px, 220px); gap: 10px; align-items: start; border: 1px solid var(--color-border); border-radius: 12px; padding: 10px 12px; }
  .sb-row.off { opacity: 0.55; }
  .sb-row input[type="checkbox"] { width: 18px; height: 18px; margin-top: 10px; }
  .sb-main { display: flex; flex-direction: column; gap: 4px; min-width: 0; }
  .sb-main small { color: var(--color-text-muted); font-size: 0.8rem; line-height: 1.35; }
  .sb-name { padding: 8px 10px; font-weight: 600; }
  .sb-target { padding: 8px; border-radius: 8px; font-size: 0.85rem; }
  .sb-results { display: flex; flex-direction: column; gap: 6px; }
  .sb-res { display: flex; gap: 10px; align-items: center; border: 1px solid var(--color-border); border-radius: 10px; padding: 8px 12px; }
  .sb-res .sb-main { flex: 1; }
  .sb-res .sb-main strong { font-family: var(--font-ui); font-size: 0.92rem; }
  .sb-ic { width: 18px; text-align: center; font-weight: 800; color: var(--color-text-muted); }
  .sb-done .sb-ic { color: var(--color-success); }
  .sb-part .sb-ic { color: var(--color-warning, #c98a00); }
  .sb-failed .sb-ic, .sb-failed small { color: var(--color-danger); }
  @media (max-width: 560px) { .sb-row { grid-template-columns: auto 1fr; } .sb-target { grid-column: 2; } }
  </style>`);
}
