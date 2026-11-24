# Week 12 Targeted QA Checklist

**Team:** 4, CampusVibes. **Class:** November 19, 2026. **Prepared:** November 20, 2026. **Due:** November 25, 2026, end of day Asia/Seoul.

**Target:** Google authentication after the candidate-hostname repair. **Week 12 result:** 6 PASS, 0 FAIL. Tester, run date, and actual results recorded by the non-author tester.

## Week 11 starting point

| Starting evidence | What it establishes |
|---|---|
| [Ujjal's candidate failure](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/issues/177#issuecomment-6969006762) | Google re-login was blocked on the exact candidate URL |
| [PR #185](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/pull/185) and [repair receipt](../Week11/Evidence/prachi-candidate-google-domain-2026-11-18.md) | The missing candidate hostname was added; live provider-page and popup readiness were checked with their timing limit recorded |
| [Prachi's November 18 manual receipt](../Week11/Evidence/prachi-google-manual-pass-2026-11-18.md) | One overall user-reported PASS for the requested normal-Chrome flow; no separate step results or new screenshots |

These are Week 11 results. The table below records the new Week 12 check.

## Starting conditions and proof

- Used [the exact candidate deployment](https://campusvibe-fnh5f79me-campus-vibe.vercel.app/), SHA `e5f1888aa4600ac2013d6bda34a55554ba68195f`.
- Started signed out of CampusVibes and used Google sign-in through the candidate deployment.
- Tester: `tulseyy8848`.
- Test date: November 23, 2026.
- Browser/version and viewport/device: Not recorded.
- Google account initial sign-in state: Not separately recorded.
- Google popup cancellation recovery time: Not measured.
- Account addresses, passwords, tokens and private Google screens are excluded from published evidence.
- Use the [auth/navigation area map](../Week10/ai-use-and-code-ownership-audit.md#codebase-area-map) and [bug follow-up](Bug-Report.md). No production role, rule, provider or data changes were needed for this retest.

## Target steps

| ID | Action | Expected result | Week 12 actual result | Status |
|---|---|---|---|---|
| G1 | Open the exact deployment and choose Continue with Google | Google account selection opens without the earlier site-configuration message | Google account selection opened successfully. No earlier site-configuration message was observed. | PASS |
| G2 | Complete identity selection in Google | Authenticated Dashboard opens for that tester | Google sign-in completed and Dashboard opened successfully. | PASS |
| G3 | Refresh the Dashboard | The same account remains signed in | After refreshing, Dashboard remained open and the session was retained. | PASS |
| G4 | Log out, then refresh | CampusVibes remains signed out | Logged out successfully. After refresh, the Login page remained visible and the user stayed signed out. | PASS |
| G5 | Choose Google again and complete re-login | The account reaches Dashboard again | Google sign-in was completed again after logout and Dashboard opened successfully. | PASS |
| G6 | From signed-out state, open and cancel the Google popup, then retry | The form recovers, the button is usable and a new attempt can start; record the actual delay | Google popup was cancelled. The login form recovered, retry was possible, and another Google sign-in attempt worked. Exact recovery delay was not measured. | PASS |

## Checklist for the tester

- [x] Record exact candidate/setup and initial session conditions.
- [x] Execute G1–G6 and write expected/actual results individually.
- [x] Save available redacted proof and complete peer notes.
- [x] Update the existing issue with the result and a bounded next action.
- [ ] Repeat a mismatch if one is observed — Not applicable; no mismatch was observed.

## Optional automated observation

After the targeted manual loop has a disposition, the existing readiness script can check the allowlist, provider-page handoff and cancellation recovery:

```powershell
$env:GOOGLE_SIGNIN_TEST_URL = 'https://campusvibe-fnh5f79me-campus-vibe.vercel.app/'
$env:SMOKE_BROWSER_CHANNEL = 'chrome'
npm run test:google-signin-live --workspace frontend/react-app
```

**Week 12 automated result:** Not run. This script does not enter an identity or prove a completed Google account/session. Keep the [earlier timing failure](../Week11/Evidence/prachi-candidate-google-domain-2026-11-18.md) visible when interpreting a new result.

## Triage and disposition

The original work priority was **P1, verification risk**, because a current non-author result was still required for the selected target. The prior Google-path failure was assessed as **Major**.

**Week 12 retest result:** All six targeted manual checks passed (6 PASS, 0 FAIL). No new Week 12 mismatch was observed during this test.

The Google sign-in retest is successfully completed by the non-author tester. Available redacted evidence, peer notes, and issue updates have been recorded as completed in the checklist. Any outstanding evidence links should be checked against the tester's original records. The implementation owner may reassess the original P1 verification risk based on the successful retest. Priority should be reviewed based on the new evidence. Severity and priority remain separate.


**Current disposition:** Week 12 targeted manual Google Sign-In retesting completed successfully by `tulseyy8848` on November 23, 2026, with 6 PASS and 0 FAIL. No new authentication mismatch was observed. Available evidence and issue updates should be linked to the tester's own records. The original P1 verification risk can be reassessed by the implementation owner based on the successful post-fix retest. This result does not constitute whole-MVP approval.

