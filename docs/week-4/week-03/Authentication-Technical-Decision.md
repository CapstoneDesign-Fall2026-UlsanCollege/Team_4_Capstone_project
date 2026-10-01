# Firebase Authentication Decision

**Team:** 4  
**Project:** CampusVibe  
**Week:** 4

## Purpose

This document records our technical decision for implementing
user login and sign-up in CampusVibe.

## Primary Choice

**Firebase Authentication**

We plan to use Firebase Authentication for student login and
user accounts because our project already uses React + Firebase.

## Authentication Decision Boundary

We will use the following decision boundary:

- If Firebase Authentication setup and basic login testing work,
  we will use Firebase Authentication for the project.
- If Firebase Authentication is blocked or cannot be connected
  reliably before the midterm checkpoint, we will temporarily use
  a mock login flow.
- The mock login flow will only be used as a temporary fallback
  for the demonstration. It is not the final authentication system.

## First Setup Check

The first technical check is to confirm that React can connect
to Firebase Authentication and support basic email/password login.

### Setup checklist

- [x] Create or confirm Firebase project
- [x] Connect Firebase to React
- [x] Enable Firebase Authentication
- [x] Enable Email/Password sign-in
- [x] Create a test account
- [x] Test login
- [x] Confirm successful login reaches the CampusVibe home page

## Success Condition

A test user can successfully create an account and log in,
and the application can redirect the user to the CampusVibe
home page.

## Fallback Plan

If Firebase Authentication cannot be connected reliably,
we will use a simple mock login flow temporarily so that the
main CampusVibe user journey can still be demonstrated.

The mock flow will not be treated as the final authentication
implementation.

## Evidence

**First setup check:** https://github.com/CapstoneDesign-Fall2026-UlsanCollege/Team_4_Capstone_project/issues/25 

**Screenshots / test evidence:** 

## Current Result

**Status:** In Progress

**Next Action:** Complete the Firebase Authentication setup
and record the test result in the linked GitHub Issue.

## Decision

Our preferred authentication solution is **Firebase Authentication**.
The mock login flow is only a fallback if the Firebase setup becomes
a blocker for the midterm demonstration.
