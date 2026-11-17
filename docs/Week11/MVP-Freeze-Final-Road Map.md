# CampusVibes — MVP Freeze, Final Demo Roadmap and Stretch Goals

**Project:** CampusVibes  
**Team:** 4  
**Course:** Capstone Design — Fall 2026  
**Prepared:** November 12, 2026  
**Sprint:** Sprint 2 — MVP Freeze and Final Demo Preparation  
**Status:** MVP Verification In Progress — Freeze Readiness Pending

---

## 1. Project Goal

CampusVibes is a campus community application designed to help students discover university events, explore clubs, manage their accounts, and interact with campus activities.

The goal of the MVP freeze is to deliver a stable, demonstrable application using the features already implemented.

**Our priority is stability, testing, documentation, and a successful final demonstration rather than adding unnecessary features.**

---

## 2. MVP Scope

The MVP focuses on five core areas.

| Area | Required Functionality | Current Status |
|---|---|---|
| Authentication | Login, logout, email verification, password recovery and session management | Google Sign-In/session and email-verification workflows tested; password recovery and final freeze-candidate regression still require confirmation |
| Dashboard | Student dashboard and navigation | Tested |
| Event Discovery | Event lists, search, categories and event details | Tested |
| Firestore Integration | Published-event querying, display and basic recovery | Partially verified |
| UI/UX | Responsive interface, light/dark theme and accessible controls | Theme verification passed |

Community features and additional services may be demonstrated where stable but must not block the core MVP freeze.

---

## 3. Completed Work — Weeks 9–10

#
### A. Authentication and Core Journey

#### Week 10 — Previous Verification

- [x] Login and Dashboard checks documented.
- [x] Event Search tested.
- [x] Category Filtering tested.
- [x] Event Details tested.
- [x] Empty Search behavior tested.
- [x] Session Refresh tested.
- [x] Google popup cancellation and retry behavior checked.
- [x] Previous Playwright regression rerun — 80 PASS.

#### Week 11 — Google Authentication and Session Testing

**Primary QA:** `ujjalpoudel75`  
**Independent QA Reviewer:** `DevyanaCT`

- [x] Google Sign-In and Dashboard access tested.
- [x] Session persistence after page refresh tested.
- [x] Logout and Google re-login tested.
- [x] Browser-restart session behavior tested.
- [x] Remember Me behavior tested in reported scenarios.
- [x] Independent Google/session verification by `DevyanaCT` — 5 PASS, 0 FAIL.

#### November 16 — Email Verification Testing

**Tester:** `ujjalpoudel75`

- [x] EV-01: Email verification requirement displayed — PASS.
- [x] EV-02: Firebase verification email received — PASS.
- [x] EV-03: Verification link opened Firebase action page — PASS.
- [x] EV-04: Firebase confirmed email verification — PASS.
- [x] EV-05: Authenticated Dashboard opened — PASS.

**Email Verification Result:** 5 PASS, 0 FAIL.

**Screenshot Evidence:**

- `W11-09-email-verification-required.png`
- `W11-10-verification-email-received.png`
- `W11-11-verification-action.png`
- `W11-12-email-verified.png`
- `W11-13-verified-dashboard.png`

#### Remaining Authentication Checks

- [ ] Confirm Remember Me unchecked behavior after browser restart.
- [ ] Confirm password-recovery evidence against required MVP scope.
- [ ] Verify backend authorization restrictions for unverified accounts where required.
- [ ] Repeat final authentication regression on the approved freeze candidate.

