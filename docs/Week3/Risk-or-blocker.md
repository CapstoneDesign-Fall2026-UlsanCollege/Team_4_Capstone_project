---

* **name:** Risk or Blocker
* **about:** Record a project risk, blocker, or decision needed
* **title:** "Risk/Blocker: Event data availability"
* **labels:** risk, blocker
* **assignees:** "Team4"
-------------

## What is the risk or blocker?

We may have difficulty getting reliable and up-to-date event information from the university website or other external event sources.

## Why does it matter?

If event data is missing, outdated, or inconsistent, students may see incorrect information in the CampusVibes app.

Event data is important because the main midterm user path includes:

**Login → Home → Events / Clubs → Search & Filters → Event / Club Details**

If we cannot get reliable real event data, the Events / Clubs part of the user path may be difficult to demonstrate.

## What have we tried?

We checked the available university event pages and considered using manually added sample event data for the MVP.

## What decision or help do we need?

For the midterm MVP, we need to decide whether to use **manually created sample event data** instead of depending on an external event data source.

Using sample data would allow us to complete and test the main user path first. An external event data source can be considered later if reliable access is available.

## Owner

Team 4

## Next action

* [ ] Check available university event data sources
* [ ] Create 5–10 sample events for MVP testing
* [ ] Define the Firestore event document structure
* [ ] Decide whether external event data is necessary for the MVP
* [ ] Test search and filtering using the sample events

## Expected outcome

The Events / Clubs page should have enough consistent sample data to test:

**Events / Clubs → Search & Filters → Event / Club Details**

The team should not depend on an external event data source to demonstrate the basic midterm path.
