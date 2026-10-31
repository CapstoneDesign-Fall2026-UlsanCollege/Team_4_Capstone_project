import { collection, deleteDoc, doc, getDoc, limit, onSnapshot, orderBy, query, serverTimestamp, writeBatch } from 'firebase/firestore';
import { account, db, feedError } from './shared-feed-store';
import { writeNotification } from './notification-write';

export function watchReactions(user, postId, receive, fail) {
  account(user);
  return onSnapshot(query(collection(db, 'campusFeedPosts', postId, 'reactions'), limit(200)), snapshot => {
    receive(snapshot.docs.map(item => ({ ...item.data(), id: item.id })));
  }, error => fail(feedError(error)));
}

export async function setReaction(user, postId, kind, active) {
  const uid = account(user);
  if (!['like', 'interested'].includes(kind)) throw new Error('Unknown reaction.');
  const reference = doc(db, 'campusFeedPosts', postId, 'reactions', `${uid}_${kind}`);
  if (!active) return deleteDoc(reference);
  const post = await getDoc(doc(db, 'campusFeedPosts', postId));
  account(user);
  const batch = writeBatch(db);
  batch.set(reference, { uid, kind, createdAt: serverTimestamp() });
  if (post.exists() && post.data().authorId !== uid) writeNotification(batch, db, user, post.data().authorId, { kind, parentId: postId, sourceId: reference.id });
  await batch.commit();
}

export function watchComments(user, postId, receive, fail) {
  account(user);
  return onSnapshot(query(collection(db, 'campusFeedPosts', postId, 'comments'), orderBy('createdAt', 'desc'), limit(100)), snapshot => {
    receive(snapshot.docs.map(item => ({ ...item.data(), id: item.id })).reverse());
  }, error => fail(feedError(error)));
}

export async function addComment(user, postId, text) {
  const body = String(text || '').trim();
  if (!body || body.length > 500) throw new Error('Write a comment of up to 500 characters.');
  const uid = account(user), post = await getDoc(doc(db, 'campusFeedPosts', postId));
  account(user);
  const reference = doc(collection(db, 'campusFeedPosts', postId, 'comments')), batch = writeBatch(db);
  batch.set(reference, {
    uid, name: String(user.name || 'Student').slice(0, 120), body, createdAt: serverTimestamp(),
  });
  if (post.exists() && post.data().authorId !== uid) writeNotification(batch, db, user, post.data().authorId, { kind: 'comment', parentId: postId, sourceId: reference.id });
  await batch.commit();
  return reference;
}

export function deleteComment(user, postId, commentId) {
  account(user);
  return deleteDoc(doc(db, 'campusFeedPosts', postId, 'comments', commentId));
}
