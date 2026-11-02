# Final Demo Roadmap

**Team:** 4  
**Project:** CampusVibes  
**Last evidence review:** 2026/11/02 (Asia/Seoul)

Use this shared roadmap to connect what the project can prove now to the final demo and handoff. Each student should understand the next milestone and add their own contribution and evidence to the shared Weekly Report.

## Final demo promise

Our verification target for the final demo is:

> CampusVibes is a student-focused platform that helps university students discover campus events and activities, search and filter events, and view event details through a simple and accessible interface.

**Who it helps and what problem it addresses:**  
CampusVibes helps university students who have difficulty finding campus events, clubs, and activities because information may be scattered across different platforms or websites.

**What the evidence will prove:**  
The narrow target is Login → Dashboard → Discover/Search → Event Details. Current November 2 automation verifies the guest/sample-data navigation and recovery path. A named human's completed login and session result is still needed before presenting the current authenticated path as verified. Registration, Google login and password reset are separate checks, not outcomes inferred from guest access or a dashboard image.

**What the demo will not claim:**  
Firestore Event loading remains NOT TESTED; the visible Events page uses code-based sample data. Maps, notifications, RSVP, social/messages, Assistant, profile, suggestions, badges, uploads and theme behavior stay outside the core promise unless the team explicitly selects a named flow with its own owner and matching evidence. No new feature work is authorized by this roadmap update.

## Current state

**MVP progress:** Gap to close

