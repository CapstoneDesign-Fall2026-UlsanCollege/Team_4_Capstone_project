# MVP scope freeze and candidate - November 18, 2026

**Coordinator:** prachi2061 (Prachi). **Tracker:** [#177](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/issues/177).

**Scope freeze: IN EFFECT for Prachi's work**, following her instruction "freeze MvP" on November 18, Asia/Seoul. Stop new feature work; use the existing recovery/verification route. **Team release/final-demo approval: PENDING.** This instruction does not supply another member's sign-off or make the MVP fully verified. The [existing roadmap](MVP-Freeze-Final-Road%20Map.md) and [verification checklist](MVP-Verification-Checklist.md) retain their required checks.

## Fixed scope

The demonstration path is **Landing -> verified Login -> Dashboard -> Discover/Events -> Search/Category -> Event Details -> refresh/session -> Logout**. Include an empty-search result and clear-filter recovery. Retain existing authentication/recovery, published-event display and responsive/theme requirements; unrun requirements remain gates rather than being removed to claim completion.

Keep sample listings visibly distinct from published Firestore events. A sample/guest demonstration is a labelled fallback, not proof of authentication or live database loading. A cached warning, direct emulator HTTP 403 or blocked network request is not proof of the application's terminal listener-error UI.

Assistant, Community/Feed, friends/messages, profile/badges/photos, maps/trip planning, notifications and suggestion/poster enhancements are supporting features outside this frozen demonstration promise. Existing implementations remain available; defer upgrades, new dependencies and cosmetic redesigns. Only defects affecting the agreed promise, verification and evidence corrections enter this freeze work.

## Exact candidate and deployment

| Field | Value |
|---|---|
| Candidate commit | [e5f1888aa4600ac2013d6bda34a55554ba68195f](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/commit/e5f1888aa4600ac2013d6bda34a55554ba68195f) |
| Candidate tag | [mvp-candidate-2026-11-18](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/tree/mvp-candidate-2026-11-18) |
| Candidate production deployment | [Revision-specific Vercel URL](https://campusvibe-fnh5f79me-campus-vibe.vercel.app) |
| Deployment binding | GitHub deployment 7861261466: Production, SHA above, success. [Deployment metadata](https://api.github.com/repos/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/deployments/7861261466); [status](https://api.github.com/repos/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/deployments/7861261466/statuses). Metadata proves the recorded deployment binding, not a successful user journey. |
| Stable public alias | [campusvibe-theta.vercel.app](https://campusvibe-theta.vercel.app/) may advance; use the exact SHA/tag and revision-specific URL for receipts. |
| Local automated result | Build PASS; 28 unit tests PASS; 24 desktop/mobile browser cases PASS, zero failures/flaky/skipped. [Machine-readable receipt](Evidence/mvp-candidate-checks-2026-11-18.json). |
| Team-approved release revision | **contionally approved**; [Team conditional approval](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/issues/177#issuecomment-6969792911)this is a pinned candidate, not an approved final release. |

The candidate predates this documentation PR. Documentation-only commits do not replace the candidate SHA. If the revision-specific deployment requires access, record that blocker; do not silently test a different revision or claim independent access.

## Candidate checks still required

| Check and existing owner | Expected result / evidence to save | Status and fallback |
|---|---|---|
| Authenticated core regression - ujjalpoudel75; existing independent auth support DevyanaCT | Exact candidate SHA and deployment URL, named tester/date, browser/device, expected/actual Login -> Dashboard -> search/category -> Details -> refresh -> logout/re-login, empty-search recovery, screenshot/result links in #138/#167 and #177. Confirm remaining recovery/session/email restrictions where required. | **PARTIAL / RETEST REQUIRED**. [Tulsey's nine candidate checks](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/issues/138#issuecomment-6968940271) passed. Ujjal separately reported Google re-login blocked; the [candidate-hostname repair](Evidence/prachi-candidate-google-domain-2026-11-18.md) now restores provider-page readiness. Ujjal's complete real-account re-login/session retest remains pending. |
| Firestore runtime boundary - DevyanaCT verification contact; Prachi coordinates any defect fix | Controlled application listener permission-denied, terminal loading-error and Retry results in #166; distinguish samples/published/cached results. Confirm intended search/filter behavior after refresh. | **LOCAL AUTOMATION PASS**: [Prachi's November 18 receipt](Evidence/prachi-candidate-runtime-2026-11-18.md) exercises actual emulator permission denial/Retry and a controlled terminal loading callback/Retry in both viewports. Independent/deployed acceptance and the refresh requirement decision remain pending. Existing independent 8/8 field comparison stays complete; callback injection is not proof of a real provider failure. |
| Clean setup / backup - tulseyy8848 | Fresh checkout of the candidate, installation/runtime versions, exact commands, actual journey and limitation in #118. Use Node 24.x for deployment parity. | **PASS for documented setup scope**. Tulsey's exact-candidate setup/build and 118-test run are recorded in #118. [Devyana's independent worktree/npm-ci/startup/core-page/build check](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/issues/118#issuecomment-6968864555) is complete; she did not repeat the 118-case suite. This setup result does not supply full Google authentication or team approval. |
| Source explanation / ownership - Prachi | Her own explanation of a relevant source path and failure, unclear parts, and required independent handoff evidence in #139/#177. | **PENDING**. AI-prepared prose and tests do not certify human explain-back. |
| Final release decision - actual team sign-off, coordinated by Prachi | Link the decision, accepted scope/limitations, exact candidate, candidate results, next owner and backup proof in #177. | **conditionally approved**.[Team conditional approval](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/issues/177#issuecomment-6969792911) Do not close #177 or mark final freeze readiness complete without the actual record. |

Owner names reference existing roles, not new acceptance or tests performed on their behalf. The current checkpoint remains **November 18, end of day KST**; pending work stays visible.

## Reproduce the bounded automated check

Check out the candidate tag or full SHA; from the repository root use the normal installation instructions in [README](../../README.md#quick-start), then run:

```sh
npm run build
npm run test:event-discovery --workspace frontend/react-app
npm run test:published-events --workspace frontend/react-app
npm run test:email-verification --workspace frontend/react-app
npm run test:smoke --workspace frontend/react-app -- events.spec.js navigation.spec.js event-discovery-upgrades.spec.js published-catalogue.spec.js theme-toggle.spec.js event-dialog-close.spec.js
```

The recorded run reused installed dependencies on Windows with Node v20.18.0 and installed Chrome, at 1440x900 and 390x844 viewports. It was not a Node 24 clean install, physical-device test, live account/provider run or independent teammate check. The browser cases use guest/sample data and local published-event fixtures. Build warnings about experimental JSON imports and chunks over 500 kB remain warnings; no dependency or build-output change was made for them.

For the recorded Chrome configuration, set `SMOKE_BROWSER_CHANNEL=chrome` in your shell before running the browser command. Otherwise follow README's Playwright browser installation and record the actual browser used.

Windows test-server teardown stalled after the browser worker exited. Stopping only the verified local Vite server on port 4178 allowed Playwright to emit the 24-pass report and exit 0. No case was changed or retried. The recorded duration includes that cleanup wait and is not a timed demonstration rehearsal.

## Change control and attribution

For a blocking defect, link an issue with owner, expected/actual failure and a bounded fix; open a PR, run affected checks, and record a replacement SHA plus a new candidate tag. Never move this tag or silently substitute a later main commit. Optional enhancements wait until the release decision; no database/provider/billing/branch-protection setting changes are part of this freeze.

Codex pinned the candidate, ran the local checks and prepared the freeze record at Prachi's request. Other members' report rows, existing roadmap text and local uncommitted edits remain unchanged. No human sign-off or understanding is generated by this work.


## November 18 additional local verification

[Prachi's new receipt](Evidence/prachi-candidate-runtime-2026-11-18.md) adds 18 authenticated/emulator/error-recovery browser checks, 7 poster API fixture cases and 4 poster permission cases. These are Codex-assisted local results on unchanged candidate application sources. Team approval, the independently executed deployed regression, fresh setup and personal explanation remain pending; no teammate's result or sign-off is filled on their behalf.


## November 18 candidate auth repair and received team checks

The [current handoff](Evidence/prachi-candidate-google-domain-2026-11-18.md) supersedes earlier setup-pending entries for the linked scopes: independent backup setup and Tulsey's nine candidate checks are recorded. Ujjal's separately reported Google re-login blocker led to adding only the exact candidate hostname to Firebase authorized domains. Live provider-page/popup readiness is recorded with its initial timing failure; a real-account re-login retest and final team approval remain pending. Devyana's newer Firestore evidence review and the team's refresh/filter expectation decision remain open.
