# Prachi — refresh requirement and QA review, November 24

**Owner:** `prachi2061`. **Requests:** [#206](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/issues/206) and [Devyana's RSVP review request](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/issues/193#issuecomment-7098779925). **Method:** source/screenshot review and four automated local Chrome checks. This is separate from Devyana's manual testing.

## Refresh requirement confirmed

Retain the existing release behavior: Discover filters are temporary page state. Do not add filter persistence for this handoff.

| Action | Expected behavior |
|---|---|
| Hard refresh | Search clears. Category returns to the browser's saved sign-up interest (`cv_interest_<uid>`) when present, otherwise All. It does not retain the last clicked category. |
| Navigate to Saved and back within the loaded app | Current search/category remain selected. |
| Clear filters | Query clears; category becomes All, independently of the saved sign-up interest. |
| Current release defaults after reload | Upcoming, All listings, published-first/date ordering, and Saved events only unchecked. |
| Account/session state | Resetting filters must not delete saved events or log out a verified member. |

The sign-up interest is a browser-local preference, separate from profile interests and the current category button. A different browser without that preference can therefore start on All.

Source: [in-memory query/category defaults](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/blob/bda69b5efe85f7a7f7c77bcb6d6a8d3aea30bbe0/frontend/apps.js#L6), [sign-in preference resolution](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/blob/bda69b5efe85f7a7f7c77bcb6d6a8d3aea30bbe0/frontend/apps.js#L476), [startup category selection](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/blob/bda69b5efe85f7a7f7c77bcb6d6a8d3aea30bbe0/frontend/apps.js#L544), [Clear filters](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/blob/bda69b5efe85f7a7f7c77bcb6d6a8d3aea30bbe0/frontend/discover.js#L76), and [current date default](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/blob/bda69b5efe85f7a7f7c77bcb6d6a8d3aea30bbe0/frontend/react-app/src/event-discovery.js#L3).

The query/category initialization and saved-interest expressions also occur in frozen candidate `e5f1888aa4600ac2013d6bda34a55554ba68195f`. Its date default was All dates; the current release defaults to Upcoming. These selected source observations do not establish full candidate equivalence or a new candidate regression.

## Current local verification

**Tested revision:** `bda69b5efe85f7a7f7c77bcb6d6a8d3aea30bbe0`. **Completed:** November 24, 2026, 13:20 KST. **Result:** 4 PASS, 0 FAIL. [Detailed JSON receipt](prachi-review-206-2026-11-24/results.json).

The unmodified development app ran at `http://127.0.0.1:5397/`, with isolated Auth `127.0.0.1:19599` and Firestore `127.0.0.1:18580`, project `demo-campusvibe-feed`. Actual SDK connections and the project ID were checked before creating fictional accounts/events. Chrome used desktop 1440×900 and simulated mobile 390×844 viewports. This was local automation, not manual or deployed testing.

| View | Browser sign-up interest | Before reload | Expected/actual after reload | Result | Screenshots |
|---|---|---|---|---|---|
| Desktop | Tech | Music query/category | Empty query, Tech | PASS | [Before](prachi-review-206-2026-11-24/before-1440-saved-Tech.png), [after](prachi-review-206-2026-11-24/after-1440-saved-Tech.png) |
| Desktop | None | Music query/category | Empty query, All | PASS | [Before](prachi-review-206-2026-11-24/before-1440-no-saved-interest.png), [after](prachi-review-206-2026-11-24/after-1440-no-saved-interest.png) |
| Simulated mobile | Tech | Music query/category | Empty query, Tech | PASS | [Before](prachi-review-206-2026-11-24/before-390-saved-Tech.png), [after](prachi-review-206-2026-11-24/after-390-saved-Tech.png) |
| Simulated mobile | None | Music query/category | Empty query, All | PASS | [Before](prachi-review-206-2026-11-24/before-390-no-saved-interest.png), [after](prachi-review-206-2026-11-24/after-390-no-saved-interest.png) |

Each case also checked a matching published emulator event, query/category preservation during in-page navigation, an empty result from Music plus saved-only when only a Tech event was saved, and reset of date/source/sort/saved-only controls. The same fictional verified account, its saved event and the published catalogue returned after reload. Clear filters produced All. No application page errors were recorded. The no-interest cases removed only that fictional account's local sign-up preference before reloading.

### Repeat the UI check

Use the existing [isolated emulator setup instructions](../../Week11/Evidence/prachi-candidate-runtime-2026-11-18.md#repeat-without-production-access), with matching ports for the app and emulators. Production access is unnecessary. Never run denial-rule tests against production or an emulator shared with other work.

1. Sign in with a verified fictional emulator account whose local sign-up preference is Tech. Use the same browser/profile for each before/after pair.
2. On Discover, choose All dates if needed to reach a known listing; select Music and enter a matching query. Confirm the result. Navigate to Saved and back and confirm the query/category remain selected.
3. Change other filters, then hard refresh. Confirm the query clears, category returns to Tech, and date/source/sort/saved-only return to the current defaults. Confirm the account is still signed in and an existing save remains saved.
4. Repeat in a browser with no local sign-up preference for the fictional account. The repeat environment may remove only its test account's `cv_interest_<uid>` key; category should become All after refresh.
5. Repeat on desktop and a mobile viewport. Save dated before/after screenshots, revision, setup, actual result and any failure. The recorded automated run used two fictional Tech/Music published events dated November 25 and a fixed November 24 browser clock; JSON records the actual case scope.

## Review of Devyana's supplied evidence

- **Issue #206:** the permission-denied screenshot visibly contains the terminal error message, Retry control and accessible sample listings. Accept this as support for her stated local manual permission-denied result. Button visibility and recovery after restoring rules do not prove a manual Retry click. The separate terminal callback and button-driven recovery remain NOT TESTED manually.
- Her `story time` screenshot supports a search/category result. The linked search filenames are dated November 10; no separate November 23 refresh before/after pair is identified. Keep that provenance visible. Today's pairs supply current local automated evidence and do not relabel her earlier screenshots.
- **RSVP #193:** reviewed [Devyana's November 23 receipt](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/issues/193#issuecomment-7091004768), its 12 PASS rows and 18 screenshot sections, including inspected successful-plan and cross-account screenshots. Accept the reported member persistence, isolation, failure/retry and UI regression coverage for the dated scope. The tester did not independently confirm the actual live SHA. Share-panel availability is not proof of delivery to another person. This is acceptance of her manual result, not a new manual test by Prachi.

## Disposition and next owner

Prachi's search/refresh requirement confirmation and evidence review are complete. The observed reset behavior is consistent with the confirmed requirement; no new refresh bug or application patch is justified.

Accept the RSVP bug's repair and completed dated independent QA, retaining its revision limitation. Keep #206 open: **DevyanaCT** owns the separate manual terminal-error and actual Retry-click/recovered-state result if required by the final handoff. Record either that result or an explicit team acceptance of its limitation; do not turn automation into a manual PASS. #166 remains a historical linked tracker. Final MVP approval and production-provider failure verification are separate decisions.
