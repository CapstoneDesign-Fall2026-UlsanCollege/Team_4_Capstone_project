# Week 1 Submission: Team 4 Project Planning & Idea Evaluation

## ✅ Required Deliverables

### 1. Project Ideas Summary (5 Ideas Documented)

#### CampusVibes - Event Discovery Platform
- **User Problem:** Students struggle to discover campus events matching their interests
- **Coach Rating:** 2/4 (Creative value weak on features scope)
- **Action Items:**
  - ❌ **REMOVE:** Event scraping, personalization algorithm, RSVP history
  - ✅ **KEEP:** Hand-curated event list with one interest filter
  - 📌 **DEFER:** Recommendation engine as stretch goal
- **Concern:** Risk of over-engineering; must validate with manual data first

#### College Lost and Found - Item Recovery System
- **User Problem:** Lost items on campus take days/weeks to recover; no efficient discovery
- **Coach Rating:** 3/4 (Strong, contained candidate)
- **Action Items:**
  - ✅ **CORE:** Post lost/found item → filter → contact/report match workflow
  - 📌 **OPTIONAL:** Image matching, heat maps (stretch goals)
  - ✅ **TESTABLE:** One complete user journey with fictional data
- **Concern:** Low risk; clear scope boundaries

#### CampusFood - Dining Directory
- **User Problem:** Students need quick, affordable meal options near campus
- **Coach Rating:** 2/4 (Feasible but lacks distinctive angle)
- **Action Items:**
  - ✅ **REFRAME:** Add student-budget constraint OR campus-area geographic limit
  - ✅ **USE:** Fixed, pre-curated initial dataset (no real-time scraping)
  - ✅ **TESTABLE:** Budget-filtered menu search with set locations
- **Concern:** Risk of becoming generic directory; needs stronger differentiation

#### MediMate - Health Support Tool
- **User Problem:** International students need language support and reliable health info
- **Coach Rating:** 4/4 Creative Value BUT 1/4 Risk Recovery ⚠️
- **⚠️ CRITICAL PIVOT:** DO NOT build live patient-volunteer matching or handle health data
- **Action Items:**
  - ✅ **SAFE RESHAPE:** Multilingual visit-preparation + approved-phrase tool
  - ✅ **USE ONLY:** Fictional/test data (no real health information)
  - ✅ **TESTABLE:** Pre-visit checklist generation with phrase library
- **Concern:** High compliance/privacy/safety risk if done wrong; approved pivot required

#### ExpenseBuddy - Roommate Expense Splitter
- **User Problem:** Roommates struggle to track shared expenses and calculate fair splits
- **Coach Rating:** 3/4 (Clean, testable core)
- **Action Items:**
  - ✅ **CORE:** Add expense → select people → calculate balances
  - 📌 **DEFER:** Dashboards, analytics (not MVP)
  - ✅ **FOCUS:** One real roommate workflow scenario (not generic tool)
- **Concern:** Low-medium risk; clear scope if workflow stays focused

---

## 📋 Team Member Contributions

| Member Name | Comment 1 | Comment 2 | Preferred Idea | Concern/Feedback |
|---|---|---|---|---|
| Devyana (@DevyanaCT) | College Lost and Found has the clearest user journey and would be easiest to test with real feedback | The MVP scope is well-contained—we can build a working prototype in 8 weeks | College Lost and Found | Need to establish database schema early; image matching can wait |
| Tulsey (@tulseyy8848) | ExpenseBuddy is practical and solves a real problem many students face | The split calculation logic is straightforward; we could demo it quickly | ExpenseBuddy | Should focus on one roommate scenario first, not try to handle all edge cases |
| Ujjal Poudel (@ujjalpoudel75) | Lost and Found addresses a genuine pain point; I've seen many posts on campus about lost items | The contact/report workflow is testable without needing complex AI or real data | College Lost and Found | Risk is manageable if we keep image matching out of MVP; filtering by category is enough |
| Prachi (@prachi2061) | College Lost and Found aligns best with project timeline and team skillset distribution | ExpenseBuddy is our strong backup—it's predictable and lower technical risk | College Lost and Found | Recommend setting up GitHub Projects for sprint planning starting Week 2 |

---

## 🏆 Finalist Selection

