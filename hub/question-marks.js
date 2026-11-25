// Marks for written answers: each question carries its own mark value, as on a real
// exam paper. The quiz shows it, the hint says how much to write, and the AI marks out of it.

// Values offered in the question editor (GCSE and A level papers use these most)
export const MARK_OPTIONS = [1, 2, 3, 4, 6, 8, 9, 12, 15, 16, 20, 25];
const SNAP = [2, 3, 4, 6];

// Older questions have no mark value: estimate one from the mark scheme
// (about one mark per key point), between 2 and 6
export function estimateMarks(markScheme = '') {
  const ms = String(markScheme);
  const numbered = ms.match(/(?:^|\s)\(?\d{1,2}[).]\s/g)?.length || 0;
  const bullets = ms.match(/(?:^|\n)\s*[-•*]\s/g)?.length || 0;
  const parts = ms.split(/[;\n]|\.\s+(?=[A-Z])/).map(s => s.trim()).filter(s => s.split(/\s+/).length >= 3).length;
  const points = Math.max(numbered, bullets, parts, 1);
  if (points >= 5) return 6;
  return SNAP.find(n => n >= points) || 2;
}

// The question's mark value
export function marksOf(q) {
  const n = Math.round(Number(q?.marks));
  if (n >= 1 && n <= 30) return n;
  return estimateMarks(q?.markScheme || q?.modelAnswer || '');
}

export const marksLabel = n => `${n} mark${n === 1 ? '' : 's'}`;

// How much to write, the way teachers explain it
export function writingGuide(n) {
  if (n <= 1) return 'A word or a short sentence is enough.';
  if (n === 2) return 'Aim for two clear points, or one point explained.';
  if (n <= 4) return `Aim for ${n} clear points, or fewer points each explained with a reason or example.`;
  if (n <= 6) return 'Write a developed answer: explain a few points in detail, with reasons and examples.';
  if (n <= 9) return 'Write an extended answer: develop several points with evidence and explain how they link.';
  return 'Write an extended answer: develop arguments for and against, use evidence, and reach a justified conclusion.';
}

// Extra marking guidance for the AI on longer answers (levels marking, as exam boards do)
export function markingGuide(n) {
  if (n <= 4) return `Award about one mark per correct, relevant point from the mark scheme (or for a point that is developed with a reason or example), up to ${n}.`;
  return `This is a ${n}-mark extended answer: mark it holistically with levels, as exam boards do. A top-level answer is detailed, accurate and well developed${n >= 9 ? ', considers more than one viewpoint and reaches a justified conclusion' : ''}; a middle-level answer makes relevant points with some explanation; a low-level answer is brief, simple or partly relevant. Place the answer in a level, then give a mark within it.`;
}

// For the question writer
export const MARKS_PROMPT = `For written answers, add "marks": the mark value an exam paper would give that question. Use 1-4 for state, describe and explain questions, and 6 for a developed explanation. Use 8, 9, 12 or more only for extended evaluate, discuss or essay questions where that subject's exams set them (for example RE, History, English, Geography at GCSE, or most A level subjects). Match the command word to the marks, and write the mark scheme to fit: about one key point per mark for 1-4 marks; for 6 marks or more, the points a top answer covers and what lifts it to the top level. Never write the marks in the question text itself.`;
