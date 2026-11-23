# AI Use and Code Ownership Audit

**Team:** 4 — CampusVibes  
**Week / sprint / date:** Week 12 — November 23, 2026

> AI can help, but our team owns the code we submit. Each student contributes a roadmap slice and helps steward a codebase area.

Follow course and assignment rules on whether AI use is permitted. Record permitted use accurately; do not use this audit as permission to use AI for an otherwise restricted task.

Keep the area map as the team's current reference across sprints. Review it at sprint boundaries and update it when repository boundaries, team strengths, stewards, backups, or checks change. Weekly Reports should link here and note changes rather than copying the whole map.

## AI use notes

Record one row for each relevant PR, commit, or file. If no AI was used for the work, say so clearly.

| PR / commit / file | AI used? | What AI helped with | What the team reviewed or changed | Review/test evidence |
|---|---|---|---|---|
| Week 11 published-event verification documentation | Yes | Helped organize verification steps, explain requirements, and prepare clear documentation | I independently performed the actual verification, compared the application with published Firestore data, and checked the accuracy of recorded results | 8 PASS, 0 FAIL; verified eight event fields |
| Week 10–11 local setup and testing documentation | Yes | Helped explain local setup, build commands, smoke tests, and backup demo handoff | I ran the commands and application myself and recorded actual results instead of relying on AI-generated results | Local development server, build, and smoke-test evidence |
| CampusVibes application testing | No AI-generated test results | AI was not used to perform the actual manual application checks | I independently opened the application, tested the pages, filters, event details, and recorded observations | Independent manual testing evidence in project issues and weekly reports |
| Week 12 — DevyanaCT independent RSVP and Event Trip Planner QA | Yes — documentation assistance only | AI helped explain manual test requirements, organize QA checklists, and format GitHub testing reports | I independently performed the manual tests on the deployed CampusVibes application, verified the actual behavior, captured screenshots, and reviewed the reported results. AI did not execute tests or generate PASS/FAIL evidence | RSVP repair PR #195; Event Trip Planner Issue #197 / PR #196; independent manual QA screenshots and issue comments |


## Codebase area map

Use the real structure and needs of your project. Frontend, backend/API, data/storage, UI/UX/accessibility, testing/integration, and deployment are examples; your project may combine, split, or name areas differently. Area stewardship keeps context and checks visible. It does not give one person exclusive control of files or reviews.

| Area in this project | Repository boundary / responsibility | Steward(s) matched to current strengths | Backup / learning partner | Health, documentation, or review check | Evidence link |
|---|---|---|---|---|---|
| Frontend / UI | `frontend/react-app/` — React pages, components, navigation, and user interactions | Frontend contributors — team confirmation | Team member backup — team confirmation | Application pages, navigation, responsive behavior, and component review | Repository frontend |
| Backend / authentication | Firebase authentication and application service integration | Backend contributors — team confirmation | Team member backup — team confirmation | Authentication flow and service integration review | Repository / related issues |
| Data / storage | Firestore event and club data, published records, and data integration | Data/backend contributors — team confirmation | Team member backup — team confirmation | Verify published data and consistency between database and displayed information | Week 11 published-event verification |
| UI/UX and accessibility | Event discovery, filtering, event details, club details, and interface usability | UI contributors — team confirmation | Team member backup — team confirmation | Manual UI review, usability checks, and navigation verification | CampusVibes application |
| QA / testing / integration | Manual verification, RSVP lifecycle, Event Trip Planner, browser regression testing, accessibility, test evidence, and issue reporting | `tulseyy8848` (QA/setup); `DevyanaCT` (event-flow independent QA — proposed co-steward) | `prachi2061` (implementation/fix coordination) | Independently verify deployed fixes, document PASS/FAIL, test mobile and desktop, verify offline recovery and account isolation, and attach screenshot evidence | RSVP PR #195; Event Trip Planner Issue #197 / PR #196; Issues #118 and #177 |
| Deployment / handoff | Vercel deployment, local development setup, backup demo, and developer handoff | Deployment contributors — team confirmation | Team member backup — team confirmation | Confirm deployed app availability, local setup instructions, build, and smoke tests | Issue #118, Issue #177 |

## Individual slice and stewardship check

Each student adds one row for their roadmap-aligned slice and one primary area they help steward. Areas may have co-stewards. A slice may cross several areas; identify the relevant handoff instead of forcing it into one layer. A question or gap is useful evidence when it has a clear next step.

