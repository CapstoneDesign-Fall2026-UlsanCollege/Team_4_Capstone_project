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
- [ ] Confirm that the relevant Issue’s Definition of Done and status match the test result.
- [ ] Link the relevant commit or pull request and attach a real screenshot, demo, or short video.
- [x] Identify the Firebase Firestore limitation in the project work: event data is currently code-based sample data, and Firestore event loading has not yet been verified. Keep this as a separate blocker or Issue if needed.

### Record team and individual evidence

- [ ] Update the team’s one shared Week 6 Weekly Report.
- [ ] Add my own contribution sentence and evidence link to the shared report.
- [ ] Complete and link my Individual Evidence Receipt.
- [x] Keep personal data, secrets, and unapproved real-user data out of shared evidence.

## Evidence to link

- [ ] Relevant implementation Issue with its current Definition of Done and status.
- [ ] Commit or pull request for the behavior tested. Check the repository to confirm the correct link.
- [ ] Tested-By Note containing the test steps, expected result, actual result, and proof.
- [ ] Actual screenshot, demo link, or short video showing the Events → Event Details behavior.
- [ ] One shared Weekly Report with a contribution and evidence row from every team member.
- [ ] Individual Evidence Receipt from each student.
- [ ] Firestore blocker Issue, if applicable, with one owner and a clear next action.

## Stretch menu — optional after the core work

### Stronger user test

- [ ] Ask a teammate who was not involved in the implementation discussion to repeat the path from a clean start.
- [ ] Test one empty, error, loading, or recovery state related to the main path.
- [ ] Write one success signal and show how the test observes it.

### Better technical evidence

- [ ] Turn the manual check into a repeatable smoke test.
- [ ] Add a short setup note so another teammate can run the project locally.
- [ ] Fix one bug found during testing and repeat the same test.

### Better midterm path

- [ ] Write the first 3–5 steps of the midterm demo path.
- [x] Identify one claim the team can prove: a user can log in, open Events, select a sample event, and view its basic details, based on the reported test.
- [x] Identify one claim the team cannot yet prove: Events are loaded from Firebase Firestore.
- [ ] Assign one improvement that will make the Week 7 rehearsal clearer or more reliable.

## Risks and exceptions

| Item | Owner | Next action | Review point |
|---|---|---|---|
| Firestore event loading has not been implemented or verified | `Tulsey8848` *(previously listed as blocker owner; confirm this assignment is still correct)* | Set up and test event retrieval from Firestore, then record the result and proof. | Before claiming Firestore event loading works |
| Test proof and GitHub links |  Team 4 | Add the actual screenshot or recording, Tested-By Note, and correct implementation commit or PR link. | Before the Week 6 evidence review |
| Shared team and individual evidence | Each team member | Add a contribution and evidence link to the shared Weekly Report and complete the Individual Evidence Receipt. | Before Week 6 submission |
| Week 7 rehearsal improvement | Team 4  | Choose one improvement and create or update its GitHub Issue with an owner and next action. | Before the Week 7 rehearsal |

## Final check

- [ ] Another teammate has repeated the test using the written steps, and the result is recorded.
- [ ] The evidence supports the claim and the Issue status is honest.
- [ ] The next midterm-demo improvement is assigned and visible in GitHub.
