
# CampusVibes — Final Demo Roadmap

**Project:** CampusVibes  
**Team:** 4  
**Course:** Capstone Design — Fall 2026  
**Originally Prepared:** November 15, 2026  
**Last Updated:** November 18, 2026  
**Candidate Tag:** `mvp-candidate-2026-11-18`  
**Candidate SHA:** `e5f1888aa4600ac2013d6bda34a55554ba68195f`  
**Candidate Deployment:** https://campusvibe-fnh5f79me-campus-vibe.vercel.app  
**Status:** MVP Scope Freeze in Effect — CONDITIONALLY APPROVED

**Team Approval Evidence:** [Issue #177 — Conditional Team Approval](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/issues/177#issuecomment-6969792911)

---

## 1. Project Overview

CampusVibes is a web application that helps college students discover campus events, clubs, and student activities in one place.

Our goal is to deliver a stable and functional Minimum Viable Product (MVP) and demonstrate its main features with reliable testing evidence.

**Stable Public Website:** https://campusvibe-theta.vercel.app/

**Pinned Candidate Deployment:** https://campusvibe-fnh5f79me-campus-vibe.vercel.app

The revision-specific deployment is used for final candidate verification because the stable public alias may advance to another revision.

---

## 2. Final MVP Scope

The final demonstration will focus on:

- User authentication and verified login.
- Dashboard and navigation.
- Event discovery.
- Event search and category filtering.
- Event details.
- Empty-search and recovery behavior.
- Session refresh and logout.
- Firebase Authentication and Firestore integration.
- Existing theme and responsive design.
- Error handling and application reliability.
- Local backup demonstration.

### Frozen Demonstration Journey

Landing Page → Verified Login → Dashboard → Discover Events → Search/Category Filter → Event Details → Session Refresh → Logout.

Sample events must remain clearly distinguished from published Firestore events.

Assistant, Community/Feed, friends, messages, badges, maps, notifications and other optional enhancements remain outside the frozen demonstration promise.

No unnecessary new features or redesigns will be introduced during the MVP freeze.

---

## 3. Completed Testing and Verification Evidence

### A. Core Application Testing

Previously completed testing covered:

- Core user journey regression.
- Event discovery and search.
- Category filtering.
- Event details.
- Dashboard navigation.
- Session refresh behavior.

**Previously Recorded Regression Result:** 80 PASS.

### B. Theme and Notification Testing

Previously completed checks included:

- Light/dark theme switching.
- Theme persistence after refresh.
- Accessible theme-button labels.
- Notification interface checks.
- Saved-event read-status behavior.

**Recorded Result:** 8 PASS, 0 FAIL.

Live Firestore notification delivery remains a separate verification requirement.

### C. Firestore Security Testing

Previously completed checks included:

- Firestore security-rules testing.
- Published-event access checks.
- Data access and permission testing.

**Recorded Local Security-Rules Result:** 40 PASS, 0 FAIL.

Application-level error handling must be evaluated separately from security-rule results.

### C.1 — November 16–17 Firestore Integration Verification

**Tester:** `DevyanaCT`  
**Independent Reviewer:** `tulseyy8848`

- [x] Firebase Authentication and Firestore Emulator connectivity verified.
- [x] Published-event security rules and listener inspected.
- [x] Unauthenticated Firestore Emulator GET returned HTTP 403 Forbidden.
- [x] Published-event field mapping inspected in source code.
- [x] Published-event comparison — 8 PASS, 0 FAIL.
- [x] Independent reviewer reported 8 PASS, 0 FAIL.
- [x] Supporting screenshots recorded in Issue #166.
- [x] Offline Discover retained 14 cached published events and 9 sample listings.
- [x] Cached-data warning and Retry button observed.
- [x] Warning disappeared after reconnecting.
- [x] Production Firestore Listen returned HTTP 200 after recovery.
- [x] Browser Firestore request-blocking tested using Chrome DevTools.
- [x] Discover remained accessible with 9 sample listings during request blocking.
- [x] Removing request blocking restored 14 published events and 9 sample listings.

**Result:** PASS — Published-event mapping and documented network-recovery checks.

**Evidence:** [Issue #166 — Firestore Verification](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/issues/166)

**Limitation:** HTTP 403 and network-blocking checks do not independently prove the application's terminal listener-error callbacks.

### C.2 — November 18 Candidate-Specific Firestore Automated Verification

**Coordinator:** `prachi2061`  
**Independent Verification Contact:** `DevyanaCT`  
**Candidate SHA:** `e5f1888aa4600ac2013d6bda34a55554ba68195f`

Prachi's November 18 local automated tests reported:

- [x] Firestore Emulator permission-denied handling.
- [x] Controlled terminal loading-error callback.
- [x] Retry recovery under simulated errors.
- [x] Desktop and mobile viewport checks.
- [x] Additional authenticated/emulator/error-recovery browser cases.

**Result:** PASS — Documented local automated verification.

**Remaining:**

- [ ] Independent review of the candidate-specific runtime evidence.
- [ ] Further deployed-runtime acceptance if required.
- [ ] Confirm intended search/filter behavior after refresh.

**Evidence:** [Prachi's Runtime Test Receipt](Evidence/prachi-candidate-runtime-2026-11-18.md)

Local error injection does not independently establish real production-provider failure behavior.

### D. Google Authentication and Email Verification

**Primary QA:** `ujjalpoudel75`  
**Independent Reviewer:** `DevyanaCT`

#### Previous Week 11 Authentication Verification

- [x] Real Google Sign-In and Dashboard access previously tested.
- [x] Session persistence after refresh previously tested.
- [x] Logout and Google re-login previously tested.
- [x] Browser-restart scenarios documented.
- [x] Remember Me behavior tested in reported scenarios.
- [x] Devyana's independent Google/session checks — 5 PASS, 0 FAIL.

**Existing Screenshots:**

- `W11-01-google-dashboard.png`
- `W11-02-google-refresh.png`

#### November 16 — Email Verification

**Tester:** `ujjalpoudel75`

- [x] EV-01 — Email verification requirement displayed.
- [x] EV-02 — Firebase verification email received.
- [x] EV-03 — Verification link opened.
- [x] EV-04 — Firebase confirmed successful verification.
- [x] EV-05 — Authenticated Dashboard opened.

**Result:** 5 PASS, 0 FAIL.

**Screenshot Evidence:**

- `W11-09-email-verification-required.png`
- `W11-10-verification-email-received.png`
- `W11-11-verification-action.png`
- `W11-12-email-verified.png`
- `W11-13-verified-dashboard.png`

### D.1 — November 18 Final Candidate Regression

**Tester:** `ujjalpoudel75`  
**Candidate SHA:** `e5f1888aa4600ac2013d6bda34a55554ba68195f`

| Test | Result |
|---|---|
| Authenticated Dashboard | PASS |
| Discover Events | PASS |
| Event Search | PASS |
| Category Filter | PASS |
| Event Details | PASS |
| Empty Search | PASS — Tester-reported |
| Search Recovery | PASS — Tester-reported |
| Logout | PASS |
| Email/Password Login | PASS — Tester-reported |
| Session Refresh | PENDING CONFIRMATION |
| Refresh After Logout | PENDING CONFIRMATION |
| Google Re-Login | RETEST REQUIRED |

Ujjal initially encountered a Google Sign-In configuration error on the revision-specific deployment.

Prachi subsequently documented adding the candidate deployment hostname to Firebase authorized domains.

Provider-page and popup readiness were reported after the configuration change, but successful real-account Google re-login remains unconfirmed.

**Overall Candidate QA Result:** PARTIAL PASS.

**Evidence:** [Ujjal's Final Candidate Regression Report](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/issues/138#issuecomment-6969099874)

---

## 4. MVP Freeze Roadmap

### Phase 1 — Freeze Core Functionality

- [x] Review the MVP feature list.
- [x] Stop unnecessary feature additions.
- [x] Identify the pinned MVP candidate.
- [x] Record the exact candidate SHA.
- [x] Record the revision-specific deployment.
- [x] Define the final core demonstration journey.

### Phase 2 — Complete Verification

- [x] Perform candidate build and automated verification.
- [x] Perform candidate event-discovery regression.
- [x] Test search, category filtering and event details.
- [x] Record existing Firestore testing evidence.
- [x] Complete local automated Firestore error-handling checks.
- [x] Complete primary local backup verification.
- [x] Complete independent local backup verification.
- [ ] Confirm real-account Google re-login.
- [ ] Confirm remaining session behavior.
- [ ] Complete independent Firestore runtime evidence review.
- [ ] Confirm search/filter refresh expectations.

### Phase 3 — UI and Quality Checks

- Review light/dark theme behavior.
- Review responsive layouts.
- Verify navigation and buttons.
- Review accessibility.
- Check loading and empty states.
- Verify error messages.
- Retain regression evidence.

### Phase 4 — Final Demo Preparation

- Verify the approved candidate demonstration route.
- Prepare the local backup.
- Prepare an approved demonstration account.
- Organize screenshots and reports.
- Update GitHub documentation.
- Prepare presentation slides.
- Rehearse the final user journey.
- Record the accepted limitations and fallback procedure.

---

## 5. Final Demo User Journey

| Step | Feature | Demonstration |
|---|---|---|
| 1 | Landing Page | Introduce CampusVibes |
| 2 | Verified Login | Demonstrate authentication |
| 3 | Dashboard | Show the main dashboard |
| 4 | Discover Events | Show available events |
| 5 | Search | Search for an event |
| 6 | Category Filter | Filter event categories |
| 7 | Event Details | Open an event |
| 8 | Empty Search Recovery | Show no-results state and clear search |
| 9 | Session Refresh | Verify signed-in state |
| 10 | Logout | Return to Login |
| 11 | Conclusion | Explain project value |

Existing club and theme features may be demonstrated as supporting features where verified.

---

## 6. Local Backup Demonstration

The revision-specific deployment remains the primary demonstration platform.

A separate local React application is prepared as a backup.

**Candidate Tag:** `mvp-candidate-2026-11-18`  
**Candidate SHA:** `e5f1888aa4600ac2013d6bda34a55554ba68195f`

### A. Primary Local Setup Verification

**Tester:** `tulseyy8848`

- [x] Exact candidate checkout verified.
- [x] Dependency installation completed.
- [x] Local Vite server started.
- [x] Production build completed.
- [x] Local functionality checked.
- [x] Playwright smoke suite — 118 PASS, 0 FAIL.
- [x] Candidate handoff evidence recorded.

**Result:** PASS — Primary local setup and smoke-testing scope.

**Evidence:** [Tulasa's Local Setup Handoff](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/issues/118#issuecomment-6958484427)

### B. Independent Local Backup Verification

**Independent Reviewer:** `DevyanaCT`

**Environment:** Windows / PowerShell / Node.js v24.14.1 / npm 11.12.1

- [x] Created a separate Git worktree.
- [x] Confirmed the exact candidate SHA.
- [x] Confirmed clean working tree.
- [x] Installed dependencies using `npm.cmd ci`.
- [x] Local Vite server started successfully.
- [x] CampusVibes login page displayed.
- [x] Discover, Search and Event Details manually reported as working.
- [x] Production build completed successfully.

**Additional Observations:**

- npm reported five high-severity dependency vulnerabilities.
- Vite reported a non-blocking JavaScript chunk-size warning.
- The independent reviewer did not repeat the 118-case smoke suite.

**Result:** PASS — Independent backup verification for the tested scope.

**Evidence:** [Devyana's Independent Backup Verification](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/issues/118#issuecomment-6968864555)

**Final Backup Status:** PASS — Local setup verified.

Final presentation-device rehearsal remains a separate task.

---

## 7. Week 11 Evidence Organization

Evidence is available in `docs/Week11/Evidence/` and the linked GitHub issues.

| Evidence | Purpose |
|---|---|
| `W11-01-google-dashboard.png` | Google Dashboard verification |
| `W11-02-google-refresh.png` | Previous session refresh verification |
| `W11-09-email-verification-required.png` | Email-verification requirement |
| `W11-10-verification-email-received.png` | Verification email delivery |
| `W11-11-verification-action.png` | Email-verification action |
| `W11-12-email-verified.png` | Successful email verification |
| `W11-13-verified-dashboard.png` | Authenticated Dashboard |
| `prachi-member-id-privacy-bug-report-2026-11-15.md` | Privacy bug documentation |
| `prachi-member-id-privacy-production-2026-11-15.json` | Production verification receipt |
| [Issue #166](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/issues/166) | Firestore verification |
| [Issue #167](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/issues/167) | Authentication verification |
| [Issue #118](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/issues/118) | Local backup verification |
| [Issue #138](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/issues/138) | Final candidate regression |
| [Issue #177](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/issues/177) | MVP freeze decision |

---

## 8. Individual Responsibilities

Each team member should:

- Explain their assigned contribution.
- Demonstrate their actual work.
- Provide testing evidence.
- Explain known limitations.
- Support final demonstration preparation.

### Prachi — `prachi2061`

**Primary Area:** MVP Coordination, Implementation and Automated Verification.

Completed:

- Recorded the pinned MVP candidate.
- Recorded the candidate deployment.
- Completed bounded automated verification.
- Documented additional Firestore runtime tests.
- Documented candidate Google-hostname configuration repair.
- Coordinated the MVP freeze record.

**Remaining:** Required personal source explanation, ownership handoff and applicable follow-up coordination.

### Ujjal — `ujjalpoudel75`

**Primary Area:** Primary QA and Core Integration.

Completed:

- Candidate Dashboard and event-discovery regression.
- Search, category filtering and event-details verification.
- Empty-search recovery checks.
- Email/password login verification.
- Candidate QA report submitted in Issue #138.

**Remaining:** Google real-account re-login retest and session confirmations.

### Devyana — `DevyanaCT`

**Primary Area:** Firestore Verification and Independent QA.

Completed:

- Firestore HTTP 403 check.
- Published-event comparison — 8 PASS.
- Offline and network-recovery testing.
- Independent local backup setup verification.
- Local startup and production build verification.

**Remaining:** Review Prachi's candidate-specific runtime evidence and document any independent acceptance limitations.

### Tulasa — `tulseyy8848`

**Primary Area:** Build, Local Setup and Development Handoff.

Completed:

- Exact candidate local setup.
- Dependency installation.
- Local startup and production build verification.
- Playwright smoke suite — 118 PASS.
- Local setup handoff and supporting evidence.

**Remaining:** Support the final backup demonstration rehearsal.

---

## 9. Remaining Tasks

| Task | Priority | November 18 Status |
|---|---|---|
| Candidate SHA and deployment | P1 | COMPLETE |
| Candidate production build | P1 | PASS |
| Prachi's unit tests | P1 | 28 PASS |
| Prachi's browser tests | P1 | 24 PASS |
| Previous Google authentication checks | P1 | PASS — Earlier scenarios |
| Email-verification workflow | P1 | PASS — 5/5 |
| Candidate core regression | P1 | PARTIAL PASS |
| Google re-login after hostname repair | P1 | RETEST REQUIRED |
| Session refresh confirmation | P1 | PENDING |
| Refresh-after-logout confirmation | P1 | PENDING |
| Firestore unauthorized-read rejection | P1 | PASS — HTTP 403 |
| Firestore offline/network recovery | P1 | PASS |
| Published-event field comparison | P1 | PASS — 8/8 |
| Independent published-event review | P2 | PASS — 8/8 |
| Firestore application error/Retry automation | P1 | PASS — Local automation |
| Independent Firestore runtime evidence review | P1 | PENDING |
| Search/filter refresh requirement | P2 | PENDING DECISION |
| Candidate event-discovery regression | P1 | PASS — Reported checks |
| Primary local backup setup | P2 | PASS |
| Independent local backup setup | P2 | PASS |
| Prachi's source explanation and handoff | P1 | PENDING |
| Dependency security findings | Review | REVIEW REQUIRED |
| Evidence organization | P2 | IN PROGRESS |
| Final demonstration rehearsal | P2 | PENDING |
| Team conditional approval | Release | RECORDED IN #177 |
| Unconditional final release readiness | Release | NOT YET ESTABLISHED |

---

## 10. Final Demo Success Criteria

The final demonstration is ready when:

- The application launches successfully.
- The approved authentication method works.
- Dashboard navigation works.
- Event discovery and search work.
- Category filtering works.
- Event details display correctly.
- Empty-search recovery works.
- Required session behavior is confirmed.
- Theme behavior is verified.
- Privacy and security-related limitations are reviewed.
- No unresolved critical issue blocks the approved demonstration.
- Local backup setup is reproducible.
- Evidence is organized and accessible.
- Each team member can explain their contribution.

### Final MVP Freeze Candidate Requirements

- [x] Record the exact candidate SHA.
- [x] Record the revision-specific deployment.
- [x] Complete bounded automated candidate checks.
- [x] Perform and document candidate regression results.
- [x] Document local Firestore runtime error/Retry tests.
- [x] Complete primary and independent backup setup verification.
- [x] Record conditional team approval in Issue #177.
- [ ] Confirm successful Google re-login or document a permitted accepted exception.
- [ ] Confirm remaining session behavior.
- [ ] Complete independent Firestore evidence review.
- [ ] Confirm expected search/filter behavior after refresh.
- [ ] Complete required source explanation and handoff.
- [ ] Review dependency security findings.
- [ ] Confirm approved fallbacks and final demonstration rehearsal.
- [ ] Close remaining release conditions before claiming unconditional readiness.

**Conditional Team Approval:** RECORDED.

**Approval Evidence:** [Issue #177 — Conditional Approval](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/issues/177#issuecomment-6969792911)

**Final Unconditional Release Readiness:** NOT YET ESTABLISHED.

Conditional approval does not mean that every pending test has passed.

---

## 11. Future Improvements

After the MVP is stable, potential improvements include:

- Personalized event recommendations.
- Better club discovery.
- Advanced event filtering.
- Improved mobile responsiveness.
- Additional notification features.
- Better student engagement tools.

These improvements should not delay the approved MVP demonstration plan.

---

## 12. Final Goal

Our goal is to present CampusVibes as a reliable campus activity discovery platform.

Team 4 will focus on completing the remaining required checks, preserving transparent testing evidence, explaining individual contributions, and delivering a successful final demonstration.

**Final Principle:** Stabilize the MVP, verify the core journey, document limitations honestly, and demonstrate only functionality supported by actual results.

---

## November 16 — Week 11 Verification Checkpoint (Historical)

The November 16 verification checklist documented the earlier candidate-readiness assessment, owner responsibilities, expected/actual testing and remaining verification gaps.

Previous independent Google/session checks and Firestore verification remained valid for their tested scopes.

At this checkpoint, final candidate selection and team approval were not yet complete.

**Evidence:** [MVP Verification Checklist](MVP-Verification-Checklist.md)

---

## November 17 — Verification Progress Update (Historical)

### Authentication

- Real Google Sign-In and Dashboard access previously tested.
- Independent authentication verification — 5 PASS, 0 FAIL.
- November 16 email-verification workflow — 5 PASS, 0 FAIL.
- Final candidate-specific regression was still pending at this checkpoint.

### Firestore

- Emulator unauthorized-read rejection — HTTP 403.
- Published-event comparison — 8 PASS, 0 FAIL.
- Independent reviewer — 8 PASS, 0 FAIL.
- Offline cached-event recovery checked.
- Browser Firestore request-blocking and recovery checked.
- Production Listen HTTP 200 observed after reconnection.
- Application-level terminal error callbacks had not yet been independently reproduced.

**Historical Status:** Completed manual checks PASS; remaining runtime verification pending.

**Evidence:** [Issue #166](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/issues/166)

---

## November 18 — Final MVP Freeze and Conditional Team Approval

**Coordinator:** `prachi2061`  
**Candidate Tag:** `mvp-candidate-2026-11-18`  
**Candidate SHA:** `e5f1888aa4600ac2013d6bda34a55554ba68195f`  
**Deployment:** https://campusvibe-fnh5f79me-campus-vibe.vercel.app

### Completed Candidate Verification and Handoffs

- [x] Candidate SHA and production deployment recorded.
- [x] Prachi's candidate build completed.
- [x] Prachi's 28 unit tests PASS.
- [x] Prachi's 24 desktop/mobile browser tests PASS.
- [x] Additional controlled Firestore error/Retry testing reported PASS.
- [x] Tulasa's local setup and 118-case smoke suite PASS.
- [x] Devyana's independent local backup verification PASS.
- [x] Ujjal's candidate regression performed and reported PARTIAL PASS.
- [x] Candidate hostname added to Firebase authorized domains.
- [x] Provider-page readiness reported following configuration update.
- [x] Conditional team approval linked in Issue #177.

### Conditional Approval Decision

The November 18 MVP freeze record links a conditional team approval in Issue #177.

**Team Decision:** CONDITIONALLY APPROVED.

**Approval Evidence:** [Team 4 Conditional Approval](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/issues/177#issuecomment-6969792911)

The approval applies to the pinned candidate and the documented conditions. It does not automatically establish that all unfinished verification has passed.

### Remaining Conditions and Responsible Members

| Follow-Up | Responsible Member | Status |
|---|---|---|
| Real-account Google re-login retest | `ujjalpoudel75` | RETEST REQUIRED |
| Session refresh and logout-refresh | `ujjalpoudel75` | PENDING |
| Independent Firestore runtime evidence review | `DevyanaCT` | PENDING |
| Search/filter behavior after refresh | Team / QA | PENDING DECISION |
| Personal source explanation and ownership evidence | `prachi2061` | PENDING |
| Dependency vulnerability assessment | Coordinator / Implementation Owner | REVIEW REQUIRED |
| Final demo and backup rehearsal | Team 4 | PENDING |

### Demonstration Limitations and Fallbacks

- Email/password authentication can serve as an alternative only within the approved conditions and course requirements.
- Sample listings must be clearly identified and cannot be presented as verified live Firestore events.
- Local automated error injection must not be represented as independent proof of real production-provider failure handling.
- The exact pinned candidate SHA must be preserved.
- Any application source change affecting the candidate must follow the team's change-control and verification process.
- Optional features outside the frozen MVP scope remain deferred.

### Final Status

**MVP Scope Freeze:** IN EFFECT.

**Candidate SHA:** CONFIRMED.

**Automated Testing:** PASS — Documented scope.

**Local Backup Verification:** PASS.

**Authenticated Candidate Regression:** PARTIAL PASS.

**Team Decision:** CONDITIONALLY APPROVED — Recorded in Issue #177.

**Outstanding Verification:** FOLLOW-UP REQUIRED.

**Final Unconditional Demo/Release Readiness:** NOT YET ESTABLISHED.

### Supporting Evidence

- [Issue #118 — Local Backup Verification](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/issues/118)
- [Issue #138 — Final Candidate Regression](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/issues/138)
- [Issue #166 — Firestore Verification](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/issues/166)
- [Issue #167 — Authentication Verification](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/issues/167)
- [Issue #177 — MVP Freeze and Conditional Approval](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/issues/177)

# CampusVibes — Final Demo Roadmap

**Project:** CampusVibes  
**Team:** 4  
**Course:** Capstone Design — Fall 2026  
**Originally Prepared:** November 15, 2026  
**Last Updated:** November 18, 2026  
**Candidate Tag:** `mvp-candidate-2026-11-18`  
**Candidate SHA:** `e5f1888aa4600ac2013d6bda34a55554ba68195f`  
**Candidate Deployment:** https://campusvibe-fnh5f79me-campus-vibe.vercel.app  
**Status:** MVP Scope Freeze in Effect — CONDITIONALLY APPROVED

**Team Approval Evidence:** [Issue #177 — Conditional Team Approval](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/issues/177#issuecomment-6969792911)

---

## 1. Project Overview

CampusVibes is a web application that helps college students discover campus events, clubs, and student activities in one place.

Our goal is to deliver a stable and functional Minimum Viable Product (MVP) and demonstrate its main features with reliable testing evidence.

**Stable Public Website:** https://campusvibe-theta.vercel.app/

**Pinned Candidate Deployment:** https://campusvibe-fnh5f79me-campus-vibe.vercel.app

The revision-specific deployment is used for final candidate verification because the stable public alias may advance to another revision.

---

## 2. Final MVP Scope

The final demonstration will focus on:

- User authentication and verified login.
- Dashboard and navigation.
- Event discovery.
- Event search and category filtering.
- Event details.
- Empty-search and recovery behavior.
- Session refresh and logout.
- Firebase Authentication and Firestore integration.
- Existing theme and responsive design.
- Error handling and application reliability.
- Local backup demonstration.

### Frozen Demonstration Journey

Landing Page → Verified Login → Dashboard → Discover Events → Search/Category Filter → Event Details → Session Refresh → Logout.

Sample events must remain clearly distinguished from published Firestore events.

Assistant, Community/Feed, friends, messages, badges, maps, notifications and other optional enhancements remain outside the frozen demonstration promise.

No unnecessary new features or redesigns will be introduced during the MVP freeze.

---

## 3. Completed Testing and Verification Evidence

### A. Core Application Testing

Previously completed testing covered:

- Core user journey regression.
- Event discovery and search.
- Category filtering.
- Event details.
- Dashboard navigation.
- Session refresh behavior.

**Previously Recorded Regression Result:** 80 PASS.

### B. Theme and Notification Testing

Previously completed checks included:

- Light/dark theme switching.
- Theme persistence after refresh.
- Accessible theme-button labels.
- Notification interface checks.
- Saved-event read-status behavior.

**Recorded Result:** 8 PASS, 0 FAIL.

Live Firestore notification delivery remains a separate verification requirement.

### C. Firestore Security Testing

Previously completed checks included:

- Firestore security-rules testing.
- Published-event access checks.
- Data access and permission testing.

**Recorded Local Security-Rules Result:** 40 PASS, 0 FAIL.

Application-level error handling must be evaluated separately from security-rule results.

### C.1 — November 16–17 Firestore Integration Verification

**Tester:** `DevyanaCT`  
**Independent Reviewer:** `tulseyy8848`

- [x] Firebase Authentication and Firestore Emulator connectivity verified.
- [x] Published-event security rules and listener inspected.
- [x] Unauthenticated Firestore Emulator GET returned HTTP 403 Forbidden.
- [x] Published-event field mapping inspected in source code.
- [x] Published-event comparison — 8 PASS, 0 FAIL.
- [x] Independent reviewer reported 8 PASS, 0 FAIL.
- [x] Supporting screenshots recorded in Issue #166.
- [x] Offline Discover retained 14 cached published events and 9 sample listings.
- [x] Cached-data warning and Retry button observed.
- [x] Warning disappeared after reconnecting.
- [x] Production Firestore Listen returned HTTP 200 after recovery.
- [x] Browser Firestore request-blocking tested using Chrome DevTools.
- [x] Discover remained accessible with 9 sample listings during request blocking.
- [x] Removing request blocking restored 14 published events and 9 sample listings.

**Result:** PASS — Published-event mapping and documented network-recovery checks.

**Evidence:** [Issue #166 — Firestore Verification](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/issues/166)

**Limitation:** HTTP 403 and network-blocking checks do not independently prove the application's terminal listener-error callbacks.

### C.2 — November 18 Candidate-Specific Firestore Automated Verification

**Coordinator:** `prachi2061`  
**Independent Verification Contact:** `DevyanaCT`  
**Candidate SHA:** `e5f1888aa4600ac2013d6bda34a55554ba68195f`

Prachi's November 18 local automated tests reported:

- [x] Firestore Emulator permission-denied handling.
- [x] Controlled terminal loading-error callback.
- [x] Retry recovery under simulated errors.
- [x] Desktop and mobile viewport checks.
- [x] Additional authenticated/emulator/error-recovery browser cases.

**Result:** PASS — Documented local automated verification.

**Remaining:**

- [ ] Independent review of the candidate-specific runtime evidence.
- [ ] Further deployed-runtime acceptance if required.
- [ ] Confirm intended search/filter behavior after refresh.

**Evidence:** [Prachi's Runtime Test Receipt](Evidence/prachi-candidate-runtime-2026-11-18.md)

Local error injection does not independently establish real production-provider failure behavior.

### D. Google Authentication and Email Verification

**Primary QA:** `ujjalpoudel75`  
**Independent Reviewer:** `DevyanaCT`

#### Previous Week 11 Authentication Verification

- [x] Real Google Sign-In and Dashboard access previously tested.
- [x] Session persistence after refresh previously tested.
- [x] Logout and Google re-login previously tested.
- [x] Browser-restart scenarios documented.
- [x] Remember Me behavior tested in reported scenarios.
- [x] Devyana's independent Google/session checks — 5 PASS, 0 FAIL.

**Existing Screenshots:**

- `W11-01-google-dashboard.png`
- `W11-02-google-refresh.png`

#### November 16 — Email Verification

**Tester:** `ujjalpoudel75`

- [x] EV-01 — Email verification requirement displayed.
- [x] EV-02 — Firebase verification email received.
- [x] EV-03 — Verification link opened.
- [x] EV-04 — Firebase confirmed successful verification.
- [x] EV-05 — Authenticated Dashboard opened.

**Result:** 5 PASS, 0 FAIL.

**Screenshot Evidence:**

- `W11-09-email-verification-required.png`
- `W11-10-verification-email-received.png`
- `W11-11-verification-action.png`
- `W11-12-email-verified.png`
- `W11-13-verified-dashboard.png`

### D.1 — November 18 Final Candidate Regression

**Tester:** `ujjalpoudel75`  
**Candidate SHA:** `e5f1888aa4600ac2013d6bda34a55554ba68195f`

| Test | Result |
|---|---|
| Authenticated Dashboard | PASS |
| Discover Events | PASS |
| Event Search | PASS |
| Category Filter | PASS |
| Event Details | PASS |
| Empty Search | PASS — Tester-reported |
| Search Recovery | PASS — Tester-reported |
| Logout | PASS |
| Email/Password Login | PASS — Tester-reported |
| Session Refresh | PENDING CONFIRMATION |
| Refresh After Logout | PENDING CONFIRMATION |
| Google Re-Login | RETEST REQUIRED |

Ujjal initially encountered a Google Sign-In configuration error on the revision-specific deployment.

Prachi subsequently documented adding the candidate deployment hostname to Firebase authorized domains.

Provider-page and popup readiness were reported after the configuration change, but successful real-account Google re-login remains unconfirmed.

**Overall Candidate QA Result:** PARTIAL PASS.

**Evidence:** [Ujjal's Final Candidate Regression Report](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/issues/138#issuecomment-6969099874)

---

## 4. MVP Freeze Roadmap

### Phase 1 — Freeze Core Functionality

- [x] Review the MVP feature list.
- [x] Stop unnecessary feature additions.
- [x] Identify the pinned MVP candidate.
- [x] Record the exact candidate SHA.
- [x] Record the revision-specific deployment.
- [x] Define the final core demonstration journey.

### Phase 2 — Complete Verification

- [x] Perform candidate build and automated verification.
- [x] Perform candidate event-discovery regression.
- [x] Test search, category filtering and event details.
- [x] Record existing Firestore testing evidence.
- [x] Complete local automated Firestore error-handling checks.
- [x] Complete primary local backup verification.
- [x] Complete independent local backup verification.
- [ ] Confirm real-account Google re-login.
- [ ] Confirm remaining session behavior.
- [ ] Complete independent Firestore runtime evidence review.
- [ ] Confirm search/filter refresh expectations.

### Phase 3 — UI and Quality Checks

- Review light/dark theme behavior.
- Review responsive layouts.
- Verify navigation and buttons.
- Review accessibility.
- Check loading and empty states.
- Verify error messages.
- Retain regression evidence.

### Phase 4 — Final Demo Preparation

- Verify the approved candidate demonstration route.
- Prepare the local backup.
- Prepare an approved demonstration account.
- Organize screenshots and reports.
- Update GitHub documentation.
- Prepare presentation slides.
- Rehearse the final user journey.
- Record the accepted limitations and fallback procedure.

---

## 5. Final Demo User Journey

| Step | Feature | Demonstration |
|---|---|---|
| 1 | Landing Page | Introduce CampusVibes |
| 2 | Verified Login | Demonstrate authentication |
| 3 | Dashboard | Show the main dashboard |
| 4 | Discover Events | Show available events |
| 5 | Search | Search for an event |
| 6 | Category Filter | Filter event categories |
| 7 | Event Details | Open an event |
| 8 | Empty Search Recovery | Show no-results state and clear search |
| 9 | Session Refresh | Verify signed-in state |
| 10 | Logout | Return to Login |
| 11 | Conclusion | Explain project value |

Existing club and theme features may be demonstrated as supporting features where verified.

---

## 6. Local Backup Demonstration

The revision-specific deployment remains the primary demonstration platform.

A separate local React application is prepared as a backup.

**Candidate Tag:** `mvp-candidate-2026-11-18`  
**Candidate SHA:** `e5f1888aa4600ac2013d6bda34a55554ba68195f`

### A. Primary Local Setup Verification

**Tester:** `tulseyy8848`

- [x] Exact candidate checkout verified.
- [x] Dependency installation completed.
- [x] Local Vite server started.
- [x] Production build completed.
- [x] Local functionality checked.
- [x] Playwright smoke suite — 118 PASS, 0 FAIL.
- [x] Candidate handoff evidence recorded.

**Result:** PASS — Primary local setup and smoke-testing scope.

**Evidence:** [Tulasa's Local Setup Handoff](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/issues/118#issuecomment-6958484427)

### B. Independent Local Backup Verification

**Independent Reviewer:** `DevyanaCT`

**Environment:** Windows / PowerShell / Node.js v24.14.1 / npm 11.12.1

- [x] Created a separate Git worktree.
- [x] Confirmed the exact candidate SHA.
- [x] Confirmed clean working tree.
- [x] Installed dependencies using `npm.cmd ci`.
- [x] Local Vite server started successfully.
- [x] CampusVibes login page displayed.
- [x] Discover, Search and Event Details manually reported as working.
- [x] Production build completed successfully.

**Additional Observations:**

- npm reported five high-severity dependency vulnerabilities.
- Vite reported a non-blocking JavaScript chunk-size warning.
- The independent reviewer did not repeat the 118-case smoke suite.

**Result:** PASS — Independent backup verification for the tested scope.

**Evidence:** [Devyana's Independent Backup Verification](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/issues/118#issuecomment-6968864555)

**Final Backup Status:** PASS — Local setup verified.

Final presentation-device rehearsal remains a separate task.

---

## 7. Week 11 Evidence Organization

Evidence is available in `docs/Week11/Evidence/` and the linked GitHub issues.

| Evidence | Purpose |
|---|---|
| `W11-01-google-dashboard.png` | Google Dashboard verification |
| `W11-02-google-refresh.png` | Previous session refresh verification |
| `W11-09-email-verification-required.png` | Email-verification requirement |
| `W11-10-verification-email-received.png` | Verification email delivery |
| `W11-11-verification-action.png` | Email-verification action |
| `W11-12-email-verified.png` | Successful email verification |
| `W11-13-verified-dashboard.png` | Authenticated Dashboard |
| `prachi-member-id-privacy-bug-report-2026-11-15.md` | Privacy bug documentation |
| `prachi-member-id-privacy-production-2026-11-15.json` | Production verification receipt |
| [Issue #166](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/issues/166) | Firestore verification |
| [Issue #167](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/issues/167) | Authentication verification |
| [Issue #118](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/issues/118) | Local backup verification |
| [Issue #138](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/issues/138) | Final candidate regression |
| [Issue #177](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/issues/177) | MVP freeze decision |

---

## 8. Individual Responsibilities

Each team member should:

- Explain their assigned contribution.
- Demonstrate their actual work.
- Provide testing evidence.
- Explain known limitations.
- Support final demonstration preparation.

### Prachi — `prachi2061`

**Primary Area:** MVP Coordination, Implementation and Automated Verification.

Completed:

- Recorded the pinned MVP candidate.
- Recorded the candidate deployment.
- Completed bounded automated verification.
- Documented additional Firestore runtime tests.
- Documented candidate Google-hostname configuration repair.
- Coordinated the MVP freeze record.

**Remaining:** Required personal source explanation, ownership handoff and applicable follow-up coordination.

### Ujjal — `ujjalpoudel75`

**Primary Area:** Primary QA and Core Integration.

Completed:

- Candidate Dashboard and event-discovery regression.
- Search, category filtering and event-details verification.
- Empty-search recovery checks.
- Email/password login verification.
- Candidate QA report submitted in Issue #138.

**Remaining:** Google real-account re-login retest and session confirmations.

### Devyana — `DevyanaCT`

**Primary Area:** Firestore Verification and Independent QA.

Completed:

- Firestore HTTP 403 check.
- Published-event comparison — 8 PASS.
- Offline and network-recovery testing.
- Independent local backup setup verification.
- Local startup and production build verification.

**Remaining:** Review Prachi's candidate-specific runtime evidence and document any independent acceptance limitations.

### Tulasa — `tulseyy8848`

**Primary Area:** Build, Local Setup and Development Handoff.

Completed:

- Exact candidate local setup.
- Dependency installation.
- Local startup and production build verification.
- Playwright smoke suite — 118 PASS.
- Local setup handoff and supporting evidence.

**Remaining:** Support the final backup demonstration rehearsal.

---

## 9. Remaining Tasks

| Task | Priority | November 18 Status |
|---|---|---|
| Candidate SHA and deployment | P1 | COMPLETE |
| Candidate production build | P1 | PASS |
| Prachi's unit tests | P1 | 28 PASS |
| Prachi's browser tests | P1 | 24 PASS |
| Previous Google authentication checks | P1 | PASS — Earlier scenarios |
| Email-verification workflow | P1 | PASS — 5/5 |
| Candidate core regression | P1 | PARTIAL PASS |
| Google re-login after hostname repair | P1 | RETEST REQUIRED |
| Session refresh confirmation | P1 | PENDING |
| Refresh-after-logout confirmation | P1 | PENDING |
| Firestore unauthorized-read rejection | P1 | PASS — HTTP 403 |
| Firestore offline/network recovery | P1 | PASS |
| Published-event field comparison | P1 | PASS — 8/8 |
| Independent published-event review | P2 | PASS — 8/8 |
| Firestore application error/Retry automation | P1 | PASS — Local automation |
| Independent Firestore runtime evidence review | P1 | PENDING |
| Search/filter refresh requirement | P2 | PENDING DECISION |
| Candidate event-discovery regression | P1 | PASS — Reported checks |
| Primary local backup setup | P2 | PASS |
| Independent local backup setup | P2 | PASS |
| Prachi's source explanation and handoff | P1 | PENDING |
| Dependency security findings | Review | REVIEW REQUIRED |
| Evidence organization | P2 | IN PROGRESS |
| Final demonstration rehearsal | P2 | PENDING |
| Team conditional approval | Release | RECORDED IN #177 |
| Unconditional final release readiness | Release | NOT YET ESTABLISHED |

---

## 10. Final Demo Success Criteria

The final demonstration is ready when:

- The application launches successfully.
- The approved authentication method works.
- Dashboard navigation works.
- Event discovery and search work.
- Category filtering works.
- Event details display correctly.
- Empty-search recovery works.
- Required session behavior is confirmed.
- Theme behavior is verified.
- Privacy and security-related limitations are reviewed.
- No unresolved critical issue blocks the approved demonstration.
- Local backup setup is reproducible.
- Evidence is organized and accessible.
- Each team member can explain their contribution.

### Final MVP Freeze Candidate Requirements

- [x] Record the exact candidate SHA.
- [x] Record the revision-specific deployment.
- [x] Complete bounded automated candidate checks.
- [x] Perform and document candidate regression results.
- [x] Document local Firestore runtime error/Retry tests.
- [x] Complete primary and independent backup setup verification.
- [x] Record conditional team approval in Issue #177.
- [ ] Confirm successful Google re-login or document a permitted accepted exception.
- [ ] Confirm remaining session behavior.
- [ ] Complete independent Firestore evidence review.
- [ ] Confirm expected search/filter behavior after refresh.
- [ ] Complete required source explanation and handoff.
- [ ] Review dependency security findings.
- [ ] Confirm approved fallbacks and final demonstration rehearsal.
- [ ] Close remaining release conditions before claiming unconditional readiness.

**Conditional Team Approval:** RECORDED.

**Approval Evidence:** [Issue #177 — Conditional Approval](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/issues/177#issuecomment-6969792911)

**Final Unconditional Release Readiness:** NOT YET ESTABLISHED.

Conditional approval does not mean that every pending test has passed.

---

## 11. Future Improvements

After the MVP is stable, potential improvements include:

- Personalized event recommendations.
- Better club discovery.
- Advanced event filtering.
- Improved mobile responsiveness.
- Additional notification features.
- Better student engagement tools.

These improvements should not delay the approved MVP demonstration plan.

---

## 12. Final Goal

Our goal is to present CampusVibes as a reliable campus activity discovery platform.

Team 4 will focus on completing the remaining required checks, preserving transparent testing evidence, explaining individual contributions, and delivering a successful final demonstration.

**Final Principle:** Stabilize the MVP, verify the core journey, document limitations honestly, and demonstrate only functionality supported by actual results.

---

## November 16 — Week 11 Verification Checkpoint (Historical)

The November 16 verification checklist documented the earlier candidate-readiness assessment, owner responsibilities, expected/actual testing and remaining verification gaps.

Previous independent Google/session checks and Firestore verification remained valid for their tested scopes.

At this checkpoint, final candidate selection and team approval were not yet complete.

**Evidence:** [MVP Verification Checklist](MVP-Verification-Checklist.md)

---

## November 17 — Verification Progress Update (Historical)

### Authentication

- Real Google Sign-In and Dashboard access previously tested.
- Independent authentication verification — 5 PASS, 0 FAIL.
- November 16 email-verification workflow — 5 PASS, 0 FAIL.
- Final candidate-specific regression was still pending at this checkpoint.

### Firestore

- Emulator unauthorized-read rejection — HTTP 403.
- Published-event comparison — 8 PASS, 0 FAIL.
- Independent reviewer — 8 PASS, 0 FAIL.
- Offline cached-event recovery checked.
- Browser Firestore request-blocking and recovery checked.
- Production Listen HTTP 200 observed after reconnection.
- Application-level terminal error callbacks had not yet been independently reproduced.

**Historical Status:** Completed manual checks PASS; remaining runtime verification pending.

**Evidence:** [Issue #166](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/issues/166)

---

## November 18 — Final MVP Freeze and Conditional Team Approval

**Coordinator:** `prachi2061`  
**Candidate Tag:** `mvp-candidate-2026-11-18`  
**Candidate SHA:** `e5f1888aa4600ac2013d6bda34a55554ba68195f`  
**Deployment:** https://campusvibe-fnh5f79me-campus-vibe.vercel.app

### Completed Candidate Verification and Handoffs

- [x] Candidate SHA and production deployment recorded.
- [x] Prachi's candidate build completed.
- [x] Prachi's 28 unit tests PASS.
- [x] Prachi's 24 desktop/mobile browser tests PASS.
- [x] Additional controlled Firestore error/Retry testing reported PASS.
- [x] Tulasa's local setup and 118-case smoke suite PASS.
- [x] Devyana's independent local backup verification PASS.
- [x] Ujjal's candidate regression performed and reported PARTIAL PASS.
- [x] Candidate hostname added to Firebase authorized domains.
- [x] Provider-page readiness reported following configuration update.
- [x] Conditional team approval linked in Issue #177.

### Conditional Approval Decision

The November 18 MVP freeze record links a conditional team approval in Issue #177.

**Team Decision:** CONDITIONALLY APPROVED.

**Approval Evidence:** [Team 4 Conditional Approval](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/issues/177#issuecomment-6969792911)

The approval applies to the pinned candidate and the documented conditions. It does not automatically establish that all unfinished verification has passed.

### Remaining Conditions and Responsible Members

| Follow-Up | Responsible Member | Status |
|---|---|---|
| Real-account Google re-login retest | `ujjalpoudel75` | RETEST REQUIRED |
| Session refresh and logout-refresh | `ujjalpoudel75` | PENDING |
| Independent Firestore runtime evidence review | `DevyanaCT` | PENDING |
| Search/filter behavior after refresh | Team / QA | PENDING DECISION |
| Personal source explanation and ownership evidence | `prachi2061` | PENDING |
| Dependency vulnerability assessment | Coordinator / Implementation Owner | REVIEW REQUIRED |
| Final demo and backup rehearsal | Team 4 | PENDING |

### Demonstration Limitations and Fallbacks

- Email/password authentication can serve as an alternative only within the approved conditions and course requirements.
- Sample listings must be clearly identified and cannot be presented as verified live Firestore events.
- Local automated error injection must not be represented as independent proof of real production-provider failure handling.
- The exact pinned candidate SHA must be preserved.
- Any application source change affecting the candidate must follow the team's change-control and verification process.
- Optional features outside the frozen MVP scope remain deferred.

### Final Status

**MVP Scope Freeze:** IN EFFECT.

**Candidate SHA:** CONFIRMED.

**Automated Testing:** PASS — Documented scope.

**Local Backup Verification:** PASS.

**Authenticated Candidate Regression:** PARTIAL PASS.

**Team Decision:** CONDITIONALLY APPROVED — Recorded in Issue #177.

**Outstanding Verification:** FOLLOW-UP REQUIRED.

**Final Unconditional Demo/Release Readiness:** NOT YET ESTABLISHED.

### Supporting Evidence

- [Issue #118 — Local Backup Verification](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/issues/118)
- [Issue #138 — Final Candidate Regression](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/issues/138)
- [Issue #166 — Firestore Verification](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/issues/166)
- [Issue #167 — Authentication Verification](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/issues/167)
- [Issue #177 — MVP Freeze and Conditional Approval](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/issues/177)
