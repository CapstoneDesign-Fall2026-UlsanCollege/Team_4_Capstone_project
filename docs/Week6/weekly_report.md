# Weekly Report

**Team:** Team 4 — CampusVibe  
**Week:** Week 6  
**Date:** October 12, 2026

## This week's goal

This week, we focused on verifying one visible behavior from the current CampusVibe vertical slice: the sample Events flow from the dashboard to the event details view. The goal was to record a clear beginning point, a repeatable path, an expected result, an actual result, and proof.

We also documented the current boundary of the test: the Events path was verified using the working sample-data flow, while Firestore-backed event loading remains unverified and is tracked separately.

## Verified behavior

We checked this by following the sample Events path in the app.

- Expected result: selecting an event from the Events screen should open the event details view with the event information displayed clearly.
- Actual result: the sample-data Events flow worked as expected in the local demo/test environment, and the app displayed the selected event details.
- Proof:[link](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/issues/49#issue-5757555149)

This does not claim that real Firestore event data is loaded or verified yet.

## What we committed to do

- [x] Verify the Events → Event Details path using the current sample-data flow.
- [x] Record the expected result and actual result.
- [x] Link the issue, proof, and supporting documentation.
- [x] State the remaining limitation clearly: Firestore-backed event loading is still not verified.

## Evidence links

| Evidence | Link |
|---|---|
| Week 6 issue | [Issue #49](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/issues/49) |
| Rehearsal / demo tracking | [Issue #53](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/issues/53) |
| GitHub commit(s) | [Commit db5dad64f3131fb87b2d7011c86d6e2f9ecd575d](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/commit/db5dad64f3131fb87b2d7011c86d6e2f9ecd575d) |
| Screenshot / demo proof | [Issue #49](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/issues/49) |
| Tested-By Note | [tested-by-note.md](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/blob/a9ab586bcc79da0188862eceeac1557fc5c2c5e1/docs/Week6/tested-by-note.md) |
| Report file | [weekly_report.md](./weekly_report.md) |
| Prachi2061 evidence | [Work and validation in this report](#prachi2061-evidence) |
|Deployment| https://campusvibe-theta.vercel.app/ |
| Independent rehearsal results | [Issue #53](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/issues/53) |
| Repeat Tested | [Issue #63](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/issues/63) |

## Individual contribution entries — one row per student

| Student | What they did | Evidence link |
|---|---|---|
| `DevyanaCT` | Contributed to the Week 6 testing documentation and evidence organization, including issue/test documentation updates and screening of the recorded results. Repeated the test to check the feature and the written instructions.Independently rehearsed the deployed CampusVibes demo | [Issue #49](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/issues/49), [Testes-NOte](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/blob/a9ab586bcc79da0188862eceeac1557fc5c2c5e1/docs/Week6/tested-by-note.md), [Commit](c525c6a0c8f7d2261397dec88f7ede7808e18d9f)[Commit](f6c1f41b674cb16675d729d123695c5de83a1e79) [Isseue 63](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/issues/63)|
| `prachi2061` | Fixed the missing production logo; updated the welcome/login, Dashboard, Discover, Assistant, Suggest, and Profile designs; added browser-local profile editing; ran production builds and automated deployment checks. | [Detailed evidence](#prachi2061-evidence), [Logo fix](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/commit/75c4104), [Login](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/commit/eda4e5b), [Dashboard](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/commit/e98abfd), [Discover](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/commit/8f69125), [Assistant](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/commit/8b8dac4), [Suggest](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/commit/3d735a3), [Profile](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/commit/a2ced5b), [Issue #20](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/issues/20), [Issue #22](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/issues/22) |
| `ujjalpoudel75` | Contributed documented evidence for the Week 6 report and the testing record, and helped capture the sample event path result in the shared report. | [weekly_report.md](./weekly_report.md) |
| `tulseyy8848` | Reviewed the flow, organized supporting evidence, and helped document the remaining Firestore limitation and next actions. | [Issue #49](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/issues/49) |

### Prachi2061 Evidence

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

**Validation limits:** Profile edits are browser-local; events and the Assistant use sample data; suggestions are a prototype rather than a backend submission. Independent teammate verification is documented separately in [Issue #53](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/issues/53). The automated check above supplements the earlier sample-event test in Issue #49 and does not establish Firestore-backed event loading.

## Validation summary

### Event path check

We checked this by doing the current sample Events flow in the app. Expected result: the user can open the Events screen, select an event, and see event details. Actual result: the event selection path worked in the current sample-data environment and the basic event details appeared correctly.

Proof: [Related-Issue](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/issues/49)

### Automated smoke check

We also ran a browser smoke check against the deployed app using a disposable Firebase test account. This check was useful for confirming the app responded as expected for sign-up, login, navigation, and profile editing.

| Expected behavior | Actual result |
|---|---|
| Signed-out users see the welcome screen and invalid sign-up input shows validation errors. | Passed |
| Valid sign-up and login work with a real Firebase test account. | Passed |
| Seeded events can be filtered, searched, and saved with visible feedback. | Passed in the sample-data path |
| Assistant and profile editing work in the browser. | Passed |
| Mobile viewport still renders without horizontal overflow. | Passed |

### Independent CampusVibes Demo Rehearsal

Tusleyy8848 did an independent rehearsal and asked another teammate (DevyanaCT) to  carry out an  rehearsal of the deployed CampusVibes demo by following steps.

We checked this by entering as a demo student and testing Discover search and filters, saving an event, checking Saved and Profile, submitting an Assistant prompt and a suggestion, and editing the profile bio. We also checked the desktop and mobile layouts.

- **Expected result:** The main demo features should work correctly, saved-event summaries should update, and the interface should remain readable on desktop and mobile.
- **Actual result:** All test areas were marked as passed during the rehearsal.
- **Proof:** [Issue #53 — Independent Rehearsal](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/issues/53) [Repeat independent rehearsal](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/issues/63)

This rehearsal covers the tested demo behavior. It does not confirm that real Firestore-backed event loading works, which remains tracked separately under Issue #35.

## Validation limits

The current evidence proves the sample-data working path, not the production Firestore-backed event data path.

The following remain unverified or intentionally separate from this Week 6 claim:

- real Firestore event loading
- live backend integration for event data
- full production-backed event synchronization
- independent mobile/desktop rehearsal across all flow states

These items are tracked separately and must remain explicit in the issue notes and the Definition of Done.

## Blockers or risks

| Blocker / risk | Owner | Next action |
|---|---|---|
| Event data is currently sample data; Firestore event loading is not yet implemented or verified. | `tulseyy8848` | Confirm Firestore setup and permissions, then test the real event data path with a screenshot and expected/actual result. |

## Decision record

| Decision | Why we chose it | Owner | Evidence / issue link |
|---|---|---|---|
| Continue using the sample-data path for the current working demonstration while tracking Firestore integration separately. | The app path is already reproducible and testable without claiming a backend-backed event flow. | Team 4 | [Issue #49](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/issues/49) |
| Complete the independent rehearsal of the deployed CampusVibes demo and record the results. | To confirm that the main demo features work for an independent tester on desktop and mobile before the demonstration. | `Prachi2061` and `tulseyy8848` | [Issue #53](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/issues/53) |
| Repeat the independent rehearsal of the deployed CampusVibes demo. | To verify that the main demo features work when tested again by someone, and to confirm the results are repeatable on desktop and mobile. | `DevyanaCT` | [Issue #63](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/issues/63) |

## Definition of Done status

The Week 6 feature is considered partially complete for the current sample-data path and not yet complete for real Firestore-backed event loading.

We are honest that:

- the visible Events path is currently verified for the working sample-data flow;
- the real Firestore-backed event data story remains incomplete;
- the next action is to implement and verify the Firestore data path and record the result in a follow-up test.

## Next week's bridge task

- Investigate Firestore event data setup and permissions.
- Test the real event-loading path and record the expected result, actual result, and proof.
- Keep the completed independent rehearsal documented in [Issue #53](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/issues/53).
- Update the issue Definition of Done to reflect the verified scope and remaining Firestore limitation.
