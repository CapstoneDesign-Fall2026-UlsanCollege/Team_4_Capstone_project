
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
- [ ] Verify the CampusVibes local development setup on the selected MVP freeze candidate.

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
| Week 11 Firestore Verification | [Issue #166 — Firestore Integration Error Handling and Final Verification](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/issues/166) — Emulator HTTP 403 PASS, offline/online recovery PASS, browser request-blocking recovery PASS, second published-event comparison 8 PASS/0 FAIL, independent reviewer-reported 8 PASS/0 FAIL. Application-level terminal error checks pending. |

---

## Individual contribution entries — one row per student

| Student | What they did | Evidence link |
|---|---|---|
| `DevyanaCT` | **Week 11 — Independent Authentication QA and Firestore Verification:** Independently verified Google Sign-In, Dashboard, session persistence, logout/re-login and Remember Me — **5 PASS, 0 FAIL**. Configured local Firebase Authentication and Firestore Emulators and inspected published-event security rules, listeners, loading/error states and Retry implementation. Verified an unauthenticated read-only Firestore Emulator GET returned **HTTP 403 Forbidden**. Completed second published-event field comparison — **8 PASS, 0 FAIL**; independent reviewer `tulseyy8848` also reported **8 PASS, 0 FAIL**. Verified offline cached-event availability (14 published + 9 sample listings), recovery after reconnection and production Firestore Listen HTTP 200. Temporarily blocked Firestore requests through Chrome DevTools, confirmed Discover remained usable with 9 sample listings, and verified 14 published events returned after disabling blocking. Documented search/category reset after refresh. Actual application-level permission-denied and terminal loading-error/Retry remain pending. No application source code, Firestore security rules or database records were modified. | [#167 — Independent Authentication QA](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/issues/167#issuecomment-6889397205), [#166 — Firestore Final Verification](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/issues/166), [Independent Published-Event Review](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/issues/166#issuecomment-6906530940) |
| `prachi2061` | November 15: owned the member-ID display privacy fix across Feed, Friends, Messages, Profile and accessible labels; public names/colleges/photos remain. Codex-assisted checks: 49 rules, 5 units, 7 privacy assertions within the photo workflow, five social workflow suites and 46 desktop/mobile smoke cases PASS; build PASS. Production evidence covers guest UI/served code only; authenticated production privacy and independent human review remain pending. Supporting work outside the frozen Events demo path. November 15: delivered the sidebar-only accepted-friends correction with 100+ connection loading (PR #176); dated automated proof includes 3 units, 1 SDK/rules integration, 125-friend UI checks, 49 rules and 118 smoke cases. November 16: prepared the roadmap-aligned MVP checklist, priority/recovery assessment, Sprint 2 evidence links and own contribution update; no new runtime run, human explain-back or team approval is claimed. November 18: Codex-assisted reconciliation of current professor feedback and next-check owners; Prachi confirmed no approved candidate. Candidate SHA, team sign-off and final regression remain pending; no new runtime result or team approval is claimed. November 18: instructed a bounded MVP scope freeze and pinned candidate `e5f1888`; Codex-assisted local checks passed (build, 28 units, 24 desktop/mobile browser cases). Team release approval, independent candidate regression and remaining human/runtime gates stay pending. November 18 follow-up: added a guarded runtime recovery harness; 7 poster API, 4 permission and 18 authenticated local/emulator/browser checks PASS. The terminal loading failure is callback-injected; production/independent limits are retained. Reconciled Ujjal's existing bounded QA backup acceptance; personal source explanation and actual team sign-off remain pending. Added a concise source-linked explanation of poster upload, pending submission, reviewer publication and upload-failure recovery; existing review and team sign-off status remain unchanged. November 18 candidate handoff: reconciled the completed independent backup/core receipts and repaired Google authorization for the exact pinned deployment hostname. Live desktop/mobile provider-page and popup recovery were observed; the initial timing failure is retained. Real-account Google re-login and final team sign-off remain pending. November 18 manual follow-up: reported overall PASS in normal Chrome after the candidate Google-hostname repair for the requested Google/Dashboard/refresh/logout/re-login sequence. Recorded one user confirmation, with no new per-step test count or independent teammate result; earlier automated-browser rejection is retained. | [Bug #172](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/issues/172), [PR #173](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/pull/173), [Week 11 bug report](Evidence/prachi-member-id-privacy-bug-report-2026-11-15.md), [recorded production check](Evidence/prachi-member-id-privacy-production-2026-11-15.json), [code/test receipt](../../frontend/react-app/verification/member-id-privacy/results.json), [Friends PR #176](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/pull/176), [Friends proof](Evidence/friends-sidebar-2026-11-15.md), [MVP checklist](MVP-Verification-Checklist.md), [Prachi requirements/next actions](Evidence/prachi-week11-requirements-2026-11-16.md), [follow-up #177](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/issues/177), [November 18 follow-up](Evidence/prachi-week11-feedback-2026-11-18.md), [MVP scope freeze/candidate](MVP-Freeze-Record.md), [candidate automation receipt](Evidence/mvp-candidate-checks-2026-11-18.json), [candidate runtime and handoff receipt](Evidence/prachi-candidate-runtime-2026-11-18.md), [short source explanation](Evidence/prachi-short-code-explanation.md), [runtime verification PR #182](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/pull/182), [runtime results JSON](Evidence/prachi-candidate-runtime-2026-11-18.json), [six runtime screenshots and repeat steps](Evidence/prachi-candidate-runtime-2026-11-18.md#screenshot-evidence), [source explanation PR #183](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/pull/183), [scope-freeze PR #181](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/pull/181), [exact candidate e5f1888](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/commit/e5f1888aa4600ac2013d6bda34a55554ba68195f), [candidate Google-domain repair and next owners](Evidence/prachi-candidate-google-domain-2026-11-18.md), [live readiness receipt](Evidence/prachi-candidate-google-domain-2026-11-18.json), [manual Google follow-up receipt](Evidence/prachi-google-manual-pass-2026-11-18.md) |
| `ujjalpoudel75` | Completed Week 11 QA testing: Google Sign-In, Dashboard, session persistence, logout/re-login, Remember Me and email verification — 10 reported scenarios PASS, 0 FAIL. Verified the authenticated core journey. Independently tested Share Event, Copy Link, shared event navigation, refresh and cancellation recovery — 6 PASS, 0 FAIL, with two screenshots. Received independent Google authentication review from `DevyanaCT` — 5 PASS, 0 FAIL. Final freeze-candidate regression remains pending. | [#167 — Authentication QA](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/issues/167), [#138 — Core Journey](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/issues/138), [#168 — Share Event QA Evidence](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/issues/168#issuecomment-6895913744) |
| `tulseyy8848` | Completed an independent Week 11 published-event verification for CampusVibes. Compared an existing published Firestore event with the CampusVibes Discover page and Event Details page. Independently verified all eight fields: title, category, date, time, location, host, description, and image/fallback behavior. Recorded **8 PASS, 0 FAIL**, confirmed that all fields matched the published Firestore data, and found no mismatches. Followed a read-only verification approach without modifying application code, Firestore security rules, or database records. **November 18 — Frozen Candidate Local Setup and Automated Testing:** Checked out candidate `mvp-candidate-2026-11-18` (`e5f1888aa4600ac2013d6bda34a55554ba68195f`), installed dependencies using `npm.cmd ci`, started the local Vite development server, and completed local application checks. Production build completed successfully. Installed Playwright Chromium and ran the complete desktop/mobile smoke-test suite: **118 PASS, 0 FAIL, 0 skipped (5.5 minutes)**. Attached setup, build, application, and test screenshots to Issue #118. **November 18 — Independent Frozen Candidate Regression:** Verified the exact frozen candidate deployment, landing page, login, session persistence after refresh, Discover Events, search functionality, category filtering, Event Details, and back navigation. Recorded **9 PASS, 0 FAIL**, with seven screenshots documenting the verification. **Backup Handoff:** DevyanaCT independently repeated the pinned candidate local setup in a separate Git worktree and reported PASS for the tested setup and application scope. Independent backup verification is now documented in Issue #118. **Remaining:** Independent candidate-specific Firestore runtime review, search/filter refresh requirement confirmation, and final team freeze approval remain pending. These results do not claim that all Firestore runtime requirements or final team release approval are complete. | [Published-Event Verification / Independent Review](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/issues/166#issuecomment-6906530940), [Frozen Candidate Local Setup and Smoke Test](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/issues/118#issuecomment-6958484427), [Independent Frozen Candidate Regression](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/issues/138), [Independent Backup Verification](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/issues/118) |

**Note:** Each student must independently confirm or replace their Week 11 contribution entry with actual work and supporting evidence.

---

## Blockers or risks

| Blocker/risk | Owner | Next action |
|---|---|---|
| Final authentication regression on the approved freeze candidate remains pending. | QA: `ujjalpoudel75`; Independent reviewer: `DevyanaCT` | Real Google Sign-In and session testing passed, and DevyanaCT independently verified 5 scenarios (5 PASS, 0 FAIL) in #167. Repeat regression on the approved freeze candidate when selected. |
| Firestore application-level permission-denied handling remains unverified. | Verification: `DevyanaCT`; implementation support: `prachi2061` | Emulator-level unauthorized GET returned HTTP 403, but the application's own published-event listener `permission-denied` callback was not reproduced. Complete a controlled application-level runtime test or record an explicit team decision about the limitation in #166/#177. |
| Firestore application-level loading-error and error-state Retry remain unverified. | Verification: `DevyanaCT`; implementation support: `prachi2061` | Offline/online recovery and browser request-blocking/recovery passed. However, neither test triggered the application's terminal loading-error callback. Complete a controlled runtime test or document the remaining limitation and obtain a team decision. |
| Published-event field comparison and independent review | `DevyanaCT`; independent reviewer: `tulseyy8848` | COMPLETED — Second published-event comparison 8 PASS, 0 FAIL; independent reviewer also reported 8 PASS, 0 FAIL. Four supporting screenshots and review evidence are linked in Issue #166. No further action required for this specific comparison; separate application-level Firestore runtime error tests remain pending. |
| Search and category selections reset after refresh. | UI/UX: `DevyanaCT`; implementation owner to confirm | Confirm whether the reset behavior matches the approved requirements. |
| Final freeze-candidate regression has not been recorded. | QA and Core Integration: `ujjalpoudel75` | Identify the freeze commit and run the core demo journey again. |
| Outstanding human explain-backs and handoff confirmations. | Relevant team members | Record required personal explanations, backup acceptance and independent checks in Issue #139. |
| Public testing screenshots may contain sensitive information. | Evidence contributors | Review and redact tokens, credentials and session identifiers before publication. |
| Final-demo local setup and backup handoff have not yet been independently verified on the MVP freeze candidate. | `tulseyy8848` — Build, Local Setup and Handoff | Repeat the setup using the documented commands, record the environment and results, verify README instructions, and prepare an independently reproducible backup demo. Evidence: [Issue #118](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/issues/118). |


---

## Decision record

Record only decisions that change scope, approach, ownership, or the next plan.

| Decision | Why we chose it | Owner | Evidence / Issue link |
|---|---|---|---|
| Proposed: Freeze the MVP scope and prioritize stabilization over new features. | Week 11 requires reliable core functionality and a stable final demonstration. | Team 4 — approval pending | [Final Demo Roadmap](../Week9/Final-demo-Roadmap.md) [MVP Freeze final road map](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/blob/bacb83ad78044a7074eff1bd6e7d40546160ec49/docs/Week11/MVP-Freeze-Final-Road%20Map.md) |
| Proposed: Prioritize work using P0–P3, separately from bug severity. | Work should be ordered by impact on the promised core demo and available testing evidence. | Team 4 — approval pending | Week 11 MVP Freeze guidance |
| Retain Firestore integration as partially verified. | Firebase Emulator connectivity, unauthorized-read rejection (HTTP 403), published-event field comparison (8/8), independent reviewer-reported comparison (8/8), offline/online recovery and browser-level Firestore request-blocking/recovery all passed. However, the application's actual permission-denied and terminal loading-error/Retry callbacks remain unverified. Search/filter persistence requirements also need confirmation. | Verification support: `DevyanaCT`; team acceptance pending | [Issue #166 — Firestore Verification](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/issues/166), [Issue #177 — MVP Freeze Coordination](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/issues/177) |
| Defer optional stretch features until after freeze approval. | New features could introduce regression risk during final-demo preparation. | Team 4 — approval pending | [Final Demo Roadmap](../Week9/Final-demo-Roadmap.md) |

---

## Week 11 Priority Plan — P0–P3

These are proposed priorities and must be confirmed against the final promised MVP scope.

| Priority | Work | Reason |
|---|---|---|
| P0 — Conditional | Recover any confirmed blocker preventing the required Login → Dashboard → Discover → Details demo | Required core journey must work |
| P1 | Complete verification of any untested required Google Sign-In/session or Firestore behavior | Freeze readiness depends on required functionality |
| P1 | Complete or formally decide the remaining required application-level Firestore permission-denied and terminal loading-error/Retry verification | Emulator unauthorized-read protection, offline/online recovery, and request-blocking recovery passed, but actual application-level error callbacks remain unverified. Track the limitation and team decision in #166/#177. |
| P2 | Complete Firestore verification documentation and handoff | Second-event field comparison 8 PASS, 0 FAIL; independent reviewer also reported 8 PASS, 0 FAIL. Supporting screenshots and verification evidence recorded in #166. Confirm evidence links and maintain accurate documentation. |
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


