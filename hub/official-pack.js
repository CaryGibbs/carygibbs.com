// ============================================================
// LOBE LIMPET: standard names and descriptions for Lobe Limpet packs
// Admin → Revision packs → New pack asks for level, subject, board and
// spec code, and writes the name and description the standard way:
//   name:        "GCSE History (AQA 8145)"
//   description: "AQA History GCSE: every topic on the specification, each with
//                 notes and practice questions. Cell biology and Organisation
//                 are free to try. The full pack comes with Plus."
// The description names the free sample topics, so it's rewritten when
// Free sample or Make free / Make Plus only changes them (descAuto).
// ============================================================

import { db } from './firebase-config.js?v=20261127a';
import { doc, getDoc, getDocs, updateDoc, collection } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";
import { inOrder } from './order.js?v=20261127a';

// School levels come first in names ("GCSE History (AQA 8145)"); the others don't
// ("Driving Theory Test (DVSA)"). value → label
export const SCHOOL_LEVELS = ['GCSE', 'AS level', 'A level', 'KS3', 'National 5', 'Higher'];
export const OTHER_LEVELS = [['University', 'University'], ['Professional', 'Professional qualification'], ['Driving', 'Driving test'], ['Other', 'Other']];
export const STD_LEVELS = [...SCHOOL_LEVELS, ...OTHER_LEVELS.map(([v]) => v)];
export const isSchoolLevel = l => SCHOOL_LEVELS.includes(l);
// Levels whose packs should name an exam board
export const needsBoard = l => ['GCSE', 'AS level', 'A level', 'National 5', 'Higher'].includes(l);
// Short board names, as used in pack names and the pack picker; then other awarding bodies
export const STD_BOARDS = ['AQA', 'Edexcel', 'OCR', 'Eduqas', 'WJEC', 'CCEA', 'SQA'];
export const OTHER_BODIES = ['DVSA', 'ABRSM', 'Trinity College London', 'City & Guilds', 'BTEC', 'ACCA', 'AAT', 'CIMA', 'CIPD', 'CII', 'CITB', 'CompTIA', 'ICAEW', 'IMI', 'LIBF', 'NCFE'];
// Typed board → the short school name where it is one ("pearson edexcel" → "Edexcel")
export function tidyBoard(b) {
  const s = String(b || '').trim().replace(/\s+/g, ' ');
  if (/edexcel|^pearson$/i.test(s)) return 'Edexcel';
  if (/eduqas/i.test(s)) return 'Eduqas';
  const known = [...STD_BOARDS, ...OTHER_BODIES].find(x => x.toLowerCase() === s.toLowerCase());
  return known || s;
}
// The longer names used on subjects (the subject dialog's list)
export const SUBJECT_BOARD = { Edexcel: 'Pearson Edexcel', Eduqas: 'WJEC Eduqas' };

export function officialName({ level, subject, board, code }) {
  const tag = [board, code].filter(Boolean).join(' ');
  return (isSchoolLevel(level) ? [level, subject].filter(Boolean).join(' ') : subject) + (tag ? ` (${tag})` : '');
}
// "on the specification" for school exams, "in the test" for driving, "in the syllabus" otherwise
const scopeOf = level => isSchoolLevel(level) || !level ? 'on the specification' : level === 'Driving' ? 'in the test' : 'in the syllabus';

const listText = names => names.length < 2 ? (names[0] || '') : `${names.slice(0, -1).join(', ')} and ${names[names.length - 1]}`;
// free: names of the free sample topics, or null when not known yet
export function officialDescription({ subject, board, level = '', free = null, plusCount = 1 }) {
  // (a subject that already starts with the body's name isn't repeated: "DVSA Driving Theory Test", not "DVSA DVSA …")
  // School packs name the level after the subject, as the existing packs do: "AQA Biology GCSE:"
  const who = (board && !subject.toLowerCase().startsWith(board.toLowerCase()) ? `${board} ${subject}` : subject) + (isSchoolLevel(level) ? ` ${level}` : '');
  const lead = `${who}: every topic ${scopeOf(level)}, each with notes and practice questions.`;
  if (free && !plusCount) return `${lead} Every topic is free.`;
  const freeText = free === null ? 'Some topics are free to try.'
    : !free.length ? '' : `${listText(free)} ${free.length === 1 ? 'is' : 'are'} free to try.`;
  return [lead, freeText, 'The full pack comes with Plus.'].filter(Boolean).join(' ');
}

// Rewrite a standard pack's description from its free topics now (no change if
// it isn't an official standard pack, or its description was written by hand)
export async function refreshOfficialDescription(packId) {
  const p = (await getDoc(doc(db, 'content', packId)).catch(() => null))?.data();
  if (!p || p.ownerUid || !p.standard || p.descAuto !== true || !p.subject) return null;
  const free = []; let plusCount = 0;
  for (const s of inOrder(await getDocs(collection(db, `content/${packId}/subjects`)))) {
    for (const t of inOrder(await getDocs(collection(db, `content/${packId}/subjects/${s.id}/topics`)))) {
      if (t.plusOnly === true) plusCount++; else free.push(t.name);
    }
  }
  const description = officialDescription({ subject: p.subject, board: p.examBoard, level: p.level, free: free.length || plusCount ? free : null, plusCount });
  if (description !== p.description) await updateDoc(doc(db, 'content', packId), { description });
  return description;
}
