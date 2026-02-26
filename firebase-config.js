// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { getFirestore, collection, addDoc, getDocs, onSnapshot, query, orderBy, updateDoc, doc, deleteDoc } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";

const firebaseConfig = {
    apiKey: "AIzaSyCD-_Hl3yzvtk1sADLv0Bxr5UwK21_GW4g",
    authDomain: "sanjeevkumar-10e39.firebaseapp.com",
    projectId: "sanjeevkumar-10e39",
    storageBucket: "sanjeevkumar-10e39.firebasestorage.app",
    messagingSenderId: "308312312401",
    appId: "1:308312312401:web:0b272be1fba7c83150c670",
    measurementId: "G-FMW6F7D1M5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db, collection, addDoc, getDocs, onSnapshot, query, orderBy, updateDoc, doc, deleteDoc };
