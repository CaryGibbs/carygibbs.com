// ============================================================
// LOBE LIMPET: "Make revision" (My packs, parents and teachers)
// Replaces the bare "New pack" box. One guided dialog:
//   1. Who's it for, and which subject (level and board optional).
//      The pack is chosen for them: the student's own pack if there is
//      one, otherwise a new "Jacob's revision". They can change it.
//   2. How to fill the subject:
//      - a ready-made Lobe Limpet pack, when one matches (given as is)
//      - from a sheet (photo, file or paste)           → subject-builder 'sheet'
//      - Let AI build it: no sheet, just the subject   → subject-builder 'ai'
//        (or the topics they type)
//      - type the topic names myself (free, no AI)
// The pack and subject are only made once they pick 2, and the pack is
// given to the student straight away, so nothing is left unassigned.
// ============================================================

import { db } from './firebase-config.js?v=20261126g';
import { listPacks } from './packs.js?v=20261126g';
import { packMeta } from './pack-picker.js?v=20261126g';
import { givePackToChild, givePackToClass } from './first-steps.js?v=20261126g';
import { isLanguageSubject } from './spelling.js?v=20261126g';
import { logEvent } from './log.js?v=20261126g';
import { injectStyle as injectWizardStyle } from './topic-wizard.js?v=20261126g';
import {
  doc, getDoc, getDocs, addDoc, collection, query, where, serverTimestamp,
} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";

