

<img width="3000" height="4000" alt="image" src="https://github.com/user-attachments/assets/1cc20710-9134-4cbd-b2dc-58c1ddc15254" />
Here is paste-ready wording for **Group 4’s Weekly Report**. Replace the bracketed parts with your actual evidence links.

## Group 4 — CampusVibes decisions

### Decision 1: Scope

We compared **CampusVibes** with **College Lost and Found** as a backup direction. We chose CampusVibes because it has a clear campus-specific user problem and can be demonstrated with a small, testable core. For the MVP, we will focus only on discovering campus events.

The MVP will include:

1. submitting or adding an event,
2. displaying a curated event list,
3. filtering or browsing events, and
4. viewing event details and contact information.

We will defer notifications, user accounts, attendance tracking, maps, recommendations, and automated scraping.

**Supporting evidence:** [link to comparison/investigation evidence]

### Decision 2: User flow

The selected user journey is:

> **Organizer submits an event → team reviews or curates it → student browses or filters events → student opens the event details page → student uses the provided contact information.**

This flow is small enough to demonstrate during the midterm and shows the main value of CampusVibes: helping students find relevant campus events in one place.

We compared two data-entry options:

- **Option A:** automated scraping from existing websites or social media;
- **Option B:** a manually curated event list or organizer-submitted event form.

We recommend **Option B** for the MVP. Manual curation and organizer submission give us more control over the accuracy and format of the event data. The tradeoff is that the event list may not update automatically and will require team or organizer effort.

**Supporting evidence:** [link to user-flow sketch or investigation evidence]

### Decision 3: Approach and major risk

We will use a curated or organizer-submitted data path instead of automated scraping. Automated scraping was considered, but it creates risks involving changing page structures, incomplete or outdated information, maintenance, and permission or terms-of-service issues. Therefore:

> **No automated scraping will be used in the MVP.**

For the first demonstration, we will use test events or organizer-submitted events with fields such as title, date, time, location, description, category, and contact information. We will manually review the data before displaying it.

The main tradeoff is reduced automation, but this approach allows us to prove the core user journey reliably within the project timeframe.

**Supporting evidence:** [link to scraping-risk investigation or small data-entry check]

### Team response

After reviewing the investigation results, the team agreed to keep **CampusVibes** as the main direction and to use manual curation or organizer submission for the first data path. We will not build scraping in the MVP. The team also agreed that the midterm demonstration should focus on one complete journey rather than a large number of features.

## Final MVP statement

> CampusVibes will help students discover campus events through a curated or organizer-submitted event list. The first demo will show event submission or curation, event browsing/filtering, and viewing event details with contact information. Automated scraping and additional features will be deferred until the core flow is validated.

Before submitting, make sure you add:
- one link for the scope decision,
- one link for the user-flow decision,
- one link for the scraping/data-path decision,
- two investigated options for each decision,
- a recommendation and tradeoff for each, and
- a teammate’s reasoned response.
