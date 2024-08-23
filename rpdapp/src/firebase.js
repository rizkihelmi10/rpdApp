// src/firebase.js
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { getStorage } from "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyDQVgA51ytEQ4mqXeP7MZKeD9LAmW8dI08",
    authDomain: "rpdmobile-9bf04.firebaseapp.com",
    projectId: "rpdmobile-9bf04",
    storageBucket: "rpdmobile-9bf04.appspot.com",
    messagingSenderId: "161921837157",
    appId: "1:161921837157:web:028e7989f9e5e80a367e8c",
    measurementId: "G-LFS2TXL80Q"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore
const db = getFirestore(app);

// Initialize Auth
const auth = getAuth(app);

const storage = getStorage(app);

export { db, auth, storage };