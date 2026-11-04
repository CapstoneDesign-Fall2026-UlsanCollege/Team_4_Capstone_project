# Weekly Report

**Team:** 4  
**Project:** CampusVibes  
**Week:** 9  
**Evidence review / update date:** 2026/11/02 (Asia/Seoul)

This is the single shared Week 9 report. The date above records the evidence review, not a future class meeting. Week 10 and Week 11 activities below are forward plans, not completed Week 9 verification.

---

## This week's goal

**Week 9 review priority:**

Keep the proposed core path at Login → Dashboard → Discover/Search → Event Details, record exactly what the available evidence proves, and retain a documented local/guest fallback. Complete named authentication verification before expanding the demo promise.

**Forward plan retained from the team:**

Prepare CampusVibes for final MVP development by reviewing code ownership, checking AI-assisted development, identifying unfinished features, and organizing existing project evidence. The team will also prepare for Week 11 verification of the main user journey, Firebase authentication, and Firestore Event loading.

---

## What we committed to do

- [x] Review GitHub commits and identify each team member's code contributions.
- [ ] Review and document AI-assisted code and development activities.
- [x] Identify unfinished features, including Google Sign-In, password reset, and Firestore Event loading.
- [x] Organize existing testing evidence and update the Final Demo Roadmap.
- [x] Prepare a checklist for Week 11 MVP verification.
- [x] Review supporting features through regression testing, including Saved Events, Profile, AI Assistant, Suggestions, and Light/Dark Theme.

---

## Evidence links

If it is not linked, it does not count.

