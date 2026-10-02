# CampusVibes React Shell

This Vite + React app is the first navigation proof for Issue #26. React mounts the existing CampusVibes page markup and loads its existing stylesheet and behavior, so the Vite preview stays aligned with the original static prototype.

## Run locally

```sh
npm install
npm run dev
```

The page uses the original login/signup modal and dashboard navigation. Email/password accounts use Firebase Authentication; event data is local sample content.

Enable the Email/Password provider under Authentication > Sign-in method in the Firebase console before testing signup and login. The Firebase web app configuration is in `src/firebase.js`.

## CampusVibes Assistant

The assistant works directly in the browser using the sample events already in the app. It can suggest events by interest, answer basic event time and location questions, list saved events, and explain how to use Discover, Saved, and Suggest. It does not need an API key, a separate server, or a sign-in, and it does not answer general questions or access live campus information.

This is an intentionally small prototype, not a generative AI chatbot. A future iteration can connect Gemini through a secured backend to answer broader questions. If the team wants chat requests to trigger CampusVibes actions or change app features, those capabilities must be implemented as explicit, permission-checked tools; a model should not execute arbitrary code or silently modify the app.

## Verify a production build

```sh
npm run build
```