
const EVENTS = [
  { id:1, title:"HackNight: Build-a-Thon", interest:"Tech",
    date:"2026-09-26", time:"6:00 PM", location:"Innovation Lab, Bldg 7",
    host:"Code Collective", emoji:"💻", hue:"#7c5cff",
    desc:"24 hours of building, pizza, and demo prizes." },
  { id:2, title:"Open Mic & Poetry Night", interest:"Music",
    date:"2026-09-27", time:"7:30 PM", location:"Student Union Courtyard",
    host:"Livewire Society", emoji:"🎤", hue:"#00e0b8",
    desc:"Sign up or just vibe. Acoustic slots open at 7." },
  { id:3, title:"Mural Painting Workshop", interest:"Arts",
    date:"2026-09-29", time:"3:00 PM", location:"Arts Wing, Rm 204",
    host:"Brush Strokes Club", emoji:"🎨", hue:"#ff8fb1",
    desc:"Help paint the new community mural. All levels welcome." },
  { id:4, title:"Intramural Basketball Finals", interest:"Sports",
    date:"2026-09-30", time:"5:30 PM", location:"Main Gymnasium",
    host:"Campus Athletics", emoji:"🏀", hue:"#ffb35c",
    desc:"The championship game. Free entry, loud crowd." },
  { id:5, title:"Freshers' Bonfire Social", interest:"Social",
    date:"2026-10-02", time:"8:00 PM", location:"Lakeside Lawn",
    host:"Student Council", emoji:"🔥", hue:"#ff6b81",
    desc:"S'mores, music, and meeting your people." },
  { id:6, title:"Research Skills Bootcamp", interest:"Academics",
    date:"2026-10-03", time:"10:00 AM", location:"Library Hall B",
    host:"Grad Student Union", emoji:"📚", hue:"#5cc8ff",
    desc:"Citations, literature reviews, and avoiding panic." },
  { id:7, title:"Indie Game Showcase", interest:"Tech",
    date:"2026-10-04", time:"4:00 PM", location:"Media Centre",
    host:"Game Devs Guild", emoji:"🕹️", hue:"#7c5cff",
    desc:"Play student-made games, vote for the audience award." },
  { id:8, title:"Jazz Under the Stars", interest:"Music",
    date:"2026-10-05", time:"7:00 PM", location:"Botanical Garden",
    host:"Campus Orchestra", emoji:"🎷", hue:"#00e0b8",
    desc:"An evening set with the quartet. Bring a blanket." },
  { id:9, title:"Photowalk: Golden Hour", interest:"Arts",
    date:"2026-10-06", time:"5:00 PM", location:"Meet at Main Gate",
    host:"Shutter Club", emoji:"📷", hue:"#ff8fb1",
    desc:"A guided walk shooting campus at golden hour." },
];

/* ── Constants ── */
const SAVED_KEY   = "cv_saved";
let currentSession = null;

/* ── Helpers ── */
const $ = (sel) => document.querySelector(sel);
const getSession = () => currentSession;
const getSaved = () => JSON.parse(localStorage.getItem(SAVED_KEY) || "[]");
const saveSaved = (ids) => localStorage.setItem(SAVED_KEY, JSON.stringify(ids));

function showToast(msg){
  const t = $("#toast");
  t.textContent = msg;
  t.classList.remove("hidden");
  clearTimeout(t._timer);
  t._timer = setTimeout(() => t.classList.add("hidden"), 3200);
}

/* ── Event rendering + ONE interest filter ── */
const GRADIENTS = (hue) =>
  `linear-gradient(135deg, ${hue}33, ${hue}14), radial-gradient(circle at 80% 20%, ${hue}40, transparent 60%)`;

