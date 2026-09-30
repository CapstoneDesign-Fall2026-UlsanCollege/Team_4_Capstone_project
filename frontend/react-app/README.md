# CampusVibes React Shell

This Vite + React app is the first navigation proof for Issue #26. React mounts the existing CampusVibes page markup and loads its existing stylesheet and behavior, so the Vite preview stays aligned with the original static prototype.

## Run locally

```sh
npm install
npm run dev
```

The page uses the original login/signup modal and dashboard navigation. Email/password accounts use Firebase Authentication; event data is local sample content.

Enable the Email/Password provider under Authentication > Sign-in method in the Firebase console before testing signup and login. The Firebase web app configuration is in `src/firebase.js`.

## Verify a production build

```sh
npm run build
```