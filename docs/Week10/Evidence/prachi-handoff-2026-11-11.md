# Prachi — November 11 ownership follow-up

**Owner:** `prachi2061`<br>
**Date:** November 11, 2026, Asia/Seoul — Week 10<br>
**Source revision:** [`db5bc20`](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/commit/db5bc20003889c5e6ca5a920a3fd8ded8468be6e)<br>
**Status:** Technical preparation and focused rerun complete; personal source explanation, accepted API backup and independent API/persistence review remain pending.

This is Prachi's follow-up to [Issue #139](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/issues/139), the [API/persistence handoff](../Prachi-API-Persistence-Handoff.md) and the [shared report](../Weekly-Report.md). It records current work without changing another student's declaration. Posters remain supporting work outside the frozen Login → Dashboard → Discover/Search → Event Details journey.

## Decisions and actual owner input

- **Confirmed scope decision:** retain manual review and defer automatic semantic duplicate detection until after the Week 11 freeze. Prachi confirmed this on November 9; [the decision comment](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/issues/139#issuecomment-6738508239) already records it. Same-ID retries are separate from matching different drafts.
- **Approval rationale already supplied:** Prachi explained that review is needed because anyone could submit unsuitable content and that she performs event-suggestion review. That applies to publishing suggested Events; Feed posts have their own flow.
- **November 11 failure answer:** Prachi identified retry as a possible recovery action. This is a partial behavior answer; it does not yet explain the retained draft, disabled Send button, removal option or source branches.
- **November 11 source walkthrough:** Prachi requested help distinguishing upload, submission and approval. The guide below supplies that explanation. A completed personal source explain-back is not claimed.

## Short guide: upload, send, approve

For example, a student proposes a film night and chooses a poster. These are three separate steps:

| Step | What changes | Source to locate |
|---|---|---|
| Upload poster | Image bytes go to Cloudinary after authentication and an owner-bound claim check. Validated image metadata returns to the private draft. Nothing is published in Events. | [`SuggestionPoster.upload`](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/blob/db5bc20003889c5e6ca5a920a3fd8ded8468be6e/frontend/react-app/src/SuggestionPoster.jsx#L13), [`uploadSuggestionPoster`](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/blob/db5bc20003889c5e6ca5a920a3fd8ded8468be6e/frontend/react-app/src/suggestion-poster-store.js#L13), [API handler](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/blob/db5bc20003889c5e6ca5a920a3fd8ded8468be6e/backend/src/feed-photo.js) |
| Send suggestion | The draft is validated. A Firestore batch writes the suggestion with `status: pending`, its ownership receipt and a submission notification. A successful upload alone does not perform this batch. | [`submitSuggestion`](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/blob/db5bc20003889c5e6ca5a920a3fd8ded8468be6e/frontend/react-app/src/suggestions-store.js#L40) |
| Approve and publish | An authorized reviewer confirms the required event details. A transaction links approval, an allocated numeric event ID and the shared published event. Firestore rules enforce reviewer permission and preserve the submitted poster. | [`publishSuggestion`](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/blob/db5bc20003889c5e6ca5a920a3fd8ded8468be6e/frontend/react-app/src/published-events-store.js#L15), [publication rules](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/blob/db5bc20003889c5e6ca5a920a3fd8ded8468be6e/backend/firebase/firestore.rules#L201) |

**Purpose:** let students suggest events while reviewer approval controls publication. **Inputs:** signed-in student, draft ID, prepared image, event fields and a later review decision. **Outputs:** poster metadata, then a pending suggestion, then an approved published event. **Dependencies:** React state, Firebase Authentication, Firestore transactions/batches and security rules, and the server-side Cloudinary integration. Provider credentials stay server-side.

### What happens when an upload fails?

For a valid selected poster whose upload fails, the text draft is kept, an error is shown, and the prepared selection can be retried on the current page. [`SuggestionPoster`](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/blob/db5bc20003889c5e6ca5a920a3fd8ded8468be6e/frontend/react-app/src/SuggestionPoster.jsx#L13) retains its pending selection; [`Suggestions`](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/blob/db5bc20003889c5e6ca5a920a3fd8ded8468be6e/frontend/react-app/src/Suggestions.jsx#L131) blocks sending while that selection is incomplete. The student can retry successfully or remove the optional poster and send a text-only suggestion after normal validation. No failed upload is described as successful or automatically published.

An invalid file rejected before preparation is a different case: it does not create a pending upload, so a valid text-only suggestion can still be sent. An unuploaded image blob is not a durable saved poster across reload; the text/account draft and successfully uploaded metadata are the persisted parts. Failed cleanup recovery across reload remains the separate open [bug #157](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/issues/157).

### Why can cleanup not remove a submitted poster?

[`retireSuggestionPoster`](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/blob/db5bc20003889c5e6ca5a920a3fd8ded8468be6e/frontend/react-app/src/suggestion-poster-store.js#L33) first attempts to retire the private image claim. The [claim update rule](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/blob/db5bc20003889c5e6ca5a920a3fd8ded8468be6e/backend/firebase/firestore.rules#L150) permits retirement only while no suggestion-ownership record exists after the write. Submission requires the matching claim to remain active. The [API handler](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/blob/db5bc20003889c5e6ca5a920a3fd8ded8468be6e/backend/src/feed-photo.js) also rejects cleanup of a submitted suggestion. API authorization and Firestore integrity are separate checks; both need review.

### Original authentication slice remains separate

The prepared [Google handler trace](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/blob/db5bc20003889c5e6ca5a920a3fd8ded8468be6e/frontend/apps.js#L367) awaits persistence and `signInWithPopup`. Only a returned credential reaches `startSession`; a rejected popup goes through the error handler, and `finally` restores the controls. Ujjal's [existing cancellation/retry result](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/issues/139#issuecomment-6708776312) is acknowledged. Neither that result nor this poster guide proves successful Google identity selection, login or session restoration; [#116](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/issues/116) stays open.

This guide is prepared with Codex assistance. Prachi still needs to locate these functions and explain the branches, dependencies and failure behavior in her own words, recording anything still unclear. Preparing the guide does not complete that human step.

## Current technical evidence

The [dated machine-readable receipt](prachi-handoff-2026-11-11.json) records the exact revision, commands, case names, source hashes and limits. Codex executed these checks at Prachi's request; they are new automated evidence, not a named teammate's independent review.

| Check, November 11 | Expected | Actual |
|---|---|---|
| [Focused poster API cases](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/blob/db5bc20003889c5e6ca5a920a3fd8ded8468be6e/backend/tests/suggestion-poster-api.test.js) | Valid claims return metadata; foreign/retired claims and submitted-poster edits are rejected; unsafe media, quota and provider failures return errors without leaking credentials or claiming deletion. | **6 PASS, 0 FAIL** using controlled Firebase/provider responses. No real provider upload. |
| [Focused poster permission cases](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/blob/db5bc20003889c5e6ca5a920a3fd8ded8468be6e/backend/tests/suggestion-poster-rules.test.js) | Claims stay private; submissions require the owner's active poster; retirement/submission ordering is safe; reviewer publication preserves the image. | **4 PASS, 0 FAIL** in a dedicated local Firestore Emulator at `127.0.0.1:18280`, project `demo-campusvibe-feed`, with repository rules. Test-owned emulator data only. |
| [Requested Devyana theme/notification review](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/issues/139#issuecomment-6786608721) | Review the source and rerun the requested theme, mobile-panel and storage-failure assertions. | **8 PASS, 0 FAIL** at `050673f`, recorded separately in the linked November 11 comment. Chrome/local Vite/demo activity; not live Firebase notification delivery. |

The original [November 9 signed-in browser workflow receipt](../../../frontend/react-app/verification/suggestion-posters/results.json) remains historical evidence with mocked Cloudinary transport and Firebase emulators. No new browser workflow or full suite is claimed here. A genuine authenticated provider upload remains untested in [#158](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/issues/158).

## Complete the human handoff

The existing proposed API backup is `ujjalpoudel75`; acceptance remains pending. A non-author can use the [repeat instructions](../Prachi-API-Persistence-Handoff.md#repeat-without-production-access) without Prachi's credentials. The new permission check used its own isolated emulator; the tests clear their configured demo database, so repeat them only in a dedicated test instance.

From the repository root, the focused commands are:

```powershell
node --test backend/tests/suggestion-poster-api.test.js
$env:FIRESTORE_EMULATOR_HOST = '127.0.0.1:8180'
node --test backend/tests/suggestion-poster-rules.test.js
```

Start the dedicated demo emulator described in the handoff before the second command. Another free port may be used with the matching environment variable; the receipt used 18280 to avoid existing instances.

The reviewer posts their own filled [peer receipt](prachi-2026-11-09.md#peer-receipt-to-complete) in #139: login/date/revision/setup, actual API success and rejection, actual Firestore success and rejection, functions traced, evidence, limits and backup acceptance or blocker. The review must check both sides of the interface. A green test prepared by the implementation assistant does not establish a second person's review.

| Remaining item | Responsible person | Completion evidence |
|---|---|---|
| Personal source explanation | Prachi | Own source-linked explanation of upload/submission/publication and one failure; name any remaining uncertainty. |
| API/persistence peer review and backup | Prachi coordinates; a non-author records their own acceptance/result | Actual success/failure receipt covering API and Firestore in #139; no reviewer completion is claimed now. |
| Real provider upload | Prachi coordinates the named tester/reviewer in #158 | Genuine upload, draft reload, approval, second-student render and safe failure, or a precise blocker. |

**Week 11 checkpoint:** November 12, 2026. If human review or a live-provider check is unavailable by the November 11 deadline, retain these pending items and use the frozen event-discovery path. Do not expand the demo promise.

## AI use and scope

Codex inspected repository sources and issue records, ran the focused fixture/emulator checks, prepared this guide and linked Prachi's own evidence. The duplicate decision and partial explanations came from Prachi's chat replies. No authorship percentage, completed student explain-back, peer acceptance, live upload or team-wide decision is invented. Other students' documents, report rows and rehearsal files are preserved. No application behavior, dependency, production data, provider setting or access grant changes.
