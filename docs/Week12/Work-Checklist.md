# Week 12 Work Checklist

**Team:** 4, CampusVibes. **Class:** November 19, 2026. **Prepared:** November 20, 2026. **Due:** November 25, 2026, end of day Asia/Seoul.

**Sprint 3:** QA and Handoff. **Preparation owner:** `prachi2061`. 

**Current state:** Week 12 targeted Google Sign-In retesting completed by `ujjalpoudel75` and `tulseyy8848`, with 6 PASS, 0 FAIL from each tester. `prachi2061` completed the November 24 P1 reassessment. The scoped authentication verification risk is cleared. Final whole-MVP approval and accepted-limitations confirmation remain pending.

## One inherited target

Follow the Week 11 candidate Google sign-in hostname repair through to a current non-author retest. The uncertainty is whether the repaired exact deployment completes Google login and session recovery for another tester in a normal supported browser.

- Candidate: `e5f1888aa4600ac2013d6bda34a55554ba68195f`, tag `mvp-candidate-2026-11-18`.
- [Current roadmap](../Week11/Final%20demo%20road%20map.md) and [Week 11 freeze record](../Week11/MVP-Freeze-Record.md): retain the frozen event-discovery promise and its recorded conditions.
- Existing tracking: [authentication QA #167](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/issues/167) and [coordination #177](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/issues/177).
- Week 11 starting evidence: [reported Google blocker](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/issues/177#issuecomment-6969006762), [hostname repair](../Week11/Evidence/prachi-candidate-google-domain-2026-11-18.md) / [PR #185](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/pull/185), and [Prachi's overall manual PASS](../Week11/Evidence/prachi-google-manual-pass-2026-11-18.md) / [PR #186](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/pull/186).

## Define and prepare the check

- [x] Select one carried-forward authentication target and retain the Week 11 proof.
- [x] Write starting conditions, steps, expected outcomes and evidence fields in the [QA checklist](QA-Checklist.md).
- [x] Record the prior failure, proposed severity assessment, current P1 validation risk and next action in the [bug follow-up](Bug-Report.md).
- [x] Prepare [peer test notes](Peer-Test-Notes.md) for the actual reviewer to complete.
- [x] Link the [current area map](../Week10/ai-use-and-code-ownership-audit.md#codebase-area-map); the auth/navigation boundary and existing support path are unchanged.

## Run the target with a non author

- [x] Independent non-author testers completed the targeted Google Sign-In retest on November 23, 2026 (`ujjalpoudel75` and `tulseyy8848`).
- [x] Recorded test date, candidate SHA, exact deployment URL, starting session conditions, and expected/actual results.
- [x] Used normal Chrome for the manual Google authentication checks.
- [x] Recorded available screenshot evidence and peer testing results.
- [x] Classified the original Week 11 authentication failure as successfully retested after the Firebase authorized-domain repair.
- [ ] Browser version and popup recovery duration were not recorded; retain these as evidence limitations.

## Triage from the current result

- [ ] For a confirmed mismatch, safely repeat the same condition once and update #167/#177 with proof, separate severity and P-level, owner and next check.
- [ ] For a genuine blocker, record the exact failing step, available path, owner and next discriminating check.
- [x] For a successful post-fix check, link before/repair/after evidence and limit the conclusion to the authentication cases exercised.
- [ ] Do not call an old bug fixed solely because it did not recur under different conditions.
- [ ] Keep P1 until current evidence justifies a change. P0 applies if the promised path is actually blocked; P2 follows only after the inherited target has a supported disposition.
- [ ] Open a fix PR only if a new bounded change is justified. Use the course [work policy](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/course-materials/blob/800d105afab78813afa42cd84ebfc27baa527eea/student-starter-kit/docs/project-work-policy.md) and [PR note](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/course-materials/blob/800d105afab78813afa42cd84ebfc27baa527eea/student-starter-kit/templates/pr-with-ai-use-note.md).

**Week 12 actual disposition — November 23–24, 2026:** The targeted post-repair Google Sign-In verification completed successfully on the exact frozen candidate deployment. `ujjalpoudel75` reported 6 PASS, 0 FAIL, and `tulseyy8848` independently reported 6 PASS, 0 FAIL. On November 24, `prachi2061` completed the P1 reassessment and cleared the scoped authentication verification risk. No new authentication mismatch was reported. Final whole-MVP approval and accepted-limitations confirmation remain separate pending team decisions.

This result does not establish whole-MVP approval or justify a new code fix.

## Close the evidence loop

- [x] Prepare the shared Week 12 report and Prachi's documentation contribution.
- [x] Complete targeted non-author Google Sign-In manual retesting.
- [x] Record independent testing results in the existing authentication and coordination issues.
- [x] Record available peer testing evidence and limitations.
- [x] Confirm each team member's Week 12 contribution and evidence.
- [x] Link final peer results and issue disposition from the shared Weekly Report.
- [x] Update the area map only if ownership, repository boundaries, or support responsibilities change.
- [x] Confirm final P1 priority reassessment by `prachi2061` on November 24, 2026. The scoped authentication verification risk is cleared.

**Current result:** Targeted authentication retest completed — 6 PASS, 0 reported FAIL from each of two independent testers. Final issue priority review and team MVP approval remain pending.


| Next action | Coordination or existing support | Evidence needed |
|---|---|---|
| Arrange and record the targeted peer retest | Prachi coordinates; Ujjal proposed through the existing QA role; Devyana is the existing auth QA backup | Reviewer acceptance, actual QA results and peer note |
| Decide whether the inherited validation risk can change priority | Prachi with the actual tester | New proof linked to #167/#177; no priority change from documentation alone |


## Optional Week 12 Stretch Work — DevyanaCT

**Activity:** Trip Planner Refactor and Automated Regression Testing  
**Date:** November 24, 2026  
**Tester:** `DevyanaCT`  
**Imlemented owner:** `prachi2026`
**Environment:** Separate local copy, `CampusVibes-Stretch-QA`  
**Branch:** `devyana-safe-stretch`  
**Baseline SHA:** `2f455f20aad660c4cccb4a50622f2f359145c4a4`  
**Status:** Local verification completed — team review pending

### Stretch Work Checklist

- [x] Recorded the original Trip Planner automated-testing baseline — 16 PASS, 0 FAIL.
- [x] Added a reusable `createGoogleMapsUrl()` helper in `frontend/react-app/src/event-maps.js`.
- [x] Updated `getEventMapLinks()` to use the helper for Google Maps search and directions links.
- [x] Added an automated regression test verifying organizer-address consistency.
- [x] Reran Trip Planner tests — 17 PASS, 0 FAIL.
- [x] Ran Event Discovery regression tests — 29 PASS, 0 FAIL.
- [x] Verified the local Vite production build — PASS.
- [x] Verified `git diff --check` — PASS.
- [x] Captured before/after testing and source-diff evidence.
- [x] Documented the results in a separate GitHub issue.
- [x] Preserved the updated files in a separate local backup.
- [x] Kept the team's shared application code unchanged.
- [ ] Obtain frontend-owner review if the team chooses to adopt the refactor.
- [ ] Merge or deploy changes — not requested or performed.

### Results and Limitations

| Verification | Result |
|---|---|
| Trip Planner baseline | 16 PASS, 0 FAIL |
| Trip Planner after refactor | 17 PASS, 0 FAIL |
| Event Discovery regression | 29 PASS, 0 FAIL |
| Final automated verification | 46 PASS, 0 FAIL |
| Local production build | PASS |
| Git whitespace check | PASS |
| Shared repository integration | Not performed |

**Scope boundary:** This was a limited local refactor of `getEventMapLinks()`. The separate `getJourneyLinks()` function was not modified. No post-refactor live browser verification was performed.

**Evidence:** [Week 12 Trip Planner Issue](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/issues/209)

**Next action:** Preserve the local branch and evidence. Request review before any shared-repository integration. This optional work does not change the frozen MVP promise or the Google authentication QA disposition.


## Course sources

Adapted from the course [Week 12 one-pager](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/course-materials/blob/800d105afab78813afa42cd84ebfc27baa527eea/week-12/one-pager.md), [work checklist](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/course-materials/blob/800d105afab78813afa42cd84ebfc27baa527eea/week-12/work-checklist.md) and reusable QA, bug and peer-note templates linked there. The course's worked example is fictional; CampusVibes facts above come from the linked project receipts.
