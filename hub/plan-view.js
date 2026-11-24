// ============================================================
// LOBE LIMPET: "Plan to exams" calendar
// A day-by-day view from a few days ago to the end of the next exams:
// each day's level and target, a suggested subject, exam days, and
// ticks or crosses as days pass. Students see it read-only; parents
// can change any day's level (including a rest day) and subject.
// Parent changes are saved as plan.overrides.<day> on the student.
// ============================================================

import { byOrder } from './order.js?v=20261124m';
import { db } from './firebase-config.js?v=20261124m';
import { doc, updateDoc, deleteField, getDocs, collection } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";
import { logEvent } from './log.js?v=20261124m';
import { packNames } from './packs.js?v=20261124m';
import { planSchedule, planSummary, planPack, planPacks, LEVELS, targetText, loadPlanSettings } from './plan.js?v=20261124m';

const esc = s => String(s ?? '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

const CSS = `
.pv-overlay { position: fixed; inset: 0; background: rgba(15,15,20,0.55); z-index: 2000; display: flex; align-items: flex-start; justify-content: center; padding: 4vh 12px; overflow-y: auto; }
.pv-modal { background: var(--color-surface); color: var(--color-text); border-radius: var(--radius-card); width: 100%; max-width: 760px; padding: 22px; box-shadow: 0 24px 64px rgba(0,0,0,0.3); font-family: var(--font-body); }
.pv-head { display: flex; justify-content: space-between; gap: 12px; align-items: flex-start; margin-bottom: 6px; }
.pv-head h2 { font-family: var(--font-heading); font-size: 1.3rem; font-weight: 800; }
.pv-close { background: none; border: 1px solid var(--color-border); border-radius: 50%; width: 36px; height: 36px; cursor: pointer; color: var(--color-text); font-size: 1.1rem; flex-shrink: 0; }
.pv-sub { color: var(--color-text-muted); font-size: 0.9rem; margin-bottom: 14px; }
.pv-sum { display: flex; gap: 8px; flex-wrap: wrap; margin-bottom: 14px; }
.pv-sum span { font-family: var(--font-ui); font-size: 0.8rem; font-weight: 600; padding: 5px 11px; border-radius: 999px; background: var(--color-surface-2); color: var(--color-text-muted); }
.pv-sum span.good { background: color-mix(in srgb, var(--color-success) 16%, transparent); color: var(--color-success); }
.pv-sum span.warn { background: color-mix(in srgb, var(--color-warning) 18%, transparent); color: var(--color-warning); }
.pv-list { border: 1px solid var(--color-border); border-radius: var(--radius-card); overflow: hidden; }
.pv-day { display: grid; grid-template-columns: 92px 1fr auto; gap: 10px; align-items: center; padding: 10px 14px; border-top: 1px solid var(--color-border); }
.pv-day:first-child { border-top: none; }
.pv-day.past { opacity: 0.72; }
.pv-day.today { background: color-mix(in srgb, var(--color-primary) 9%, transparent); }
.pv-day.exam { background: color-mix(in srgb, var(--color-warning) 12%, transparent); }
.pv-date { font-family: var(--font-ui); font-size: 0.82rem; }
.pv-date b { display: block; font-family: var(--font-heading); font-size: 0.95rem; }
.pv-main { min-width: 0; font-size: 0.9rem; }
.pv-main small { display: block; color: var(--color-text-muted); font-size: 0.78rem; }
.pv-status { font-family: var(--font-ui); font-size: 0.78rem; font-weight: 700; text-align: right; white-space: nowrap; }
.pv-status.met { color: var(--color-success); } .pv-status.missed { color: var(--color-danger); } .pv-status.part { color: var(--color-warning); }
.pv-edit { display: flex; gap: 6px; flex-wrap: wrap; margin-top: 6px; }
.pv-edit select { width: auto; max-width: 100%; padding: 5px 8px; font-size: 0.8rem; border-radius: 8px; }
.pv-why { color: var(--color-text-muted); font-style: italic; }
.pv-edited { font-size: 0.7rem; font-weight: 700; color: var(--color-primary); margin-left: 6px; }
.pv-foot { display: flex; justify-content: space-between; gap: 10px; flex-wrap: wrap; margin-top: 14px; font-size: 0.82rem; color: var(--color-text-muted); align-items: center; }
@media (max-width: 560px) { .pv-day { grid-template-columns: 70px 1fr; } .pv-status { grid-column: 2; text-align: left; } }
`;
let cssDone = false;
function addCss() { if (cssDone) return; cssDone = true; const st = document.createElement('style'); st.textContent = CSS; document.head.appendChild(st); }

const subjectCache = {};
export async function packSubjects(packId) {
  if (!packId) return [];
  if (subjectCache[packId]) return subjectCache[packId];
  const snap = await getDocs(collection(db, `content/${packId}/subjects`)).catch(() => null);
  const list = []; snap?.forEach(d => list.push({ id: d.id, ...d.data() }));
  list.sort(byOrder);
  return (subjectCache[packId] = list);
}

function fmtDay(day) {
  const d = new Date(day + 'T12:00:00');
  return { wd: d.toLocaleDateString('en-GB', { weekday: 'short' }), dm: d.toLocaleDateString('en-GB', { day: 'numeric', month: 'short' }) };
}

// Subjects from every pack the student has, grouped by pack. The plan's
// pack (packId) drives the rotation (`subjects`); `all` lets a parent pick
// from any pack and lets dated papers in other packs count.
export async function loadPlanSubjects(profile) {
  const packId = planPack(profile);
  const ids = planPacks(profile);
  const [lists, names] = await Promise.all([Promise.all(ids.map(packSubjects)), packNames(ids)]);
  const groups = ids.map((id, i) => ({ id, name: names[id] || 'Revision pack', subjects: lists[i].map(s => ({ ...s, packId: id })) }))
    .filter(g => g.subjects.length);
  return { packId, groups, subjects: groups.find(g => g.id === packId)?.subjects || [], all: groups.flatMap(g => g.subjects) };
}

// <option>s for a subject picker, grouped by pack when there's more than one
export function subjectOptionsHtml(groups, sel) {
  const opt = s => `<option value="${esc(s.id)}" data-pack="${esc(s.packId)}"${sel === s.id ? ' selected' : ''}>${esc(s.name)}</option>`;
  return groups.length > 1
    ? groups.map(g => `<optgroup label="${esc(g.name)}">${g.subjects.map(opt).join('')}</optgroup>`).join('')
    : groups.flatMap(g => g.subjects).map(opt).join('');
}

// Open the calendar. opts: { uid, name, editable, onChange(profile) }
export async function openPlanCalendar(profile, opts = {}) {
  addCss();
  await loadPlanSettings();
  const { packId, groups, subjects, all } = await loadPlanSubjects(profile);
  const subjectOpts = sel => subjectOptionsHtml(groups, sel);
  const overlay = document.createElement('div');
  overlay.className = 'pv-overlay';
  document.body.appendChild(overlay);
  const close = () => overlay.remove();
  overlay.addEventListener('click', e => { if (e.target === overlay) close(); });
  document.addEventListener('keydown', function esc_(e) { if (e.key === 'Escape') { close(); document.removeEventListener('keydown', esc_); } });

  const draw = () => {
    const { days, exam } = planSchedule(profile, subjects, packId, { extra: all });
    const sum = planSummary(profile);
    const past = days.filter(d => d.past && d.status !== 'rest');
    const met = past.filter(d => d.status === 'met').length;
    const ahead = days.filter(d => !d.past && !d.rest);
    const mins = ahead.reduce((a, d) => a + (d.L.mins || 0), 0);
    const covered = new Set(ahead.flatMap(d => (d.subjects || []).map(x => x.id)).filter(id => subjects.some(s => s.id === id)));
    const who = opts.name ? `${esc(opts.name)}'s` : 'Your';
    const levelOpts = [['', 'Auto'], ['rest', '😴 Rest day'], ...['relaxed', 'steady', 'push', 'final'].map(k => [k, `${LEVELS[k].emoji} ${LEVELS[k].label} · ${LEVELS[k].mins} min`])];
    overlay.innerHTML = `<div class="pv-modal" role="dialog" aria-modal="true" aria-label="Plan to exams">
      <div class="pv-head"><div><h2>${who} plan${exam ? ` to ${esc(exam.name || 'exams')}` : ' for the next two weeks'}</h2></div>
        <button class="pv-close" aria-label="Close">✕</button></div>
      <div class="pv-sub">${exam ? `${esc(sum.when)}. ` : 'No exams set, so this is the next two weeks. '}${opts.editable ? 'Change any day\'s level or subject; Auto follows the exam dates.' : 'Your daily goal and a suggested subject for each day.'}</div>
      <div class="pv-sum">
        ${past.length ? `<span class="${met >= past.length - 1 ? 'good' : 'warn'}">Goal hit ${met} of the last ${past.length} days</span>` : ''}
        <span>${Math.round(mins / 60 * 10) / 10} hours planned ahead</span>
        ${subjects.length ? `<span class="${covered.size >= subjects.length ? 'good' : 'warn'}">${covered.size} of ${subjects.length} subjects covered</span>` : ''}
      </div>
      <div class="pv-list">${days.map(d => {
        const f = fmtDay(d.day);
        const status = d.status === 'met' ? '✓ goal hit' : d.status === 'missed' ? '✗ missed' : d.status === 'part' ? `◐ ${d.mins} min` : d.status === 'rest' ? 'rest' : d.status === 'today' ? `${d.mins}/${d.L.mins} min` : '';
        const edited = d.override && (d.override.level || d.override.subjectId || d.override.subjectId2);
        const edit = opts.editable && !d.past ? `<div class="pv-edit">
            <select data-day="${d.day}" data-k="level" aria-label="Level for ${f.wd} ${f.dm}">${levelOpts.map(([v, l]) => `<option value="${v}"${(d.override.level || '') === v ? ' selected' : ''}>${l}</option>`).join('')}</select>
            ${d.rest ? '' : `<select data-day="${d.day}" data-k="subjectId" aria-label="Subject for ${f.wd} ${f.dm}"><option value="">Auto subject</option>${subjectOpts(d.override.subjectId)}</select>
            <select data-day="${d.day}" data-k="subjectId2" aria-label="Second subject for ${f.wd} ${f.dm}"><option value="">Auto second</option><option value="-"${d.override.subjectId2 === '-' ? ' selected' : ''}>No second subject</option>${subjectOpts(d.override.subjectId2)}</select>`}
          </div>` : '';
        return `<div class="pv-day${d.past ? ' past' : ''}${d.today ? ' today' : ''}${d.exam ? ' exam' : ''}">
          <div class="pv-date"><b>${d.today ? 'Today' : f.wd}</b>${f.dm}</div>
          <div class="pv-main">${d.exams.length ? `📝 <strong>${d.exams.map(e => esc(e.name || 'Exam')).join(', ')}</strong> · ` : ''}${d.L.emoji} ${d.L.label}${edited ? '<span class="pv-edited">changed</span>' : ''}
            <small>${d.rest ? 'Day off, no goal' : esc(targetText(d.L))}${d.subjects.length ? ` · ${d.past ? 'studied' : 'focus'}: <strong>${d.subjects.map(x => esc(x.name)).join(' + ')}</strong>` : ''}${d.reasons.some(Boolean) ? ` <span class="pv-why">(${esc(d.reasons.filter(Boolean).join(', '))})</span>` : ''}</small>${edit}</div>
          <div class="pv-status ${d.status}">${status}</div>
        </div>`;
      }).join('')}</div>
      <div class="pv-foot"><span>Subjects rotate to give weaker ones more time. ${opts.editable ? 'Changes save straight away.' : ''}</span>
        ${opts.editable && days.some(d => !d.past && (d.override.level || d.override.subjectId || d.override.subjectId2)) ? '<button class="btn btn-secondary" data-reset>Reset all changes</button>' : ''}</div>
    </div>`;
    overlay.querySelector('.pv-close').onclick = close;
    overlay.querySelectorAll('select[data-day]').forEach(sel => sel.onchange = () => save(sel.dataset.day, sel.dataset.k, sel.value));
    overlay.querySelector('[data-reset]')?.addEventListener('click', resetAll);
  };

  async function save(day, key, value) {
    // A plan that isn't a proper object (e.g. an old Plus value) is replaced whole
    const wasObject = !!profile.plan && typeof profile.plan === 'object';
    const plan = profile.plan = wasObject ? profile.plan : { mode: 'auto', exams: [] };
    const ov = { ...((plan.overrides || {})[day] || {}) };
    if (value) ov[key] = value; else delete ov[key];
    // Remember which pack the subject is in, so the student's hub can open it
    if (key === 'subjectId' || key === 'subjectId2') {
      const pk = key === 'subjectId' ? 'packId' : 'packId2';
      const p = all.find(x => x.id === value)?.packId; if (p) ov[pk] = p; else delete ov[pk];
    }
    if (key === 'level' && value === 'rest') { delete ov.subjectId; delete ov.packId; delete ov.subjectId2; delete ov.packId2; }
    plan.overrides = { ...(plan.overrides || {}) };
    if (Object.keys(ov).length) plan.overrides[day] = ov; else delete plan.overrides[day];
    draw();
    try {
      await updateDoc(doc(db, 'users', opts.uid), wasObject
        ? { [`plan.overrides.${day}`]: Object.keys(ov).length ? ov : deleteField() }
        : { plan });
      const lv = { rest: 'Rest day', relaxed: 'Relaxed', steady: 'Steady', push: 'Exam push', final: 'Final days' };
      logEvent('plan.day', { target: opts.name || '', targetId: opts.uid, detail: `${day}: ${key === 'level' ? (value ? lv[value] || value : 'level back to Auto') : key === 'subjectId2' ? (value === '-' ? 'no second subject' : value ? 'second subject ' + (all.find(x => x.id === value)?.name || value) : 'second subject back to Auto') : value ? 'subject ' + (all.find(x => x.id === value)?.name || value) : 'subject back to Auto'}` });
      opts.onChange && opts.onChange(profile);
    } catch (e) { alert('Could not save that change. Please try again.'); }
  }
  async function resetAll() {
    if (!confirm('Put every future day back to Auto?')) return;
    const today = new Date(); const key = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;
    const keep = Object.fromEntries(Object.entries(profile.plan?.overrides || {}).filter(([d]) => d < key));
    if (!profile.plan || typeof profile.plan !== 'object') profile.plan = { mode: 'auto', exams: [] };
    profile.plan.overrides = keep;
    draw();
    try { await updateDoc(doc(db, 'users', opts.uid), { plan: profile.plan }); logEvent('plan.day', { target: opts.name || '', targetId: opts.uid, detail: 'All future days back to Auto' }); opts.onChange && opts.onChange(profile); }
    catch (e) { alert('Could not save. Please try again.'); }
  }
  draw();
}
