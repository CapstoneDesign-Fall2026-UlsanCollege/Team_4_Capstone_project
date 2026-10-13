# Weekly Report

**Team:** Team 4 — CampusVibe  
**Week:** Week 6  
**Date:** October 12, 2026

## This week's goal

This week, we focused on verifying visible behavior in the current CampusVibe vertical slice. We recorded repeatable test paths, expected and actual results, and supporting evidence.

We verified the sample Events flow from the Dashboard to the event details view. We also tested the deployed CampusVibe demo after the project UI changes, including Discover, Saved, Profile, Assistant, and Suggest on desktop and mobile.

The scope of these checks is limited to the working demo and sample-data behavior. Firestore-backed event loading remains unverified and is tracked separately.

## Verified behavior

### Sample Events → Event Details

We checked the sample Events flow in the app and repeated the test  after the project changes to confirm that the event-viewing functionality was still working.

- **Expected result:** Selecting a sample event from Browse Events/Discover should open the event details view and display the event information correctly.
- **Actual result:** The initial test and the retest were successful. We opened the updated project, navigated to Browse Events/Discover, selected a sample event, and confirmed that its basic details appeared as expected.
- **Proof:** [Issue #49 — Original Events Test](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/issues/49) and [Issue #64 — Repeat Test After Project Changes](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/issues/64).

**Limitation:** This test verifies the sample-data event-viewing path only. Firestore-backed event loading remains unverified.

### Deployed demo retest — desktop and mobile

The deployed CampusVibe demo was tested again after the project changes. The test covered Discover search and filters, saving an event, checking Saved and Profile, sending an Assistant prompt, submitting a suggestion, and editing the profile bio. The desktop and mobile layouts were also checked.

- **Expected result:** Navigation and controls should work, saved-event summaries should update, and text should remain readable without overlap on desktop and mobile.
- **Actual result:** The retest was successful. All tested areas were marked as passed during the rehearsal.
- **Proof:** [Issue #53 — Independent Rehearsal](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/issues/53) and [Issue #63 — Repeat Test](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/issues/63)

This confirms the tested demo behavior. It does not confirm that events load from Firestore.

## What we committed to do

- [x] Verify the Events → Event Details path using the current sample-data flow.
- [x] Record the expected result and actual result.
- [x] Link the issue, proof, and supporting documentation.
- [x] State the remaining limitation clearly: Firestore-backed event loading is still not verified.
- [x] Repeat the deployed demo checks after the project changes on desktop and mobile.
- [x] Record the successful repeat-test result in Issue #63.
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

|Deployment| [Deployment](https://campusvibe-theta.vercel.app/) |
| Independent rehearsal results | [Issue #53](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/issues/53) |
| Evidence tested by note| [Evidence tested by note](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/blob/6f888d673961981e5b6c49d8a26710d1d331f8a3/docs/Week6/evidence/Tested-by-note.md)|
| Repeat Tested | [Issue #63](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/issues/63) |
| Repeat test after project changes | [Issue #64](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/issues/64) |
| Retested by note | [Retested by note](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/blob/1d4151928d1934f2128c9127e989193b73fbab6c/docs/Week6/Retested-by-note.md)  |

## Individual contribution entries — one row per student

| Student | What they did | Evidence link |
|---|---|---|
| `DevyanaCT` | Contributed to the Week 6 testing documentation and evidence organization, including issue/test documentation updates and screening of the recorded results. Repeat test the one path, Repeated the test to check the feature and the written instruction in an independently rehearsed the deployed CampusVibes demo, Retest the updated CampusVibe project and document the Events and issue |[commits](94812d3c212ae5c68dd57e14afaadb597cf440f6) [commits](11d7118c5ae422fbb72ca719fc15f7c1d298d3b3) [commits](508787721e91e6f76c5ec3dc4019ccb330a0b837) [Testes-NOte](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/blob/a9ab586bcc79da0188862eceeac1557fc5c2c5e1/docs/Week6/tested-by-note.md), [Issue #49](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/issues/49), [Isseue 63](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/issues/63), [Retested-by-note](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/blob/a564bee469161974865fd0d6b34571d93118f0e0/docs/Week6/Retested-by-note.md)[Issue-64](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/issues/64)|
| `prachi2061` | Fixed the missing production logo; updated the welcome/login, Dashboard, Discover, Assistant, Suggest, and Profile designs; added browser-local profile editing; ran production builds and automated deployment checks. | [Detailed evidence](#prachi2061-evidence), [Logo fix](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/commit/75c4104), [Login](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/commit/eda4e5b), [Dashboard](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/commit/e98abfd), [Discover](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/commit/8f69125), [Assistant](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/commit/8b8dac4), [Suggest](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/commit/3d735a3), [Profile](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/commit/a2ced5b), [Issue #20](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/issues/20), [Issue #22](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/issues/22) |
| `ujjalpoudel75` | Contributed documented evidence for the Week 6 report and the testing record, and helped capture the sample event path result in the shared report. | [weekly_report.md](./weekly_report.md) |
| `tulseyy8848` | contributed to Week 6 by reviewing and documenting the CampusVibe testing results. I helped verify the Events → Event Details flow using sample event data and recorded the repeat-test results in GitHub Issues #49 and #64. I also helped organize screenshot evidence and document the remaining limitation that Firestore-backed event loading has not yet been verified. | [[Issue #49](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/issues/49) ](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/issues/64) https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/issues/53 https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/issues/63 |

### Prachi2061 Evidence

- **Professor feedback follow-up:** Confirmed the existing automated records in #20/#22/#23 and independent teammate results in #53/#63. Completed the missing automated mobile toast retest using the actual pre-fix revision and current app: the same sample-event path passed in both, and toast contrast improved from 1.16:1 to 16.61:1. [Feedback audit, before/after screenshots, and measured results](professor-feedback-follow-up.md) keep automated evidence separate from the existing teammate rehearsal. This is local demo testing, not production or real-login revalidation.

- **Shared text/event feed review and verification:** Added Firestore-backed publishing, author editing/deletion, and a separate guest-demo path. Reviewed access rules, corrected the offline composer label and test-fixture cleanup, and integrated the latest team work from main. Six emulator rule tests, the two-account browser workflow, four Events regression checks, and the production build passed. [Shared-feed evidence and setup](../../frontend/react-app/verification/shared-feed.md) records screenshots and limitations. This verifies local emulator integration; production rules/index deployment and production shared-feed verification remain outstanding, separate from Firestore loading for Discover events.

- **Week 6 stretch testing:** Audited the latest team evidence before choosing additional work. Added a checked-in desktop/mobile Events browser smoke test and linked the sample-event success signal to its assertions. The test found a Discover dialog-close bug; fixed the click handler and reran the same checks: four passed, and the production build passed. Evidence: [test commit 07a2a8d](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/commit/07a2a8d), [fix commit 579dcc4](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/commit/579dcc4), and [audit, before/after results, and run instructions](stretch-validation.md). Existing teammate work is credited there. These are local automated results; teammate clean-checkout testing remains unverified. The older toast fix now has a separate [mobile before/after retest](professor-feedback-follow-up.md).

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

This rehearsal covers the tested demo behavior. It does not confirm that real Firestore-backed event loading works, which remains tracked separately under Issue #35.

### Independent CampusVibe demo rehearsal and repeat test

The report records an independent rehearsal of the deployed CampusVibe demo and a repeat test after the project changes. The checks covered entering as a demo student, Discover search and filters, saving an event, checking Saved and Profile, submitting an Assistant prompt and a suggestion, and editing the profile bio. Desktop and mobile layouts were also checked.

- **Expected result:** The main demo features should work correctly, saved-event summaries should update, and the interface should remain readable on desktop and mobile.
- **Actual result:** All tested areas were marked as passed during the rehearsal and repeat test.
- **Proof:** [Issue #53 — Independent Rehearsal](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/issues/53) and [Issue #63 — Repeat Test](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/issues/63)

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
| Retest the Events → Event Details path after the project changes and attach updated proof. | To confirm that the updated project still displays sample event details correctly and to document the successful retest without claiming Firestore integration is verified. | `DevyanaCT` | [Issue #63 — Repeat Test](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/issues/64) |

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
