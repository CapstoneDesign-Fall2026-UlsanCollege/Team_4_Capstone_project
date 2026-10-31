import { collection, doc, getDocFromServer, limit, onSnapshot, orderBy, query, serverTimestamp, updateDoc, where, writeBatch } from 'firebase/firestore';
import { auth } from './firebase';
import { db } from './shared-feed-store';
import { writeNotification } from './notification-write';

export const SUGGESTION_CATEGORIES = ['All', 'Tech', 'Arts', 'Music', 'Sports', 'Social', 'Academics'];

function uidFor(user) {
  if (!auth.currentUser || auth.currentUser.isAnonymous || auth.currentUser.uid !== user.id) throw new Error('Sign in to send an event suggestion. Your draft stays in this browser.');
  return user.id;
}

export function suggestionError(error) {
  if (error?.code === 'permission-denied') return 'Suggestion access is unavailable. Your draft has not been cleared.';
  if (error?.code === 'unavailable') return 'Cannot reach the review queue. Check your connection and retry.';
  return error?.message || 'Could not complete this request. Please retry.';
}

export function validateSuggestion(value, name) {
  const result = Object.fromEntries(['name','host','date','location','description'].map(key => [key, String(value[key] || '').trim()]));
  result.anonymous = value.anonymous === true;
  result.category = SUGGESTION_CATEGORIES.includes(value.category) ? value.category : 'All';
  result.authorName = result.anonymous ? '' : String(name || 'Student').trim().slice(0, 120);
  if (result.anonymous) result.host = '';
  if (!result.name || result.name.length > 100 || (!result.anonymous && !result.host) || result.host.length > 100) throw new Error('Add an event name and host of up to 100 characters.');
  if (!result.description || result.description.length > 500 || result.location.length > 120) throw new Error('Add a description of up to 500 characters and a location of up to 120 characters.');
  if (result.date) {
    const date = new Date(`${result.date}T00:00:00Z`);
    if (!/^\d{4}-\d{2}-\d{2}$/.test(result.date) || Number.isNaN(date.getTime()) || date.toISOString().slice(0,10) !== result.date) throw new Error('Choose a valid date.');
  }
  return result;
}

export async function submitSuggestion(user, value) {
  const uid = uidFor(user);
  const payload = validateSuggestion(value, user.name);
  if (!navigator.onLine) throw new Error('You are offline. Your draft is safe; reconnect before sending.');
  const owner = doc(db, 'campusSuggestionOwners', value.id);
  // A draft keeps its ID across retries so an acknowledged submission is not duplicated.
  if ((await getDocFromServer(owner)).exists()) return value.id;
  const batch = writeBatch(db);
  batch.set(owner, { uid, createdAt: serverTimestamp() });
  batch.set(doc(db, 'campusSuggestions', value.id), {
    ...payload, createdAt: serverTimestamp(), status: 'pending', reviewNote: '', reviewerId: '', reviewedAt: null,
  });
  writeNotification(batch, db, user, uid, { kind: 'suggestion-sent', parentId: 'suggestion', sourceId: value.id, title: payload.name });
  await batch.commit();
  return value.id;
}

export function watchReviewer(user, receive, fail) {
  uidFor(user);
  return onSnapshot(doc(db, 'campusSuggestionReviewers', user.id), snapshot => receive(snapshot.exists() && snapshot.data().enabled === true), error => fail(suggestionError(error)));
}

export function watchReviewQueue(user, receive, fail) {
  uidFor(user);
  return onSnapshot(query(collection(db, 'campusSuggestions'), orderBy('createdAt','desc'), limit(100)), snapshot => receive(snapshot.docs.map(item => ({ ...item.data(), id: item.id }))), error => fail(suggestionError(error)));
}

export function watchMySuggestions(user, receive, fail) {
  const uid = uidFor(user);
  let children = [];
  const rows = new Map();
  const stop = onSnapshot(query(collection(db, 'campusSuggestionOwners'), where('uid','==',uid), limit(50)), snapshot => {
    children.forEach(unsubscribe => unsubscribe());
    rows.clear();
    receive([]);
    children = snapshot.docs.map(owner => onSnapshot(doc(db, 'campusSuggestions', owner.id), item => {
      if (item.exists()) rows.set(item.id, { ...item.data(), id: item.id });
      else rows.delete(item.id);
      receive([...rows.values()].sort((a,b) => (b.createdAt?.toMillis() || 0) - (a.createdAt?.toMillis() || 0)));
    }, error => fail(suggestionError(error))));
  }, error => fail(suggestionError(error)));
  return () => { stop(); children.forEach(unsubscribe => unsubscribe()); };
}

export async function reviewSuggestion(user, id, status, note) {
  const uid = uidFor(user);
  if (!['approved','declined'].includes(status)) throw new Error('Choose a review decision.');
  if (String(note).trim().length > 500) throw new Error('Review notes must be 500 characters or fewer.');
  if (!navigator.onLine) throw new Error('Reconnect before reviewing.');
  await updateDoc(doc(db, 'campusSuggestions', id), { status, reviewNote: String(note).trim(), reviewerId: uid, reviewedAt: serverTimestamp() });
}
