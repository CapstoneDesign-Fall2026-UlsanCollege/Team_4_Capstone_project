# Weekly Report

**Team:** 4 – CampusVibes  
**Week:** 8  
**Date:** 2026/10/27

**Prachi feedback follow-up reviewed:** 2026-10-28 (Asia/Seoul); documentation/source audit only, not a new application test.

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
| Final rehearsal record and screenshots | [October 22 record](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/issues/74#issuecomment-6330730005) and [October 27 screenshot evidence](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/issues/74#issuecomment-6433579630); duration and detailed outcome were not recorded. |
| Events → Event Details retest | [Issue #64](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/issues/64) |
| Independent deployed-demo rehearsal | [Issue #53](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/issues/53) |
| Empty-search/no-events test | [Issue #70](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/issues/70) |
| Firestore event-loading limitation | [Issue #35](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/issues/35) |
| Deployed application | [CampusVibes website](https://campusvibe-theta.vercel.app/) |
| Theme toggle implementation | [Theme toggle commit](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/commit/108d8b69181859d4c1ff2d6e049b26d353f9a094) |
| Pull requests and implementation checks | [PR #75](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/pull/75) and [PR #77](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/pull/77) |
| Course lesson / class evidence | [Week 8 course guidance](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/course-materials/blob/main/student-week-one-pagers/week-08-2026-10-22-midterm-presentations.md) and [Prachi's course/project lesson with proof](./IndividualLessonsAndProof.md#4-prachi2061). |
| Test/check note | [Issue #64 – Event Details retest](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/issues/64) |
| Individual Week 8 lessons and proof | [Individual Lessons and Proof](IndividualLessonsAndProof.md) |
| October 28 evidence review | [Current records, source trace and remaining gaps](./Evidence/feedback-audit-2026-10-28.md); Codex-assisted documentation review, not an independent human test. |
| Week 9 owner and acceptance-evidence handoff | [Named actions, retrieval check and scope gate](./week9-handoff.md); proposed for team confirmation, no completed test claimed. |

**Reference:** [Weekly-report-week7](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/blob/929aa364d0579650c69812fb65dcdb10fa785716/docs/Week7/Weekly-Report.md)

## Course lesson

**Lesson:** Presenting our project helped us learn how to explain our application clearly, describe each team member's contribution, demonstrate the main user journey, and communicate current limitations honestly.

The presentation also helped us understand the importance of supporting our claims with testing evidence and distinguishing completed features from functionality that has not yet been verified.

**Class evidence/source:**
- **Course requirement:** [Week 8 - Midterm Presentations](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/course-materials/blob/main/student-week-one-pagers/week-08-2026-10-22-midterm-presentations.md) asks for the current state, individual contributions, linked evidence and feedback-driven next steps.
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

**October 28 scope handoff:** retain Landing -> Login -> Dashboard -> Discover/Events -> Search/Filters -> Event Details as the core. Assistant/Gemini, social/Messages, Profile, Suggestions, badges, photos, theme behavior and the full organisation/submission workflow stay outside it. The [Week 9 handoff](./week9-handoff.md) identifies the original club-discovery requirement for an explicit team finish/cut decision; this is not a claim that the broader original MVP is met or exceeded.

## Individual contribution entries — one row per student

Each student must review their own row, confirm that it accurately describes their work, and provide at least one evidence link. Earlier evidence should not be presented as new Week 8 work unless the contribution was actually made this week.

| Student | What they did | Evidence link |
|---|---|---|
| DevyanaCT | Independently tested and retested the Events → Event Details flow and recorded the test results. Added a light/dark theme toggle. Verified the deployed CampusVibes demo across desktop and mobile and contributed testing evidence for midterm preparation, and prepared and updated project documentation, including the weekly report and rehearsal evidence record | [Issue #64 — Events → Event Details retest](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/issues/64)  [Issue #63 — Independent demo retest](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/issues/63)  [Theme-toggle code change](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/commit/108d8b69181859d4c1ff2d6e049b26d353f9a094)  [Theme-toggle evidence](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/blob/main/docs/Week7/Evidence/theme-toggle.md) [Commit](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/commit/929aa364d0579650c69812fb65dcdb10fa785716) [commit2](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/commit/39373a3946a3698b0298581875354034bbcc79b3) [Issue #74 – Midterm Preparation](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/issues/74)|
| Tulseyy8848 | Independently tested the deployed CampusVibes demo as a non-UI-author; verified the demo student flow, Discover event search and filtering, saving events, Saved page, Profile, and Assistant suggestions; recorded test results and reported findings for desktop and mobile testing. | [Issue #53](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/issues/53), [Issue #49](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/issues/49) |
| Ujjalpoudel75 |Participated in the final CampusVibes midterm rehearsal on October 22, 2026, reviewing the main demo flow and project limitations (Issue #74). My earlier empty-search/no-events test (Issue #70) also provided supporting evidence for the presentation.| [Issue #74](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/issues/74#issuecomment-6330730005) , [Issue #70](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/issues/70) |
| prachi2061 | Completed the October 28 feedback/source audit, course/project reflection and MVP-gap/Week 9 evidence handoff with Codex assistance. Linked the teammate's October 22 participation record without inventing its missing duration/outcome. Earlier navigation, account/social/Assistant implementation and October 20 automation remain dated background, not new Week 8 code or independent testing. | [Own lessons and proof](./IndividualLessonsAndProof.md#4-prachi2061) · [Dated evidence audit](./Evidence/feedback-audit-2026-10-28.md) · [Owned next actions](./week9-handoff.md#named-next-actions) · [Earlier individual receipt](../Week7/Evidence/evidence-receipt-prachi2061.md) |

## Blockers or risks

| Blocker/risk | Owner | Next action |
|---|---|---|
| Firestore event loading has not been tested yet. | Issue #35 currently names Tulsey8848 (`tulseyy8848`); confirm implementation owner with Team 4. `prachi2061` owns the source/acceptance-evidence handoff. | Follow the [proposed retrieval check](./week9-handoff.md#proposed-firestore-acceptance-check), then record a real pass/fail/blocker result in Issue #35. No test is claimed here. |
| The exact rehearsal duration and detailed outcome were not recorded. | Team 4; `prachi2061` coordinates the missing-result follow-up. | Arrange a short measured replacement, name the actual tester/speakers, and post device/view, duration, expected/actual outcome, issues, proof and next action in Issue #74. Existing screenshots do not recover the missing values. |
| Scope growth could hide the unresolved core/data decision. | Team 4 | Use the linked Week 9 course guidance to agree the finish/cut list before expanding features. Keep the MVP GAP and sample-data labels until evidence or an explicit revised contract changes the assessment. |

## Decision record

| Decision | Why we chose it | Owner | Evidence / Issue link |
|---|---|---|---|
| Keep the frozen midterm demo path focused on the main event-discovery journey. | A focused demo makes the core user flow easier to explain and verify. | Team 4 | [Issue #74](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/issues/74) |
| Continue to describe the Events page as using code-based sample data until Firestore loading is tested. | We should not claim database integration works without test evidence. | Team 4 | [Issue #35](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/issues/35) |
| Continue working on Firestore event loading next week. | The team needs to verify whether real event records can be retrieved and displayed. | Team 4 | [Issue #35](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/issues/35) |
| Keep MVP status GAP and extensions outside the core while checking the event-data boundary. | Sample navigation, Auth and other persistent services do not prove Event retrieval. | prachi2061 - assessment/handoff; Team 4 confirms the Week 9 contract. | [Current source/evidence audit](./Evidence/feedback-audit-2026-10-28.md) · [Finish/cut and acceptance proposal](./week9-handoff.md) |

## Next week's bridge task

- **Milestone:** Settle the core/data boundary before expanding scope; review the [Week 9 handoff](./week9-handoff.md) at the October 29 class discussion.
- **Owner:** `prachi2061` leads source/acceptance-evidence follow-up. Preserve Issue #35's existing named owner (`Tulsey8848` / `tulseyy8848`) and assignees; Team 4 must confirm implementation and actual test roles.
- **Testable check:** Match one authorized Firestore test Event document to the actual Discover/Event Details UI, record empty/error behavior safely, and post the actual pass/fail/blocker result, date, revision, tester, device/view and sanitized proof in [Issue #35](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/issues/35). Seeded content remains labeled as test data.
- **If testing is blocked:** Document the access or configuration problem and the next action. Do not claim that Firestore loading works until it has been verified.
- **Evidence follow-up:** Existing [rehearsal screenshots](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/issues/74#issuecomment-6433579630) are linked. `prachi2061` coordinates a measured replacement result in Issue #74; the actual human tester/time and detailed outcome are still outstanding.
