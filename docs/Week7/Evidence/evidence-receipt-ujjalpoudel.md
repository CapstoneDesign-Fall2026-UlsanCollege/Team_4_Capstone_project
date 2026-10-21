
# Individual Evidence Receipt — Ujjal Poudel

**Student:** Ujjal Poudel  
**GitHub username:** `ujjalpoudel75`  
**Team / Project:** Team 4 — CampusVibes  
**Week:** Week 7 (October 15–21, 2026)  
**Role:** Search Requirements, Student-Flow Testing, and Event-Submission Planning  
**Evidence reviewed:** October 21, 2026 (KST)

## 1. Introduction

This receipt records my own verifiable contributions to the CampusVibes project for Week 7 midterm preparation. My primary Week 7 evidence is the completed empty-search/no-events test (Issue #70). I also documented the requirements for Search Events and Clubs (Issue #13) and Events Organisation Dashboard and Event Submission (Issue #15). My earlier Events → Event Details test (Issue #49) is included as supporting evidence and is not presented as a new Week 7 test.

I distinguish **completed test evidence**, **issue planning/requirements**, and **features still under development**. I do not claim to have personally implemented other teammates' code or verified workflows that are still unfinished.

## 2. Receipt 1 — Empty Search / No-Events Test (Primary Week 7 Evidence)

**Issue:** #70 — Test Empty Search / No-Events State  
**Issue status:** Closed (October 18, 2026)  
**My contribution:** Created and took ownership of the test issue, documented the test steps, expected result, actual result, and proof checklist.

### What I tested

I checked how the deployed CampusVibes application responds when a student searches for an event that is not present in the sample event catalog.

**Test steps:**

1. Open the CampusVibes application.
2. Go to the Events / Discover section.
3. Enter a keyword that matches no sample event (for example, `xyz12345`).
4. Observe the displayed results and any errors.
5. Record the outcome and screenshot evidence in the issue.

**Expected result:** The application should indicate that there are no matching events rather than displaying incorrect results or failing.

**Actual recorded result — PASS:** The search completed without errors and indicated that no matching events were found. Issue #70 records the expected and actual outcome and has its screenshot-evidence checklist marked complete.

**What I learned:** Negative test cases are important for student-facing search. A clear no-results state helps users understand that the search worked but returned no match.

**Evidence URL:**  
https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/issues/70

**Limit:** This verifies the current search behavior with **code-based sample event data**, not Firestore event loading.

## 3. Receipt 2 — Search Events and Clubs Requirements

**Issue:** #13 — Search Events and Clubs  
**Issue status:** Closed (October 18, 2026)  
**My contribution:** Created the issue on September 17, 2026 and specified the student search requirements and expected flow.

### What I contributed

I described how a student should be able to find campus events and clubs using keywords. The issue defines a Search page and input field; search for events and clubs; matching-result display; no-results feedback; and opening the selected event or club detail page.

**Expected flow:** Student Home → Search → Enter Keyword → View Results → Select Event/Club → View Details.

### Evidence and outcome

Issue #13 is closed. My personal evidence for a specific working search case is the successful **empty-search/no-events** test in Issue #70. The closure of Issue #13 does not, by itself, show that I personally wrote the search implementation or independently tested every event-and-club requirement.

**What I learned:** Writing a clear user flow and Definition of Done helps the team implement and check features against the same expectations.

**Evidence URL:**  
https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/issues/13

## 4. Receipt 3 — Events Organisation Dashboard and Event Submission Planning

**Issue:** #15 — Events Organisation Dashboard and Event Submission  
**Issue status:** Open  
**My contribution:** Created the issue on September 17, 2026 and documented the planned organiser-facing workflow and acceptance requirements.

### What I contributed

I defined the intended workflow for organisers to submit event information to the team for review before an event is displayed to students. The issue covers an organiser dashboard, an event submission form, required-field validation, storing submitted event data, review and approval, publishing approved events, and opening approved event details.

**Planned flow:** Organisation Dashboard → Submit Event → Enter Event Information → Submit → Review → Approve → Student Event Listing.

### Current status and scope decision

The team has delivered a **partial Suggest/review workflow** through PR #78, but the complete organiser-dashboard path in Issue #15 remains open. In particular, approval does **not** automatically publish an event to Discover, and the final published-event acceptance checks remain unverified. That implementation and its verification were documented by another contributor; I am claiming my issue/requirements contribution, **not** authorship of that implementation.

**Decision: The full organisation dashboard and event-submission/publication workflow is a POST-MIDTERM EXTENSION, not part of the frozen midterm demo path.** It should be demonstrated as completed only after the full submission → approval → student listing → details flow is actually implemented and verified.

**What I learned:** Defining a feature does not mean it is complete. An open issue and incomplete acceptance checks need to be reported clearly rather than shown as a finished demo feature.

**Evidence URLs:**  
https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/issues/15  
https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/pull/78

## 5. Receipt 4 — Events → Event Details Test (Earlier Supporting Evidence)

**Issue:** #49 — Test Event → Event Details Behavior  
**My recorded test date:** October 8, 2026 (**before Week 7**)

I tested the existing Events flow, selected a sample event, and checked that its basic event details appeared.

- **Expected result:** The selected event's detail view opens and shows the event information.
- **Actual result — PASS:** I commented in Issue #49 that the Events flow worked as expected and displayed the selected sample event details correctly.
- **Attribution:** This is my own October 8 comment, not a new Week 7 retest. Later retesting by teammates is their work.

**Evidence URL:**  
https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/issues/49

## 6. Expected vs Actual Results and Contribution Summary

| Evidence item | Expected / intended outcome | Verified result or current status | My role |
| --- | --- | --- | --- |
| Issue #70 — Empty Search / No-Events | An unmatched query produces a clear no-results state | **PASS** — no-results feedback appeared without error; issue closed | My Week 7 test issue and recorded result |
| Issue #13 — Search Events and Clubs | Students can search events/clubs and navigate results | **Closed issue**; my independently documented search test is the Issue #70 no-results case | Requirements and user-flow definition |
| Issue #15 — Organisation Dashboard / Event Submission | Organisers submit; team reviews; approved events appear in Discover | **OPEN** — partial Suggest/review exists; automatic publication to Discover not complete | Requirements and post-midterm planning |
| Issue #49 — Events → Event Details | Selecting a sample event opens its basic details | **PASS** — my October 8 comment | Earlier supporting test, not new Week 7 work |

## 7. Frozen Midterm Demo Boundary and Risks

According to the team's Week 7 midterm preparation issue, the **frozen core demo** is:

**Landing Page → Email/Password Login → Dashboard → Discover/Events → Search/Filter → Select Event → Event Details.**

My Issue #70 evidence directly supports the **Search/Filter** part of this path. My Issue #49 comment is earlier supporting evidence for **Event Details**.

The **full organisation dashboard, event submission, review-to-publication flow (Issue #15)** is **outside the frozen path** and belongs to **post-midterm work**. The partial Suggest/review feature may be mentioned as supporting work only with its limits clearly stated; it must not be described as automatic publication of approved events.

**Known limitation:** Discover currently uses code-based sample event data. Firestore Events loading remains unverified, so my search and event-detail tests do not establish a live Firestore event catalog.

The team's final timed, narrated **3–5-minute rehearsal** and individual speaking assignments are still to be confirmed and recorded. I do not claim a completed personal timed rehearsal without its own evidence.

**Scope and limitation evidence:**  
https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/issues/74  
https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/issues/35

## 8. Evidence Links for the Week 7 Report

- **Issue #70 — My empty-search test:** https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/issues/70
- **Issue #13 — Search Events and Clubs requirements:** https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/issues/13
- **Issue #15 — Organisation Dashboard and Submission (open):** https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/issues/15
- **Issue #49 — My earlier Event Details comment:** https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/issues/49
- **Week 7 Weekly Report:** https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/blob/main/docs/Week7/Weekly-Report.md
- **Midterm Demo Scope (Issue #74):** https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/issues/74

## 9. Conclusion

My main documented Week 7 contribution was testing the empty-search/no-events case and recording its successful result in Issue #70. I also contributed the student search requirements in the closed Issue #13 and the organiser submission requirements in the still-open Issue #15. My October 8 Events → Event Details test in Issue #49 is earlier supporting evidence.

For the midterm, I will report the tested **student search flow** and its limitations accurately. The full **organisation/event-submission workflow remains a post-midterm extension** and will not be represented as part of the completed frozen demo.
