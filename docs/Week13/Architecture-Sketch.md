
# Architecture Sketch

**Team:** Team 4 — CampusVibes  
**Project:** CampusVibes — Campus Event and Community Platform  
**Last updated:** November 27, 2026  
**Sprint:** Week 13 — Final Handoff and Demo Readiness  
**Status:** Architecture documented from existing implementation and QA evidence; final handoff review pending

## One-sentence architecture

CampusVibes is a web application using a React/Vite frontend, Firebase Authentication for user accounts, Cloud Firestore for shared event data, and external services for hosting and map-related features.

This project uses:

> **Frontend:** React, Vite, HTML, CSS, JavaScript  
> **Backend / Logic:** Firebase Authentication, Firestore security rules, application services and event-handling logic  
> **Data:** Cloud Firestore, browser-local state and cached/sample event data  
> **External services:** Firebase, Vercel, Google Sign-In, Google Maps

**Architecture boundary:** The verified published-event path connects the frontend to Firebase services. A separate Node/Express API must not be assumed to handle every request without confirming the current deployed implementation.

---

## Simple diagram

```text
                  CampusVibes Architecture

                         Student
                            |
                            v
                  Browser / Web App
                            |
                            v
                React + Vite Frontend
              (frontend/react-app/)
                            |
              +-------------+-------------+
              |             |             |
              v             v             v
       Authentication   Event Logic    UI Features
       Login / Logout   Search/Filter  Dashboard
       Verification     Event Details  Theme / RSVP
              |             |         Trip Planner
              v             v             |
       Firebase Auth    Firestore SDK      v
              |             |        Google Maps
              |             |
              +------+------+ 
                     |
                     v
             Firebase Services
                     |
           +---------+---------+
           |                   |
           v                   v
    Authentication        Cloud Firestore
      User Identity       Published Events
                          Shared Data
                               |
                               v
                       Firestore Rules
                       Access Control

        ---------------------------------------
              Local QA / Testing Layer
        ---------------------------------------

        Firebase Authentication Emulator
                 Port 19499

               Firestore Emulator
                 Port 18480

          Playwright Automated Testing
          Chrome Manual Browser Testing
          Desktop / Mobile Viewports

        ---------------------------------------
               Deployment / Handoff
        ---------------------------------------

               GitHub Repository
                      |
                      v
                 Vercel Hosting
                      |
                      v
                CampusVibes Website
```

**Note:** This is a simplified architecture sketch, not a complete inventory of every internal API or deployed service.

---

## Main parts

| Part | What it does | Area map / relevant check | Risk / uncertainty |
|---|---|---|---|
| UI | Provides Landing Page, Login, Dashboard, Discover Events, Event Details, filtering, theme, RSVP and Trip Planner interfaces | `frontend/react-app/`; UI and navigation QA | Newer features require their own release-specific verification |
| Authentication | Handles signup, login, verification, session persistence and logout using Firebase Authentication | Firebase Auth integration; Issues #167 and #177 | Targeted Google retests passed, but whole-MVP approval remains separate |
| Data | Retrieves published events and supports their display through Firestore | `published-events-store.js`, `published-events-model.js`; Issue #166 | Permissions, network failures and data availability must be handled |
| Logic/API | Connects application UI to authentication, event filtering, published-event listeners and Retry/error behavior | `App.jsx`, `event-catalog-status.js`, Firebase integration files | Manual terminal-error and Retry-click coverage remains incomplete |
| External services | Supports map directions and other provider-based features | Google Maps; Issue #197 and PR #196 | Route availability depends on provider and region |
| Setup/docs | Supports development setup, QA evidence, backup verification and handoff | Firebase Emulator configuration, Playwright tests, Weekly Report and Ownership Audit | Documentation must match the tested revision and deployed environment |

---

## Current codebase area map

**Current ownership reference:**

[AI Use and Code Ownership Audit](../Week12/ai-use-and-code-ownership-audit.md)

This audit remains the team's current area map. The Architecture Sketch does not establish a separate list of code owners.

### Which areas or interfaces cross in this sketch?

**1. Frontend and Authentication**

The application UI interacts with Firebase Authentication to manage account verification, login, logout and authenticated access.

**2. Frontend and Firestore**

Discover Events depends on Firestore listeners to retrieve published-event information.

Relevant files:

- `frontend/react-app/src/published-events-store.js`
- `frontend/react-app/src/published-events-model.js`
- `frontend/react-app/src/App.jsx`
- `frontend/react-app/src/event-catalog-status.js`

**3. Firestore and Security Rules**

Firestore security rules restrict access to protected data. Authenticated membership requirements and query limits are part of the published-event read controls.

Relevant file:

- `backend/firebase/firestore.rules`

**4. UI and External Map Services**

Event Details and the Trip Planner interact with Google Maps.

Provider-supported route types may differ by region.

**5. QA and Implementation**

QA verifies application behavior, reports defects, documents evidence and communicates findings to implementation owners.

Separate test results must not be treated as proof that the entire system is ready for unconditional release.

### What should someone outside the team check first?

