# Individual Evidence Receipt

**Student:** `prachi2061`
**Team:** 4 - CampusVibes
**Week:** 7, October 15-21, 2026
**Evidence reviewed:** 2026-10-20 (Asia/Seoul)

This receipt links existing October 16-18 implementation and verification records. It does not claim a new test run, an independent human test, or a timed rehearsal.

## Receipt 1: Core-Path Reliability

- **What I did:** Fixed browser Back/Forward navigation and gave all nine sample events distinct, consistent illustrative photos across Dashboard, Discover, Event Details and Saved.
- **Implementation:** [PR #75](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/pull/75), [navigation commit](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/commit/2fb26c403467712091b11249337306b5a5766ec6), [PR #77](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/pull/77), [event-image commit](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/commit/ede04c45efadf2d5e1e0d65d60ca64f642eae133).
- **How I checked it:** The [navigation verification](frontend/react-app/verification/browser-navigation.md) records eight desktop/mobile browser assertions. The [photo verification](frontend/react-app/verification/event-photographs.md) records a completed ten-check browser rerun and image/card/detail consistency checks. These are automated local demo checks, not independent teammate results or Firestore event-data tests.
- **What I learned or changed:** Stable navigation and inspectable event identity support the core path. Real photographs illustrate fictional sample events; they do not turn those records into live event listings.

## Receipt 2: Persistent Signed-In State

- **What I did:** Added account-backed profile edits, saved events, activity, earned badges, suggestion drafts and Assistant notebooks, including save acknowledgement, retry, account isolation and concurrent-save handling. Added persistent profile thumbnails and stable member IDs to distinguish same-name users.
- **Implementation:** [PR #89 - badge milestones](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/pull/89), [PR #91 - private account persistence](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/pull/91), [account regression commit](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/commit/0e4d5fb1d20da18144468414a6c94c67cc2a26a5), [PR #93 - photos and member identity](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/pull/93).
- **How I checked it:** The [account verification](frontend/react-app/verification/account-persistence.md) records 70 unit checks, 18 permission checks, 32 desktop/mobile demo checks and fresh-browser/offline/concurrent-save workflows. The [profile-photo verification](frontend/react-app/verification/profile-photos.md) records the same-name multi-account workflow. These are existing automated release results, not new October 20 tests.
- **What I learned or changed:** Signed-in data must be acknowledged by the server before being called saved. Guest/demo data stays local, and pending unsaved edits can still be lost on exit. These account documents do not provide a Firestore-backed Discover catalog.

## Receipt 3: Supporting Releases, Not Extra Demo Steps

- **What I did:** Implemented shared event suggestions with a review queue, bounded authenticated Feed-photo uploads, and optional Gemini conversations with privacy consent, request limits, labeled local fallback and greeting regressions.
- **Implementation:** [PR #78 - suggestions/review](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/pull/78), [PR #100 - shared Feed photos](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/pull/100), [PR #101 - Gemini](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/pull/101), [Gemini API commit](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/commit/c52a4913137f8693b5499064f0222de9701983c5), [PR #104 - greeting fix](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/pull/104).
- **How I checked it:** [Suggestion verification](frontend/react-app/verification/suggestions.md) records two-account review and privacy checks. [Real photo result](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/pull/100#issuecomment-6244372258) records an actual hosted upload/read/delete check. [Real Gemini result](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/pull/101#issuecomment-6244789898) records a general question and follow-up, distinct from mocked-provider browser tests. These are automated developer checks, not independent teammate rehearsal evidence.
- **What I learned or changed:** Free-tier provider quotas and user consent remain real limits. Suggestion approval does not publish into Discover. Assistant chat has no live campus/web search. Keep these features outside the frozen timed path.

Earlier shared Feed and accepted-friend Messages work is recorded in [PR #71](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/pull/71) and [PR #72](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/pull/72), merged October 14. Those are prior foundation work, not newly claimed Week 7 implementation.

## Independent Evidence and Midterm Boundary

- I owned/coordinated [Issue #53](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/issues/53); the [October 13 independent result](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/issues/53#issuecomment-6141158476) names DevyanaCT. [Tulseyy8848's desktop/mobile evidence](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/issues/53#issuecomment-6138295370) remains credited to that teammate. Neither record independently verifies the later releases above.
- The frozen path is Landing -> email/password login -> Dashboard -> Discover/Events -> search/filter -> select an event -> Event Details. My proposed speaking part is to explain the implementation and its data boundary; the team must still confirm speaker assignments in [Issue #74](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/issues/74).
- Events still come from the code-based sample catalog. [Issue #35](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/issues/35) remains open; real Authentication, account persistence, Feed/Messages, suggestions and Gemini do not resolve Firestore event loading.
- The final timed team rehearsal is not recorded. After a real run, Issue #74 must name the tester, date, device/browser and desktop/mobile view, elapsed time, expected/actual result, proof, remaining limitation and next action. Do not substitute these automated receipts for that rehearsal.
