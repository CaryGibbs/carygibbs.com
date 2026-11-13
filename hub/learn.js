// ============================================================
// CLASP: learning tools
//   • Learn panel: tap a key point to learn about it
//   • Cheat sheet: one-page printable summary of a topic
// Content is written by AI the first time it's needed, then saved
// with the topic so it loads instantly for everyone afterwards.
// ============================================================

import { db } from './firebase-config.js?v=20261113c';
import { isPreview, previewInfo, showToast, hasRole, isStudent } from './auth.js?v=20261113c';
import { awardXp, BADGES } from './gamification.js?v=20261113c';
import { askClaude, jsonOf } from './ai.js?v=20261113c';
import { doc, getDoc, setDoc, updateDoc, deleteField, arrayUnion, arrayRemove } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";


let ctx = null;        // { groupId, subjectId, subjectName, user, profile }
let current = null;    // { topic, list, index }
let learned = {};      // topicId -> Set(noteId)

const esc = s => String(s ?? '').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
const topicPath = t => `content/${ctx.groupId}/subjects/${ctx.subjectId}/topics/${t.id}`;
// Admins (including an admin using "View as") can rewrite saved content
const canEditContent = () => hasRole(ctx?.profile, 'admin') || hasRole(previewInfo()?.viewerProfile, 'admin');

export function noteId(term) {
  const slug = String(term || 'point').toLowerCase().normalize('NFKD').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '').slice(0, 60) || 'point';
  let h = 0; for (const c of String(term)) h = (h * 31 + c.charCodeAt(0)) >>> 0;
  return `${slug}-${h.toString(36).slice(0, 5)}`;
}

/* A point's id within its topic. Usually from its term alone (so existing
   notes and "learnt" ticks keep working); when the same term appears in two
   sections (e.g. "Movement" under both Destructive and Conservative plate
   boundaries) the section is included, so each gets its own note. */
export function pointKey(topic, p) {
  const same = flatPoints(topic).filter(x => x.term === p.term);
  return same.length > 1 ? noteId(`${p.group || ''}::${p.term}`) : noteId(p.term);
}

/* Key points as one flat list: [{ term, explanation, group }] */
export function flatPoints(topic) {
  const kps = topic.keyPoints || [];
  const out = [];
  kps.forEach(k => {
    if (k && Array.isArray(k.points)) k.points.forEach(p => out.push({ term: p.term, explanation: p.explanation || '', group: k.group || '' }));
    else if (k && k.term) out.push({ term: k.term, explanation: k.explanation || '', group: '' });
  });
  return out.filter(p => p.term);
}

/* ── Set-up ──────────────────────────────────────────────── */
export function initLearn(options) {
  ctx = options;
  const l = options.profile?.learned || {};
  learned = {};
  Object.entries(l).forEach(([tid, ids]) => { learned[tid] = new Set(ids || []); });
  if (!document.getElementById('learn-panel')) {
    document.body.insertAdjacentHTML('beforeend', `
      <div class="learn-scrim" id="learn-scrim"></div>
      <aside class="learn-panel" id="learn-panel" aria-hidden="true" aria-label="Learn about this point">
        <div class="learn-head">
          <div class="learn-crumb" id="learn-crumb"></div>
          <button class="learn-close" id="learn-close" aria-label="Close"><i data-icon="x"></i></button>
        </div>
        <div class="learn-body" id="learn-body"></div>
        <div class="learn-foot">
          <button class="btn btn-ghost" id="learn-prev"><i data-icon="arrow-left"></i> Previous</button>
          <button class="btn btn-secondary learn-mark" id="learn-mark"><i data-icon="circle-check"></i> Mark as learnt</button>
          <button class="btn btn-ghost" id="learn-next">Next <i data-icon="arrow-right"></i></button>
        </div>
      </aside>`);
    document.getElementById('learn-close').onclick = closeLearn;
    document.getElementById('learn-scrim').onclick = closeLearn;
    document.getElementById('learn-prev').onclick = () => step(-1);
    document.getElementById('learn-next').onclick = () => step(1);
    document.getElementById('learn-mark').onclick = toggleLearned;
    document.addEventListener('keydown', e => {
      if (!document.body.classList.contains('learn-open')) return;
      if (e.key === 'Escape') closeLearn();
      if (e.key === 'ArrowRight') step(1);
      if (e.key === 'ArrowLeft') step(-1);
    });
  }
}

