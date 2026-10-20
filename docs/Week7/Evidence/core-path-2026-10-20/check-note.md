# Production Core Path and Recovery Check

**Date:** 2026-10-20, 17:01:55-17:02:20 KST (08:01:55-08:02:20 UTC).
**Tester:** Codex-assisted Playwright automation for `prachi2061`, not an independent teammate.
**Type:** technical functional check, not a narrated 3-5 minute team presentation.
**Site:** [CampusVibes production](https://campusvibe-theta.vercel.app/).
**Exact tested source:** [e715e319da4fd2c677b02d8a5e17f0773b108675](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/commit/e715e319da4fd2c677b02d8a5e17f0773b108675).
**Deployment:** `dpl_8RCLmACQsRj6GkaEQnCV3F1HwbDb`; unchanged at the end of the run.
**Browser:** automated desktop Chrome `155.0.8059.85`; desktop 1440 x 900 and mobile viewport 390 x 844. The mobile check was not a physical-phone test.
**Raw results:** [results.json](./results.json).

## Starting State and Frozen Path

Each check opened a fresh browser context with no stored login, cookies or app state. A single disposable Firebase email/password account was prepared outside the timed path. The production Firebase project was checked; no emulators, guest access or authentication bypass were used.

1. Open the signed-out production landing page.
2. Sign in through the visible email/password form; wait for the app and server-acknowledged account state.
3. Open Dashboard, then Discover through the actual navigation.
4. Select Tech and search for `HackNight`; expect one matching sample event.
5. Open its details and verify the title, time, location, host, description and loaded photograph.

**Expected:** the exact sample record is reachable after real authentication, with no uncaught page errors or horizontal page overflow.
**Actual:** passed in both viewports. Details showed HackNight: Build-a-Thon, 6:00 PM, Innovation Lab, Bldg 7, Code Collective and the catalog description. These are sample-event values, not verified live campus announcements.

## Measured Technical Results

| View | Automated core path | Empty-search recovery | Injected login failure observed | Real login retry |
|---|---:|---:|---:|---:|
| Desktop 1440 x 900 | 6.596 s | 0.662 s | 0.118 s | 1.860 s |
| Mobile viewport 390 x 844 | 3.985 s | 0.645 s | 0.108 s | 1.771 s |

The core timer ran from opening the signed-out site to verified Event Details. Recovery timings are separate; empty-search recovery includes capturing its screenshot. These are single-run automation measurements, not a performance guarantee or presentation duration. There were no uncaught page errors in either view.

## Failure and Recovery Cases

- **Empty search:** entered `midterm-no-event-937`; zero cards and `No events found. Try another search or category.` appeared. Clear filters removed the query, restored all nine sample cards and allowed the same Event Details to reopen. Passed on desktop and mobile viewport.
- **Simulated sign-in network failure:** deliberately blocked only the Firebase password-sign-in request. The app stayed signed out, displayed `Could not connect. Check your internet connection and try again.`, and re-enabled Log in. This was injected browser failure, not an observed Firebase outage.
- **Recovery:** removed the block and retried the same valid account through the real form. The signed-in app and acknowledged account state appeared on both views.

## Screenshot Proof

| View | Event Details | Empty search | Simulated login failure |
|---|---|---|---|
| Desktop | [Details](./desktop-details.png) | [No events](./desktop-empty-search.png) | [Connection error](./desktop-simulated-login-failure.png) |
| Mobile viewport | [Details](./mobile-viewport-details.png) | [No events](./mobile-viewport-empty-search.png) | [Connection error](./mobile-viewport-simulated-login-failure.png) |

The images were visually reviewed. Pink blocks mask the synthetic login inputs. No real student data, password, token or provider secret is part of this proof. The screenshots show this dated run only; they do not prove the live site is currently available.

## Claim and Evidence Boundary

| Category | What this record supports |
|---|---|
| Implemented and exercised here | Real Firebase email/password login; Dashboard/Discover navigation; Tech filter/search; exact sample Event Details; empty-state recovery; visible sign-in failure and retry. |
| Implemented elsewhere, not rechecked here | Assistant/Gemini, social/Messages, Profile, Suggestions, badges/photos and theme behavior remain supporting releases with their own evidence. |
| Planned / still unconfirmed | The team's actual narrated 3-5 minute rehearsal, exact human tester, speaker assignments and three remaining own Week 7 receipt links. |
| Known limitation | Discover uses code-based sample events. This does not test or resolve Firestore event loading in [Issue #35](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/issues/35). Google sign-in, reset-email completion and physical-device behavior were not tested here. |

## Cleanup and Next Action

The browser was closed before cleanup. The one disposable Auth account, its one private account document and its shared member-profile record were deleted. No posts, messages, suggestions, AI requests or photo uploads were created. Billing settings were not changed. Counts and completion timestamps are in the raw results.

**Owner / next action:** Team 4, through [Midterm Prep Issue #74](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/issues/74), must confirm the actual tester and speakers, prepare an approved presentation login, and run the frozen path with narration before the October 21 freeze. Record elapsed presentation time, device/view, expected/actual result, proof, remaining limitation and any failure follow-up. Each student must confirm their own receipt and speaking part. No human rehearsal box should be checked from these automated results alone.

If live login or the site remains unavailable during the presentation, state the blocked step and use these dated screenshots as recorded fallback evidence. Do not say that the fallback proves a successful current live run.
