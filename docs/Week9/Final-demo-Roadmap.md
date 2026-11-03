# Team 4 – CampusVibes
# Final Demo Roadmap

**Last updated:** 2026/11/03  
**Last evidence review:** 2026/11/02  
**Team:** 4  
**Project:** CampusVibes

This roadmap connects the current project status, testing evidence, remaining work, and preparation for the final demonstration. All completed work must be supported by actual evidence. Planned activities must not be presented as completed tests.

---

## 1. Final Demo Promise

Our final demo aims to demonstrate:

> CampusVibes is a student-focused platform that helps university students discover campus events and activities, search and filter events, and view event details through a simple and accessible interface.

### Problem we are solving

University students may have difficulty finding campus events, clubs, and activities because information is scattered across different platforms and websites.

CampusVibes aims to make discovering campus activities easier through one accessible platform.

### Core demonstration journey

The intended core journey is:

**Landing Page → Login/Available Demo Access → Dashboard → Discover/Search → Event Details**

The November 2 automated live check verified the guest/sample-data navigation and recovery path. However, a completed authenticated login and session-restoration result still needs to be recorded by a named tester.

### What the final demo will not claim

The following items are not part of the verified core promise unless separate evidence is collected:

- Firestore Event loading (not tested).
- Completed Google Sign-In.
- Completed password-reset and changed-password login.
- Maps and external notifications.
- RSVP and social messaging.
- Advanced AI personalization.
- Profile, badges, suggestions, and supporting features not selected for the core demo.

The Events page currently uses code-based sample data. It must not be described as loading Events from Firestore until that functionality is tested successfully.

---

## 2. Current Project Status

**MVP progress: Gap to close**

The project has a working guest/sample-data demonstration path, but authentication and Firestore verification remain outstanding.

