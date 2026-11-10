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
- [x] Perform and document independent tests or clearly identify unverified gaps. Evidence includes theme-toggle automation, QA regression checks, Firestore published-event verification, and security-rules testing.
- [x] Update the shared weekly report with confirmed evidence before November 11.

## Evidence links

If it is not linked, it does not count.

| Evidence | Link |
|---|---|
| Issue(s) | [#139 — Week 10 Ownership Audit](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/issues/139), [#116 — Authentication Testing](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/issues/116), [#138 — Account Verification](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/issues/138), [#117 — Firestore Event Loading](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/issues/117) |
| PR(s) / commits | [PR #145 — Theme Toggle Automated Verification](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/pull/145), [Test commit 0ab1359](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/pull/145/commits/0ab135933dd46233ae0d0d2f3072607b9a204bc9), [Original theme implementation commit 108d8b6](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/commit/108d8b69181859d4c1ff2d6e049b26d353f9a094). PR #145 approved by `prachi2061`; GitHub checks passed. |
| Screenshot / demo | [Week 10 Evidence Directory](Evidence/) [Available in Comment](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/issues/117#issuecomment-6731361245) |
| Test/check note | [Prachi's November 4 Source Review](Evidence/prachi-ownership-review-2026-11-04.md), [Google Sign-In Historical Readiness Results](../../frontend/react-app/verification/google-signin-domain/results.json) |
| Document update | [Week 10 Code Ownership and Responsible AI Audit](ai-use-and-code-ownership-audit.md), [Final Demo Roadmap](../Week9/Final-demo-Roadmap.md) |
| Current codebase area map / ownership audit (link; update if changed) | [Codebase Area Map](ai-use-and-code-ownership-audit.md#codebase-area-map) |
| Work-checklist | [Work-checlist.md](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/blob/main/docs/Week10/Work-checklist.md) |
| Evidence | [Evidence folder](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/tree/0108e39f2465e7e09b5093f73f6558ee678f3858/docs/Week10/Evidence)

## Individual contribution entries — one row per student

| Student | What they did | Evidence link |
|---|---|---|
| prachi2061 | Prepared the Week 10 ownership audit, reviewed the authentication code structure, and documented Google Sign-In entry, cancellation, and Firebase SDK handoff with AI-assisted drafting. Primary area: frontend authentication. Final explanation and backup confirmation are pending. November 9: prepared the existing poster API/persistence handoff, linked success/failure evidence and the independent-review steps, and confirmed on November 9 that automatic duplicate detection is deferred until after the Week 11 freeze, retaining manual review. New API peer review and backup acceptance remain pending. <br>**November 9 — suggestion posters and regression evidence:** Delivered poster upload, persistent drafts, reviewer previews and published event images in PR #154; added failure/control tests and issue tracking in PR #159 with Codex assistance. Implementation evidence: 36 unit/API/account cases, 44 permission cases, 12 related UI cases and 20 signed-in emulator workflow checks PASS. Later regression evidence: 37 focused cases and 16 desktop/mobile cases PASS. Provider-mock/emulator results are separate from read-only production readiness. Styling issue #156 is closed; cleanup recovery #157 and independent real-provider testing #158 remain open. This remains supporting work outside the frozen core. | [#139](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/issues/139), [Source Review](Evidence/prachi-ownership-review-2026-11-04.md), [API/persistence handoff](Prachi-API-Persistence-Handoff.md), [Exceeds readiness](Evidence/prachi-2026-11-09.md), [PR #154](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/pull/154), [Poster implementation receipt](../../frontend/react-app/verification/suggestion-posters/results.json), [PR #159](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/pull/159), [Poster regression receipt](../../frontend/react-app/verification/suggestion-posters/follow-up/results.json), [Bug/test follow-up note](../../frontend/react-app/verification/suggestion-posters/follow-up/review.md), [Open #157](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/issues/157), [Open #158](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/issues/158), [Professor-feedback follow-up](Evidence/prachi-2026-11-09.md#professor-feedback-follow-up) |
| `DevyanaCT` | Completed Light/Dark Theme Toggle automated verification and Firestore testing. Ran 80 Playwright smoke tests successfully, created a dedicated theme-toggle test (PASS locally), and received independent approval from `prachi2061` on PR #145. Also ran Firestore security-rules automation (34 passed, 0 failed). On November 9, verified that CampusVibes queries `campusPublishedEvents` and displays the published event `story time` with matching details. The network request returned HTTP 200. ChatGPT assisted with testing instructions and documentation. Primary area: Frontend UI/UX, Theme and Accessibility. | [PR #145](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/pull/145), [Issue #117 — Firestore Verification](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/issues/117), [Issue #139 — Ownership Audit](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/issues/139) [DevyanaCT Handoff](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/blob/421444d2eee3993c36cb6d085bb4a9fd753cfa8c/docs/Week10/DevyanaCT-UI-Theme-Handoff.md)|
| `ujjalpoudel75` | Completed Week 10 QA and Core Integration testing on November 6–7, 2026. Independently verified six manual checks: Login/Dashboard, Event Search, Category Filtering, Event Details, Empty Search, and Session Refresh (6 PASS). Ran the existing Playwright suite: initial 79 PASS/1 FAIL due to a timeout, isolated retry PASS, and complete rerun 80 PASS. Also verified Google Sign-In popup cancellation and retry behavior. Primary area: QA and Core Integration; proposed backup: `DevyanaCT` (acceptance pending). ChatGPT assisted with test guidance, result interpretation, and documentation. Source-level explanation confirmation remains pending. | [Individual QA Evidence](Evidence/ujjalpoudel75-qa-testing.md), [Issue #138](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/issues/138), [Issue #139](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/issues/139) |
|tulseyy8848    | Contributed to independent application testing and local setup verification. Started the Vite development server using VS Code, tested the Dashboard and Discover Events page, checked the Music category filter, opened event details, and verified the Game Devs Guild club popup. Documented testing results, identified application limitations, and supported the team's backup demo and development handoff (Issue #118).  |https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/issues/118 https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/issues/118#issuecomment-6759819042|

## Blockers or risks

| Blocker/risk | Owner | Next action |
|---|---|---|
| Google Sign-In end-to-end verification remains incomplete. | Authentication team / `prachi2061` | Confirm provider configuration and independently verify login and session recovery. |
| Firestore published-event query and display verified for the tested event; broader search/filter and failure-handling checks remain pending. | Event/data implementation owner — to be confirmed; verification by `DevyanaCT` | Complete additional Firestore event search/filter, refresh, and error-handling tests. See [Issue #117](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/issues/117). |
| Week 10 student ownership confirmations are incomplete. | All team members | Confirm primary area, backup reviewer, code explanation, and AI-use declaration in Issue #139. |
| Independent core-journey QA testing was completed by ujjalpoudel75 on November 6–7, 2026. Six manual checks passed, and the complete Playwright rerun passed 80/80 tests. Google Sign-In popup cancellation and retry were verified, but full Google-account login and session restoration remain unverified. | ujjalpoudel75 — QA and Core Integration | Preserve the completed QA evidence in [Week 10 QA Report](Evidence/ujjalpoudel75-qa-testing.md) and [Issue #138](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/issues/138). Complete the remaining Google authentication verification in [Issue #116](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/issues/116) and source-level ownership explanation in [Issue #139](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/issues/139). |
| Historical testing could be mistaken for new Week 10 testing. | All team members | Clearly separate earlier results from tests independently executed during Week 10. |
| Light/Dark Theme Toggle automated test received independent approval; documentation and final integration status should remain current. | `DevyanaCT`; reviewer `prachi2061` | PR #145 received an approving review and passed GitHub checks. Record this evidence in Issue #139 and the ownership audit; confirm merge status separately. |


## Decision record

Record only decisions that change scope, approach, ownership, or the next plan.

| Decision | Why we chose it | Owner | Evidence / Issue link |
|---|---|---|---|
| Prioritize code ownership and verification instead of adding new features. | The MVP should remain stable for the final demonstration. | Team 4 | [Final Demo Roadmap](../Week9/Final-demo-Roadmap.md) |
| Maintain one shared ownership audit and weekly report. | Ensures traceable responsibilities and avoids duplicate or conflicting records. | Team 4 | [Ownership Audit](ai-use-and-code-ownership-audit.md), [#139](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/issues/139) |
| Confirm QA and Core Integration testing as Ujjal's Week 10 responsibility. | Ujjal completed six manual core-journey checks (6 PASS), ran the Playwright suite with a successful 80/80 full rerun, and verified Google Sign-In popup cancellation and retry. Full Google-account authentication and source-level explain-back remain pending. | ujjalpoudel75 — QA and Core Integration (backup acceptance pending) | [Issue #138](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/issues/138), [Issue #139](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/issues/139) |


## Next week's bridge task

- **Week 11 — November 12:** Review completed code ownership declarations, independent test evidence, and unresolved authentication or Firestore issues. Update the final-demo roadmap based on verified results.
- Continue regression testing of the core CampusVibes user journey, resolve confirmed blockers where feasible, and preserve documented fallback behavior for features that remain incomplete.
- **Firestore follow-up:** Continue verification of search and category filters with multiple Firestore-published events, event persistence after refresh, and loading/permission-error handling. Week 10 confirmed the `campusPublishedEvents` query, the published event `story time`, and 34 passing Firestore security-rules tests. Track remaining work in [Issue #117](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/issues/117).


**Week 10 submission deadline:** November 11, 2026, end of day (KST).
