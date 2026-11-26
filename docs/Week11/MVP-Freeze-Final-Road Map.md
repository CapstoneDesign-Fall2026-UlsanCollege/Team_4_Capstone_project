
# CampusVibes — MVP Freeze, Final Demo Roadmap and Stretch Goals

**Project:** CampusVibes  
**Team:** 4  
**Course:** Capstone Design — Fall 2026  
**Originally Prepared:** November 12, 2026  
**Updated:** November 26, 2026
**Latest Progress:** Week 12 QA and final handoff follow-up — see Section 13
**Sprint:** Sprint 2 — MVP Freeze and Final Demo Preparation  
**Candidate Tag:** `mvp-candidate-2026-11-18`  
**Candidate SHA:** `e5f1888aa4600ac2013d6bda34a55554ba68195f`  
**Candidate Deployment:** https://campusvibe-fnh5f79me-campus-vibe.vercel.app

**Status:** MVP SCOPE FROZEN — CONDITIONALLY APPROVED

**Approval Evidence:** [Team 4 Conditional Approval — Issue #177](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/issues/177#issuecomment-6969792911)

---

## 1. Project Goal

CampusVibes is a campus community application designed to help students discover university events, explore clubs, manage accounts, and interact with campus activities.

The objective of the MVP freeze is to deliver a stable and demonstrable application using the existing implemented features.

**Our priority is stability, testing, documentation, and successful final demonstration rather than introducing unnecessary features.**

The November 18 candidate has been selected, tested, and linked to a conditional team approval record.

Remaining verification conditions continue to be documented and assigned to the responsible team members.

---

## 2. MVP Scope

The frozen MVP focuses on five core areas.

| Area | Required Functionality | November 18 Status |
|---|---|---|
| Authentication | Verified login, logout, email verification, password recovery and session management | WEEK 12 FOLLOW-UP — Targeted Google retesting PASS (6 primary QA, 6 independent QA); see Section 13 |
| Dashboard | Student Dashboard and navigation | PASS — Candidate regression |
| Event Discovery | Event listings, search, categories, empty-search recovery and event details | PASS — Documented candidate checks |
| Firestore Integration | Published-event querying, display and recovery | WEEK 12 FOLLOW-UP — Independent local automation 18 PASS; manual permission-denied UI PASS; see Section 13 |
| UI/UX | Responsive interface, theme and accessible controls | Previous theme tests PASS; final-demo checks remain |

### Frozen Core Demonstration

Landing Page → Verified Login → Dashboard → Discover Events → Search/Category Filter → Event Details → Session Refresh → Logout.

The demonstration must also cover empty-search behavior and clearing the search to restore event listings.

Sample listings must remain clearly distinguishable from published Firestore events.

Community enhancements, AI features, notifications, maps, additional media features and optional redesigns remain outside the frozen core demonstration promise.

---

## 3. Completed Work — Weeks 9–11

### A. Authentication and Core Journey

#### Week 10 — Previous Verification

- [x] Login and Dashboard checks documented.
- [x] Event Search tested.
- [x] Category Filtering tested.
- [x] Event Details tested.
- [x] Empty Search behavior tested.
- [x] Session Refresh previously tested.
- [x] Google popup cancellation and retry behavior checked.
- [x] Previous Playwright regression rerun — 80 PASS.

#### Week 11 — Google Authentication and Session Testing

**Primary QA:** `ujjalpoudel75`  
**Independent Reviewer:** `DevyanaCT`

- [x] Google Sign-In and Dashboard access tested in earlier Week 11 scenarios.
- [x] Session persistence after refresh previously tested.
- [x] Logout and Google re-login previously tested.
- [x] Browser-restart session behavior documented.
- [x] Remember Me scenarios documented.
- [x] Independent Google/session verification — 5 PASS, 0 FAIL.

These earlier checks do not establish a successful Google re-login on the pinned November 18 deployment.

#### November 16 — Email Verification Testing

**Tester:** `ujjalpoudel75`

- [x] EV-01 — Email verification requirement displayed.
- [x] EV-02 — Firebase verification email received.
- [x] EV-03 — Verification link opened.
- [x] EV-04 — Firebase confirmed verification.
- [x] EV-05 — Authenticated Dashboard opened.

**Result:** 5 PASS, 0 FAIL.

**Screenshot Evidence:**

- `W11-09-email-verification-required.png`
- `W11-10-verification-email-received.png`
- `W11-11-verification-action.png`
- `W11-12-email-verified.png`
- `W11-13-verified-dashboard.png`

#### November 18 — Final Candidate Regression

**Tester:** `ujjalpoudel75`  
**Candidate SHA:** `e5f1888aa4600ac2013d6bda34a55554ba68195f`

| Test | Result |
|---|---|
| Authenticated Dashboard | PASS |
| Discover Events | PASS |
| Search Events | PASS |
| Category Filter | PASS |
| Event Details | PASS |
| Empty Search | PASS — Tester-reported |
| Search Recovery | PASS — Tester-reported |
| Logout | PASS |
| Email/Password Login | PASS — Tester-reported |
| Session Refresh | PENDING CONFIRMATION |
| Refresh After Logout | PENDING CONFIRMATION |
| Google Re-Login | RETEST REQUIRED |

Ujjal initially encountered a Google Sign-In configuration error on the revision-specific candidate deployment.

Prachi subsequently documented adding the exact deployment hostname to Firebase authorized domains.

Provider-page readiness was reported after the configuration update. Successful real-account Google re-login remains unconfirmed in the supplied verification records.

**Overall Candidate Regression:** PARTIAL PASS.

**Evidence:** [Ujjal's Candidate QA Report — #138](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/issues/138#issuecomment-6969099874)

#### Remaining Authentication Checks

- [ ] Confirm successful real-account Google re-login.
- [ ] Confirm candidate session persistence after refresh.
- [ ] Confirm refresh-after-logout behavior.
- [ ] Confirm unchecked Remember Me behavior if required.
- [ ] Review remaining password-recovery evidence if required.
- [ ] Confirm applicable backend restrictions for unverified accounts.

**Authentication Evidence:** [Issue #167](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/issues/167)

---

### B. Light/Dark Theme

- [x] Theme-toggle implementation completed.
- [x] Theme persistence after refresh tested.
- [x] Accessible theme-button labels tested.
- [x] Dedicated Playwright test passed.
- [x] PR #145 independently approved and merged.
- [x] November 11 technical source review completed.
- [x] Desktop and mobile theme tests — 2 PASS.
- [ ] Complete any still-required personal explain-back.

**Status:** PASS — Documented theme testing scope.

---

### C. Notification UI

- [x] Notification interface automated checks completed.
- [x] Saved-event read-status persistence tested.
- [x] Community/Feed notification filters checked.
- [x] Focus restoration after Escape checked.
- [x] Narrow notification panel checked.
- [x] Browser-storage failure behavior checked.
- [x] Notification tests — 6 PASS.

**Combined Theme and Notification Result:** 8 PASS, 0 FAIL.

**Limitation:** Live Firestore notification delivery remains separately unverified and is not a frozen core-demo requirement.

---

### D. Firestore Event Loading

#### November 16–17 — Independent Manual Verification

**Tester:** `DevyanaCT`  
**Independent Reviewer:** `tulseyy8848`

- [x] Confirmed `campusPublishedEvents` collection.
- [x] Published-event query and display previously verified.
- [x] Firestore Listen HTTP 200 observed.
- [x] Published event `story time` checked.
- [x] Event Search and Category Filtering checked.
- [x] Event Details and missing-field fallbacks checked.
- [x] Local Firestore security-rules tests — 40 PASS, 0 FAIL.
- [x] Firebase Authentication and Firestore Emulator connectivity verified.
- [x] Local Firestore requests reached port 8080.
- [x] Unauthenticated Emulator read returned HTTP 403 Forbidden.
- [x] Offline Discover retained 14 cached published events and 9 sample listings.
- [x] Cached-data warning and Retry button appeared.
- [x] Cached warning disappeared after reconnecting.
- [x] Production Firestore Listen returned HTTP 200 after reconnecting.
- [x] Second published-event comparison — 8 PASS, 0 FAIL.
- [x] Independent reviewer also reported 8 PASS, 0 FAIL.
- [x] Supporting screenshots attached to Issue #166.
- [x] Firestore request-blocking tested using Chrome DevTools.
- [x] Discover remained accessible with 9 sample listings during blocking.
- [x] No-cached-events warning and Retry button appeared.
- [x] Disabling blocking restored 14 published events and 9 sample listings.
- [x] Normal Discover behavior returned after recovery.

**Manual Verification Result:** PASS — Documented published-event mapping and network-recovery scenarios.

**Evidence:** [Issue #166 — Firestore Verification](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/issues/166)

#### November 18 — Candidate-Specific Firestore Automated Tests

**Coordinator:** `prachi2061`

Prachi's November 18 local automated verification reported:

- [x] Firestore Emulator application-level permission-denied handling.
- [x] Controlled terminal loading-error callback.
- [x] Retry recovery under controlled error conditions.
- [x] Desktop and mobile viewport coverage.
- [x] Additional authenticated/emulator/error-recovery browser checks.

**Result:** PASS — Local automated scope.

**Evidence:** [November 18 Runtime Verification Receipt](Evidence/prachi-candidate-runtime-2026-11-18.md)

#### Remaining Firestore Checks

- [ ] Independently review Prachi's candidate-specific automated evidence.
- [ ] Complete independent/deployed acceptance if required.
- [ ] Confirm intended search/filter behavior after refresh.
- [ ] Record any accepted runtime limitations and follow-up owners.

**Overall Firestore Status:** PARTIALLY VERIFIED — Previous manual checks and local automated testing passed for their respective scopes.

**Important:** Direct Emulator HTTP 403, browser network blocking, and controlled error injection provide different evidence. They do not independently prove every real production-provider failure scenario.

---

### E. November 18 Automated Candidate Verification

**Coordinator:** `prachi2061`  
**Candidate SHA:** `e5f1888aa4600ac2013d6bda34a55554ba68195f`

| Verification | Result |
|---|---|
| Production Build | PASS |
| Unit Tests | 28 PASS |
| Desktop/Mobile Browser Tests | 24 PASS |
| Additional Authenticated/Emulator/Error-Recovery Browser Tests | 18 cases reported |
| Poster API Fixture Cases | 7 cases reported |
| Poster Permission Cases | 4 cases reported |

The additional test groups are recorded in Prachi's separate runtime receipt.

**Evidence:**
- [Candidate Automated Test Receipt](Evidence/mvp-candidate-checks-2026-11-18.json)
- [Additional Runtime Test Receipt](Evidence/prachi-candidate-runtime-2026-11-18.md)

**Status:** PASS — Documented local automated checks.

These tests do not replace independent real-account authentication verification.

---

### F. Local Backup Verification

#### Primary Verification — `tulseyy8848`

- [x] Exact frozen candidate checkout completed.
- [x] Candidate SHA verified.
- [x] Dependencies installed.
- [x] Local Vite server started.
- [x] Production build completed.
- [x] Local core-page checks performed.
- [x] Playwright smoke suite — 118 PASS, 0 FAIL.

**Status:** PASS — Primary local setup and automated smoke-testing scope.

#### Independent Verification — `DevyanaCT`

- [x] Separate Git worktree created.
- [x] Exact candidate SHA confirmed.
- [x] Clean working tree confirmed.
- [x] Node.js v24.14.1 verified.
- [x] Dependencies installed using `npm.cmd ci`.
- [x] Local Vite application started successfully.
- [x] Login page opened.
- [x] Discover, Search and Event Details manually reported working.
- [x] Production build completed successfully.

**Status:** PASS — Independent local backup verification scope.

**Observations:**

- npm reported five high-severity dependency vulnerabilities.
- Vite reported a non-blocking JavaScript chunk-size warning.
- The independent reviewer did not repeat the 118-case automated smoke suite.

**Evidence:**
- [Tulasa's Setup Handoff](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/issues/118#issuecomment-6958484427)
- [Devyana's Independent Backup Handoff](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/issues/118#issuecomment-6968864555)

**Final Local Backup Status:** PASS — Verified for documented scopes.

---

## 4. MVP Freeze Roadmap — Week 11

**Checkpoint:** November 18, 2026

### Phase 1 — Freeze Core Features

**Goal:** Protect the working MVP and avoid unnecessary development.

- [x] Define the frozen core demonstration journey.
- [x] Record the exact candidate SHA.
- [x] Record the revision-specific deployment.
- [x] Initiate scope freeze for Prachi's work.
- [x] Defer unnecessary feature additions.
- [x] Record initial candidate verification results.
- [x] Document candidate-specific limitations.

**Result:** Frozen candidate selected and recorded.

### Phase 2 — Complete Critical Verification

- [x] Previous Google/session checks documented.
- [x] Email-verification workflow — 5 PASS.
- [x] Candidate Dashboard and event-discovery regression performed.
- [x] Candidate email/password login reported PASS.
- [x] Firestore Emulator connectivity verified.
- [x] Unauthorized Emulator read rejected — HTTP 403.
- [x] Firestore published-event comparison — 8 PASS.
- [x] Independent published-event review — 8 PASS.
- [x] Offline and network recovery verified.
- [x] Local Firestore error/Retry automated checks reported PASS.
- [x] Candidate build and automated testing completed.
- [x] Primary and independent local backup checks completed.
- [ ] Confirm real Google re-login after hostname repair.
- [ ] Confirm remaining session behavior.
- [ ] Independently review candidate Firestore runtime evidence.
- [ ] Confirm search/filter refresh expectations.
- [ ] Review remaining security findings.

**Result:** Substantial verification completed; remaining follow-up documented.

### Phase 3 — UI/UX and Accessibility Verification

- [x] Theme-toggle automated verification.
- [x] November 11 theme technical review.
- [x] November 11 notification UI technical review.
- [ ] Complete final presentation-device responsive checks.
- [ ] Confirm applicable keyboard and accessibility requirements.
- [ ] Check final-demo error and empty states.
- [ ] Confirm no blocking layout regressions during rehearsal.

### Phase 4 — Documentation and Ownership

- [x] Codebase Area Map prepared.
- [x] Individual roadmap slices documented.
- [x] Responsible AI use documented.
- [x] Theme verification evidence recorded.
- [x] Firestore evidence recorded.
- [x] Candidate testing reports prepared.
- [x] Primary local backup handoff recorded.
- [x] Independent backup handoff recorded.
- [x] Conditional team approval linked in Issue #177.
- [ ] Complete any outstanding ownership confirmations.
- [ ] Complete Prachi's required personal source explanation.
- [ ] Confirm evidence links and screenshot privacy.
- [ ] Update relevant Weekly Report and roadmap documents.

---

## 5. Final Demo Preparation — Week 12

**Goal:** Deliver a stable demonstration using the pinned MVP candidate.

### Core Demo Journey

1. Open the approved CampusVibes deployment.
2. Show the Landing Page.
3. Log in using the approved verified account.
4. Open the Dashboard.
5. Navigate to Discover Events.
6. Search for an event.
7. Filter events by category.
8. Open Event Details.
9. Demonstrate an empty-search result.
10. Clear the search and restore event listings.
11. Refresh the application and confirm the required session behavior.
12. Demonstrate existing theme switching if verified.
13. Log out.
14. Explain CampusVibes and its value.

Optional community and notification UI features may be shown only when stable and supported by evidence.

### Demo Verification Checklist

- [x] Pinned candidate deployment recorded.
- [x] Candidate Dashboard and Discover checks reported PASS.
- [x] Candidate Search and Category Filter reported PASS.
- [x] Candidate Event Details reported PASS.
- [x] Candidate empty-search recovery reported PASS.
- [x] Primary local backup setup verified.
- [x] Independent local backup setup verified.
- [ ] Confirm the approved demonstration account.
- [ ] Confirm the permitted authentication fallback if needed.
- [ ] Confirm required session behavior.
- [ ] Verify presentation-device browser and layout.
- [ ] Check for blocking browser-console errors.
- [ ] Confirm the backup application runs on the presentation device.
- [ ] Rehearse the complete team demonstration.

**Expected Output:** A repeatable final demonstration with documented limitations and fallback procedures.

---

## 6. Team Responsibilities

| Member | Primary Area | Current Responsibility |
|---|---|---|
| `prachi2061` | MVP Coordination / Frontend Authentication / Implementation | Candidate freeze, automated verification, source explanation and remaining defect coordination |
| `DevyanaCT` | UI/UX, Theme, Firestore Verification and Independent QA | Completed manual Firestore checks and independent backup; remaining runtime evidence review |
| `ujjalpoudel75` | Primary QA and Core Integration | Candidate regression completed with partial result; Google re-login and session retests remaining |
| `tulseyy8848` | Build, Local Setup and Handoff | Primary candidate setup and 118 smoke tests completed; final demo backup support |

### Completed Member Handoffs

- [x] Prachi — Candidate selection and automated verification recorded.
- [x] Ujjal — Final candidate regression report submitted.
- [x] Devyana — Firestore verification and independent backup reports submitted.
- [x] Tulasa — Primary setup and automated smoke-test handoff submitted.

**Note:** Submitted testing handoffs and team release approval are different records. The conditional approval decision is tracked separately in Issue #177.

---

## 7. MVP Freeze Acceptance Criteria

The selected MVP candidate has undergone substantial verification and has a linked conditional team approval record.

| Acceptance Criterion | Status |
|---|---|
| Exact frozen candidate recorded | COMPLETE |
| Revision-specific deployment recorded | COMPLETE |
| Candidate build completed | PASS |
| Candidate automated unit/browser checks | PASS |
| Main event-discovery journey | PASS — Documented candidate checks |
| Previous authentication verification | PASS — Earlier scenarios |
| Candidate Google re-login | PASS — Targeted Week 12 retest; evidence #167/#177 |
| Candidate session behavior | PASS within targeted Week 12 retest scope; broader approval separate |
| Independent Firestore runtime acceptance | Independent local automated QA PASS; partial manual verification; final acceptance separate |
| Firestore published-event mapping | PASS |
| Firestore local error/Retry automation | PASS — Reported |
| Local backup setup | PASS |
| Independent backup review | PASS |
| Theme and notification technical testing | PASS — Previous scope |
| Dependency vulnerability review | OPEN |
| Team conditional approval | RECORDED IN #177 |
| Final demonstration rehearsal | PENDING |

### Freeze Decision

**MVP Scope Freeze:** IN EFFECT.

**Candidate:** `mvp-candidate-2026-11-18`

**Team Decision:** CONDITIONALLY APPROVED — Linked in Issue #177.

**Approval Evidence:** [Team Conditional Approval](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/issues/177#issuecomment-6969792911)

**Final Unconditional Release Readiness:** NOT YET ESTABLISHED.

Conditional approval does not mean every remaining test has passed.

---

## 8. Known Risks and Remaining Blockers

| Risk / Limitation | Impact | Responsible Member / Action |
|---|---|---|
| Google authentication follow-up | Targeted Week 12 Google retests passed; final whole-MVP approval remains separate | `prachi2061` — Review final evidence and release conditions |
| Firestore remaining limitations | Local automated 18 PASS, manual permission-denied UI PASS; manual Retry click/terminal callback not performed | `DevyanaCT` / `prachi2061` — Record formal acceptance or further testing decision |
| Session refresh outcomes pending | Final candidate session persistence not fully verified | `ujjalpoudel75` — Confirm login and logout refresh |
| Search/category resets after refresh | Expected persistence behavior not decided | Team / QA — Confirm requirement |
| Five high-severity npm dependency findings | Security impact not yet assessed | Coordinator / Implementation Owner — Review findings |
| Source explanation pending | Required human ownership evidence remains open | `prachi2061` — Complete source explain-back |
| Screenshot/evidence privacy review | Public evidence may expose sensitive details | Respective owners — Review and redact |
| Final demo rehearsal pending | Presentation-device readiness not established | Team 4 — Complete rehearsal |

### Approved-Fallback Boundaries

- Email/password login may be used as an alternative only if permitted by the recorded conditional approval and course requirements.
- Sample events must be clearly identified as sample listings, not live Firestore published events.
- Automated error injection is not independent proof of all real production-provider failures.
- Accepted limitations must remain documented with follow-up owners.
- The pinned candidate tag must not be silently moved to another commit.

---

## 9. Stretch Goals — After MVP Freeze

**Stretch goals are optional improvements. They must not delay the final demonstration or required verification.**

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
- [ ] Advanced moderation and duplicate detection.

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
- [ ] Additional theme fallback tests.

### Stretch Goal 7 — Advanced Platform Support

- [ ] Broader university support.
- [ ] More clubs and organizations.
- [ ] Improved event analytics.
- [ ] Expanded performance monitoring.

**Stretch Goal Rule:** Begin optional implementation only after the team confirms that remaining MVP obligations and the demonstration schedule permit it.

---

## 10. GitHub Evidence and Tracking

| Area | Evidence |
|---|---|
| Ownership Audit | [Issue #139](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/issues/139) |
| Authentication Testing | [Issue #116](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/issues/116) |
| Core QA | [Issue #138](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/issues/138) |
| Firestore Event Loading | [Issue #117](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/issues/117) |
| Theme Verification | [PR #145](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/pull/145) |
| Local Setup and Backup | [Issue #118](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/issues/118) |
| Firestore Final Verification | [Issue #166](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/issues/166) |
| Google Authentication | [Issue #167](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/issues/167) |
| MVP Freeze Coordination | [Issue #177](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/issues/177) |
| Candidate QA Report | [Ujjal's Final Regression](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/issues/138#issuecomment-6969099874) |
| Primary Setup Handoff | [Tulasa's Verification](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/issues/118#issuecomment-6958484427) |
| Independent Backup Handoff | [Devyana's Verification](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/issues/118#issuecomment-6968864555) |
| Conditional Team Approval | [Issue #177 Approval Comment](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/issues/177#issuecomment-6969792911) |
| Automated Candidate Receipt | [November 18 JSON](Evidence/mvp-candidate-checks-2026-11-18.json) |
| Firestore Runtime Receipt | [November 18 Runtime Report](Evidence/prachi-candidate-runtime-2026-11-18.md) |
| Candidate Auth Repair | [Firebase Hostname Repair](Evidence/prachi-candidate-google-domain-2026-11-18.md) |
| Week 10 Weekly Report | [Weekly Report](../Week10/Weekly-Report.md) |
| Code Ownership Audit | [Ownership Audit](../Week10/ai-use-and-code-ownership-audit.md) |

---

## 11. Final Milestone Summary

| Milestone | Target | Current Status |
|---|---|---|
| Week 9 — MVP Integration | Core implementation and integration | PARTIALLY COMPLETED |
| Week 10 — Ownership and Verification | Explain, test, review and document code | SUBSTANTIALLY DOCUMENTED |
| Week 11 — MVP Freeze | Pin candidate, test, review and decide | CONDITIONALLY APPROVED |
| Week 12 — Final Demo Readiness | Final retests, rehearsal and evidence | IN PREPARATION |
| After Freeze — Stretch Goals | Optional enhancements | DEFERRED |

---

## 12. Final Decision

### November 18 — MVP Freeze and Conditional Team Approval

**Coordinator:** `prachi2061`  
**Candidate Tag:** `mvp-candidate-2026-11-18`  
**Candidate SHA:** `e5f1888aa4600ac2013d6bda34a55554ba68195f`  
**Deployment:** https://campusvibe-fnh5f79me-campus-vibe.vercel.app

### Verified Progress

- [x] Candidate SHA and deployment recorded.
- [x] MVP scope freeze initiated.
- [x] Candidate build PASS.
- [x] 28 unit tests PASS.
- [x] 24 browser cases PASS.
- [x] Additional local Firestore error-handling tests reported PASS.
- [x] Previous Firestore security-rules tests — 40 PASS.
- [x] Devyana's published-event verification — 8 PASS.
- [x] Independent published-event review — 8 PASS.
- [x] Firestore offline/network recovery verified.
- [x] Tulasa's local setup verified.
- [x] Tulasa's 118-case smoke suite PASS.
- [x] Devyana's independent backup verification PASS.
- [x] Ujjal's candidate regression report submitted — PARTIAL PASS.
- [x] Candidate hostname authorization update documented.
- [x] Conditional team approval linked in Issue #177.

## 13. Week 12 — QA Progress, UI Improvements and Final Handoff Update

**Update Date:** November 26, 2026  
**Project:** CampusVibes — Team 4  
**Sprint:** Sprint 3 — QA and Handoff  
**Release Status:** CONDITIONALLY APPROVED — Final MVP approval remains a separate team decision

### A. Objective

Document Week 12 verification, improvements and remaining final-demo requirements without changing the original November 18 frozen MVP candidate or treating newer stretch features as part of the frozen core.

### B. Authentication — Google Sign-In Retesting

**Primary QA:** `ujjalpoudel75`  
**Independent QA:** `tulseyy8848`

- [x] Google account selection verified.
- [x] Login and Dashboard access verified.
- [x] Session persistence after refresh verified within the tested scope.
- [x] Logout persistence verified.
- [x] Google re-login verified.
- [x] Cancelled-popup recovery verified.

**Primary QA:** 6 PASS, 0 reported FAIL.  
**Independent QA:** 6 PASS, 0 FAIL.

**Status:** PASS — Targeted Week 12 authentication retesting.

**Limitation:** These results apply to the tested candidate and recorded scenarios. They do not independently establish complete application readiness or replace final team approval.

**Evidence:**
- [Authentication QA — Issue #167](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/issues/167)
- [Final Handoff — Issue #177](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/issues/177)

### C. Independent Firestore Runtime QA

**Tester:** `DevyanaCT`

**Automated Verification — November 19:**
- [x] Independent automated test execution.
- [x] Desktop and mobile test coverage.
- [x] Authenticated Firestore session.
- [x] Permission-denied error handling.
- [x] Controlled terminal loading error.
- [x] Retry recovery.
- [x] Authenticated core flow and logout.

**Automated Result:** 18 PASS, 0 FAIL.

**Manual Verification — November 23:**
- [x] Application-level permission-denied error reproduced.
- [x] User-friendly error message verified.
- [x] `Retry shared events` button visibility verified.
- [x] Sample event listings remained accessible.
- [x] Original local security rules restored — HTTP 200.
- [x] Normal Discover recovery observed.
- [ ] Retry button manually clicked and verified.
- [ ] Separate terminal loading-error callback manually reproduced.

**Manual Status:** PARTIAL — Permission-denied UI PASS; normal recovery observed; separate manual terminal-error and button-driven Retry checks not performed.

**Testing Boundary:** Isolated Firebase Emulators, fictional test accounts and a separate QA revision. Production Firebase rules and records were not changed.

**Evidence:**
- [Firestore QA — Issue #166](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/issues/166)
- [Independent Automated QA — 18 PASS](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/issues/166#issuecomment-7003471002)

### D. Search and Category Filtering

**Manual Functional Result:** PASS

- [x] Existing-event search verified.
- [x] Social category filtering verified.
- [x] Combined search/category filtering verified.
- [x] Appropriate empty-state message verified.
- [x] Matching event restored after changing filters.
- [x] Search behavior after refresh documented.
- [x] Category behavior after refresh documented.

**Observed Refresh Behavior:**
- Search query cleared after refresh.
- Category selection reset to default.
- Event listings remained available.

**Outstanding Requirement:** Confirm whether the search/category settings are intended to persist or reset.

**Owner:** `prachi2061` / responsible Discover implementation owner.

**Status:** Functional PASS — Refresh persistence requirement pending.

**Evidence:** [Issue #166 — Manual QA and Screenshots](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/issues/166)

### E. RSVP — Independent Manual QA

**Tester:** `DevyanaCT`

**Result:** 12 PASS, 0 FAIL within the tested scenarios.

Verified:

- [x] Joining an event.
- [x] Cancelling RSVP.
- [x] Refresh persistence.
- [x] Fresh-session account persistence.
- [x] Cross-account isolation.
- [x] Offline failure handling.
- [x] Reconnection and recovery.
- [x] Save/Share regression checks.
- [x] Responsive mobile behavior.

**Status:** PASS — Documented independent manual testing scope.

**Important:** This verification supports the newer RSVP implementation and must not be treated as proof that the feature belonged to the November 18 frozen core.

**Evidence:**
- [RSVP QA — Issue #193](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/issues/193)
- [RSVP Repair — PR #195](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/pull/195)

### F. Event Trip Planner — Independent Manual QA

**Tester:** `DevyanaCT`

Verified within the tested scope:

- [x] Event destination handling.
- [x] Google Maps integration.
- [x] Public transit availability.
- [x] Location permission behavior.
- [x] Copy address.
- [x] Nearby bus stops.
- [x] Responsive simulated mobile layout.
- [x] Keyboard accessibility.
- [x] Trip lifecycle.

**Known Limitations:**
- Google Maps did not provide walking, driving and cycling directions for the tested Ulsan route.
- Theme switching required closing Event Details in the tested UI.
- Physical-device coverage was not established.

**Status:** PASS within the documented tested scope, with external provider and UI limitations.

**Evidence:**
- [Trip Planner QA — Issue #197](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/issues/197)
- [Trip Planner — PR #196](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/pull/196)

### G. Additional UI and Navigation Regression

**Primary QA:** `ujjalpoudel75`

Reported Week 12 results:

- Updated Discover, filtering, navigation, responsive layout and personal-plan actions: **12 PASS, 0 reported FAIL**.
- Restored navigation icon regression on desktop and simulated mobile: **6 PASS, 0 reported FAIL**.

Additional implementation work was documented for:

- Discover usability and event presentation.
- Restored compact navigation header.
- Restored Dashboard sections.
- Saved-event View Details behavior.

**Evidence:**
- [Discover Usability — PR #200](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/pull/200)
- [Navigation Header — PR #202](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/pull/202)
- [Dashboard Restoration — PR #203](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/pull/203)
- [Saved View Details — PR #204](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/pull/204)

These newer UI changes have their own verification records and should not be silently included in the pinned November 18 candidate.

### H. Updated Verification Summary

| Verification Area | Latest Documented Result |
|---|---|
| November 18 MVP freeze | Conditionally approved |
| Google Sign-In targeted retest | 6 PASS primary QA; 6 PASS independent QA |
| Independent Firestore automation | 18 PASS, 0 FAIL |
| Manual permission-denied UI | PASS |
| Firestore rule restoration | HTTP 200 — PASS |
| Manual Retry button execution | NOT TESTED |
| Manual terminal-error callback | NOT TESTED |
| Search and category filtering | PASS |
| Search/filter refresh requirement | PENDING |
| RSVP independent QA | 12 PASS, 0 FAIL |
| Event Trip Planner | PASS within tested scope |
| Updated Discover regression | 12 PASS, 0 reported FAIL |
| Navigation icon regression | 6 PASS, 0 reported FAIL |
| Final whole-MVP release approval | NOT YET ESTABLISHED |

### I. Remaining Risks and Next Actions

| Remaining Item | Owner / Action |
|---|---|
| Search/filter refresh persistence requirement | `prachi2061` — Confirm expected behavior |
| Manual terminal error and Retry coverage | `DevyanaCT` / coordinator — Accept documented automated coverage or request additional manual tests |
| Trip Planner provider/theme limitations | UI implementation owner — Review if additional changes are required |
| Dependency security findings | Implementation coordinator — Review and document disposition |
| Presentation-device verification | Team 4 — Verify final demonstration environment |
| Final rehearsal | Team 4 — Complete team rehearsal |
| Final MVP approval | Coordinator/team — Review remaining conditions and record the decision |

### J. Final Week 12 Handoff Position

The Week 12 activities strengthened the existing MVP verification evidence.

Targeted Google authentication retesting, independent Firestore automation, manual Firestore error handling, RSVP lifecycle testing, Event Trip Planner testing, and additional UI/navigation regression checks were documented.

The frozen November 18 candidate remains the formal reference for the existing conditional approval. Later feature work and deployed-app testing have separate evidence and release boundaries.

**Final Status: CONDITIONAL MVP APPROVAL RETAINED — Week 12 Verification Advanced; Outstanding Decisions and Demonstration Readiness Checks Remain.**

Do not claim unconditional release approval until the responsible team records that decision.

### Remaining Follow-Up

- [ ] Confirm successful real-account Google re-login.
- [ ] Confirm session refresh and refresh-after-logout behavior.
- [ ] Complete independent Firestore runtime evidence review.
- [ ] Confirm search/filter persistence requirements.
- [ ] Review dependency vulnerability findings.
- [ ] Complete required source explanation and ownership handoff.
- [ ] Verify final presentation-device readiness.
- [ ] Complete team rehearsal.
- [ ] Resolve or document outstanding conditions before claiming unconditional release readiness.

### Conditional Team Approval

The November 18 freeze record identifies a conditional team approval linked in Issue #177.

**Recorded Team Decision:** CONDITIONALLY APPROVED.

**Approval Evidence:** [Team 4 Conditional Approval](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/issues/177#issuecomment-6969792911)

This decision is recorded for the pinned candidate with outstanding verification and follow-up requirements.

Unverified behavior is not represented as PASS solely because the team has recorded conditional approval.

### Final Status

**MVP Candidate:** SELECTED.

**Scope Freeze:** IN EFFECT.

**Local Automated Verification:** PASS — Documented scope.

**Independent Backup Verification:** PASS.

**Candidate Authenticated Regression:** PARTIAL PASS.

**Team MVP Decision:** CONDITIONALLY APPROVED — Linked in Issue #177.

**Remaining Requirements:** FOLLOW-UP REQUIRED.

**Unconditional Final Release Readiness:** NOT YET ESTABLISHED.

**Conclusion:** CampusVibes Team 4 has selected and tested a frozen MVP candidate, completed substantial automated and independent verification, and linked the conditional approval decision. The team will complete or appropriately resolve the remaining checks while preparing the final demonstration.

**Final Principle:** Preserve the candidate, verify the agreed core journey, document evidence accurately, keep limitations visible and demonstrate only functionality supported by actual results.

---

## November 16 — Historical Verification Checkpoint

The November 16 verification assessment recorded the earlier status of authentication, Firestore and ownership verification.

At that time, the exact freeze candidate, independent backup and final team decision had not yet been completed.

See [MVP Verification Checklist](MVP-Verification-Checklist.md) for the historical expected/actual assessment.

The November 18 update above supersedes the older pending statuses without changing historical testing evidence.
