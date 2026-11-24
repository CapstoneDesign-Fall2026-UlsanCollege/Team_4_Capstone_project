# Candidate Google Sign In Follow Up

**Team:** 4, CampusVibes. **Class:** November 19, 2026. **Prepared:** November 20, 2026. **Due:** November 25, 2026, end of day Asia/Seoul.

**Tracking:** existing [#167](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/issues/167) and [#177](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/issues/177). **Status:** Week 11 hostname repair delivered; Week 12 targeted manual post-fix retests completed on the named candidate: 6 PASS, 0 reported FAIL by `ujjalpoudel75` and 6 PASS, 0 FAIL by `tulseyy8848`. The carried authentication P1 is cleared for G1–G6; final whole-MVP approval remains pending. This follows an existing failure and does not create a duplicate bug.

## Summary and evidence

On November 18, Ujjal reported that Google re-login on the exact candidate displayed "Google sign-in isn't configured for this website yet." The candidate hostname was absent from Firebase authorized domains. [PR #185](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/pull/185) records adding that hostname while preserving existing domains. Prachi later reported [overall manual PASS](../Week11/Evidence/prachi-google-manual-pass-2026-11-18.md) in normal Chrome. The separate automated-browser trust rejection and readiness timing failure retain their original scope in the [repair receipt](../Week11/Evidence/prachi-candidate-google-domain-2026-11-18.md).

## Priority and severity

| Field | Assessment |
|---|---|
| Original observed impact | Google re-login was unavailable on the pinned deployment; email/password provided another reported path |
| Severity assessment of that failure | **Major**: an important authentication method failed. This is an impact assessment of the Week 11 report, not a new Week 12 finding |
| Current work priority | **Carried authentication P1 cleared for G1–G6**. Remaining metadata/proof clarification is P2; the separate final-MVP decision remains P1 in #177 |
| Reason | Two named November 23 testers report complete post-repair G1–G6 passes on `e5f1888`; no new authentication mismatch is reported. Do not infer whole-MVP approval |
| What changes the work order | Reassess if a new candidate mismatch or an unaccepted mandatory condition appears. Preserve evidence limitations; do not silently waive them |

## Affected area and support

- Boundary: [Google login and session handling](../../frontend/apps.js), [Firebase client project](../../frontend/react-app/src/firebase.js) and Firebase Authentication authorized domains.
- [Current area map](../Week10/ai-use-and-code-ownership-audit.md#codebase-area-map); [existing roadmap](../Week11/Final%20demo%20road%20map.md).
- Coordinator/implementation support: `prachi2061`. Primary QA `ujjalpoudel75` and independent tester `tulseyy8848` have recorded their November 23 retests. Their browser-version/timing/evidence clarification remains owned by the respective testers.
- **Independent authentication backup — `DevyanaCT`:** Available to support the Week 12 Google Sign-In peer retest if assigned. No additional candidate-specific verification result is claimed in this document.


## Reproduction and retest conditions

Use SHA `e5f1888aa4600ac2013d6bda34a55554ba68195f` and [its exact URL](https://campusvibe-fnh5f79me-campus-vibe.vercel.app/). Record normal-browser version, signed-in Google state and CampusVibes signed-out starting state. Follow G1-G6 in the [QA checklist](QA-Checklist.md).

**Expected:** the repaired candidate completes Google entry, session refresh, logout, re-login and safe cancellation/retry. **Week 12 actual:** both named testers report all six targeted checks PASS on the exact candidate after the repair; see their linked final records below. Browser versions were not recorded and popup recovery duration was not measured. The original hostname omission must not be recreated in production merely to reproduce the old failure.

## Current and next proof

| Record | State |
|---|---|
| Week 11 expected/actual failure | [Ujjal's original report](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/issues/177#issuecomment-6969006762) |
| Configuration repair and readiness | [PR #185](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/pull/185), [dated receipt](../Week11/Evidence/prachi-candidate-google-domain-2026-11-18.md) |
| Later manual result | [Prachi's November 18 confirmation](../Week11/Evidence/prachi-google-manual-pass-2026-11-18.md), [receipt PR #186](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/pull/186) |
| Week 12 primary-QA final expected/actual | [Ujjal's completed G1–G6 handoff](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/issues/177#issuecomment-7089214038), [updated evidence notice](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/issues/167#issuecomment-7089661715), and [peer notes](Peer-Test-Notes.md): 6 PASS, 0 reported FAIL |
| Week 12 independent result | [Tulseyy's candidate retest](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/issues/177#issuecomment-7082833689): 6 PASS, 0 FAIL |
| Supporting screenshot scope | The unambiguous retest subset identifies G1 and G4; G4 alone does not prove refresh. Other authentication-image mapping remains for the evidence owner to clarify in [Evidence.md](Evidence.md) |
| Coordinator reassessment / final gate | [November 24 P1 and candidate review](Evidence/prachi-p1-reassessment-2026-11-24.md): scoped auth all-clear; final team approval not newly recorded |

## Disposition rules and next action

1. **Mismatch reproduced:** retain the old and new proof, repeat safely once, then update the existing issue with the actual diagnosis, severity, priority reason and smallest fix/retest.
2. **Flow succeeds under the same stated conditions:** record a scoped post-fix authentication retest with the repair link. Broader app/data/provider claims keep their own evidence.
3. **Original failure merely not reproduced or setup differs:** retain the original report and name the next discriminating check; do not infer a verified fix.
4. **Check blocked:** identify the exact blocker, owner and next check. Google rejecting an automation-controlled browser is a test-setup limitation until normal-browser evidence establishes an application mismatch.

**Next action:** Prachi has completed the targeted P1 reassessment and accepts the reported G1–G6 recovery within its candidate scope. Before the **November 25 checkpoint**, coordinate the team's actual approval/accepted-limitations record in #177 against `e5f1888aa4600ac2013d6bda34a55554ba68195f`; keep that final decision pending until it exists. Browser version, unmeasured recovery duration and screenshot provenance remain explicit P2 follow-ups for the original evidence owners. No application fix, new test or whole-MVP approval is claimed.
