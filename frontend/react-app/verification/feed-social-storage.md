# Feed Social Actions and Device Storage Verification

Recorded on 2026-10-13 for [Issue #58](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/issues/58).

## Delivered Implementation

The social controls and account-keyed IndexedDB store are already on `main` in [ea4dec0](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/commit/ea4dec0). This independent follow-up adds verification evidence only; it does not resubmit runtime code or add backend permissions/sharing.

## Automated Production Results

Fresh checks against [CampusVibes](https://campusvibe-theta.vercel.app) passed:

- Switch between All posts and Friends audiences; search by college; show the no-results state and restore the feed after clearing search.
- Like a sample post, add a comment, mark an attached event as interested, and save the post. The changed state remained when switching to the Saved posts view.
- Accept a sample incoming friend request, send an outgoing request to another sample profile, and cancel that outgoing request.
- Switch between Community and the feed without losing the device-local feed state.
- Log out and hide the feed, returning to the signed-out login screen.

The main feed workflow reported no uncaught page errors. These checks use the demo session and sample profiles, not real messages or relationships with other students.

## Controlled Storage Checks

- Using the browser's existing session bridge with synthetic UID `local-test-one`, create a device-local post. Switch to synthetic UID `local-test-two` and confirm it has the three seeded posts and does not display the first UID's post.
- In a separate disposable browser context, inject an IndexedDB open failure. Confirm a readable storage-unavailable error and that selecting Community still opens the Community view.

Both checks passed. The synthetic-UID test exercises account-key routing within the client store; it does not sign in two real Firebase users or prove a server-side authorization boundary. The storage failure is injected, not a claim that normal production storage is broken.

## Repeatable Review

1. Enter the demo via Explore events, select Campus Vibe-Feed, and compare All posts and Friends audiences. Search for a sample college and an absent phrase; clear search.
2. Like, comment on, mark interest in, and save a sample event post. Open Saved posts and confirm the updated states. Use disposable comments, not personal information.
3. Open Friends, accept an incoming sample request, send a request to an available sample profile, and cancel it. Separately exercise decline on a fresh sample feed; decline was not independently asserted by the automated workflow listed above.
4. Switch to Community and back, then log out. Confirm the feed is hidden when signed out.
5. In a disposable local test environment, repeat the synthetic-UID routing and injected unavailable-IndexedDB cases. Do not describe these controlled cases as real-account or backend-security tests.

## Scope and Safety Limits

IndexedDB holds posts, photo blobs, and social state in account-keyed records on this browser/device. It is not a server access-control boundary; users with local browser access can inspect or alter client data. A logout hides the feed but is not a secure deletion of device storage.

Sample friends are fictional. Requests, likes, comments, interests, and saved posts are not sent to other accounts/devices. Shared multi-account data, notifications, moderation, privacy policies, and Firebase permission rules need a separate future backend implementation. The current change does not enable cloud storage or change billing.

These automated checks do not replace independent teammate rehearsal in [Issue #53](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/issues/53).
