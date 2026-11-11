// ============================================================
// CLASP: shared stats & badges (used by hub.html and profile.html)
// Next goals, revision time, time by subject, badge collection.
// ============================================================

import { BADGE_FAMILIES, TIERS, badgeProgress, studyEntries } from './gamification.js?v=20261110q';

/* ── Markup ──────────────────────────────────────────────── */
// Section ids (goals, time, subjects, badges) are the jump-link targets.
export function statsSectionsHtml() {
  return `
  <section class="st-section" id="goals">
    <div class="st-title"><i data-icon="target"></i> Next goals <small>closest first</small></div>
    <div class="goal-list" id="goal-list"></div>
    <button class="st-toggle" id="goal-toggle" style="display:none;"></button>
  </section>

  <section class="st-section" id="time">
    <div class="st-title"><i data-icon="clock"></i> Revision time</div>
    <div class="time-tiles">
      <div class="time-tile"><div class="time-tile-val" id="time-today">0m</div><div class="time-tile-label">Today</div></div>
      <div class="time-tile"><div class="time-tile-val" id="time-week">0m</div><div class="time-tile-label">Last 7 days</div></div>
      <div class="time-tile"><div class="time-tile-val" id="time-total">0m</div><div class="time-tile-label">All time</div></div>
    </div>
    <div class="day-chart">
      <div class="day-legend"><span><i class="dot dot-quiz"></i>Quizzes</span><span><i class="dot dot-study"></i>Studying</span></div>
      <div class="day-bars" id="day-bars"></div>
      <div class="day-labels" id="day-labels"></div>
    </div>
  </section>

  <section class="st-section" id="subjects">
    <div class="st-title"><i data-icon="library"></i> Time by subject</div>
    <div class="subject-list" id="subject-list"></div>
  </section>

  <section class="st-section" id="badges">
    <div class="st-title"><i data-icon="award"></i> Badges <small id="badge-count"></small></div>
    <div id="badges-wrap"></div>
  </section>`;
}

/* ── Render everything. Returns badge ids earned but not yet saved ── */
export function renderStats(profile, { goalLimit = 6 } = {}) {
  const sessions = (profile.sessions || []).slice().reverse();
  const progress = badgeProgress(profile);
  renderGoals(progress, goalLimit);
  renderBadges(progress);
  renderTimeStats(sessions, studyEntries(profile));
  renderSubjectStats(sessions, studyEntries(profile));
  const saved = new Set(profile.badges || []);
  return progress.filter(b => b.earned && !saved.has(b.id)).map(b => b.id);
}

/* ── Goals ───────────────────────────────────────────────── */
function renderGoals(progress, limit) {
  const goals = [];
  BADGE_FAMILIES.forEach(f => {
    const remaining = progress
      .filter(b => b.family === f.id && !b.earned)
      .sort((a, b) => a.tier - b.tier || a.target - b.target);
    if (remaining.length) goals.push({ f, next: remaining[0], after: remaining.length - 1 });
  });
  goals.sort((a, b) => b.next.pct - a.next.pct);

  const list = document.getElementById('goal-list');
  const toggle = document.getElementById('goal-toggle');
  if (!goals.length) {
    list.innerHTML = '<div class="st-empty"><i data-icon="trophy"></i> Every badge earned. Incredible work!</div>';
    return;
  }
  list.innerHTML = goals.map(({ f, next, after }, i) => {
    const tier = TIERS[next.tier];
    return `<div class="goal-card" style="--tier-colour:${tier.colour}" ${i >= limit ? 'data-extra hidden' : ''}>
      <div class="goal-icon">${next.icon}</div>
      <div class="goal-body">
        <div class="goal-top">
          <div class="goal-name">${esc(next.name)} <span class="badge-tier">${tier.name}</span></div>
          <div class="goal-count">${next.value} / ${next.target}</div>
        </div>
        <div class="goal-desc">${esc(next.desc)}</div>
        <div class="goal-track"><div class="goal-fill" style="width:${Math.max(next.pct, 3)}%"></div></div>
        <div class="goal-more">${f.icon} ${esc(f.name)}: ${after ? `${after} harder tier${after !== 1 ? 's' : ''} after this` : 'final tier'}</div>
      </div>
    </div>`;
  }).join('');

  const extra = goals.length - limit;
  if (extra > 0) {
    let open = false;
    toggle.style.display = 'inline-block';
    toggle.textContent = `Show ${extra} more goal${extra !== 1 ? 's' : ''}`;
    toggle.onclick = () => {
      open = !open;
      list.querySelectorAll('[data-extra]').forEach(el => { el.hidden = !open; });
      toggle.textContent = open ? 'Show fewer' : `Show ${extra} more goal${extra !== 1 ? 's' : ''}`;
    };
  }
}

