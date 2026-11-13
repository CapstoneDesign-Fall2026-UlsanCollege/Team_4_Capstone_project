
# Weekly Report

**Team:** 4 — CampusVibes  
**Week:** 11 — MVP Freeze and Final Demo Readiness  
**Date:** November 12–18, 2026  
**Status:** IN PROGRESS — MVP Freeze Verification

---

## This week's goal

Stabilize the CampusVibes MVP for the final demonstration by freezing the feature scope, prioritizing remaining work using P0–P3, and verifying required core functionality.

The team will focus on authentication, event discovery, Firestore integration, UI/UX stability, regression testing, documentation, and independent handoffs.

No new stretch features will be added during the MVP freeze unless a change is necessary to restore promised core behavior.

---

## What we committed to do

- [ ] Confirm the final MVP feature scope and freeze candidate.
- [ ] Assign P0–P3 priorities to outstanding issues based on actual evidence.
- [ ] Verify required authentication and session behavior.
- [ ] Complete remaining critical Firestore integration verification.
- [ ] Run core demo regression testing on the freeze candidate.
- [ ] Verify responsive UI, theme and accessibility behavior.
- [ ] Update testing evidence and documentation.
- [ ] Confirm outstanding code ownership and handoff requirements.
- [ ] Prepare the final demonstration and backup setup.

### Previously Completed Verification

- [x] Theme-toggle automated verification — PASS.
- [x] Existing Playwright smoke suite — 80 PASS.
- [x] PR #145 independent approval and merge.
- [x] November 11 theme/notification technical review — 8 PASS, 0 FAIL.
- [x] Firestore published-event query and display verified.
- [x] Event search/filtering and refresh behavior tested.
- [x] Firestore network reconnection verified.
- [x] Local Firestore security-rules tests — 40 PASS, 0 FAIL.
- [x] Week 10 code ownership and responsible AI documentation prepared.

**Note:** These are previous verification results, not new Week 11 regression runs.

---

## Evidence links

If it is not linked, it does not count.

