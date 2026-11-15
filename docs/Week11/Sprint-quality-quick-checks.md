# Sprint Quality Quick Checks

Complete the section for your current sprint at its final class meeting. These are quick evidence checks, not a demand for a perfect product.

## Sprint 0 - Launch and Scope (Week 3)

- [x] Every member can access the repository and board.
- [x] Meaningful work has an Issue, owner, and Definition of Done.
- [x] The project purpose, target user, and scope boundary are visible.
- [x] The team agreement is linked and current.
- [x] No personal data, secrets, or unapproved real-user data has been posted.

## Sprint 1 - Vertical Slice (Week 7)

- [x] One small end-to-end user path works or its blocker is clearly documented.
- [x] The path has a screenshot, demo, or test note.
- [x] The team can explain what happens when the main path cannot complete.
- [x] The README or setup note tells another person how to view or run the current work.
- [x] The team has checked that no secrets or private data are in its shared evidence.

### October 20 Technical Check and Human Follow-Up

The [production core/fallback record](./Evidence/core-path-2026-10-20/check-note.md) verifies email/password login, Dashboard -> Discover -> search/filter -> Event Details from clean desktop/mobile browser contexts. It also records empty-search recovery and an injected sign-in network failure followed by a real successful retry. Exact revision, browser/viewports, expected/actual results, timings and screenshots are linked there.

These are Codex-assisted automated checks for `prachi2061`, not independent teammate testing or the 3-5 minute presentation. The unchecked team-explanation item above stays pending until the speakers actually explain the fallback. The [demo script](./midterm-demo-script.md#failure-and-fallback) now states it explicitly. Existing historical checkmarks do not certify new human activity or a fresh clean-checkout run.

The new proof uses only a synthetic account, masks login inputs, and records deletion of the account and its test records. Each member must still review their own shared material before the final presentation. Discover remains code-based sample data; Firestore event loading is unverified in [Issue #35](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/issues/35).

**Pre-rehearsal rubric review:** strength - a narrow path with direct current proof and an explicit data boundary. Highest-value improvement - complete the real timed team explanation, with confirmed speakers and each student's receipt. This is not a graded rubric score. See the [course rubric](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/course-materials/blob/main/student-starter-kit/docs/midterm-presentation-rubric.md).

## Sprint 2 - MVP and Freeze (Week 11)

Updated November 16, 2026 KST from the [filled MVP checklist](MVP-Verification-Checklist.md). These are scoped evidence checks, not team approval. Open items have an owner/support path and next check in [#177](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/issues/177), due November 18 EOD KST.

- [ ] The MVP happy path has been tested and recorded on the selected final candidate.
- [ ] Demo-relevant known bugs have an appropriate severity and owner/plan, with required runtime risks resolved or explicitly accepted.
- [ ] The team confirms frozen scope and its evidence-based route.
- [x] Basic input/error handling has evidence or a documented limitation: see the checklist's explicit #166 runtime gaps and existing automated proof.
- [ ] AI assistance is attributed and the affected work has the required personal explain-back/independent handoff.
- [ ] Current areas/checks/support are linked and the necessary independent candidate repeat is recorded.

| Item still open | Existing evidence / exact gap | Owner or support | Next check |
|---|---|---|---|
| Candidate happy path | Ujjal's November 14 core checks and Devyana's November 15 Google/session checks passed; neither records the exact final freeze revision | Prachi coordinates; Ujjal QA and Devyana independent auth evidence | Record SHA and expected/actual required steps, including a boundary, in #138/#167 and #177 |
| Bugs/risks | [Checklist risk table](MVP-Verification-Checklist.md); closed privacy/Friends fixes retain their scope; #166 runtime errors/mapping remain untested | Prachi coordinates with Devyana; implementation owner confirmed before a fix | Complete exact runtime checks or document blocker and team fallback decision; do not label an assumption a bug |
| Team freeze decision | Recovery/verification route recommended; final approval pending | team | Ratify scope/candidate/route from evidence by November 18 EOD KST |
| Personal understanding | [AI-use audit](../Week10/ai-use-and-code-ownership-audit.md); prepared explanations are not human explain-backs | Prachi| Explain one source path and a meaningful failure, record unclear parts, obtain a named check or exact blocker |
| Area/independent repeat | [Area map](../Week10/ai-use-and-code-ownership-audit.md#codebase-area-map); Ujjal accepted bounded QA backup; Devyana's independent auth receipt exists | Existing stewards/QA, Prachi coordinates | Candidate-specific independent attempt with tester/setup/result and limits; keep role acceptance separate from completed API tests |

[Roadmap checkpoint](<MVP-Freeze-Final-Road Map.md>) and [one shared report](Weekly-Report.md) link this evidence. No application change or new runtime result was produced for this quality-record update. Historical Sprint 0/1 records and Sprint 3/4 sections below are unchanged.

## Sprint 3 - QA and Handoff (Week 14)

- [ ] Main demo path, error/empty state, and key links or buttons have been checked.
- [ ] Keyboard access, visible labels, and readable contrast have received a basic review.
- [ ] Setup and handoff instructions work for someone outside the team.
- [ ] The project has safe demo data and no secrets or private data in shared evidence.
- [ ] Demo fallback and remaining blocker plan are documented.

## Sprint 4 - Final Readiness (Week 15)

- [ ] The final demo has been rehearsed with its fallback plan.
- [ ] Presentation and demo roles are assigned.
- [ ] Final evidence, contribution receipts, setup guide, and handoff links are easy to find.
- [ ] Blocker and major-bug status is honest and current.
- [ ] The Final Readiness Report names any remaining action and owner.
