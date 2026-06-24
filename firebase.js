import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";

import {
getDatabase,
ref,
set,
push,
onValue,
remove
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-database.js";

import {
getStorage
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-storage.js";

import {
getAuth,
onAuthStateChanged,
signOut
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

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
const storage = getStorage(app);
const auth = getAuth(app);

onAuthStateChanged(auth,(user)=>{

    if(!user){

        window.location.href="login.html";

    }

});

window.db = db;
window.storage = storage;
window.ref = ref;
window.set = set;
window.push = push;
window.onValue = onValue;
window.remove = remove;
window.auth = auth;

window.logout = async function(){

    await signOut(auth);

    localStorage.removeItem("login");

    window.location.href="login.html";

}
