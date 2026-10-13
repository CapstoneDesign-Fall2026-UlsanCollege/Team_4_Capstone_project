# Definition of Done

## Issue / task

Test the current CampusVibe Dashboard → Events → Select Event → View Basic Event Details behavior with a teammate, then repeat the test to check whether the written instructions are clear and easy to follow.

## Done means

- [x] The visible result is clear: selecting a sample event displays its basic details.
- [x] A teammate can reach the work through Issue #49, the test steps, and the linked evidence.
- [x] Someone other than the feature author checked it.
- [x] The expected result and actual result are recorded in the Tested-By Note.
- [x] Evidence links to the screenshots and Tested-By Note are attached.

## How we will check it

> We will check this by starting the CampusVibe React project, logging in with the test account, opening the Dashboard, navigating to Events, selecting a sample event, and confirming that its basic details are displayed. We also repeat the test by following the written steps without coaching and record whether the instructions are clear.

## Proof link

- **Issue :** [Issue49](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/issues/49)
- **Tested-By Note:** [Tested-by-note](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/blob/11d7118c5ae422fbb72ca719fc15f7c1d298d3b3/docs/Week6/tested-by-note.md)
- **Dashboard screenshot:** [ScreenShot](https://github.com/user-attachments/assets/bc04126e-ac21-48fa-ab5f-495845b271cc)
- **Event selection and details screenshot:** [ScreenShot](https://github.com/user-attachments/assets/d3d8658b-93d4-451a-ac21-043672a35ee0)

**Limitation:** The Events page currently uses code-based sample data. Firebase Firestore event loading has not yet been implemented or verified. This test confirms only the current event-selection and details behavior.
