# CampusVibes – Issue Priority Guide

**Project:** CampusVibes  
**Team:** Team 4  
**Purpose:** To classify and manage project issues based on their urgency, impact, and importance.

## 1. Priority Levels

### P0 – Critical
Issues that completely prevent users from accessing or using the application.

Examples:
- Application fails to start.
- Login and authentication are completely unavailable.
- Application crashes when opening the dashboard.
- Critical Firebase connection failure prevents core functionality.
- Deployed application is completely unavailable.

**Expected action:** Fix immediately.

### P1 – High
Issues that affect important features and prevent users from completing major tasks.

Examples:
- Event discovery page does not load events.
- Event details cannot be opened.
- Event search and category filters do not work.
- Users cannot access important dashboard features.
- Creating or displaying events fails.

**Expected action:** Fix as soon as possible.

### P2 – Medium
Issues that affect individual features but do not stop the overall application from working.

Examples:
- Club details popup displays incorrect information.
- Some event information is missing.
- Search results are not displayed correctly.
- UI elements are not properly aligned.
- Navigation links lead to the wrong page.

**Expected action:** Fix during the current or next development sprint.

### P3 – Low
Minor improvements and suggestions that do not affect core functionality.

Examples:
- Improve button styling.
- Adjust font sizes and colors.
- Improve spacing and visual consistency.
- Add better loading indicators.
- Improve documentation and user instructions.

**Expected action:** Address when time and resources are available.

## 2. Priority Assignment Guidelines

When creating a GitHub issue, consider:

1. **Impact:** How many users are affected?
2. **Severity:** Does the issue prevent an important feature from working?
3. **Urgency:** Does it need immediate attention?
4. **Workaround:** Can users continue using the application another way?

## 3. CampusVibes Priority Examples

| Issue | Priority |
|---|---|
| Application does not start | P0 |
| Login is completely broken | P0 |
| Events page does not load | P1 |
| Event search does not work | P1 |
| Event details cannot be opened | P1 |
| Club details popup has incorrect information | P2 |
| Navigation link is incorrect | P2 |
| Improve dashboard styling | P3 |
| Improve button appearance | P3 |
| Update setup documentation | P3 |

*Priorities should be adjusted based on the actual impact and severity of each issue.*

## 4. GitHub Issue Requirements

Every issue should include:

- **Title:** A short and clear description.
- **Description:** Explain the problem or requested feature.
- **Steps to Reproduce:** Explain how to reproduce the problem.
- **Expected Result:** Explain what should happen.
- **Actual Result:** Explain what happens instead.
- **Priority:** P0, P1, P2, or P3.
- **Assignee:** Team member responsible for the issue.
- **Evidence:** Screenshots or other relevant information.

## 5. Priority Management

- Review issue priorities during sprint planning.
- Assign issues to responsible team members.
- Address critical and high-priority issues first.
- Retest fixes before closing issues.
- Update issue status and attach testing evidence.

## 6. Goal

The purpose of this guide is to help Team 4 prioritize development work, resolve important problems efficiently, improve application reliability, and deliver a better CampusVibes experience for college students.
