# Midterm Demo Script

**Team:** Team 4  
**Week:** 7–8

## Opening

- **Project name:** CampusVibes
- **Target users:** University students who want to discover campus events, clubs, and activities.
- **Problem:** Students need a simple and accessible way to find campus activities without navigating a confusing website.
- **Goal:** Demonstrate the current working user journey, explain supporting features, and clearly identify remaining limitations.

## Demo Path — Frozen Midterm Scope

1. **Landing Page:** Open the deployed CampusVibes website and introduce the project's purpose.
2. **Authentication:** Demonstrate the verified email/password login flow and enter the student dashboard.
3. **Dashboard:** Briefly introduce the main navigation.
4. **Discover / Events:** Open the Events page and demonstrate the available sample events, search, and filtering behavior.
5. **Event Details:** Select an event and show its basic details. Explain that the current Events page uses code-based sample data and that Firestore event loading has not yet been verified.
6. **Supporting Features:** Briefly mention the Assistant, Saved Events, Profile, social features, and light/dark theme toggle. Demonstrate additional features only if time permits and their behavior has been verified.

**Demo boundary:** The main demonstration focuses on the tested user journey from the landing page and login through event discovery and event details. Supporting features are additional project work and do not replace the core demonstration path.

## What Works Now

### Core Midterm Demo

- **Authentication:** Email/password registration and login are implemented with Firebase Authentication. Demonstrate logout and authentication persistence only to the extent they have been verified.
- **Dashboard and Navigation:** Students can access the dashboard and navigate between the main sections.
- **Event Discovery:** Students can browse code-based sample events and use the implemented search and filtering features.
- **Event Details:** Students can select an event and view its basic details. The Events → Event Details flow has been tested.
- **Testing:** The Events → Event Details flow and independent deployed-demo rehearsal have recorded evidence.

### Supporting Features

- **Saved Events:** Students can save events and view the Saved summary.
- **Profile:** Students can view and edit supported profile information.
- **Assistant:** Provides event suggestions using available sample data through a local answer engine.
- **Suggestions:** Students can submit event ideas through the Suggest feature.
- **Social Features:** The project includes student connections, messaging, and feed functionality, subject to documented demo-data and persistence limitations.
- **Light/Dark Mode:** Students can switch between light and dark themes.

## What Does Not Work Yet / Limitations

- **Firestore Event Loading:** The Events page currently uses code-based sample data. Firestore event-data loading has not been verified.
- **Google Sign-In and Password Reset:** End-to-end success requires separate verification.
- **Push Notifications:** Browser and mobile push notifications are not implemented. In-app message counts and conversation previews are not device notifications.
- **Assistant:** Uses a local answer engine rather than a live AI service or live campus data. Voice and attachment features are unavailable.
- **Data Persistence:** Some demo records are stored locally in the browser and may not sync across accounts or devices.
- **Guest Social Features:** Guest-mode posts and friend requests use local demo data and are not delivered to other students.
- **Feed Attachments:** Post-photo attachments remain disabled while billing is unavailable, according to the project notes.
- **Event Suggestions:** Approving a suggestion does not automatically publish it in Discover.
- **Ticket Purchasing:** Ticket purchasing is outside the current midterm scope.

## Evidence Links

- **Repository:** [CampusVibes Team 4 Repository](https://github.com/Capstone-Design-Team-4/Team_4_Capstone_project)
- **Deployment:** [CampusVibes Website](https://campusvibe-theta.vercel.app/)
- **Independent Demo Rehearsal:** [Issue #53](https://github.com/Capstone-Design-Team-4/Team_4_Capstone_project/issues/53)
- **Events → Event Details Test:** [Issue #64](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/issues/64)
- **Empty Search / No-Events Test:** [Issue #70](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/issues/70)
- **Retest Evidence and Follow-up:** [Issue #63](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/issues/63)
- **Firestore Limitation:** [Issue #35](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/issues/35)
- **Theme Toggle :** [Theme-toggle code commit](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/commit/108d8b69181859d4c1ff2d6e049b26d353f9a094) [*Theme toggle evidence](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/blob/main/docs/Week7/Evidence/theme-toggle.md)
- **Repository Commits:** [View commits](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/commits/main/)

## Contribution Summary

| Student | Contribution | Evidence |
|---|---|---|
| Prachi2061 | Add the student's confirmed contribution and evidence link. | Add the relevant issue, commit, or screenshot link. |
| DevyanaCT | Independently tested and retested the Events → Event Details flow, added a light/dark theme toggle, and contributed deployed-demo testing evidence and midterm verification. | [Issue #64](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/issues/64), [Issue #63](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/issues/63), [Theme-toggle commit](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/commit/108d8b69181859d4c1ff2d6e049b26d353f9a094) |
| Ujjalpoudel75 | Add the student's confirmed contribution and evidence link. | Add the relevant issue, commit, or screenshot link. |
| Tulseyy8848 |  |  |

## Next Steps After Midterm

- Verify Firestore access and event-data loading, then record the actual test results in the relevant issue.
- Keep the main demonstration scope focused on the tested user journey.
- Fix critical bugs that could interrupt the demonstration.
- Maintain direct evidence links for testing, individual contributions, and known limitations.
- Prioritize future improvements based on test results and professor feedback.
