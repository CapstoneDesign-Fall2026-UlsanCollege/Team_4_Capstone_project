import { doc, serverTimestamp } from 'firebase/firestore';
import { notificationKey } from './notifications-model.js';

export function writeNotification(writer, database, user, recipientId, source) {
  const reference = doc(database, 'campusAccountData', recipientId, 'notifications', notificationKey(source));
  writer.set(reference, {
    kind: source.kind, sourceId: source.sourceId, parentId: source.parentId || '',
    actorId: user.id, actorName: String(user.name || 'Campus member').trim().slice(0, 120) || 'Campus member',
    title: String(source.title || '').trim().slice(0, 140), createdAt: source.createdAt || serverTimestamp(),
  }, { merge: true });
  return reference;
}
