

/* ── Constants ── */
const SAVED_KEY   = "cv_saved";
let currentSession = null;
let currentInterestFilter = "all";
let currentEventSearch = "";

/* ── Helpers ── */
const $ = (sel) => document.querySelector(sel);
const getSession = () => currentSession;
const getSaved = () => {
  if (getSession() && getSession().id !== "demo") return window.campusAccount?.read("saved") || [];
  try { const value = JSON.parse(localStorage.getItem(SAVED_KEY) || "[]"); return Array.isArray(value) ? [...new Set(value.filter(id => EVENTS.some(event => event.id === id)))] : []; }
  catch { return []; }
};
const saveSaved = (ids) => getSession()?.id !== "demo" && getSession() ? window.campusAccount.write("saved",ids) : localStorage.setItem(SAVED_KEY, JSON.stringify(ids));

function showToast(msg){
  const t = $("#toast");
  t.textContent = msg;
  t.classList.remove("hidden");
  clearTimeout(t._timer);
  t._timer = setTimeout(() => t.classList.add("hidden"), 3200);
}

/* ── Event rendering and discovery filters ── */
const GRADIENTS = (hue) =>
  `linear-gradient(135deg, ${hue}, #4528a8)`;

function eventPhoto(event){
  return `/assets/${event.photo}`;
}

function eventBannerMedia(event){
  return `<img class="event-cover" src="${eventPhoto(event)}" alt="" loading="lazy">`;
}

function renderEvents(filter = currentInterestFilter, search = currentEventSearch){
  currentInterestFilter = filter;
  currentEventSearch = search;
  const grid = $("#eventsGrid");
  const query = search.trim().toLocaleLowerCase();
  const saved = getSaved();
  const list = EVENTS.filter(event =>
    (filter === "all" || event.interest === filter) &&
    (!currentSavedOnly || saved.includes(event.id)) &&
    (!query || [event.title, event.host, event.location, event.interest].join(" ").toLocaleLowerCase().includes(query))
  ).sort((a, b) => currentEventSort === "title" ? a.title.localeCompare(b.title) : (currentEventSort === "latest" ? -1 : 1) * a.date.localeCompare(b.date));
  grid.innerHTML = list.map(event => discoverCardMarkup(event, saved)).join("");
  $("#emptyState").classList.toggle("hidden", list.length > 0);
  $("#eventResults").textContent = `Showing ${list.length} of ${EVENTS.length} events`;
  $("#clearEventFilters").disabled = filter === "all" && !query && !currentSavedOnly && currentEventSort === "date";
  renderDiscoverSidebar();
  window.campusRenderIcons?.();
}

function renderUpcoming(){
  const list = $("#upcomingList");
  list.innerHTML = EVENTS.slice(0, 5).map(e => {
    const date = new Date(e.date + "T00:00:00");
    return `<button class="upcoming-item" data-page="discover" data-interest-jump="${e.interest}">
      <span class="upcoming-date"><strong>${String(date.getDate()).padStart(2, "0")}</strong><span>${date.toLocaleString("en-US", {month:"short"})}</span></span>
      <span><h3>${e.title}</h3><p>📍 ${e.location}</p></span>
      <span class="upcoming-meta">${e.time}<br><span class="interest-mini">${e.interest}</span></span>
    </button>`;
  }).join("");
}

function renderSavedEvents(){
  const saved = getSaved();
  const grid = $("#savedGrid");
  const list = EVENTS.filter(event => saved.includes(event.id));
  grid.innerHTML = list.map(event => eventCardMarkup(event, saved)).join("");
  $("#savedEmpty").classList.toggle("hidden", list.length > 0);
  $("#statSaved").textContent = saved.length;
  $("#savedCount").textContent = saved.length;
  renderProfileDetails();
  renderDashboard();
}

function renderProfileDetails(){
  window.dispatchEvent(new Event("campus-profile-change"));
}

function eventCardMarkup(e, saved){
  const d = new Date(e.date + "T00:00:00");
  return `<article class="event-card">
    <div class="event-banner" style="background:${GRADIENTS(e.hue)}">${eventBannerMedia(e)}<button class="save-event ${saved.includes(e.id) ? "saved" : ""}" data-save="${e.id}" aria-label="${saved.includes(e.id) ? "Remove from saved" : "Save event"}">${saved.includes(e.id) ? "★" : "☆"}</button><div class="event-date"><strong>${d.getDate()}</strong><span>${d.toLocaleString("en-US",{month:"short"})}</span></div></div>
    <div class="event-body"><span class="event-tag">${e.interest}</span><h3>${e.title}</h3><div class="event-meta"><span>🕐 ${e.time} · ${d.toLocaleDateString("en-US",{weekday:"long"})}</span><span>📍 ${e.location}</span><span>${e.desc}</span></div><div class="event-host"><span class="host-avatar" style="background:${e.hue}">${e.host[0]}</span>Hosted by ${e.host}</div></div>
  </article>`;
}

