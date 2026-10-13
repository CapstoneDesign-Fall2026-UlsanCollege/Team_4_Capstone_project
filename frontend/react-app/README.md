# CampusVibes React App

This Vite + React app mounts the Community markup and behavior and provides the local demo and Firestore-backed shared feeds. The shared-feed implementation is on `feat/shared-text-event-feed`; production verification remains outstanding. See the [project README](../../README.md) for the current feature scope.

## Run locally

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

The assistant works directly in the browser using the sample events already in the app. It can suggest events by interest, answer basic event time and location questions, list saved events, and explain how to use Discover, Saved, and Suggest. It does not need an API key, a separate server, or a sign-in, and it does not answer general questions or access live campus information.

This is an intentionally small prototype, not a generative AI chatbot. A future iteration can connect Gemini through a secured backend to answer broader questions. If the team wants chat requests to trigger CampusVibes actions or change app features, those capabilities must be implemented as explicit, permission-checked tools; a model should not execute arbitrary code or silently modify the app.

The earlier local-API “Failed to fetch” failure is not reproducible in the current assistant because it no longer makes API requests. The original reproduction steps and resolution are recorded in [Issue #38](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/issues/38).

## Shared Campus Vibe-Feed

Real Firebase accounts now open a shared text/event feed backed by the
`campusFeedPosts` Firestore collection. Explore events still opens the
device-local demo described below. Shared posts support author editing and
deletion; shared photos, likes, comments, and friend requests are not enabled.
The shared feed needs the repository's Firestore rules and indexes installed
in the target project. Pushing this branch does not deploy those resources.
See [shared-feed setup and verification](verification/shared-feed.md).

## Guest Campus Vibe-Feed Demo

The signed-in header switches between the existing Community pages and Campus Vibe-Feed. The feed includes cross-college sample profiles, photo and event posts, likes, comments, interested states, saved posts, and demo friend requests.

The guest demo is device-local: IndexedDB stores posts and photo blobs. It does not publish posts, photos, or friend requests to other students. Uploaded raster photos are resized before storage; up to four photos are accepted per post. Switching modes preserves the Community pages and remembers the selected workspace.

To check the demo, choose Explore events, select Campus Vibe-Feed, add your college and a post with photos, then reload, choose Explore events and select Campus Vibe-Feed again to confirm persistence. Check Friends, Saved posts, editing/deleting your own post, and switching back to Community. Guest demo activity stays separate from signed-in shared posts.

## Verify a production build

For the checked-in desktop/mobile Events smoke test, see the
[Week 6 run instructions and validation scope](../../docs/Week6/stretch-validation.md#run-the-checked-in-smoke-test).

```sh
npm run build
```
