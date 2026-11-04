# Week 9 Work Checklist — Lessons to Final Demo Roadmap

**Date:** Thu 2026-10-29 to Wed 2026-11-04  
**Team:** 4 – CampusVibes

> Use evidence and lessons to choose a feasible route to the final demo. Keep the next step specific and owned.

## Core work — complete all

### Start from lessons and evidence

- [x] Bring midterm feedback and current project evidence, such as a test note, demo proof, Issue, pull request, setup note, or user-feedback record.
- [x] Be ready to debrief the midterm and first half of the semester with the instructor: bring one lesson, supporting evidence or example, and a question for the roadmap.
- [x] Name one course lesson about how the team works or records evidence.
- [x] Consider lessons from scope decisions, vertical slices, testing, ownership, documentation, or rehearsal; choose one that matters to this project.
- [x] Name one project lesson learned from building, testing, or feedback.
- [x] Link the evidence or describe the specific experience behind each project lesson.
- [x] Write what the team will change or continue because of each lesson.

### Set the roadmap destination

- [x] Describe the final demo claim: who it helps, what path it shows, and what proof supports it.
- [x] State what the demo will not claim, including simulated, incomplete, or unverified behavior.
- [x] Record what is currently working, what is partly working, and what is not yet verified; link proof.
- [x] Decide whether the project has met its MVP goal. If not, define the smallest credible path to close the gap by Week 11 using the MVP Contract.

### Map the route through Week 16

- [x] Fill the Week 10–16 milestone rows in the Final Demo Roadmap.
- [x] Give each milestone a checkable result, a proposed named owner/checker, evidence to save, and a failure fallback.
- [x] Keep Week 11 focused on MVP verification and the feature-freeze decision.
- [x] Include QA and bug triage, the Week 13 handoff trial, the Week 14 demo lock, Week 15 readiness, and Week 16 handoff in the plan.
- [x] Create or update Issues with owners for the next one or two weeks; do not create detailed tickets for every distant milestone before its dependencies are known.
- [x] Add a fallback for the biggest risk that could disrupt the final demo or handoff.

### Review and record

- [ ] Compare roadmaps with another team; make sure each team can explain its route.
- [ ] Ask one question that tests a claim, assumption, or checkpoint.
- [ ] Offer one specific suggestion tied to evidence, ownership, route, or a milestone.
- [x] Revise the roadmap's broad completion claims and unnamed checkpoints using the feedback.
- [ ] Complete the shared report requirement: each student authors or confirms their own contribution and evidence row.
- [ ] Check that shared evidence contains no secrets, private data, or unapproved real-user data.

## Evidence to link

**November 4 ownership update:** The [AI-use audit and code-area map](ai-use-and-code-ownership-audit.md), [source-review note](Evidence/prachi-ownership-review-2026-11-04.md) and [ownership section in the single Week 9 report](Weekly-Report.md#ai-use-and-code-ownership--november-4) record Prachi's contribution. Role acceptance, student explanation confirmations and the named independent check remain pending in [#139](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/issues/139).

**November 2 status:** The Final Demo Roadmap has scoped current results and seven planned milestone rows with proposed owners/checkers, checks, evidence, and fallbacks. These documentation items do not certify owner acceptance or execution of future milestones.

The single shared Weekly Report names all four GitHub logins and links contribution receipts, but member-authored or confirmed wording remains incomplete.

Use the independent-test handoff and Issue #188 for the existing local backup setup evidence and its limitations.

- [x] Final Demo Roadmap, with lessons, current-state proof, milestones, and owners.
- [ ] Evidence behind the course and project lessons.
- [x] Issues for the next one or two weeks.
- [x] Risk or blocker record and fallback action.
- [x] Shared Weekly Report with a row from every student authored or confirmed by that student.

## Stretch menu — optional after the core work

Choose an extension only if the roadmap and next actions are clear.

### Stronger final demo

- [ ] Ask a person outside the build discussion to restate the intended demo claim after reading the roadmap.
- [x] Test the proposed live-demo fallback or local setup instructions. (Issue #188 – local application startup and website screenshots.)
- [x] Prune obsolete backlog items that do not support the final demo or handoff.

### Stronger quality

- [ ] Define one evidence-based quality improvement, such as setup reliability, accessibility, or a high-value usability fix.
- [ ] Add a measurable check and owner without weakening the Week 11 freeze target.

## Progress adjustment

- If the MVP is already met, plan improvements to reliability, usability, evidence, documentation, and handoff. Add features only when the team can explain the need and fit them before the Week 11 freeze.
- If the MVP is not yet met, prioritize the smallest path that closes the gap by Week 11. Move optional work out of the finish path and ask the instructor about a blocking dependency.

## Risks and exceptions

If a core item is incomplete, record the reason, owner, and next action in GitHub.

| Item | Owner | Next action | Review point |
|---|---|---|---|
| Firestore Event loading is unverified. | prachi2061 and ujjalpoudel75 | Test an identified database Event and record actual success/failure or the specific blocker in #117. | Week 11 |
| Completed Google authentication and password reset need stepwise evidence; the domain is repaired. | prachi2061 and ujjalpoudel75 | Record completed account/session and reset-email → change → changed-password-login results in #116, or keep the missing steps NOT TESTED. | Before Nov 4 / Week 11 |
| Supporting-feature regression testing has remaining checks. | DevyanaCT | Finish AI Assistant and Suggestions verification and document upload limitations. | Week 11 |
| Local setup must remain available as a demo fallback. | DevyanaCT and tulseyy8848 | Keep the local setup instructions and testing evidence available. | Before final demo |

## Final check

- [ ] Every teammate can explain the next milestone, their own action, and the evidence that will show progress by Wed Nov 4.
- [x] The roadmap ends at a truthful final demo and handoff, and each near milestone has an owner and check.
