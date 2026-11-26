// Admin → Settings: set marks on the written questions in official packs (or people's own) in one go.
// Scan finds the written questions, AI (or the estimate) suggests a mark value for each,
// the admin checks and changes any, then Save writes them.
import { db } from './firebase-config.js?v=20261126g';
import { collection, getDocs, doc, writeBatch, serverTimestamp } from 'https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js';
import { askClaude, textOf, findArrayLoose } from './ai.js?v=20261126g';
import { isOfficialPack } from './packs.js?v=20261126g';
import { logEvent } from './log.js?v=20261126g';
import { MARK_OPTIONS, estimateMarks, marksLabel } from './question-marks.js?v=20261126g';

const BATCH = 40;   // questions per AI request
const esc = s => String(s ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const snap = n => MARK_OPTIONS.reduce((best, v) => Math.abs(v - n) < Math.abs(best - n) ? v : best, MARK_OPTIONS[0]);
const plural = (n, w) => `${n} ${w}${n === 1 ? '' : 's'}`;

export function mountMarksTool(root, { showToast = () => {} } = {}) {
  let packs = [], found = [], picked = [], stop = false;
  root.innerHTML = `
    <div class="ai-settings-head"><div>
      <h3>Marks on written questions</h3>
      <p>Each written question shows its marks, and the AI marks out of them. This sets marks on a pack's written questions in one go (official packs, or people's own packs if you tick them): AI suggests a value from the question and mark scheme, you check them, then save. Marks someone set by hand in the question editor are never changed.</p>
    </div></div>
    <div id="mt-packs" class="mt-packs"><span class="ai-status">Loading packs…</span></div>
    <div class="mt-opts">
      <strong>Which questions</strong>
      <label class="pl-switch"><input type="radio" name="mt-scope" value="missing" checked> Only questions with no marks yet</label>
      <label class="pl-switch"><input type="radio" name="mt-scope" value="all"> Also redo ones set by AI or the estimate</label>
      <strong style="margin-top:6px;">How</strong>
      <label class="pl-switch"><input type="radio" name="mt-how" value="ai" checked> Suggest with AI (best; uses AI tokens)</label>
      <label class="pl-switch"><input type="radio" name="mt-how" value="estimate"> Use the quick estimate (about one mark per key point, 2 to 6; no AI)</label>
    </div>
    <div class="ai-settings-actions">
      <button class="btn btn-secondary" id="mt-scan"><i data-icon="search"></i> Find questions</button>
      <button class="btn btn-primary" id="mt-suggest" hidden><i data-icon="sparkles"></i> Suggest marks</button>
      <button class="btn btn-secondary" id="mt-stop" hidden>Stop</button>
      <span class="ai-status" id="mt-status"></span>
    </div>
    <div id="mt-review" hidden></div>`;
  const $ = id => root.querySelector('#' + id);
  const status = t => { $('mt-status').textContent = t; };
  const scope = () => root.querySelector('input[name="mt-scope"]:checked').value;
  const how = () => root.querySelector('input[name="mt-how"]:checked').value;
  window.claspHydrateIcons?.(root);

  // Official packs (ticked) and people's own packs (not ticked), by owner.
  // Community library copies are frozen, so they aren't listed.
  Promise.all([getDocs(collection(db, 'content')), getDocs(collection(db, 'users')).catch(() => null)]).then(([s, us]) => {
    const names = {}; us?.forEach(d => { names[d.id] = d.data().name || d.data().email || 'Someone'; });
    s.forEach(d => { const p = { id: d.id, ...d.data() }; if (p.visibility === 'library') return; p.official = isOfficialPack(p); p.owner = p.official ? '' : (names[p.ownerUid] || 'Someone'); packs.push(p); });
    packs.sort((a, b) => (b.official - a.official) || a.owner.localeCompare(b.owner) || String(a.name).localeCompare(String(b.name)));
    const box = p => `<label class="mt-pack"><input type="checkbox" value="${esc(p.id)}"${p.official ? ' checked' : ''}> ${esc(p.name || 'Untitled pack')}</label>`;
    const official = packs.filter(p => p.official), own = packs.filter(p => !p.official);
    const owners = [...new Set(own.map(p => p.owner))];
    $('mt-packs').innerHTML = !packs.length ? '<span class="ai-status">No packs.</span>' : `
      ${official.length ? `<div class="mt-group"><strong>Official packs</strong><div>${official.map(box).join('')}</div></div>` : ''}
      ${own.length ? `<details class="mt-group"${official.length ? '' : ' open'}><summary><strong>People's own packs</strong> (${own.length}; tick any to include)</summary>
        ${owners.map(o => `<div class="mt-owner"><small>${esc(o)}</small><div>${own.filter(p => p.owner === o).map(box).join('')}</div></div>`).join('')}</details>` : ''}`;
  }).catch(e => { $('mt-packs').innerHTML = `<span class="ai-status">Couldn't load packs (${esc(e.message)}).</span>`; });
  root.addEventListener('change', e => { if (e.target.name === 'mt-scope' || e.target.closest?.('#mt-packs')) { $('mt-suggest').hidden = true; $('mt-review').hidden = true; status(''); } });

  // 1. Find the written questions in the ticked packs
  $('mt-scan').onclick = async () => {
    const ids = [...root.querySelectorAll('#mt-packs input:checked')].map(i => i.value);
    if (!ids.length) return status('Tick at least one pack.');
    $('mt-scan').disabled = true; $('mt-review').hidden = true; $('mt-suggest').hidden = true;
    found = []; let total = 0, hand = 0, have = 0;
    try {
      for (const p of packs.filter(x => ids.includes(x.id))) {
        status(`Looking in ${p.name}…`);
        const subs = await getDocs(collection(db, `content/${p.id}/subjects`));
        for (const sd of subs.docs) {
          const s = { id: sd.id, ...sd.data() };
          const tops = await getDocs(collection(db, `content/${p.id}/subjects/${s.id}/topics`));
          await Promise.all(tops.docs.map(async td => {
            const path = `content/${p.id}/subjects/${s.id}/topics/${td.id}/questions`;
            const qs = await getDocs(collection(db, path));
            qs.forEach(qd => {
              const q = qd.data();
              if (q.type !== 'short') return;
              total++;
              const set = Number(q.marks) > 0;
              if (set && q.marksBy === 'hand') { hand++; return; }
              if (set) have++;
              if (set && scope() === 'missing') return;
              found.push({ path: `${path}/${qd.id}`, pack: p.official ? p.name : `${p.name} (${p.owner})`, subject: s, topic: td.data().name || '', question: q.question || '', markScheme: q.markScheme || '', was: set ? Number(q.marks) : 0 });
            });
          }));
        }
      }
      const parts = [`${plural(total, 'written question')}`, `${hand} set by hand`, `${have} with marks from AI or the estimate`];
      status(`${parts.join(', ')}. ${found.length ? `${plural(found.length, 'question')} to do.` : 'Nothing to do.'}`);
      $('mt-suggest').hidden = !found.length;
    } catch (e) { status(`Couldn't read the packs: ${e.message}`); }
    $('mt-scan').disabled = false;
  };

  // 2. Suggest marks: AI in batches by subject, or the estimate
  $('mt-suggest').onclick = async () => {
    stop = false; $('mt-suggest').disabled = true; $('mt-scan').disabled = true;
    picked = found.map(f => ({ ...f, marks: estimateMarks(f.markScheme), by: 'estimate' }));
    if (how() === 'ai') {
      $('mt-stop').hidden = false;
      const bySubject = {};
      picked.forEach(f => { (bySubject[f.subject.id + f.pack] ||= []).push(f); });
      const groups = Object.values(bySubject).flatMap(list => { const out = []; for (let i = 0; i < list.length; i += BATCH) out.push(list.slice(i, i + BATCH)); return out; });
      let done = 0, failed = 0;
      for (const g of groups) {
        if (stop) break;
        status(`Suggesting marks: ${done} of ${picked.length}…`);
        try { await suggestBatch(g); } catch (e) { failed += g.length; console.warn('Marks tool: batch failed', e); }
        done += g.length;
      }
      $('mt-stop').hidden = true;
      const left = picked.filter(f => f.by === 'estimate').length;
      status(`${stop ? 'Stopped. ' : ''}${picked.length - left} suggested by AI${left ? `, ${left} using the estimate${failed ? ' (AI didn\'t reply for some)' : ''}` : ''}. Check them, then save.`);
    } else status('Estimates ready. Check them, then save.');
    showReview();
    $('mt-suggest').disabled = false; $('mt-scan').disabled = false;
  };
  $('mt-stop').onclick = () => { stop = true; status('Stopping after this batch…'); };

  async function suggestBatch(g) {
    const s = g[0].subject;
    const about = [s.level || 'GCSE', s.examBoard, s.name].filter(Boolean).join(' ');
    const lines = g.map((f, i) => `${i}. Question: ${f.question.slice(0, 400)}\n   Mark scheme: ${f.markScheme.slice(0, 600)}`).join('\n');
    const prompt = `You are an experienced ${about} examiner. For each written question below, give the mark value a real ${about} exam paper would most likely set for it, judged from the command word, how much it asks for and the mark scheme.
Use only these values: ${MARK_OPTIONS.join(', ')}. Most state, describe and explain questions are 1 to 4 marks; a developed explanation is usually 6; use 8 or more only for extended evaluate, discuss or essay questions where this subject's exams set them.

${lines}

Return ONLY a JSON array, one item per question, no markdown: [{"i":0,"marks":4}]`;
    const list = findArrayLoose(textOf(await askClaude('generation', prompt, 2000)), x => x && 'i' in x && 'marks' in x);
    list.forEach(r => {
      const f = g[Number(r.i)], n = Number(r.marks);
      if (f && n > 0) { f.marks = snap(n); f.by = 'ai'; }
    });
  }

  // 3. Check: counts per mark value and every question, with a dropdown to change
  function showReview() {
    const box = $('mt-review'); box.hidden = false;
    const counts = {}; picked.forEach(f => { counts[f.marks] = (counts[f.marks] || 0) + 1; });
    const opts = n => MARK_OPTIONS.map(v => `<option value="${v}"${v === n ? ' selected' : ''}>${marksLabel(v)}</option>`).join('');
    box.innerHTML = `
      <p class="mt-counts">${Object.keys(counts).sort((a, b) => a - b).map(k => `<span>${marksLabel(Number(k))}: <b>${counts[k]}</b></span>`).join('')}</p>
      <div class="mt-filter"><label>Show <select id="mt-show"><option value="">all</option>${MARK_OPTIONS.filter(v => counts[v]).map(v => `<option value="${v}">${marksLabel(v)}</option>`).join('')}</select></label></div>
      <div class="mt-list">${picked.map((f, i) => `
        <div class="mt-row" data-m="${f.marks}">
          <div class="mt-q"><small>${esc(f.pack)} · ${esc(f.subject.name || '')} · ${esc(f.topic)}${f.by === 'estimate' ? ' · estimate' : ''}${f.was ? ` · was ${f.was}` : ''}</small>${esc(f.question)}</div>
          <select data-i="${i}" aria-label="Marks">${opts(f.marks)}</select>
        </div>`).join('')}</div>
      <div class="ai-settings-actions"><button class="btn btn-primary" id="mt-save"><i data-icon="save"></i> Save marks on ${plural(picked.length, 'question')}</button></div>`;
    window.claspHydrateIcons?.(root);
    box.querySelectorAll('.mt-list select').forEach(sel => sel.onchange = () => { const f = picked[Number(sel.dataset.i)]; f.marks = Number(sel.value); f.by = 'hand'; sel.closest('.mt-row').dataset.m = sel.value; });
    $('mt-show').onchange = e => { const v = e.target.value; box.querySelectorAll('.mt-row').forEach(r => { r.hidden = !!v && r.dataset.m !== v; }); };
    $('mt-save').onclick = save;
  }

  // 4. Save, 400 at a time
  async function save() {
    const btn = $('mt-save'); btn.disabled = true;
    try {
      for (let i = 0; i < picked.length; i += 400) {
        status(`Saving ${i} of ${picked.length}…`);
        const b = writeBatch(db);
        picked.slice(i, i + 400).forEach(f => b.update(doc(db, f.path), { marks: f.marks, marksBy: f.by, updatedAt: serverTimestamp() }));
        await b.commit();
      }
      const ai = picked.filter(f => f.by === 'ai').length, est = picked.filter(f => f.by === 'estimate').length, hand = picked.length - ai - est;
      logEvent('admin.settings', { target: 'Question marks', detail: `Set marks on ${plural(picked.length, 'written question')} (${ai} AI, ${est} estimate, ${hand} by hand)` });
      showToast(`Marks saved on ${plural(picked.length, 'question')}`, 'success');
      status(`Saved marks on ${plural(picked.length, 'question')}.`);
      $('mt-review').hidden = true; $('mt-suggest').hidden = true; found = []; picked = [];
    } catch (e) { status(`Couldn't save: ${e.message}`); btn.disabled = false; }
  }
}