// topic: the topic object (or just its id, for points whose term is unique)
export function isLearned(topic, term, group = null) {
  const id = typeof topic === 'object' && topic
    ? pointKey(topic, flatPoints(topic).find(p => p.term === term && (group === null || p.group === group)) || { term, group })
    : noteId(term);
  return !!learned[typeof topic === 'object' ? topic?.id : topic]?.has(id);
}
export function learnedCount(topic) {
  const ids = learned[topic.id]; if (!ids) return 0;
  return flatPoints(topic).filter(p => ids.has(pointKey(topic, p))).length;
}

/* ── Learn panel ─────────────────────────────────────────── */
// group: the section the point was tapped in, when known (terms can repeat across sections)
export function openPoint(topic, term, group = null) {
  const list = flatPoints(topic);
  let index = group !== null ? list.findIndex(p => p.term === term && p.group === group) : -1;
  if (index < 0) index = list.findIndex(p => p.term === term);
  if (index < 0) index = 0;
  current = { topic, list, index };
  document.body.classList.add('learn-open');
  document.getElementById('learn-panel').setAttribute('aria-hidden', 'false');
  showCurrent();
}

export function closeLearn() {
  document.body.classList.remove('learn-open');
  document.getElementById('learn-panel')?.setAttribute('aria-hidden', 'true');
  document.dispatchEvent(new CustomEvent('learn:closed'));
}

function step(d) {
  if (!current) return;
  const i = current.index + d;
  if (i < 0 || i >= current.list.length) return;
  current.index = i;
  showCurrent();
}

async function showCurrent() {
  const { topic, list, index } = current;
  const p = list[index];
  const id = pointKey(topic, p);
  document.getElementById('learn-crumb').innerHTML =
    `${esc(topic.name)}${p.group ? ` <span>›</span> ${esc(p.group)}` : ''} <span class="learn-count">${index + 1} of ${list.length}</span>`;
  document.getElementById('learn-prev').disabled = index === 0;
  document.getElementById('learn-next').disabled = index === list.length - 1;
  updateMarkButton(topic.id, id);

  const body = document.getElementById('learn-body');
  body.innerHTML = `
    <h2 class="learn-term">${esc(p.term)}</h2>
    <p class="learn-short">${esc(p.explanation)}</p>
    <div id="learn-more"><div class="learn-loading"><div class="spinner" style="width:22px;height:22px;border-width:2px;"></div> Preparing a fuller explanation…</div></div>`;
  body.scrollTop = 0;
  document.dispatchEvent(new CustomEvent('learn:opened', { detail: { topicId: topic.id, term: p.term } }));

  const token = `${topic.id}/${id}`;
  showCurrent.token = token;
  try {
    const note = await getNote(topic, p, id);
    if (showCurrent.token !== token) return;          // moved on while loading
    document.getElementById('learn-more').innerHTML = noteHtml(note);
    wireNote(topic, p, id);
  } catch (e) {
    if (showCurrent.token !== token) return;
    document.getElementById('learn-more').innerHTML =
      `<div class="learn-error"><i data-icon="circle-alert"></i> Couldn't load more detail just now. <button class="btn btn-ghost" id="learn-retry">Try again</button></div>`;
    document.getElementById('learn-retry').onclick = showCurrent;
  }
}