| Student | Roadmap slice: file/function + behavior | Primary area stewarded / repo boundary | Explain status | How slice/area was checked and by whom | Evidence link |
|---|---|---|---|---|---|
| `tulseyy8848` | Local development setup, backup demo handoff, independent published-event verification, and testing evidence | QA, local setup, testing evidence, setup documentation, and shared team stewardship | Can explain | Independently compared published Firestore event information with Discover and Event Details pages. Verified eight fields and recorded 8 PASS, 0 FAIL. Also performed local build and smoke testing. | Issue #118, Issue #177, Week 11 verification report |
| `prachi2061` | MVP verification coordination, review, and team evidence follow-up | Team coordination, MVP verification, and project review — confirm current scope | Can explain / needs help — student confirmation | Review Week 11 MVP verification evidence and remaining checks | Issue #177, PR #178 |
| `DevyanaCT` | Week 12 independent event-flow QA: verified RSVP joining, cancellation, reload persistence, fresh-session persistence, cross-account isolation, offline failure/recovery, and regression testing; independently tested Event Trip Planner destinations, travel modes, location permissions, Google Maps integration, mobile layout, and keyboard accessibility | QA / testing / integration — Event Details, RSVP, Trip Planner, and deployed application regression testing; proposed co-steward | Can explain — independently executed and documented assigned manual tests; not claiming ownership of implementation code | Tested deployed CampusVibes on desktop Chrome and simulated mobile view, used browser DevTools for offline testing, verified account-specific RSVP behavior, and captured screenshot evidence. RSVP: 12 reported PASS, 0 FAIL. Trip Planner: tested workflows passed with Google Maps regional coverage and theme-switcher limitations documented | PR #195; Issue #197; PR #196; Week 12 independent QA issue comments and screenshots |
| Other team members | Add each member's actual Week 12 roadmap slice and behavior | Add their actual primary area | Can explain / needs help | Each member should explain and demonstrate their own work | Link the corresponding PR, issue, or commit |

## Code we need to rewrite or understand better

| Location / behavior we cannot explain or verify | Owner | Next step and check | Due point |
|---|---|---|---|
| No specific code requiring rewrite was identified during my completed independent verification | `tulseyy8848` | Continue reviewing the assigned QA, setup, and handoff area. If unclear behavior is discovered, document it, ask the responsible developer, and verify the explanation | Week 12 |
| Team-wide code ownership and area stewardship confirmations | All team members | Each student should confirm their roadmap slice, primary area, backup, and whether they can explain their work | Week 12 review |
| Event Trip Planner — Google Maps regional coverage and theme-switcher accessibility under updated UI (PR #200) | `DevyanaCT` (QA); frontend implementation owner to be confirmed | Week 12 manual QA confirmed bus/transit routes worked, while Google Maps reported walking, driving, and cycling unavailable for the tested Ulsan route. This is an external provider limitation, not a confirmed application defect. Theme switching required closing Event Details in the previously tested UI. PR #200, deployed at `8c3a602610bd231b28ae35c12bbf6c1eeda7090e`, introduced updated navigation and UI context while retaining the RSVP and Trip Planner repairs. Recheck theme access and planner behavior against this revision if required. Do not count the updated release context as a new manual PASS. | Week 12 handoff / PR #200 follow-up review |


## Review notes

- **Expected result:** CampusVibes should build and run locally, and published event information should be displayed consistently between Discover and Event Details.
- **Actual result:** Local build and smoke testing were completed successfully. Independent published-event verification recorded 8 PASS and 0 FAIL. Verified event information matched the published Firestore data.
- **Cross-area dependency or handoff:** Frontend event display depends on published Firestore data and backend/data integration. Local development setup and deployment documentation support the team's backup demo and handoff.
- **Important limit or failure case not checked:** This verification did not cover every possible edge case, all application features, or every team member's code ownership explanation. Additional team review is needed for unverified areas.
- **Roadmap Issue / next action:** Continue Week 12 review, confirm each student's area stewardship and backup, and update Issue #177 with remaining evidence and handoff status.

### Week 12 — DevyanaCT Independent QA Review

- **Expected result:** RSVP and Event Trip Planner should work correctly on the deployed CampusVibes application, including account-specific RSVP behavior, offline recovery, map navigation, responsive layout, and private input handling.
- **Actual result — RSVP:** Independent manual QA completed with 12 reported PASS and 0 FAIL. Verified joining, cancellation, reload/fresh-session persistence, cross-account isolation, offline failure and recovery, simulated mobile behavior, and supporting event features.
- **Actual result — Trip Planner:** Independently verified event destinations, editable locations, Google Maps transit routes, copy address, nearby bus stops, location permission handling, mobile layout, keyboard accessibility, and trip lifecycle. Documented regional Google Maps limitations for walking, driving, and cycling.
- **AI use:** AI assisted with test planning, interpreting requirements, and formatting documentation. All manual tests, observations, screenshots, and PASS/FAIL decisions were independently performed and reviewed by `DevyanaCT`.
- **Cross-area dependency:** RSVP relies on authenticated account data and persistence; the Trip Planner depends on Event Details data and Google Maps provider coverage.
- **Limitations:** Theme switching required closing Event Details. Google Maps did not provide some regional route modes. Simulated mobile testing does not replace physical-device testing. The exact live deployed commit was not independently confirmed.
- **Next action:** Link the completed QA issue comments and screenshot evidence, request review from `prachi2061` for RSVP, and confirm QA co-stewardship with the team.
- **Related evidence:** RSVP PR #195; Event Trip Planner Issue #197 / PR #196.
