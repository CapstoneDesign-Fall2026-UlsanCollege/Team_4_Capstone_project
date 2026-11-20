# Week 12 Work Checklist

**Team:** 4, CampusVibes. **Class:** November 19, 2026. **Prepared:** November 20, 2026. **Due:** November 25, 2026, end of day Asia/Seoul.

**Sprint 3:** QA and Handoff. **Preparation owner:** `prachi2061`. **Current state:** target and documents prepared; Week 12 execution pending.

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

- [ ] Confirm availability of a reviewer outside the repair work. `ujjalpoudel75` is the proposed reviewer through the existing QA role; a new run is not accepted or completed by this plan.
- [ ] Record actual date, candidate SHA/URL, browser/version, starting session state and expected/actual results.
- [ ] Use normal Chrome for real identity selection. If Google blocks an automated browser, record that setup limitation and use the manual route.
- [ ] Capture redacted proof and complete the reviewer-owned fields in the peer notes.
- [ ] Classify the original mismatch as reproduced, not reproduced, not tested, or a successful targeted post-fix retest.

## Triage from the current result

- [ ] For a confirmed mismatch, safely repeat the same condition once and update #167/#177 with proof, separate severity and P-level, owner and next check.
- [ ] For a genuine blocker, record the exact failing step, available path, owner and next discriminating check.
- [ ] For a successful post-fix check, link before/repair/after evidence and limit the conclusion to the authentication cases exercised.
- [ ] Do not call an old bug fixed solely because it did not recur under different conditions.
- [ ] Keep P1 until current evidence justifies a change. P0 applies if the promised path is actually blocked; P2 follows only after the inherited target has a supported disposition.
- [ ] Open a fix PR only if a new bounded change is justified. Use the course [work policy](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/course-materials/blob/800d105afab78813afa42cd84ebfc27baa527eea/student-starter-kit/docs/project-work-policy.md) and [PR note](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/course-materials/blob/800d105afab78813afa42cd84ebfc27baa527eea/student-starter-kit/templates/pr-with-ai-use-note.md).

## Close the evidence loop

- [x] Prepare the one shared [Week 12 report](Weekly-Report.md) and Prachi's documentation contribution.
- [ ] Each other member enters their own Week 12 contribution and evidence.
- [ ] Link the current peer result and issue disposition from the report. Update the existing roadmap only if new evidence changes a risk, fallback or next priority.
- [ ] Update the area map only if the boundary, check or support path changes.
- [ ] By November 25 EOD KST, record the disposition, evidence, next action and actual owner.

| Next action | Coordination or existing support | Evidence needed |
|---|---|---|
| Arrange and record the targeted peer retest | Prachi coordinates; Ujjal proposed through the existing QA role; Devyana is the existing auth QA backup | Reviewer acceptance, actual QA results and peer note |
| Decide whether the inherited validation risk can change priority | Prachi with the actual tester | New proof linked to #167/#177; no priority change from documentation alone |

## Course sources

Adapted from the course [Week 12 one-pager](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/course-materials/blob/800d105afab78813afa42cd84ebfc27baa527eea/week-12/one-pager.md), [work checklist](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/course-materials/blob/800d105afab78813afa42cd84ebfc27baa527eea/week-12/work-checklist.md) and reusable QA, bug and peer-note templates linked there. The course's worked example is fictional; CampusVibes facts above come from the linked project receipts.
