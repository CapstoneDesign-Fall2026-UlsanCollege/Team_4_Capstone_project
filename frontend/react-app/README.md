# CampusVibes React Shell

This Vite + React app is the first navigation proof for Issue #26. React mounts the existing CampusVibes page markup and loads its existing stylesheet and behavior, so the Vite preview stays aligned with the original static prototype.

## Run locally

```sh
npm install
npm run dev
```

The page uses the original login/signup modal and dashboard navigation. Account data is currently a local demo flow; Firebase authentication is not connected yet. Event data is local sample content.

## Verify a production build

```sh
npm run build
```