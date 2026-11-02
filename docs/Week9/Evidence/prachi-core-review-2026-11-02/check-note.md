# Week 9 core-path evidence review — prachi2061

**Review date:** 2026-11-02, Asia/Seoul.  
**Owner:** `prachi2061`; Codex-assisted Playwright execution and documentation.  
**Website:** [Production CampusVibes](https://campusvibe-theta.vercel.app/).  
**Entry used:** **Explore events / guest demo**, with Firebase `currentUser === null`.

This is a fresh, read-only navigation check. It is not independent teammate testing, a completed Firebase login, a physical-phone test, or a timed/narrated team rehearsal. No account was created and no shared data was submitted.

## Expected and actual results

| Check | Expected result | Actual result | Status |
|---|---|---|---|
| Landing | Sign-in landing is visible. | Visible in both browser contexts. | PASS |
| Guest entry | Explore events opens Discover while Firebase remains signed out. | Discover opened; `currentUser` was null. | PASS |
| Dashboard | Community navigation opens Dashboard. | Dashboard visible on both views. | PASS |
| Discover/search/filter | Tech + HackNight returns one matching sample event. | Exactly HackNight: Build-a-Thon was returned. | PASS |
| Event details | Selected event shows its listed venue, time, host and description. | Innovation Lab, Bldg 7; 6:00 PM; Code Collective; expected description visible. Close returned to Discover. | PASS |
| Empty-state recovery | Unmatched search gives no events; Clear filters restores the catalog. | Empty state visible with zero cards; all nine sample events returned after clearing. | PASS |

**Total:** 6 checks × 2 fresh contexts = **12 passed**. No uncaught page errors were observed. These counts describe automated checks, not human rehearsal time.

| Environment | Details | Empty search |
|---|---|---|
| Chrome desktop viewport, 1440 × 900 | [Screenshot](desktop-details.png) | [Screenshot](desktop-empty-search.png) |
| Chrome mobile viewport, 390 × 844 | [Screenshot](mobile-details.png) | [Screenshot](mobile-empty-search.png) |

[Raw results](results.json) include the execution timestamp, browser version, expected/actual step results, viewports and observed production asset URLs. The checkout reference was `78b2ada25942e95276daf4b98fac551e711c5b85`; this is not an attestation of the exact deployed Git revision. Observed runtime asset URLs did not change during each check.

## Authentication and data boundary

- **Current email/password login:** NOT TESTED in this run. The [October 20 technical check](../../../Week7/Evidence/core-path-2026-10-20/check-note.md) records an earlier successful email/password core path; it must not be relabelled as a fresh run.
- **Google provider-page readiness:** PASS in the separate [November 2 domain-repair receipt](../../../../frontend/react-app/verification/google-signin-domain/results.json). No Google identity was selected. Completed Google authentication and session restoration remain NOT TESTED.
- **Password reset:** NOT TESTED here. The form/dashboard images in [Issue #116](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/issues/116#issuecomment-6559100739) do not establish email receipt, password change and login with the changed password.
- **Firestore Events:** NOT TESTED. The checked catalog contains code-based sample events. Firebase Authentication and account/social persistence do not verify Firestore Event loading.
- **Independent/local setup evidence:** [tulseyy8848's October 31 receipt](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/issues/118#issuecomment-6539563367) is a separate reported local-backup test. This run did not repeat a clean install or that person's test.

## Repeat and next action

Repeat the six steps above in a fresh browser context on the stated URL. Existing [event smoke checks](../../../../frontend/react-app/tests/smoke/events.spec.js) also cover guest event details and empty-search recovery on a local preview. The current [README setup recipe](../../../../README.md#quick-start) supplies local backup commands; it is an instruction, not evidence that another setup trial occurred.

Before Wednesday, November 4, the named human tester should record the login method, device/browser, expected/actual outcome, screenshots and session reload result for Login → Dashboard → Discover/search → Event Details. Keep Google-account completion, full password reset and Firestore Event loading separately marked until those receipts exist. Maps, notifications, RSVP and social behavior remain outside this check and the frozen core promise.
