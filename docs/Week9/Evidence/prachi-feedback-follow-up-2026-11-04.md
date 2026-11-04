# Prachi — Week 9 feedback evidence follow-up

**Owner:** `prachi2061`<br>
**Evidence reviewed:** November 4, 2026 (Asia/Seoul)<br>
**Method:** AI-assisted review of repository records and the named testers' GitHub receipts; no new application test.<br>
**Source checkout:** `100d781dc83705a06c15a9bcef20ee2e72b6a7aa`

This follow-up checks the professor's Team 4 feedback against the current records. My contribution is linking the newer receipts, keeping their authors and limits clear, and identifying the remaining implementation/testing actions. I am not the independent tester of the flows reported by my teammates.

## Feedback already addressed

- The [single Week 9 report](../Weekly-Report.md) is headed Week 9, with an evidence-review date of November 2; it no longer has the incorrect Week 10 / November 5 header. This follow-up has its own November 4 review date.
- The report now has entries for all four enrolled logins, including my domain-repair/readiness work and named evidence. Their presence does not establish that this review obtained new personal confirmations from every member.
- The [roadmap](../Final-demo-Roadmap.md) retains an MVP/data gap, sample Events and a narrow Login → Dashboard → Discover/Search → Event Details target. Maps, notifications, RSVP/social and other supporting features are outside the core promise unless separately selected and evidenced.
- The November 2 guest automation and [core matrix](../Core-Demo-Evidence-Matrix.md) remain dated snapshots. Newer teammate observations below must not be confused with that automation or silently backdated into it.

## Updated core evidence matrix — reviewed November 4

**PASS — reported teammate result** means the named person's own record reports successful behavior; I have not repeated the test. **PASS — automated** applies only to the dated technical scope. **FAIL — historical** retains an observed earlier failure. **NOT TESTED** means the required completed-flow evidence is still absent from the reviewed sources.

