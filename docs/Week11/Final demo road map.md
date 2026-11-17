# CampusVibes — Final Demo Roadmap

**Project:** CampusVibes  
**Team:** 4  
**Course:** Capstone Design — Fall 2026  
**Date:** November 15, 2026  
**Status:** MVP Freeze Verification and Final Demo Preparation

## 1. Project Overview

CampusVibes is a web application that helps college students discover campus events, clubs, and student activities in one place.

Our final goal is to deliver a stable and functional Minimum Viable Product (MVP) and demonstrate its main features with reliable testing evidence.

**Live Website:** https://campusvibe-theta.vercel.app/

## 2. Final MVP Scope

The final demonstration will focus on:

- User authentication and account access.
- Dashboard and navigation.
- Event discovery.
- Event search and category filters.
- Event details.
- Club information.
- Firebase and Firestore integration.
- Theme and user interface.
- Error handling and application reliability.

The team will prioritize existing functionality rather than introducing unnecessary new features before the final demo.

## 3. Completed Testing and Verification Evidence

### A. Core Application Testing
- Core user journey regression testing.
- Event discovery and search.
- Category filtering.
- Event details.
- Dashboard navigation.
- Session refresh behavior.

Previously recorded regression result: 80 PASS.

### B. Theme and Notification Testing
- Light/dark theme switching.
- Theme persistence after refresh.
- Accessible theme-button labels.
- Notification interface checks.
- Saved-event read-status behavior.

Recorded result: 8 PASS, 0 FAIL.

Live Firestore notification delivery still requires separate verification.

### C. Firestore Security Testing
- Firestore security-rules testing.
- Published-event access checks.
- Data access and permission testing.

Recorded local security-rules result: 40 PASS, 0 FAIL.

Application-level error handling must be verified separately.

### C.1 — Week 11 Firestore Integration Verification

**Tester:** `DevyanaCT`  
**Independent Reviewer:** `tulseyy8848`  
**Testing Dates:** November 16–17, 2026

- [x] Firebase Authentication and Firestore Emulator connections verified.
- [x] Published-event security rules and listener inspected.
- [x] Unauthenticated Firestore Emulator GET returned HTTP 403 Forbidden.
- [x] Published-event field mapping reviewed in source code.
- [x] Second published-event comparison — 8 PASS, 0 FAIL.
- [x] Independent reviewer also reported 8 PASS, 0 FAIL.
- [x] Supporting published-event screenshots attached in Issue #166.
- [x] Offline Discover retained 14 cached published events and 9 sample listings.
- [x] Cached-data warning and Retry button were visible.
- [x] Cached warning disappeared after reconnecting.
- [x] Production Firestore Listen returned HTTP 200 after recovery.
- [x] Tested temporary Firestore request blocking using Chrome DevTools.
- [x] Confirmed Firestore network requests were blocked.
- [x] Confirmed Discover remained accessible with 9 sample listings during request blocking.
- [x] Verified the no-cached-events warning and Retry button were displayed.
- [x] Disabled browser request blocking and confirmed 14 published events and 9 sample listings returned.
- [x] Confirmed the warning disappeared and normal Discover functionality was restored.

**Remaining:**
- [ ] Verify actual application-level permission-denied error UI.
- [ ] Verify application-level Firestore loading-error callback and error-state Retry.
- [ ] Confirm intended search/filter persistence after refresh.

