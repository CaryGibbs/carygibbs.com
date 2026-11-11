// ============================================================
// LOBE LIMPET: the order subjects and topics are shown in
// Each subject and topic may have a number, `order` (set with the arrows
// in the pack builder). Anything without one comes after, sorted by name
// in natural order, so "Micro 2" comes before "Micro 10".
// Sort in the browser rather than with orderBy('order'): a Firestore
// orderBy leaves out documents that don't have the field at all.
// ============================================================

const collator = new Intl.Collator('en-GB', { numeric: true, sensitivity: 'base' });
const hasOrder = x => typeof x?.order === 'number' && isFinite(x.order);
const created = x => x?.createdAt?.seconds ? x.createdAt.seconds * 1000 : (typeof x?.createdAt === 'number' ? x.createdAt : 0);

export function byOrder(a, b) {
  const ao = hasOrder(a), bo = hasOrder(b);
  if (ao && bo && a.order !== b.order) return a.order - b.order;
  if (ao !== bo) return ao ? -1 : 1;
  return collator.compare(a?.name || '', b?.name || '') || created(a) - created(b);
}

// A Firestore snapshot (or array) as [{ id, ...data }] in display order
export function inOrder(snapOrList) {
  const list = [];
  if (Array.isArray(snapOrList)) list.push(...snapOrList);
  else snapOrList?.forEach?.(d => list.push({ id: d.id, ...d.data() }));
  return list.sort(byOrder);
}
