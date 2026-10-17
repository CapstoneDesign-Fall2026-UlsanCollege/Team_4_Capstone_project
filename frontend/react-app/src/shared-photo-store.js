import { auth } from './firebase';
import { validFeedPhoto } from './feed-photo';

const uploaded = new WeakMap();

export async function photoRequest(user, body) {
  const current = auth.currentUser;
  if (!current || current.isAnonymous || current.uid !== user.id) throw new Error('Sign in to share photos.');
  const token = await current.getIdToken();
  if (auth.currentUser?.uid !== user.id) throw new Error('Your account changed. Sign in again before sharing.');
  let response;
  try {
    response = await fetch('/api/feed-photo', { method: 'POST', headers: { Authorization: `Bearer ${token}`, 'Content-Type': 'application/json' }, body: JSON.stringify(body), signal: AbortSignal.timeout(60000) });
  } catch { throw new Error('The photo request could not be confirmed. Check your connection and retry.'); }
  const data = await response.json().catch(() => ({}));
  if (!response.ok) throw new Error(data.error || 'Photo sharing is unavailable. Try again later.');
  if (auth.currentUser?.uid !== user.id) throw new Error('Your account changed. Sign in again before sharing.');
  return data;
}

export async function uploadFeedPhoto(user, media, postId) {
  const cached = uploaded.get(media);
  if (cached?.uid === user.id && cached.postId === postId) return cached.photo;
  const image = await new Promise((resolve, reject) => {
    const reader = new FileReader(); reader.onload = () => resolve(reader.result); reader.onerror = () => reject(new Error('The prepared photo could not be read.'));
    reader.readAsDataURL(media.blob);
  });
  const { photo } = await photoRequest(user, { action: 'upload', postId, image });
  if (!validFeedPhoto(photo, user.id, postId)) throw new Error('The photo service returned an invalid photo. Retry your post.');
  uploaded.set(media, { uid: user.id, postId, photo });
  return photo;
}

export function forgetFeedPhoto(media) { uploaded.delete(media); }
