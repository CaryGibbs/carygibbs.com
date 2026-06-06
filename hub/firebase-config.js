// ============================================================
// CLASP — Firebase Configuration
// Project: clasp-revision (under clasp.hub.app@gmail.com)
// No org policy restrictions — clean Gmail account
// ============================================================

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";
import { getStorage } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-storage.js";

const firebaseConfig = {
  apiKey:            "AIzaSyDjkqzERaCoaGUBeQCHpaVtwPEbcWN5yB4",
  authDomain:        "clasp-revision.firebaseapp.com",
  projectId:         "clasp-revision",
  storageBucket:     "clasp-revision.firebasestorage.app",
  messagingSenderId: "572497127970",
  appId:             "1:572497127970:web:bbb8545007c73dcfc4387b",
  measurementId:     "G-HXB68GZGWZ"
};

const app     = initializeApp(firebaseConfig);
const auth    = getAuth(app);
const db      = getFirestore(app);
const storage = getStorage(app);

export { app, auth, db, storage };
