# Prachi - candidate runtime and handoff follow-up, November 18

**Owner:** prachi2061. **Execution:** Codex-assisted local automation on November 18, 2026, Asia/Seoul. **Tracker:** [#177](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/issues/177).

## Completed technical work

The application sources match frozen candidate `e5f1888aa4600ac2013d6bda34a55554ba68195f`; the inspection checkout is `f81f63c72c6656291d3bb31b2861518f6baab184`. The [JSON receipt](prachi-candidate-runtime-2026-11-18.json) records source hashes, the actual checks, environment and scope. This change adds a guarded, repeatable [browser harness](../../../frontend/react-app/tests/published-events-recovery.browser.js) and its npm command; application behavior, dependencies and production settings are unchanged. The existing candidate tag is not moved.

| Check | Expected | Actual and method |
|---|---|---|
| Poster API | Valid ownership succeeds; invalid/foreign/retired claims fail before upload; provider failures preserve recovery | **7 PASS, 0 FAIL**. Existing API tests use controlled Firebase/provider fixtures; no genuine Cloudinary upload. |
| Poster persistence | Private claim ownership, active attachment, cleanup/submission race and exact published poster are enforced | **4 PASS, 0 FAIL**, dedicated local Firestore Emulator with repository rules. |
| Authenticated core and boundary | Verified member reaches Dashboard, searches/filters an actual emulator event, opens accurate Details, clears empty search, refreshes and logs out | **10 PASS**: five checks in each 1440x900 / 390x844 viewport. Auth and Firestore SDKs use fictional local accounts/events; no production identity is entered. |
| Permission-denied and Retry | A terminal denied listener shows the application error/Retry; after permission restoration, Retry clears the alert and restores published data | **4 PASS**: denial and recovery in both viewports. Only local catalogue read rules are temporarily denied; an SDK diagnostic of the same query reports `permission-denied`. The real App and store remain unmodified. |
| Terminal loading callback and Retry | An error callback reaches the actual application error UI; Retry starts the original SDK listener and restores the event | **4 PASS** across both viewports. The first `failed-precondition` callback is injected at the browser store boundary. This is controlled application-runtime evidence, not a genuine provider/server failure. |

**Total browser checks: 18 PASS, 0 FAIL.** No application page errors were recorded. Original rules were restored, fictional fixture accounts/events were removed, and only this run's local servers were stopped. Data left in the dedicated in-memory emulator disappears when that instance stops. An earlier CLI startup failed because another process held an emulator JAR; the completed current-CLI run and application checks passed.

### Screenshot evidence

| State | Desktop | Mobile viewport |
|---|---|---|
| Actual local permission denial | [1440px](prachi-candidate-runtime-2026-11-18/permission-denied-1440.png) | [390px](prachi-candidate-runtime-2026-11-18/permission-denied-390.png) |
| Controlled terminal loading error | [1440px](prachi-candidate-runtime-2026-11-18/terminal-load-error-1440.png) | [390px](prachi-candidate-runtime-2026-11-18/terminal-load-error-390.png) |
| Retry recovered | [1440px](prachi-candidate-runtime-2026-11-18/recovered-1440.png) | [390px](prachi-candidate-runtime-2026-11-18/recovered-390.png) |

All screenshots use fictional emulator records. Mobile refers to a browser viewport, not a physical device.

## Repeat without production access

Use a dedicated empty Auth/Firestore emulator pair for `demo-campusvibe-feed`; this test temporarily changes that instance's rules. Do not share the instance with another test. Follow the existing [handoff prerequisites](../../Week10/Prachi-API-Persistence-Handoff.md#repeat-without-production-access), including installed Chrome and Java 21+. The [dedicated emulator configuration](../../../backend/firebase/firebase.recovery-test.json) supplies separate ports. Run all commands from the repository root.

Terminal 1:

```powershell
$env:DEBUG = $null
npx -y firebase-tools@latest emulators:start --project demo-campusvibe-feed --config backend/firebase/firebase.recovery-test.json --only auth,firestore
```

Terminal 2, keep Vite running:

```powershell
$env:VITE_FIREBASE_EMULATORS = 'true'
$env:VITE_FIREBASE_AUTH_EMULATOR_PORT = '19499'
$env:VITE_FIREBASE_FIRESTORE_EMULATOR_PORT = '18480'
npm run dev -- --host 127.0.0.1 --port 5390 --strictPort
```

Terminal 3:

```powershell
$env:FIREBASE_AUTH_EMULATOR_HOST = '127.0.0.1:19499'
$env:FIRESTORE_EMULATOR_HOST = '127.0.0.1:18480'
$env:PUBLISHED_EVENTS_RECOVERY_ISOLATED = 'true'
$env:PUBLISHED_EVENTS_RECOVERY_URL = 'http://127.0.0.1:5390'
$env:SMOKE_BROWSER_CHANNEL = 'chrome'
npm run test:published-events-recovery-browser --workspace frontend/react-app
```

Vite must have matching `VITE_FIREBASE_EMULATORS=true`, auth port 19499 and Firestore port 18480. The harness refuses production URLs and checks the browser's actual emulator project and endpoints. Output defaults to `frontend/react-app/test-results/published-events-recovery/`. The recorded run used Node v20.18.0, Java 21.0.6, Firebase CLI 15.36.0 and reused dependencies; it is not a fresh Node 24 setup check.

## Ownership and remaining human results

Ujjal's [existing November 11 acceptance](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/issues/139#issuecomment-6787716484) already accepts bounded QA backup support for Prachi's auth/navigation, backend APIs and privacy/persistence. This corrects the handoff's stale acceptance status. Acceptance does not establish an independent poster API/persistence review or permission for another person to certify Ujjal's tests.

Prachi's earlier moderation rationale and retry suggestion remain attributed to her actual replies. Her complete personal source explanation is still awaiting her answer. The assistance provided today explains that upload stores the poster, Send submits it for review, reviewer approval publishes it, and upload failure retains the text draft with retry/removal options. Prepared text alone is not a completed student explain-back.

Independent deployed candidate regression (#138/#167), the named non-author API/persistence review, candidate fresh setup/backup (#118), actual team sign-off (#177) and any required deployed Firestore/error result remain separate. This local evidence is offered for #166 verification support; it does not complete Devyana's own testing or waive a required provider failure. No new optional feature is added, and the supporting poster slice remains outside the core demo promise.

The separate provider test tracker [#158](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/issues/158) is closed, but has no tester-result comment. Its closed state alone does not verify a genuine provider upload; this follow-up does not claim that test passed or bring the optional poster flow into the frozen promise.

## AI use

Codex wrote the test harness, ran the local checks, inspected the screenshots and prepared the source-linked evidence at Prachi's request. Other students' report rows and existing local edits remain unchanged. No independent human work, team approval or percentage of human/AI authorship is inferred.
