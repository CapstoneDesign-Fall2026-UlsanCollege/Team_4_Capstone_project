import { collection, deleteDoc, doc, limit, onSnapshot, query, serverTimestamp, setDoc, updateDoc, where } from 'firebase/firestore';
import { account, db, feedError } from './shared-feed-store';

export function watchConnections(user, receive, fail) {
  return onSnapshot(query(collection(db, 'campusFeedConnections'), where('members', 'array-contains', account(user)), limit(100)), snapshot => {
    receive(snapshot.docs.map(item => ({ ...item.data(), id: item.id })));
  }, error => fail(feedError(error)));
}

export function requestFriend(user, recipientId) {
  const senderId = account(user);
  if (senderId === recipientId) throw new Error('Choose another person.');
  return setDoc(doc(db, 'campusFeedConnections', `${senderId}_${recipientId}`), {
    senderId, recipientId, members: [senderId, recipientId], status: 'pending', createdAt: serverTimestamp(), updatedAt: serverTimestamp(),
  });
}

export function acceptFriend(user, connection) {
  if (connection.recipientId !== account(user)) throw new Error('Only the recipient can accept this invitation.');
  return updateDoc(doc(db, 'campusFeedConnections', connection.id), { status: 'accepted', updatedAt: serverTimestamp() });
}

export function removeConnection(user, connection) {
  if (!connection.members.includes(account(user))) throw new Error('This connection belongs to other people.');
  return deleteDoc(doc(db, 'campusFeedConnections', connection.id));
}
