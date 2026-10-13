# Tested-By Note — Deployed Demo Desktop and Mobile Test

## What we checked

- **Behavior / related Issue:** Deployed CampusVibe demo path — Discover, Search & Filters, Saved Events, Profile, Assistant, and Suggestions
- **Related issues:** Retest issue, #49 (sample-event evidence), and #35 (Firestore loading limitation)
- **Owner:** @prachi2061
- **Tested by (a teammate other than the UI author):** Tulseyy8848
- **Repeat test:** DevyanaCT
- **Date:** 2026/10/13
- **Verified deployment:** campusvibe-theta.vercel.app/

## Check steps

Steps Used for Repeat Test:

1. Opened the production CampusVibe site and continued as a demo student.
2. Opened Discover and tested the search and filter controls.
3. Saved an event and checked the Saved page and event summary.
4. Opened Profile and checked the displayed information.
5. Sent a prompt through the Assistant.
6. Submitted a suggestion.
7. Edited the profile bio and checked the updated information.
8. Repeated the checks on desktop and mobile, checking readability, layout, and overlapping text.

## Result

- **Expected result:** Navigation and controls work correctly, saved-event summaries update, and text remains readable without overlapping on desktop and mobile.

- **Actual result:** The test was successful. The deployed CampusVibe demo path worked as expected on desktop and mobile. The tested navigation and controls worked correctly, saved-event information was displayed as expected, and the layout remained readable without overlapping text.

- **Proof link / screenshots:** [Issue-53](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/issues/53)[Issue-63](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/issues/63)

## Problems found

- No problems were found during the completed test.

## Next action

- Keep Firestore event loading tracked separately in Issue #35, because successful demo testing does not confirm that events load from Firestore.

## Definition of Done

- [x] Independent test completed
- [x] Expected and actual results recorded
- [x] Desktop test completed
- [x] Mobile test completed
- [x] Desktop and mobile screenshots attached
- [x] No failures reported during testing
- [x] Verified deployment URL recorded
