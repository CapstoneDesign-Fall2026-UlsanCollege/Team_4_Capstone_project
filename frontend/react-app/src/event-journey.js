import { getEventMapLinks, getJourneyLinks, JOURNEY_MODES, mapCoordinates, parseMapCoordinates, straightLineDistanceKm } from './event-maps.js';

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
    action.textContent = mode.action;
    action.setAttribute('aria-label', `${mode.action} in Google Maps (opens in a new tab)`);
    for (const [element, href] of [[action, links?.route], [stops, links?.stops]]) {
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
    target.querySelector('[data-journey-status]').textContent = state.message;
    const locate = target.querySelector('[data-journey-locate]');
    locate.disabled = state.locating;
    locate.textContent = state.locating ? 'Finding your location…' : 'Use my current location';
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
    state.venueOnly = Boolean(map && !map.directions);
    target = element;
    target.className = 'event-journey';
    target.setAttribute('role', 'region');
    target.setAttribute('aria-label', 'Plan your trip');
    target.innerHTML = `
      <details><summary class="journey-heading"><span aria-hidden="true">↗</span><span><strong>Plan your trip</strong><span>Bus routes, distance &amp; travel time</span></span><span class="journey-chevron" aria-hidden="true">⌄</span></summary>
      <div class="journey-body">
      <label class="journey-field">Destination address or coordinates
        <input data-journey-destination type="text" maxlength="200" autocomplete="off" placeholder="Full venue address, city, or latitude, longitude" aria-describedby="journey-destination-hint">
      </label>
      <p class="journey-hint" id="journey-destination-hint" data-journey-destination-hint></p>
      <div class="journey-location-actions"><button type="button" data-journey-reset-destination hidden>Use event location</button></div>
      <label class="journey-field">Starting point
        <input data-journey-origin type="text" maxlength="200" autocomplete="off" placeholder="Home address, station, or landmark" aria-describedby="journey-privacy">
      </label>
      <div class="journey-location-actions"><button type="button" data-journey-locate>Use my current location</button><button type="button" data-journey-clear hidden>Clear starting point</button></div>
      <p class="journey-status" role="status" data-journey-status></p>
      <div class="journey-modes" role="group" aria-label="How will you travel?">${JOURNEY_MODES.map(mode => `<button type="button" data-journey-mode="${mode.id}" aria-pressed="false">${mode.label}</button>`).join('')}</div>
      <div class="journey-summary"><strong>Distance &amp; travel time</strong><p data-journey-distance></p><p>Bus numbers, stops, transfers and schedules appear in Google Maps where available. Check departure time there.</p></div>
      <div class="journey-route-actions"><a data-journey-route target="_blank" rel="noopener noreferrer"></a><a data-journey-stops target="_blank" rel="noopener noreferrer" aria-label="Find bus stops near the destination in Google Maps (opens in a new tab)">Find nearby bus stops</a></div>
      <p class="journey-privacy" id="journey-privacy">Your starting point stays in this dialog. Opening directions shares it with Google Maps. Closing this dialog clears it.</p></div></details>`;
    const details = target.querySelector('details');
    details.open = state.expanded;
    const trip = state;
    details.addEventListener('toggle', () => { if (state === trip) state.expanded = details.open; });
    target.querySelector('[data-journey-destination]').value = state.destination;
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
