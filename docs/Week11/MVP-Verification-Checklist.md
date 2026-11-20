
# Week 11 — MVP Verification and Freeze Checkpoint

**Project:** CampusVibes — Team 4  
**Course:** Capstone Design — Fall 2026  
**Originally Prepared:** November 16, 2026 KST  
**Last Updated:** November 18, 2026 KST  
**Coordinator:** `prachi2061`  
**Candidate Tag:** `mvp-candidate-2026-11-18`  
**Candidate SHA:** `e5f1888aa4600ac2013d6bda34a55554ba68195f`  
**Candidate Deployment:** https://campusvibe-fnh5f79me-campus-vibe.vercel.app

**MVP Scope Freeze:** IN EFFECT  
**Team Decision:** CONDITIONALLY APPROVED  
**Final Unconditional Release Readiness:** NOT YET ESTABLISHED

**Approval Evidence:** [Team 4 Conditional Approval — Issue #177](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/issues/177#issuecomment-6969792911)

---

## 1. MVP Proof and Verification Target

The existing [Week 11 roadmap](MVP-Freeze-Final-Road%20Map.md) defines the main demonstration journey:

Landing Page → Verified Login → Dashboard → Discover Events → Search/Category Filter → Event Details → Session Refresh → Logout.

The demonstration also includes empty-search behavior, clearing search filters to restore events, existing theme functionality, and documented Firestore behavior.

Existing club and community features may be demonstrated as supporting features where stable.

### Data and Verification Boundaries

- Sample event listings and Firestore-published events must remain clearly distinguished.
- A successful sample-data test does not establish a successful live Firestore query.
- A guest demonstration does not establish authenticated access.
- Direct Firestore Emulator HTTP 403 does not independently prove application-level permission-denied handling.
- Browser request blocking does not independently prove terminal Firestore listener-error callbacks.
- Local automated tests do not replace real-account/provider testing.
- Conditional approval does not mean every pending test has passed.

### Candidate Identification

| Field | Recorded Value |
|---|---|
| Candidate Commit | `e5f1888aa4600ac2013d6bda34a55554ba68195f` |
| Candidate Tag | `mvp-candidate-2026-11-18` |
| Deployment | https://campusvibe-fnh5f79me-campus-vibe.vercel.app |
| Automated Build | PASS |
| Unit Tests | 28 PASS |
| Desktop/Mobile Browser Tests | 24 PASS |
| Team Approval | CONDITIONALLY APPROVED — Linked in #177 |

The stable public alias may advance independently. Candidate evidence should identify the exact SHA and revision-specific deployment.

---

## 2. Expected and Actual Verification Results

| Required Check | Expected Result | Recorded Actual Result | Gate Status |
|---|---|---|---|
| Candidate deployment | Exact pinned revision is identifiable | Candidate SHA and deployment recorded | COMPLETE |
| Application startup | Application loads successfully | Local startup and production build passed | PASS |
| Verified Login and Dashboard | Verified user reaches Dashboard | Ujjal reported candidate Dashboard and email/password login PASS | PASS — Reported scope |
| Google Re-Login | Google authentication returns user to Dashboard | Initial configuration error; hostname authorization updated; real-account retest pending | RETEST REQUIRED |
| Email verification | Email received, link opened and account verified | November 16 EV-01 to EV-05 — 5 PASS | PASS — Earlier workflow |
| Discover Events | Event listings display correctly | Candidate Discover check passed | PASS |
| Event Search | Matching event appears | Searching `hack` returned HackNight | PASS |
| Category Filter | Correct category results displayed | Music category displayed four events | PASS |
| Event Details | Selected event information opens | Candidate Event Details passed | PASS |
| Empty Search | Clear no-results state appears | Ujjal reported expected behavior | PASS — Reported |
| Search Recovery | Clearing search restores events | Ujjal reported recovery | PASS — Reported |
| Session Refresh | Signed-in session remains as required | Candidate result requires confirmation | PENDING |
| Logout | User returns to signed-out Login page | Candidate Logout passed | PASS |
| Refresh After Logout | Logged-out state remains valid | Candidate result requires confirmation | PENDING |
| Published Firestore Fields | Displayed data matches source | Devyana 8 PASS; independent reviewer 8 PASS | PASS — Field comparison |
| Unauthorized Firestore Read | Unauthorized read rejected | Emulator HTTP 403 observed | PASS — HTTP check |
| Firestore Offline Recovery | Cached/sample availability and recovery work | Browser interruption and reconnection verified | PASS — Tested scope |
| Application Error/Retry | Permission-denied and loading errors are handled | Prachi's controlled local automated tests reported PASS | PASS — Local automation |
| Independent Runtime Acceptance | Independent reviewer accepts candidate runtime evidence | Review not yet recorded | PENDING |
| Theme and UI | Existing theme and responsive behavior work | Earlier theme/notification verification 8 PASS | PASS — Earlier scope |
| Automated Candidate Tests | Required bounded tests pass | 28 unit and 24 browser cases PASS | PASS |
| Primary Local Backup | Candidate can run locally | Tulasa completed setup/build and 118 smoke tests | PASS |
| Independent Local Backup | Independent reviewer reproduces setup | Devyana completed worktree, installation, startup and build | PASS |
| Password Recovery | Required recovery works | Earlier evidence exists; final required scope needs confirmation | PENDING SCOPE REVIEW |
| Team Approval | Team records decision | Conditional approval linked in Issue #177 | CONDITIONALLY APPROVED |
| Final Demo Rehearsal | Approved journey works on presentation device | Rehearsal not yet recorded | PENDING |

---

## 3. Candidate Automated Verification

**Coordinator:** `prachi2061`  
**Testing Date:** November 18, 2026

| Automated Verification | Result |
|---|---|
| Production Build | PASS |
| Unit Tests | 28 PASS |
| Desktop/Mobile Browser Tests | 24 PASS |
| Additional Authenticated/Emulator/Error-Recovery Checks | 18 cases reported |
| Poster API Fixture Cases | 7 cases reported |
| Poster Permission Cases | 4 cases reported |

**Evidence:**

- [Candidate Automated Receipt](Evidence/mvp-candidate-checks-2026-11-18.json)
- [Firestore Runtime Verification](Evidence/prachi-candidate-runtime-2026-11-18.md)

These tests were run locally with documented fixtures and emulator conditions.

**Result:** PASS — Documented automated testing scope.

**Limitation:** Automated results do not establish successful real Google account authentication on the candidate deployment.

---

## 4. Authentication and Core Journey Verification

### Previous Week 11 Verification

**Primary QA:** `ujjalpoudel75`  
**Independent Reviewer:** `DevyanaCT`

- [x] Previous real Google Sign-In tested.
- [x] Previous authenticated Dashboard access tested.
- [x] Previous session persistence tested.
- [x] Previous logout and re-login tested.
- [x] Previous browser-restart scenarios documented.
- [x] Devyana's independent Google/session verification — 5 PASS, 0 FAIL.
- [x] November 16 email-verification workflow — 5 PASS, 0 FAIL.

**Evidence:** [Issue #167](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/issues/167)

### November 18 — Final Candidate Regression

**Tester:** `ujjalpoudel75`

- [x] Authenticated Dashboard.
- [x] Discover Events.
- [x] Event Search.
- [x] Category Filtering.
- [x] Event Details.
- [x] Empty Search — tester-reported.
- [x] Search Recovery — tester-reported.
- [x] Logout.
- [x] Email/Password Login — tester-reported.
- [ ] Confirm session refresh.
- [ ] Confirm refresh after logout.
- [ ] Complete successful Google real-account re-login.

**Google Authentication Finding:**

The candidate initially displayed a Google Sign-In configuration error.

Prachi subsequently documented adding the revision-specific candidate hostname to Firebase authorized domains.

Provider-page/popup readiness was reported following the configuration update.

A successful real-account Google re-login retest remains pending.

**Candidate QA Result:** PARTIAL PASS.

**Evidence:** [Ujjal's Candidate QA Report](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/issues/138#issuecomment-6969099874)

---

## 5. Firestore Integration and Runtime Verification

### November 16–17 — Independent Manual Verification

**Tester:** `DevyanaCT`  
**Independent Reviewer:** `tulseyy8848`

- [x] Firebase Authentication and Firestore Emulator connectivity verified.
- [x] Published-event field mapping inspected.
- [x] Unauthenticated Firestore Emulator GET returned HTTP 403.
- [x] Published-event comparison — 8 PASS, 0 FAIL.
- [x] Independent published-event review — 8 PASS, 0 FAIL.
- [x] Offline Discover retained 14 cached published events and 9 sample listings.
- [x] Cached-data warning and Retry button appeared.
- [x] Restored connectivity and confirmed warning recovery.
- [x] Production Firestore Listen returned HTTP 200.
- [x] Browser Firestore request-blocking tested.
- [x] Discover remained accessible with 9 sample listings during blocking.
- [x] Removing request blocking restored 14 published events and 9 sample listings.

**Manual Result:** PASS — Documented network and published-event checks.

### November 18 — Automated Runtime Verification

**Coordinator:** `prachi2061`

- [x] Controlled Firestore Emulator permission-denied handling.
- [x] Controlled terminal loading-error callback.
- [x] Retry recovery under tested error conditions.
- [x] Desktop and mobile browser coverage.

**Automated Result:** PASS — Local controlled testing.

**Remaining:**

- [ ] Devyana independently reviews the runtime evidence.
- [ ] Record deployed/runtime limitations where applicable.
- [ ] Confirm search/filter refresh requirements.
- [ ] Document any accepted limitations with responsible owners.

**Evidence:**

- [Issue #166 — Firestore Verification](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/issues/166)
- [Prachi's Runtime Receipt](Evidence/prachi-candidate-runtime-2026-11-18.md)

**Overall Firestore Status:** PARTIAL PASS — Local automated verification and earlier independent manual checks completed; independent candidate-runtime acceptance remains open.

---

## 6. Local Setup and Backup Verification

### Primary Candidate Setup

**Tester:** `tulseyy8848`

- [x] Pinned candidate checked out.
- [x] Exact SHA confirmed.
- [x] Clean working tree confirmed.
- [x] Dependencies installed using `npm.cmd ci`.
- [x] Local Vite server started.
- [x] Discover and Event Details checked.
- [x] Production build completed.
- [x] Playwright Chromium installed.
- [x] Automated smoke suite — 118 PASS, 0 FAIL, 0 skipped.

**Result:** PASS.

**Evidence:** [Tulasa's Setup Receipt](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/issues/118#issuecomment-6958484427)

### Independent Backup Verification

**Independent Reviewer:** `DevyanaCT`

- [x] Separate Git worktree created.
- [x] Exact candidate SHA confirmed.
- [x] Clean working tree verified.
- [x] Node.js v24.14.1 verified.
- [x] Dependencies installed successfully.
- [x] Local Vite application started.
- [x] Login page opened.
- [x] Core-page checks manually reported.
- [x] Production build completed.

**Result:** PASS — Documented independent setup scope.

**Additional Findings:**

- npm reported five high-severity dependency vulnerabilities.
- Vite reported a non-blocking JavaScript chunk-size warning.
- Devyana did not repeat the full 118-test automated suite.

**Evidence:** [Devyana's Independent Backup Receipt](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/issues/118#issuecomment-6968864555)

**Backup Setup Status:** PASS.

Final presentation-device rehearsal remains separate.

---

## 7. Known Risks and Remaining Work

Priority reflects impact on the agreed MVP demonstration.

An unverified scenario is a verification risk, not automatically a confirmed software defect.

| Risk / Limitation | Priority | Responsible Member | Required Action |
|---|---|---|---|
| Google real-account re-login | P1 | `ujjalpoudel75` | Retest after hostname repair |
| Candidate session refresh | P1 | `ujjalpoudel75` | Confirm login/logout refresh outcomes |
| Independent Firestore runtime acceptance | P1 | `DevyanaCT` | Review Prachi's candidate runtime evidence |
| Search/filter refresh expectation | P2 | Team / QA | Record intended behavior |
| Five high-severity npm findings | Review required | Coordinator / Implementation Owner | Assess dependency/security impact |
| Source explanation and code ownership | P1 | `prachi2061` | Complete required personal explanation |
| Password-recovery boundary | Scope confirmation | Authentication Owner / QA | Confirm required evidence |
| Screenshot privacy | P2 | Evidence Owners | Review and redact if necessary |
| Final demo rehearsal | P2 | Team 4 | Rehearse approved route and backup |
| Optional feature enhancements | P3 | Team 4 | Defer until remaining MVP obligations permit |

### Previously Reported Supporting Issues

- Internal member-ID UI exposure — previous correction documented in #172 / PR #173; independent regression may remain relevant.
- Friends discovery/sidebar duplication — previous correction documented in #175 / PR #176.
- Optional social and recommendation enhancements remain outside the frozen MVP demonstration scope.

No new P0 application blocker is established solely by the supplied documentation.

---

## 8. Feature-Freeze and Conditional Approval Decision

### Frozen Candidate

**Tag:** `mvp-candidate-2026-11-18`  
**SHA:** `e5f1888aa4600ac2013d6bda34a55554ba68195f`  
**Deployment:** https://campusvibe-fnh5f79me-campus-vibe.vercel.app

### Freeze Decision

- [x] Identify the exact candidate and deployment.
- [x] Freeze unnecessary feature expansion.
- [x] Record bounded automated testing results.
- [x] Complete primary local setup verification.
- [x] Complete independent local backup verification.
- [x] Perform candidate authenticated regression and record the partial result.
- [x] Link conditional team approval in Issue #177.
- [ ] Complete or formally resolve the remaining authentication checks.
- [ ] Complete independent Firestore runtime evidence review.
- [ ] Confirm refresh/filter expectations.
- [ ] Review outstanding dependency/security findings.
- [ ] Complete required personal source explanation.
- [ ] Complete final demonstration rehearsal.

### Team Approval

**Team Decision:** CONDITIONALLY APPROVED.

**Approval Evidence:** [Issue #177 — Team Conditional Approval](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/issues/177#issuecomment-6969792911)

This conditional decision applies to the pinned candidate and its documented limitations.

It does not mean that all required testing has passed or that unconditional release readiness has been established.

### Proposed Demonstration Fallbacks

- Email/password authentication may serve as a demonstration alternative only where approved and permitted by the course.
- Sample events may be demonstrated only as clearly identified sample listings.
- Unverified application-level provider behavior remains documented and is not marked PASS.
- Any further candidate source change must follow the agreed change-control process.

**Final Unconditional Release Readiness:** NOT YET ESTABLISHED.

---

## 9. Area Map, Independent Review and Evidence

Team responsibilities remain aligned with their documented Week 10 ownership areas.

| Member | Responsibility | November 18 Evidence |
|---|---|---|
| `prachi2061` | MVP Coordinator / Automated Verification | Candidate build, automated tests, runtime receipt, hostname repair |
| `ujjalpoudel75` | QA and Core Integration | Candidate regression — PARTIAL PASS |
| `DevyanaCT` | Firestore QA and Independent Verification | Field comparison, network recovery, independent backup |
| `tulseyy8848` | Build, Local Setup and Handoff | Candidate setup and 118 smoke tests |

### Evidence Links

- [Issue #116 — Authentication Testing](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/issues/116)
- [Issue #118 — Local Backup Setup](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/issues/118)
- [Issue #138 — Authenticated Core Journey](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/issues/138)
- [Issue #139 — Code Ownership](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/issues/139)
- [Issue #166 — Firestore Verification](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/issues/166)
- [Issue #167 — Google Authentication](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/issues/167)
- [Issue #177 — MVP Freeze and Approval](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/issues/177)
- [Prachi's Automated Candidate Receipt](Evidence/mvp-candidate-checks-2026-11-18.json)
- [Prachi's Firestore Runtime Receipt](Evidence/prachi-candidate-runtime-2026-11-18.md)
- [Prachi's Candidate Hostname Repair](Evidence/prachi-candidate-google-domain-2026-11-18.md)
- [Ujjal's Final Regression](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/issues/138#issuecomment-6969099874)
- [Tulasa's Setup Receipt](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/issues/118#issuecomment-6958484427)
- [Devyana's Backup Receipt](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/issues/118#issuecomment-6968864555)
- [Conditional Approval Record](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/issues/177#issuecomment-6969792911)

---

## 10. November 16–17 Historical Verification Checkpoint

This section preserves the earlier Week 11 evidence and its original timing.

### November 16 Baseline

**Inspected Revision:** `377b3bd`

The source comparison against the earlier Friends release did not establish a new candidate deployment or a new real-user runtime test.

At this checkpoint, candidate selection and team approval remained pending.

The November 15 automated receipt retains its original scope and date.

### November 17 Firestore Verification

**Tester:** `DevyanaCT`  
**Independent Reviewer:** `tulseyy8848`

- [x] Emulator connectivity verified.
- [x] HTTP 403 unauthorized-read rejection observed.
- [x] Second published-event comparison — 8 PASS.
- [x] Independent published-event review — 8 PASS.
- [x] Offline cached-data recovery observed.
- [x] Browser request-blocking and recovery completed.
- [x] Production Firestore Listen returned HTTP 200 after recovery.

At this checkpoint, terminal application-level permission-denied and loading-error callbacks had not been independently reproduced.

**Historical Result:** PARTIAL PASS — Documented checks completed, runtime verification gap retained.

**Evidence:** [Issue #166](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/issues/166)

### November 18 Candidate Freeze

The November 18 scope-freeze record supersedes the earlier "candidate not selected" status.

The candidate SHA, deployment, automated tests, primary local setup, independent backup and conditional approval are documented in the newer sections above.

Historical results remain attributed to their original testers and dates.

---

## 11. Final Verification Conclusion

CampusVibes Team 4 has:

- [x] Selected and pinned the November 18 MVP candidate.
- [x] Recorded the revision-specific deployment.
- [x] Completed the candidate production build.
- [x] Reported 28 unit tests PASS.
- [x] Reported 24 browser tests PASS.
- [x] Completed previous published-event mapping and network-recovery checks.
- [x] Reported candidate-specific local Firestore error/Retry automation PASS.
- [x] Completed primary local backup setup and 118 smoke tests.
- [x] Completed independent local backup verification.
- [x] Completed candidate core regression with PARTIAL PASS.
- [x] Linked conditional team approval in Issue #177.

### Outstanding Verification

- [ ] Successful real Google account re-login retest.
- [ ] Session refresh and refresh-after-logout confirmation.
- [ ] Independent Firestore runtime evidence review.
- [ ] Search/filter refresh behavior decision.
- [ ] Required dependency/security review.
- [ ] Required source explanation and ownership handoff.
- [ ] Final demonstration rehearsal.

### Final Status

**Candidate Selection:** COMPLETE.

**Local Automated Tests:** PASS — Recorded scopes.

**Primary Local Setup:** PASS.

**Independent Local Backup:** PASS.

**Authenticated Candidate Regression:** PARTIAL PASS.

**Firestore Independent Runtime Acceptance:** PENDING.

**Team MVP Freeze Decision:** CONDITIONALLY APPROVED.

**Final Unconditional Release Readiness:** NOT YET ESTABLISHED.

**Conclusion:** Team 4 has substantial evidence supporting its pinned CampusVibes candidate and has linked a conditional approval decision. Remaining checks and accepted limitations must continue to be documented and resolved according to the conditions of approval.

**Final Principle:** Preserve the candidate, retain honest verification evidence, complete required follow-ups, and demonstrate only functionality supported by the test results.

---

## 12. Course Source and Preparation Disclosure

This checklist follows the Week 11 course materials and adapts their verification and priority structure to CampusVibes.

- [Week 11 Work Checklist](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/course-materials/blob/0d4cd0bab57e7f96bd0b8f4bb7e50fb775f65098/week-11/work-checklist.md)
- [MVP Verification Template](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/course-materials/blob/0d4cd0bab57e7f96bd0b8f4bb7e50fb775f65098/student-starter-kit/templates/mvp-verification-checklist.md)
- [Issue Priority Guide](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/course-materials/blob/0d4cd0bab57e7f96bd0b8f4bb7e50fb775f65098/student-starter-kit/docs/issue-priority-guide.md)

The document consolidates existing test reports, receipts and team records. Its preparation does not constitute new runtime testing, a new independent human review, or an additional team approval vote.
