<div align="center">
  <img src="frontend/react-app/public/assets/campusvibes-logo.png" alt="CampusVibes logo" width="76" />
  <h1>CampusVibes</h1>
  <p><strong>Discover campus events. Share campus moments. Stay connected.</strong></p>
  <p>Team 4 · Ulsan College · Capstone Design, Fall 2026</p>
  <p>
    <a href="https://campusvibe-theta.vercel.app/">Live website</a> ·
    <a href="#quick-start">Quick start</a> ·
    <a href="#project-structure">Project structure</a> ·
    <a href="#testing">Testing</a> ·
    <a href="#team">Team</a>
  </p>
</div>

CampusVibes brings event discovery, campus updates, and student conversations into two connected workspaces: **Community** and **Campus Vibe-Feed**. It combines a React interface with Firebase account persistence and server-side integrations for AI conversations and photo sharing.

> **Current data boundary:** Discover displays nine code-based sample events from [the event catalog](frontend/events.json). Live Firestore event loading remains unverified. Signed-in account records, shared Feed posts, messages, suggestions, and notifications use real Firestore data. Guest demo activity stays in the browser.

## Preview

![CampusVibes Discover page showing sample events in the desktop guest demo](.github/assets/campusvibes-desktop.png)

<details>
  <summary>View mobile event details</summary>
  <p align="center">
    <img src=".github/assets/campusvibes-mobile.png" alt="Sample event details in a 390-pixel mobile browser viewport" width="300" />
  </p>
</details>

These screenshots were captured from the local guest demo. The mobile image uses a browser viewport, not a physical-device test.

## Features

| Area | Implemented behavior |
|---|---|
| **Event discovery** | Dashboard, event search and interest filters, sorting, event details, bookmarks, and Google Maps venue links. A trip planner accepts a starting address or optional current location, opens bus/train, walking, driving or cycling directions, and searches nearby bus stops. |
| **Campus Vibe-Feed** | Shared text and event posts, one compressed photo per post through Cloudinary, likes, comments, interest, and private saved posts. |
| **Friends and messages** | Friend requests, accepted-friend conversations, unread indicators, read receipts, and earlier message history. Avatars and member IDs distinguish people with the same name. |
| **Notifications** | One header inbox for both workspaces, Community/Feed filters, unread-only filtering, source links, and account-persistent read status. The inbox displays the latest 50 alerts. |
| **Event suggestions** | Saved drafts, a shared review queue, reviewer decisions, and personal submission status. Anonymous submissions hide attribution from reviewers; project administrators retain access. |
| **Profile and badges** | Optional profile photo, editable bio/study details/interests, saved-event activity, and persistent progress badges. |
| **Assistant** | A local event helper with category/date/location filters and optional Gemini conversations for signed-in users, with privacy confirmation, usage controls, and local fallback. |
| **Authentication and persistence** | Firebase email/password accounts, Google sign-in and password-reset flows, session preferences, and private account synchronization. |

### Scope and limitations

- Events and their venue names are samples. Map searches do not establish a verified real-world pin. Trip planning needs an organizer-provided address/pin or a real destination entered by the user for that trip. Google Maps supplies route distances, times and transit services where available; CampusVibes only estimates straight-line distance when both endpoints have coordinates. Starting points stay in memory for the open dialog and are cleared on close or account change.
- Suggestion approval records a review decision; it does not publish an event into Discover. Suggestion attachments and Assistant Attach/Voice controls are unavailable.
- Gemini has no live web search or access to private student messages. Its availability depends on server configuration and provider limits.
- Badges represent planning progress, not verified attendance or club membership.
- Google sign-in and reset-email completion require their own provider-enabled verification; other passing checks do not establish those outcomes.

## Quick start

Use **Node.js 24.x** for parity with the deployment, and npm. Run commands from the repository root unless stated otherwise.

```sh
git clone https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project.git
cd Team_4_Capstone_project
npm ci
npm run dev
```

Open the URL printed by Vite. Choose **Explore events** to use the guest demo without creating an account. Real-account features require Firebase Authentication and the project's Firestore permissions.

For a production build:

```sh
npm run build
```

The build output is `frontend/react-app/dist/`. Local development also mounts the backend handlers at `/api/assistant` and `/api/feed-photo`.

## Project structure

```text
Team_4_Capstone_project/
├── backend/
│   ├── api/                 Server API entry points
│   ├── src/                 Gemini and Cloudinary request handlers
│   ├── firebase/            Firebase configs, Firestore rules and indexes
│   ├── tests/               Backend API and database-permission checks
│   └── package.json         Backend dependencies and scripts
├── frontend/
│   ├── index.html           Community markup mounted by React
│   ├── apps.js              Authentication, navigation and Community behavior
│   ├── dashboard.js         Dashboard interactions and progress
│   ├── discover.js          Event discovery and details
│   ├── events.json          Sample event catalog
│   └── react-app/
│       ├── api/             Thin Vercel adapters to backend/api/
│       ├── src/             React UI, client stores and portable helpers
│       ├── public/          App assets
│       ├── tests/           Frontend unit and browser checks
│       └── verification/    Dated test receipts and screenshots
├── docs/                    Team reports, planning and evidence
├── .github/                 Issue templates and README images
├── firebase.json            Root CLI compatibility configuration
├── package.json             npm workspace and root commands
└── package-lock.json        Shared dependency lockfile
```

The root Firebase configuration points to the resources in `backend/firebase/`. The small `frontend/react-app/api/` adapters preserve the existing Vercel deployment layout; server logic and provider dependencies belong to the backend package.

### Architecture

