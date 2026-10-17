# Level Progress Badges

Persistence update: signed-in awards now sync privately through Firestore;
demo awards retain the browser-local model described below. Thresholds and
scoring are unchanged. See [current account persistence](account-persistence.md).

Implemented October 17, 2026 for the Dashboard's Your vibes progress panel.

## Rules

The existing score is unchanged: 20 points for each currently saved Community
event and 30 for each recorded dashboard draft. Level is floor(points / 100) + 1.
The ring shows progress toward the next level, not toward the next badge.

| Badge | Level | Points |
|---|---:|---:|
| Explorer | 1 | 0 |
| Campus Scout | 2 | 100 |
| Pathfinder | 3 | 200 |
| Vibe Maker | 5 | 400 |
| Campus Legend | 10 | 900 |

Explorer is the starter badge. Crossing a threshold awards every newly eligible
badge once. Earn dates are retained; display dates use Asia/Seoul. Removing an
event can reduce current points/level, but does not revoke earned badges. Saving
and removing the same event repeatedly does not accumulate extra points.

The current Suggest form, shared review queue, Feed interactions, Messages,
profile completion, and host follows do not feed this existing score. Nine sample
events alone provide at most 180 points/level 2. Higher badge tiers require more
qualifying records; this feature does not invent attendance, extra events, or a
new draft/submission points system.

## UI and Persistence

- The Dashboard shows the current level's badge icon/name, earned count, current points, and next unearned badge target.
- View details opens earned/locked badge tiles with thresholds and earn dates. The close control stays visible while scrolling on mobile.
- Awards use `cv_progress_badges_<encoded account ID>` in localStorage. No badge record is written during signed-out boot.
- Existing points are evaluated on first use, so prior local progress qualifies without a manual claim button. Community event saves retain their existing browser-wide behavior; they are not account-private actions.
- Badge records are account-scoped within this browser. Storage events update other tabs and open badge dialogs. Concurrent tabs converge on the earliest recorded award date without repeatedly rewriting each other's timestamps.
- Malformed/unknown badge records are filtered. Blocked storage keeps the current session usable with a visible temporary-award warning; persistence after reload is not falsely promised.
- These are editable browser-local planning milestones, not authoritative achievements, proof of participation, roles, privileges, or a secure leaderboard. Clearing browser storage can remove badge history. There is no cross-device sync.

No billing, Firebase rules, uploads, or shared-data writes were added.

## Verification

- All 55 unit checks passed: 13 badge checks plus 11 Profile and 31 Assistant checks. Badge checks cover thresholds, duplicate prevention, dates, level jumps, all-unlocked state, retained awards, account keys, signed-out behavior, invalid scores, malformed/blocked storage, unnecessary-write avoidance, and concurrent-tab convergence.
- Full desktop/mobile browser regression: all 32 checks passed (16 desktop, 16 mobile).
- Six new badge browser cases cover a real five-save level-2 unlock, detail icons/locked tiers, accessible Escape/focus return, point reduction/reload retention, storage failure feedback, and cross-tab synchronization/open-dialog refresh.
- Dashboard and badge-dialog layout checks at 320, 390, 768, 1024, 1366, and 1440 pixels found no horizontal overflow. Badge icons rendered, and the last locked badge was reachable by scrolling on mobile.
- Initial unit verification exposed an ISO timestamp fixture mismatch (normalized milliseconds); the fixture was corrected. A deterministic concurrent-tab regression was added with the timestamp-convergence guard.
- Production build passed with the pre-existing large shared-feed bundle warning.

Browser evidence uses disposable demo-mode contexts and explicit save clicks,
not real students or an independent teammate rehearsal. The higher point tiers
are tested with controlled unit inputs, not fabricated user activity.

## Screenshots

- [Desktop Dashboard](progress-badges/dashboard-desktop.png)
- [Mobile Dashboard](progress-badges/dashboard-mobile.png)
- [Desktop badge details](progress-badges/details-desktop.png)
- [Mobile badge details](progress-badges/details-mobile.png)

## Repeat

From `frontend/react-app`, run `npm run test:badges`, `npm run test:profile`,
`npm run test:assistant`, `npm run build`, and `npm run test:smoke`.
The standard Playwright config owns port 4178. The recorded local run reused the
existing 5187 preview with the same desktop/mobile tests and Chrome channel.
