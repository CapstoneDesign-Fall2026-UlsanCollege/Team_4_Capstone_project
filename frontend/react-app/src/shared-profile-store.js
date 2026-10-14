import { collection, doc, getDoc, limit, onSnapshot, query, serverTimestamp, setDoc } from 'firebase/firestore';
import { account, db, feedError } from './shared-feed-store';

export async function ensureFeedProfile(user) {
  const reference = doc(db, 'campusFeedProfiles', account(user));
  const existing = await getDoc(reference);
  if (!existing.exists()) await saveFeedProfile(user, '');
}

export function saveFeedProfile(user, college) {
  const campus = String(college || '').trim();
  if (campus.length > 100) throw new Error('College names must be 100 characters or fewer.');
  return setDoc(doc(db, 'campusFeedProfiles', account(user)), {
    name: String(user.name || 'Student').trim().slice(0, 120) || 'Student',
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
