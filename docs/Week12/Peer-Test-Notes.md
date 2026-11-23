
# Week 12 — Independent Peer Test Notes

**Project:** CampusVibes — Team 4
**Tester:** `ujjalpoudel75`
**Role:** QA and Core Integration
**Test Date:** November 23, 2026
**Status:** TARGETED MANUAL RETEST COMPLETED

**Candidate SHA:** `e5f1888aa4600ac2013d6bda34a55554ba68195f`
**Deployment:** https://campusvibe-fnh5f79me-campus-vibe.vercel.app/
**Browser:** Google Chrome (version not recorded)
**Test Type:** Independent manual authentication retest

## 1. Week 11 Finding

During Week 11, Google Sign-In failed on the selected CampusVibes MVP candidate.

**Expected:** Google authentication should open the Dashboard.

**Actual:** The website displayed a Google Sign-In configuration error.

**Original Severity:** Major
**Original Priority:** P1 — Verification risk
**Previous Result:** BLOCKED

## 2. Repair

`prachi2061` added the missing candidate hostname to Firebase authorized domains.

The frozen candidate source code was not modified for this repair.

## 3. Week 12 — Independent Testing Results

| ID | Test Case | Actual Result | Status |
|---|---|---|---|
| G1 | Open Google account selection | Google account selection opened | PASS |
| G2 | Complete Google login | Authenticated Dashboard opened | PASS |
| G3 | Refresh while logged in | Session remained active | PASS |
| G4 | Logout and refresh | Website remained logged out after refresh | PASS |
| G5 | Google re-login | Dashboard opened after re-login | PASS |
| G6 | Cancel Google popup and retry | Login page recovered, retry worked and Dashboard opened | PASS |

**Testing Summary: 6 PASS, 0 reported FAIL.**

**Cancellation recovery time:** Not measured.

## 4. Observations

- Google authentication worked after the Firebase configuration repair.
- Dashboard access and session persistence worked.
- Logout and refresh did not restore the previous session.
- Google popup cancellation did not prevent a new login attempt.
- No mismatch was reported during these checks.

## 5. Evidence and Limitations

**My detailed QA report:**
https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/issues/167#issuecomment-7088936229

**My handoff update:**
https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/issues/177#issuecomment-7088958749

**Independent teammate result:** `tulseyy8848` — 6 PASS, 0 FAIL, documented separately in #177.

**My authentication screenshots:** Available evidence uploaded to [Week 12 Evidence.md](Evidence.md#week-12--google-authentication-evidence-ujjal).

- G1 — Google account-selection popup: Screenshot attached.
- G4 — Signed-out Login page: Screenshot attached (supporting visual evidence only).
- G2, G3, G5 and G6: Results documented through manual testing; no individual screenshots attached.

**Evidence limitation:** The G4 screenshot alone does not establish that refresh occurred. The complete test result is recorded separately in the manual QA report.


**Other limitations:**
- Browser version and popup recovery duration were not recorded.
- This is a targeted authentication retest, not a complete MVP regression test.
- No new backend, Firebase rules or application code changes were made by the tester.

## 6. QA Disposition

**Original Finding:** Google Sign-In BLOCKED

**Current Finding:** Post-repair authentication retest PASS for the tested scope.

**Severity:** Originally Major
**Priority:** Originally P1; reassessment requested based on completed retest.

**Next Owner / Action:**
- `ujjalpoudel75`: Complete evidence links and Week 12 report.
- `prachi2061`: Review final authentication QA disposition and handoff.
- Team: Retain conditional MVP approval boundaries.

## 7. Week 13 Handoff Trial

Not tested. To be completed during the Week 13 handoff.

## Conclusion

The Week 11 Google Sign-In failure was followed by a Firebase configuration repair and a successful Week 12 targeted manual retest.

**Final Targeted Result: 6 PASS, 0 reported FAIL.**

**Status:** RETEST COMPLETED — 6 PASS, 0 reported FAIL. Available G1 and G4 screenshot evidence uploaded and linked. Final issue priority review and team MVP approval remain pending.