let savedWrites=Promise.resolve();
function toggleSaved(id){
  const ownerId=getSession()?.id,ownerAccount=window.campusAccount;
  savedWrites=savedWrites.then(async()=>{
  if(getSession()?.id !== ownerId || window.campusAccount !== ownerAccount)return;
  try {
  const saved = getSaved();
  const next = saved.includes(id) ? saved.filter(item => item !== id) : [...saved, id];
  await saveSaved(next);
  if(getSession()?.id !== ownerId || window.campusAccount !== ownerAccount)return;
  window.dispatchEvent(new Event("campus-saved-change"));
  const event = EVENTS.find(item => item.id === id);
  if (event) recordDashboardActivity(next.includes(id) ? "saved" : "removed", event.title);
  renderEvents();
  renderSavedEvents();
  showToast(next.includes(id) ? "Event saved." : "Event removed from saved.");
  } catch(error){showToast(error.message || "Could not save this event. Retry account sync.");}
  });
  return savedWrites;
}

function setupFilter(){
  $("#filterBar").addEventListener("click", (ev) => {
    const chip = ev.target.closest(".chip");
    if (!chip) return;
    $("#filterBar").querySelectorAll(".chip").forEach(c => {
      const active = c === chip;
      c.classList.toggle("active", active);
      c.setAttribute("aria-pressed", String(active));
    });
    chip.classList.add("active");
    renderEvents(chip.dataset.interest);
  });
  $("#eventSearch").addEventListener("input", event => {
    renderEvents(currentInterestFilter, event.currentTarget.value);
  });
  $("#clearEventFilters").addEventListener("click", () => {
    clearDiscoverFilters();
    $("#eventSearch").focus();
  });
}

function readNavigationRoute(){
  if (location.hash === "#/feed") return {workspace: "feed"};
  const match = /^#\/community\/(dashboard|discover|chat|saved|suggest|profile)$/.exec(location.hash);
  return match ? {workspace: "community", page: match[1]} : null;
}

function recordNavigationRoute(workspace, page, replace = false){
  if (!getSession()) return;
  const hash = workspace === "feed" ? "#/feed" : `#/community/${page}`;
  if (location.hash === hash) return;
  history[replace ? "replaceState" : "pushState"](null, "", hash);
}

function restoreNavigationRoute(){
  if (!getSession()) return;
  const route = readNavigationRoute();
  if (route?.workspace === "feed") switchWorkspace("feed", false);
  else showPage(route?.page || "dashboard", false);
}

function showPage(page, record = true){
  if (!document.getElementById(`page-${page}`)?.classList.contains("page-view")) return;
  if (getSession()) switchWorkspace("community", false);
  document.querySelectorAll("#appMain dialog[open]").forEach(dialog => dialog.close());
  document.querySelectorAll(".page-view").forEach(view => view.classList.toggle("active", view.id === `page-${page}`));
  document.querySelectorAll(".page-link").forEach(link => {
    const active = link.dataset.page === page;
    link.classList.toggle("active", active);
    if (active) link.setAttribute("aria-current", "page");
    else link.removeAttribute("aria-current");
  });
  if (record) recordNavigationRoute("community", page);
  window.scrollTo({top: 0, behavior: "instant"});
}

function setupPageNavigation(){
  if (window.campusVibesNavigationHandler) document.removeEventListener("click", window.campusVibesNavigationHandler);
  window.campusVibesNavigationHandler = event => {
    const workspaceButton = event.target.closest("[data-workspace]");
    if (workspaceButton){ switchWorkspace(workspaceButton.dataset.workspace); return; }
    const saveButton = event.target.closest("[data-save]");
    if (saveButton){
      event.preventDefault();
      toggleSaved(Number(saveButton.dataset.save));
      return;
    }
    if (handleDiscoverNavigation(event)) return;
    if (handleDashboardNavigation(event)) return;
    const pageButton = event.target.closest("[data-page]");
    if (!pageButton) return;
    showPage(pageButton.dataset.page);
    const interest = pageButton.dataset.interestJump;
    if (interest){
      const chip = document.querySelector(`.chip[data-interest="${interest}"]`);
      if (chip){ chip.click(); }
    }
  };
  document.addEventListener("click", window.campusVibesNavigationHandler);
}

