# Prachi — November 18 feedback and freeze-gate follow-up

**Owner/coordinator:** `prachi2061` (Prachi).

**Date:** November 18, 2026, Asia/Seoul. **Tracker:** [Issue #177](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/issues/177), OPEN.

**Gate status:** PENDING — no approved candidate, team sign-off or final candidate regression is recorded. Prachi confirmed in chat on November 18: **“No approved candidate yet.”** This is a coordination status, not a completed team vote or a runtime failure.

## What the latest records establish

The inspection used repository revision `8e100ae890bf83d7e372f66097d5fe6d3d6232e6` and the linked issue records. That revision is an inspection baseline, not a proposed or approved freeze candidate.

| Feedback item | Current evidence | Remaining boundary |
|---|---|---|
| Published-event comparison and independent review | [Issue #166](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/issues/166) now records Devyana's second-event 8/8 result, supporting screenshots and [tulseyy8848's own independent 8/8 review](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/issues/166#issuecomment-6906530940). Its review request/checklist has been reconciled. | These are those testers' reported field comparisons. They do not establish terminal listener error handling or a final candidate regression. No edit to Devyana's issue is needed for the already-corrected review/screenshot statuses. |
| Application-level Firestore failures | #166 describes an unauthenticated emulator GET returning HTTP 403, offline/cached behavior and recovery after browser request blocking. It explicitly keeps the application's terminal permission-denied/loading-error and error-state Retry checks pending. | A separate HTTP 403 or cached-warning Retry is not the application's terminal listener-error result. Record the actual callback, displayed state and recovery on the relevant revision before marking those cases passed. |
| Authentication and real email verification | [Devyana's November 15 receipt](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/issues/167#issuecomment-6889397205) reports five Google/session scenarios. [Ujjal's November 16 receipt](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/issues/167#issuecomment-6906894511) reports EV-01–EV-05, including inbox receipt, link handling, verification completion and Dashboard access. | Preserve the named executor/date and observed scope. Those five email checkpoints do not independently prove every backend restriction or supply the final candidate SHA. |
| Existing core journey | [Ujjal's November 14 receipt](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/issues/138#issuecomment-6878868546) reports five core checks; refresh was not repeated in that session. | The final authenticated regression on an approved candidate remains pending. Older checks and screenshots are not relabelled as that retest. |
| Local setup and backup | [Tulsey's November 17 preparation](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/issues/118#issuecomment-6939873828) records Git 2.49.0, Node v23.0.0, npm 10.9.0, a clean existing checkout and a successful existing build at `bbd1b9209dd94d9f810e6d97caba771e1dc37d1f`. | The receipt explicitly says this is not an approved freeze candidate. Fresh-clone setup and backup verification on the approved candidate remain pending. |
| Prachi's delivered privacy/Friends work | [Privacy evidence](prachi-member-id-privacy-bug-report-2026-11-15.md) and [Friends-sidebar evidence](friends-sidebar-2026-11-15.md) retain their dated automated results and deployment limits. | Supporting defect fixes remain outside the frozen Events demo promise. No optional Community/Feed feature is added or authorized by this checkpoint. |

Devyana's [Firestore handoff in #177](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/issues/177#issuecomment-6937462551) already separates completed comparisons from pending runtime cases and team approval. This follow-up carries that distinction into Prachi's coordination record without reattributing a teammate's work.

## Candidate, decision and next-check owners

| Gate or next check | Current status | Existing owner/support and required next evidence |
|---|---|---|
| Agree the existing demo scope and select the candidate | PENDING | Prachi coordinates the team decision in #177. Record the exact commit SHA, deployment URL, scope/route and actual sign-off link. A merged feature or documentation PR is not approval. |
| Final authenticated core regression and a meaningful boundary | PENDING until candidate is identified and the check is run | `ujjalpoudel75`, the existing QA/core-integration owner; existing independent auth support from `DevyanaCT`. Save revision, tester, device/browser, expected/actual per step, a failure or empty-state recovery and proof in #138/#167, then link #177. |
| Application listener permission-denied, terminal loading error and error-state Retry | PENDING in #166 | `DevyanaCT` is the existing verification contact. Prachi supports implementation triage if an observed core defect needs a fix; the implementation owner must be confirmed for that defect. Save an actual controlled runtime result or an exact blocker and next action. Do not change production rules to manufacture a test. |
| Candidate clean setup and backup demonstration | PENDING | `tulseyy8848`, the existing setup/handoff owner in #118. Follow the [repository setup instructions](../../../README.md#quick-start) from a fresh checkout of the approved SHA and record commands, environment, actual journey, limitation and fallback. |
| Prachi's contribution/source confirmation and handoff | PENDING for the personal explanation | Prachi supplies her own source explanation and any unclear function. [Ujjal's accepted bounded QA backup](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/issues/139#issuecomment-6787716484) is existing support, not a new review result or acceptance. |
| Final freeze route and sign-off | PENDING | After required results are available, Prachi links the team's actual decision and next owner/check in #177. Keep the current recovery/verification route until then. |

These names reflect existing documented responsibilities. This note does not claim that anyone accepted a new assignment or performed a new test today. The existing checkpoint is **November 18, end of day KST**; incomplete required work remains visible rather than being marked finished to meet the date.

## Receipt to complete when actual approval is available

| Field | Recorded value |
|---|---|
| Approved candidate SHA | **PENDING** |
| Deployment URL tied to that SHA | **PENDING** |
| Agreed core scope and route | **Team sign-off PENDING**; existing core journey and recovery/verification recommendation retained |
| Actual team decision/sign-off link and date | **PENDING** |
| Next candidate regression owner | `ujjalpoudel75`, existing QA role; execution **PENDING** |
| Candidate regression result and proof | **PENDING** |
| Firestore terminal-error results | **PENDING** in #166 |
| Candidate setup/backup result | **PENDING** in #118 |

Do not fill another student's result or sign-off on their behalf. When a check is blocked, record the specific blocker, owner, next action and the team's explicit fallback decision; a guest/sample-data result does not silently waive required authentication or published-event behavior.

## Scope and verification of this follow-up

This is documentation/evidence reconciliation. Codex read the repository and named issue receipts and prepared this note for Prachi. No new application code, runtime test, live account login, personal explain-back, independent review or team approval is produced by this work.

The [MVP checklist](../MVP-Verification-Checklist.md), [Prachi requirements note](prachi-week11-requirements-2026-11-16.md), [shared report](../Weekly-Report.md) and #177 form the follow-up loop. Only Prachi's row and her dated coordination additions change in the shared documents. Other members' rows and the existing results remain intact. Validation checks links, recorded claims and preservation; [the dated validation receipt](prachi-week11-feedback-validation-2026-11-18.json) records its exact scope.
