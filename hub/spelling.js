/* ── Spelling: mark like a teacher would ──────────────────────
   Exam boards accept a misspelt word when it's recognisable and the
   meaning is clear ("vicer" for vicar), unless the slip makes it a
   different word, or spelling is the point (languages, spelling tests).

   Each subject has a spelling setting:
     'relaxed' (default) — near-misses count, with a gentle spelling note
     'strict'            — the answer must be spelt correctly
   Language subjects default to strict. */

const LANGUAGE_RE = /\b(french|spanish|german|italian|latin|greek|mandarin|chinese|japanese|korean|arabic|urdu|bengali|punjabi|gujarati|hindi|polish|portuguese|russian|turkish|welsh|irish|gaelic|dutch|hebrew|persian|farsi|mfl|modern (foreign )?languages?|spelling|spellings|vocab(ulary)?)\b/i;

export const isLanguageSubject = (name = '') => LANGUAGE_RE.test(String(name));

// The subject's setting, or the default for its name
export function spellingMode(subject = {}) {
  if (subject.spelling === 'strict' || subject.spelling === 'relaxed') return subject.spelling;
  return isLanguageSubject(subject.name) ? 'strict' : 'relaxed';
}

const stripAccents = s => s.normalize('NFD').replace(/[̀-ͯ]/g, '');

// Lower case, single spaces, no quotes or full stop at the end
export function normaliseAnswer(s = '', { accents = true } = {}) {
  let t = String(s).toLowerCase().replace(/[‘’]/g, "'").replace(/[“”]/g, '"')
    .replace(/\s+/g, ' ').trim()
    .replace(/^["']+|["']+$/g, '').replace(/[.!?,;:]+$/, '').trim();
  if (!accents) t = stripAccents(t);
  return t;
}

// Letters out, counting a swapped pair of letters as one slip
export function editDistance(a, b) {
  const m = a.length, n = b.length;
  if (Math.abs(m - n) > 2) return 3;   // never close enough, skip the work
  const d = Array.from({ length: m + 1 }, (_, i) => [i, ...Array(n).fill(0)]);
  for (let j = 1; j <= n; j++) d[0][j] = j;
  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      const cost = a[i - 1] === b[j - 1] ? 0 : 1;
      d[i][j] = Math.min(d[i - 1][j] + 1, d[i][j - 1] + 1, d[i - 1][j - 1] + cost);
      if (i > 1 && j > 1 && a[i - 1] === b[j - 2] && a[i - 2] === b[j - 1]) d[i][j] = Math.min(d[i][j], d[i - 2][j - 2] + 1);
    }
  }
  return d[m][n];
}

// How many slips a word of this length can have: none for very short words
export const slipsAllowed = len => (len <= 3 ? 0 : len <= 7 ? 1 : 2);

const digits = s => (s.match(/\d+/g) || []).join(' ');

/* Check a typed answer.
   answers: the right answer and accepted alternatives
   others:  answers to other questions nearby (so "affect" isn't taken for "effect")
   Returns { correct, nearMiss, answer } — answer is the spelling to show. */
export function checkTyped(typed, answers = [], { mode = 'relaxed', others = [] } = {}) {
  const strict = mode === 'strict';
  const list = answers.filter(a => a != null && String(a).trim() !== '').map(String);
  const t = normaliseAnswer(typed);
  if (!t || !list.length) return { correct: false, nearMiss: false, answer: list[0] || '' };

  // Exactly right (ignoring capitals, spaces and a full stop)
  const exact = list.find(a => normaliseAnswer(a) === t);
  if (exact) return { correct: true, nearMiss: false, answer: exact };
  if (strict) return { correct: false, nearMiss: false, answer: list[0] };

  // Right apart from accents: fine outside languages
  const tPlain = normaliseAnswer(typed, { accents: false });
  const noAccent = list.find(a => normaliseAnswer(a, { accents: false }) === tPlain);
  if (noAccent) return { correct: true, nearMiss: false, answer: noAccent };

  // A small slip: close to a right answer, numbers exactly right, and not
  // closer (or as close) to a different answer from the same set
  let best = null;
  for (const a of list) {
    const n = normaliseAnswer(a, { accents: false });
    if (digits(n) !== digits(tPlain)) continue;
    const dist = editDistance(tPlain, n);
    if (dist <= slipsAllowed(n.length) && (!best || dist < best.dist)) best = { a, dist };
  }
  if (!best) return { correct: false, nearMiss: false, answer: list[0] };
  const rightSet = new Set(list.map(a => normaliseAnswer(a, { accents: false })));
  const clash = others.map(o => normaliseAnswer(String(o || ''), { accents: false }))
    .filter(o => o && !rightSet.has(o))
    .some(o => o === tPlain || editDistance(tPlain, o) <= best.dist);
  if (clash) return { correct: false, nearMiss: false, answer: list[0] };
  return { correct: true, nearMiss: true, answer: best.a };
}

// Words for the marking prompt, so the AI marks spelling like an examiner
export function markingSpellingRules(mode = 'relaxed') {
  if (mode === 'strict') {
    return `Spelling counts in this subject: a misspelt key word or answer is not credited, though you can still credit other correct points. If the answer has spelling mistakes, name the correct spellings in your feedback.`;
  }
  return `Mark spelling the way a GCSE or A level examiner would: do not take marks off for spelling, punctuation or grammar. Credit a misspelt word when it is recognisable and the meaning is clear (for example "vicer" for "vicar", "photosynthisis" for "photosynthesis"). Only refuse credit when the misspelling turns it into a different subject word or makes the meaning unclear (for example "mitosis" written where "meiosis" is needed). If you credited a misspelt word, end your feedback with one short, friendly note giving the correct spelling, e.g. "Watch the spelling: vicar."`;
}
