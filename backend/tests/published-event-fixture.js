import { doc,serverTimestamp,writeBatch } from 'firebase/firestore';

export function publicationBatch(database,{id='idea',eventId=1000,source={},event={},decision=true,allocate=true,alreadyApproved=false,reviewer='reviewer'}={}) {
  const original={name:'Campus film night',category:'Arts',host:'Film Club',description:'A student film night.',...source};
  const batch=writeBatch(database);
  batch.set(doc(database,'campusPublishedEvents',id),{id:eventId,sourceSuggestionId:id,title:original.name,interest:original.category,host:original.anonymous ? 'Campus community' : original.host,desc:original.description,date:'2026-11-20',time:'',location:'Campus lawn',publishedAt:serverTimestamp(),...event});
  if(allocate)batch.set(doc(database,'campusEventMetadata','publication'),{nextId:eventId+1,lastSuggestionId:id,updatedAt:serverTimestamp()});
  if(decision)batch.update(doc(database,'campusSuggestions',id),alreadyApproved ? {publishedEventId:eventId} : {status:'approved',reviewNote:'Ready for students',reviewerId:reviewer,reviewedAt:serverTimestamp(),publishedEventId:eventId});
  return batch;
}
