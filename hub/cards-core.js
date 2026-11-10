// ============================================================
// LOBE LIMPET: flashcard sets made by students (pure helpers)
// A set is a topic in the student's own pack. Its cards are kept on the
// topic (cards: [{ id, term, definition }]) and also as flat key points,
// so Learn, the cheat sheet and the mind map work on them too.
// Every card is turned into quiz questions with fixed ids, so a student's
// review progress survives edits to the set.
// No Firebase here, so this file can be tested on its own.
// ============================================================

export const MAX_CARDS = 300;
export const MAX_TERM = 300;
export const MAX_DEF = 1000;

export const newCardId = () => 'c' + Date.now().toString(36).slice(-4) + Math.random().toString(36).slice(2, 7);
const clean = s => String(s ?? '').replace(/\r/g, '').replace(/[ \t]+/g, ' ').trim();
const words = s => clean(s).split(/\s+/).filter(Boolean).length;

/* ── Import: "term<sep>definition" rows ─────────────────────
   between: 'tab' | 'comma' | 'dash' | 'colon' | any custom text
   rows:    'newline' | 'semicolon' | any custom text */
const BETWEEN = { tab: '\t', comma: ',', dash: ' - ', colon: ':' };
const ROWS = { newline: '\n', semicolon: ';' };

// Guess the separators from the pasted text (Quizlet exports use tab + new line)
export function detectSeparators(text = '') {
  const t = String(text).replace(/\r/g, '');
  const lines = t.split('\n').map(l => l.trim()).filter(Boolean);
  let rows = 'newline';
  if (lines.length <= 1 && (t.match(/;/g) || []).length >= 2) rows = 'semicolon';
  const sample = rows === 'semicolon' ? t.split(';').map(l => l.trim()).filter(Boolean) : lines;
  const has = re => sample.length ? sample.filter(l => re.test(l)).length / sample.length : 0;
  let between = 'comma';
  if (has(/\t/) >= 0.5) between = 'tab';
  else if (has(/\s[-–—]\s/) >= 0.5) between = 'dash';
  else if (has(/:/) >= 0.5) between = 'colon';
  else if (has(/,/) >= 0.5) between = 'comma';
  return { between, rows };
}

export function parseImport(text = '', between = 'tab', rows = 'newline') {
  const rowSep = ROWS[rows] ?? (rows || '\n');
  const parts = String(text).replace(/\r/g, '').split(rowSep);
  const out = [];
  parts.forEach(raw => {
    const row = raw.trim();
    if (!row) return;
    let term = row, definition = '';
    if (between === 'dash') {
      // " - " (or an en/em dash with spaces); fall back to a bare hyphen
      const m = row.match(/\s[-–—]\s/) || row.match(/[-–—]/);
      if (m) { term = row.slice(0, m.index); definition = row.slice(m.index + m[0].length); }
    } else {
      const sep = BETWEEN[between] ?? between;
      const i = sep ? row.indexOf(sep) : -1;
      if (i >= 0) { term = row.slice(0, i); definition = row.slice(i + sep.length); }
    }
    term = clean(term).slice(0, MAX_TERM);
    definition = clean(definition).slice(0, MAX_DEF);
    if (term || definition) out.push({ term, definition });
  });
  return out;
}

/* ── Duplicates: index of every card whose term repeats ──── */
export function duplicateIndexes(cards = []) {
  const seen = {}, dup = new Set();
  cards.forEach((c, i) => {
    const k = clean(c.term).toLowerCase();
    if (!k) return;
    if (k in seen) { dup.add(i); dup.add(seen[k]); } else seen[k] = i;
  });
  return dup;
}

/* ── Questions from cards ────────────────────────────────────
   For each card (ids are fixed, so progress is kept):
     c_<id>_mcq   definition → pick the term (other cards' terms as wrong answers)
     c_<id>_tf    "term" means … (true, or another card's meaning: false)
     c_<id>_fill  definition → type the term (short terms only)
     c_<id>_short what does "term" mean? (marked by AI, so wording can differ)
   Plus match-the-pairs questions, m_<n>, four cards at a time.
   rand: a random number source (pass a seeded one in tests). */
function shuffled(list, rand) {
  const a = [...list];
  for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(rand() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; }
  return a;
}

// Forgiving answers for typed terms: without "the/a/an", without brackets
export function termAlternatives(term = '') {
  const t = clean(term);
  const alts = new Set();
  const noArticle = t.replace(/^(the|a|an)\s+/i, '');
  if (noArticle !== t) alts.add(noArticle);
  const noBrackets = t.replace(/\s*\([^)]*\)\s*/g, ' ').trim();
  if (noBrackets && noBrackets !== t) alts.add(noBrackets);
  if (/\s\/\s|\s\bor\b\s/.test(t)) t.split(/\s\/\s|\s\bor\b\s/).map(clean).filter(Boolean).forEach(a => alts.add(a));
  return [...alts].filter(a => a.toLowerCase() !== t.toLowerCase());
}