**Evidence:** [Issue #167 — Authentication Verification](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/issues/167), [Issue #116](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/issues/116), [Issue #138](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/issues/138)

**Status:** Google/session and email-verification scenarios passed in the reported tests. Final candidate regression and remaining authentication requirements are pending.


### B. Light/Dark Theme

- [x] Theme-toggle implementation completed.
- [x] Theme persistence after refresh tested.
- [x] Accessible theme-button labels tested.
- [x] Dedicated Playwright test passed.
- [x] PR #145 independently approved and merged.
- [x] November 11 technical source review completed.
- [x] Desktop and mobile theme tests: 2 PASS.
- [ ] Record any still-required unaided human explain-back.

### C. Notification UI

- [x] Notification interface automated checks completed.
- [x] Saved-event read-status persistence tested.
- [x] Community/Feed notification filters checked.
- [x] Focus restoration after Escape checked.
- [x] Narrow notification panel checked.
- [x] Browser-storage failure behavior checked.
- [x] Notification tests: 6 PASS.

**Combined theme and notification review:** 8 PASS, 0 FAIL.

**Limitation:** Live Firestore notification delivery remains unverified.


### D. Firestore Event Loading

- [x] Confirmed `campusPublishedEvents` collection.
- [x] Verified Firestore Listen query with HTTP 200.
- [x] Verified published event `story time`.
- [x] Tested event search and category filtering.
- [x] Verified event visibility after refresh.
- [x] Verified event details and missing-field fallbacks.
- [x] Completed local Firestore security-rules tests — 40 PASS, 0 FAIL (Week 10).
- [x] Connected local Firebase Authentication and Firestore Emulators.
- [x] Confirmed local Firestore requests reached port 8080.
- [x] Verified unauthenticated Firestore Emulator read returned HTTP 403 Forbidden.
- [x] Verified 14 cached published events and 9 sample listings remained visible offline.
- [x] Confirmed cached-data warning and Retry button appeared.
- [x] Confirmed cached warning disappeared after reconnection.
- [x] Confirmed production Firestore Listen returned HTTP 200 after reconnection.
- [x] Completed second published-event manual comparison — 8 PASS, 0 FAIL.
- [x] Independent reviewer `tulseyy8848` also reported 8 PASS, 0 FAIL.
- [x] Attached second-event comparison screenshots in Issue #166.
- [ ] Verify actual application-level permission-denied error message.
- [ ] Verify actual application-level loading-error callback and error-state Retry recovery.
- [ ] Confirm expected search/filter persistence after refresh.

**Evidence:** [Issue #117](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/issues/117), [Issue #166](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/issues/166)

**Status:** PARTIALLY VERIFIED — Published-event comparison and ordinary network recovery passed; application-level error runtime tests remain open.

**Note:** The HTTP 403 result came from a direct read-only request to the local Emulator. The HTTP 200 recovery result came from production Firestore. Neither proves that the application's actual permission-denied or loading-error callback works.

---

## 4. MVP Freeze Roadmap — Week 11

**Proposed checkpoint:** November 12–18, 2026

### Phase 1 — Freeze Core Features

**Goal:** Stop unnecessary development and protect the working MVP.

- [ ] Confirm the list of required MVP features.
- [ ] Freeze unnecessary UI changes.
- [ ] Avoid introducing new dependencies without approval.
- [ ] Review open high-priority bugs.
- [ ] Confirm that critical navigation works.
- [ ] Confirm that all existing tests still pass.
- [ ] Record the exact freeze candidate commit SHA.
- [ ] Identify features that require fallback demonstrations.

**Expected Output:** A clearly documented MVP freeze candidate.

### Phase 2 — Complete Critical Verification

**Goal:** Verify core application behavior without changing production data unnecessarily.

- [x] Verify real Google Sign-In and authenticated Dashboard access in the reported Week 11 scenarios.
- [x] Verify session persistence, logout and re-login in the reported scenarios.
- [x] Complete independent Google/session QA — 5 PASS, 0 FAIL.
- [x] Complete email-verification workflow testing — EV-01 to EV-05, 5 PASS, 0 FAIL.
- [x] Record five email-verification evidence screenshots.
- [ ] Confirm Remember Me unchecked behavior after browser restart.
- [ ] Confirm required password-reset and recovery evidence.
- [ ] Verify any required backend restrictions for unverified accounts.
- [ ] Repeat authentication and core-journey regression on the selected freeze candidate.
- [x] Verify local Firestore Emulator connectivity.
- [x] Verify unauthorized Emulator read rejection — HTTP 403.
- [x] Verify offline cached-event availability and production Firestore reconnection.
- [x] Compare a second published Firestore event against the displayed UI — 8 PASS, 0 FAIL.
- [x] Record the separate reviewer's 8 PASS, 0 FAIL result.
- [ ] Verify application-level permission-denied UI behavior.
- [ ] Verify application-level loading-error callback and Retry recovery.
- [ ] Confirm intended search/filter persistence after refresh.
- [ ] Review outstanding high-priority defects.
- [ ] Run relevant automated regression tests again.

**Expected Output:** Evidence-backed results and a clear list of remaining limitations.

### Phase 3 — UI/UX and Accessibility Verification

**Goal:** Maintain a consistent and usable final interface.

- [x] Theme-toggle automated verification.
- [x] November 11 desktop/mobile theme technical review.
- [x] November 11 notification UI technical review.
- [ ] Verify responsive layout on final demo screens.
- [ ] Check readable contrast and accessible labels.
- [ ] Perform keyboard-only navigation checks where applicable.
- [ ] Confirm important buttons and links work.
- [ ] Check empty states and user-facing error messages.
- [ ] Verify no major layout regressions were introduced.

**Expected Output:** Stable final UI with documented accessibility limitations.

### Phase 4 — Documentation and Ownership

**Goal:** Ensure each team member understands their code and responsibilities.

- [x] Create Codebase Area Map.
- [x] Record individual roadmap slices.
- [x] Record responsible AI use.
- [x] Document Theme Toggle testing.
- [x] Record Firestore verification evidence.
- [ ] Confirm outstanding primary/backup ownership assignments.
- [ ] Complete required individual explain-backs.
- [ ] Complete pending independent handoff confirmations.
- [ ] Verify all screenshot evidence is redacted.
- [ ] Verify GitHub evidence links.
- [ ] Update the Weekly Report, Ownership Audit and Roadmap.

**Expected Output:** Complete and traceable handoff documentation.

---

## 5. Final Demo Preparation — Proposed Week 12

**Goal:** Prepare a stable, repeatable final presentation.

### Core Demo Journey

1. Open CampusVibes.
2. Show the landing page.
3. Log in with a verified test account.
4. Open the Dashboard.
5. Navigate to Discover Events.
6. Search for an event.
7. Filter by category.
8. Open Event Details.
9. Demonstrate event information.
10. Refresh the page and verify event availability.
11. Demonstrate light/dark theme switching.
12. Demonstrate a stable community or notification UI feature, if ready.
13. Log out successfully.

### Demo Verification Checklist

- [ ] Final deployed website loads.
- [ ] Demonstration account works.
- [ ] Dashboard displays correctly.
- [ ] Event Search works.
- [ ] Category Filtering works.
- [ ] Event Details open.
- [ ] Published event remains accessible after refresh.
- [ ] Theme Toggle works.
- [ ] No blocking browser-console errors.
- [ ] Core demo works on the presentation device.
- [ ] Backup demo method is prepared.
- [ ] Team rehearses the complete presentation.

**Expected Output:** A rehearsed final demonstration using the frozen application.

---

## 6. Team Responsibilities

| Member | Primary Area | Week 11–12 Focus |
|---|---|---|
| `prachi2061` | Frontend Authentication; API/Data Implementation Support | Authentication readiness, provider/API verification, error handling and implementation support |
| `DevyanaCT` | Frontend UI/UX, Theme and Accessibility | Theme/notification handoff, responsive UI checks, Firestore verification support |
| `ujjalpoudel75` | QA and Core Integration | Full demo regression, authentication checks, integration testing and bug reporting |
| `tulseyy8848` | Build, Local Setup and Handoff | Local setup verification, deployment readiness, backup demo preparation |

**Note:** Confirm any remaining proposed primary/backup assignments in Issue #139. This table reflects documented work areas rather than automatically certifying every role acceptance.

---

## 7. MVP Freeze Acceptance Criteria

The MVP should only be declared ready for final freeze when the following are satisfied.

- [ ] The core demo journey works end to end.
- [ ] No unresolved critical blocker prevents the main demo.
- [ ] Required authentication works, or an explicitly approved fallback is documented.
- [ ] Required event discovery and details work.
- [ ] Required Firestore functionality is verified or limitations are formally accepted.
- [ ] Automated regression tests pass on the selected freeze candidate.
- [ ] The theme and core UI remain stable.
- [ ] The final deployed version and commit SHA are recorded.
- [ ] Test evidence and outstanding issues are linked.
- [ ] The team approves the freeze candidate.

**Freeze Decision:** PENDING

Passing individual tests does not automatically mean that the entire MVP is ready for final release.

---

## 8. Known Risks and Remaining Blockers

| Risk | Impact | Next Action |
|---|---|---|

| Final authentication regression and remaining boundary checks pending | Real Google Sign-In/session testing and email-verification checkpoints passed, but the final freeze candidate and some authentication boundary checks remain unverified | Repeat required authentication tests on the selected candidate; confirm unchecked Remember Me, password recovery and applicable unverified-account restrictions. Evidence: #167 |
| Application-level Firestore permission-denied handling unverified | Actual error UI behavior is unknown | Run a controlled application-level test or record an explicit team decision in #166 |
| Application-level Firestore loading-error/retry unverified | Error message and recovery from terminal failure remain unknown | Complete controlled test or record an explicit limitation in #166 |
| Search/category resets on refresh | Potential mismatch with expected UX | Confirm requirement with implementation/UI owner |
| Second-event verification evidence | Manual and reviewer results are 8/8; direct reviewer-comment link should remain traceable | Link the independent review comment in #166 |
| Remaining independent handoffs | Final freeze ownership evidence may be incomplete | Confirm required handoff records in #139 |
| Screenshot privacy | Public evidence could expose sensitive values | Review/redact screenshots |
| Final candidate and setup not approved | Demo may differ from previously tested version | Record SHA, deployment URL, regression and local backup evidence in #177 and #118 |

---

## 9. Stretch Goals — After MVP Freeze

**Stretch goals are optional improvements. They must not delay the MVP freeze, final demonstration, or required bug fixes.**

### Stretch Goal 1 — Improved Event Recommendations

- [ ] Personalized event recommendations.
- [ ] Recommendations based on student interests.
- [ ] Better event discovery and suggestion ranking.

### Stretch Goal 2 — Advanced Community Features

- [ ] Expanded community feed interactions.
- [ ] Improved event-sharing experience.
- [ ] Richer photo and media support.
- [ ] Better club and organization interaction.

### Stretch Goal 3 — Push Notifications

- [ ] Live notification delivery.
- [ ] Event reminders.
- [ ] Club announcements.
- [ ] Notification preferences.

### Stretch Goal 4 — Enhanced Event Management

- [ ] Improved event submission and approval workflow.
- [ ] Expanded organizer dashboard.
- [ ] Better event images and previews.
- [ ] Advanced event moderation and duplicate detection.

### Stretch Goal 5 — AI-Powered Features

- [ ] Smarter event recommendations.
- [ ] AI-assisted event discovery.
- [ ] Personalized campus activity suggestions.
- [ ] Responsible AI evaluation and privacy safeguards.

### Stretch Goal 6 — Advanced UI/UX

- [ ] Additional accessibility testing.
- [ ] Cross-browser verification.
- [ ] More responsive refinements.
- [ ] Improved animations and transitions.
- [ ] Additional theme fallback and browser-storage tests.

### Stretch Goal 7 — Advanced Platform Support

- [ ] Broader university support.
- [ ] More clubs and organizations.
- [ ] Improved event analytics.
- [ ] Expanded performance monitoring.

**Stretch Goal Rule:** Begin new stretch implementation only after the MVP freeze is approved and the team confirms sufficient time and resources.

---

## 10. GitHub Evidence and Tracking

| Area | Evidence |
|---|---|
| Ownership Audit | [Issue #139](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/issues/139) |
| Authentication | [Issue #116](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/issues/116) |
| Core QA | [Issue #138](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/issues/138) |
| Firestore Event Loading | [Issue #117](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/issues/117) |
| Theme Toggle Verification | [PR #145](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/pull/145) |
| Local Setup | [Issue #118](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/issues/118) |
| Technical Theme/Notification Review | [November 11 Review](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/issues/139#issuecomment-6786608721) |
| Weekly Report | [Week 10 Weekly Report](../Week10/Weekly-Report.md) |
| AI/Code Ownership | [Code Ownership Audit](../Week10/ai-use-and-code-ownership-audit.md) |
| Week 11 Firestore Final Verification | [Issue #166](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/issues/166) |
| MVP Freeze Coordination | [Issue #177](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/issues/177) |
| Independent Google Authentication QA | [Issue #167](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/issues/167) |
| Local Setup and Backup Demo | [Issue #118](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/issues/118) |


---

## 11. Final Milestone Summary

| Milestone | Target | Current Status |
|---|---|---|
| Week 9 — MVP Integration | Core functionality implementation and integration | Partial |
| Week 10 — Ownership and Verification | Explain, test, review and document existing code | Substantially documented |
| Week 11 — MVP Freeze | Stabilize core features, resolve blockers and approve freeze candidate | IN PROGRESS |
| Week 12 — Final Demo Readiness | Full regression, demonstration rehearsal and final evidence | PLANNED |
| After Freeze — Stretch Goals | Optional improvements without risking the MVP | NOT STARTED / DEFERRED |

---

## 12. Final Decision

**Current Status: MVP FREEZE READINESS IN PROGRESS**

### Verified Progress

- Theme-toggle implementation and automated verification.
- Theme/notification technical review: 8 PASS.
- Existing Playwright smoke suite: 80 PASS.
- Core navigation and QA checks.
- Firestore published-event query and display.
- Search and category filtering in the tested scenarios.
- Event visibility after refresh.
- Firestore network reconnection.
- Local Firestore security-rules tests: 40 PASS, 0 FAIL.
- Code ownership and responsible AI documentation.  
- **November 16–17 — Firestore Integration Verification (`DevyanaCT`):**
  - Firebase Authentication and Firestore Emulator connectivity verified.
  - Published-event security rules, listeners and application error-handling source inspected.
  - Unauthenticated Firestore Emulator GET returned HTTP 403 Forbidden.
  - Offline Discover displayed 14 cached published events and 9 sample listings.
  - Cached-data warning and Retry button were visible during offline testing.
  - Restoring connectivity removed the cached warning.
  - Production Firestore Listen returned HTTP 200 after reconnection.
  - Second published-event field comparison: 8 PASS, 0 FAIL.
  - Independent reviewer `tulseyy8848` also reported 8 PASS, 0 FAIL.
  - Supporting second-event screenshots attached in Issue #166.
  - Search/category reset after refresh documented.
  - Actual application-level permission-denied and loading-error/retry runtime checks remain pending.
  - No application source code, Firestore rules or database records were modified.
  - **Evidence:** [Issue #166](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/issues/166).

- **November 14–16 — Authentication and Email Verification (`ujjalpoudel75`):**
  - Real Google Sign-In and Dashboard access tested.
  - Session persistence, logout and re-login tested.
  - Browser-restart and Remember Me scenarios documented.
  - Independent Google/session QA by `DevyanaCT`: 5 PASS, 0 FAIL.
  - November 16 email-verification workflow completed:
    - EV-01: Verification requirement displayed — PASS.
    - EV-02: Verification email delivered — PASS.
    - EV-03: Verification link opened — PASS.
    - EV-04: Email verification confirmed — PASS.
    - EV-05: Authenticated Dashboard opened — PASS.
  - Email-verification result: 5 PASS, 0 FAIL.
  - Five supporting screenshots recorded in `docs/Week11/Evidence/`.
  - Final freeze-candidate regression remains pending.
  - Evidence: [Issue #167](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/issues/167).

### Remaining Priorities

1. Complete or formally document remaining authentication limitations.
2. Complete critical application-level Firestore checks.
3. Confirm the MVP feature-freeze scope.
4. Finish required independent handoffs and role confirmations.
5. Record the exact freeze candidate and run final regression tests.
6. Prepare the presentation and backup demonstration.
7. Approve the final MVP freeze before beginning optional stretch work.

**Current Status: MVP FREEZE READINESS IN PROGRESS**

**Freeze Decision:** PENDING — Team approval has not been recorded.

### Remaining Freeze Requirements

- [ ] Record the proposed freeze candidate commit SHA and corresponding deployment URL.
- [ ] Complete final authenticated core-journey regression on the selected candidate.
- [ ] Verify local setup and backup demonstration on that candidate.
- [ ] Complete the outstanding application-level Firestore error tests or obtain an explicit team decision about their limitations.
- [ ] Confirm the intended search/filter refresh behavior.
- [ ] Record final evidence links and team approval.

**Conclusion:** CampusVibes has verified its published-event field mapping, Firebase Emulator connectivity, unauthorized-read rejection and cached-event network recovery. The second-event comparison and independent reviewer both reported 8 PASS, 0 FAIL.

However, application-level Firestore permission-denied and loading-error/retry tests remain unverified. The final freeze candidate, regression and team approval are also pending.

The team will continue the recovery/verification process under [Issue #177](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/issues/177). Stretch features remain deferred until the MVP freeze is approved.


## November 16 Week 11 verification checkpoint

Use the [filled MVP Verification Checklist](MVP-Verification-Checklist.md) for the current expected/actual core-path assessment, separate severity/P-levels, owners, evidence limits and smallest recovery actions. This dated assessment supersedes older unqualified readiness statements above; historical test results keep their own dates.

The existing feature promise stays unchanged. Devyana's [November 15 independent Google/session receipt](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/issues/167#issuecomment-6889397205) establishes five reported scenarios, so full Google login is no longer described as wholly untested. It does not identify the final freeze SHA. The recommendation is to retain scope and follow the recovery/verification route until required #166 runtime gaps, final candidate regression and approval are recorded. Final team freeze approval is **PENDING**.

Prachi coordinates [#177](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/issues/177): record the candidate/URL with QA; arrange a named core-path and boundary repeat; carry exact Firestore gaps from #166; confirm setup/backup in #118; and record the actual team decision. **Next checkpoint: November 18, 2026, end of day KST.** P1 required verification precedes P2 reliability/setup/handoff; P3 features remain deferred. No P0 application blocker is established by this documentation assessment.

The [Sprint 2 quality record](Sprint-quality-quick-checks.md), [Prachi contribution/next actions](Evidence/prachi-week11-requirements-2026-11-16.md), [shared report](Weekly-Report.md) and [current area map](../Week10/ai-use-and-code-ownership-audit.md#codebase-area-map) complete the links. Privacy/Friends corrections remain supporting work; their automated success does not certify the entire Events demo. No new runtime, human review or team vote is claimed here.
