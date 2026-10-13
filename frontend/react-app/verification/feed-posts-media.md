# Feed Posts, Photos, and Event Attachment Verification

Recorded on 2026-10-13 for [Issue #57](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/issues/57).

## Delivered Implementation

The demo-feed composer and media/post controls are already on `main` in [ea4dec0](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/commit/ea4dec0). This independent follow-up adds evidence only; it does not resubmit or alter the runtime code, dependencies, or Firebase settings.

## Automated Production Results

Checks against [CampusVibes](https://campusvibe-theta.vercel.app) passed the following workflows in disposable browser contexts:

- Publish a post with a college name, two photos, and an event title/date/time/location.
- Render user-entered text as text rather than executing injected markup.
- Open the two-photo viewer, navigate between photos, and dismiss it with Escape.
- Reload, re-enter via Explore events, select Campus Vibe-Feed, and find both uploaded photo blobs in the saved post.
- Edit the current demo user's post text and delete the post through its own-post menu and confirmation flow.
- Reject an empty post and a text post lacking a college name.
- Reject a text/plain attachment, a JPEG over 10 MB, an unreadable JPEG, and an upload selection exceeding four photos.

The main feed workflow reported no uncaught page errors. Synthetic local-UID sessions were used for edge checks; these are not real Firebase account or server-permission tests. No production student data was posted to a backend.

## Repeatable Review

1. Open production, select Explore events, then Campus Vibe-Feed. Use a disposable browser context for demo data.
2. Submit an empty post, then a text post without a college. Confirm readable errors rather than a created post.
3. Add a college, text, and two non-private raster photos. Enable the event attachment and supply its required title, date, and location. Publish and check the post contents.
4. Open each photo, navigate between them, and press Escape. Reload, re-enter the demo feed, and confirm the post and photos remain on this device.
5. Edit the post's text. Delete the post, first canceling and then confirming deletion, to check the own-post controls.
6. Try a non-image attachment, a file over 10 MB, an unreadable file labeled JPEG, and a selection of more than four images. Confirm each rejection without publishing those files.
7. Test an incomplete event attachment and confirm its required-field feedback. This manual step is part of review; it was not separately asserted by the automated runs listed above.

## Media and Persistence Limits

The inspected implementation accepts JPG, PNG, WebP, and GIF input, limits uploads to four photos per post, rejects files over 10 MB, and normalizes readable images through a canvas to a WebP blob with a maximum 1600px edge. The automated checks above do not test every accepted codec or all size-boundary cases.

The stored photo is a normalized still image; preserving animated GIF playback is not promised. Posts and blobs are stored in account-keyed IndexedDB on this device, not Firestore or cloud storage. Real shared uploads, cross-device synchronization, moderation, and server-side upload limits have not been implemented. Demo event attachments do not add an event to the Community event catalog.

These checks do not replace independent teammate rehearsal in [Issue #53](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/issues/53).
