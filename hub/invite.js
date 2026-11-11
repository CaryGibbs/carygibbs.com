// ============================================================
// LOBE LIMPET: invitations
// A parent (or an admin) invites someone by email. The invite is saved
// as invites/{code} and shared as a link: login.html?invite=CODE.
//   { email, name, role, studentIds, studentNames, by, byName,
//     createdAt, expiresAt, usedBy, usedAt }
// The person opening the link either creates an account or signs in
// with the invited email; either way they get the role and the shared
// students. Invites last 14 days and work once.
// Admins can invite as Parent, Teacher or Admin; parents as Parent.
// ============================================================

import { db } from './firebase-config.js?v=20261111k';
import { saveEmailIndex } from './email-index.js?v=20261111k';
import { doc, getDoc, setDoc, updateDoc, arrayUnion } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";
import { logEvent } from './log.js?v=20261111k';

export const INVITE_DAYS = 14;
export const ROLE_LABEL = { parent: 'Parent', teacher: 'Teacher', admin: 'Admin' };

const esc = s => String(s ?? '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

function newCode() {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  const a = new Uint32Array(10); crypto.getRandomValues(a);
  return [...a].map(n => chars[n % chars.length]).join('');
}
function hubUrl(file) { return new URL(file, location.href).href.split('#')[0]; }
export function inviteLink(code) { return hubUrl(`login.html?invite=${code}`); }
export function signupLink(type = 'parent') { return hubUrl(`login.html?signup=${type}`); }

export async function createInvite({ email, name, role = 'parent', students = [], byUid, byName }) {
  const code = newCode();
  const data = {
    email: email.trim().toLowerCase(), name: name.trim(), role,
    studentIds: students.map(s => s.id), studentNames: students.map(s => s.name || ''),
    by: byUid, byName: byName || '',
    createdAt: Date.now(), expiresAt: Date.now() + INVITE_DAYS * 86400000,
    usedBy: null,
  };
  await setDoc(doc(db, 'invites', code), data);
  logEvent('account.invite', { target: data.name || data.email, detail: `As ${ROLE_LABEL[role]}${students.length ? ' · shared ' + data.studentNames.join(', ') : ''}` });
  return { code, link: inviteLink(code), data };
}

// Returns { ok, invite, reason }
export async function readInvite(code) {
  code = String(code || '').toUpperCase().replace(/[^A-Z0-9]/g, '');
  if (!code) return { ok: false, reason: 'missing' };
  const snap = await getDoc(doc(db, 'invites', code)).catch(() => null);
  if (!snap || !snap.exists()) return { ok: false, reason: 'notfound' };
  const invite = { code, ...snap.data() };
  if (invite.usedBy) return { ok: false, invite, reason: 'used' };
  if (invite.expiresAt && invite.expiresAt < Date.now()) return { ok: false, invite, reason: 'expired' };
  return { ok: true, invite };
}

export function emailMatches(invite, email) {
  return !invite.email || invite.email === String(email || '').trim().toLowerCase();
}

// Give the role and the shared students to an account (new or existing).
// profile is null when the login exists but has no profile record yet
// (e.g. a sign-up that never finished): one is created from the invite.
export async function acceptInvite(invite, uid, profile = {}, email = '') {
  const missing = !profile;
  profile = profile || {};
  const roles = new Set(Array.isArray(profile.roles) && profile.roles.length ? profile.roles : [profile.role].filter(Boolean));
  roles.add(invite.role);
  if (invite.role === 'admin') roles.add('parent');
  roles.delete('student');
  const list = [...roles];
  const primary = ['admin', 'teacher', 'parent'].find(r => list.includes(r)) || 'parent';
  if (missing) {
    await setDoc(doc(db, 'users', uid), {
      name: invite.name || '', email: (email || invite.email || '').toLowerCase(),
      roles: list, role: primary, theme: 'parent', createdAt: Date.now(), children: {},
      inviteCode: invite.code,   // the security rules check the invite allows these roles
    }, { merge: true });
  } else {
    await updateDoc(doc(db, 'users', uid), { roles: list, role: primary, inviteCode: invite.code });
  }
  for (const sid of invite.studentIds || []) {
    const s = await getDoc(doc(db, 'users', sid)).catch(() => null);
    const st = s?.exists() ? s.data() : {};
    await updateDoc(doc(db, 'users', sid), { guardianIds: arrayUnion(uid), lastInvite: invite.code }).catch(() => {});
    await setDoc(doc(db, 'users', uid, 'children', sid), {
      name: st.name || '', email: st.email || '', theme: st.theme || 'edge',
      groupIds: st.groupIds || [], createdAt: Date.now(), sharedBy: invite.by || '',
    }, { merge: true }).catch(() => {});
  }
  await updateDoc(doc(db, 'invites', invite.code), { usedBy: uid, usedAt: Date.now() }).catch(() => {});
  await saveEmailIndex(uid, email || invite.email || profile.email, profile.name || invite.name || '', list);
  logEvent('account.invite_accept', { as: { uid, name: profile.name || invite.name || invite.email, role: invite.role }, target: invite.byName || '', detail: `As ${ROLE_LABEL[invite.role]}${(invite.studentNames || []).length ? ' · ' + invite.studentNames.join(', ') : ''}` });
}

/* ── Invite dialog (parent page and admin) ─────────────────── */
const CSS = `
.iv-overlay { position: fixed; inset: 0; background: rgba(15,15,20,0.55); z-index: 2000; display: flex; align-items: flex-start; justify-content: center; padding: 6vh 12px; overflow-y: auto; }
.iv-modal { background: var(--color-surface); color: var(--color-text); border-radius: var(--radius-card); width: 100%; max-width: 480px; padding: 22px; box-shadow: 0 24px 64px rgba(0,0,0,0.3); font-family: var(--font-body); }
.iv-head { display: flex; justify-content: space-between; gap: 12px; align-items: flex-start; margin-bottom: 4px; }
.iv-head h2 { font-family: var(--font-heading); font-size: 1.3rem; font-weight: 800; }
.iv-close { background: none; border: 1px solid var(--color-border); border-radius: 50%; width: 36px; height: 36px; cursor: pointer; color: var(--color-text); font-size: 1.1rem; flex-shrink: 0; }
.iv-sub { color: var(--color-text-muted); font-size: 0.9rem; margin-bottom: 16px; }
.iv-modal .form-group { margin-bottom: 12px; }
.iv-modal label.iv-l { display: block; font-family: var(--font-ui); font-size: 0.8rem; font-weight: 600; margin-bottom: 5px; }
.iv-roles { display: flex; gap: 6px; flex-wrap: wrap; }
.iv-roles button { font-family: var(--font-ui); font-size: 0.85rem; font-weight: 600; padding: 7px 14px; border-radius: 999px; border: 1px solid var(--color-border); background: var(--color-surface); color: var(--color-text-muted); cursor: pointer; }
.iv-roles button.on, .iv-roles button.on:hover { background: var(--color-primary); border-color: var(--color-primary); color: #fff; }
.iv-students { display: flex; flex-direction: column; gap: 6px; max-height: 180px; overflow-y: auto; }
.iv-students input { width: auto !important; flex: none; margin: 0; }
.iv-students label { display: flex; justify-content: flex-start; text-align: left; font-weight: 500; gap: 8px; align-items: center; font-size: 0.9rem; cursor: pointer; }
.iv-hint { font-size: 0.78rem; color: var(--color-text-muted); margin-top: 4px; }
.iv-err { color: var(--color-danger); font-size: 0.85rem; margin: 6px 0; display: none; }
.iv-actions { display: flex; gap: 8px; justify-content: flex-end; margin-top: 16px; flex-wrap: wrap; }
.iv-link { display: flex; gap: 6px; margin: 10px 0 4px; }
.iv-link input { flex: 1; font-size: 0.85rem; }
.iv-done { text-align: center; }
.iv-done .iv-big { font-size: 2.2rem; margin-bottom: 6px; }
.iv-share { display: grid; grid-template-columns: 1fr 1fr; gap: 8px; margin-top: 12px; }
`;
let cssDone = false;
function addCss() { if (cssDone) return; cssDone = true; const st = document.createElement('style'); st.textContent = CSS; document.head.appendChild(st); }

// opts: { byUid, byName, roles: ['parent'] | ['parent','teacher','admin'],
//         students: [{id,name}], preselect: [ids], toast(msg,type) }
export function openInviteDialog(opts) {
  addCss();
  const roles = opts.roles || ['parent'];
  let role = roles[0];
  const pre = new Set(opts.preselect || []);
  const ov = document.createElement('div');
  ov.className = 'iv-overlay';
  document.body.appendChild(ov);
  const close = () => ov.remove();
  ov.addEventListener('click', e => { if (e.target === ov) close(); });

  const form = () => {
    ov.innerHTML = `<div class="iv-modal" role="dialog" aria-modal="true" aria-label="Invite someone">
      <div class="iv-head"><h2>${roles.length > 1 ? 'Invite someone' : 'Invite a parent'}</h2><button class="iv-close" aria-label="Close">✕</button></div>
      <div class="iv-sub">They get a link to join Lobe Limpet${opts.students?.length ? ' and see the students you choose' : ''}. It works once and lasts ${INVITE_DAYS} days.</div>
      ${roles.length > 1 ? `<div class="form-group"><label class="iv-l">Join as</label><div class="iv-roles">${roles.map(r => `<button type="button" data-ivrole="${r}" class="${r === role ? 'on' : ''}">${ROLE_LABEL[r]}</button>`).join('')}</div>
        <div class="iv-hint" id="iv-role-hint"></div></div>` : ''}
      <div class="form-group"><label class="iv-l" for="iv-name">Their name</label><input type="text" id="iv-name" placeholder="e.g. Catherine Gibbs" autocomplete="off"></div>
      <div class="form-group"><label class="iv-l" for="iv-email">Their email</label><input type="email" id="iv-email" placeholder="name@example.com" autocomplete="off">
        <div class="iv-hint">Only this email can use the invite.</div></div>
      ${opts.students?.length ? `<div class="form-group" id="iv-students-group"><label class="iv-l">Share these students</label><div class="iv-students">${opts.students.map(s => `<label><input type="checkbox" value="${esc(s.id)}" ${pre.has(s.id) ? 'checked' : ''}> ${esc(s.name || s.email || 'Student')}</label>`).join('')}</div></div>` : ''}
      <div class="iv-err" id="iv-err"></div>
      <div class="iv-actions"><button class="btn btn-ghost" data-cancel>Cancel</button><button class="btn btn-primary" id="iv-go">Create invite</button></div>
    </div>`;
    ov.querySelector('.iv-close').onclick = close;
    ov.querySelector('[data-cancel]').onclick = close;
    const hint = () => {
      const h = ov.querySelector('#iv-role-hint'); if (!h) return;
      h.textContent = role === 'admin' ? 'Admins can see and change everything, including other people\'s accounts. Only invite people you trust.' : role === 'teacher' ? 'Teachers can create classes and see their own students.' : 'Parents can see progress and manage the students shared with them.';
      const sg = ov.querySelector('#iv-students-group'); if (sg) sg.style.display = role === 'teacher' ? 'none' : '';
    };
    ov.querySelectorAll('[data-ivrole]').forEach(b => b.onclick = () => { role = b.dataset.ivrole; ov.querySelectorAll('[data-ivrole]').forEach(x => x.classList.toggle('on', x === b)); hint(); });
    hint();
    ov.querySelector('#iv-go').onclick = go;
    setTimeout(() => ov.querySelector('#iv-name')?.focus(), 50);
  };

  async function go() {
    const name = ov.querySelector('#iv-name').value.trim();
    const email = ov.querySelector('#iv-email').value.trim();
    const err = ov.querySelector('#iv-err');
    const fail = m => { err.textContent = m; err.style.display = 'block'; };
    if (!name) return fail('Please enter their name.');
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return fail('Please enter a valid email address.');
    const ids = role === 'teacher' ? [] : [...ov.querySelectorAll('.iv-students input:checked')].map(i => i.value);
    const students = (opts.students || []).filter(s => ids.includes(s.id));
    const btn = ov.querySelector('#iv-go'); btn.disabled = true; btn.textContent = 'Creating…';
    try {
      const { link } = await createInvite({ email, name, role, students, byUid: opts.byUid, byName: opts.byName });
      done(name, email, link, students);
    } catch (e) { btn.disabled = false; btn.textContent = 'Create invite'; fail('Could not create the invite: ' + e.message); }
  }

  function done(name, email, link, students) {
    const first = name.split(' ')[0];
    const from = (opts.byName || '').split(' ')[0];
    const subject = `${from ? from + ' has' : 'You\'ve been'} invited you to Lobe Limpet`;
    const body = `Hi ${first},\n\n${from || 'I'} ${from ? 'has' : 'have'} invited you to join Lobe Limpet${role !== 'parent' ? ' as ' + (role === 'admin' ? 'an admin' : 'a teacher') : ''}${students.length ? `, so you can follow ${students.map(s => (s.name || '').split(' ')[0]).join(' and ')}'s revision` : ''}.\n\nOpen this link to create your account (or sign in if you already have one):\n${link}\n\nUse this email address: ${email}\nThe link works once and lasts ${INVITE_DAYS} days.`;
    ov.innerHTML = `<div class="iv-modal iv-done" role="dialog" aria-modal="true" aria-label="Invite ready">
      <div class="iv-head" style="justify-content:flex-end;margin:0;"><button class="iv-close" aria-label="Close">✕</button></div>
      <div class="iv-big">✉️</div>
      <h2 style="font-family:var(--font-heading);font-weight:800;font-size:1.3rem;">Invite ready for ${esc(first)}</h2>
      <div class="iv-sub" style="margin:4px 0 0;">Send them this link. When they join they'll be a ${esc(ROLE_LABEL[role])}${students.length ? ` and see ${esc(students.map(s => (s.name || '').split(' ')[0]).join(' and '))}` : ''}.</div>
      <div class="iv-link"><input type="text" readonly value="${esc(link)}" aria-label="Invite link"><button class="btn btn-secondary" data-copy>Copy</button></div>
      <div class="iv-share">
        <a class="btn btn-primary" href="mailto:${encodeURIComponent(email)}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}">Email it</a>
        <button class="btn btn-secondary" data-share>${navigator.share ? 'Share…' : 'Copy message'}</button>
      </div>
    </div>`;
    ov.querySelector('.iv-close').onclick = close;
    const copy = async (text, msg) => {
      try { await navigator.clipboard.writeText(text); opts.toast?.(msg, 'success'); }
      catch (e) { const i = ov.querySelector('.iv-link input'); i.select(); document.execCommand?.('copy'); opts.toast?.(msg, 'success'); }
    };
    ov.querySelector('[data-copy]').onclick = () => copy(link, 'Link copied');
    ov.querySelector('[data-share]').onclick = async () => {
      if (navigator.share) { try { await navigator.share({ title: subject, text: body }); } catch (e) {} }
      else copy(body, 'Message copied');
    };
  }
  form();
}
