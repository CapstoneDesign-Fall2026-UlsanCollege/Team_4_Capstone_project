import { useEffect, useRef } from "react";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
} from "firebase/auth";
import { auth } from "./firebase";
import { createIcons, ArrowRight, Bookmark, CalendarDays, GraduationCap, Hand, Lightbulb, MapPin, MessageCircle, PartyPopper, Sparkles, X } from "lucide";
import originalMarkup from "../../index.html?raw";
import originalScript from "../../apps.js?raw";
import dashboardScript from "../../dashboard.js?raw";

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
    window.campusRenderIcons = () => createIcons({
      icons: { ArrowRight, Bookmark, CalendarDays, GraduationCap, Hand, Lightbulb, MapPin, MessageCircle, PartyPopper, Sparkles, X },
      attrs: { "aria-hidden": "true", "stroke-width": 1.8 },
    });

    const appScript = document.createElement("script");
    appScript.textContent = `(() => {
      ${dashboardScript}
      ${originalScript}
      Object.assign(window, { openAuth, closeAuth, closeOnBackdrop, switchTab, handleLogin, handleSignup, logout, syncFirebaseUser });
    })();`;
    document.body.append(appScript);
    const unsubscribeAuth = onAuthStateChanged(auth, user => window.syncFirebaseUser(user));

    return () => {
      unsubscribeAuth();
      appScript.remove();
      document.removeEventListener("click", window.campusVibesNavigationHandler);
      delete window.campusVibesNavigationHandler;
      delete window.campusFirebaseAuth;
      delete window.syncFirebaseUser;
      delete window.campusRenderIcons;
    };
  }, []);

  return <div ref={mountRef} />;
}
