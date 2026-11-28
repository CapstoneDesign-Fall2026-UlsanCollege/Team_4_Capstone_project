# Peer Test Notes and Handoff Trial

**Testing person or team:** Oli J.N. Taj (`jn-oli`) — Team 5  
**Project tested:** CampusVibes — Team 4  
**Date:** November 28, 2026  
**Course:** Capstone Design — Fall 2026  
**Week:** 13 — Documentation, Setup, and Handoff Proof  
**Operating System:** Windows 11  
**Browser:** Google Chrome  
**Testing Environment:** Live deployment  

## What we tried

1. Reviewed the Project README and Week 13 Setup Guide to understand the project purpose, features, requirements, and access instructions.

2. Accessed the live CampusVibes application using the documented instructions and tested the guest demonstration without creating an account.

3. Verified guest event discovery, event search, category filtering, no-results handling, and event details.

4. Registered a student test account, received the verification email, and successfully accessed the authenticated application.

5. Verified the authenticated Dashboard, navigation, event discovery, bookmarking, Saved Events, RSVP planning, RSVP cancellation, session persistence, and logout.

6. Located the event discovery source code, Architecture Sketch, AI Use and Code Ownership Audit, and relevant testing commands.

7. Identified a backup support contact to confirm that project handoff does not depend on a single area steward.

8. Compared the event listings available in guest mode and authenticated student mode.

## Area map and handoff

- **Area(s) / boundary we followed:**
  - Frontend authentication and navigation.
  - Dashboard and event discovery.
  - Sample event catalog.
  - Firebase Authentication and Firestore.
  - Personal planning and RSVP.
  - Backend API and external service boundaries.
  - Quality assurance and verification documentation.

- **Current area map link:**
  - [AI Use and Code Ownership Audit](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/blob/main/docs/Week10/ai-use-and-code-ownership-audit.md)
  - [Week 13 Architecture Sketch](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/blob/main/docs/Week13/Architecture-Sketch.md)
  - [Project README](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/blob/main/README.md)

- **Did we locate the check without relying on the steward? What was unclear?**

  The reviewer located the documented testing commands in the README and identified `npm run test:smoke` as the appropriate desktop and mobile browser verification command.

  The reviewer also located the event discovery source code at `frontend/discover.js` and identified `ujjalpoudel75` as a backup contact for frontend authentication and navigation.

  The existing documentation provided the necessary code locations and verification instructions.

  The difference between guest sample event listings and authenticated published event listings could be explained more clearly in the documentation.

  The testing command was identified but was not executed during this live application trial.

- **Cross-area dependency or handoff we observed:**

  The reviewer identified the following connections between application areas:

  | Area | Cross-area dependency |
  |---|---|
  | Frontend | React and Vite provide the application interface. |
  | Event discovery | Connects event search, filtering, and event details to available event data. |
  | Sample event catalog | `frontend/events.json` provides sample event listings. |
  | Authentication | Firebase Authentication manages account registration and authenticated access. |
  | Database | Cloud Firestore supports account information and shared application data according to the documented architecture. |
  | Backend | Vercel API handlers support server-side integrations. |
  | External services | Google Maps, Gemini, and Cloudinary provide additional application capabilities. |
  | Quality assurance | Browser smoke tests and feature-specific checks support verification. |

  During the trial, guest mode displayed nine sample events, while authenticated mode displayed 24 events, including 15 published campus events and nine sample events.

  This observation demonstrates a visible difference between guest and authenticated event discovery during the tested session.

  It does not independently establish complete Firestore integration or database security verification.

## What worked

### Documentation and setup

- The README provided understandable information about the project purpose and main features.
- The Week 13 Setup Guide provided instructions for accessing the live application.
- The live application was successfully accessible.
- Relevant source code locations and verification commands were documented.
- The Architecture Sketch was located and reviewed.
- The AI Use and Code Ownership Audit was accessible.
- A backup support contact was identified.

### Guest core journey

- Guest mode was accessible without registration.
- Searching for Jazz returned a matching sample event.
- Event category and listing filters could be applied.
- An appropriate no-results message was displayed when no matching events were available.
- Event details displayed the event title, category, date, time, venue, and map control.

### Authenticated student journey

- Student account registration and email verification were reported successful.
- Authenticated account access worked.
- The personalized student Dashboard loaded successfully.
- Navigation checks were reported successful.
- Authenticated event search returned the Fireworks event.
- The Fireworks event was successfully bookmarked and appeared in Saved Events.
- The Plan to go feature updated the personal RSVP status.
- Removing the event plan restored the original RSVP status.
- The authenticated session remained active after refreshing the browser.
- Logout successfully returned the application to the login page.

## What confused us

The following documentation observations were identified during the review and should be confirmed against the reviewer's final feedback:

- The README describes nine sample event listings, but authenticated event discovery displayed 24 listings during the trial.

- The distinction between sample events and published campus events could be explained more explicitly.

- Some date and category filter combinations returned no matching events.

- Additional instructions explaining how to browse past events or clear filters would help new users understand the available event listings.

- The local development commands were documented, but the trial did not include executing those commands.

These observations did not prevent the reported completion of the live application manual testing.

## Bugs or problems found