function renderEvents(filter = "all"){
  const grid = $("#eventsGrid");
  const list = filter === "all" ? EVENTS : EVENTS.filter(e => e.interest === filter);
  const saved = getSaved();
  grid.innerHTML = list.map((e,i) => {
    const d = new Date(e.date + "T00:00:00");
    return `
    <article class="event-card" style="animation-delay:${i*0.05}s">
      <div class="event-banner" style="background:${GRADIENTS(e.hue)}">
        <span>${e.emoji}</span>
        <button class="save-event ${saved.includes(e.id) ? "saved" : ""}" data-save="${e.id}" aria-label="${saved.includes(e.id) ? "Remove from saved" : "Save event"}">${saved.includes(e.id) ? "★" : "☆"}</button>
        <div class="event-date">
          <strong>${d.getDate()}</strong>
          <span>${d.toLocaleString("en-US",{month:"short"})}</span>
        </div>
      </div>
      <div class="event-body">
        <span class="event-tag">${e.interest}</span>
        <h3>${e.title}</h3>
        <div class="event-meta">
          <span>🕐 ${e.time} · ${d.toLocaleDateString("en-US",{weekday:"long"})}</span>
          <span>📍 ${e.location}</span>
          <span>${e.desc}</span>
        </div>
        <div class="event-host">
          <span class="host-avatar" style="background:${e.hue}">${e.host[0]}</span>
          Hosted by ${e.host}
        </div>
      </div>
    </article>`;
  }).join("");
  $("#emptyState").classList.toggle("hidden", list.length > 0);
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
}

function eventCardMarkup(e, saved){
  const d = new Date(e.date + "T00:00:00");
  return `<article class="event-card">
    <div class="event-banner" style="background:${GRADIENTS(e.hue)}"><span>${e.emoji}</span><button class="save-event ${saved.includes(e.id) ? "saved" : ""}" data-save="${e.id}" aria-label="${saved.includes(e.id) ? "Remove from saved" : "Save event"}">${saved.includes(e.id) ? "★" : "☆"}</button><div class="event-date"><strong>${d.getDate()}</strong><span>${d.toLocaleString("en-US",{month:"short"})}</span></div></div>
    <div class="event-body"><span class="event-tag">${e.interest}</span><h3>${e.title}</h3><div class="event-meta"><span>🕐 ${e.time} · ${d.toLocaleDateString("en-US",{weekday:"long"})}</span><span>📍 ${e.location}</span><span>${e.desc}</span></div><div class="event-host"><span class="host-avatar" style="background:${e.hue}">${e.host[0]}</span>Hosted by ${e.host}</div></div>
  </article>`;
}

function toggleSaved(id){
  const saved = getSaved();
  const next = saved.includes(id) ? saved.filter(item => item !== id) : [...saved, id];
  saveSaved(next);
  renderEvents($(".chip.active")?.dataset.interest || "all");
  renderSavedEvents();
  showToast(next.includes(id) ? "Event saved." : "Event removed from saved.");
}

function setupFilter(){
  $("#filterBar").addEventListener("click", (ev) => {
    const chip = ev.target.closest(".chip");
    if (!chip) return;
    document.querySelectorAll(".chip").forEach(c => c.classList.remove("active"));
    chip.classList.add("active");
    renderEvents(chip.dataset.interest);
  });
}

function showPage(page){
  document.querySelectorAll(".page-view").forEach(view => view.classList.toggle("active", view.id === `page-${page}`));
  document.querySelectorAll(".page-link").forEach(link => link.classList.toggle("active", link.dataset.page === page));
  window.scrollTo({top: 0, behavior: "smooth"});
}

let lastSuggestedEvents = [];

const CAMPUS_INTERESTS = {
  tech: ["tech", "technology", "coding", "programming", "game"],
  arts: ["art", "arts", "painting", "photo", "photography", "creative"],
  music: ["music", "concert", "jazz", "poetry", "open mic"],
  sports: ["sport", "sports", "basketball", "fitness", "athletic"],
  social: ["social", "friends", "meet people", "meeting people", "fun"],
  academics: ["academic", "academics", "study", "research", "learning"],
};

function formatCampusEvent(event){
  const date = new Date(`${event.date}T00:00:00`);
  const weekday = date.toLocaleDateString("en-US", { weekday: "long" });
  const monthDay = date.toLocaleDateString("en-US", { month: "short", day: "numeric" });
  return `${event.emoji} ${event.title} — ${weekday}, ${monthDay} at ${event.time}, ${event.location}. Hosted by ${event.host}.`;
}

