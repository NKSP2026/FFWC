import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";

import {
    getDatabase,
    ref,
    push,
    set,
    update,
    remove,
    onValue,
    get,
    child
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-database.js";

import {
    getStorage,
    ref as storageRef,
    uploadBytes,
    getDownloadURL,
    deleteObject
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-storage.js";

import {
    getAuth,
    onAuthStateChanged,
    signOut
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

/* =========================================
   FIREBASE CONFIG
========================================= */

const firebaseConfig = {

    apiKey: "AIzaSyDSYQZGiKbXjy9142dKq_4Upc9zfvekOHE",

    authDomain: "ffwc-d3994.firebaseapp.com",

    databaseURL:
    "https://ffwc-d3994-default-rtdb.europe-west1.firebasedatabase.app",

    projectId: "ffwc-d3994",

    storageBucket: "ffwc-d3994.firebasestorage.app",

    messagingSenderId: "591233232022",

    appId:
    "1:591233232022:web:66ce4e0349d426e94ae6b7",

    measurementId: "G-BG75M1KXHL"
};

/* =========================================
   INITIALISIERUNG
========================================= */

const app = initializeApp(firebaseConfig);

const db = getDatabase(app);

const storage = getStorage(app);

const auth = getAuth(app);

/* =========================================
   GLOBAL EXPORT
========================================= */

window.db = db;
window.storage = storage;
window.auth = auth;

/* =========================================
   FIREBASE FUNKTIONEN GLOBAL
========================================= */

/* Realtime Database */
window.ref = ref;
window.push = push;
window.set = set;
window.update = update;
window.remove = remove;
window.onValue = onValue;
window.get = get;
window.child = child;

/* Storage */
window.storageRef = storageRef;
window.uploadBytes = uploadBytes;
window.getDownloadURL = getDownloadURL;
window.deleteObject = deleteObject;

/* =========================================
   AUTO LOGOUT NACH 8 STUNDEN
========================================= */

const LOGIN_TIME_KEY = "loginTime";

onAuthStateChanged(auth, async(user)=>{

    /* NICHT EINGELOGGT */
    if(!user){

        if(
            !window.location.pathname.includes("login.html")
        ){

            window.location.href = "login.html";

        }

        return;
    }

    /* LOGIN ZEIT */
    let loginTime =
        localStorage.getItem(LOGIN_TIME_KEY);

    if(!loginTime){

        localStorage.setItem(
            LOGIN_TIME_KEY,
            Date.now()
        );

    }else{

        let diff =
            Date.now() -
            parseInt(loginTime);

        /* 8 STUNDEN */
        let max =
            8 * 60 * 60 * 1000;

        if(diff > max){

            await signOut(auth);

            localStorage.removeItem(
                LOGIN_TIME_KEY
            );

            alert(
                "Sitzung abgelaufen. Bitte erneut anmelden."
            );

            window.location.href =
                "login.html";

            return;
        }
    }

});

/* =========================================
   LOGOUT
========================================= */

window.logout = async function(){

    try{

        await signOut(auth);

        localStorage.removeItem(
            LOGIN_TIME_KEY
        );

        window.location.href =
            "login.html";

    }catch(e){

        console.error(e);

        alert("Logout Fehler");

    }

};

/* =========================================
   HELFER
========================================= */

/* DATUM */
window.nowDate = function(){

    return new Date()
    .toLocaleDateString("de-DE");

};

/* UHRZEIT */
window.nowTime = function(){

    return new Date()
    .toLocaleTimeString(
        "de-DE",
        {
            hour:"2-digit",
            minute:"2-digit"
        }
    );

};

/* ID */
window.makeId = function(){

    return Date.now().toString();

};

/* DEBUG */
console.log("🔥 Firebase System geladen");
console.log("🔥 DB:", db);
