# Private Account Persistence

Implemented October 17, 2026. This supersedes the signed-in browser-local storage
limits in the original Profile, Assistant, Suggestions, and Progress Badges releases.
Demo mode retains its original local behavior.

## What Stays

Real Firebase sign-ins use six private documents under
`campusAccountData/<auth UID>/state/<section>`:

| Section | Account-backed content |
|---|---|
| profile | Study details, bio, interests, followed sample hosts |
| saved | Community event bookmarks |
| dashboard | Recorded save/remove activity and existing legacy dashboard drafts |
| badges | Earned milestones and original earn dates |
| suggestion | Private, unsent event suggestion draft with stable retry ID |
| assistant | Current conversation/draft, recent conversations, saved answers |

These records are not tied to browser storage, the Remember me setting, or a Vercel
deployment. A fresh browser signing into the same account reads the same backend
records. Existing shared posts, social actions, friends, private Messages, submitted
suggestions, and reviewer decisions keep their established Firestore behavior.

## Saves, Retry, and Concurrency

- Initial account views wait for server snapshots, not cached or unacknowledged writes. Slow/failed loads show an error and Retry.
- The account status distinguishes Loading, Syncing, Saved to your account, and failure. A success state follows a server acknowledgement, not just an optimistic local update.
- Offline edits remain in memory and show an unsaved warning. Reconnect or Retry sends them again. Closing/reloading before acknowledgement can lose unsynced changes; the browser warns before leaving, and logout offers cancellation or explicit departure. This is not an offline-first durable outbox.
- Draft/history writes debounce by 500 ms; explicit Save draft and profile saves await the backend. Per-section queues preserve edit order. A newer staged edit is not replaced by an older save acknowledgement.
- Saved-event transactions merge additions/removals relative to the editing device's original list, preserving unrelated concurrent choices. Badges merge by ID/earliest earn date and are never revoked by point loss. Dashboard transactions merge/deduplicate activity, capped at 30 records.
- Profile, suggestion draft, and Assistant notebook conflicts use the latest completed section write. Two people editing the same account simultaneously should coordinate; this is not collaborative document editing.
- Account changes stop the prior account's listeners/timers and remove its private UI. Saved events no longer leak through the old browser-wide list.

## Migration and Privacy

Existing account-keyed profile, signup interest, dashboard, badge, suggestion, and
Assistant browser records import only when that cloud document does not exist.
Transactions ensure a stale browser cannot overwrite a cloud record created by
another device. Resetting a profile writes an empty/default record, so old browser
details do not reappear on the next login. Source browser records are not deleted;
oversized imports retain their browser copy and show a warning without blocking
new account use.

The old `cv_saved` list was shared by all users of a browser, including demo mode.
It is never imported silently. Profile settings offers Import previous saved events
with an explicit ownership warning and confirmation. Import adds to account saves.

Rules allow only a non-anonymous authenticated owner to get/write the six known
sections. Other accounts, guests, collection listing, client deletion, unknown
sections, extra envelope fields, oversized strings, and non-server timestamps are
denied. Private JSON is bounded and cleaned by the client; it is not used to grant
roles or authenticate achievements. Project administrators can access backend
records; this is not end-to-end encryption. Deleting a Firebase Auth user does not
automatically erase its Firestore records; no account-erasure workflow is added.

Records are limited to 20,000 UTF-8 bytes per section, or 200,000 for the Assistant.
The existing conversation/message/answer limits remain. Oversized saves fail
visibly rather than claiming success or silently trimming additional history.
There are six document listeners per real account session and debounced writes;
Firestore usage still counts toward the existing free quota. Billing stays off.

## Scope Boundaries

Discover listings remain the nine sample events. Reviewer approval still does not
publish an event. This change does not resolve Firestore event-loading issue #35,
add RSVP/attendance, create uploaded photos, enable billing, or call an external AI.
Points rules and badge thresholds are unchanged. Badge persistence is not proof of
real campus participation. Guest/demo records remain local and fictional.

## Verification

- All 70 unit checks passed: 15 account checks plus the existing 55 Profile, Assistant, and Badge checks.
- All 18 emulator permission checks passed, including owner isolation, anonymous/signed-out denial, size/field/timestamp restrictions, and the existing social/review permissions.
- The new account browser workflow passed fresh-browser restoration of all six sections, live updates, retained awards, offline recovery, concurrent saves, account switching, and legacy import confirmation.
- Existing two-account Suggest/review and shared Feed/Messages workflows passed, including anonymous submissions, idempotent retry, unread/Seen state, earlier messages, social actions, deletion, and responsive layouts.
- All 32 desktop/mobile demo regression checks passed, and the final production build and `git diff --check` passed.
- Screenshots were inspected on desktop/mobile. The first browser attempt found a test selector mismatch for Settings; it was corrected. Review also fixed a stale offline error after successful retry and ensured activity edits copy state before staging it.
- The build warning now includes an approximately 1.05 MB initial minified JS bundle (277 KB gzip), because signed-in account synchronization loads Firestore centrally. This is a performance limitation, not a passing performance benchmark.

Automated browser evidence uses disposable emulator accounts, not real students
or an independent teammate rehearsal. The new workflow covers a fresh browser,
live cross-context updates, offline recovery, account isolation, legacy import,
and simultaneous event saves. Screenshots: [desktop](account-persistence/profile-desktop.png),
[mobile](account-persistence/profile-mobile.png).

## Repeat

Use Node 20+, Java 21+, Chrome, and installed npm dependencies. In one terminal,
from `frontend/react-app`, start a separate emulator-only preview:

```powershell
$env:VITE_FIREBASE_EMULATORS='true'
$env:VITE_FIREBASE_AUTH_EMULATOR_PORT='9199'
$env:VITE_FIREBASE_FIRESTORE_EMULATOR_PORT='8180'
npm run dev -- --host 127.0.0.1 --port 5186 --strictPort
```

From the repository root in another terminal:

```sh
npx firebase-tools emulators:exec --config firebase.account-test.json --project demo-campusvibe-feed --only auth,firestore "node frontend/react-app/tests/account-checks.js"
```

The coordinator runs 18 permission checks, account persistence, suggestion/review,
and shared Feed/Messages browser workflows sequentially. It refuses non-emulator
projects. Do not run other tests against this isolated emulator concurrently:
permission tests clear its Firestore fixture. Set `PLAYWRIGHT_CHROME_PATH` when
the shared-feed harness needs the installed Chrome instead of Playwright Chromium;
set `SUGGEST_SCREENSHOT_DIR` to avoid overwriting historical Suggest screenshots.

From `frontend/react-app`, also run `npm run test:account`, `npm run test:badges`,
`npm run test:profile`, `npm run test:assistant`, `npm run test:smoke`, and
`npm run build`. Default emulator ports remain 8080/9099; overrides are dev-only.