function noteHtml(n) {
  const list = a => (a || []).map(x => `<li>${esc(x)}</li>`).join('');
  return `
    ${n.simple ? `<section class="learn-sec"><h3><i data-icon="lightbulb"></i> In simple terms</h3><p>${esc(n.simple)}</p></section>` : ''}
    ${n.keyFacts?.length ? `<section class="learn-sec"><h3><i data-icon="list-checks"></i> Key facts</h3><ul>${list(n.keyFacts)}</ul></section>` : ''}
    ${n.example ? `<section class="learn-sec"><h3><i data-icon="compass"></i> Example</h3><p>${esc(n.example)}</p></section>` : ''}
    ${n.mistake ? `<section class="learn-sec learn-warn"><h3><i data-icon="triangle-alert"></i> Common mistake</h3><p>${esc(n.mistake)}</p></section>` : ''}
    ${n.examTip ? `<section class="learn-sec learn-tip"><h3><i data-icon="graduation-cap"></i> Exam tip</h3><p>${esc(n.examTip)}</p></section>` : ''}
    ${n.check?.question ? `<section class="learn-sec learn-check"><h3><i data-icon="circle-help"></i> Quick check</h3><p>${esc(n.check.question)}</p>
      <button class="btn btn-secondary" id="learn-reveal">Show answer</button><p class="learn-answer" id="learn-answer" hidden>${esc(n.check.answer)}</p></section>` : ''}
    <p class="learn-note">Written by AI from your revision notes. If anything doesn't match what you've been taught, go with your teacher.</p>
    ${canEditContent() ? `<button class="btn btn-ghost learn-regen" id="learn-regen"><i data-icon="refresh-cw"></i> Rewrite this explanation</button>` : ''}`;
}

function wireNote(topic, p, id) {
  const r = document.getElementById('learn-reveal');
  if (r) r.onclick = () => { document.getElementById('learn-answer').hidden = false; r.remove(); };
  const g = document.getElementById('learn-regen');
  if (g) g.onclick = async () => {
    document.getElementById('learn-more').innerHTML = `<div class="learn-loading"><div class="spinner" style="width:22px;height:22px;border-width:2px;"></div> Rewriting…</div>`;
    try { const n = await getNote(topic, p, id, true); document.getElementById('learn-more').innerHTML = noteHtml(n); wireNote(topic, p, id); }
    catch (e) { showCurrent(); }
  };
}

async function getNote(topic, p, id, force = false) {
  const ref = doc(db, `${topicPath(topic)}/notes/${id}`);
  if (!force) {
    const snap = await getDoc(ref).catch(() => null);
    if (snap?.exists()) return snap.data();
  }
  const siblings = flatPoints(topic).filter(x => x !== p && !(x.term === p.term && x.group === p.group)).slice(0, 30).map(x => `- ${x.term}: ${x.explanation}`).join('\n');
  const prompt = `You are a friendly, accurate GCSE tutor in the UK helping a student aged 13 to 16 learn one point from their revision notes.

Subject: ${ctx.subjectName}
Topic: ${topic.name}${p.group ? `\nSection: ${p.group}` : ''}
Point to explain: ${p.term}${p.group ? ` (in the section "${p.group}" only)` : ''}
What their notes say: ${p.explanation}

Other points in this topic (for context only):
${siblings || '(none)'}

Write a short lesson on this one point. Use British English and plain, encouraging language. Stay at GCSE level and consistent with their notes. Do not invent statistics, dates or case-study details you are not sure of; if in doubt, keep it general.

Respond ONLY with a JSON object, no markdown, in exactly this shape:
{"simple":"2 to 3 sentences explaining it simply","keyFacts":["3 to 5 short facts worth remembering"],"example":"one concrete example or well-known case study, 1 to 2 sentences","mistake":"one common misconception and the correct idea, 1 sentence","examTip":"how this tends to come up in exams and what to include, 1 to 2 sentences","check":{"question":"one quick question to test understanding","answer":"the answer in 1 sentence"}}`;
  const note = await askAi(prompt, 1400);
  note.term = p.term; note.createdAt = Date.now();
  setDoc(ref, note).catch(() => {});               // save for next time
  return note;
}

function updateMarkButton(topicId, id) {
  const btn = document.getElementById('learn-mark');
  const on = !!learned[topicId]?.has(id);
  btn.classList.toggle('on', on);
  btn.innerHTML = on ? '<i data-icon="circle-check"></i> Learnt' : '<i data-icon="circle-check"></i> Mark as learnt';
  btn.style.display = isStudent(ctx?.profile) ? '' : 'none';
}

