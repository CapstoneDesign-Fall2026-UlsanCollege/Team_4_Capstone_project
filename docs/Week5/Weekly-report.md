# Weekly Report

**Team:** Team 4   
**Week:** Sprint 1  
**Date:** 2026-10-02  

## This week's goal

Build and verify one small end-to-end CampusVibe user path and prepare the project for the next development step.

Our selected path is:

Landing Page → Sign Up/Login → Home → Events → Event Details

The focus was on making this path work before adding more features.

## What we committed to do

- [x] Complete the basic Firebase Authentication setup
- [x] Complete the Events → Event Details user path
- [x] Test the current path and prepare evidence for the checkpoint
- [ ] Add search and filtering for events as the next feature

## Evidence links

If it is not linked, it does not count.

| Evidence | Link |
|---|---|
| Vertical Slice Plan | [Sprint1-Verticle-Slice](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/blob/488ab0d6b6c8f6d1a4f7578c62cbf3cc7ed88062/docs/Week5/Sprint1-Verticle-Slice.md) |
| Stack decision and setup test | [Tech Stack Comparison](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/blob/main/docs/Week3/tech-stack-comparison.md), [Issue #25](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/issues/25) |
| Implementation Issues | [Team 4 GitHub Issues](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/issues), including [Issue #25 — Firebase Authentication signup/login smoke test](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/issues/25), [Issue #33 — end-to-end event viewing path](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/issues/33), [Issue #34 — event search and filtering](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/issues/34), [Issue #38 — resolved chat fetch bug](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/issues/38), and [Issue #39 — Gemini assistant scope](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/issues/39). |
| Wireframe and architecture | [Wireframe Notes](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/blob/main/docs/Week3/wireframe-notes.md) / [Architecture Sketch](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/blob/main/docs/Week3/Architecture-Sketch.md) |
| First visible result | [PR #37 — CampusVibes event assistant (merged)](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/pull/37) |
| PR(s) / commits | [PR #37 — CampusVibes event assistant (merged)](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/pull/37), [PR #42](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/pull/42), and [PR #44](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/pull/44) |
| Screenshot / demo | No separate screenshot or recording has been uploaded; the browser smoke check is described in [PR #37](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/pull/37). |
| Test/check note | [Manual Firebase auth smoke check](../../frontend/react-app/README.md#authentication-smoke-check--issue-25): create a test account, sign out, log back in, and confirm signed-in home/landing states. The procedure is documented, but its current run result and evidence still need to be posted to [Issue #25](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/issues/25). [PR #37 verification](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/pull/37) covers the assistant build, syntax, whitespace, and browser smoke checks. |
| Document update | [Week 5 work checklist](./week-05-work-checklist.md), [authentication smoke check](../../frontend/react-app/README.md#authentication-smoke-check--issue-25), [assistant/API scope note](../../frontend/react-app/README.md#campusvibes-assistant) |
| AI-use disclosure | Copilot assisted with drafting this smoke-check procedure and updating this report. The steps and scope were checked against the current app flow and linked project evidence; review this documentation before merging. |


| Student | What they did | Evidence link |
|---|---|---|
| DevyanaCT | Worked on Firebase Authentication setup and documentation, including the technical decision boundary and fallback plan, and worked on the Events → Event Details user path for the Sprint 1 vertical slice. | https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/issues/33 ; https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/issues/25 ;https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/issues/35 ;[Sprint1-Verticle-Slice.md](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/blob/488ab0d6b6c8f6d1a4f7578c62cbf3cc7ed88062/docs/Week5/Sprint1-Verticle-Slice.md)|
| Prachi2061 | Implemented the core Firebase sign-up/login flow and prepared midterm demo/test evidence for the checkpoint. The manual smoke-check procedure is documented, but its current run result and evidence remain outstanding. Separately implemented the CampusVibes Assistant as stretch work: a rules-based helper for sample-event recommendations, event details, saved events, and app navigation. The current helper makes no API calls, so the earlier unavailable-API failure is historical rather than part of the core proof. Also contributed deployment documentation. | [Issue #20](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/issues/20), [Issue #22](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/issues/22), [auth test Issue #25](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/issues/25), [end-to-end path Issue #33](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/issues/33), [merged assistant PR #37](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/pull/37), [resolved API failure Issue #38](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/issues/38), [Gemini scope Issue #39](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/issues/39), [deployment docs PR #42](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/pull/42), [deployment docs PR #44](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/pull/44) |
| ujjalpoudel75 | Contributed to event organization and search-related functionality for the CampusVibe flow. | https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/issues/13 ; https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/issues/15 |
| tulseyy8848 | Set up the project shell/navigation structure and contributed to the university clubs page work. | https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/issues/27 ; https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/issues/12 |

## Blockers or risks

| Blocker/risk | Owner | Next action |
|---|---|---|
| No current blocker. Firebase and the current event-viewing path are working. | Team | Continue with the next feature. |
| Reliable real campus event and club data may be difficult to obtain. | Prachi2061 | Check available university data sources and use manually maintained Firestore data if a reliable external source is unavailable. |

## Decision record

| Decision | Why we chose it | Owner | Evidence / Issue link |
|---|---|---|---|
| Use one end-to-end path for Sprint 1: Login → Home → Events → Event Details. | A smaller working path is easier to test and demonstrate than trying to complete all features at once. | Team | https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/issues/33 |
| Use sample event data in Firestore for development and testing. | Real campus event data may not yet be available or reliable. | Team | https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/issues/35 |
| Build event search and filtering next. | It extends the existing Events path and supports the planned midterm user flow. | Prachi2061 | https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/issues/34 |

## Next week's bridge task

-  Build event search and basic filtering.
-  Add empty-state handling when no events match the search.
-  Test search and filtering using the sample Firestore events.
-  Continue checking the availability of reliable campus event/club data.
