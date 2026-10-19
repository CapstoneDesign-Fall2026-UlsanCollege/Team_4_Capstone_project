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

## What works now

- Landing page, account registration/login, Firebase Authentication, and dashboard navigation.
- Students can browse sample campus events, use search and filtering, select an event, and view basic event details.
- The AI Assistant can suggest events based on students' interests using the available sample event data.
- The deployed demo includes features such as saving events, viewing the Saved summary, editing the profile, and submitting suggestions.
- Students can connect with other students, make friends, and chat through CampusVibe.
- Students can toggle between light mode and dark mode to change the website's appearance.
- The Messages section displays a message count and conversation previews, helping students identify their messages.
- The Events → Event Details flow and the independent deployed-demo rehearsal have been tested successfully.

## What does not work yet

- **Firestore event loading is not yet verified.** The Events page and interest-based recommendations currently rely on available sample event data. Firestore integration must be tested before claiming that events are retrieved from Firestore.
- Advanced features such as ticket purchasing and push notifications, are outside the current midterm demo scope.
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
  - Commits: `2a240ff`, `d82a4b6`, `37be8f4`.

## Contribution summary

| Student | What they contributed | Evidence link |
|---|---|---|
| Prachi2061 |  |  |
| DevyanaCT | Independently tested and retested the Events → Event Details flow; contributed testing evidence and demo verification. | Issue #49 / Issue #63 |
| Ujjalpoudel75 |  |  |
| Tulseyy8848 |  |  |

## Next steps after midterm

- Verify Firestore access and event-data loading, then update the relevant issue with actual test results.
- Keep the demo scope frozen; fix only critical bugs that affect the demonstration.
- Maintain clear evidence for testing, contributions, and known limitations.
- After the midterm, prioritize verified improvements based on testing results and professor feedback.
