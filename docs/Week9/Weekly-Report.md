# Weekly Report

**Team:** 4  
**Project:** CampusVibes  
**Week:** 9<br>
**Evidence review / update date:** 2026/11/02 (Asia/Seoul)

This is the single shared Week 9 report. The date above records this evidence review, not a future class meeting. Week 10/11 work below is forward planning, not completed Week 9 verification.

## This week's goal

**Week 9 review priority:** Keep the proposed core path at Login → Dashboard → Discover/Search → Event Details, record exactly what the available evidence proves, and retain a documented local/guest fallback. Complete named authentication verification before expanding the demo promise.

**Forward plan retained from the team:**

Prepare CampusVibes for final MVP development by reviewing code ownership, checking AI-assisted development, identifying unfinished features, and organizing existing project evidence. The team will also prepare for Week 11 verification of the main user journey, Firebase authentication, and Firestore event loading.

## What we committed to do

- [ ] Review GitHub commits and identify each team member's code contributions.
- [ ] Review and document AI-assisted code and development activities.
- [x] Identify unfinished features, including Google Sign-In, password reset, and Firestore event loading.
- [x] Organize existing testing evidence and update the Final Demo Roadmap.
- [x] Prepare a checklist for Week 11 MVP verification.
- [x] Review supporting features through regression testing, including Saved Events, Profile, AI Assistant, Suggestions, and Light/Dark Theme.

## Evidence links

If it is not linked, it does not count.

