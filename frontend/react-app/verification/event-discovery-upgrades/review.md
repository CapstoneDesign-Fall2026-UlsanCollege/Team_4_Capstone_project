# Event date filters and sharing — November 11, 2026

Owner: prachi2061. [Enhancement #163](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/issues/163). Codex implemented the change and performed the technical checks at the user's request. [Exact results, commands, case names and source hashes](results.json).

Discover now offers All dates, Today, This weekend, Upcoming and Past events. Dates use Asia/Seoul; Upcoming includes today and This weekend covers Saturday/Sunday of the current campus week, including on Sunday. All dates stays the default. Search, categories, sorting and saved-only filtering combine with dates; the dialog and quick controls stay synchronized. Empty results explain reset, and an active range refreshes at campus midnight when the page is active.

Event details use `#/community/events/ID`. Share event uses native sharing when available, then clipboard, then a visible selectable link. Cancelling native sharing keeps the dialog usable. The route survives sign-in, guest entry for sample events, reload, and Back/Forward; closing returns to the originating page or Discover for a directly opened link. Published events keep the member sign-in requirement.

A bounded `id == eventId, limit(1)` Firestore listener can resolve a published event outside the latest-100 list. Successfully opened linked records remain available during that account session and are cleared on logout/account change. An empty cached result stays loading and then shows a retryable connection error; only a server-confirmed empty result is labelled unavailable. Rules, indexes, provider settings and billing are unchanged.

## Validation

| Check | Actual result | Boundary |
|---|---|---|
| Unit/model regressions | 22 PASS | Korean midnight/weekend/year boundary, safe routes/URLs, linked-record retention/clearing and existing calendar/status behavior. |
| Core browser checks | 24 PASS | New date/sharing cases plus navigation and core event regressions; desktop/mobile Chrome. |
| Related browser checks | 62 PASS | Existing dialogs, maps/trips, photos, published catalogue/profile, notifications, Assistant and Profile. |
| Published-event permissions | 7 PASS | Dedicated Firestore Emulator; includes the bounded ID query and signed-out/anonymous rejection. |
| Signed-in browser workflow | 16 checks PASS | Fictional emulator accounts; 101 fixture events, older-ID lookup, reload/save, missing event, offline cache/error/reconnect and logout clearing in both viewports. |
| Production build | PASS | Existing Vite chunk-size advisory; no dependency change. |

The initial browser run caught a same-document hash-navigation test assumption and a close/history timing concern. The test now respects the existing demo session; route changes are performed explicitly on user close/cancel rather than inferred from delayed close events. The complete final selected browser run is 86 PASS, 0 failed/flaky, with retries disabled. This is pre-release verification, not a claim of a production incident.

## Repeat

From the repository root:

```powershell
npm run test:event-discovery --workspace frontend/react-app
npm run test:smoke --workspace frontend/react-app -- tests/smoke/event-discovery-upgrades.spec.js tests/smoke/event-sharing.spec.js tests/smoke/navigation.spec.js tests/smoke/events.spec.js
npm run build
```

For signed-in integration, start a dedicated empty `demo-campusvibe-feed` Auth/Firestore emulator and an emulator-backed Vite preview as described in the [existing isolated setup](../../../../docs/Week10/Prachi-API-Persistence-Handoff.md#repeat-without-production-access). Use consistent emulator ports in Vite and the test process; the test requires `EVENT_LINKS_TEST_ISOLATED=1`, `FIRESTORE_EMULATOR_HOST`, `EVENT_LINKS_TEST_URL` (plain localhost URL without trailing slash) and optional `EVENT_LINKS_OUTPUT`. Run rules first because they clear the configured demo database, then run `npm run test:event-links-browser --workspace frontend/react-app`. The recorded run used Auth 29199, Firestore 28280 and Vite 25188. The browser harness creates only fictional emulator accounts/events and removes its fixture events.

## Screenshots and limits

- [Date controls, desktop](date-filters-1440.png) / [mobile](date-filters-390.png).
- [Manual share fallback, desktop dark mode](share-fallback-dark-1440.png) / [mobile dark mode](share-fallback-dark-390.png). Browser sharing/clipboard failures are controlled fixtures.
- [Signed-in linked event, mobile](shared-event-390.png) and [offline recovery state](offline-390.png), both fictional local emulator data.

No team documents, report rows or rehearsal files change. Existing sample data remains explicitly labelled. This evidence does not establish a real Google login, production authenticated event lookup, genuine provider upload, independent human ownership explanation or completion of Issues #116/#117. Production guest readiness is checked separately after deployment.
