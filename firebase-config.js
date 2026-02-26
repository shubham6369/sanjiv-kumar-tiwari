// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { getFirestore, collection, addDoc, getDocs, onSnapshot, query, orderBy, updateDoc, doc, deleteDoc } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-storage.js";

const firebaseConfig = {
    apiKey: "AIzaSyDRtf6Nl_rYM3S_TXSo3Fx-MwbNLf6RLR8",
    authDomain: "sanjeevkumar-2beff.firebaseapp.com",
    projectId: "sanjeevkumar-2beff",
    storageBucket: "sanjeevkumar-2beff.firebasestorage.app",
    messagingSenderId: "179014952526",
    appId: "1:179014952526:web:8f24e7475a879ac6b8051f",
    measurementId: "G-S9T0B6NP05"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app);

export { db, collection, addDoc, getDocs, onSnapshot, query, orderBy, updateDoc, doc, deleteDoc, storage, ref, uploadBytesResumable, getDownloadURL };
