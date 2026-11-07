# Weekly Report

**Team:** 4 — CampusVibes  
**Week:** 10 — Sprint 2: MVP and Freeze  
**Date:** November 5–11, 2026  
**Status:** In Progress — Ownership Audit and Independent Verification

## This week's goal

Complete the Week 10 Code Ownership and Responsible AI Audit by identifying each member's code ownership area, explaining the related implementation, documenting AI assistance, and linking actual testing evidence. The team will focus on verifying existing CampusVibes functionality, improving accountability, and preparing a stable final demonstration without expanding the MVP scope.

## What we committed to do

- [x] Prepare the Week 10 ownership audit and identify major codebase areas.
- [x] Review existing authentication implementation and historical testing evidence.
- [ ] Confirm each member's primary code ownership area and backup reviewer.
- [ ] Complete individual code explanations and AI-use declarations.
- [ ] Perform and document an independent test or clearly identify an unverified gap.
- [ ] Update Issue #139 and the shared weekly report with confirmed evidence before November 11.

## Evidence links

If it is not linked, it does not count.

| Evidence | Link |
|---|---|
| Issue(s) | [#139 — Week 10 Ownership Audit](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/issues/139), [#116 — Authentication Testing](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/issues/116), [#138 — Account Verification](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/issues/138), [#117 — Firestore Event Loading](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/issues/117) |
| PR(s) / commits | [PR #145 — Devyana's Automated Theme Toggle Verification](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/pull/145), [Test Commit 0ab1359](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/pull/145/commits/0ab135933dd46233ae0d0d2f3072607b9a204bc9), [Original Theme Toggle Commit 108d8b6](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/commit/108d8b69181859d4c1ff2d6e049b26d353f9a094). Independent review of PR #145 pending. |
| Screenshot / demo | [Week 10 Evidence Directory](Evidence/) — Existing preparation evidence; new screenshots pending. |
| Test/check note | [Prachi's November 4 Source Review](Evidence/prachi-ownership-review-2026-11-04.md), [Google Sign-In Historical Readiness Results](../../frontend/react-app/verification/google-signin-domain/results.json) |
| Document update | [Week 10 Code Ownership and Responsible AI Audit](ai-use-and-code-ownership-audit.md), [Final Demo Roadmap](../Week9/Final-demo-Roadmap.md) |
| Current codebase area map / ownership audit (link; update if changed) | [Codebase Area Map](ai-use-and-code-ownership-audit.md#codebase-area-map) |

## Individual contribution entries — one row per student

| Student | What they did | Evidence link |
|---|---|---|
| prachi2061 | Prepared the Week 10 ownership audit, reviewed the authentication code structure, and documented Google Sign-In entry, cancellation, and Firebase SDK handoff with AI-assisted drafting. Primary area: frontend authentication. Final explanation and backup confirmation are pending. | [#139](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/issues/139), [Source Review](Evidence/prachi-ownership-review-2026-11-04.md) |
| `DevyanaCT` | **Light/Dark Theme Toggle — Automated UI Verification.** I previously contributed the CampusVibes Light/Dark Theme Toggle implementation in commit `108d8b6`. On November 7, 2026, I ran the existing Playwright smoke-test suite, and all 80 tests passed in approximately 5 minutes. I also created and successfully ran a dedicated Playwright test covering light-to-dark switching, accessible button label changes, theme persistence after page reload, and switching back to light mode. I submitted the new test in PR #145. My primary area is Frontend UI/UX, Theme and Accessibility, with `prachi2061` as proposed backup. ChatGPT assisted with generating the new automated test, explaining the code and preparing documentation. Independent teammate review remains pending. | [Original Theme Toggle Commit](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/commit/108d8b69181859d4c1ff2d6e049b26d353f9a094), [PR #145 — Automated Theme Toggle Test](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/pull/145), [Issue #139](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/issues/139) |
| `ujjalpoudel75` | Completed Week 10 QA and Core Integration testing on November 6–7, 2026. Independently verified six manual checks: Login/Dashboard, Event Search, Category Filtering, Event Details, Empty Search, and Session Refresh (6 PASS). Ran the existing Playwright suite: initial 79 PASS/1 FAIL due to a timeout, isolated retry PASS, and complete rerun 80 PASS. Also verified Google Sign-In popup cancellation and retry behavior. Primary area: QA and Core Integration; proposed backup: `DevyanaCT` (acceptance pending). ChatGPT assisted with test guidance, result interpretation, and documentation. Source-level explanation confirmation remains pending. | [Individual QA Evidence](Evidence/ujjalpoudel75-qa-testing.md), [Issue #138](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/issues/138), [Issue #139](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/issues/139) |
|    |    |

## Blockers or risks

| Blocker/risk | Owner | Next action |
|---|---|---|
| Google Sign-In end-to-end verification remains incomplete. | Authentication team / `prachi2061` | Confirm provider configuration and independently verify login and session recovery. |
| Firestore event loading remains unverified. | Event/data implementation owner — to be confirmed | Verify event retrieval from Firestore and document actual results in Issue #117. |
| Week 10 student ownership confirmations are incomplete. | All team members | Confirm primary area, backup reviewer, code explanation, and AI-use declaration in Issue #139. |
| Independent authentication regression evidence is pending. | `ujjalpoudel75` — proposed | Run selected checks, document expected versus actual results, and attach screenshots or logs. |
| Historical testing could be mistaken for new Week 10 testing. | All team members | Clearly separate earlier results from tests independently executed during Week 10. |
| Independent review of the Light/Dark Theme Toggle automated test is pending. | `DevyanaCT`; proposed reviewer `prachi2061` | Request review of PR #145, record the reviewer's findings, address any requested changes and update Issue #139 and the ownership audit before November 11. |

## Decision record

Record only decisions that change scope, approach, ownership, or the next plan.

| Decision | Why we chose it | Owner | Evidence / Issue link |
|---|---|---|---|
| Prioritize code ownership and verification instead of adding new features. | The MVP should remain stable for the final demonstration. | Team 4 | [Final Demo Roadmap](../Week9/Final-demo-Roadmap.md) |
| Maintain one shared ownership audit and weekly report. | Ensures traceable responsibilities and avoids duplicate or conflicting records. | Team 4 | [Ownership Audit](ai-use-and-code-ownership-audit.md), [#139](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/issues/139) |
| Propose authentication regression verification as Ujjal's Week 10 focus, subject to acceptance. | Builds on existing password reset and Google Sign-In testing evidence while identifying remaining session verification gaps. | `ujjalpoudel75` — proposed | [#116](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/issues/116), [#138](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/issues/138) |
| Keep incomplete authentication and Firestore checks explicitly unverified. | Avoids claiming untested functionality works and preserves accurate final-demo reporting. | Team 4 | [#116](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/issues/116), [#117](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/issues/117) |

## Next week's bridge task

- **Week 11 — November 12:** Review completed code ownership declarations, independent test evidence, and unresolved authentication or Firestore issues. Update the final-demo roadmap based on verified results.
- Continue regression testing of the core CampusVibes user journey, resolve confirmed blockers where feasible, and preserve documented fallback behavior for features that remain incomplete.

**Week 10 submission deadline:** November 11, 2026, end of day (KST).
