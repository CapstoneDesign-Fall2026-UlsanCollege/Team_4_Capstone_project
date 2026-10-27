# Weekly Report

**Team:** 4 – CampusVibes  
**Week:** 8  
**Date:** 2026/10/27

## This week's goal

Our goal this week was to finalize our midterm demo preparation, review the main CampusVibes user journey, organize testing evidence, and document the current state of the application accurately.

Our team completed the final midterm rehearsal on October 22, 2026, and attached the available screenshots to Issue #74. We reviewed our existing testing evidence and confirmed that the current Events page uses code-based sample data. Firestore event loading has not been tested yet, so we plan to continue working on it next week.

## What we committed to do

- [x] Complete the final midterm team rehearsal on October 22, 2026.
- [x] Attach the available rehearsal screenshots to Issue #74.
- [x] Review existing testing evidence for event details, independent demo testing, and empty-search behavior.
- [x] Document the current Firestore limitation accurately.
- [ ] Ensure every enrolled student has confirmed their own contribution and evidence link.

## Evidence links

If it is not linked, it does not count.

| Evidence | Link |
|---|---|
| Final rehearsal record and screenshots | [Issue #74 – Midterm Preparation](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/issues/74) |
| Events → Event Details retest | [Issue #64](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/issues/64) |
| Independent deployed-demo rehearsal | [Issue #53](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/issues/53) |
| Empty-search/no-events test | [Issue #70](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/issues/70) |
| Firestore event-loading limitation | [Issue #35](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/issues/35) |
| Deployed application | [CampusVibes website](https://campusvibe-theta.vercel.app/) |
| Theme toggle implementation | [Theme toggle commit](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/commit/108d8b69181859d4c1ff2d6e049b26d353f9a094) |
| Pull requests and implementation checks | [PR #75](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/pull/75) and [PR #77](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/pull/77) |
| Course lesson / class evidence | Add the relevant course note, class screenshot, or source link before submission. |
| Test/check note | [Issue #64 – Event Details retest](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/issues/64) |

**Reference:** [Weekly-report-week7](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/blob/929aa364d0579650c69812fb65dcdb10fa785716/docs/Week7/Weekly-Report.md)

## Course lesson

**Lesson:** Presenting our project helped us learn how to explain our application clearly, describe each team member's contribution, demonstrate the main user journey, and communicate current limitations honestly.

The presentation also helped us understand the importance of supporting our claims with testing evidence and distinguishing completed features from functionality that has not yet been verified.

**Class evidence/source:**
- **Midterm presentation slides:** [CampusVibes presentation](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/blob/main/docs/Week7/Presentation%20slides.pptx/CampusVibes_Presentation.pptx)
- **Final rehearsal evidence:** [Issue #74 – Midterm Preparation](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/issues/74)

## Project lesson

**Lesson:** We should prioritize a reliable core user journey and verify functionality before claiming it is complete.

Our frozen midterm demo path is:

Landing Page → Login → Dashboard → Discover/Events → Search/Filters → Event Details

Existing test records support parts of this user journey. The independent deployed-demo rehearsal also provides evidence for the features checked during that earlier test.

However, the current Events page uses code-based sample data, and Firestore event loading has not been tested yet. We plan to continue working on Firestore next week and record the actual test result when testing is performed.

**Evidence:**
- [Issue #64 – Event Details retest](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/issues/64)
- [Issue #53 – Independent deployed-demo rehearsal](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/issues/53)
- [Issue #35 – Firestore limitation](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/issues/35)

## MVP status

**Status: GAP — Firestore event loading has not been tested yet.**

The current application supports a main event-discovery journey using the available implementation and code-based sample data. Existing testing records provide evidence for the specific features and flows that were tested.

The final team rehearsal was completed on October 22, 2026, and the available screenshots are attached to Issue #74. However, the exact duration and detailed rehearsal outcome were not recorded.

Firestore event loading remains unverified. This is a current limitation, not a claim that the entire project has failed. The team plans to continue working on this area next week.

## Individual contribution entries — one row per student

Each student must review their own row, confirm that it accurately describes their work, and provide at least one evidence link. Earlier evidence should not be presented as new Week 8 work unless the contribution was actually made this week.

| Student | What they did | Evidence link |
|---|---|---|
| DevyanaCT | Independently tested and retested the Events → Event Details flow and recorded the test results. Added a light/dark theme toggle. Verified the deployed CampusVibes demo across desktop and mobile and contributed testing evidence for midterm preparation, and prepared and updated project documentation, including the weekly report and rehearsal evidence record | [Issue #64 — Events → Event Details retest](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/issues/64) · [Issue #63 — Independent demo retest](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/issues/63) · [Theme-toggle code change](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/commit/108d8b69181859d4c1ff2d6e049b26d353f9a094) · [Theme-toggle evidence](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/blob/main/docs/Week7/Evidence/theme-toggle.md) [Commit](929aa364d0579650c69812fb65dcdb10fa785716) [commit2](39373a3946a3698b0298581875354034bbcc79b3)|
| Tulseyy8848 | Add a sentence describing your own work completed this week and link evidence for that work. | |
| Ujjalpoudel75 | Add a sentence describing your own work completed this week. Earlier evidence includes testing empty-search/no-events behavior; link evidence for any new work. | [ |
| Prachi2061 | Add a sentence describing your own work completed this week and link the relevant implementation, test, or documentation evidence. | |


## Blockers or risks

| Blocker/risk | Owner | Next action |
|---|---|---|
| Firestore event loading has not been tested yet. | Team 4 — individual owner to be confirmed. | Continue the Firestore work next week, test whether real event records load, and record the actual result with supporting evidence in Issue #35. |
| The exact rehearsal duration and detailed outcome were not recorded. | Team 4 | Keep the record transparent. The available screenshots are attached to Issue #74; do not invent missing details or a rehearsal duration. |
| Individual contribution evidence may be incomplete. | Each student | Confirm your own contribution row and provide at least one relevant evidence link. |
| Course lesson evidence is not yet linked in this report. | Team 4 | Add the relevant course note, class screenshot, or instructor-provided source link. |

## Decision record

| Decision | Why we chose it | Owner | Evidence / Issue link |
|---|---|---|---|
| Keep the frozen midterm demo path focused on the main event-discovery journey. | A focused demo makes the core user flow easier to explain and verify. | Team 4 | [Issue #74](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/issues/74) |
| Continue to describe the Events page as using code-based sample data until Firestore loading is tested. | We should not claim database integration works without test evidence. | Team 4 | [Issue #35](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/issues/35) |
| Continue working on Firestore event loading next week. | The team needs to verify whether real event records can be retrieved and displayed. | Team 4 | [Issue #35](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/issues/35) |

## Next week's bridge task

- **Milestone:** Continue the Firestore event-loading work and test it if project access is available.
- **Owner:** Team 4 — confirm one teammate to lead this task.
- **Testable check:** Open the Events page, test whether real event records are retrieved from Firestore, and record a pass/fail result with supporting evidence in [Issue #35](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/issues/35).
- **If testing is blocked:** Document the access or configuration problem and the next action. Do not claim that Firestore loading works until it has been verified.
- **Evidence follow-up:** The final rehearsal screenshots are attached to [Issue #74](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/issues/74).
