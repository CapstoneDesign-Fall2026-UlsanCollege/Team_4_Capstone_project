# Prachi — P1 reassessment and candidate approval review, November 24

**Owner:** `prachi2061`. **Selected Week 12 target:** Google sign-in after the candidate-hostname repair. **Named candidate:** `e5f1888aa4600ac2013d6bda34a55554ba68195f`, tag `mvp-candidate-2026-11-18`, [candidate deployment](https://campusvibe-fnh5f79me-campus-vibe.vercel.app/). The tag still resolves to this revision. This is a coordinator evidence review; no new Google login, application regression or teammate test was performed.

## Reassessment of the carried P1

The historical hostname failure was **Major** in impact. The carried **P1 authentication verification risk is cleared for G1–G6 on this candidate**, based on the post-repair manual results below. This is a scoped all-clear for the selected target, not an all-clear for the complete MVP or every authentication scenario.

| Evidence | Result and scope |
|---|---|
| [Hostname repair and its earlier limits](../../Week11/Evidence/prachi-candidate-google-domain-2026-11-18.md) | Candidate hostname added to Firebase authorized domains; candidate source/tag unchanged. Readiness automation alone did not prove account login. |
| [Ujjal's final primary-QA handoff](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/issues/177#issuecomment-7089214038) and [evidence update](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/issues/167#issuecomment-7089661715) | November 23: 6 PASS, 0 reported FAIL, G1–G6 on the named candidate. The later complete handoff supersedes the earlier five-pass update for these targeted cases. |
| [Tulseyy's independent retest](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/issues/177#issuecomment-7082833689) | November 23: 6 PASS, 0 FAIL, including login, refresh, logout plus refresh, re-login and popup cancellation/retry. This is independent testing, not an explicit whole-MVP approval. |
| [Peer notes](../Peer-Test-Notes.md) and [QA checklist](../QA-Checklist.md) | Record the completed targeted manual checks. Their authors' results and wording are preserved. |

The remaining browser-version, popup-duration and screenshot-to-step clarification work is **P2 evidence/handoff follow-up**: no new functional authentication mismatch is reported. Do not change the historical Major impact assessment, invent a browser version, claim a measured recovery threshold, or infer six sequential tests from screenshots. If a required timed acceptance condition or a new candidate failure emerges, reassess its priority rather than treating it as waived.

The **final whole-MVP decision remains P1** because the recorded approval/acceptance gate is incomplete. Functional authentication evidence does not silently accept other limitations.

## Current approval record

| Field | Recorded disposition |
|---|---|
| Frozen scope/candidate | Retain the named `e5f1888` candidate and the agreed core journey. Do not replace it with current main. |
| Prachi's coordinator assessment | Accept the candidate's G1–G6 authentication gate within the reported scope; P1 reassessment completed. |
| Final team approval | **PENDING / no new final team decision recorded in the reviewed Week 12 evidence.** No new team sign-off has been supplied for this review. |
| Historical conditional record | [November 18 conditional-approval note](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/issues/177#issuecomment-6969792911) is retained as history. It also contains pending individual-approval entries, while current Week 12 records keep final approval pending. Do not convert this inconsistent historical note into a new unanimous decision. |
| Next coordinator action | Before the November 25 checkpoint, record the team's actual APPROVE / CONDITIONAL APPROVE / DO NOT APPROVE decision in #177, against the full SHA, with links to actual sign-offs and explicitly accepted limitations. Update this pending field only when that decision exists. |

For that decision, record the exact promised path: **Landing → verified login → Dashboard → Discover → search/category → Event Details → session refresh → logout**, with the existing empty-search boundary and documented backup. Explicitly state which unresolved non-authentication limitations the team accepts, which remain required, and the next-check owner. The manual Firestore terminal-error/Retry checks remain in [#206](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/issues/206); [the refresh requirement review](prachi-review-206-2026-11-24.md) does not supply those manual results. A proposed fallback is not an accepted exception until the team records it.

## Preserve the evidence boundaries

- The unambiguous authentication subset in [the evidence index](../Evidence.md) identifies G1 and G4 support. G4's signed-out image alone does not prove that refresh occurred. Other authentication images are not clearly mapped to the complete retest sequence; their owner must clarify that provenance. The six-pass result rests on the named manual reports, not an inferred screenshot sequence.
- Browser version was not recorded and popup recovery duration was not measured. Preserve both gaps. Do not substitute this machine's current Chrome version or the earlier readiness script's timing for the testers' results.
- Some shared records reference an Issue #167 comment ending `7089198357`; it returned HTTP 404 during this review. This reassessment uses the working final #177 handoff and #167 evidence-update links above. Other students' source notes/index entries remain their work to reconcile.
- Tulseyy's stale further-independent-verification wording is not edited here. No additional reviewer is invented. His reported independent retest and an actual team approval are separate records.

## Keep post-freeze work separate

| Version/evidence | Use in the decision |
|---|---|
| Candidate `e5f1888` and its named candidate URL | The target of the two November 23 G1–G6 manual reports. |
| Later UI/discovery/personal-plan changes in [#200](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/pull/200), header restoration [#202](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/pull/202), dashboard restoration [#203](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/pull/203), and saved details [#204](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/pull/204) | Post-freeze supporting changes with their own evidence. They do not alter the frozen promise or establish candidate G1–G6 results. The saved-details application merge is `fcdb4f5007b1d791ebe28a01be4b1de9c4644050`. |
| November 24 [RSVP/refresh review and local checks](prachi-review-206-2026-11-24.md), tested at `bda69b5` | Separate current-source local/emulator evidence and acceptance of Devyana's dated manual RSVP report. It is not a full candidate retest or a team vote. |

Further polish remains outside the required Week 12 QA loop. This reassessment changes documentation/coordination only; it adds no application behavior, provider configuration, new runtime results or team-member approvals.
