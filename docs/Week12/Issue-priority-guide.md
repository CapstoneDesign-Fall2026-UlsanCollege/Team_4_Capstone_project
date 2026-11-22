# Week 12 — Issue Priority Guide (P0–P3)

**Team:** 4 — CampusVibes  
**Week / Sprint:** Week 12  
**Date:** November 23, 2026

## Purpose

Use one P-level on each active Issue to set work order against the team's roadmap, promised demo path, dependencies, and next checkpoint. Record a short reason based on current evidence. Revisit the level when a test result or roadmap decision changes.

Priority is a planning aid, not a grade or permission to expand feature scope.

## Priority Levels

| Priority | Use it when | Work order |
|---|---|---|
| **P0 — Blocked** | The current promised demo/core path cannot be completed. | Address first with the smallest recovery step, an owner, and a retest. Use sparingly. |
| **P1 — At risk** | A required behavior or near-term checkpoint is at risk, but a viable path or workaround remains. | Schedule after P0 work and before lower-impact tasks. |
| **P2 — Important** | The promised path holds, and the task meaningfully improves reliability, testing, usability, setup, or handoff. | Schedule after P0/P1 work within the current plan. |
| **P3 — Defer** | The task is polish, stretch, or a future improvement with no current promise risk. | Keep it in the backlog until higher priorities are covered. |

## CampusVibes Week 12 Examples

| Task / Issue type | Priority | Reason |
|---|---|---|
| Main demo flow is unavailable or blocked | P0 | The promised demo cannot be completed |
| Required event discovery or event details behavior fails with no reliable workaround | P0 or P1 | Depends on whether the core path is blocked or at risk |
| Required MVP verification or final checkpoint is incomplete and at risk | P1 | A near-term project checkpoint may be affected |
| Independent QA verification and evidence collection | P2 | Improves reliability and confidence in the current demo |
| Local setup, build, smoke test, and backup demo documentation | P2 | Supports reproducibility and development handoff |
| Issue documentation and evidence organization | P2 | Improves traceability and team review |
| Optional UI polish or future feature ideas | P3 | Does not block the current promised demo |

## Priority Is Separate from Severity

**Priority** answers “What should we work on first?” **Severity** describes the impact of an observed bug; the course's bug-report labels are Blocker, Major, Minor, and Polish.

Record both separately when reporting a bug. Do not assign a P-level from the severity word alone: use the current roadmap promise and evidence.

## Required Information for Active Issues

Each active Issue should contain:

- Priority level (P0, P1, P2, or P3)
- Short reason based on current evidence
- Owner / responsible person
- Checkable expected result
- Next action or retest
- Evidence link (screenshot, test result, PR, commit, or verification report)

## Issue Update Template

Copy this into an active GitHub Issue when updating its priority:

**Priority:** P2 — Important

**Reason:** The current promised demo path is working. This task improves testing reliability, verification evidence, documentation, or development handoff.

**Owner:** Assign the responsible team member.

**Expected result:** State the specific behavior or deliverable that can be checked.

**Next action:** Perform the required test, review, fix, or verification.

**Evidence:** Link the screenshot, test result, PR, commit, or report after completion.

## Week 12 Review Rule

At the Week 12 checkpoint:

1. Review all active Issues.
2. Confirm each Issue has a P-level.
3. Check whether the priority matches the current demo path and roadmap.
4. Identify blockers and at-risk required work.
5. Confirm an owner and checkable next step.
6. Update priorities when new test evidence or roadmap decisions change the work order.
7. Keep completed Issues closed and avoid assigning priorities to completed work unless reopened.

**Week 12 planning principle:** Protect the promised CampusVibes demo path first, complete required verification next, improve reliability and handoff after that, and defer optional polish until higher-priority work is covered.