1. Open the CampusVibes repository.
2. Review the existing Setup Guide and Code Ownership Audit.
3. Confirm the selected application revision and environment.
4. Run the documented frontend setup and smoke checks.
5. Verify login and the basic Dashboard → Discover → Event Details journey.
6. Review Firestore connection and published-event handling.
7. Check the known QA limitations before attempting the final demonstration.

**Important:** Local Firebase Emulators should use fictional accounts and data. Do not modify production security rules or real user records for testing.

---

## Evidence links

### Project and architecture

- [CampusVibes GitHub Repository](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project)
- [CampusVibes Deployed Website](https://campusvibe-theta.vercel.app/)
- [Code Ownership and QA Audit](../Week12/ai-use-and-code-ownership-audit.md)

### Authentication

- [Google Authentication QA — Issue #167](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/issues/167)
- [MVP Handoff and Approval — Issue #177](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/issues/177)

### Firestore

- [Firestore Event Loading — Issue #117](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/issues/117)
- [Firestore Independent QA — Issue #166](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/issues/166)
- [November 19 Automated Firestore QA — 18 PASS, 0 FAIL](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/issues/166#issuecomment-7003471002)

### Additional application features

- [RSVP Independent QA — Issue #193](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/issues/193)
- [RSVP Repair — PR #195](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/pull/195)
- [Event Trip Planner QA — Issue #197](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/issues/197)
- [Event Trip Planner — PR #196](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/pull/196)

### Local setup and handoff

- [Local Setup and Backup — Issue #118](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/issues/118)
- [Final Handoff — Issue #177](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/issues/177)

---

## Important decisions

| Decision | Why we chose it | Risk |
|---|---|---|
| Use React/Vite for the current frontend | Supports application UI, navigation and component-based implementation | UI changes can introduce regressions |
| Use Firebase Authentication | Supports verified account access and session management | Provider configuration and login edge cases |
| Use Cloud Firestore for shared published-event data | Allows the frontend to retrieve and display published records | Network availability and security-rule restrictions |
| Use Firebase Emulators for independent testing | Allows controlled permission-denied and recovery scenarios without modifying production data | Emulator results do not prove every production-provider behavior |
| Retain sample-event fallback | Keeps Discover usable when shared events cannot be loaded | Sample data must not be presented as live published data |
| Use Vercel deployment | Provides a browser-accessible CampusVibes application | Deployed revision must be verified before claiming release-specific PASS |
| Preserve the November 18 frozen MVP candidate | Keeps the formal freeze and conditional approval traceable | Newer feature changes must remain distinguishable from the frozen candidate |
| Keep the ownership audit as the single area map | Avoids conflicting code stewardship assignments | Missing confirmations must be resolved by the team |

---

## What could break?

### 1. Firebase Authentication

Google Sign-In or session behavior may fail if provider configuration or authorized domains are incorrect.

**Existing evidence:** Targeted Week 12 Google retests passed, with final release approval still separate.

### 2. Firestore Permission Errors

Firestore security rules may reject requests and prevent published events from loading.

**Existing evidence:** Manual permission-denied UI PASS; local rules restored successfully with HTTP 200.

### 3. Firestore Network Failure

Published events may fail to refresh during interrupted connectivity.

**Existing evidence:** Offline recovery, browser request-blocking recovery and automated error testing.

### 4. Retry and Terminal Error Handling

A terminal listener failure must end loading appropriately and provide recovery behavior.

**Existing evidence:** Automated 18 PASS, 0 FAIL across the full Firestore test suite. Separate manual terminal-error callback and Retry-button activation were not completed.

### 5. Search and Filter Refresh Behavior

Search/category selections currently reset after a browser refresh in the tested scenario.

**Existing evidence:** Search and filtering functionality PASS. Intended persistence requirement still needs owner confirmation.

### 6. External Map Provider

Google Maps may not provide every travel mode for every location.

**Existing evidence:** Trip Planner QA documented unavailable walking, driving and cycling routes for the tested Ulsan route.

### 7. Deployment and Final Handoff

Changes between the frozen candidate, QA worktree and deployed application can make verification evidence difficult to compare.

**Mitigation:** Record exact revisions, test environments, evidence links and limitations before final approval.

---

## Final Architecture and Handoff Summary

CampusVibes uses a React/Vite web interface connected to Firebase Authentication and Firestore for core account and published-event functionality.

The system also includes client-side event discovery, application-state handling, and optional RSVP and Trip Planner features.

Week 12 QA recorded:

- **Firestore automated testing:** 18 PASS, 0 FAIL.
- **Manual permission-denied UI:** PASS.
- **Original local Firestore rule restoration:** HTTP 200.
- **Search/category functionality:** PASS.
- **RSVP independent manual testing:** 12 PASS, 0 FAIL.
- **Event Trip Planner:** Verified within documented limitations.
- **Targeted Google Authentication retesting:** 6 PASS primary QA and 6 PASS independent QA.

**Remaining items:** Search/filter refresh requirement confirmation, formal disposition of incomplete manual terminal-error/Retry checks, and final team handoff approval.

**Final Status:** ARCHITECTURE DOCUMENTED — FINAL HANDOFF REVIEW PENDING.