| Evidence | Link |
|---|---|
| Issue(s) | [Issue #53](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/issues/53), [Issue #64](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/issues/64), [Issue #118](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/issues/118), [Issue #116](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/issues/116), [Issue #117](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/issues/117), [Issue #129](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/issues/129) |
| PR(s) / commits | [Google domain repair/readiness PR #135](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/pull/135), [readiness-check commit](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/commit/c104df8df83e72d8d2fc8c8524a740936f7be299), [repository history](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/commits/main) |
| Screenshot / demo | [Issue #118](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/issues/118) |
| Test/check note | Existing independent rehearsal and Events testing records in Issues #53 and #64 |
| Deployed website | [CampusVibes Website](https://campusvibe-theta.vercel.app/) |
| Final Demo Roadmap | [Current shared roadmap](Final-demo-Roadmap.md) |
| Historical report snapshot | [Earlier Week 9 snapshot — historical, not a second current report](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/blob/a5fd38275767242d629f7cd90063f132bae7817f/docs/Week9/Weekly-Report.md) |
| Week 9 work checklist | [Current work checklist](Week9-Work-Checklist.md) |
| Week 9 Action Plan | [Current action plan](Week9-Action-Plan.md) |
| Sprint quality check | [Shared quick-check document](Sprint-quality-quick-check.md) |
| MVP contract | [Current MVP contract](MVP-Contract.md) |
| Supporting Features Regression Testing | [Related Issue #133](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/issues/133) |
| November 2 core review | [Expected/actual check note and screenshots](Evidence/prachi-core-review-2026-11-02/check-note.md), [raw results](Evidence/prachi-core-review-2026-11-02/results.json) |
| Google configuration repair | [Bug #134](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/issues/134), [provider-page readiness receipt](../../frontend/react-app/verification/google-signin-domain/results.json) |
| Wednesday independent-test handoff | [October 31 local result, setup/limits and evidence-type distinctions](Evidence/independent-test-handoff.md) |

## Core evidence matrix — reviewed November 2

**Verification target:** Login → Dashboard → Discover/Search → Event Details. **PASS** applies only to the stated check, environment and date; **FAIL** records an observed failure; **NOT TESTED** means the required end-to-end evidence is absent. The new deployed check uses **guest entry**, not Firebase authentication. Historical, automated and teammate-reported evidence stay separate.

| Check | Status | Actual evidence and limit | Owner / next action |
|---|---|---|---|
| Completed email/password login → Dashboard on the current deployment | NOT TESTED | [October 20 automation](../Week7/Evidence/core-path-2026-10-20/check-note.md) records an earlier real login. The new November 2 check is guest-only; it is not a fresh authentication retest. | prachi2061 supports implementation; a named human tester records the current login method, outcome and reload/session result in #116. |
| Dashboard access after guest entry | PASS | [November 2 check](Evidence/prachi-core-review-2026-11-02/check-note.md), Chrome desktop/mobile viewports, Codex-assisted for prachi2061. No authenticated-user claim. | Use as guest navigation evidence; include Dashboard in the human login-path retest. |
| Discover + Tech filter + HackNight search | PASS | Same fresh check returned exactly one matching sample event on both viewports. | Keep search/filter inside the narrow core path; recheck after any core fix. |
| Selected sample Event Details | PASS | Same check observed venue, time, host and description; [desktop](Evidence/prachi-core-review-2026-11-02/desktop-details.png) / [mobile](Evidence/prachi-core-review-2026-11-02/mobile-details.png). | Explain that event data is code-based sample data. |
| Empty search / Clear filters recovery | PASS | Same check observed zero results and restored all nine sample events; [raw expected/actual results](Evidence/prachi-core-review-2026-11-02/results.json). | Retain this failure/fallback case in core QA. |
| Google button before authorized-domain repair — historical failure | FAIL | [Blocked attempt](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/issues/116#issuecomment-6559100739) and [confirmed missing-domain bug #134](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/issues/134). This configuration blocker was repaired. | Preserve the failure history; do not use a provider-page screenshot as proof of completed login. |
| Google provider page opens; dismissing popup restores the button | PASS | [November 2 repair/check receipt](../../frontend/react-app/verification/google-signin-domain/results.json): two fresh Chrome viewports, no identity or credentials entered. | prachi2061 completed this technical repair/readiness check. |
| Google identity selected → authenticated Dashboard → restored session | NOT TESTED | #116 has no completed Google-account/session receipt; the readiness check remained signed out. | Named tester selects their own identity and records expected/actual results, device/browser and reload behavior. |
| Reset email received → password changed → login with changed password | NOT TESTED | #116's reset-form and dashboard images do not establish these three steps. A member-written completion claim alone does not close this evidence gap. | ujjalpoudel75 records each step and corrects/completes their own row; prachi2061 supports any reproducible fix. |
| Firestore Event loading, permissions and search/details using database events | NOT TESTED | The visible Events path uses [the code-based catalog](../../frontend/events.json). Firebase Auth/account/social use is not Event-loading proof; [#117 remains open](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/issues/117). | prachi2061 and the named tester record actual database success/failure or a specific blocker. |
| Local setup / backup journey | PASS | **Reported teammate result:** [tulseyy8848, October 31](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/issues/118#issuecomment-6539563367). This supports that local-backup run, not deployed authentication or Firestore Events. | tulseyy8848 adds their own exact setup commands and tested journey to their row. |

**MVP status remains a gap to close.** Fresh guest navigation and provider-page readiness do not settle completed authentication or the Firestore Event-data boundary. The [existing roadmap](Final-demo-Roadmap.md) and [MVP contract](MVP-Contract.md) remain the shared planning sources.

## Core promise, extensions and local fallback

Keep the core at Login → Dashboard → Discover/Search → Event Details, with sample data labelled. A completed authenticated demonstration requires the current named-tester receipt still missing above. Supporting checks in #133 remain supporting evidence, with the stated Suggestions upload limitation; they do not certify the core login path or every social/upload behavior.

| Extension | Value / recorded owner | Existing implementation or test reference | Demo boundary |
|---|---|---|---|
| Maps / trip planning | Venue/travel convenience; prachi2061. | [PR #132](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/pull/132); real transit coverage is still open in [#129](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/issues/129). | Outside the frozen core; no real-bus or confirmed sample-address promise. |
| Notifications and social/messages | Activity awareness and member communication; prachi2061. | [Notifications #119](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/issues/119), [messages #87](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/issues/87); not exercised by the new core check. | Outside the core promise; show only with a named flow and matching evidence. |
| RSVP | Participation intent; DevyanaCT is the author of [implementation commit fd667c6](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/commit/fd667c66aa15c47d2e397865f93a0d9676f696af). | This review establishes the commit's author, not a completed RSVP test. Feature ownership/acceptance still needs confirmation. | Outside the core promise until owner and actual expected/actual test are explicit. |

**Local fallback:** Keep [Issue #118's local receipt](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/issues/118#issuecomment-6539563367) and the [current root setup instructions](../../README.md#quick-start) available. From a prepared checkout, the current repeat instructions are `npm ci`, then `npm run dev`; these are instructions, not a claim that this review repeated a clean installation or that the teammate used those exact commands. If live login fails, state that step's result and explicitly switch to guest/sample Dashboard → Discover/Search → Details. A local frontend does not establish working cloud authentication or Firestore Event loading. If the live/local path cannot be shown, label dated screenshots as recorded evidence.

**Before Wednesday, November 4:** prachi2061 keeps this matrix/own row current and supports reproducible auth/data fixes; ujjalpoudel75 supplies the missing step-by-step auth/reset result; DevyanaCT coordinates the named current core check and keeps supporting evidence separate; tulseyy8848 authors their local-setup row with exact steps. Each person confirms their own wording. No new feature work is added by this review.

## Supporting Features Regression Testing

**Responsible member:** DevyanaCT

Existing supporting features were reviewed and tested to check whether they continued working correctly after project updates.

| Feature | Testing result |
|---|---|
| Saved Events | Tested – Successful |
| Profile | Tested – Successful |
| AI Assistant | Tested – Successful, subject to prompt and response verification |
| Suggestions | Text-based suggestion and display – Pending verification |
| Light/Dark Theme | Tested – Successful |

**Known limitation:**

- Photo and file uploads in the Suggestions feature are currently unavailable while billing is disabled.
- Existing sample event images can still be displayed where available.
- Photo and file upload functionality is not claimed as completed.
- Suggestions testing should distinguish between displaying recommendations and submitting new suggestions.

**Result:** Supporting features were reviewed, and remaining limitations were identified for further improvement.

## Individual contribution entries – one row per student

Each student must complete their own entry and add at least one evidence link.

**Before Wednesday:** Each member authors or confirms their own wording here. The [independent-test handoff](Evidence/independent-test-handoff.md) links the existing local result and lists the remaining confirmations; this report does not mark all four student-authored entries complete. The [updated roadmap](Final-demo-Roadmap.md#roadmap-milestones) names proposed milestone owners/checkers and keeps future checks PLANNED.

**Evidence-review note (prachi2061, November 2):** Existing member-authored rows are preserved below. The full password-reset claim in ujjalpoudel75's row is not yet supported by the linked form/dashboard screenshots; its status for the demo remains **NOT TESTED** until email receipt, password change and login with the changed password are recorded step by step. Google provider-page readiness likewise does not establish a completed Google login. Each member owns correcting or completing their own row.

| Student | What they did | Evidence link |
|---|---|---|
| DevyanaCT | Updated project documentation and the Final Demo Roadmap, organized testing evidence, performed regression testing on supporting features, tested the deployed CampusVibes website, and tested the local setup as a backup demo option. | [Final Demo Roadmap](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/blob/main/docs/Week9/Final-demo-Roadmap.md),  [Issue #118](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/issues/118), [Issue #133](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/issues/133)|
| ujjalpoudel75 | Performed independent authentication testing on the deployed CampusVibes website. Successfully verified the complete Password Reset process, including reset email delivery, password change, and login with the new password. Identified that Google Sign-In is blocked due to incomplete configuration. Documented the expected results, actual results, and three screenshot evidence items in Issue #116. Recommended fixing Google Sign-In and retesting before the final demo.  |  [Issue #116 — Authentication Testing](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/issues/116) |
| prachi2061 | Diagnosed and repaired the missing production Firebase authorized domain; added desktop/mobile Google provider-page and cancellation checks with a redacted receipt. Recorded the current guest Dashboard → Discover/search/filter → Event Details and empty-state recovery checks. These are Codex-assisted technical checks, not completed Google authentication or independent teammate testing. Maps/notifications/social additions remain extensions outside the core demo promise. Next: support a named tester's real-account login/session check and keep the Firestore Event boundary explicit. | [PR #135](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/pull/135), [Google readiness receipt](../../frontend/react-app/verification/google-signin-domain/results.json), [dated core review](Evidence/prachi-core-review-2026-11-02/check-note.md) |
| tulseyy8848 | Pending this member's own Week 9 wording: add the setup steps and exact local journey followed. A dated backup-setup receipt is already available; linking it here does not claim a new deployed-site or independent authentication check. | [tulseyy8848's October 31 local-backup receipt](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/issues/118#issuecomment-6539563367) |

## Blockers or risks

| Blocker/risk | Owner | Next action |
|---|---|---|
| Firestore event loading remains unverified. | prachi2061 and ujjalpoudel75 | Verify database loading and record the actual result. |
| Completed Google authentication and the full password-reset flow remain unverified; the domain blocker is repaired. | Authentication developer: prachi2061; Tester: ujjalpoudel75 | Link a real Google-account/session result and reset email → password change → changed-password login evidence in #116. |
| Some supporting features need additional regression testing. | DevyanaCT | Complete remaining tests, document actual results, and report any issues. |
| Photo and file uploads in Suggestions are unavailable while billing is disabled. | DevyanaCT / Team | Keep text-based suggestions as the testing path and document upload limitations. |
| Individual code ownership and AI-use records need review. | All team members | Review commits and document individual contributions. |

## Decision record

| Decision | Why we chose it | Owner | Evidence / Issue link |
|---|---|---|---|
| Keep sample event data as a fallback until Firestore loading is verified. | The team should not claim database functionality without successful testing. | All team members | [Issue #64](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/issues/64) |
| Complete Google Sign-In and password reset before deciding whether to include them in the final MVP. | These authentication options still need successful end-to-end testing. | Authentication developer(prachi2061), Tester(ujjalpoudel75) | [Issue #116](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/issues/116) |
| Prioritize existing features and testing instead of adding unnecessary new features. | The team needs a stable and reliable final demonstration. | All team members | [Final Demo Roadmap](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/blob/main/docs/Week9/Final-demo-Roadmap.md) |
| Keep photo and file uploads as a documented limitation while billing is disabled. | The team should not claim unavailable upload functionality as completed. | All team members | [Supporting Features Regression Testing](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/issues/133)|

## Next week's bridge task

- Verify Firestore event loading and document the actual result.
- Test Google Sign-In and password reset.
- Test the main user journey from login to event details.
- Review bugs and decide which features are ready for the MVP.
- Review code ownership and AI-assisted development records.
- Make the Week 11 feature-freeze decision based on actual testing evidence.
