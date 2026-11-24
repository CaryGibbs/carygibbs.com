// ============================================================
// CLASP: shared sidebar for the adult pages (parent, admin, teacher)
// One navigation, same sections and labels everywhere:
//   My Family · My students, then "View as <student>" shortcuts (parent view)
//   Content  · Groups & questions, Users          (admin only)
//   Settings                                       (admin only)
//   Account  · name, role, Sign out
// On phones the sidebar becomes a slide-out menu.
// ============================================================

import { db } from './firebase-config.js?v=20261124l';
import { handleSignOut, openViewAs, viewsOf, rememberView, isPlusTier, hasFamilyPlus } from './auth.js?v=20261124l';
import { themeColour } from './themes.js?v=20261124l';
import { collection, getDocs, query, where, getCountFromServer } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";
import { openAccountSettings } from './account-settings.js?v=20261124l';
import { plusPillHtml } from './plus.js?v=20261124l';

const esc = s => String(s ?? '').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
const onAdminPage = () => /admin\.html$/.test(location.pathname) && !new URLSearchParams(location.search).get('mine');
// "My packs": the pack builder, opened for a parent or teacher
const myPacksLink = (view, active) => `<a class="nav-item${active === 'packs' ? ' active' : ''}" href="admin.html?mine=${view}">
        <span class="nav-icon"><i data-icon="folder"></i></span><span>My packs</span>
      </a>`;

// Each adult page belongs to one "view". The view is shown clearly
// (coloured label in the sidebar, a chip in the page header, the tab
// title) so it's always obvious which role you're acting in.
export const VIEWS = {
  parent:  { label: 'Parent view',  icon: 'house',  colour: '#0d8a7c', home: 'parent.html' },
  admin:   { label: 'Admin view',   icon: 'shield', colour: '#8e2c6b', home: 'admin.html' },
  teacher: { label: 'Teacher view', icon: 'school', colour: '#3f5bd0', home: 'teacher-dashboard.html' },
};

