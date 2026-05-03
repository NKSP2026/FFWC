// Firebase Setup (einmal für alle Seiten)

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getDatabase, ref, set, push, onValue } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-database.js";

const firebaseConfig = {
  apiKey: "AIzaSy...",
  authDomain: "ffwc-d3994.firebaseapp.com",
  databaseURL: "https://ffwc-d3994-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "ffwc-d3994",
  storageBucket: "ffwc-d3994.firebasestorage.app",
  messagingSenderId: "591233232022",
  appId: "1:591233232022:web:66ce4e0349d426e94ae6b7"
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

window.db = db;
window.ref = ref;
window.set = set;
window.push = push;
window.onValue = onValue;