### 🥇 Primary Direction: **College Lost and Found**
✅ **Why Selected:**
- Clearest, most testable core (post item → filter → contact/report)
- Strong team alignment (4/4 team members support or accept this choice)
- Contained MVP scope prevents feature creep
- Coach rating: 3/4 (highest among practical options)
- Low technical risk with clear success metrics
- Natural extension points for stretch goals (image matching, heat maps)

✅ **MVP Scope (Week 1-6):**
1. User authentication (basic)
2. Post lost/found item with description, location, category
3. Filter by category, date range, location area
4. Contact flow (message/email connection)
5. Mark item as resolved/recovered

✅ **Stretch Goals (Week 7-8):**
- Image matching algorithm
- Campus heat maps of lost item hotspots
- Push notifications for matches
- Advanced search (fuzzy text matching)

✅ **Risk Level:** Low  
✅ **Team Ownership:** Distributed across all 4 members

---

### 🥈 Backup Direction: **ExpenseBuddy**
✅ **Why Selected as Backup:**
- Dependable MVP: add expense → select payers → calculate balances
- Clear success metrics (users can verify splits are correct)
- Predictable timeline (backend logic is straightforward)
- Lower technical complexity than Lost & Found
- Coach rating: 3/4 (equally viable)
- Strong contingency if College Lost & Found encounters scope creep

✅ **MVP Scope:**
1. Create expense entry (amount, date, description)
2. Select who participated
3. Calculate per-person balance
4. View settlement summary
5. Mark as settled

✅ **Risk Level:** Low-Medium  
✅ **Why not primary:** Less unique than Lost & Found; more generic approach

---

## 🔒 Repository Settings

✅ **Status: PRIVATE** (Verified Sept 7, 2026)
- Course workspaces must NOT be public
- Repository is correctly configured as private

---

## 📎 Linked Resources

- **Team Members:** [TEAM_MEMBERS.md](./TEAM_MEMBERS.md)
- **Coaching Rubric Reference:** As provided by DJ Twone
- **Working Agreement:** [To be created Week 1]
- **Detailed Idea Documentation:** [To be created Week 1]

---

## 📅 Week 1 Completion Status

- [x] All 5 ideas documented with coaching feedback integrated
- [x] Each team member's two comments recorded
- [x] Preferred idea and concern captured for each member
- [x] Two finalist ideas selected and justified
- [x] Repository changed to private
- [x] Team members identified and documented
- [ ] Working agreement finalized and linked
- [ ] Detailed technical specifications for chosen idea
- [ ] Project timeline and milestone breakdown
- [x] Submission ready for review

---

## ⚠️ Critical Action Items (Week 1-2)

| Item | Owner | Deadline | Status |
|------|-------|----------|--------|
| Finalize working agreement | All | Sept 9 | Pending |
| Set up GitHub Projects board for sprint planning | Prachi | Sept 8 | Pending |
| Create detailed technical spec for College Lost & Found MVP | Devyana | Sept 10 | Pending |
| Design database schema | Ujjal | Sept 10 | Pending |
| Plan API endpoints and data models | Tulsey | Sept 10 | Pending |
| Set up development environment (repo branches, CI/CD) | Prachi | Sept 9 | Pending |
| First code commit for project skeleton | Team | Sept 12 | Pending |

---

## 📊 Team Consensus Summary

- **Finalist Agreement:** 4/4 team members aligned on College Lost and Found as primary
- **Backup Consensus:** 3/4 support ExpenseBuddy as fallback
- **Risk Appetite:** Team is conservative; chose lowest-risk, highest-clarity option
- **Timeline Confidence:** Moderate-to-high (all ideas are 8-week feasible)
- **Technical Readiness:** Good; team has distributed skills across backend, frontend, and database design

---

## 📝 Professor Notes

- All five ideas have been evaluated against the coaching rubric
- MediMate pivot confirmed (test data only, no live health data handling)
- CampusFood requires differentiation via budget constraint or geography
- CampusVibes would need strict commitment to manual curation (no scraping)
- Team ready to move forward with College Lost and Found as selected finalist

**Submission Status:** ✅ **READY FOR REVIEW**

---

**Last Updated:** September 7, 2026 at 16:15 UTC  
**Next Checkpoint:** Week 2 - Technical specification review
