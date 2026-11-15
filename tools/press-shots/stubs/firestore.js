// In-memory stand-in for the Firestore SDK, for press screenshots only.
// Data comes from window.__DEMO (path -> object). Writes change memory only.
const store = new Map(Object.entries(window.__DEMO || {}));
const listeners = new Set();
const clone = v => v === undefined ? undefined : JSON.parse(JSON.stringify(v, (k, x) => x instanceof Ts ? { __ts: x.ms } : x), (k, x) => (x && typeof x === 'object' && '__ts' in x) ? new Ts(x.__ts) : x);

class Ts { constructor(ms) { this.ms = ms; this.seconds = Math.floor(ms / 1000); this.nanoseconds = 0; }
  toMillis() { return this.ms; } toDate() { return new Date(this.ms); } valueOf() { return this.ms; } }
export const Timestamp = { now: () => new Ts(Date.now()), fromMillis: ms => new Ts(ms), fromDate: d => new Ts(+d) };

const join = (...parts) => parts.flat().filter(p => p !== undefined && p !== null && p !== '').map(String).join('/').split('/').filter(Boolean).join('/');
class DocRef { constructor(path) { this.path = path; this.id = path.split('/').pop(); this.type = 'document'; }
  get parent() { return new ColRef(this.path.split('/').slice(0, -1).join('/')); } }
class ColRef { constructor(path) { this.path = path; this.id = path.split('/').pop(); this.type = 'collection'; this._c = []; } }

export function initializeFirestore() { return { type: 'firestore' }; }
export function getFirestore() { return { type: 'firestore' }; }
let autoId = 0;
export function doc(base, ...segs) {
  if (base instanceof ColRef) return new DocRef(join(base.path, segs.length ? segs : ['demo' + (++autoId)]));
  return new DocRef(join(segs));
}
export function collection(base, ...segs) {
  if (base instanceof DocRef) return new ColRef(join(base.path, segs));
  return new ColRef(join(segs));
}
export function collectionGroup(db, id) { const c = new ColRef(id); c._group = true; return c; }

// Query constraints
export const where = (field, op, value) => ({ kind: 'where', field, op, value });
export const orderBy = (field, dir = 'asc') => ({ kind: 'orderBy', field, dir });
export const limit = n => ({ kind: 'limit', n });
export const limitToLast = n => ({ kind: 'limit', n });
export const startAfter = () => ({ kind: 'noop' });
export const startAt = () => ({ kind: 'noop' });
export const documentId = () => '__name__';
export function query(col, ...cs) { const q = new ColRef(col.path); q._group = col._group; q._c = [...(col._c || []), ...cs]; return q; }

const get = (o, f) => f === '__name__' ? o.__id : String(f).split('.').reduce((a, k) => a?.[k], o);
const cmp = (a, b) => (a?.valueOf?.() ?? a) < (b?.valueOf?.() ?? b) ? -1 : (a?.valueOf?.() ?? a) > (b?.valueOf?.() ?? b) ? 1 : 0;
function test(o, w) {
  const v = get(o, w.field);
  switch (w.op) {
    case '==': return v === w.value || (v?.valueOf?.() === w.value?.valueOf?.() && v !== undefined);
    case '!=': return v !== w.value;
    case '<': return cmp(v, w.value) < 0; case '<=': return cmp(v, w.value) <= 0;
    case '>': return cmp(v, w.value) > 0; case '>=': return cmp(v, w.value) >= 0;
    case 'in': return (w.value || []).includes(v);
    case 'not-in': return !(w.value || []).includes(v);
    case 'array-contains': return Array.isArray(v) && v.includes(w.value);
    case 'array-contains-any': return Array.isArray(v) && v.some(x => (w.value || []).includes(x));
    default: return true;
  }
}
class DocSnap { constructor(path) { this.ref = new DocRef(path); this.id = this.ref.id; this._d = store.get(path); }
  exists() { return this._d !== undefined; } data() { return clone(this._d); } get(f) { return get(this._d || {}, f); } }
class QuerySnap { constructor(docs) { this.docs = docs; this.size = docs.length; this.empty = !docs.length; }
  forEach(fn) { this.docs.forEach(fn); } docChanges() { return this.docs.map(d => ({ type: 'added', doc: d })); } }

