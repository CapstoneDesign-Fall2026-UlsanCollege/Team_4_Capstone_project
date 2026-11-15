# CampusVibes — Final Demo Roadmap

**Project:** CampusVibes  
**Team:** 4  
**Course:** Capstone Design — Fall 2026  
**Date:** November 15, 2026  
**Status:** MVP Freeze Verification and Final Demo Preparation

## 1. Project Overview

CampusVibes is a web application that helps college students discover campus events, clubs, and student activities in one place.

Our final goal is to deliver a stable and functional Minimum Viable Product (MVP) and demonstrate its main features with reliable testing evidence.

**Live Website:** https://campusvibe-theta.vercel.app/

## 2. Final MVP Scope

The final demonstration will focus on:

- User authentication and account access.
- Dashboard and navigation.
- Event discovery.
- Event search and category filters.
- Event details.
- Club information.
- Firebase and Firestore integration.
- Theme and user interface.
- Error handling and application reliability.

The team will prioritize existing functionality rather than introducing unnecessary new features before the final demo.

## 3. Completed Testing and Verification Evidence

### A. Core Application Testing
- Core user journey regression testing.
- Event discovery and search.
- Category filtering.
- Event details.
- Dashboard navigation.
- Session refresh behavior.

Previously recorded regression result: 80 PASS.

### B. Theme and Notification Testing
- Light/dark theme switching.
- Theme persistence after refresh.
- Accessible theme-button labels.
- Notification interface checks.
- Saved-event read-status behavior.

Recorded result: 8 PASS, 0 FAIL.

Live Firestore notification delivery still requires separate verification.

### C. Firestore Security Testing
- Firestore security-rules testing.
- Published-event access checks.
- Data access and permission testing.

Recorded local security-rules result: 40 PASS, 0 FAIL.

Application-level error handling must be verified separately.

### D. Google Authentication Evidence

The Week 11 Evidence folder contains:

1. `W11-01-google-dashboard.png`
2. `W11-02-google-refresh.png`

These files are included as Google Dashboard and refresh testing evidence.

The final report should link these screenshots to the corresponding verification results.

### E. Privacy Bug and Production Evidence

The Evidence folder also contains:

1. `prachi-member-id-privacy-bug-report-2026-11-15.md`
2. `prachi-member-id-privacy-production-2026-11-15.json`

These files document the privacy-related bug report and production verification receipt.

The team should review the report and receipt before marking the privacy issue as resolved.

Do not expose member IDs, private user information, credentials, or sensitive production data in public screenshots or presentation slides.

## 4. MVP Freeze Roadmap

### Phase 1 — Freeze Core Functionality
- Review the MVP feature list.
- Stop unnecessary feature additions.
- Review open GitHub issues.
- Identify critical and high-priority defects.
- Select and record the MVP freeze candidate commit.
- Confirm the features included in the final demo.

### Phase 2 — Complete Verification
- Verify login and authentication.
- Check Google Sign-In behavior.
- Verify dashboard and session refresh.
- Test event discovery and filtering.
- Verify event details.
- Review Firestore error handling.
- Review privacy-related bug evidence.
- Retest important fixes.

### Phase 3 — UI and Quality Checks
- Check light/dark theme.
- Verify responsive layouts.
- Check navigation and buttons.
- Review accessibility.
- Check loading and empty states.
- Verify error messages.
- Run regression testing.

### Phase 4 — Final Demo Preparation
- Verify the deployed application.
- Prepare a local development backup.
- Prepare an approved demonstration account.
- Organize screenshots and testing reports.
- Update GitHub documentation.
- Prepare presentation slides.
- Rehearse the complete user journey.

## 5. Final Demo User Journey

| Step | Feature | Demonstration |
|---|---|---|
| 1 | Landing Page | Introduce CampusVibes |
| 2 | Login | Demonstrate authentication |
| 3 | Dashboard | Show the main dashboard |
| 4 | Discover Events | Show available events |
| 5 | Search & Filters | Search and filter events |
| 6 | Event Details | Open an event |
| 7 | Clubs | Show available club information |
| 8 | Theme | Demonstrate light/dark mode |
| 9 | Conclusion | Explain project value |

## 6. Local Backup Demonstration

The deployed website remains the primary demonstration platform.

The local React application will be prepared as a backup.

Previous testing evidence dated November 10, 2026:
- Vite development server started successfully.
- Dashboard opened.
- Discover Events page opened.
- Music category filter displayed 2 matching events out of 9.
- Open Mic & Poetry Night event details opened.
- Game Devs Guild club details popup opened.

