# Local CampusVibes Assistant

Updated October 16, 2026, following the supplied reference and the user's explicit
choice to keep the free local helper. This is not generative AI or live campus
information. There is no AI API, model key, backend endpoint, or billing change.

## Behavior

- The chat follows the reference: CampusVibes Assistant heading, campus-photo background, white conversation tool, suggested questions, composer, and New chat.
- Fuse.js provides typo-tolerant event-title, host, and location matching. Dashboard, Discover, Saved, and the Assistant share `frontend/events.json`.
- Questions support interests, two-event comparisons, browser-local saved lists, unsaved recommendations, explicit YYYY-MM-DD dates, today/tomorrow/weekend, and upcoming listings. Relative dates use Asia/Seoul; expired samples are not presented as upcoming live events.
- Follow-ups use visible result ordering. Ambiguous pronouns request clarification; first/second/third/fourth and more traverse only known records.
- Event rows provide real detail dialogs and explicit bookmark controls. Page actions reuse existing browser-history navigation. Question text alone does not change saved state, book places, publish events, or send messages.
- Enter sends, Shift+Enter inserts a newline, and composing input is respected. Responses can be copied with their listed event details. Real local-worker errors offer retry; Stop and New chat cancel outstanding work.

## Privacy and Limits

Questions run in a browser worker, not an external AI service. History/drafts use
an account-specific `sessionStorage` key and survive reload in that tab. Logout
clears that account's conversation. New chat resets messages, draft, and context.
The latest 40 messages are retained; this is not a cross-device archive. Browser
storage failures leave the helper usable with a visible warning.

The existing Community saved list remains browser-local. The Assistant does not
read shared Feed posts, private Messages, friends, suggestion ownership, or
Firestore Events data. General questions, live availability/prices, and arbitrary
natural-language requests are outside scope. It supports English intents, not a
general NLP model. Offline operation requires its app/worker assets to have loaded;
an offline cold reload is not guaranteed. Worker startup/response failures are
reported rather than labeled as successful answers.

## Verification

- `npm run test:assistant`: all 26 unit checks passed for grounding, search, date validity/timezone, saved restrictions, comparisons, ambiguity, pagination, bounded/private history, cancellation, stale worker events, timeout, duplicate sends, and malformed worker output.
- Four new Playwright desktop/mobile checks passed search, follow-up selection, details, explicit saving, Saved integration, Back navigation, reload recovery, New chat, multiline input, draft recovery, and logout clearing. These create no real accounts or shared records.
- The broader regression run exposed a delayed Firebase signed-out callback clearing an explicitly entered demo session after reload. The callback now preserves an existing demo session; explicit logout still clears it. A browser regression exercises this callback without granting real authentication or shared-data access.
- Production build passed with the existing large shared-feed bundle warning. `git diff --check` passed.
- The initial long-running development preview failed to load the new modules during browser QA. A fresh Vite preview with `--force` loaded successfully and the same checks passed; this was not relabeled as a successful initial run.
- Inspected screenshots: [desktop greeting](assistant/assistant-empty-desktop.png), [mobile greeting](assistant/assistant-empty-mobile.png), [desktop results](assistant/assistant-results-desktop.png), [mobile results](assistant/assistant-results-mobile.png).

These are automated checks, not independent teammate rehearsal evidence. Existing
Firestore Events issue #35 remains separate. No authentication, shared-feed
permissions, reviewer roles, or production user data were changed by this update.

## Repeat

From `frontend/react-app`, run `npm ci`, `npm run test:assistant`, then
`npm run test:smoke`. For installed Chrome on Windows, set
`SMOKE_BROWSER_CHANNEL=chrome`. The normal smoke configuration owns port 4178;
the verified clean-preview run reused a local server on 5187 with the same tests
and desktop/mobile project settings, without starting a second server.
