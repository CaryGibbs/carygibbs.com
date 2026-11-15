// ═══════════════════════════════════════════════════════════
// BADGE POP — a new badge pops out from under Lobey's shell
// showBadgePops(ids) shows each newly earned badge in turn:
//   Lobey lifts his shell, the badge springs out from underneath,
//   then moves in its own way (a flame flickers, a rocket launches,
//   a clock ticks…), set by the badge's family, with a ring in its
//   tier colour (bronze, silver, gold, platinum; gold and platinum
//   get extra sparkle).
// With "No Lobey" chosen, the badge pops up on its own.
// Everything stays still for people who prefer reduced motion.
// ═══════════════════════════════════════════════════════════

import { BADGES, BADGE_FAMILIES, TIERS } from './gamification.js?v=20261115h';
import { lobeyShows } from './lobey.js?v=20261115h';

const SVG_URL = 'assets/images/brand/mascot/limpet-reveal.svg?v=20261115h';
let svgText = null;
const loadSvg = () => svgText ? Promise.resolve(svgText)
  : fetch(SVG_URL).then(r => r.ok ? r.text() : '').then(t => (svgText = t)).catch(() => '');

// How each family of badge moves once it's out
const MOTION = {
  days: 'flip', streak: 'flicker', comeback: 'swoop', plan: 'target', time: 'tick', week: 'flex',
  quizzes: 'target', improve: 'climb', leap: 'launch', mastery: 'toss', scores: 'twinkle', perfect: 'spin',
  subjects: 'globe', written: 'scribble', types: 'snap', mindmaps: 'unfold', learner: 'glow',
  topicsDone: 'flip', sheets: 'flip', review: 'loop', memory: 'magnet', study: 'glow', levels: 'toss',
};
const CHEERS = ['Look what I found under my shell!', 'Ta-da! A new badge!', 'Ooh, this one\'s shiny!',
  'You earned this one!', 'Fresh out of the rock pool!'];

