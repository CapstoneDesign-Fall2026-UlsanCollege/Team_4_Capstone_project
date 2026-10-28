# Week 9 MVP and Evidence Handoff

**Prepared by:** `prachi2061`, 2026-10-28 (Asia/Seoul).
**Status:** follow-up proposal for Team 4's October 29 scope review, not a newly approved MVP contract or a completed test.
**Tracking:** existing [Issue #35](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/issues/35) for Event data; [Issue #74](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/issues/74) for rehearsal evidence and scope. No duplicate issue is needed.

## Current Decision

**MVP status: GAP.** The [Week 8 report](./Weekly-Report.md#mvp-status) records the same assessment. The sample-data discovery path has historical technical and teammate evidence; Firestore Event loading remains unverified. A database-backed fixture would prove retrieval, not the authenticity of campus announcements. The missing measured team rehearsal is a separate evidence gap, not an observed application failure.

Keep the frozen path: Landing -> email/password Login -> Dashboard -> Discover/Events -> Search/Filters -> Event Details. Keep Assistant/Gemini, social/Messages, Profile, Suggestions, badges, photos, theme behavior and the unverified organisation/submission workflow outside this core. Do not delete working extensions or promise new ones in this handoff.

The [original design](../Week2/design-doc.md) also includes club discovery. Team 4 must explicitly accept/defer that requirement in its Week 9 contract; a narrowed event demo alone is not evidence that the original broader MVP is complete. Use the [Week 9 course guidance](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/course-materials/blob/main/student-week-one-pagers/week-09-2026-10-29-mvp-contract-scope-cut.md) and [MVP contract template](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/course-materials/blob/main/student-starter-kit/templates/mvp-contract.md) for that team decision.

## Named Next Actions

| Action | Owner / boundary | Required result |
|---|---|---|
| Trace the current catalog source and prepare the Event retrieval acceptance check in Issue #35. | `prachi2061` owns this handoff and its evidence follow-up; the [source trace](./Evidence/feedback-audit-2026-10-28.md#current-data-boundary) is documented, not a live test. | Post the check below to the existing issue; coordinate implementation/access with its owner and retain the actual result or blocker. |
| Implement/verify Event retrieval with authorized project access. | Issue #35 names `Tulsey8848`, mapped to current login `tulseyy8848`; existing assignees remain unchanged. Implementation owner confirmation is still required from the team. | Identifiable database record reaches Discover and Event Details, or the precise blocker and named next action are recorded. |
| Close the measured-rehearsal evidence gap. | `prachi2061` coordinates through Issue #74; Team 4 must name the actual human tester/speakers and arrange the replacement run. | Signed-out starting state, date/time, browser/device/view, measured duration, expected/actual outcome, issues, proof links, limitation and follow-up owner. Do not claim this run has happened. |

**Review point:** October 29 class scope discussion. Actual run time, tester and implementation ownership still require team agreement; this date is a proposed review checkpoint, not a fabricated test appointment.

## Proposed Firestore Acceptance Check

- [ ] With authorized access, identify one non-sensitive test Event document, its collection/document ID and the tested code/deployment revision. Keep seeded content explicitly labeled as test data; do not publish credentials or student data.
- [ ] Open the signed-out production start and log in through the visible email/password form. Follow Dashboard -> Discover -> Search/Filters -> Event Details. Record browser/device/view and actual date/time.
- [ ] Verify a distinctive title, category, date/time, venue and description from that exact document appear in the UI. Link a sanitized read/result log and UI proof tying the same document ID to the rendered record. Source code, a configuration screenshot or a JSON sample alone is insufficient.
- [ ] Record an authorized empty-result case and denied/offline failure behavior in a safe test environment. The UI must not silently substitute sample events and present them as database results. Do not weaken production permissions to make the test pass.
- [ ] Record PASS, FAIL or BLOCKED in Issue #35, including expected/actual result, exact proof, remaining data-provenance limit, owner and next action. Leave it unresolved until implementation and actual retrieval evidence support its criteria. Clean up test fixtures with the owner.

None of these test boxes is completed by this documentation update. If testing is blocked, report whether access, implementation, rules/indexes or another dependency is missing; do not turn a plan into a pass.

## Top Risks and Scope Gate

| Risk | Mitigation / owner |
|---|---|
| Sample event data mistaken for live Firestore/campus data. | `prachi2061` maintains the claim boundary; existing Issue #35 owner supplies the retrieval/provenance result. |
| Rehearsal screenshots mistaken for a measured result. | Team 4 records a real replacement run in Issue #74; `prachi2061` coordinates the missing fields. |
| More extensions displace the core and original MVP decision. | Team 4 agrees the finish/cut list and club requirement before adding scope; retain separate release receipts for extensions. |

**Before declaring the data gap resolved:** require the recorded database-to-UI result, not automated sample navigation, working Auth, social/account persistence or feature count. If the team deliberately chooses a curated sample-only MVP, record that changed contract explicitly and retain the sample label; do not describe that decision as a successful Firestore test.
