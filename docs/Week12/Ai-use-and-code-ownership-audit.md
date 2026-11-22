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

## Codebase area map

Use the real structure and needs of your project. Frontend, backend/API, data/storage, UI/UX/accessibility, testing/integration, and deployment are examples; your project may combine, split, or name areas differently. Area stewardship keeps context and checks visible. It does not give one person exclusive control of files or reviews.

| Area in this project | Repository boundary / responsibility | Steward(s) matched to current strengths | Backup / learning partner | Health, documentation, or review check | Evidence link |
|---|---|---|---|---|
| Frontend / UI | `frontend/react-app/` — React pages, components, navigation, and user interactions | Frontend contributors — team confirmation | Team member backup — team confirmation | Application pages, navigation, responsive behavior, and component review | Repository frontend |
| Backend / authentication | Firebase authentication and application service integration | Backend contributors — team confirmation | Team member backup — team confirmation | Authentication flow and service integration review | Repository / related issues |
| Data / storage | Firestore event and club data, published records, and data integration | Data/backend contributors — team confirmation | Team member backup — team confirmation | Verify published data and consistency between database and displayed information | Week 11 published-event verification |
| UI/UX and accessibility | Event discovery, filtering, event details, club details, and interface usability | UI contributors — team confirmation | Team member backup — team confirmation | Manual UI review, usability checks, and navigation verification | CampusVibes application |
| QA / testing / integration | Manual verification, build, smoke testing, regression checks, test evidence, and issue reporting | `tulseyy8848` | `prachi2061` | Independent testing, reproducible results, PASS/FAIL records, and evidence review | Issues #118, #177, Week 11 verification |
| Deployment / handoff | Vercel deployment, local development setup, backup demo, and developer handoff | Deployment contributors — team confirmation | Team member backup — team confirmation | Confirm deployed app availability, local setup instructions, build, and smoke tests | Issue #118, Issue #177 |

## Individual slice and stewardship check

Each student adds one row for their roadmap-aligned slice and one primary area they help steward. Areas may have co-stewards. A slice may cross several areas; identify the relevant handoff instead of forcing it into one layer. A question or gap is useful evidence when it has a clear next step.

| Student | Roadmap slice: file/function + behavior | Primary area stewarded / repo boundary | Explain status | How slice/area was checked and by whom | Evidence link |
|---|---|---|---|---|---|
| `tulseyy8848` | Local development setup, backup demo handoff, independent published-event verification, and testing evidence | QA, local setup, testing evidence, setup documentation, and shared team stewardship | Can explain | Independently compared published Firestore event information with Discover and Event Details pages. Verified eight fields and recorded 8 PASS, 0 FAIL. Also performed local build and smoke testing. | Issue #118, Issue #177, Week 11 verification report |
| `prachi2061` | MVP verification coordination, review, and team evidence follow-up | Team coordination, MVP verification, and project review — confirm current scope | Can explain / needs help — student confirmation | Review Week 11 MVP verification evidence and remaining checks | Issue #177, PR #178 |
| `DevyanaCT` | Event flow testing and project verification — confirm current roadmap slice | Event flow / application testing — confirm current area | Can explain / needs help — student confirmation | Review event flow and previously recorded repeat-test evidence | Issue #49 and related testing evidence |
| Other team members | Add each member's actual Week 12 roadmap slice and behavior | Add their actual primary area | Can explain / needs help | Each member should explain and demonstrate their own work | Link the corresponding PR, issue, or commit |

## Code we need to rewrite or understand better

| Location / behavior we cannot explain or verify | Owner | Next step and check | Due point |
|---|---|---|---|
| No specific code requiring rewrite was identified during my completed independent verification | `tulseyy8848` | Continue reviewing the assigned QA, setup, and handoff area. If unclear behavior is discovered, document it, ask the responsible developer, and verify the explanation | Week 12 |
| Team-wide code ownership and area stewardship confirmations | All team members | Each student should confirm their roadmap slice, primary area, backup, and whether they can explain their work | Week 12 review |

## Review notes

- **Expected result:** CampusVibes should build and run locally, and published event information should be displayed consistently between Discover and Event Details.
- **Actual result:** Local build and smoke testing were completed successfully. Independent published-event verification recorded 8 PASS and 0 FAIL. Verified event information matched the published Firestore data.
- **Cross-area dependency or handoff:** Frontend event display depends on published Firestore data and backend/data integration. Local development setup and deployment documentation support the team's backup demo and handoff.
- **Important limit or failure case not checked:** This verification did not cover every possible edge case, all application features, or every team member's code ownership explanation. Additional team review is needed for unverified areas.
- **Roadmap Issue / next action:** Continue Week 12 review, confirm each student's area stewardship and backup, and update Issue #177 with remaining evidence and handoff status.
