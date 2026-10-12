# Individual Evidence Receipt

Student: RAJBHANDARI PRACHI (@prachi2061)  
Team: Team 4 - CampusVibe  
Week: Week 6  
Date: October 12, 2026

## Receipt 1 - Production logo and authentication screens

- What I did: Fixed the missing production logo and updated the welcome, login, and sign-up designs.
- Evidence: [Logo fix](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/commit/75c4104), [Authentication design](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/commit/eda4e5b).
- How I checked it: Production build passed; the deployed logo asset returned HTTP 200.
- What I learned: Images referenced by the injected HTML need to be available in Vite's public assets directory on deployment.

## Receipt 2 - Dashboard, Discover, Assistant, and Suggest

- What I did: Updated these pages using the supplied visual references while keeping existing controls and behavior.
- Evidence: [Dashboard](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/commit/e98abfd), [Discover](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/commit/8f69125), [Assistant](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/commit/8b8dac4), [Suggest](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/commit/3d735a3).
- How I checked it: Production builds passed. Confirmed that the deployed Assistant stylesheet contained the new white-panel rules after Vercel finished deploying.
- What I learned: A successful push does not mean the new deployment is immediately live; check the version served before reporting completion.

## Receipt 3 - Profile and shared contribution evidence

- What I did: Added the student profile layout, saved-event summary, and browser-local editing for program and bio; added my contribution row to the shared Week 6 report.
- Evidence: [Profile implementation](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/commit/a2ced5b), [Week 6 contribution](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/commit/be88f08), [Shared report](weekly_report.md).
- How I checked it: Production build passed and changes were pushed to main. Independent interaction testing of the new profile edit flow remains pending.
- What I learned: Keep individual evidence in the correct shared week and distinguish build checks from teammate workflow tests.

## Limits and follow-up

Event data and the Assistant use sample data. Profile edits are browser-local, not Firebase-backed. The UI updates still need independent desktop/mobile workflow checks and screenshots. The existing [team test evidence](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/issues/49) records the earlier sample-event path; it is not evidence that every new UI interaction was retested.
