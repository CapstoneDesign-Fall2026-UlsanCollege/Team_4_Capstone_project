# Weekly Report

**Team:** Team 4, CampusVibes

**Week:** 12, Sprint 3 QA and Handoff

**Date:** November 20, 2026

**Class:** November 19, 2026. **Due:** November 25 EOD Asia/Seoul.

**Status:** Week 12 Google authentication retesting completed — 6 PASS, 0 reported FAIL by primary QA and 6 PASS, 0 FAIL by an independent teammate. UI and navigation regression testing completed. Available authentication and UI screenshot evidence uploaded. Full G1-G6 results are documented in Peer-Test-Notes.md and Issues #167/#177. Final MVP approval review remains pending.

Use one shared report per team in Weeks 2-3, 5-14, and 16. Do not create a separate Weekly Report for each student. Weeks 1, 4, and 15 have special reports. Each student must add their own contribution entry and evidence to the team's report.

## This week's goal

What did your team try to improve this week?

> Follow the Week 11 candidate Google-hostname repair through one current non-author authentication retest; record its supported disposition while retaining the frozen feature scope.

## What we committed to do

- [x] Prepare one inherited target, repeatable QA steps, triage record and peer-test form.
- [x] Execute the targeted Week 12 Google Sign-In peer check and record available redacted evidence. `ujjalpoudel75` reported 6 PASS, 0 FAIL, and `tulseyy8848` independently reported 6 PASS, 0 FAIL.
- [x] Update existing Issues #167 and #177 with the authentication results, evidence and follow-up.
- [ ] Complete final P1 priority reassessment and MVP approval review — `prachi2061`.

## Evidence links

If it is not linked, it does not count.

