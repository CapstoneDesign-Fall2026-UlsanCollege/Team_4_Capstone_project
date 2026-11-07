# Week 10 — QA and Core Integration Testing Evidence

**Project:** CampusVibes — Team 4  
**Student:** Ujjal Poudel  
**GitHub Username:** `ujjalpoudel75`  
**Course:** Capstone Design  
**Week:** 10 — Code Ownership and Responsible AI Audit  
**Testing Dates:** November 6–7, 2026  
**Sprint:** Sprint 2 — MVP and Freeze  
**Status:** Selected testing completed; final ownership review in progress

---

## 1. Testing Objective

My Week 10 responsibility was to verify the main CampusVibes student journey and check whether the important features were functioning correctly.

I focused on login, dashboard navigation, event search, event details, empty-search handling, session persistence, and Google Sign-In popup recovery.

I also performed automated regression testing using Playwright to verify existing functionality and document any failures.

## 2. Testing Environment

| Item | Details |
|---|---|
| Tester | `ujjalpoudel75` |
| Operating System | Windows |
| Browser | Google Chrome |
| Testing Framework | Playwright |
| Website | https://campusvibe-theta.vercel.app/ |
| Repository Commit | `5855d3` |
| Automated Testing Date | November 6, 2026 |
| Google Sign-In Review | November 7, 2026 |

## 3. Automated Testing Results

I executed the existing Playwright smoke tests on my local CampusVibes project.

| Test | Actual Result | Status | Evidence |
|---|---|---|---|
| Initial Playwright run | 79 passed, 1 failed | FAIL | [Screenshot 1](W10-01-playwright-result.png) |
| Failed test retry | 1 passed, 0 failed | PASS | [Screenshot 2](W10-02-retest-result.png) |
| Complete Playwright rerun | 80 passed, 0 failed | PASS | [Screenshot 9](W10-09-full-retest.png) |

### Initial Failure and Investigation

During the first automated run, one test in `tests/smoke/assistant.spec.js` failed because `page.goto` exceeded the 30-second timeout while loading the local application.

I reran the failed test independently using:

`npx playwright test tests/smoke/assistant.spec.js --project=desktop --grep "local assistant searches"`

The test passed during the retry.

I then executed the complete Playwright test suite again using:

`npx playwright test`

**Final full-suite result: 80 passed, 0 failed.**

The original timeout was not reproduced. Its exact cause remains unconfirmed, and no code modification or bug fix is claimed.

## 4. Manual Testing Results

I manually tested the deployed CampusVibes website using my student account.

| Test Case | Actual Result | Status | Evidence |
|---|---|---|---|
| Login and Dashboard | Successfully logged in and accessed the personalized Dashboard | PASS | [Screenshot 3](W10-03-dashboard.png) |
| Event Search | Searching `HackNight` returned the matching event | PASS | [Screenshot 4](W10-04-search.png) |
| Event Details | HackNight details displayed title, date, time, location, and description | PASS | [Screenshot 5](W10-05-details.png) |
| Empty Search | Invalid keyword displayed an appropriate no-results message | PASS | [Screenshot 6](W10-06-empty-search.png) |
| Session Refresh | Dashboard remained signed in after browser refresh | PASS | [Screenshot 8](W10-08-after-refresh.png) |
| Category Filtering | Selected Tech category; 2 of 9 events displayed, both labeled Tech | PASS | [Screenshot 12](W10-12-category-filter.png) |

### Testing Observations

**Login and Dashboard:** I successfully signed in and accessed the Dashboard. The personalized greeting, account navigation, and event information were visible.

**Event Search:** I searched for `HackNight`, and the application returned "HackNight: Build-a-Thon" from the sample event catalog.

**Event Details:** I opened the selected event and verified its displayed information. The location was listed as "Innovation Lab, Bldg 7", but a complete street address was not confirmed.

**Empty Search:** I searched for `NoSuchCampusEvent98765`. CampusVibes displayed "Showing 0 of 9 events" and the message "No events found. Try another search or category."