| Evidence | Link |
|---|---|
| Issues | [#53](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/issues/53), [#64](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/issues/64), [#118](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/issues/118), [#116](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/issues/116), [#117](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/issues/117), [#129](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/issues/129), [#133](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/issues/133), [#134](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/issues/134) |
| Pull requests / commits | [Google domain repair PR #135](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/pull/135), [Readiness-check commit](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/commit/c104df8df83e72d8d2fc8c8524a740936f7be299), [Repository history](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/commits/main) |
| Screenshot / demo | [Issue #118](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/issues/118) |
| Deployed website | [CampusVibes Website](https://campusvibe-theta.vercel.app/) |
| Final Demo Roadmap | [Current shared roadmap](Final-demo-Roadmap.md) |
| Historical report snapshot | [Earlier Week 9 snapshot](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/blob/a5fd38275767242d629f7cd90063f132bae7817f/docs/Week9/Weekly-Report.md) |
| Week 9 work checklist | [Week 9 Work Checklist](Week9-Work-Checklist.md) |
| Week 9 Action Plan | [Week 9 Action Plan](Week9-Action-Plan.md) |
| Sprint quality check | [Sprint quality check](Sprint-quality-quick-check.md) |
| MVP contract | [MVP Contract](MVP-Contract.md) |
| Supporting-feature regression testing | [Issue #133](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/issues/133) |
| November 2 core review | [Check note](Evidence/prachi-core-review-2026-11-02/check-note.md), [Raw results](Evidence/prachi-core-review-2026-11-02/results.json) |
| Google configuration repair | [Bug #134](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/issues/134), [Provider-page readiness receipt](../../frontend/react-app/verification/google-signin-domain/results.json) |
| Independent-test handoff | [October 31 local result and evidence limitations](Evidence/independent-test-handoff.md) |
| Core domo evidence matrix  | [Core domo evidence matrix](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/blob/777d896fa868274f51eaabd4d7c69f5d67938a4c/docs/Week9/Core-Demo-Evidence-Matrix.md)|
| Readme | [Reading Readme](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project#)|
| Team Agreement | [Team Agreement](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/blob/cd89ecb44f3de481aa80c18240cb554a5427e937/docs/Week1/team_agrement.md) |
| Independent Authenticated MVP Journey Testing | [Independent Authenticated MVP Journey Testing](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/issues/138)|


---

## Core evidence matrix – reviewed November 2

**Verification target:** Login → Dashboard → Discover/Search → Event Details.

PASS applies only to the stated test, environment, and date. FAIL records an observed failure. NOT TESTED means the required end-to-end evidence is missing.

| Check | Status | Actual evidence and limitation | Owner / next action |
|---|---|---|---|
| Completed email/password login → Dashboard on current deployment | NOT TESTED | October 20 automation recorded an earlier real login. November 2 testing was guest-only. | prachi2061 supports implementation; a named tester records current login and session/reload results in #116. |
| Dashboard access after guest entry | PASS | November 2 automated check using two Chrome viewports. This is not authenticated-user evidence. | Retain as guest-navigation evidence. |
| Discover + Tech filter + HackNight search | PASS | Fresh check returned exactly one matching sample event on both viewports. | Retest after core changes. |
| Selected sample Event Details | PASS | Venue, time, host, and description displayed. [Desktop screenshot](Evidence/prachi-core-review-2026-11-02/desktop-details.png) / [Mobile screenshot](Evidence/prachi-core-review-2026-11-02/mobile-details.png). | Clearly identify Events as sample data. |
| Empty search / Clear filters recovery | PASS | Zero results displayed and all nine sample events were restored after clearing filters. | Keep this recovery case in regression testing. |
| Google button before domain repair | FAIL – historical | Missing authorized-domain configuration blocked the attempt. The configuration issue was subsequently repaired. | Preserve historical failure evidence. |
| Google provider page opens; popup cancellation restores button | PASS | November 2 readiness receipt; no identity or credentials entered. | Do not claim completed Google authentication. |
| Google identity → authenticated Dashboard → restored session | NOT TESTED | No completed Google-account/session receipt. | Named tester completes the login and reload test. |
| Reset email → password change → login with changed password | NOT TESTED | Existing form/dashboard screenshots do not establish all three steps. | Record each step separately in #116. |
| Firestore Event loading and permissions | NOT TESTED | Visible Events use the code-based sample catalog in `frontend/events.json`. | Verify actual database loading in #117. |
| Local setup / backup journey | PASS – reported teammate result | October 31 local result provided by tulseyy8848. This is not a fresh clean-checkout or deployed-authentication test. | Retain the dated receipt and document exact setup steps. |


### November 4 — Authentication Verification Update

**Tester:** ujjalpoudel75

**Test Date:** November 1, 2026

**Documentation Updated:** November 4, 2026

**Password Reset — PASS**

Independent testing confirmed the following steps:

1. Requested a password reset email.
2. Received the reset email in the registered inbox.
3. Opened the reset link.
4. Successfully changed the password.
5. Returned to the CampusVibes login page.
6. Logged in using the changed password.
7. Successfully accessed the student dashboard.

These results were recorded step by step in Issue #116. Screenshots support the form and dashboard results, while email receipt and password change are documented through the tester's observations.

**Google Sign-In — Retesting Required**

The initial Google Sign-In test was blocked by a configuration error. A subsequent domain configuration repair was recorded, but successful end-to-end Google authentication has not yet been verified.

**Evidence:** [Issue #116 — Authentication Testing](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/issues/116)

**Next Action:** Retest Google Sign-In and document successful authentication and session restoration.

### November 4 — Independent MVP Journey Testing Follow-up

**Tester:** ujjalpoudel75

**Environment:** Deployed CampusVibes website, Google Chrome

**Testing Scope:**
- Email/password login
- Authenticated Dashboard access
- Discover/Events navigation
- Event search and category filters
- Event Details
- Session restoration after refresh

**Testing Activity:** Independent MVP journey testing was performed, and a separate GitHub issue was created to document the results.

**Verification Status:** Final PASS/FAIL status to be recorded against the individual test steps and screenshot evidence in Issue #138.

**Evidence:** [Issue #138 — Independent Authenticated MVP Journey Testing](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/issues/138)

**Next Action:** Complete the test result table, attach screenshots, and update the Sprint 2 MVP checklist based on the verified outcomes.


**MVP status: Gap to close.**

Guest navigation and Google provider-page readiness do not establish completed authentication or Firestore Event loading.

See the [Final Demo Roadmap](Final-demo-Roadmap.md) and [MVP Contract](MVP-Contract.md) for the current shared planning decisions.

---

## Core promise, extensions and local fallback

The core demonstration remains:

**Login → Dashboard → Discover/Search → Event Details**

The guest/sample-data path is currently supported by November 2 automated evidence. A completed authenticated demonstration still requires a named tester's current login and session receipt.

Supporting features remain outside the core promise unless separately selected and verified.

| Extension | Value / owner | Reference | Demo boundary |
|---|---|---|---|
| Maps / trip planning | Venue and travel convenience; prachi2061 | [PR #132](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/pull/132), [Issue #129](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/issues/129) | Outside frozen core. Real transit coverage remains unverified. |
| Notifications and social/messages | Activity awareness and member communication; prachi2061 | [#119](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/issues/119), [#87](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/issues/87) | Outside core until separately tested. |
| RSVP | Participation intent; implementation commit by DevyanaCT | [Commit fd667c6](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/commit/fd667c66aa15c47d2e397865f93a0d9676f696af) | Commit establishes implementation history, not a successful RSVP test. |

**Local fallback:**

Keep the [Issue #118 local receipt](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/issues/118#issuecomment-6539563367) and [root setup instructions](../../README.md#quick-start) available.

From a prepared checkout:

```bash
npm ci
npm run dev
```

These are repeat instructions, not evidence of a new clean installation.

If live login fails, clearly state the result and switch to the guest/sample-data Dashboard → Discover/Search → Details path. Local frontend access does not establish cloud authentication or Firestore Event loading.

---

## Supporting Features Regression Testing

**Responsible member:** DevyanaCT

Supporting features were reviewed to check whether existing functionality continued working after project updates.

| Feature | Testing result | Notes |
|---|---|---|
| Saved Events | Tested – Successful | Supporting-feature check recorded in #133. |
| Profile | Tested – Successful | Supporting-feature check recorded in #133. |
| AI Assistant | Tested – Successful, subject to prompt/response verification | Keep claims within the tested prompt and response scope. |
| Suggestions | Partial – Pending verification | Text/display behavior and new submission must be checked separately. |
| Light/Dark Theme | Tested – Successful | Theme switching checked as supporting functionality. |

### Known limitations

- Photo and file uploads in Suggestions are unavailable while billing is disabled.
- Existing sample Event images can still be displayed where available.
- Upload functionality is not claimed as completed.
- Suggestions display and submitting new suggestions are separate behaviors.

**Result:** Supporting features were reviewed, successful checks were recorded, and remaining limitations were identified.

**Evidence:** [Issue #133 – Supporting Features Regression Testing](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/issues/133)

---

## Individual contribution entries – one row per student

Each student must provide or confirm their own contribution wording and evidence.

| Student | What they did | Evidence link |
|---|---|---|
| DevyanaCT | Updated project documentation and the Final Demo Roadmap, organized testing evidence, reviewed regression testing results, and tested supporting features including Saved Events, Profile, AI Assistant, and Light/Dark Theme. Documented the Suggestions upload limitation and organized final demo evidence. | [Final Demo Roadmap](Final-demo-Roadmap.md), [Issue #133](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/issues/133) |
| ujjalpoudel75 | Independently tested the CampusVibes authentication functionality on the deployed website. Successfully completed Password Reset testing on November 1, 2026, including receiving the reset email, changing the password, and logging in with the updated password. Identified the earlier Google Sign-In configuration error and documented the results with screenshots in Issue #116. Also performed independent testing of the authenticated MVP user journey and created Issue #138 to record Login → Dashboard → Discover/Search → Event Details testing, including session-refresh verification. Final results and screenshot evidence for the MVP journey must be confirmed in Issue #138 before declaring the full journey PASS. | [Issue #116 — Authentication Testing](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/issues/116), [Issue #138 — Independent MVP Journey Testing](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/issues/138) |
| prachi2061 | Diagnosed and repaired the missing production Firebase authorized domain. Added desktop/mobile Google provider-page and cancellation checks. Recorded the automated guest Dashboard → Discover/search/filter → Event Details and empty-search recovery checks. These checks do not establish completed Google authentication or independent teammate testing. | [PR #135](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/pull/135), [November 2 core review](Evidence/prachi-core-review-2026-11-02/check-note.md) |
| tulseyy8848 | Independently completed the local backup setup test on October 31, 2026, following Issue #118 instructions. Opened the CampusVibes repository in VS Code, used the terminal to install dependencies with `npm install` (if needed), started the development server using `npm run dev`, and accessed the local application through the Vite URL. Tested the local backup demo, including the Landing Page, Login, Dashboard, Discover / Events, Search and Filters, and Event Details. Confirmed that the local application started and opened successfully, and collected screenshots as evidence. No errors were encountered during the recorded test. Firebase authentication and Firestore event loading were not independently verified. Also test by deployed website | [Issue #118 comment](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/issues/118#issuecomment-6539563367) [Issue #188 comment](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/issues/118#issuecomment-6596380992)|

**Contribution note:** Existing member-authored entries should be preserved where accurate. Each student is responsible for confirming their own wording. The coordinator should not claim another student's work as their own.

---

## Blockers or risks

| Blocker / risk | Owner | Next action |
|---|---|---|
| Firestore Event loading remains unverified. | prachi2061 and ujjalpoudel75 | Verify database loading and record the actual result. |
| Password Reset was tested end to end by ujjalpoudel75 and documented in Issue #116. Step-by-step observations and supporting screenshots are available; separate screenshots of email delivery and password-change confirmation should be retained if available. Google Sign-In still requires successful end-to-end retesting after the configuration repair. | prachi2061 and ujjalpoudel75 | Retest Google Sign-In, verify successful dashboard access and session restoration, and update [Issue #116](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/issues/116) with the results. |
| Photo and file uploads in Suggestions are unavailable while billing is disabled. | DevyanaCT | Keep the limitation documented. |
| Individual code ownership and AI-use records need review. | All team members | Review commits and document individual contributions. |

---

## Decision record

| Decision | Reason | Owner | Evidence |
|---|---|---|---|
| Keep sample Event data as a fallback until Firestore loading is verified. | Database functionality must not be claimed without successful testing. | All members | [Issue #117](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/issues/117) |
| Complete Google Sign-In and password reset before deciding whether to include them in the final MVP. | Both flows require successful end-to-end evidence. | prachi2061 and ujjalpoudel75 | [Issue #116](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/issues/116) |
| Prioritize existing features and testing and seperating  new features as supporting features. | The team needs a stable and reliable final demonstration. | All members | [Final Demo Roadmap](Final-demo-Roadmap.md) |
| Keep photo and file uploads as documented limitations while billing is disabled. | Unavailable functionality must not be claimed as completed. | All members | [Issue #133](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/issues/133) |

---

## Next week's bridge task

- Verify Firestore Event loading and document the actual result.
- Test Google Sign-In and password reset.
- Test the main user journey from login to Event details.
- Review bugs and decide which features are ready for the MVP.
- Review code ownership and AI-assisted development records.
- Confirm each student's individual contribution and evidence.
- Make the Week 11 feature-freeze decision based on actual testing evidence.

---

## Final Week 9 Review

Week 9 focused on reviewing the current project state, organizing evidence, updating the Final Demo Roadmap, and checking supporting features through regression testing.

The team has evidence of the guest/sample-data navigation path and selected supporting-feature checks. However, completed authentication and Firestore Event loading still require verification.

The next priority is to close these evidence gaps, maintain accurate individual contribution records, and prepare a stable final MVP demonstration.

**Important:** A completed documentation task or planned milestone does not automatically mean the corresponding feature has passed testing. All final claims must match the available evidence.
