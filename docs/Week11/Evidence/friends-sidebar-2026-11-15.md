# Signed-in friends sidebar fix - November 15, 2026 (KST)

Tracked bug: [#175](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/issues/175).

## Problem and resulting behavior

When a signed-in member opened Campus Vibe-Feed > Friends, accepted friends appeared both in the middle directory (with Remove friend) and in the Your friends sidebar. The sidebar rendered every friend and the connection watcher stopped after 100 records.

Accepted friends now appear only in the Your friends section. The middle panel is Find people across campuses, with separate Find people and Requests views. Discovery excludes the current user and anyone with an existing connection. Each central view searches names/colleges and displays ten people per page. Requests include incoming invitations and outgoing requests, retaining accept, decline and cancel controls.

Your friends previews five contacts and displays the total. View all friends expands and searches a scrollable list inside that section; Show fewer friends collapses it. Remove friend is available beside each expanded entry. At tablet/mobile widths, the section appears below the main Friends panel so it remains accessible. Friend-request notifications open Requests; accepted notifications open discovery without reintroducing a central friend list.

## Implementation and limits

- `SharedFriends.jsx`: discovery/request filtering, search, deterministic ordering and pagination.
- `SharedFriendsSidebar.jsx`: sidebar preview, full-list search/scroll, count and removal.
- `SharedFeed.jsx` and `shared-feed.css`: routing, responsive placement and styling.
- `shared-friends-store.js`: live pages ordered by document ID with a maximum of 100 records per query; subsequent page listeners cover larger accounts. A changed boundary cancels/rebuilds later pages, stale callbacks are ignored, and cleanup stops all listeners.

Existing Firestore security rules remain unchanged. Loading more connections creates additional live page listeners and may resolve more known-contact profiles using the existing profile mechanism. Global people discovery still uses the existing first-100 profile directory. This fix does not add global directory pagination. Guest/demo mode remains its separate browser-local experience; the reported duplicate signed-in list is the scope of this fix.

## Automated verification

Executor: Codex on Windows, local Google Chrome/Playwright, November 15, 2026 KST. Synthetic people are fictional. These are automated checks, not an independent teammate test.

| Check | Actual result | Boundary covered |
|---|---|---|
| `npm run test:friends --workspace frontend/react-app` | PASS, 3 tests | 225 records, query bounds, shifted boundaries, stale callbacks, metadata, error forwarding and teardown using injected subscriptions |
| `npm run test:friends-emulator --workspace frontend/react-app` | PASS, 1 integration test | Actual Firebase SDK and existing rules: 225 private connections including a pending record beyond 100; deletion shifts a page boundary; unauthorized reads and an unbounded query fail |
| `npm run test:friends-browser --workspace frontend/react-app` | PASS | 125 accepted friends stay out of the middle; five-contact preview, full sidebar/search, discovery pagination, request controls and mobile visibility/overflow |
| `npm run test:rules` with `FIRESTORE_EMULATOR_HOST=127.0.0.1:8180` | PASS, 49 tests | Existing account, feed, notification, published-event and suggestion permission regressions |
| `SMOKE_BROWSER_CHANNEL=chrome npm run test:smoke` | PASS, 118 tests | Full existing desktop/mobile regression suite |
| `npm run build` | PASS | Production Vite bundle builds; existing large-chunk advisory remains |
| `git diff --check` | PASS | No whitespace errors |

The smoke runner reported all 118 cases passing, then stalled while stopping its Windows Vite child process. After terminating only the confirmed test-owned preview process, it finished with exit code 0 and `118 passed (12.5m)`. This was a runner teardown issue, not a test retry.

The browser harness records action callback dispatch; it does not perform real accept/remove writes. The separate SDK/rules integration exercises the real connection watcher and a permitted deletion against the emulator. No signed-in production account interaction, live message delivery, production user-data write or independent human review is claimed.

Evidence: [machine receipt](../../../frontend/react-app/verification/friends-directory/results.json), [synthetic desktop screenshot](../../../frontend/react-app/verification/friends-directory/desktop.png), [synthetic mobile screenshot](../../../frontend/react-app/verification/friends-directory/mobile.png).

## Repeat the focused checks

From the repository root:

```sh
npm run test:friends --workspace frontend/react-app
npm run dev -- --host 127.0.0.1 --port 5186 --strictPort
# Second terminal, after Vite is ready:
npm run test:friends-browser --workspace frontend/react-app
```

For the real SDK/rules integration, run the emulator in a separate terminal:

```sh
npx -y firebase-tools@latest emulators:start --only firestore --project demo-campusvibe-feed --config backend/firebase/firebase.account-test.json
npm run test:friends-emulator --workspace frontend/react-app
```

The emulator integration uses the fictional project `demo-campusvibe-friends` on `127.0.0.1:8180`. `FIRESTORE_EMULATOR_HOST` can override that endpoint. The UI harness accepts `ACCOUNT_TEST_URL` for an alternate localhost Vite port and blocks external network calls. Screenshots show component fixtures in the responsive shared-feed layout, not real member data or a live signed-in session.

## Release and rollback

Merge the fixing PR into the existing production branch, `main`, to trigger the connected Vercel project. Follow [the deployment guide](../../VERCEL_DEPLOYMENT.md). Verify a successful Vercel deployment for the merge commit and check the stable production URL and actual served SharedFeed asset. Record production readiness separately from local behavioral proof in the GitHub issue/PR release comment. Roll back with a revert PR for this release; no database schema, rules or data migration is involved.

## AI assistance and ownership

Codex generated/edited implementation, tests, documentation and synthetic evidence, and executed the automated checks. The user clarified that friends belong only in the right-hand section. Prachi's source explain-back and independent area-reviewer confirmation remain pending. This record does not certify a human review or change existing stewardship assignments. No outside code, media or datasets were incorporated; the visual evidence uses local synthetic fixtures.
