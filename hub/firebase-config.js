// ============================================================
// CLASP — Firebase Configuration
// New project: clasp-hub (separate from Emily's Revision Hub)
// ============================================================

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-auth.js";
import { getDatabase } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-database.js";
import { getStorage } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-storage.js";

const firebaseConfig = {
  apiKey:            "AIzaSyAUTgJH3KELX8B4AcTyI4zdsGzzhgSybtE",
  authDomain:        "clasp-hub.firebaseapp.com",
  databaseURL:       "https://clasp-hub-default-rtdb.europe-west1.firebasedatabase.app",
  projectId:         "clasp-hub",
  storageBucket:     "clasp-hub.firebasestorage.app",
  messagingSenderId: "820025085835",
  appId:             "1:820025085835:web:fd3165045769ea492fe98e",
  measurementId:     "G-V4ZFHVNQ73"
};

const app     = initializeApp(firebaseConfig);
const auth    = getAuth(app);
const db      = getDatabase(app);
const storage = getStorage(app);

export { app, auth, db, storage };