| Feature or behavior | Current status | Evidence | Remaining work |
|---|---|---|---|
| Landing page | PASS – automated guest check | November 2 core review | Continue regression checks |
| Guest dashboard access | PASS – automated guest check | November 2 core review | Keep demo access available |
| Discover / Events navigation | PASS – automated guest check | November 2 core review | Continue testing |
| Event search and filters | PASS – automated guest check | November 2 core review | Retest after changes |
| Sample Event details | PASS – automated guest check | November 2 core review | Keep sample data clearly identified |
| Empty-search recovery | PASS – automated guest check | November 2 core review | Retain recovery behavior |
| Email/password login | Historical PASS; current completed login NOT TESTED | [Issue #116](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/issues/116) | Record a current successful login and session test |
| Google Sign-In | Domain readiness PASS; completed login NOT TESTED | [Issue #134](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/issues/134) | Complete identity selection, login, and reload test |
| Password reset | NOT TESTED | [Issue #116](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/issues/116) | Verify reset email, password change, and new-password login |
| Firestore Event loading | NOT TESTED | [Issue #117](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/issues/117) | Verify actual database Event loading |
| Local setup / backup | Reported independent PASS – October 31 | [Issue #118](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/issues/118) | Conduct a separate clean-checkout setup test |
| Saved Events, Profile, Assistant, Suggestions, and theme | Supporting-feature checks reported | [Issue #133](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/issues/133) | Keep supporting limitations visible and retest selected features |

### Evidence links

- [November 2 automated test note](Evidence/prachi-core-review-2026-11-02/check-note.md)
- [November 2 raw test results](Evidence/prachi-core-review-2026-11-02/results.json)
- [Supporting-feature regression evidence – Issue #133](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/issues/133)
- [Authentication testing – Issue #116](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/issues/116)
- [Firestore testing – Issue #117](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/issues/117)

---

## 3. Regression Testing Evidence

Regression testing helps confirm that existing features continue working after project changes.

### November 2 – Core Journey Regression Check

**Result:** PASS for the tested automated guest/sample-data scope.

Verified behaviors:

- Landing page access.
- Guest dashboard navigation.
- Discover / Events navigation.
- Event search and filters.
- Opening sample Event details.
- Empty-search handling and recovery.

**Evidence:**
- [Test note](Evidence/prachi-core-review-2026-11-02/check-note.md)
- [Raw results](Evidence/prachi-core-review-2026-11-02/results.json)

**Testing limitation:** The check used two Chrome viewports. It does not prove physical-device behavior or successful authenticated login.

### November 1 – Supporting-Feature Checks

Issue #133 records supporting-feature checks, including:

- Saved Events.
- Profile.
- AI Assistant.
- Suggestions.
- Light/dark theme behavior.

**Evidence:** [Issue #133](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/issues/133)

**Limitation:** The Suggestions upload limitation and any unverified behavior must remain documented. These checks do not replace core journey testing.

### Regression Testing Rule

Whenever a change is made to an existing feature:

1. Identify the changed feature.
2. Repeat the relevant test.
3. Record the expected result.
4. Record the actual result.
5. Attach screenshots or other appropriate evidence.
6. Link the result to the related GitHub issue or pull request.

A code commit alone does not prove that a feature works.

---

## 4. Evidence Types and Testing Boundaries

| Evidence type | What it proves | Limitation |
|---|---|---|
| Planned work | What the team intends to complete | Not a completed test |
| Code review | What implementation or configuration exists | Does not prove successful behavior |
| Local test | What worked in the recorded local environment | Does not automatically prove deployed behavior |
| Automated test | What the named automation actually checked | Limited to its test scope |
| Live-system test | What happened on the deployed application | Must include date, tester, and actual result |
| Independent teammate test | What another team member verified | Must identify the person and evidence |

Canonical enrolled GitHub logins:

- `DevyanaCT`
- `prachi2061`
- `ujjalpoudel75`
- `tulseyy8848`

Historical aliases should remain connected to their original evidence.

---

## 5. Lessons That Changed Our Development Approach

| Lesson | Evidence | What we learned |
|---|---|---|
| Course lesson | [Professor's Week 8 feedback](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/grades-and-feedback/blob/main/Week%208/feedback.md) | Present actual results instead of promising unfinished functionality. |
| Testing lesson | [Issue #53](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/issues/53) and [Issue #64](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/issues/64) | Independent testing helps identify problems that developers may overlook. |
| Development lesson | Firebase integration and sample Event implementation | Verify database functionality before claiming Firestore integration is complete. |
| Regression lesson | [November 2 core test](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/tree/0f55bb56a6f4c1710cd637fd79428566647d6a58/docs/Week9/Evidence/prachi-core-review-2026-11-02) and [Issue #133](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/issues/133) | Retest existing functionality after changes and preserve evidence. |
| Teamwork lesson | [Shared Weekly Report](Weekly-Report.md) | Every member should provide their own contribution and evidence. |

---

## 6. Roadmap Milestones

**Important:** All future milestones below are PLANNED. The proposed owners and checkers must confirm their responsibilities. A planned assignment does not mean the work has been completed.

| Week / Date | Owner / Checker | Planned work | Required evidence |
|---|---|---|---|
| Week 10 – Nov 5 | Lead: DevyanaCT; Checker: tulseyy8848 | Review individual contributions, commit history, issue links, and AI-use documentation. | Four member-confirmed contribution rows and exact evidence links. |
| Week 11 – Nov 12 | Implementation: prachi2061; Checker: ujjalpoudel75; Coordinator: DevyanaCT | Verify the MVP journey, authentication, reset flow, and Firestore Event loading. Make the MVP/freeze decision. | Completed test results, screenshots, issue updates, and a documented MVP decision. |
| Week 12 – Nov 19 | Lead/checker: ujjalpoudel75; Fixes: relevant feature owners | Conduct independent QA, repeat the core journey, and identify critical bugs. | Independent QA results, reproduction steps, and retest evidence. |
| Week 13 – Nov 26 | Lead: tulseyy8848; Checker: ujjalpoudel75 | Test local setup from a clean checkout and review setup instructions. | Clean-checkout test result, environment details, commands, and screenshots. |
| Week 14 – Dec 3 | Lead: DevyanaCT; Checker: tulseyy8848 | Lock the final demo script, verify spoken claims, and conduct a timed team rehearsal. | Final script, actual duration, participant list, and rehearsal results. |
| Week 15 – Dec 10 | Lead: prachi2061; Checkers: ujjalpoudel75 and tulseyy8848 | Complete final hardening and release-readiness checks. | Release candidate, live/local test results, CI evidence, and remaining bug list. |
| Week 16 – Dec 17 | Coordinator: DevyanaCT; All members | Present the final project and complete the handoff. | Final demo evidence, setup instructions, contribution records, and handoff results. |

---

## 7. Next Actions

| Action | Owner | Completion requirement | Evidence |
|---|---|---|---|
| Confirm individual Week 9 contributions | All members | Each student confirms their own contribution and evidence. | [Shared Weekly Report](Weekly-Report.md) |
| Review independent local test | tulseyy8848 | Clarify the October 31 prepared local setup result and its limitations. | [Issue #118](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/issues/118) |
| Verify authentication | prachi2061 supports implementation; ujjalpoudel75 is proposed independent tester | Record completed login, session restoration, Google login, and reset flow results if performed. | [Issue #116](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/issues/116) |
| Verify Firestore Event loading | prachi2061 supports implementation; ujjalpoudel75 is proposed checker | Query and display an identified Firestore Event or record the actual blocker. | [Issue #117](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/issues/117) |
| Review regression results | DevyanaCT coordinates; relevant feature owners verify their work | Ensure test results and limitations are documented. | November 2 evidence and [Issue #133](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/issues/133) |
| Decide final MVP scope | All members | Agree on the features that can be demonstrated with evidence. | Dated decision in the Weekly Report and roadmap. |

---

## 8. Top Project Risks

| Risk | Why it matters | Owner | Response |
|---|---|---|---|
| Firestore Event loading is unverified | Database-loaded Events cannot be claimed. | prachi2061; proposed checker ujjalpoudel75 | Test and document the actual database result. |
| Authentication evidence is incomplete | A provider page or screenshot does not prove successful login. | prachi2061; named independent tester | Complete the authentication checks or use a clearly labelled guest/demo fallback. |
| Supporting-feature bugs | Optional features could interrupt the final presentation. | Respective feature owners | Keep supporting features optional and retest selected functionality. |
| Incomplete setup documentation | Another teammate may not be able to run the project independently. | Documentation owner | Conduct an independent clean-setup test. |
| Last-minute changes | New changes could introduce regressions. | All members | Freeze scope and prioritize stability. |
| Missing contribution evidence | Individual work may be difficult to evaluate. | All members | Maintain individual contribution rows with direct evidence links. |

---

## 9. Progress Checklist

- [x] Updated project status using November 2 evidence.
- [x] Documented the core guest/sample-data demonstration path.
- [x] Separated authenticated login from guest access.
- [x] Kept Google Sign-In and password reset unverified until completion evidence exists.
- [x] Kept Firestore Event loading marked NOT TESTED.
- [x] Linked core regression test results.
- [x] Linked supporting-feature evidence in Issue #133.
- [x] Identified remaining risks and next actions.
- [x] Created a Week 11 MVP verification and freeze plan.
- [ ] All members confirm their individual Weekly Report contributions.
- [ ] Authentication and Firestore verification are completed or formally retained as limitations.
- [ ] Independent QA and clean-setup tests are completed.
- [ ] Final timed rehearsal is completed and documented.
- [ ] Final demo and handoff evidence is collected.

---

## 10. Final Reminder

CampusVibes should be presented based on what the team can actually demonstrate, not on what the team hopes to finish.

The final demonstration will prioritize a reliable user journey, clear testing evidence, honest limitations, and understandable setup instructions.

Update this roadmap whenever new test results, project changes, or professor feedback change the team's next steps.

**A checked planning item confirms that the plan is documented. It does not certify that a future test, owner assignment, rehearsal, or feature has been completed.**
