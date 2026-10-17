# Event Suggestions and Team Review

Persistence update: signed-in unsent drafts now sync privately to the account.
See [current account persistence](account-persistence.md). The browser-draft
behavior and dated checks below describe the original release; demo drafts stay local.

## Behavior

The Suggest page follows the supplied reference: paired name/club and date/place
fields, category controls with Social/Academics under More, a 500-character
description, anonymous switch, private draft save status, and a guidance sidebar.
Attachments are explicitly unavailable; billing and storage were not changed.

Drafts autosave privately in this browser under an account-specific key. They
restore after reload, including category, date, place, and anonymous choice.
Save draft confirms a local save, not submission. Demo users can keep drafts but
cannot submit to the real team queue. Browser storage errors are reported.

Signed-in members can send suggestions and inspect My suggestions. A successful
send is shown only after server confirmation. A draft keeps its ID through
retries, avoiding duplicate records when a confirmed submission is retried.
Offline sends preserve the draft. After a confirmed send the form resets.

Authorized reviewers see Team review, filter pending/approved/declined ideas,
and record one approve/decline decision with an optional note. The author sees
the decision live and after reload. Approval is a planning decision only: it does
not publish an event to Discover or resolve Firestore event-loading issue #35.

## Privacy and Permissions

- `campusSuggestions/{id}` holds the idea, display attribution, and review status.
- `campusSuggestionOwners/{id}` privately links a suggestion to its author UID. Only that owner can read this receipt through client rules.
- Creation is an atomic two-document write with an authenticated owner and server timestamps. Ordinary students cannot list the queue or read other students' submissions.
- Anonymous queue records contain neither submitter name, club, email, nor account UID. Their ownership receipt is not readable by reviewers through the app. Free-text identifying details are not automatically redacted.
- Project administrators with privileged access can inspect ownership. The anonymous switch states this limitation; it is not a promise of anonymity from the Firebase project owner.
- `campusSuggestionReviewers/{uid}` contains the admin-managed `enabled` flag. Users can inspect only their own role, cannot grant themselves access, and cannot list roles. No client role-management UI exists.
- Reviewers may change only status, review note, reviewer UID, and review time, once while pending. They cannot rewrite an idea, change attribution, or delete records through the app.

The designated existing reviewer account was enabled through the authorized
project administrator, with the user's explicit approval to grant that existing
UID despite its currently unverified email. Its email-verification state was not
changed. No reviewer credentials or production account identifiers are committed.

## Limits

My suggestions watches up to 50 owned receipts; the review queue watches the
latest 100 suggestions. These are bounded windows, not complete paginated
archives. Listeners consume Firestore reads. Drafts do not sync across devices.
After submission, author editing/withdrawal and reviewer decision reversal are
not implemented. Identity display names are not independently verified. The
client validates calendar dates; rules enforce date format and basic day/month
ranges, not full calendar validity. There is no email notification, rate limiter,
attachment upload, automatic publication, or externally anonymous submission.

## Automated Validation - October 16, 2026

- All 16 emulator permission tests passed, including the existing Feed/Messages checks and four suggestion privacy/role/decision tests.
- The two-account browser workflow passed draft recovery, named and anonymous submission, authorized review, approve/decline, live and persistent status, idempotent retry, offline recovery, and no document horizontal overflow at 1440/768/390/320px. No uncaught page errors were recorded.
- All 12 desktop/mobile Community smoke checks passed, including draft recovery after immediate reload and the demo-only submission boundary.
- Production builds and `git diff --check` passed; the existing large-bundle warning remains.
- Screenshots were visually inspected: [desktop](suggestions/suggest-1440.png), [mobile](suggestions/suggest-390.png). They use fictional emulator accounts, not real students.

The suggestion rules were compiled and deployed after comparing existing live
rules to reviewed main revision `286e5be`; Feed and Messages permissions were
preserved. This is automated evidence, not an independent teammate rehearsal.

## Repeat Locally

Start the [Auth and Firestore emulators](shared-feed.md#repeat-locally), then run
`npm run test:feed-rules` from `frontend/react-app`. Do not run this concurrently
with browser workflows because the permission tests clear the emulator database.

Start an emulator-backed preview in another terminal:

```powershell
$env:VITE_FIREBASE_EMULATORS = 'true'
npm run dev -- --host 127.0.0.1 --port 5186 --strictPort
```

Then run `npm run test:suggestions`. The harness requires installed Chrome,
asserts the demo emulator project before creating accounts, and refuses remote
URLs. It creates a temporary reviewer role only in the emulator and cleans up
its suggestion records, reviewer roles, and disposable emulator accounts.