| Evidence | Link |
|---|---|
| Issue(s) | [#117 — Firestore Event Loading](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/issues/117), [#116 — Authentication](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/issues/116), [#138 — Core Journey](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/issues/138), [#139 — Ownership Audit](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/issues/139) [#166-Firestore final verification](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/issues/166), [#167-Real google signin verification](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/issues/167)|
| PR(s) / commits | [PR #145 — Theme Toggle Verification](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/pull/145), [Theme Implementation Commit](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/commit/108d8b69181859d4c1ff2d6e049b26d353f9a094) |
| Screenshot / demo | [Week 10 Evidence](../Week10/Evidence/), [Firestore Test Evidence — #117](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/issues/117) |
| Test/check note | [November 11 Theme/Notification Technical Review](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/issues/139#issuecomment-6786608721) |
| Document update | [Week 10 Weekly Report](../Week10/Weekly-Report.md), [Final Demo Roadmap](../Week9/Final-demo-Roadmap.md), [UI/Theme Handoff](../Week10/DevyanaCT-UI-Theme-Handoff.md) |
| Current codebase area map / ownership audit (link; update if changed) | [Codebase Area Map](../Week10/ai-use-and-code-ownership-audit.md#codebase-area-map) |
| MVP Freeze final road map |[MVP Freeze final road map](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/blob/bacb83ad78044a7074eff1bd6e7d40546160ec49/docs/Week11/MVP-Freeze-Final-Road%20Map.md) |


---

## Individual contribution entries — one row per student

| Student | What they did | Evidence link |
|---|---|---|
| `DevyanaCT` |  |  |
| `prachi2061` | |   |
| `ujjalpoudel75` | |  |
| `tulseyy8848` |  |  |

**Note:** Each student must independently confirm or replace their Week 11 contribution entry with actual work and supporting evidence.

---

## Blockers or risks

| Blocker/risk | Owner | Next action |
|---|---|---|
| Real Google-account Sign-In and session persistence are not fully verified. | Authentication implementation support: `prachi2061`; QA: `ujjalpoudel75` | Verify successful Google login, session refresh, logout and re-login using an authorized test account. Determine whether this is required for the frozen core demo. |
| Firestore application-level permission-denied handling remains unverified. | Event/data implementation owner to confirm; verification: `DevyanaCT` | Test a controlled denied published-event read using the local Firebase Emulator. |
| Firestore application-level loading-error handling remains unverified. | Event/data implementation owner to confirm; verification: `DevyanaCT` | Test a controlled Firestore-specific failure and recovery without modifying production security rules. |
| Complete field mapping for additional published events is pending. | `DevyanaCT` — verification support | Compare additional Firestore documents against displayed event details. |
| Search and category selections reset after refresh. | UI/UX: `DevyanaCT`; implementation owner to confirm | Confirm whether the reset behavior matches the approved requirements. |
| Final freeze-candidate regression has not been recorded. | QA and Core Integration: `ujjalpoudel75` | Identify the freeze commit and run the core demo journey again. |
| Outstanding human explain-backs and handoff confirmations. | Relevant team members | Record required personal explanations, backup acceptance and independent checks in Issue #139. |
| Public testing screenshots may contain sensitive information. | Evidence contributors | Review and redact tokens, credentials and session identifiers before publication. |

---

## Decision record

Record only decisions that change scope, approach, ownership, or the next plan.

| Decision | Why we chose it | Owner | Evidence / Issue link |
|---|---|---|---|
| Proposed: Freeze the MVP scope and prioritize stabilization over new features. | Week 11 requires reliable core functionality and a stable final demonstration. | Team 4 — approval pending | [Final Demo Roadmap](../Week9/Final-demo-Roadmap.md) [MVP Freeze final road map](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/blob/bacb83ad78044a7074eff1bd6e7d40546160ec49/docs/Week11/MVP-Freeze-Final-Road%20Map.md) |
| Proposed: Prioritize work using P0–P3, separately from bug severity. | Work should be ordered by impact on the promised core demo and available testing evidence. | Team 4 — approval pending | Week 11 MVP Freeze guidance |
| Retain Firestore event loading as partially verified. | The published-event path and existing rules tests passed, but application-level error handling and complete additional field mapping remain unverified. | Verification support: `DevyanaCT` | [Issue #117](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/issues/117) |
| Defer optional stretch features until after freeze approval. | New features could introduce regression risk during final-demo preparation. | Team 4 — approval pending | [Final Demo Roadmap](../Week9/Final-demo-Roadmap.md) |

---

## Week 11 Priority Plan — P0–P3

These are proposed priorities and must be confirmed against the final promised MVP scope.

| Priority | Work | Reason |
|---|---|---|
| P0 — Conditional | Recover any confirmed blocker preventing the required Login → Dashboard → Discover → Details demo | Required core journey must work |
| P1 | Complete verification of any untested required Google Sign-In/session or Firestore behavior | Freeze readiness depends on required functionality |
| P2 | Additional Firestore field mapping, refresh requirement review, UI/accessibility checks, documentation and handoffs | Improves reliability and evidence |
| P3 | New optional animations, AI recommendations and additional community features | Stretch work deferred until after freeze |

**Priority Rule:** P-level expresses work order, not bug severity. A missing required core step takes precedence over optional enhancements.

---

## Next week's bridge task

- Confirm the approved MVP feature scope and freeze candidate commit.
- Complete or formally document outstanding authentication and Firestore requirements.
- Run the final core journey on the selected freeze candidate.
- Confirm theme and UI behavior on the final deployment.
- Complete remaining documentation, handoffs and evidence review.
- Prepare the final demonstration with an approved fallback for any remaining limitations.
- Keep stretch features deferred until freeze approval.

---

**Final Status:** IN PROGRESS — Week 11 MVP Freeze and Final Demo Readiness.

**Conclusion:** CampusVibes has substantial Week 10 verification evidence, including theme-toggle testing, core QA, Firestore event checks and security-rules testing. Week 11 focuses on verifying required outstanding steps, stabilizing the MVP, documenting remaining limitations and preparing the final demonstration.
