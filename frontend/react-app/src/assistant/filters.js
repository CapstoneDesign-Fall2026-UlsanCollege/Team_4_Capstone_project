import { todayInSeoul } from './dates.js';

const interests = new Set(['Music','Sports','Arts','Tech','Social','Academics']);
export function filterCatalog(events, filters = {}, today = todayInSeoul()) {
  const category = interests.has(filters?.category) ? filters.category : '';
  const location = typeof filters?.location === 'string' && events.some(event => event.location === filters.location) ? filters.location : '';
  const period = ['today','week','weekend'].includes(filters?.date) ? filters.date : '';
  const reference = new Date(`${today}T12:00:00Z`);
  const day = reference.getUTCDay();
  const shift = delta => { const date = new Date(reference); date.setUTCDate(date.getUTCDate()+delta); return date.toISOString().slice(0,10); };
  let start = today, end = today;
  if (period === 'week') { start = shift(-((day+6)%7)); end = shift(6-((day+6)%7)); }
  if (period === 'weekend') { const delta = day === 0 ? -1 : (6-day+7)%7; start = shift(delta); end = shift(delta+1); }
  return events.filter(event => (!category || event.interest === category) && (!location || event.location === location) && (!period || event.date >= start && event.date <= end));
}
