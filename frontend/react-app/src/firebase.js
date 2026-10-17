// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { connectAuthEmulator, getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAn8ES7j5qykoUvXJtHF-_lF-9AyypaZEs",
  authDomain: "campus-vibe-7a95a.firebaseapp.com",
  projectId: "campus-vibe-7a95a",
  storageBucket: "campus-vibe-7a95a.firebasestorage.app",
  messagingSenderId: "877173034233",
  appId: "1:877173034233:web:4c5886049f3c2a9aafe628",
  measurementId: "G-4Y5FP8664P"
};

// Initialize Firebase
export const useEmulators = import.meta.env.DEV && import.meta.env.VITE_FIREBASE_EMULATORS === "true" && ["localhost", "127.0.0.1"].includes(location.hostname);
const app = initializeApp(useEmulators ? { ...firebaseConfig, projectId: "demo-campusvibe-feed" } : firebaseConfig);
export const auth = getAuth(app);
if (useEmulators) {
  connectAuthEmulator(auth, `http://127.0.0.1:${Number(import.meta.env.VITE_FIREBASE_AUTH_EMULATOR_PORT) || 9099}`, { disableWarnings: true });
}
