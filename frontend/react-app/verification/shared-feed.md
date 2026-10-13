# Shared Text and Event Feed

Production update, October 14, 2026: the rules/indexes are now deployed and the
two-account text-post workflow passed on the live site. See the
[production permissions fix record](shared-feed-production.md).
The sections below retain the original local review and setup scope.

Signed-in Firebase users read the latest 50 shared posts and can publish text
or event posts, edit their own posts, and delete their own posts. My posts uses
an author query. Search filters the loaded page, not the entire database.
Guest demo posts remain in browser storage and are not published to Firestore.

## Review and Production Boundary

Reviewed on October 14, 2026. The data layer checks the active Firebase UID;
Firestore rules separately enforce ownership, bounded queries, allowed fields,
field sizes, and server timestamps. Signed-out and anonymous access is denied.
The shared interface hides other authors' edit/delete controls, disables
publishing while disconnected, and renders post markup as text.

The browser harness now waits for app readiness rather than network idleness.
The rules suite clears its test documents during teardown so the browser test
can start from an empty emulator database.

Disconnected composers now remain disabled without displaying Posting or
Saving progress unless an actual write is pending. The browser check caught
this status-label issue and passed after the correction.

## Verified Results

Local checks on October 14, 2026 used Firebase CLI 15.33.0, Firestore emulator
1.22.0, Java 21, and installed Google Chrome with Playwright 1.64.0.

| Check | Actual result |
|---|---|
| Firestore rules | All six tests passed, including cross-account reads, denied anonymous/signed-out access, author-only mutations, field validation, timestamps, and query limits. |
| Two-account browser workflow | Passed: real-time text/event publishing, safe text rendering, edit propagation, reload persistence, My posts isolation, deletion, offline controls, logout, and isolated demo entry. |
| Responsive layout | No document horizontal overflow at 1536, 1024, 768, 390, and 320px. Desktop/mobile screenshots were visually inspected. |
| Existing Events smoke tests | All four desktop/mobile event-detail and empty-search recovery tests passed after integrating main. |
| Production build | Passed after the UI fix; Vite transformed 3839 modules. A bundle-size warning remains for chunks over 500 kB. |
| Dependency audit during installation | Zero vulnerabilities reported. |

Evidence: [desktop emulator screenshot](shared-feed/shared-feed-1536.png) and
[mobile emulator screenshot](shared-feed/shared-feed-390.png). They contain
fictional local test profiles, with no passwords or authentication tokens.
No uncaught browser page errors were recorded in the shared-feed workflow.

This branch includes rules and indexes but does not deploy them. Before using
the shared feed in production, the project owner must review the existing
production rules and integrate these collection permissions without removing
permissions needed by other features, then deploy the reviewed rules/indexes.
The authored rules file denies access to collections not explicitly matched.
Production cross-account sharing and index readiness remain unverified.

Shared photo uploads and social actions are outside this implementation.
There is no pagination beyond the latest 50 posts. Server event-date validation
checks the date format and month/day ranges; the client also checks calendar
validity. Display names and college names are user-supplied, not verified
campus identities. Cached posts can remain visible while offline; writes await
server confirmation and are not reported as successful before acknowledgment.

## Repeat Locally

Use Node.js, npm, and Java 21 or later. From the repository root:

```sh
npx -y firebase-tools@15.33.0 emulators:start --only auth,firestore --project demo-campusvibe-feed
```

In a second PowerShell terminal:

```powershell
cd frontend/react-app
npm ci
npm run test:feed-rules
$env:VITE_FIREBASE_EMULATORS = 'true'
npm run dev -- --host 127.0.0.1 --port 5180 --strictPort
```

In a third PowerShell terminal:

```powershell
cd frontend/react-app
npx playwright install chromium
npm run test:shared-feed
```

Use a dedicated empty emulator project. Run rule checks before browser checks,
and avoid running them simultaneously: rule tests clear the emulator database.
The browser test asserts that Authentication is connected to the emulator and
the app uses `demo-campusvibe-feed` before creating accounts. It refuses remote
preview URLs. Production builds ignore the emulator environment flag.

To use installed Chrome instead of downloaded Chromium, set
`PLAYWRIGHT_CHROME_PATH` to the Chrome executable before the browser command.
Optional screenshots use `FEED_SCREENSHOT_DIR`. All test accounts in this check
belong to the local emulator, not production Firebase.