| Evidence | Link |
|---|---|
| Issue(s) | [Auth QA #167](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/issues/167), [coordination #177](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/issues/177) |
| PR(s) / commits | [Week 12 QA documentation commit](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/commit/c9da89f54fc61eacc24c0b74703d24570ec3796a); inherited Week 11 [repair PR #185](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/pull/185) and [manual receipt PR #186](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/pull/186) |
| Screenshot / demo | [Week 12 Evidence](Evidence.md#week-12--google-authentication-evidence-ujjal) — available G1 Google account-selection and G4 signed-out Login screenshots uploaded. Individual screenshots for G2, G3, G5 and G6 were not captured; manual results are documented separately. |
| Test/check note | [QA checklist](QA-Checklist.md), [peer notes](Peer-Test-Notes.md), [Google Auth QA #167](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/issues/167#issuecomment-7088936229), [handoff #177](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/issues/177#issuecomment-7088958749). Week 12 targeted Google Sign-In retest completed: 6 PASS, 0 reported FAIL by `ujjalpoudel75` and 6 PASS, 0 FAIL by `tulseyy8848`. |
| Document update | [Work checklist](Work-Checklist.md), [carried-forward bug report](Bug-Report.md) |
| Current codebase area map / ownership audit (link; update if changed) | [Existing area map](../Week10/ai-use-and-code-ownership-audit.md#codebase-area-map); unchanged boundary/support path |
| RSVP independent manual QA | [RSVP QA Issue #193](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/issues/193), [Fix PR #195](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/pull/195); manual results and screenshot evidence |
| Event Trip Planner independent manual QA | [Manual QA results and screenshots](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/issues/197#issuecomment-7072888027), [PR #196](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/pull/196) |
| Firestore independent automated and manual QA | [Automated QA — 18 PASS, 0 FAIL](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/issues/166#issuecomment-7003471002); [Manual permission-denied, recovery observations, search/filter tests and screenshot evidence — Issue #166](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/issues/166) |



## Individual contribution entries — one row per student

Keep this section inside the single shared team report. Each student must enter their own row: one sentence describing the contribution and at least one evidence link. Add rows if your team has more than three members. Do not make a separate report for each person.

| Student | What they did | Evidence link |
|---|---|---|
| `prachi2061` | Prepared Week 12 QA materials and delivered the favicon, completed-profile/Vibes Progress, avatar navigation, Discover branding, shared-computer event sharing, RSVP persistence and trip-planner improvements. Added upcoming-first discovery, published/sample filters, clearer event text and Plan to go wording (#200). Restored the compact icon header (#202) and the original dashboard calendar, statistics, quick actions, activity and Vibes Progress layout (#203), removing the dashboard search card and collapsed panels. Added View details to saved event cards (#204), opening the correct event with map/sharing/personal-plan controls and returning to Saved on close. Dashboard regression passed 16/16 and saved-map integration passed 2/2; automated deployed-demo checks passed on desktop and simulated mobile, including keyboard opening and independent event removal. Local/emulator account checks remain separate from demo-browser checks; DevyanaCT subsequently reported independent member RSVP persistence/isolation QA on November 23 (12 PASS; actual live SHA not independently confirmed). Reviewed DevyanaCT's November 22 map result: PASS with documented limitations on desktop Chrome/simulated mobile, release reference `2de44c6`; reopened dark-planner and restricted-copy checks remain unrecorded. Accepted DevyanaCT's dated RSVP QA and completed the #206 implementation-owner review: confirmed reload clears search and restores the browser's sign-up category preference (otherwise All), verified four local emulator/browser cases, and retained the unperformed manual terminal-error/Retry checks; supporting features stay outside the frozen core promise. | [QA materials #187](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/pull/187), [QA plan](QA-Checklist.md), [work checklist](Work-Checklist.md)<br>[Favicon #188](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/pull/188); profile [#189](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/pull/189), [Vibes Progress #190](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/pull/190); [avatar navigation #191](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/pull/191); [Discover branding #192](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/pull/192)<br>[Event sharing #194](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/pull/194); [RSVP fix and evidence #195](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/pull/195); [map release/live checks #196](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/pull/196#issuecomment-7066786690)<br>[RSVP QA assigned #193](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/issues/193#issuecomment-7066835768); [map QA #197](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/issues/197)<br>[Usability release #200](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/pull/200), [deployed-demo results](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/pull/200#issuecomment-7081845520)<br>[DevyanaCT's independent map receipt](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/issues/197#issuecomment-7072888027); [Prachi's evidence review and remaining checks](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/issues/197#issuecomment-7081983013)<br>[Icon header restoration and live checks #202](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/pull/202#issuecomment-7082224483); [Dashboard restoration and live checks #203](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/pull/203#issuecomment-7090564852); [Saved View details and live checks #204](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/pull/204#issuecomment-7090780670)<br>[November 24 requirement review and four-case receipt](Evidence/prachi-review-206-2026-11-24.md); [Devyana RSVP receipt](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/issues/193#issuecomment-7091004768); [Assigned requirement review #206](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/issues/206) |
| `DevyanaCT` | Completed independent Week 12 manual QA for the Event Trip Planner and RSVP repair on deployed CampusVibes. RSVP recorded **12 PASS, 0 FAIL**, including joining, cancellation, refresh persistence, account isolation, offline recovery, and mobile checks. Trip Planner testing verified destinations, Google Maps integration, permissions, address copying, accessibility, and trip lifecycle, with provider and theme limitations documented. Also completed independent local Firestore automated verification (**18 PASS, 0 FAIL**) across desktop and mobile. On November 23, manually reproduced the Firestore permission-denied error, verified the error message, Retry button visibility, and sample-event fallback, and restored the original local rules (HTTP 200). Normal Discover recovery was observed. Search/category filtering and empty-state testing passed. Refresh reset behavior was documented, but requirement confirmation is pending. Separate manual terminal-error and Retry-click verification were not performed. | [RSVP QA #193](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/issues/193#issuecomment-7091004768), [Trip Planner QA #197](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/issues/197#issuecomment-7072888027), [Firestore automated QA #166](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/issues/166#issuecomment-7003471002), [Firestore manual QA evidence #166](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/issues/166) |
| `ujjalpoudel75` | Completed independent Week 12 QA and Core Integration testing. Retested Google Sign-In after the Firebase authorized-domain repair on the frozen MVP candidate: **6 PASS, 0 reported FAIL** (G1-G6). Independently tested updated Discover, event filters, Dashboard search, navigation, mobile layout, and personal-plan actions: **12 PASS, 0 reported FAIL**. Verified the restored navigation icons on desktop and simulated mobile: **6 PASS, 0 reported FAIL**. Uploaded regression screenshots, completed peer-test notes, and documented results in Issues #167/#177 and PRs #200/#202. Google authentication screenshots remain pending; final MVP approval is a separate team decision. | [Google QA #167](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/issues/167#issuecomment-7089198357), [Final Handoff #177](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/issues/177#issuecomment-7089214038), [Peer Test Notes](Peer-Test-Notes.md), [Screenshot Evidence](Evidence.md), [UI QA #200](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/pull/200#issuecomment-7088728549), [Navigation QA #202](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/pull/202#issuecomment-7089083274) |
| `tulseyy8848` | Completed an independent Week 12 Google Sign-in retest on November 23, 2026. Verified Google account selection, login, refresh-session persistence, logout persistence, re-login, and cancelled-popup recovery. Recorded **6 PASS, 0 FAIL**, posted results to Issue #177, and organized screenshot evidence. Independent peer verification remains pending. | Issue #177; Week 12 QA Checklist; Evidence.md; screenshots


**DevyanaCT — Week 12 QA Scope and Limitations**

- RSVP: 12 PASS, 0 FAIL in the tested scenarios, including joining, cancellation, reload persistence, fresh-session persistence, account isolation, offline recovery, and simulated mobile testing.
- Trip Planner: Verified destinations, Google Maps integration, location permissions, copying, mobile layout, keyboard accessibility, and trip lifecycle.
- Google Maps limitation: Bus/transit routes worked, but walking, driving, and cycling directions were unavailable for the tested Ulsan route due to Google Maps provider coverage.
- UI limitation: Theme switching required closing the Event Details dialog.
- Testing boundaries: Desktop Chrome and simulated mobile viewport; no physical-device certification or whole-application regression claim.
- RSVP evidence: [Issue #193-comment](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/issues/193#issuecomment-7091004768).
- Trip Planner evidence: [Issue #197-comment](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/issues/197#issuecomment-7072888027).
- Firestore automated QA: 18 PASS, 0 FAIL across desktop and mobile in an isolated Firebase Emulator environment.
- Manual Firestore permission-denied UI: PASS. Error message and Retry button were visible; sample listings remained accessible.
- Local Firestore security rules: Original rules restored successfully (HTTP 200). No production rules or real user records changed.
- Manual recovery: Error disappeared and Discover returned to normal after restoring permissions. Retry button was not clicked, so button-driven manual recovery was not verified.
- Terminal loading-error limitation: Controlled terminal error and Retry recovery passed in automation but were not separately reproduced manually.
- Search/filter functional QA: PASS for matching searches, category filtering, combined filters, and empty-state handling.
- Refresh behavior: Search cleared and category reset; event listings remained available. Expected persistence requirement still awaits implementation-owner confirmation.
- Testing boundary: Local Emulator and separate QA revision; no full production or frozen-candidate equivalence claimed.
- Firestore evidence: [Issue #166 — automated results and manual screenshots](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/issues/166).


## Blockers or risks

| Blocker/risk | Owner | Next action |
|---|---|---|
| Google Sign-In was previously BLOCKED in Week 11. Following the Firebase authorized-domain repair, Week 12 targeted retesting reported 6 PASS, 0 FAIL by `ujjalpoudel75` and 6 PASS, 0 FAIL by `tulseyy8848`. No authentication failure was reported during these retests. | `ujjalpoudel75` — Primary QA; `prachi2061` — Implementation coordinator | Review the completed evidence in #167 and #177, reassess the original P1 verification risk, and record the final issue disposition. |
| Primary QA authentication screenshot coverage is partial. G1 Google popup and G4 signed-out Login page screenshots are linked; individual screenshots for G2, G3, G5 and G6 were not captured. | `ujjalpoudel75` — Primary QA | Retain this evidence limitation. G1-G6 manual results are documented in Peer-Test-Notes.md and #167; available screenshots are linked in Evidence.md. |
| Final MVP approval remains conditional. Targeted authentication results do not establish complete MVP readiness. | `prachi2061` — Team coordinator | Review remaining team-level verification and approval requirements before recording the final decision. |
| Event Trip Planner provider and UI limitations: Google Maps displayed public transit routes but reported walking, driving, and cycling unavailable for the tested Ulsan route. Theme switching required closing Event Details. No CampusVibes defect was confirmed from these observations. | `DevyanaCT` — Independent QA; frontend owner to be confirmed | Retain the external Google Maps coverage limitation in the QA handoff. Review whether theme switching should be accessible while Event Details is open. Retest if the UI changes. Evidence: Issue #197 / PR #196. |
| Firestore QA remaining limitations: automated terminal-error and Retry recovery passed, but separate manual terminal-error and Retry-click tests were not performed. Search/category reset after refresh was observed, but expected behavior remains unconfirmed. | `DevyanaCT` — QA; `prachi2061` — implementation/requirement confirmation | Confirm whether search/category selections should reset or persist. Record acceptance or additional manual testing requirements for the terminal-error and Retry cases. Keep automated and manual results separate. Evidence: [Issue #166](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/issues/166). |


## Decision record

Record only decisions that change scope, approach, ownership, or the next plan.

| Decision | Why we chose it | Owner | Evidence / Issue link |
|---|---|---|---|
| Record Google Sign-In as PASS for the tested frozen candidate after the Firebase authorized-domain repair; retain conditional MVP approval. | Week 11 Google Sign-In was BLOCKED. Week 12 targeted retesting by `ujjalpoudel75` and `tulseyy8848` each reported 6 PASS, 0 FAIL. The authentication path is now supported by manual retest evidence, but final issue disposition and whole-MVP approval remain separate decisions. | `ujjalpoudel75` — QA verification; `prachi2061` — final triage and handoff decision | [Final QA Report #167](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/issues/167#issuecomment-7089198357), [Handoff #177](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/issues/177#issuecomment-7089214038), [Peer-Test Notes](Peer-Test-Notes.md) |
| Record Week 12 independent RSVP and Event Trip Planner manual QA as completed within the tested scope, with documented limitations. | `DevyanaCT` independently verified RSVP joining/cancellation, persistence, offline recovery, account isolation, mobile usability, and supporting event actions. Event Trip Planner checks verified destination handling, Google Maps integration, location permission behavior, accessibility, and trip lifecycle. No confirmed application defect was found; external provider and UI limitations remain documented. This does not change the frozen MVP promise or grant final team approval. | `DevyanaCT` — Independent QA; `prachi2061` — implementation review and handoff | [RSVP #193](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/issues/193), [Trip Planner #197](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/issues/197) |
| Record Week 12 independent Firestore QA results with explicit manual verification limitations. | The November 19 automated suite completed 18 PASS, 0 FAIL. November 23 manual testing verified permission-denied error UI, Retry visibility, sample-listing fallback, and successful local rules restoration (HTTP 200). Search/category functionality passed. Normal recovery was observed, but manual Retry activation and separate terminal-error testing were not performed. Refresh persistence remains a requirement decision. This evidence does not independently establish production Firestore readiness or final MVP approval. | `DevyanaCT` — QA verification; `prachi2061` — requirement confirmation and handoff | [Firestore QA #166](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/issues/166), [Automated evidence](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/issues/166#issuecomment-7003471002) |


## Next week's bridge task

- Carry the actual target disposition, current proof and next owner into the following week.
- Prepare the Week 13 handoff trial only after the selected QA item has a supported result or precise blocker.