/* ── Stats ── */
function renderStats(){
  const eventStat = $("#statEvents");
  if (eventStat) eventStat.textContent = EVENTS.length;
}

/* ══════════ AUTH ══════════ */
function openAuth(tab = "login"){
  authReturnFocus = document.activeElement;
  $("#authModal").classList.remove("hidden");
  document.body.style.overflow = "hidden";
  switchTab(tab);
}
let authReturnFocus = null;
function closeAuth(){
  const wasOpen = !$("#authModal").classList.contains("hidden");
  $("#authModal").classList.add("hidden");
  document.body.style.overflow = "";
  ["loginForm","signupForm"].forEach(id => document.getElementById(id).reset());
  $("#authModal").querySelectorAll(".field-error,.form-error").forEach(el => { el.textContent=""; el.classList.add("hidden"); });
  $("#authModal").querySelectorAll(".invalid").forEach(el => el.classList.remove("invalid"));
  $("#landingPass").value = "";
  $("#landingPass").type = "password";
  updatePasswordToggle();
  if (wasOpen && authReturnFocus?.isConnected && !getSession()) authReturnFocus.focus();
}
function closeOnBackdrop(e){ if (e.target === e.currentTarget) closeAuth(); }

function switchTab(tab){
  const isLogin = tab === "login";
  $("#loginForm").classList.toggle("hidden", !isLogin);
  $("#signupForm").classList.toggle("hidden", isLogin);
  $("#tabLogin").classList.toggle("active", isLogin);
  $("#tabSignup").classList.toggle("active", !isLogin);
  $("#tabSlider").classList.toggle("right", !isLogin);
  $(isLogin ? "#loginEmail" : "#suName").focus();
}

/* ── Validation ── */
function setErr(inputEl, errEl, msg){
  errEl.textContent = msg;
  inputEl.classList.toggle("invalid", !!msg);
  inputEl.setAttribute("aria-invalid", String(!!msg));
  errEl.classList.toggle("hidden", !msg);
  return !msg;
}
const validEmail = (e) => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(e);

function checkPasswordStrength(){
  const p = $("#suPass").value;
  const fill = $("#passMeter");
  let score = 0;
  if (p.length >= 8) score++;
  if (/[A-Z]/.test(p) && /[a-z]/.test(p)) score++;
  if (/\d/.test(p)) score++;
  if (/[^A-Za-z0-9]/.test(p)) score++;
  const widths = ["0%","25%","50%","75%","100%"];
  const colors = ["var(--danger)","var(--danger)","#ffb35c","#8ee35c","var(--accent-2)"];
  fill.style.width = widths[score];
  fill.style.background = colors[score];
}

/* ── Signup ── */
function showAuthError(element, error){
  const messages = {
    "auth/email-already-in-use": "An account with this email already exists. Try logging in.",
    "auth/invalid-credential": "Incorrect email or password.",
    "auth/weak-password": "Choose a stronger password (at least 6 characters).",
    "auth/invalid-email": "Enter a valid email address.",
    "auth/too-many-requests": "Too many attempts. Please wait a moment and try again.",
    "auth/network-request-failed": "Could not connect. Check your internet connection and try again.",
    "auth/popup-blocked": "Your browser blocked Google sign-in. Allow popups and try again.",
    "auth/popup-closed-by-user": "Google sign-in was closed. Please try again when you're ready.",
    "auth/cancelled-popup-request": "A Google sign-in window is already open.",
    "auth/operation-not-allowed": "This sign-in method isn't enabled yet. Please use email and password.",
    "auth/unauthorized-domain": "Google sign-in isn't configured for this website yet. Please use email and password.",
    "auth/account-exists-with-different-credential": "This email uses another sign-in method. Please log in using that method."
  };
  element.textContent = messages[error.code] || "Authentication failed. Please try again.";
  element.classList.remove("hidden");
}