| Check | Status | Exact evidence and executor | Boundary / next action |
|---|---|---|---|
| Registered email/password login → authenticated Dashboard | PASS — reported independent teammate result | `ujjalpoudel75` marks the login and Dashboard steps complete and reports the journey passed in [Issue #138](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/issues/138). | This is their email/password result, not Google authentication or a new test by Prachi. |
| Discover/Events → search and category filter | PASS — reported independent teammate result | The same #138 record checks all three steps and includes screenshots. | The displayed Events remain sample data; no database Event retrieval is established. |
| Selected Event Details | PASS — reported independent teammate result | #138 marks opening/checking Event Details complete and reports the whole journey passed. | The issue does not identify the exact selected event or deployment revision; the tester should add those details. |
| Authenticated session after refresh | PASS — reported independent teammate result | #138 marks refresh/session preservation complete and labels an attached screenshot as the authenticated session after refresh. | Exact run date, browser version, device and deployment revision are not specified. Do not invent them. |
| Empty search and Clear filters recovery | PASS — automated, November 2 | [Prachi's dated guest check and raw expected/actual results](prachi-core-review-2026-11-02/check-note.md); two Chrome viewports. | Guest/sample scope; this is not part of a newly repeated independent run. |
| Google button before the authorized-domain repair | FAIL — historical | [Ujjal's earlier blocked attempt](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/issues/116#issuecomment-6559100739), [confirmed bug #134](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/issues/134). | The missing production domain was subsequently repaired; retain the earlier failure without treating it as a newly reproduced post-fix failure. |
| Google provider page opens; closing it restores the button | PASS — automated, November 2 KST | [Prachi's repair/readiness receipt](../../../frontend/react-app/verification/google-signin-domain/results.json), [PR #135](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/pull/135). | No identity or credentials were entered; the check remained signed out. |
| Google identity selected → authenticated Dashboard → session after reload | NOT TESTED | The reviewed #116/#138 receipts do not record a completed Google-account/reload result after the repair; #138 explicitly separates Google from its email/password flow. | A named tester must use their own identity and record the actual outcome. Prachi supports a reproducible implementation/configuration fix if needed. |
| Reset email received → changed password → login with changed password | PASS — reported independent teammate result | [Ujjal's own updated #116 comment](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/issues/116#issuecomment-6559100739) now records each action and observation, for the test dated November 1. | The new evidence is the tester's explicit stepwise account, not an inference from form/dashboard images. The comment acknowledges limited direct screenshots of email receipt/password change. |
| Firestore Event loading, permissions and database Events in search/details | NOT TESTED | [Issue #117](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/issues/117) still says planned/not tested. [App.jsx at the reviewed revision](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/blob/100d781dc83705a06c15a9bcef20ee2e72b6a7aa/frontend/react-app/src/App.jsx#L65) imports [the JSON catalog](../../../frontend/events.json). | Authentication success, private account/social persistence and sample navigation do not prove Firestore Event retrieval. |
| Prepared local setup / backup | PASS — reported teammate result, October 31 | [tulseyy8848's own dated #118 result](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/issues/118#issuecomment-6539563367). | Local backup only; not a new clean installation or deployed Firebase verification. |

### Receipt dates and limits

- **#138:** The reviewed issue is authored by `ujjalpoudel75` and was updated at `2026-11-04T04:36:50Z`. It states testing was performed and the complete journey passed. Its environment is the deployed website in Chrome. **That update timestamp is not an exact test-execution date.** The issue does not provide the precise run date, device/browser version, selected Event or deployed revision; the tester should add them to their own receipt. The issue remains open despite its completed checklist.
- **#116:** The independent reset comment gives **November 1** as the test date and **November 4** as the documentation update; the reviewed comment update is `2026-11-04T03:57:37Z`. It now explicitly reports inbox receipt, password change and changed-password login. This addresses the missing-observation part of the feedback while retaining the screenshot limitation. Its older Google failure is a pre-repair observation, not a new post-repair attempt.
- **#118:** The October 31 local receipt remains the backup evidence. [Tulseyy's separate November 1 deployed-navigation receipt](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/issues/118#issuecomment-6596380992) explicitly excludes independent Firebase authentication and Firestore Event verification. Keep those two results separate.
- **#133:** [DevyanaCT's November 1 supporting checks](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/issues/133) remain supporting evidence. The reported photo/file-attachment limitation stays visible; it is not a new core-authentication result or a new test of every upload path.

I reviewed the authors' written observations and source references, without entering an account or repeating their tests. Screenshots are linked in the original Issues rather than copied or used to reconstruct missing run metadata.

## Prachi's next actions and the core boundary

| Next action | Responsible person / handoff | Evidence required / fallback |
|---|---|---|
| Support a real Google-account retest after the domain repair | `prachi2061` supports implementation; a named tester records their own account's result. No new tester acceptance or successful Google login is claimed here. | Provider identity selection, Dashboard access, reload/session outcome, date, browser/device and exact URL/build. If it fails, retain the exact error and investigate that reproduced failure; do not substitute provider-page readiness. |
| Keep the independent email/password result traceable | `prachi2061` links #138; `ujjalpoudel75` owns clarifying their own run metadata. | Preserve the reported PASS and its author while adding the actual run date, selected Event and revision if known. Do not guess missing values or rewrite another person's testimony. |
| Close the Firestore Event-data gap | `prachi2061` supports the source/implementation handoff; the team confirms the implementation owner and independent checker in #117. | An identified, non-sensitive database Event reaches Discover/search/details under the tested permissions, or an exact blocker is recorded. Until then use the sample-data label and retain NOT TESTED. |
| Keep the demo narrow | `prachi2061` maintains the claim boundary for own extension work; team scope decisions remain with the team. | Core: Login → Dashboard → Discover/Search → Event Details. Maps, notifications and social/RSVP stay outside the promise until selected with value, owner and matching test proof. |

**Local/guest fallback:** Follow the [current root setup](../../../README.md#quick-start): `npm ci`, then `npm run dev` from the repository root. These are repeat instructions, not a fresh clean-install result. If current login fails, state that failure and use the labelled guest/sample Dashboard → Discover/Search → Details flow or the dated proof. A local frontend does not establish offline cloud authentication or Firestore Event loading.

**MVP status remains a gap to close.** The newer reported email/password and reset results improve authentication evidence; they do not settle completed Google authentication or the Firestore Event-data requirement. No feature, code/configuration change, new independent test or team freeze decision is added by this evidence review.
