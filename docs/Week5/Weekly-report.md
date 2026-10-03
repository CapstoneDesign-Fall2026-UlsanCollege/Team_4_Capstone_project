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
| Issue(s) | https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/issues/33 |
| PR(s) / commits | https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/commits |
| Screenshot / demo | TBD — add screenshot or Loom/demo link |
| Test/check note | https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/issues/25 |
| Document update | https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/blob/main/docs/Week5/Weekly-report.md |

## Individual contribution entries — one row per student

| Student | What they did | Evidence link |
|---|---|---|
| DevyanaCT | Built the event detail flow and helped complete the Sprint 1 end-to-end event-viewing path; worked on Firebase/event configuration blockers. | https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/issues/33 ; https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/issues/35 |
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
