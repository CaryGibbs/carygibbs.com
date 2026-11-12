// ============================================================
// LOBE LIMPET: getting started for students
//   studentStartHtml / mountStudentStart  "Your first week" checklist on the
//       hub (first quiz, learn a topic, come back tomorrow, own flashcards),
//       using the same look and saved state as the parent one (first-steps.js:
//       users/{uid}.firstSteps)
//   openChoosePacks  a student picks Lobe Limpet packs for themselves (for
//       students who signed up without a parent or class, or want more).
//       Chosen packs go in groupIds like a parent's, and are also listed in
//       selfPackIds so the student can remove only the ones they chose.
//   noPackHtml  the hub screen for a student with nothing to revise yet
// No rules change: students may change their own groupIds and packIds, and
// Lobe Limpet (official) packs can be read by anyone signed in.
// ============================================================

import { db } from './firebase-config.js?v=20261112h';
import { listPacks, flatPackIds } from './packs.js?v=20261112h';
import { pickerHtml, wirePicker, boardTagHtml } from './pack-picker.js?v=20261112h';
import { firstStepsState, saveFirstSteps, firstStepsHtml, wireFirstSteps, FIRST_STEPS_CSS, appStep, noteAppInstalled } from './first-steps.js?v=20261112h';
import { studyEntries } from './gamification.js?v=20261112h';
import { logEvent } from './log.js?v=20261112h';
import { doc, updateDoc } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";

