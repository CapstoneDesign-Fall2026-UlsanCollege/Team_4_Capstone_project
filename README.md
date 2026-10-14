# CampusVibes

CampusVibes is a student capstone project for discovering campus activities
and sharing campus updates. The current app uses React, Vite, and Firebase.

## Current Features and Scope

| Area | Current behavior | Data and limits |
|---|---|---|
| Authentication | Email/password signup, login, logout, persistence, Google sign-in and password-reset wiring | Firebase Authentication. Successful Google login and reset-email completion need separate verification. |
| Community | Dashboard, Discover search/filters, event details, Saved, and Profile | Discover events are code-based samples; Firestore event loading remains unverified. Saved events and profile edits are browser-local. |
| Assistant | Rules-based sample-event recommendations and event/navigation answers | Runs in the browser; no generative AI or live campus data. Accessible through demo entry. |
| Suggest | Submit a local event idea through the prototype | Browser-local draft behavior, not backend submission or publication. |
| Guest Campus Vibe-Feed | Text/photo/event posts, local social actions, and demo friend requests | Fictional profiles and device-local IndexedDB storage; no delivery to other students. |
| Signed-in Campus Vibe-Feed | Text/event posts, likes, comments, interest, private saved posts, profiles, and friend requests | Firestore-backed data in the restored rich layout. Shared photos are disabled while billing stays off. See the social-feed verification record for tested scope and query limits. |

The shared-feed implementation is included in this checkout. See the
[production permissions fix and verification](frontend/react-app/verification/shared-feed-production.md)
for the deployed backend configuration, screenshots, and test limits.
The [restored real-social feed](frontend/react-app/verification/real-social-feed.md)
adds account-backed likes, comments, saves, and friends while retaining a
separate fictional guest demo.

## Run Locally

Use Node.js 20 or later and npm. Clone the repository, then install and run
the app from its actual directory:

```sh
git clone https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project.git
cd Team_4_Capstone_project/frontend/react-app
npm ci
npm run dev
```

Open the local URL printed by Vite. Choose **Explore events** to inspect the
sample-data flow without creating a Firebase account.

Firebase web configuration is currently read from
`frontend/react-app/src/firebase.js`; the app does not read
`VITE_FIREBASE_API_KEY` or the other previously listed configuration variables.
Firebase provider setup and authentication checks are documented in the
[app README](frontend/react-app/README.md).

## Checks and Evidence

Run these commands from `frontend/react-app`:

```sh
npm run build
npx playwright install chromium
npm run test:smoke
```

The Events smoke test starts and stops a local server on port 4178 and checks
sample-event details and empty-search recovery on desktop and mobile.
See [Week 6 stretch evidence](docs/Week6/stretch-validation.md) for the success
signal, original dialog-close failure, passing retest, and test limits.

The shared-feed branch also provides `npm run test:feed-rules` and
`npm run test:shared-feed`. These need local Auth/Firestore emulators;
the browser test also needs the emulator-connected dev server.
Follow the [shared-feed setup and verification guide](frontend/react-app/verification/shared-feed.md)
for the required order, ports, environment flag, and screenshots.
Java 21 or later is needed for the documented emulator setup.

## Deployment

Vercel serves the frontend from `frontend/react-app`. See the
[Vercel deployment guide](docs/VERCEL_DEPLOYMENT.md).
Pushing a feature branch does not merge it or deploy Firestore rules/indexes.

Before enabling the shared feed in production, the Firebase project owner must
review the existing production rules and integrate the permissions in
`firestore.rules` and the indexes in `firestore.indexes.json`.
The authored rules deny access to collections not explicitly matched.
Production text-post cross-account testing passed on October 14, 2026;
future backend changes should be checked again after deployment.

## Repository Structure

```text
.github/                  Issue templates
docs/                     Team planning, weekly reports, and evidence
frontend/
  index.html              Community markup mounted by React
  apps.js                 Community behavior and sample event data
  dashboard.js            Dashboard behavior
  discover.js             Discover and event-detail behavior
  react-app/
    src/                  React app, Firebase setup, local/shared feeds
    public/               Static assets
    tests/                Events smoke and shared-feed checks
    verification/         Validation notes and screenshots
firebase.json             Emulator and Firestore resource configuration
firestore.rules           Shared-feed access rules
firestore.indexes.json    Shared-feed query indexes
```

## Team and Documentation

Team 4: Devyana, Tulsey, Ujjal Poudel, and Prachi2061.
Instructor: DJ Twone.

See [team members](docs/TEAM_MEMBERS.md), the
[shared Week 6 report](docs/Week6/weekly_report.md), and the
[Week 6 checklist](docs/Week6/week6-work-checklist.md) for contributions,
test evidence, and outstanding work.

This repository is for academic and collaborative capstone use.
No general-use license is currently stated here.
