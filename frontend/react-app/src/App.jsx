import { useEffect, useRef } from "react";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
} from "firebase/auth";
import { auth } from "./firebase";
import originalMarkup from "../../index.html?raw";
import originalScript from "../../apps.js?raw";

export default function App() {
  const mountRef = useRef(null);

  useEffect(() => {
    window.campusFirebaseAuth = {
      auth,
      createUserWithEmailAndPassword,
      onAuthStateChanged,
      signInWithEmailAndPassword,
      signOut,
      updateProfile,
    };
    const parsedMarkup = new DOMParser().parseFromString(originalMarkup, "text/html");
    parsedMarkup.querySelectorAll("script").forEach(script => script.remove());
    mountRef.current.innerHTML = parsedMarkup.body.innerHTML;

    const appScript = document.createElement("script");
    appScript.textContent = `(() => {
      ${originalScript}
      Object.assign(window, { openAuth, closeAuth, closeOnBackdrop, switchTab, handleLogin, handleSignup, logout, syncFirebaseUser });
    })();`;
    document.body.append(appScript);
    const unsubscribeAuth = onAuthStateChanged(auth, user => window.syncFirebaseUser(user));

    return () => {
      unsubscribeAuth();
      appScript.remove();
      delete window.campusFirebaseAuth;
      delete window.syncFirebaseUser;
    };
  }, []);

  return <div ref={mountRef} />;
}