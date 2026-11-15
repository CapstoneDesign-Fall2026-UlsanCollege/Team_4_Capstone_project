# CampusVibes Frontend

The React + Vite workspace for Community and Campus Vibe-Feed. It mounts the Community markup from `frontend/` and provides the React workspaces, client stores, browser assets, and UI checks.

See the [project README](../../README.md) for the current features, sample-data boundary, provider configuration, architecture, and team records.

## Development

Install dependencies from the **repository root**, which owns the shared npm lockfile:

```sh
npm ci
npm run dev
```

If your terminal is already in `frontend/react-app`, return to the repository root with `cd ../..` first. The root scripts select this workspace automatically.

For a production build, run `npm run build` from the root. Output is written to `frontend/react-app/dist/`.

## Workspace layout

| Path | Responsibility |
|---|---|
| `src/` | React components, client-side Firebase stores, Assistant helpers, and styles. |
| `public/` | Browser assets. |
| `api/` | Single-line Vercel adapters importing handlers from the backend package. |
| `tests/` | Frontend unit checks, Playwright smoke checks, and browser integration harnesses. |
| `verification/` | Dated screenshots and verification receipts. |
| `vite.config.js` | Frontend build configuration and local `/api/assistant` and `/api/feed-photo` middleware. |

Server handlers, provider SDK dependencies, Firebase resources, and backend permission/API tests live in [backend/](../../backend/).

## Checks

Run from the repository root:

```sh
npm run test:assistant --workspace frontend/react-app
npm run test:gemini --workspace frontend/react-app
npm run test:account --workspace frontend/react-app
npm run test:notifications --workspace frontend/react-app
npm run test:profile --workspace frontend/react-app
npm run test:smoke
```

The Gemini command checks both the frontend contract/runner and backend API fixtures. It does not make a real provider conversation. Browser integration harnesses that require Firebase emulators need the corresponding emulator environment and preview URL.

For browser installation, emulator ports, server environment variables, and deployment settings, use the [root testing guide](../../README.md#testing) and [configuration guide](../../README.md#configuration).

## Data behavior

Discover uses the checked-in sample event catalog. Signed-in account and social features use Firestore; guest activity remains browser-local. The Assistant has a local mode and optional Gemini mode. Signed-in photo posts use the authenticated Cloudinary backend when configured.

Feature receipts in `verification/` retain their original date and tested scope. Use the project README and current package scripts for setup instructions.

## Signed-in friends list

Campus Vibe-Feed > Friends shows people to add and pending requests in the middle. Accepted friends appear only in the Your friends sidebar. It previews five friends; View all friends expands a searchable, scrollable list in that same section. At tablet/mobile sizes the section is available below the main Friends panel. Removing a friend is available in the expanded sidebar.

The connection watcher reads additional live pages of at most 100 documents each, preserving the existing Firestore query rule limit. Discovery still uses the existing first-100 public-profile directory; this fix does not implement global people search. Guest/demo data is a separate local experience.

Repeat checks from the repository root:

```sh
npm run test:friends --workspace frontend/react-app
npm run dev -- --host 127.0.0.1 --port 5186 --strictPort
# In another terminal:
npm run test:friends-browser --workspace frontend/react-app
```

For the real Firestore SDK/rules integration test, start a local Firestore emulator on port 8180 with the existing account-test configuration, then run `npm run test:friends-emulator --workspace frontend/react-app`. It uses a fictional `demo-campusvibe-friends` project and never production records. See the [dated bug and verification receipt](../../docs/Week11/Evidence/friends-sidebar-2026-11-15.md).
