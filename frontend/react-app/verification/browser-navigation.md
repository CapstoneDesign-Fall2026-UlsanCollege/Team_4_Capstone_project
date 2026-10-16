# Browser Navigation Fix

## Cause and Scope

Community navigation previously changed visible DOM sections without writing
browser history. Back and Forward therefore could not traverse those views.

Community pages now use `#/community/<page>` routes and the Feed workspace uses
`#/feed`. Page changes create history entries; selecting the current page does
not add duplicates. Back/Forward restores the view and active navigation marker.
Routes survive reload and are applied after sign-in. The URL never grants a
session: a signed-out visitor still sees the sign-in screen. Demo sessions remain
nonpersistent and require re-entering the demo after reload.

This change does not add history entries for category filters, event dialogs,
individual feed tabs, or private conversations. Navigating to another Community
page closes its open event/filter dialogs. No design, data source, billing,
Firestore rules, or teammate test records were changed.

## Automated Verification - October 16, 2026

`SMOKE_BROWSER_CHANNEL=chrome npm run test:smoke` passed eight checks across
desktop (1440 x 900) and mobile (390 x 844). The four new navigation checks cover
Back/Forward, duplicate-click history length, Feed workspace transitions,
active navigation, signed-out deep links, reload/re-entry, and dialog dismissal.
The four existing Events and empty-search regression checks also passed.

`npm run build` passed with the existing large-chunk warning. `git diff --check`
passed. These are local automated demo checks, not independent teammate testing
or a new production Firebase authentication test.
