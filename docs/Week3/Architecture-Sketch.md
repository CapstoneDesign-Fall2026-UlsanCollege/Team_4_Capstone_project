# Architecture Sketch

**Team:** Team 4
**Project:** CampusVibes
**Last updated:** Week 3

## One-sentence architecture

This project uses:

**Frontend:** React
**Backend:** Firebase
**Data:** Firebase Firestore for events, clubs, activities, and student-related information
**Authentication:** Firebase Authentication
**External services:** Campus event data or APIs, if available

## Simple diagram

```text
                 Student
                    ↓
            CampusVibes Website
                    ↓
             React Frontend
                    ↓
       ┌────────────┴────────────┐
       ↓                         ↓
Firebase Authentication    Firebase Firestore
       ↓                         ↓
    Login/User              Events / Clubs
    Accounts                / Activities
                                  ↓
                         Search & Filters
                                  ↓
                         Recommendations
```

## Main parts

| Part             | What it does                                                                           | Owner  | Risk / uncertainty                                             |
| ---------------- | -------------------------------------------------------------------------------------- | ------ | -------------------------------------------------------------- |
| UI / Frontend    | Homepage, login, navigation, events, clubs, search, activities, and recommendations    | Team 4 | Making navigation simple and learning React components         |
| Authentication   | Handles student login and user accounts using Firebase Authentication                  | Team 4 | Firebase configuration and authentication errors               |
| Data             | Stores event, club, activity, and student-related information using Firebase Firestore | Team 4 | Getting accurate and updated campus data                       |
| Logic / Firebase | Handles data retrieval, search, filtering, and basic recommendation features           | Team 4 | Organizing Firebase data and implementing recommendation logic |
| Setup / Docs     | Project setup, GitHub, documentation, and architecture                                 | Team 4 | Keeping documentation updated during development               |

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
| Search and Filters      | Helps students quickly find relevant events, clubs, and activities                                      | Search results depend on accurate data                   |
| Recommendations         | Helps students discover activities based on their interests                                             | Recommendation logic may be difficult for the MVP        |

## What could break?

* Campus event or club data may not be available or updated regularly.
* Firebase connection or configuration could cause the website to stop retrieving data.
* The Firestore database structure may need to change as new features are added.
* The recommendation feature may be more difficult than expected.
* Login and student data need to be handled securely.
* The team may need additional time to learn React.
* Too many features could make the MVP difficult to complete on time.
* The project could become difficult to maintain if React components and Firebase data are not organized properly.

## MVP approach

For the first working prototype, we will focus on:

1. React homepage and navigation
2. Firebase Authentication
3. Firebase Firestore connection
4. Event and club data
5. Basic search and filtering
6. A simple recommendation feature

We will start with a simple working prototype and add more advanced features after the basic system is working.
