# Week 6 Stretch Validation

Owner: `prachi2061`. Reviewed on October 14, 2026 against `origin/main`
at `59dbb2d` and the current GitHub issue bodies and test comments.

## Existing work checked before choosing extensions

| Stretch idea | Existing evidence and decision |
|---|---|
| Repeat the main path after changes | Already recorded by DevyanaCT and Tulseyy8848 in [#64](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/issues/64), with the original result in [#49](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/issues/49). A project retest does not establish a retest of the specific toast bug. |
| Test an empty/error/recovery state | Already recorded in the [October 12 automated check](weekly_report.md#automated-demo-check---october-12-2026): unmatched search showed an empty state and clearing restored nine events. Automate this existing check rather than credit it as a new state test. |
| Independent tester from a clean checkout | Independent tests exist in #49, #63, and #64, but they do not establish a clean checkout. Leave that exact requirement pending; an automated browser context is not a teammate checkout. |
| Repeatable smoke test | Written manual steps and earlier automated results exist, but the reviewed main branch had no checked-in Events browser test or runner command. Add those now. |
| Short local setup note | Already available in the [app README](../../frontend/react-app/README.md#run-locally). Do not create a second app setup note. |
| Success signal observed by the test | The event-detail outcome is already stated in #49 and the Definition of Done. Add the missing link from this outcome to executable assertions below. |
| First 3-5 midterm steps | The five-step sample-event path is already written in [the Tested-By Note](tested-by-note.md#check-steps) and #64. Reuse it. |
| Provable and unprovable claim | Already recorded in the checklist: sample event details are supported; Firestore event loading is unverified. |
| Week 7 rehearsal improvement | Already assigned in [#53](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/issues/53), with additional rehearsal evidence in [#63](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/issues/63). Do not assign the same task again. |

## Bug found and same-check retest

The new smoke test found a previously unrecorded Discover dialog dismissal
bug. Both viewports displayed the correct event details, but clicking Close
reopened the dialog. The delegated event handler matched the dialog's
`data-discover-event` state attribute when the click bubbled from Close.
Restricting that match to event buttons fixes dismissal.

### Before fix

Test source: [07a2a8d](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/commit/07a2a8d).
The corrected runner was executed against the unchanged runtime before the
fix; the same test source is preserved in this commit.

Expected: the selected event details appear and Close returns to Discover.
Actual: the details appeared, but the dialog remained open after Close on
desktop and mobile. The assertion at `events.spec.js:22` failed:

```text
Locator: locator('#dashboardDialog')
Expected: not visible
Received: visible
2 failed, 2 passed (34.0s)
```

The two empty-search recovery checks passed. Earlier harness attempts had
page-load timeouts and assumed All was selected on demo entry; those setup
problems were corrected before this bug result was recorded.

### After fix

Fix: [579dcc4](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/commit/579dcc4).
Ran the same `npm run test:smoke` command with `SMOKE_BROWSER_CHANNEL=chrome`
on October 14, 2026. Google Chrome was used; downloaded Playwright Chromium
was not separately tested.

| Check | Desktop 1440 x 900 | Mobile 390 x 844 |
|---|---|---|
| Dashboard -> Discover -> selected sample details -> Close | Passed | Passed |
| Empty search -> Clear filters -> restored events and details | Passed | Passed |

```text
4 passed (17.6s)
```

The production build also passed after the fix: `npm run build`, Vite 6.4.3,
3829 modules transformed. These are local results, not a deployment claim.

## Success signal and observation

Success signal: a demo student can go from Dashboard to Discover, choose
HackNight: Build-a-Thon, and see that selected sample event's title, location,
time, host, and description in the details dialog, then return to Discover.

The [Events smoke test](../../frontend/react-app/tests/smoke/events.spec.js)
observes this with browser assertions for the active pages, visible dialog,
exact title, and the sample location, time, host, and description. It also
checks closing the dialog and records uncaught page errors. A second test
checks the existing unmatched-search recovery behavior: zero cards and a
visible empty state, then nine restored cards and working event details
after Clear filters. Each test starts with a fresh browser context.

This measures the sample-data demo outcome. Demo entry bypasses real Firebase
login; this test does not verify authentication, Firestore retrieval, live
event freshness, or independent teammate testing.

## Run the checked-in smoke test

From the repository root:

```sh
cd frontend/react-app
npm ci
npx playwright install chromium
npm run test:smoke
```

The runner starts and stops its own local Vite server on port 4178. The port
must be free. It runs the same assertions at 1440 x 900 and 390 x 844. Failure
screenshots and traces are written to the ignored `test-results` directory.
No test credentials are needed and no Firebase account is created.

To use an already installed Google Chrome instead of downloading Chromium:

```powershell
$env:SMOKE_BROWSER_CHANNEL = 'chrome'
npm run test:smoke
```

## Outstanding evidence

The new dialog bug has linked [before](#before-fix) and [after](#after-fix)
results. The older toast contrast fix in `5185abf` still lacks a linked
before/after run of the same toast check. A teammate's clean-checkout run also
remains pending; the existing independent tests should not be repeated merely
to increase activity counts.