/* ── Badges ──────────────────────────────────────────────── */
function badgeCard(b) {
  const tier = TIERS[b.tier];
  return `<div class="badge-card ${b.earned ? 'earned' : 'locked'}" style="--tier-colour:${tier.colour}" title="${esc(b.desc)}">
    <div class="badge-icon">${b.icon}</div>
    <div class="badge-tier">${tier.name}</div>
    <div class="badge-name">${esc(b.name)}</div>
    <div class="badge-desc">${esc(b.desc)}</div>
  </div>`;
}

function renderBadges(progress) {
  const earned = progress.filter(b => b.earned).sort((a, b) => b.tier - a.tier);
  const locked = progress.filter(b => !b.earned);
  document.getElementById('badge-count').textContent = `${earned.length} / ${progress.length} earned`;

  let html = `<div class="badge-subhead">Earned (${earned.length})</div>` +
    (earned.length
      ? `<div class="badges-grid">${earned.map(badgeCard).join('')}</div>`
      : `<div class="st-empty">None yet. Finish a quiz to earn your first!</div>`);

  if (locked.length) {
    html += `<button class="st-toggle" id="locked-toggle"><i data-icon="lock"></i> Show ${locked.length} still to unlock</button><div id="locked-wrap" hidden>`;
    BADGE_FAMILIES.forEach(f => {
      const fam = locked.filter(b => b.family === f.id).sort((a, b) => a.tier - b.tier || a.target - b.target);
      if (!fam.length) return;
      html += `<div class="st-family">${f.icon} ${esc(f.name)} <span>· ${esc(f.blurb)}</span></div>
        <div class="badges-grid">${fam.map(badgeCard).join('')}</div>`;
    });
    html += `</div>`;
  }
  document.getElementById('badges-wrap').innerHTML = html;

  const t = document.getElementById('locked-toggle');
  if (t) {
    t.onclick = () => {
      const w = document.getElementById('locked-wrap');
      w.hidden = !w.hidden;
      t.innerHTML = w.hidden ? `<i data-icon="lock"></i> Show ${locked.length} still to unlock` : `<i data-icon="lock"></i> Hide badges still to unlock`;
    };
  }
}

/* ── Time helpers ────────────────────────────────────────── */
function secsOf(s) {
  if (typeof s.secondsSpent === 'number') return s.secondsSpent;
  return (s.minutesSpent || 0) * 60;
}
export function fmtTime(secs) {
  const m = Math.round(secs / 60);
  if (m < 1) return secs > 0 ? '<1m' : '0m';
  if (m < 60) return m + 'm';
  const h = Math.floor(m / 60), r = m % 60;
  return r ? `${h}h ${r}m` : `${h}h`;
}
function dayKey(ts) {
  const d = new Date(ts);
  return `${d.getFullYear()}-${d.getMonth()}-${d.getDate()}`;
}

