# Candidate Google Sign In Follow Up

**Team:** 4, CampusVibes. **Class:** November 19, 2026. **Prepared:** November 20, 2026. **Due:** November 25, 2026, end of day Asia/Seoul.

**Tracking:** existing [#167](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/issues/167) and [#177](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/issues/177). **Status:** Week 11 hostname repair delivered; Week 12 non-author post-fix check NOT TESTED. This follows an existing failure and does not create a duplicate bug.

## Summary and evidence

On November 18, Ujjal reported that Google re-login on the exact candidate displayed "Google sign-in isn't configured for this website yet." The candidate hostname was absent from Firebase authorized domains. [PR #185](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/pull/185) records adding that hostname while preserving existing domains. Prachi later reported [overall manual PASS](../Week11/Evidence/prachi-google-manual-pass-2026-11-18.md) in normal Chrome. The separate automated-browser trust rejection and readiness timing failure retain their original scope in the [repair receipt](../Week11/Evidence/prachi-candidate-google-domain-2026-11-18.md).

## Priority and severity

| Field | Assessment |
|---|---|
| Original observed impact | Google re-login was unavailable on the pinned deployment; email/password provided another reported path |
| Severity assessment of that failure | **Major**: an important authentication method failed. This is an impact assessment of the Week 11 report, not a new Week 12 finding |
| Current work priority | **P1 - verification risk**: obtain a current non-author result before changing the auth readiness claim |
| Reason | The known hostname fault was repaired and has a user-reported manual pass; the selected peer retest is still outstanding |
| What changes the work order | New same-target evidence showing a confirmed failure, a genuine blocker, or a successful post-fix retest |

## Affected area and support

- Boundary: [Google login and session handling](../../frontend/apps.js), [Firebase client project](../../frontend/react-app/src/firebase.js) and Firebase Authentication authorized domains.
- [Current area map](../Week10/ai-use-and-code-ownership-audit.md#codebase-area-map); [existing roadmap](../Week11/Final%20demo%20road%20map.md).
- Coordinator/implementation support: `prachi2061`. Existing QA support: `ujjalpoudel75`. Availability for the new run is pending.
- **Independent authentication backup — `DevyanaCT`:** Available to support the Week 12 Google Sign-In peer retest if assigned. No additional candidate-specific verification result is claimed in this document.


## Reproduction and retest conditions

Use SHA `e5f1888aa4600ac2013d6bda34a55554ba68195f` and [its exact URL](https://campusvibe-fnh5f79me-campus-vibe.vercel.app/). Record normal-browser version, signed-in Google state and CampusVibes signed-out starting state. Follow G1-G6 in the [QA checklist](QA-Checklist.md).

**Expected:** the repaired candidate completes Google entry, session refresh, logout, re-login and safe cancellation/retry. **Week 12 actual:** not run. The original hostname omission must not be recreated in production merely to reproduce the old failure.

## Current and next proof

| Record | State |
|---|---|
| Week 11 expected/actual failure | [Ujjal's original report](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/issues/177#issuecomment-6969006762) |
| Configuration repair and readiness | [PR #185](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/pull/185), [dated receipt](../Week11/Evidence/prachi-candidate-google-domain-2026-11-18.md) |
| Later manual result | [Prachi's November 18 confirmation](../Week11/Evidence/prachi-google-manual-pass-2026-11-18.md), [receipt PR #186](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/pull/186) |
| Week 12 peer expected/actual and redacted proof | Pending actual execution in [peer notes](Peer-Test-Notes.md) |

## Disposition rules and next action

1. **Mismatch reproduced:** retain the old and new proof, repeat safely once, then update the existing issue with the actual diagnosis, severity, priority reason and smallest fix/retest.
2. **Flow succeeds under the same stated conditions:** record a scoped post-fix authentication retest with the repair link. Broader app/data/provider claims keep their own evidence.
3. **Original failure merely not reproduced or setup differs:** retain the original report and name the next discriminating check; do not infer a verified fix.
4. **Check blocked:** identify the exact blocker, owner and next check. Google rejecting an automation-controlled browser is a test-setup limitation until normal-browser evidence establishes an application mismatch.

**Next action:** Prachi coordinates a non-author run; Ujjal is proposed through the existing QA role. Record the actual result and issue disposition by **November 25, 2026 EOD KST**. No new code fix or genuine Week 12 blocker is established by this preparation.
