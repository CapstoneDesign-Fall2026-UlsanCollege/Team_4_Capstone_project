import { collection, deleteDoc, doc, limit, onSnapshot, query, serverTimestamp, where, writeBatch } from 'firebase/firestore';
import { account, db, feedError } from './shared-feed-store';
import { writeNotification } from './notification-write';

export function watchConnections(user, receive, fail) {
  return onSnapshot(query(collection(db, 'campusFeedConnections'), where('members', 'array-contains', account(user)), limit(100)), snapshot => {
    receive(snapshot.docs.map(item => ({ ...item.data(), id: item.id })));
  }, error => fail(feedError(error)));
}

export function requestFriend(user, recipientId) {
  const senderId = account(user);
  if (senderId === recipientId) throw new Error('Choose another person.');
  const reference = doc(db, 'campusFeedConnections', `${senderId}_${recipientId}`), batch = writeBatch(db);
  batch.set(reference, {
    senderId, recipientId, members: [senderId, recipientId], status: 'pending', createdAt: serverTimestamp(), updatedAt: serverTimestamp(),
  });
  writeNotification(batch, db, user, recipientId, { kind: 'friend-request', sourceId: reference.id });
  return batch.commit();
}

export function acceptFriend(user, connection) {
  if (connection.recipientId !== account(user)) throw new Error('Only the recipient can accept this invitation.');
  const batch = writeBatch(db);
  batch.update(doc(db, 'campusFeedConnections', connection.id), { status: 'accepted', updatedAt: serverTimestamp() });
  writeNotification(batch, db, user, connection.senderId, { kind: 'friend-accepted', sourceId: connection.id });
  return batch.commit();
}

export function removeConnection(user, connection) {
  if (!connection.members.includes(account(user))) throw new Error('This connection belongs to other people.');
  return deleteDoc(doc(db, 'campusFeedConnections', connection.id));
}