async function toggleLearned() {
  if (!current) return;
  const { topic, list, index } = current;
  const id = pointKey(topic, list[index]);
  const set = learned[topic.id] = learned[topic.id] || new Set();
  const on = !set.has(id);
  on ? set.add(id) : set.delete(id);
  updateMarkButton(topic.id, id);
  document.dispatchEvent(new CustomEvent('learn:changed', { detail: { topicId: topic.id } }));
  if (on && index < list.length - 1) setTimeout(() => step(1), 350);   // keep the flow going
  if (isPreview() || !isStudent(ctx?.profile)) return;
  // Has the whole topic now been learnt?
  const allDone = list.every(p => set.has(pointKey(topic, p)));
  try {
    await updateDoc(doc(db, 'users', ctx.user.uid), {
      [`learned.${topic.id}`]: on ? arrayUnion(id) : arrayRemove(id),
      topicsCompleted: allDone ? arrayUnion(topic.id) : arrayRemove(topic.id),
    });
    if (allDone && on) showToast(`Topic complete: you've learnt every point in ${topic.name}!`, 'success');
    if (on) celebrate(await awardXp(ctx.user.uid, 'learn'));
  } catch (e) { /* not critical */ }
}

// Tell the student about any badges they've just earned
export function celebrate(result) {
  (result?.newlyEarned || []).forEach((id, i) => {
    const b = BADGES.find(x => x.id === id);
    if (b) setTimeout(() => showToast(`${b.icon} New badge: ${b.name}`, 'success'), 600 * i);
  });
}

// First time a student opens a topic's cheat sheet: count it and award XP
async function recordCheatSheet(topic) {
  if (isPreview() || !isStudent(ctx?.profile)) return;
  const seen = ctx.profile.cheatSheetsViewed = ctx.profile.cheatSheetsViewed || [];
  if (seen.includes(topic.id)) return;
  seen.push(topic.id);
  try {
    await updateDoc(doc(db, 'users', ctx.user.uid), { cheatSheetsViewed: arrayUnion(topic.id) });
    celebrate(await awardXp(ctx.user.uid, 'cheatsheet'));
  } catch (e) { /* not critical */ }
}

/* ── Cheat sheets ────────────────────────────────────────── */
export async function renderCheatSheet(container, topic, { force = false } = {}) {
  container.innerHTML = `<div class="cs-loading"><div class="spinner" style="width:28px;height:28px;"></div><p>${force ? 'Rewriting' : 'Preparing'} the cheat sheet for <strong>${esc(topic.name)}</strong>…</p><small>The first time takes about 20 seconds. After that it's instant.</small></div>`;
  try {
    let sheet = !force && topic.cheatSheet && topic.cheatSheet.sections ? topic.cheatSheet : null;
    if (!sheet) {
      const fresh = await getDoc(doc(db, topicPath(topic))).catch(() => null);
      const saved = fresh?.data()?.cheatSheet;
      if (!force && saved?.sections) sheet = saved;
    }
    if (!sheet) {
      sheet = await makeCheatSheet(topic);
      topic.cheatSheet = sheet;
      updateDoc(doc(db, topicPath(topic)), { cheatSheet: sheet }).catch(() => {});
    }
    container.innerHTML = cheatSheetHtml(topic, sheet);
    recordCheatSheet(topic);
    container.querySelector('[data-cs-print]')?.addEventListener('click', () => printSheet(container));
    container.querySelector('[data-cs-regen]')?.addEventListener('click', () => renderCheatSheet(container, topic, { force: true }));
  } catch (e) {
    container.innerHTML = `<div class="cs-loading"><i data-icon="circle-alert"></i><p>Couldn't make the cheat sheet just now.</p><button class="btn btn-secondary" data-cs-retry>Try again</button></div>`;
    container.querySelector('[data-cs-retry]').onclick = () => renderCheatSheet(container, topic);
  }
}

