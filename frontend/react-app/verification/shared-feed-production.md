# Shared Feed Production Permissions Fix

Verified on October 14, 2026 at https://campusvibe-theta.vercel.app.

## Failure and Cause

Signed-in users saw a permission-denied message and a disabled composer.
Inspection of Firebase project `campus-vibe-7a95a` showed that the deployed
Firestore rules denied all reads and writes, and no composite indexes existed.
The GitHub frontend deployment had not deployed the backend configuration.

Previous ruleset: `b159dcfe-4d92-4d98-bc02-2ef2cbd88e42`.
It contained a recursive match with `allow read, write: if false`.

## Deployment

Using the authorized project account, deployed the repository's already-tested
`firestore.rules` and `firestore.indexes.json` with Firebase CLI 15.33.0:

```sh
npx -y firebase-tools@latest deploy --only firestore:rules,firestore:indexes --project campus-vibe-7a95a --non-interactive
```

Published ruleset: `7c784981-73e8-4d71-af6d-8637786b9e66`.
The `campusFeedPosts` index on `authorId ASC` and `createdAt DESC` is READY.
The rules permit authenticated feed reads and author-only writes while denying
anonymous/signed-out access and collections not explicitly matched.
No existing unrelated collection permissions were removed: the old policy
already denied every collection.

## Live Verification

Used two disposable Firebase email/password accounts and separate Chrome
browser contexts on the deployed website. This is automated production
testing, not independent teammate testing.

| Check | Actual result |
|---|---|
| Signed-in users open shared feed | Passed; Online status and enabled composer. |
| Publish a temporary text post | Passed; the second account received it in real time. |
| Author edits the post | Passed; second account received the edit and retained it after reload. |
| My posts composite query | Passed for both accounts; author sees the post and the other account does not. |
| Author deletes the post | Passed; it disappears from both accounts. |
| Other account attempts direct deletion | Denied with HTTP 403. |
| Signed-out client attempts direct read | Denied with HTTP 403. |
| Mobile viewport, 390 x 844 | No document horizontal overflow; screenshot inspected. |
| Uncaught browser page errors | None. |

Evidence: [desktop](shared-feed-production/desktop.png),
[mobile](shared-feed-production/mobile.png), and
[machine-readable results](shared-feed-production/results.json).
Screenshots contain disposable test profiles only, not the user's real account.
The temporary test post and both test accounts were deleted after verification.

The first verification attempt reached My posts while Firebase was still
building the index. That run stopped, cleaned up its test data/accounts, and
was repeated successfully once the index reported READY.

## Scope and Remaining Limits

The production text-post workflow is now verified. Event attachment validation
has separate emulator evidence; it was not repeated in this production run.
Shared photos and social actions remain outside this implementation.
Discover still uses sample events; this does not prove Firestore event loading
for Discover. Google login, reset-email completion, and independent teammate
verification of this production feed remain separate checks.

After this backend deployment, reload the website and choose Try again if an
existing tab still shows its earlier permission or index error.
