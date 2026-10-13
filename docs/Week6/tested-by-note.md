# Tested-By Note

## What we checked

* **Behavior / related Issue:** Dashboard → Events → Select Event → View Basic Event Details / Week 6 Events Test Issue
* **Tested by (a teammate other than the author):** Tulseyy8848
* **Date:** 2026-10-08

## Check steps

1. Start the CampusVibe React project.
2. Log in using the test account and open the Dashboard.
3. Click **Events** from the Dashboard.
4. Select one of the sample events.
5. Check whether the basic details of the selected event are displayed.

## Result

* **Expected result:** The Events section opens, and selecting an event displays its basic details.
* **Actual result:** The tester opened Events from the Dashboard, selected a sample event, and viewed the basic event details successfully.
* **Proof link / screenshot:** [Proof contained](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/issues/49)

## Problems found

* None during the initial teammate test.

## Repeat test

* **Tested by:** DevyanaCT
* **Date:** 2026/10/11
* **What I did:** I repeated the test by following the written steps to open the Dashboard, navigate to Events, select a sample event, and view its details.
* **Expected result:** The selected event's basic details should be displayed, and the written steps should be understandable without coaching.
* **Actual result:** The test was successful. Dashboard and after selecting a sample event, its basic details were displayed correctly.
* **Proof link / screenshot:** [Proof Contained](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/issues/49)

## Current data limitation

The Events section currently uses code-based sample event data. Firebase Firestore event loading has not yet been implemented or verified. This test confirms only the current Events → Select Event → View Basic Details behavior.

## Next action

* Keep the current Events → Select Event → View Basic Details behavior available for the Week 7/midterm path.
* Keep Firestore event loading as a separate task and test it once the integration is implemented.
