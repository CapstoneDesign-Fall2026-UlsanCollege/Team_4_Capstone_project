# Prachi — API and persistence handoff

**Owner:** `prachi2061`<br>
**Prepared:** November 9, 2026, Asia/Seoul — Week 10<br>
**Status:** Repeatable technical evidence linked; human explain-back, backup acceptance and independent API/persistence review pending.

This supports the [Week 10 ownership milestone](../Week9/Final-demo-Roadmap.md#6-roadmap-milestones) and [Issue #139](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/issues/139). It documents the existing poster slice delivered in [Issue #153](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/issues/153) / [PR #154](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/pull/154); it adds no feature or demo promise. Suggestions remain supporting work. Prachi's original Google entry/recovery slice remains in the [shared audit](ai-use-and-code-ownership-audit.md#prachis-prepared-source-explanation).

## Start here: area, check and backup

The [audit area map](ai-use-and-code-ownership-audit.md#codebase-area-map) remains the single area reference. This guide supplies the API area's operational handoff, not a second team role map.

| Responsibility | Entry point or action |
|---|---|
| API boundary | [Backend adapter](../../backend/api/suggestion-photo.js) selects `createPhotoHandler({ purpose: 'suggestion' })` in the [request handler](../../backend/src/feed-photo.js). The [deployment adapter](../../frontend/react-app/api/suggestion-photo.js) and [Vite wiring](../../frontend/react-app/vite.config.js) expose the same route. |
| Data boundary | [Poster store](../../frontend/react-app/src/suggestion-poster-store.js), [suggestion store](../../frontend/react-app/src/suggestions-store.js), [publication transaction](../../frontend/react-app/src/published-events-store.js), and [Firestore rules](../../backend/firebase/firestore.rules). Cloudinary stores image bytes; Firestore stores ownership and validated metadata. |
| Primary health check | From the repository root: `npm run test:backend`. This runs controlled API fixtures, including valid upload, ownership rejection, quota and provider failures. It needs no Firebase project access or real provider credentials. |
| Cross-area check | Run `npm run test:rules`, then `npm run test:suggestion-posters-browser --workspace frontend/react-app` against the isolated emulators below. |
| Support contact | `prachi2061`; any teammate may inspect, test or change the area. No personal permission from Prachi is required to run the local fixtures. |
| Backup person | `ujjalpoudel75` is the existing proposed backup in the audit. API-area acceptance is **pending**; this guide does not assign or certify that person's work. Any available non-author may record the review. |
| If the backup is unavailable | A non-author can start with the API fixture and source links without production access. If Java/Chrome/setup is blocked, record that blocker in #139; the isolated API/model checks remain available. Do not count an unrun browser check as a pass. |
| If the provider fails | Keep the text draft; retry or remove the optional poster before sending. For the core demo, follow the roadmap's tested event-discovery path and omit this optional upload. Production configuration changes follow the deployment process, not a request for the steward's password. |

## Trace the interface from input to persistence

1. A signed-in student chooses a JPG, PNG or WebP in [SuggestionPoster.jsx](../../frontend/react-app/src/SuggestionPoster.jsx). The [preparation function](../../frontend/react-app/src/feed-photo.js) makes a JPG up to 300 KB / 1280 pixels; original input is limited to 10 MB. An incomplete upload blocks Send.
2. `uploadSuggestionPoster` reserves `campusSuggestionPhotos/{photoId}` with the user's UID, suggestion ID and active status, then sends the prepared image and IDs to `/api/suggestion-photo` using the [authenticated photo request](../../frontend/react-app/src/shared-photo-store.js).
3. The API verifies the Firebase token and matching active private claim, consumes the shared account photo quota, and calls Cloudinary. It returns `photo = { id, publicId, src, width, height }`. The [poster model](../../frontend/react-app/src/suggestion-poster.js) validates its cloud, folder, IDs and dimensions. Public paths omit the author UID, but anyone holding an image URL can view it.
4. The client stores that metadata with its private account draft. `submitSuggestion` writes the suggestion and ownership receipt atomically. **A successful API response is not a submitted or published event.**
5. A reviewer confirms date/location; `publishSuggestion` atomically writes the approved suggestion, numeric event allocation and `campusPublishedEvents/{suggestionId}`. Rules require the published poster to equal the submitted poster. Students see the published image through the shared catalogue.
6. Draft removal retires the claim before image cleanup. Rules reject submission with a retired claim, and reject retirement after submission. A reviewer must check both sides of this handoff: API authorization alone does not establish a valid Firestore write.

## Repeat without production access

Use the [root setup](../../README.md#quick-start) and [emulator prerequisites](../../README.md#testing): Node/npm, Firebase CLI, Java 21 or later, and installed Google Chrome for this browser harness. Record `git rev-parse HEAD`, `node --version`, `npm --version` and `firebase --version`. The linked evidence tested [revision 0672013](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/commit/0672013c5615e5e40fb899a8c51d56cffb703cd7); a later checkout is a new result.

From a clean checkout, install and run the first check:

```powershell
npm ci
npm run test:backend
npm run test:suggestion-posters --workspace frontend/react-app
```

Terminal 1, repository root:

```powershell
firebase emulators:start --project demo-campusvibe-feed --config backend/firebase/firebase.account-test.json --only auth,firestore
```

Terminal 2, repository root; keep this development server running:

```powershell
$env:VITE_FIREBASE_EMULATORS = 'true'
$env:VITE_FIREBASE_AUTH_EMULATOR_PORT = '9199'
$env:VITE_FIREBASE_FIRESTORE_EMULATOR_PORT = '8180'
$env:FIREBASE_AUTH_EMULATOR_HOST = '127.0.0.1:9199'
$env:FIRESTORE_EMULATOR_HOST = '127.0.0.1:8180'
npm run dev -- --host 127.0.0.1 --port 5188 --strictPort
```

Terminal 3, repository root; run these **in order**:

```powershell
$env:FIRESTORE_EMULATOR_HOST = '127.0.0.1:8180'
$env:SUGGEST_POSTER_TEST_URL = 'http://127.0.0.1:5188'
npm run test:rules
npm run test:suggestion-posters-browser --workspace frontend/react-app
```

Use a dedicated empty `demo-campusvibe-feed` emulator instance: permission tests and the browser cleanup clear that emulator's documents. The browser script creates fictional student/reviewer accounts and mocks Cloudinary transport; no production reviewer grant, API secret or login from Prachi is needed. Do not run these two checks concurrently. Results and four screenshots appear under `frontend/react-app/test-results/suggestion-posters/`.

## Expected behavior, actual evidence and limits

These are **existing November 9 automated results**, not new tests performed while writing this guide.

| Check | Expected | Recorded actual result / receipt |
|---|---|---|
| API success and ownership failure | A matching active claim returns validated metadata. A foreign, mismatched or retired claim returns 403 before Cloudinary is called. | PASS in the [API cases](../../backend/tests/suggestion-poster-api.test.js); included in the 36-case [receipt](../../frontend/react-app/verification/suggestion-posters/results.json). Provider/auth/database responses are controlled fixtures. |
| Persistence failure boundary | Retire first: submission is denied. Submit first: claim retirement is denied. Publication cannot omit or change the poster. | PASS in [poster permission cases](../../backend/tests/suggestion-poster-rules.test.js), within 44 emulator permission cases in the receipt. |
| Complete interface | Upload failure keeps Send disabled; retry works; reload preserves the draft; reviewer sees the image; approval carries it into Details, Discover, Saved and Profile. | PASS: 20 checks across desktop 1440×900 and mobile viewport 390×844 in the [receipt](../../frontend/react-app/verification/suggestion-posters/results.json), [form](../../frontend/react-app/verification/suggestion-posters/poster-form-390.png) and [Profile](../../frontend/react-app/verification/suggestion-posters/poster-profile-390.png). Firebase is emulated; Cloudinary is mocked. |
| Deployed readiness | Route configured, unauthenticated upload rejected, demo requires sign-in. | Recorded in [PR #154 release verification](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/pull/154). Read-only production checks, not a real authenticated provider upload. |

## Independent review still required

The original Google recovery slice already has [ujjalpoudel75's reported cancellation/retry PASS](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/issues/139#issuecomment-6708776312). That is a different functional check; it does not confirm this API/persistence handoff, backup acceptance or Prachi's source explain-back.

A non-author records their own comment in #139 using the [peer receipt fields](Evidence/prachi-2026-11-09.md#peer-receipt-to-complete). They should locate the API and persistence tests from this page, repeat one success and one failure case, and answer: **Why does API upload success not publish an event, and what prevents cleanup from removing a submitted poster?** Record both the API outcome and the Firestore outcome, the source functions, and any limit or blocker. Status stays pending until that person supplies the result; automated preparation does not establish Exceeds.

## Duplicate-draft decision

**Question:** Should two separately created drafts describing the same real event be warned about, allowed, or sent to manual review? This is a product/scope decision, not a verified defect or a tested prevention feature.

**Owner:** `prachi2061`. **Decision point:** November 11, 2026, end of day KST, before the Week 11 ownership checkpoint. **CONFIRMED by Prachi, November 9:** defer automatic semantic duplicate detection until after the Week 11 freeze and retain manual review. This resolves the current scope decision; it does not claim semantic duplicates are detected or blocked. See the [professor-feedback follow-up](Evidence/prachi-2026-11-09.md#professor-feedback-follow-up) for the decision, personal explanation and independent-review status. Record the decision in #139 with the team input, user example and roadmap consequence. If it is not needed for the frozen core, defer it with a reason; if justified, define a separate bounded Issue and acceptance check before implementation. No prevention is added by this handoff.

Existing same-ID retry behavior in [submission](../../frontend/react-app/src/suggestions-store.js) and [publication](../../frontend/react-app/src/published-events-store.js) must not be described as semantic duplicate detection across different drafts. The [publication receipt](../../frontend/react-app/verification/published-events/results.json) covers idempotent retries, not that unresolved product rule.

## AI use and ownership

Prachi owns the implementation follow-up, review request and explanation. Known assistance is specific: Codex helped implement and check the poster change in PR #154; its note identifies generated/edited code, API/permission/model checks, emulator workflows and remaining live/human limits. For this documentation change, Codex inspected the current source and receipts and prepared the handoff, linked follow-up and preservation checks. No new application code, runtime result or independent review is generated by writing this guide. Prachi's personal explain-back and a non-author's review remain pending; no percentage of human/AI authorship is asserted.

Course field structure comes from the user-supplied Week 10 checklist and [course work checklist](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/course-materials/blob/12926496c4bc533d0997bbcd182b90eb95094c2b/week-10/work-checklist.md). Project-specific explanations and limits are traced to the linked repository sources.
