# Vertical Slice Plan

**Team:** Team 4
**Week:** Week 5 — Sprint 1
**Next demo date:** 10/08/2026

## Compare stacks and test the biggest risk

This is a comparison of possible technology stacks for CampusVibe. “Stack A” and “Stack B” are labels for our project options.

| **Question**                   | **Stack A: React + Firebase**                                                                                  | **Stack B: HTML/CSS/JavaScript + Firebase**                                                                                                     |
| ------------------------------ | -------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------- |
| **First slice it can support** | A landing page, login/signup, home page, and event details connected to Firebase with sample data              | A landing page, login/signup, home page, and event details connected to Firebase with sample data                                               |
| **Team's starting point**      | The team already has a React project and has connected Firebase to it                                          | The team has experience with basic HTML/CSS/JavaScript but would need to structure the project without React                                    |
| **Main uncertainty**           | How smoothly can we connect the existing React pages and Firebase features into one complete user flow?        | How much additional work will be needed to manage page navigation and reusable UI without React?                                                |
| **Smallest useful test**       | Build and test the Landing Page → Sign Up → Login → Home → Events → Event Details flow using sample event data | Build and test the same Landing Page → Sign Up → Login → Home → Events → Event Details flow without React and compare the implementation effort |
| **Example decision**           | **Use Stack A for the first slice because the React project is already set up and Firebase is connected.**     | Keep as a simpler alternative if the React setup becomes a blocker.                                                                             |

## The Goal

> By the next demo, a test student can create an account, log in, reach the Home page, open the Events page, select an event, and view the event details.

## User path and proof

| Step | User does                                  | System shows or does                                       | How we will check it                      |
| ---: | ------------------------------------------ | ---------------------------------------------------------- | ----------------------------------------- |
|    1 | Opens the Landing Page and selects Sign Up | Sign Up page is displayed                                  | Screenshot/demo of Landing Page → Sign Up |
|    2 | Creates a test student account             | Account is created and user can continue to Login          | Successful test account creation          |
|    3 | Enters login credentials                   | User is authenticated and redirected to Home               | Successful login screenshot/test          |
|    4 | Opens Events from Home                     | Events page displays 5–10 sample events                    | Screenshot/demo of Events page            |
|    5 | Selects an event                           | Event Details page displays the selected event information | Screenshot/demo of Events → Event Details |

## Scope boundary

* **Real in this slice:** Landing Page, Sign Up, Login, Home, Events page, Event selection, and Event Details navigation will be implemented as a working user path.
* **Simulated:** Events will use 5–10 sample events for Sprint 1 testing. Real university event data is not required.
* **Postponed:** Clubs full implementation, advanced recommendations, real university event API, RSVP/registration, notifications, and chat.
* **Small fallback:** If the full authentication flow is not ready, the team can demonstrate the shorter Events → Event Details path using sample event data and document the authentication blocker.

Do not describe simulated behavior as live, shared, or persistent. Do not use real personal data or secrets.

## Stack and supporting design

* **Stack status:** Confirmed — React + Firebase
* **Decision or approval note:** [Stack comparison](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/blob/main/docs/Week3/tech-stack-comparison.md)
* **Wireframe notes:** [Wireframe notes](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/blob/main/docs/Week3/wireframe-notes.md)
* **Design Doc v1:** [Design Doc v1](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/blob/237653ae40a13f7ec6890a6f766a0aac53796a95/docs/Week2/design-doc.md)
* **Architecture sketch:** [Architecture sketch](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/blob/main/docs/Week3/Architecture-Sketch.md)

## Shared preview or test path

* **Where a teammate can preview or run this slice:** Team GitHub repository — run the React project locally using the project setup instructions.
* **Setup or access the teammate needs:** Clone the repository, install dependencies, and use the team's Firebase configuration for the development project. Do not commit private keys or secrets.
* **If unresolved, blocker Issue, owner, and next action:** [Sprint 1 implementation Issue #33](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/issues/33)

## Work Issues

Create 3–5 small implementation Issues. Each needs a first owner, a checkable Definition of Done, and a link to the relevant design or evidence when useful.

| Issue link/title                                                                                                                      | First owner | Definition of Done / proof                                                                                                     |
| ------------------------------------------------------------------------------------------------------------------------------------- | ----------- | ------------------------------------------------------------------------------------------------------------------------------ |
| [Issue #33 — Sprint 1 Implementation Path](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/issues/33) | Team 4      | Sprint 1 path is documented and the implementation/evidence can be checked against the selected user flow.                     |
| Authentication — Sign Up and Login                                                                                                    | Prachi2061  | A test student can create an account and log in successfully. Screenshot or test note is attached as proof.                    |
| Home and Navigation                                                                                                                   | Team 4      | Successful login reaches Home and the user can navigate to Events. Screenshot/demo proves the navigation path.                 |
| Events and Event Details                                                                                                              | DevyanaCT   | 5–10 sample events are displayed and selecting an event opens its details page. Screenshot/demo proves Events → Event Details. |
| Sprint 1 Evidence                                                                                                                     | Team 4      | Screenshot, demo note, commit/PR, or blocker evidence is linked in the Weekly Report.                                          |

## Roles this week

* Setup/docs owner: Team 4
* First visible screen/feature owner: Team 4
* Evidence/Weekly Report owner: Team 4

## Risk and next action

| Risk or uncertainty                                           | Owner      | Next action                                                                           | Review date      |
| ------------------------------------------------------------- | ---------- | ------------------------------------------------------------------------------------- | ---------------- |
| Authentication or Firebase setup may delay the full user path | Prachi2061 | Test Sign Up → Login → Home and document any blocker immediately                      | Before next demo |
| Reliable real university event data may not be available      | Team 4     | Use 5–10 sample events for Sprint 1                                                   | Before next demo |
| Full path may not be completed by the checkpoint              | Team 4     | Demonstrate Events → Event Details as the fallback path and document the missing step | Before next demo |

## Weekly Report evidence

Link the team's single shared Weekly Report. Each student adds their own contribution sentence and evidence link there.

* **Weekly Report:** [Weekly Report](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/blob/cad4d4218b5dd59db970e0ce913ce884b9978527/docs/Week5/Weekly-report.md)
* **First visible proof / commit / PR / blocker Issue:** [Issue #35](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/issues/35))

## References

* [Vertical Slice Plan](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/blob/237653ae40a13f7ec6890a6f766a0aac53796a95/docs/Week3/Candidate-vertical-slice.md)
* [Wireframe notes](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/blob/main/docs/Week3/wireframe-notes.md)
* [Architecture sketch](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/blob/main/docs/Week3/Architecture-Sketch.md)
* [Stack comparison](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/blob/main/docs/Week3/tech-stack-comparison.md)
* [Design Doc v1](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/blob/237653ae40a13f7ec6890a6f766a0aac53796a95/docs/Week2/design-doc.md)
* [Sprint 1 Issue #33](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/issues/33)
