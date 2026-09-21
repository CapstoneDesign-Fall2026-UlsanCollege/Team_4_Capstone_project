# Architecture Sketch

**Team:** Team 4
**Project:** CampusVibes
**Last updated:** Week 3

## One-sentence architecture

This project uses:

**Frontend:** React
**Backend:** Firebase
**Data:** Firebase Firestore for events, clubs, and student activities
**Authentication:** Firebase Authentication
**External services:** Campus event data or APIs, if available

## Simple diagram in plain text

```text
Student
   |
   v
CampusVibes Website
   |
   v
React Frontend
   |
   +-----------------------+
   |                       |
   v                       v
Firebase Authentication   Firebase Firestore
   |                       |
   v                       v
Login/User Accounts       Events / Clubs
                           |
                           v
                    Search & Filters
                           |
                           v
                    Event / Club Details
```

## Midterm User Path

```text
Login
  ↓
Home Page
  ↓
Events / Clubs
  ↓
Search & Filters
  ↓
Select Event / Club
  ↓
Event / Club Details
```

This is the main path we will demonstrate at midterm.

## Main parts

| Part             | What it does                                                                           | Owner  | Risk / uncertainty                                            |
| ---------------- | -------------------------------------------------------------------------------------- | ------ | ------------------------------------------------------------- |
| UI / Frontend    | Homepage, login, navigation, events, clubs, search, and details pages                  | Team 4 | Making navigation simple and learning React components        |
| Authentication   | Handles student login and user accounts using Firebase Authentication                  | Team 4 | Firebase configuration and authentication errors              |
| Data             | Stores event, club, activity, and student-related information using Firebase Firestore | Team 4 | Getting accurate and updated campus data                      |
| Logic / Firebase | Handles data retrieval, search, filtering, and displaying event/club details           | Team 4 | Organizing Firebase data and implementing search/filter logic |
| Setup / Docs     | Project setup, GitHub, documentation, and architecture                                 | Team 4 | Keeping documentation updated during development              |

## Evidence links

Link the repository, issues, diagram, or project board here.

* GitHub repository: [Your CampusVibes repository link]
* Project Issues: [Your GitHub Issues link]
* Architecture sketch: [Your sketch/diagram link]
* Project board: [Your project board link]

## Important decisions

| Decision                | Why we chose it                                                                                         | Risk                                                     |
| ----------------------- | ------------------------------------------------------------------------------------------------------- | -------------------------------------------------------- |
| React                   | React provides reusable components and makes it easier to organize the project as it grows              | Team members need to learn React                         |
| Firebase                | Firebase provides database and authentication services without requiring us to build a separate backend | Firebase configuration or connection errors may occur    |
| Firestore Database      | Firestore can store events, clubs, activities, and user-related information                             | Database structure may need changes later                |
| Firebase Authentication | Provides a simple way to manage student login and user accounts                                         | Authentication must be configured correctly and securely |
| Search and Filters      | Helps students quickly find relevant events and clubs                                                   | Search results depend on accurate data                   |
| Event / Club Details    | Allows students to view complete information after selecting an event or club                           | Details must be connected correctly to the selected item |

## What could break?

* Campus event or club data may not be available or updated regularly.
* Firebase connection or configuration could cause the website to stop retrieving data.
* The Firestore database structure may need to change as new features are added.
* Search and filtering may not work correctly with incomplete or inconsistent data.
* Login and student data need to be handled securely.
* The team may need additional time to learn React.
* Too many features could make the MVP difficult to complete on time.
* The project could become difficult to maintain if React components and Firebase data are not organized properly.

## MVP approach

For the first working prototype, we will focus on **one complete user path**:

1. Student logs in using Firebase Authentication.
2. Student opens the CampusVibes home page.
3. Student views available events and clubs.
4. Student searches or filters events and clubs.
5. Student selects an event or club.
6. Student views the event or club details.

We will first make this path work from beginning to end before adding additional features.

**Future features**, such as personalized recommendations, can be added after the main midterm path is working.
