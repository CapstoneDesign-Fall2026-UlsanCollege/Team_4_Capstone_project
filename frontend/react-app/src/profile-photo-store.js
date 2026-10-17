import { deleteDoc, doc, onSnapshot, serverTimestamp, setDoc } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { auth } from './firebase';
import { account, db } from './shared-feed-store';
import { validProfilePhoto } from './profile-photo';

const reference = uid => doc(db, 'campusProfilePhotos', uid);
export function photoError(error) {
  if (error?.code?.includes('permission-denied')) return 'Profile photo access is unavailable. Please retry after permissions are checked.';
  if (error?.code?.includes('resource-exhausted')) return 'The photo usage limit has been reached. Please try later.';
  return error?.message || 'Could not load your profile photo. Please retry.';
}

export function saveProfilePhoto(user, photo) {
  const uid = account(user);
  if (!navigator.onLine) throw new Error('Reconnect before changing your profile photo.');
  if (photo === '') return deleteDoc(reference(uid));
  if (!validProfilePhoto(photo)) throw new Error('Choose a valid profile thumbnail.');
  return setDoc(reference(uid), { photo, updatedAt: serverTimestamp() });
}

export function useProfilePhoto(uid, retry = 0) {
  const [result, setResult] = useState({ uid: '', photo: '', loading: true, error: '' });
  useEffect(() => {
    if (!uid || uid === 'demo' || !auth.currentUser || auth.currentUser.isAnonymous) return;
    let active = true;
    setResult({ uid, photo: '', loading: true, error: '' });
    const stop = onSnapshot(reference(uid), { includeMetadataChanges: true }, snapshot => {
      if (!active || snapshot.metadata.hasPendingWrites) return;
      const photo = snapshot.data()?.photo;
      setResult({ uid, photo: validProfilePhoto(photo) ? photo : '', loading: snapshot.metadata.fromCache, error: '' });
    }, error => { if (active) setResult({ uid, photo: '', loading: false, error: photoError(error) }); });
    return () => { active = false; stop(); };
  }, [uid, retry]);
  return result.uid === uid ? result : { photo: '', loading: !!uid && uid !== 'demo', error: '' };
}
