# Idea Selection Table

**Team:**  Team-4
**Week:** 2  

Use this to choose one project direction. Do not choose the biggest idea. Choose the idea your team can actually build and demo.

| Idea | Clear user? | Small MVP? | Demo by midterm? | Team interest? | Risk |
|---|---|---|---|---|---|
| CampusVibes | Yes | yes(with Manual Report) | Yes | High | risk of broken web scrapers or restricted API authentication walls. |
|  Lost and Found | Yes | Yes | Yes | Medium | Low risk; basic matching can safely rely on tags, categories, and human search |
|  CampusFood | Yes | No | No | Low | High data maintenance risk; out-of-date menu structures frustrate users. |
| MediMate | Yes | No | No | Low | High legal, privacy, and logistical liability regarding health translation. |
| ExpenseBUddy | Yes | Yes | Yes | Med | Low risk, but hard to differentiate from market giants like Splitwise. |

## Selected direction

We chose: Idea 1: CampusVibes

> This direction has the highest alignment with student interest. To bypass the engineering risk of broken web scrapers, our core focus will be a clean, centralized discovery platform using a simplified database where event coordinators, clubs, and student councils can easily publish their activities.

## Backup idea

Our backup idea is: Idea 2: College Lost and Found

> If data sourcing for campus events proves too fragmented early on, we will pivot to this reliable CRUD dashboard application. It allows students to map-tag, report, and filter misplaced items entirely through crowdsourced listings without relying on external system integration.

## Out of scope

We are **not** building:

- Complex web crawlers for all external social media sites: We will not build brittle automated scrapers to pull events from complex platforms like    Facebook or private Instagram feeds; data will rely on direct platform inputs or controlled, single-source calendars.
- Automated AI image-recognition or item-matching engines: (From Idea 2) We will not attempt to programmatically calculate whether two lost item       uploads are identical.
- On-call human translator dispatch networks: (From Idea 4) We will not build scheduling infrastructure or liability protection frameworks for live    medical translation environments.
