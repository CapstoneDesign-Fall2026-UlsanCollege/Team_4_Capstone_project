# Week 12 Targeted QA Checklist

**Team:** 4, CampusVibes. **Class:** November 19, 2026. **Prepared:** November 20, 2026. **Due:** November 25, 2026, end of day Asia/Seoul.

**Target:** Google authentication after the candidate-hostname repair. **Week 12 result:** NOT TESTED. Tester, run date and evidence must be supplied by the person who performs the check.

## Week 11 starting point

| Starting evidence | What it establishes |
|---|---|
| [Ujjal's candidate failure](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/issues/177#issuecomment-6969006762) | Google re-login was blocked on the exact candidate URL |
| [PR #185](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/pull/185) and [repair receipt](../Week11/Evidence/prachi-candidate-google-domain-2026-11-18.md) | The missing candidate hostname was added; live provider-page and popup readiness were checked with their timing limit recorded |
| [Prachi's November 18 manual receipt](../Week11/Evidence/prachi-google-manual-pass-2026-11-18.md) | One overall user-reported PASS for the requested normal-Chrome flow; no separate step results or new screenshots |

These are Week 11 results. The table below is the new Week 12 check.

## Starting conditions and proof

- Use [the exact candidate deployment](https://campusvibe-fnh5f79me-campus-vibe.vercel.app/), SHA `e5f1888aa4600ac2013d6bda34a55554ba68195f`.
- Start signed out of CampusVibes in a normal supported browser. The tester uses their own authorized Google test account directly in Google.
- Record browser/version and viewport or physical device, whether Google was already signed in, and the observed time to recover from cancellation. No new response-time requirement is assumed from the old automated timeout.
- Keep account addresses, passwords, tokens and private Google screens out of published evidence. Capture redacted CampusVibes states.
- Use the [auth/navigation area map](../Week10/ai-use-and-code-ownership-audit.md#codebase-area-map) and [bug follow-up](Bug-Report.md). No production role, rule, provider or data changes are needed for this retest.

## Target steps

| ID | Action | Expected result | Week 12 actual result | Status |
|---|---|---|---|---|
| G1 | Open the exact deployment and choose Continue with Google | Google account selection opens without the earlier site-configuration message | Not run | NOT TESTED |
| G2 | Complete identity selection in Google | Authenticated Dashboard opens for that tester | Not run | NOT TESTED |
| G3 | Refresh the Dashboard | The same account remains signed in | Not run | NOT TESTED |
| G4 | Log out, then refresh | CampusVibes remains signed out | Not run | NOT TESTED |
| G5 | Choose Google again and complete re-login | The account reaches Dashboard again | Not run | NOT TESTED |
| G6 | From signed-out state, open and cancel the Google popup, then retry | The form recovers, the button is usable and a new attempt can start; record the actual delay | Not run | NOT TESTED |

## Checklist for the tester

- [ ] Record exact candidate/setup and initial session conditions.
- [ ] Execute G1-G6 and write expected/actual results individually.
- [ ] Save redacted current proof and complete [peer notes](Peer-Test-Notes.md).
- [ ] If a mismatch appears, repeat that condition once where safe and retain both observations.
- [ ] Update the existing issue with the result and a bounded next action.

## Optional automated observation

After the targeted manual loop has a disposition, the existing readiness script can check the allowlist, provider-page handoff and cancellation recovery:

```powershell
$env:GOOGLE_SIGNIN_TEST_URL = 'https://campusvibe-fnh5f79me-campus-vibe.vercel.app/'
$env:SMOKE_BROWSER_CHANNEL = 'chrome'
npm run test:google-signin-live --workspace frontend/react-app
```

**Week 12 automated result:** not run. This script does not enter an identity or prove a completed Google account/session. Keep the [earlier timing failure](../Week11/Evidence/prachi-candidate-google-domain-2026-11-18.md) visible when interpreting a new result.

## Triage and disposition

Current work priority is **P1, verification risk**: the repair has historical manual support, but a current non-author result is still needed for the selected target. The prior Google-path failure is assessed as **Major**; no new Week 12 mismatch has been observed. [Full triage and outcome rules](Bug-Report.md) keep severity separate from work order.

**Current disposition:** NOT TESTED in Week 12. Prachi coordinates the proposed QA handoff; the actual tester records the result before the November 25 checkpoint. No whole-MVP all-clear is supplied by this plan.
