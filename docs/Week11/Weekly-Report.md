
# Weekly Report

**Team:** 4 — CampusVibes  
**Week:** 11 — MVP Freeze and Final Demo Readiness  
**Date:** November 12–18, 2026  
**Status:** CONDITIONALLY APPROVED — MVP Freeze Completed with Remaining Follow-Up
**Candidate Tag:** `mvp-candidate-2026-11-18`
**Candidate SHA:** `e5f1888aa4600ac2013d6bda34a55554ba68195f`
**Deployment:** https://campusvibe-fnh5f79me-campus-vibe.vercel.app
**Approval Evidence:** [Team Conditional Approval — #177](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/issues/177#issuecomment-6969792911)

---

## This week's goal

Stabilize the CampusVibes MVP for the final demonstration by freezing the feature scope, prioritizing remaining work using P0–P3, and verifying required core functionality.

The team will focus on authentication, event discovery, Firestore integration, UI/UX stability, regression testing, documentation, and independent handoffs.

No new stretch features will be added during the MVP freeze unless a change is necessary to restore promised core behavior.

---

## What we committed to do

- [x] Confirm the final MVP feature scope and pinned candidate.
- [x] Assign priorities and document remaining verification risks.
- [x] Perform final candidate authentication and core regression testing; record partial results.
- [x] Complete local automated Firestore error-handling verification.
- [x] Run candidate production build and automated testing.
- [x] Verify existing theme and UI functionality within documented scopes.
- [x] Update candidate testing evidence and documentation.
- [x] Complete primary and independent local backup verification.
- [x] Record conditional team approval in Issue #177.
- [x] document Confirm search/filter refresh expectations and keep as pending.
- [ ] Confirm real-account Google re-login after hostname repair.
- [ ] Confirm remaining session behavior.
- [ ] Complete independent Firestore runtime evidence review.
- [ ] Complete required personal source explanation and remaining ownership checks.
- [ ] Prepare and rehearse the final demonstration.


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
| MVP Candidate | [Pinned Candidate Commit](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/commit/e5f1888aa4600ac2013d6bda34a55554ba68195f) |
| Candidate Deployment | [Revision-Specific Vercel Deployment](https://campusvibe-fnh5f79me-campus-vibe.vercel.app) |
| Candidate Automated Testing | [November 18 Automated Receipt](Evidence/mvp-candidate-checks-2026-11-18.json) |
| Candidate Firestore Runtime Testing | [Prachi's Runtime Test Receipt](Evidence/prachi-candidate-runtime-2026-11-18.md) |
| Ujjal's Final Candidate QA | [Final Regression Report — #138](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/issues/138#issuecomment-6969099874) |
| Primary Local Backup | [Tulasa's Setup and 118 Smoke Tests](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/issues/118#issuecomment-6958484427) |
| Independent Local Backup | [Devyana's Backup Verification](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/issues/118#issuecomment-6968864555) |
| Google Sign-In Hostname Repair | [Candidate Authentication Repair](Evidence/prachi-candidate-google-domain-2026-11-18.md) |
| Conditional Team Approval | [Team Approval Decision — #177](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/issues/177#issuecomment-6969792911) |

---

## Individual contribution entries — one row per student

| Student | What they did | Evidence link |
|---|---|---|
| `DevyanaCT` | **Week 11 — Independent Authentication QA, Firestore Verification and MVP Backup Testing:** Independently verified Google Sign-In, Dashboard, session persistence, logout/re-login and Remember Me — **5 PASS, 0 FAIL**. Configured local Firebase Authentication and Firestore Emulators and inspected published-event security rules, listeners, loading/error states and Retry implementation. Verified an unauthenticated Firestore Emulator GET returned **HTTP 403 Forbidden**. Completed the second published-event field comparison — **8 PASS, 0 FAIL**; independent reviewer `tulseyy8848` also reported **8 PASS, 0 FAIL**. Verified offline cached-event availability (14 published events and 9 sample listings), recovery after reconnection and production Firestore Listen HTTP 200. Temporarily blocked Firestore requests using Chrome DevTools, confirmed Discover remained accessible with 9 sample listings, and verified 14 published events returned after removing request blocking. Documented search/category reset after refresh. **November 18 — Independent Frozen-Candidate Backup Verification:** Created a separate Git worktree for candidate `mvp-candidate-2026-11-18` (SHA `e5f1888aa4600ac2013d6bda34a55554ba68195f`), confirmed the clean working tree and Node.js v24.14.1, installed dependencies using `npm.cmd ci`, started the local Vite development server, opened the Login page, manually checked Discover/Search/Event Details, and completed the production build successfully. **Independent Backup Result: PASS.** Recorded five high-severity npm dependency findings and a non-blocking build warning. The 118-case Playwright suite was completed by `tulseyy8848` and was not repeated independently. **Remaining:** Review Prachi's candidate-specific Firestore runtime evidence and confirm search/filter refresh requirements. Prachi's local application-level permission-denied, terminal loading-error and Retry automation passed, but independent acceptance remains pending. No application source code, Firestore security rules or database records were modified during my verification. **Team MVP Decision: CONDITIONALLY APPROVED**, as linked in Issue #177. | [#167 — Independent Authentication QA](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/issues/167#issuecomment-6889397205), [#166 — Firestore Final Verification](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/issues/166), [Independent Published-Event Review](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/issues/166#issuecomment-6906530940), [#118 — Independent Frozen-Candidate Backup Verification](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/issues/118#issuecomment-6968864555), [Prachi's Runtime Verification](Evidence/prachi-candidate-runtime-2026-11-18.md), [#177 — Conditional Team Approval](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/issues/177#issuecomment-6969792911) |
| `prachi2061` | November 15: owned the member-ID display privacy fix across Feed, Friends, Messages, Profile and accessible labels; public names/colleges/photos remain. Codex-assisted checks: 49 rules, 5 units, 7 privacy assertions within the photo workflow, five social workflow suites and 46 desktop/mobile smoke cases PASS; build PASS. Production evidence covers guest UI/served code only; authenticated production privacy and independent human review remain pending. Supporting work outside the frozen Events demo path. November 15: delivered the sidebar-only accepted-friends correction with 100+ connection loading (PR #176); dated automated proof includes 3 units, 1 SDK/rules integration, 125-friend UI checks, 49 rules and 118 smoke cases. November 16: prepared the roadmap-aligned MVP checklist, priority/recovery assessment, Sprint 2 evidence links and own contribution update; no new runtime run, human explain-back or team approval is claimed. November 18: Codex-assisted reconciliation of current professor feedback and next-check owners; Prachi confirmed no approved candidate. Candidate SHA, team sign-off and final regression remain pending; no new runtime result or team approval is claimed. November 18: instructed a bounded MVP scope freeze and pinned candidate `e5f1888`; Codex-assisted local checks passed (build, 28 units, 24 desktop/mobile browser cases). Team release approval, independent candidate regression and remaining human/runtime gates stay pending. November 18 follow-up: added a guarded runtime recovery harness; 7 poster API, 4 permission and 18 authenticated local/emulator/browser checks PASS. The terminal loading failure is callback-injected; production/independent limits are retained. Reconciled Ujjal's existing bounded QA backup acceptance; personal source explanation and actual team sign-off remain pending. Added a concise source-linked explanation of poster upload, pending submission, reviewer publication and upload-failure recovery; existing review and team sign-off status remain unchanged. November 18 candidate handoff: reconciled the completed independent backup/core receipts and repaired Google authorization for the exact pinned deployment hostname. Live desktop/mobile provider-page and popup recovery were observed; the initial timing failure is retained. Real-account Google re-login and final team sign-off remain pending. November 18 manual follow-up: reported overall PASS for the requested normal-Chrome Google account/session sequence after the hostname repair; the separate automated-browser rejection is retained. | [Bug #172](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/issues/172), [PR #173](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/pull/173), [Week 11 bug report](Evidence/prachi-member-id-privacy-bug-report-2026-11-15.md), [recorded production check](Evidence/prachi-member-id-privacy-production-2026-11-15.json), [code/test receipt](../../frontend/react-app/verification/member-id-privacy/results.json), [Friends PR #176](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/pull/176), [Friends proof](Evidence/friends-sidebar-2026-11-15.md), [MVP checklist](MVP-Verification-Checklist.md), [Prachi requirements/next actions](Evidence/prachi-week11-requirements-2026-11-16.md), [follow-up #177](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/issues/177), [November 18 follow-up](Evidence/prachi-week11-feedback-2026-11-18.md), [MVP scope freeze/candidate](MVP-Freeze-Record.md), [candidate automation receipt](Evidence/mvp-candidate-checks-2026-11-18.json), [candidate runtime and handoff receipt](Evidence/prachi-candidate-runtime-2026-11-18.md), [short source explanation](Evidence/prachi-short-code-explanation.md), [runtime verification PR #182](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/pull/182), [runtime results JSON](Evidence/prachi-candidate-runtime-2026-11-18.json), [six runtime screenshots and repeat steps](Evidence/prachi-candidate-runtime-2026-11-18.md#screenshot-evidence), [source explanation PR #183](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/pull/183), [scope-freeze PR #181](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/pull/181), [exact candidate e5f1888](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/commit/e5f1888aa4600ac2013d6bda34a55554ba68195f), [candidate Google-domain repair and next owners](Evidence/prachi-candidate-google-domain-2026-11-18.md), [live readiness receipt](Evidence/prachi-candidate-google-domain-2026-11-18.json), [manual Google follow-up receipt](Evidence/prachi-google-manual-pass-2026-11-18.md) |
| `ujjalpoudel75` | Completed Week 11 QA testing: Google Sign-In, Dashboard, session persistence, logout/re-login, Remember Me and email verification — 10 reported scenarios PASS, 0 FAIL. Verified the authenticated core journey. Independently tested Share Event, Copy Link, shared event navigation, refresh and cancellation recovery — 6 PASS, 0 FAIL, with two screenshots. Received independent Google authentication review from `DevyanaCT` — 5 PASS, 0 FAIL. Final freeze-candidate regression remains pending. | [#167 — Authentication QA](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/issues/167), [#138 — Core Journey](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/issues/138), [#168 — Share Event QA Evidence](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/issues/168#issuecomment-6895913744) |
| `tulseyy8848` | Completed an independent Week 11 published-event verification for CampusVibes. Compared an existing published Firestore event with the CampusVibes Discover page and Event Details page. Independently verified all eight fields: title, category, date, time, location, host, description, and image/fallback behavior. Recorded **8 PASS, 0 FAIL**, confirmed that all fields matched the published Firestore data, and found no mismatches. Followed a read-only verification approach without modifying application code, Firestore security rules, or database records. **November 18 — Frozen Candidate Local Setup and Automated Testing:** Checked out candidate `mvp-candidate-2026-11-18` (`e5f1888aa4600ac2013d6bda34a55554ba68195f`), installed dependencies using `npm.cmd ci`, started the local Vite development server, and completed local application checks. Production build completed successfully. Installed Playwright Chromium and ran the complete desktop/mobile smoke-test suite: **118 PASS, 0 FAIL, 0 skipped (5.5 minutes)**. Attached setup, build, application, and test screenshots to Issue #118. **November 18 — Independent Frozen Candidate Regression:** Verified the exact frozen candidate deployment, landing page, login, session persistence after refresh, Discover Events, search functionality, category filtering, Event Details, and back navigation. Recorded **9 PASS, 0 FAIL**, with seven screenshots documenting the verification. **Backup Handoff:** DevyanaCT independently repeated the pinned candidate local setup in a separate Git worktree and reported PASS for the tested setup and application scope. Independent backup verification is now documented in Issue #118. **Remaining:** Independent candidate-specific Firestore runtime review, search/filter refresh requirement confirmation, and final team freeze approval remain pending. These results do not claim that all Firestore runtime requirements or final team release approval are complete. | [Published-Event Verification / Independent Review](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/issues/166#issuecomment-6906530940), [Frozen Candidate Local Setup and Smoke Test](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/issues/118#issuecomment-6958484427), [Independent Frozen Candidate Regression](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/issues/138), [Independent Backup Verification](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/issues/118) |

**Note:** Each student must independently confirm or replace their Week 11 contribution entry with actual work and supporting evidence.

---

## Blockers or risks


| Blocker / Risk | Owner | Next Action |
|---|---|---|
| Google real-account re-login after candidate-hostname repair | `ujjalpoudel75`; support `prachi2061` | Retest Google authentication and record the result |
| Session refresh and refresh-after-logout confirmation | `ujjalpoudel75` | Confirm actual candidate behavior |
| Independent Firestore runtime acceptance | `DevyanaCT`; support `prachi2061` | Review automated error/Retry evidence and document acceptance limits |
| Search/filter reset after refresh | Team / UI owner | Decide expected persistence behavior |
| Five high-severity npm dependency findings | Coordinator / Implementation Owner | Assess dependency impact and document disposition |
| Required personal code explanation | `prachi2061` | Complete the required source explain-back |
| Final presentation rehearsal | Team 4 | Rehearse the approved journey and fallback |
| Published-event field comparison | `DevyanaCT`, `tulseyy8848` | COMPLETE — Both reported 8 PASS |
| Primary and independent local backup setup | `tulseyy8848`, `DevyanaCT` | COMPLETE — Final presentation-device rehearsal remains |

---

## Decision record

Record only decisions that change scope, approach, ownership, or the next plan.

| Decision | Why We Chose It | Owner | Evidence |
|---|---|---|---|
| Freeze MVP scope | Protect verified core functionality and avoid unnecessary regression | `prachi2061` / Team 4 | [MVP Freeze Record](MVP-Freeze-Record.md) |
| Select pinned November 18 candidate | Use a traceable commit and revision-specific deployment | Team 4 | [Candidate Commit](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/commit/e5f1888aa4600ac2013d6bda34a55554ba68195f) |
| Continue candidate authentication retesting | Google re-login and session outcomes remain incomplete | `ujjalpoudel75` | [Final QA Report](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/issues/138#issuecomment-6969099874) |
| Preserve Firestore verification boundaries | Local automated runtime testing passed, but independent acceptance remains open | `DevyanaCT`, `prachi2061` | [Issue #166](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/issues/166) |
| Accept primary and independent backup evidence | Frozen-candidate setup and build were reproduced | `tulseyy8848`, `DevyanaCT` | [Issue #118](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/issues/118) |
| Record conditional MVP approval | Support final-demo preparation while retaining documented conditions | Team 4 / `prachi2061` | [Approval Record — #177](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/issues/177#issuecomment-6969792911) |
| Defer optional stretch features | Protect MVP stability during demonstration preparation | Team 4 | [Final Demo Roadmap](MVP-Freeze-Final-Road%20Map.md) |


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

The MVP candidate has been selected and conditionally approved for the documented scope.

- [ ] Confirm successful real-account Google re-login or the permitted approved fallback.
- [ ] Confirm session refresh and refresh-after-logout.
- [ ] Complete independent Firestore runtime evidence review.
- [ ] Confirm search/filter refresh requirements.
- [ ] Assess outstanding dependency security findings.
- [ ] Complete required personal source explanation and ownership follow-up.
- [ ] Verify the approved demonstration account and candidate deployment.
- [ ] Rehearse the final presentation on the intended device.
- [ ] Confirm the local backup and approved fallback procedure.
- [ ] Record any remaining limitations and follow-up owners.

**Week 11 MVP Freeze Status:** CONDITIONALLY APPROVED.

**Final Unconditional Release Readiness:** NOT YET ESTABLISHED.

**Approval Evidence:** [Issue #177 — Conditional Approval](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/issues/177#issuecomment-6969792911)

Optional stretch features remain deferred while required final-demonstration work continues.