async function handleSignup(ev){
  ev.preventDefault();
  if (ev.currentTarget.getAttribute("aria-busy") === "true") return false;
  const name = $("#suName"), email = $("#suEmail"), pass = $("#suPass"),
        pass2 = $("#suPass2"), interest = $("#suInterest");
  let ok = true;
  ok = setErr(name, $("#suNameErr"), name.value.trim().length >= 2 ? "" : "Please enter your name.") && ok;
  ok = setErr(email, $("#suEmailErr"), validEmail(email.value.trim()) ? "" : "Enter a valid email.") && ok;
  ok = setErr(pass, $("#suPassErr"), pass.value.length >= 8 ? "" : "Min. 8 characters.") && ok;
  ok = setErr(pass2, $("#suPass2Err"), pass2.value === pass.value ? "" : "Passwords don't match.") && ok;
  ok = setErr(interest, $("#suInterestErr"), interest.value ? "" : "Pick your main interest.") && ok;
  if (!ok) return false;

  const em = email.value.trim().toLowerCase();
  const displayName = name.value.trim();
  const selectedInterest = interest.value;
  const password = pass.value;
  const formErr = $("#signupFormErr");
  formErr.classList.add("hidden");

  const { auth, createUserWithEmailAndPassword, updateProfile } = window.campusFirebaseAuth;
  setAuthBusy(ev.currentTarget, true);
  try {
    await applyLoginPersistence();
    const credential = await createUserWithEmailAndPassword(auth, em, password);
    localStorage.setItem(`cv_interest_${credential.user.uid}`, selectedInterest);
    await updateProfile(credential.user, { displayName });
    startSession(credential.user, selectedInterest);
    closeAuth();
    showToast(`Welcome to CampusVibes, ${displayName.split(" ")[0]}! You're logged in.`);
  } catch (error) {
    showAuthError(formErr, error);
  } finally {
    setAuthBusy($("#signupForm"), false);
  }
  return false;
}

/* ── Login ── */
async function handleLogin(ev, scope = "modal"){
  ev.preventDefault();
  const inline = scope === "landing";
  const email = $(inline ? "#landingEmail" : "#loginEmail"), pass = $(inline ? "#landingPass" : "#loginPass");
  const formErr = $(inline ? "#landingFormErr" : "#loginFormErr");
  const form = ev.currentTarget;
  if (form.getAttribute("aria-busy") === "true") return false;
  formErr.classList.add("hidden");
  let ok = true;
  ok = setErr(email, $(inline ? "#landingEmailErr" : "#loginEmailErr"), validEmail(email.value.trim()) ? "" : "Enter a valid email.") && ok;
  ok = setErr(pass, $(inline ? "#landingPassErr" : "#loginPassErr"), pass.value ? "" : "Enter your password.") && ok;
  if (!ok) { form.querySelector(".invalid").focus(); return false; }

  const { auth, signInWithEmailAndPassword } = window.campusFirebaseAuth;
  const em = email.value.trim().toLowerCase(), password = pass.value;
  setAuthBusy(form, true);
  try {
    await applyLoginPersistence();
    const credential = await signInWithEmailAndPassword(auth, em, password);
    formErr.classList.add("hidden");
    startSession(credential.user);
    closeAuth();
    showToast(`Welcome back, ${(credential.user.displayName || credential.user.email).split(" ")[0]}!`);
  } catch (error) {
    showAuthError(formErr, error);
  } finally {
    setAuthBusy(form, false);
  }
  return false;
}

function setAuthBusy(form, busy){
  form.setAttribute("aria-busy", String(busy));
  form.querySelectorAll("button, input, select").forEach(control => { control.disabled = busy; });
  const submit = form.querySelector('button[type="submit"]');
  if (submit){
    if (busy) { submit.dataset.idleLabel = submit.innerHTML; submit.textContent = "Please wait..."; }
    else if (submit.dataset.idleLabel) { submit.innerHTML = submit.dataset.idleLabel; delete submit.dataset.idleLabel; }
  }
}

function applyLoginPersistence(){
  const { auth, setPersistence, browserLocalPersistence, browserSessionPersistence } = window.campusFirebaseAuth;
  return setPersistence(auth, $("#loginRemember").checked ? browserLocalPersistence : browserSessionPersistence);
}

async function handleGoogleLogin(){
  const form = $("#landingLoginForm"), formErr = $("#landingFormErr");
  if (form.getAttribute("aria-busy") === "true") return;
  formErr.classList.add("hidden");
  setAuthBusy(form, true);
  const { auth, GoogleAuthProvider, signInWithPopup } = window.campusFirebaseAuth;
  try {
    await applyLoginPersistence();
    const provider = new GoogleAuthProvider();
    provider.setCustomParameters({prompt: "select_account"});
    const credential = await signInWithPopup(auth, provider);
    startSession(credential.user);
    closeAuth();
    showToast("Welcome to Campus Vibes!");
  } catch (error) {
    showAuthError(formErr, error);
  } finally {
    setAuthBusy(form, false);
  }
}

