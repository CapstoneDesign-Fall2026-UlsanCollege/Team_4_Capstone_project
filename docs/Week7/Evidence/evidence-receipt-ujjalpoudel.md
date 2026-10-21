
# Individual Evidence Receipt — Ujjal Poudel

**Student:** Ujjal Poudel  
**GitHub Username:** ujjalpoudel75  
**Team:** Team 4 – CampusVibes  
**Week:** 7 (October 15–21, 2026)  
**Role:** Student-Flow Testing, Search Verification, and Midterm Evidence Support  
**Project:** CampusVibes

## 1. Introduction

This receipt documents my individual contributions to the CampusVibes project, focusing on functional testing, event discovery verification, and preparation of supporting evidence for the midterm demonstration.

My main responsibility was to check the application from a student's perspective, record expected and actual test results, and confirm whether the current event discovery features behaved correctly.

## 2. Evidence Receipt 1: Empty Search / No-Events Testing

**Issue:** #70 – Test Empty Search / No-Events State  
**Status:** Completed  
**Assigned to:** ujjalpoudel75

### What I Did

I tested how the CampusVibes website behaves when a user searches for an event that does not exist in the available sample event data.

I checked whether the website displayed an appropriate message instead of returning an error or incorrect event information.

### Test Steps

1. Opened the CampusVibes website.
2. Navigated to the Discover / Events page.
3. Entered a search keyword that did not match any sample events.
4. Observed the search results.
5. Recorded the expected and actual behavior.

### Expected Result

The application should clearly indicate that no matching events were found.

### Actual Result

**PASS**

The search was completed successfully without errors.

When a keyword without a matching event was searched, the application displayed an appropriate no-results indication.

The expected and actual results were recorded in Issue #70, along with the screenshot evidence checklist.

### What I Learned

I learned that testing unsuccessful searches is important because users may search for events that are not available.

Displaying clear feedback improves usability and helps students understand the search results.

### Evidence Link

Issue #70 – Empty Search / No-Events Test:

https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/issues/70

## 3. Evidence Receipt 2: Events → Event Details Testing

**Issue:** #49 – Test Event Details Behavior  
**My Test Date:** October 8, 2026  
**Result:** Passed

### What I Did

I participated in testing the existing Events → Event Details functionality.

I opened the Events section, selected a sample event, and checked whether the application displayed its basic information correctly.

This was an earlier contribution that supports the Week 7 midterm preparation, not a new Week 7 retest.

### Test Steps

1. Opened the CampusVibes application.
2. Navigated to the Events section.
3. Selected an available sample event.
4. Checked the event details displayed.

### Expected Result

The application should display the basic details of the selected event correctly.

### Actual Result

**PASS**

The selected event's basic details were displayed as expected.

I personally recorded my successful test result in the comment section of Issue #49 on October 8.

### What I Learned

I gained experience testing the connection between event browsing and event details.

I also learned the importance of recording test results so that other teammates can verify the functionality.

### Evidence Link

Issue #49 – Events → Event Details:

https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/issues/49

## 4. Evidence Receipt 3: Week 7 Testing and Midterm Preparation Support

### What I Contributed

My completed empty-search test provided evidence for the team's Week 7 functional testing.

The shared Weekly Report includes my contribution to verifying how the deployed application handles searches without matching events.

I also contributed earlier evidence for the Events → Event Details flow, which is part of the midterm demonstration path.

### Verified Contributions

- Tested empty-search / no-events behavior.
- Recorded expected and actual search results.
- Confirmed successful no-results handling.
- Documented the test in GitHub Issue #70.
- Previously recorded a successful Events → Event Details test in Issue #49.
- Provided supporting test evidence for the team's midterm readiness documentation.

### Evidence Links

Week 7 Weekly Report:

https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/blob/main/docs/Week7/Weekly-Report.md

Midterm Preparation Issue #74:

https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/issues/74

## 5. Expected vs Actual Results Comparison

| Test Scenario | Expected Result | Actual Result | Status |
|---|---|---|---|
| Empty event search | Display no matching events | Appropriate no-results indication appeared without errors | PASS |
| Event selection | Open selected event details | Basic event details displayed correctly | PASS |
| No-results error handling | Search should not fail | No error reported during the recorded test | PASS |

**Note:** The Event Details result was recorded on October 8. The empty-search result is my primary Week 7 evidence.

## 6. Limitations and Challenges

The current Events section uses code-based sample event data.

Although the empty-search and event-detail tests were successful, these results do not prove that Firebase Firestore event loading works correctly.

The final timed team rehearsal and individual presentation responsibilities must also be confirmed separately.

I documented only the functionality that was actually tested, without claiming unverified features.

## 7. Lessons Learned

Through this contribution, I learned:

1. How to test application features from the user's perspective.
2. Why both successful and empty search results should be tested.
3. How to compare expected and actual results.
4. How GitHub Issues help organize testing evidence.
5. Why technical limitations must be explained accurately in project reports.

## 8. Conclusion

During Week 7, my main documented contribution to CampusVibes was testing and verifying the empty-search / no-events functionality.

I confirmed that the application handled a search without matching events successfully and recorded the result in GitHub Issue #70.

My earlier Event Details test in Issue #49 also provides supporting evidence for the project's main student journey.

These contributions support the team's preparation for the midterm demonstration and help establish that the currently tested features behave as expected.