**Evidence:** [Issue #166](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/issues/166), [Issue #117](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/issues/117)

**Status:** Published-event mapping and network recovery verified; application-level runtime error checks pending.

**Note:** Direct Emulator HTTP 403 and production network recovery do not prove the application-level error callbacks.


### D. Google Authentication and Email Verification Evidence

**Primary QA:** `ujjalpoudel75`  
**Independent QA Reviewer:** `DevyanaCT`

#### Week 11 — Google Sign-In and Session Verification

- [x] Real Google Sign-In and Dashboard access tested.
- [x] Session persistence after refresh tested.
- [x] Logout and Google re-login tested.
- [x] Browser-restart session scenarios documented.
- [x] Remember Me behavior tested in reported scenarios.
- [x] Independent Google/session verification completed by `DevyanaCT` — 5 PASS, 0 FAIL.

**Existing Screenshots:**
- `W11-01-google-dashboard.png`
- `W11-02-google-refresh.png`

#### November 16 — Email Verification Testing

**Tester:** `ujjalpoudel75`

- [x] EV-01 — Email verification requirement displayed.
- [x] EV-02 — Firebase verification email received.
- [x] EV-03 — Verification link opened Firebase action page.
- [x] EV-04 — Firebase confirmed successful email verification.
- [x] EV-05 — Authenticated Dashboard opened.

**Result:** 5 PASS, 0 FAIL.

**Screenshot Evidence:**
- `W11-09-email-verification-required.png`
- `W11-10-verification-email-received.png`
- `W11-11-verification-action.png`
- `W11-12-email-verified.png`
- `W11-13-verified-dashboard.png`

**Remaining:**
- [ ] Confirm Remember Me unchecked behavior after browser restart.
- [ ] Confirm password-recovery evidence where required.
- [ ] Repeat final authentication regression on the selected MVP freeze candidate.

**Evidence:** [Issue #167](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/issues/167)

**Status:** Google authentication and email-verification scenarios passed; final freeze-candidate regression pending.

## 4. MVP Freeze Roadmap

### Phase 1 — Freeze Core Functionality
- Review the MVP feature list.
- Stop unnecessary feature additions.
- Review open GitHub issues.
- Identify critical and high-priority defects.
- Select and record the MVP freeze candidate commit.
- Confirm the features included in the final demo.

### Phase 2 — Complete Verification
- Verify login and authentication.
- Check Google Sign-In behavior.
- Verify dashboard and session refresh.
- Test event discovery and filtering.
- Verify event details.
- Review Firestore error handling.
- Review privacy-related bug evidence.
- Retest important fixes.

### Phase 3 — UI and Quality Checks
- Check light/dark theme.
- Verify responsive layouts.
- Check navigation and buttons.
- Review accessibility.
- Check loading and empty states.
- Verify error messages.
- Run regression testing.

### Phase 4 — Final Demo Preparation
- Verify the deployed application.
- Prepare a local development backup.
- Prepare an approved demonstration account.
- Organize screenshots and testing reports.
- Update GitHub documentation.
- Prepare presentation slides.
- Rehearse the complete user journey.

## 5. Final Demo User Journey

| Step | Feature | Demonstration |
|---|---|---|
| 1 | Landing Page | Introduce CampusVibes |
| 2 | Login | Demonstrate authentication |
| 3 | Dashboard | Show the main dashboard |
| 4 | Discover Events | Show available events |
| 5 | Search & Filters | Search and filter events |
| 6 | Event Details | Open an event |
| 7 | Clubs | Show available club information |
| 8 | Theme | Demonstrate light/dark mode |
| 9 | Conclusion | Explain project value |

## 6. Local Backup Demonstration

The deployed website remains the primary demonstration platform.

The local React application will be prepared as a backup.

Previous testing evidence dated November 10, 2026:
- Vite development server started successfully.
- Dashboard opened.
- Discover Events page opened.
- Music category filter displayed 2 matching events out of 9.
- Open Mic & Poetry Night event details opened.
- Game Devs Guild club details popup opened.

**Next step:** Repeat local setup verification using the final MVP freeze candidate.

Evidence: GitHub Issue #118.

## 7. Week 11 Evidence Organization

The following evidence is available in `docs/Week11/Evidence/`:

| Evidence File / Location | Purpose |
|---|---|
| `W11-01-google-dashboard.png` | Google Dashboard verification |
| `W11-02-google-refresh.png` | Google session refresh verification |
| `W11-09-email-verification-required.png` | Email-verification requirement |
| `W11-10-verification-email-received.png` | Firebase verification email delivery |
| `W11-11-verification-action.png` | Verification action page |
| `W11-12-email-verified.png` | Email verification successful |
| `W11-13-verified-dashboard.png` | Authenticated Dashboard access |
| `prachi-member-id-privacy-bug-report-2026-11-15.md` | Privacy bug documentation |
| `prachi-member-id-privacy-production-2026-11-15.json` | Production verification receipt |
| [Issue #166](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/issues/166) | Firestore field-mapping screenshots, Emulator HTTP 403, and network recovery findings |
| [Issue #167](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/issues/167) | Google authentication and email-verification testing |

## 8. Individual Responsibilities

Each team member should:

- Explain their assigned development area.
- Demonstrate their actual contribution.
- Provide testing evidence.
- Explain known limitations.
- Support final regression testing.
- Participate in the final presentation.

### Individual Responsibility — tulseyy8848

**Primary Area:** Build, Local Setup and Development Handoff.

Responsibilities:
- Verify local development setup.
- Check setup instructions.
- Start and test the Vite development server.
- Prepare local backup demonstration.
- Organize setup and testing screenshots.
- Maintain accurate documentation.
- Support the team's development handoff.

Previous evidence: Issue #118.

Next action: Verify the latest MVP freeze candidate and record updated results.

## 9. Remaining Tasks

| Task | Priority | Status |
|---|---|---|
| Google Sign-In and session verification | P1 | PASS — Previous Week 11 scenarios |
| Email-verification workflow | P1 | PASS — 5/5 |
| Final authentication regression on freeze candidate | P1 | PENDING |
| Firestore unauthorized Emulator read | P1 | PASS — HTTP 403 |
| Firestore cached/offline recovery | P1 | PASS |
| Published-event field mapping | P1 | PASS — 8/8 |
| Independent published-event review | P2 | PASS — 8/8 reviewer-reported |
| Application-level Firestore permission-denied UI | P1 | PENDING |
| Application-level Firestore loading-error/retry | P1 | PENDING |
| Search/filter refresh requirement | P2 | PENDING CONFIRMATION |
| Privacy bug evidence and final regression | P2 | Follow-up verification |
| Event discovery regression on freeze candidate | P1 | PENDING |
| Theme and accessibility on final candidate | P2 | PENDING |
| Local backup verification | P2 | PENDING |
| Evidence organization and privacy review | P2 | IN PROGRESS |
| Final presentation preparation | P2 | PENDING |
| Team rehearsal | P2 | PENDING |
| Firestore browser request-blocking and recovery | P1 | PASS — Discover remained usable and published events returned |


## 10. Final Demo Success Criteria

The final demonstration is ready when:

- The application launches successfully.
- Login and authentication work as expected.
- Dashboard navigation works.
- Event discovery and search work.
- Category filters work.
- Event details display correctly.
- Theme behavior is verified.
- Privacy-related issues are reviewed.
- No unresolved critical issue blocks the demo.
- Local backup setup is reproducible.
- Evidence is organized and accessible.
- Every team member can explain their contribution.

### Final MVP Freeze Candidate Requirements

- [ ] Record the exact team-selected freeze candidate commit SHA.
- [ ] Record the deployed URL corresponding to that SHA.
- [ ] Repeat the full authenticated core journey on the candidate.
- [ ] Verify existing event discovery and published-event display.
- [ ] Review outstanding Firestore runtime error limitations with the team.
- [ ] Confirm local setup and backup demo on the same candidate.
- [ ] Verify all screenshots and evidence links.
- [ ] Record the final team freeze decision.

**Final MVP Freeze Approval:** PENDING.

**Evidence:** [Issue #177](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/issues/177)

## 11. Future Improvements

After the MVP is stable, potential improvements include:

- Personalized event recommendations.
- Better club discovery.
- Advanced event filtering.
- Improved mobile responsiveness.
- Additional notification features.
- Better student engagement tools.

These improvements should not delay the final MVP demonstration.

## 12. Final Goal

Our goal is to present CampusVibes as a reliable campus activity discovery platform.

Team 4 will focus on completing MVP verification, improving application stability, maintaining transparent testing evidence, explaining individual contributions, and delivering a successful final demonstration.

**Final Principle: Stabilize the MVP, verify the core user journey, document evidence honestly, and demonstrate only features that the team can support with actual results.**


## November 16 Week 11 verification checkpoint

Use the [filled MVP Verification Checklist](MVP-Verification-Checklist.md) for the current expected/actual core-path assessment, separate severity/P-levels, owners, evidence limits and smallest recovery actions. This dated assessment supersedes older unqualified readiness statements above; historical test results keep their own dates.

The existing feature promise stays unchanged. Devyana's [November 15 independent Google/session receipt](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/issues/167#issuecomment-6889397205) establishes five reported scenarios, so full Google login is no longer described as wholly untested. It does not identify the final freeze SHA. The recommendation is to retain scope and follow the recovery/verification route until required #166 runtime gaps, final candidate regression and approval are recorded. Final team freeze approval is **PENDING**.

Prachi coordinates [#177](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/issues/177): record the candidate/URL with QA; arrange a named core-path and boundary repeat; carry exact Firestore gaps from #166; confirm setup/backup in #118; and record the actual team decision. **Next checkpoint: November 18, 2026, end of day KST.** P1 required verification precedes P2 reliability/setup/handoff; P3 features remain deferred. No P0 application blocker is established by this documentation assessment.

The [Sprint 2 quality record](Sprint-quality-quick-checks.md), [Prachi contribution/next actions](Evidence/prachi-week11-requirements-2026-11-16.md), [shared report](Weekly-Report.md) and [current area map](../Week10/ai-use-and-code-ownership-audit.md#codebase-area-map) complete the links. Privacy/Friends corrections remain supporting work; their automated success does not certify the entire Events demo. No new runtime, human review or team vote is claimed here.


## November 17 — Week 11 Verification Progress Update

### Authentication — `ujjalpoudel75`

- Real Google Sign-In, Dashboard, session and logout/re-login scenarios previously tested.
- Independent Google authentication QA by `DevyanaCT`: 5 PASS, 0 FAIL.
- November 16 email-verification workflow: EV-01 to EV-05 — 5 PASS, 0 FAIL.
- Five email-verification screenshots recorded.
- Final freeze-candidate regression remains pending.

**Evidence:** [Issue #167](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/issues/167)


### Firestore — `DevyanaCT`

- Local Firebase Authentication and Firestore Emulator connectivity verified.
- Unauthenticated Firestore Emulator GET returned HTTP 403 Forbidden.
- Published-event field mapping inspected in source code.
- Second published-event manual comparison: 8 PASS, 0 FAIL.
- Independent reviewer `tulseyy8848` also reported 8 PASS, 0 FAIL.
- Supporting published-event screenshots attached in Issue #166.
- Offline Discover retained 14 cached published events and 9 sample listings.
- Cached-results warning and Retry button appeared during offline testing.
- Production Firestore Listen returned HTTP 200 after reconnection.
- Temporary Firestore request blocking tested using Chrome DevTools.
- Discover remained accessible with 9 sample listings while Firestore requests were blocked.
- Disabling request blocking restored 14 published events and 9 sample listings.
- Actual application-level permission-denied and terminal loading-error/retry behavior remain unverified.
- Search/filter persistence requirement confirmation remains pending.
- No application source code, Firestore rules or database records were modified.

**Evidence:** [Issue #166 — Firestore Final Verification](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/issues/166)

**Status:** Completed network-resilience and published-event checks PASS; application-level runtime error tests remain open.

### Final MVP Freeze

- [ ] Team-selected freeze candidate SHA recorded.
- [ ] Final candidate regression completed.
- [ ] Backup demo independently verified on selected candidate.
- [ ] Remaining required Firestore limitations formally resolved or accepted.
- [ ] Team freeze approval recorded.

**Freeze Status:** PENDING.

**Coordinator:** `prachi2061`  
**Tracking:** [Issue #177](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/issues/177)

No new features are included in this update. The team remains focused on stabilizing and demonstrating the existing MVP.

