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
- Proof: link to the issue/test note and screenshots below.

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

## Individual contribution entries — one row per student

| Student | What they did | Evidence link |
|---|---|---|
| `DevyanaCT` | Contributed to the Week 6 testing documentation and evidence organization, including issue/test documentation updates and screening of the recorded results. Repeated the test to check the feature and the written instructions. | [Issue #49](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/issues/49), [Testes-NOte](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/blob/a9ab586bcc79da0188862eceeac1557fc5c2c5e1/docs/Week6/tested-by-note.md), [Commit](c525c6a0c8f7d2261397dec88f7ede7808e18d9f)[Commit](f6c1f41b674cb16675d729d123695c5de83a1e79) |
| `prachi2061` | Worked on the UI improvements and build validation for the dashboard, welcome/login, suggest, profile, and related screens. Confirmed the build remained healthy after the visual updates. | [Issue #20](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/issues/20), [Issue #22](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/issues/22) |
| `ujjalpoudel75` | Contributed documented evidence for the Week 6 report and the testing record, and helped capture the sample event path result in the shared report. | [weekly_report.md](./weekly_report.md) |
| `tulseyy8848` | Reviewed the flow, organized supporting evidence, and helped document the remaining Firestore limitation and next actions. | [Issue #49](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/issues/49) |

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
| Independent rehearsal is still open for the full demo flow. | Team 4 | Complete [Issue #53](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/issues/53) with a teammate tester and proof. |

## Decision record

| Decision | Why we chose it | Owner | Evidence / issue link |
|---|---|---|---|
| Continue using the sample-data path for the current working demonstration while tracking Firestore integration separately. | The app path is already reproducible and testable without claiming a backend-backed event flow. | Team 4 | [Issue #49](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/issues/49) |

## Definition of Done status

The Week 6 feature is considered partially complete for the current sample-data path and not yet complete for real Firestore-backed event loading.

We are honest that:

- the visible Events path is currently verified for the working sample-data flow;
- the real Firestore-backed event data story remains incomplete;
- the next action is to implement and verify the Firestore data path and record the result in a follow-up test.

## Next week's bridge task

- Investigate Firestore event data setup and permissions.
- Test the real event-loading path again and record the expected result, actual result, and proof.
- Complete the independent desktop/mobile rehearsal in [Issue #53](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/issues/53).
- Update the issue Definition of Done to reflect the verified scope and remaining limitation.