function renderTimeStats(sessions, study) {
  const DAYS = 14;
  const now = new Date();
  const startToday = new Date(now.getFullYear(), now.getMonth(), now.getDate()).getTime();
  const quizDay = {}, studyDay = {};
  let total = 0, week = 0;
  const add = (map, date, secs) => {
    total += secs;
    map[dayKey(date)] = (map[dayKey(date)] || 0) + secs;
    if (date >= startToday - 6 * 86400000) week += secs;
  };
  sessions.forEach(s => { const secs = secsOf(s); if (s.date) add(quizDay, s.date, secs); else total += secs; });
  study.forEach(e => add(studyDay, e.date, e.secs));
  const today = (quizDay[dayKey(now)] || 0) + (studyDay[dayKey(now)] || 0);
  document.getElementById('time-today').textContent = fmtTime(today);
  document.getElementById('time-week').textContent  = fmtTime(week);
  document.getElementById('time-total').textContent = fmtTime(total);

  const days = [];
  for (let i = DAYS - 1; i >= 0; i--) {
    const d = new Date(now.getFullYear(), now.getMonth(), now.getDate() - i);
    const q = quizDay[dayKey(d)] || 0, st = studyDay[dayKey(d)] || 0;
    days.push({ d, q, st, secs: q + st, today: i === 0 });
  }
  const max = Math.max(60, ...days.map(x => x.secs));
  document.getElementById('day-bars').innerHTML = days.map(x => {
    const title = `${x.d.toLocaleDateString('en-GB', { weekday:'short', day:'numeric', month:'short' })}: ${fmtTime(x.secs)}` +
      (x.secs ? ` (quizzes ${fmtTime(x.q)}, studying ${fmtTime(x.st)})` : '');
    if (!x.secs) return `<div class="day-col" title="${title}"><div class="day-val"></div><div class="day-bar empty" style="height:2%"></div></div>`;
    const h = Math.max(4, Math.round((x.secs / max) * 100));
    return `<div class="day-col" title="${title}">
      <div class="day-val">${fmtTime(x.secs)}</div>
      <div class="day-stack" style="height:${h}%">
        ${x.st ? `<div class="day-bar day-bar-study" style="flex:${x.st}"></div>` : ''}
        ${x.q ? `<div class="day-bar" style="flex:${x.q}"></div>` : ''}
      </div>
    </div>`;
  }).join('');
  document.getElementById('day-labels').innerHTML = days.map(x =>
    `<span class="${x.today ? 'today' : ''}">${x.d.toLocaleDateString('en-GB', { weekday:'short' })}<br>${x.d.getDate()}</span>`
  ).join('');
}

/* ── Subjects: time, scores and trends ───────────────────────
   Each subject shows time spent, a recent score with its basis ("last 5
   quizzes"), the trend against the quizzes before, the all-time figure and
   a small score-over-time line. Tapping a subject opens its topics (recent
   score, trend, quizzes, last tried); tapping a topic shows its recent
   quizzes and the questions most often got wrong.
   "Review today" quizzes mix topics, so they're counted in time but kept
   out of subject and topic scores, and shown on a line of their own. */
const RECENT = 5;          // quizzes in the "recent" window
const MIN_TREND = 4;       // fewer quizzes than this: no trend yet
const isReview = s => s.topic === 'Review today';

// sessions newest first → { recent, before, n, all, dir, text }
export function scoreTrend(list) {
  const pcts = list.map(s => s.pct || 0);
  const n = pcts.length;
  const avg = a => a.length ? Math.round(a.reduce((x, y) => x + y, 0) / a.length) : null;
  if (!n) return { n: 0 };
  const k = Math.min(RECENT, Math.floor(n / 2) || 1);
  const recent = avg(pcts.slice(0, n >= MIN_TREND ? k : n));
  const before = n >= MIN_TREND ? avg(pcts.slice(k, k * 2)) : null;
  const all = avg(pcts);
  let dir = null;
  if (before !== null) dir = recent - before >= 5 ? 'up' : before - recent >= 5 ? 'down' : 'flat';
  const basis = n >= MIN_TREND ? `last ${k} quiz${k === 1 ? '' : 'zes'}` : `${n} quiz${n === 1 ? '' : 'zes'}`;
  return { n, k, recent, before, all, dir, basis };
}
const cls = v => v >= 80 ? 'st-good' : v >= 50 ? 'st-mid' : 'st-low';
function trendHtml(t) {
  if (!t.n) return 'No quizzes yet';
  const score = `<span class="${cls(t.recent)}" style="font-weight:700;">${t.recent}%</span>`;
  if (t.dir === null) return `${score} over ${t.basis} <span class="tr-note">· not enough quizzes for a trend yet</span>`;
  const arrow = { up: '↑', down: '↓', flat: '→' }[t.dir];
  const words = t.dir === 'up' ? `up from ${t.before}%` : t.dir === 'down' ? `down from ${t.before}%` : `steady (was ${t.before}%)`;
  return `${score} over ${t.basis} <span class="tr tr-${t.dir}">${arrow} ${words}</span>`;
}
// Small line of scores over time (oldest left), up to the last 20
function sparkHtml(list) {
  const pts = list.slice(0, 20).reverse().map(s => s.pct || 0);
  if (pts.length < 2) return '';
  const w = 120, h = 28, step = w / (pts.length - 1);
  const xy = pts.map((v, i) => `${(i * step).toFixed(1)},${(h - 2 - v / 100 * (h - 4)).toFixed(1)}`);
  return `<svg class="tr-spark" viewBox="0 0 ${w} ${h}" width="${w}" height="${h}" role="img" aria-label="Scores over the last ${pts.length} quizzes">
    <line x1="0" x2="${w}" y1="${(h - 2 - 0.5 * (h - 4)).toFixed(1)}" y2="${(h - 2 - 0.5 * (h - 4)).toFixed(1)}" class="tr-mid"/>
    <polyline points="${xy.join(' ')}" fill="none"/>
    <circle cx="${xy[xy.length - 1].split(',')[0]}" cy="${xy[xy.length - 1].split(',')[1]}" r="2.5"/></svg>`;
}
const day = t => t ? new Date(t).toLocaleDateString('en-GB', { day: 'numeric', month: 'short' }) : '';

