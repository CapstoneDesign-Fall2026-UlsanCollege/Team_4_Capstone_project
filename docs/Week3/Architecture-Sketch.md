# Architecture Sketch

**Team: 4  
**Project:Campus vibe  
**Last updated:**  

## One-sentence architecture

This project uses:

Frontend: Android/Kotlin + Jetpack Compose / Backend: REST API / Data: Database for events, clubs, and student activities / External services: Campus event data or APIs

## Simple diagram
Replace this with a sketch, image, Mermaid diagram, or plain text.

Student
   ↓
CampusVibes Android App
   ↓
Frontend / UI
   ↓
Backend / REST API
   ↓
Database
   ↓
Events / Clubs / Activities
   ↓
Recommendations



## Main parts

| Part | What it does | Owner | Risk / uncertainty |
|---|---|---|---|
| UI |Login, home page, events, clubs, search, activities, and recommendations  |  |Making navigation simple and easy to use |
| Data |Stores event, club, activity, and student-related information  |  |Getting accurate and updated campus data  |
| Logic/API |Handles login, event search, filtering, and recommendations  |  |API connection and recommendation logic may be difficult |
| Setup/docs |Project setup, GitHub, documentation, and architecture  |  |Keeping documentation updated with development  |

## Evidence links
Link the sketch, diagram, related Issue, or preview here.
- GitHub repository: [Your CampusVibes repository link]
- Project Issues: [Your GitHub Issues link]
- Architecture sketch: [Your sketch/diagram link]
- Project board: [Your project board link]

## Important decisions
| Decision | Why we chose it | Risk |
|---|---|---|
|Android + Kotlin  |Suitable for building a student mobile application  |Some team members may need time to learn Compose  |
|REST AP |Allows the app to communicate with the backend |API connection errors may occur |
|Database |Stores events, clubs, and student activity information |Database design may need changes later |
|Search and filters |Helps students quickly find relevant events and clubs |Search results need accurate data |
|Recommendations |Helps students discover activities based on their interests |Recommendation logic may be difficult for the MVP |

## What could break?
- Campus event or club data may not be available or updated regularly.
- API connection between the app and backend could fail.
- Database structure may need to change as new features are added.
- Recommendation features may be more difficult than expected.
- Login and user data need to be handled securely.
- Too many features could make the MVP difficult to complete on time.
 
  
