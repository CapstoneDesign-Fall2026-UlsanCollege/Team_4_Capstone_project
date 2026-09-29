## Authentication Technical Decision

### Primary choice
Firebase Authentication

### Why
CampusVibe requires student login and user accounts. Firebase Authentication
fits our React + Firebase stack and allows us to implement the login flow
without building a separate authentication backend.

### Decision boundary
- If Firebase Authentication setup and basic login testing work → use Firebase Authentication.
- If the setup is blocked or unreliable before the midterm checkpoint → use a temporary mock login flow.
- The mock flow is only a fallback for demonstration and is not the final authentication solution.

### First setup check
- [] Firebase project created
- [] Firebase connected to React
- [] Authentication enabled
- [] Email/Password provider checked
- [] Test login attempted
- [] Result recorded in GitHub

**Evidence:** [Link to Firebase Authentication setup Issue/PR]