function updatePasswordToggle(){
  const shown = $("#landingPass").type === "text";
  const button = $("#landingPasswordToggle");
  button.setAttribute("aria-pressed", String(shown));
  button.setAttribute("aria-label", shown ? "Hide password" : "Show password");
  button.title = shown ? "Hide password" : "Show password";
  button.innerHTML = `<i data-lucide="${shown ? "eye-off" : "eye"}"></i>`;
  window.campusRenderIcons?.();
}

async function handlePasswordReset(event){
  event.preventDefault();
  const form = event.currentTarget, email = $("#resetEmail"), feedback = $("#passwordResetFeedback");
  if (form.getAttribute("aria-busy") === "true") return;
  feedback.classList.add("hidden");
  if (!setErr(email, $("#resetEmailErr"), validEmail(email.value.trim()) ? "" : "Enter a valid email.")) { email.focus(); return; }
  setAuthBusy(form, true);
  feedback.classList.remove("success");
  const { auth, sendPasswordResetEmail } = window.campusFirebaseAuth;
  try {
    await sendPasswordResetEmail(auth, email.value.trim().toLowerCase());
    showResetConfirmation();
  } catch (error) {
    if (error.code === "auth/user-not-found") showResetConfirmation();
    else showAuthError(feedback, error);
  } finally {
    setAuthBusy(form, false);
  }
}

function showResetConfirmation(){
  const feedback = $("#passwordResetFeedback");
  feedback.textContent = "If an account exists for this email, you'll receive a reset link. Check your inbox and spam folder.";
  feedback.classList.add("success");
  feedback.classList.remove("hidden");
}

function setupAuthControls(){
  $("#landingPasswordToggle").addEventListener("click", () => {
    $("#landingPass").type = $("#landingPass").type === "password" ? "text" : "password";
    updatePasswordToggle();
  });
  $("#googleLogin").addEventListener("click", handleGoogleLogin);
  $("#forgotPassword").addEventListener("click", () => {
    const form = $("#passwordResetForm");
    if (form.getAttribute("aria-busy") !== "true"){
      form.reset();
      $("#resetEmail").value = $("#landingEmail").value;
      setErr($("#resetEmail"), $("#resetEmailErr"), "");
      $("#passwordResetFeedback").classList.add("hidden");
    }
    $("#passwordResetDialog").showModal();
    $("#resetEmail").focus();
  });
  $("#closePasswordReset").addEventListener("click", () => $("#passwordResetDialog").close());
  $("#passwordResetForm").addEventListener("submit", handlePasswordReset);
  const modalKeys = event => {
    const modal = $("#authModal");
    if (modal.classList.contains("hidden")) return;
    if (event.key === "Escape") { event.preventDefault(); closeAuth(); }
    if (event.key !== "Tab") return;
    const controls = [...modal.querySelectorAll('button, input, select, a[href]')].filter(control => !control.disabled && control.getClientRects().length);
    const first = controls[0], last = controls[controls.length - 1];
    if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
    else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
  };
  document.addEventListener("keydown", modalKeys);
  window.campusAuthCleanup = () => document.removeEventListener("keydown", modalKeys);
}

