import { collection, deleteDoc, doc, limit, onSnapshot, query, serverTimestamp, setDoc } from 'firebase/firestore';
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
