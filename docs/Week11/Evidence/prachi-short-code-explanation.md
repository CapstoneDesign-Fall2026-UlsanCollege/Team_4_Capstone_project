# Prachi - short source explanation

**Owner:** `prachi2061`. **Date:** November 18, 2026, Asia/Seoul.

1. **Upload the poster.** [`uploadSuggestionPoster`](../../../frontend/react-app/src/suggestion-poster-store.js) checks the signed-in owner, reserves the draft's image claim and calls the poster API. It returns validated image metadata; uploading an image does not create a public event.
2. **Send the suggestion.** [`submitSuggestion`](../../../frontend/react-app/src/suggestions-store.js) saves the suggestion with `status: 'pending'` and its ownership record in one batch. The suggestion waits for reviewer approval.
3. **Approve and publish.** An authorized reviewer uses [`publishSuggestion`](../../../frontend/react-app/src/published-events-store.js). Its transaction saves the approved decision and the event in `campusPublishedEvents`, which the shared catalogue can display in Discover and Event Details.

**If the upload fails:** [`SuggestionPoster`](../../../frontend/react-app/src/SuggestionPoster.jsx) shows the error and keeps the pending image available for retry or removal. The text draft remains. [`Suggestions.send`](../../../frontend/react-app/src/Suggestions.jsx) blocks sending while an image is uploading or still pending. A successful retry, or removal of the optional poster, lets the student continue. The failed upload is not reported as a submitted or published event.

**Why approval is required:** [Firestore rules](../../../backend/firebase/firestore.rules) enforce verified membership, image ownership and reviewer-only publication. A normal student's upload response cannot bypass the review queue.

This explains the existing suggestion/poster extension. Its [technical results and limits](prachi-candidate-runtime-2026-11-18.md) and [API/persistence handoff](../../Week10/Prachi-API-Persistence-Handoff.md) retain their own review records. This note adds no runtime result or team sign-off; the frozen core path and release-approval status are unchanged.