/* ── Session ── */
function startSession(user, interest = ""){
  const name = user.displayName || user.name || user.email?.split("@")[0] || "Student";
  currentSession = {
    id: user.uid || "demo",
    name,
    email: user.email || "",
    emailVerified: user.emailVerified === true,
    interest: interest || localStorage.getItem(`cv_interest_${user.uid}`) || user.interest || ""
  };
  updateNav();
}
function syncFirebaseUser(user){
  if (user) startSession(user);
  else {
    // Firebase's initial signed-out callback can arrive after demo entry.
    if (currentSession?.id === "demo") return;
    currentSession = null;
    updateNav();
  }
}
async function logout(){
  if (window.campusAccount?.status().pending && !window.confirm("Some changes have not synced to your account. Logging out now can lose them. Log out anyway?")) return;
  const { auth, signOut } = window.campusFirebaseAuth;
  try {
    if (auth.currentUser) await signOut(auth);
    currentSession = null;
    updateNav();
    showToast("Logged out. See you at the next event!");
  } catch (error) {
    showToast("Could not log out. Please try again.");
  }
}
function updateNav(){
  const s = getSession();
  $("#authLanding").classList.toggle("hidden", !!s);
  $("#navAuthOut").classList.toggle("hidden", !!s);
  $("#navAuthIn").classList.toggle("hidden", !s);
  $("#workspaceSwitch").classList.toggle("hidden", !s);
  window.dispatchEvent(new CustomEvent("campus-session-change", {detail:s}));
  if (s){
    const route = readNavigationRoute();
    if (route) restoreNavigationRoute();
    else {
      const workspace = localStorage.getItem(`cv_workspace_${s.email}`) || "community";
      switchWorkspace(workspace, false);
      recordNavigationRoute(workspace, document.querySelector(".page-view.active")?.id.slice(5) || "dashboard", true);
    }
  } else switchWorkspace("community", false);
  $("#dashboardName").textContent = s ? s.name.split(" ")[0] : "there";
  renderEvents();
  renderSavedEvents();
  if (s){
    $("#landingFormErr").classList.add("hidden");
    setErr($("#landingEmail"), $("#landingEmailErr"), "");
    setErr($("#landingPass"), $("#landingPassErr"), "");
    $("#navUsername").textContent = s.name.split(" ")[0];
    $("#navAvatar").textContent = s.name[0].toUpperCase();
    // If the user picked an interest at signup, gently preselect that filter
    if (s.interest){
      const chip = document.querySelector(`.chip[data-interest="${s.interest}"]`);
      if (chip){
        $("#filterBar").querySelectorAll(".chip").forEach(c => {
          const active = c === chip;
          c.classList.toggle("active", active);
          c.setAttribute("aria-pressed", String(active));
        });
        chip.classList.add("active");
        renderEvents(s.interest);
      }
    }
  }
}

function switchWorkspace(mode, record = true){
  const session = getSession();
  const feed = !!session && mode === "feed";
  $("#mainNav").classList.toggle("hidden", !session || feed);
  $("#appMain").classList.toggle("hidden", !session || feed);
  $("#feedMain").classList.toggle("hidden", !feed);
  document.body.classList.toggle("feed-workspace", feed);
  document.querySelectorAll("[data-workspace]").forEach(button => button.setAttribute("aria-pressed", String(button.dataset.workspace === (feed ? "feed" : "community"))));
  if (session) localStorage.setItem(`cv_workspace_${session.email}`, feed ? "feed" : "community");
  if (record) recordNavigationRoute(feed ? "feed" : "community", document.querySelector(".page-view.active")?.id.slice(5) || "dashboard");
  window.campusRenderIcons?.();
}

/* ── Boot ── */
function bootCampusVibes(){
  window.campusAccountRefresh=()=>{
    renderEvents();renderSavedEvents();window.campusRenderIcons?.();
    window.dispatchEvent(new Event("campus-saved-change"));
  };
  window.campusAssistant = {
    getSaved,
    saveEvent(id) { if (getSession() && EVENTS.some(event => event.id === id)) toggleSaved(id); },
    openEvent(id) { if (getSession() && EVENTS.some(event => event.id === id)) openDiscoverEvent(id); },
    navigate(page) {
      if (!getSession()) return;
      if (page === "feed") switchWorkspace("feed");
      else if (["dashboard","discover","saved","suggest","profile"].includes(page)) showPage(page);
    },
  };
  window.campusProfile = {
    ...window.campusAssistant,
    getActivity: () => readDashboardData().activity,
    getDraftCount: () => readDashboardData().drafts.length,
  };
  window.addEventListener("popstate", restoreNavigationRoute);
  window.addEventListener("hashchange", restoreNavigationRoute);
  window.campusNavigationCleanup = () => {
    window.removeEventListener("popstate", restoreNavigationRoute);
    window.removeEventListener("hashchange", restoreNavigationRoute);
  };
  setupAuthControls();
  setupDashboard();
  setupDiscover();
  renderStats();
  renderUpcoming();
  renderEvents("all");
  renderSavedEvents();
  setupFilter();
  setupPageNavigation();
  updateNav();
  $("#suPass").addEventListener("input", checkPasswordStrength);
  const enterDemo = () => {
    startSession({name: "Alex Rivera", email: "alex@campus.edu", interest: "Tech"});
    closeAuth();
    showToast("Welcome to your demo dashboard.");
  };
  $("#demoLogin").addEventListener("click", enterDemo);
  $("#landingDemo").addEventListener("click", () => { enterDemo(); showPage("discover"); });
}

if (document.readyState === "loading"){
  document.addEventListener("DOMContentLoaded", bootCampusVibes, { once: true });
} else {
  bootCampusVibes();
}