const esc = s => String(s ?? '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
const norm = s => String(s || '').toLowerCase().replace(/&/g, 'and').replace(/[^a-z0-9]+/g, ' ').trim();
const NEW = '__new';
export const LEVELS = ['KS3', 'GCSE', 'AS level', 'A level', 'National 5', 'Higher', 'Other'];
export const BOARDS = ['AQA', 'Pearson Edexcel', 'OCR', 'WJEC Eduqas', 'WJEC', 'CCEA', 'SQA', 'Other'];
const SUBJECTS = ['Biology', 'Chemistry', 'Physics', 'Combined Science', 'Science', 'Maths', 'English Language', 'English Literature', 'History', 'Geography',
  'Religious Studies', 'French', 'Spanish', 'German', 'Computer Science', 'Economics', 'Business', 'Psychology', 'Sociology', 'Media Studies',
  'Design and Technology', 'Food Preparation and Nutrition', 'Physical Education', 'Music', 'Drama', 'Art and Design', 'Citizenship', 'Latin', 'Classical Civilisation'];
const EMOJI = [[/bio/, '🧬'], [/chem/, '⚗️'], [/phys(?!ical ed)/, '🧲'], [/science/, '🔬'], [/math|stat/, '📐'], [/english|literature|language$/, '📖'],
  [/hist/, '🏛️'], [/geog/, '🌍'], [/relig|rs\b|re\b|philos|ethic/, '🕊️'], [/french|spanish|german|italian|latin|mandarin|welsh/, '🗣️'],
  [/computer|computing|ict/, '💻'], [/econ|business|account/, '📈'], [/psych|socio/, '🧠'], [/media|film/, '🎬'], [/music/, '🎵'], [/drama/, '🎭'],
  [/art|design/, '🎨'], [/food|nutrition/, '🍎'], [/pe\b|physical ed|sport/, '⚽']];
export const emojiFor = name => (EMOJI.find(([re]) => re.test(norm(name))) || [0, '📚'])[1];

// Ready-made Lobe Limpet packs for this subject (and level and board, when given)
export function matchingPacks(packs, { name, level, board }) {
  const n = norm(name);
  if (!n) return [];
  const sameBoard = (a, b) => { const x = norm(a).replace(/^pearson /, '').replace(/^wjec eduqas$/, 'eduqas'), y = norm(b).replace(/^pearson /, '').replace(/^wjec eduqas$/, 'eduqas'); return x === y; };
  return packs.filter(p => p.official && !/demo/i.test(p.name || '')).map(p => ({ p, m: packMeta(p) }))
    .filter(({ m }) => m.subject && (norm(m.subject) === n || (n.length > 3 && norm(m.subject).startsWith(n))))
    .filter(({ m }) => !level || level === 'Other' || !m.level || norm(m.level) === norm(level))
    .filter(({ m }) => !board || board === 'Other' || !m.board || sameBoard(m.board, board))
    .slice(0, 2).map(({ p }) => p);
}

// opts: { role: 'parent'|'teacher', uid, canAI, onLocked(feature), presetPack: {id, name} | null,
//         toast(msg, kind), openBuilder({ pack, subject, mode, prepare, onBack, onClose }), openSubject(pack, subject), onChanged() }
// From a sheet / Let AI build it: this dialog is hidden while the builder is open, its Back comes
// back here, and the pack and subject are only made (prepare) when topics start being made.
export async function openMakeRevision({ role, uid, canAI = false, onLocked = () => {}, presetPack = null, toast = () => {}, openBuilder, openSubject, onChanged = () => {} }) {
  injectWizardStyle(); injectStyle();
  document.getElementById('mr')?.remove();
  const isParent = role === 'parent';
  const st = { step: 1, who: '', subject: '', level: '', board: '', pack: presetPack ? presetPack.id : '', packName: '', packTouched: false, typed: '', busy: false };

  // Who it could be for, and my own packs
  const [people, mine, all] = await Promise.all([
    (async () => {
      if (isParent) {
        const snap = await getDocs(collection(db, 'users', uid, 'children')).catch(() => null);
        const kids = []; snap?.forEach(d => kids.push({ id: d.id, ...d.data() }));
        return Promise.all(kids.map(k => getDoc(doc(db, 'users', k.id)).then(s => ({ ...k, ...(s.data() || {}) })).catch(() => k)))
          .then(list => list.map(k => ({ id: k.id, label: (k.name || 'Student').split(' ')[0], full: k.name || 'Student', groupIds: k.groupIds || (k.groupId ? [k.groupId] : []) })));
      }
      const snap = await getDocs(collection(db, 'users', uid, 'classes')).catch(() => null);
      const list = []; snap?.forEach(d => list.push({ id: d.id, ...d.data() }));
      return list.map(c => ({ id: c.id, label: c.name || 'Class', full: c.name || 'Class', groupIds: c.packIds || [], cls: c }));
    })(),
    (async () => {
      const list = [];
      (await getDocs(query(collection(db, 'content'), where('ownerUid', '==', uid))).catch(() => null))
        ?.forEach(d => { if (d.data().visibility !== 'library' && !d.data().binned) list.push({ id: d.id, ...d.data() }); });
      const t = x => x?.toMillis?.() || 0;
      return list.sort((a, b) => t(a.createdAt) - t(b.createdAt));
    })(),
    listPacks(uid).catch(() => []),
  ]);
  if (!presetPack && people.length === 1) st.who = people[0].id;
  const person = () => people.find(p => p.id === st.who) || null;
  // The pack it goes in: the student's own pack from me, else a new one named for them
  const defaultPack = () => {
    const p = person();
    const theirs = p && mine.find(x => (p.groupIds || []).includes(x.id));
    if (theirs) return { id: theirs.id, name: '' };
    if (!p && mine.length === 1) return { id: mine[0].id, name: '' };
    return { id: NEW, name: p ? (isParent ? `${p.label}'s revision` : `${p.label} revision`) : (isParent ? 'Our revision' : 'Class revision') };
  };
  const pickDefault = () => { if (st.packTouched || presetPack) return; const d = defaultPack(); st.pack = d.id; st.packName = d.name; };
  pickDefault();

  document.body.insertAdjacentHTML('beforeend', `
    <div class="tw-overlay" id="mr" role="dialog" aria-modal="true" aria-labelledby="mr-title">
      <div class="tw-box" style="max-width:640px">
        <div class="tw-head">
          <div><div class="tw-kicker">${presetPack ? esc(presetPack.name) : 'Make revision'}</div><h2 id="mr-title">${presetPack ? 'Add a subject' : 'What would you like to revise?'}</h2></div>
          <button class="tw-x" aria-label="Close">✕</button>
        </div>
        <div class="tw-body" id="mr-body"></div>
        <div class="tw-foot" id="mr-foot"></div>
      </div>
    </div>`);
  const box = document.getElementById('mr');
  const $ = sel => box.querySelector(sel);
  const close = () => box.remove();
  $('.tw-x').onclick = () => { if (!st.busy) close(); };
  const msg = (t, err = false) => { const m = $('#mr-msg'); if (m) { m.textContent = t; m.className = 'tw-msg' + (err ? ' err' : ''); } };
  const busy = (on, label = '') => {
    st.busy = on;
    box.querySelectorAll('#mr-foot button, #mr-body button').forEach(b => { b.disabled = on; });
    if (on) $('#mr-body').insertAdjacentHTML('beforeend', `<div class="tw-busy" id="mr-busy"><div class="spinner" style="width:22px;height:22px;border-width:2px"></div><span>${esc(label)}</span></div>`);
    else $('#mr-busy')?.remove();
  };
  const render = () => (st.step === 1 ? step1 : step2)();

  /* 1: who, what subject, which pack */
  function step1() {
    const opt = (v, label, sel) => `<option value="${esc(v)}" ${sel ? 'selected' : ''}>${esc(label)}</option>`;
    const whoWord = isParent ? 'student' : 'class';
    $('#mr-body').innerHTML = `
      ${presetPack ? '' : `<div class="mr-field"><span class="mr-label">Who's it for?</span>
        <div class="mr-chips">${people.map(p => `<button class="tw-chip${st.who === p.id ? ' on' : ''}" data-who="${esc(p.id)}">${esc(isParent ? p.label : p.full)}</button>`).join('')}
          <button class="tw-chip${!st.who ? ' on' : ''}" data-who="">${people.length ? 'Decide later' : `No ${whoWord} yet`}</button></div>
        ${!people.length ? `<p class="tw-hint" style="margin:6px 0 0">You can give it to a ${whoWord} once you've added one in ${isParent ? 'My students' : 'My classes'}.</p>` : ''}</div>`}
      <div class="mr-field"><label class="mr-label" for="mr-subj">Subject</label>
        <input id="mr-subj" class="tw-input" list="mr-subjects" value="${esc(st.subject)}" placeholder="e.g. Biology, History, French" autocomplete="off" maxlength="60">
        <datalist id="mr-subjects">${SUBJECTS.map(s => `<option value="${esc(s)}">`).join('')}</datalist></div>
      <div class="mr-two">
        <div class="mr-field"><label class="mr-label" for="mr-level">Level <span class="mr-opt">optional</span></label>
          <select id="mr-level" class="tw-input">${opt('', 'Not sure')}${LEVELS.map(l => opt(l, l, st.level === l)).join('')}</select></div>
        <div class="mr-field"><label class="mr-label" for="mr-board">Exam board <span class="mr-opt">optional</span></label>
          <select id="mr-board" class="tw-input">${opt('', 'Not sure')}${BOARDS.map(b => opt(b, b, st.board === b)).join('')}</select></div>
      </div>
      <p class="tw-hint" style="margin:-4px 0 12px">Level and board help AI match their course, and find a ready-made pack if we have one.</p>
      ${presetPack ? '' : `<div class="mr-field mr-pack"><label class="mr-label" for="mr-pack">Goes in</label>
        <select id="mr-pack" class="tw-input">${mine.map(p => opt(p.id, p.name || 'Untitled pack', st.pack === p.id)).join('')}${opt(NEW, '＋ A new pack', st.pack === NEW)}</select>
        <input id="mr-pack-new" class="tw-input" value="${esc(st.packName)}" placeholder="Name for the pack" maxlength="60" ${st.pack === NEW ? '' : 'hidden'}>
        <p class="tw-hint" style="margin:4px 0 0">A pack holds all the subjects for one ${isParent ? 'student' : 'class'} or set of exams.</p></div>`}
      <div class="tw-msg" id="mr-msg"></div>`;
    box.querySelectorAll('[data-who]').forEach(b => b.onclick = () => { readStep1(); st.who = b.dataset.who; pickDefault(); step1(); });
    $('#mr-pack')?.addEventListener('change', e => { st.packTouched = true; st.pack = e.target.value; $('#mr-pack-new').hidden = st.pack !== NEW; if (st.pack === NEW) $('#mr-pack-new').focus(); });
    $('#mr-subj').onkeydown = e => { if (e.key === 'Enter') next(); };
    $('#mr-foot').innerHTML = `<button class="btn btn-secondary" data-go="close">Cancel</button><button class="btn btn-primary" data-go="next">Next →</button>`;
    $('[data-go="close"]').onclick = close;
    $('[data-go="next"]').onclick = next;
    if (!st.subject) setTimeout(() => $('#mr-subj')?.focus(), 30);
  }
  function readStep1() {
    st.subject = ($('#mr-subj')?.value || '').trim();
    st.level = $('#mr-level')?.value || '';
    st.board = $('#mr-board')?.value || '';
    if ($('#mr-pack')) { st.pack = $('#mr-pack').value; st.packName = ($('#mr-pack-new').value || '').trim(); }
  }
  function next() {
    readStep1();
    // "biology" → "Biology" (the usual name, or capitals if typed all in lower case)
    const known = SUBJECTS.find(x => norm(x) === norm(st.subject));
    if (known) st.subject = known;
    else if (st.subject === st.subject.toLowerCase()) st.subject = st.subject.replace(/\b([a-z])/g, c => c.toUpperCase()).replace(/\b(And|Of|The)\b/g, w => w.toLowerCase()).replace(/^./, c => c.toUpperCase());
    if (!st.subject) { msg('Add the subject.', true); $('#mr-subj').focus(); return; }
    if (st.pack === NEW && !st.packName) { msg('Give the new pack a name.', true); return; }
    st.step = 2; render();
  }

  /* 2: how to fill it */
  function step2() {
    const p = person();
    const ready = p ? matchingPacks(all, { name: st.subject, level: st.level, board: st.board }) : [];
    const plusTag = canAI ? '' : ' <span class="mr-plus">✨ Plus</span>';
    const course = [st.level, st.board].filter(Boolean).join(' ');
    $('#mr-title').textContent = `How do you want to make ${st.subject}?`;
    $('#mr-body').innerHTML = `
      ${ready.map(r => {
        const has = (p.groupIds || []).includes(r.id);
        return `<div class="mr-ready">
          <div><strong>⭐ We have a ready-made pack: ${esc(r.name)}</strong>
          <small>${esc(r.description || 'Notes and quiz questions for every topic.')}</small></div>
          ${has ? `<span class="mr-has">${esc(p.label)} has it</span>` : `<button class="btn btn-primary" data-ready="${esc(r.id)}">Give it to ${esc(p.label)}</button>`}
        </div>`; }).join('')}
      ${ready.length ? `<p class="tw-or">Or make your own</p>` : ''}
      <div class="mr-ways">
        <button class="tw-choice mr-way" data-way="sheet"><span class="tw-ic">📷</span><strong>From a sheet${plusTag}</strong>
          <small>A revision list, worksheet, test topics or class notes. Take a photo or upload it, and we split it into topics with notes and questions from exactly that.</small></button>
        <button class="tw-choice mr-way" data-way="ai"><span class="tw-ic">✨</span><strong>Let AI build it${plusTag}</strong>
          <small>No sheet needed. From ${esc(course ? `${course} ${st.subject}` : st.subject)}, or the topics you type in. Topics, notes and questions made for you.</small></button>
        <button class="tw-choice mr-way" data-way="type"><span class="tw-ic">✏️</span><strong>Type the topics myself</strong>
          <small>Just the topic names for now. Add notes and questions to each one later, with AI or by hand.</small></button>
      </div>
      <div id="mr-type" ${st.way === 'type' ? '' : 'hidden'}>
        <label class="tw-label">Topics, one per line
          <textarea id="mr-typed" class="tw-text" style="min-height:120px" placeholder="e.g.\nCells\nOrganisation\nInfection and response">${esc(st.typed)}</textarea></label>
      </div>
      <div class="tw-msg" id="mr-msg"></div>`;
    box.querySelectorAll('[data-ready]').forEach(b => b.onclick = () => giveReady(all.find(x => x.id === b.dataset.ready)));
    box.querySelectorAll('[data-way]').forEach(b => b.onclick = () => choose(b.dataset.way));
    $('#mr-foot').innerHTML = `<button class="btn btn-secondary" data-go="back">← Back</button>
      ${st.way === 'type' ? `<button class="btn btn-primary" data-go="make">Make these topics</button>` : ''}`;
    // Back: close the typed-topics box first, then to the first screen
    $('[data-go="back"]').onclick = () => {
      if (st.way === 'type') { st.typed = $('#mr-typed').value; st.way = ''; step2(); return; }
      st.step = 1; st.way = ''; $('#mr-title').textContent = presetPack ? 'Add a subject' : 'What would you like to revise?'; render();
    };
    $('[data-go="make"]')?.addEventListener('click', makeTyped);
    if (st.way === 'type') box.querySelector('[data-way="type"]').classList.add('on');
  }

  async function giveReady(pack) {
    const p = person(); if (!p || !pack) return;
    busy(true, `Giving ${pack.name} to ${p.label}…`);
    try {
      if (isParent) await givePackToChild(uid, p, pack); else await givePackToClass(uid, p.cls, pack);
      p.groupIds = [...(p.groupIds || []), pack.id];
      logEvent('content.make_revision', { target: pack.name, targetId: pack.id, detail: `Ready-made pack given to ${p.full}` });
    } catch (e) { busy(false); msg('Could not give it: ' + e.message, true); return; }
    busy(false); close();
    toast(`${p.full} now has ${pack.name}.`, 'success');
    onChanged();
  }

  function choose(way) {
    if ((way === 'sheet' || way === 'ai') && !canAI) { onLocked(way === 'sheet' ? 'Making topics from a sheet' : 'Building a subject with AI'); return; }
    if (way === 'type') { st.way = 'type'; step2(); setTimeout(() => $('#mr-typed')?.focus(), 30); return; }
    openBuilderLater(way);
  }

  // The pack and subject as they will be (ids only where they exist already)
  async function draftTarget() {
    const pack = presetPack ? { id: presetPack.id, name: presetPack.name }
      : st.pack !== NEW ? { id: st.pack, name: (mine.find(x => x.id === st.pack) || {}).name || '' }
      : { id: null, name: st.packName };
    let subject = { id: null, name: st.subject, level: st.level === 'Other' ? '' : st.level, examBoard: st.board === 'Other' ? '' : st.board, emoji: emojiFor(st.subject) };
    if (pack.id) {
      const subs = [];
      (await getDocs(collection(db, `content/${pack.id}/subjects`)).catch(() => null))?.forEach(d => subs.push({ id: d.id, ...d.data() }));
      const have = subs.find(x => norm(x.name) === norm(st.subject));
      if (have) subject = { ...have, id: have.id };
    }
    return { pack, subject };
  }
  async function openBuilderLater(mode) {
    const draft = await draftTarget();
    box.style.display = 'none';
    openBuilder({ ...draft, mode,
      prepare: async () => {
        const t = await makeTarget(true);
        onChanged();
        return { pack: { id: t.pack.id, name: t.pack.name }, subject: { ...(t.subject.data || {}), id: t.subject.id } };
      },
      onBack: () => { box.style.display = ''; },
      onClose: () => close(),
    });
  }

  // Make (or find) the pack and subject, and give the pack to the student
  // (rethrow: for the builder, which shows the error itself)
  async function makeTarget(rethrow = false) {
    busy(true, 'Setting it up…');
    try {
      let pack;
      if (presetPack) pack = { ...presetPack, data: mine.find(x => x.id === presetPack.id) || { name: presetPack.name } };
      else if (st.pack !== NEW) { const m = mine.find(x => x.id === st.pack); pack = { id: m.id, name: m.name, data: m }; }
      else {
        const data = { name: st.packName, description: '', ownerUid: uid, visibility: 'private', createdAt: serverTimestamp() };
        const ref = await addDoc(collection(db, 'content'), data);
        logEvent('content.pack', { target: data.name, targetId: ref.id, detail: 'Created (make revision)' });
        pack = { id: ref.id, name: data.name, data };
        mine.push({ id: ref.id, ...data });
      }
      // The same subject already in the pack: use it
      const subs = [];
      (await getDocs(collection(db, `content/${pack.id}/subjects`)).catch(() => null))?.forEach(d => subs.push({ id: d.id, ...d.data() }));
      let subject = subs.find(x => norm(x.name) === norm(st.subject));
      if (subject) subject = { id: subject.id, data: subject };
      else {
        const data = { name: st.subject, emoji: emojiFor(st.subject), resources: [], examBoard: st.board === 'Other' ? '' : st.board, level: st.level === 'Other' ? '' : st.level,
          spelling: isLanguageSubject(st.subject) ? 'strict' : 'relaxed', order: subs.length, createdAt: serverTimestamp() };
        const ref = await addDoc(collection(db, `content/${pack.id}/subjects`), data);
        logEvent('content.subject', { target: `${pack.name} › ${data.name}`, detail: 'Created (make revision)' });
        subject = { id: ref.id, data };
      }
      const p = person();
      if (p && !(p.groupIds || []).includes(pack.id)) {
        if (isParent) await givePackToChild(uid, p, pack); else await givePackToClass(uid, p.cls, pack);
        p.groupIds = [...(p.groupIds || []), pack.id];
      }
      busy(false);
      return { pack, subject };
    } catch (e) {
      busy(false);
      if (rethrow) throw new Error('Could not set that up: ' + e.message);
      msg('Could not set that up: ' + e.message, true); return null;
    }
  }

  async function makeTyped() {
    st.typed = $('#mr-typed').value;
    const names = [...new Set(st.typed.split('\n').map(s => s.replace(/^[\s•\-*\d.)]+/, '').trim()).filter(Boolean))].slice(0, 40);
    if (!names.length) { msg('Type at least one topic.', true); return; }
    const t = await makeTarget(); if (!t) return;
    busy(true, 'Making the topics…');
    try {
      const have = [];
      (await getDocs(collection(db, `content/${t.pack.id}/subjects/${t.subject.id}/topics`)).catch(() => null))?.forEach(d => have.push(d.data()));
      const fresh = names.filter(n => !have.some(h => norm(h.name) === norm(n)));
      await Promise.all(fresh.map((name, i) => addDoc(collection(db, `content/${t.pack.id}/subjects/${t.subject.id}/topics`),
        { name, keyPoints: [], videos: [], order: have.length + i, createdAt: serverTimestamp() })));
      logEvent('content.make_revision', { target: `${t.pack.name} › ${st.subject}`, detail: `${fresh.length} topics typed` });
      busy(false); close();
      toast(`${fresh.length} topic${fresh.length === 1 ? '' : 's'} made. Open one to add notes and questions.`, 'success');
      onChanged();
      openSubject(t.pack, t.subject);
    } catch (e) { busy(false); msg('Could not make the topics: ' + e.message, true); }
  }

  render();
}

