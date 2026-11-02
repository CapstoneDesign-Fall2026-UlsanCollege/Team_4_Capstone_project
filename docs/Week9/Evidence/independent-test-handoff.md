# Independent-test handoff for Wednesday

**Prepared:** 2026-11-02, Asia/Seoul. This note links an existing teammate result and defines the next check. It does not record a new independent test.

## One existing result to bring

| Field | Recorded evidence |
|---|---|
| Tester | Canonical login `tulseyy8848`; the receipt displays `Tulseyy8848`. |
| Test date | 2026-10-31, as written by the tester. |
| Exact result | [The tester's own Issue #118 comment and screenshots](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/issues/118#issuecomment-6539563367) report successful execution following the instructions and no errors encountered. |
| Working path / setup context | The [Issue #118 scenario](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/issues/118) is a local React/Vite backup through VS Code: install dependencies, start the dev server and open the local URL. Its intended journey is Landing → Login → Dashboard → Discover/Search → Event Details. |
| Independence | This is the named teammate's own dated test receipt, separate from prachi2061's implementation and automated checks. The [existing ownership table](../MVP-Contract.md#ownership) names DevyanaCT as local-setup owner and Tulseyy8848 as tester. |
| What is missing | The comment does not pin a Git revision, OS/Node/browser version, exact command history, login method or separate expected/actual result for each step. Do not fill those details from assumption. |
| Limits | Treat this as a reported historical local-backup result. It is not a fresh clean-checkout test, proof of the current deployment, completed Google authentication, a full reset-email/password-change check, or Firestore Event loading. |

The issue's setup instructions mention `npm install` and `npm run dev`. The [current root README](../../../README.md#quick-start) uses `npm ci` and `npm run dev`. This difference describes the instructions, not proof of which exact commands the tester typed. A local frontend also does not establish offline availability of cloud authentication or database features.

## Keep the evidence categories separate

| Record | Category | What it establishes |
|---|---|---|
| This roadmap's Week 10–16 milestones | Planned work | Named proposed owner/checker, a repeatable check, proof to save and a fallback. No future execution is claimed. |
| [Google repair/readiness PR #135](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/pull/135) and its source changes | Implementation / code review | What changed and how it is checked; source alone is not a successful real-account login. |
| [October 31 #118 comment](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/issues/118#issuecomment-6539563367) | Reported independent local result | A named teammate's successful backup-setup result, with the limits above. |
| Vercel checks on [report PR #136](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/pull/136) | CI/build checks | The reported pipeline passed. This does not establish login, reset email, Firestore Events or a teammate's actions. |
| [November 2 guest core review](prachi-core-review-2026-11-02/check-note.md) | Automated live-system check | Deployed guest navigation and empty-state recovery in two Chrome viewports; Firebase remained signed out. |
| [Google domain/readiness receipt](../../../frontend/react-app/verification/google-signin-domain/results.json) | Automated live-system check | Authorized hostname, provider-page handoff and cancellation recovery. No Google identity was selected. |

## Required follow-up before November 4

- Each enrolled member authors or confirms their own row in the [single Week 9 report](../Weekly-Report.md). prachi2061's row and technical receipts are present. DevyanaCT confirms the exact supporting checks; ujjalpoudel75 supplies receipt-matched reset wording; tulseyy8848 adds their own setup steps and actual journey. A coordinator linking a receipt does not make new wording student-authored.
- The named tester records a current build/URL, setup state, device/browser, date and chosen login method. Follow Login → Dashboard → Discover/Search → Event Details, then reload to check the declared session behavior.
- Record each expected/actual result and any failure. Save the complete Google-account or reset-email → password-change → changed-password-login receipt only if those steps were actually performed; otherwise retain NOT TESTED and the next action in [#116](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/issues/116).
- Keep database Event loading separate in [#117](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/issues/117). Sample event navigation and account/social persistence cannot substitute for that result.
- If the live or authentication path fails, state the failed step and use the declared prepared local/guest sample path or dated screenshots. Save a new result for a repeated setup test rather than relabelling the October 31 receipt.

These are pending actions. No actual duration, new tester confirmation, full authentication success or Firestore result is supplied by this handoff note.