**Next step:** Repeat local setup verification using the final MVP freeze candidate.

Evidence: GitHub Issue #118.

## 7. Week 11 Evidence Organization

The following evidence is available in `docs/Week11/Evidence/`:

| Evidence File | Purpose |
|---|---|
| W11-01-google-dashboard.png | Google Dashboard verification |
| W11-02-google-refresh.png | Google refresh verification |
| prachi-member-id-privacy-bug-report-2026-11-15.md | Privacy bug documentation |
| prachi-member-id-privacy-production-2026-11-15.json | Production verification receipt |

All evidence should be reviewed and linked to its corresponding issue or testing result.

## 8. Individual Responsibilities

Each team member should:

- Explain their assigned development area.
- Demonstrate their actual contribution.
- Provide testing evidence.
- Explain known limitations.
- Support final regression testing.
- Participate in the final presentation.

### Individual Responsibility — tulseyy8848

**Primary Area:** Build, Local Setup and Development Handoff.

Responsibilities:
- Verify local development setup.
- Check setup instructions.
- Start and test the Vite development server.
- Prepare local backup demonstration.
- Organize setup and testing screenshots.
- Maintain accurate documentation.
- Support the team's development handoff.

Previous evidence: Issue #118.

Next action: Verify the latest MVP freeze candidate and record updated results.

## 9. Remaining Tasks

| Task | Priority | Status |
|---|---|---|
| Final authentication verification | P1 | To verify |
| Firestore error handling | P1 | To verify |
| Privacy bug review | P1 | Review evidence |
| Event discovery regression | P1 | Retest freeze candidate |
| Search and filters | P1 | Retest freeze candidate |
| Theme and accessibility | P2 | Previously tested |
| Local backup verification | P1 | Repeat on freeze candidate |
| Final screenshots and evidence | P2 | Organize |
| Presentation preparation | P2 | Pending |
| Team rehearsal | P2 | Pending |

## 10. Final Demo Success Criteria

The final demonstration is ready when:

- The application launches successfully.
- Login and authentication work as expected.
- Dashboard navigation works.
- Event discovery and search work.
- Category filters work.
- Event details display correctly.
- Theme behavior is verified.
- Privacy-related issues are reviewed.
- No unresolved critical issue blocks the demo.
- Local backup setup is reproducible.
- Evidence is organized and accessible.
- Every team member can explain their contribution.

## 11. Future Improvements

After the MVP is stable, potential improvements include:

- Personalized event recommendations.
- Better club discovery.
- Advanced event filtering.
- Improved mobile responsiveness.
- Additional notification features.
- Better student engagement tools.

These improvements should not delay the final MVP demonstration.

## 12. Final Goal

Our goal is to present CampusVibes as a reliable campus activity discovery platform.

Team 4 will focus on completing MVP verification, improving application stability, maintaining transparent testing evidence, explaining individual contributions, and delivering a successful final demonstration.

**Final Principle: Stabilize the MVP, verify the core user journey, document evidence honestly, and demonstrate only features that the team can support with actual results.**


## November 16 Week 11 verification checkpoint

Use the [filled MVP Verification Checklist](MVP-Verification-Checklist.md) for the current expected/actual core-path assessment, separate severity/P-levels, owners, evidence limits and smallest recovery actions. This dated assessment supersedes older unqualified readiness statements above; historical test results keep their own dates.

The existing feature promise stays unchanged. Devyana's [November 15 independent Google/session receipt](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/issues/167#issuecomment-6889397205) establishes five reported scenarios, so full Google login is no longer described as wholly untested. It does not identify the final freeze SHA. The recommendation is to retain scope and follow the recovery/verification route until required #166 runtime gaps, final candidate regression and approval are recorded. Final team freeze approval is **PENDING**.

Prachi coordinates [#177](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/issues/177): record the candidate/URL with QA; arrange a named core-path and boundary repeat; carry exact Firestore gaps from #166; confirm setup/backup in #118; and record the actual team decision. **Next checkpoint: November 18, 2026, end of day KST.** P1 required verification precedes P2 reliability/setup/handoff; P3 features remain deferred. No P0 application blocker is established by this documentation assessment.

The [Sprint 2 quality record](Sprint-quality-quick-checks.md), [Prachi contribution/next actions](Evidence/prachi-week11-requirements-2026-11-16.md), [shared report](Weekly-Report.md) and [current area map](../Week10/ai-use-and-code-ownership-audit.md#codebase-area-map) complete the links. Privacy/Friends corrections remain supporting work; their automated success does not certify the entire Events demo. No new runtime, human review or team vote is claimed here.
