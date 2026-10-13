# Week 6 Work Checklist — Test the Vertical Slice

**Date:** Thu 2026-10-08 to Wed 2026-10-14  
**Team:** 4  
**Project:** CampusVibe

## Core work — complete all

### Run one real test

- [x] Choose one small user-visible behavior from the Week 5 vertical slice: Dashboard → Events → Select Event → View Basic Event Details.
- [x] Start from a clear place and write repeatable test steps.
- [x] State the expected result before running the test.
- [x] Ask a teammate other than the author to follow the steps. Tester: `Tulseyy8848`.
- [x] Record the actual result. The teammate reported that the sample event opened and its basic details appeared successfully.
- [x] No test failure was reported. If a problem is discovered during a future test, record the first failing step and keep the relevant Issue open.

### Connect the test to the work

- [x] Prepare the Tested-By Note with the tester, date, steps, expected result, actual result, problem found, and next action.
- [x] Confirm that the relevant Issue's Definition of Done and status match the test result. Issue #49 has completed checks, teammate results, and is closed as completed.
- [x] Link the relevant commit or pull request and attach a real screenshot, demo, or short video. Issue #49 includes commit db5dad6 and screenshots.
- [x] Identify the Firebase Firestore limitation in the project work: event data is currently code-based sample data, and Firestore event loading has not yet been verified. Keep this as a separate blocker or Issue if needed.

### Record team and individual evidence

- [x] Update the team's one shared Week 6 Weekly Report. See [shared report](weekly_report.md).
- [x] Add my own contribution sentence and evidence link to the shared report. Prachi's row links the implementation commits.
- [x] Record my work, evidence links, and validation in the shared report. See [Prachi's evidence in the shared report](weekly_report.md).
- [x] Keep personal data, secrets, and unapproved real-user data out of shared evidence.

## Evidence to link

- [x] Relevant implementation Issue with its current Definition of Done and status: [#49](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/issues/49).
- [x] Commit or pull request for the behavior tested: [db5dad6](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/commit/db5dad64f3131fb87b2d7011c86d6e2f9ecd575d).
- [x] Tested-By Note containing the test steps, expected result, actual result, and proof: [note](tested-by-note.md).
- [x] Actual screenshot, demo link, or short video showing the Events to Event Details behavior: attached to #49.
- [x] One shared Weekly Report with a contribution and evidence row from every team member: [report](weekly_report.md), including Ujjal's recorded test comment.
- [x] Individual contribution and evidence links from each student, recorded in the [shared Week 6 report](weekly_report.md).
- [x] Firestore blocker Issue, if applicable, with one owner and a clear next action: [#35](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/issues/35), owner Tulsey8848, next action to connect and test Firestore event retrieval.

## Stretch menu — optional after the core work

### Stronger user test

- [x] Ask a teammate who was not involved in the implementation discussion to repeat the path from a clean start.
- [x] Test one empty, error, loading, or recovery state related to the main path. Already recorded in the October 12 [automated demo check](weekly_report.md#automated-demo-check---october-12-2026): empty search and recovery.
- [x] Write one success signal and show how the test observes it. See [success signal and browser assertions](stretch-validation.md#success-signal-and-observation).

### Better technical evidence

- [x] Turn the manual check into a repeatable smoke test. See [checked-in Events smoke test](../../frontend/react-app/tests/smoke/events.spec.js) and [run instructions](stretch-validation.md#run-the-checked-in-smoke-test).
- [x] Add a short setup note so another teammate can run the project locally. Already available in the [app README](../../frontend/react-app/README.md#run-locally).
- [x] Fix one bug found during testing and repeat the same test. The new Discover dialog-close failure and passing retest are linked in the [before/after record](stretch-validation.md#bug-found-and-same-check-retest).

### Better midterm path

- [x] Write the first 3–5 steps of the midterm demo path. Reuse the existing five-step [sample-event path](tested-by-note.md#check-steps) and [updated retest #64](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/issues/64).
- [x] Identify one claim the team can prove: a user can log in, open Events, select a sample event, and view its basic details, based on the reported test.
- [x] Identify one claim the team cannot yet prove: Events are loaded from Firebase Firestore.
- [x] Assign one improvement that will make the Week 7 rehearsal clearer or more reliable: [#53](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/issues/53), owner @prachi2061, independent desktop/mobile demo testing.

## Risks and exceptions

The [stretch audit](stretch-validation.md) credits existing work and explains
the new executable test. Independent clean-start tests are recorded, but a
teammate run from a clean checkout remains unverified. The toast contrast fix
now has a [mobile retest with before/after screenshots](professor-feedback-follow-up.md#automated-mobile-toast-retest); this automated check is separate from the existing teammate evidence.

| Item | Owner | Next action | Review point |
|---|---|---|---|
| Firestore event loading has not been implemented or verified | `Tulsey8848` *(previously listed as blocker owner; confirm this assignment is still correct)* | Set up and test event retrieval from Firestore, then record the result and proof. | Before claiming Firestore event loading works |

## Final check

- [x] Another teammate has repeated the test using the written steps, and the result is recorded in #49.
- [x] The evidence supports the sample-event claim and the Issue status is honest. Firestore loading and new UI workflow checks remain separate.
- [x] The next midterm-demo improvement is assigned and visible in GitHub: #53.

## Evidence format

Week 6 contributions and evidence are recorded in the shared Weekly Report; separate individual receipt files are not used for this week. Independent checks of the updated pages remain tracked in issue #53. Optional stretch tasks are still optional.
