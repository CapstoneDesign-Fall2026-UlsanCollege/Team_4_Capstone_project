# Retested-By Note — Second Test After Project Changes

## What we checked

- **Behavior / related Issue:** Dashboard → Events → Select Event → View Basic Event Details
- **Tested by (a teammate other than the author):** DevyanaCT
- **Retester:** Tulseyy8848
- **Date:** 2026-10-13

## Check steps

1. Started the updated CampusVibe project.
2. Logged in using the test account and opened the Dashboard.
3. Opened Events, selected a sample event, and checked whether the event details were displayed correctly after the project changes.

## Result

- **Expected result:** The updated project should allow the user to open Events, select an event, and view its basic details without errors.
- **Actual result:** The updated project worked as expected. We opened Events, selected a sample event, and successfully viewed the basic event details.
- **Proof link / screenshot:** [Issue-64](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/issues/64)

## Problems found

- No problems found during this test. Firestore event loading remains an unresolved limitation and is tracked separately.

## Repeat test

* **Tested by:** Tuleyy8848
* **Date:** 2026/10/11
* **What I did:** I repeated the test by following the written steps to open the Dashboard, navigate to Browse or Discover Events, select a sample event, and view its details.
* **Expected result:** The selected event's basic details should be displayed, and the written steps should be understandable without coaching.
* **Actual result:** The test was successful. Dashboard and after selecting a sample event, its basic details were displayed correctly.
* **Proof link / screenshot:** [Proof Contained Issue comment](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/issues/64#issuecomment-6148869968)

## Next action

- Keep the Firestore limitation separate: event data is still based on sample data in the code, so loading events from Firestore has not yet been verified.
