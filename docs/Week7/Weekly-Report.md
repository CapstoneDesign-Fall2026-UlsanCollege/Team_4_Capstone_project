# Weekly Report

**Team:** 4  
**Week:** 7  
**Date:** 2026/10/16

## This week's goal

Improve CampusVibes' readiness for the midterm demonstration by verifying the current user journey, rehearsing the deployed website, recording actual test results and individual contributions, and clearly documenting the remaining Firestore limitation.

## What we committed to do

- [x] Test the Events → Event Details flow with a teammate and record the successful result.
- [x] Complete the independent deployed-demo rehearsal across desktop and mobile and record the results.
- [x] Test the empty-search/no-events behavior and record the result.
- [ ] Verify Firestore event-data loading and document the actual result without claiming unverified functionality.

## Evidence links

| Evidence | Link |
|---|---|
| Issue(s) | [Issue #64 — Events → Event Details test after updates](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/issues/64) · [Issue #53 — Independent demo rehearsal](https://github.com/Capstone-Design-Team-4/Team_4_Capstone_project/issues/53) [Issue #70 - Test Empty Search / No-Events State](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/issues/70)|
| PR(s) / commits | `2a240ff`, `d82a4b6`, `37be8f4` — [View repository commits](https://github.com/Capstone-Design-Team-4/Team_4_Capstone_project/commits) |
| Screenshot / demo | [Evidence link](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/tree/c559945d2d721dd4e1b57ac895448717b714c7d5/docs/Week6/evidence) |
| Test/check note | [Retested-by-note](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/blob/bc14dc96bbbb9555f246bb9a7f8f1e8a93f2d3ab/docs/Week6/Retested-by-note.md)[Demo-tested-by-note](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/blob/bc14dc96bbbb9555f246bb9a7f8f1e8a93f2d3ab/docs/Week6/evidence/Tested-by-note.md) — independent deployed-demo rehearsal. |
|Deployment| [Deployment](https://campusvibe-theta.vercel.app/) |
| Document update | Link this Week 7 report in the team's repository after committing it. |

## References Links
[Design-doc-v1](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/blob/bc14dc96bbbb9555f246bb9a7f8f1e8a93f2d3ab/docs/Week2/design-doc.md)
[Chuseok-checkpoint](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/blob/c559945d2d721dd4e1b57ac895448717b714c7d5/docs/week-4/week-03/chuseok-checkpoint.md)


## Individual contribution entries — one row per student

Each student must confirm their own row and attach evidence of their actual work.

| Student | What they did | Evidence link |
|---|---|---|
| Prachi2061 |  |   |
| DevyanaCT |   |   |
| Ujjalpoudel75 |    |   |
| Tulseyy8848 |   |   |

## Blockers or risks

| Blocker/risk | Owner | Next action |
|---|---|---|
| Firestore event-data loading has not been verified; the Events page currently uses code-based sample data. | Tulseyy8848 — confirm ownership against the relevant issue | Verify Firestore access and event retrieval, record the actual result, and update the issue. Until then, describe the Events feature as sample-data-based. |

## Decision record

| Decision | Why we chose it | Owner | Evidence / Issue link |
|---|---|---|---|
| Keep the Firestore limitation explicit in the presentation and report. | The current Events page uses code-based sample data; Firestore event loading must be verified before claiming it works. | Confirm with the team | [Issue #49](https://github.com/Capstone-Design-Team-4/Team_4_Capstone_project/issues/49) , [issue 35](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/issues/35) |

## Next week's bridge task

- Rehearse the final midterm demo using the frozen scope: landing page, account creation/login, dashboard, event discovery, search/filtering, and event details.
- Verify Firestore event loading if access is available; otherwise, retain the documented limitation.
- Ensure every student has one contribution entry with at least one working evidence link.
- Fix only critical demonstration issues and prepare a clear explanation of what works now versus what remains unfinished.
