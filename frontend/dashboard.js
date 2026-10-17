const dashboardStorageKey = () => `cv_dashboard_${getSession()?.email || "guest"}`;

function readDashboardData(){
  if (getSession() && getSession().id !== "demo") return window.campusAccount?.read("dashboard") || {activity:[],drafts:[]};
  try {
    const data = JSON.parse(localStorage.getItem(dashboardStorageKey()) || "{}");
    return {activity: Array.isArray(data.activity) ? data.activity : [], drafts: Array.isArray(data.drafts) ? data.drafts : []};
  } catch {
    return {activity: [], drafts: []};
  }
}

function dashboardText(value){
  const element = document.createElement("span");
  element.textContent = String(value);
  return element.innerHTML;
}

function recordDashboardActivity(type, title){
  const data = structuredClone(readDashboardData());
  data.activity.unshift({type, title, at: new Date().toISOString()});
  data.activity = data.activity.slice(0, 30);
  if (getSession() && getSession().id !== "demo") window.campusAccount.stage("dashboard",data);
  else localStorage.setItem(dashboardStorageKey(), JSON.stringify(data));
  window.dispatchEvent(new Event("campus-profile-change"));
}

function dashboardWeekStart(){
  const first = new Date(EVENTS[0].date + "T00:00:00");
  first.setDate(first.getDate() - 3);
  return first;
}

function dashboardDateKey(date){
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
}

function dashboardPhoto(event){
  return eventPhoto(event);
}

function activityTime(value){
  const seconds = Math.max(0, (Date.now() - new Date(value).getTime()) / 1000);
  if (seconds < 60) return "Just now";
  if (seconds < 3600) return `${Math.floor(seconds / 60)}m ago`;
  if (seconds < 86400) return `${Math.floor(seconds / 3600)}h ago`;
  return `${Math.floor(seconds / 86400)}d ago`;
}

function dashboardActivityMarkup(activity){
  const labels = {saved:"Saved", removed:"Removed", suggested:"Drafted"};
  return activity.map(item => `<div class="dashboard-activity-row"><i data-lucide="${item.type === "suggested" ? "lightbulb" : "bookmark"}" aria-hidden="true"></i><p>${labels[item.type] || "Viewed"} <strong>${dashboardText(item.title)}</strong></p><time datetime="${dashboardText(item.at)}">${activityTime(item.at)}</time></div>`).join("") || '<p class="dashboard-empty">Your next campus plan starts with one save.</p>';
}

function dashboardBadgeState(){
  return window.campusBadgeProgress(getSession(),getSaved().length*20+readDashboardData().drafts.length*30);
}

function progressBadgeMarkup(badge, points){
  const date=badge.earnedAt ? new Intl.DateTimeFormat("en-US",{month:"short",day:"numeric",year:"numeric",timeZone:"Asia/Seoul"}).format(new Date(badge.earnedAt)) : "";
  return `<article class="progress-badge ${badge.earned ? "is-earned" : "is-locked"}" data-badge="${badge.id}" style="--badge-color:${badge.color};--badge-tint:${badge.tint}"><span class="progress-badge-art"><i data-lucide="${badge.icon}" aria-hidden="true"></i></span><div><span class="progress-badge-status"><i data-lucide="${badge.earned ? "check" : "lock-keyhole"}" aria-hidden="true"></i>${badge.earned ? "Earned" : "Locked"}</span><h3>${dashboardText(badge.name)}</h3><p>Level ${badge.level} &middot; ${badge.points} points</p><small>${badge.earned ? `Earned ${dashboardText(date)}` : `${Math.max(0,badge.points-points)} points to go`}</small></div></article>`;
}

function progressDetailsMarkup(progress){
  const boundary=getSession()?.id !== "demo" ? "Badges are saved privately to your account and sync between devices. These are planning milestones, not attendance or verified campus achievements." : "Badges stay in this browser for this account. Community saves are browser-wide, not account-private. These are planning milestones, not attendance or verified campus achievements.";
  return `<div class="progress-detail-summary"><span><strong>${progress.points}</strong> current points</span><span>Level <strong>${progress.level}</strong></span><span><strong>${progress.earnedCount} / ${progress.badges.length}</strong> badges earned</span></div><p class="progress-detail-next">${progress.nextBadge ? `Next badge: <strong>${dashboardText(progress.nextBadge.name)}</strong> at Level ${progress.nextBadge.level} &middot; ${progress.pointsToNextBadge} points to go` : "All current badges earned."}</p><div class="progress-badge-grid">${progress.badges.map(badge => progressBadgeMarkup(badge,progress.points)).join("")}</div><p class="progress-detail-rules">20 points per currently saved event; 30 per recorded dashboard draft. Every 100 points adds a level. Removing saves can lower current points and level; earned badges stay unlocked.</p><p class="progress-detail-boundary">${boundary}</p>${progress.warning ? `<p class="progress-storage-warning" role="status">${dashboardText(progress.warning)}</p>` : ""}`;
}

