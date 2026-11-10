
# Week 10 Work Checklist — Code Ownership and Responsible AI Audit

**Date:** November 5–11, 2026  
**Team:** Team 4 — CampusVibes  
**Sprint:** Sprint 2 — MVP and Freeze  
**Status:** In Progress — Testing Documented; Remaining Handoffs Pending

> Advance the roadmap with work the team can explain, review, and verify. Each student keeps a bounded delivery slice and helps steward a codebase area. Stewardship supports shared work and does not make anyone the only person allowed to change an area. AI use must be disclosed and reviewed.

---

## 1. Map the Codebase Areas

- [x] Look at the actual repository and identify useful codebase areas.
  - **Result:** Six areas identified: Frontend Authentication and Navigation; Backend Provider APIs; Data, Account Privacy and Persistence; UI, Theme and Accessibility; QA and Core Integration; Build, Local Setup and Handoff.

- [x] Record actual folders, files, and responsibilities.
  - **Result:** The Codebase Area Map identifies the repository boundaries and relevant files for each area.

- [x] Propose primary stewards and backup reviewers.
  - **Result:** Primary and backup roles are recorded in the ownership audit.

- [x] Record one repeatable health or review check for each area.
  - **Result:** The audit includes Playwright checks, authentication readiness checks, backend tests, Firestore security-rules tests, QA regression tests, and setup checks.

- [x] Confirm teammates can contribute to shared areas.
  - **Result:** The audit states that stewardship does not reserve code or make one student the only reviewer.

