# Week 11 MVP verification and freeze checkpoint

**Team:** 4, CampusVibes. **Prepared:** November 16, 2026 KST. **Homework due:** November 18, end of day KST.

**Coordinator:** `prachi2061`; [follow-up #177](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/issues/177). This is a filled evidence assessment, not a team freeze-approval receipt. Team approval and the final candidate remain pending.

## MVP proof and verification target

The existing [Week 11 roadmap, core demo journey](<MVP-Freeze-Final-Road Map.md>) promises a student can open the site, sign in with a verified test account, reach Dashboard, discover events, search/filter, open accurate Event Details, refresh to check availability, switch theme and log out. Stable community features are optional. The [latest demo outline](<Final demo road map.md#5-final-demo-user-journey>) also includes existing club information. This checklist retains those behaviors; it adds no feature promise.

**Data boundary:** checked-in sample event discovery and Firestore-published events are distinct. A sample-event pass does not prove a published-event query, Google login, real email delivery or provider upload. Do not use a guest demo as proof of authenticated account access.

**Inspection baseline:** `377b3bd` on November 16. The most recent documented Friends release is [cd405a7 / PR #176](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/pull/176); source comparison found no frontend/backend/package changes between that release and the inspection baseline. This comparison is not a new runtime test or selection of a team-approved freeze candidate. The November 15 [automated receipt](../../frontend/react-app/verification/friends-directory/results.json) retains its original date and scope.

## Expected and actual results

| Required check | Expected result | Recorded actual result | Proof and limit | Gate status |
|---|---|---|---|---|
| Open the deployed app | Landing page loads on desktop/mobile | November 15: HTTP 200 and guest Feed readiness passed at 1440px/390px | [Release receipt](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/issues/175#issuecomment-6890050286); read-only guest/served-code check | PASS for that dated scope; candidate retest pending |
| Verified login and Dashboard | A genuine verified account reaches Dashboard | Ujjal reported login/Dashboard PASS November 14; Devyana independently reported Google login/Dashboard PASS November 15 | [Core QA](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/issues/138#issuecomment-6878868546), [Google QA](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/issues/167#issuecomment-6889397205); exact freeze commit not recorded | PASS for reported scenarios; final revision gap |
| Email-verification workflow | Verification requirement appears; email is received; link opens; verification succeeds; authenticated Dashboard opens | November 16: `ujjalpoudel75` reported EV-01 through EV-05 PASS — 5 observed checkpoints, 0 FAIL. Five screenshots were recorded for the user-facing verification stages. | [#167 — Authentication and Email Verification](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/issues/167). This proves observed workflow stages, not independent backend restrictions on unverified accounts. | PASS for reported workflow; final candidate repeat pending |
| Discover, search and category | Matching events appear; selection opens the intended event | Ujjal reported Discover, search, category and Details PASS November 14 | [Five checks](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/issues/138#issuecomment-6878868546); does not establish every published-event field or failure | PASS for reported scenarios; final revision gap |
| Refresh/session and logout/re-login | Session remains on refresh; logout signs out; Google re-login works | Devyana reported all three PASS November 15 | [Independent five-scenario receipt](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/issues/167#issuecomment-6889397205); do not reattribute to Prachi or Ujjal | PASS for reported scenarios; candidate retest pending |
| Published-event data and recovery | Published fields match Firestore documents; denied/loading failures have usable recovery | November 16–17: `DevyanaCT` verified Firebase Emulator connectivity, inspected security rules, listeners and error-handling source, and completed a second published-event comparison (8 PASS, 0 FAIL). Independent reviewer `tulseyy8848` also reported 8 PASS, 0 FAIL. An unauthenticated Emulator GET returned HTTP 403. Offline Discover retained 14 cached published events and 9 sample listings; reconnecting cleared the warning, and production Firestore Listen returned HTTP 200. A separate Chrome DevTools request-blocking test confirmed Discover remained accessible with 9 sample listings and a no-cached-events warning while Firestore requests were blocked. After disabling blocking, 14 published events and 9 sample listings returned, and the warning disappeared. Actual application-level permission-denied and terminal loading-error/Retry callbacks remain unverified. | [#166 — Firestore Verification](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/issues/166), [#117 — Earlier Evidence](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/issues/117). Second-event screenshots attached; independent review separately reported. | PARTIAL PASS — Field comparison and network recovery passed; application-level runtime error tests pending |
| Theme, responsive UI and existing club information | Toggle works, layout fits, existing club details are reachable | November 15 automated smoke receipt: 118 desktop/mobile cases PASS; older setup note records club details | [Automated receipt](../../frontend/react-app/verification/friends-directory/results.json), [setup #118](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/issues/118); automation is not a presentation-device or fresh independent setup check | Scoped automated proof; candidate/device confirmation pending |
| Password reset/email delivery, where required by the existing authentication scope | Authorized user receives and can use the recovery flow | No new genuine delivery/reset receipt assembled for this checkpoint | [Authentication #116](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/issues/116), [#167](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/issues/167); displayed resend UI is not delivery proof | GAP until required scope/evidence is confirmed |
| Meaningful boundary: empty search and recovery | No matches is explained; clearing search restores results | November 15 smoke run includes desktop/mobile empty-search recovery | [Test](../../frontend/react-app/tests/smoke/events.spec.js), [dated receipt](../../frontend/react-app/verification/friends-directory/results.json); no new November 16 execution | Scoped automated PASS; named candidate repeat pending |

## Known bugs, risks and next work

Priority orders work against the promised path. Severity applies only to observed bugs. Untested behavior is a risk, not an invented defect.

| Bug/risk | Severity | Priority and evidence-based reason | Owner/support and next check |
|---|---|---|---|
| Final candidate, unified authenticated regression and approval not recorded | N/A, verification risk | **P1**: near-term freeze gate at risk despite viable dated paths | Prachi coordinates [#177](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/issues/177); QA `ujjalpoudel75`, independent auth checker `DevyanaCT` per their existing receipts. Record SHA and repeat required steps in #138/#167 |
| Published-event application-level runtime error handling remains unverified | N/A — required runtime verification gap, not an observed application defect | **P1:** Emulator HTTP 403 and ordinary offline recovery passed, but actual application permission-denied and terminal loading-error/retry behavior remain unverified. Second-event comparison and reviewer both reported 8 PASS, 0 FAIL. | `DevyanaCT` provides verification support in [#166](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/issues/166). `prachi2061` coordinates a safe runtime verification approach or an explicit team decision on remaining limitations. |
| Search/filter reset requirement uncertain | N/A until a requirement is approved | **P2**: current path works; need a bounded requirement decision | Prachi coordinates with UI/implementation owner in #166. Record intended refresh behavior before reporting a bug |
| Candidate setup/backup and unaided handoff not repeated | N/A, handoff risk | **P2** after P1 verification: preserve a reproducible demo fallback | `tulseyy8848` setup area in #118; Prachi coordinates a dated candidate check and a named non-author receipt |
| Internal member-ID display exposure, delivered | Reported UI privacy defect; historical severity was not assigned, not a proven authorization bypass | Closed #172 / PR #173; **P2 follow-up** only for independent regression of existing correction | Prachi; [bug evidence](Evidence/prachi-member-id-privacy-bug-report-2026-11-15.md). Use fictional accounts and verify public labels/routing; do not claim ID anonymization |
| Friends duplicated in central discovery/sidebar, delivered | **Minor** per #175 | Closed #175 / PR #176; **P2 follow-up** only for existing usability regression | Prachi; [225-connection/125-friend checks](Evidence/friends-sidebar-2026-11-15.md), [release](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/issues/175#issuecomment-6890050286). Supporting social work does not certify the Events core |
| New recommendations, automatic duplicate matching or additional social polish | N/A, deferred scope | **P3**: does not repair a demonstrated core-path gap | Keep deferred; no new feature work from this checkpoint |

No **P0** application blocker is established by this assessment. If a required path cannot be completed, record the exact failure, owner, smallest fix and retest, then reassess its priority.

## Feature-freeze decision

- [ ] Declare the entire promised core path reliable and move only to bounded P2 work. **Not justified yet**: final revision and required runtime gaps remain.
- [x] Use the **recovery/verification route** for this assessment: retain existing feature scope, identify the final candidate, and close required evidence gaps before a final readiness claim. This is a documented recommendation for the team to ratify, not a fabricated team vote.

Smallest next action: Prachi records the proposed candidate with QA, carries #166's exact unresolved checks into #177, and requests a named independent repeat of the authenticated core path. A sample-data/local demonstration may be used only as an explicitly labelled fallback; it does not waive required authentication or Firestore behavior. If those remain unavailable, record the demo limitation and obtain the team's explicit fallback decision.

**Next checkpoint:** November 18, 2026, end of day KST. Record candidate SHA/URL, expected/actual per step, tester/setup, a boundary, failures or blockers, scope approval and the resulting route in #177. Feature additions remain deferred during this work.

## Area map, independent check and evidence loop

- [Current area map](../Week10/ai-use-and-code-ownership-audit.md#codebase-area-map): auth/navigation, API/data support, UI/accessibility, QA and setup remain distinct.
- Ujjal [accepted bounded auth/API/data QA backup](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/issues/139#issuecomment-6787716484). Acceptance is recorded; it is not completion of API/persistence testing or a personal source explain-back.
- Devyana's independent Google/session check is recorded above. It supports those five scenarios, not a new November 16 run, entire final candidate or API review. A new unaided candidate repeat remains pending.
- **November 16 — Published-event verification:** `DevyanaCT` completed the source-level field-mapping inspection and reported a second published-event comparison with **8 PASS, 0 FAIL**.
- **Independent review:** `tulseyy8848` also reported **8 PASS, 0 FAIL** for the published-event field comparison. Supporting screenshots are recorded in Issue #166. The independent review does not establish application-level Firestore error handling.
- **November 17 — Firestore runtime observations:** `DevyanaCT` performed a read-only unauthenticated Firestore Emulator GET request that returned HTTP 403 Forbidden. Offline Discover displayed 14 cached published events and 9 sample listings. After connectivity was restored, the cached warning disappeared and production Firestore Listen returned HTTP 200. A separate Chrome DevTools request-blocking test confirmed that Firestore requests were blocked while Discover remained accessible with 9 sample listings and a no-cached-events warning. After disabling request blocking, 14 published events and 9 sample listings returned, and the warning disappeared. Browser-level request-blocking and recovery passed; actual terminal Firestore listener error handling was not reproduced.
- **Remaining Firestore gaps:** Actual application-level permission-denied UI handling and terminal loading-error/retry behavior remain unverified. Search/filter persistence still requires requirement confirmation.
- **Evidence:** [#166 — Firestore Final Verification](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/issues/166), [#117 — Earlier Firestore Evidence](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/issues/117).


- [Sprint 2 quality checks](Sprint-quality-quick-checks.md#sprint-2---mvp-and-freeze-week-11), [Prachi's contribution and next actions](Evidence/prachi-week11-requirements-2026-11-16.md), [one shared report](Weekly-Report.md), and [follow-up #177](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/issues/177) form the evidence loop.


## November 17 — Week 11 Verification Update

### Authentication and Email Verification

**Primary QA:** `ujjalpoudel75`

- [x] Real Google Sign-In and authenticated Dashboard tested in previously reported Week 11 scenarios.
- [x] Independent Google/session QA by `DevyanaCT` — 5 PASS, 0 FAIL.
- [x] November 16 email-verification workflow EV-01 to EV-05 — 5 PASS, 0 FAIL.
- [x] Five email-verification screenshots recorded.
- [ ] Confirm any required password-reset or unverified-account boundary evidence.
- [ ] Repeat the required authentication/core journey on the selected freeze candidate.

**Evidence:** [Issue #167](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/issues/167)


### Firestore Integration

**Tester:** `DevyanaCT`  
**Independent Reviewer:** `tulseyy8848`  
**Testing Date:** November 16–17, 2026

- [x] Local Firebase Authentication and Firestore Emulator connections verified.
- [x] Published-event security rules, Firestore listeners and error-handling source inspected.
- [x] Unauthenticated Firestore Emulator GET returned HTTP 403 Forbidden.
- [x] Second published-event comparison — 8 PASS, 0 FAIL.
- [x] Independent reviewer also reported 8 PASS, 0 FAIL.
- [x] Published-event screenshots attached in #166.
- [x] Offline Discover retained 14 cached published events and 9 sample listings.
- [x] Cached-data warning and Retry button displayed during offline testing.
- [x] Restored connectivity and confirmed the cached warning disappeared.
- [x] Production Firestore Listen returned HTTP 200 after reconnection.
- [x] Temporarily blocked Firestore requests through Chrome DevTools.
- [x] Confirmed Discover remained accessible with 9 sample listings during request blocking.
- [x] Confirmed the no-cached-events warning and Retry button were displayed.
- [x] Disabled request blocking and confirmed 14 published events and 9 sample listings returned.
- [x] Confirmed normal Discover status was restored.
- [ ] Verify actual application-level permission-denied UI handling.
- [ ] Verify actual terminal Firestore loading-error callback.
- [ ] Verify Retry recovery specifically from the terminal application error state.
- [x] Confirm required search/filter persistence behavior.

**Evidence:** [Issue #166 — Firestore Verification](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/issues/166)

**Result:** PARTIAL PASS — Browser-level Firestore interruption and recovery verified. Actual application-level runtime error handling remains unverified.

**Changes Made:** No application source code, Firestore security rules or database records were modified. Temporary browser request blocking was disabled after testing.


### Final MVP Freeze Gate
**November 18 — Tulsey's Frozen Candidate Local Setup and Smoke Test**

Tester: `tulseyy8848`  
Candidate: `mvp-candidate-2026-11-18`  
Commit: `e5f1888aa4600ac2013d6bda34a55554ba68195f`

- [x] Checked out the pinned candidate and confirmed the exact commit SHA.
- [x] Confirmed the working tree was clean.
- [x] Installed dependencies successfully using `npm.cmd ci`.
- [x] Started the local Vite development server and opened CampusVibes.
- [x] Checked Discover Events and Event Details.
- [x] Completed the production build successfully.
- [x] Installed Playwright Chromium.
- [x] Ran the complete Playwright smoke-test suite: **118 PASS, 0 FAIL, 0 skipped** (5.5 minutes).
- [x] Attached screenshots and test evidence to [Issue #118](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/issues/118#issuecomment-6958484427).

- [x] Record the pinned candidate commit SHA and corresponding deployed URL: `e5f1888aa4600ac2013d6bda34a55554ba68195f` — [Candidate deployment](https://campusvibe-fnh5f79me-campus-vibe.vercel.app/)
- [ ] Repeat the required authenticated core journey on that candidate.
- [ ] Confirm independent teammate setup and backup handoff on the same candidate.
- [ ] Resolve or explicitly decide how to handle remaining required Firestore runtime gaps.
- [ ] Record team approval or the required recovery route.
**Result:** Tulsey's own frozen-candidate local setup and automated smoke testing are complete. Independent teammate retest and backup handoff confirmation remain pending. This does not replace authenticated candidate regression, Firestore runtime error/Retry verification, or team release approval.

**Freeze Decision:** PENDING.

**Coordinator:** `prachi2061`  
**Tracking:** [Issue #177](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/issues/177)

This checkpoint records dated verification evidence. It does not claim a new automated regression run or team freeze approval.

## Course source and preparation disclosure

Based on the [Week 11 checklist](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/course-materials/blob/0d4cd0bab57e7f96bd0b8f4bb7e50fb775f65098/week-11/work-checklist.md), [verification template](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/course-materials/blob/0d4cd0bab57e7f96bd0b8f4bb7e50fb775f65098/student-starter-kit/templates/mvp-verification-checklist.md) and [priority guide](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/course-materials/blob/0d4cd0bab57e7f96bd0b8f4bb7e50fb775f65098/student-starter-kit/docs/issue-priority-guide.md). Structure adapted for the course assignment; no fictional worked-example evidence was reused. Codex read linked records and prepared this assessment. No runtime tests, genuine login, human explanation, teammate request/acceptance or team vote were performed by this documentation update.

## November 18 coordination checkpoint - Prachi

Prachi confirmed on November 18 that **no freeze candidate has been approved**. Candidate SHA, team sign-off and the final candidate regression remain **PENDING**; the inspected repository revision is not a selected candidate. Continue the existing recovery/verification route and defer optional Community/Feed features.

The [dated follow-up](Evidence/prachi-week11-feedback-2026-11-18.md) links the current named receipts and next-check owners. Issue #166 already records Devyana's second-event comparison, tulseyy8848's independent 8/8 review and screenshots; actual listener permission-denied, terminal loading-error and error-state Retry remain pending. The existing QA owner is ujjalpoudel75 for the candidate regression, DevyanaCT supports the remaining Firestore runtime checks, and tulseyy8848 owns the candidate setup/backup check in #118. Prachi coordinates the candidate/scope decision in #177. These are existing responsibility references, not new acceptances or completed tests.

No new runtime test, human source explanation or team approval is supplied by this documentation checkpoint. Record the actual SHA, URL, scope decision, named tester and proof before changing the gate status.


## November 18 MVP scope freeze and pinned candidate - Prachi

Prachi instructed a scope freeze. The [freeze record](MVP-Freeze-Record.md) pins candidate `e5f1888aa4600ac2013d6bda34a55554ba68195f` / `mvp-candidate-2026-11-18`, binds its recorded deployment and limits work to the existing core journey, defect fixes and verification. Build, 28 unit checks and 24 local desktop/mobile browser cases passed; this is Codex-assisted automation with reused dependencies and guest/fixture data.

**Team release approval remains PENDING.** The candidate is now identified; actual team sign-off, independent authenticated candidate regression, terminal Firestore error/Retry results, candidate clean setup/backup and Prachi's personal explanation remain open. This dated scope-freeze instruction supersedes the earlier "candidate not selected" coordination status, without changing earlier test dates or claiming a team vote.
