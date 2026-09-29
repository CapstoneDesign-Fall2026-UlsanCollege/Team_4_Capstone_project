# Week 4 Checkpoint: Chuseok Report

## Project direction

Our team plans to build a simple, user-focused website that demonstrates the main flow of our service. The first version will prioritize a clear user experience and a working navigation flow over advanced functionality.

## Rough sketch or planned screens

The initial website will include the following screens:

1. **Landing page**
   - Briefly explain the purpose of the service.
   - Introduce the main benefit for users.
   - Provide clear buttons for **Log in** and **Sign up**.
   -<img width="358" height="345" alt="image" src="https://github.com/user-attachments/assets/f3bc34c1-53e3-4f31-b088-1bdba1bc19d1" />



2. **Sign-up page**
   - Allow a new user to enter the information required to create an account.
   - Provide basic validation and clear error messages.
   - Direct the user to log in or continue to the dashboard after successful registration.
   - <img width="366" height="581" alt="image" src="https://github.com/user-attachments/assets/afdd7b8b-10c4-4abb-ba8b-7ff88966d29e" />


3. **Login page**
   - Allow an existing user to enter their credentials.
   - Display a helpful message when the credentials are invalid.
   - Redirect a successful login to the dashboard.
   - <img width="323" height="358" alt="image" src="https://github.com/user-attachments/assets/086ef416-7285-408c-b023-e450c167f1c2" />


4. **Home/dashboard page**
   - Welcome the logged-in user.
   - Display the main service features in a simple layout.
   - Provide navigation to the most important actions.
   - <img width="1267" height="715" alt="image" src="https://github.com/user-attachments/assets/46f28773-b69a-4650-9303-91f8f594c896" />


5. **Navigation and shared layout**
   - Keep navigation consistent across the main pages.
   - Make it possible to move between the landing page, authentication pages, and dashboard.
   - Include a logout action if authentication is implemented by the midterm.
   - <img width="1526" height="571" alt="image" src="https://github.com/user-attachments/assets/b825eba1-c7bb-4715-9a2f-e191a6f3a089" />


The detailed visual design may change as we learn more about the service, but these screens define the minimum user flow we intend to demonstrate.

## Intended user flow

The minimum successful flow is:

1. A visitor opens the landing page.
2. The visitor selects **Sign up** and creates an account.
3. The user logs in with the new account.
4. The user is redirected to the dashboard.
5. The user views and interacts with at least one core feature.
6. The user can return to the main navigation or log out.

If full backend authentication is not ready, we will prepare a clearly labeled prototype flow so that the page transitions and expected behavior can still be demonstrated.

## Midterm demo sentence

**Our midterm demo will show:** A basic working website where a visitor can learn about CampusVibes, create an account, log in, and access a dashboard where the student can view campus events and clubs and use basic search or filtering to find relevant activities. The demonstration will focus on the complete user journey, clear navigation, and the usability of the first core feature rather than advanced functionality.

## Minimum midterm requirements

To keep the scope realistic, the midterm version should provide:

- A functioning landing page.
- Login and sign-up screens with basic validation.
- Navigation between the main screens.
- A dashboard that is visible after login.
- At least one simple core feature or representative prototype interaction.
- Clear feedback for successful actions and common errors.
- A short explanation of which features are complete and which are planned for later.

## One blocker or question for Week 5

Our main question for Week 5 is how we should implement and connect the login and sign-up functionality. We need to decide whether to use a backend authentication service, our own backend API, or a temporary prototype implementation. We also need to select the first core feature to build after the basic user flow and confirm the data that feature will require.


## Week 5 priorities

1. Check or setup the technology and authentication approach.
2. Finalize the page structure and basic wireframes.
3. Assign ownership of the landing, authentication, dashboard, and core-feature work.
4. Start implementation by creating the landing page from the approved wireframe. The first implementation task will be to build the page layout, add the service description, and connect the Log in and Sign up buttons to their respective pages. After this works, the team will implement the shared navigation.
5. Define the success criteria for the first core feature.

## Optional: easiest first screen or interaction

The easiest first screen to implement is the landing page. It requires limited data and can establish the visual style, layout, and navigation for the rest of the website. It will include a short service description and buttons that direct users to the login and sign-up pages.
