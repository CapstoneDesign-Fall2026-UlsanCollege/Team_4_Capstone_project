# Prachi — ownership source review

**Prepared:** November 4, 2026 (Asia/Seoul)<br>
**Owner of follow-up:** `prachi2061`<br>
**Method:** Codex-assisted source inspection and documentation validation; no new human review or live-system test.<br>
**Source checkout:** `b6c08bee654e5c0dbc3063f968914034b8cd931d`<br>
**Tracking:** [Issue #139](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/issues/139), [ownership audit](../ai-use-and-code-ownership-audit.md)

## Source trace

| Entry / boundary | What was expected from inspection | What was found |
|---|---|---|
| [Google click wiring](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/blob/b6c08bee654e5c0dbc3063f968914034b8cd931d/frontend/apps.js#L421) | Locate the button's event handler. | `setupAuthControls` binds `#googleLogin` to `handleGoogleLogin`. |
| [Persistence and popup handler](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/blob/b6c08bee654e5c0dbc3063f968914034b8cd931d/frontend/apps.js#L358) | Separate inputs, success and cancellation paths. | Remember me selects persistence; the awaited popup credential reaches `startSession`; rejection goes to `showAuthError`; `finally` calls `setAuthBusy(form, false)`. |
| [Auth error mapping](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/blob/b6c08bee654e5c0dbc3063f968914034b8cd931d/frontend/apps.js#L259) | Locate cancellation/domain error behavior. | User-closed, blocked, unauthorized-domain and other codes map to form messages. This is source behavior, not proof that all errors were triggered live. |
| [Firebase SDK bridge](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/blob/b6c08bee654e5c0dbc3063f968914034b8cd931d/frontend/react-app/src/App.jsx#L114) | Find the dependency used by legacy handlers. | The shell exposes Auth, persistence and popup functions through `window.campusFirebaseAuth`; the handler consumes that object. |
| [Readiness check](../../../frontend/react-app/tests/google-signin-live.browser.js) | Find what the existing test proves. | It verifies the authorized hostname and Google identifier/account page, dismisses the popup, then asserts enabled button, non-busy form and null Firebase user. It never selects an identity. |

**Source-inspection result:** The bounded entry/recovery slice and its dependency can be located. This does not establish that Prachi or another student has explained it aloud, or that the authenticated success branch works on the current deployment.

## Historical runtime evidence

The [redacted readiness receipt](../../../frontend/react-app/verification/google-signin-domain/results.json) records a run at `2026-11-01T15:08:25.702Z`, **November 2, 00:08:25 KST**. Two fresh Chrome viewports passed provider-page entry and dismissal recovery. Its script digest is checked against the current file:

```text
SHA-256 10d093dfdea1693e2b77ad0686e7b02d4777e3c6c799ea01659d6913e1e4e12d
```

This receipt is reused with its original date. No browser check, clean installation, reset email, credential entry, full account login or physical-device test was performed for this documentation change.

## Documentation validation

| Document/source check, November 4 | Expected | Actual |
|---|---|---|
| Relative links and headings | Every linked local target exists. | PASS — 96 local references checked across the eight changed/new files. |
| Repository source links and command names | Referenced source paths exist and listed npm scripts are defined. | PASS — 9 repository blob references and 5 root/workspace npm command references checked. |
| Historical readiness script | Current normalized source digest matches the dated receipt. | PASS — SHA-256 matches the value above; the receipt retains two historical PASS cases with no identity/credentials entered. |
| Existing work preservation | Add references without removing or rewriting existing work. | PASS — all 84 other tracked documentation/evidence files are byte-identical. Existing wording in the four linked files (README, Working Agreement, Week 9 roadmap/report), including all Week 9 individual rows, is preserved in order. |
| Patch whitespace | `git diff --check` succeeds. | PASS — no new whitespace errors. |

Only eight Markdown files are added or receive references. No application source, dependency, prior evidence result or rehearsal file is changed.

These are document/source checks. They do not substitute for runtime results, a human's explanation, a teammate's independent check or assignment completion. No application tests were added or rerun for this documentation-only change.

## Human handoff still needed

Prachi confirms or corrects the [prepared explanation](../ai-use-and-code-ownership-audit.md#prachis-prepared-source-explanation). A non-author accepts the review and answers: **where does popup dismissal restore the form, and why is no session created?** That person records their own date, setup, question/answer, expected/actual behavior and a meaningful recovery check in #139. Keep acceptance and results pending until they exist. Each other member authors their own slice/area/AI declaration.
