// ============================================================
// LOBE LIMPET: "Create with AI" for one topic (Plus)
// A three-step guide that replaces juggling tabs:
//   1. Where are the notes coming from? (upload a file, a web page,
//      paste text, let AI write them, or use the notes already there)
//   2. Check the notes (edit, then they're saved)
//   3. Make questions (how many, which kinds, review, save)
// Also holds the AI instructions (prompts) the builder uses, so the
// wizard and the older screens write notes and questions the same way.
// ============================================================

import { db } from './firebase-config.js?v=20261113u';
import { askClaude, textOf, parseJsonLoose, findArrayLoose, workerAction } from './ai.js?v=20261113u';
import { mergeReads, siteOf } from './videos.js?v=20261113u';
import { readDocument, readDocumentWithAI } from './doc-text.js?v=20261113u';
import { logEvent } from './log.js?v=20261113u';
import {
  doc, getDoc, getDocs, updateDoc, addDoc, collection, serverTimestamp,
} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";

const esc = s => String(s ?? '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

/* ── AI instructions ─────────────────────────────────────── */
// kind: 'auto' (AI decides), 'extract' (notes/textbook: use what it says),
//       'teach' (checklist/spec/objectives: write what each point means)
// context: e.g. "GCSE AQA Chemistry: Atomic structure" (helps the level)
const NOTES_JSON = `Leave out exam admin (marks, timings, word counts, assessment objectives, how many questions or tasks, how the paper is laid out): teach the subject itself. Exam technique is fine as advice on how to do it well, without numbers.
Return ONLY a JSON array of groups, no markdown, no backticks, no preamble. Use between 3 and 12 groups, with no more than 12 points in a group. Every group MUST have a clear descriptive name about the SUBJECT (e.g. "Atoms and Elements", "Balancing Equations"), never about the document (not "Revision Checklist Format" or "Row 3"). Keep each explanation under 30 words.
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
// opts.fromWeb: the content is a published web page (e.g. BBC Bitesize), so
// the notes are written in our own words and the page's extras are skipped
const FROM_WEB = `This content was taken from a published revision web page. Write every note IN YOUR OWN WORDS: don't copy its sentences or distinctive phrases, just teach the same facts and ideas. Skip anything about the website itself: menus, games, videos, quizzes, "click to play", links to other pages and adverts. Where a glossary definition follows a word in the content, use it to explain that word.`;
export function notesPromptFromText(text, kind = 'auto', context = '', { fromWeb = false } = {}) {
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

${IGNORE_LAYOUT}${fromWeb ? '\n\n' + FROM_WEB : ''}

${NOTES_JSON}

Content:
${String(text).substring(0, 80000)}`;
}

export function notesPromptResearch(topic) {
  const lvl = levelOf(topic);
  return `You are an expert ${lvl} teacher. Write comprehensive key points for the following ${lvl} topic, organised into named sub-topic groups. Include every concept, definition, process, formula, example, case study, person, date, and piece of terminology a student needs for their exam.

IMPORTANT: You MUST return between 3 and 10 groups, with no more than 12 points in a group. Every group MUST have a clear descriptive name (e.g. "Grid References", "Scale & Distance", "Contour Lines"). Do NOT use an empty string as a group name. Keep each explanation under 30 words.
Leave out exam admin (marks, timings, word counts, assessment objectives, how many questions or tasks, how the paper is laid out): teach the subject itself. Exam technique is fine as advice on how to do it well, without numbers.
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
Do NOT ask about exam admin (marks, timings, word counts, assessment objectives, how many questions or tasks there are, how the paper is laid out), even if the content mentions it. Every question must test the subject or skill itself.
If the content is about a skill (e.g. descriptive or narrative writing, analysing a text, essay technique) rather than facts, still write questions: test the techniques, terms, features, structures and when and why to use them, with short examples you make up.
Use these types in roughly equal proportions from: ${types.join(', ')}.

For MCQ questions: make all options similar in length (avoid answer-length giveaways). 4 options per MCQ.
For True/False: make roughly HALF the answers true and HALF false (e.g. 5 of 10), in a random order, not alternating. Build each false statement from a real fact with one key detail changed (a number, term, place, cause or direction) so it is a plausible misconception, not obviously silly. Don't give away the answer through wording: avoid putting words like "always", "never" or "only" mostly in the false ones, and keep true and false statements similar in length.
For Fill-in-the-blank: use _____ (five underscores) for the gap.
For Match pairs: include exactly 4 pairs, and make all 4 right-hand items different from each other (never two the same, e.g. two "Chemical change"), so each left item has only one possible match.

Return ONLY a JSON array with no markdown, no preamble, no backticks: your reply must start with [ and end with ]. Each element must follow one of these schemas:
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

// Asks for a list. If the reply has no usable list, it's written to the
// browser console and asked once more before giving up.
async function ask(prompt, maxTokens, isItem) {
  for (let attempt = 1; ; attempt++) {
    const data = await askClaude('generation', prompt, maxTokens);
    const text = textOf(data);
    const list = findArrayLoose(text, isItem);
    if (list.length) return list;
    console.warn(`Create with AI: no list in the reply (try ${attempt}, stop: ${data.stop_reason || '?'})`, text.slice(0, 4000));
    if (attempt >= 2) throw new Error('Nothing came back. Please try again.');
  }
}
const isQuestion = q => q && QUESTION_TYPES.some(t => t.id === q.type);

/* ── The wizard ──────────────────────────────────────────── */
// opts: { topic: {id, name}, topicPath, subject: {name, examBoard, level}, onDone, start }
// start: 'questions' opens straight at step 3, using the notes already saved
// onDone({ notes, questions }) runs after each save, with what was saved
export async function openTopicWizard({ topic, topicPath, subject = {}, onDone = null, start = '' }) {
  injectStyle();
  document.getElementById('tw')?.remove();
  const snap = await getDoc(doc(db, topicPath)).catch(() => null);
  const st = {
    step: 1, source: 'upload', text: '', note: '', kind: 'auto', files: 0,
    urls: '', pages: [], manual: [],   // "A web page": links typed, pages read, pages to copy by hand
    notesSaved: 0, questionsSaved: 0,
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
        <ol class="tw-steps"><li data-s="1">Your material</li><li data-s="2">Check the notes</li><li data-s="3">Quiz questions</li></ol>
        <div class="tw-body" id="tw-body"></div>
        <div class="tw-foot" id="tw-foot"></div>
      </div>
    </div>`);
  const box = document.getElementById('tw');
  const close = () => { box.remove(); };
  // Leaving with notes saved but no questions: say where to make them later
  const leave = () => {
    close();
    if (st.notesSaved && !st.questionsSaved) window.showToast?.('Notes saved. To make quiz questions later, open the topic and tap Make questions.', 'success');
  };
  box.querySelector('.tw-x').onclick = () => { if (!st.busy || confirm('Stop and close? Anything not saved yet will be lost.')) leave(); };
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

  /* Step 1: where's the content? A photo or file of class notes comes first */
  function step1() {
    const have = pointCount(st.current);
    const others = [
      ['web', '🔗', 'A web page', 'A link to a revision page or article'],
      ['paste', '📋', 'Paste text', 'Your own notes or a textbook passage'],
      ['ai', '✨', 'Let AI write them', 'Just from the topic name'],
      ...(have ? [['existing', '🗒️', 'Use my current notes', `Make questions from the ${notesWord(have)} already here`]] : []),
    ];
    body().innerHTML = `
      <h3 class="tw-h">What should this topic be built from?</h3>
      <button class="tw-choice tw-hero${st.source === 'upload' ? ' on' : ''}" data-src="upload">
        <span class="tw-ic">📷</span>
        <span><strong>A photo or file of class notes</strong>
        <small>A worksheet, revision sheet, class notes or textbook page. Take a photo, or upload a PDF or Word file. We'll turn exactly that into notes and quiz questions.</small></span>
      </button>
      <div id="tw-src-upload"></div>
      <p class="tw-or">Or</p>
      <div class="tw-choices tw-choices-sm">${others.map(([id, icon, t, d]) => `
        <button class="tw-choice${st.source === id ? ' on' : ''}" data-src="${id}"><span class="tw-ic">${icon}</span><strong>${t}</strong><small>${d}</small></button>`).join('')}
      </div>
      <div id="tw-src"></div>
      <div class="tw-msg" id="tw-msg"></div>`;
    body().querySelectorAll('[data-src]').forEach(b => b.onclick = () => {
      if (st.source === 'upload' || st.source === 'paste' || st.source === 'web') st.text = (document.getElementById('tw-text')?.value ?? st.text);
      if (st.source === 'web') st.urls = document.getElementById('tw-urls')?.value ?? st.urls;
      // Words read from one kind of source don't carry over to another
      if (b.dataset.src !== st.source && (st.source === 'web' || b.dataset.src === 'web')) { st.text = ''; st.pages = []; st.manual = []; st.note = ''; st.files = 0; }
      st.source = b.dataset.src; step1();
    });
    const src = document.getElementById(st.source === 'upload' ? 'tw-src-upload' : 'tw-src');
    if (st.source === 'upload') {
      src.innerHTML = `
        <div class="tw-upload">
          <div class="tw-up-btns">
            <label class="tw-file"><input type="file" id="tw-photo" accept="image/*" capture="environment" multiple><span>📷 ${st.text ? 'Add another photo' : 'Take a photo'}</span></label>
            <label class="tw-file tw-file-2"><input type="file" id="tw-file" multiple accept=".pdf,.docx,.txt,.md,application/pdf,application/vnd.openxmlformats-officedocument.wordprocessingml.document,text/plain,image/png,image/jpeg,image/webp"><span>📄 ${st.text ? 'Add another file' : 'Choose a file'}</span></label>
          </div>
          <label class="tw-check"><input type="checkbox" id="tw-pics" ${st.pics ? 'checked' : ''}> It's a scan, or has diagrams or tables to read (slower; photos are always read this way)</label>
          <p class="tw-hint tw-up-hint">${st.text ? 'More than one page? Add each photo or file in turn: they all go together.' : 'Several pages? Choose them all at once, or add them one at a time.'}</p>
          <textarea id="tw-text" class="tw-text" placeholder="The words from your file appear here, so you can check them first." ${st.text ? '' : 'hidden'}>${esc(st.text)}</textarea>
        </div>`;
      document.getElementById('tw-pics').onchange = e => { st.pics = e.target.checked; };
      document.getElementById('tw-file').onchange = e => readFiles([...e.target.files]);
      document.getElementById('tw-photo').onchange = e => readFiles([...e.target.files]);
    } else if (st.source === 'web') {
      const tried = st.pages.length || st.manual.length;
      src.innerHTML = `
        <div class="tw-upload tw-web">
          <label class="tw-label">Link to the page (up to 3, one per line)
            <textarea id="tw-urls" class="tw-input tw-urls" rows="2" placeholder="https://… (paste the link here)" autocomplete="off" spellcheck="false">${esc(st.urls)}</textarea></label>
          <div class="tw-up-btns"><button class="btn btn-primary" id="tw-read">🔗 ${tried ? 'Read again' : 'Read the page'}</button>
            <button class="tw-link" id="tw-manual">I'll copy the words myself</button></div>
          ${tried ? '' : `<p class="tw-hint">Many sites can be read straight away. Some, such as BBC Bitesize, don't let apps read their pages: for those, tap "I'll copy the words myself" and paste them in. Either way, notes and questions are written in our own words, and the link is kept on the topic as "Read first", so students can read the original page too.</p>`}
          ${st.pages.length ? `<ul class="tw-pages">${st.pages.map(p => `<li>✓ <a href="${esc(p.url)}" target="_blank" rel="noopener">${esc(p.title)}</a> <small>${esc(p.site)} · ${p.words.toLocaleString('en-GB')} words${p.cut ? ' (first part)' : ''}</small></li>`).join('')}</ul>` : ''}
          ${st.manual.length ? `<div class="tw-copy">
            <strong>${st.manual.length > 1 ? 'Copy the words from these pages' : 'Copy the words from the page'}</strong>
            ${st.manual.map((m, i) => `<div class="tw-copy-row"><a class="btn btn-secondary btn-sm" href="${esc(m.url)}" target="_blank" rel="noopener">Open the page ↗</a> <small>${esc(m.why || siteLabel(m.url))}</small>
              <input class="tw-input tw-mname" data-mi="${i}" value="${esc(m.name || '')}" maxlength="80" placeholder="Name for this page, e.g. ${st.manual.length > 1 ? 'Flood management' : esc(topic.name)}" aria-label="Name for this page"></div>`).join('')}
            <p class="tw-hint" style="margin:4px 0 0">Students see the name as a "Read first" link, so they know which page is which.</p>
            <ol class="tw-steps-copy">
              <li>Open the page and select all the words: on a computer press <kbd>Ctrl</kbd>+<kbd>A</kbd> (<kbd>⌘</kbd>+<kbd>A</kbd> on a Mac); on a phone, press and hold on some text, then tap <b>Select All</b>.</li>
              <li>Copy, come back here and paste into the box below. Menus and other bits of the page are fine: they're left out of the notes.</li>
            </ol></div>` : ''}
          <textarea id="tw-text" class="tw-text" placeholder="${st.manual.length ? 'Paste the words from the page here…' : 'The words from the page appear here, so you can check them first.'}" ${st.text || st.manual.length ? '' : 'hidden'}>${esc(st.text)}</textarea>
        </div>`;
      document.getElementById('tw-read').onclick = readUrls;
      document.getElementById('tw-manual').onclick = copyMyself;
      src.querySelectorAll('.tw-mname').forEach(inp => inp.oninput = () => { st.manual[+inp.dataset.mi].name = inp.value.trim(); });
      document.getElementById('tw-urls').onkeydown = e => { if (e.key === 'Enter' && (e.metaKey || e.ctrlKey)) readUrls(); };
      // Pasting enables Next straight away
      document.getElementById('tw-text').oninput = e => {
        const nx = foot().querySelector('[data-go="next"]'); if (nx) nx.disabled = !e.target.value.trim();
      };
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
    const ready = st.source && (!['upload', 'web'].includes(st.source) || st.text);
    foot().innerHTML = `<button class="btn btn-secondary" data-go="close">Cancel</button>
      <button class="btn btn-primary" data-go="next" ${ready ? '' : 'disabled'}>${st.source === 'existing' ? 'Next: make quiz questions' : 'Next: make notes'} →</button>`;
    foot().querySelector('[data-go="close"]').onclick = close;
    foot().querySelector('[data-go="next"]').onclick = makeNotes;
  }

  // One or more photos or files; each one's words are added to what's there
  async function readFiles(files) {
    files = (files || []).filter(Boolean);
    if (!files.length) return;
    st.text = (document.getElementById('tw-text')?.value || st.text || '').trim();
    const notes = [];
    let err = '';
    for (let i = 0; i < files.length; i++) {
      const r = await readFile(files[i], files.length > 1 ? ` (${i + 1} of ${files.length})` : '');
      if (r.error) { err = r.error; break; }
      st.text = [st.text, r.text].filter(Boolean).join('\n\n');
      st.files++;
      notes.push(r.note);
    }
    if (notes.length) st.note = (st.files > notes.length ? `${st.files} photos or files so far. ` : '') + notes.join(' ') + ' Check the words below, then continue.';
    step1();
    if (err) msg(err, true);
  }

  // "A web page": the Worker fetches each page and sends back its main words
  function typedUrls() {
    st.urls = document.getElementById('tw-urls').value;
    st.text = document.getElementById('tw-text')?.value ?? st.text;
    const urls = [...new Set(st.urls.split(/[\s,]+/).map(u => u.trim()).filter(Boolean)
      .map(u => /^https?:\/\//i.test(u) ? u : 'https://' + u))];
    if (!urls.length) { msg('Paste a link to a web page first.', true); return null; }
    if (urls.length > 3) { msg('Up to 3 pages at a time.', true); return null; }
    const bad = urls.find(u => { try { new URL(u); return false; } catch (e) { return true; } });
    if (bad) { msg(`That doesn't look like a web address: ${bad}`, true); return null; }
    return urls;
  }
  // Straight to copying and pasting (the link is still kept for "Read first")
  function copyMyself() {
    const urls = typedUrls(); if (!urls) return;
    st.manual = urls.filter(u => !st.pages.some(p => p.url === u)).map(url => ({ url, why: '', name: st.manual.find(m => m.url === url)?.name || '' }));
    st.note = '';
    step1();
    document.getElementById('tw-text')?.focus();
  }
  async function readUrls() {
    const urls = typedUrls(); if (!urls) return;
    busy(true, `Reading ${urls.length > 1 ? 'the pages' : 'the page'}…`);
    let res;
    try { res = await workerAction('readPage', { urls }); }
    catch (e) {
      busy(false);
      msg(/Unknown task|Nothing to send/.test(e.message) ? 'Reading web pages isn\'t switched on yet. Copy the words from the page and choose Paste text instead.' : e.message, true);
      return;
    }
    busy(false);
    const got = (res.pages || []).filter(p => p.text);
    const failed = (res.pages || []).filter(p => !p.text);
    st.pages = got.map(p => ({ url: p.finalUrl || p.url, title: p.title, site: p.site, words: p.words || 0, cut: !!p.cut }));
    // Pages that couldn't be read (e.g. BBC Bitesize turns apps away): copy and paste them
    st.manual = failed.filter(p => !/web address|wasn't found|is a PDF/.test(p.error || ''))
      .map(p => ({ url: p.url, why: whyText(p), name: st.manual.find(m => m.url === p.url)?.name || '' }));
    const broken = failed.filter(p => !st.manual.some(m => m.url === p.url));
    st.text = got.map(p => (got.length > 1 || st.manual.length ? `# ${p.title}\n` : '') + p.text).join('\n\n');
    st.note = got.length ? `Read ${got.length === 1 ? 'the page' : got.length + ' pages'}. Check the words below (you can delete anything not needed)${st.manual.length ? ', add the words you copy' : ''}, then continue.` : '';
    if (got.length) logEvent('content.read_page', { target: `${subject.name || ''} › ${topic.name}`, detail: got.map(p => p.site || p.title).join(', ') });
    step1();
    if (broken.length) msg(broken.map(p => `${shortUrl(p.url)}: ${p.error}`).join(' '), true);
    if (st.manual.length) document.getElementById('tw-text')?.focus();
  }
  // "BBC Bitesize doesn't let apps read its pages", from the Worker's reason
  const whyText = p => {
    const e = String(p.error || '').replace(/\s*Copy the (words|text) from the page.*$/, '');
    return /let apps|asks not to be read/.test(e) ? `${siteLabel(p.url)} doesn't let apps read its pages, so copy the words yourself.` : `${siteLabel(p.url)}: ${e}`;
  };
  const siteLabel = u => {
    try {
      const x = new URL(u); const h = x.hostname.replace(/^www\./, '');
      if (/^bbc\.(co\.uk|com)$/.test(h)) return /^\/bitesize/.test(x.pathname) ? 'BBC Bitesize' : 'BBC';
      return { 'thenational.academy': 'Oak National Academy', 'savemyexams.com': 'Save My Exams', 'senecalearning.com': 'Seneca', 'en.wikipedia.org': 'Wikipedia' }[h] || h;
    } catch (e) { return 'This site'; }
  };
  const shortUrl = u => { try { const x = new URL(u); return x.hostname.replace(/^www\./, '') + (x.pathname.length > 1 ? x.pathname.slice(0, 30) + (x.pathname.length > 30 ? '…' : '') : ''); } catch (e) { return u; } };

  async function readFile(file, of = '') {
    const isImage = /^image\//.test(file.type);
    const pics = isImage || document.getElementById('tw-pics')?.checked;
    busy(true, `Reading ${isImage ? 'your photo' : 'your file'}${of}…`);
    try {
      if (pics) return await readDocumentWithAI(file, askClaude, setBusyText);
      try { return await readDocument(file, setBusyText); }
      catch (e) {
        // A scan: read it with AI instead
        if (!/scan/.test(e.message)) throw e;
        setBusyText('This looks like a scan, so reading it with AI…');
        return await readDocumentWithAI(file, askClaude, setBusyText);
      }
    } catch (e) { return { error: `${file.name}: ${e.message}` }; }
    finally { busy(false); }
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
      if (st.text.length < 40) { msg(st.source === 'upload' ? 'Take a photo or choose a file first.' : st.source === 'web' ? (st.manual.length ? 'Paste the words from the page into the box first.' : 'Paste a link and tap Read the page first.') : 'Paste some notes first.', true); return; }
      prompt = notesPromptFromText(st.text, st.source === 'web' ? 'auto' : st.kind, st.aiTopic, { fromWeb: st.source === 'web' });
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
      <p class="tw-hint">${notesWord(pointCount(st.notes))} in ${st.notes.length} section${st.notes.length === 1 ? '' : 's'}. Change anything that isn't right, or remove what you don't need. Next, these notes are turned into quiz questions.</p>
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
      <button class="tw-link" data-go="finish">Save notes only, for now</button>
      <button class="btn btn-primary" data-go="next">Next: make quiz questions →</button>`;
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
    // Notes made from web pages keep a link back to each page ("Read first")
    const fromPages = st.source === 'web' ? [
      ...st.pages.map(p => ({ label: p.title, url: p.url, site: p.site })),
      // Named by the parent; one unnamed page takes the topic's name; otherwise "BBC Bitesize page 2"
      ...st.manual.map(m => ({ label: m.name || (st.manual.length === 1 && !st.pages.length ? topic.name : ''), url: m.url, site: siteOf(m.url) })),
    ] : [];
    try {
      const upd = { keyPoints };
      if (fromPages.length) {
        const now = (await getDoc(doc(db, topicPath)).catch(() => null))?.data()?.reads || [];
        upd.reads = mergeReads(now, fromPages);
      }
      await updateDoc(doc(db, topicPath), upd);
      logEvent('content.keypoints', { target: `${subject.name || ''} › ${topic.name}`, detail: `Create with AI: ${pointCount(fresh)} notes ${st.merge === 'replace' ? 'replaced' : 'added'}` });
      st.current = keyPoints; st.notes = fresh; st.notesSaved += pointCount(fresh);
      if (fromPages.length) st.readsSaved = true;
    } catch (e) { busy(false); msg('Could not save: ' + e.message, true); return; }
    busy(false);
    onDone && onDone({ notes: st.notesSaved, questions: st.questionsSaved });
    if (finish) { leave(); return; }
    st.step = 3; st.questions = []; render();
  }

  /* Step 3: make questions */
  function step3() {
    const n = pointCount(st.current);
    // About one and a half questions per note covers everything without repeating
    const suggested = Math.max(10, Math.min(MAX_QUESTIONS, Math.round(n * 1.5 / 5) * 5));
    if (!st.qtyChosen) st.qty = suggested;
    body().innerHTML = `
      <h3 class="tw-h">Make quiz questions</h3>
      <p class="tw-hint">${st.notesSaved ? `Notes saved ✓. ` : ''}Questions are what students answer in quizzes and reviews. They're made from the ${notesWord(n)} for this topic, and you'll see them before anything is saved.</p>
      <div class="tw-row"><span class="tw-label-s">How many?</span>
        ${[10, 20, 40, 60, 80, 100].map(q => `<button class="tw-chip${st.qty === q ? ' on' : ''}" data-qty="${q}">${q}</button>`).join('')}
        <input type="number" class="tw-num" id="tw-qty" min="3" max="${MAX_QUESTIONS}" value="${st.qty}" aria-label="Number of questions"></div>
      <p class="tw-hint tw-suggest">About ${suggested} suits ${notesWord(n)}. Asking for more than the notes can support gives fewer, so nothing is repeated.</p>
      <div class="tw-row tw-types"><span class="tw-label-s">Kinds</span>
        ${QUESTION_TYPES.map(t => `<label class="tw-chip${st.types.includes(t.id) ? ' on' : ''}"><input type="checkbox" value="${t.id}" ${st.types.includes(t.id) ? 'checked' : ''}> ${t.label}</label>`).join('')}</div>
      <div id="tw-qs">${st.genNote ? `<p class="tw-gen-note">${esc(st.genNote)}</p>` : ''}${st.questions.length ? questionsHtml() : ''}</div>
      <div class="tw-msg" id="tw-msg"></div>`;
    body().querySelectorAll('[data-qty]').forEach(b => b.onclick = () => { st.qty = +b.dataset.qty; st.qtyChosen = true; step3(); });
    document.getElementById('tw-qty').oninput = e => {
      st.qty = Math.max(3, Math.min(MAX_QUESTIONS, +e.target.value || 20)); st.qtyChosen = true;
      body().querySelectorAll('[data-qty]').forEach(b => b.classList.toggle('on', +b.dataset.qty === st.qty));
      const g = foot().querySelector('[data-go="gen"].btn-primary'); if (g) g.textContent = `✨ Make ${st.qty} questions`;
    };
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
            : `<button class="tw-link" data-go="skip">Not now</button><button class="btn btn-primary" data-go="gen">✨ Make ${st.qty} questions</button>`}`;
    foot().querySelector('[data-go="back"]').onclick = () => {
      st.notes = st.notes.length ? st.notes : st.current; st.step = 2; render();
    };
    foot().querySelector('[data-go="gen"]').onclick = makeQuestions;
    foot().querySelector('[data-go="save"]')?.addEventListener('click', saveQuestions);
    foot().querySelector('[data-go="skip"]')?.addEventListener('click', leave);
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
        const batch = tfFix(await ask(questionsPrompt(content + avoid, want, st.types, st.aiTopic), 16000, isQuestion)).filter(q => QUESTION_TYPES.some(t => t.id === q?.type));
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
    st.questionsSaved += n;
    close();
    window.showToast?.(`${n} questions saved`, 'success');
    onDone && onDone({ notes: st.notesSaved, questions: st.questionsSaved });
  }

  if (start === 'questions' && pointCount(st.current)) st.step = 3;
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
  .tw-hero { flex-direction: row; align-items: flex-start; gap: 14px; width: 100%; padding: 16px 18px; margin-bottom: 10px; }
  .tw-hero .tw-ic { font-size: 2rem; line-height: 1; }
  .tw-hero strong { display: block; font-size: 1.05rem; margin-bottom: 3px; }
  .tw-hero small { display: block; font-size: 0.85rem; }
  .tw-upload { border: 1px solid var(--color-border); border-radius: 14px; padding: 14px; margin: -2px 0 6px; }
  .tw-up-btns { display: flex; flex-wrap: wrap; gap: 8px; }
  .tw-file-2 span { background: var(--color-surface); color: var(--color-primary); border: 2px solid var(--color-primary); }
  .tw-up-hint { margin: 2px 0 8px; }
  .tw-urls { width: 100%; font-family: var(--font-mono, monospace); font-size: 0.85rem; resize: vertical; min-height: 48px; }
  .tw-web .tw-up-btns { margin: 10px 0 4px; }
  .tw-pages { list-style: none; padding: 0; margin: 0 0 10px; display: flex; flex-direction: column; gap: 4px; font-size: 0.88rem; }
  .tw-pages a { color: var(--color-primary); font-weight: 600; }
  .tw-pages small { color: var(--color-text-muted); }
  .tw-copy { background: var(--color-surface-2); border-radius: 12px; padding: 12px 14px; margin: 8px 0 10px; font-size: 0.88rem; }
  .tw-copy > strong { display: block; font-family: var(--font-ui); margin-bottom: 8px; }
  .tw-copy-row { display: flex; flex-wrap: wrap; align-items: center; gap: 8px; margin-bottom: 6px; }
  .tw-copy-row small { color: var(--color-text-muted); flex: 1; min-width: 160px; }
  .tw-mname { flex-basis: 100%; padding: 8px 10px; font-size: 0.88rem; }
  .tw-copy .btn-sm { padding: 6px 12px; font-size: 0.85rem; text-decoration: none; }
  .tw-steps-copy { margin: 8px 0 0; padding-left: 20px; line-height: 1.5; }
  .tw-steps-copy li { margin-bottom: 4px; }
  .tw-steps-copy kbd { font-family: var(--font-ui); font-size: 0.78rem; border: 1px solid var(--color-border); border-bottom-width: 2px; border-radius: 4px; padding: 0 4px; background: var(--color-surface); }
  .tw-web .tw-link { margin-left: 4px; }
  .tw-or { font-family: var(--font-ui); font-size: 0.78rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.05em; color: var(--color-text-muted); margin: 14px 0 8px; }
  .tw-choices-sm .tw-choice { padding: 10px 12px; }
  .tw-choices-sm .tw-ic { font-size: 1.1rem; }
  .tw-link { background: none; border: 0; padding: 8px 6px; font: inherit; font-family: var(--font-ui); font-size: 0.85rem; font-weight: 600; color: var(--color-text-muted); text-decoration: underline; cursor: pointer; }
  .tw-link:hover { color: var(--color-primary); }
  .tw-link:disabled { opacity: 0.5; cursor: default; }
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
