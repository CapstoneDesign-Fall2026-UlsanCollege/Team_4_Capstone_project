function recordEventNavigation(id) {
  const hash = window.campusEventLinks.eventLinkHash(id);
  window.campusSetEventLink?.(id);
  if (location.hash === hash) return;
  const route = readNavigationRoute();
  const parent = route?.eventId ? history.state?.eventReturn : location.hash;
  const eventReturn = /^#\/community\/(dashboard|discover|chat|saved|suggest|profile)$/.test(parent || '') ? parent : '#/community/discover';
  history.pushState({ campusEvent: true, eventId: id, eventReturn }, '', hash);
}

function clearEventNavigation() {
  if (!readNavigationRoute()?.eventId) return;
  const parent = history.state?.eventReturn;
  const hash = /^#\/community\/(dashboard|discover|chat|saved|suggest|profile)$/.test(parent || '') ? parent : '#/community/discover';
  history.replaceState(null, '', hash);
  window.campusSetEventLink?.(null);
}

function eventShareMarkup(id) {
  const url = window.campusEventLinks.eventShareUrl(id, location.href);
  const native = typeof navigator.share === 'function' ? `<button type="button" class="btn event-share-button" data-share-event-apps="${id}">Share with apps</button>` : '';
  return `<section class="event-share" aria-label="Share this event"><button type="button" class="btn event-share-button" data-share-event="${id}" aria-expanded="false" aria-controls="event-share-options"><i data-lucide="share-2" aria-hidden="true"></i>Share event</button><p class="event-share-status" role="status" aria-live="polite"></p><div id="event-share-options" class="event-share-options" hidden><label class="event-share-manual">Event link<input type="text" readonly aria-label="Event link" value="${dashboardText(url)}"></label><div class="event-share-actions"><button type="button" class="btn event-share-button" data-copy-event="${id}">Copy link</button>${native}</div></div></section>`;
}

function revealEventShare(button) {
  const section = button.closest('.event-share');
  section.querySelector('.event-share-options').hidden = false;
  button.setAttribute('aria-expanded', 'true');
  section.querySelector('.event-share-status').textContent = 'Copy the event link or share it with an app.';
  section.querySelector('[data-copy-event]').focus();
}

async function shareEvent(button, withApps = false) {
  const id = Number(withApps ? button.dataset.shareEventApps : button.dataset.copyEvent), dialog = $('#dashboardDialog');
  if (button.disabled || !window.campusEventLinks.validEventLinkId(id)) return;
  const section = button.closest('.event-share'), status = section.querySelector('.event-share-status');
  const url = section.querySelector('.event-share-manual input').value;
  const operation = Number(section.dataset.operation || 0) + 1;
  section.dataset.operation = String(operation);
  const current = () => button.isConnected && dialog.open && dialog.dataset.eventId === String(id) && section.dataset.operation === String(operation);
  button.disabled = true;
  status.textContent = withApps ? 'Opening app sharing. You can still copy the event link.' : 'Copying event link...';
  try {
    if (withApps) {
      if (typeof navigator.share !== 'function') throw new Error('App sharing unavailable');
      await navigator.share({ title: $('#dashboardDialogTitle').textContent, url });
      if (current()) status.textContent = 'App sharing opened. You can also copy the event link.';
    } else {
      if (!navigator.clipboard?.writeText) throw new Error('Clipboard unavailable');
      await navigator.clipboard.writeText(url);
      if (current()) status.textContent = 'Event link copied. Paste it into a message to share.';
    }
  } catch (error) {
    if (!current()) return;
    if (withApps) {
      status.textContent = error?.name === 'AbortError' ? 'App sharing was cancelled or no app is available. You can still copy the event link.' : 'App sharing is unavailable. Use Copy link or copy the link below.';
    } else {
      const input = section.querySelector('.event-share-manual input');
      input.focus();input.select();
      status.textContent = 'Automatic copying is unavailable. Select and copy the event link below.';
    }
  } finally { if (button.isConnected) button.disabled = false; }
}

function renderRoutedEvent() {
  const route = readNavigationRoute();
  if (!getSession() || !route?.eventId) return;
  const id = route.eventId;
  if (EVENTS.some(event => event.id === id)) { openDiscoverEvent(id, false);return; }
  let title = 'Event unavailable', message = 'This event is not available. It may have been removed or the link may be incorrect.', action = '';
  if (id >= 1000 && getSession().id === 'demo') {
    title = 'Sign in to view this event';
    message = 'Published campus events are available to signed-in members. Your event link will be kept when you sign in.';
    action = '<button type="button" class="btn btn-primary" data-event-signin>Sign in</button>';
  } else if (id >= 1000) {
    window.campusRequestLinkedEvent?.(id);
    const state = window.campusLinkedEventStatus;
    if (state?.id === id && state.error) {
      title = 'Event could not be loaded';message = 'Check your connection and try again. The event has not been confirmed as missing.';
      action = '<button type="button" class="btn btn-primary" data-retry-event-link>Retry event</button>';
    } else if (!state?.missing) {
      title = 'Opening shared event';message = 'Loading this event from the shared campus catalogue...';
    }
  }
  showDashboardDialog(title, `<p class="event-link-message" role="status">${message}</p><div class="event-link-actions">${action}<button type="button" class="btn btn-ghost" data-page="discover">Browse events</button></div>`, '', { keepEventRoute: true });
}

function setupEventSharing() {
  const dialog = $('#dashboardDialog');
  const cancel = event => { event.preventDefault();closeDashboardDialog(); };
  dialog.addEventListener('cancel', cancel);
  let date = window.campusEventDates.campusDateKey();
  const refreshDates = () => {
    const next = window.campusEventDates.campusDateKey();
    if (next === date) return;
    date = next;if (getSession()) renderEvents();
  };
  const timer = setInterval(refreshDates, 60000);
  window.addEventListener('focus', refreshDates);
  window.campusEventSharingCleanup = () => { dialog.removeEventListener('cancel', cancel);clearInterval(timer);window.removeEventListener('focus', refreshDates); };
}

function closeDashboardDialog() {
  const route = readNavigationRoute();
  $('#dashboardDialog').close();
  if (!route?.eventId) return;
  if (history.state?.campusEvent && history.state.eventId === route.eventId) history.back();
  else { clearEventNavigation();showPage('discover', false); }
}

function handleEventSharing(event) {
  const share = event.target.closest('[data-share-event]');
  if (share) { revealEventShare(share);return true; }
  const copy = event.target.closest('[data-copy-event]');
  if (copy) { shareEvent(copy);return true; }
  const apps = event.target.closest('[data-share-event-apps]');
  if (apps) { shareEvent(apps, true);return true; }
  if (event.target.closest('[data-retry-event-link]')) { window.campusRequestLinkedEvent?.(readNavigationRoute()?.eventId, true);renderRoutedEvent();return true; }
  if (event.target.closest('[data-event-signin]')) {
    $('#dashboardDialog').close();openAuth('login');return true;
  }
  return false;
}