**If a gap remains, link the Week 11 recovery path:**  
The [shared report's core matrix](Weekly-Report.md#core-evidence-matrix--reviewed-november-2) is the current status record. The November 4 checkpoint below collects missing member wording and test receipts; Week 11 retains the MVP/data-boundary and freeze decision. Future milestones are plans, not completed tests. A repaired Google domain and a provider-page screenshot do not establish completed account authentication.

| Status | Behavior, quality, or handoff item | Evidence link | What is still uncertain? |
|---|---|---|---|
| PASS — automated live guest check | Landing, guest Dashboard → Discover/search/filter → sample Details, empty search and recovery | [November 2 expected/actual record](Evidence/prachi-core-review-2026-11-02/check-note.md), [raw results](Evidence/prachi-core-review-2026-11-02/results.json) | Two Chrome viewports, not physical-phone or completed authentication proof. |
| Historical PASS; current completed login NOT TESTED | Email/password login and session behavior | [October 20 technical record](../Week7/Evidence/core-path-2026-10-20/check-note.md), [current #116](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/issues/116) | A named tester must record the current completed login, Dashboard access and reload/session result. |
| Repaired blocker; readiness PASS | Google authorized-domain failure and provider-page handoff/cancellation | [Bug #134](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/issues/134), [domain/readiness receipt](../../frontend/react-app/verification/google-signin-domain/results.json) | No Google identity was selected; this is not completed Google authentication. |
| NOT TESTED | Completed Google identity login and session restoration | [#116](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/issues/116) | Select the tester's own identity, verify Dashboard and reload, and retain actual results. |
| NOT TESTED | Reset email → password change → login with the changed password | [#116 form/dashboard screenshots](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/issues/116#issuecomment-6559100739) | These screenshots do not prove email receipt or changed-password login; the completion claim needs stepwise evidence. |
| NOT TESTED | Firestore Event loading | [#117](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/issues/117), [sample catalog](../../frontend/events.json) | Auth/account/social persistence does not verify database-loaded Events. |
| Reported independent local PASS — October 31 | Prepared local setup / backup demo | [tulseyy8848's dated result](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/issues/118#issuecomment-6539563367) | A historical local result, not a fresh clean-checkout or deployed-authentication check. |
| Reported supporting checks — November 1 | Saved/Profile/Assistant/Suggestions/theme checks | [DevyanaCT's #133](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/issues/133) | Supporting scope only; keep the stated Suggestions upload limitation and unverified flow details visible. |

### Evidence types and independence

| Evidence type | What it can establish | Boundary for this project |
|---|---|---|
| Planned work | A proposed owner, check and intended proof. | An unchecked milestone or template is not a test result. |
| Code review / implementation | What source code or configuration change exists. | A commit does not establish successful live behavior. |
| Local check | What ran in the stated local setup. | State prepared vs clean checkout, sample/emulator/cloud use, tester and date. |
| CI check | What the named pipeline actually ran. | A green Vercel build is not a browser login, reset-email or Firestore Event test. |
| Live-system result | What happened on the stated deployed URL at the recorded time. | Separate human testing from automation. The November 2 guest and Google-page checks are automated; their scopes exclude completed login. |
| Independent teammate result | A named person checks work they did not implement and records actual outcomes. | Use the dated #118 local result with its limits; do not relabel automation or code review as a teammate test. |

Canonical enrolled logins are `DevyanaCT`, `prachi2061`, `ujjalpoudel75`, and `tulseyy8848`. `Tulseyy8848` in the linked receipt is display text for `tulseyy8848`, not a fifth member. Historical aliases stay attached to their original receipts.

## Lessons that change our route

| Lesson | Source or evidence | What we will do differently |
|---|---|---|
| Course or team-process lesson | [Professor's midterm feedback](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/grades-and-feedback/blob/main/Week%208/feedback.md) and [Week 7 documention](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/tree/9670e9bd4c329c4cc31fead121dbb48e242fb9f3/docs/Week7) | Show actual results, provide evidence, and avoid claiming unfinished work as completed. |
| Project lesson from building, testing, or feedback | [Issues#53](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/issues/53), [Issue #64](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/issues/64) | Test the main user journey independently, identify limitations, and prioritize reliable features over adding unnecessary features. |
| Development lesson | Firebase integration and current sample-event implementation | Verify database functionality before presenting Firestore event loading as complete. |
| Teamwork lesson | [Current single shared report](Weekly-Report.md) and [dated local tester receipt](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/issues/118#issuecomment-6539563367) | Each member authors/confirms their own row. A coordinator can link another person's receipt, but must not present that as new student-authored wording or a fresh test. |

## Roadmap milestones

**Status of every row below: PLANNED.** Named roles are proposed from the current project responsibilities and must be confirmed by those people; recording a role is not evidence that the person accepted it or performed the check. The checker should be different from the author of the work being checked. No future test, review, rehearsal or feature-freeze decision is marked complete here.

| Week / date | Owner / separate checker | Check another person can perform | Evidence to save | Fallback if the check fails |
|---|---|---|---|---|
| 10 / Nov 5 — Code ownership and AI-use audit | Lead: DevyanaCT; each enrolled member owns their row. Checker: tulseyy8848. | Follow each member's specific commit/Issue/PR link, compare it with that member's confirmed row and identify assistance and remaining limits. | Planned: four confirmed rows, exact receipt URLs/revisions, owner confirmations and the AI-use note in that week's shared report. | Leave missing/unconfirmed entries pending; retain the original receipt and give its owner one concrete correction. Do not write another student's reflection as completed work. |
| 11 / Nov 12 — MVP verification and freeze decision | Lead: prachi2061 for implementation/data boundary. Checker: ujjalpoudel75; DevyanaCT coordinates the core demonstration. | From the recorded starting state, complete Login → Dashboard → Discover/Search → Details and reload. Separately verify a real Google login, full reset chain and an explicitly identified Firestore Event fixture, or record their actual failure/blocker. | Planned: #116 auth/session/reset steps and screenshots; #117 Event source/query/permissions result; tester, device/browser, URL/revision, expected/actual results and team MVP/freeze decision. | Keep unverified cases NOT TESTED or observed failures FAIL. Use labelled sample Events/guest access and the local backup; exclude unverified authentication and database claims from the promise. |
| 12 / Nov 19 — Independent QA and bug triage | Lead/checker: ujjalpoudel75 for work they did not implement; prachi2061 owns relevant fixes. Retest coordinator: DevyanaCT. | Repeat the frozen path, empty-search recovery and one relevant failure case against the identified build; reproduce any bug and rerun it after its fix. | Planned: named independent QA receipt, reproduction steps, expected/actual results, before/after proof and linked fix PRs in the relevant Issues. | Prioritize blocking core bugs, defer optional features and keep the last actually verified path with its limitations. A code change alone does not close a test failure. |
| 13 / Nov 26 — Clean setup / handoff trial | Lead: tulseyy8848. Separate checker: ujjalpoudel75, using instructions they did not author. | Start from a clean checkout on the stated environment, run the current root setup commands and follow the core/local fallback without undocumented help. | Planned: #118 follow-up with revision, OS/Node/browser, commands, setup output, journey, actual result, time taken and any missing instruction. | Fix the setup note and repeat. Until then, use a labelled prepared checkout or dated screenshots; do not call the old prepared local run a new clean-install pass. |
| 14 / Dec 3 — Demo lock and contribution audit | Lead: DevyanaCT. Checker: tulseyy8848; each member confirms their own contribution. | A non-script author follows the locked script, times the actual narrated run, attempts the fallback and checks each spoken claim against its receipt. | Planned: versioned script/build, named participants, actual duration, expected/actual outcome, core/fallback proof and four confirmed contribution links. | Remove unstable steps from the promise, retain unresolved gaps and repeat the rehearsal. Do not replace missing duration/outcome fields with checkmarks. |
| 15 / Dec 10 — Hardening and release readiness | Lead: prachi2061. Live checker: ujjalpoudel75; local-backup checker: tulseyy8848. | Repeat the locked path on the release candidate and verify the declared local/guest fallback, including current auth/data boundaries. | Planned: release-candidate revision/URL, named dated live/local results, CI results kept separate, remaining bugs and fallback instructions. | Stop optional scope, fix/retest blocking errors or use an actually verified earlier path; state limitations when switching to the backup. |
| 16 / Dec 17 — Presentation and handoff | Coordinator: DevyanaCT; all four members deliver their own confirmed parts. Handoff checker: tulseyy8848 or another person who did not author the setup being checked. | Demonstrate only the locked verified steps, explain sample/auth/data limits, and have the recipient locate the setup and evidence from the handoff entry point. | Planned: final script/build, delivery/handoff record, recipient's check result, evidence index, contribution receipts and unresolved items with next owners. | Use the declared local/guest path or clearly labelled recorded proof; hand over unresolved work explicitly instead of asserting MVP completion. |

## Next one or two weeks

| Issue or action | Owner | Done when | Evidence path |
|---|---|---|---|
| Before Wed Nov 4: confirm own report wording and roles | Each member for their row; DevyanaCT coordinates. | Four member-authored/confirmed entries link specific evidence; pending confirmations stay visible. | [Single Week 9 report](Weekly-Report.md), member-owned Issue/PR comments and the role-confirmation record. |
| Before Wed Nov 4: bring the existing independent working-path result | tulseyy8848 supplies/clarifies their receipt; prachi2061 links the scoped handoff. | The October 31 local result can be explained with its prepared setup, date and limits; a later test is labelled separately. | [Dated #118 result](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/issues/118#issuecomment-6539563367), [independent-test handoff](Evidence/independent-test-handoff.md). |
| Before Wed Nov 4: update current auth results or state the blocker | prachi2061 supports implementation; ujjalpoudel75 is the proposed independent tester. | Record completed email/password/Google login and reload if performed; record reset email, password change and changed-password login separately. Otherwise retain NOT TESTED with the next required step. | [#116](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/issues/116), not just provider-page or reset-form screenshots. |
| Week 11: verify the Event-data boundary | prachi2061 supports implementation; ujjalpoudel75 checks independently. | An identified Firestore Event can be queried and shown under the tested permissions, or the exact missing implementation/configuration/permission blocker is recorded. | [#117](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/issues/117); sample catalog remains labelled until this passes. |
| Week 11: record the MVP/freeze decision | DevyanaCT coordinates; all four confirm their own roles and claims. | The promise includes only steps supported by current evidence; any retained extension has value, owner and its own test receipt. | Planned: dated decision in the shared report/roadmap, with unresolved limits and fallback. |

## Top risks

| Risk | Why it matters | Owner | Response or fallback | Review week |
|---|---|---|---|---|
| Firestore Event loading remains unverified | The project cannot yet support a database-loaded Events claim. | prachi2061 (implementation); ujjalpoudel75 (proposed checker) | Record actual database success/failure in #117; retain clearly labelled sample Events. | Week 11 |
| Completed authentication/reset evidence is missing | Provider-page readiness and form/dashboard images do not prove the full flows. | prachi2061; ujjalpoudel75 (proposed checker) | Retest and save stepwise results in #116. A fresh successful email/password fallback must also be recorded before claiming it for the current build; otherwise declare guest/local fallback. | Before Nov 4; Week 11 |
| Authentication problems | Users may be unable to access the application. | prachi2061; named independent tester | State the failed login step, fix/retest it or explicitly switch to guest/sample demonstration without an authenticated-user claim. | Week 11–12 |
| Bugs in supporting features | Unverified features could interrupt the final demonstration. | Respective feature owners; DevyanaCT coordinates testing | Keep supporting features optional and demonstrate only verified behavior. | Week 12–14 |
| Incomplete setup documentation | Another teammate may be unable to run the application independently. | Documentation owner; independent setup tester | Conduct a separate setup and handoff trial. | Week 13 |
| Last-minute changes | New changes could introduce bugs before the presentation. | All team members | Freeze the demo and focus on testing and stability. | Week 14–15 |
| Missing individual contribution evidence | The professor may not be able to identify each student's work. | All team members | Update individual contributions and evidence in the shared Weekly Report. | Every week |

## Progress check

- [x] The documented route begins with dated evidence and explicit limits.
- [x] The proposed core claim and fallback separate verified behavior from missing tests.
- [x] Each planned milestone names an owner/checker, repeatable check, evidence to save and failure fallback.
- [x] The Week 11 plan includes MVP verification and a feature-freeze decision.
- [ ] Google sign-in and password reset are completed and tested or clearly documented as unfinished.
- [x] The Week 13 plan includes another person's clean setup/handoff trial.
- [x] The Week 14 plan defines the demo-lock and contribution checks.
- [x] The Week 15 plan covers readiness/hardening without new scope.
- [ ] The shared Weekly Report records each student's own contribution and evidence.

Update this roadmap when new tests, feedback, or constraints change the best route. Keep old decisions understandable by linking the relevant Issue or evidence.

Checked items above certify the documented plan only. Owner acceptance, future tests, team decisions, narrated rehearsals and missing member-authored rows remain pending until their actual receipts are saved.