function createCampusReply(question){
  const query = question.toLowerCase();
  const category = Object.entries(CAMPUS_INTERESTS)
    .find(([, terms]) => terms.some(term =>
      term.includes(" ") ? query.includes(term) : new RegExp(`\\b${term}\\b`).test(query)
    ))?.[0];
  const interest = category
    ? category.charAt(0).toUpperCase() + category.slice(1)
    : null;
  const wantsSavedList = /\bsaved events\b|\bmy saved\b|\bshow\b.{0,24}\bsaved\b|\blist\b.{0,24}\bsaved\b|\bwhat did i save\b|\bshortlist\b/.test(query);
  const events = wantsSavedList
    ? EVENTS.filter(event => getSaved().includes(event.id))
    : EVENTS.filter(event => !interest || event.interest === interest);
  const wantsLocation = /\bwhere\b|\blocation\b/.test(query);
  const wantsTime = /\bwhen\b|\bdate\b|\btime\b/.test(query);
  const eventMatch = EVENTS.find(event =>
    query.includes(event.title.toLowerCase())
    || query.includes(event.host.toLowerCase())
  ) || (/\b(it|that|there)\b/.test(query) && lastSuggestedEvents.length === 1
    ? lastSuggestedEvents[0]
    : null);

  if (/^(hi|hello|hey|good morning|good afternoon)\b/.test(query)){
    return "Hi! I can help you explore the events listed in CampusVibes, find events by interest, check event details, or explain how to save one. What are you looking for?";
  }
  if (eventMatch && (wantsLocation || wantsTime || query.includes(eventMatch.title.toLowerCase()))){
    lastSuggestedEvents = [eventMatch];
    return `${formatCampusEvent(eventMatch)} This is sample event data, so please verify details before attending.`;
  }
  if (/how (do|can) i save|save an event|bookmark/.test(query)){
    return "Open Discover and select the star on an event to save it. You can find your saved events under Saved in the navigation.";
  }
  if (wantsSavedList){
    lastSuggestedEvents = events;
    return events.length
      ? `You have ${events.length} saved event${events.length === 1 ? "" : "s"}:\n${events.map(formatCampusEvent).join("\n")}`
      : "You haven’t saved any events yet. Browse Discover and select the star on an event to add it to Saved.";
  }
  if (/suggest|submit|add an event/.test(query)){
    return "Use Suggest in the navigation to send an event name, host, and description. Suggestions enter the team’s review queue; they aren’t published automatically.";
  }
  if (/how (do|can) i (find|browse)|discover/.test(query)){
    return "Open Discover to browse the sample events. Use the interest filters to narrow the list, and select a star to save an event.";
  }
  if (interest || /\bevents?\b|\bwhat('?s| is) happening\b|\bweekend\b|\bactivities\b/.test(query)){
    lastSuggestedEvents = events.slice(0, 4);
    if (!events.length){
      return `I don’t see any ${interest ? `${interest.toLowerCase()} ` : ""}events in the current sample list. Try another interest or browse Discover.`;
    }
    const heading = interest
      ? `Here are events in the ${interest} category:`
      : "Here are a few events currently listed in the sample data:";
    return `${heading}\n${lastSuggestedEvents.map(formatCampusEvent).join("\n")}\nEvent listings are sample data; verify details before attending.`;
  }
  if (/help|what can you do|who are you/.test(query)){
    return "I’m the CampusVibes helper. I can search sample campus events, find listings by interest, check event time/location, explain Saved and Suggest, and show your saved events. I can’t answer general questions or access live campus information.";
  }
  return "I can help with CampusVibes: try “show music events,” “where is Jazz Under the Stars?”, “how do I save an event?”, or “show my saved events.” I only know the sample events and app features shown here.";
}

function appendChatMessage(role, text){
  const message = document.createElement("div");
  message.className = `chat-message ${role}`;
  const label = document.createElement("div");
  label.className = "chat-message-label";
  label.textContent = role === "user" ? "You" : "CampusVibes Assistant";
  const content = document.createElement("p");
  content.textContent = text;
  message.append(label, content);
  $("#chatMessages").append(message);
  $("#chatMessages").scrollTop = $("#chatMessages").scrollHeight;
}

function clearChatConversation(){
  lastSuggestedEvents = [];
  const messages = $("#chatMessages");
  if (!messages) return;
  messages.innerHTML = "";
  appendChatMessage("assistant", "Hi! I can help you explore campus events, find listings by interest, check event details, or explain how to save one.");
  $("#chatPrompts")?.classList.remove("hidden");
}

function sendChatMessage(text){
  const message = text.trim();
  if (!message) return;

  appendChatMessage("user", message);
  $("#chatInput").value = "";
  $("#chatPrompts").classList.add("hidden");
  appendChatMessage("assistant", createCampusReply(message));
  $("#chatInput").focus();
}

function setupChat(){
  $("#chatForm").addEventListener("submit", event => {
    event.preventDefault();
    sendChatMessage($("#chatInput").value);
  });
  $("#chatInput").addEventListener("keydown", event => {
    if (event.key === "Enter" && !event.shiftKey){
      event.preventDefault();
      $("#chatForm").requestSubmit();
    }
  });
  $("#chatPrompts").addEventListener("click", event => {
    const prompt = event.target.closest(".chat-prompt");
    if (prompt) sendChatMessage(prompt.dataset.prompt || prompt.textContent);
  });
  $("#chatClear").addEventListener("click", () => {
    clearChatConversation();
    $("#chatInput").focus();
  });
}

function setupPageNavigation(){
  if (window.campusVibesNavigationReady) return;
  window.campusVibesNavigationReady = true;
  document.addEventListener("click", event => {
    const saveButton = event.target.closest("[data-save]");
    if (saveButton){
      event.preventDefault();
      toggleSaved(Number(saveButton.dataset.save));
      return;
    }
    const pageButton = event.target.closest("[data-page]");
    if (!pageButton) return;
    showPage(pageButton.dataset.page);
    const interest = pageButton.dataset.interestJump;
    if (interest){
      const chip = document.querySelector(`.chip[data-interest="${interest}"]`);
      if (chip){ chip.click(); }
    }
  });
}

/* ── Stats ── */
function renderStats(){
  const eventStat = $("#statEvents");
  if (eventStat) eventStat.textContent = EVENTS.length;
}

/* ══════════ AUTH ══════════ */
function openAuth(tab = "login"){
  $("#authModal").classList.remove("hidden");
  document.body.style.overflow = "hidden";
  switchTab(tab);
}
function closeAuth(){
  $("#authModal").classList.add("hidden");
  document.body.style.overflow = "";
  ["loginForm","signupForm"].forEach(id => document.getElementById(id).reset());
  document.querySelectorAll(".field-error,.form-error").forEach(el => { el.textContent=""; el.classList.add("hidden"); });
  document.querySelectorAll(".invalid").forEach(el => el.classList.remove("invalid"));
}
function closeOnBackdrop(e){ if (e.target === e.currentTarget) closeAuth(); }
document.addEventListener("keydown", e => { if (e.key === "Escape") closeAuth(); });

function switchTab(tab){
  const isLogin = tab === "login";
  $("#loginForm").classList.toggle("hidden", !isLogin);
  $("#signupForm").classList.toggle("hidden", isLogin);
  $("#tabLogin").classList.toggle("active", isLogin);
  $("#tabSignup").classList.toggle("active", !isLogin);
  $("#tabSlider").classList.toggle("right", !isLogin);
}

/* ── Validation ── */
function setErr(inputEl, errEl, msg){
  errEl.textContent = msg;
  inputEl.classList.toggle("invalid", !!msg);
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
    "auth/network-request-failed": "Could not connect. Check your internet connection and try again."
  };
  element.textContent = messages[error.code] || "Authentication failed. Please try again.";
  element.classList.remove("hidden");
}

