# Weekly Report

**Team:** 4  
**Week:** 7  
**Date:** 2026/10/16

**Evidence reviewed:** 2026-10-20

## This week's goal

Improve CampusVibes' readiness for the midterm demonstration by verifying the current user journey, rehearsing the deployed website, recording actual test results and individual contributions, and clearly documenting the remaining Firestore limitation.

## What we committed to do

- [x] Test the Events → Event Details flow with a teammate and record the successful result.
- [x] Complete the independent deployed-demo rehearsal across desktop and mobile and record the results.
- [x] Test the empty-search/no-events behavior and record the result.
- [x] Document firestore limitations.

## Lessons Learned

### Course Lesson

**Lesson:** We learned that testing and documenting actual results are important in software development. Implementing a feature does not automatically prove that it works; we need test evidence to support our claims.

**Evidence:** [Issue #64 — Events → Event Details Retest](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/issues/64) and [Issue #53 — Independent Deployed-Demo Rehearsal](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/issues/53).

### Project Lesson

**Lesson:** We learned that CampusVibes should prioritize a reliable core user journey before expanding supporting features. We must also distinguish code-based sample event data from verified Firestore event loading. The current Events page uses code-based sample data, and Firestore event loading remains unverified.

**Evidence:** [Issue #64 — Events → Event Details Retest](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/issues/64) and [Issue #35 — Firestore Limitation](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/issues/35).

## Evidence links

| Evidence | Link |
|---|---|
| Events → Event Details retest | [Issue #64](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/issues/64) |
| Independent deployed-demo rehearsal | [Issue #53](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/issues/53) |
| Empty-search/no-events test | [Issue #70](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/issues/70) |
| Theme-toggle code | [Theme-toggle commit](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/commit/108d8b69181859d4c1ff2d6e049b26d353f9a094) |
| Theme-toggle visual evidence | [Theme-toggle-evidence](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/blob/main/docs/Week7/Evidence/theme-toggle.md) |
| PR(s) / commits | [PR #75 - browser navigation](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/pull/75) · [PR #77 - event images](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/pull/77) · [Navigation fix commit](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/commit/2fb26c403467712091b11249337306b5a5766ec6) |
| Screenshot / demo | [Evidence link](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/tree/c559945d2d721dd4e1b57ac895448717b714c7d5/docs/Week6/evidence) |
| Test/check note | [Retested-by-note](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/blob/bc14dc96bbbb9555f246bb9a7f8f1e8a93f2d3ab/docs/Week6/Retested-by-note.md) [Demo-tested-by-note](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/blob/bc14dc96bbbb9555f246bb9a7f8f1e8a93f2d3ab/docs/Week6/evidence/Tested-by-note.md) |
|Deployment| [Deployment](https://campusvibe-theta.vercel.app/) |
| Team-agreement | [Team-agreement](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/blob/e1a1fb2c7e2c40bd98bd4ea4e362762f8cbf046e/docs/Week1/team_agrement.md) |
| Sprint1 Quality check | [sprint-quality-quick-check](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/blob/5672689bb30aa48d1cd88c0c269d0640bf592145/docs/Week7/sprint-quality-quick-checks.md) |
| Work Checklist | [Week7 Work Checklist](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/blob/5672689bb30aa48d1cd88c0c269d0640bf592145/docs/Week7/week7-work.checklist.md) |
| Midterm demo preparation | [Preparation issue](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/issues/74) |
| Document update | [Week 7 report](./Weekly-Report.md) · [Prachi's individual evidence receipt](./Evidence/evidence-receipt-prachi2061.md) · [DevyanaCT's individual evidence receipt](./Evidence/evidence-receipt-devyanact.md) | 
| October 20 production core/fallback check | [Automated check note, timings and proof](./Evidence/core-path-2026-10-20/check-note.md) - not the narrated team rehearsal |

The independent rehearsal in Issue #53 was recorded on October 13. It does not independently verify the extensions released on October 16-18. Their PRs contain separately labeled automated checks. A final timed team rehearsal is still pending in Issue #74; no new rehearsal is claimed by this documentation update.

## References Links
[Design-doc-v1](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/blob/bc14dc96bbbb9555f246bb9a7f8f1e8a93f2d3ab/docs/Week2/design-doc.md)
[Chuseok-checkpoint](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/blob/c559945d2d721dd4e1b57ac895448717b714c7d5/docs/week-4/week-03/chuseok-checkpoint.md)


## Individual contribution entries — one row per student

Each student must confirm their own row and attach evidence of their actual work.

| Student | What they did | Evidence link |
|---|---|---|
| prachi2061 | Fixed browser navigation and sample-event imagery; implemented signed-in account persistence, profile photos/badges, shared suggestions/photos, and optional Gemini with regression coverage. Linked the independent rehearsal evidence while keeping author-run automation separate from teammate testing. Core-path reliability is the midterm priority; the added features remain extensions. | [Individual receipt and exact commits](./Evidence/evidence-receipt-prachi2061.md) · [PR #75](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/pull/75) · [PR #77](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/pull/77) · [Independent tester's result](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/issues/53#issuecomment-6141158476) |
| DevyanaCT | Independently tested and retested the Events → Event Details flow and recorded the test results. Added a light/dark theme toggle. Verified the deployed CampusVibes demo across desktop and mobile and contributed testing evidence for midterm preparation. | [Issue #64 — Events → Event Details retest](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/issues/64) · [Issue #63 — Independent demo retest](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/issues/63) · [Theme-toggle code change](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/commit/108d8b69181859d4c1ff2d6e049b26d353f9a094) · [Theme-toggle evidence](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/blob/main/docs/Week7/Evidence/theme-toggle.md) · [Week 7 individual evidence receipt](./Evidence/evidence-receipt-devyanact.md) |
| Ujjalpoudel75 |  Tested the empty-search/no-events behavior on the deployed CampusVibes website and confirmed that searches without matching events displayed appropriate feedback without errors (Issue #70). Previously created and documented the Search Events and Clubs requirements, including keyword searching and result navigation (Issue #13, closed). Also created the Events Organisation Dashboard and Event Submission requirements (Issue #15, open). The full organisation/submission workflow remains a post-midterm extension and is not included in the frozen midterm demo path |  [Issue #70 - Empty Search Test](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/issues/70) · [Issue #13 - Search Events and Clubs](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/issues/13) · [Issue #15 - Event Submission](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/issues/15) · [Individual Evidence Receipt](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/blob/main/docs/Week7/Evidence/evidence-receipt-ujjalpoudel75.md)|
| Tulseyy8848 | Independently tested the deployed CampusVibes demo as a non-UI-author; verified the demo student flow, Discover event search and filtering, saving events, Saved page, Profile, and Assistant suggestions; recorded test results and reported findings for desktop and mobile testing. | docs/Week7/Evidence/evidence-recepit-tulasha.md, [Issue #53](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/issues/53), [Issue #49](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/issues/49) |

### Current Receipt and Speaker Follow-Up

All four report rows are populated, but only one dedicated Week 7 receipt is linked. Existing issue results are evidence, not a substitute for each student's own receipt and explanation. The other students must confirm their entries; this audit does not write their personal receipts for them.

| Current login | Visible evidence / receipt status | Concrete next action before the October 21 freeze |
|---|---|---|
| `prachi2061` | [Week 7 receipt](./Evidence/evidence-receipt-prachi2061.md) linked; [October 20 technical run](./Evidence/core-path-2026-10-20/check-note.md) is Codex-assisted automation, not an independent human rehearsal. | Confirm the proposed implementation/data-boundary speaking part with the team and participate in the timed run. |
| `DevyanaCT` | [Event retest #64](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/issues/64), [theme-toggle evidence](./Evidence/theme-toggle.md), and [Week 7 individual evidence receipt](./Evidence/evidence-receipt-devyanact.md). | Confirm the receipt accurately describes my work, testing method, actual results, and one learning; confirm my speaking part. Theme behavior stays outside the timed core path. |
| `ujjalpoudel75` | [Your empty-search result #70](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/issues/70) visible; dedicated Week 7 receipt not yet linked. | Confirm that your row matches your own performed checks, add your receipt and agree your speaking part. Do not count unverified organisation/submission work as a delivered core feature. |
| `tulseyy8848` | [Your desktop/mobile evidence in #53](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/issues/53#issuecomment-6138295370) visible; dedicated Week 7 receipt not yet linked. | Add your own receipt, confirm your role, and help Team 4 record the actual timed run and Firestore limitation in #74. |

## Blockers or risks

| Blocker/risk | Owner | Next action |
|---|---|---|
| Firestore event-data loading has not been verified; the Events page currently uses code-based sample data. | Tulseyy8848 — confirm ownership against the relevant issue | Verify Firestore access and event retrieval, record the actual result, and update the issue. Until then, describe the Events feature as sample-data-based. |

## Decision record

| Decision | Why we chose it | Owner | Evidence / Issue link |
|---|---|---|---|
| Keep the Firestore limitation explicit in the presentation and report. | The Events page currently uses code-based sample data. Firestore event loading has not been verified, so we must not claim that event data is loaded from Firestore. | prachi2061 | [Issue #35](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/issues/35) |
| Freeze the main midterm demo scope around the tested user journey. | Focusing on the core journey makes the demonstration clear, manageable, and supported by existing test evidence. | Team 4 | [Midterm preparation issue #74](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/issues/74) |
| MVP decision | Keep the MVP focused on the tested core user journey: Landing Page → Login → Dashboard → Discover/Events → Search/Filters → Event Details. Supporting features remain secondary until the core path and data boundary are settled. | Team 4 | [Issue #74 — Midterm Preparation](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/issues/74) · [Issue #35 — Firestore Limitation](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/issues/35) |
| Treat Saved Events, Profile, Assistant, Suggestions, social features, badges/photos, and the light/dark theme toggle as supporting features outside the frozen timed path. | Mention extensions after the core flow using their own release evidence; do not treat the October 13 rehearsal as verification of later releases. No new features are required for the midterm. | Team 4 | [Midterm scope - Issue #74](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/issues/74) · [Extension receipts](./Evidence/evidence-receipt-prachi2061.md) · [Theme-toggle evidence](./Evidence/theme-toggle.md) |

**Frozen timed path:** Landing page → email/password login → dashboard → Discover/Events → search/filter → select an event → Event Details. State that the event catalog is code-based sample data; real account, social, or AI services do not resolve Issue #35.

## Next week's bridge task

- **MVP/core-path action — Owner: Team 4.** Keep the frozen user journey as the MVP and address only critical demonstration issues. Record any changes and supporting evidence in Issue #74.
- **Firestore verification — Owner: Tulseyy8848, pending team confirmation.** Verify Firestore access and event retrieval if access is available. Record the actual result and evidence in Issue #35. If verification is blocked, document the blocker and next step. Until verified, continue to describe the Events page as using code-based sample data.
- Ensure every student has one contribution entry with at least one working evidence link.
