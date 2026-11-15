import { collection, deleteDoc, doc, documentId, limit, onSnapshot, orderBy, query, serverTimestamp, startAfter, where, writeBatch } from 'firebase/firestore';
import { account, db, feedError } from './shared-feed-store';
import { writeNotification } from './notification-write';

export function watchConnections(user, receive, fail) {
  // Each query stays within the rules' 100-document limit. Watch subsequent
  // pages too, so large friend lists and their pending requests remain complete.
  const pages = [];
  let active = true;
  const stopAfter = index => pages.splice(index).forEach(page => page.stop?.());
  const watchPage = cursor => {
    const page = { docs: [], fromCache: true, boundary: undefined, stop: null };
    pages.push(page);
    page.stop = onSnapshot(query(collection(db, 'campusFeedConnections'), where('members', 'array-contains', account(user)), orderBy(documentId()), ...(cursor ? [startAfter(cursor)] : []), limit(100)), { includeMetadataChanges: true }, snapshot => {
      if (!active || !pages.includes(page)) return;
      page.docs = snapshot.docs;
      page.fromCache = snapshot.metadata.fromCache;
      const boundary = snapshot.size === 100 ? snapshot.docs.at(-1).id : null;
      if (boundary !== page.boundary) {
        stopAfter(pages.indexOf(page) + 1);
        page.boundary = boundary;
        if (boundary) watchPage(boundary);
      }
      const documents = new Map(pages.flatMap(value => value.docs).map(item => [item.id, { ...item.data(), id: item.id }]));
      receive([...documents.values()], { fromCache: pages.some(value => value.fromCache) });
    }, error => { if (active) fail(feedError(error)); });
  };
  watchPage();
  return () => { active = false; stopAfter(0); };
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
