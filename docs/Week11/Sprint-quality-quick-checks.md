# Sprint Quality Quick Checks

Complete the section for your current sprint at its final class meeting. These are quick evidence checks, not a demand for a perfect product.

## Sprint 0 - Launch and Scope (Week 3)

- [x] Every member can access the repository and board.
- [x] Meaningful work has an Issue, owner, and Definition of Done.
- [x] The project purpose, target user, and scope boundary are visible.
- [x] The team agreement is linked and current.
- [x] No personal data, secrets, or unapproved real-user data has been posted.

## Sprint 1 - Vertical Slice (Week 7)

- [x] One small end-to-end user path works or its blocker is clearly documented.
- [x] The path has a screenshot, demo, or test note.
- [x] The team can explain what happens when the main path cannot complete.
- [x] The README or setup note tells another person how to view or run the current work.
- [x] The team has checked that no secrets or private data are in its shared evidence.

### October 20 Technical Check and Human Follow-Up

The [production core/fallback record](./Evidence/core-path-2026-10-20/check-note.md) verifies email/password login, Dashboard -> Discover -> search/filter -> Event Details from clean desktop/mobile browser contexts. It also records empty-search recovery and an injected sign-in network failure followed by a real successful retry. Exact revision, browser/viewports, expected/actual results, timings and screenshots are linked there.

