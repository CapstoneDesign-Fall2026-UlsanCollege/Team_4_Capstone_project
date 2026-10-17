import { collection, doc, limit, onSnapshot, query, runTransaction, serverTimestamp, setDoc } from 'firebase/firestore';
import { account, db, feedError } from './shared-feed-store';
import { auth } from './firebase';
import { publicMemberName } from './profile-photo';

export async function ensureFeedProfile(user) {
  const reference = doc(db, 'campusFeedProfiles', account(user));
  return runTransaction(db, async transaction => {
    const existing = await transaction.get(reference);
    account(user);
    const name = publicMemberName(auth.currentUser.displayName);
    if (!existing.exists() || existing.data().name !== name) transaction.set(reference, {
      name, college: existing.data()?.college || '', updatedAt: serverTimestamp(),
    });
  });
}

export function saveFeedProfile(user, college) {
  const campus = String(college || '').trim();
  if (campus.length > 100) throw new Error('College names must be 100 characters or fewer.');
  return setDoc(doc(db, 'campusFeedProfiles', account(user)), {
    name: publicMemberName(auth.currentUser.displayName),
    college: campus,
    updatedAt: serverTimestamp(),
  });
}

export function watchFeedProfiles(user, receive, fail) {
  account(user);
  return onSnapshot(query(collection(db, 'campusFeedProfiles'), limit(100)), snapshot => {
    receive(snapshot.docs.map(item => ({ ...item.data(), id: item.id })));
  }, error => fail(feedError(error)));
}

export function watchFeedProfile(user, uid, receive, fail) {
  account(user);
  return onSnapshot(doc(db, 'campusFeedProfiles', uid), snapshot => {
    receive(snapshot.exists() ? { ...snapshot.data(), id: snapshot.id } : null);
  }, error => fail(feedError(error)));
}
