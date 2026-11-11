
# Week 10 Work Checklist — Code Ownership and Responsible AI Audit

**Project:** CampusVibes  
**Team:** 4  
**Week:** 10 — November 5–11, 2026  
**Sprint:** Sprint 2 — MVP and Freeze  
**Status:** PARTIALLY COMPLETE — Technical Review Completed; Remaining Human Handoffs and Integration Checks Pending

---

## 1. Map the Codebase Areas

- [x] Identify the major codebase areas.
  - Six areas identified: Frontend Authentication, Backend Provider APIs, Data/Privacy/Persistence, UI/Theme/Accessibility, QA/Core Integration, and Build/Local Setup.

- [x] Record actual repository folders and responsible areas.

- [x] Propose primary stewards and backup reviewers.

- [x] Record a repeatable health check for each area.

- [x] Document that teammates can contribute across areas.

- [ ] Confirm all remaining primary/backup ownership assignments.

**Evidence:** [Codebase Area Map](ai-use-and-code-ownership-audit.md#codebase-area-map)

**Status:** PARTIALLY COMPLETE — Some team-wide confirmations remain pending.

---

## 2. Choose a Roadmap Slice

- [x] Select the Week 10 roadmap milestone.

- [x] Identify individual roadmap slices.

  - `DevyanaCT` — Light/Dark Theme Toggle Automated Verification.
  - `ujjalpoudel75` — Authenticated Core Journey and Regression Testing.
  - `prachi2061` — Google Provider Entry and Popup-Dismissal Recovery.
  - `tulseyy8848` — Independent Local Setup and Development Handoff.

- [x] Define expected behavior and verification methods.

- [x] Link supporting Issues, PRs and commits.

- [x] Prioritize verification and stability before the MVP freeze.

**Evidence:**
- [Final Demo Roadmap](../Week9/Final-demo-Roadmap.md)
- [PR #145](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/pull/145)
- [Issue #139](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/issues/139)

**Status:** COMPLETE for the documented roadmap slices.

---

## 3. Explain One Slice Per Student

- [x] Identify relevant functions, components and tests.

- [x] Document each student's selected roadmap slice.

- [x] Record the theme-toggle implementation explanation.

  - `readStoredTheme()` — Reads the saved theme and handles invalid/unavailable values.
  - `applyTheme()` — Applies the theme to the document and metadata.
  - `toggleTheme()` — Switches between light and dark mode.
  - `ThemeToggle()` — Renders the accessible theme control.

- [x] Document the theme-toggle input, output and dependencies.

- [x] Link PR #145, implementation commit `108d8b6` and supporting tests.

- [x] Record independent technical source-review findings.

- [ ] Obtain a documented unaided human explain-back where required.

- [ ] Complete remaining team-wide individual explanation and backup confirmations.

### Individual Slice Records

| Student | Area | Current Status |
|---|---|---|
| `prachi2061` | Frontend Authentication | Source trace and technical evidence available; personal explain-back pending |
| `DevyanaCT` | UI, Theme and Accessibility | Theme explanation completed; technical review and automated rerun completed; unaided human explain-back not certified |
| `ujjalpoudel75` | QA and Core Integration | QA checks completed; detailed source explain-back remains pending |
| `tulseyy8848` | Build and Local Setup | Local testing documented; independent clean-checkout handoff pending |

**Evidence:**
- [Ownership Audit](ai-use-and-code-ownership-audit.md)
- [UI/UX and Theme Handoff](DevyanaCT-UI-Theme-Handoff.md)
- [Issue #139](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/issues/139)

**Status:** PARTIALLY COMPLETE.

---

## 4. Review and Verify the Behavior

### A. Theme Toggle Verification

- [x] Identify expected theme-toggle behavior.
  - Light/dark switching, accessible button labels, theme persistence and switching back to light.

- [x] Run the original dedicated theme-toggle test.
  - Result: PASS locally.

- [x] Run the existing Playwright smoke suite.
  - Result: 80 PASS.

- [x] Obtain independent PR code review.
  - Result: `prachi2061` approved PR #145.

- [x] Confirm PR #145 was merged.
  - Result: Merge confirmed in the November 11 review record.

- [x] Complete November 11 technical theme review.
  - Reviewer: `prachi2061`.
  - Source commit: `050673f`.
  - Desktop viewport: 1440×900.
  - Mobile viewport: 390×844.
  - Result: 2 PASS, 0 FAIL.

- [x] Review theme implementation source.
  - Confirmed saved-theme handling, document updates, accessible labels and fallback logic.

- [x] Document the repeatable theme-test command.

- [ ] Record an unaided teammate explain-back and independently performed human verification, if required by the professor.
  - Technical source review and Codex-assisted automated rerun are already recorded but do not certify this separate requirement.

**Theme Status:** AUTOMATED TESTING AND TECHNICAL REVIEW COMPLETE; HUMAN EXPLAIN-BACK PENDING.

### B. Notification UI Verification

- [x] Perform November 11 automated notification checks.

- [x] Verify saved-event read status after reload.

- [x] Verify Community/Feed filters and navigation links.

- [x] Verify Escape restores notification-bell focus.

- [x] Verify narrow notification panel layout.

- [x] Verify browser-storage failure handling.

- [x] Inspect generated desktop/mobile screenshots.

**Results:**
- Notification tests: 6 PASS.
- Combined theme/notification tests: 8 PASS.
- Failed: 0.
- Skipped: 0.
- Flaky: 0.

**Limitations:**
- Tests used demo activity/browser storage.
- Live Firestore notification delivery was not verified.
- Full cross-browser and keyboard-only accessibility testing remains outside this review.

**Evidence:** [November 11 Review Comment](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/issues/139#issuecomment-6786608721)

**Status:** PASS — Tested automated scenarios.

### C. QA and Core Integration

- [x] Record six manual core-journey checks.
  - Result: 6 PASS.

- [x] Record the existing Playwright regression test.
  - Final full rerun: 80 PASS.

- [x] Verify Google popup cancellation and retry behavior.

- [ ] Complete real Google-account authentication and session verification.

**Evidence:** [Issue #138](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/issues/138)

**Status:** PARTIALLY VERIFIED.

### D. Firestore Security-Rules Verification

- [x] Run local Firestore Emulator tests.

- [x] Record the earlier result.
  - 34 PASS, 0 FAIL.

- [x] Record the latest November 10 result.
  - 40 PASS, 0 FAIL.

- [x] Document permission-test limitations.

**Command:** `npm run test:rules`

**Status:** PASS — Existing automated security-rules suite.

### E. Firestore Event Loading

- [x] Confirm `campusPublishedEvents` collection.

- [x] Verify Firestore Listen query.
  - HTTP 200.

- [x] Verify published event `story time` appears.

- [x] Test event search and category filtering.

- [x] Report successful search/filtering using another published event.

- [x] Verify published-event visibility after refresh.

- [x] Record active search/category behavior after refresh.
  - Search cleared.
  - Category reset to All.
  - Event remained visible.

- [x] Verify event details and missing-field fallback.

- [x] Test temporary network interruption and recovery.

- [x] Verify Firestore network reconnection.
  - HTTP 200 after reconnecting.

- [ ] Confirm whether search/category reset after refresh is intended.

- [ ] Verify application-level Firestore permission-denied handling.

- [ ] Verify application-level Firestore loading-error handling.

- [ ] Complete field mapping for additional published events.

- [ ] Complete independent Firestore integration review.

**Evidence:** [Issue #117](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/issues/117)

**Status:** PARTIALLY VERIFIED — IN PROGRESS.

---

## 5. Responsible AI Use

- [x] Disclose ChatGPT assistance in theme-toggle testing.

- [x] Disclose ChatGPT assistance in Firestore testing and documentation.

- [x] Record Codex assistance in the November 11 technical review.

- [x] Distinguish automated test results from human explain-back.

- [x] Record source inspection and test limitations.

- [x] Link the responsible AI audit to supporting evidence.

**Evidence:** [AI Use and Code Ownership Audit](ai-use-and-code-ownership-audit.md)

**Status:** DOCUMENTED for the activities recorded.

---

## 6. Record Ownership and Advance the Roadmap

- [x] Prepare the AI Use and Code Ownership Audit.

- [x] Document the six codebase areas.

- [x] Record individual roadmap slices and proposed ownership.

- [x] Document `DevyanaCT` theme implementation and verification evidence.

- [x] Record Prachi's November 11 technical review of theme and notifications.

- [x] Add individual contribution rows for all four members.

- [x] Record Firestore event-loading and security-rules testing.

- [x] Link the Weekly Report and Codebase Area Map.

- [ ] Confirm remaining team-wide primary/backup assignments.

- [ ] Confirm the Working Agreement links to the area map.

- [ ] Confirm every student has completed their own explanation.

- [ ] Verify all updated GitHub documentation is committed and linked.

**Evidence:**
- [Weekly Report](Weekly-Report.md)
- [Ownership Audit](ai-use-and-code-ownership-audit.md)
- [Final Demo Roadmap](../Week9/Final-demo-Roadmap.md)
- [Issue #139](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/issues/139)

**Status:** PARTIALLY COMPLETE.

---

## 7. Evidence Checklist

### Completed or Documented

- [x] Theme-toggle implementation and PR #145.
- [x] Original theme-toggle automated tests.
- [x] Original 80-test Playwright smoke suite.
- [x] PR #145 independent approval and merge record.
- [x] November 11 theme/notification technical review — 8 PASS.
- [x] Theme source inspection and findings.
- [x] Firestore event query/display results.
- [x] Firestore search/filter and refresh observations.
- [x] Firestore network reconnection.
- [x] Firestore security-rules results — 40 PASS.
- [x] Responsible AI-use documentation.
- [x] Shared Weekly Report contributions.

### Still Pending

- [ ] Confirm human explain-back and independent handoff acceptance.
- [ ] Verify the latest Firestore 40/40 screenshot is linked.
- [ ] Verify all public screenshots are redacted.
- [ ] Complete outstanding application-level Firestore error tests.
- [ ] Confirm all required ownership and backup declarations.
- [ ] Complete final GitHub link and documentation review.

---

## 8. Week 11 Follow-up Work

**Checkpoint:** November 12, 2026

### DevyanaCT — UI/UX and Theme

- [x] Complete theme-toggle automated verification.
- [x] Obtain PR #145 independent approval.
- [x] Record November 11 theme technical review — 2 PASS.
- [x] Record notification technical review — 6 PASS.
- [ ] Obtain any still-required unaided human explain-back receipt.
- [ ] Consider additional theme tests for invalid saved values and blocked storage.
- [ ] Review contrast and keyboard-only accessibility where required.
- [ ] Confirm final screenshot evidence is redacted.

### Firestore Integration Support

- [x] Verify published-event query/display.
- [x] Verify search/filtering and refresh visibility.
- [x] Verify Firestore reconnection.
- [x] Run 40 passing security-rules tests.
- [ ] Verify application-level permission-denied handling.
- [ ] Verify application-level loading-error handling.
- [ ] Complete additional event field mapping.
- [ ] Obtain independent final integration review.

### Team Handoffs

- [ ] Complete remaining individual explanations.
- [ ] Confirm outstanding primary/backup assignments.
- [ ] Complete independent setup handoff verification.
- [ ] Complete real Google Sign-In verification.
- [ ] Review GitHub documentation and outstanding Issues.

---

## 9. Final Check

- [x] Codebase areas identified and documented.
- [x] Roadmap slices recorded.
- [x] Theme-toggle implementation explained.
- [x] Theme-toggle automated verification completed.
- [x] PR #145 independently reviewed and merged.
- [x] November 11 technical theme/notification review completed.
- [x] Core QA results documented.
- [x] Firestore published-event verification documented.
- [x] Firestore security-rules suite — 40 PASS.
- [x] Responsible AI assistance disclosed.

- [ ] Complete all remaining personal explain-backs.
- [ ] Confirm all team-wide backup assignments.
- [ ] Complete remaining application-level Firestore tests.
- [ ] Verify all evidence redaction and links.
- [ ] Confirm final Week 11 readiness.

---

## 10. Final Status

**PARTIALLY COMPLETE — Technical Verification Completed; Remaining Human Handoffs and Integration Checks Pending**

### Verified

- Theme-toggle automated testing.
- PR #145 approval and merge.
- November 11 theme/notification technical review — 8 PASS.
- Existing 80-test Playwright smoke suite.
- Core-journey QA checks.
- Firestore published-event search/display/refresh checks.
- Firestore network reconnection.
- Local Firestore security-rules tests — 40 PASS, 0 FAIL.
- Responsible AI-use disclosure.

### Remaining

- Unaided human explain-back and any required independent manual handoff.
- Team-wide ownership confirmations.
- Application-level Firestore error handling.
- Additional field-mapping verification.
- Screenshot evidence and redaction checks.
- Final Week 11 integration review.

**Conclusion:** CampusVibes completed the documented Week 10 theme-toggle automated verification, technical review, core QA checks, and scoped Firestore tests. The November 11 theme/notification review found no blocking defects in the checked scenarios. Remaining handoff and application-level integration checks are tracked separately and must not be marked complete without evidence.
