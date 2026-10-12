# Weekly Report

**Team:** Team 4 - CampusVibe  
**Week:** Week 7  
**Date:** October 12, 2026  
**Contributor:** Prachi (@prachi2061), Team Lead

## This week's goal

Improve the CampusVibes interface using the supplied visual references and fix the missing logo on the production website. Keep the existing authentication, event search, filters, saved events, and assistant behavior while updating the page designs.

## What we completed

- Fixed the production logo by placing the image in Vite's public assets directory and using an absolute asset path.
- Updated the welcome, login, and sign-up screens with a colorful campus background, light panels, and purple buttons.
- Restyled the Dashboard with white navigation, colored statistics, upcoming events, and quick actions.
- Updated Discover with a pastel background, white filters, and event images. Applied matching event-card styling to Saved Events.
- Restyled the Assistant with a white chat panel, colored suggested prompts, and a purple Send button.
- Updated Suggest with a library background, a light form, and a supporting side note.
- Built a profile layout with interests, study program, campus involvement, saved events, and recent activity based on saved events. Added editing for the study program and bio, stored locally in the browser.
- Committed and pushed the changes to GitHub's main branch for Vercel deployment.

## Evidence links

| Work | Evidence |
|---|---|
| Production logo fix | [75c4104](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/commit/75c4104) |
| Welcome, login, and sign-up styling | [eda4e5b](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/commit/eda4e5b) |
| Dashboard styling | [e98abfd](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/commit/e98abfd) |
| Discover and event cards | [8f69125](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/commit/8f69125) |
| Assistant styling | [8b8dac4](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/commit/8b8dac4) |
| Suggest styling | [3d735a3](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/commit/3d735a3) |
| Profile layout and editing | [a2ced5b](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/commit/a2ced5b) |
| Production website | [CampusVibes on Vercel](https://campusvibe-theta.vercel.app) |

## Individual contribution entries

| Student | What they did | Evidence |
|---|---|---|
| Prachi (@prachi2061) | Updated the welcome/authentication, Dashboard, Discover, Assistant, Suggest, and Profile interfaces; fixed the missing production logo; added local profile editing; built and pushed the updates to main. | Commit links above |

## Validation completed

- Ran `npm run build` in `frontend/react-app` after each page update; all production builds passed.
- Confirmed the production logo URL returned HTTP 200 after deployment.
- Investigated the old Assistant appearance and confirmed Vercel was initially serving the preceding deployment. Later verified that the live page referenced the new stylesheet and that it contained the white Assistant panel rules.
- Confirmed the changes were pushed to GitHub main. Live deployment verification for the latest Suggest and Profile updates remains to be completed.
- Automated browser interaction tests, screenshot comparisons, and independent teammate testing have not yet been recorded for these design changes.

## Blockers or risks

| Risk | Owner | Next action |
|---|---|---|
| Vercel deployment can lag behind a successful GitHub push. | Prachi | Verify the active deployment before collecting final screenshots. |
| Profile program, interests, and club information start with sample content; editable program and bio are browser-local rather than Firebase-backed. | Prachi / Team 4 | Confirm the profile data requirements and replace sample details with persisted student data. |
| The Assistant still uses sample events and does not connect to an external AI service. | Team 4 | Keep the limitation visible and decide whether external AI integration is in scope. |
| New designs have passed build checks but still need desktop/mobile visual and workflow verification. | Prachi / teammate tester | Check login, navigation, filters, saving, suggestions, and profile editing; attach screenshots and actual results. |

## Decision record

| Decision | Reason | Owner |
|---|---|---|
| Keep the existing React/Vite shell and authentication behavior while changing the interface. | Deliver the requested visual updates within the current project structure. | Prachi |
| Serve images from Vite's public assets directory. | Ensure images resolve correctly on the production site. | Prachi |
| Store editable profile program and bio locally for this iteration. | Provide a working edit flow while database-backed profile persistence remains future work. | Prachi |

## Next week's bridge task

- Ask a teammate to test the updated pages on desktop and mobile and record expected and actual results.
- Capture screenshots from the deployed website and attach them as evidence.
- Confirm student profile fields and implement Firebase persistence if agreed by the team.
- Continue the existing Firestore event-data integration work separately from the visual updates.
