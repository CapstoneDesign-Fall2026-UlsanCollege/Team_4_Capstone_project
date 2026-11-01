# Weekly Report

**Team:** 4  
**Project:** CampusVibes  
**Week:** 10  
**Date:** 2026/11/05

## This week's goal

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
| PR(s) / commits | [GitHub Commits](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/commits/main) |
| Screenshot / demo | [Issue #118](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/issues/118) |
| Test/check note | Existing independent rehearsal and Events testing records in Issues #53 and #64 |
| Deployed website | [CampusVibes Website](https://campusvibe-theta.vercel.app/) |
| Final Demo Roadmap | [Final Demo Roadmap](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/blob/a5fd38275767242d629f7cd90063f132bae7817f/docs/Week9/Final-demo-Roadmap.md) |
| Previous Weekly Report | [Week 9 Weekly Report](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/blob/a5fd38275767242d629f7cd90063f132bae7817f/docs/Week9/Weekly-Report.md) |
| Week 9 work checklist | [Week 9 Work Checklist](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/blob/a5fd38275767242d629f7cd90063f132bae7817f/docs/Week9/Week9-Work-Checklist.md) |
| Week 9 Action Plan | [Week 9 Action Plan](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/blob/a5fd38275767242d629f7cd90063f132bae7817f/docs/Week9/Week9-Action-Plan.md) |
| Sprint quality check | [Sprint Quality Quick Check](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/blob/a5fd38275767242d629f7cd90063f132bae7817f/docs/Week9/Sprint-quality-quick-check.md) |
| MVP contract | [MVP Contract](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/blob/a5fd38275767242d629f7cd90063f132bae7817f/docs/Week9/MVP-Contract.md) |
| Supporting Features Regression Testing | [Related Issue #133](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/issues/133)

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

| Student | What they did | Evidence link |
|---|---|---|
| DevyanaCT | Updated project documentation and the Final Demo Roadmap, organized testing evidence, performed regression testing on supporting features, tested the deployed CampusVibes website, and tested the local setup as a backup demo option. | [Final Demo Roadmap](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/blob/main/docs/Week9/Final-demo-Roadmap.md),  [Issue #118](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/issues/118), [Issue #133](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/issues/133)|
| ujjalpoudel75 | Performed independent authentication testing on the deployed CampusVibes website. Successfully verified the complete Password Reset process, including reset email delivery, password change, and login with the new password. Identified that Google Sign-In is blocked due to incomplete configuration. Documented the expected results, actual results, and three screenshot evidence items in Issue #116. Recommended fixing Google Sign-In and retesting before the final demo.  |  [Issue #116 — Authentication Testing](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/issues/116) |
|  |  |  |
|  |  |  |

## Blockers or risks

| Blocker/risk | Owner | Next action |
|---|---|---|
| Firestore event loading remains unverified. | Prachi2061 and Ujjalpoudel75 | Verify database loading and record the actual result. |
| Google Sign-In and password reset are not yet completed and tested. | Authentication developer: Prachi2061; Tester: Ujjalpoudel75 | Complete configuration and perform end-to-end testing. |
| Some supporting features need additional regression testing. | DevyanaCT | Complete remaining tests, document actual results, and report any issues. |
| Photo and file uploads in Suggestions are unavailable while billing is disabled. | DevyanaCT / Team | Keep text-based suggestions as the testing path and document upload limitations. |
| Individual code ownership and AI-use records need review. | All team members | Review commits and document individual contributions. |

## Decision record

| Decision | Why we chose it | Owner | Evidence / Issue link |
|---|---|---|---|
| Keep sample event data as a fallback until Firestore loading is verified. | The team should not claim database functionality without successful testing. | All team members | [Issue #64](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/issues/64) |
| Complete Google Sign-In and password reset before deciding whether to include them in the final MVP. | These authentication options still need successful end-to-end testing. | Authentication developer(prachi2061), Tester(Ujjalpoudel75) | [Issue #116](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/issues/116) |
| Prioritize existing features and testing instead of adding unnecessary new features. | The team needs a stable and reliable final demonstration. | All team members | [Final Demo Roadmap](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/blob/main/docs/Week9/Final-demo-Roadmap.md) |
| Keep photo and file uploads as a documented limitation while billing is disabled. | The team should not claim unavailable upload functionality as completed. | All team members | [Supporting Features Regression Testing](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/issues/133)|

## Next week's bridge task

- Verify Firestore event loading and document the actual result.
- Test Google Sign-In and password reset.
- Test the main user journey from login to event details.
- Review bugs and decide which features are ready for the MVP.
- Review code ownership and AI-assisted development records.
- Make the Week 11 feature-freeze decision based on actual testing evidence.