// view:   'parent' | 'admin' | 'teacher'  (which workspace this page is)
// active: 'children' | 'groups' | 'questions' | 'users' | 'settings' | 'classes' | 'packs'
// The sidebar shows the sections for the current view only; people with
// several roles switch view at the top.
export function mountShell(user, profile, { view, active } = {}) {
  const views = viewsOf(profile);
  view = view || views[views.length - 1] || 'parent';
  const V = VIEWS[view];
  const roleNames = { parent: 'Parent', teacher: 'Teacher', admin: 'Admin' };
  const accountRole = views.map(v => roleNames[v]).reverse().join(' · ') || 'Account';
  const initials = (profile.name || '?').split(' ').map(w => w[0]).join('').toUpperCase().slice(0, 2);
  rememberView(user.uid, view);

  // Colour the whole page chrome with the view's colour
  document.body.dataset.view = view;
  document.body.style.setProperty('--view-colour', V.colour);
  if (!/·/.test(document.title)) document.title = `${document.title.replace(/^(Clasp|Bonce|Lobe Limpet)\s*[—-]\s*/, 'Lobe Limpet — ')} · ${V.label}`;

  // On the admin page, admin links switch panels in place (data-nav);
  // elsewhere they open the admin page at that panel.
  const adminLink = (panel, icon, label, extra = '') => onAdminPage()
    ? `<a class="nav-item" href="#${panel}" data-nav="${panel}" ${extra}><span class="nav-icon"><i data-icon="${icon}"></i></span><span>${label}</span></a>`
    : `<a class="nav-item" href="admin.html#${panel}" ${extra}><span class="nav-icon"><i data-icon="${icon}"></i></span><span>${label}</span></a>`;

  // Several roles: a switch. One role: a fixed label.
  const viewBlock = views.length > 1 ? `
      <div class="view-switch${views.length > 2 ? ' view-switch-3' : ''}" role="tablist" aria-label="Switch view" style="grid-template-columns:repeat(${views.length},1fr)">
        ${views.map(k => `<a role="tab" href="${VIEWS[k].home}" class="view-switch-opt${k === view ? ' on' : ''}" style="--c:${VIEWS[k].colour}" aria-selected="${k === view}"><i data-icon="${VIEWS[k].icon}"></i> ${roleNames[k]}</a>`).join('')}
      </div>` : `
      <div class="view-label" style="--c:${V.colour}"><i data-icon="${V.icon}"></i> ${V.label}</div>`;

  const sections = {
    parent: `
      <div class="nav-section-label">My Family</div>
      <a class="nav-item${active === 'home' ? ' active' : ''}" href="parent.html#home" data-ph="home">
        <span class="nav-icon"><i data-icon="house"></i></span><span>Home</span>
      </a>
      <a class="nav-item${active === 'children' ? ' active' : ''}" href="parent.html#students" data-ph="students">
        <span class="nav-icon"><i data-icon="users"></i></span><span>My students</span>
      </a>
      ${myPacksLink('parent', active)}
      <a class="nav-item" href="parent.html?firststeps=1#home"><span class="nav-icon"><i data-icon="list-checks"></i></span><span>Getting started</span></a>
      <div id="shell-children"></div>`,
    teacher: `
      <div class="nav-section-label">Teaching</div>
      <a class="nav-item${active === 'home' ? ' active' : ''}" href="teacher-dashboard.html#home" data-ph="home">
        <span class="nav-icon"><i data-icon="house"></i></span><span>Home</span>
      </a>
      <a class="nav-item${active === 'classes' ? ' active' : ''}" href="teacher-dashboard.html#classes" data-ph="classes">
        <span class="nav-icon"><i data-icon="school"></i></span><span>My classes</span>
      </a>
      ${myPacksLink('teacher', active)}
      <a class="nav-item" href="teacher-dashboard.html?firststeps=1#home"><span class="nav-icon"><i data-icon="list-checks"></i></span><span>Getting started</span></a>`,
    admin: `
      ${adminLink('home', 'house', 'Home')}
      <div class="nav-section-label">Content</div>
      ${adminLink('groups', 'folder', 'Revision packs')}
      ${adminLink('library', 'library', 'Community library')}
      ${adminLink('sharedcards', 'key-round', 'Shared flashcards')}
      ${onAdminPage() ? `<a class="nav-item nav-sub" href="#questions" data-nav="questions" id="nav-questions-btn" style="display:none;"><span class="nav-icon"><i data-icon="circle-help"></i></span><span>Current topic</span></a>` : ''}
      <div class="nav-section-label">People</div>
      ${adminLink('users', 'user', 'Users & roles')}
      ${adminLink('students', 'graduation-cap', 'All students')}
      ${adminLink('support', 'inbox', 'Support<span class="nav-count" id="nav-support-count" hidden></span>')}
      ${adminLink('news', 'send', 'News email')}
      <div class="nav-section-label">Settings</div>
      ${adminLink('settings', 'settings', 'Settings')}
      ${adminLink('logs', 'clipboard-list', 'Activity log')}`,
  };
  const navHtml = sections[view] || '';

  const sidebar = document.getElementById('app-sidebar');
  sidebar.classList.add('sidebar');
  sidebar.innerHTML = `
    <div class="sidebar-logo">
      <a href="${V.home}" class="sidebar-brand">
        <span class="sidebar-logo-icon"><svg class="brand-mark" viewBox="0 0 100 100" aria-hidden="true"><path d="M2 89 Q5 81 16 81 H84 Q95 81 98 89 V93 a4 4 0 0 1 -4 4 H6 a4 4 0 0 1 -4 -4 Z" fill="#5d7c89"/><path d="M8 83 C7 42 26 14 50 13 C74 14 93 42 92 83 Q87 88 82 83 Q77 88 72 83 Q67 88 61.5 83 Q56 88 50 83 Q44 88 38.5 83 Q33 88 28 83 Q23 88 18 83 Q13 88 8 83 Z" fill="#ff7a59"/><path d="M20 54 C21 40 27 30 35 23" fill="none" stroke="#fff" stroke-opacity=".4" stroke-width="5" stroke-linecap="round"/><g fill="none" stroke="#c94a28" stroke-width="3.4" stroke-linecap="round" stroke-linejoin="round"><path d="M50 15 C46 23 54 30 50 37 C47 42 52 45 50 48"/><path d="M24 47 C25 41 31 40 33 44 C35 48 41 46 40 40"/><path d="M31 30 C34 25 40 26 40 30 C40 34 45 34 45 28"/><path d="M76 47 C75 41 69 40 67 44 C65 48 59 46 60 40"/><path d="M69 30 C66 25 60 26 60 30 C60 34 55 34 55 28"/></g><ellipse cx="28" cy="70" rx="5.5" ry="3.4" fill="#ffc2b0"/><ellipse cx="72" cy="70" rx="5.5" ry="3.4" fill="#ffc2b0"/><circle cx="39" cy="62" r="7.5" fill="#123a4a"/><circle cx="61" cy="62" r="7.5" fill="#123a4a"/><circle cx="36.5" cy="59" r="2.8" fill="#fff"/><circle cx="58.5" cy="59" r="2.8" fill="#fff"/><circle cx="41.5" cy="65" r="1.2" fill="#fff"/><circle cx="63.5" cy="65" r="1.2" fill="#fff"/><path d="M45.5 70 Q50 74.5 54.5 70" fill="none" stroke="#123a4a" stroke-width="2.6" stroke-linecap="round"/></svg></span>
        <span class="brand-word">lobe <span class="brand-accent">limpet</span></span>
      </a>
      <button class="sidebar-close" aria-label="Close menu"><i data-icon="x"></i></button>
    </div>
    <div class="sidebar-view">${viewBlock}</div>
    <nav class="sidebar-nav">${navHtml}
    </nav>
    <div class="sidebar-footer">
      <a class="nav-item" href="./"><span class="nav-icon"><i data-icon="globe"></i></span><span>Lobe Limpet website</span></a>
      <a class="nav-item" href="help.html#menu-${view}" target="_blank" rel="noopener"><span class="nav-icon"><i data-icon="circle-help"></i></span><span>Help</span></a>
      ${!isPlusTier(profile) && !hasFamilyPlus(profile) && !viewsOf(profile).includes('admin') ? `<a class="nav-item" href="plus.html" style="color:#e0643f;font-weight:700;"><span class="nav-icon"><i data-icon="sparkles"></i></span><span>Upgrade to Plus</span></a>` : ''}
      <button class="sidebar-account" id="shell-account" title="Account settings" aria-label="Account settings for ${esc(profile.name || 'you')}">
        <span class="sidebar-avatar">${esc(initials)}</span>
        <span class="sidebar-account-text"><strong>${esc(profile.name || 'Account')}</strong><small>${esc(accountRole)} · ${esc(profile.email || '')}</small></span>
        <span class="sidebar-account-cog" aria-hidden="true"><i data-icon="settings"></i></span>
      </button>
      <button class="nav-item" id="shell-signout"><span class="nav-icon"><i data-icon="log-out"></i></span><span>Sign out</span></button>
    </div>`;

  // Highlight the right admin item
  if (active && !['children', 'classes', 'home', 'packs'].includes(active)) sidebar.querySelector(`[data-nav="${active}"], [href="admin.html#${active}"]`)?.classList.add('active');

  // A chip in the page header repeats the view, so it's visible on phones too
  const topbar = document.querySelector('.app-layout .topbar');
  if (topbar && !topbar.querySelector('.view-chip')) {
    const actions = topbar.querySelector('.topbar-actions') || topbar;
    actions.insertAdjacentHTML('afterbegin', `${plusPillHtml(profile)}<span class="view-chip" style="--c:${V.colour}"><i data-icon="${V.icon}"></i> ${V.label}</span>`);
  }

  // Phone: menu button + overlay
  if (!document.getElementById('shell-mobilebar')) {
    document.body.insertAdjacentHTML('afterbegin', `
      <div class="shell-mobilebar" id="shell-mobilebar">
        <button class="shell-menu-btn" aria-label="Open menu"><i data-icon="menu"></i></button>
        <span class="sidebar-logo-icon"><svg class="brand-mark" viewBox="0 0 100 100" aria-hidden="true"><path d="M2 89 Q5 81 16 81 H84 Q95 81 98 89 V93 a4 4 0 0 1 -4 4 H6 a4 4 0 0 1 -4 -4 Z" fill="#5d7c89"/><path d="M8 83 C7 42 26 14 50 13 C74 14 93 42 92 83 Q87 88 82 83 Q77 88 72 83 Q67 88 61.5 83 Q56 88 50 83 Q44 88 38.5 83 Q33 88 28 83 Q23 88 18 83 Q13 88 8 83 Z" fill="#ff7a59"/><path d="M20 54 C21 40 27 30 35 23" fill="none" stroke="#fff" stroke-opacity=".4" stroke-width="5" stroke-linecap="round"/><g fill="none" stroke="#c94a28" stroke-width="3.4" stroke-linecap="round" stroke-linejoin="round"><path d="M50 15 C46 23 54 30 50 37 C47 42 52 45 50 48"/><path d="M24 47 C25 41 31 40 33 44 C35 48 41 46 40 40"/><path d="M31 30 C34 25 40 26 40 30 C40 34 45 34 45 28"/><path d="M76 47 C75 41 69 40 67 44 C65 48 59 46 60 40"/><path d="M69 30 C66 25 60 26 60 30 C60 34 55 34 55 28"/></g><ellipse cx="28" cy="70" rx="5.5" ry="3.4" fill="#ffc2b0"/><ellipse cx="72" cy="70" rx="5.5" ry="3.4" fill="#ffc2b0"/><circle cx="39" cy="62" r="7.5" fill="#123a4a"/><circle cx="61" cy="62" r="7.5" fill="#123a4a"/><circle cx="36.5" cy="59" r="2.8" fill="#fff"/><circle cx="58.5" cy="59" r="2.8" fill="#fff"/><circle cx="41.5" cy="65" r="1.2" fill="#fff"/><circle cx="63.5" cy="65" r="1.2" fill="#fff"/><path d="M45.5 70 Q50 74.5 54.5 70" fill="none" stroke="#123a4a" stroke-width="2.6" stroke-linecap="round"/></svg></span><span class="shell-mobile-title"><span class="brand-word">lobe <span class="brand-accent">limpet</span></span></span><span class="view-chip" style="--c:${V.colour}"><i data-icon="${V.icon}"></i> ${V.label}</span>
      </div>
      <div class="shell-scrim" id="shell-scrim"></div>`);
    document.querySelector('#shell-mobilebar .view-chip')?.insertAdjacentHTML('beforebegin', plusPillHtml(profile, { short: true }));
  }
  const open = () => document.body.classList.add('shell-open');
  const close = () => document.body.classList.remove('shell-open');
  document.querySelector('.shell-menu-btn').onclick = open;
  document.getElementById('shell-scrim').onclick = close;
  sidebar.querySelector('.sidebar-close').onclick = close;
  sidebar.addEventListener('click', e => { if (e.target.closest('a.nav-item, button.nav-item')) close(); });
  document.getElementById('shell-signout').onclick = () => handleSignOut();
  document.getElementById('shell-account').onclick = () => { close(); openAccountSettings({ user, profile }); };
  if (!document.getElementById('shell-account-style')) document.head.insertAdjacentHTML('beforeend', `<style id="shell-account-style">
    button.sidebar-account { width: 100%; background: none; border: 0; border-radius: 10px; font: inherit; text-align: left; cursor: pointer; color: inherit; }
    button.sidebar-account:hover, button.sidebar-account:focus-visible { background: var(--color-surface-2); }
    .sidebar-account-cog { margin-left: auto; color: var(--color-text-muted); display: inline-flex; flex-shrink: 0; }
    .sidebar-account-cog svg { width: 16px; height: 16px; }
    .nav-count { margin-left: 8px; display: inline-block; min-width: 20px; padding: 1px 6px; border-radius: 999px; background: #ff7a59; color: #fff; font-size: 0.7rem; font-weight: 700; text-align: center; line-height: 1.5; }
    .nav-count[hidden] { display: none; }</style>`);

  if (view === 'parent') loadChildShortcuts(user);
  if (view === 'admin') loadSupportCount();
}

