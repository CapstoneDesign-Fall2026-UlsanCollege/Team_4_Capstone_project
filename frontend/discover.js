let currentEventSort = "date";
let currentSavedOnly = false;
let currentEventDateFilter = 'all';

function syncDiscoverDateFilters() {
  document.querySelectorAll('#eventDateFilters [data-event-date]').forEach(button => {
    button.setAttribute('aria-pressed', String(button.dataset.eventDate === currentEventDateFilter));
  });
}
const DISCOVER_STYLES = {
  All: { color: "#8452d8", icon: "calendar-days" },
  Tech: { color: "#159eaa", icon: "monitor" },
  Arts: { color: "#ed7486", icon: "paintbrush" },
  Music: { color: "#8452d8", icon: "music" },
  Sports: { color: "#64a774", icon: "trophy" },
  Social: { color: "#d85f92", icon: "users-round" },
  Academics: { color: "#568ab5", icon: "book-open" },
};

function discoverAttribute(value) { return dashboardText(value).replace(/"/g, "&quot;"); }

function discoverPhotoMarkup(event, extraClass = "") {
  return `<span class="discover-image ${extraClass}"><img src="${eventPhoto(event)}" alt="" loading="lazy"></span>`;
}

function discoverSaveMarkup(event, saved, extraClass = "") {
  const active = saved.includes(event.id);
  return `<button class="discover-save ${active ? "is-saved" : ""} ${extraClass}" type="button" data-save="${event.id}" aria-pressed="${active}" aria-label="${active ? "Remove from saved" : "Save event"}: ${discoverAttribute(event.title)}" title="${active ? "Remove from saved" : "Save event"}"><i data-lucide="bookmark" aria-hidden="true"></i></button>`;
}

function discoverCardMarkup(event, saved) {
  const date = new Date(event.date + "T00:00:00");
  return `<article class="event-card discover-event-card" data-event-id="${event.id}" style="--event-color:${DISCOVER_STYLES[event.interest].color}">${eventSourceMarkup(event)}
    <div class="discover-event-banner">${discoverPhotoMarkup(event)}<time class="discover-event-date" datetime="${event.date}"><span>${date.toLocaleDateString("en-US", { month: "short" })}</span><strong>${date.getDate()}</strong></time></div>
    <div class="discover-event-body"><span class="discover-event-tag">${event.interest}</span><h3>${dashboardText(event.title)}</h3><div class="discover-event-meta"><p><i data-lucide="clock" aria-hidden="true"></i>${dashboardText(event.time)} &middot; ${date.toLocaleDateString("en-US", { weekday: "short" })}</p><p><i data-lucide="map-pin" aria-hidden="true"></i>${eventMapLinkMarkup(event)}</p></div><p class="discover-event-description">${dashboardText(event.desc)}</p><button class="discover-host" type="button" data-discover-host="${discoverAttribute(event.host)}"><span class="discover-host-avatar">${dashboardText(event.host[0])}</span><span>Hosted by ${dashboardText(event.host)}</span></button><footer>${discoverSaveMarkup(event, saved)}<button class="discover-detail-button" type="button" data-discover-event="${event.id}">View details<i data-lucide="arrow-right" aria-hidden="true"></i></button></footer></div>
  </article>`;
}

function renderDiscoverSidebar() {
  const saved = getSaved();
  const hosts = [...new Set(EVENTS.map(event => event.host))];
  $("#discoverStats").innerHTML = [[hosts.length, "Event hosts", "users-round"], [EVENTS.length, "Listed events", "calendar-days"], [EVENTS.filter(event => saved.includes(event.id)).length, "Saved by you", "bookmark"]].map(([count, label, icon]) => `<div><i data-lucide="${icon}" aria-hidden="true"></i><strong>${count}</strong><span>${label}</span></div>`).join("");
  $("#discoverPicks").innerHTML = [2, 4, 6].map(id => EVENTS.find(event => event.id === id)).map(event => `<article class="discover-pick" style="--event-color:${DISCOVER_STYLES[event.interest].color}"><button type="button" class="discover-pick-open" data-discover-event="${event.id}">${discoverPhotoMarkup(event)}<span><strong>${dashboardText(event.title)}</strong><small>${new Date(event.date + "T00:00:00").toLocaleDateString("en-US", { month: "short", day: "numeric" })} &middot; ${dashboardText(event.time)}</small></span></button>${discoverSaveMarkup(event, saved)}</article>`).join("");
  const crews = [[9, "Photography", "camera"], [7, "Gaming", "gamepad-2"], [3, "Art & design", "paintbrush"], [6, "Study", "book-open"]];
  $("#discoverCrews").innerHTML = crews.map(([id, label, icon]) => {
    const event = EVENTS.find(item => item.id === id);
    const count = EVENTS.filter(item => item.host === event.host).length;
    return `<button type="button" data-discover-host="${discoverAttribute(event.host)}" style="--crew-color:${DISCOVER_STYLES[event.interest].color}"><span class="discover-crew-icon"><i data-lucide="${icon}" aria-hidden="true"></i></span><strong>${label}</strong><small>${count} ${count === 1 ? "event" : "events"}</small></button>`;
  }).join("");
  $("#discoverFiltersButton").classList.toggle("has-filters", currentSavedOnly || currentEventSort !== "date" || currentInterestFilter !== "all" || currentEventDateFilter !== 'all');
  const dialog = $("#dashboardDialog");
  if (dialog.open && dialog.dataset.discoverEvent) openDiscoverEvent(Number(dialog.dataset.discoverEvent));
}

function openDiscoverEvent(id, record = true) {
  const event = EVENTS.find(item => item.id === id);
  if (!event) return;
  const saved = getSaved().includes(id);
  showDashboardDialog(event.title, `${discoverPhotoMarkup(event, "discover-detail-photo")}<span class="recommendation-tag">${event.interest}</span><p class="dashboard-detail-date">${new Date(event.date + "T00:00:00").toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric" })} &middot; ${dashboardText(event.time)}</p>${eventLocationMarkup(event)}<p class="dashboard-detail-description">${dashboardText(event.desc)}</p><button class="discover-host-link" type="button" data-discover-host="${discoverAttribute(event.host)}">Hosted by ${dashboardText(event.host)}<i data-lucide="arrow-right" aria-hidden="true"></i></button><button class="btn btn-primary" type="button" data-save="${id}" aria-pressed="${saved}"><i data-lucide="bookmark" aria-hidden="true"></i>${saved ? "Remove from saved" : "Save event"}</button>`, String(id), {record});
  $("#dashboardDialog").dataset.discoverEvent = String(id);
  // Source and sharing controls are supplied by the common event dialog.
}

function openDiscoverHost(host) {
  const events = EVENTS.filter(event => event.host === host);
  if (!events.length) return;
  const published = events.filter(event => event.source === 'published').length;
  const samples = events.length - published;
  showDashboardDialog(host, `<p class="dashboard-detail-description">${published} published campus ${published === 1 ? 'event' : 'events'} &middot; ${samples} sample ${samples === 1 ? 'listing' : 'listings'}.</p>${events.map(event => `<button class="calendar-event-row" type="button" data-discover-event="${event.id}"><time datetime="${event.date}">${new Date(event.date + "T00:00:00").toLocaleDateString("en-US", { month: "short", day: "numeric" })}</time><span><strong>${dashboardText(event.title)}</strong>${eventSourceMarkup(event)}<small>${dashboardText(event.time)} &middot; ${dashboardText(event.location)}</small></span><i data-lucide="arrow-right" aria-hidden="true"></i></button>`).join("")}`);
}

function clearDiscoverFilters() {
  currentEventSort = "date";
  currentSavedOnly = false;
  currentEventDateFilter = 'all';
  $("#eventSearch").value = "";
  $("#filterBar").querySelectorAll(".chip").forEach(chip => {
    const active = chip.dataset.interest === "all";
    chip.classList.toggle("active", active);
    chip.setAttribute("aria-pressed", String(active));
  });
  renderEvents("all", "");
}

function setupDiscover() {
  const dialog = $("#discoverFilterDialog");
  $('#eventDateFilters').addEventListener('click', event => {
    const button = event.target.closest('[data-event-date]');
    if (!button) return;
    currentEventDateFilter = button.dataset.eventDate;
    renderEvents();
  });
  $("#discoverFiltersButton").addEventListener("click", () => {
    $("#discoverCategory").value = currentInterestFilter;
    $("#discoverSort").value = currentEventSort;
    $("#discoverSavedOnly").checked = currentSavedOnly;
    $('#discoverDate').value = currentEventDateFilter;
    dialog.showModal();
  });
  $("#closeDiscoverFilters").addEventListener("click", () => dialog.close());
  dialog.addEventListener("click", event => { if (event.target === dialog) dialog.close(); });
  $("#discoverFilterForm").addEventListener("submit", event => {
    event.preventDefault();
    currentEventSort = $("#discoverSort").value;
    currentSavedOnly = $("#discoverSavedOnly").checked;
    currentEventDateFilter = $('#discoverDate').value;
    const category = $("#discoverCategory").value;
    $("#filterBar").querySelectorAll(".chip").forEach(chip => {
      chip.classList.toggle("active", chip.dataset.interest === category);
      chip.setAttribute("aria-pressed", String(chip.dataset.interest === category));
    });
    renderEvents(category);
    dialog.close();
  });
  $("#discoverAllHosts").addEventListener("click", () => {
    const hosts = [...new Set(EVENTS.map(event => event.host))];
    showDashboardDialog("Campus event hosts", hosts.map(host => `<button class="discover-host-row" type="button" data-discover-host="${discoverAttribute(host)}"><span>${dashboardText(host)}</span><i data-lucide="arrow-right" aria-hidden="true"></i></button>`).join(""));
  });
}

function handleDiscoverNavigation(event) {
  const detail = event.target.closest("button[data-discover-event]");
  if (detail) { openDiscoverEvent(Number(detail.dataset.discoverEvent)); return true; }
  const host = event.target.closest("[data-discover-host]");
  if (host) { openDiscoverHost(host.dataset.discoverHost); return true; }
  if (event.target.closest("[data-discover-all]")) {
    clearDiscoverFilters();
    $("#eventsGrid").scrollIntoView({ behavior: "smooth", block: "start" });
    $("#eventsGrid button").focus({ preventScroll: true });
    return true;
  }
  return false;
}
