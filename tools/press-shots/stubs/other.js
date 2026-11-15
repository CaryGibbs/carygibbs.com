// Stand-ins for firebase-app and firebase-storage.
export const initializeApp = (cfg, name) => ({ name: name || '[DEFAULT]', options: cfg });
export const deleteApp = async () => {};
export const getApp = () => ({ name: '[DEFAULT]' });
export const getApps = () => [];
export const getStorage = () => ({});
export const ref = (s, p) => ({ fullPath: p });
export const uploadBytes = async () => ({});
export const uploadBytesResumable = () => ({ on: () => {} });
export const getDownloadURL = async () => '';
export const deleteObject = async () => {};
export const listAll = async () => ({ items: [], prefixes: [] });
