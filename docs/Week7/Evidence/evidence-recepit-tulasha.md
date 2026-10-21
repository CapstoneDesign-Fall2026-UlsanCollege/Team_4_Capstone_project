# Individual Evidence Receipt

**Student:** Tulseyy8848  
**Team:** 4 – CampusVibes  
**Week:** 7, October 15–21, 2026  
**Evidence reviewed:** October 21, 2026 (Asia/Seoul)  
**Role:** Independent Tester – Desktop and Mobile Verification

This receipt documents my individual contribution to testing the deployed CampusVibes application as a non-UI-author. My work focused on verifying the student dashboard and core student-facing workflows, recording observed results, and reporting findings to support the team's midterm demonstration.

## Receipt 1: Dashboard Verification

- **What I did:** Independently tested the deployed CampusVibes dashboard using the demo student account.
- **What I checked:** Verified the dashboard layout and key sections, including the welcome message, weekly calendar, curated event count, saved-event count, ideas drafted, upcoming events, recommended events, quick actions, and recent activity.
- **How I checked it:** Opened the deployed application and inspected the dashboard displayed after login. Checked that the main sections and navigation options were visible and understandable.
- **Observed result:** The dashboard displayed sample campus events, recommendations, quick actions, and recent activity. It provided access to the main student workflows, including browsing events, asking the Assistant, suggesting an event, and opening Saved.
- **What I learned:** The dashboard serves as the starting point for the student journey. Its event summaries and quick actions help users navigate to the application's main features.
- **Evidence:** Dashboard screenshot captured on October 21, 2026.

## Receipt 2: Discover, Search, and Filter Events

- **What I did:** Independently tested the Discover/Events workflow to check whether students could find campus events.
- **What I checked:** Opened the event-browsing section and tested the available search and filtering controls.
- **How I checked it:** Used the demo student account to navigate from the dashboard to Discover/Events and interact with the available controls.
- **Observed result:** Recorded the behavior of event discovery, search, and filtering for the desktop and mobile testing workflow.
- **What I learned:** Search and filtering are important for helping students locate relevant campus activities without browsing every event manually.
- **Evidence:** [Issue #53 – Independent Rehearsal and Testing](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/issues/53)

## Receipt 3: Saving Events and Profile Verification

- **What I did:** Tested the student workflow for saving events and accessing personal account pages.
- **What I checked:** Selected events, used the save controls, opened the Saved page, and navigated to the Profile page.
- **How I checked it:** Followed the workflow from event discovery to saving an event and checking the relevant student pages.
- **Observed result:** Recorded the behavior of the Saved and Profile workflows and reported relevant findings.
- **What I learned:** Students need a clear way to save interesting activities and return to them later. Consistent navigation between event discovery and personal pages improves usability.
- **Evidence:** [Issue #53 – Independent Rehearsal and Testing](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/issues/53)

## Receipt 4: Assistant Suggestions and Cross-Device Testing

- **What I did:** Tested the Assistant interaction and event suggestions, contributing desktop and mobile testing evidence.
- **What I checked:** Followed the available Assistant workflow, checked its suggestions, and recorded observed behavior across desktop and mobile views.
- **How I checked it:** Used the deployed demo and documented the results and findings from the student-facing workflow.
- **What I learned:** Assistant suggestions should be easy to understand, and the interface should remain usable across different screen sizes. Suggested events should not be confused with confirmed live campus listings.
- **Evidence:** [Issue #53 – Independent Rehearsal and Testing](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/issues/53)

## Independent Testing Summary

My individual contribution included:

- Independently testing the deployed CampusVibes demo as a non-UI-author.
- Verifying the student dashboard and its main sections.
- Testing Discover event search and filtering.
- Checking event-saving actions and the Saved page.
- Navigating to the student Profile.
- Testing Assistant suggestions.
- Contributing desktop and mobile testing evidence.
- Recording test results and reporting findings to support application quality assurance.

## Midterm Demonstration Boundary

The core midterm demonstration follows this path:

**Landing → Email/Password Login → Dashboard → Discover/Events → Search/Filter → Select an Event → Event Details**

My testing contribution supports verification of the user-facing workflow. It does not mean that I implemented the interface or independently verified every backend feature.

The dashboard displays illustrative sample events. The event catalog remains code-based, and Firestore-backed event loading is tracked separately in [Issue #35](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/issues/35).

The final timed team rehearsal must also be documented separately in [Issue #74](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/issues/74). The team should record the tester, date, device/browser, desktop/mobile view, elapsed time, expected and actual results, supporting proof, remaining limitations, and next action after the rehearsal is performed.

**Conclusion:** My individual contribution was independently testing the CampusVibes student dashboard and core student workflows, checking usability across desktop and mobile views, recording observed results, and reporting findings to support the team's midterm demonstration.
