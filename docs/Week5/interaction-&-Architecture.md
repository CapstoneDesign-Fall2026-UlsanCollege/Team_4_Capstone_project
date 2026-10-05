## Sketch the interaction and architecture

### Wireframe notes

| **Screen / interaction** | **What the user needs**                               | **First version**                                                                                                |
| ------------------------ | ----------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------- |
| Landing Page             | How can the student enter the CampusVibe app?         | Simple landing page with CampusVibe introduction and Sign Up / Login actions.                                    |
| Sign Up / Login          | Can the student create an account and access the app? | Email/password Sign Up and Login connected to Firebase Authentication, with basic validation and error messages. |
| Home Page                | Where can the student find the main features?         | Welcome message with navigation to Events and other main sections.                                               |
| Events Page              | What events are available?                            | 5–10 sample event cards with title, date, location, and category.                                                |
| Event Details            | Can the student see more information about an event?  | Selected event displays title, date/time, location, category, description, and organizer/contact information.    |

**Rough text sketch:**

```text
CampusVibe Landing Page

[ CampusVibe ]
Find events and activities around campus.

[ Sign Up ]    [ Log In ]


After Login:

Welcome to CampusVibe!

[ Events ]    [ Clubs ]


Events:

[ Event 1 ]
Date: Oct 10
Location: Campus Hall
[ View Details ]

[ Event 2 ]
Date: Oct 12
Location: Student Center
[ View Details ]

[ Event 3 ]
Date: Oct 15
Location: Main Building
[ View Details ]


After selecting an event:

Event Details
-------------------------
Title: Campus Festival
Date: Oct 10
Time: 2:00 PM
Location: Campus Hall
Category: Festival

Description:
Sample event description.

Organizer: Student Council
Contact: sample contact

[ Back to Events ]
```

### Architecture sketch

```text
                         Student
                            |
                            v
                    CampusVibe Website
                            |
                            v
                     React Frontend
                            |
             +--------------+--------------+
             |                             |
             v                             v
   Firebase Authentication        Firebase Firestore
             |                             |
             v                             v
      Sign Up / Login              Sample Events
             |                             |
             +--------------+--------------+
                            |
                            v
                       Home Page
                            |
                            v
                      Events Page
                            |
                            v
                    Search / Filters
                            |
                            v
                    Event Selection
                            |
                            v
                    Event Details
```

| **Part**       | **Responsibility**                                                         | **Example owner** | **Main uncertainty**                                                                               |
| -------------- | -------------------------------------------------------------------------- | ----------------- | -------------------------------------------------------------------------------------------------- |
| UI             | Shows Landing Page, Sign Up/Login, Home, Events, and Event Details screens | Team 4            | Are the screens and navigation clear for a first-time student?                                     |
| Authentication | Handles student Sign Up and Login using Firebase Authentication            | Prachi2061        | Does the authentication flow connect correctly to the Home page?                                   |
| Navigation     | Connects Landing Page → Sign Up/Login → Home → Events → Event Details      | Team 4            | Does each step lead to the correct screen without breaking the user flow?                          |
| Event data     | Provides 5–10 fictional/sample event records for Sprint 1                  | DevyanaCT         | Does each sample event contain all the information needed by the Events and Event Details screens? |
| Event details  | Displays information for the event selected by the user                    | DevyanaCT         | Does selecting an event correctly display the corresponding event information?                     |
| Setup/docs     | Helps teammates run the React + Firebase project and find the evidence     | Team 4            | Can teammates follow the setup instructions and reproduce the demonstrated slice?                  |

## References
* [Sprint1-Verticle Slice Plan](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/blob/86d48da6d954660667f5769719f1596ccf637e89/docs/Week5/Sprint1-Verticle-Slice.md)
* [Candidate Vertical Slice Plan](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/blob/237653ae40a13f7ec6890a6f766a0aac53796a95/docs/Week3/Candidate-vertical-slice.md)
* [Wireframe notes](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/blob/main/docs/Week3/wireframe-notes.md)
* [Architecture sketch](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/blob/main/docs/Week3/Architecture-Sketch.md)
* [Stack comparison](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/blob/main/docs/Week3/tech-stack-comparison.md)
* [Design Doc v1](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/blob/237653ae40a13f7ec6890a6f766a0aac53796a95/docs/Week2/design-doc.md)
* [Sprint 1 Issue #33](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/issues/33)