function refreshProgressDialog(progress){
  const dialog=$("#dashboardDialog");
  if (dialog.open && dialog.dataset.progressBadges === "true") $("#dashboardDialogBody").innerHTML=progressDetailsMarkup(progress);
}

function renderDashboard(){
  const start = dashboardWeekStart();
  const end = new Date(start);
  end.setDate(start.getDate() + 6);
  const dateOptions = {month:"short", day:"numeric"};
  $("#dashboardDate").textContent = "YOUR CAMPUS WEEK";
  $("#weekRange").textContent = `Sample week · ${start.toLocaleDateString("en-US", dateOptions)}–${end.toLocaleDateString("en-US", dateOptions)}`;
  let weekCount = 0;
  $("#dashboardWeek").innerHTML = Array.from({length:7}, (_, offset) => {
    const date = new Date(start);
    date.setDate(start.getDate() + offset);
    const dateKey = dashboardDateKey(date);
    const count = EVENTS.filter(event => event.date === dateKey).length;
    weekCount += count;
    return `<button class="week-day ${offset === 0 ? "week-day-first" : ""}" data-dashboard-day="${dateKey}" type="button" aria-label="${date.toLocaleDateString("en-US", {weekday:"long",month:"long",day:"numeric"})}, ${count} events"><span>${date.toLocaleDateString("en-US", {weekday:"short"})}</span><strong>${date.getDate()}</strong><small>${count ? `${count} ${count === 1 ? "event" : "events"}` : "No events"}</small></button>`;
  }).join("");
  $("#eventsWeekNote").textContent = `${weekCount} in the sample week`;

  const saved = getSaved();
  const data = readDashboardData();
  $("#statSuggestions").textContent = data.drafts.length;
  $("#savedHint").textContent = saved.length ? "Your next plans are taking shape" : "Start saving your favorites!";
  const interest = getSession()?.interest;
  const recommendations = [...EVENTS].sort((a, b) => {
    const score = event => (event.interest === interest ? 2 : 0) - (saved.includes(event.id) ? 3 : 0);
    return score(b) - score(a);
  }).slice(0, 3);
  $("#dashboardRecommendations").innerHTML = recommendations.map(event => `<article class="dashboard-recommendation" style="--event-color:${event.hue}"><button class="recommendation-open" data-dashboard-event="${event.id}" type="button"><img src="${dashboardPhoto(event)}" alt="" loading="lazy"><span><strong>${event.title}</strong><small><i data-lucide="map-pin" aria-hidden="true"></i>${event.location}</small><span class="recommendation-tag">${event.interest}</span></span></button><button class="dashboard-save ${saved.includes(event.id) ? "is-saved" : ""}" data-save="${event.id}" aria-pressed="${saved.includes(event.id)}" aria-label="${saved.includes(event.id) ? "Remove from saved" : "Save"}: ${event.title}" title="${saved.includes(event.id) ? "Remove from saved" : "Save event"}"><i data-lucide="bookmark" aria-hidden="true"></i></button></article>`).join("");
  $("#dashboardActivity").innerHTML = dashboardActivityMarkup(data.activity.slice(0, 3));

  const progress=dashboardBadgeState();
  $("#progressPoints").textContent=progress.points;
  $("#progressLevel").textContent=`Lv. ${progress.level}`;
  $("#progressRing").style.setProperty("--progress",`${progress.levelPercent}%`);
  $("#progressRing").setAttribute("aria-valuenow",String(progress.levelPercent));
  $("#progressRing").setAttribute("aria-valuetext",`Level ${progress.level}; ${progress.levelPercent} of 100 points toward the next level`);
  $("#progressRank").textContent=progress.currentBadge.name;
  $("#progressSymbol").innerHTML=`<i data-lucide="${progress.currentBadge.icon}" aria-hidden="true"></i>`;
  $("#progressSymbol").style.color=progress.currentBadge.color;
  $("#progressTitle").textContent=`${progress.currentBadge.name} badge`;
  $("#progressCopy").textContent=progress.nextBadge ? `${progress.pointsToNextBadge} points to ${progress.nextBadge.name}` : "All current badges earned";
  $("#progressBadgeCount").textContent=`${progress.earnedCount} / ${progress.badges.length} badges earned`;
  $("#progressStorageWarning").textContent=progress.warning;
  $("#progressStorageWarning").classList.toggle("hidden",!progress.warning);
  const newMilestones=progress.newlyEarned.filter(badge => badge.level>1);
  $("#progressBadgeAnnouncement").textContent=newMilestones.length ? `Badge unlocked: ${newMilestones.map(badge => badge.name).join(", ")}` : "";
  refreshProgressDialog(progress);
  const weekend = dashboardWeekendEvents();
  $("#weekendNote").textContent = `${weekend.length} campus events in the sample weekend.`;
  if ($("#dashboardDialog").open && $("#dashboardDialog").dataset.eventId) {
    openDashboardEvent(Number($("#dashboardDialog").dataset.eventId));
  }
  window.campusRenderIcons?.();
}

