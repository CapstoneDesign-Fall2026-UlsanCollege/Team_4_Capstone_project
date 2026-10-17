# Local CampusVibes Assistant

Updated October 16, 2026, following the supplied reference and the user's explicit
choice to keep the free local helper. This is not generative AI or live campus
information. There is no AI API, model key, backend endpoint, or billing change.

## Behavior

- The corrected reference uses a side navigation rail, mascot greeting, three question tiles, category/date/location controls, an integrated composer, and activity panels. Recent conversations and saved answers show actual tab-local records, not seeded examples.
- Fuse.js provides typo-tolerant event-title, host, and location matching. Dashboard, Discover, Saved, and the Assistant share `frontend/events.json`.
- Questions support interests, two-event comparisons, browser-local saved lists, unsaved recommendations, explicit YYYY-MM-DD dates, today/tomorrow/weekend, and upcoming listings. Relative dates use Asia/Seoul; expired samples are not presented as upcoming live events.
- Follow-ups use visible result ordering. Ambiguous pronouns request clarification; first/second/third/fourth and more traverse only known records.
- Event rows provide real detail dialogs and explicit bookmark controls. Page actions reuse existing browser-history navigation. Question text alone does not change saved state, book places, publish events, or send messages.
- Enter sends, Shift+Enter inserts a newline, and composing input is respected. Responses can be copied with their listed event details. Real local-worker errors offer retry; Stop and New chat cancel outstanding work.

## Privacy and Limits

Questions run in a browser worker, not an external AI service. History/drafts use
an account-specific `sessionStorage` key and survive reload in that tab. Logout
clears that account's conversation, recent threads, drafts, and saved answers.
New chat archives the previous conversation and starts an empty one. Recent
conversations can be restored or deleted. The list shows up to 10 threads, with
40 messages per thread; up to 20 explicitly saved answers are retained separately.
This is not a cross-device archive. Browser
storage failures leave the helper usable with a visible warning.

Category, date, and exact catalog-location filters constrain subsequent event
queries, saved-event results, and follow-ups. Changing a filter does not rewrite
historical answers. Today/week/weekend use the real Asia/Seoul date, not a fabricated
upcoming sample. Clubs opens hosts from the sample catalog, not a verified club
directory or membership service. The rail's Feed destination opens the existing
feed workspace; it does not claim a separate Community messaging route. Attach
and Voice are disabled with availability tooltips; neither uploads nor records.

The existing Community saved list remains browser-local. The Assistant does not
read shared Feed posts, private Messages, friends, suggestion ownership, or
Firestore Events data. General questions, live availability/prices, and arbitrary
natural-language requests are outside scope. It supports English intents, not a
general NLP model. Offline operation requires its app/worker assets to have loaded;
an offline cold reload is not guaranteed. Worker startup/response failures are
reported rather than labeled as successful answers.

## Verification

- `npm run test:assistant`: all 31 unit checks passed, including combined workspace filters, filtered saved/follow-up results, host lookup limits, thread restore/context, answer saving/removal, and notebook bounds/account isolation.
- All 20 desktop/mobile smoke checks passed after the layout correction. The eight Assistant checks cover search, follow-ups, details, explicit saving, Back, reload recovery, new/restored/deleted threads, saved-answer viewing/removal, multiline drafts, date-filter empty results, sample hosts, disabled input modes, mascot loading, and logout clearing. These create no real accounts or shared records.
- The first redesign regression run passed 19 checks and failed one desktop filter check because the inherited page animation made the fixed rail overlap the chat. Disabling that animation for the Assistant corrected its containing block; the affected check and full suite passed on rerun.
- Layout/asset checks at 320, 390, 768, 1024, 1366, and 1440 pixels found no horizontal page overflow, no rail/panel overlap, and no broken Assistant images. Desktop and mobile greeting/results screenshots were inspected.
- The broader regression run exposed a delayed Firebase signed-out callback clearing an explicitly entered demo session after reload. The callback now preserves an existing demo session; explicit logout still clears it. A browser regression exercises this callback without granting real authentication or shared-data access.
- Production build passed with the existing large shared-feed bundle warning. `git diff --check` passed.
- The initial long-running development preview failed to load the new modules during browser QA. A fresh Vite preview with `--force` loaded successfully and the same checks passed; this was not relabeled as a successful initial run.
- Corrected-reference screenshots: [desktop greeting](assistant/assistant-reference-desktop.png), [mobile greeting](assistant/assistant-reference-mobile.png), [desktop results](assistant/assistant-reference-results-desktop.png), [mobile results](assistant/assistant-reference-results-mobile.png). The older `assistant-empty-*` and `assistant-results-*` images document the preceding layout.

These are automated checks, not independent teammate rehearsal evidence. Existing
Firestore Events issue #35 remains separate. No authentication, shared-feed
permissions, reviewer roles, or production user data were changed by this update.

## Repeat

From `frontend/react-app`, run `npm ci`, `npm run test:assistant`, then
`npm run test:smoke`. For installed Chrome on Windows, set
`SMOKE_BROWSER_CHANNEL=chrome`. The normal smoke configuration owns port 4178;
the verified clean-preview run reused a local server on 5187 with the same tests
and desktop/mobile project settings, without starting a second server.
