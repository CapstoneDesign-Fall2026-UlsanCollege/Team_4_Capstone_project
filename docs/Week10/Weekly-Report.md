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
| PR(s) / commits | Pending — Add verified Week 10 PR or commit links after submission. |
| Screenshot / demo | [Week 10 Evidence Directory](Evidence/) — Existing preparation evidence; new screenshots pending. |
| Test/check note | [Prachi's November 4 Source Review](Evidence/prachi-ownership-review-2026-11-04.md), [Google Sign-In Historical Readiness Results](../../frontend/react-app/verification/google-signin-domain/results.json) |
| Document update | [Week 10 Code Ownership and Responsible AI Audit](ai-use-and-code-ownership-audit.md), [Final Demo Roadmap](../Week9/Final-demo-Roadmap.md) |
| Current codebase area map / ownership audit (link; update if changed) | [Codebase Area Map](ai-use-and-code-ownership-audit.md#codebase-area-map) |

## Individual contribution entries — one row per student

| Student | What they did | Evidence link |
|---|---|---|
| prachi2061 | Prepared the Week 10 ownership audit, reviewed the authentication code structure, and documented Google Sign-In entry, cancellation, and Firebase SDK handoff with AI-assisted drafting. Primary area: frontend authentication. Final explanation and backup confirmation are pending. | [#139](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/issues/139), [Source Review](Evidence/prachi-ownership-review-2026-11-04.md) |
|  |   |
|   |    |
|    |    |

## Blockers or risks

| Blocker/risk | Owner | Next action |
|---|---|---|
| Google Sign-In end-to-end verification remains incomplete. | Authentication team / `prachi2061` | Confirm provider configuration and independently verify login and session recovery. |
| Firestore event loading remains unverified. | Event/data implementation owner — to be confirmed | Verify event retrieval from Firestore and document actual results in Issue #117. |
| Week 10 student ownership confirmations are incomplete. | All team members | Confirm primary area, backup reviewer, code explanation, and AI-use declaration in Issue #139. |
| Independent authentication regression evidence is pending. | `ujjalpoudel75` — proposed | Run selected checks, document expected versus actual results, and attach screenshots or logs. |
| Historical testing could be mistaken for new Week 10 testing. | All team members | Clearly separate earlier results from tests independently executed during Week 10. |

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