These are Codex-assisted automated checks for `prachi2061`, not independent teammate testing or the 3-5 minute presentation. The unchecked team-explanation item above stays pending until the speakers actually explain the fallback. The [demo script](./midterm-demo-script.md#failure-and-fallback) now states it explicitly. Existing historical checkmarks do not certify new human activity or a fresh clean-checkout run.

The new proof uses only a synthetic account, masks login inputs, and records deletion of the account and its test records. Each member must still review their own shared material before the final presentation. Discover remains code-based sample data; Firestore event loading is unverified in [Issue #35](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/issues/35).

**Pre-rehearsal rubric review:** strength - a narrow path with direct current proof and an explicit data boundary. Highest-value improvement - complete the real timed team explanation, with confirmed speakers and each student's receipt. This is not a graded rubric score. See the [course rubric](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/course-materials/blob/main/student-starter-kit/docs/midterm-presentation-rubric.md).


## Sprint 2 - MVP and Freeze (Week 11)

**Updated:** November 18, 2026 KST  
**Project:** CampusVibes — Team 4  
**Coordinator:** `prachi2061`  
**Candidate Tag:** `mvp-candidate-2026-11-18`  
**Candidate SHA:** `e5f1888aa4600ac2013d6bda34a55554ba68195f`  
**Candidate Deployment:** https://campusvibe-fnh5f79me-campus-vibe.vercel.app

**MVP Scope Freeze:** IN EFFECT  
**Team Decision:** CONDITIONALLY APPROVED  
**Approval Evidence:** [Issue #177 — Team Conditional Approval](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/issues/177#issuecomment-6969792911)

The November 18 MVP candidate has been selected and documented. The team has completed substantial automated, manual, Firestore, and independent local backup verification.

Conditional approval has been linked in Issue #177. Remaining verification limitations and follow-up responsibilities remain documented.

### Sprint 2 Quality Checklist

- [x] The selected MVP candidate has undergone core-journey testing, with actual results and remaining blockers recorded.
- [x] Demo-relevant bugs and verification risks have documented owners and follow-up plans.
- [x] Frozen MVP scope and its evidence-based demonstration route are documented.
- [x] Basic input/error handling has automated evidence or documented limitations.
- [ ] All AI-assisted work has the required completed personal source explanation and independent handoff.
- [x] Current codebase areas, setup evidence, and independent backup verification are linked.
- [x] Exact candidate SHA and deployment recorded.
- [x] Primary candidate setup and automated smoke testing completed.
- [x] Independent local backup setup verified.
- [x] Conditional team approval recorded in Issue #177.
- [ ] All remaining conditional approval requirements resolved.
- [ ] Final presentation-device rehearsal completed.

**Sprint 2 Result:** CONDITIONALLY APPROVED — Remaining verification and demonstration follow-up required.

### November 18 — Completed Verification Summary

| Verification | Responsible Member | Result |
|---|---|---|
| Candidate SHA and deployment | `prachi2061` | RECORDED |
| Production build | `prachi2061` | PASS |
| Candidate unit tests | `prachi2061` | 28 PASS |
| Candidate browser tests | `prachi2061` | 24 PASS |
| Controlled Firestore error/Retry tests | `prachi2061` | PASS — Local automation |
| Published-event field comparison | `DevyanaCT` | 8 PASS, 0 FAIL |
| Independent published-event review | `tulseyy8848` | 8 PASS, 0 FAIL |
| Unauthorized Emulator read | `DevyanaCT` | PASS — HTTP 403 |
| Firestore offline/network recovery | `DevyanaCT` | PASS |
| Local setup and smoke suite | `tulseyy8848` | 118 PASS, 0 FAIL |
| Independent local backup verification | `DevyanaCT` | PASS |
| Candidate Dashboard and Discover | `ujjalpoudel75` | PASS |
| Search, Category Filter and Event Details | `ujjalpoudel75` | PASS |
| Empty Search and Recovery | `ujjalpoudel75` | PASS — Tester-reported |
| Email/Password Login | `ujjalpoudel75` | PASS — Tester-reported |
| Google Re-Login | `ujjalpoudel75` | RETEST REQUIRED |
| Session Refresh | `ujjalpoudel75` | PENDING CONFIRMATION |
| Team Conditional Approval | Team 4 | RECORDED IN #177 |

### Remaining Risks and Follow-Up

| Item | Current Evidence / Gap | Owner or Support | Next Action |
|---|---|---|---|
| Google re-login | Initial candidate configuration error; hostname repair documented | `ujjalpoudel75`, `prachi2061` | Confirm successful real-account Google re-login |
| Session behavior | Refresh and refresh-after-logout outcomes pending | `ujjalpoudel75` | Record expected and actual results |
| Firestore runtime acceptance | Local automated tests PASS; independent review pending | `DevyanaCT` | Review candidate runtime evidence |
| Search/filter refresh | Expected persistence behavior undecided | Team / QA | Confirm requirement |
| Dependency security | Five high-severity npm findings reported | Coordinator / Implementation Owner | Review and document impact |
| Personal source explanation | Required human explain-back not yet recorded | `prachi2061` | Explain relevant source path and failure |
| Final demo readiness | Presentation-device rehearsal pending | Team 4 | Rehearse approved journey and fallback |

---

### November 17 — Firestore Verification Update

**Tester:** `DevyanaCT`  
**Independent Reviewer:** `tulseyy8848`  
**Evidence:** [Issue #166](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/issues/166)

#### Completed Verification

- [x] Local Firebase Authentication and Firestore Emulator connectivity verified.
- [x] Unauthenticated Firestore Emulator GET returned HTTP 403 Forbidden.
- [x] Published-event field comparison — 8 PASS, 0 FAIL.
- [x] Independent reviewer also reported 8 PASS, 0 FAIL.
- [x] Offline Discover retained 14 cached published events and 9 sample listings.
- [x] Cached-data warning and Retry button were visible.
- [x] Restored connectivity and confirmed the warning disappeared.
- [x] Production Firestore Listen returned HTTP 200 after reconnection.
- [x] Temporarily blocked Firestore requests using Chrome DevTools.
- [x] Confirmed Discover remained accessible with 9 sample listings during request blocking.
- [x] Confirmed the no-cached-events warning and Retry button were visible.
- [x] Disabled request blocking and confirmed 14 published events and 9 sample listings returned.
- [x] Confirmed the warning disappeared and normal Discover functionality was restored.

#### Limitations at the November 17 Checkpoint

- [ ] Independently reproduce actual application-level permission-denied handling.
- [ ] Independently reproduce terminal Firestore loading-error callback.
- [ ] Independently verify Retry recovery from terminal error state.
- [ ] Confirm search/filter persistence requirements.

**Historical Result:** PARTIAL PASS — Published-event mapping and browser-level network recovery verified.

**Testing Restriction:** No application source code, Firestore security rules or database records were modified.

The November 17 results remain separate from the later candidate-specific automated testing.

---

### November 18 — Automated Firestore Runtime Verification

**Coordinator:** `prachi2061`

Prachi's local candidate-specific testing reported:

- [x] Firestore Emulator permission-denied handling.
- [x] Controlled terminal loading-error callback.
- [x] Retry recovery under controlled error conditions.
- [x] Desktop and mobile browser verification.

**Automated Result:** PASS — Local automated testing.

**Evidence:** [Prachi's Runtime Test Receipt](Evidence/prachi-candidate-runtime-2026-11-18.md)

#### Remaining

- [ ] Independent evidence review by `DevyanaCT`.
- [ ] Independent/deployed runtime acceptance if required.
- [ ] Confirm search/filter refresh behavior.

**Note:** Local error injection does not independently prove real production-provider failure behavior.

---

### November 18 — Authenticated Candidate Regression

**Tester:** `ujjalpoudel75`

#### Completed

- [x] Authenticated Dashboard.
- [x] Discover Events.
- [x] Event Search.
- [x] Category Filtering.
- [x] Event Details.
- [x] Empty Search and Recovery — tester-reported.
- [x] Logout.
- [x] Email/Password Login — tester-reported.

#### Remaining

- [ ] Confirm session refresh.
- [ ] Confirm refresh after logout.
- [ ] Retest real Google re-login after the candidate-hostname authorization update.

Google re-login initially displayed a configuration error on the candidate deployment. Prachi documented adding the candidate hostname to Firebase authorized domains.

Provider-page readiness was reported, but a successful real-account re-login remains unconfirmed.

**QA Result:** PARTIAL PASS.

**Evidence:** [Ujjal's Final Candidate Regression](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/issues/138#issuecomment-6969099874)

---

### November 18 — Primary and Independent Local Backup

**Primary Tester:** `tulseyy8848`  
**Independent Reviewer:** `DevyanaCT`

#### Primary Setup

- [x] Exact pinned candidate checked out.
- [x] Candidate SHA verified.
- [x] Dependencies installed.
- [x] Vite development server started.
- [x] Discover and Event Details checked.
- [x] Production build completed.
- [x] Playwright smoke suite — 118 PASS, 0 FAIL, 0 skipped.

**Primary Setup Result:** PASS.

**Evidence:** [Tulasa's Handoff](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/issues/118#issuecomment-6958484427)

#### Independent Setup

- [x] Separate Git worktree created.
- [x] Correct candidate SHA confirmed.
- [x] Clean working tree verified.
- [x] Node.js v24.14.1 confirmed.
- [x] Dependencies installed using `npm.cmd ci`.
- [x] Local Vite server started.
- [x] CampusVibes login page opened.
- [x] Discover, Search and Event Details manually reported working.
- [x] Production build completed successfully.

**Independent Setup Result:** PASS.

**Additional Observations:**

- npm reported five high-severity dependency vulnerabilities.
- Vite reported a non-blocking JavaScript chunk-size warning.
- The independent reviewer did not repeat the 118-case automated smoke suite.

**Evidence:** [Devyana's Independent Backup Verification](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/issues/118#issuecomment-6968864555)

---

### November 18 — Conditional Team Approval

**Coordinator:** `prachi2061`  
**Candidate Tag:** `mvp-candidate-2026-11-18`  
**Candidate SHA:** `e5f1888aa4600ac2013d6bda34a55554ba68195f`

**Team Decision:** CONDITIONALLY APPROVED.

**Approval Evidence:** [Issue #177 — Conditional Team Approval](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/issues/177#issuecomment-6969792911)

The conditional approval is recorded for the pinned candidate and the documented testing evidence.

The remaining authentication, Firestore acceptance, security review and demonstration-readiness tasks continue as follow-up conditions.

#### Remaining Approval Conditions

- [ ] Successful real-account Google re-login or permitted accepted alternative.
- [ ] Confirm session refresh behavior.
- [ ] Complete independent Firestore runtime evidence review.
- [ ] Confirm expected search/filter refresh behavior.
- [ ] Review five high-severity npm dependency findings.
- [ ] Complete required personal source explanation.
- [ ] Rehearse the final demonstration and backup.
- [ ] Resolve or formally accept remaining conditions where permitted.

**MVP Scope Freeze:** IN EFFECT.

**Conditional Team Approval:** RECORDED.

**Unconditional Release Readiness:** NOT YET ESTABLISHED.

No unfinished test is represented as PASS solely because the candidate received conditional approval.

---

### Sprint 2 Conclusion

CampusVibes Team 4 completed substantial candidate-specific automated testing, Firestore verification, authenticated core-journey checks, and local backup preparation.

The candidate has a linked conditional team approval decision in Issue #177.

Remaining tests, verification limitations, and final-demo obligations remain tracked by responsible members.

**Final Sprint 2 Status:** CONDITIONALLY APPROVED — Follow-up required.

**Evidence:**
- [MVP Verification Checklist](MVP-Verification-Checklist.md)
- [Final Demo Roadmap](MVP-Freeze-Final-Road%20Map.md)
- [Weekly Report](Weekly-Report.md)
- [Issue #177 — MVP Freeze Decision](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/issues/177)


## Sprint 3 - QA and Handoff (Week 14)

- [ ] Main demo path, error/empty state, and key links or buttons have been checked.
- [ ] Keyboard access, visible labels, and readable contrast have received a basic review.
- [ ] Setup and handoff instructions work for someone outside the team.
- [ ] The project has safe demo data and no secrets or private data in shared evidence.
- [ ] Demo fallback and remaining blocker plan are documented.

## Sprint 4 - Final Readiness (Week 15)

- [ ] The final demo has been rehearsed with its fallback plan.
- [ ] Presentation and demo roles are assigned.
- [ ] Final evidence, contribution receipts, setup guide, and handoff links are easy to find.
- [ ] Blocker and major-bug status is honest and current.
- [ ] The Final Readiness Report names any remaining action and owner.
