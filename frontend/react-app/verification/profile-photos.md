# Profile Photos and Member Identity

Issue: [#92](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/issues/92). Automated implementation checks on October 17, 2026; not an independent teammate test or physical-phone test.

## Current Behavior

- Signed-in members can choose, preview, replace, or remove a profile photo from the camera button in Profile. JPG, PNG, or WebP input is limited to 5 MB and 40 megapixels after decoding.
- The browser center-crops and re-encodes a 128px square JPEG, reducing to 96px or 64px if necessary. Only a thumbnail of at most 16,384 ASCII characters is saved, not the source file or its EXIF metadata.
- Photos persist in Firestore and update other signed-in browsers. Profile, the header, Feed composer, posts, comments, friend requests, Friends, and Messages use the same account photo. Broken image data falls back to initials.
- Friends, requests, inbox, and conversation headers display the complete Firebase member ID, not a potentially colliding short prefix. Profile provides a copy action. Photos are optional and not verified proof of identity.
- Friends and Messages can search member IDs. An exact generated member ID can resolve a profile outside the directory's first 100 entries. Known contacts resolve directly by ID too. This is not full-directory search by name.
- Message addressing still uses immutable member IDs and accepted-friend connection documents, never the display name or photo.
- Photo saves wait for a server acknowledgement. Offline changes show an error and retain the current saved photo. Pending writes warn before leaving; this is not a durable offline upload queue.

## Privacy and Cost Boundary

`campusProfilePhotos/<uid>` holds only `photo` and `updatedAt`. Signed-in non-anonymous members may read an exact document; only its owner may create, replace, or delete it. Collection listing is denied. Rules bound the JPEG data URL format and size, but do not decode/verify JPEG image bytes or moderate content. Browsers reject broken image data and show initials.

Photo documents are separate from the lightweight `campusFeedProfiles` directory and private `campusAccountData` records. Publishing a post or updating a Feed college cannot erase the photo. The photo field is exempt from indexing. No email, private bio, study program, private campus field, message, or role is copied into the photo document.

The name, member ID, Feed college, and photo are shared with signed-in members; study details, interests, and account saves remain private. The Profile privacy note distinguishes these boundaries. Resetting private study details does not remove the separately managed shared photo.

No Storage bucket, paid provider, billing setting, or plan is enabled. This is a deliberately small profile-thumbnail feature, not general file storage. Firestore reads, writes, and storage still consume the project's existing quota. Shared Feed photo attachments remain disabled. See [Firestore quotas](https://firebase.google.com/docs/firestore/quotas) and [large-field indexing guidance](https://firebase.google.com/docs/firestore/best-practices).

## Repeatable Checks

From `frontend/react-app`:

```powershell
npm run test:profile-photos
npm run build
```

Start the dev server on port 5186 with `VITE_FIREBASE_EMULATORS=true`, `VITE_FIREBASE_AUTH_EMULATOR_PORT=9199`, and `VITE_FIREBASE_FIRESTORE_EMULATOR_PORT=8180`. In another terminal, run from the repository root:

```powershell
firebase emulators:exec --config firebase.account-test.json --project demo-campusvibe-feed --only auth,firestore "node frontend/react-app/tests/account-checks.js"
```

The coordinator runs permission checks, account persistence, suggestions, existing shared-social behavior, then the new photo workflow sequentially. The photo harness requires a localhost URL and confirms the demo emulator project before creating accounts. Chrome is required; `PLAYWRIGHT_CHROME_PATH` can select the installed Chrome executable for the existing shared-feed harness.

Coverage includes three disposable accounts, two with identical display names; distinct thumbnails and IDs; exact-ID lookup outside a 100-entry directory; correct private delivery; fresh-browser photo restoration; live replacement/removal; persistence after changing Feed college; post/comment avatars; invalid SVG/corrupt input; broken persisted image fallback; offline rejection; logout/demo isolation; and 1440px, 390px, and 320px layouts. Thumbnail dimensions and nonblank canvas pixels are checked.

The 74 unit tests and 19 permission tests cover photo bounds, unsupported input, complete member IDs, owner isolation, denied anonymous access/listing, forbidden extra fields, and the previous account/social contracts. The 32 desktop/mobile smoke tests retain coverage of Community, Assistant, navigation, badges, Profile, and suggestions.

The first live check exposed an existing [signup-name race, Issue #94](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/issues/94): the shared profile could keep the temporary session name from before Auth finished setting `displayName`. Profile creation/name reconciliation now runs transactionally, rechecks the current Auth display name after the read, and preserves the Feed college. A missing Auth display name uses `Student`, never an email-derived session/public fallback. The browser regression delays the Auth update and checks that each shared name converges to the completed signup name.

Screenshots: [Profile desktop](profile-photos/profile-photo-desktop.png), [Profile mobile](profile-photos/profile-photo-mobile.png), [same-name Friends](profile-photos/same-name-friends-desktop.png), [same-name Messages mobile](profile-photos/same-name-chat-mobile.png). Avatars in these screenshots are generated test fixtures, not real student photos.
