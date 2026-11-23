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
- [ ] Execute the targeted Week 12 peer check and attach redacted current proof.
- [ ] Update the existing issue with the evidence-based disposition, priority reason, owner and next check.

## Evidence links

If it is not linked, it does not count.

| Evidence | Link |
|---|---|
| Issue(s) | [Auth QA #167](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/issues/167), [coordination #177](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/issues/177) |
| PR(s) / commits | [Week 12 QA documentation commit](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/commit/c9da89f54fc61eacc24c0b74703d24570ec3796a); inherited Week 11 [repair PR #185](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/pull/185) and [manual receipt PR #186](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/pull/186) |
| Screenshot / demo | Pending the Week 12 run; capture redacted CampusVibes states, not private Google/account screens |
| Test/check note | [QA checklist](QA-Checklist.md), [peer notes](Peer-Test-Notes.md); current run NOT TESTED |
| Document update | [Work checklist](Work-Checklist.md), [carried-forward bug report](Bug-Report.md) |
| Current codebase area map / ownership audit (link; update if changed) | [Existing area map](../Week10/ai-use-and-code-ownership-audit.md#codebase-area-map); unchanged boundary/support path |

## Individual contribution entries — one row per student

Keep this section inside the single shared team report. Each student must enter their own row: one sentence describing the contribution and at least one evidence link. Add rows if your team has more than three members. Do not make a separate report for each person.

| Student | What they did | Evidence link |
|---|---|---|
| `prachi2061` | Prepared Week 12 QA materials and delivered the favicon, completed-profile/Vibes Progress, avatar navigation, Discover branding, shared-computer event sharing, RSVP persistence and trip-planner improvements. Added upcoming-first discovery, published/sample filters, dashboard search, clearer text/navigation and Plan to go wording (#200). Kept local/emulator checks separate from deployed-demo checks; production member RSVP persistence still needs independent proof. Reviewed DevyanaCT's November 22 map result: PASS with documented limitations on desktop Chrome/simulated mobile, release reference `2de44c6`; reopened dark-planner and restricted-copy checks remain unrecorded. Independent RSVP QA and the planned Week 12 auth retest remain pending; supporting features stay outside the frozen core promise. | [QA materials #187](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/pull/187), [QA plan](QA-Checklist.md), [work checklist](Work-Checklist.md)<br>[Favicon #188](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/pull/188); profile [#189](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/pull/189), [Vibes Progress #190](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/pull/190); [avatar navigation #191](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/pull/191); [Discover branding #192](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/pull/192)<br>[Event sharing #194](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/pull/194); [RSVP fix and evidence #195](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/pull/195); [map release/live checks #196](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/pull/196#issuecomment-7066786690)<br>[RSVP QA assigned #193](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/issues/193#issuecomment-7066835768); [map QA #197](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/issues/197)<br>[Usability release #200](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/pull/200), [deployed-demo results](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/pull/200#issuecomment-7081845520)<br>[DevyanaCT's independent map receipt](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/issues/197#issuecomment-7072888027); [Prachi's evidence review and remaining checks](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/issues/197#issuecomment-7081983013) |
| `DevyanaCT` | Awaiting this student's own Week 12 contribution entry. | Pending student-provided Week 12 evidence |
| `ujjalpoudel75` | Completed independent Week 12 QA and Core Integration testing. Retested Google Sign-In after the Firebase authorized-domain repair on the frozen MVP candidate: **6 PASS, 0 reported FAIL** (G1-G6). Independently tested updated Discover, event filters, Dashboard search, navigation, mobile layout, and personal-plan actions: **12 PASS, 0 reported FAIL**. Verified the restored navigation icons on desktop and simulated mobile: **6 PASS, 0 reported FAIL**. Uploaded regression screenshots, completed peer-test notes, and documented results in Issues #167/#177 and PRs #200/#202. Google authentication screenshots remain pending; final MVP approval is a separate team decision. | [Google QA #167](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/issues/167#issuecomment-7089198357), [Final Handoff #177](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/issues/177#issuecomment-7089214038), [Peer Test Notes](Peer-Test-Notes.md), [Screenshot Evidence](Evidence.md), [UI QA #200](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/pull/200#issuecomment-7088728549), [Navigation QA #202](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/pull/202#issuecomment-7089083274) |
| `tulseyy8848` | Completed an independent Week 12 Google Sign-in retest on November 23, 2026. Verified Google account selection, login, refresh-session persistence, logout persistence, re-login, and cancelled-popup recovery. Recorded **6 PASS, 0 FAIL**, posted results to Issue #177, and organized screenshot evidence. Independent peer verification remains pending. | Issue #177; Week 12 QA Checklist; Evidence.md; screenshots

## Blockers or risks

| Blocker/risk | Owner | Next action |
|---|---|---|

## Blockers or risks

| Blocker/risk | Owner | Next action |
|---|---|---|
| Google Sign-In was previously BLOCKED in Week 11. Following the Firebase authorized-domain repair, Week 12 targeted retesting reported 6 PASS, 0 FAIL by `ujjalpoudel75` and 6 PASS, 0 FAIL by `tulseyy8848`. No authentication failure was reported during these retests. | `ujjalpoudel75` — Primary QA; `prachi2061` — Implementation coordinator | Review the completed evidence in #167 and #177, reassess the original P1 verification risk, and record the final issue disposition. |
| Ujjal's own Google authentication screenshots are not yet attached, although the manual results and peer-test notes are documented. | `ujjalpoudel75` | Attach redacted authentication screenshots if available, or explicitly retain the evidence limitation in the final QA handoff. |
| Final MVP approval remains conditional. Targeted authentication results do not establish complete MVP readiness. | `prachi2061` — Team coordinator | Review remaining team-level verification and approval requirements before recording the final decision. |

## Decision record

Record only decisions that change scope, approach, ownership, or the next plan.

| Decision | Why we chose it | Owner | Evidence / Issue link |
|---|---|---|---|
| Record Google Sign-In as PASS for the tested frozen candidate after the Firebase authorized-domain repair; retain conditional MVP approval. | Week 11 Google Sign-In was BLOCKED. Week 12 targeted retesting by `ujjalpoudel75` and `tulseyy8848` each reported 6 PASS, 0 FAIL. The authentication path is now supported by manual retest evidence, but final issue disposition and whole-MVP approval remain separate decisions. | `ujjalpoudel75` — QA verification; `prachi2061` — final triage and handoff decision | [Final QA Report #167](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/issues/167#issuecomment-7089198357), [Handoff #177](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/issues/177#issuecomment-7089214038), [Peer-Test Notes](Peer-Test-Notes.md) |

## Next week's bridge task

- Carry the actual target disposition, current proof and next owner into the following week.
- Prepare the Week 13 handoff trial only after the selected QA item has a supported result or precise blocker.
