import { lazy, Suspense, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { CloudCheck, LoaderCircle, RotateCcw as RetryIcon } from 'lucide-react';
import { createAccountStore } from './account-store';
import { useProfilePhoto } from './profile-photo-store';
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
import { eventCatalog,replacePublishedEvents } from './event-catalog';
import { watchPublishedEvents } from './published-events-store';
import { catalogSnapshotStatus, catalogStatusText } from './event-catalog-status';
import './event-catalog.css';
import { getEventMapLinks } from './event-maps';
import { createEventJourneyController } from './event-journey';
import Notifications from './Notifications';
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
  const [notificationsTarget, setNotificationsTarget] = useState(null);
  const [notificationRequest, setNotificationRequest] = useState(null);
  const [feedUser, setFeedUser] = useState(null);
  const [account,setAccount] = useState(null);
  const [accountStatus,setAccountStatus] = useState({ready:false,pending:false,error:''});
  const [syncTarget,setSyncTarget] = useState(null);
  const [catalogTarget,setCatalogTarget] = useState(null);
  const [catalogStatus,setCatalogStatus] = useState({loading:false,error:'',count:0,cached:false});
  const retryCatalog = useRef(null);
  const navPhoto = useProfilePhoto(feedUser?.id !== 'demo' ? feedUser?.id : '');
  useEffect(() => {
    const paint = () => {
      const avatar = document.getElementById('navAvatar');
      if (!avatar) return;
      avatar.replaceChildren(document.createTextNode(feedUser?.name?.trim().charAt(0).toUpperCase() || '?'));
      if (!navPhoto.photo || auth.currentUser?.uid !== feedUser?.id) return;
      const img = document.createElement('img');
      img.src = navPhoto.photo; img.alt = ''; img.style.cssText = 'width:100%;height:100%;object-fit:cover;border-radius:50%;';
      img.onerror = () => avatar.replaceChildren(document.createTextNode(feedUser?.name?.trim().charAt(0).toUpperCase() || '?'));
      avatar.replaceChildren(img);
    };
    paint(); window.addEventListener('campus-avatar-refresh', paint);
    return () => window.removeEventListener('campus-avatar-refresh', paint);
  }, [feedUser?.id, feedUser?.name, navPhoto.photo]);

  useEffect(() => {
    const demoBadges=createBadgeTracker();
    window.campusEventMapLinks = getEventMapLinks;
    const eventJourney = createEventJourneyController();
    window.campusEventJourney = eventJourney;
    let journeyUserId = null;
    let activeAccount=null,unsubscribeAccount=null,accountBadges=null;
    let stopCatalog=null,catalogUser=null,catalogGeneration=0;
    window.campusEventCatalog=eventCatalog;
    const refreshCatalog = () => { window.campusRefreshEvents?.(); setCatalogStatus(value=>({...value})); };
    const connectCatalog = user => {
      stopCatalog?.(); const generation=++catalogGeneration;
      setCatalogStatus(value=>({...value,loading:true,error:''}));
      stopCatalog=watchPublishedEvents(user,(events,cached)=>{
        if(generation !== catalogGeneration)return;
        replacePublishedEvents(events);setCatalogStatus(catalogSnapshotStatus(events,cached));refreshCatalog();
      },()=>{if(generation === catalogGeneration)setCatalogStatus(value=>({...value,loading:false,error:'Shared events could not be refreshed. Previously loaded events may be out of date; sample listings are still available.'}));});
    };
    retryCatalog.current=()=>{if(catalogUser && catalogUser.id !== 'demo')connectCatalog(catalogUser);};
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
    const journeyDialog = mountRef.current.querySelector('#dashboardDialog');
    journeyDialog.addEventListener('close', eventJourney.clear);
    setFeedTarget(mountRef.current.querySelector("#feedMount"));
    setSuggestTarget(mountRef.current.querySelector("#suggestMount"));
    setAssistantTarget(mountRef.current.querySelector("#assistantMount"));
    setProfileTarget(mountRef.current.querySelector("#profileMount"));
    setNotificationsTarget(mountRef.current.querySelector('#notificationsMount'));
    setSyncTarget(mountRef.current.querySelector('#accountSyncMount'));
    setCatalogTarget(mountRef.current.querySelector('#eventCatalogStatus'));
    const receiveSession = event => {
      const user=event.detail;
      if (catalogUser?.id !== user?.id) {
        stopCatalog?.();stopCatalog=null;++catalogGeneration;catalogUser=user;
        replacePublishedEvents([]);setCatalogStatus({loading:false,error:'',count:0,cached:false});
        if(user && user.id !== 'demo') connectCatalog(user);
      }
      if (journeyUserId !== user?.id) { eventJourney.clear(); journeyUserId = user?.id; }
      setNotificationRequest(current => current?.userId === user?.id ? current : null);
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
      if(user)window.campusRefreshEvents?.();
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
      const EVENTS = window.campusEventCatalog;
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
      stopCatalog?.();++catalogGeneration;replacePublishedEvents([]);retryCatalog.current=null;
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
      delete window.campusEventMapLinks;
      journeyDialog.removeEventListener('close', eventJourney.clear);
      eventJourney.clear();
      delete window.campusEventJourney;
      delete window.campusEventCatalog;delete window.campusRefreshEvents;
      window.campusAuthCleanup?.();
      delete window.campusAuthCleanup;
      window.campusNavigationCleanup?.();
      delete window.campusNavigationCleanup;
      window.campusBadgeCleanup?.();
      delete window.campusBadgeCleanup;
    };
  }, []);

  const selectedNotification = notificationRequest?.userId === feedUser?.id ? notificationRequest : null;
  const followNotification = item => {
    if (!feedUser) return;
    setNotificationRequest({ userId: feedUser.id, item, requestId: crypto.randomUUID() });
    if (item.workspace === 'feed') { window.campusSwitchWorkspace?.('feed'); return; }
    if (item.kind.startsWith('suggestion-')) { window.campusAssistant?.navigate('suggest'); return; }
    if (item.kind === 'badge') {
      window.campusAssistant?.navigate('dashboard');
      document.querySelector('#viewProgress')?.click();
      return;
    }
    const eventId = Number(item.sourceId.split('_')[0]);
    window.campusAssistant?.navigate('discover');
    if (eventCatalog.some(event => event.id === eventId)) window.campusAssistant?.openEvent(eventId);
  };

  return (
    <>
      <ThemeToggle />
      <div ref={mountRef} />
      {catalogTarget && feedUser && createPortal(<div className={`event-catalog-status ${catalogStatus.error ? 'is-error' : ''}`} role={catalogStatus.error ? 'alert' : 'status'} aria-live="polite"><span>{catalogStatusText(catalogStatus,feedUser.id === 'demo')}</span>{feedUser.id !== 'demo' && (catalogStatus.error || catalogStatus.cached) && <button type="button" onClick={()=>retryCatalog.current?.()}>Retry shared events</button>}</div>,catalogTarget)}
      {notificationsTarget && feedUser && createPortal(<Notifications key={feedUser.id} user={feedUser} onOpen={followNotification} />, notificationsTarget)}
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
          <Suggestions key={feedUser.id} user={feedUser} account={account} notification={selectedNotification} />
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
            <Feed key={feedUser.id} user={feedUser} notification={selectedNotification} />
          </Suspense>,
          feedTarget,
        )}
    </>
  );
}