**Session Refresh:** I refreshed the Dashboard using `Ctrl + R`. My signed-in session was restored automatically without entering my credentials again.

**Manual Testing Summary: 5 PASS, 0 FAIL.**

## 5. Google Sign-In Independent Review

**Reviewer:** `ujjalpoudel75`  
**Related Issue:** #139  
**Date:** November 7, 2026

### Testing Procedure

1. Opened CampusVibes while signed out.
2. Clicked Continue with Google.
3. Verified that the Google account-selection popup opened.
4. Closed the popup without selecting an account.
5. Checked the application's response.
6. Clicked Continue with Google again.
7. Verified that the account-selection popup reopened.

### Expected Result

The application should recover when the Google popup is cancelled, keep the user signed out, and allow another login attempt.

### Actual Result

After closing the popup, CampusVibes displayed:

"Google sign-in was closed. Please try again when you're ready."

The login form returned to its normal appearance. I clicked Continue with Google again, and the Google account-selection popup reopened.

| Verification | Status | Evidence |
|---|---|---|
| Popup cancellation and login form recovery | PASS | [Screenshot 10](W10-10-google-popup-recovery.png) |
| Google popup successfully reopened | PASS | [Screenshot 11](W10-11-google-popup.png) |
| Complete Google-account authentication | NOT TESTED | — |

**Limitation:** This independent review confirms popup cancellation and retry behavior, not successful Google-account authentication or session creation.

## 6. Code Ownership and Responsibility

**Primary Area:** QA and Core Integration  
**Roadmap Slice:** Authenticated Core Journey and Regression Testing  
**Proposed Backup:** `DevyanaCT` — team confirmation pending

### Relevant Code Areas

- `frontend/apps.js` — Authentication and navigation handlers
- `frontend/react-app/src/App.jsx` — React application and authentication integration
- `frontend/react-app/tests/` — Automated tests
- `frontend/react-app/tests/smoke/` — Playwright smoke tests

### Code Understanding

The main CampusVibes journey depends on authentication, navigation, event discovery, and session restoration.

The existing ownership audit identifies `handleGoogleLogin`, `showAuthError`, `setAuthBusy`, and `startSession` as important functions for Google Sign-In behavior.

My manual tests verified the visible application behavior, while Playwright verified the existing automated checks.

**Source-level explanation:** A detailed code walkthrough and teammate confirmation remain to be completed as part of the ownership audit.

## 7. Responsible AI Use Declaration

I used ChatGPT to understand the Week 10 testing requirements, interpret Playwright test results, organize testing steps, and prepare this report.

I personally executed the automated and manual tests, observed the application behavior, and collected screenshots.

AI assistance was used for explanations and documentation. The reported PASS and FAIL results are based on actual testing evidence, not AI-generated test outcomes.

I remain responsible for reviewing the report and explaining my testing work.

## 8. Limitations and Remaining Work

- The original Playwright timeout's root cause remains unconfirmed.
- Complete Google-account authentication was not tested.
- The Discover page uses sample event data; Firestore Event loading was not verified.
- My selected manual checks passed, but other application features still require separate verification.
- Final code ownership confirmation and source-level explain-back are pending.

## 9. Final Summary

During Week 10, I performed manual and automated testing of the CampusVibes application.

The initial Playwright run resulted in 79 passed tests and one timeout failure. After investigating, I reran the failed test successfully and then completed a full rerun with all 80 tests passing.

I also completed five manual checks covering login, dashboard access, event search, event details, empty-search handling, and session persistence.

Additionally, I independently verified Google Sign-In popup cancellation and retry behavior.

The results provide supporting evidence for the stability of the tested CampusVibes features. Remaining limitations are documented for further review.

**Overall Status:** Selected Week 10 testing checks completed successfully.

**Prepared by:** Ujjal Poudel (`ujjalpoudel75`)  
**Team:** 4 — CampusVibes  
**Related Issues:** #116, #138, #139