function dashboardWeekendEvents(){
  const firstSaturday = dashboardWeekStart();
  firstSaturday.setDate(firstSaturday.getDate() + 3);
  const sunday = new Date(firstSaturday);
  sunday.setDate(sunday.getDate() + 1);
  return EVENTS.filter(event => event.date === dashboardDateKey(firstSaturday) || event.date === dashboardDateKey(sunday));
}

function showDashboardDialog(title, markup, eventId = ""){
  const dialog = $("#dashboardDialog");
  dialog.dataset.eventId = eventId;
  delete dialog.dataset.discoverEvent;
  delete dialog.dataset.progressBadges;
  $("#dashboardDialogTitle").textContent = title;
  $("#dashboardDialogBody").innerHTML = markup;
  window.campusRenderIcons?.();
  if (!dialog.open) dialog.showModal();
}

function dashboardAgendaMarkup(events){
  return events.map(event => `<button class="calendar-event-row" data-dashboard-event="${event.id}" type="button"><time datetime="${event.date}">${new Date(event.date + "T00:00:00").toLocaleDateString("en-US", {month:"short", day:"numeric"})}</time><span><strong>${event.title}</strong><small>${event.time} · ${event.location}</small></span><i data-lucide="arrow-right" aria-hidden="true"></i></button>`).join("") || '<p class="dashboard-empty">No events on this day. There is more to explore in Discover.</p>';
}

function openDashboardEvent(id){
  const event = EVENTS.find(item => item.id === id);
  if (!event) return;
  const saved = getSaved().includes(id);
  showDashboardDialog(event.title, `<img class="dashboard-detail-image" src="${dashboardPhoto(event)}" alt=""><span class="recommendation-tag">${event.interest}</span><p class="dashboard-detail-date">${new Date(event.date + "T00:00:00").toLocaleDateString("en-US", {weekday:"long",month:"long",day:"numeric"})} · ${event.time}</p><p>${event.location}</p><p class="dashboard-detail-description">${event.desc}</p><p class="dashboard-detail-host">Hosted by ${event.host}</p><button class="btn btn-primary" data-save="${id}" aria-pressed="${saved}"><i data-lucide="bookmark" aria-hidden="true"></i>${saved ? "Remove from saved" : "Save event"}</button>`, String(id));
}

function setupDashboard(){
  const dialog = $("#dashboardDialog");
  $("#openCalendar").addEventListener("click", () => showDashboardDialog("Campus calendar", dashboardAgendaMarkup(EVENTS)));
  $("#closeDashboardDialog").addEventListener("click", () => dialog.close());
  dialog.addEventListener("click", event => { if (event.target === dialog) dialog.close(); });
  $("#surpriseEvent").addEventListener("click", () => {
    const options = EVENTS.filter(event => !getSaved().includes(event.id));
    const pool = options.length ? options : EVENTS;
    openDashboardEvent(pool[Math.floor(Math.random() * pool.length)].id);
  });
  $("#exploreWeekend").addEventListener("click", () => showDashboardDialog("Your sample weekend", dashboardAgendaMarkup(dashboardWeekendEvents())));
  $("#viewDashboardActivity").addEventListener("click", () => showDashboardDialog("Your activity", dashboardActivityMarkup(readDashboardData().activity)));
  $("#viewProgress").addEventListener("click", () => {
    showDashboardDialog("Your badges",progressDetailsMarkup(dashboardBadgeState()));
    $("#dashboardDialog").dataset.progressBadges="true";
  });
  const syncBadges=event => { if (getSession() && (!event.key || event.key === SAVED_KEY || event.key === dashboardStorageKey() || event.key.startsWith("cv_progress_badges_"))) renderDashboard(); };
  window.addEventListener("storage",syncBadges);
  window.campusBadgeCleanup=() => window.removeEventListener("storage",syncBadges);
}

function handleDashboardNavigation(event){
  const day = event.target.closest("[data-dashboard-day]");
  if (day) {
    showDashboardDialog(new Date(day.dataset.dashboardDay + "T00:00:00").toLocaleDateString("en-US", {weekday:"long",month:"long",day:"numeric"}), dashboardAgendaMarkup(EVENTS.filter(item => item.date === day.dataset.dashboardDay)));
    return true;
  }
  const card = event.target.closest("[data-dashboard-event]");
  if (card) { openDashboardEvent(Number(card.dataset.dashboardEvent)); return true; }
  return false;
}
