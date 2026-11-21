import { getEventMapLinks, getJourneyLinks, JOURNEY_MODES, mapCoordinates, parseMapCoordinates, straightLineDistanceKm } from './event-maps.js';

const paths = {
  route: '<circle cx="5" cy="6" r="3"/><path d="M8 6h9a4 4 0 0 1 0 8H7a4 4 0 0 0 0 8h9"/><path d="m13 19 3 3-3 3" transform="translate(0 -3)"/>',
  pin: '<path d="M20 10c0 6-8 12-8 12S4 16 4 10a8 8 0 1 1 16 0Z"/><circle cx="12" cy="10" r="2.5"/>',
  locate: '<circle cx="12" cy="12" r="7"/><circle cx="12" cy="12" r="2"/><path d="M12 2v3m0 14v3M2 12h3m14 0h3"/>',
  transit: '<rect x="5" y="3" width="14" height="16" rx="3"/><path d="M5 11h14M8 19v2m8-2v2M9 15h.01M15 15h.01M9 6h6"/>',
  walking: '<circle cx="13" cy="4" r="2"/><path d="m7 21 3-7m6 7-3-7V8l-4 4H6m7-4 3 4h3"/>',
  driving: '<path d="m5 7 2-4h10l2 4 2 3v8H3v-8l2-3Zm0 0h14M3 12h18M6 18v3m12-3v3M7 15h.01M17 15h.01"/>',
  bicycling: '<circle cx="5" cy="17" r="4"/><circle cx="19" cy="17" r="4"/><path d="m5 17 6-10 5 10h3L15 5h3M8 7h5M9 17h7"/>',
  arrow: '<path d="M5 12h14m-5-5 5 5-5 5"/>',
  copy: '<rect x="8" y="8" width="12" height="13" rx="2"/><path d="M16 8V3H3v13h5"/>',
};
const icon = name => `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${paths[name]}</svg>`;

