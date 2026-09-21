# Architecture Sketch

**Team:** Team 4
**Project:** CampusVibes
**Last updated:** 9/21

## One-sentence architecture

This project uses:

> Frontend: React / Backend: Firebase / Data: Firebase Firestore / External services: Campus event data or APIs, if available

## Simple diagram

```text
Student
   ↓
CampusVibes Website
   ↓
React Frontend
   ↓
Firebase
   ├── Firebase Authentication
   │       ↓
   │   Login / User Accounts
   │
   └── Firebase Firestore
           ↓
      Events / Clubs
           ↓
    Search & Filters
           ↓
   Event / Club Details
```

## Main parts

| Part       | What it does                                                                                                                     | Owner  | Risk / uncertainty                                                         |
| ---------- | -------------------------------------------------------------------------------------------------------------------------------- | ------ | -------------------------------------------------------------------------- |
| UI         | Provides the landing page, login/sign-up pages, Home page, Events / Clubs page, search/filtering, and Event / Club Details pages | Prachi | Learning React and keeping navigation simple                               |
| Data       | Stores events, clubs, activities, and relevant user data using Firebase Firestore                                                | Devyana | Campus data may be incomplete or not regularly updated                     |
| Logic/API  | Handles authentication, retrieving event/club data, search, filtering, and displaying selected details using Firebase            | Tulasha | Firebase configuration and search/filter logic may require additional work |
| Setup/docs | Handles React/Firebase setup, GitHub, project documentation, and architecture updates                                            | Ujjal | Documentation may need to be updated as the project changes                |

## Evidence links

Link the sketch, diagram, related Issue, or preview here.

* GitHub repository: [https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project]
* Project Issues: [https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/issues]
* Architecture diagram:(https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/blob/8a91471375d473975a8bf911941b4a54d75a62ec/docs/Week3/Architecture-Sketch.md)
* Project board: [https://github.com/orgs/CapstoneDesign-Fall2026-UlsanCollege/projects/6]

## Important decisions

| Decision                  | Why we chose it                                                                                        | Risk                                                  |
| ------------------------- | ------------------------------------------------------------------------------------------------------ | ----------------------------------------------------- |
| React                     | React provides reusable components and helps organize the website as the project grows                 | Team members need to learn React                      |
| Firebase                  | Firebase provides authentication and backend services without requiring us to build a separate backend | Firebase configuration or connection errors may occur |
| Firestore                 | Firestore can store and retrieve event and club information for the website                            | The database structure may need to change later       |
| Firebase Authentication   | Provides a way for students to create accounts and log in                                              | Authentication must be configured correctly           |
| Search and Filters        | Allows students to find relevant events and clubs more easily                                          | Results depend on accurate and consistent data        |
| One complete midterm path | Keeps the midterm scope realistic and focuses development on one working user journey                  | Additional features may need to be postponed          |

## What could break?

* Firebase Authentication may not connect correctly with the React frontend.
* Firestore data may be incomplete, outdated, or incorrectly structured.
* Search and filtering may not work correctly with inconsistent data.
* The selected event or club may not load the correct details.
* React components or navigation may become difficult to manage as the project grows.
* The team may need additional time to learn React and Firebase.
* Adding too many features could prevent the team from completing the main midterm path on time.
