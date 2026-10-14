import { collection, deleteDoc, doc, limit, onSnapshot, orderBy, query, serverTimestamp, setDoc } from 'firebase/firestore';
import { account, db, feedError } from './shared-feed-store';

export function watchSavedPosts(user, receive, fail) {
  return onSnapshot(query(collection(db, 'campusFeedProfiles', account(user), 'savedPosts'), orderBy('createdAt', 'desc'), limit(50)), snapshot => {
    receive(snapshot.docs.map(item => item.id));
  }, error => fail(feedError(error)));
}

export function setSavedPost(user, postId, active) {
  const reference = doc(db, 'campusFeedProfiles', account(user), 'savedPosts', postId);
  return active ? setDoc(reference, { createdAt: serverTimestamp() }) : deleteDoc(reference);
}

export function watchSavedPostContent(user, postId, receive, fail) {
  account(user);
  return onSnapshot(doc(db, 'campusFeedPosts', postId), snapshot => {
    receive(snapshot.exists() ? { ...snapshot.data(), id: snapshot.id, createdAt: snapshot.data().createdAt?.toMillis() || null } : null);
  }, error => fail(feedError(error)));
}
