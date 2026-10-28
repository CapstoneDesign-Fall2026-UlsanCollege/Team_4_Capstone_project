# Week 8 Feedback Evidence Audit

**Owner:** `prachi2061` - Codex-assisted source/document review.
**Reviewed:** 2026-10-28 (Asia/Seoul).
**Repository baseline:** [a819ebc3dc47708237920b12d065d69929685ee6](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/commit/a819ebc3dc47708237920b12d065d69929685ee6).

This is new documentation review, not a new browser test, independent teammate result, measured presentation or Firestore retrieval test. Earlier implementations and tests retain their original dates and authors.

## What Was Already Done

| Record inspected | What it supports | What it does not establish |
|---|---|---|
| [October 22 rehearsal record](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/issues/74#issuecomment-6330730005) by DevyanaCT | Reports a completed rehearsal and names DevyanaCT, tulseyy8848, ujjalpoudel75 and prachi2061. The edited record now says duration not recorded and detailed outcome not formally recorded; those boxes are unchecked. | A measured duration, exact expected/actual result, device/view or failure follow-up. Do not reconstruct them from memory or automation. |
| [October 27 screenshot comment](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/issues/74#issuecomment-6433579630) by DevyanaCT | Provides seven linked supporting images and explicitly repeats the missing duration/outcome. | A stopwatch measurement or a verified live database path. Images were not used to infer unrecorded results in this review. |
| [Week 8 lessons](../IndividualLessonsAndProof.md) at the baseline above | DevyanaCT, tulseyy8848 and ujjalpoudel75 already supplied entries. Prachi's entry was still a placeholder. | A need to write or duplicate the other students' personal reflections. |
| [October 20 technical check](../../Week7/Evidence/core-path-2026-10-20/check-note.md) | Dated Codex-assisted production core, empty-search recovery and injected login failure/retry checks; desktop and mobile viewport. | A physical-phone test, new October 28 run, narrated team duration or Firestore Event retrieval. |

The professor's feedback described older placeholders and missing screenshot evidence. The current comments have since corrected those points. Preserve those corrections; the measured-result gap is still real.

## Current Data Boundary

At the reviewed revision, [App.jsx](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/blob/a819ebc3dc47708237920b12d065d69929685ee6/frontend/react-app/src/App.jsx#L65) imports [frontend/events.json](../../../frontend/events.json), then [injects that catalog into the Events scripts](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/blob/a819ebc3dc47708237920b12d065d69929685ee6/frontend/react-app/src/App.jsx#L196). This is a source trace, not an assertion that Firestore was exercised.

**Current Events page:** code-based sample data. **Firestore event loading:** unverified, tracked in open [Issue #35](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/issues/35). Working Firebase Authentication, private account state, social data or Gemini do not prove that Events reads Firestore records. Database-backed seeded records would also need to be labeled as test data, not real campus announcements.

## Remaining Evidence and Next Action

1. **Measured rehearsal - Team 4 via [Issue #74](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/issues/74):** run a short narrated replacement from the signed-out production start. Record the actual named tester/speakers, date/time, browser/device and view, timer start/end and elapsed duration, expected/actual outcome, issues encountered, exact proof links, sample-data limitation and named next action. Keep this unverified until the real result exists; do not reuse the 6.596 s / 3.985 s automation timings.
2. **Data verification - existing Issue #35 owner:** the issue names `Tulsey8848`; the current account is `tulseyy8848`. Preserve that owner pending team confirmation. `prachi2061` owns the source-trace/acceptance-check handoff, not a fabricated completed retrieval test.
3. **Scope decision - Team 4:** retain Landing -> Login -> Dashboard -> Discover/Events -> Search/Filters -> Event Details as the core. Assistant, social/Messages, Profile, Suggestions, badges, photos and theme behavior remain extensions with separate release evidence.

**MVP assessment:** GAP, not met/exceeded for live event-data delivery. The sample-data core has historical technical evidence; database Event retrieval and a verifiable timed presentation are separate outstanding checks. No application behavior, billing, production records or teammate-authored issue comments changed during this audit.
