# Restored Feed With Real Social Data

The signed-in feed reuses the existing rich post-card design and restores
Friends, Saved posts, My posts, the friends sidebar, and All/Friends filtering.
These views use Firestore records, not the guest feed's fictional PEOPLE list.

## Real Data and Permissions

| Feature | Persistence | Authorization |
|---|---|---|
| Text/event posts | campusFeedPosts | Signed-in reads; author-only editing and deletion. |
| Campus profiles | campusFeedProfiles | Public to non-anonymous members; owner-only writes. Only display name and college are published. |
| Likes and interest | Post reactions subcollection | One actor-keyed record per reaction type; only that actor can create it. |
| Comments | Post comments subcollection | Author-owned text; comment author or post author can delete. Impersonation and field mutation are denied. |
| Saved posts | Owner profile's savedPosts subcollection | Private to the account; loaded post IDs survive new sessions and can fetch posts outside the latest-feed window. |
| Friend requests | campusFeedConnections | Only participants can read; sender creates a pending invitation and only recipient accepts. Either participant may remove it. |

Real profiles appear when members first open the shared feed. Display names
and college names remain self-reported. Friend discovery lists up to 100
profiles; there is no verified college directory or online-presence signal.
Posts are shared with authenticated members; Friends is a viewing filter,
not a private-post audience.

## Photo Decision

The user chose to keep Firebase billing disabled. The project had no Storage
bucket when inspected. Shared photo uploads are therefore unavailable and the
Photos control is disabled with a tooltip. No billing settings were changed,
no storage bucket was created, and no photo data was placed in Firestore as a
substitute. Guest demo photo uploads remain device-local.

## Verification - October 14, 2026

- All 11 emulator permission tests passed, including profile ownership, reaction/comment impersonation, private saves, and friend acceptance/participant restrictions.
- The two-account emulator browser workflow passed text/event publishing, live likes and interest, live comments, saved-post reload, friend request/acceptance/removal, Friends filtering, editing, deletion, offline controls, and isolated guest-demo entry.
- Deleted posts disappear from saved views. Post deletion also removes the bounded loaded reaction/comment records in a batch.
- Desktop/mobile layout checks passed at 1536, 1024, 768, 390, and 320px, with no document horizontal overflow or uncaught page errors.
- All four existing Community Events smoke checks passed.
- Production build passed. The existing large-bundle warning remains.

Screenshots use fictional emulator test accounts, with real shared persistence
inside the emulator: [desktop](real-social-feed/shared-feed-1536.png),
[mobile](real-social-feed/shared-feed-390.png). They are automated test evidence,
not an independent teammate test or screenshots of real students.

Use the [existing emulator setup](shared-feed.md#repeat-locally), then run
`npm run test:feed-rules` followed by `npm run test:shared-feed`.
Do not run them simultaneously: permission tests clear the test database.

## Limits

The latest feed loads 50 posts. Private saves load the latest 50 saved IDs;
friend requests load 100 connections; each card subscribes to at most 200
reactions and the latest 100 comments. Counts reflect those loaded windows.
Subscriptions incur Firestore reads under the project's existing quotas.
Post deletion cleans up those bounded interaction windows; older excess
subcollection records may remain inaccessible after their parent is deleted.
Production monitoring and wider-volume testing remain future work.

Guest mode continues to label its fictional, device-local data as a demo.
Discover remains sample-data based and is separate from this shared feed.
