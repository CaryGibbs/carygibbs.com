// ============================================================
// CLASP: shared sidebar for the adult pages (parent, admin, teacher)
// One navigation, same sections and labels everywhere:
//   Students · My students, then "View as <student>" shortcuts
//   Content  · Groups & questions, Users          (admin only)
//   Settings                                       (admin only)
//   Account  · name, role, Sign out
// On phones the sidebar becomes a slide-out menu.
// ============================================================

import { db } from './firebase-config.js';
import { handleSignOut, openViewAs, viewsOf, rememberView } from './auth.js';
import { themeColour } from './themes.js';
import { collection, getDocs } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";

const esc = s => String(s ?? '').replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
const onAdminPage = () => /admin\.html$/.test(location.pathname);

// Each adult page belongs to one "view". The view is shown clearly
// (coloured label in the sidebar, a chip in the page header, the tab
// title) so it's always obvious which role you're acting in.
export const VIEWS = {
  parent:  { label: 'Parent view',  icon: 'house',  colour: '#0ca678', home: 'parent.html' },
  admin:   { label: 'Admin view',   icon: 'shield', colour: '#4f46e5', home: 'admin.html' },
  teacher: { label: 'Teacher view', icon: 'school', colour: '#e8590c', home: 'teacher-dashboard.html' },
};

// view:   'parent' | 'admin' | 'teacher'  (which workspace this page is)
// active: 'children' | 'groups' | 'questions' | 'users' | 'settings' | 'classes'
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
  if (!/·/.test(document.title)) document.title = `${document.title.replace(/^Clasp\s*[—-]\s*/, 'Clasp — ')} · ${V.label}`;

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
      <div class="nav-section-label">Students</div>
      <a class="nav-item${active === 'children' ? ' active' : ''}" href="parent.html">
        <span class="nav-icon"><i data-icon="users"></i></span><span>My students</span>
      </a>
      <div id="shell-children"></div>`,
    teacher: `
      <div class="nav-section-label">Teaching</div>
      <a class="nav-item${active === 'classes' ? ' active' : ''}" href="teacher-dashboard.html">
        <span class="nav-icon"><i data-icon="school"></i></span><span>My classes</span>
      </a>`,
    admin: `
      <div class="nav-section-label">Content</div>
      ${adminLink('groups', 'folder', 'Revision packs')}
      ${onAdminPage() ? `<a class="nav-item nav-sub" href="#questions" data-nav="questions" id="nav-questions-btn" style="display:none;"><span class="nav-icon"><i data-icon="circle-help"></i></span><span>Current topic</span></a>` : ''}
      <div class="nav-section-label">People</div>
      ${adminLink('users', 'user', 'Users & roles')}
      ${onAdminPage() ? `<a class="nav-item nav-sub" href="#users"><span class="nav-icon"><i data-icon="eye"></i></span><span>View as a student</span></a>` : `<a class="nav-item nav-sub" href="admin.html#users"><span class="nav-icon"><i data-icon="eye"></i></span><span>View as a student</span></a>`}
      <div class="nav-section-label">Settings</div>
      ${adminLink('settings', 'settings', 'Settings')}`,
  };
  const navHtml = sections[view] || '';

  const sidebar = document.getElementById('app-sidebar');
  sidebar.classList.add('sidebar');
  sidebar.innerHTML = `
    <div class="sidebar-logo">
      <a href="${V.home}" class="sidebar-brand">
        <span class="sidebar-logo-icon"><i data-icon="graduation-cap"></i></span>
        <span>Clasp</span>
      </a>
      <button class="sidebar-close" aria-label="Close menu"><i data-icon="x"></i></button>
    </div>
    <div class="sidebar-view">${viewBlock}</div>
    <nav class="sidebar-nav">${navHtml}
    </nav>
    <div class="sidebar-footer">
      <div class="sidebar-account">
        <span class="sidebar-avatar">${esc(initials)}</span>
        <span class="sidebar-account-text"><strong>${esc(profile.name || 'Account')}</strong><small>${esc(accountRole)} · ${esc(profile.email || '')}</small></span>
      </div>
      <button class="nav-item" id="shell-signout"><span class="nav-icon"><i data-icon="log-out"></i></span><span>Sign out</span></button>
    </div>`;

  // Highlight the right admin item
  if (active && !['children', 'classes'].includes(active)) sidebar.querySelector(`[data-nav="${active}"], [href="admin.html#${active}"]`)?.classList.add('active');

  // A chip in the page header repeats the view, so it's visible on phones too
  const topbar = document.querySelector('.app-layout .topbar');
  if (topbar && !topbar.querySelector('.view-chip')) {
    const actions = topbar.querySelector('.topbar-actions') || topbar;
    actions.insertAdjacentHTML('afterbegin', `<span class="view-chip" style="--c:${V.colour}"><i data-icon="${V.icon}"></i> ${V.label}</span>`);
  }

  // Phone: menu button + overlay
  if (!document.getElementById('shell-mobilebar')) {
    document.body.insertAdjacentHTML('afterbegin', `
      <div class="shell-mobilebar" id="shell-mobilebar">
        <button class="shell-menu-btn" aria-label="Open menu"><i data-icon="menu"></i></button>
        <span class="sidebar-logo-icon"><i data-icon="graduation-cap"></i></span><span class="shell-mobile-title">Clasp</span><span class="view-chip" style="--c:${V.colour}"><i data-icon="${V.icon}"></i> ${V.label}</span>
      </div>
      <div class="shell-scrim" id="shell-scrim"></div>`);
  }
  const open = () => document.body.classList.add('shell-open');
  const close = () => document.body.classList.remove('shell-open');
  document.querySelector('.shell-menu-btn').onclick = open;
  document.getElementById('shell-scrim').onclick = close;
  sidebar.querySelector('.sidebar-close').onclick = close;
  sidebar.addEventListener('click', e => { if (e.target.closest('a.nav-item, button.nav-item')) close(); });
  document.getElementById('shell-signout').onclick = () => handleSignOut();

  if (view === 'parent') loadChildShortcuts(user);
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