**Evidence:** [Codebase Area Map](ai-use-and-code-ownership-audit.md#codebase-area-map)

**Section Status:** PARTIALLY COMPLETE — Role confirmations pending.

---

## 2. Choose a Roadmap Slice

- [x] Open the Final Demo Roadmap and select the next milestone.
  - **Result:** Week 10 ownership verification and Week 11 MVP freeze preparation.

- [x] Identify bounded roadmap slices.
  - **Result:** `DevyanaCT` selected Light/Dark Theme Toggle Automated Verification; `ujjalpoudel75` selected Authenticated Core Journey and Regression Testing.

- [x] Define how the selected behaviors will be checked.
  - **Result:** Playwright theme-toggle tests, manual core journey checks, and independent review.

- [x] Link relevant Issues and PRs.
  - **Result:** Theme verification PR #145, core journey Issue #138, Firestore Issue #117, and ownership tracking Issue #139.

- [x] Adjust slices to actual MVP progress.
  - **Result:** The team prioritized verification and stability instead of expanding the core MVP.

**Evidence:**
- [Final Demo Roadmap](../Week9/Final-demo-Roadmap.md)
- [PR #145](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/pull/145)
- [Issue #138](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/issues/138)
- [Issue #139](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/issues/139)

**Section Status:** COMPLETE for the documented slices.

---

## 3. Explain One Slice Per Student

- [x] Identify relevant functions, components, files, and tests.
  - **Result:** Theme-toggle files, authentication handlers, QA tests, and local setup boundaries are documented in the ownership audit.

- [x] Record each student's roadmap slice and proposed primary area.
  - **Result:** The Individual Slice and Stewardship Record contains entries for all four students.

- [x] Document purpose, input, output, and dependencies for the theme-toggle slice.
  - **Result:** `DevyanaCT` documented theme switching, localStorage persistence, DOM theme attributes, accessible labels, and React/CSS dependencies.

- [x] Link relevant code, PRs, commits, and tests.
  - **Result:** PR #145, and other existing evidence are linked.

- [x] Record unclear or unverified behavior instead of guessing.
  - **Result:** Google Sign-In completion and broader Firestore event integration remain explicitly limited.

- [ ] Confirm every student's personal explain-back and independent teammate check.
  - **Result:** Independent explanations and some backup confirmations remain pending.

### Individual Slice Records

| Student | Roadmap Slice / Responsibility | Primary Area | Explanation Status |
|---|---|---|---|
| `prachi2061` | Google provider entry and popup-dismissal recovery | Frontend Authentication | Source trace prepared; personal explain-back pending |
| `DevyanaCT` | Light/Dark Theme Toggle Automated Verification | UI, Theme and Accessibility | Explanation documented; peer handoff confirmation pending |
| `ujjalpoudel75` | Authenticated Core Journey and Regression Testing | QA and Core Integration | Functional checks documented; detailed source explain-back pending |
| `tulseyy8848` | Local Setup and Repeatable Handoff | Build and Local Setup | Setup contribution documented; independent clean-checkout confirmation pending |

**Evidence:**
- [Ownership Audit](ai-use-and-code-ownership-audit.md)
- [DevyanaCT Theme Handoff](DevyanaCT-UI-Theme-Handoff.md)
- [Issue #139](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/issues/139)

**Section Status:** PARTIALLY COMPLETE — Independent explanations pending.

---

## 4. Review and Verify the Behavior

- [x] Identify one bounded behavior with an expected result.
  - **Expected:** Light/Dark Theme Toggle switches themes, persists after refresh, and has accessible labels.

- [x] Perform the theme-toggle check and record the actual result.
  - **Actual:** Dedicated Playwright theme-toggle test passed locally.

- [x] Run the existing Playwright smoke suite.
  - **Actual:** 80 tests passed.

- [x] Obtain independent code review.
  - **Result:** `prachi2061` approved PR #145; 2 GitHub checks passed.

- [ ] Record a teammate's independently reproduced theme check and explain-back.
  - **Result:** Pending in `DevyanaCT-UI-Theme-Handoff.md`.

- [x] Record QA and Core Integration testing.
  - **Result:** `ujjalpoudel75` completed six manual checks and a full Playwright rerun with 80 passing tests.

- [x] Record Firestore security-rules testing.
  - **Actual:** 34 tests passed, 0 failed using the local Firestore Emulator.

- [x] Verify a published-event Firestore query and display.
  - **Actual:** November 9 — `campusPublishedEvents` Listen query returned HTTP 200; `story time` appeared with matching details.

- [ ] Complete broader Firestore search/filter, refresh, and loading-error verification.
  - **Result:** Pending in Issue #117.

- [x] Review and disclose AI-assisted work.
  - **Result:** The ownership audit records AI assistance, manual checking, and verification limitations.

- [x] Link available review and test evidence.
  - **Result:** PR #145, Issues #117, #138, and #139 are referenced.

**Evidence:**
- [PR #145 — Theme Verification](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/pull/145)
- [Issue #117 — Firestore Testing](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/issues/117)
- [Issue #138 — Core Journey](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/issues/138)
- [Theme Handoff](DevyanaCT-UI-Theme-Handoff.md)

**Section Status:** PARTIALLY COMPLETE — Additional peer and Firestore checks pending.

---

## 5. Record Ownership and Advance the Roadmap

- [x] Prepare and update the AI Use and Code Ownership Audit.
  - **Result:** Codebase areas, individual slices, testing evidence, AI-use notes, and remaining gaps are documented.

- [x] Record AI use for relevant changes.
  - **Result:** ChatGPT and Codex assistance are disclosed for the relevant recorded work.

- [x] Record individual slices, primary areas, backups, explanation status, and checks.
  - **Result:** All four students have entries; some declarations remain pending confirmation.

- [x] Map codebase areas to actual repository boundaries.
  - **Result:** Six areas include real source paths and repeatable checks.

- [x] Link the Codebase Area Map from the shared Weekly Report.
  - **Result:** The Weekly Report links the ownership audit and its area map.

- [ ] Confirm the Working Agreement links to the Codebase Area Map.
  - **Result:** Not independently confirmed from the documents reviewed.

- [ ] Confirm all unresolved gaps have named owners and due points.
  - **Result:** Some team ownership and backup assignments are still proposed.

- [x] Record Week 10 results and Week 11 follow-ups in the Final Demo Roadmap.
  - **Result:** Theme verification, published-event verification, and remaining tests are documented.

- [x] Add individual contributions to the shared Weekly Report.
  - **Result:** The shared report includes rows for `prachi2061`, `DevyanaCT`, and `ujjalpoudel75`; `tulseyy8848`'s individual contribution row still needs confirmation in the supplied report snapshot.

- [ ] Confirm all updated documentation is committed and linked.
  - **Result:** Current GitHub commit status has not been independently confirmed.

**Evidence:**
- [Ownership Audit](ai-use-and-code-ownership-audit.md)
- [Weekly Report](Weekly-Report.md)
- [Final Demo Roadmap](../Week9/Final-demo-Roadmap.md)
- [Issue #139](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/issues/139)

**Section Status:** PARTIALLY COMPLETE — Team-wide confirmations pending.

---

## Evidence to Link in GitHub

- [x] Roadmap milestone and related Issues.
- [x] Codebase Area Map with repository boundaries and checks.
- [x] Theme-toggle implementation and verification PR.
- [x] Individual ownership audit entries.
- [x] Theme testing expected/actual results.
- [x] Firestore testing results and limitations.
- [x] AI-use notes and human review references.
- [x] Shared Weekly Report with documented individual contributions.
- [x] Theme handoff document.
- [ ] Independent theme handoff completion receipt.
- [ ] Confirmed contribution and ownership records for every student.

---

## Optional Stretch

- [ ] Improve unclear code and verify its behavior.
- [ ] Add an automated test for an important edge case.
- [ ] Ask a teammate outside the area to independently reproduce a test.
- [ ] Improve the handoff documentation so another student can run the check.

---

## Homework — Due November 11, 2026

Prepare for the Week 11 roadmap checkpoint on November 12.

### Completed Preparation

- [x] Document the existing guest and authenticated core-journey QA evidence.
- [x] Record theme-toggle verification and independent PR approval.
- [x] Verify the Firestore published-event query and display for the tested event.
- [x] Run Firestore security-rules tests.
- [x] Record known authentication and Firestore limitations.
- [x] Update the Final Demo Roadmap with Week 10 evidence and Week 11 follow-ups.

### Remaining Homework

- [ ] Confirm the independent theme handoff and explanation.
- [ ] Confirm outstanding primary/backup area roles.
- [ ] Ensure all four student contribution rows and evidence links are complete.
- [ ] Confirm the latest GitHub documents and Issues are consistent.
- [ ] Confirm the working area map and handoff links are accessible.

---

## Final Check

- [ ] Every student has independently confirmed their slice and can explain it.
- [ ] Every student has a confirmed primary area and backup/contact.
- [ ] Another teammate can independently locate and reproduce the area check.
- [x] Existing automated tests and documented manual checks have supporting results.
- [x] Known AI assistance is disclosed.
- [x] Firestore verification distinguishes the successful narrow check from untested scenarios.
- [ ] All unresolved gaps have confirmed owners and next checks.
- [ ] All final links and team-wide documentation statuses have been checked.

**Final Status:** IN PROGRESS — Week 10 verification evidence is substantially documented, but team-wide ownership confirmations, independent handoffs, and some integration checks remain outstanding.
