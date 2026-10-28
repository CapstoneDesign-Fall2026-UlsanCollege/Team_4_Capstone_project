# Week 7 Work Checklist — Rehearse the Midterm Path

**Date:** Thu 2026-10-15 to Wed 2026-10-21  
**Team:** 4

**Readiness reviewed:** 2026-10-28. The October 22 team rehearsal is reported completed, with [supporting screenshots posted October 27](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/issues/74#issuecomment-6433579630). Duration and detailed outcome were not recorded. Checked items do not certify a measured presentation or live Firestore Event data.

> Build a short presentation around what the team can show and prove today. Label anything simulated, incomplete, or unverified. Rehearse before polishing slides.

## Core work — complete all

### Build a believable demo path

- [x] Start from the signed-out production landing page with a prepared email/password account; [clean-state technical proof](./Evidence/core-path-2026-10-20/check-note.md).
- [x] Name the target user, problem and one path in the [team script](./midterm-demo-script.md).
- [x] Write the main demo steps in the [Midterm Demo Script](./midterm-demo-script.md).
- [x] Separate working, simulated, planned and unverified behavior in the [claim/evidence boundary](./Evidence/core-path-2026-10-20/check-note.md#claim-and-evidence-boundary). Screenshots are recorded proof, not proof of current live operation.
- [x] Give each speaker a short part, including each student's evidence-backed contribution.
- [x] Keep the sample-data/Firestore limitation and a concrete next step in the script and [Issue #35](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/issues/35).

### Check Sprint 1 and current status

- [ ] Complete [Sprint 1 quality checks](./sprint-quality-quick-checks.md); technical proof is linked, but the detailed human fallback explanation/result is not verifiable from the rehearsal record.
- [x] Link [production path and failure/recovery proof](./Evidence/core-path-2026-10-20/check-note.md).
- [x] Review the [README viewing/setup instructions](../../README.md#run-locally). This was document review, not another teammate's clean-checkout run.
- [x] Keep [Midterm Prep Issue #74](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/issues/74) as the owner/status/risk/next-action tracker; the final timed rehearsal remains outstanding.
- [x] Check that shared evidence contains no secrets, private data, or unapproved real-user data.

### Rehearse and record evidence

- [x] Record the reported October 22 team rehearsal and its [named participants](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/issues/74#issuecomment-6330730005).
- [x] Link the available [supporting rehearsal screenshots](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/issues/74#issuecomment-6433579630).
- [ ] Run a measured 3-5 minute replacement rehearsal from the stated start point; the October 22 duration was not recorded.
- [x] Use the [course rubric](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/course-materials/blob/main/student-starter-kit/docs/midterm-presentation-rubric.md) for a [pre-rehearsal strength/improvement review](./sprint-quality-quick-checks.md#october-20-technical-check-and-human-follow-up); no presentation score is claimed.
- [ ] Add the actual measured duration, expected/actual outcome, issues, browser/device/view and next action from the replacement run to the script and prep Issue. Existing screenshots do not fill these fields.
- [x] Update the team's one shared Weekly Report; each student adds their own contribution and evidence row.
- [x] Each student has a linked [Individual Evidence Receipt](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/course-materials/blob/main/student-starter-kit/templates/individual-evidence-receipt.md). [Current status](./Weekly-Report.md#current-receipt-and-speaker-follow-up): all four receipts now exist and resolve. Each student remains responsible for explaining their own evidence.

## Evidence to link

- [x] [Midterm prep Issue](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/issues/74) with owner, current status, risks and next actions.
- [x] [Midterm demo script and run steps](./midterm-demo-script.md).
- [x] [Current technical test note and screenshots](./Evidence/core-path-2026-10-20/check-note.md), labeled as automation rather than a narrated rehearsal.
- [ ] Completed Sprint 1 quality quick checks, including a recorded human fallback explanation.
- [x] Shared Weekly Report with a row from every student and each student's receipt link.
- [x] [Firestore blocker #35](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/issues/35) remains explicit; account/social services do not verify Discover event loading.

## Stretch menu — optional after the core work

Choose an extension only if the demo path is already clear and fits within five minutes.

### Stronger presentation

- [ ] Ask a person outside the build discussion to follow the run steps without coaching.
- [ ] Rehearse a recovery or fallback if the live environment fails.
- [ ] Make one simple slide that shows the user, problem, and scope boundary.

### Stronger evidence

- [x] [Repeat the main path from a clean start](./Evidence/core-path-2026-10-20/check-note.md): desktop/mobile automated production checks, not an independent human rehearsal.
- [x] Link the exact [tested production revision and raw results](./Evidence/core-path-2026-10-20/results.json) alongside the claims they support.
- [x] Check the start instructions from another teammate's device or workspace.

## Risks and exceptions

If a core item is incomplete, record the reason, owner, and next action in GitHub.

| Item | Owner | Next action | Review point |
|---|---|---|---|
| October 22 rehearsal reported, but duration and detailed outcome not recorded | Team 4; prachi2061 coordinates Issue #74 evidence follow-up | Arrange the measured replacement and record actual tester/speakers, date/time, device/view, duration, expected/actual outcome, issues, proof, limitation and next action. | October 29 proposed scope review |
| Four Week 7 receipts now linked; individual explanations remain each student's responsibility | Each current member | Preserve original test authors/dates and use the repaired [receipt index](./Weekly-Report.md#current-receipt-and-speaker-follow-up). | Next contribution review |
| Network/login failure could block the live presentation | Team 4; speakers unconfirmed | Explain the tested retry; if the live path stays blocked, show dated screenshots explicitly as recorded fallback. Human explanation still needs rehearsal. | Before presenting |
| Discover is sample-based, not verified Firestore event loading | Owner tracked in Issue #35 | Preserve the boundary; implement/test database retrieval separately rather than expanding the midterm demo. | State during the demo |

## Final check

- [x] Another person can follow the demo path from its stated start point.
- [ ] A recorded duration verifies that the narrated rehearsal took 3-5 minutes and stayed within the team's actual evidence. The October 22 time is unknown.
- [x] Every speaker can name their part and point to their evidence.
- [x] The next rehearsal improvement and the Oct 21 freeze action are assigned.

The measured replacement and its detailed human result remain unchecked. The October 20 production check removed its disposable account; use an approved login without posting credentials. Current gaps and owners are in the [October 28 audit](../Week8%28homework%29/Evidence/feedback-audit-2026-10-28.md) and [Week 9 handoff](../Week8%28homework%29/week9-handoff.md). Course source: [Week 7 one-pager](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/course-materials/blob/main/week-07/one-pager.md).
