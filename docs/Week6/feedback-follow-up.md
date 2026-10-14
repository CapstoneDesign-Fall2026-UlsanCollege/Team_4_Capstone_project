# Prachi2061 Professor Feedback Follow-Up

Checked and completed on October 14, 2026.

## Existing Evidence Confirmed

| Feedback item | Verified record | Status |
|---|---|---|
| Automated signup/login, dashboard access, and seeded Discover interaction | Current result sections in [#20](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/issues/20), [#22](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/issues/22), and [#23](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/issues/23), with the October 12 check in the shared report. | Already recorded; do not repeat or relabel as a new teammate test. |
| Independent desktop/mobile tester check | DevyanaCT's [October 13 result in #53](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/issues/53#issuecomment-6141158476), Tulseyy8848's supporting records in #53/#63, screenshots in [#63](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/issues/63), and the [teammate Tested-By Note](evidence/Tested-by-note.md). | Already documented. #53 remained open at this audit; its original body has a stale next action. #63's body contains inconsistent desktop-only wording, so use the explicit teammate result comments and note for the completed scope. |
| Label automated and teammate results separately | Earlier browser checks are explicitly automated in the report; the teammate note identifies Tulseyy8848 and DevyanaCT. | Preserved. The new check below is automated. |
| Mobile toast retest with before/after proof | No linked same-path before/after screenshots were found in the reviewed evidence. | Completed below. |

## Team Feedback Status - October 14

This is an audit of existing records, not a new test or a claim that a teammate
tested the subsequently added real social feed and Messages.

| Before-Wednesday action | Current evidence | Remaining work |
|---|---|---|
| Link the actual result and Firestore limit in the Events Definition of Done | [#49 repeat result](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/issues/49#issuecomment-6105483528) and [Definition of Done](Definition%20of%20Done.md) record the sample-event pass and limitation. | Keep Discover event loading separate under #35. |
| Named independent rehearsal, expected/actual results, desktop/mobile screenshots | [DevyanaCT result](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/issues/53#issuecomment-6141158476) identifies the tester, October 13 date, production URL, expected/actual result, and passing demo scope. [Tulseyy8848 screenshots](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/issues/53#issuecomment-6138295370) provide desktop/mobile evidence. | #53 is still open. The exact deployed commit was not recorded; a clean-checkout run and independent testing of the newer real social/chat features are not established by these receipts. |
| Keep sample-data boundaries visible | #35 remains open; Events/Discover uses sample events, Community Profile edits are browser-local, and the demo Assistant/suggestions remain prototypes. | Real Firestore Feed posts/social/chat do not resolve Discover event loading. Shared photos remain deferred with billing off. |
| Individual receipts for all enrolled logins | The [report contribution table](weekly_report.md#individual-contribution-entries--one-row-per-student) links records for `DevyanaCT`, `prachi2061`, `ujjalpoudel75`, and `tulseyy8848`. | Each student should confirm their own attribution; this audit does not create tests or endorsements on their behalf. |
| Prachi mobile toast stretch | Same-path automated comparison and screenshots below show 1.16:1 before and 16.61:1 after. | Completed for the documented local demo path, not a new independent rehearsal. |

## Automated Mobile Toast Retest

Expected: the mobile sample-event path still works after the toast-contrast
fix, and the save confirmation is readable. The test uses a 4.5:1 text contrast
threshold and checks both the saved listing and dashboard count.

Before: a genuine local checkout of
`15d0d43dc749ca7c688f907bd1ee65698b6b9ac9`, the parent of toast fix
[5185abf](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/commit/5185abf).
After: current merged app source at
`56b8b35294328478211d3bab4f5717bdea98f74c` plus the new test harness.
No CSS override or simulated old color was used. Later UI changes are visible
in the current screenshot, so this comparison is not a claim that only the
toast changed between the two complete app versions.

Same steps in fresh browser contexts at **390 x 844**:

1. Enter as the demo student, then open Dashboard and Discover.
2. Select Tech and search HackNight; confirm one event card remains.
3. Save the event and capture the actual visible Event saved toast.
4. Open Saved and confirm HackNight: Build-a-Thon is present.
5. Return to Dashboard and confirm the saved count is one.

| Observation | Before fix | Current app |
|---|---|---|
| Toast text color | rgb(36, 34, 42) | rgb(247, 242, 255) |
| Toast background | rgb(21, 21, 21) | rgb(21, 21, 21) |
| Calculated text contrast | 1.16:1; below the test threshold | 16.61:1; passes the test threshold |
| Filter/search/save/Saved/dashboard count | Passed | Passed |
| Uncaught page errors | None | None |
| Document horizontal overflow at final Dashboard | None | None |

Proof: [before screenshot](evidence/toast-mobile/before-save-toast.png),
[after screenshot](evidence/toast-mobile/after-save-toast.png), and
[machine-readable results](evidence/toast-mobile/results.json).
Both screenshots were visually inspected. The original unreadable dark text
is reproduced; the current toast has visible light text.

## Repeat the Comparison

From the repository root, prepare the historical checkout:

```sh
git worktree add --detach ../campusvibe-toast-before 15d0d43
cd ../campusvibe-toast-before/frontend/react-app
npm ci
npm run dev -- --host 127.0.0.1 --port 5183 --strictPort
```

Start the current app in another terminal from its `frontend/react-app`:

```sh
npm ci
npm run dev -- --host 127.0.0.1 --port 5182 --strictPort
```

Run the harness from the current app directory in a third terminal:

```powershell
npx playwright install chromium
$env:TOAST_BEFORE_URL = 'http://127.0.0.1:5183'
npm run test:toast-mobile
```

This run used installed Google Chrome through `PLAYWRIGHT_CHROME_PATH`.
The script defaults to Playwright Chromium when no executable path is set.
Use `TOAST_AFTER_URL` to change the current app URL; both servers must be local.

## Validation Limits

This is a local automated demo-path retest, not a new teammate rehearsal or a
real Firebase login retest. It uses sample events and creates no accounts.
It proves the current toast color for the tested confirmation, not every
feedback state or production deployment. Firestore Discover event loading
and a teammate's clean-checkout run remain separate, unverified work.
