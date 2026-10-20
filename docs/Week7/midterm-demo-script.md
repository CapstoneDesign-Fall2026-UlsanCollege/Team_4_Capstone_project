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

**Demo boundary:** The timed run ends at Event Details. Saved Events, Profile, Assistant, Suggestions, social features, badges/photos, and the light/dark theme toggle are supporting work, not extra steps in the frozen path. Discuss them separately only after the core demonstration, using their own evidence. Do not add features to finish the midterm.

## What Works Now

### Core Midterm Demo

- **Authentication:** Email/password registration and login are implemented with Firebase Authentication. Demonstrate logout and authentication persistence only to the extent they have been verified.
- **Dashboard and Navigation:** Students can access the dashboard and navigate between the main sections.
- **Event Discovery:** Students can browse code-based sample events and use the implemented search and filtering features.
- **Event Details:** Students can select an event and view its basic details. The Events → Event Details flow has been tested.
- **Testing:** The Events → Event Details flow and October 13 independent deployed-demo rehearsal have recorded evidence. They do not establish independent verification of extensions released afterward.

### Supporting Features

- **Saved Events and Profile:** Signed-in bookmarks, supported profile edits, and badges persist privately to the account; profile photos are small stored thumbnails. Demo mode remains browser-local. See [PR #91](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/pull/91) and [PR #93](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/pull/93).
- **Assistant:** A local sample-event helper plus optional Gemini conversations with explicit age/privacy confirmation. The [real-response result](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/pull/101#issuecomment-6244789898) is automated developer verification, not a teammate rehearsal or live campus search.
- **Suggestions:** Signed-in users can submit ideas to a real shared review queue; guest drafts remain local. See [PR #78](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/pull/78).
- **Social Features and Feed Photos:** Signed-in shared posts, connections and accepted-friend private Messages use Firestore; guest actions are local demos. One compressed photo per shared post uses Cloudinary, verified in [the production photo check](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/pull/100#issuecomment-6244372258). These services do not verify Firestore loading of Discover events.
- **Light/Dark Mode:** Students can switch between light and dark themes.

## What Does Not Work Yet / Limitations

- **Firestore Event Loading:** The Events page currently uses code-based sample data. Firestore event-data loading has not been verified.
- **Google Sign-In and Password Reset:** End-to-end success requires separate verification.
- **Push Notifications:** Browser and mobile push notifications are not implemented. In-app message counts and conversation previews are not device notifications.
- **Assistant:** Gemini depends on a configured server key, explicit consent and available quota; failures can fall back to the labeled Local helper. Neither mode has live campus information or Google Search. Chat voice and attachments remain unavailable.
- **Data Persistence:** Guest/demo records remain local. Signed-in data must show a server save acknowledgement; closing before it arrives can lose pending changes. Account persistence is not proof that Discover events come from Firestore.
- **Guest Social Features:** Guest-mode posts and friend requests use local demo data and are not delivered to other students.
- **Feed Attachments:** One compressed shared-post photo is supported through Cloudinary without enabling Firebase billing. Videos, multiple-photo posts and private-message attachments remain outside this release; provider quotas still apply.
- **Event Suggestions:** Approving a suggestion does not automatically publish it in Discover.
- **Ticket Purchasing:** Ticket purchasing is outside the current midterm scope.

## Failure and Fallback

- **Empty search:** Show the no-events message, choose Clear filters and reopen a sample event. This recovery passed in the [October 20 technical check](./Evidence/core-path-2026-10-20/check-note.md).
- **Login/network interruption:** State that the login path is blocked, read the connection error and retry after connectivity is restored. The technical check deliberately blocked only the sign-in request and verified a successful real retry; it did not observe an actual Firebase outage.
- **If the live demo still fails:** Show the linked, dated desktop/mobile screenshots and label them as recorded evidence. Do not claim screenshots prove the current live system works, or silently substitute demo access for the frozen email/password path.
- **Human check still pending:** Each speaker must explain this fallback during the real 3-5 minute rehearsal. Passing browser automation does not confirm the team's explanation or presentation timing.

## Evidence Links

- **Repository:** [CampusVibes Team 4 Repository](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project)
- **Deployment:** [CampusVibes Website](https://campusvibe-theta.vercel.app/)
- **Independent Demo Rehearsal:** [Issue #53](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/issues/53)
- **Events → Event Details Test:** [Issue #64](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/issues/64)
- **Empty Search / No-Events Test:** [Issue #70](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/issues/70)
- **Retest Evidence and Follow-up:** [Issue #63](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/issues/63)
- **Firestore Limitation:** [Issue #35](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/issues/35)
- **Theme Toggle:** [Theme-toggle code commit](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/commit/108d8b69181859d4c1ff2d6e049b26d353f9a094) · [Theme toggle evidence](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/blob/main/docs/Week7/Evidence/theme-toggle.md)
- **Weekly Report and Individual Receipt:** [Week 7 report](./Weekly-Report.md) · [prachi2061](../../evidence-receipt-prachi2061.md)
- **Current Core/Fallback Proof:** [October 20 automated production run](./Evidence/core-path-2026-10-20/check-note.md), separate from the pending narrated rehearsal.
- **Repository Commits:** [View commits](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/commits/main/)

## Contribution Summary

| Student | Contribution | Evidence |
|---|---|---|
| prachi2061 | Fixed navigation and event imagery; implemented signed-in persistence and supporting suggestion, photo, profile/badge and Gemini releases with automated regression coverage. Keep the core sample-event path reliable and explain the unresolved Firestore boundary. Independent rehearsal results belong to the named teammates, not the feature author. | [Individual receipt and exact commits](../../evidence-receipt-prachi2061.md) · [PR #75](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/pull/75) · [PR #77](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/pull/77) |
| DevyanaCT | Independently tested and retested the Events → Event Details flow, added a light/dark theme toggle, and contributed deployed-demo testing evidence and midterm verification. | [Issue #64](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/issues/64), [Issue #63](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/issues/63), [Theme-toggle commit](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/commit/108d8b69181859d4c1ff2d6e049b26d353f9a094) |
| ujjalpoudel75 | Visible recorded work: the empty-search/no-events test in Issue #70. Confirm the contribution and your own Week 7 receipt before presenting; unverified organisation/submission work is not part of this frozen path. | [Your result - Issue #70](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/issues/70) · [Receipt status and next action](./Weekly-Report.md#current-receipt-and-speaker-follow-up) |
| Tulseyy8848 |Tested the CampusVibes user flow and deployed demo, checked event discovery and filtering, saved events, profile and assistant features, and reviewed desktop/mobile layouts. Recorded testing evidence and retest results. Identified the limitation that sample events were displayed, but persistent Firestore saving was not verified.  |https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/issues/63, https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/issues/74  |

## Next Steps After Midterm

**Before presenting:** Issue #74 still needs the final 3-5 minute team rehearsal. Record the real tester, date, browser/device and desktop/mobile view, elapsed time, expected/actual result, screenshots or result link, remaining Firestore limitation, and next action. This script update is not a completed timed rehearsal or a confirmed speaking-role assignment.

- Verify Firestore access and event-data loading, then record the actual test results in the relevant issue.
- Keep the main demonstration scope focused on the tested user journey.
- Fix critical bugs that could interrupt the demonstration.
- Maintain direct evidence links for testing, individual contributions, and known limitations.
- Prioritize future improvements based on test results and professor feedback.