function renderSubjectStats(sessions, study) {
  const subj = {};
  const row = name => subj[name] = subj[name] || { secs: 0, studySecs: 0, quizzes: [], last: 0 };
  const reviews = [];
  sessions.forEach(s => {
    if (isReview(s)) { reviews.push(s); }
    const r = row(s.subject || 'Other');
    r.secs += secsOf(s); r.last = Math.max(r.last, s.date || 0);
    if (!isReview(s)) r.quizzes.push(s);
  });
  study.forEach(e => {
    const r = row(e.subject || 'Other');
    r.secs += e.secs; r.studySecs += e.secs; r.last = Math.max(r.last, e.date || 0);
  });
  const rows = Object.entries(subj).sort((a, b) => b[1].secs - a[1].secs || b[1].quizzes.length - a[1].quizzes.length);
  const list = document.getElementById('subject-list');
  if (!rows.length) {
    list.innerHTML = '<div class="st-empty">Your subjects will appear here once you\'ve done a quiz or some studying.</div>';
    return;
  }
  const maxSecs = Math.max(1, ...rows.map(([, r]) => r.secs));
  list.innerHTML = rows.map(([name, r]) => {
    const t = scoreTrend(r.quizzes);
    const quizSecs = r.secs - r.studySecs;
    const parts = [
      r.studySecs ? `${fmtTime(r.studySecs)} studying` : '',
      t.n >= MIN_TREND ? `all time ${t.all}% over ${t.n} quizzes` : '',
      r.last ? 'last ' + day(r.last) : '',
    ].filter(Boolean);
    return `<details class="subject-row">
      <summary>
        <div class="subject-top">
          <div class="subject-name">${esc(name)} <span class="tr-open" aria-hidden="true">›</span></div>
          <div class="subject-time">${fmtTime(r.secs)}</div>
        </div>
        <div class="subject-track subject-track-split">
          <div class="subject-fill" style="width:${Math.round(quizSecs / maxSecs * 100)}%"></div><div class="subject-fill subject-fill-study" style="width:${Math.round(r.studySecs / maxSecs * 100)}%"></div>
        </div>
        <div class="tr-line"><div class="subject-meta">${trendHtml(t)}${parts.length ? `<br>${parts.join(' · ')}` : ''}</div>${sparkHtml(r.quizzes)}</div>
      </summary>
      <div class="tr-topics">${topicsHtml(r.quizzes)}</div>
    </details>`;
  }).join('') + (reviews.length ? (() => {
    const t = scoreTrend(reviews);
    return `<div class="subject-row tr-review"><div class="subject-top"><div class="subject-name">Reviews <span class="tr-note">(mixed topics, counted separately)</span></div></div>
      <div class="tr-line"><div class="subject-meta">${trendHtml(t)}</div>${sparkHtml(reviews)}</div></div>`;
  })() : '');
  if (!list.dataset.trWired) { list.dataset.trWired = '1'; list.addEventListener('toggle', onTopicToggle, true); }
}

