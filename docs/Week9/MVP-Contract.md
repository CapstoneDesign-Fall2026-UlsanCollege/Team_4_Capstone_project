
# MVP Contract

**Team:** 4  
**Project:** CampusVibes  
**Week:** 9  
**Evidence Update:** November 4, 2026

After the midterm, our job is not to make the project bigger. Our job is to make it real.

Our priority is to complete and verify the core CampusVibes features, document actual testing results, and prepare a stable final demonstration.

## What we are definitely finishing

- Complete and verify the main campus event discovery journey, from login to viewing event details.
- Complete Google Sign-In configuration and independently verify successful authentication and session restoration.
- Preserve the completed Password Reset test. On November 1, 2026, ujjalpoudel75 independently tested the complete password reset process, including receiving the reset email, changing the password, and successfully logging in using the updated password. The results are documented in [Issue #116](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/issues/116).
- Verify Firestore Event loading and ensure the application handles event data correctly.
- Maintain the tested guest/sample-data journey as a backup demonstration path.

## What we are cutting or postponing

- Ticket purchasing and payment functionality.
- External push notifications.
- Advanced AI personalization beyond recommendations based on the available sample event data.

## Final demo proof

Our final demo aims to prove:

> A university student can log in to CampusVibes, access the dashboard, discover campus events using search and filters, select an event, and view its basic details. The team will demonstrate features supported by actual testing evidence and provide GitHub documentation to support the final project.

The guest/sample-data Dashboard → Discover/Search → Event Details journey has already been tested successfully.

Password Reset was independently tested end to end by ujjalpoudel75 on November 1, 2026.

The complete authenticated discovery journey, Google Sign-In, and Firestore Event loading still require separate verification.

If any authentication feature is unavailable during the final demonstration, the team will clearly explain the limitation and use the tested guest/sample-data journey as a fallback.

## What must be true by Week 11

- [x] The guest/sample-data journey from Dashboard to Discover/Search and Event Details has been successfully tested.
- [x] Password Reset was independently tested by ujjalpoudel75 on November 1, 2026, including reset email receipt, password change, and successful login using the changed password.
- [x] Password Reset testing steps, expected results, actual results, and supporting screenshots were documented in Issue #116.
- [x] The original Google Sign-In configuration issue was identified and documented.
- [x] Complete regression testing of the selected MVP features.
- [x] Finalize the Week 11 MVP verification and feature-freeze decision.

**Authentication Evidence:** [Issue #116 — Authentication Testing](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/issues/116)

**Firestore Evidence:** [Issue #117 — Firestore Event Loading](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/issues/117)

## Top three risks

| Risk | Why it matters | Owner | Plan |
|---|---|---|---|
| Google Sign-In remains unverified end to end. Password Reset passed independent testing, but some steps have limited screenshot evidence. | Students may not be able to use all planned authentication options, and incomplete verification could affect the final demonstration. | prachi2061 (Implementation), ujjalpoudel75 (Independent Testing) | Retest Google Sign-In, verify successful dashboard access and session restoration, and maintain Password Reset evidence in Issue #116. |
| Firestore Event loading is unverified. | The application may not load real database events as expected. | Firebase/database developer (confirm with team), ujjalpoudel75 (Proposed Independent Checker) | Test Firestore loading, check permissions and data structure, and document actual results in Issue #117. |
| The main authenticated demo flow or supporting features may contain bugs. | Problems during the final presentation could interrupt the demonstration. | All team members | Perform regression testing, fix critical bugs, maintain the guest/sample-data fallback, and complete a timed rehearsal. |

## Ownership

| Part | Owner | Issue link |
|---|---|---|
| Authentication implementation: Google Sign-In and Password Reset | prachi2061 (Implementation), ujjalpoudel75 (Independent Testing and Verification) | [Issue #116](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/issues/116) |
| Main event discovery and event details testing | DevyanaCT (Proposed) | [Issue #64](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/issues/64) |
| Independent deployed website testing | prachi2061 (Author), tulseyy8848 (Independent Tester), DevyanaCT (Retester) | [Issue #53](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/issues/53) |
| Firestore Event loading verification | Firebase/database developer (Confirm with team), ujjalpoudel75 (Proposed Independent Checker) | [Issue #117](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/issues/117) |
| Local demo setup testing | DevyanaCT (Owner), tulseyy8848 (Tester) | [Issue #118](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/issues/118) |

## Authentication Verification Update

**Tester:** ujjalpoudel75  
**Test Date:** November 1, 2026  
**Evidence Updated:** November 4, 2026  
**Environment:** Deployed CampusVibes website, Google Chrome

### Password Reset — PASS

The following steps were completed during independent testing:

1. Opened the CampusVibes login page.
2. Selected Forgot Password.
3. Entered the registered email address and requested a reset link.
4. Checked the email inbox and confirmed receipt of the password reset email.
5. Opened the reset link.
6. Successfully changed the account password.
7. Returned to the CampusVibes login page.
8. Logged in using the updated password.
9. Successfully accessed the student dashboard.

**Actual Result:** Password Reset worked successfully during the November 1 test.

**Evidence:** [Issue #116 — Authentication Testing Report](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/issues/116)

**Evidence Limitation:** The test report contains supporting screenshots, but the original password reset form and dashboard screenshots do not independently prove email receipt or password modification. These steps are documented through the tester's direct observations. Additional privacy-safe screenshots should be retained if available.

### Google Sign-In — Retesting Required

During the original independent test, the Google Sign-In button displayed the following message:

> Google sign-in isn't configured for this website yet. Please use email and password.

The original attempt was blocked.

The team subsequently recorded a Google authorized-domain configuration repair. However, successful Google authentication, dashboard access, and session restoration have not yet been independently verified end to end.

**Current Result:** NOT VERIFIED END TO END

**Required Action:** Complete an independent Google Sign-In test after the configuration repair and record the actual results in Issue #116.

## MVP completion rule

A feature will be considered complete only when:

1. It has been implemented.
2. It has been tested successfully.
3. The tester, test date, and testing environment are identified.
4. Actual testing steps and results have been recorded.
5. Supporting evidence is available in the GitHub repository or linked issue.
6. Any remaining limitations are clearly documented.

A successful guest-mode test does not prove authenticated login. A configuration repair does not prove that Google Sign-In works successfully.

The team will prioritize a stable, testable application over adding new features.

## Final Decision

CampusVibes will focus on delivering a reliable campus event discovery experience for the final demonstration.

**Current MVP Decision:** The team will prioritize the core CampusVibes event discovery journey and maintain the verified guest/sample-data fallback. Password Reset has been independently tested, while Google Sign-In and Firestore Event loading require further verification.

**Feature-Freeze Status:** PENDING — The final Week 11 feature-freeze decision will be recorded after reviewing the remaining testing evidence, critical issues, and MVP readiness.

Password Reset has been independently tested and documented. Google Sign-In and Firestore Event loading remain important verification tasks.

The team will continue improving the core journey, fixing critical problems, completing independent testing, and preserving clear evidence of individual contributions.

**Final Goal:** Deliver a stable CampusVibes MVP with working features, accurate testing reports, clear documentation, and a reliable demonstration.
