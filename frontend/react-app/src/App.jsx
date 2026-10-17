import { lazy, Suspense, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
  setPersistence,
  browserLocalPersistence,
  browserSessionPersistence,
  sendPasswordResetEmail,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import { auth } from "./firebase";
import {
  createIcons,
  ArrowRight,
  Bookmark,
  CalendarDays,
  Compass,
  GraduationCap,
  Hand,
  LayoutDashboard,
  Lightbulb,
  MapPin,
  MessageCircle,
  PartyPopper,
  Rss,
  Sparkles,
  UserRound,
  X,
  UsersRound,
  Mail,
  LockKeyhole,
  Eye,
  EyeOff,
  Search,
  SlidersHorizontal,
  Monitor,
  Paintbrush,
  Music,
  Trophy,
  BookOpen,
  RotateCcw,
  Clock,
  Camera,
  Gamepad2,
  Award,
  Medal,
  ShieldCheck,
  Crown,
  Check,
} from "lucide";
import { createBadgeTracker } from "./progress-badges";
import originalMarkup from "../../index.html?raw";
import originalScript from "../../apps.js?raw";
import dashboardScript from "../../dashboard.js?raw";
import discoverScript from "../../discover.js?raw";
import ThemeToggle from "./ThemeToggle";
import eventCatalog from "../../events.json";
const Feed = lazy(() => import("./FeedEntry"));
const Suggestions = lazy(() => import("./Suggestions"));
const Assistant = lazy(() => import("./Assistant"));
const Profile = lazy(() => import("./Profile"));

export default function App() {
  const mountRef = useRef(null);
  const [feedTarget, setFeedTarget] = useState(null);
  const [suggestTarget, setSuggestTarget] = useState(null);
  const [assistantTarget, setAssistantTarget] = useState(null);
  const [profileTarget, setProfileTarget] = useState(null);
  const [feedUser, setFeedUser] = useState(null);

  useEffect(() => {
    window.campusBadgeProgress = createBadgeTracker();
    window.campusFirebaseAuth = {
      auth,
      createUserWithEmailAndPassword,
      onAuthStateChanged,
      signInWithEmailAndPassword,
      signOut,
      updateProfile,
      setPersistence,
      browserLocalPersistence,
      browserSessionPersistence,
      sendPasswordResetEmail,
      GoogleAuthProvider,
      signInWithPopup,
    };
    const parsedMarkup = new DOMParser().parseFromString(
      originalMarkup,
      "text/html",
    );
    parsedMarkup
      .querySelectorAll("script")
      .forEach((script) => script.remove());
    mountRef.current.innerHTML = parsedMarkup.body.innerHTML;
    setFeedTarget(mountRef.current.querySelector("#feedMount"));
    setSuggestTarget(mountRef.current.querySelector("#suggestMount"));
    setAssistantTarget(mountRef.current.querySelector("#assistantMount"));
    setProfileTarget(mountRef.current.querySelector("#profileMount"));
    const receiveSession = (event) => setFeedUser(event.detail);
    window.addEventListener("campus-session-change", receiveSession);
    window.campusRenderIcons = () =>
      createIcons({
        icons: {
          ArrowRight,
          Bookmark,
          CalendarDays,
          Compass,
          GraduationCap,
          Hand,
          LayoutDashboard,
          Lightbulb,
          MapPin,
          MessageCircle,
          PartyPopper,
          Rss,
          Sparkles,
          UserRound,
          X,
          UsersRound,
          Mail,
          LockKeyhole,
          Eye,
          EyeOff,
          Search,
          SlidersHorizontal,
          Monitor,
          Paintbrush,
          Music,
          Trophy,
          BookOpen,
          RotateCcw,
          Clock,
          Camera,
          Gamepad2,
          Award,
          Medal,
          ShieldCheck,
          Crown,
          Check,
        },
        attrs: { "aria-hidden": "true", "stroke-width": 1.8 },
      });

    const appScript = document.createElement("script");
    appScript.textContent = `(() => {
      const EVENTS = ${JSON.stringify(eventCatalog)};
      ${dashboardScript}
      ${discoverScript}
      ${originalScript}
      Object.assign(window, { openAuth, closeAuth, closeOnBackdrop, switchTab, handleLogin, handleSignup, logout, syncFirebaseUser, campusSwitchWorkspace: switchWorkspace });
    })();`;
    document.body.append(appScript);
    const unsubscribeAuth = onAuthStateChanged(auth, (user) =>
      window.syncFirebaseUser(user),
    );

    return () => {
      unsubscribeAuth();
      appScript.remove();
      window.removeEventListener("campus-session-change", receiveSession);
      document.removeEventListener(
        "click",
        window.campusVibesNavigationHandler,
      );
      delete window.campusVibesNavigationHandler;
      delete window.campusFirebaseAuth;
      delete window.syncFirebaseUser;
      delete window.campusRenderIcons;
      delete window.campusSwitchWorkspace;
      delete window.campusAssistant;
      delete window.campusProfile;
      delete window.campusBadgeProgress;
      window.campusAuthCleanup?.();
      delete window.campusAuthCleanup;
      window.campusNavigationCleanup?.();
      delete window.campusNavigationCleanup;
      window.campusBadgeCleanup?.();
      delete window.campusBadgeCleanup;
    };
  }, []);

  return (
    <>
      <ThemeToggle />
      <div ref={mountRef} />
      {profileTarget && feedUser && createPortal(
        <Suspense fallback={<p role="status">Loading your profile...</p>}>
          <Profile key={feedUser.id} user={feedUser} />
        </Suspense>, profileTarget,
      )}
      {assistantTarget && feedUser && createPortal(
        <Suspense fallback={<p role="status">Loading the local assistant...</p>}>
          <Assistant key={feedUser.id} user={feedUser} />
        </Suspense>, assistantTarget,
      )}
      {suggestTarget && feedUser && createPortal(
        <Suspense fallback={<p role="status">Loading suggestions...</p>}>
          <Suggestions key={feedUser.id} user={feedUser} />
        </Suspense>, suggestTarget,
      )}
      {feedTarget &&
        feedUser &&
        createPortal(
          <Suspense
            fallback={
              <p role="status" className="feed-loading">
                Loading your feed...
              </p>
            }
          >
            <Feed key={feedUser.id} user={feedUser} />
          </Suspense>,
          feedTarget,
        )}
    </>
  );
}
