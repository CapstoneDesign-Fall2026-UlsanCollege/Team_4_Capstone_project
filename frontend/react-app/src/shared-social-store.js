import { addDoc, collection, deleteDoc, doc, limit, onSnapshot, orderBy, query, serverTimestamp, setDoc } from 'firebase/firestore';
import { account, db, feedError } from './shared-feed-store';

export function watchReactions(user, postId, receive, fail) {
  account(user);
  return onSnapshot(query(collection(db, 'campusFeedPosts', postId, 'reactions'), limit(200)), snapshot => {
    receive(snapshot.docs.map(item => ({ ...item.data(), id: item.id })));
  }, error => fail(feedError(error)));
}

export function setReaction(user, postId, kind, active) {
  const uid = account(user);
  if (!['like', 'interested'].includes(kind)) throw new Error('Unknown reaction.');
  const reference = doc(db, 'campusFeedPosts', postId, 'reactions', `${uid}_${kind}`);
  return active ? setDoc(reference, { uid, kind, createdAt: serverTimestamp() }) : deleteDoc(reference);
}

export function watchComments(user, postId, receive, fail) {
  account(user);
  return onSnapshot(query(collection(db, 'campusFeedPosts', postId, 'comments'), orderBy('createdAt', 'desc'), limit(100)), snapshot => {
    receive(snapshot.docs.map(item => ({ ...item.data(), id: item.id })).reverse());
  }, error => fail(feedError(error)));
}

export function addComment(user, postId, text) {
  const body = String(text || '').trim();
  if (!body || body.length > 500) throw new Error('Write a comment of up to 500 characters.');
  return addDoc(collection(db, 'campusFeedPosts', postId, 'comments'), {
    uid: account(user), name: String(user.name || 'Student').slice(0, 120), body, createdAt: serverTimestamp(),
  });
}

export function deleteComment(user, postId, commentId) {
  account(user);
  return deleteDoc(doc(db, 'campusFeedPosts', postId, 'comments', commentId));
}
