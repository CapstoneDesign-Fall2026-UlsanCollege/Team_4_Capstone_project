# CampusVibes React App

This Vite + React app mounts the Community markup and behavior and provides the local demo and Firestore-backed shared feeds. The [production text-post workflow is verified](verification/shared-feed-production.md). See the [project README](../../README.md) for the current feature scope.

## Run locally

The [Suggest page and review queue](verification/suggestions.md) include account-private
Firestore drafts, real Firestore submissions, anonymous reviewer attribution,
personal submission status, and admin-authorized approve/decline decisions.
Use `npm run test:suggestions` with the documented local emulators. Attachments
remain disabled, and approval does not publish a Discover event.

```sh
npm ci
npm run dev
```

The signed-out page has an inline login form and a signup dialog. Email/password accounts use Firebase Authentication; event data is local sample content. Explore events opens the demo Discover page.

Enable the Email/Password provider under Authentication > Sign-in method in the Firebase console before testing signup and login. The Firebase web app configuration is in `src/firebase.js`.

Remember me selects Firebase local persistence; unchecking it selects session persistence. Password visibility is controlled by the eye button. Forgot password sends a Firebase reset email with account-neutral confirmation. Continue with Google uses Firebase's Google popup provider; enable Google in Authentication > Sign-in method and authorize the deployed domain before testing it. Provider configuration errors are shown in the form instead of treating the user as signed in.

## Authentication smoke check — Issue #25

For the redesigned login screen, see the [production screenshots, verification results, and remaining authentication checks](verification/login-redesign.md) tracked in [Issue #54](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/issues/54).

Use a test-only account in the CampusVibe Firebase project; do not use personal credentials.

1. Start the app with `npm run dev` and open the local URL.
2. Sign up with a new test email, a name of at least two characters, a password of at least eight characters, the matching confirmation password, and a selected main interest.
3. Confirm the signed-in CampusVibe home page appears.
4. Sign out, then log in with the same test account.
5. Confirm login returns to the signed-in home page, then sign out and confirm the landing page appears.

The check passes when signup and login both complete, each updates the app to the signed-in home page, and signing out returns the app to the landing page. This is a manual smoke check; Firebase Email/Password must be enabled. Track its result and evidence in [Issue #25](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/issues/25).

## CampusVibes Assistant

The assistant is a free local helper using the shared sample event catalog. The corrected-reference workspace includes a navigation rail, mascot greeting, question tiles, category/date/location filters, recent conversation restore/delete, and explicitly saved answers. It also supports typo-tolerant search, comparisons, saved-event questions, follow-ups, and bookmark/detail controls. Signed-in history, drafts, and saved answers persist privately in Firestore across logout and devices. Demo history is tab-local and cleared on logout. New chat keeps earlier threads in Recent conversations. Attach/Voice remain disabled; sample host listings are not verified club memberships. Demo entry works without a Firebase login. See [current persistence](verification/account-persistence.md) and [original behavior/verification](verification/assistant.md).

## Profile Workspace

The reference-style profile uses the signed-in name/email and a computed completion checklist. Signed-in study details, bio, interests, followed sample hosts, saved events, and activity use private Firestore account records. Account-keyed older browser details are imported only when the corresponding cloud record is missing. The older browser-wide saved list requires explicit import in Profile settings because it may include demo/other-user choices. Demo mode remains browser-local. Following a sample host is not joining a club. Shared photo uploads remain off.

Share profile opens a text preview with email excluded by default. It shares/copies text, not a public profile URL. Settings explains account privacy and offers a confirmed profile reset that leaves account identity, shared data, and event saves unchanged. Run `npm run test:profile`, `npm run test:account`, and `npm run test:smoke`; see [current persistence](verification/account-persistence.md) and [original profile evidence](verification/profile.md).

## Progress Badges

Dashboard progress awards badges at levels 1, 2, 3, 5, and 10. View details shows earned/locked badges, earn dates, required levels/points, and the next target. Current points retain the original calculation: 20 per currently saved Community event plus 30 per recorded dashboard draft, with one level per 100 points. Earned badges remain unlocked when the current score decreases. Signed-in awards sync through private Firestore records, merging earned dates without revocation. Demo awards remain browser-local. These are planning milestones, not a verified leaderboard.

The Suggest form/review queue does not add points to the legacy dashboard-draft count. With nine sample events and no recorded drafts, saving every event reaches 180 points/level 2; higher tiers need additional qualifying records. No new points sources were added. The account-persistence update adds owner-only Firestore permissions. Run `npm run test:badges`; see [current persistence](verification/account-persistence.md) and [badge rules/original verification](verification/progress-badges.md).

This is not a generative AI chatbot. No external model, API key, billing change, live campus feed, or private-message access is involved. Questions do not automatically save events; the student chooses the bookmark control. Run `npm run test:assistant` for the pure engine, storage, and worker checks, and `npm run test:smoke` for desktop/mobile flows.

The earlier local-API “Failed to fetch” failure is not reproducible in the current assistant because it no longer makes API requests. The original reproduction steps and resolution are recorded in [Issue #38](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/issues/38).

## Shared Campus Vibe-Feed

Real Firebase accounts now open a shared text/event feed backed by the
`campusFeedPosts` Firestore collection. Explore events still opens the
device-local demo described below. Shared posts support author editing and
deletion. The restored layout also provides real likes, comments, saved posts,
interest, profiles, and friend requests. Shared photo uploads remain disabled
because the user chose to keep billing off. See the
[real-social feed verification and limits](verification/real-social-feed.md).
The shared feed needs the repository's Firestore rules and indexes installed
in the target project. Pushing this branch does not deploy those resources.
See [shared-feed setup and verification](verification/shared-feed.md).

The rules and My posts index were deployed on October 14, 2026. The
[production fix record](verification/shared-feed-production.md) includes the
two-account text-post check, screenshots, and cleanup results. Reload and use
Try again if an existing tab still displays the previous access error.

## Guest Campus Vibe-Feed Demo

Signed-in members can use the [Messages section](verification/feed-messages.md)
to communicate with accepted friends. Conversations use real Firestore data;
guest demo mode has no real-account messaging.

The signed-in header switches between the existing Community pages and Campus Vibe-Feed. The feed includes cross-college sample profiles, photo and event posts, likes, comments, interested states, saved posts, and demo friend requests.

The guest demo is device-local: IndexedDB stores posts and photo blobs. It does not publish posts, photos, or friend requests to other students. Uploaded raster photos are resized before storage; up to four photos are accepted per post. Switching modes preserves the Community pages and remembers the selected workspace.

To check the demo, choose Explore events, select Campus Vibe-Feed, add your college and a post with photos, then reload, choose Explore events and select Campus Vibe-Feed again to confirm persistence. Check Friends, Saved posts, editing/deleting your own post, and switching back to Community. Guest demo activity stays separate from signed-in shared posts.

## Verify a production build

For the checked-in desktop/mobile Events smoke test, see the
[Week 6 run instructions and validation scope](../../docs/Week6/stretch-validation.md#run-the-checked-in-smoke-test).

```sh
npm run build
```
