// ============================================================
// LOBE LIMPET: standard names and descriptions for Lobe Limpet packs
// Admin → Revision packs → New pack asks for level, subject, board and
// spec code, and writes the name and description the standard way:
//   name:        "GCSE History (AQA 8145)"
//   description: "AQA History: every topic on the specification, each with
//                 notes and practice questions. Cell biology and Organisation
//                 are free to try. The full pack comes with Plus."
// The description names the free sample topics, so it's rewritten when
// Free sample or Make free / Make Plus only changes them (descAuto).
// ============================================================

import { db } from './firebase-config.js?v=20261126h';
import { doc, getDoc, getDocs, updateDoc, collection } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";
import { inOrder } from './order.js?v=20261126h';

export const STD_LEVELS = ['GCSE', 'AS level', 'A level', 'KS3', 'National 5', 'Higher'];
// Short board names, as used in pack names and the pack picker
export const STD_BOARDS = ['AQA', 'Edexcel', 'OCR', 'Eduqas', 'WJEC', 'CCEA', 'SQA'];
// The longer names used on subjects (the subject dialog's list)
export const SUBJECT_BOARD = { Edexcel: 'Pearson Edexcel', Eduqas: 'WJEC Eduqas' };

export function officialName({ level, subject, board, code }) {
  const tag = [board, code].filter(Boolean).join(' ');
  return [level, subject].filter(Boolean).join(' ') + (tag ? ` (${tag})` : '');
}

const listText = names => names.length < 2 ? (names[0] || '') : `${names.slice(0, -1).join(', ')} and ${names[names.length - 1]}`;
// free: names of the free sample topics, or null when not known yet
export function officialDescription({ subject, board, free = null, plusCount = 1 }) {
  const lead = `${[board, subject].filter(Boolean).join(' ')}: every topic on the specification, each with notes and practice questions.`;
  if (free && !plusCount) return `${lead} Every topic is free.`;
  const freeText = free === null ? 'Some topics are free to try.'
    : !free.length ? '' : `${listText(free)} ${free.length === 1 ? 'is' : 'are'} free to try.`;
  return [lead, freeText, 'The full pack comes with Plus.'].filter(Boolean).join(' ');
}

// Rewrite a standard pack's description from its free topics now (no change if
// it isn't an official standard pack, or its description was written by hand)
export async function refreshOfficialDescription(packId) {
  const p = (await getDoc(doc(db, 'content', packId)).catch(() => null))?.data();
  if (!p || p.ownerUid || !p.standard || p.descAuto === false || !p.subject) return null;
  const free = []; let plusCount = 0;
  for (const s of inOrder(await getDocs(collection(db, `content/${packId}/subjects`)))) {
    for (const t of inOrder(await getDocs(collection(db, `content/${packId}/subjects/${s.id}/topics`)))) {
      if (t.plusOnly === true) plusCount++; else free.push(t.name);
    }
  }
  const description = officialDescription({ subject: p.subject, board: p.examBoard, free: free.length || plusCount ? free : null, plusCount });
  if (description !== p.description) await updateDoc(doc(db, 'content', packId), { description });
  return description;
}
