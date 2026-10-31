import { collection, doc, limit, onSnapshot, orderBy, query, runTransaction, writeBatch } from 'firebase/firestore';
import { account, db } from './shared-feed-store';
import { cleanNotification, notificationKey, NOTIFICATION_LIMIT } from './notifications-model.js';
import { writeNotification } from './notification-write.js';

export function notificationError(error) {
  if (error?.code === 'permission-denied') return 'Notifications are unavailable for this account. Please retry.';
  if (['unavailable','deadline-exceeded'].includes(error?.code)) return 'Notifications could not connect. Check your connection and retry.';
  return error?.message || 'Notifications could not be updated. Please retry.';
}

export function watchNotifications(user, receive, fail) {
  const uid = account(user);
  return onSnapshot(query(collection(db, 'campusAccountData', uid, 'notifications'), orderBy('createdAt', 'desc'), limit(NOTIFICATION_LIMIT)), { includeMetadataChanges: true }, snapshot => {
    receive(snapshot.docs.flatMap(item => {
      const data = item.data(), value = cleanNotification({ ...data, id: item.id });
      return value ? [{ ...value, stamp: data.createdAt }] : [];
    }), { fromCache: snapshot.metadata.fromCache });
  }, error => fail(notificationError(error)));
}

export async function markNotificationsRead(user, items) {
  const uid = account(user);
  if (!navigator.onLine) throw new Error('Reconnect before marking notifications as read.');
  const batch = writeBatch(db);
  for (const item of items.slice(0, NOTIFICATION_LIMIT)) {
    if (!item.stamp) continue;
    batch.update(doc(db, 'campusAccountData', uid, 'notifications', item.id), { readAt: item.stamp });
  }
  await batch.commit();
}

export async function ensureSuggestionNotification(user, item) {
  const uid = account(user);
  if (!['approved','declined'].includes(item.status) || !item.reviewedAt) return;
  const source = { kind: `suggestion-${item.status}`, sourceId: item.id, parentId: 'suggestion', title: item.name, createdAt: item.reviewedAt };
  const reference = doc(db, 'campusAccountData', uid, 'notifications', notificationKey(source));
  // Authors create their own review receipt; reviewers never need private ownership IDs.
  await runTransaction(db, async transaction => {
    if (!(await transaction.get(reference)).exists()) writeNotification(transaction, db, user, uid, source);
  });
}
