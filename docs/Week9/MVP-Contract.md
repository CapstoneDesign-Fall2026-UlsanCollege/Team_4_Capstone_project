# MVP Contract

**Team:** 4  
**Project:** CampusVibes  
**Week:** 9

After the midterm, our job is not to make the project bigger. Our job is to make it real.

## What we are definitely finishing

- Complete and verify the main campus event discovery journey, from login to viewing event details.
- Complete Google sign-in and password reset, including successful end-to-end testing.
- Verify Firestore event loading and ensure the application handles event data correctly.

## What we are cutting or postponing

- Ticket purchasing and payment functionality.
- External push notifications.
- Advanced AI personalization beyond recommendations based on the available sample event data.

## Final demo proof

Our final demo will prove:

> A university student can log in to CampusVibes, access the dashboard, discover campus events using search and filters, select an event, and view its basic details. The team will demonstrate the features that have passed testing and provide GitHub evidence and documentation to support the final project.

## What must be true by Week 11

- [x] The main user journey from login to event details works reliably and has testing evidence.
- [ ] Google sign-in and password reset are completed and successfully tested, or their remaining limitations are clearly documented.
- [ ] Firestore event loading has been tested, with the actual result and any remaining problems recorded.

## Top three risks

| Risk | Why it matters | Owner | Plan |
|---|---|---|---|
| Google sign-in and password reset are incomplete. | Students may not be able to use all planned authentication options. | Prachi2061  | Complete the implementation, test both flows, and record screenshots or test results. |
| Firestore event loading is unverified. | The application may not load real event data as expected. | Firebase / database developer (confirm with team) | Test Firestore loading, check permissions and data structure, and document the result. |
| Main demo flow or supporting features may have bugs. | Problems during the final presentation could affect the demonstration. | All team members | Perform regression testing, fix critical bugs, and complete a timed rehearsal. |

## Ownership

| Part | Owner | Issue link |
|---|---|---|
| Authentication: Google sign-in and password reset | Prachi2061 | [Issue #116](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/issues/116) |
| Main event discovery and event details testing | DevyanaCT (proposed) | [Issue #64](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/issues/64) |
| Independent deployed website testing | Prachi2061(Author) Tulseyy8848(Independent tester) DevyanaCT(Retester) | [Issue #53](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/issues/53) |
| Firestore event loading verification | Firebase / database developer (confirm with team) | [Issue #117](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/issues/117) |
| Test Local Demo setup | DevyanaCT(Owner) Tulseyy8848(Tester) | [Issue #118](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/issues/118)

## MVP completion rule

A feature will be considered complete only when:

1. It has been implemented.
2. It has been tested successfully.
3. Its actual result has been recorded.
4. Supporting evidence is available in the GitHub repository.

The team will prioritize a stable, testable application over adding new features.