| Problem | Severity | Suggested Issue title |
|---|---|---|
| Documentation does not fully explain the observed difference between guest and authenticated event listings. | Minor — proposed | Update README and Setup Guide to Clarify Guest and Authenticated Event Listings |
| New users may not understand why certain date or category filters return no matching events. | Minor — proposed | Improve Documentation for Event Filters and Empty Search Results |
| Local development setup has not been independently executed during this trial. | Verification gap | Independently Verify CampusVibes Local Setup Instructions |

No application blocker or major functional failure was reported within the completed manual testing scope.

The observations above are documentation improvement opportunities and verification gaps, rather than confirmed application defects.

## One useful suggestion

- Update the README and Week 13 Setup Guide with a short section explaining the difference between guest sample events and authenticated published campus events.

  The documentation should also explain how users can change date filters, browse past events, and clear filters when no matching events are displayed.

  This improvement would make CampusVibes easier to understand for new students and future maintainers without changing existing application functionality.

## Handoff trial (required in Week 13)

- **Access or setup path followed:**

  Project README → Week 13 Setup Guide → Live CampusVibes Application → Guest Demo → Student Account Registration → Authenticated Dashboard → Event Discovery → Saved Events → RSVP Planning → Logout.

- **Area map / check path followed:**

  Project README → Project Structure → Event Discovery Source Code → Architecture Sketch → AI Use and Code Ownership Audit → Testing Commands → Backup Support Contact.

- **Could they run, view, or understand the project without team-member guidance?**

  The reviewer successfully viewed and tested the live CampusVibes application using the available documentation.

  The reviewer located the relevant architecture documentation, source code boundaries, verification commands, and backup support contact.

  The reviewer should confirm whether any assistance or coaching was required during the trial.

  Local development setup and automated test execution were not performed.

- **Result and remaining friction:**

  The manual testing checklist recorded 22/22 reported PASS results.

  The live application viewing and documentation handoff path was successfully demonstrated within the reported testing scope.

  The main remaining documentation improvement is clarifying the difference between guest sample event listings and authenticated published event listings.

  Additional guidance for date filters and empty search results would improve the experience for new users.

  Documentation improvements and any subsequent independent retest remain to be recorded.

## Manual Testing Summary

| Testing Area | Total Checks | Reported PASS | FAIL |
|---|---:|---:|---:|
| Documentation and Setup | 3 | 3 | 0 |
| Guest Core Journey | 4 | 4 | 0 |
| Architecture and Code Ownership | 5 | 5 | 0 |
| Authenticated Student Journey | 10 | 10 | 0 |
| **Total** | **22** | **22** | **0** |

- **Manual Testing Result:** 22/22 reported PASS.
- **Manual Testing Completion:** 100% reported.
- **Reported Functional Failures:** 0.
- **Local Development Execution:** NOT RUN.
- **Automated Test Execution:** NOT RUN.
- **Firestore Security Verification:** Outside the trial scope.
- **Full MVP Approval:** Not established by this trial.

## Evidence and GitHub Links

- [Independent Manual Testing and Handoff Verification — Issue #211](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/issues/211)

- [Documentation, Guest Testing, Architecture and Code Ownership Evidence](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/issues/211#issuecomment-7223314214)

- [Authenticated Student Journey Evidence](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/issues/211#issuecomment-7224085540)

- Final Independent Reviewer Feedback: See Issue #211.

- Documentation Improvement PR: Pending.

- Corrected Documentation Retest: Pending, if applicable.

## Frozen Final-Demo Promise and Risk Review

The independent trial demonstrated the reported availability of the existing guest and authenticated student journeys.

No new functional blocker was reported during the completed manual testing scope.

However, the observed difference between sample and published event listings should be reconciled with the current README, frozen feature list, and release verification records.

The team should retain the documented sample-event fallback until the relevant production event-data verification requirements are satisfied.

This independent handoff trial does not automatically upgrade the project's frozen MVP status or establish final-demo approval.

## Follow-up Actions

- [x] Conduct independent live application manual testing.
- [x] Review README and Setup Guide.
- [x] Locate architecture documentation.
- [x] Locate the current code ownership area map.
- [x] Identify verification commands.
- [x] Identify a backup support contact.
- [x] Test guest event discovery.
- [x] Test authenticated student functionality.
- [x] Record reported manual test results.
- [x] Link screenshot evidence in GitHub.
- [ ] Confirm final reviewer feedback and assistance details.
- [ ] Confirm this Peer Test Notes document with the reviewer.
- [ ] Update README and Setup Guide based on confirmed feedback.
- [ ] Submit documentation improvement PR.
- [ ] Independently retest corrected documentation, if applicable.
- [ ] Link the completed handoff records in the Week 13 Weekly Report.

## Conclusion

The Week 13 independent handoff trial provided evidence that an outside student could access the live CampusVibes application, review its documentation, perform guest and authenticated manual testing, and locate relevant code areas and verification instructions.

The manual testing checklist recorded 22/22 reported PASS results with no reported functional failures.

The trial also identified opportunities to improve documentation concerning guest and authenticated event listings, event filters, and sample-data boundaries.

The final documentation improvement and follow-up verification will strengthen the project handoff without changing existing application functionality.

---

**Independent Reviewer:** Oli J.N. Taj (`jn-oli`)  
**Reviewer Team:** Team 5  
**Project Team:** Team 4 — CampusVibes  
**Setup Guide Prepared By:** Devyana (`DevyanaCT`)  
**Testing Date:** November 28, 2026  
**Manual Testing Status:** 22/22 Reported PASS  
**Handoff Trial:** Performed — live application and documentation scope  
**Documentation Follow-up:** Pending  
