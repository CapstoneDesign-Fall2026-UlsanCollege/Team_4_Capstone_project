// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
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
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);