# Weekly Report

**Team:** Team 4 — CampusVibe  
**Week:** Week 6  
**Date:** October 11, 2026

## This week's goal

This week, we wanted to check whether our CampusVibe project was working correctly from the Dashboard to the Event Details page. We focused on testing the Events page with a teammate who did not build the feature and confirming that users could select an event and view its basic details.

## What we committed to do

- [x] Test the Dashboard → Events → Select Event → View Event Details path.
- [x] Ask a teammate to test the feature and record the actual result.
- [x] Update the test issue with the result and supporting evidence.

## Evidence links

| Evidence | Link |
|---|---|
| Issue(s) | [Events Test Issue](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/issues/49) |
| PR(s) / commits | [Commit db5dad6]( https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/commit/db5dad64f3131fb87b2d7011c86d6e2f9ecd575d) |
| Screenshot / demo | [Screenshot Available](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/issues/49) |
| Test/check note | [Tested-By Note](tested-by-note.md) |
| Document update | [Shared Week 6 report](weekly_report.md) |
| Prachi's individual evidence | [Individual Evidence Receipt](individual-evidence-receipt-prachi.md) |

## Individual contribution entries — one row per student

| Student | What they did | Evidence link |
|---|---|---|
| DevyanaCT | Repeat Tested the Events to confirm the tested result→ Event Details path as a teammate and confirmed that selecting a sample event displayed its basic details. | [ repeat Events Test comment](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/issues/49#issuecomment-6105483528) |
|Tulseyy8848  | Reviewed the CampusVibe navigation flow, organized dashboard and Event Details screenshot evidence, and documented the Week 6 testing progress and remaining Firestore integration work.  |https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/issues/49  |
| Prachi (@prachi2061) | Fixed the missing production logo; updated the welcome/login, Dashboard, Discover, Assistant, Suggest, and Profile designs; added browser-local profile editing; ran successful production builds and pushed the changes to main for Vercel deployment. | [Logo fix](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/commit/75c4104), [Login](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/commit/eda4e5b), [Dashboard](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/commit/e98abfd), [Discover](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/commit/8f69125), [Assistant](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/commit/8b8dac4), [Suggest](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/commit/3d735a3), [Profile](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/commit/a2ced5b), [Live demo](https://campusvibe-theta.vercel.app) |

| Ujjal (@ujjalpoudel75) | Tested the sample Events flow and reported that opening Events and selecting an event displayed its basic details correctly. | [Recorded test result](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/issues/49#issuecomment-6055568514) |

## Blockers or risks

| Blocker/risk | Owner | Next action |
|---|---|---|
| Event data is currently code-based sample data, and loading event data from Firebase Firestore has not yet been implemented or verified. | Tulsey8848 | Check the Firestore setup and permissions, then implement and test loading event data from Firestore. |

## Decision record

| Decision | Why we chose it | Owner | Evidence / Issue link |
|---|---|---|---|
| Continue using sample event data for the current working demonstration while tracking Firestore integration separately. | The Events → Event Details path can be demonstrated and tested before Firestore integration is complete. | Team 4 |[Blocker Issue](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/issues/35)|

## Next week's bridge task

- Investigate and set up Firestore event data so the Events page can load events from Firebase instead of relying only on code-based sample data.
- Test the updated event-viewing path again and record the expected result, actual result, and screenshot or other proof.