async function handleSignup(ev){
  ev.preventDefault();
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
  const formErr = $("#signupFormErr");
  formErr.classList.add("hidden");

  const { auth, createUserWithEmailAndPassword, updateProfile } = window.campusFirebaseAuth;
  try {
    const credential = await createUserWithEmailAndPassword(auth, em, pass.value);
    localStorage.setItem(`cv_interest_${credential.user.uid}`, interest.value);
    await updateProfile(credential.user, { displayName: name.value.trim() });
    startSession(credential.user, interest.value);
    closeAuth();
    showToast(`Welcome to CampusVibes, ${name.value.trim().split(" ")[0]}! You're logged in.`);
  } catch (error) {
    showAuthError(formErr, error);
  }
  return false;
}

/* ── Login ── */
async function handleLogin(ev){
  ev.preventDefault();
  const email = $("#loginEmail"), pass = $("#loginPass");
  const formErr = $("#loginFormErr");
  let ok = true;
  ok = setErr(email, $("#loginEmailErr"), validEmail(email.value.trim()) ? "" : "Enter a valid email.") && ok;
  ok = setErr(pass, $("#loginPassErr"), pass.value ? "" : "Enter your password.") && ok;
  if (!ok) return false;

  const { auth, signInWithEmailAndPassword } = window.campusFirebaseAuth;
  try {
    const credential = await signInWithEmailAndPassword(auth, email.value.trim().toLowerCase(), pass.value);
    formErr.classList.add("hidden");
    startSession(credential.user);
    closeAuth();
    showToast(`Welcome back, ${(credential.user.displayName || credential.user.email).split(" ")[0]}!`);
  } catch (error) {
    showAuthError(formErr, error);
  }
  return false;
}

