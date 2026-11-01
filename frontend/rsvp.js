/* ══════════════════════════════════════════════════════════════════════
   rsvp.js — CampusVibes Event RSVP
   Implements window.campusEventJourney.attach() — the plugin hook that
   dashboard.js calls every time an event detail dialog opens.
   No existing files are modified (except the <script> tag in index.html).
   ══════════════════════════════════════════════════════════════════════ */

(function () {
  'use strict';

  /* ── Storage key ── */
  const RSVP_KEY = 'cv_rsvps';

  /* ── Read RSVP list (array of event IDs) ── */
  function readRsvps() {
    const session = window.getSession?.();
    if (session && session.id !== 'demo') {
      return window.campusAccount?.read('saved_rsvps') || [];
    }
    try {
      const value = JSON.parse(localStorage.getItem(RSVP_KEY) || '[]');
      return Array.isArray(value) ? value : [];
    } catch { return []; }
  }

  /* ── Write RSVP list ── */
  function writeRsvps(ids) {
    const session = window.getSession?.();
    if (session && session.id !== 'demo' && window.campusAccount) {
      window.campusAccount.write('saved_rsvps', ids);
    } else {
      localStorage.setItem(RSVP_KEY, JSON.stringify(ids));
    }
  }

  /* ── Check if user is RSVPed to an event ── */
  function isRsvped(eventId) {
    return readRsvps().includes(eventId);
  }

  /* ── Toggle RSVP ── */
  function toggleRsvp(eventId, eventTitle, onUpdate) {
    const current = readRsvps();
    const joined = current.includes(eventId);
    const next = joined
      ? current.filter(id => id !== eventId)
      : [...current, eventId];
    writeRsvps(next);

    /* Record in dashboard activity log if available */
    if (typeof recordDashboardActivity === 'function') {
      recordDashboardActivity(joined ? 'rsvp-cancel' : 'rsvp-join', eventTitle);
    }

    /* Notify rest of app */
    window.dispatchEvent(new CustomEvent('campus-rsvp-change', {
      detail: { eventId, joined: !joined }
    }));

    if (typeof onUpdate === 'function') onUpdate();
  }

  /* ── Render the RSVP block into the mount element ── */
  function renderRsvp(mount, event) {
    if (!mount || !event) return;

    const rsvped = isRsvped(event.id);
    const allRsvps = readRsvps();
    /* Count is own join + a random plausible peer count seeded by event id */
    const seed = (event.id * 17 + 5) % 23;
    const peerCount = seed;
    const totalCount = peerCount + (rsvped ? 1 : 0);

    mount.className = 'rsvp-block';
    mount.setAttribute('role', 'region');
    mount.setAttribute('aria-label', 'RSVP');
    mount.innerHTML = `
      <div class="rsvp-inner">
        <div class="rsvp-count">
          <span class="rsvp-count-icon" aria-hidden="true">${rsvped ? '✅' : '🎟️'}</span>
          <span class="rsvp-count-text">
            <strong id="rsvp-count-number-${event.id}">${totalCount}</strong>
            ${totalCount === 1 ? 'person going' : 'people going'}
          </span>
          ${rsvped ? '<span class="rsvp-you-badge">You\'re going!</span>' : ''}
        </div>
        <button
          id="rsvp-btn-${event.id}"
          class="rsvp-btn ${rsvped ? 'rsvp-btn--cancel' : 'rsvp-btn--join'}"
          type="button"
          aria-pressed="${rsvped}"
          aria-label="${rsvped ? 'Cancel your RSVP for ' : 'Join '}${event.title}"
        >
          <span class="rsvp-btn-icon" aria-hidden="true">${rsvped ? '✕' : '🎟️'}</span>
          <span>${rsvped ? 'Cancel RSVP' : 'Join event'}</span>
        </button>
      </div>
    `;

    /* Wire up button */
    const btn = mount.querySelector(`#rsvp-btn-${event.id}`);
    btn.addEventListener('click', () => {
      toggleRsvp(event.id, event.title, () => renderRsvp(mount, event));
    });
  }

  /* ── Inject scoped styles once ── */
  function injectStyles() {
    if (document.getElementById('rsvp-styles')) return;
    const style = document.createElement('style');
    style.id = 'rsvp-styles';
    style.textContent = `
      /* ── RSVP block ── */
      .rsvp-block {
        margin: 1rem 0;
        padding: 1rem 1.25rem;
        border-radius: 14px;
        background: color-mix(in srgb, var(--accent, #7c3aed) 8%, var(--surface, #1e1b2e) 92%);
        border: 1.5px solid color-mix(in srgb, var(--accent, #7c3aed) 20%, transparent);
      }

      .rsvp-inner {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 1rem;
        flex-wrap: wrap;
      }

      .rsvp-count {
        display: flex;
        align-items: center;
        gap: 0.6rem;
        color: var(--text, #e2e0f0);
      }

      .rsvp-count-icon {
        font-size: 1.3rem;
        line-height: 1;
      }

      .rsvp-count-text {
        font-size: 0.95rem;
        line-height: 1.3;
      }

      .rsvp-count-text strong {
        display: block;
        font-size: 1.4rem;
        font-weight: 700;
        color: var(--accent, #a78bfa);
        line-height: 1;
      }

      .rsvp-you-badge {
        display: inline-block;
        padding: 0.2em 0.65em;
        border-radius: 99px;
        font-size: 0.75rem;
        font-weight: 600;
        background: color-mix(in srgb, #22c55e 15%, transparent);
        color: #4ade80;
        border: 1px solid color-mix(in srgb, #22c55e 30%, transparent);
        letter-spacing: 0.01em;
      }

      /* ── RSVP button ── */
      .rsvp-btn {
        display: inline-flex;
        align-items: center;
        gap: 0.45rem;
        padding: 0.6rem 1.25rem;
        border-radius: 10px;
        font-size: 0.92rem;
        font-weight: 600;
        cursor: pointer;
        border: none;
        transition: transform 0.15s ease, opacity 0.15s ease, box-shadow 0.15s ease;
        font-family: inherit;
        white-space: nowrap;
      }

      .rsvp-btn:hover {
        transform: translateY(-1px);
        opacity: 0.92;
      }

      .rsvp-btn:active {
        transform: scale(0.97);
      }

      .rsvp-btn--join {
        background: var(--accent, #7c3aed);
        color: #fff;
        box-shadow: 0 2px 12px color-mix(in srgb, var(--accent, #7c3aed) 40%, transparent);
      }

      .rsvp-btn--cancel {
        background: color-mix(in srgb, #ef4444 12%, var(--surface, #1e1b2e) 88%);
        color: #f87171;
        border: 1.5px solid color-mix(in srgb, #ef4444 30%, transparent);
      }

      .rsvp-btn-icon {
        font-size: 1rem;
        line-height: 1;
      }

      @media (max-width: 480px) {
        .rsvp-inner {
          flex-direction: column;
          align-items: flex-start;
        }
        .rsvp-btn {
          width: 100%;
          justify-content: center;
        }
      }
    `;
    document.head.appendChild(style);
  }

  /* ══════════════════════════════════════════════════════════════════════
     The main export: window.campusEventJourney
     dashboard.js calls: window.campusEventJourney?.attach(journeyDiv, event)
     every time an event detail dialog opens.
     We wrap the existing journey controller (if present) and prepend our
     RSVP block into the same mount element's parent.
     ══════════════════════════════════════════════════════════════════════ */
  function createRsvpJourneyController() {
    /* If the real journey controller is already set (from App.jsx / react-app),
       we do NOT override it — instead we listen for the dialog opening and
       inject our RSVP block adjacent to the journey div. */

    injectStyles();

    function attach(journeyElement, event) {
      if (!journeyElement || !event) return;

      /* Find or create a dedicated RSVP mount sibling BEFORE the journey div */
      const parent = journeyElement.parentElement;
      if (!parent) return;

      let rsvpMount = parent.querySelector('.rsvp-block[data-rsvp-event]');
      if (!rsvpMount || rsvpMount.dataset.rsvpEvent !== String(event.id)) {
        /* Remove any stale mount for a different event */
        parent.querySelectorAll('[data-rsvp-event]').forEach(el => el.remove());
        rsvpMount = document.createElement('div');
        rsvpMount.dataset.rsvpEvent = String(event.id);
        /* Insert right before the journey element */
        parent.insertBefore(rsvpMount, journeyElement);
      }

      renderRsvp(rsvpMount, event);
    }

    function clear() {
      document.querySelectorAll('[data-rsvp-event]').forEach(el => el.remove());
    }

    return { attach, clear };
  }

  /* ── Boot: set up window.campusEventJourney if not already set ── */
  function boot() {
    injectStyles();

    if (window.campusEventJourney) {
      /* Real journey controller already registered by the React app.
         Wrap it so we also inject the RSVP block on every attach call. */
      const original = window.campusEventJourney;
      window.campusEventJourney = {
        attach(journeyElement, event) {
          original.attach(journeyElement, event);
          /* Inject RSVP block alongside the journey widget */
          if (journeyElement && event) {
            const parent = journeyElement.parentElement;
            if (parent) {
              let rsvpMount = parent.querySelector('[data-rsvp-event]');
              if (!rsvpMount || rsvpMount.dataset.rsvpEvent !== String(event.id)) {
                parent.querySelectorAll('[data-rsvp-event]').forEach(el => el.remove());
                rsvpMount = document.createElement('div');
                rsvpMount.dataset.rsvpEvent = String(event.id);
                parent.insertBefore(rsvpMount, journeyElement);
              }
              renderRsvp(rsvpMount, event);
            }
          }
        },
        clear() {
          original.clear?.();
          document.querySelectorAll('[data-rsvp-event]').forEach(el => el.remove());
        }
      };
    } else {
      /* No journey controller yet — register ours as the sole handler */
      window.campusEventJourney = createRsvpJourneyController();
    }

    /* Re-render RSVP buttons when RSVP state changes (e.g. from another dialog instance) */
    window.addEventListener('campus-rsvp-change', () => {
      document.querySelectorAll('[data-rsvp-event]').forEach(mount => {
        const eventId = Number(mount.dataset.rsvpEvent);
        const event = window.EVENTS?.find(e => e.id === eventId);
        if (event) renderRsvp(mount, event);
      });
    });
  }

  /* Wait for the React app bundle to load first (it may set campusEventJourney),
     then boot. Using a short defer so we run after all synchronous scripts. */
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => setTimeout(boot, 0), { once: true });
  } else {
    setTimeout(boot, 0);
  }

})();
