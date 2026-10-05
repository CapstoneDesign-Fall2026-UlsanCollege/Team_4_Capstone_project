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

| Evidence                      | Link                                                                                                                                                                                                                                                                                            |
| ----------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Vertical Slice Plan           | [Sprint1-Verticle-Slice](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/blob/a01ab25b1103ba300c0d45918d4d3035712e72f8/docs/Week5/Sprint1-Verticle-Slice.md)                                                                                                                                                           |
| Stack decision and setup test | [Tech Stack Comparison](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/blob/main/docs/Week3/tech-stack-comparison.md)[issue](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/issues/25)                                                                                                    |
| Implementation Issues         | [Team 4 GitHub Issues](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/issues)                                                                                                                                                                                  |
| Wireframe and architecture    | [Wireframe Notes](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/blob/main/docs/Week3/wireframe-notes.md) / [Architecture Sketch](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/blob/main/docs/Week3/Architecture-Sketch.md) |
| First visible result          | **Add your actual commit / PR / screenshot link here**                                                                                                                                                                                                                                          |
| Actual check result           | **Add the actual test note, Issue comment, or screenshot showing the result here**                                                                                                                                                                                                              |


| Student | What they did | Evidence link |
|---|---|---|
| DevyanaCT | Worked on Firebase Authentication setup and documentation, including the technical decision boundary and fallback plan, and worked on the Events → Event Details user path for the Sprint 1 vertical slice. | https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/issues/33 ; https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/issues/25 ;https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/issues/35 ;[Sprint1-Verticle-Slice.md](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/blob/657b83850dc6eb802eb1299da39bb1d951d0eda2/docs/Week5/Sprint1-Verticle-Slice.md)|
| prachi2061 | Implemented sign-up/login flow and prepared the midterm demo/test evidence for the checkpoint. | https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/issues/22 ; https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/issues/20 |
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

- [ ] Build event search and basic filtering.
- [ ] Add empty-state handling when no events match the search.
- [ ] Test search and filtering using the sample Firestore events.
- [ ] Continue checking the availability of reliable campus event/club data.
