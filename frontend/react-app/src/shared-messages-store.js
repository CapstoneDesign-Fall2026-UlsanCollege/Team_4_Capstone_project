import { addDoc, collection, deleteDoc, doc, getDocs, limit, onSnapshot, orderBy, query, serverTimestamp, setDoc, startAfter } from 'firebase/firestore';
import { account, db } from './shared-feed-store';

export function messageError(error) {
  if (error?.code === 'permission-denied') return 'This conversation is no longer available.';
  if (['unavailable', 'deadline-exceeded'].includes(error?.code)) return 'Messages could not connect. Check your connection and retry.';
  return error?.message || 'The message could not be sent. Please retry.';
}

const messageCollection = connectionId => collection(db, 'campusFeedConnections', connectionId, 'messages');
const convert = item => ({ ...item.data(), id: item.id, createdAt: item.data().createdAt?.toMillis() || null, pending: item.metadata.hasPendingWrites });

export function watchMessages(user, connectionId, receive, fail, pageSize = 50) {
  account(user);
  return onSnapshot(query(messageCollection(connectionId), orderBy('createdAt', 'desc'), limit(pageSize)), { includeMetadataChanges: true }, snapshot => {
    receive({ messages: snapshot.docs.map(convert).reverse(), cursor: snapshot.docs.at(-1), hasOlder: snapshot.size === pageSize, fromCache: snapshot.metadata.fromCache });
  }, error => fail(messageError(error)));
}

export async function loadOlderMessages(user, connectionId, cursor) {
  account(user);
  if (!cursor) return { messages: [], cursor: null, hasOlder: false };
  const snapshot = await getDocs(query(messageCollection(connectionId), orderBy('createdAt', 'desc'), startAfter(cursor), limit(50)));
  return { messages: snapshot.docs.map(convert).reverse(), cursor: snapshot.docs.at(-1), hasOlder: snapshot.size === 50 };
}

export function sendMessage(user, connectionId, text) {
  const body = String(text || '').trim();
  if (!body || body.length > 2000) throw new Error('Write a message of up to 2,000 characters.');
  return addDoc(messageCollection(connectionId), { senderId: account(user), body, createdAt: serverTimestamp() });
}

export function deleteMessage(user, connectionId, messageId) {
  account(user);
  return deleteDoc(doc(messageCollection(connectionId), messageId));
}

export function watchReadReceipt(user, connectionId, uid, receive, fail) {
  account(user);
  return onSnapshot(doc(db, 'campusFeedConnections', connectionId, 'reads', uid), snapshot => {
    receive(snapshot.data()?.readAt?.toMillis() || 0);
  }, error => fail(messageError(error)));
}

export function markConversationRead(user, connectionId) {
  return setDoc(doc(db, 'campusFeedConnections', connectionId, 'reads', account(user)), { readAt: serverTimestamp() });
}
