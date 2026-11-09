// ============================================================
// CLASP: shared stats & badges (used by hub.html and profile.html)
// Next goals, revision time, time by subject, badge collection.
// ============================================================

import { BADGE_FAMILIES, TIERS, badgeProgress, studyEntries } from './gamification.js?v=20261109b';

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

function renderSubjectStats(sessions, study) {
  const subj = {};
  const row = name => subj[name] = subj[name] || { secs: 0, studySecs: 0, quizzes: 0, pctSum: 0, last: 0 };
  sessions.forEach(s => {
    const r = row(s.subject || 'Other');
    r.secs += secsOf(s); r.quizzes++; r.pctSum += (s.pct || 0); r.last = Math.max(r.last, s.date || 0);
  });
  study.forEach(e => {
    const r = row(e.subject || 'Other');
    r.secs += e.secs; r.studySecs += e.secs; r.last = Math.max(r.last, e.date || 0);
  });
  const rows = Object.entries(subj).sort((a, b) => b[1].secs - a[1].secs || b[1].quizzes - a[1].quizzes);
  const list = document.getElementById('subject-list');
  if (!rows.length) {
    list.innerHTML = '<div class="st-empty">Your subjects will appear here once you\'ve done a quiz or some studying.</div>';
    return;
  }
  const maxSecs = Math.max(1, ...rows.map(([, r]) => r.secs));
  list.innerHTML = rows.map(([name, r]) => {
    const avg = r.quizzes ? Math.round(r.pctSum / r.quizzes) : null;
    const cls = avg >= 80 ? 'st-good' : avg >= 50 ? 'st-mid' : 'st-low';
    const last = r.last ? new Date(r.last).toLocaleDateString('en-GB', { day:'numeric', month:'short' }) : '';
    const quizSecs = r.secs - r.studySecs;
    const parts = [
      r.quizzes ? `${r.quizzes} quiz${r.quizzes !== 1 ? 'zes' : ''} · avg <span class="${cls}" style="font-weight:700;">${avg}%</span>` : 'No quizzes yet',
      r.studySecs ? `${fmtTime(r.studySecs)} studying` : '',
      last ? 'last ' + last : '',
    ].filter(Boolean);
    return `<div class="subject-row">
      <div class="subject-top">
        <div class="subject-name">${esc(name)}</div>
        <div class="subject-time">${fmtTime(r.secs)}</div>
      </div>
      <div class="subject-track subject-track-split">
        <div class="subject-fill" style="width:${Math.round(quizSecs / maxSecs * 100)}%"></div><div class="subject-fill subject-fill-study" style="width:${Math.round(r.studySecs / maxSecs * 100)}%"></div>
      </div>
      <div class="subject-meta">${parts.join(' · ')}</div>
    </div>`;
  }).join('');
}

function esc(str) {
  return String(str || '').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
}
