# Event Maps - Delivery, Bug and Test Receipt

**Owner:** `prachi2061`, with Codex-assisted implementation, test execution and review.
**Follow-up:** 2026-10-30 (Asia/Seoul). Automated local demo checks, not independent teammate testing or a narrated rehearsal.

## Delivery and Commit Links

The delivered feature is recorded in [Issue #113](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/issues/113) and merged [PR #112](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/pull/112):

- [URL/data validation and unit tests](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/commit/18a00a09fdc3cd8157a20f58133da46e40ef25d3).
- [Discover/Saved/Dashboard integration and button styling](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/commit/0cd265c070e586b29db9d582f684eb20facdad6f).
- [Original desktop/mobile regressions](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/commit/12c2938caf2d56ac7bcc3d8c1fddfb93145323a8).

Every current event has a Google Maps venue search. Organizer-provided `mapLocation.address` or valid numeric `latitude`/`longitude` additionally enables directions. Links open in a separate tab and no automatic Maps request, API key or device-location prompt is added. This is external map access, not an embedded map or verified live Event data.

## Retrospective Bug - Already Fixed Before Release

[Issue #114](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/issues/114) records the pre-release Open map text-contrast defect. The rejected `background: var(--card)` declaration inherited a dark base surface while the light theme supplied dark text. Local screenshot review caught it before the first UI integration commit. The existing fix uses a transparent surface and theme-aware text; PR #112 did not ship the rejected declaration.

The original failing screenshot was not retained as a repository artifact. The new test deliberately reconstructs that declaration in a local browser, captures it, removes it and verifies the existing fix. **Before images below are reconstructed local fixtures, not historical production screenshots.** No production bug or fresh application fix is claimed by this evidence update.

| Viewport | Reconstructed Before | Current Button |
|---|---|---|
| Desktop 1440 x 900 | [Reconstruction](event-maps/desktop-before-reconstruction.png) | [Current](event-maps/desktop-after.png) |
| Mobile viewport 390 x 844 | [Reconstruction](event-maps/mobile-before-reconstruction.png) | [Current](event-maps/mobile-after.png) |

The [WCAG text-contrast criterion](https://www.w3.org/WAI/WCAG22/Understanding/contrast-minimum.html) supplies the 4.5:1 threshold for this small label. The regression measures computed foreground/effective solid background colors. It is not a full-site accessibility assessment. Both viewport runs measured the following ratios; assertions use the unrounded values in [results.json](event-maps/results.json):

| State | Ratio | Result |
|---|---:|---|
| Reconstructed pre-release background | 1.163:1 | Below threshold, as expected for the reproduction |
| Current light / focused | 15.704:1 | Pass |
| Current light hover | 4.876:1 | Pass |
| Current dark | 14.385:1 | Pass |
| Current dark hover | 10.074:1 | Pass |

## Fresh Verification

- **9 unit tests passed:** all nine venue queries, supplied address/pin priority, zero/boundary coordinates, malformed/missing/overlong data and safe query encoding. [Actual TAP output](event-maps/unit-results.txt).
- **18 browser tests passed:** Chrome on desktop and mobile viewport; map links for all nine events, separate-tab destination, no Maps request before a click, Saved/Dashboard entry points, address fixtures, HTML-as-text rendering, keyboard focus/Escape, dark mode and measured contrast. Existing event-details, empty-search recovery, photo and history-navigation checks also passed.
- Browser-suite start: `2026-10-30T14:16:28.284Z`, or 23:16:28 KST; duration approximately 76.96 seconds. This is automated suite time, not a team presentation duration. Exact timings, browser version, viewport sizes, color measurements and test-file hash are in [the generated result](event-maps/results.json).
- Application source: [580176a421ec65f86acdcdc6576b7b2a2ebe0940](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/commit/580176a421ec65f86acdcdc6576b7b2a2ebe0940). Contrast regression: [6d7219c59313c84ae9d811f24e9356f4ecec40f6](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/commit/6d7219c59313c84ae9d811f24e9356f4ecec40f6). Production code is unchanged in this follow-up.
- The original release build passed with the existing bundle-size warning, as recorded in PR #112. This test/evidence-only follow-up does not claim another build or production workflow run.

From `frontend/react-app`, repeat with local Chrome installed:

```powershell
node --test tests/event-maps.test.js
$env:SMOKE_BROWSER_CHANNEL='chrome'
npx playwright test tests/smoke/event-maps.spec.js tests/smoke/events.spec.js tests/smoke/event-photos.spec.js tests/smoke/navigation.spec.js
```

## Limits and Non-Bug Follow-Up

The nine current venues are sample names without confirmed addresses. Maps URLs are checked, but Google Maps popup responses are intercepted by the tests: no real venue, actual directions route or live provider response is verified. The address and malicious-text values are synthetic browser fixtures. Mobile is a viewport, not a physical-device check. No GPS prompt, production record or billing change was made.

The initial all-venues test retained the demo's default Tech filter; choosing All corrected the test setup. That was not a product bug and has no duplicate bug report. Missing real venue addresses are a known data limitation, not a new regression. Existing [Issue #35](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/issues/35) and [Issue #36](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/issues/36) remain the Event-data/provenance trackers. This work does not resolve them, change the MVP contract, or edit teammates' documents and rehearsal records.
