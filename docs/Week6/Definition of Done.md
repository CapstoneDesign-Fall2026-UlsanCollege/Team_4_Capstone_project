# Definition of Done

## Issue / task

Test the current CampusVibe Dashboard → Events → Select Event → View Basic Event Details behavior with a teammate, then repeat the test to check whether the written instructions are clear and easy to follow. Also test the empty state by inserting outside of sample data

## Done means

- [x] The visible result is clear: selecting a sample event displays its basic details.
- [x] A teammate can reach the work through Issue #49, the test steps, and the linked evidence.
- [x] Someone other than the feature author checked it.
- [x] The expected result and actual result are recorded in the Tested-By Note.
- [x] Evidence links to the screenshots and Tested-By Note are attached.
- [x] The updated project was retested and the successful result was recorded with new screenshots in Issue #64.
- [x] Empty state test was done

## How we will check it

> We will check this by starting the CampusVibe React project, logging in with the test account, opening the Dashboard, navigating to Events, selecting a sample event, and confirming that its basic details are displayed. We also repeat the test by following the written steps without coaching and record whether the instructions are clear.

## Proof link

- **Original test issue:** [Issue #49 — Events → Event Details](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/issues/49)
- **Original Tested-By Note:** [Tested-by-note.md](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/blob/11d7118c5ae422fbb72ca719fc15f7c1d298d3b3/docs/Week6/tested-by-note.md)
- **Retest issue:** [Issue #64 — Repeat Test After Project Changes](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/issues/64)
- **Retest date:** October 13, 2026
- **Retested by:** `DevyanaCT`
- **Dashboard screenshot:** [View screenshot](https://github.com/user-attachments/assets/bc04126e-ac21-48fa-ab5f-495845b271cc)
- **Event selection and details screenshot:** [View screenshot](https://github.com/user-attachments/assets/d3d8658b-93d4-451a-ac21-043672a35ee0)
- **Additional retest screenshots:** Attached to [Issue #64](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/issues/64).
- **Empty state test:** [issue70](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/issues/70)

**Limitation:** The Events page currently displays code-based sample data. Firestore-backed event loading has not yet been verified. This test confirms only that users can select a sample event and view its basic details; it does not confirm that events are retrieved from Firebase Firestore.

**Repeat-test status:** The Events → Select Event → View Basic Event Details behavior was tested by `tulseyy8848` and retested by `DevyanaCT` on October 13, 2026, after the project changes. The retest was successful, and the selected sample event's basic details were displayed correctly. Three screenshots were attached as proof. The broader deployed demo rehearsal was also repeated successfully. See [Issue #53](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/issues/53), [Issue #63](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/issues/63) and [Issue #64](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/issues/64)

**Scope boundary:** This Definition of Done applies to the sample-data Events behavior in Issue #49. It does not confirm Firestore-backed event loading, which remains a separate task.