// Admin: how many support messages are waiting (badge on "Support")
async function loadSupportCount() {
  const b = document.getElementById('nav-support-count');
  if (!b) return;
  try {
    const n = (await getCountFromServer(query(collection(db, 'supportRequests'), where('status', '==', 'new')))).data().count;
    b.textContent = n; b.hidden = !n;
  } catch (e) { /* rules not published yet, or offline */ }
}

// "View as" shortcuts for each of the user's students
async function loadChildShortcuts(user) {
  const wrap = document.getElementById('shell-children');
  if (!wrap) return;
  const snap = await getDocs(collection(db, 'users', user.uid, 'children')).catch(() => null);
  const kids = [];
  snap?.forEach(d => kids.push({ id: d.id, ...d.data() }));
  kids.sort((a, b) => (a.name || '').localeCompare(b.name || ''));
  wrap.innerHTML = kids.map(k => {
    const c = themeColour(k.theme);
    return `<button class="nav-item nav-sub" data-view-as="${esc(k.id)}" title="Open ${esc(k.name)}'s hub in a new window">
      <span class="nav-icon"><span class="nav-dot" style="background:${c}22;color:${c}">${esc((k.name || '?')[0])}</span></span>
      <span>View as ${esc((k.name || '').split(' ')[0])}</span><i data-icon="external-link" class="nav-trail"></i>
    </button>`;
  }).join('');
  wrap.querySelectorAll('[data-view-as]').forEach(b => b.onclick = () => openViewAs(b.dataset.viewAs));
}

// Keep the sidebar's student list fresh after adding/removing a student
export function refreshShellChildren(user, profile) {
  loadChildShortcuts(user);
}
