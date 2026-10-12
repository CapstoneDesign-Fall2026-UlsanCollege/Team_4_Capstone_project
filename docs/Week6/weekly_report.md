# Weekly Report

**Team:** Team 4 — CampusVibe  
**Week:** Week 6  
**Date:** October 11, 2026

## This week's goal

This week, we wanted to check whether our CampusVibe project was working correctly from the Dashboard to the Event Details page. We focused on testing the Events page with a teammate who did not build the feature and confirming that users could select an event and view its basic details.

## What we committed to do

- [x] Test the Dashboard → Events → Select Event → View Event Details path.
- [x] Ask a teammate to test the feature and record the actual result.
- [x] Update the test issue with the result and supporting evidence.

## Evidence links

| Evidence | Link |
|---|---|
| Issue(s) | [Events Test Issue](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/issues/49) |
| PR(s) / commits | [Commit db5dad6]( https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/commit/db5dad64f3131fb87b2d7011c86d6e2f9ecd575d) |
| Screenshot / demo | [Screenshot Available](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/issues/49) |
| Test/check note | [Tested-By Note](tested-by-note.md) |
| Document update | [Shared Week 6 report](weekly_report.md) |


## Individual contribution entries — one row per student

| Student | What they did | Evidence link |
|---|---|---|
| DevyanaCT | Repeat Tested the Events to confirm the tested result→ Event Details path as a teammate and confirmed that selecting a sample event displayed its basic details. | [ repeat Events Test comment](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/issues/49#issuecomment-6105483528) |
|Tulseyy8848  | Reviewed the CampusVibe navigation flow, organized dashboard and Event Details screenshot evidence, and documented the Week 6 testing progress and remaining Firestore integration work.  |https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/issues/49  |
| Prachi (@prachi2061) | Fixed the missing production logo; updated the welcome/login, Dashboard, Discover, Assistant, Suggest, and Profile designs; added browser-local profile editing; ran successful production builds and pushed the changes to main for Vercel deployment. | [Logo fix](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/commit/75c4104), [Login](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/commit/eda4e5b), [Dashboard](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/commit/e98abfd), [Discover](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/commit/8f69125), [Assistant](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/commit/8b8dac4), [Suggest](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/commit/3d735a3), [Profile](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/commit/a2ced5b), [Live demo](https://campusvibe-theta.vercel.app) |

| Ujjal (@ujjalpoudel75) | Tested the sample Events flow and reported that opening Events and selecting an event displayed its basic details correctly. | [Recorded test result](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/issues/49#issuecomment-6055568514) |

### Prachi(prachi2061) work and validation

- **Logo and authentication:** Fixed the missing production logo and updated the welcome, login, and sign-up screens. Production builds passed, and the deployed logo asset returned HTTP 200. This confirmed that the injected HTML's image paths need assets available in Vite's public directory. Evidence: [Logo fix](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/commit/75c4104), [Authentication design](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/commit/eda4e5b).
- **Dashboard, Discover, Assistant, and Suggest:** Updated the pages using the supplied visual references. Production builds passed, and the deployed Assistant stylesheet was checked for the new white-panel rules after deployment. A successful push can precede the live update, so the served version must be checked. Evidence: [Dashboard](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/commit/e98abfd), [Discover](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/commit/8f69125), [Assistant](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/commit/8b8dac4), [Suggest](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/commit/3d735a3).
- **Profile and contribution tracking:** Added the profile layout, saved-event summary, and browser-local editing for the study program and bio. The production build passed, the changes were pushed to main, and the contribution was recorded in this shared Week 6 report. Evidence: [Profile implementation](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/commit/a2ced5b), [Week 6 contribution](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/commit/be88f08).

#### Automated demo check - October 12, 2026

Ran a Playwright browser smoke check against the deployed website using a disposable Firebase test account. The account was deleted after the run. This is an automated check, not a claim of independent teammate testing.

| Expected behavior | Actual result |
|---|---|
| Signed-out users see the welcome screen; signup validates required fields and matching passwords. | Passed: the dashboard was hidden and invalid signup inputs displayed errors. |
| Valid signup reaches the dashboard; logout returns to welcome; wrong-password login displays an error; correct login succeeds. | Passed using a real Firebase test account. |
| Seeded events can be filtered, searched, and saved with visible feedback. | Passed: Tech showed two events, title search and empty state worked, clearing restored nine events, and saving updated Saved and the dashboard count. |
| Assistant, prototype suggestions, and browser-local profile editing work. | Passed: the Assistant responded, suggestion submission returned to Dashboard, and profile edits survived a reload. |
| Signed-in pages fit a mobile viewport. | Passed: Dashboard, Discover, Assistant, Saved, Suggest, and Profile had no document horizontal overflow at 390 x 844 pixels. No uncaught page errors were recorded. |

The screenshot review found dark toast text on a dark background after login. Fixed the text contrast in [5185abf](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/commit/5185abf); the production build passed.

Safe visual evidence uses the built-in demo student: [Desktop dashboard](evidence/dashboard-desktop.png), [Mobile profile](evidence/profile-mobile.png). No test passwords or authentication tokens are included.

**Validation limits:** Profile edits are browser-local; events and the Assistant use sample data; suggestions are a prototype confirmation rather than a backend submission. Independent teammate desktop/mobile verification remains tracked in [issue #53](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/issues/53). The automated check above supplements the earlier sample-event test in issue #49.

## Blockers or risks

| Blocker/risk | Owner | Next action |
|---|---|---|
| Event data is currently code-based sample data, and loading event data from Firebase Firestore has not yet been implemented or verified. | Tulsey8848 | Check the Firestore setup and permissions, then implement and test loading event data from Firestore. |

## Decision record

| Decision | Why we chose it | Owner | Evidence / Issue link |
|---|---|---|---|
| Continue using sample event data for the current working demonstration while tracking Firestore integration separately. | The Events → Event Details path can be demonstrated and tested before Firestore integration is complete. | Team 4 |[Blocker Issue](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/issues/35)|

## Next week's bridge task

- Investigate and set up Firestore event data so the Events page can load events from Firebase instead of relying only on code-based sample data.
- Test the updated event-viewing path again and record the expected result, actual result, and screenshot or other proof.
