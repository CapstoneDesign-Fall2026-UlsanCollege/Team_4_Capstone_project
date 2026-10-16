# Profile Reference Workspace

Updated October 17, 2026, using the supplied profile reference.

## Implemented

- Identity header with actual sign-in name/email, initial avatar, study details, bio, campus/year, and existing illustrative campus photography.
- A six-item completion checklist computed from actual saved details and the Community saved-event list. There is no fixed 85% value.
- Responsive side navigation, three-column desktop panels, and a single-column mobile layout.
- Edit/cancel/save for program, faculty, campus, study year, graduation month, and bio. Interests support selection, removal, and bounded custom labels.
- Saved-event details and explicit save/remove controls, synced with Discover, Saved, Dashboard, and Assistant through the existing bridge.
- Recent activity reads actual recorded saved/removed/drafted actions with timestamps shown in Asia/Seoul. Empty histories stay empty.
- Campus Involvement contains explicitly followed sample event hosts, not fictional memberships or volunteer roles. Local follows can be edited.
- Impact counts use Community event saves, followed hosts, and existing dashboard draft records. They do not measure event attendance or shared review-queue submissions.
- Settings explains local-only visibility. Reset requires explicit confirmation and only resets the profile record, not the account, shared records, or saved events.

## Data and Privacy

The legacy `cv_profile_<email>` storage key is retained, including existing program
and bio edits. Missing fields stay unset instead of claiming a particular degree,
graduation date, campus, or club membership. Profile records are isolated by
account email; Community event saves retain their existing browser-wide storage.
An email-verified badge appears only when Firebase reports the email as verified.
Demo mode is identified as a demo, not a verified account.

Share profile opens a text preview. Email is excluded unless explicitly selected.
Copy summary uses the Clipboard API; Share summary uses the platform share sheet
when available and otherwise copies the same preview. No URL is presented as
another student's public profile. No text is sent until a share/copy action.

No public profile directory, real photo upload, community-visibility switch,
club-membership integration, or attendance service is added. Firebase permissions,
reviewer roles, billing, shared-feed profiles, friends, and Messages are unchanged.
Storage failures are visible and do not show a false saved confirmation.

## Verification

- `npm run test:profile`: 11 unit tests passed for honest defaults, legacy records, account separation, bounded/deduplicated fields, explicit empty interests, known host allowlisting, study-date validation, computed completion, failed storage, real activity filtering, and sharing privacy.
- `npm run test:assistant`: all 31 existing unit tests passed after integration.
- Six focused desktop/mobile profile checks passed edit/cancel/reload persistence, custom interests, completion updates, event dialogs, saving/removal, activity, host follows, navigation history, share-preview privacy/copy, confirmed reset, and logout.
- Full regression rerun: all 26 desktop/mobile smoke checks passed, including the existing Assistant, event-photo, Events, navigation, and Suggestions checks.
- Production build passed; the existing shared-feed chunk-size warning remains.
- Layout/image checks at 320, 390, 768, 1024, 1366, and 1440 pixels found no page overflow, overlapping rail, or broken profile images.
- The first broader run was interrupted after two profile form checks timed out locating the study-year field. Explicit field labels were added; all six focused checks passed on rerun.

The copy workflow uses a test Clipboard stub. The native OS share sheet was not
automated. Browser checks use demo mode and create no real accounts or shared
records. This is automated evidence, not an independent teammate rehearsal.
Firestore Discover Events issue #35 remains separate.

## Screenshots

- [Desktop empty profile](profile/profile-empty-desktop.png)
- [Mobile empty profile](profile/profile-empty-mobile.png)
- [Desktop edited profile with an explicitly saved event](profile/profile-desktop.png)
- [Mobile edited profile with an explicitly saved event](profile/profile-mobile.png)

Populated screenshots use the demo account and explicit automated form/save/follow
actions. They are not evidence of a real student's degree or club membership.

## Repeat

From `frontend/react-app`, run `npm ci`, `npm run test:profile`,
`npm run test:assistant`, `npm run build`, and `npm run test:smoke`.
The normal smoke configuration starts its own server on port 4178. The verified
local-preview run reused port 5187 with the same desktop/mobile tests and an
external config; Chrome was selected on Windows. No Firebase emulators are needed
for these demo/browser-local profile checks.
