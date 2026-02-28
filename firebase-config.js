// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc, getDocs, onSnapshot, query, orderBy, updateDoc, doc, deleteDoc, where, setDoc, getDoc } from "firebase/firestore";
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut, onAuthStateChanged, createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile, setPersistence, browserSessionPersistence, sendPasswordResetEmail } from "firebase/auth";

const firebaseConfig = {
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
    authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
    projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
    storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
    appId: import.meta.env.VITE_FIREBASE_APP_ID,
    measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const adminApp = initializeApp(firebaseConfig, "admin-app"); // Separate App for Admin to unsync logins
const db = getFirestore(app);
const storage = getStorage(app);
const auth = getAuth(app);
const adminAuth = getAuth(adminApp);
const googleProvider = new GoogleAuthProvider();

export { db, collection, addDoc, getDocs, onSnapshot, query, orderBy, updateDoc, doc, deleteDoc, where, setDoc, getDoc, storage, ref, uploadBytesResumable, getDownloadURL, auth, adminAuth, googleProvider, signInWithPopup, signOut, onAuthStateChanged, createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile, setPersistence, browserSessionPersistence, sendPasswordResetEmail };