const esc = s => String(s ?? '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

let cssDone = false;
function css() {
  if (cssDone) return; cssDone = true;
  const st = document.createElement('style');
  st.textContent = `
  .bp-scrim { position: fixed; inset: 0; z-index: 10000; background: rgba(10, 30, 40, .55); display: grid; place-items: center;
    padding: 20px; opacity: 0; transition: opacity .25s; }
  .bp-scrim.on { opacity: 1; }
  .bp-card { position: relative; width: min(360px, 100%); background: var(--color-surface, #fff); color: var(--color-text, #123a4a);
    border-radius: 24px; padding: 18px 22px 22px; text-align: center; box-shadow: 0 24px 60px rgba(0,0,0,.3);
    font-family: var(--font-ui, Inter, system-ui, sans-serif); transform: translateY(16px) scale(.97); transition: transform .3s; }
  .bp-scrim.on .bp-card { transform: none; }
  .bp-kicker { font-size: .75rem; font-weight: 800; letter-spacing: .08em; text-transform: uppercase; color: var(--color-primary, #ff7a59); }
  .bp-stage { position: relative; height: 270px; margin: 4px auto 6px; width: 220px; }
  .bp-lobey { position: absolute; left: 25px; right: 25px; bottom: 0; z-index: 2; }
  .bp-lobey svg { width: 100%; height: auto; display: block; overflow: visible; }
  .bp-shell { transform-box: view-box; transform-origin: 14px 84px; animation: bp-lift 1.5s ease-in-out .15s both; }
  .bp-glow ellipse { animation: bp-glow 1.5s ease-in-out .15s both; }
  @keyframes bp-lift { 0% { transform: none; } 18% { transform: translateY(2px) scale(1.03, .96); }
    45%, 62% { transform: translate(-4px, -16px) rotate(-16deg); } 85% { transform: translateY(-2px) rotate(2deg); } 100% { transform: none; } }
  @keyframes bp-glow { 0%, 20% { opacity: 0; } 45%, 62% { opacity: .9; } 100% { opacity: 0; } }

  .bp-badge { position: absolute; left: 50%; bottom: 26px; width: 92px; height: 92px; margin-left: -46px; z-index: 1;
    animation: bp-out 1.5s cubic-bezier(.3,1.4,.5,1) .15s both; }
  @keyframes bp-out { 0%, 30% { transform: translateY(10px) scale(.2); opacity: 0; z-index: 1; }
    40% { opacity: 1; } 62% { transform: translateY(-158px) scale(1.12); z-index: 3; } 100% { transform: translateY(-150px) scale(1); z-index: 3; } }
  .bp-ring { position: absolute; inset: 0; border-radius: 50%; background: radial-gradient(circle at 35% 30%, #fff 0%, var(--tier) 75%);
    box-shadow: 0 0 0 4px #fff, 0 0 0 7px var(--tier), 0 10px 24px rgba(0,0,0,.25); }
  .bp-icon { position: absolute; inset: 0; display: grid; place-items: center; font-size: 46px; line-height: 1; }
  .bp-icon span { display: inline-block; animation-delay: 1.7s; animation-fill-mode: both; }
  .bp-spark { position: absolute; width: 10px; height: 10px; background: #ffd66b; opacity: 0;
    clip-path: polygon(50% 0, 62% 38%, 100% 50%, 62% 62%, 50% 100%, 38% 62%, 0 50%, 38% 38%); animation: bp-spark 1.8s ease-in-out 1.6s infinite; }
  .bp-spark.s1 { left: -8px; top: 6px; } .bp-spark.s2 { right: -10px; top: 26px; animation-delay: 2.1s; }
  .bp-spark.s3 { left: 10px; bottom: -8px; animation-delay: 2.5s; } .bp-spark.s4 { right: 4px; top: -10px; animation-delay: 1.9s; }
  @keyframes bp-spark { 0%, 100% { opacity: 0; transform: scale(.3) rotate(0); } 40%, 60% { opacity: 1; transform: scale(1.2) rotate(45deg); } }

  /* The badge's own move, by family */
  .m-flicker span { animation: m-flicker .5s ease-in-out infinite alternate; transform-origin: 50% 90%; }
  @keyframes m-flicker { from { transform: scale(1, 1) skewX(-4deg); } to { transform: scale(1.08, 1.14) skewX(4deg); } }
  .m-flip span { animation: m-flip 2.4s ease-in-out infinite; }
  @keyframes m-flip { 0%, 60% { transform: rotateY(0); } 80%, 100% { transform: rotateY(360deg); } }
  .m-swoop span { animation: m-swoop 2s ease-in-out infinite; }
  @keyframes m-swoop { 0%, 100% { transform: translate(0, 0) rotate(0); } 30% { transform: translate(10px, -10px) rotate(12deg); } 60% { transform: translate(-10px, -4px) rotate(-10deg); } }
  .m-target span { animation: m-target 1.2s ease-in-out infinite; }
  @keyframes m-target { 0%, 100% { transform: scale(1); } 15% { transform: scale(.82); } 30% { transform: scale(1.12); } 45% { transform: scale(1); } }
  .m-tick span { animation: m-tick 1s steps(1) infinite; }
  @keyframes m-tick { 0% { transform: rotate(-12deg); } 50% { transform: rotate(12deg); } }
  .m-flex span { animation: m-flex .9s ease-in-out infinite; }
  @keyframes m-flex { 0%, 100% { transform: scale(1); } 50% { transform: scale(1.18, .92); } }
  .m-climb span { animation: m-climb 1.8s ease-in-out infinite; }
  @keyframes m-climb { 0% { transform: translateY(8px); } 33% { transform: translateY(2px); } 66% { transform: translateY(-4px); } 100% { transform: translateY(8px); } }
  .m-launch span { animation: m-launch 2.2s ease-in infinite; }
  @keyframes m-launch { 0%, 30% { transform: translate(0, 0); } 10%, 20% { transform: translate(-1px, 1px) rotate(-3deg); } 15%, 25% { transform: translate(1px, -1px) rotate(3deg); }
    55% { transform: translate(14px, -40px); opacity: 1; } 56% { opacity: 0; transform: translate(0, 20px); } 75% { opacity: 1; transform: translate(0, 0); } }
  .m-toss span { animation: m-toss 2s ease-in-out infinite; }
  @keyframes m-toss { 0%, 100% { transform: translateY(0) rotate(0); } 40% { transform: translateY(-26px) rotate(360deg); } 55% { transform: translateY(0) rotate(360deg); } 65% { transform: translateY(-4px) rotate(360deg); } }
  .m-twinkle span { animation: m-twinkle 1.4s ease-in-out infinite; }
  @keyframes m-twinkle { 0%, 100% { transform: scale(1) rotate(0); filter: brightness(1); } 50% { transform: scale(1.15) rotate(18deg); filter: brightness(1.3); } }
  .m-spin span { animation: m-spin 1.6s cubic-bezier(.5,0,.3,1) infinite; }
  @keyframes m-spin { 0% { transform: rotate(0) scale(1); } 50% { transform: rotate(360deg) scale(1.15); } 100% { transform: rotate(360deg) scale(1); } }
  .m-globe span { animation: m-globe 3s linear infinite; }
  @keyframes m-globe { from { transform: rotateY(0); } to { transform: rotateY(360deg); } }
  .m-scribble span { animation: m-scribble .7s ease-in-out infinite; transform-origin: 20% 90%; }
  @keyframes m-scribble { 0%, 100% { transform: translate(0, 0) rotate(0); } 25% { transform: translate(6px, -2px) rotate(8deg); } 50% { transform: translate(-4px, 2px) rotate(-4deg); } 75% { transform: translate(4px, 1px) rotate(6deg); } }
  .m-snap span { animation: m-snap 1.6s ease-in-out infinite; }
  @keyframes m-snap { 0%, 100% { transform: translate(0, 0) rotate(0); } 30% { transform: translate(-10px, -6px) rotate(-20deg); } 45% { transform: translate(0, 0) rotate(0) scale(1.15); } 55% { transform: scale(1); } }
  .m-unfold span { animation: m-unfold 2.2s ease-in-out infinite; }
  @keyframes m-unfold { 0%, 100% { transform: scaleX(1); } 40% { transform: scaleX(.15); } 70% { transform: scaleX(1.1); } }
  .m-glow span { animation: m-glow 1.6s ease-in-out infinite; }
  @keyframes m-glow { 0%, 100% { transform: scale(1); filter: drop-shadow(0 0 0 #ffd66b); } 50% { transform: scale(1.1); filter: drop-shadow(0 0 10px #ffd66b); } }
  .m-loop span { animation: m-loop 2s ease-in-out infinite; }
  @keyframes m-loop { 0% { transform: rotate(0); } 60%, 100% { transform: rotate(-360deg); } }
  .m-magnet span { animation: m-magnet 1.2s ease-in-out infinite; }
  @keyframes m-magnet { 0%, 100% { transform: translateX(0); } 20% { transform: translateX(-6px); } 40% { transform: translateX(6px); } 60% { transform: translateX(-3px); } 80% { transform: translateX(3px); } }
  .m-bounce span { animation: m-bounce 1s ease-in-out infinite; }
  @keyframes m-bounce { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-10px); } }

  .bp-name { font-family: var(--font-heading, 'Plus Jakarta Sans', sans-serif); font-weight: 800; font-size: 1.3rem; margin: 2px 0 2px; }
  .bp-tier { display: inline-block; font-size: .72rem; font-weight: 800; letter-spacing: .06em; text-transform: uppercase;
    color: #fff; background: var(--tier); border-radius: 999px; padding: 2px 10px; margin-bottom: 6px; }
  .bp-desc { color: var(--color-text-muted, #5d7c89); font-size: .92rem; margin: 0 0 4px; }
  .bp-say { font-weight: 600; font-size: .9rem; margin: 0 0 14px; }
  .bp-btn { border: 0; border-radius: 999px; padding: 11px 28px; font: inherit; font-weight: 800; cursor: pointer;
    background: var(--color-primary, #ff7a59); color: #fff; }
  .bp-count { display: block; margin-top: 8px; font-size: .78rem; color: var(--color-text-muted, #5d7c89); }
  @media (prefers-reduced-motion: reduce) {
    .bp-scrim, .bp-card { transition: none; }
    .bp-shell, .bp-glow ellipse, .bp-spark, .bp-icon span { animation: none !important; }
    .bp-badge { animation: none; transform: translateY(-150px); z-index: 3; }
  }`;
  document.head.appendChild(st);
}

const queue = [];
let showing = false;

// ids: badge ids just earned. Returns a promise that settles when all are dismissed.
export function showBadgePops(ids = []) {
  const list = ids.map(id => BADGES.find(b => b.id === id)).filter(Boolean);
  if (!list.length) return Promise.resolve();
  return new Promise(done => {
    queue.push({ list, done });
    if (!showing) next();
  });
}

async function next() {
  const job = queue.shift();
  if (!job) { showing = false; return; }
  showing = true;
  css();
  const svg = lobeyShows(true) ? await loadSvg() : '';
  let i = 0;
  const lastFocus = document.activeElement;
  const scrim = document.createElement('div');
  scrim.className = 'bp-scrim';
  scrim.setAttribute('role', 'dialog'); scrim.setAttribute('aria-modal', 'true'); scrim.setAttribute('aria-labelledby', 'bp-name');
  document.body.appendChild(scrim);

  const render = () => {
    const b = job.list[i];
    const tier = TIERS[b.tier] || TIERS[1];
    const fam = BADGE_FAMILIES.find(f => f.id === b.family);
    const motion = MOTION[b.family] || 'bounce';
    const sparks = b.tier >= 3 ? '<i class="bp-spark s1"></i><i class="bp-spark s2"></i><i class="bp-spark s3"></i><i class="bp-spark s4"></i>' : '';
    const more = job.list.length > 1;
    scrim.innerHTML = `<div class="bp-card" style="--tier:${tier.colour}">
      <div class="bp-kicker">New badge${fam ? ' · ' + esc(fam.name) : ''}</div>
      <div class="bp-stage" aria-hidden="true">
        <div class="bp-badge"><div class="bp-ring"></div><div class="bp-icon m-${motion}"><span>${b.icon}</span></div>${sparks}</div>
        ${svg ? `<div class="bp-lobey">${svg}</div>` : ''}
      </div>
      <div class="bp-name" id="bp-name">${esc(b.name)}</div>
      <div class="bp-tier">${esc(tier.name)}</div>
      <p class="bp-desc">${esc(b.desc)}</p>
      ${svg ? `<p class="bp-say">${esc(CHEERS[Math.floor(Math.random() * CHEERS.length)])}</p>` : '<p class="bp-say"></p>'}
      <button class="bp-btn" type="button">${more && i < job.list.length - 1 ? 'Next badge' : 'Nice!'}</button>
      ${more ? `<span class="bp-count">${i + 1} of ${job.list.length}</span>` : ''}
    </div>`;
    // No Lobey: the badge sits in the stage on its own
    if (!svg) scrim.querySelector('.bp-badge').style.bottom = '-60px';
    scrim.querySelector('.bp-btn').onclick = advance;
    scrim.querySelector('.bp-btn').focus();
  };
  const close = () => {
    scrim.classList.remove('on');
    document.removeEventListener('keydown', onKey, true);
    setTimeout(() => { scrim.remove(); job.done(); lastFocus?.focus?.(); next(); }, 250);
  };
  const advance = () => { if (++i < job.list.length) render(); else close(); };
  const onKey = e => { if (e.key === 'Escape') { e.preventDefault(); close(); } };
  scrim.addEventListener('click', e => { if (e.target === scrim) close(); });
  document.addEventListener('keydown', onKey, true);
  render();
  requestAnimationFrame(() => scrim.classList.add('on'));
}
