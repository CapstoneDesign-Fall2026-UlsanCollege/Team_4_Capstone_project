
# Week 10 — UI/UX and Theme Teammate Handoff

**Project:** CampusVibes  
**Team:** 4  
**Student:** DevyanaCT  
**Primary Area:** Frontend UI/UX, Theme and Accessibility  
**Roadmap Slice:** Light/Dark Theme Toggle — Automated UI Verification  
**Reviewer:** prachi2061  
**Date:** November 9, 2026  
**Handoff Status:** Pending Independent Confirmation

## 1. Purpose

This handoff helps another teammate understand, navigate, test, and maintain the CampusVibes Light/Dark Theme Toggle feature.

## 2. Relevant Files

| File | Purpose |
|---|---|
| `frontend/react-app/src/ThemeToggle.jsx` | React theme-toggle component and accessible button |
| `frontend/react-app/src/theme.js` | Theme storage, application, and switching logic |
| `frontend/react-app/src/theme.css` | Light/dark theme styling |
| `frontend/react-app/tests/smoke/theme-toggle.spec.js` | Automated theme-toggle verification |

## 3. Code Explanation

- `readStoredTheme()` reads the previously selected theme from browser storage.
- `applyTheme()` applies the selected theme to the application.
- `toggleTheme()` switches between light and dark modes.
- `ThemeToggle()` renders the theme-toggle control and provides accessible button labels.

**Input:** User clicks the theme-toggle button.

**Expected Output:** The application switches themes and remembers the selection after page refresh.

**Dependency:** Browser localStorage, DOM theme attributes, React, and CSS theme styles.

## 4. Existing Testing Evidence

| Test | Result |
|---|---|
| Playwright smoke suite | 80 PASS |
| Dedicated theme-toggle test | PASS locally |
| PR #145 independent review | Approved by prachi2061 |
| GitHub checks for PR #145 | 2 successful |

**Evidence:** [PR #145](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/pull/145)
[Issue #139](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/issues/139)

#### Prachi-requested review: Devyana UI/theme handoff — November 11, 2026 (KST)

This responds to Devyana's [notification/mobile review request](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/issues/139#issuecomment-6701614426), [theme test PR #145](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/pull/145), and [UI/theme handoff](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/blob/050673f17a98ec2683039ef8c0bba771d9f27b91/docs/Week10/DevyanaCT-UI-Theme-Handoff.md). Posted at Prachi's request using Codex-assisted source inspection and a new local automated rerun. This records technical review; it does not certify an unaided human explain-back or an independently performed human test.

**Review result:** No blocking defect found in the reviewed theme implementation or these assertions. PR #145 was already merged and has an earlier approval; this is a dated follow-up, not a new merge approval.

**Environment/source:** Windows, installed Google Chrome, local Vite server at 127.0.0.1:4178; commit [`050673f`](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/commit/050673f17a98ec2683039ef8c0bba771d9f27b91). Run started November 11 at 12:57 KST. The theme source/CSS and both requested test files are unchanged from PR #145's head `0ab1359`.

| Check | Expected | Actual |
|---|---|---|
| [Theme test](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/blob/050673f17a98ec2683039ef8c0bba771d9f27b91/frontend/react-app/tests/smoke/theme-toggle.spec.js) | Light → dark, accessible label changes, dark mode persists after reload, then returns to light | **2 PASS**: desktop and mobile |
| [Notification tests](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/blob/050673f17a98ec2683039ef8c0bba771d9f27b91/frontend/react-app/tests/smoke/notifications.spec.js) | Saved-event read status survives reload; Community/Feed filters and links work; Escape restores bell focus; narrow dark panel fits; failed browser writes remain visible without clearing unread status | **6 PASS**: three cases in each project |

**Total: 8 passed, 0 failed, 0 skipped, 0 flaky; retries disabled.** Configured viewports were 1440×900 and 390×844. The narrow-panel case explicitly sets **320×640 in both projects**, so those two executions are the same narrow viewport. I also inspected the generated desktop/mobile notification screenshots.

**Source findings:**
- [`readStoredTheme/applyTheme/toggleTheme`](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/blob/050673f17a98ec2683039ef8c0bba771d9f27b91/frontend/react-app/src/theme.js) match Devyana's explanation: invalid/unavailable stored values fall back to light; applying a theme updates the document, color scheme and metadata before attempting a guarded storage write. [`ThemeToggle`](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/blob/050673f17a98ec2683039ef8c0bba771d9f27b91/frontend/react-app/src/ThemeToggle.jsx) updates its state, label and icon, and startup applies the saved preference.
- The notification failure injection targets only `cv_notifications_demo`, preserving unrelated storage. [`Notifications.markRead`](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/blob/050673f17a98ec2683039ef8c0bba771d9f27b91/frontend/react-app/src/Notifications.jsx#L105) attempts the demo storage write before committing the in-memory read status; the catch displays the error. The test's retained unread count therefore checks meaningful failure behavior.
- Fresh browser contexts, explicit light-mode setup, role-based selectors and auto-waiting assertions make the chosen checks repeatable without fixed sleeps.

**Non-blocking follow-ups:** Add theme cases for invalid stored values and blocked storage. Source inspection shows the fallback, but the theme test does not execute those failures. Contrast, every styled component, keyboard-only operation and cross-browser behavior need their own checks. Notification tests use demo activity/browser storage and do not establish live Firestore notification delivery or permissions. The full smoke suite and deployed authenticated journey were not rerun.

**Repeat from `frontend/react-app`:**
```powershell
$env:SMOKE_BROWSER_CHANNEL = 'chrome'
npm run test:smoke -- tests/smoke/theme-toggle.spec.js tests/smoke/notifications.spec.js
```
The review runner used the same files/config with JSON reporting and a private artifact directory. Windows blocked automatic Vite shutdown after the test worker exited; I verified and stopped only the server launched for this run. All assertions passed and the runner returned exit code 0. This cleanup issue is separate from application behavior.

No application files, teammate documents, report rows, provider settings or role-acceptance declarations were changed. The remaining human handoff/backup confirmation and the broader authentication/Firestore milestones remain separate.


## 5. Responsible AI Use

ChatGPT assisted with test guidance, code explanation, troubleshooting, and handoff documentation.

I reviewed the implementation and performed the previously recorded local tests.

## 6. Next Action

Any identified issues will be documented and resolved through the team's normal review workflow.


**Final Handoff Status:** Technical review complete — 8 automated checks PASS (2 theme, 6 notification). PR #145 approved and merged. Independent unaided human explain-back and any required manual handoff confirmation remain pending.
