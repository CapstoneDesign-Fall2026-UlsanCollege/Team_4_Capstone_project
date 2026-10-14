# Feed Messages

The signed-in feed has a Messages inbox for private text conversations between
accepted friends. Messages, unread state, and read receipts persist in Firestore.
Guest demo mode does not send messages to real accounts.

## Behavior

- Select Messages in the feed navigation, then a friend from the inbox.
- Messages and replies arrive live; unread conversation badges clear when the conversation is opened in a visible tab.
- The sender sees Seen after the recipient's read receipt updates.
- Each conversation initially loads 50 messages. Earlier messages loads another page of 50.
- Loaded older messages also receive deletion updates. Only the sender can delete their message for both participants; messages cannot be edited.
- Drafts survive switching conversations within the mounted Messages view. Failed sends retain the draft; disconnected users cannot start a send.
- Desktop shows inbox and conversation side by side. Mobile shows one at a time with a Back to conversations button.

## Privacy and Data

Records live under `campusFeedConnections/{connectionId}/messages/{messageId}`.
Rules require an accepted friendship and membership in that connection for
every read and write. The sender UID and server timestamp are enforced; text
is limited to 2,000 characters. Receipts under `reads/{uid}` are writable only
by that participant. Pending friends, strangers, anonymous clients, and
signed-out clients are denied access.

Removing the friendship revokes server access. History remains stored rather
than being automatically erased; reconnecting using the same connection ID can
make it available again. Inbox previews use the accepted-connection window of
up to 100 connections. Preview, receipt, live-history, and loaded-history
subscriptions consume Firestore reads. There are no message attachments,
group chats, or push notifications in this implementation. Billing stays off.

## Verification - October 14, 2026

- All 12 emulator permission tests passed, including messaging impersonation, immutable fields, bounded private queries, receipt ownership, and access revocation.
- Two-account browser checks passed delivery/replies, unread/Seen state, reload persistence, sender deletion, 51-message pagination, and cross-account deletion updates for older history.
- Messaging layouts passed at 1536, 768, 390, and 320px without horizontal overflow. Screenshots were inspected: [desktop](feed-messages/messages-1536.png), [mobile](feed-messages/messages-390.png).
- The existing social browser workflow and all four Community Events smoke checks passed.
- Production builds passed with the existing large-bundle warning.

Screenshots use fictional emulator accounts and are automated evidence, not
independent teammate testing. Run `npm run test:feed-rules`, then
`npm run test:shared-feed` with the [local emulator setup](shared-feed.md#repeat-locally).
The messaging rules were compiled and deployed to the existing production
Firestore project after confirming its current rules matched the reviewed
social-feed base.
