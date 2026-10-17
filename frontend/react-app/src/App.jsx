import { lazy, Suspense, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { CloudCheck, LoaderCircle, RotateCcw as RetryIcon } from 'lucide-react';
import { createAccountStore } from './account-store';
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
import { badgeProgress, createBadgeTracker } from "./progress-badges";
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
  const [account,setAccount] = useState(null);
  const [accountStatus,setAccountStatus] = useState({ready:false,pending:false,error:''});
  const [syncTarget,setSyncTarget] = useState(null);

  useEffect(() => {
    const demoBadges=createBadgeTracker();
    let activeAccount=null,unsubscribeAccount=null,accountBadges=null;
    window.campusBadgeProgress = (user,points) => {
      if (!user || user.id === 'demo') return demoBadges(user,points);
      if (!activeAccount?.ready()) return {...badgeProgress(points),newlyEarned:[],warning:'Loading account badges...'};
      return accountBadges(user,points);
    };
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
    setSyncTarget(mountRef.current.querySelector('#accountSyncMount'));
    const receiveSession = event => {
      const user=event.detail;
      if (activeAccount?.user.id !== user?.id) {
        unsubscribeAccount?.();activeAccount?.close();activeAccount=null;accountBadges=null;
        if (user && user.id !== 'demo') {
          const store=createAccountStore(user,eventCatalog);activeAccount=store;
          accountBadges=createBadgeTracker(()=>({
            getItem:()=>JSON.stringify(store.read('badges')),
            setItem:(_key,value)=>store.stage('badges',JSON.parse(value),50),
          }));
          const update=()=>{setAccountStatus(store.status());if(store.ready())window.campusAccountRefresh?.();};
          unsubscribeAccount=store.subscribe(update);setAccountStatus(store.status());
        }
        window.campusAccount=activeAccount;setAccount(activeAccount);
      }
      setFeedUser(user);
    };
    const guardUnload=event=>{if(activeAccount?.status().pending){event.preventDefault();event.returnValue='';}};
    const retryOnline=()=>activeAccount?.retry();
    window.addEventListener('beforeunload',guardUnload);window.addEventListener('online',retryOnline);
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
      unsubscribeAccount?.();activeAccount?.close();
      window.removeEventListener('beforeunload',guardUnload);window.removeEventListener('online',retryOnline);
      delete window.campusAccount;delete window.campusAccountRefresh;
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
      {syncTarget && account && createPortal(<div className={`account-sync-status ${accountStatus.error ? 'is-error' : ''}`} role="status" aria-live="polite"><span>{accountStatus.error ? <RetryIcon size={15} /> : !accountStatus.ready || accountStatus.pending ? <LoaderCircle size={15} /> : <CloudCheck size={15} />}{accountStatus.error || (!accountStatus.ready ? 'Loading your account...' : accountStatus.pending ? 'Syncing changes. Keep this page open.' : 'Saved to your account')}</span>{accountStatus.error && <button type="button" title="Retry account sync" aria-label="Retry account sync" onClick={()=>account.retry()}><RetryIcon size={15} /></button>}</div>,syncTarget)}
      {profileTarget && feedUser && (feedUser.id === 'demo' || accountStatus.ready) && createPortal(
        <Suspense fallback={<p role="status">Loading your profile...</p>}>
          <Profile key={feedUser.id} user={feedUser} account={account} />
        </Suspense>, profileTarget,
      )}
      {assistantTarget && feedUser && (feedUser.id === 'demo' || accountStatus.ready) && createPortal(
        <Suspense fallback={<p role="status">Loading the local assistant...</p>}>
          <Assistant key={feedUser.id} user={feedUser} account={account} />
        </Suspense>, assistantTarget,
      )}
      {suggestTarget && feedUser && (feedUser.id === 'demo' || accountStatus.ready) && createPortal(
        <Suspense fallback={<p role="status">Loading suggestions...</p>}>
          <Suggestions key={feedUser.id} user={feedUser} account={account} />
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