```mermaid
flowchart LR
    UI["Frontend: React + Vite"] --> Catalog["Sample event catalog"]
    UI -->|"Sign-in and account/shared records"| Firebase["Firebase Auth + Firestore"]
    UI -->|"/api/assistant and /api/feed-photo"| API["Backend: Vercel Functions"]
    API -->|"Identity, ownership and usage checks"| Firebase
    API -->|"Optional conversations"| Gemini["Gemini"]
    API -->|"Photo operations"| Cloudinary["Cloudinary"]
    API -.->|"Public sample context"| Catalog
```

## Configuration

### Firebase

This checkout targets the Team 4 Firebase project. Browser configuration is in [src/firebase.js](frontend/react-app/src/firebase.js), and access rules and indexes are in [backend/firebase](backend/firebase/). The app does not read `VITE_FIREBASE_API_KEY` configuration variables.

Real sign-in requires the appropriate Firebase providers and authorized domains. Connecting a different Firebase project also requires updating the backend handlers' identity/project settings and deploying matching rules and indexes.

### Optional AI and photo services

For local provider integrations, create `frontend/react-app/.env.local`. The Vite development server reads these **server-side** variables:

```dotenv
GEMINI_API_KEY=replace_with_your_gemini_key
CLOUDINARY_CLOUD_NAME=ghr7xnsl
CLOUDINARY_API_KEY=replace_with_your_cloudinary_key
CLOUDINARY_API_SECRET=replace_with_your_cloudinary_secret
```

The Cloudinary cloud name must match `FEED_PHOTO_CLOUD` in [the photo contract](frontend/react-app/src/feed-photo.js). Photo uploads use Cloudinary; they do not use a Firebase Storage bucket.

Keep credentials out of Git and never prefix server secrets with `VITE_`. Set the same variables in Vercel's environment settings for the deployment environments that need them. Missing provider configuration leaves the local Assistant available and prevents shared photo uploads; text posts remain available.

## Testing

| Command, from the repository root | Purpose |
|---|---|
| `npm run build` | Build the production frontend. |
| `npm run test:backend` | Check backend authentication, request validation, ownership, provider behavior, and limits with controlled fixtures. |
| `npm run test:assistant --workspace frontend/react-app` | Check the local Assistant engine, search, and conversation behavior. |
| `npm run test:account --workspace frontend/react-app` | Check account persistence and synchronization logic. |
| `npm run test:notifications --workspace frontend/react-app` | Check notification types, source keys, filtering, and activity mapping. |
| `npm run test:maps --workspace frontend/react-app` | Check map URLs, trip modes, safe address encoding, coordinate validation and straight-line distance. |
| `npm run test:smoke` | Run the desktop/mobile browser suite. |
| `npm run test:rules` | Check Firestore permissions against a running local emulator. |

Install the browser once before running the smoke suite:

```sh
npx playwright install chromium
npm run test:smoke
```

The browser suite manages its preview server on port **4178**. An installed Google Chrome can also be selected with `SMOKE_BROWSER_CHANNEL=chrome`.

<details>
<summary>Run the Firestore permission checks locally</summary>

Install the Firebase CLI and Java 21 or later. In one terminal, start the isolated demo emulators:

```sh
firebase emulators:start --project demo-campusvibe-feed --config backend/firebase/firebase.account-test.json --only auth,firestore
```

In a second PowerShell terminal, run:

```powershell
$env:FIRESTORE_EMULATOR_HOST = "127.0.0.1:8180"
npm run test:rules
```

To connect the development app and backend handlers to those same emulators, use these variables before starting the dev server:

```powershell
$env:VITE_FIREBASE_EMULATORS = "true"
$env:VITE_FIREBASE_AUTH_EMULATOR_PORT = "9199"
$env:VITE_FIREBASE_FIRESTORE_EMULATOR_PORT = "8180"
$env:FIREBASE_AUTH_EMULATOR_HOST = "127.0.0.1:9199"
$env:FIRESTORE_EMULATOR_HOST = "127.0.0.1:8180"
npm run dev
```

The client emulator switch is restricted to development on localhost. The test project ID is `demo-campusvibe-feed`.

</details>

Feature-specific [verification records](frontend/react-app/verification/) contain dated screenshots and test scopes. Automated browser checks and mobile viewports supplement the team's independent rehearsal evidence; they do not replace it. Older receipts describe the version they tested.

## Deployment

The current Vercel project uses:

| Setting | Value |
|---|---|
| Root directory | `frontend/react-app` |
| Framework | Vite |
| Install command | `npm install` |
| Build command | `npm run build` |
| Output directory | `dist` |
| Source files outside the root directory | Included, for the backend workspace |

Application deployments and Firebase resource deployments are separate. The project owner can deploy the checked-in Firestore resources with an explicit target project:

```sh
npm run firebase:deploy -- --project YOUR_FIREBASE_PROJECT_ID
```

An application push alone does not deploy Firestore rules or indexes.

## Contributing and project records

Use focused branches and pull requests. Link the relevant issue, include the actual check or result, and distinguish implemented behavior from planned work and known limitations.

- [Issues and tracked work](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/issues)
- [Pull requests](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/pulls)
- [Team documentation](docs/)
- [Week 9 report](docs/Week9/Weekly-Report.md)
- [Feature verification records](frontend/react-app/verification/)

## Team

| Member | GitHub |
|---|---|
| Devyana | [DevyanaCT](https://github.com/DevyanaCT) |
| Tulsey | [tulseyy8848](https://github.com/tulseyy8848) |
| Ujjal Poudel | [ujjalpoudel75](https://github.com/ujjalpoudel75) |
| Prachi | [prachi2061](https://github.com/prachi2061) |

Instructor: **DJ Twone**. See [team members](docs/TEAM_MEMBERS.md) for the shared team record.

## License

This is an academic capstone repository. No project license has been specified.
