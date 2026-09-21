# Candidate Vertical Slice — Week 3

**Team:** 4  
**Project:** CampusVibes  
**Last updated:** 2026-09-21

## Midterm demo sentence

By midterm, a user can browse campus events, search or filter by interest, and open one event to see its details.

## First feature to build and demo

The first feature is a simple campus-event discovery flow:

1. A user opens the CampusVibes home page.
2. The system loads a small set of campus events and clubs.
3. The user searches or filters the list.
4. The user opens one event or club to view more details.

This is the clear first feature for the midterm demo, and it should stay visible above the broader feature list instead of being buried inside the full CampusVibes roadmap.

## User path

1. The user logs in to CampusVibes and opens the home page.
2. The system loads available campus events and clubs from the backend/database.
3. The user can search and filter for activities that interest them.
4. The user opens one event or club to see more details.

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

## First three build issues

| Issue | Owner | Definition of Done |
|---|---|---|
| Create student login and home page | prachi | User can enter ID/email and password and successfully reach the home page |
| Create events and clubs pages | devyana | Events and clubs are displayed in a clear list and users can open an item |
| Add search and filtering | tulasha | User can search for an event/club and filter the displayed results |

## Biggest risk or uncertainty

Risk: We may not have enough reliable campus event and club data for the app.
Smallest test: Create a small sample dataset with 5–10 events and clubs and test whether the app can load, search, filter, and display the data correctly.
Owner: Data/API owner

## Evidence links

- Issue list: [Issue #5](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/issues/5), [Issue #8](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/issues/8), [Issue #9](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/issues/9), [Issue #20](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/issues/20)
- Wireframe: [Wireframe notes](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/blob/main/docs/Week3/wireframe-notes.md)
- Architecture sketch: [Architecture sketch](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/blob/main/docs/Week3/Architecture-Sketch.md)
- Stack comparison: [Stack comparison](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/blob/main/docs/Week3/tech-stack-comparison.md)

## Week 5 restart move

When this candidate becomes an implementation plan, the team will:

- break the path into build issues;
- confirm owners and Definitions of Done;
- name the shared preview or test path; and
- update the risk and bridge task.

