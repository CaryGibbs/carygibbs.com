// ============================================================
// BONCE: shared pieces for the Home pages (parent, teacher, admin)
// Each Home has the same shape: greeting, tiles at a glance,
// "Needs your attention", "Recent activity", then a summary list.
// Styles live in ui.css (.home-*).
// ============================================================

export const DAY = 86400000;
export const esc = s => String(s ?? '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

export function startOfDay(t = Date.now()) { const d = new Date(t); return new Date(d.getFullYear(), d.getMonth(), d.getDate()).getTime(); }

export function greeting(name) {
  const h = new Date().getHours();
  return `${h < 12 ? 'Good morning' : h < 18 ? 'Good afternoon' : 'Good evening'}${name ? ', ' + name : ''}`;
}
export function todayText() {
  return new Date().toLocaleDateString('en-GB', { weekday: 'long', day: 'numeric', month: 'long' });
}

export function agoText(t) {
  const days = Math.round((startOfDay() - startOfDay(t)) / DAY);
  if (days <= 0) {
    const mins = Math.round((Date.now() - t) / 60000);
    return mins < 60 ? `${Math.max(1, mins)} min ago` : `${Math.round(mins / 60)}h ago`;
  }
  if (days === 1) return 'yesterday';
  if (days < 7) return new Date(t).toLocaleDateString('en-GB', { weekday: 'long' });
  return new Date(t).toLocaleDateString('en-GB', { day: 'numeric', month: 'short' });
}

// The page's top section: date, greeting, line underneath, quick buttons
export function helloHtml({ name, sub, actions = '' }) {
  return `<div class="home-hello">
    <div><div class="home-date">${todayText()}</div>
      <h1 class="home-greeting">${esc(greeting(name))}</h1>
      <p class="home-sub">${sub}</p></div>
    <div class="home-quick">${actions}</div></div>`;
}

// tiles: [{ value, label }]
export function tilesHtml(tiles) {
  return `<div class="home-tiles">${tiles.map(t => `<div class="home-tile"><b>${t.value}</b><span>${t.label}</span></div>`).join('')}</div>`;
}

// items: [{ emoji, text, sub, action }] (already in priority order)
export function attentionHtml(items, emptyText = '✅ All good: nothing needs you right now.', limit = 6) {
  const list = items.length
    ? items.slice(0, limit).map(i => `<div class="att-item"><span class="att-emoji">${i.emoji}</span><div class="att-text">${i.text}${i.sub ? `<small>${i.sub}</small>` : ''}</div>${i.action || ''}</div>`).join('')
      + (items.length > limit ? `<div class="att-item"><span class="att-emoji"></span><div class="att-text"><small>…and ${items.length - limit} more</small></div></div>` : '')
    : `<div class="home-empty">${emptyText}</div>`;
  return `<div class="home-card"><h3><i data-icon="circle-alert"></i> Needs your attention</h3>${list}</div>`;
}

// events: [{ t, html }] where html is the inside of one row
export function activityHtml(events, emptyText = 'Nothing in the last 7 days.', limit = 8) {
  const list = events.length
    ? events.slice().sort((a, b) => b.t - a.t).slice(0, limit).map(e => `<div class="act-item">${e.html}</div>`).join('')
    : `<div class="home-empty">${emptyText}</div>`;
  return `<div class="home-card"><h3><i data-icon="clock"></i> Recent activity</h3>${list}</div>`;
}

export function dotHtml(letter, colour = '#1f5a66') {
  return `<span class="act-dot" style="background:${colour}22;color:${colour}">${esc(letter)}</span>`;
}

export function smallBtn(label, onclick, primary = false) {
  return `<button class="btn ${primary ? 'btn-primary' : 'btn-secondary'}" onclick="${onclick}">${label}</button>`;
}