function injectStyle() {
  if (document.getElementById('mr-style')) return;
  document.head.insertAdjacentHTML('beforeend', `<style id="mr-style">
  .mr-field { margin-bottom: 14px; display: flex; flex-direction: column; gap: 6px; }
  .mr-label { font-family: var(--font-ui); font-size: 0.85rem; font-weight: 700; }
  .mr-opt { font-weight: 500; color: var(--color-text-muted); font-size: 0.78rem; }
  .mr-chips { display: flex; flex-wrap: wrap; gap: 6px; }
  .mr-two { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; }
  .mr-pack select, .mr-field select { padding: 10px 12px; }
  .mr-ways { display: flex; flex-direction: column; gap: 10px; }
  .mr-way { flex-direction: row !important; align-items: flex-start; gap: 12px !important; display: grid !important; grid-template-columns: auto 1fr; }
  .mr-way .tw-ic { grid-row: span 2; font-size: 1.6rem; line-height: 1.1; }
  .mr-plus { font-size: 0.68rem; font-weight: 800; color: #fff; background: linear-gradient(135deg, #ff7a59, #e0643f); border-radius: 99px; padding: 2px 7px; margin-left: 4px; vertical-align: 2px; }
  .mr-ready { display: flex; align-items: center; gap: 12px; flex-wrap: wrap; border: 2px solid var(--color-primary); background: var(--color-primary-glow); border-radius: 14px; padding: 14px 16px; margin-bottom: 10px; }
  .mr-ready > div { flex: 1; min-width: 220px; display: flex; flex-direction: column; gap: 4px; }
  .mr-ready strong { font-family: var(--font-ui); }
  .mr-ready small { color: var(--color-text-muted); font-size: 0.84rem; line-height: 1.4; }
  .mr-has { font-family: var(--font-ui); font-size: 0.82rem; font-weight: 700; color: var(--color-success); }
  #mr-type { margin-top: 12px; }
  @media (max-width: 560px) { .mr-two { grid-template-columns: 1fr; } }
  </style>`);
}
