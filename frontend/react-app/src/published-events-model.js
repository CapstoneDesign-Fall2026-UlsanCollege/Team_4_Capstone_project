import { validSuggestionPoster } from './suggestion-poster.js';

export const FIRST_PUBLISHED_EVENT_ID = 1000;
export const PUBLIC_EVENT_CATEGORIES = ['All','Tech','Arts','Music','Sports','Social','Academics'];
const text = (value, max) => typeof value === 'string' && value.trim().length > 0 && value.length <= max;
export function validEventDate(value) {
  if (typeof value !== 'string' || !/^\d{4}-\d{2}-\d{2}$/.test(value)) return false;
  const date = new Date(`${value}T00:00:00Z`);
  return Number.isFinite(date.getTime()) && date.toISOString().slice(0,10) === value;
}
export function publicationDetails(value = {}) {
  const date = String(value.date || '').trim(), location = String(value.location || '').trim(), time = String(value.time || '').trim();
  if (!validEventDate(date)) throw new Error('Confirm a valid event date before publishing.');
  if (!text(location,120)) throw new Error('Confirm an event location of up to 120 characters.');
  if (time && !/^([01]\d|2[0-3]):[0-5]\d$/.test(time)) throw new Error('Choose a valid event time or leave it unconfirmed.');
  return { date,location,time };
}
export function publicationPayload(suggestion, sourceSuggestionId, id, details, publishedAt) {
  if (!Number.isSafeInteger(id) || id < FIRST_PUBLISHED_EVENT_ID || id >= Number.MAX_SAFE_INTEGER) throw new Error('The event catalogue cannot allocate an event ID.');
  if (!/^[A-Za-z0-9-]{1,80}$/.test(sourceSuggestionId) || !text(suggestion.name,100) || !text(suggestion.description,500)
    || !PUBLIC_EVENT_CATEGORIES.includes(suggestion.category)) throw new Error('The suggestion is not valid for publication.');
  if (suggestion.poster && !validSuggestionPoster(suggestion.poster, sourceSuggestionId)) throw new Error('The suggestion poster is invalid.');
  return { id,sourceSuggestionId,title:suggestion.name,interest:suggestion.category,host:suggestion.anonymous ? 'Campus community' : suggestion.host,
    desc:suggestion.description,...publicationDetails(details),publishedAt,...(suggestion.poster ? {poster:suggestion.poster} : {}) };
}
export function publishedEvent(sourceId, value) {
  try {
    if (value?.sourceSuggestionId !== sourceId || !Number.isFinite(value.publishedAt?.toMillis?.()) || !text(value.host,100)) return null;
    const event = publicationPayload({name:value.title,category:value.interest,host:value.host,description:value.desc,poster:value.poster},sourceId,value.id,value,value.publishedAt);
    const hues = {Tech:'#7c5cff',Arts:'#ff8fb1',Music:'#00a695',Sports:'#e89c38',Social:'#dc607b',Academics:'#5c9fc6',All:'#7c5cff'};
    return {...event,source:'published',photo:'event-placeholder.svg',emoji:'📅',hue:hues[event.interest],time:event.time || 'Time to be confirmed'};
  } catch { return null; }
}