const esc = s => String(s ?? '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
const dayOf = t => { const d = new Date(t); return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`; };

export const STUDENT_START_CSS = `${FIRST_STEPS_CSS}
  .ss-dialog .pack-picker { display: block; position: static; font-family: inherit; }
  .ss-dialog .pack-picker span { color: inherit; }
  .ss-dialog .pack-picker select { appearance: auto; -webkit-appearance: auto; padding: 6px 10px; font-weight: 400; font-size: 0.85rem; }
  .ss-opt { display: flex; align-items: flex-start; gap: 10px; padding: 10px 12px; border: 1px solid var(--color-border); border-radius: var(--radius-button, 10px); margin-bottom: 8px; cursor: pointer; font-family: var(--font-ui); }
  .ss-opt:hover { border-color: var(--color-primary); }
  .ss-opt input { margin-top: 3px; accent-color: var(--color-primary); width: 16px; height: 16px; flex-shrink: 0; }
  .ss-opt.have { opacity: 0.6; cursor: default; }
  .ss-opt small { display: block; color: var(--color-text-muted); font-size: 0.78rem; margin-top: 2px; font-weight: 400; }
  .ss-list { max-height: 55vh; overflow-y: auto; margin: 4px 0 6px; padding-right: 4px; }
  .ss-note { font-size: 0.82rem; color: var(--color-text-muted); line-height: 1.45; margin: 8px 0 0; }
  .ss-routes { display: grid; gap: 12px; max-width: 520px; margin: 18px auto 0; text-align: left; }
  .ss-route { border: 1px solid var(--color-border); border-radius: var(--radius-card, 14px); padding: 14px 16px; background: var(--color-surface); }
  .ss-route.main { border: 2px solid var(--color-primary); }
  .ss-route strong { display: block; font-family: var(--font-ui); font-size: 0.98rem; margin-bottom: 2px; }
  .ss-route p { margin: 0 0 10px; font-size: 0.86rem; color: var(--color-text-muted); line-height: 1.45; }
  .ss-route .join-form { margin-top: 0; }
  .ss-parent { max-width: 520px; margin: 14px auto 0; font-size: 0.82rem; color: var(--color-text-muted); line-height: 1.5; }
`;
let cssDone = false;
export function addStudentStartCss() {
  if (cssDone) return; cssDone = true;
  document.head.insertAdjacentHTML('beforeend', `<style id="student-start-css">${STUDENT_START_CSS}</style>`);
}

/* ── Where my packs came from ────────────────────────────── */
export function packSource(profile = {}, packId) {
  if ((profile.selfPackIds || []).includes(packId)) return 'self';
  if (profile.myPackId === packId) return 'flashcards';
  if (Object.values(profile.classPacks || {}).some(l => (l || []).includes(packId))) return 'class';
  if ((profile.groupIds || []).includes(packId) || profile.groupId === packId) return 'parent';
  return '';
}
export const SOURCE_TEXT = {
  self: 'You chose this pack',
  parent: 'Your parent set this up for you',
  class: 'From your class',
  flashcards: 'Your own flashcards',
};

/* ── Screen for a student with nothing to revise yet ─────── */
// joinForm: the hub's class code form HTML (wired by the hub)
export function noPackHtml(joinForm) {
  addStudentStartCss();
  return `<div class="no-group-banner">
    <div class="empty-state-icon"><i data-icon="library"></i></div>
    <h3>Choose what to revise</h3>
    <p>Pick a ready-made pack for your subjects, join your class, or make your own flashcards. You can add more later.</p>
    <div class="ss-routes">
      <div class="ss-route main"><strong>📚 Pick a Lobe Limpet pack</strong>
        <p>GCSE and A level packs for your exam board, with notes to learn and quizzes. Each subject has free topics to try.</p>
        <button class="btn btn-primary" data-ss="choose">Choose a pack</button></div>
      <div class="ss-route"><strong>🏫 Got a class code?</strong>
        <p>Your teacher's packs appear as soon as you join.</p>${joinForm}</div>
      <div class="ss-route"><strong>🃏 Make your own flashcards</strong>
        <p>Type or import your cards; each one becomes quiz questions.</p>
        <a class="btn btn-secondary" href="cards.html"><i data-icon="layers"></i> My flashcards</a></div>
    </div>
    <p class="ss-parent">Want revision made from your own class notes or worksheets? A parent can link to your account (they choose Add student and use your email) and turn your school sheets into notes and quizzes.</p>
  </div>`;
}

/* ── Choose Lobe Limpet packs ────────────────────────────── */
// onDone(profileChanges) runs after saving
export async function openChoosePacks({ uid, profile, toast = () => {}, onDone = null, preview = false }) {
  addStudentStartCss();
  document.getElementById('ss-choose')?.remove();
  document.body.insertAdjacentHTML('beforeend', `<div class="modal-overlay open ss-dialog" id="ss-choose" role="dialog" aria-modal="true" aria-labelledby="ss-title"><div class="modal" style="max-width:560px">
    <div class="modal-header"><h2 id="ss-title">Choose what to revise</h2><button class="modal-close" data-ss-close aria-label="Close">✕</button></div>
    <p style="margin:0 0 10px;color:var(--color-text-muted);font-size:0.9rem;line-height:1.5">Tick the packs for your subjects and exam board. Ask your teacher if you're not sure which board you're on.</p>
    <div class="ss-list" id="ss-list"><div class="spinner" style="margin:20px auto"></div></div>
    <p class="ss-note">Topics with a ✨ Plus tag show what the pack covers; the free topics are yours to learn and quiz on.</p>
    <div class="error-msg" id="ss-err"></div>
    <div class="modal-footer" style="display:flex;justify-content:flex-end;gap:8px;margin-top:12px">
      <button class="btn btn-secondary" data-ss-close>Cancel</button>
      <button class="btn btn-primary" id="ss-save" disabled>Add packs</button></div>
  </div></div>`);
  const box = document.getElementById('ss-choose');
  box.querySelectorAll('[data-ss-close]').forEach(b => b.onclick = () => box.remove());
  const official = (await listPacks(uid).catch(() => [])).filter(p => p.official && !p.studentMade);
  const have = new Set(flatPackIds(profile));
  const list = document.getElementById('ss-list');
  if (!official.length) { list.innerHTML = '<p>No packs are available yet.</p>'; return; }
  list.innerHTML = pickerHtml({ official, officialTitle: '', item: p => `
    <label class="ss-opt${have.has(p.id) ? ' have' : ''}"><input type="checkbox" value="${esc(p.id)}" ${have.has(p.id) ? 'checked disabled' : ''}>
      <span><strong>${esc(p.name)}</strong>${boardTagHtml(p)}<small>${have.has(p.id) ? 'You have this already' : esc(p.description || '')}</small></span></label>` });
  wirePicker(list);
  const save = document.getElementById('ss-save');
  const picked = () => [...list.querySelectorAll('input:checked:not(:disabled)')].map(i => i.value);
  list.onchange = () => { const n = picked().length; save.disabled = !n; save.textContent = n ? `Add ${n} pack${n === 1 ? '' : 's'}` : 'Add packs'; };
  save.onclick = async () => {
    const ids = picked();
    if (!ids.length) return;
    if (preview) { box.remove(); toast('Not available while previewing.', 'info'); return; }
    save.disabled = true; save.classList.add('loading');
    try {
      const groupIds = [...new Set([...(profile.groupIds || (profile.groupId ? [profile.groupId] : [])), ...ids])];
      const selfPackIds = [...new Set([...(profile.selfPackIds || []), ...ids])];
      const changes = { groupIds, groupId: groupIds[0], selfPackIds };
      changes.packIds = flatPackIds({ ...profile, ...changes });
      await updateDoc(doc(db, 'users', uid), changes);
      Object.assign(profile, changes);
      try { localStorage.setItem('clasp_pack_' + uid, ids[0]); } catch (e) {}
      logEvent('student.choose_pack', { detail: ids.map(id => official.find(p => p.id === id)?.name || id).join(', ') });
      box.remove();
      toast(`Added ${ids.length} pack${ids.length === 1 ? '' : 's'}`, 'success');
      onDone && onDone(changes);
    } catch (e) {
      save.disabled = false; save.classList.remove('loading');
      const err = document.getElementById('ss-err'); err.textContent = 'Could not add: ' + e.message; err.classList.add('visible');
    }
  };
}

// Remove a pack the student chose themselves (never one from a parent or class)
export async function removeChosenPack(uid, profile, packId) {
  if (!(profile.selfPackIds || []).includes(packId)) throw new Error('Only packs you chose yourself can be removed here.');
  const groupIds = (profile.groupIds || []).filter(id => id !== packId);
  const selfPackIds = profile.selfPackIds.filter(id => id !== packId);
  const changes = { groupIds, groupId: groupIds[0] || null, selfPackIds };
  changes.packIds = flatPackIds({ ...profile, ...changes });
  await updateDoc(doc(db, 'users', uid), changes);
  Object.assign(profile, changes);
  logEvent('student.remove_pack', { detail: packId });
}

/* ── "Your first week" checklist ─────────────────────────── */
// actions: { quiz(), learn(), cards() }; source: text for where the pack came from
// cardSets: how many flashcard sets they have now (a deleted set doesn't count)
export function studentSteps(profile = {}, actions = {}, cardSets = null) {
  const sessions = profile.sessions || [];
  const quizzes = sessions.filter(s => !s.review);
  const study = studyEntries(profile);
  const days = new Set([...sessions.map(s => s.date).filter(Boolean).map(dayOf), ...study.map(e => e.day)]);
  return [
    { id: 'quiz', title: 'Take your first quiz',
      text: 'Pick any topic below and tap Quiz. It takes about five minutes, and getting things wrong is how it sticks.',
      done: quizzes.length > 0, doneText: `${quizzes.length} quiz${quizzes.length === 1 ? '' : 'zes'} done.`,
      actions: [{ label: '⚡ Start a quiz', primary: true, act: actions.quiz }] },
    { id: 'learn', title: 'Learn a topic first',
      text: 'Tap Learn on a topic for its subject map and notes. Reading first, then quizzing, beats quizzing cold.',
      done: study.length > 0, doneText: 'Learn tried.',
      actions: [{ label: '📖 Open Learn', act: actions.learn }] },
    { id: 'back', title: 'Come back tomorrow',
      text: "Revise on a second day to start your streak. Review brings back questions just before you'd forget them, so a few minutes a day keeps everything fresh.",
      done: days.size >= 2, doneText: 'Streak started.' },
    { id: 'cards', title: 'Make your own flashcards', optional: true,
      text: 'Type or import your own cards (Quizlet exports work); each card becomes quiz questions.',
      done: cardSets === null ? false : cardSets > 0, doneText: `${cardSets} flashcard set${cardSets === 1 ? '' : 's'} made.`,
      actions: [{ label: '🃏 My flashcards', act: actions.cards }] },
    appStep(profile, 'student'),
  ];
}
// Puts the checklist in `el`. preview: an adult viewing as the student (nothing is saved)
export function mountStudentStart(el, { uid, profile, source = '', actions = {}, preview = false, toast = () => {}, cardSets = null }) {
  if (!el) return;
  addStudentStartCss();
  if (!preview) noteAppInstalled(uid, profile);
  const fs = firstStepsState(profile);
  if (fs.hidden) { el.innerHTML = ''; return; }
  const steps = studentSteps(profile, actions, cardSets);
  const allDone = steps.filter(s => !s.optional).every(s => s.done);
  if (allDone && !fs.doneAt) {
    // Students who were revising before this checklist existed never need it:
    // put it away quietly rather than congratulating them on week one
    const first = Math.min(...(profile.sessions || []).map(x => x.date || Infinity), ...studyEntries(profile).map(e => e.date));
    if (first < Date.now() - 7 * 86400000) {
      el.innerHTML = '';
      if (!preview) saveFirstSteps(uid, profile, { doneAt: Date.now(), hidden: true });
      return;
    }
    if (!preview) { saveFirstSteps(uid, profile, { doneAt: Date.now() }); logEvent('account.getting_started', { detail: 'Student' }); }
  }
  el.innerHTML = firstStepsHtml({ title: 'Your first week',
    lead: `${source ? `${esc(source)}. ` : ''}Three quick things to get going:`,
    doneLead: "You're off to a great start. Keep your streak going: a few minutes a day is all it takes.", steps });
  wireFirstSteps(el, steps, {
    hide: async () => {
      if (!preview) await saveFirstSteps(uid, profile, { hidden: true });
      el.innerHTML = '';
      if (!allDone) toast('Hidden. You can bring it back from your Profile.', 'info');
    },
    skip: async id => {
      if (!preview) await saveFirstSteps(uid, profile, { skipped: [...new Set([...fs.skipped, id])] });
      else profile.firstSteps = { ...fs, skipped: [...new Set([...fs.skipped, id])] };
      mountStudentStart(el, { uid, profile, source, actions, preview, toast, cardSets });
    },
  });
}
