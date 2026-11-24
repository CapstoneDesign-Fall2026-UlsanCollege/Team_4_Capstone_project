## Week 12 — Google Authentication Evidence (Tulseyy)

**Tester:** `tulseyy8848`  
**Date:** November 23, 2026  
**Candidate:** `e5f1888aa4600ac2013d6bda34a55554ba68195f`  
**Evidence ownership:** Screenshots captured by `tulseyy8848`.

### G1 — Google Account Selection

![G1 Google Popup](https://github.com/user-attachments/assets/6d4accae-ffc8-4771-a50b-f176ce7a9f49)

![G1 Google Account Selection](https://github.com/user-attachments/assets/c39256b7-b8f2-4a5b-afa1-bdd4cbc4f774)

### G2 — Dashboard After Login

![G2 Dashboard](https://github.com/user-attachments/assets/c2b06f7b-9c22-4f0a-9099-5a9976c70498)

### G3 — Refresh Session

![G3 Refresh Session](https://github.com/user-attachments/assets/fb141520-9f66-49cf-99e8-225e0f9bb58d)

### G4 — Logout and Refresh

![G4 Logout Refresh](https://github.com/user-attachments/assets/88e8c144-80c1-4044-a391-5816dcfc28df)

### G5 — Google Re-login

![G5 Re-login Dashboard](https://github.com/user-attachments/assets/21393c6d-a707-406b-8c94-e1efd4a6daca)

### G6 — Cancel Popup and Retry

![G6 Cancel Recovery](https://github.com/user-attachments/assets/d76ebd99-fbdd-4163-a1b7-b6f7598c2950)

![G6 Cancel Retry](https://github.com/user-attachments/assets/959ee0ea-942f-43c8-bd9b-6feb13b76d4b)


---

## Week 12 — UI Regression Testing — Ujjal Poudel

**Tester:** `ujjalpoudel75`
**Date:** November 23, 2026

### Updated Discover Events
![Updated Discover](Evidence/W12-05-updated-discover.png)

### Event Filters
![Event Filters](Evidence/W12-06-updated-filters.png)

### Dashboard Search
![Dashboard Search](Evidence/W12-07-dashboard-search.png)

### Navigation
![Navigation](Evidence/W12-08-navigation.png)

### Mobile Navigation
![Mobile Navigation](Evidence/W12-09-mobile-navigation.png)

### Plan to go
![Plan to go](Evidence/W12-10-plan-to-go.png)

### Plan Persistence
![Plan Persistence](Evidence/W12-11-plan-persistence.png)

### Remove Plan
![Remove Plan](Evidence/W12-12-remove-plan.png)

---

## Week 12 — Navigation Icon Regression Testing (PR #202)

**Tester:** `ujjalpoudel75`
**Date:** November 23, 2026
**Website:** https://campusvibe-theta.vercel.app/

### Desktop Navigation
![Desktop Navigation](Evidence/W12-13-updated-header-icons.png)

### Mobile Navigation
![Mobile Navigation](Evidence/W12-14-mobile-header-icons.png)

### Result
- Desktop navigation icons and tooltips: PASS
- Navigation between pages: PASS
- Mobile navigation at 390 x 844: PASS
- No horizontal overflow observed: PASS

**Status:** Manual testing completed.

---

## Week 12 — Google Authentication Evidence (Ujjal)

**Tester:** `ujjalpoudel75`
**Date:** November 23, 2026
**Candidate:** `e5f1888aa4600ac2013d6bda34a55554ba68195f`

### G1 — Google Account Selection
![Google Popup](Evidence/W12-G6-google-popup-retry-ujjal.png)

**Observation:** Google account-selection popup opened successfully.

### G4 — Signed-Out Login Page
![Login Page](Evidence/W12-G4-logout-refresh-ujjal.png)

**Observation:** CampusVibes Login page displayed. Logout-and-refresh result documented separately in the manual QA report.

### Testing Summary

**G1-G6 Manual Testing:** 6 PASS, 0 reported FAIL.

These screenshots provide supporting visual evidence for selected authentication states. The complete test steps and results are recorded in Peer-Test-Notes.md and Issue #167.