function runQuery(q) {
  const depth = q.path.split('/').length;
  let paths = [...store.keys()].filter(p => q._group
    ? p.split('/').length % 2 === 0 && p.split('/').slice(-2, -1)[0] === q.id
    : p.startsWith(q.path + '/') && p.split('/').length === depth + 1);
  let docs = paths.map(p => ({ p, o: { ...store.get(p), __id: p.split('/').pop() } }));
  for (const c of q._c || []) {
    if (c.kind === 'where') docs = docs.filter(d => test(d.o, c));
    if (c.kind === 'orderBy') docs.sort((a, b) => cmp(get(a.o, c.field), get(b.o, c.field)) * (c.dir === 'desc' ? -1 : 1));
    if (c.kind === 'limit') docs = docs.slice(0, c.n);
  }
  return new QuerySnap(docs.map(d => new DocSnap(d.p)));
}
const later = v => new Promise(r => setTimeout(() => r(v), 5));
export const getDoc = ref => later(new DocSnap(ref.path));
export const getDocFromServer = getDoc;
export const getDocs = q => later(runQuery(q));
export const getDocsFromServer = getDocs;
export const getCountFromServer = q => later({ data: () => ({ count: runQuery(q).size }) });
export function onSnapshot(ref, next, err) {
  const fire = () => (typeof next === 'function' ? next : next?.next)?.(ref instanceof DocRef ? new DocSnap(ref.path) : runQuery(ref));
  setTimeout(fire, 5);
  listeners.add(fire);
  return () => listeners.delete(fire);
}

// Writes (memory only)
const DEL = { __op: 'delete' }, TS = { __op: 'ts' };
export const deleteField = () => DEL;
export const serverTimestamp = () => TS;
export const arrayUnion = (...v) => ({ __op: 'union', v });
export const arrayRemove = (...v) => ({ __op: 'remove', v });
export const increment = n => ({ __op: 'inc', n });
function apply(target, data, merge) {
  const out = merge ? clone(target || {}) : {};
  for (const [k, v] of Object.entries(data)) {
    const keys = k.split('.'); let o = out;
    keys.slice(0, -1).forEach(x => { o[x] = o[x] && typeof o[x] === 'object' ? o[x] : {}; o = o[x]; });
    const last = keys[keys.length - 1];
    if (v === DEL) delete o[last];
    else if (v === TS) o[last] = new Ts(Date.now());
    else if (v?.__op === 'union') o[last] = [...new Set([...(o[last] || []), ...v.v])];
    else if (v?.__op === 'remove') o[last] = (o[last] || []).filter(x => !v.v.includes(x));
    else if (v?.__op === 'inc') o[last] = (o[last] || 0) + v.n;
    else o[last] = clone(v);
  }
  return out;
}
const changed = () => setTimeout(() => listeners.forEach(f => f()), 5);
export async function setDoc(ref, data, opts) { store.set(ref.path, apply(store.get(ref.path), data, !!opts?.merge)); changed(); }
export async function updateDoc(ref, data, ...more) {
  if (typeof data === 'string') { const o = {}; const a = [data, ...more]; for (let i = 0; i < a.length; i += 2) o[a[i]] = a[i + 1]; data = o; }
  store.set(ref.path, apply(store.get(ref.path), data, true)); changed();
}
export async function addDoc(col, data) { const r = doc(col); await setDoc(r, data); return r; }
export async function deleteDoc(ref) { store.delete(ref.path); changed(); }
export function writeBatch() {
  const ops = [];
  return { set: (r, d, o) => ops.push(() => setDoc(r, d, o)), update: (r, d) => ops.push(() => updateDoc(r, d)),
    delete: r => ops.push(() => deleteDoc(r)), commit: async () => { for (const op of ops) await op(); } };
}
export async function runTransaction(db, fn) {
  return fn({ get: getDoc, set: (r, d, o) => setDoc(r, d, o), update: (r, d) => updateDoc(r, d), delete: r => deleteDoc(r) });
}
export const enableIndexedDbPersistence = async () => {};
export const persistentLocalCache = () => ({}); export const persistentMultipleTabManager = () => ({});
export const memoryLocalCache = () => ({});
