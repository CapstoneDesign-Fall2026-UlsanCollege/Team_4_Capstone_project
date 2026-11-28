# AI Use and Code Ownership Audit

**Team:** Team 4 — CampusVibes  
**Week / sprint / date:** Week 13 — Final Handoff and Demo Readiness / November 27, 2026

> AI can help, but the team owns the code and documentation it submits. This audit records the team's current understanding of responsibilities, code areas, and remaining handoff checks.

## AI use notes

| PR / commit / file | AI used? | What AI helped with | What the team reviewed or changed | Review/test evidence |
|---|---|---|---|---|
| `docs/Week13/ai-use-and-code-ownership-audit.md` | Yes — ChatGPT | Helped organize the audit, explain documentation and code-area responsibilities, and align the content with the Week 13 Weekly Report, Setup Guide, and Architecture Sketch. | Team members must verify the descriptions, confirm ownership, and correct anything that does not match the actual repository or work completed. AI assistance does not replace student review or testing. | Week 13 documentation review; existing QA evidence in Issues #118 and #177. |

**AI-use clarification:** This disclosure applies to assistance with this audit. Do not assume that AI generated or verified the application's code. Add separate rows if AI was used for other Week 13 files, commits, or PRs.

## Codebase area map

The following is a working handoff map. Names indicate current coordination or QA involvement based on the Week 13 documents; they are not a declaration of exclusive file ownership. Confirm formal stewardship and backups with the team and the existing Week 12 area map.

| Area in this project | Repository boundary / responsibility | Steward(s) matched to current strengths | Backup / learning partner | Health, documentation, or review check | Evidence link |
|---|---|---|---|---|---|
| Frontend, UI, and navigation | `frontend/react-app/`; `src/App.jsx`; event discovery, dashboard, navigation, and UI behavior | Prachi2061 and Ujjalpoudel75 — working contacts; confirm exact implementation ownership | Team 4; confirm named backup | Review navigation, published-event display, search/filter behavior, and frozen MVP scope | Week 13 Architecture Sketch; Issues #193 and #197 |
| Authentication | Firebase Authentication and Google Sign-In integration | Ujjalpoudel75 — authentication QA contact; confirm implementation owner | Team 4; confirm named backup | Review Google account selection, login, session persistence, logout, re-login, and cancelled-popup recovery | Issue #177 |
| Backend, Firebase, and data | `backend/`; Firestore data access and `backend/firebase/firestore.rules` | Prachi2061 — coordination contact; DevyanaCT — QA contact | Team 4; confirm named backup | Review Firestore permissions, permission-denied behavior, and documented manual verification limitations | Week 13 Weekly Report; Issues #166 and #167 |
| Testing, integration, and QA | Test files, manual QA records, regression checks, and evidence documentation | DevyanaCT — QA contact; tulseyy8848 — independent testing and evidence contribution | Team 4; confirm named backup | Keep test counts accurate, separate previous evidence from new Week 13 testing, and link results to issues | Issues #118 and #177; Week 13 Weekly Report |
| Build, setup, deployment, and handoff | React/Vite setup, local development instructions, deployment access, setup guide, and demo preparation | DevyanaCT — Setup Guide preparation; tulseyy8848 — previous local setup and backup verification | Prachi2061 — previously recorded backup contact for the user's area | Review setup instructions, build commands, independent handoff trial, demo account, presentation device, and rehearsal | Week 13 Setup Guide; Issue #118 |

## Individual slice and stewardship check

| Student | Roadmap slice: file/function + behavior | Primary area stewarded / repo boundary | Explain status | How slice/area was checked and by whom | Evidence link |
|---|---|---|---|---|---|
| `DevyanaCT` | QA and handoff documentation, including the Week 13 Setup Guide and previously recorded Firestore, RSVP, and Trip Planner verification | Testing, integration, and setup documentation | Confirm directly with student | Week 13 Weekly Report records previous QA evidence; independent handoff verification remains pending | Week 13 Setup Guide; Issues #166 and #167 |
| `ujjalpoudel75` | Authentication and regression QA contributions recorded in the project handoff evidence | Authentication and related frontend integration — exact code ownership to confirm | Confirm directly with student | Week 13 Weekly Report and existing authentication/regression evidence | Issue #177; Week 13 Weekly Report |
| `tulseyy8848` | Local development setup, repeatable handoff verification, testing evidence, and independent Google Sign-In retest | Build/setup verification, testing evidence, setup documentation, and shared team stewardship | Can explain previous setup and testing process; implementation internals may need further review | Previously verified local setup and backup demo flow. Independently completed Week 12 Google Sign-In retest on November 23, 2026: 6 PASS, 0 FAIL. No new Week 13 test execution is claimed here. | Issue #118; Issue #177 |
| `prachi2061` | Frontend implementation coordination, project integration, and release coordination recorded in team documentation | Frontend/integration coordination — exact code ownership to confirm | Confirm directly with student | Week 13 Weekly Report identifies Prachi for implementation confirmation and final approval coordination | Week 13 Weekly Report; Issues #193 and #197 |

## Code we need to rewrite or understand better

| Location / behavior we cannot explain or verify | Owner | Next step and check | Due point |
|---|---|---|---|
| Search/category filter persistence after browser refresh | DevyanaCT for QA; Prachi2061 for implementation confirmation | Confirm whether persistence after refresh is a required MVP behavior. Test it and record the result or document the accepted limitation. | Week 14 handoff |
| Firestore manual terminal-error and Retry behavior | DevyanaCT for QA; Prachi2061 for implementation follow-up | Review the manual verification limitation. Record whether Retry can be tested, whether the behavior is acceptable, and what remains unresolved. | Week 14 handoff |
| Event Trip Planner Maps route coverage and theme limitations | DevyanaCT for QA; frontend implementation owner to be confirmed | Review the documented provider and theme limitations. Confirm the expected MVP behavior and record any accepted limitation. | Week 14 handoff |
| Final frozen-MVP approval and demo readiness | Prachi2061 and Team 4 | Review outstanding QA decisions, confirm the approved demo account and presentation device, complete the team rehearsal, and record the final approval decision. | Before final demo |

## Review notes

- **Expected result:** The Week 13 audit should provide a clear reference for AI use, individual roadmap contributions, code-area stewardship, evidence, and unresolved handoff checks.
- **Actual result:** This audit draft is aligned with the Week 13 Weekly Report, Setup Guide, and Architecture Sketch. Formal area ownership and backup assignments still require team confirmation. The independent Setup Guide handoff trial and final MVP approval remain pending.
- **Cross-area dependency or handoff:** Frontend search/filter behavior depends on implementation and QA coordination. Firestore error behavior requires coordination between data/security implementation and QA. Final demo readiness depends on setup documentation, deployment, authentication, and team preparation.
- **Important limit or failure case not checked:** This document does not claim new Week 13 application testing. Week 12 evidence is carried forward as previous evidence. Search/category refresh persistence, manual terminal-error and Retry behavior, and final whole-MVP approval remain unresolved until their owners confirm the results.
- **Roadmap Issue / next action:** Continue the Week 13 final handoff work recorded in the Weekly Report. Resolve or formally document the outstanding checks, confirm team ownership and backups, complete the independent setup-guide review and demo rehearsal, and record the final MVP approval.

---

**Maintenance note:** Keep this Week 13 audit as the current Week 13 record. Preserve the Week 12 audit as historical documentation. Update this area map when the team confirms ownership, backups, repository boundaries, or review checks.
