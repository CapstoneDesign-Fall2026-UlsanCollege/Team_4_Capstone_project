# Suggestion poster — follow-up testing and issue records

Date: November 9, 2026, Asia/Seoul. Owner: prachi2061.

The delivered feature remains [Issue #153](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/issues/153) / [PR #154](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/pull/154). This follow-up adds missing tracking and regression proof; it changes tests/evidence only. School documents, teammate entries and application/provider configuration have no edits.

| Record | Evidence and actual status |
|---|---|
| [#156 — Native file input styling](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/issues/156) | Historical pre-release bug, already corrected in PR #154. New desktop/mobile checks reconstruct the CSS failure locally and verify the released protection. The before screenshots are reconstructed, not production failures. |
| [#157 — Cleanup retry lost after reload/new draft](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/issues/157) | OPEN source-inspected client recovery gap. The new API test confirms provider deletion failure returns an error without false success or secrets; it does not persist the client's retry state or verify a live-provider incident. |
| [#158 — Independent real-provider test](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/issues/158) | OPEN / NOT TESTED. A named tester and authorized reviewer must supply real upload, draft reload, approval, other-student rendering and one safe failure result. The mocked workflow is not substituted for this evidence. |

## Fresh checks

- 37 API/model/account cases PASS, including failed poster cleanup.
- 16 related desktop/mobile smoke cases PASS, including four poster-control cases: sign-in boundary and reconstructed style regression at each viewport.
- Seven production source hashes match the [original implementation receipt](../results.json). No application behavior was changed.
- [Machine-readable result](results.json); [desktop reconstruction](desktop-reconstructed-native-input.png), [desktop protection](desktop-protected-native-input.png), [mobile reconstruction](mobile-reconstructed-native-input.png), [mobile protection](mobile-protected-native-input.png).

Repeat the focused API set from the root with:

```powershell
node --test backend/tests/feed-photo-api.test.js backend/tests/suggestion-poster-api.test.js frontend/react-app/tests/suggestion-poster.test.js frontend/react-app/tests/published-events.test.js frontend/react-app/tests/account-sync.test.js
$env:SMOKE_BROWSER_CHANNEL = 'chrome'
npm run test:smoke -- --grep 'poster controls hide|poster input protection' --workers=2
```

The API error case is in [suggestion-poster-api.test.js](../../../../../backend/tests/suggestion-poster-api.test.js); UI cases are in [suggestion-poster-controls.spec.js](../../../tests/smoke/suggestion-poster-controls.spec.js). The new CSS case deliberately reconstructs the missing inline protection in a local demo page and restores it before checking the corrected state.

The [original receipt](../results.json) remains historical: 36 focused checks, 44 permissions, 12 related UI cases and 20 signed-in emulator workflow checks. It used mocked Cloudinary transport. This follow-up did not rerun those 44 permission/20 signed-in workflow checks, create a real production image, perform a new human review or fix the cleanup recovery bug.

AI use: Codex inspected the source, added the test fixtures and browser regressions, ran the checks and prepared these notes/issues. Prachi owns the follow-up and human explanation. Independent results remain for the actual tester to record.
