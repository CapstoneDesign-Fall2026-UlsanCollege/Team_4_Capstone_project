# Midterm Demo Script

**Team:** Team 4  
**Week:** 7–8  

## Opening

- **Project name:** CampusVibes
- **Target users:** University students who want to discover campus events, clubs, and activities.
- **Problem:** Students need a simple and accessible way to find campus activities and explore relevant events without navigating a confusing website.

## Demo path

1. Open the CampusVibes website and introduce the project. Show the landing page and explain its purpose.
2. Demonstrate account creation or login, then access the student dashboard.
3. Open Discover/Events, demonstrate the available search and filtering behavior, select an event, and show its basic details.

## What Works Now

- **Authentication:** Email/password registration, login, logout, and persistent authentication state through Firebase Authentication.
- **Community:** Dashboard navigation, Discover search and filters, event details, Saved, and Profile.
- **Events:** Students can browse sample campus events, search and filter them, select an event, and view basic event details.
- **Assistant:** Suggests events based on students' interests using available sample event data.
- **Profile:** Students can view and edit profile information, including their bio and interests, and access profile-related features.
- **Saved Events:** Students can save events and view their Saved summary.
- **Student Connections and Chat:** Students can connect with other students, make friends, and chat through CampusVibe.
- **Messaging Indicators:** The Messages section displays conversation previews, a message count, and online-status indicators within the website.
- **Campus Vibe-Feed:** The project includes social-feed functionality for signed-in students, including posts and social interactions, according to the implemented features.
- **Suggestions:** Students can submit event ideas through the Suggest feature.
- **Progress Badges:** The project includes progress badges and milestone-related functionality.
- **Light/Dark Mode:** Students can toggle between light and dark themes.
- **Testing:** The Events → Event Details flow and the independent deployed-demo rehearsal have been tested successfully.

## What Does Not Work Yet / Limitations

- **Firestore Event Loading:** Event browsing and interest-based recommendations currently use code-based sample data. Firestore event loading has not yet been verified.
- **Google Sign-In and Password Reset:** The functionality requires separate verification before claiming both flows work successfully end to end.
- **Push Notifications:** Browser and mobile push notifications are not implemented. The current message count and conversation previews are in-app indicators, not device notifications.
- **Campus Vibe-Feed Attachments:** Shared post-photo attachments remain disabled while billing is unavailable, according to the project feature notes.
- **Assistant Limitations:** The Assistant uses a local answer engine rather than a live AI service or live campus data. Attachment and voice features are unavailable.
- **Event Suggestions:** Approval of a suggestion does not automatically publish it as an event in Discover.
- **Guest Social Features:** Guest-mode posts and friend requests use local demo data and do not get delivered to other students.
- **Data Persistence:** Some demo records are stored locally in the browser rather than synced across accounts or devices. Persistence varies by feature and sign-in status.
- **Ticket Purchasing:** Ticket purchasing is not included in the current midterm demo scope.
  
## Evidence links

- **Repository:** [CampusVibe Team 4 repository](https://github.com/Capstone-Design-Team-4/Team_4_Capstone_project)
- **Weekly Report:** Link the Week 7–8 report in the repository.
- **Demo/proof:** [Demo link](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/issues/53)
- **Important PRs/Issues:**
  - Issue #64 — [Events → Event Details behavior test.](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/issues/64)
  - Issue #70 — [Empty Search / No-Events State](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/issues/70)
  - Issue #53 — [Independent deployed-demo rehearsal.](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/issues/53)
  - Issue #63 — [Retest evidence and follow-up record](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/issues/63)
  - Issue #35 — [Firestore limitation](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/issues/35)
  - Commits: [Repo Commits](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/commits/main/)

## Contribution summary

| Student | What they contributed | Evidence link |
|---|---|---|
| Prachi2061 |  |  |
| DevyanaCT | Independently tested and retested the Events → Event Details flow ; added a theme toggle for switching between light and dark modes; verified deployed demo features across desktop and mobile, contributed testing evidence, actual results, and midterm demo verification. | [Issue #64](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/issues/64), [commits](108d8b69181859d4c1ff2d6e049b26d353f9a094) [Issue #63](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/issues/63) [Issue #49](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/issues/49)|
| Ujjalpoudel75 |  |  |
| Tulseyy8848 | Independently tested the deployed CampusVibes demo as a non-UI-author; verified the demo student flow, Discover event search and filtering, saving events, Saved page, Profile, and Assistant suggestions; recorded test results and reported findings for desktop and mobile testing. | [Issue #53](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/issues/53), [Issue #49](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/issues/49) |

## Next steps after midterm

- Verify Firestore access and event-data loading, then update the relevant issue with actual test results.
- Keep the demo scope frozen; fix only critical bugs that affect the demonstration.
- Maintain clear evidence for testing, contributions, and known limitations.
- After the midterm, prioritize verified improvements based on testing results and professor feedback.