/* ── Session ── */
function startSession(user, interest = ""){
  const name = user.displayName || user.name || user.email?.split("@")[0] || "Student";
  currentSession = {
    id: user.uid || "demo",
    name,
    email: user.email || "",
    interest: interest || localStorage.getItem(`cv_interest_${user.uid}`) || user.interest || ""
  };
  updateNav();
}
function syncFirebaseUser(user){
  if (user) startSession(user);
  else {
    currentSession = null;
    clearChatConversation();
    updateNav();
  }
}
async function logout(){
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
  $("#mainNav").classList.toggle("hidden", !s);
  $("#appMain").classList.toggle("hidden", !s);
  $("#authLanding").classList.toggle("hidden", !!s);
  $("#navAuthOut").classList.toggle("hidden", !!s);
  $("#navAuthIn").classList.toggle("hidden", !s);
  $("#dashboardName").textContent = s ? s.name.split(" ")[0] : "there";
  $("#profileName").textContent = s ? s.name : "Guest student";
  $("#profileEmail").textContent = s ? s.email : "Log in to personalize your CampusVibes profile.";
  $("#profileAvatar").textContent = s ? s.name[0].toUpperCase() : "?";
  if (s){
    $("#navUsername").textContent = s.name.split(" ")[0];
    $("#navAvatar").textContent = s.name[0].toUpperCase();
    // If the user picked an interest at signup, gently preselect that filter
    if (s.interest){
      const chip = document.querySelector(`.chip[data-interest="${s.interest}"]`);
      if (chip){
        document.querySelectorAll(".chip").forEach(c => c.classList.remove("active"));
        chip.classList.add("active");
        renderEvents(s.interest);
      }
    }
  }
}

/* ── Boot ── */
function bootCampusVibes(){
  renderStats();
  renderUpcoming();
  renderEvents("all");
  renderSavedEvents();
  setupFilter();
  setupPageNavigation();
  setupChat();
  updateNav();
  $("#suPass").addEventListener("input", checkPasswordStrength);
  const enterDemo = () => {
    startSession({name: "Alex Rivera", email: "alex@campus.edu", interest: "Tech"});
    closeAuth();
    showToast("Welcome to your demo dashboard.");
  };
  $("#demoLogin").addEventListener("click", enterDemo);
  $("#landingDemo").addEventListener("click", enterDemo);
  $("#suggestForm").addEventListener("submit", event => {
    event.preventDefault();
    event.currentTarget.reset();
    showToast("Thanks. Your suggestion is in the queue.");
    showPage("dashboard");
  });
}

if (document.readyState === "loading"){
  document.addEventListener("DOMContentLoaded", bootCampusVibes, { once: true });
} else {
  bootCampusVibes();
}