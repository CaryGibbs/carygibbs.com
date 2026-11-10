// ============================================================
// LOBE LIMPET: "Create with AI" for one topic (Plus)
// A three-step guide that replaces juggling tabs:
//   1. Where are the notes coming from? (upload a file, paste text,
//      let AI write them, or use the notes already there)
//   2. Check the notes (edit, then they're saved)
//   3. Make questions (how many, which kinds, review, save)
// Also holds the AI instructions (prompts) the builder uses, so the
// wizard and the older screens write notes and questions the same way.
// ============================================================

import { db } from './firebase-config.js?v=20261110k';
import { askClaude, textOf, parseJsonLoose } from './ai.js?v=20261110k';
import { readDocument, readDocumentWithAI } from './doc-text.js?v=20261110k';
import { logEvent } from './log.js?v=20261110k';
import {
  doc, getDoc, getDocs, updateDoc, addDoc, collection, serverTimestamp,
} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";

const esc = s => String(s ?? '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

/* ── AI instructions ─────────────────────────────────────── */
// kind: 'auto' (AI decides), 'extract' (notes/textbook: use what it says),
//       'teach' (checklist/spec/objectives: write what each point means)
// context: e.g. "GCSE AQA Chemistry: Atomic structure" (helps the level)
const NOTES_JSON = `Return ONLY a JSON array of groups, no markdown, no backticks, no preamble. Use between 3 and 12 groups, with no more than 12 points in a group. Every group MUST have a clear descriptive name about the SUBJECT (e.g. "Atoms and Elements", "Balancing Equations"), never about the document (not "Revision Checklist Format" or "Row 3"). Keep each explanation under 30 words.
[{"group":"Grid References","points":[{"term":"4-figure grid reference","explanation":"Identifies a 1km grid square using 4 digits: 2 for easting, 2 for northing"},{"term":"Easting","explanation":"The horizontal value, read first"}]},{"group":"Scale & Distance","points":[{"term":"Map scale","explanation":"The ratio between map distance and real-world distance"}]}]`;
// The level to write for, read from the context ("A level AQA Economics: …").
// Defaults to GCSE, as before.
export function levelOf(context = '') {
  const c = String(context);
  if (/\bAS[ -][Ll]evel\b/.test(c)) return 'AS level';
  if (/\bA[ -][Ll]evel\b/.test(c)) return 'A level';
  return 'GCSE';
}
const IGNORE_LAYOUT = `Ignore everything about how the document is laid out or used, and never make notes about it: tables and columns, row numbers, tick boxes, confidence or traffic-light columns, smiley faces, page headers and footers, logos, instructions to the student (e.g. "tick when revised"), and messages like "Good luck".`;
export function notesPromptFromText(text, kind = 'auto', context = '') {
  const lvl = levelOf(context);
  const teach = `For every item a student must know or be able to do, write the actual knowledge they need, as revision notes: definitions, facts, processes, rules, formulas, worked examples, equations and named examples, at the level the document is for (${lvl} unless it says otherwise). Turn "be able to state / describe / explain X" into what X actually is. Use the document's sections or headings as the groups. Be accurate and only include what is on the specification for that item; if you're not sure of a detail, keep it general.`;
  const extract = `Extract all key points from the content and organise them into logical sub-topic groups. Do not add anything not in the content, and do not omit anything. Cover every concept, definition, process, fact, example, and term mentioned. Where the content describes a diagram, graph or table of SUBJECT information, turn what it shows into key points too.`;
  const how = kind === 'teach' ? teach
    : kind === 'extract' ? extract
    : `First decide what kind of document this is.
- If it EXPLAINS the subject (revision notes, a textbook page, a handout, a teacher's slides): ${extract}
- If it mainly LISTS what to learn without explaining it (a revision checklist, specification, list of learning objectives or "I can…" statements): ${teach}
- If it's a mix, do both: use the explanations given, and write the knowledge for any point that is only listed.`;
  return `You are an expert UK teacher writing revision notes for a student.${context ? `
Where this will be saved: ${context} (if the document is clearly about something else, follow the document)` : ''}

${how}

${IGNORE_LAYOUT}

${NOTES_JSON}

Content:
${String(text).substring(0, 80000)}`;
}

export function notesPromptResearch(topic) {
  const lvl = levelOf(topic);
  return `You are an expert ${lvl} teacher. Write comprehensive key points for the following ${lvl} topic, organised into named sub-topic groups. Include every concept, definition, process, formula, example, case study, person, date, and piece of terminology a student needs for their exam.

IMPORTANT: You MUST return between 3 and 10 groups, with no more than 12 points in a group. Every group MUST have a clear descriptive name (e.g. "Grid References", "Scale & Distance", "Contour Lines"). Do NOT use an empty string as a group name. Keep each explanation under 30 words.
If the topic below lists several sub-topics or bullet points, use them as the groups.

Topic: ${topic}

Return ONLY a JSON array of groups, no markdown, no backticks, no preamble:
[{"group":"Grid References","points":[{"term":"4-figure grid reference","explanation":"Identifies a 1km grid square using 4 digits"},{"term":"Easting","explanation":"The horizontal value, read first"}]},{"group":"Scale & Distance","points":[{"term":"Map scale","explanation":"The ratio between map and real-world distance"}]}]`;
}

export const QUESTION_TYPES = [
  { id: 'mcq',   label: 'Multiple choice', schema: '{"type":"mcq","question":"...","options":[{"text":"...","correct":false},{"text":"...","correct":true},{"text":"...","correct":false},{"text":"...","correct":false}],"explanation":"..."}' },
  { id: 'tf',    label: 'True or false',   schema: '{"type":"tf","question":"...","answer":true,"explanation":"..."} or {"type":"tf","question":"...","answer":false,"explanation":"Explain what is actually correct"}' },
  { id: 'fill',  label: 'Fill the gap',    schema: '{"type":"fill","sentence":"The _____ is ...","answer":"...","alternatives":[]}' },
  { id: 'match', label: 'Match the pairs', schema: '{"type":"match","instruction":"Match each term to its definition","pairs":[{"left":"...","right":"..."},{"left":"...","right":"..."},{"left":"...","right":"..."},{"left":"...","right":"..."}]}' },
  { id: 'short', label: 'Written answer',  schema: '{"type":"short","question":"...","markScheme":"Key points: 1) ... 2) ..."}' },
];

// context: e.g. "A level AQA Economics: Micro 1" sets the level and subject
export function questionsPrompt(content, qty, types = QUESTION_TYPES.map(t => t.id), context = '') {
  const schemas = QUESTION_TYPES.filter(t => types.includes(t.id)).map(t => t.schema).join('\n');
  const lvl = levelOf(context);
  const higher = /A level|AS level/.test(lvl) ? ` Pitch questions at ${lvl} standard, testing understanding and application, not just recall.` : '';
  return `You are a ${lvl} revision question writer${context ? ` for ${context}` : ''}.${higher} Generate up to ${qty} high-quality questions based on the revision content below. If the content does not support ${qty} distinct, non-repetitive questions, generate fewer — quality over quantity. Spread questions evenly across ALL the content, covering early and late sections equally. Never repeat the same fact in two different questions.
Use these types in roughly equal proportions from: ${types.join(', ')}.

For MCQ questions: make all options similar in length (avoid answer-length giveaways). 4 options per MCQ.
For True/False: make roughly HALF the answers true and HALF false (e.g. 5 of 10), in a random order, not alternating. Build each false statement from a real fact with one key detail changed (a number, term, place, cause or direction) so it is a plausible misconception, not obviously silly. Don't give away the answer through wording: avoid putting words like "always", "never" or "only" mostly in the false ones, and keep true and false statements similar in length.
For Fill-in-the-blank: use _____ (five underscores) for the gap.
For Match pairs: include exactly 4 pairs, and make all 4 right-hand items different from each other (never two the same, e.g. two "Chemical change"), so each left item has only one possible match.

Return ONLY a JSON array with no markdown, no preamble, no backticks. Each element must follow one of these schemas:
${schemas}

Revision content:
${content}`;
}

// Notes (grouped or flat) as plain text for the question writer
export function notesToText(kps = []) {
  if (!kps.length) return '';
  if (kps[0] && 'group' in kps[0]) return kps.map(g => `## ${g.group}\n` + (g.points || []).map(p => `${p.term}: ${p.explanation}`).join('\n')).join('\n\n');
  return kps.map(p => `${p.term}: ${p.explanation}`).join('\n');
}
const MAX_QUESTIONS = 150;   // per go
const BATCH = 30;            // questions per AI request
const notesWord = n => `${n} note${n === 1 ? '' : 's'}`;
const pointCount = kps => (kps || []).reduce((a, g) => a + (g && g.points ? g.points.length : 1), 0);
const asGroups = kps => !kps?.length ? [] : ('group' in (kps[0] || {}) ? kps : [{ group: 'Notes', points: kps }]);
const tfFix = qs => { (qs || []).forEach(q => { if (q && q.type === 'tf' && typeof q.answer !== 'boolean') q.answer = String(q.answer).trim().toLowerCase() === 'true'; }); return qs; };

async function ask(prompt, maxTokens) {
  const data = await askClaude('generation', prompt, maxTokens);
  const parsed = parseJsonLoose(textOf(data));
  if (!Array.isArray(parsed) || !parsed.length) throw new Error('Nothing came back. Please try again.');
  return parsed;
}

/* ── The wizard ──────────────────────────────────────────── */
// opts: { topic: {id, name}, topicPath, subject: {name, examBoard, level}, onDone }
export async function openTopicWizard({ topic, topicPath, subject = {}, onDone = null }) {
  injectStyle();
  document.getElementById('tw')?.remove();
  const snap = await getDoc(doc(db, topicPath)).catch(() => null);
  const st = {
    step: 1, source: null, text: '', note: '', kind: 'auto',
    current: asGroups(snap?.data()?.keyPoints || []),
    notes: [], merge: 'add', questions: [], busy: false,
    qty: 20, qtyChosen: false, types: QUESTION_TYPES.map(t => t.id),
    aiTopic: [subject.level, subject.examBoard, subject.name].filter(Boolean).join(' ') + (subject.name ? ': ' : '') + (topic.name || ''),
  };
  document.body.insertAdjacentHTML('beforeend', `
    <div class="tw-overlay" id="tw" role="dialog" aria-modal="true" aria-labelledby="tw-title">
      <div class="tw-box">
        <div class="tw-head">
          <div><div class="tw-kicker">✨ Create with AI</div><h2 id="tw-title">${esc(topic.name)}</h2></div>
          <button class="tw-x" aria-label="Close">✕</button>
        </div>
        <ol class="tw-steps"><li data-s="1">Content</li><li data-s="2">Notes</li><li data-s="3">Questions</li></ol>
        <div class="tw-body" id="tw-body"></div>
        <div class="tw-foot" id="tw-foot"></div>
      </div>
    </div>`);
  const box = document.getElementById('tw');
  const close = () => { box.remove(); };
  box.querySelector('.tw-x').onclick = () => { if (!st.busy || confirm('Stop and close? Anything not saved yet will be lost.')) close(); };
  const body = () => document.getElementById('tw-body');
  const foot = () => document.getElementById('tw-foot');
  const msg = (t, err = false) => { const m = document.getElementById('tw-msg'); if (m) { m.textContent = t; m.className = 'tw-msg' + (err ? ' err' : ''); } };
  const busy = (on, label) => {
    st.busy = on;
    foot().querySelectorAll('button').forEach(b => { b.disabled = on; });
    if (on) body().insertAdjacentHTML('beforeend', `<div class="tw-busy" id="tw-busy"><div class="spinner" style="width:22px;height:22px;border-width:2px"></div><span>${esc(label)}</span></div>`);
    else document.getElementById('tw-busy')?.remove();
  };
  const setBusyText = t => { const b = document.querySelector('#tw-busy span'); if (b) b.textContent = t; };

  function render() {
    box.querySelectorAll('.tw-steps li').forEach(li => {
      const s = +li.dataset.s;
      li.className = s === st.step ? 'on' : s < st.step ? 'done' : '';
    });
    ({ 1: step1, 2: step2, 3: step3 })[st.step]();
  }

  /* Step 1: where's the content? */
  function step1() {
    const have = pointCount(st.current);
    const choices = [
      ['upload', '📄', 'Upload a file', 'A PDF, Word document or photo of notes'],
      ['paste', '📋', 'Paste text', 'Copy in your own notes or a textbook passage'],
      ['ai', '✨', 'Let AI write them', 'Just from the topic name'],
      ...(have ? [['existing', '🗒️', 'Use my current notes', `Skip to making questions from the ${notesWord(have)} already here`]] : []),
    ];
    body().innerHTML = `
      <h3 class="tw-h">Where are the notes coming from?</h3>
      <div class="tw-choices">${choices.map(([id, icon, t, d]) => `
        <button class="tw-choice${st.source === id ? ' on' : ''}" data-src="${id}"><span class="tw-ic">${icon}</span><strong>${t}</strong><small>${d}</small></button>`).join('')}
      </div>
      <div id="tw-src"></div>
      <div class="tw-msg" id="tw-msg"></div>`;
    body().querySelectorAll('[data-src]').forEach(b => b.onclick = () => { st.source = b.dataset.src; step1(); });
    const src = document.getElementById('tw-src');
    if (st.source === 'upload') {
      src.innerHTML = `
        <label class="tw-file"><input type="file" id="tw-file" accept=".pdf,.docx,.txt,.md,application/pdf,application/vnd.openxmlformats-officedocument.wordprocessingml.document,text/plain,image/png,image/jpeg,image/webp"><span>Choose a file</span></label>
        <label class="tw-check"><input type="checkbox" id="tw-pics"> Also read pictures and diagrams (for scans, photos and diagrams; slower)</label>
        <textarea id="tw-text" class="tw-text" placeholder="The words from your file appear here, so you can check them first." ${st.text ? '' : 'hidden'}>${esc(st.text)}</textarea>`;
      document.getElementById('tw-file').onchange = e => readFile(e.target.files[0]);
    } else if (st.source === 'paste') {
      src.innerHTML = `<textarea id="tw-text" class="tw-text" placeholder="Paste your notes, a textbook passage or anything else to learn…">${esc(st.text)}</textarea>`;
    } else if (st.source === 'ai') {
      src.innerHTML = `<label class="tw-label">What should the notes cover?<input id="tw-topic" class="tw-input" value="${esc(st.aiTopic)}"></label>
        <p class="tw-hint">Be specific: the exam board and level help. You can list the sub-topics too, separated by commas.</p>`;
    }
    if (st.source === 'upload' || st.source === 'paste') {
      src.insertAdjacentHTML('beforeend', `<div class="tw-kind"><span class="tw-label-s">What is it?</span>
        ${[['auto', 'Let AI decide'], ['extract', 'Notes or a textbook: use what it says'], ['teach', 'A checklist or specification: write notes that teach each point']]
          .map(([v, t]) => `<label><input type="radio" name="tw-kind" value="${v}" ${st.kind === v ? 'checked' : ''}> ${t}</label>`).join('')}</div>`);
      src.querySelectorAll('[name="tw-kind"]').forEach(r => r.onchange = () => { st.kind = r.value; });
    }
    if (st.note) msg(st.note);
    foot().innerHTML = `<button class="btn btn-secondary" data-go="close">Cancel</button>
      <button class="btn btn-primary" data-go="next" ${st.source ? '' : 'disabled'}>${st.source === 'existing' ? 'Next: make questions' : 'Next: make notes'} →</button>`;
    foot().querySelector('[data-go="close"]').onclick = close;
    foot().querySelector('[data-go="next"]').onclick = makeNotes;
  }

  async function readFile(file) {
    if (!file) return;
    const isImage = /^image\//.test(file.type);
    const pics = isImage || document.getElementById('tw-pics')?.checked;
    busy(true, 'Reading your file…');
    try {
      let r;
      if (pics) r = await readDocumentWithAI(file, askClaude, setBusyText);
      else {
        try { r = await readDocument(file, setBusyText); }
        catch (e) {
          // A scan: read it with AI instead
          if (!/scan/.test(e.message)) throw e;
          setBusyText('This looks like a scan, so reading it with AI…');
          r = await readDocumentWithAI(file, askClaude, setBusyText);
        }
      }
      st.text = r.text; st.note = r.note + ' Check it below, then continue.';
    } catch (e) { st.note = ''; busy(false); msg(e.message, true); return; }
    busy(false);
    step1();
  }

  async function makeNotes() {
    if (st.source === 'existing') { st.step = 3; render(); return; }
    let prompt;
    if (st.source === 'ai') {
      st.aiTopic = document.getElementById('tw-topic').value.trim();
      if (!st.aiTopic) { msg('Say what the notes should cover.', true); return; }
      prompt = notesPromptResearch(st.aiTopic);
    } else {
      st.text = (document.getElementById('tw-text')?.value || '').trim();
      if (st.text.length < 40) { msg(st.source === 'upload' ? 'Choose a file first.' : 'Paste some notes first.', true); return; }
      prompt = notesPromptFromText(st.text, st.kind, st.aiTopic);
    }
    busy(true, 'Writing the notes… (up to a minute)');
    try {
      // Teaching from a list writes much more than it reads, so allow a long reply
      st.notes = asGroups(await ask(prompt, st.source === 'ai' || st.kind !== 'extract' || st.text.length > 12000 ? 16000 : 8000));
      st.step = 2;
    } catch (e) { busy(false); msg(e.message, true); return; }
    busy(false);
    render();
  }

  /* Step 2: check the notes */
  function step2() {
    const have = pointCount(st.current);
    body().innerHTML = `
      <h3 class="tw-h">Check the notes</h3>
      <p class="tw-hint">${notesWord(pointCount(st.notes))} in ${st.notes.length} section${st.notes.length === 1 ? '' : 's'}. Change anything that isn't right, or remove what you don't need. They're saved when you continue.</p>
      ${have ? `<div class="tw-merge">
        <label><input type="radio" name="tw-merge" value="add" ${st.merge === 'add' ? 'checked' : ''}> Add these to the ${notesWord(have)} already here</label>
        <label><input type="radio" name="tw-merge" value="replace" ${st.merge === 'replace' ? 'checked' : ''}> Replace the notes already here</label></div>` : ''}
      <div class="tw-notes" id="tw-notes">${st.notes.map(groupHtml).join('')}</div>
      <button class="tw-add" data-add="group">＋ Add a section</button>
      <div class="tw-msg" id="tw-msg"></div>`;
    body().querySelectorAll('[name="tw-merge"]').forEach(r => r.onchange = () => { st.merge = r.value; });
    body().onclick = e => {
      const t = e.target.closest('[data-add],[data-del]');
      if (!t) return;
      if (t.dataset.add === 'group') { document.getElementById('tw-notes').insertAdjacentHTML('beforeend', groupHtml({ group: '', points: [{ term: '', explanation: '' }] })); }
      if (t.dataset.add === 'point') t.previousElementSibling.insertAdjacentHTML('beforeend', pointHtml({ term: '', explanation: '' }));
      if (t.dataset.del === 'point') t.closest('.tw-pt').remove();
      if (t.dataset.del === 'group') t.closest('.tw-grp').remove();
    };
    foot().innerHTML = `<button class="btn btn-secondary" data-go="back">← Back</button>
      <span class="tw-spacer"></span>
      <button class="btn btn-secondary" data-go="finish">Save notes and finish</button>
      <button class="btn btn-primary" data-go="next">Save notes, make questions →</button>`;
    foot().querySelector('[data-go="back"]').onclick = () => { st.notes = readNotes(); st.step = 1; render(); };
    foot().querySelector('[data-go="finish"]').onclick = () => saveNotes(true);
    foot().querySelector('[data-go="next"]').onclick = () => saveNotes(false);
  }
  const pointHtml = p => `<div class="tw-pt"><input class="tw-term" placeholder="Term or heading" value="${esc(p.term)}"><input class="tw-exp" placeholder="What to remember" value="${esc(p.explanation)}"><button class="tw-del" data-del="point" aria-label="Remove note">✕</button></div>`;
  const groupHtml = g => `<div class="tw-grp"><div class="tw-grp-head"><input class="tw-gname" placeholder="Section name" value="${esc(g.group)}"><button class="tw-del" data-del="group" aria-label="Remove section">Remove section</button></div>
    <div class="tw-pts">${(g.points || []).map(pointHtml).join('')}</div><button class="tw-add" data-add="point">＋ Add a note</button></div>`;
  function readNotes() {
    return [...document.querySelectorAll('#tw-notes .tw-grp')].map(g => ({
      group: g.querySelector('.tw-gname').value.trim() || 'Notes',
      points: [...g.querySelectorAll('.tw-pt')].map(r => ({ term: r.querySelector('.tw-term').value.trim(), explanation: r.querySelector('.tw-exp').value.trim() })).filter(p => p.term || p.explanation),
    })).filter(g => g.points.length);
  }
  async function saveNotes(finish) {
    const fresh = readNotes();
    if (!fresh.length) { msg('There are no notes to save.', true); return; }
    const keyPoints = st.merge === 'replace' || !st.current.length ? fresh : [...st.current, ...fresh];
    busy(true, 'Saving the notes…');
    try {
      await updateDoc(doc(db, topicPath), { keyPoints });
      logEvent('content.keypoints', { target: `${subject.name || ''} › ${topic.name}`, detail: `Create with AI: ${pointCount(fresh)} notes ${st.merge === 'replace' ? 'replaced' : 'added'}` });
      st.current = keyPoints; st.notes = fresh;
    } catch (e) { busy(false); msg('Could not save: ' + e.message, true); return; }
    busy(false);
    onDone && onDone();
    if (finish) { close(); window.showToast?.(`${pointCount(fresh)} notes saved`, 'success'); return; }
    st.step = 3; st.questions = []; render();
  }

  /* Step 3: make questions */
  function step3() {
    const n = pointCount(st.current);
    // About one and a half questions per note covers everything without repeating
    const suggested = Math.max(10, Math.min(MAX_QUESTIONS, Math.round(n * 1.5 / 5) * 5));
    if (!st.qtyChosen) st.qty = suggested;
    body().innerHTML = `
      <h3 class="tw-h">Make questions</h3>
      <p class="tw-hint">Made from the ${notesWord(n)} for this topic. You'll see them before anything is saved.</p>
      <div class="tw-row"><span class="tw-label-s">How many?</span>
        ${[10, 20, 40, 60, 80, 100].map(q => `<button class="tw-chip${st.qty === q ? ' on' : ''}" data-qty="${q}">${q}</button>`).join('')}
        <input type="number" class="tw-num" id="tw-qty" min="3" max="${MAX_QUESTIONS}" value="${st.qty}" aria-label="Number of questions"></div>
      <p class="tw-hint tw-suggest">About ${suggested} suits ${notesWord(n)}. Asking for more than the notes can support gives fewer, so nothing is repeated.</p>
      <div class="tw-row tw-types"><span class="tw-label-s">Kinds</span>
        ${QUESTION_TYPES.map(t => `<label class="tw-chip${st.types.includes(t.id) ? ' on' : ''}"><input type="checkbox" value="${t.id}" ${st.types.includes(t.id) ? 'checked' : ''}> ${t.label}</label>`).join('')}</div>
      <div id="tw-qs">${st.genNote ? `<p class="tw-gen-note">${esc(st.genNote)}</p>` : ''}${st.questions.length ? questionsHtml() : ''}</div>
      <div class="tw-msg" id="tw-msg"></div>`;
    body().querySelectorAll('[data-qty]').forEach(b => b.onclick = () => { st.qty = +b.dataset.qty; st.qtyChosen = true; step3(); });
    document.getElementById('tw-qty').oninput = e => { st.qty = Math.max(3, Math.min(MAX_QUESTIONS, +e.target.value || 20)); st.qtyChosen = true; body().querySelectorAll('[data-qty]').forEach(b => b.classList.toggle('on', +b.dataset.qty === st.qty)); };
    body().querySelectorAll('.tw-types input').forEach(c => c.onchange = () => {
      st.types = [...body().querySelectorAll('.tw-types input:checked')].map(i => i.value);
      c.closest('label').classList.toggle('on', c.checked);
    });
    body().onclick = e => {
      const d = e.target.closest('[data-delq]');
      if (d) { st.questions.splice(+d.dataset.delq, 1); st.genNote = ''; document.getElementById('tw-qs').innerHTML = questionsHtml(); updateSave(); }
    };
    const has = st.questions.length;
    foot().innerHTML = `<button class="btn btn-secondary" data-go="back">← Notes</button>
      <span class="tw-spacer"></span>
      ${has ? `<button class="btn btn-secondary" data-go="gen">Make them again</button><button class="btn btn-primary" data-go="save">Save ${has} questions</button>`
            : `<button class="btn btn-secondary" data-go="skip">Finish without questions</button><button class="btn btn-primary" data-go="gen">✨ Make questions</button>`}`;
    foot().querySelector('[data-go="back"]').onclick = () => {
      st.notes = st.notes.length ? st.notes : st.current; st.step = 2; render();
    };
    foot().querySelector('[data-go="gen"]').onclick = makeQuestions;
    foot().querySelector('[data-go="save"]')?.addEventListener('click', saveQuestions);
    foot().querySelector('[data-go="skip"]')?.addEventListener('click', close);
  }
  const updateSave = () => { const b = foot().querySelector('[data-go="save"]'); if (b) { b.textContent = `Save ${st.questions.length} questions`; b.disabled = !st.questions.length; } };
  function questionsHtml() {
    const label = Object.fromEntries(QUESTION_TYPES.map(t => [t.id, t.label]));
    return `<div class="tw-qlist">${st.questions.map((q, i) => {
      let ans = '';
      if (q.type === 'mcq') ans = (q.options || []).find(o => o.correct)?.text || '';
      else if (q.type === 'tf') ans = q.answer ? 'True' : 'False';
      else if (q.type === 'fill') ans = q.answer;
      else if (q.type === 'match') ans = (q.pairs || []).map(p => `${p.left} → ${p.right}`).join(' · ');
      else if (q.type === 'short') ans = q.markScheme;
      return `<div class="tw-q"><span class="tw-qtype">${esc(label[q.type] || q.type)}</span>
        <div class="tw-qbody"><div>${esc(q.question || q.sentence || q.instruction || '')}</div><small>${esc(ans || '')}</small></div>
        <button class="tw-del" data-delq="${i}" aria-label="Remove question">✕</button></div>`;
    }).join('')}</div>`;
  }
  async function makeQuestions() {
    if (!st.types.length) { msg('Pick at least one kind of question.', true); return; }
    const content = notesToText(st.current);
    if (!content) { msg('This topic has no notes yet.', true); return; }
    // Large requests are made in batches (one reply holds about 40), each told
    // what's already been written so nothing is repeated. Stops early when the
    // notes run out of new things to ask.
    const got = [];
    const textOf = q => q.question || q.sentence || q.instruction || '';
    // Questions already saved on this topic: new ones mustn't repeat them
    const saved = [];
    (await getDocs(collection(db, `${topicPath}/questions`)).catch(() => null))?.forEach(d => { const t = textOf(d.data()); if (t) saved.push(t); });
    busy(true, `Writing up to ${st.qty} questions… (about a minute${st.qty > BATCH ? ' per ' + BATCH : ''})`);
    try {
      while (got.length < st.qty) {
        const want = Math.min(BATCH, st.qty - got.length);
        if (got.length) setBusyText(`Writing questions ${got.length + 1} to ${got.length + want} of up to ${st.qty}…`);
        const done = [...saved, ...got.map(textOf)].slice(-200);
        const avoid = done.length ? `\n\nQuestions already written. Do NOT repeat these or test the same facts again; cover different points:\n${done.map(t => '- ' + t).join('\n')}` : '';
        const batch = tfFix(await ask(questionsPrompt(content + avoid, want, st.types, st.aiTopic), 16000)).filter(q => QUESTION_TYPES.some(t => t.id === q?.type));
        got.push(...batch);
        if (batch.length < want * 0.5) break;   // the notes have run out of new questions
      }
    } catch (e) {
      if (!got.length) { busy(false); msg(e.message, true); return; }
    }
    st.questions = got.slice(0, st.qty);
    const extra = saved.length ? ` new questions (the topic already has ${saved.length}, which weren't repeated)` : ' questions';
    st.genNote = !st.questions.length
      ? `No new questions: the ${saved.length} already saved cover everything in these notes. For more, add more notes.`
      : st.questions.length < st.qty
      ? `Made ${st.questions.length} of the ${st.qty}${extra} asked for: that's everything these notes can support without repeating. For more, add more notes.`
      : `Made ${st.questions.length}${extra}. Remove any you don't want, then save.`;
    busy(false);
    step3();
  }
  async function saveQuestions() {
    if (!st.questions.length) return;
    busy(true, 'Saving…');
    try {
      const col = collection(db, `${topicPath}/questions`);
      await Promise.all(st.questions.map(q => addDoc(col, { ...q, createdAt: serverTimestamp(), source: 'ai' })));
      logEvent('content.questions', { target: `${subject.name || ''} › ${topic.name}`, detail: `Create with AI: ${st.questions.length} questions added` });
    } catch (e) { busy(false); msg('Could not save: ' + e.message, true); return; }
    busy(false);
    const n = st.questions.length;
    close();
    window.showToast?.(`${n} questions saved`, 'success');
    onDone && onDone();
  }

  render();
}

function injectStyle() {
  if (document.getElementById('tw-style')) return;
  document.head.insertAdjacentHTML('beforeend', `<style id="tw-style">
  .tw-overlay { position: fixed; inset: 0; z-index: 2500; background: rgba(10,12,20,0.5); display: flex; align-items: flex-start; justify-content: center; padding: 4vh 12px; overflow-y: auto; }
  .tw-box { background: var(--color-surface); color: var(--color-text); border-radius: 18px; width: 100%; max-width: 760px; box-shadow: 0 20px 60px rgba(0,0,0,0.25); display: flex; flex-direction: column; max-height: 92vh; }
  .tw-head { display: flex; justify-content: space-between; align-items: flex-start; gap: 12px; padding: 20px 22px 6px; }
  .tw-kicker { font-family: var(--font-ui); font-size: 0.75rem; font-weight: 800; letter-spacing: 0.05em; text-transform: uppercase; color: var(--color-primary); }
  .tw-head h2 { font-family: var(--font-heading); font-size: 1.3rem; margin: 2px 0 0; }
  .tw-x { background: none; border: 0; font-size: 1.1rem; cursor: pointer; color: var(--color-text-muted); padding: 4px 8px; }
  .tw-steps { list-style: none; display: flex; gap: 6px; margin: 8px 22px 0; padding: 0; counter-reset: s; }
  .tw-steps li { flex: 1; counter-increment: s; font-family: var(--font-ui); font-size: 0.8rem; font-weight: 700; color: var(--color-text-muted); padding: 8px 0 6px; border-bottom: 3px solid var(--color-border); }
  .tw-steps li::before { content: counter(s) '. '; }
  .tw-steps li.on { color: var(--color-primary); border-color: var(--color-primary); }
  .tw-steps li.done { color: var(--color-text); border-color: color-mix(in srgb, var(--color-primary) 40%, var(--color-border)); }
  .tw-body { padding: 18px 22px; overflow-y: auto; flex: 1; position: relative; }
  .tw-h { font-family: var(--font-heading); font-size: 1.05rem; margin: 0 0 10px; }
  .tw-hint { font-size: 0.85rem; color: var(--color-text-muted); margin: 0 0 12px; line-height: 1.45; }
  .tw-choices { display: grid; grid-template-columns: repeat(auto-fit, minmax(150px, 1fr)); gap: 10px; margin-bottom: 14px; }
  .tw-choice { text-align: left; background: var(--color-surface); border: 2px solid var(--color-border); border-radius: 14px; padding: 14px; cursor: pointer; display: flex; flex-direction: column; gap: 4px; font: inherit; color: inherit; }
  .tw-choice:hover { border-color: var(--color-primary); }
  .tw-choice.on { border-color: var(--color-primary); background: var(--color-primary-glow); }
  .tw-choice strong { font-family: var(--font-ui); font-size: 0.95rem; }
  .tw-choice small { color: var(--color-text-muted); font-size: 0.8rem; line-height: 1.35; }
  .tw-ic { font-size: 1.4rem; }
  .tw-text { width: 100%; min-height: 180px; padding: 12px; border-radius: 12px; font-size: 0.9rem; line-height: 1.5; resize: vertical; }
  .tw-label { display: flex; flex-direction: column; gap: 6px; font-family: var(--font-ui); font-size: 0.85rem; font-weight: 600; }
  .tw-input { padding: 11px 12px; border-radius: 10px; font-size: 0.95rem; }
  .tw-file { display: inline-flex; margin-bottom: 8px; }
  .tw-file input { display: none; }
  .tw-file span { display: inline-flex; align-items: center; gap: 6px; padding: 10px 16px; border-radius: 999px; background: var(--color-primary); color: var(--color-on-primary, #fff); font-family: var(--font-ui); font-weight: 700; cursor: pointer; }
  .tw-check { display: flex; gap: 8px; align-items: center; font-size: 0.85rem; margin: 4px 0 10px; color: var(--color-text-muted); }
  .tw-msg { min-height: 1.2em; font-size: 0.85rem; margin-top: 10px; color: var(--color-text-muted); }
  .tw-msg.err { color: var(--color-danger); }
  .tw-busy { position: absolute; inset: 0; background: color-mix(in srgb, var(--color-surface) 88%, transparent); display: flex; align-items: center; justify-content: center; gap: 10px; font-family: var(--font-ui); font-weight: 600; text-align: center; padding: 20px; }
  .tw-kind { display: flex; flex-direction: column; gap: 6px; margin-top: 12px; font-size: 0.88rem; }
  .tw-kind label { display: flex !important; flex-direction: row !important; align-items: center; gap: 8px; cursor: pointer; text-transform: none; letter-spacing: 0; font-weight: 400; }
  .tw-kind input { width: auto !important; margin: 0; flex-shrink: 0; }
  .tw-merge { display: flex; flex-direction: column; gap: 6px; margin-bottom: 12px; font-size: 0.88rem; background: var(--color-surface-2); padding: 10px 12px; border-radius: 10px; }
  .tw-merge label, .tw-check { display: flex !important; flex-direction: row !important; align-items: center; gap: 8px; cursor: pointer; text-transform: none; letter-spacing: 0; }
  .tw-merge input, .tw-check input { width: auto !important; margin: 0; flex-shrink: 0; }
  .tw-grp { border: 1px solid var(--color-border); border-radius: 12px; padding: 10px; margin-bottom: 10px; }
  .tw-grp-head { display: flex; gap: 8px; align-items: center; margin-bottom: 6px; }
  .tw-gname { flex: 1; font-weight: 700; padding: 8px 10px; border-radius: 8px; }
  .tw-pt { display: grid; grid-template-columns: 1fr 2fr auto; gap: 6px; margin-bottom: 6px; }
  .tw-pt input { padding: 7px 9px; border-radius: 8px; font-size: 0.86rem; }
  .tw-del { background: none; border: 0; color: var(--color-text-muted); cursor: pointer; font-size: 0.8rem; padding: 4px 6px; }
  .tw-del:hover { color: var(--color-danger); }
  .tw-add { background: none; border: 1px dashed var(--color-border); border-radius: 8px; padding: 6px 10px; font: inherit; font-size: 0.82rem; color: var(--color-text-muted); cursor: pointer; }
  .tw-add:hover { border-color: var(--color-primary); color: var(--color-primary); }
  .tw-row { display: flex; flex-wrap: wrap; gap: 6px; align-items: center; margin-bottom: 10px; }
  .tw-label-s { font-family: var(--font-ui); font-size: 0.82rem; font-weight: 700; width: 80px; }
  .tw-chip { display: inline-flex; align-items: center; gap: 6px; border: 1px solid var(--color-border); background: var(--color-surface); border-radius: 999px; padding: 6px 12px; font: inherit; font-size: 0.85rem; cursor: pointer; color: inherit; }
  .tw-chip.on { border-color: var(--color-primary); background: var(--color-primary-glow); color: var(--color-primary); font-weight: 600; }
  .tw-chip input { display: none; }
  .tw-num { width: 70px; padding: 6px 8px; border-radius: 8px; }
  .tw-gen-note { margin: 4px 0 8px; padding: 8px 12px; border-radius: 10px; background: var(--color-primary-glow); font-size: 0.86rem; }
  .tw-qlist { display: flex; flex-direction: column; gap: 6px; margin-top: 8px; }
  .tw-q { display: flex; gap: 10px; align-items: flex-start; border: 1px solid var(--color-border); border-radius: 10px; padding: 8px 10px; font-size: 0.88rem; }
  .tw-qtype { font-family: var(--font-ui); font-size: 0.7rem; font-weight: 700; text-transform: uppercase; color: var(--color-text-muted); width: 92px; flex-shrink: 0; padding-top: 2px; }
  .tw-qbody { flex: 1; } .tw-qbody small { display: block; color: var(--color-success); margin-top: 2px; }
  .tw-foot { display: flex; gap: 8px; align-items: center; padding: 14px 22px 18px; border-top: 1px solid var(--color-border); flex-wrap: wrap; justify-content: flex-end; }
  .tw-foot .btn:first-child { margin-right: auto; }
  .tw-spacer { display: none; }
  @media (max-width: 560px) { .tw-pt { grid-template-columns: 1fr auto; } .tw-pt .tw-exp { grid-column: 1; } .tw-qtype { width: auto; } .tw-q { flex-wrap: wrap; } }
  </style>`);
}
