// ============================================================
// LOBE LIMPET: first steps for parents and teachers
// A checklist on the Home page with live ticks, shown until it's done
// or hidden ("Getting started" in the sidebar and Help bring it back).
// What's been hidden or skipped is kept on the person's own record:
//   users/{uid}.firstSteps = { hidden, skipped: ['notes'], doneAt }
// Also here:
//   ownPackStats(packs)  questions and notes per topic in my own packs,
//                        for "Jacob's pack has no questions yet" warnings
//   offerGivePack(...)   after making content: "Give this pack to Jacob?"
// ============================================================

import { db } from './firebase-config.js?v=20261112f';
import { updateStudentPacks } from './packs.js?v=20261112f';
import { logEvent } from './log.js?v=20261112f';
import {
  doc, getDoc, getDocs, updateDoc, collection, getCountFromServer,
} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";

const esc = s => String(s ?? '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

/* ── What's in my own packs ──────────────────────────────── */
// packs: [{ id, name }] (my own packs). Returns
// { [packId]: { name, questions, topics: [{ id, name, subjectId, subjectName, notes, questions }],
//               notesOnly: [topics with notes and no questions], empty: [topics with neither] } }
// Counts only (one read per 1,000 questions), so it's cheap for a family's few packs.
export async function ownPackStats(packs = []) {
  const out = {};
  const count = async path => { try { return (await getCountFromServer(collection(db, path))).data().count; } catch (e) { return 0; } };
  await Promise.all(packs.map(async p => {
    const topics = [];
    const subs = await getDocs(collection(db, `content/${p.id}/subjects`)).catch(() => null);
    const subList = []; subs?.forEach(d => subList.push({ id: d.id, ...d.data() }));
    await Promise.all(subList.map(async s => {
      const ts = await getDocs(collection(db, `content/${p.id}/subjects/${s.id}/topics`)).catch(() => null);
      const tList = []; ts?.forEach(d => tList.push({ id: d.id, ...d.data() }));
      await Promise.all(tList.map(async t => {
        const questions = await count(`content/${p.id}/subjects/${s.id}/topics/${t.id}/questions`);
        const notes = (t.keyPoints || []).reduce((a, x) => a + (x && x.points ? x.points.length : 1), 0);
        topics.push({ id: t.id, name: t.name || 'Topic', subjectId: s.id, subjectName: s.name || '', order: t.order ?? 0, notes, questions });
      }));
    }));
    topics.sort((a, b) => (a.subjectName || '').localeCompare(b.subjectName || '') || a.order - b.order);
    out[p.id] = {
      name: p.name || 'Untitled pack', topics,
      questions: topics.reduce((a, t) => a + t.questions, 0),
      notesOnly: topics.filter(t => t.notes && !t.questions),
      empty: topics.filter(t => !t.notes && !t.questions),
    };
  }));
  return out;
}

/* ── Remembering hidden / skipped ────────────────────────── */
export function firstStepsState(profile = {}) {
  const f = profile.firstSteps && typeof profile.firstSteps === 'object' ? profile.firstSteps : {};
  return { hidden: !!f.hidden, skipped: Array.isArray(f.skipped) ? f.skipped : [], doneAt: f.doneAt || null };
}
export async function saveFirstSteps(uid, profile, changes) {
  const next = { ...firstStepsState(profile), ...changes };
  profile.firstSteps = next;
  await updateDoc(doc(db, 'users', uid), { firstSteps: next }).catch(e => console.warn('Could not save first steps', e.message));
  return next;
}
// ?firststeps=1 in the address ("Getting started" link) shows it again
export function askedToShow() {
  try { return new URLSearchParams(location.search).get('firststeps') === '1'; } catch (e) { return false; }
}

/* ── The checklist ───────────────────────────────────────── */
// steps: [{ id, title, text, done, optional, plus, actions: [{ label, primary, act }], skip }]
// Returns HTML; wire it with wireFirstSteps(el, steps, handlers)
export function firstStepsHtml({ title, lead, doneLead = 'Your child can start revising. Their progress will show here as they go.', steps, compact = false }) {
  const core = steps.filter(s => !s.optional);
  const doneN = core.filter(s => s.done).length;
  const allDone = doneN === core.length;
  const next = steps.find(s => !s.done && !s.optional) || steps.find(s => !s.done);
  if (compact) return `<div class="fs-compact">
      <span class="fs-ring" style="--p:${Math.round(doneN / core.length * 100)}">${doneN}/${core.length}</span>
      <span><strong>Getting started</strong> · ${allDone ? 'all done' : `next: ${esc(next?.title || '')}`}</span>
      <a class="btn btn-secondary" href="#home" data-fs="open">Continue</a></div>`;
  return `<section class="fs-card${allDone ? ' fs-done' : ''}" aria-labelledby="fs-title">
    <div class="fs-head">
      <div><div class="fs-kicker">Getting started · ${doneN} of ${core.length} done</div>
        <h2 id="fs-title">${allDone ? "You're all set 🎉" : esc(title)}</h2>
        <p class="fs-lead">${allDone ? doneLead : lead}</p></div>
      <button class="fs-hide" data-fs="hide" aria-label="Hide getting started">${allDone ? 'Done' : 'Hide'}</button>
    </div>
    <div class="fs-bar"><span style="width:${Math.round(doneN / core.length * 100)}%"></span></div>
    <ol class="fs-steps">${steps.map((s, i) => `
      <li class="fs-step${s.done ? ' is-done' : ''}${s === next ? ' is-next' : ''}" data-step="${s.id}">
        <span class="fs-tick" aria-hidden="true">${s.done ? '✓' : i + 1}</span>
        <div class="fs-body">
          <div class="fs-title">${esc(s.title)}${s.optional ? ' <span class="fs-opt">optional</span>' : ''}${s.plus && !s.done ? ' <span class="fs-plus">✨ Plus</span>' : ''}${s.done ? '<span class="sr-only"> (done)</span>' : ''}</div>
          ${s.done && s.doneText ? `<div class="fs-text">${s.doneText}</div>` : !s.done ? `<div class="fs-text">${s.text}</div>` : ''}
          ${!s.done && (s.actions || []).length ? `<div class="fs-acts">${s.actions.map((a, k) => `<button class="btn ${a.primary ? 'btn-primary' : 'btn-secondary'}" data-fs-step="${s.id}" data-fs-act="${k}">${a.label}</button>`).join('')}
            ${s.skip ? `<button class="fs-skip" data-fs-skip="${s.id}">${esc(s.skip)}</button>` : ''}</div>` : ''}
        </div>
      </li>`).join('')}
    </ol>
  </section>`;
}
// handlers: { hide(), skip(stepId), open() }
export function wireFirstSteps(el, steps, handlers = {}) {
  if (!el) return;
  el.onclick = e => {
    const a = e.target.closest('[data-fs-act]');
    if (a) { const s = steps.find(x => x.id === a.dataset.fsStep); s?.actions?.[+a.dataset.fsAct]?.act(); return; }
    const sk = e.target.closest('[data-fs-skip]');
    if (sk) { handlers.skip?.(sk.dataset.fsSkip); return; }
    const f = e.target.closest('[data-fs]');
    if (f?.dataset.fs === 'hide') handlers.hide?.();
    if (f?.dataset.fs === 'open') { handlers.open?.(); }
  };
}

export const FIRST_STEPS_CSS = `
  .fs-card { background: var(--color-surface); border: 2px solid var(--color-primary); border-radius: var(--radius-card, 16px); padding: 18px 20px; margin-bottom: var(--space-lg, 20px); box-shadow: 0 6px 24px rgba(0,0,0,0.06); }
  .fs-card.fs-done { border-color: var(--color-success, #1a9e6a); }
  .fs-head { display: flex; justify-content: space-between; gap: 12px; align-items: flex-start; }
  .fs-kicker { font-family: var(--font-ui); font-size: 0.72rem; font-weight: 800; letter-spacing: 0.05em; text-transform: uppercase; color: var(--color-primary); }
  .fs-card h2 { font-family: var(--font-heading); font-size: 1.3rem; margin: 4px 0 4px; }
  .fs-lead { margin: 0; color: var(--color-text-muted); font-size: 0.92rem; line-height: 1.45; max-width: 60ch; }
  .fs-hide { background: none; border: 0; font: inherit; font-family: var(--font-ui); font-size: 0.82rem; font-weight: 600; color: var(--color-text-muted); cursor: pointer; padding: 4px 6px; text-decoration: underline; }
  .fs-bar { height: 6px; border-radius: 99px; background: var(--color-surface-2, #eee); margin: 14px 0 6px; overflow: hidden; }
  .fs-bar span { display: block; height: 100%; background: var(--color-primary); border-radius: 99px; transition: width .4s; }
  .fs-steps { list-style: none; margin: 0; padding: 0; }
  .fs-step { display: flex; gap: 12px; padding: 12px 0; border-top: 1px solid var(--color-border); }
  .fs-step:first-child { border-top: 0; }
  .fs-tick { flex-shrink: 0; width: 28px; height: 28px; border-radius: 50%; display: grid; place-items: center; font-family: var(--font-ui); font-weight: 800; font-size: 0.85rem; border: 2px solid var(--color-border); color: var(--color-text-muted); background: var(--color-surface); }
  .fs-step.is-done .fs-tick { background: var(--color-success, #1a9e6a); border-color: var(--color-success, #1a9e6a); color: #fff; }
  .fs-step.is-next .fs-tick { border-color: var(--color-primary); color: var(--color-primary); }
  .fs-body { flex: 1; min-width: 0; }
  .fs-title { font-family: var(--font-ui); font-weight: 700; font-size: 0.98rem; }
  .fs-step.is-done .fs-title { color: var(--color-text-muted); }
  .fs-text { font-size: 0.87rem; color: var(--color-text-muted); margin-top: 2px; line-height: 1.45; }
  .fs-step.is-next .fs-text { color: var(--color-text); }
  .fs-acts { display: flex; flex-wrap: wrap; gap: 8px; align-items: center; margin-top: 8px; }
  .fs-acts .btn { padding: 8px 14px; font-size: 0.86rem; }
  .fs-skip { background: none; border: 0; font: inherit; font-size: 0.8rem; color: var(--color-text-muted); text-decoration: underline; cursor: pointer; }
  .fs-opt { font-family: var(--font-ui); font-size: 0.68rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.04em; color: var(--color-text-muted); border: 1px solid var(--color-border); border-radius: 99px; padding: 1px 7px; margin-left: 4px; vertical-align: 1px; }
  .fs-plus { font-family: var(--font-ui); font-size: 0.68rem; font-weight: 800; color: #fff; background: linear-gradient(135deg, #ff7a59, #e0643f); border-radius: 99px; padding: 2px 7px; margin-left: 4px; vertical-align: 1px; }
  .fs-compact { display: flex; align-items: center; gap: 12px; flex-wrap: wrap; background: var(--color-primary-glow, #eef); border-radius: 12px; padding: 10px 14px; margin-bottom: var(--space-md, 14px); font-size: 0.9rem; }
  .fs-compact .btn { margin-left: auto; padding: 6px 12px; font-size: 0.82rem; }
  .fs-ring { width: 38px; height: 38px; border-radius: 50%; display: grid; place-items: center; font-family: var(--font-ui); font-size: 0.72rem; font-weight: 800;
    background: radial-gradient(closest-side, var(--color-surface) 76%, transparent 78%), conic-gradient(var(--color-primary) calc(var(--p) * 1%), var(--color-border) 0); }
  .sr-only { position: absolute; width: 1px; height: 1px; overflow: hidden; clip: rect(0 0 0 0); }
  @media (max-width: 560px) { .fs-card { padding: 14px; } .fs-card h2 { font-size: 1.12rem; } }
`;

/* ── "Give this pack to Jacob?" ──────────────────────────── */
// After content is made in My packs, if none of my students (parent) or
// classes (teacher) has the pack yet, offer to give it with one tap.
// role: 'parent' | 'teacher'
export async function offerGivePack({ role, uid, pack, toast = () => {} }) {
  if (!pack?.id || document.getElementById('give-pack')) return;
  const seen = (() => { try { return JSON.parse(sessionStorage.getItem('ll_givepack') || '[]'); } catch (e) { return []; } })();
  if (seen.includes(pack.id)) return;   // asked already this visit
  let options = [];
  if (role === 'parent') {
    const snap = await getDocs(collection(db, 'users', uid, 'children')).catch(() => null);
    const kids = []; snap?.forEach(d => kids.push({ id: d.id, ...d.data() }));
    const live = await Promise.all(kids.map(k => getDoc(doc(db, 'users', k.id)).then(s => ({ ...k, ...(s.data() || {}) })).catch(() => k)));
    if (!live.length || live.some(k => (k.groupIds || []).includes(pack.id))) return;
    options = live.map(k => ({ id: k.id, label: (k.name || 'Student').split(' ')[0], full: k.name || 'Student', groupIds: k.groupIds || (k.groupId ? [k.groupId] : []) }));
  } else if (role === 'teacher') {
    const snap = await getDocs(collection(db, 'users', uid, 'classes')).catch(() => null);
    const classes = []; snap?.forEach(d => classes.push({ id: d.id, ...d.data() }));
    if (!classes.length || classes.some(c => (c.packIds || []).includes(pack.id))) return;
    options = classes.map(c => ({ id: c.id, label: c.name || 'Class', full: c.name || 'Class', cls: c }));
  } else return;
  try { sessionStorage.setItem('ll_givepack', JSON.stringify([...seen, pack.id])); } catch (e) {}

  const who = role === 'parent' ? (options.length === 1 ? options[0].label : 'your child') : (options.length === 1 ? options[0].label : 'a class');
  document.body.insertAdjacentHTML('beforeend', `<div class="modal-overlay open" id="give-pack" role="dialog" aria-modal="true" aria-labelledby="give-pack-title"><div class="modal" style="max-width:440px">
    <div class="modal-header"><h2 id="give-pack-title">Give this pack to ${esc(who)}?</h2></div>
    <p style="margin:0 0 14px;color:var(--color-text-muted);font-size:0.92rem;line-height:1.5">“${esc(pack.name)}” now has questions, but ${role === 'parent' ? 'none of your students has' : 'none of your classes has'} it yet, so nobody can revise from it.</p>
    <div class="give-opts" style="display:flex;flex-direction:column;gap:8px">${options.map((o, i) => `<button class="btn ${i === 0 ? 'btn-primary' : 'btn-secondary'}" data-give="${esc(o.id)}">Give it to ${esc(o.full)}</button>`).join('')}</div>
    <div class="error-msg" id="give-err"></div>
    <div style="text-align:center;margin-top:10px"><button class="fs-skip" data-give-close style="background:none;border:0;text-decoration:underline;color:var(--color-text-muted);cursor:pointer;font:inherit">Not now</button></div>
  </div></div>`);
  const box = document.getElementById('give-pack');
  box.querySelector('[data-give-close]').onclick = () => box.remove();
  box.querySelectorAll('[data-give]').forEach(b => b.onclick = async () => {
    const o = options.find(x => x.id === b.dataset.give);
    b.disabled = true; b.textContent = 'Giving…';
    try {
      if (role === 'parent') await givePackToChild(uid, o, pack);
      else await givePackToClass(uid, o.cls, pack);
      box.remove();
      toast(`${o.full} now has “${pack.name}”.`, 'success');
    } catch (e) {
      b.disabled = false; b.textContent = `Give it to ${o.full}`;
      const err = document.getElementById('give-err'); err.textContent = 'Could not give it: ' + e.message; err.classList.add('visible');
    }
  });
}
async function givePackToChild(parentUid, kid, pack) {
  const groupIds = [...new Set([...(kid.groupIds || []), pack.id])];
  await updateStudentPacks(kid.id, { groupIds, groupId: groupIds[0] });
  await updateDoc(doc(db, 'users', parentUid, 'children', kid.id), { groupIds }).catch(() => {});
  logEvent('student.pack_given', { target: kid.full, targetId: kid.id, detail: pack.name });
}
async function givePackToClass(teacherUid, cls, pack) {
  const packIds = [...new Set([...(cls.packIds || []), pack.id])];
  await updateDoc(doc(db, 'users', teacherUid, 'classes', cls.id), { packIds });
  if (cls.joinCode) await updateDoc(doc(db, 'classCodes', cls.joinCode), { packIds }).catch(() => {});
  const snap = await getDocs(collection(db, 'users', teacherUid, 'classes', cls.id, 'students')).catch(() => null);
  const ids = []; snap?.forEach(d => ids.push(d.id));
  await Promise.allSettled(ids.map(id => updateStudentPacks(id, { [`classPacks.${cls.id}`]: packIds })));
  logEvent('class.pack_given', { target: cls.name, targetId: cls.id, detail: pack.name });
}
