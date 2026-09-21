# Tech Stack Comparison

**Team:** Team 4
**Week:** 3

Compare two possible stacks. Do not research everything. Prefer boring and buildable.

## Comparison Table

| Criteria                     | React + Firebase                                                                                 | HTML/CSS/JavaScript + Firebase                                                                          |
| ---------------------------- | ------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------------- |
| **Frontend**                 | React                                                                                            | HTML, CSS, JavaScript                                                                                   |
| **Backend / Services**       | Firebase                                                                                         | Firebase                                                                                                |
| **Data**                     | Firebase Firestore                                                                               | Firebase Firestore                                                                                      |
| **Authentication**           | Firebase Authentication                                                                          | Firebase Authentication                                                                                 |
| **Team's current knowledge** | Basic HTML, CSS, JavaScript, and Firebase                                                        | Basic HTML, CSS, JavaScript, and Firebase                                                               |
| **Learning required**        | React components, props, state, project structure, and Firebase integration                      | Larger JavaScript project organization and Firebase integration                                         |
| **Development speed**        | May be slower at the beginning while learning React                                              | Faster to start because the team already knows the basics                                               |
| **Code organization**        | Easier to organize a growing project using reusable components                                   | Can become harder to organize as the project grows                                                      |
| **Reusable components**      | Easy to create and reuse components                                                              | More difficult to reuse across different pages                                                          |
| **Project scalability**      | Suitable for adding more pages and features                                                      | Suitable for a smaller or simpler project                                                               |
| **Midterm demo**             | Login, Home, Events / Clubs, Search & Filters, and Event / Club Details using React and Firebase | Login, Home, Events / Clubs, basic search/filtering, and details using HTML/CSS/JavaScript and Firebase |
| **Main risk**                | Learning React and managing state/Firebase configuration                                         | Code can become harder to maintain as the project grows                                                 |
| **First feature**            | Landing/Home page with navigation and Firebase connection                                        | Basic HTML homepage with CSS, JavaScript, and Firebase                                                  |
| **Overall consideration**    | Better organization for a growing CampusVibes project                                            | Simpler starting point for the team                                                                     |

## Stack A

* **Stack name:** React + Firebase

* **What can we build with this?**

  We can build an interactive CampusVibes website with reusable React components, user interfaces, Firebase Authentication, and Firebase Firestore for storing and retrieving events, clubs, and related data.

* **What does the team already know?**

  The team knows basic HTML, CSS, JavaScript, and Firebase concepts.

* **What must we learn?**

  We need to learn React components, props, state management, React project structure, and how to connect React with Firebase.

* **How can we demo it by midterm?**

  We can demonstrate one complete user path:

  **Login → Home → Events / Clubs → Search & Filters → Select Event / Club → Event / Club Details**

  Firebase Authentication will handle login, while Firestore will provide the event and club data.

* **What could go wrong?**

  The team may need some time to learn React. Incorrect state management, component structure, or Firebase configuration could also cause development problems.

* **Simplest first screen or feature:**

  A landing page with navigation to the login and sign-up pages.

## Stack B

* **Stack name:** HTML/CSS/JavaScript + Firebase

* **What can we build with this?**

  We can build a functional CampusVibes website using standard HTML, CSS, and JavaScript, with Firebase Authentication and Firebase Firestore for user accounts and event/club data.

* **What does the team already know?**

  The team already has basic knowledge of HTML, CSS, JavaScript, and Firebase.

* **What must we learn?**

  We need to learn how to organize a larger JavaScript project, manage page navigation, and connect different pages and features with Firebase.

* **How can we demo it by midterm?**

  We can demonstrate the same basic user path:

  **Login → Home → Events / Clubs → Search & Filters → Select Event / Club → Event / Club Details**

  The pages would be implemented using HTML, CSS, and JavaScript, while Firebase would provide authentication and Firestore data.

* **What could go wrong?**

  As the project becomes larger, the JavaScript code may become harder to organize and maintain. Reusing the same UI elements across different pages can also be more difficult.

* **Simplest first screen or feature:**

  A basic HTML landing page with CSS styling and navigation to the login and sign-up pages.

## Decision

We choose:

> **React + Firebase**

Because:

> **React is suitable for managing CampusVibes as the project grows. Its reusable components can help us organize the code and develop the different pages more efficiently. Firebase provides backend services such as Firebase Authentication for login and Firebase Firestore for storing and retrieving events and club data. Although we need to learn React, we believe the stack is manageable and suitable for our project.**

## Midterm scope

To keep the project realistic, we will first focus on one complete working path:

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

The goal is to make this path work from beginning to end before adding additional features.

Future features such as personalized recommendations and advanced functionality will be considered after the main midterm path is working.

## Instructor approval / notes

* **Team discussed and agreed on React + Firebase.**
* **React will be used for the frontend.**
* **Firebase Authentication will be used for login and user accounts.**
* **Firebase Firestore will be used for event and club data.**
* **The team will focus on building one simple, complete working user path first.**
* **Additional features will be considered after the main midterm path is working.**
