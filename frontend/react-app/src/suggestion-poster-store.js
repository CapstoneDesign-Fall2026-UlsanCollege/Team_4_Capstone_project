import { doc, runTransaction, serverTimestamp } from 'firebase/firestore';
import { auth } from './firebase';
import { db } from './shared-feed-store';
import { photoRequest } from './shared-photo-store';
import { validSuggestionId, validSuggestionPoster } from './suggestion-poster';

function owner(user, suggestionId) {
  if (!auth.currentUser || auth.currentUser.isAnonymous || auth.currentUser.emailVerified !== true || auth.currentUser.uid !== user.id) throw new Error('Sign in to add a suggestion poster.');
  if (!validSuggestionId(suggestionId)) throw new Error('The suggestion draft is invalid.');
  if (!navigator.onLine) throw new Error('Reconnect before changing your poster. Your draft is safe.');
}
export async function uploadSuggestionPoster(user, media, suggestionId) {
  owner(user, suggestionId);
  if (!/^[A-Za-z0-9]{20}$/.test(media.id)) throw new Error('Choose your poster again.');
  const reference = doc(db, 'campusSuggestionPhotos', media.id);
  await runTransaction(db, async transaction => {
    const existing = await transaction.get(reference);
    if (existing.exists()) {
      const value = existing.data();
      if (value.uid !== user.id || value.suggestionId !== suggestionId || value.status !== 'active') throw new Error('Choose your poster again.');
    } else transaction.set(reference, { uid: user.id, suggestionId, status: 'active', createdAt: serverTimestamp() });
  });
  const image = await new Promise((resolve, reject) => {
    const reader = new FileReader(); reader.onload = () => resolve(reader.result); reader.onerror = () => reject(new Error('The poster could not be read.'));
    reader.readAsDataURL(media.blob);
  });
  const { photo } = await photoRequest(user, { action: 'upload', suggestionId, photoId: media.id, image }, '/api/suggestion-photo');
  if (!validSuggestionPoster(photo, suggestionId)) throw new Error('The poster service returned an invalid image. Please retry.');
  return photo;
}
export async function retireSuggestionPoster(user, poster, suggestionId) {
  owner(user, suggestionId);
  if (!/^[A-Za-z0-9]{20}$/.test(poster.id)) throw new Error('The poster is invalid.');
  return runTransaction(db, async transaction => {
    const reference = doc(db, 'campusSuggestionPhotos', poster.id), snapshot = await transaction.get(reference);
    if (!snapshot.exists()) return false;
    const value = snapshot.data();
    if (value.uid !== user.id || value.suggestionId !== suggestionId) throw new Error('This poster belongs to another draft.');
    if (value.status === 'active') transaction.update(reference, { status: 'discarded' });
    return true;
  });
}
export function discardSuggestionPoster(user, poster, suggestionId) {
  owner(user, suggestionId);
  return photoRequest(user, { action: 'discard', suggestionId, photoId: poster.id }, '/api/suggestion-photo');
}