// Topics inside a subject, weakest recent score first
function topicsHtml(quizzes) {
  if (!quizzes.length) return '<div class="tr-note">No quizzes in this subject yet.</div>';
  const topics = {};
  quizzes.forEach(s => {
    const mixed = !s.topicId && (!s.topic || s.topic === s.subject);
    const key = mixed ? '_mixed' : (s.topicId || s.topic);
    const t = topics[key] = topics[key] || { name: mixed ? 'Whole-subject quizzes' : (s.topic || 'Topic'), list: [], path: null };
    t.list.push(s);
    if (!t.path && s.groupId && s.subjectId && s.topicId) t.path = `content/${s.groupId}/subjects/${s.subjectId}/topics/${s.topicId}/questions`;
  });
  const items = Object.values(topics).map(t => ({ ...t, tr: scoreTrend(t.list), last: Math.max(...t.list.map(s => s.date || 0)) }))
    .sort((a, b) => a.tr.recent - b.tr.recent);
  return items.map(t => {
    const arrow = t.tr.dir ? `<span class="tr tr-${t.tr.dir}">${{ up: '↑', down: '↓', flat: '→' }[t.tr.dir]}</span>` : '';
    return `<details class="tr-topic" ${t.path ? `data-qpath="${esc(t.path)}"` : ''}>
      <summary><span class="tr-topic-name">${esc(t.name)}</span>
        <span class="tr-topic-stats"><span class="${cls(t.tr.recent)}" style="font-weight:700;">${t.tr.recent}%</span> ${arrow}
        <small>${t.tr.n} quiz${t.tr.n === 1 ? '' : 'zes'} · last ${day(t.last)}</small></span></summary>
      <div class="tr-topic-body">
        <div class="tr-note">${trendHtml(t.tr)}</div>
        <div class="tr-recent">${t.list.slice(0, 8).map(s => `<span class="tr-chip ${cls(s.pct || 0)}" title="${esc(day(s.date))}">${s.pct || 0}%</span>`).join('')}</div>
        <div class="tr-missed" data-missed='${esc(JSON.stringify(missedCounts(t.list)))}'></div>
      </div>
    </details>`;
  }).join('');
}

// Questions got wrong most often in these quizzes: [[id, wrong, tries]]
function missedCounts(list) {
  const c = {};
  list.forEach(s => (s.qs || []).forEach(q => { if (!q?.id) return; const e = c[q.id] = c[q.id] || [0, 0]; e[1]++; if (!q.ok) e[0]++; }));
  return Object.entries(c).filter(([, [w]]) => w > 0)
    .sort((a, b) => (b[1][0] / b[1][1]) - (a[1][0] / a[1][1]) || b[1][0] - a[1][0])
    .slice(0, 5).map(([id, [w, n]]) => [id, w, n]);
}

// Fetch the text of the most-missed questions the first time a topic opens
async function onTopicToggle(e) {
  const el = e.target;
  if (!el.matches?.('details.tr-topic') || !el.open || el.dataset.loaded) return;
  el.dataset.loaded = '1';
  const box = el.querySelector('.tr-missed');
  let missed = [];
  try { missed = JSON.parse(box.dataset.missed || '[]'); } catch (err) {}
  if (!missed.length) { box.innerHTML = '<div class="tr-note">No questions got wrong yet. Nice.</div>'; return; }
  const path = el.dataset.qpath;
  let texts = {};
  if (path) {
    box.innerHTML = '<div class="tr-note">Loading…</div>';
    try {
      const [{ db }, fs] = await Promise.all([
        import('./firebase-config.js?v=20261110q'),
        import('https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js'),
      ]);
      await Promise.all(missed.map(async ([id]) => {
        const snap = await fs.getDoc(fs.doc(db, path, id)).catch(() => null);
        const q = snap?.exists?.() ? snap.data() : null;
        if (q) texts[id] = q.question || q.sentence || q.statement || q.prompt || (q.type === 'match' ? 'Match the pairs' : 'Question');
      }));
    } catch (err) { console.warn('Could not load questions', err); }
  }
  box.innerHTML = `<div class="tr-missed-head">Most often wrong</div>` + missed.map(([id, w, n]) =>
    `<div class="tr-missed-row"><span>${esc(texts[id] || 'A question that has since been changed or removed')}</span><small>${w} of ${n} wrong</small></div>`).join('');
}

function esc(str) {
  return String(str || '').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
}
