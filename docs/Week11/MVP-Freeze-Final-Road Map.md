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
| Authentication | Login, logout, password recovery and session management | Partially verified |
| Dashboard | Student dashboard and navigation | Tested |
| Event Discovery | Event lists, search, categories and event details | Tested |
| Firestore Integration | Published-event querying, display and basic recovery | Partially verified |
| UI/UX | Responsive interface, light/dark theme and accessible controls | Theme verification passed |

Community features and additional services may be demonstrated where stable but must not block the core MVP freeze.

---

## 3. Completed Work — Weeks 9–10

### A. Authentication and Core Journey

- [x] Login and Dashboard checks documented.
- [x] Event Search tested.
- [x] Category Filtering tested.
- [x] Event Details tested.
- [x] Empty Search behavior tested.
- [x] Session Refresh tested.
- [x] Google popup cancellation and retry behavior checked.
- [x] Complete Playwright regression rerun: 80 PASS.
- [ ] Complete real Google-account Sign-In and session verification. [Issue #167](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/issues/167)

**Evidence:** Issues #116, #138 and #139.

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
- [x] Confirmed Firestore Listen query with HTTP 200.
- [x] Verified published event `story time`.
- [x] Tested search and category filtering.
- [x] Reported successful search/filtering with another published event.
- [x] Verified event visibility after refresh.
- [x] Verified available event details and missing-field fallbacks.
- [x] Tested network interruption and reconnection.
- [x] Confirmed Firestore communication resumed with HTTP 200.
- [x] Local Firestore security-rules tests: 40 PASS, 0 FAIL.
- [ ] Verify application-level permission-denied handling. [Issue #166](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/issues/166)
- [ ] Verify application-level loading-error handling.[Issue #166](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/issues/166)
- [ ] Complete field mapping for additional published events.[Issue #166](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/issues/166)
- [ ] Confirm intended search/filter persistence after refresh.[Issue #166](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/issues/166)

**Evidence:** [Issue #117](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/issues/117) [Issue #166](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/issues/166)

**Status:** PARTIALLY VERIFIED.

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

- [ ] Complete Firebase authentication verification.
- [ ] Verify login, logout, password reset and session recovery.
- [ ] Resolve or document the Google Sign-In limitation.
- [ ] Complete controlled Firestore permission-error testing.
- [ ] Complete controlled Firestore loading-error testing.
- [ ] Compare additional Firestore event fields with the displayed UI.
- [ ] Verify the intended search/filter behavior after refresh.
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
| Google Sign-In not fully verified | Authentication demo may fail | Confirm real provider flow or approved fallback |
| Firestore application-level errors untested | Loading or permission failures may not display correctly | Controlled local testing |
| Additional event field mapping incomplete | Some event details may be inconsistent | Compare Firestore documents with UI |
| Search/category selections reset on refresh | Potential UX mismatch | Confirm product requirements |
| Missing independent handoff confirmations | Week 10 audit remains incomplete | Obtain named reviewer evidence |
| Unredacted network screenshots | Security/privacy exposure | Redact and replace affected evidence |
| Demo environment differences | Local and deployed behavior may differ | Test the final presentation environment |

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

### Remaining Priorities

1. Complete or formally document remaining authentication limitations.
2. Complete critical application-level Firestore checks.
3. Confirm the MVP feature-freeze scope.
4. Finish required independent handoffs and role confirmations.
5. Record the exact freeze candidate and run final regression tests.
6. Prepare the presentation and backup demonstration.
7. Approve the final MVP freeze before beginning optional stretch work.

**Conclusion:** CampusVibes has a working and partially verified core with substantial Week 10 testing evidence. The next milestone is a stable MVP freeze, followed by final demonstration readiness. Stretch features remain optional and should be developed only after required functionality, verification, and freeze approval are secured.
