# Candidate Vertical Slice — Week 3

**Team:4  
**Project:Campus vibe 
**Last updated:**  

## Midterm demo sentence

By midterm, a user can log in, view campus events and clubs, search for activities, and open an event or club to see more details.

## User path

1. The user logs into CampusVibes and opens the home page.
2. The system loads available campus events and clubs from the backend/database.
3. The user can see or do search, filter, and view details about events and clubs that interest them.
## In scope for this slice

- Student login and home page
- Display campus events and clubs
- Search and filter events/clubs
- Event and club detail page 

## Out of scope for this slice

- Advanced AI-based recommendations
- Event registration or ticket purchasing
- Push notifications
- Chat between students
- Complex personalized recommendation algorithms 

## First three build Issues

| Issue | Owner | Definition of Done |
|---|---|---|
| Create student login and home page | prachi | User can enter ID/email and password and successfully reach the home page |
|Create Events and Clubs pages  | devyana | Events and clubs are displayed in a clear list and users can open an item |
|Add search and filtering  | tulasa |User can search for an event/club and filter the displayed results  |

## Biggest risk or uncertainty

What could prevent this path from working, and what is the smallest test that would reduce the uncertainty?

Risk: We may not have enough reliable campus event and club data for the app.
Smallest test: Create a small sample dataset with 5–10 events and clubs and test whether the app can load, search, filter, and display the data correctly.
Owner: Data/API owner 

## Evidence links

- Issue list: https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/issues/11, https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/issues/16
- Wireframe: https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/blob/77b05cfac3a0d47327e5c0ab4349fb67065e1435/docs/Week3/wireframe-notes.md
- Architecture sketch: https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/blob/77b05cfac3a0d47327e5c0ab4349fb67065e1435/docs/Week3/Architecture-Sketch.md
- Stack comparison: https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/blob/77b05cfac3a0d47327e5c0ab4349fb67065e1435/docs/Week3/tech-stack-comparison.md

## Week 5 restart move

When this candidate becomes an implementation plan, the team will:

- break the path into build Issues;
- confirm owners and Definitions of Done;
- name the shared preview or test path; and
- update the risk and bridge task.
