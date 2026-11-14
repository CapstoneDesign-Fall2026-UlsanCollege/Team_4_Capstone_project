# Member-ID display privacy — bug report and evidence

**Owner:** `prachi2061` (Prachi)

**Date:** November 15, 2026, Asia/Seoul — Week 11

**Status:** Display fix delivered; independent human review and authenticated production checking remain pending.

| Record | Exact reference |
|---|---|
| Reported concern | Members could see another person's internal account ID in shared screens. |
| Existing bug | [Issue #172 — member-ID display privacy](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/issues/172), closed after delivery. |
| Implementation | [PR #173](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/pull/173), merged with three authored commits. |
| Delivered revision | [7f2b838](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/commit/7f2b83859c9cfe8a0ff45ac873da1c3d20b12de0). |
| Release result | [Issue #172 release proof](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/issues/172#issuecomment-6882350274). |
| Preparation and execution | Prachi requested and owns the correction. Implementation, tests and this report were prepared with Codex assistance; automated checks are labelled below. |

## Problem, impact and reproduction

The previous interface rendered raw Firebase account IDs beside names in Feed posts/comments, Friends cards/requests/shortcuts and conversation inbox/headers. Accessible action names also included the ID. Profile offered an ID copy action, and friend-notification navigation inserted the actor's ID into the people-search input.

This unnecessarily exposed an account-correlated identifier during ordinary use. This report concerns interface metadata exposure; it does not establish an authorization bypass or account anonymization.

The pre-fix source is pinned at [35567e5: MemberId.jsx](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/blob/35567e574fd6cb13f700e554e1d20be3d6bd99b3/frontend/react-app/src/MemberId.jsx) and [the previous identity-label helpers](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/blob/35567e574fd6cb13f700e554e1d20be3d6bd99b3/frontend/react-app/src/profile-photo.js). The before behavior is supported by the user's report and source inspection; no new before-fix browser run was performed for this documentation change.

To reproduce that version safely with fictional accounts:

1. Use a separate checkout of revision `35567e5`, an isolated `demo-campusvibe-feed` Auth/Firestore emulator and a localhost Vite server.
2. Create and verify fictional accounts through the emulator, then enter Campus Vibe-Feed.
3. View Friends and a shared post/comment. Establish an accepted friendship and open Messages.
4. Observe the raw account ID in identity rows and accessible request/conversation names. Inspect the own-Profile ID/copy action and the search field after opening a friend notification.

**Expected after correction:** ordinary identity displays use public names, colleges and photos/initials; search and accessible labels do not add internal account IDs. Existing friend requests and messages must still address the intended account.

## Delivered correction and source trace

| Boundary | Implemented behavior | Source |
|---|---|---|
| Public identity and search | Selects only public name/college for labels and matching; ignores ID and email properties. | [member-identity.js](../../../frontend/react-app/src/member-identity.js) |
| People and requests | Removes ID text and unnecessary ID values on person/request DOM markers; keeps the original internal request target. | [SharedFriends.jsx](../../../frontend/react-app/src/SharedFriends.jsx) |
| Conversations | Uses public identity labels while retaining connection-based routing and per-conversation state. | [SharedMessages.jsx](../../../frontend/react-app/src/SharedMessages.jsx) |
| Feed and notification entry | Removes current-user/friend shortcut ID rows and arbitrary ID-driven profile lookup; friend notifications open Friends with an empty search field. Known contacts still resolve beyond the directory window. | [SharedFeed.jsx](../../../frontend/react-app/src/SharedFeed.jsx) |
| Posts and comments | Removes the shared author/commenter ID renderer; existing avatars remain. | [Feed.jsx](../../../frontend/react-app/src/Feed.jsx) |
| Profile | Removes own ID/copy controls and updates the shared-identity wording. | [Profile.jsx](../../../frontend/react-app/src/Profile.jsx) |

Implementation, regression coverage and evidence are preserved separately in [8f1cbab](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/commit/8f1cbab44835fca327012596ec03ed6b80989c82), [ee6fa9d](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/commit/ee6fa9de97cced3b037f994c148531ff655aa820) and [541a4df](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/commit/541a4dfa9c4a39d2da2825a6d3cd6aec3a476bb0). The code/test receipt records 17 source entries, including the removed renderer, whose contents can be checked against the delivered revision.

## Recorded results and limits

These are the existing November 15 results linked by PR #173 and Issue #172, not new application runs for this report. Executor: Codex-assisted automation. Signed-in workflows use fictional verified emulator accounts and generated thumbnails.

| Method | Actual result | What it establishes |
|---|---|---|
| Public-identity/photo units | 5 PASS | Label/search selection ignores internal IDs and email; photo validation remains covered. |
| Firestore permission suite | 49 PASS | Existing authentication, ownership and private-data permissions continue to pass in the emulator. Backend rules were unchanged by this display fix. |
| Explicit privacy checks | 7 PASS | Visible text, accessible labels and visible inputs were checked in Friends, inbox/conversation, posts/comments and own Profile, including 1440px, 390px and 320px views. |
| Social workflows | Five suites PASS | Profile photos/same-name recipient delivery, notifications, social regressions, comment components and shared Feed/messaging; includes reload, account switching and message history. |
| Selected Playwright smoke checks | 46 PASS; 0 unexpected, flaky or skipped | Desktop/mobile regression coverage for Profile, notifications/failures, navigation and event sharing. |
| Production build | PASS | The bundle builds; the existing Vite bundle-size advisory remains. |
| Deployed readiness | Desktop 1440px and mobile 390px PASS | Guest Profile/Feed and the actual served JS show the updated code. No real login or production member-data read/write was performed. |

The seven privacy assertions are part of the photo/social workflow, not seven additional suites. Successful checks were retained across initial/resumed runs. A legacy notification fixture needed explicit reviewer publication details, a stale disabled-Photos expectation was updated, an occupied emulator port was avoided and the final Feed runner used installed Chrome. Those fixture/environment corrections are recorded in the receipt rather than presented as extra production bugs.

- [Full code/test receipt, source hashes and repeat setup](../../../frontend/react-app/verification/member-id-privacy/results.json).
- [Same-name Friends — desktop](../../../frontend/react-app/verification/member-id-privacy/same-name-friends-desktop.png).
- [Conversation — mobile](../../../frontend/react-app/verification/member-id-privacy/same-name-chat-mobile.png).
- [Own Profile — desktop](../../../frontend/react-app/verification/member-id-privacy/profile-photo-desktop.png) and [mobile](../../../frontend/react-app/verification/member-id-privacy/profile-photo-mobile.png).
- [Recorded production check](prachi-member-id-privacy-production-2026-11-15.json): November 15 at 03:37 KST, stored as `2026-11-14T18:37:34.092Z`. This is an unchanged copy of the existing check linked in the release comment, not a new live result.

## Privacy boundary and next check

Internal IDs remain in authenticated Firebase responses, document paths and existing asset/request data. Removing them from displays does not make them secret or replace the server identity model. New-person discovery retains the first-100 directory boundary; known contacts continue to resolve outside it. Duplicate-name testing used different colleges/photos and does not establish that two otherwise identical public profiles are distinguishable.

The correction supports existing Feed/Profile behavior; it adds no feature to the frozen Events demonstration promise. Broader identifier separation or public usernames would require an agreed product requirement and separate implementation/evidence.

| Remaining check | Status and owner/action |
|---|---|
| Independent live review of Friends, request labels, posts/comments, Profile and Messages | Pending. Prachi should arrange a non-author check and link the tester's own dated device/view, expected/actual result and proof to Issue #172. No reviewer is assigned or certified by this report. |
| Authenticated production privacy/recipient check | Pending. Use authorized test accounts and record the actual result separately from emulator and guest/asset readiness. |
| Stronger identifier separation or an additional public identity field | Requirement not decided. Prachi can clarify the need; this is outside the completed display correction. |

## Documentation verification and attribution

This report and the linked production receipt collect existing evidence. The follow-up documentation PR validates links, source hashes and preservation of existing work; it performs no new application build, suite, real login or independent teammate review.

Only Prachi's Week 11 contribution row receives the new links. Other students' entries, rehearsal records and existing source/evidence files retain their contents. Codex prepared this prose and checked the references; personal source explain-back and independent review are not certified. No external implementation code, media or dataset is added.
