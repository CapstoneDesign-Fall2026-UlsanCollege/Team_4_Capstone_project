# Frozen-candidate Google domain repair and current handoff

**Owner/coordinator:** `prachi2061`. **Date:** November 18, 2026, Asia/Seoul.

**Candidate:** `e5f1888aa4600ac2013d6bda34a55554ba68195f`, tag `mvp-candidate-2026-11-18`.

## Reported defect and repair

[Ujjal's candidate check](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/issues/177#issuecomment-6969006762) reached the authenticated core journey but reported Google re-login **BLOCKED**, with "Google sign-in isn't configured for this website yet."

The project's Google provider was enabled. Both public and administrative Firebase configuration showed that `campusvibe-fnh5f79me-campus-vibe.vercel.app` was missing from authorized domains. The exact candidate hostname has now been added to `campus-vibe-7a95a`; existing domains were preserved. No Google provider/client-secret, billing, Firestore rule, database or application-source change was made. The candidate tag is unchanged. The [recorded configuration and browser result](prachi-candidate-google-domain-2026-11-18.json) contains no credentials.

## Actual live check and timing limit

| Check | Desktop 1440x900 | Mobile viewport 390x844 |
|---|---|---|
| Candidate hostname appears in Firebase public configuration | PASS | PASS |
| Continue with Google opens Google's identifier page | PASS | PASS |
| Closing the popup restores the button and clears busy state | PASS; 9.120 seconds | PASS; 8.603 seconds |
| Google account/session completed | **NOT TESTED** | **NOT TESTED** |

The initial existing readiness script failed its **10-second** popup-recovery assertion after the provider page had opened. The diagnostic repeat allowed 30 seconds, recorded actual recovery below 10 seconds in both viewports, and observed `auth/popup-closed-by-user`. The first failure is retained in the JSON receipt; its timing cause is unconfirmed. No application code or test assertion was changed to claim the original script passed. These are fresh automated Chrome checks without identity selection or credentials, not a named person's completed Google login.

## Current team evidence

| Evidence | Current result and limit |
|---|---|
| [Tulsey's candidate regression](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/issues/138#issuecomment-6968940271) | Reviewer-reported **9 PASS, 0 FAIL**, seven screenshots, exact candidate. Login/session and the core journey were checked; this does not override Ujjal's separately blocked Google re-login. |
| [Devyana's independent backup setup](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/issues/118#issuecomment-6968864555) | **PASS** for separate candidate worktree, Node 24.14.1 / npm 11.12.1, clean setup, startup, basic Discover/Search/Details and production build. The 118-test suite was not repeated by this reviewer; Tulsey's own 118-pass run stays separate. |
| [Devyana's Firestore handoff](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/issues/177#issuecomment-6967784523) | Earlier field/network checks and independent backup setup are complete. Review/acceptance of the newer terminal-runtime evidence and final team approval remain pending. |

The observed candidate search/category behavior resets on a full reload. The current implementation retains that behavior; no filter-persistence feature was added. Confirm the intended requirement and team acceptance in #166/#177 rather than treating observation as an approved product decision. The login session and published-event availability still need to satisfy the existing core promise.

## Next checks before final approval

1. **ujjalpoudel75:** repeat real Google identity selection -> Dashboard -> refresh -> logout/re-login at [the same candidate URL](https://campusvibe-fnh5f79me-campus-vibe.vercel.app/). Record the exact candidate, expected/actual, evidence and any continuing failure in #167/#177. Check popup cancellation/retry if required by the auth scope.
2. **DevyanaCT:** review the [18 local runtime checks](prachi-candidate-runtime-2026-11-18.md); record independent acceptance, additional required execution or a precise blocker. Keep real emulator denial and callback-injected terminal load failure distinct.
3. **Team, coordinated by Prachi:** record search/filter expectations, accepted limitations and actual APPROVE/BLOCKED comments for the exact candidate. No such final approval is supplied by checkbox completion, deployment metadata or this repair.

**Final MVP release approval remains PENDING.** The feature scope stays frozen; this restores existing authentication. No new runtime test or approval is attributed to a teammate by this note.
