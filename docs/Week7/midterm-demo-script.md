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
- Students can browse code-based sample events, select an event, and view its basic details.
- The deployed demo rehearsal covered search/filtering, saving events, Saved summary, Profile, Assistant prompt, suggestions, and profile editing on desktop and mobile.
- The Events → Event Details flow was tested successfully by a teammate, including a retest by DevyanaCT on October 13, 2026.

## What does not work yet

- **Firestore event loading is not yet verified.** The current Events page uses code-based sample event data. We must not claim that events are loaded from Firestore until the connection and data retrieval are tested successfully.
- Advanced functionality, such as AI-powered recommendations, ticket purchasing, push notifications, and student chat, is outside the current midterm demo scope.

## Evidence links

- **Repository:** [CampusVibe Team 4 repository](https://github.com/Capstone-Design-Team-4/Team_4_Capstone_project)
- **Weekly Report:** Link the Week 7–8 report in the repository.
- **Demo/proof:** Link the successful independent deployed-demo rehearsal evidence in Issue #53.
- **Important PRs/Issues:**
  - Issue #49 — Events → Event Details behavior test.
  - Issue #53 — Independent deployed-demo rehearsal.
  - Issue #63 — Retest evidence and follow-up record, where applicable.
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
