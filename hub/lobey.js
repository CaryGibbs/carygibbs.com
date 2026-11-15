// ═══════════════════════════════════════════════════════════
// LOBEY — the Lobe Limpet mascot inside the app
// lobeySays(mood, line, { big, size }) returns HTML for Lobey with a
// speech bubble, or '' if the student has turned Lobey off.
//   mood: party · cheer · hello · think · read · wave · sleep · streak · grad · mail · cards · price
//   line: a string, or an array to pick from at random (keeps it fresh)
//   big:  true for the big moments (quiz results, badges, level ups);
//         "Just the big moments" hides the rest
// The animated SVGs stay still for people who prefer reduced motion.
// ═══════════════════════════════════════════════════════════

const V = '20261115e';
const FILES = {
  party: 'limpet-party', cheer: 'limpet-stretch', hello: '../limpet-animated', think: 'limpet-think',
  read: 'limpet-read', wave: 'limpet-wave', sleep: 'limpet-sleep', streak: 'limpet-streak',
  grad: 'limpet-grad', mail: 'limpet-mail', price: 'limpet-price', cards: 'limpet-cards',
};
const KEY = 'll_lobey';   // 'all' (default) · 'big' · 'off'

export const LOBEY_LEVELS = [
  { id: 'all', name: 'Lots of Lobey', desc: 'Cheers, nudges and tips' },
  { id: 'big', name: 'Just the big moments', desc: 'Quiz results, badges and levels' },
  { id: 'off', name: 'No Lobey', desc: 'Keep it plain' },
];

export function lobeyLevel() {
  try { const v = localStorage.getItem(KEY); return LOBEY_LEVELS.some(l => l.id === v) ? v : 'all'; }
  catch (e) { return 'all'; }
}
export function setLobeyLevel(v) { try { localStorage.setItem(KEY, v); } catch (e) {} }

// The choice is saved on the student's profile too, so it follows them
// to other devices: call this whenever a profile is loaded.
export function syncLobey(profile) {
  if (profile && LOBEY_LEVELS.some(l => l.id === profile.lobey)) setLobeyLevel(profile.lobey);
}

export function lobeyShows(big = false) {
  const lvl = lobeyLevel();
  return lvl === 'all' || (lvl === 'big' && big);
}

// Party Lobey (arms up) and price-tag Lobey are wider pictures (same height)
const WIDE = { party: 140, price: 140 };
const imgSize = (mood, size) => `width="${Math.round(size * (WIDE[mood] || 108) / 108)}" height="${Math.round(size * 114 / 108)}"`;

export function lobeySrc(mood) {
  const f = FILES[mood] || FILES.hello;
  return `assets/images/brand/mascot/${f}.svg?v=${V}`;
}

// Just the picture (e.g. inside an existing icon slot)
export function lobeyImg(mood, size = 44, big = false) {
  if (!lobeyShows(big)) return '';
  injectCss();
  return `<img class="lobey-img" src="${lobeySrc(mood)}" alt="" ${imgSize(mood, size)}>`;
}

export function pick(line) {
  return Array.isArray(line) ? line[Math.floor(Math.random() * line.length)] : line;
}

// Lobey plus a speech bubble
export function lobeySays(mood, line, { big = false, size = 84, cls = '' } = {}) {
  if (!lobeyShows(big)) return '';
  injectCss();
  return `<div class="lobey ${cls}" role="note">
    <img class="lobey-img" src="${lobeySrc(mood)}" alt="Lobey" ${imgSize(mood, size)}>
    <div class="lobey-bubble">${esc(pick(line))}</div>
  </div>`;
}

// ── Lines ─────────────────────────────────────────────────
export const LINES = {
  great: ['Brain: fully stuck. Brilliant!', 'That is some serious sticking power!', 'Top marks from this limpet!', 'You smashed it. I\'m doing a happy wobble.'],
  good: ['Nice one! A couple more goes and it\'ll really stick.', 'Good going. Your brain is getting grippy.', 'Solid work! Have a look at the ones you missed.'],
  some: ['Getting there! A quick look at the notes, then try again?', 'Halfway up the rock. Read the notes and go again!', 'Some of it\'s sticking already. Let\'s go again.'],
  low: ['Tricky one! Every go makes it stick a bit more.', 'Even limpets slip sometimes. Have another go!', 'That\'s how learning starts. Notes first, then again?'],
  levelUp: ['Level up! I\'m so proud I could fall off my rock.', 'New level! Look at you go.'],
  badge: ['A new badge! That one\'s going on my shell.', 'Badge unlocked! Nice work.'],
  marking: ['Hmm, let me read that carefully…', 'Thinking about your answer…', 'Checking it against the mark scheme…'],
  loading: ['Picking 10 questions for you…', 'Finding good questions…'],
  noQuestions: ['Nothing to quiz on here yet. Try another topic!', 'No questions here yet. I\'ll wait on my rock.'],
  noSubjects: ['Nothing here yet! Your revision will appear here once it\'s added.'],
  noSets: ['No cards yet. Make a set and I\'ll shuffle them for you!', 'My card stack is empty. Shall we make your first set?'],
  noLearn: ['Nothing to learn here yet. I\'ll keep my nose in a book until it arrives!', 'No notes here yet. Check back once your revision is added.'],
  reviewDue: n => [`${n} question${n === 1 ? '' : 's'} came back to say hello. A quick look makes them stick.`, `Time for a quick review: ${n} waiting.`],
  caughtUp: ['All caught up. Your brain is nicely stuck!', 'Nothing to review. Gold star from me.'],
  streakRest: ['Your streak is having a nap. One quiz today wakes it up!', 'Shh, your streak is resting. Revise today to start a new one!'],
  streak: n => [`${n} days in a row! You\'re on fire (in a good way).`, `${n}-day streak! That\'s proper sticking power.`],
};
export const STREAK_MILESTONES = [3, 5, 7, 10, 14, 21, 30, 50, 75, 100, 150, 200, 365];

function esc(s) { return String(s || '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;'); }

let cssDone = false;
function injectCss() {
  if (cssDone || typeof document === 'undefined') return;
  cssDone = true;
  const st = document.createElement('style');
  st.textContent = `
  .lobey { display: flex; align-items: flex-end; gap: 10px; text-align: left; }
  .lobey-img { display: block; flex-shrink: 0; height: auto; }
  .lobey-bubble { position: relative; background: var(--color-surface, #fff); color: var(--color-text, #123a4a);
    border: 1px solid var(--color-border, #cfe6e0); border-radius: 16px; padding: 10px 14px; margin-bottom: 26px;
    font-family: var(--font-ui, inherit); font-weight: 600; font-size: 0.92rem; line-height: 1.35; max-width: 300px;
    box-shadow: 0 6px 18px rgba(0,0,0,0.08); animation: lobey-pop .35s ease-out both; }
  .lobey-bubble::before { content: ''; position: absolute; left: -7px; bottom: 14px; width: 12px; height: 12px;
    background: inherit; border-left: 1px solid var(--color-border, #cfe6e0); border-bottom: 1px solid var(--color-border, #cfe6e0);
    transform: rotate(45deg); }
  .lobey.center { justify-content: center; }
  .lobey.compact .lobey-bubble { margin-bottom: 14px; font-size: 0.85rem; padding: 8px 12px; }
  @keyframes lobey-pop { from { opacity: 0; transform: translateY(6px) scale(.96); } to { opacity: 1; transform: none; } }
  @media (prefers-reduced-motion: reduce) { .lobey-bubble { animation: none; } }`;
  document.head.appendChild(st);
}