// A dialog owns one in-memory trip. Saving an event may replace the dialog DOM;
// keep the trip through that redraw, but clear it on close or account change.
export function createEventJourneyController() {
  let target = null, state = null, request = 0;

  const current = () => target?.isConnected && state;
  const invalidateLocation = () => { request += 1; };

  function clear() {
    invalidateLocation();
    target?.replaceChildren();
    target = null;
    state = null;
  }

  function update() {
    if (!current()) return;
    const start = state.position ? `${state.position.latitude},${state.position.longitude}` : state.origin.trim();
    const links = getJourneyLinks({ origin: start, destination: state.destination, mode: state.mode });
    const action = target.querySelector('[data-journey-route]');
    const stops = target.querySelector('[data-journey-stops]');
    const mode = JOURNEY_MODES.find(item => item.id === state.mode);
    action.querySelector('[data-journey-route-label]').textContent = 'Start directions';
    action.setAttribute('aria-label', `Start directions: ${mode.action.toLowerCase()} in Google Maps (opens in a new tab)`);
    const venueLink = getEventMapLinks({ location: state.destination });
    for (const [element, href] of [[action, links?.route], [stops, links?.stops], [target.querySelector('[data-journey-view-map]'), venueLink?.search]]) {
      if (href) element.href = href;
      else element.removeAttribute('href');
      element.setAttribute('aria-disabled', String(!href));
      element.tabIndex = href ? 0 : -1;
    }
    const coordinate = parseMapCoordinates(state.destination);
    const distance = straightLineDistanceKm(state.position || parseMapCoordinates(state.origin), coordinate);
    const distanceText = distance === null ? 'Route distance and journey time are shown in Google Maps.'
      : `${distance < 0.1 ? 'Less than 0.1' : `About ${distance.toLocaleString('en-US', { maximumFractionDigits: 1 })}`} km in a straight line. Route distance may differ.`;
    target.querySelector('[data-journey-distance]').textContent = distanceText;
    target.querySelector('[data-journey-distance-value]').textContent = distance === null ? 'See in Maps' : `${distance < 0.1 ? '< 0.1' : distance.toLocaleString('en-US', { maximumFractionDigits: 1 })} km direct`;
    target.querySelector('[data-journey-route-mode]').textContent = mode.label;
    target.querySelector('[data-journey-route-hint]').textContent = start
      ? 'Your starting point and destination are ready.'
      : 'Add a starting point above, or choose one in Maps.';
    target.querySelector('[data-journey-transit-hint]').textContent = state.mode === 'transit'
      ? 'See bus numbers, stops, transfers and departure times in Google Maps, where available.'
      : `Google Maps will show the available ${state.mode === 'bicycling' ? 'cycling' : state.mode} routes and estimated time.`;
    const custom = state.destination !== state.initialDestination;
    target.querySelector('.journey-autofill').hidden = custom || !state.initialDestination;
    target.querySelector('[data-journey-event-name]').textContent = custom ? 'Your chosen destination' : state.eventName;
    target.querySelector('[data-journey-event-address]').textContent = state.destination.trim() || 'Add the event address below';
    const badge = target.querySelector('[data-journey-location-badge]');
    badge.textContent = !state.destination.trim() ? 'Address needed' : custom ? 'Custom destination' : state.venueOnly ? 'Check venue address' : 'Organizer location';
    badge.dataset.tone = !state.destination.trim() || (!custom && state.venueOnly) ? 'warning' : 'ready';
    target.querySelector('[data-journey-copy]').disabled = !state.destination.trim();
    target.querySelector('[data-journey-status]').textContent = state.message;
    const locate = target.querySelector('[data-journey-locate]');
    locate.disabled = state.locating;
    locate.querySelector('span').textContent = state.locating ? 'Finding your location…' : 'Use my current location';
    target.querySelector('[data-journey-clear]').hidden = !state.origin && !state.position && !state.locating;
    const hint = target.querySelector('[data-journey-destination-hint]');
    hint.textContent = !state.destination.trim()
      ? state.initialDestination ? 'Destination is empty. Use event location below, or enter an address.' : 'This event has no location yet. Enter a destination address to plan your trip.'
      : !links ? 'These addresses are too long for Maps. Shorten an address or use coordinates.'
      : state.destination !== state.initialDestination ? 'This destination is only for your trip; the event listing is unchanged.'
      : state.venueOnly ? 'Filled from the event’s venue name. Its address is not confirmed; check the destination in Maps before travelling.'
      : 'Filled from the event’s organizer-provided address or pin. Check the destination before travelling.';
    target.querySelector('[data-journey-reset-destination]').hidden = !state.initialDestination || state.destination === state.initialDestination;
    target.querySelector('[data-journey-origin]').value = state.position ? 'Current location' : state.origin;
    for (const button of target.querySelectorAll('[data-journey-mode]')) {
      button.setAttribute('aria-pressed', String(button.dataset.journeyMode === state.mode));
    }
  }

  function locate() {
    if (!current() || state.locating) return;
    if (!window.isSecureContext || !navigator.geolocation) {
      state.message = 'Location is unavailable in this browser. Enter your starting address instead.';
      update();
      return;
    }
    state.locating = true;
    state.message = 'Allow location in your browser, or enter a starting address instead.';
    const token = ++request;
    update();
    const finish = (position, message) => {
      if (token !== request || !current()) return;
      state.locating = false;
      state.position = position;
      state.message = message;
      update();
    };
    try {
      navigator.geolocation.getCurrentPosition(result => {
        const position = mapCoordinates(result.coords);
        const accuracy = result.coords.accuracy;
        finish(position, position
          ? `Current location ready.${Number.isFinite(accuracy) && accuracy >= 0 ? ` Approximate accuracy: ${Math.ceil(accuracy).toLocaleString('en-US')} m.` : ''}`
          : 'Your location could not be read. Enter your starting address instead.');
      }, error => {
        const messages = {
          1: 'Location permission was declined. Enter your starting address instead.',
          2: 'Your location is unavailable. Enter your starting address or try again.',
          3: 'Finding your location timed out. Enter your starting address or try again.',
        };
        finish(null, messages[error?.code] || 'Your location could not be read. Enter your starting address instead.');
      }, { enableHighAccuracy: false, timeout: 10000, maximumAge: 60000 });
    } catch {
      finish(null, 'Your location is unavailable. Enter your starting address instead.');
    }
  }

  function attach(element, event) {
    if (!element || !event) { clear(); return; }
    const map = getEventMapLinks(event);
    const destination = map?.destination || '';
    const key = JSON.stringify([event.id, event.location, destination]);
    if (state?.key !== key) {
      clear();
      state = { key, initialDestination: destination, destination, venueOnly: Boolean(map && !map.directions), origin: '', position: null, mode: 'transit', message: '', locating: false, expanded: false };
    }
    state.eventName = event.title || map?.venue || 'Your event';
    state.venueOnly = Boolean(map && !map.directions);
    target = element;
    target.className = 'event-journey';
    target.setAttribute('role', 'region');
    target.setAttribute('aria-label', 'Plan your trip');
    target.innerHTML = `
      <details><summary class="journey-heading"><span class="journey-heading-icon">${icon('route')}</span><span><strong>Plan your trip</strong><span>A little less planning. A lot more campus.</span></span><span class="journey-chevron" aria-hidden="true">⌄</span></summary>
      <div class="journey-body">
      <div class="journey-destination-card">
        <div class="journey-pin">${icon('pin')}</div>
        <div class="journey-destination-info"><span class="journey-eyebrow">YOU'RE HEADING TO</span><strong data-journey-event-name></strong><p data-journey-event-address></p><span class="journey-location-badge" data-journey-location-badge></span></div>
        <button type="button" class="journey-copy" data-journey-copy aria-label="Copy destination address">${icon('copy')}<span>Copy address</span></button>
      </div>
      <div class="journey-form">
      <div class="journey-step"><span class="journey-step-marker" aria-hidden="true">1</span><div class="journey-step-content">
      <label class="journey-field">Starting point
        <input data-journey-origin type="text" maxlength="200" autocomplete="off" placeholder="Enter an address, station or landmark" aria-describedby="journey-privacy">
      </label>
      <div class="journey-location-actions"><button type="button" class="journey-locate" data-journey-locate>${icon('locate')}<span>Use my current location</span></button><button type="button" data-journey-clear hidden>Clear starting point</button></div>
      <p class="journey-status" role="status" data-journey-status></p>
      </div></div>
      <div class="journey-step"><span class="journey-step-marker journey-step-marker-end" aria-hidden="true">2</span><div class="journey-step-content">
      <label class="journey-field"><span>Destination <span class="journey-autofill">Filled from event</span></span>
        <input data-journey-destination type="text" maxlength="200" autocomplete="off" placeholder="Full venue address, city, or latitude, longitude" aria-describedby="journey-destination-hint">
      </label>
      <p class="journey-hint" id="journey-destination-hint" data-journey-destination-hint></p>
      <div class="journey-location-actions"><button type="button" data-journey-reset-destination hidden>Use event location</button></div>
      </div></div>
      <h4 class="journey-travel-title">How are you getting there?</h4>
      <div class="journey-modes" role="group" aria-label="How will you travel?">${JOURNEY_MODES.map(mode => `<button type="button" data-journey-mode="${mode.id}" aria-pressed="false">${icon(mode.id)}<span>${mode.label}</span></button>`).join('')}</div>
      </div>
      <aside class="journey-route-panel" aria-label="Route summary">
      <div class="journey-summary"><span class="journey-eyebrow">YOUR JOURNEY</span><strong data-journey-route-mode></strong><p data-journey-route-hint></p>
      <dl class="journey-metrics"><div><dt>Distance</dt><dd data-journey-distance-value></dd></div><div><dt>Travel time</dt><dd>See in Maps</dd></div></dl>
      <p data-journey-distance></p><p class="journey-transit-note" data-journey-transit-hint></p></div>
      <div class="journey-route-actions"><a data-journey-route target="_blank" rel="noopener noreferrer"><span data-journey-route-label></span>${icon('arrow')}</a><span class="journey-provider">Opens Google Maps in a new tab</span><div class="journey-secondary-links"><a data-journey-stops target="_blank" rel="noopener noreferrer" aria-label="Find bus stops near the destination in Google Maps (opens in a new tab)">Nearby bus stops</a><a data-journey-view-map target="_blank" rel="noopener noreferrer" aria-label="View destination in Google Maps (opens in a new tab)">View destination</a></div></div>
      </aside>
      <p class="journey-privacy" id="journey-privacy">Your starting point stays in this dialog. Opening directions shares it with Google Maps. Closing this dialog clears it.</p></div></details>`;
    const details = target.querySelector('details');
    details.open = state.expanded;
    const trip = state;
    details.addEventListener('toggle', () => {
      if (state !== trip) return;
      const opening = details.open && !state.expanded;
      state.expanded = details.open;
      if (opening) target.scrollIntoView({ block: 'start', behavior: 'instant' });
    });
    target.querySelector('[data-journey-destination]').value = state.destination;
    target.querySelector('[data-journey-destination]').setAttribute('aria-label', 'Destination address or coordinates');
    target.querySelector('[data-journey-copy]').addEventListener('click', async () => {
      const trip = state, address = state.destination.trim();
      if (!address) return;
      try {
        await navigator.clipboard.writeText(address);
        if (state !== trip || state.destination.trim() !== address || !current()) return;
        state.message = 'Destination address copied. You can paste it into your preferred map app.';
      } catch {
        if (state !== trip || state.destination.trim() !== address || !current()) return;
        const input = target.querySelector('[data-journey-destination]');
        input.focus(); input.select();
        state.message = 'Address selected. Press Ctrl+C (or Command+C) to copy, or touch and hold to copy on your phone.';
      }
      update();
    });
    target.querySelector('[data-journey-destination]').addEventListener('input', event => {
      state.destination = event.target.value;
      update();
    });
    target.querySelector('[data-journey-reset-destination]').addEventListener('click', () => {
      state.destination = state.initialDestination;
      target.querySelector('[data-journey-destination]').value = state.destination;
      update();
    });
    target.querySelector('[data-journey-origin]').addEventListener('input', event => {
      invalidateLocation();
      state.origin = event.target.value;
      state.position = null;
      state.locating = false;
      state.message = '';
      update();
    });
    target.querySelector('[data-journey-locate]').addEventListener('click', locate);
    target.querySelector('[data-journey-clear]').addEventListener('click', () => {
      invalidateLocation();
      state.origin = '';
      state.position = null;
      state.locating = false;
      state.message = 'Starting point cleared. You can choose a starting point in Google Maps.';
      update();
    });
    for (const button of target.querySelectorAll('[data-journey-mode]')) button.addEventListener('click', () => {
      state.mode = button.dataset.journeyMode;
      update();
    });
    update();
  }

  return { attach, clear };
}
