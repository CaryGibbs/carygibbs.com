// ============================================================
// CLASP — Firebase Configuration
// Database: Firestore (switched from Realtime Database)
// Reason: Realtime Database uses WebSockets which are blocked
//         by carygibbs.com Google Workspace org policy.
//         Firestore uses HTTPS — no WebSocket dependency.
// ============================================================

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";
import { getStorage } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-storage.js";

const firebaseConfig = {
  apiKey:            "AIzaSyAUTgJH3KELX8B4AcTyI4zdsGzzhgSybtE",
  authDomain:        "clasp-hub.firebaseapp.com",
  projectId:         "clasp-hub",
  storageBucket:     "clasp-hub.firebasestorage.app",
  messagingSenderId: "820025085835",
  appId:             "1:820025085835:web:fd3165045769ea492fe98e",
  measurementId:     "G-V4ZFHVNQ73"
};

const app     = initializeApp(firebaseConfig);
const auth    = getAuth(app);
const db      = getFirestore(app);
const storage = getStorage(app);

export { app, auth, db, storage };
