# CampusVibes — Issue Priority Guide

**Team:** 4 · **Updated:** November 16, 2026 (KST)

Use the [course website's P0–P3 guide](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/course-materials/blob/0d4cd0bab57e7f96bd0b8f4bb7e50fb775f65098/student-starter-kit/docs/issue-priority-guide.md) to order work against the existing CampusVibes demo promise. Give each active issue one P-level, an evidence-based reason, an owner and a next check. Reassess it when results or the demo plan change.

The current core path is **Login → Dashboard → Discover Events → Search/Category → Event Details**, with the required refresh/session, theme and logout checks recorded in the [MVP Verification Checklist](MVP-Verification-Checklist.md). Priority does not authorize adding features to this promise.

## Priority levels from the course website

| Priority | When to use it | Work order |
|---|---|---|
| **P0 — Blocked** | An evidenced failure stops the promised core/demo path from completing. | Restore the required step first; name its owner, smallest fix and retest. |
| **P1 — At risk** | A required behavior or upcoming checkpoint is at risk, while a usable route remains. | Handle after P0 and before lower-impact work. |
| **P2 — Important** | The path is working and a bounded task improves testing, reliability, usability, setup or handoff. | Schedule after P0/P1 within the existing scope. |
| **P3 — Defer** | Optional polish or future work has no evidenced impact on the current promise. | Leave in the backlog while higher-priority work remains. |

## Applying the levels to CampusVibes

These examples use existing website features. They explain how to classify a finding; they do not report new bugs or replace the current issue decisions.

| Finding or task | Priority and reason |
|---|---|
| A verified student cannot log in, open Discover or reach the required Event Details, and the promised path cannot complete | **P0** if confirmed: the core demo is blocked. Record the failing step and retest the smallest correction. |
| Google sign-in has a problem but the approved required login route still works | **P1** if that provider remains required or threatens the checkpoint; a usable path remains. Do not infer a current Google failure from this example. |
| Required Firestore error/recovery checks or final-candidate regression are incomplete | **P1**: missing required proof puts the freeze checkpoint at risk; it is not itself evidence of a broken feature. |
| Verify the existing theme/responsive layout, repeat a delivered Friends/privacy correction, or make the chosen candidate's setup/backup instructions reproducible | **P2** when it protects reliability or handoff without repairing a blocked core step. Setup documentation is not automatically P3. |
| Extra styling changes that do not affect readable controls or the existing demo path | **P3**: optional polish can wait. A usability defect affecting the promise needs its own assessment. |

For actual priorities, owners, evidence and next actions, use the [current bug/risk table](MVP-Verification-Checklist.md#known-bugs-risks-and-next-work) and [Week 11 follow-up #177](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/issues/177). That assessment records P1 verification gaps, P2 reliability/setup/handoff and deferred P3 work; it establishes no P0 application blocker.

## Priority and bug severity are separate

**Priority** determines work order against the promised path. **Severity** describes an observed bug's impact using the course's **Blocker, Major, Minor or Polish** labels. Record both for a confirmed bug; do not derive its P-level from the severity label alone.

An untested requirement or uncertain behavior is a **risk/gap**, not a confirmed bug. Record what needs checking instead of inventing a failure or assigning bug severity.

## What to record in an active issue

- The affected existing feature or promised step.
- One P-level and a short reason tied to evidence and the next checkpoint.
- Expected and actual results, or an explicit NOT TESTED/BLOCKED gap.
- Bug severity when a defect is observed; reproduction steps and a proof link.
- The owner, relevant area/support path, smallest next action and checkable completion result.
- The next check's date or checkpoint, then the retest result before closure.

Keep current results in the linked issues and checklist. Use P0/P1 recovery or verification before P2 work, and keep P3 additions deferred during the Week 11 freeze. Do not treat documentation, backup acceptance or an old screenshot as a new runtime pass.
