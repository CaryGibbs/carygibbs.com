// Stand-in for Firebase Auth: always signed in as window.__DEMO_UID.
const uid = window.__DEMO_UID || 'demo-parent';
const user = { uid, email: (window.__DEMO || {})['users/' + uid]?.email || 'demo@example.com',
  displayName: (window.__DEMO || {})['users/' + uid]?.name || 'Demo', getIdToken: async () => 'demo-token', emailVerified: true };
const auth = { currentUser: user };
export const getAuth = () => auth;
export const initializeAuth = () => auth;
export const onAuthStateChanged = (a, cb) => { setTimeout(() => cb(user), 5); return () => {}; };
export const signOut = async () => {};
export const signInWithEmailAndPassword = async () => ({ user });
export const createUserWithEmailAndPassword = async () => ({ user: { ...user, uid: 'demo-new' } });
export const sendPasswordResetEmail = async () => {};
export const updateProfile = async () => {};
export const updatePassword = async () => {};
export const updateEmail = async () => {};
export const reauthenticateWithCredential = async () => {};
export const EmailAuthProvider = { credential: () => ({}) };
export const browserLocalPersistence = {}; export const setPersistence = async () => {};
export const deleteUser = async () => {};
export const sendEmailVerification = async () => {};