async function makeCheatSheet(topic) {
  const pts = flatPoints(topic);
  let source = pts.map(p => `- ${p.group ? `[${p.group}] ` : ''}${p.term}: ${p.explanation}`).join('\n');
  if (!source && topic.questions?.length) {
    source = topic.questions.slice(0, 40).map(q => {
      if (q.type === 'mcq') return `- ${q.question} → ${(q.options || []).find(o => o.correct)?.text || ''}`;
      if (q.type === 'tf') return `- ${q.question} → ${q.answer === true || q.answer === 'true' ? 'True' : 'False'}${q.explanation ? ` (${q.explanation})` : ''}`;
      if (q.type === 'fill') return `- ${q.sentence} → ${q.answer}`;
      if (q.type === 'match') return (q.pairs || []).map(x => `- ${x.left}: ${x.right}`).join('\n');
      if (q.type === 'short') return `- ${q.question} → ${q.markScheme || ''}`;
      return '';
    }).join('\n');
  }
  if (!source) throw new Error('No content for this topic yet');
  const prompt = `You are making a one-page revision cheat sheet for a UK GCSE student (aged 13 to 16).

Subject: ${ctx.subjectName}
Topic: ${topic.name}

Their revision notes:
${source}

Make a concise, accurate cheat sheet using only GCSE-level content consistent with these notes. British English. Short phrases, not paragraphs. Do not invent statistics or case-study details you are not sure of.

Respond ONLY with a JSON object, no markdown, in exactly this shape:
{"summary":"the big idea of the topic in 1 to 2 sentences","sections":[{"heading":"section name","points":["short must-know fact"]}],"keyTerms":[{"term":"word","definition":"short definition"}],"remember":["1 to 3 memory aids or must-remember lines"],"examTips":["2 to 4 exam tips"],"mistakes":["2 to 3 common mistakes to avoid"]}
Use 2 to 5 sections with 3 to 6 points each, and 4 to 10 key terms.`;
  const sheet = await askAi(prompt, 3000);
  sheet.createdAt = Date.now();
  return sheet;
}

function cheatSheetHtml(topic, s) {
  const li = a => (a || []).map(x => `<li>${esc(x)}</li>`).join('');
  return `
  <article class="cheatsheet">
    <header class="cs-head">
      <div>
        <div class="cs-kicker">${esc(ctx.subjectName)} · Cheat sheet</div>
        <h2 class="cs-title">${esc(topic.name)}</h2>
        ${s.summary ? `<p class="cs-summary">${esc(s.summary)}</p>` : ''}
      </div>
      <div class="cs-actions no-print">
        <button class="btn btn-secondary" data-cs-print><i data-icon="file-text"></i> Print or save PDF</button>
        ${canEditContent() ? `<button class="btn btn-ghost" data-cs-regen><i data-icon="refresh-cw"></i> Rewrite</button>` : ''}
      </div>
    </header>
    <div class="cs-grid">
      ${(s.sections || []).map(sec => `<section class="cs-box"><h3>${esc(sec.heading)}</h3><ul>${li(sec.points)}</ul></section>`).join('')}
    </div>
    ${s.keyTerms?.length ? `<section class="cs-box cs-terms"><h3><i data-icon="book-open"></i> Key terms</h3>
      <dl>${s.keyTerms.map(k => `<div><dt>${esc(k.term)}</dt><dd>${esc(k.definition)}</dd></div>`).join('')}</dl></section>` : ''}
    <div class="cs-grid cs-grid-3">
      ${s.remember?.length ? `<section class="cs-box cs-remember"><h3><i data-icon="lightbulb"></i> Remember</h3><ul>${li(s.remember)}</ul></section>` : ''}
      ${s.examTips?.length ? `<section class="cs-box cs-tips"><h3><i data-icon="graduation-cap"></i> Exam tips</h3><ul>${li(s.examTips)}</ul></section>` : ''}
      ${s.mistakes?.length ? `<section class="cs-box cs-mistakes"><h3><i data-icon="triangle-alert"></i> Avoid</h3><ul>${li(s.mistakes)}</ul></section>` : ''}
    </div>
    <p class="cs-foot">Made by AI from your revision notes. Check anything that doesn't match what you've been taught.</p>
  </article>`;
}

