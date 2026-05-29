/* ═══════════════════════════════════════════════════════════
   FIREBASE CONFIG — Emily's Revision Hub
   ═══════════════════════════════════════════════════════════ */

var FIREBASE_CFG = {
  apiKey:            "AIzaSyCOZxqDk_cQdW7VG25QrSc4zv-MYMIJLDw",
  authDomain:        "emilys-revision-hub.firebaseapp.com",
  databaseURL:       "https://emilys-revision-hub-default-rtdb.europe-west1.firebasedatabase.app",
  projectId:         "emilys-revision-hub",
  storageBucket:     "emilys-revision-hub.firebasestorage.app",
  messagingSenderId: "186424138043",
  appId:             "1:186424138043:web:a96ba579106010be66ff1e"
};

// Load Firebase and initialise
(function() {
  var app = document.createElement('script');
  app.src = 'https://www.gstatic.com/firebasejs/9.23.0/firebase-app-compat.js';
  app.onload = function() {
    var db = document.createElement('script');
    db.src = 'https://www.gstatic.com/firebasejs/9.23.0/firebase-database-compat.js';
    db.onload = function() {
      if (!firebase.apps.length) {
        firebase.initializeApp(FIREBASE_CFG);
        console.log('✅ Firebase connected — emilys-revision-hub');
      }
    };
    document.head.appendChild(db);
  };
  document.head.appendChild(app);
})();
