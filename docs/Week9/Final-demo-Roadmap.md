# Final Demo Roadmap

**Team:** 4  
**Project:** CampusVibes  
**Last updated:** 2026/10/31

Use this shared roadmap to connect what the project can prove now to the final demo and handoff. Each student should understand the next milestone and add their own contribution and evidence to the shared Weekly Report.

## Final demo promise

Our final demo will show:

> CampusVibes is a student-focused platform that helps university students discover campus events and activities, search and filter events, and view event details through a simple and accessible interface.

**Who it helps and what problem it addresses:**  
CampusVibes helps university students who have difficulty finding campus events, clubs, and activities because information may be scattered across different platforms or websites.

**What the evidence will prove:**  
The evidence will demonstrate that users can access the application, register or log in, navigate the dashboard, discover events, use search and filters, select an event, and view its basic details. Supporting features will be demonstrated only when their behavior has been verified.

**What the demo will not claim:**  
We will not claim that Firestore event loading is fully implemented and verified until testing is completed. We will not claim external push notifications, ticket purchasing, or advanced AI personalization beyond the current sample-data-based suggestions.

## Current state

**MVP progress:** Gap to close

**If a gap remains, link the Week 11 recovery path:**  
Week 11 will focus on verifying Firestore event loading, completing and testing Google sign-in and password reset, checking the main user journey, identifying critical issues, and deciding which features are ready for the final MVP.