export function questionsFromCards(cards = [], rand = Math.random) {
  const list = cards.map(c => ({ id: c.id, term: clean(c.term), definition: clean(c.definition) }))
    .filter(c => c.id && c.term && c.definition);
  const qs = [];
  list.forEach((c, i) => {
    const others = list.filter(o => o.id !== c.id && o.term.toLowerCase() !== c.term.toLowerCase());
    const explanation = `${c.term}: ${c.definition}`;
    const base = { source: 'cards', cardId: c.id };
    if (others.length) {
      const wrong = shuffled([...new Set(others.map(o => o.term))], rand).slice(0, 3);
      qs.push({ id: `c_${c.id}_mcq`, ...base, type: 'mcq',
        question: `Which term matches this? ${c.definition}`,
        options: shuffled([{ text: c.term, correct: true }, ...wrong.map(t => ({ text: t, correct: false }))], rand),
        explanation });
      // Alternate true and false statements through the set
      const isTrue = i % 2 === 0;
      const otherDef = others[Math.floor(rand() * others.length)].definition;
      const useFalse = !isTrue && otherDef.toLowerCase() !== c.definition.toLowerCase();
      qs.push({ id: `c_${c.id}_tf`, ...base, type: 'tf',
        question: `"${c.term}" means: ${useFalse ? otherDef : c.definition}`,
        answer: !useFalse, explanation });
    } else {
      qs.push({ id: `c_${c.id}_tf`, ...base, type: 'tf',
        question: `"${c.term}" means: ${c.definition}`, answer: true, explanation });
    }
    // Typing the exact term is fair for short terms only
    if (words(c.term) <= 5 && c.term.length <= 40) {
      qs.push({ id: `c_${c.id}_fill`, ...base, type: 'fill',
        sentence: `${c.definition} → _____`, answer: c.term, alternatives: termAlternatives(c.term), explanation });
    }
    // A written answer is worth it when there's something to explain
    if (words(c.definition) >= 4) {
      qs.push({ id: `c_${c.id}_short`, ...base, type: 'short',
        question: `What does "${c.term}" mean?`,
        markScheme: `${c.definition} (Accept the same meaning in the student's own words.)` });
    }
  });
  // Match the pairs, four cards at a time (the last group may be 3 to 5)
  if (list.length >= 3) {
    const groups = [];
    for (let i = 0; i < list.length; i += 4) groups.push(list.slice(i, i + 4));
    const last = groups[groups.length - 1];
    if (groups.length > 1 && last.length < 3) groups[groups.length - 2].push(...groups.pop());
    groups.forEach((g, n) => {
      const pairs = []; const rights = new Set();
      g.forEach(c => { const r = c.definition.toLowerCase(); if (!rights.has(r)) { rights.add(r); pairs.push({ left: c.term, right: c.definition }); } });
      if (pairs.length >= 3) qs.push({ id: `m_${n}`, source: 'cards', type: 'match', instruction: 'Match each term to its meaning', pairs });
    });
  }
  return qs;
}

// Key points for Learn, cheat sheet and mind map
export const keyPointsFromCards = cards => cards
  .filter(c => clean(c.term) && clean(c.definition))
  .map(c => ({ term: clean(c.term), explanation: clean(c.definition) }));

/* ── AI prompts (Plus) ───────────────────────────────────── */
export function cardsPrompt({ notes = '', setName = '', subject = '', count = 20, existing = [] }) {
  const src = clean(notes)
    ? `Use only facts that are in the notes below. If the notes don't support ${count} good cards, make fewer.\n\nNOTES:\n${notes}`
    : `There are no notes: write from your own accurate knowledge of "${setName}"${subject ? ` in ${subject}` : ''}, at the level a UK secondary school student needs (GCSE unless the name says otherwise).`;
  return `You are helping a UK secondary school student make revision flashcards.
Subject: ${subject || 'not given'}. Set: ${setName || 'not given'}.

Write up to ${count} flashcards covering the most important terms, facts, people, dates, formulas and ideas.
Rules:
- "term": the thing to remember: a key word, name, date, formula or very short question (at most 10 words).
- "definition": a clear, accurate answer a student could learn (at most 30 words). UK spelling.
- One idea per card. No two cards with the same term.
${existing.length ? `- These cards are already in the set, so don't repeat them: ${existing.slice(0, 150).map(t => `"${t}"`).join(', ')}\n` : ''}- No names or personal details of real students or teachers.

${src}

Reply with only a JSON array, nothing else: [{"term":"...","definition":"..."}]`;
}

export function definitionsPrompt({ terms = [], setName = '', subject = '' }) {
  return `You are helping a UK secondary school student finish their revision flashcards.
Subject: ${subject || 'not given'}. Set: ${setName || 'not given'}.
For each term below, write a clear, accurate definition a student could learn (at most 30 words, UK spelling), suited to the subject and set.

Terms:
${terms.map((t, i) => `${i + 1}. ${t}`).join('\n')}

Reply with only a JSON array in the same order, nothing else: [{"term":"...","definition":"..."}]`;
}

// Tidy an AI reply into cards
export function cardsFromAi(reply) {
  const arr = Array.isArray(reply) ? reply : Array.isArray(reply?.cards) ? reply.cards : [];
  return arr.map(x => ({ term: clean(x?.term).slice(0, MAX_TERM), definition: clean(x?.definition).slice(0, MAX_DEF) }))
    .filter(c => c.term && c.definition);
}
