# RSVP event-details repair — Issue #193

Recorded November 22, 2026 (KST). This is automated technical evidence; independent manual confirmation remains pending.

The deployed demo reproduced a valid event with a trip-planner mount but no RSVP mount, button or styles on both first open and reopen. React removes the legacy HTML script tags, so the RSVP script never executed. The repair explicitly creates the RSVP controller from the React entry and attaches it when details open. It also removes delayed wrappers and the observer fallback. A valid catalogue event can be resolved from the dialog ID without depending on the trip-planner element; an unavailable event does not invent an RSVP.

Verified members save their personal RSVP under their private account state, with transaction merging across browsers. Demo mode uses separate browser storage. A failed save remains unconfirmed and can be retried; closing the dialog or changing accounts clears the old UI. No simulated attendee count is displayed. Joining records personal intent, not registration, tickets or verified attendance.

## Results and scope

| Check | Result | Environment / limit |
| --- | --- | --- |
| Account/profile unit checks | 28 pass | Local Node tests |
| RSVP, event journey, sharing and events | 60 pass | Local Vite, Chrome, desktop/mobile |
| Feed/account security rules | 25 pass | Local Firestore emulator |
| RSVP persistence/privacy scenarios | 6 pass | Local Auth/Firestore emulators, fictional verified accounts |
| Production build and whitespace check | Pass | Local build; existing bundle-size warning |
| Private RSVP rule deployment | Pass | Production Firestore rules only; no member RSVP written |
| Independent manual confirmation | Pending | Not supplied by automated screenshots |

The six persistence scenarios cover server acknowledgement, fresh-browser restore and cancellation sync, concurrent different-event joins, offline/reconnect recovery, cross-account read denial, and sign-out cleanup. See [scoped results](results.json) for revisions and deployment timestamp/hash. The initial browser run had two assertions expecting a dialog to stay open after sign-out; those expectations were corrected for the privacy cleanup, then the entire selected browser set passed. The initial account harness also attempted to click a header button behind a modal; its replacement simulates an external sign-out through the auth SDK.

## Screenshots

- [Before: deployed demo, no RSVP](before-live-demo.png)
- [After: local desktop dialog](after-local-desktop.png)
- [After: local mobile dialog](after-local-mobile.png)
- [Emulator: confirmed account RSVP](account-emulator-desktop.png)
- [Emulator: separate mobile account](account-emulator-mobile.png)

## Repeat the checks

From `frontend/react-app`, after installing workspace dependencies:

```powershell
node --test tests/account-sync.test.js tests/profile.test.js
$env:SMOKE_BROWSER_CHANNEL = 'chrome'
npm run test:smoke -- rsvp.spec.js event-journey.spec.js event-sharing.spec.js events.spec.js
npm run build
```

For account persistence, start Auth and Firestore emulators with `backend/firebase/firebase.json` and the isolated project `demo-campusvibe-feed`. Start Vite with `VITE_FIREBASE_EMULATORS=true` (default emulator ports 9099 and 8080). Run these from `frontend/react-app` in another terminal while Vite is running locally; use matching port overrides when the defaults are occupied:

```powershell
$env:FIREBASE_AUTH_EMULATOR_HOST = '127.0.0.1:9099'
$env:FIRESTORE_EMULATOR_HOST = '127.0.0.1:8080'
$env:RSVP_TEST_URL = 'http://127.0.0.1:4178'
$env:RSVP_TEST_OUTPUT = Join-Path $env:TEMP 'campusvibes-rsvp-193'
node --test ../../backend/tests/feed-rules.test.js
node tests/rsvp-persistence.browser.js
```

The account harness rejects non-local URLs and requires the isolated emulator project before creating fictional accounts. This recorded run used Vite ports 5202/5203, Auth 25499 and Firestore 24480 through private orchestration; the tracked assertions are the same. Do not point the account harness at production.

For the independent manual check, open a known event, join, close/reopen and reload, then cancel. Check that only one RSVP block appears and trip planning/sharing still work. A member check should also use a fresh browser session and verify the account result; a demo check proves only browser-local persistence. Record the revision, environment and actual result in Issue #193. No new Google-account authentication or production member-persistence result is claimed here, and the existing MVP candidate is unchanged.