// Print from a separate, self-contained page. The app keeps a database
// connection open in the background, and Safari can hold the print dialog
// back until that connection refreshes (up to a couple of minutes). A clean
// page with no connection prints straight away.
const PRINT_CSS = `
  @page { size: A4; margin: 10mm; }
  * { box-sizing: border-box; margin: 0; padding: 0; -webkit-print-color-adjust: exact; print-color-adjust: exact; }
  body { font-family: Inter, -apple-system, system-ui, sans-serif; color: #111; background: #fff; padding: 16px; }
  .no-print { display: none !important; }
  .cs-head { border-bottom: 2px solid ACCENT; padding-bottom: 10px; margin-bottom: 12px; }
  .cs-kicker { font-size: 9pt; font-weight: 700; letter-spacing: .08em; text-transform: uppercase; color: ACCENT; }
  .cs-title { font-size: 20pt; letter-spacing: -.02em; margin: 2px 0 4px; }
  .cs-summary { color: #444; font-size: 10.5pt; line-height: 1.45; }
  .cs-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 8px; margin-bottom: 8px; }
  .cs-box { border: 1px solid #d9d9d9; border-radius: 8px; padding: 8px 10px; break-inside: avoid; }
  .cs-box h3 { display: flex; align-items: center; gap: 5px; font-size: 10.5pt; margin-bottom: 4px; color: ACCENT; }
  .cs-box h3 svg { width: 13px; height: 13px; }
  .cs-box ul { padding-left: 1.1em; }
  .cs-box li { font-size: 9.5pt; line-height: 1.4; margin-bottom: 2px; }
  .cs-terms { margin-bottom: 8px; }
  .cs-terms dl { display: grid; grid-template-columns: 1fr 1fr; gap: 4px 16px; }
  .cs-terms dt { display: inline; font-weight: 700; font-size: 9.5pt; }
  .cs-terms dt::after { content: ' — '; font-weight: 400; color: #666; }
  .cs-terms dd { display: inline; font-size: 9.5pt; }
  .cs-remember { background: ACCENT_SOFT; }
  .cs-tips h3 { color: #15803d; } .cs-mistakes h3 { color: #b45309; }
  .cs-foot { font-size: 8pt; color: #666; margin-top: 6px; }
  .print-bar { display: flex; justify-content: center; gap: 8px; margin-bottom: 14px; }
  .print-bar button { font: 600 14px Inter, system-ui, sans-serif; padding: 10px 16px; border-radius: 8px; border: 1px solid #ccc; background: #fff; cursor: pointer; }
  .print-bar button.primary { background: ACCENT; border-color: ACCENT; color: #fff; }
  @media print { body { padding: 0; } .print-bar { display: none; } }
  @media screen { body { max-width: 900px; margin: 0 auto; } }
`;

function printSheet(container) {
  const sheet = container.querySelector('.cheatsheet');
  if (!sheet) return;
  const accent = getComputedStyle(document.body).getPropertyValue('--color-primary').trim() || '#2563eb';
  const title = sheet.querySelector('.cs-title')?.textContent || 'Cheat sheet';
  const css = PRINT_CSS.replaceAll('ACCENT_SOFT', accent + '1a').replaceAll('ACCENT', accent);
  const html = `<!doctype html><html lang="en"><head><meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>${esc(title)} · Cheat sheet</title><style>${css}</style></head>
    <body><div class="print-bar"><button class="primary" onclick="window.print()">Print or save as PDF</button><button onclick="window.close()">Close</button></div>
    ${sheet.outerHTML}
    <script>window.addEventListener('load', function () { setTimeout(function () { window.print(); }, 250); });<\/script></body></html>`;

  const w = window.open('', '_blank');
  if (w) {
    w.document.open(); w.document.write(html); w.document.close();
    return;
  }
  // Pop-ups blocked: print here instead (may be slower in Safari)
  document.body.classList.add('printing-cheatsheet');
  container.classList.add('cs-print-target');
  const done = () => { document.body.classList.remove('printing-cheatsheet'); container.classList.remove('cs-print-target'); window.removeEventListener('afterprint', done); };
  window.addEventListener('afterprint', done);
  window.print();
  setTimeout(done, 1500);
}

/* ── AI helper ───────────────────────────────────────────── */
async function askAi(prompt, maxTokens) {
  return jsonOf(await askClaude('learning', prompt, maxTokens));
}

/* Admin: clear saved content for a topic so it is rewritten next time */
export async function clearTopicLearning(topic) {
  await updateDoc(doc(db, topicPath(topic)), { cheatSheet: deleteField() }).catch(() => {});
}
