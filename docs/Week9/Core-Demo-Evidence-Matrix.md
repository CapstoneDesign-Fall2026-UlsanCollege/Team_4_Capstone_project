## Core Demo Evidence Matrix

**Team:** 4 – CampusVibes  
**Evidence review date:** 2026/11/02

The core demo journey is:

**Login → Dashboard → Discover / Search → Event Details**

| Feature / Test | Result | Evidence / Notes |
|---|---|---|
| Login with Firebase | **Not Tested** | A complete successful login and authenticated session have not been verified with current evidence. |
| Dashboard | **Pass (Guest Test)** | Dashboard was reached during the automated guest/sample-data review on Nov 2. This does not prove authenticated access. |
| Discover / Events | **Pass** | Sample events displayed during the Nov 2 automated guest test. |
| Search and Filters | **Pass** | Search and filter behavior was checked during the Nov 2 automated guest test. |
| Event Details | **Pass** | An event was selected and its basic details were displayed during the Nov 2 automated guest test. |
| Firebase Authentication | **Not Tested** | Google Sign-In and Password Reset are not confirmed as complete successful flows. The Google provider readiness/cancellation check is not proof of a successful Google login. |
| Firestore Event Loading | **Not Tested** | The Events page currently uses code-based sample data. Loading event data from Firestore has not been verified. |

**Core journey evidence:**
- Automated test note: [prachi-core-review-2026-11-02/check-note.md](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/blob/dd41445b4099203d7ea7c6d7b9a364c9051e931d/docs/Week9/Evidence/prachi-core-review-2026-11-02/check-note.md)
- Test results: [prachi-core-review-2026-11-02/results.json](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/blob/dd41445b4099203d7ea7c6d7b9a364c9051e931d/docs/Week9/Evidence/prachi-core-review-2026-11-02/results.json)
- Screenshots: [Evidence/prachi-core-review-2026-pngs](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/tree/dd41445b4099203d7ea7c6d7b9a364c9051e931d/docs/Week9/Evidence/prachi-core-review-2026-11-02)
