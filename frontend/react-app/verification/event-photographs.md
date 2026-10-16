# Distinct Event Photographs

## Scope

Dashboard previously gave seven sample events the same banquet fallback.
Discover reused photos by category and cropped several events out of an atlas.
Each of the nine sample event records now owns a distinct local photo filename.
Dashboard recommendations/details, Discover cards/picks/details, and Saved cards
resolve that same field, so one event retains its identity across views.

The seven additions are real photographs, not generated imagery or records of
the fictional campus events. Discover labels the listings as sample events with
illustrative photos. This does not resolve Firestore Events loading in #35 or
enable photo uploads for the shared Feed.

## Photo Sources

Downloaded October 16, 2026, as 1000px JPEGs from Unsplash's image CDN. Files are
served locally, not through random-image endpoints or runtime third-party URLs.
The [Unsplash license](https://unsplash.com/license) applies to the photographs.
The existing HackNight laptop and Indie Game Showcase photos were retained.

| Local Asset | Subject | Source |
|---|---|---|
| `event-open-mic.jpg` | Stage microphone | [Photo](https://images.unsplash.com/photo-1516280440614-37939bbacd81) |
| `event-painting.jpg` | Paintbrushes and paints | [Photo](https://images.unsplash.com/photo-1513364776144-60967b0f800f) |
| `event-basketball.jpg` | Basketball and hoop | [Photo](https://images.unsplash.com/photo-1546519638-68e109498ffc) |
| `event-bonfire.jpg` | Group gathered around a bonfire | [Photo](https://images.unsplash.com/photo-1572930621326-f5297aeccc6b) |
| `event-research.jpg` | Writing study notes | [Photo](https://images.unsplash.com/photo-1434030216411-0b793f4b4173) |
| `event-jazz.jpg` | Jazz trumpet player | [Photo](https://images.unsplash.com/photo-1511192336575-5a79af67a629) |
| `event-photowalk.jpg` | Camera and travel photographs | [Photo](https://images.unsplash.com/photo-1452587925148-ce544e77e70d) |

## Related Bug Record

The previously deployed browser Back/Forward fix is recorded retrospectively in
[#76](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/issues/76),
with reproduction, root cause, merged PR #75, and automated/live verification.
It is closed as already fixed, not counted as new unfinished work.

## Automated Validation - October 16

- Ten browser checks passed at desktop 1440 x 900 and mobile 390 x 844, including the existing Events and browser-history regressions.
- The new photo checks load all nine Discover images, require nine distinct sources, compare every Discover detail photo with its card, and compare Dashboard recommendations with their corresponding details. They also check Dashboard horizontal overflow and uncaught page errors.
- The standard `npm run test:smoke` run passed all assertions but lingered during Windows server cleanup. A second run of the same test files against the existing local server on port 5185 completed with exit code 0: `10 passed (40.9s)`. It used Chrome and the same desktop/mobile project settings with server startup disabled in a checkout-local helper config.
- `npm run build` passed with the existing large-bundle warning. `git diff --check` passed.
- Screenshots were visually inspected: [Dashboard desktop](event-photographs/dashboard-desktop.png), [Dashboard mobile](event-photographs/dashboard-mobile.png), [Discover desktop](event-photographs/discover-desktop.png), [Discover mobile](event-photographs/discover-mobile.png).

These are automated local demo checks, not a new independent teammate rehearsal
or a test of live Firestore Events data.
