# Next Architecture and Setup Action

**Team:** 4
**Project:** CampusVibes
**Week:** 4

## Next Setup Action

Our next architecture/setup action is to create the basic React navigation structure for the first CampusVibes demo path.

The initial flow will be:

**Landing Page → Login → Student Dashboard → Core Feature**

We will first make sure these pages can be connected through simple navigation before implementing the full CampusVibes feature set.

## First Event/Club Data Path

The first event/club data path for CampusVibes is implemented as a mock JavaScript array in the frontend (`frontend/apps.js`). This serves as the initial demo dataset before Firebase/Firestore integration. Each event object contains the following fields: `id`, `title`, `interest` (category), `date`, `time`, `location`, `host`, `emoji`, `hue`, and `description`.

### Sample Fake Records (9 records)

```json
[
  {
    "id": 1,
    "title": "HackNight: Build-a-Thon",
    "interest": "Tech",
    "date": "2026-09-26",
    "time": "6:00 PM",
    "location": "Innovation Lab, Bldg 7",
    "host": "Code Collective",
    "description": "24 hours of building, pizza, and demo prizes."
  },
  {
    "id": 2,
    "title": "Open Mic & Poetry Night",
    "interest": "Music",
    "date": "2026-09-27",
    "time": "7:30 PM",
    "location": "Student Union Courtyard",
    "host": "Livewire Society",
    "description": "Sign up or just vibe. Acoustic slots open at 7."
  },
  {
    "id": 3,
    "title": "Mural Painting Workshop",
    "interest": "Arts",
    "date": "2026-09-29",
    "time": "3:00 PM",
    "location": "Arts Wing, Rm 204",
    "host": "Brush Strokes Club",
    "description": "Help paint the new community mural. All levels welcome."
  },
  {
    "id": 4,
    "title": "Intramural Basketball Finals",
    "interest": "Sports",
    "date": "2026-09-30",
    "time": "5:30 PM",
    "location": "Main Gymnasium",
    "host": "Campus Athletics",
    "description": "The championship game. Free entry, loud crowd."
  },
  {
    "id": 5,
    "title": "Freshers' Bonfire Social",
    "interest": "Social",
    "date": "2026-10-02",
    "time": "8:00 PM",
    "location": "Lakeside Lawn",
    "host": "Student Council",
    "description": "S'mores, music, and meeting your people."
  },
  {
    "id": 6,
    "title": "Research Skills Bootcamp",
    "interest": "Academics",
    "date": "2026-10-03",
    "time": "10:00 AM",
    "location": "Library Hall B",
    "host": "Grad Student Union",
    "description": "Citations, literature reviews, and avoiding panic."
  },
  {
    "id": 7,
    "title": "Indie Game Showcase",
    "interest": "Tech",
    "date": "2026-10-04",
    "time": "4:00 PM",
    "location": "Media Centre",
    "host": "Game Devs Guild",
    "description": "Play student-made games, vote for the audience award."
  },
  {
    "id": 8,
    "title": "Jazz Under the Stars",
    "interest": "Music",
    "date": "2026-10-05",
    "time": "7:00 PM",
    "location": "Botanical Garden",
    "host": "Campus Orchestra",
    "description": "An evening set with the quartet. Bring a blanket."
  },
  {
    "id": 9,
    "title": "Photowalk: Golden Hour",
    "interest": "Arts",
    "date": "2026-10-06",
    "time": "5:00 PM",
    "location": "Meet at Main Gate",
    "host": "Shutter Club",
    "description": "A guided walk shooting campus at golden hour."
  }
]
```

## Search and Filter Validation Plan

Search and filter functionality will be validated through the following test cases:

1. **Interest/Category Filter Test:**
   - User selects the "Tech" filter → Only HackNight (id:1) and Indie Game Showcase (id:7) are displayed
   - User selects the "Music" filter → Only Open Mic & Poetry Night (id:2) and Jazz Under the Stars (id:8) are displayed
   - User selects the "Arts" filter → Only Mural Painting Workshop (id:3) and Photowalk: Golden Hour (id:9) are displayed

2. **"All Events" Filter Test:**
   - User selects "All" → All 9 events are displayed regardless of interest category

3. **Empty State Test:**
   - If a future category filter has no matching events, the empty-state message is displayed

4. **Filter Persistence Test:**
   - After selecting a filter and navigating away, returning to the Discover page maintains the active filter state

The filter logic is implemented in the `renderEvents()` function, which accepts a filter parameter and returns only events where `event.interest === filter` (or all events if filter is "all").

## Setup Tasks

* [ ] Confirm the React project structure
* [ ] Create the Landing Page component
* [ ] Create the Login Page component
* [ ] Create the Student Dashboard component
* [ ] Add basic navigation between the pages
* [ ] Connect the login result to the Dashboard
* [ ] Test the complete navigation flow
* [ ] Verify event/club data path renders correctly
* [ ] Test all interest filters against sample data
* [ ] Test "All Events" view shows complete dataset

## Definition of Done

The Landing Page, Login Page, and Student Dashboard are created and connected. A user can move through the first demo path without needing the advanced CampusVibes features. The event/club data path is defined, sample records are loaded, and filter functionality is tested and working.

## Features Outside the First Demo Path

The following features will remain outside the first demo path:

* Advanced recommendations
* Real-time notifications
* RSVP functionality
* Advanced personalization
* Full organizer/admin features
* Advanced search and filtering
* Complex event and club management
* Advanced Firebase data integration

These features can be implemented after the basic navigation and core feature flow are working.

## Evidence

**Related authentication decision:** [Issue #25](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/issues/25)

**Architecture/setup evidence:** https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/issues/26

**Frontend mock data:** https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/blob/main/frontend/apps.js#L2-L39

## Current Status

**Status:** In Progress

**Next Action:** Implement the event/club data path validation and ensure all search/filter test cases pass in the frontend.
