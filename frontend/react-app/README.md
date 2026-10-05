# CampusVibes React Shell

This Vite + React app is the first navigation proof for Issue #26. React mounts the existing CampusVibes page markup and loads its existing stylesheet and behavior, so the Vite preview stays aligned with the original static prototype.

## Run locally

```sh
npm install
npm run dev
```

The page uses the original login/signup modal and dashboard navigation. Email/password accounts use Firebase Authentication; event data is local sample content.

Enable the Email/Password provider under Authentication > Sign-in method in the Firebase console before testing signup and login. The Firebase web app configuration is in `src/firebase.js`.

## Authentication smoke check — Issue #25

Use a test-only account in the CampusVibe Firebase project; do not use personal credentials.

1. Start the app with `npm run dev` and open the local URL.
2. Sign up with a new test email and password.
3. Confirm the signed-in CampusVibe home page appears.
4. Sign out, then log in with the same test account.
5. Confirm login returns to the signed-in home page, then sign out and confirm the landing page appears.

The check passes when both signup and login complete and the auth state updates to the signed-in home page. This is a manual smoke check; Firebase Email/Password must be enabled. Track its result and evidence in [Issue #25](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/issues/25).

## CampusVibes Assistant

The assistant works directly in the browser using the sample events already in the app. It can suggest events by interest, answer basic event time and location questions, list saved events, and explain how to use Discover, Saved, and Suggest. It does not need an API key, a separate server, or a sign-in, and it does not answer general questions or access live campus information.

This is an intentionally small prototype, not a generative AI chatbot. A future iteration can connect Gemini through a secured backend to answer broader questions. If the team wants chat requests to trigger CampusVibes actions or change app features, those capabilities must be implemented as explicit, permission-checked tools; a model should not execute arbitrary code or silently modify the app.

The earlier local-API “Failed to fetch” failure is not reproducible in the current assistant because it no longer makes API requests. The original reproduction steps and resolution are recorded in [Issue #38](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/issues/38).

## Verify a production build

```sh
npm run build
```