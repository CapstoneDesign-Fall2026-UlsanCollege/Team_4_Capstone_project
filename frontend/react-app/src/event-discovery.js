import { matchesEventDate } from './event-dates.js';

export const DEFAULT_EVENT_DATE = 'upcoming';
export const EVENT_SOURCES = ['all', 'published', 'sample'];

// The catalogue keeps published records and explicitly labelled sample listings.
// Filtering never replaces the catalogue, so saved and directly linked events survive.
export function discoverEvents(events, { category = 'all', search = '', date = DEFAULT_EVENT_DATE, source = 'all', savedOnly = false, saved = [], sort = 'date' } = {}, now = Date.now()) {
  const query = String(search).trim().toLocaleLowerCase();
  const selectedSource = EVENT_SOURCES.includes(source) ? source : 'all';
  return events.filter(event =>
    (category === 'all' || event.interest === category) &&
    matchesEventDate(event.date, date, now) &&
    (selectedSource === 'all' || (event.source === 'published' ? 'published' : 'sample') === selectedSource) &&
    (!savedOnly || saved.includes(event.id)) &&
    (!query || [event.title, event.host, event.location, event.interest].join(' ').toLocaleLowerCase().includes(query))
  ).sort((a, b) => {
    if (sort === 'title') return a.title.localeCompare(b.title) || a.id - b.id;
    if (sort === 'latest') return b.date.localeCompare(a.date) || a.id - b.id;
    return Number(b.source === 'published') - Number(a.source === 'published') || a.date.localeCompare(b.date) || a.id - b.id;
  });
}
