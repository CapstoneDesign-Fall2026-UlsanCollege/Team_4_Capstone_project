import { collection,doc,limit,onSnapshot,orderBy,query,runTransaction,serverTimestamp,where } from 'firebase/firestore';
import { auth } from './firebase';
import { db } from './shared-feed-store';
import { FIRST_PUBLISHED_EVENT_ID,publicationPayload,publishedEvent } from './published-events-model';
import { validEventLinkId } from './event-links';

function owner(user) {
  if (!auth.currentUser || auth.currentUser.isAnonymous || auth.currentUser.emailVerified !== true || auth.currentUser.uid !== user.id) throw new Error('Sign in before accessing published campus events.');
}
export function watchPublishedEvents(user, receive, fail) {
  owner(user);
  return onSnapshot(query(collection(db,'campusPublishedEvents'),orderBy('publishedAt','desc'),limit(100)),{includeMetadataChanges:true},snapshot => {
    receive(snapshot.docs.map(item => publishedEvent(item.id,item.data())).filter(Boolean),snapshot.metadata.fromCache);
  },fail);
}
export function watchPublishedEvent(user, id, receive, fail) {
  owner(user);
  if (!validEventLinkId(id)) throw new Error('This event link is invalid.');
  return onSnapshot(query(collection(db,'campusPublishedEvents'),where('id','==',Number(id)),limit(1)), {includeMetadataChanges:true}, snapshot => {
    const event = snapshot.docs.map(item => publishedEvent(item.id,item.data())).find(Boolean) || null;
    receive(event, snapshot.metadata.fromCache);
  }, fail);
}
export async function publishSuggestion(user,id,note,details) {
  owner(user);
  if (!navigator.onLine) throw new Error('Reconnect before publishing. The suggestion has not been changed.');
  const reviewNote = String(note || '').trim();
  if (reviewNote.length > 500) throw new Error('Review notes must be 500 characters or fewer.');
  return runTransaction(db,async transaction => {
    const source = doc(db,'campusSuggestions',id), target = doc(db,'campusPublishedEvents',id), counter = doc(db,'campusEventMetadata','publication');
    const suggestion = await transaction.get(source);
    if (!suggestion.exists() || !['pending','approved'].includes(suggestion.data().status)) throw new Error('This suggestion is no longer available for publication.');
    const existing = await transaction.get(target);
    if (existing.exists()) {
      if (suggestion.data().publishedEventId !== existing.data().id) throw new Error('The publication record needs administrator review.');
      return existing.data().id;
    }
    const sequence = await transaction.get(counter);
    const eventId = sequence.exists() ? sequence.data().nextId : FIRST_PUBLISHED_EVENT_ID;
    const event = publicationPayload(suggestion.data(),id,eventId,details,serverTimestamp());
    transaction.set(target,event);
    transaction.set(counter,{nextId:eventId+1,lastSuggestionId:id,updatedAt:serverTimestamp()});
    transaction.update(source,suggestion.data().status === 'pending'
      ? {status:'approved',reviewNote,reviewerId:user.id,reviewedAt:serverTimestamp(),publishedEventId:eventId}
      : {publishedEventId:eventId});
    return eventId;
  });
}