| Status | Behavior, quality, or handoff item | Evidence link | What is still uncertain? |
|---|---|---|---|
| Working | Landing page and application navigation | [Deployed Website](https://campusvibe-theta.vercel.app/) | Final cross-device verification |
| Working | Registration, email/password login, logout, and persistent authentication using Firebase Authentication | [Authentication Issue #35](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/issues/35) | Complete verification of all authentication flows |
| Working | Dashboard and Discover/Events navigation | [Issue #64](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/issues/64) | Firestore event loading |
| Working | Events search and filters using sample data | [Issue #53](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/issues/53) | Behavior with larger or database-loaded event data |
| Working | Selecting an event and viewing basic details | [Issue #64](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/issues/64) | Additional edge-case testing |
| Partial | Google sign-in | [Authentication Issue #35](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/issues/35) | Complete configuration and successful end-to-end sign-in testing |
| Partial | Password reset | [Authentication Issue #35](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/issues/35) | Successful reset-email delivery and password-reset testing |
| Working | Saved Events and Profile supporting features | [Issue #53](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/issues/53) | Further regression testing |
| Working | Light/dark theme toggle | [Theme Toggle Evidence](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/blob/main/docs/Week7/Evidence/theme-toggle.md) | Final visual verification on different screens |
| Partial | AI Assistant and event suggestions | [Project Repository](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project) | Currently relies on sample event data |
| Not tested | Firestore event loading | Planned: Week 11 verification | Successful database loading and permissions |
| Partial | Documentation and setup handoff | README and setup guide in project repository | Another teammate must verify setup independently |

## Lessons that change our route

| Lesson | Source or evidence | What we will do differently |
|---|---|---|
| Course or team-process lesson | [Professor's midterm feedback](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/grades-and-feedback/blob/main/Week%208/feedback.md) and [Week 7 documention](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/tree/9670e9bd4c329c4cc31fead121dbb48e242fb9f3/docs/Week7) | Show actual results, provide evidence, and avoid claiming unfinished work as completed. |
| Project lesson from building, testing, or feedback | [Issues#53](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/issues/53), [Issue #64](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/issues/64) | Test the main user journey independently, identify limitations, and prioritize reliable features over adding unnecessary features. |
| Development lesson | Firebase integration and current sample-event implementation | Verify database functionality before presenting Firestore event loading as complete. |
| Teamwork lesson | [weekly reports](https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/blob/9670e9bd4c329c4cc31fead121dbb48e242fb9f3/docs/Week9/Weekly-Report.md) | Clearly document each student's own work, responsibilities, and evidence. |

## Roadmap milestones

| Week / date | Milestone result and check | Owner(s) | Evidence link or planned evidence | Dependency, risk, or fallback |
|---|---|---|---|---|
| 10 / Nov 5 — Code ownership and responsible AI audit | Review project code ownership, identify AI-assisted code, and document which parts were developed or modified by team members. | All team members | Planned: Code ownership report, GitHub commits, and AI-use documentation | Missing contribution records; review commit history and update documentation. |
| 11 / Nov 12 — MVP verification and feature-freeze decision | Test the complete main user journey, verify Firestore event loading, complete Google sign-in and password-reset testing, record bugs, and decide which features belong in the final MVP. | Prachi2061 (Firebase and authentication implementation, subject to confirmation); Ujjalpoudel75 (independent testing); DevyanaCT (user journey testing); all members (final decision) | Planned: Authentication test results, Firestore test checklist, screenshots, GitHub Issues, and MVP decision record | If Firestore cannot be verified, retain sample data and clearly document the limitation. If Google sign-in or password reset remains incomplete, do not include it as a verified demo feature. |
| 12 / Nov 19 — Peer QA, bug triage, and refactor | Have teammates independently test the application, prioritize critical bugs, and improve code quality without expanding project scope. | All team members; feature owners handle assigned fixes | Planned: Peer testing results, bug reports, and pull requests | Prioritize critical bugs and postpone optional improvements. |
| 13 / Nov 26 — Documentation, setup, and handoff proof | Complete project documentation and ask someone other than the documentation owner to follow the setup instructions independently. | Documentation owner and setup coordinator; another teammate as independent tester | Planned: README, installation guide, setup screenshots, and handoff checklist | Missing dependencies or setup instructions; update documentation after the trial. |
| 14 / Dec 3 — Final demo lock and contribution audit | Freeze the final demo flow, verify all presentation features, and review individual contributions. | All team members | Planned: Final demo script, screenshots, contribution records, and GitHub links | Remove unstable features from the demo rather than making unsupported claims. |
| 15 / Dec 10 — Hardening and final readiness | Perform final regression testing, fix critical issues, and verify the deployed application. No new major features. | All team members; feature owners fix assigned issues | Planned: Final test report, bug-fix evidence, and readiness checklist | Keep a fallback demo path if a feature fails. |
| 16 / Dec 17 — Final presentation and handoff | Present the completed application, explain its purpose and limitations, demonstrate the verified user journey, and hand over documentation. | All team members | Planned: Final presentation, demo evidence, repository, and handoff documentation | Use the frozen demo flow and explain any remaining limitations honestly. |

## Next one or two weeks

| Issue or action | Owner | Done when | Evidence path |
|---|---|---|---|
| Review code ownership and AI-assisted development | All team members | Each member's contribution and AI-assisted code are documented. | GitHub commits and Week 10 report |
| Verify Firestore event loading | Prachi2061 (implementation) and Ujjalpoudel75 (independent testing) | Events load successfully from Firestore or the limitation is documented. | Week 11 testing report and screenshots |
| Complete and test Google sign-in | Prachi2061 (implementation) and DevyanaCT (testing) | A user can successfully sign in using a Google account and access the application. | Planned: Authentication testing issue and screenshots |
| Complete and test password reset | Prachi2061 (implementation) and DevyanaCT (testing) | A user receives the reset email and successfully completes the password-reset process. | Planned: Authentication testing issue and screenshots |
| Test the main user journey | DevyanaCT (testing coordination), with all team members participating | Login → Dashboard → Discover → Search/Filter → Event Details is tested. | GitHub Issues and test screenshots |
| Review current MVP features | All team members | Working, partial, and unfinished features are clearly identified. | MVP verification checklist |
| Decide feature freeze | All team members | The team agrees on the features included in the final demo. | Week 11 decision record |

## Top risks

| Risk | Why it matters | Owner | Response or fallback | Review week |
|---|---|---|---|---|
| Firestore event loading remains unverified | The project may not demonstrate database-based event loading reliably. | Prachi2061 (implementation); Ujjalpoudel75 (testing) | Verify database integration or use clearly identified sample data. | Week 11 |
| Google sign-in and password reset remain incomplete | Users may not be able to use these authentication options successfully. | Prachi2061 (proposed implementation owner); DevyanaCT (testing) | Complete configuration and end-to-end testing. Keep verified email/password login as the fallback. | Week 11 |
| Authentication problems | Users may be unable to access the application. | Authentication owner and independent tester | Retest authentication and fix critical errors. | Week 11–12 |
| Bugs in supporting features | Unverified features could interrupt the final demonstration. | Respective feature owners; DevyanaCT coordinates testing | Keep supporting features optional and demonstrate only verified behavior. | Week 12–14 |
| Incomplete setup documentation | Another teammate may be unable to run the application independently. | Documentation owner; independent setup tester | Conduct a separate setup and handoff trial. | Week 13 |
| Last-minute changes | New changes could introduce bugs before the presentation. | All team members | Freeze the demo and focus on testing and stability. | Week 14–15 |
| Missing individual contribution evidence | The professor may not be able to identify each student's work. | All team members | Update individual contributions and evidence in the shared Weekly Report. | Every week |

## Progress check

- [ ] The route begins with current evidence, not assumptions.
- [ ] The final demo claim matches the evidence the team plans to produce.
- [ ] Each milestone has a check, owner, and evidence path.
- [ ] Week 11 includes MVP verification and a feature-freeze decision.
- [ ] Google sign-in and password reset are completed and tested or clearly documented as unfinished.
- [ ] Week 13 includes another person's handoff/setup trial.
- [ ] Week 14 locks the demo and contribution evidence.
- [ ] Week 15 is for readiness and hardening, not new scope.
- [ ] The shared Weekly Report records each student's own contribution and evidence.

Update this roadmap when new tests, feedback, or constraints change the best route. Keep old decisions understandable by linking the relevant Issue or evidence.
