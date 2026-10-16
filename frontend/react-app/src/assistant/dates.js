import { filterInterests } from './interests.js';
import { reply } from './search.js';

export function validDate(value) {
  if (typeof value !== 'string' || !/^\d{4}-\d{2}-\d{2}$/.test(value)) return false;
  const parsed = new Date(`${value}T12:00:00Z`);
  return !Number.isNaN(parsed.getTime()) && parsed.toISOString().slice(0,10) === value;
}
export function todayInSeoul(now = new Date()) {
  const parts = new Intl.DateTimeFormat('en-US', { timeZone: 'Asia/Seoul', year: 'numeric', month: '2-digit', day: '2-digit' }).formatToParts(now);
  const read = type => parts.find(part => part.type === type).value;
  return `${read('year')}-${read('month')}-${read('day')}`;
}
const shift = (day, delta) => {
  const date = new Date(`${day}T12:00:00Z`);
  date.setUTCDate(date.getUTCDate() + delta);
  return date.toISOString().slice(0,10);
};

export function handleDates(tools) {
  const explicit = tools.text.match(/\b\d{4}-\d{2}-\d{2}\b/)?.[0];
  if (!explicit && !/\b(today|tomorrow|weekend|this week|next week|upcoming)\b/.test(tools.normalized)) return null;
  const today = tools.today || todayInSeoul();
  if (!validDate(today) || (explicit && !validDate(explicit))) return reply('Use a valid calendar date in YYYY-MM-DD format, for example 2026-10-03.');
  let start = explicit || today, end = start, relation = 'on';
  if (explicit) relation = /\bbefore\b/.test(tools.normalized) ? 'before' : /\bafter\b/.test(tools.normalized) ? 'after' : 'on';
  else if (/\bupcoming\b/.test(tools.normalized)) relation = 'from';
  else if (/\btomorrow\b/.test(tools.normalized)) start = end = shift(today,1);
  else if (/\bweekend\b/.test(tools.normalized)) {
    const reference = /\bsample weekend\b/.test(tools.normalized) ? tools.events[0].date : today;
    const weekday = new Date(`${reference}T12:00:00Z`).getUTCDay();
    start = shift(reference, weekday === 0 ? -1 : (6 - weekday + 7) % 7); end = shift(start,1);
  } else if (/\b(this week|next week)\b/.test(tools.normalized)) {
    const weekday = new Date(`${today}T12:00:00Z`).getUTCDay();
    start = shift(today, -((weekday + 6) % 7) + (/\bnext week\b/.test(tools.normalized) ? 7 : 0)); end = shift(start,6);
  }
  const source = /\b(saved|shortlist)\b/.test(tools.normalized) ? tools.saved : tools.events;
  const matches = filterInterests(source, tools.text).filter(event => relation === 'before' ? event.date < start : relation === 'after' ? event.date > start : relation === 'from' ? event.date >= start : event.date >= start && event.date <= end);
  const range = relation === 'from' ? `from ${start}` : relation === 'before' || relation === 'after' ? `${relation} ${start}` : start === end ? `on ${start}` : `${start} to ${end}`;
  return reply(matches.length ? `These sample listings match ${range}. This does not verify a live event or its availability.` : `No sample events match ${range}. The catalog runs from ${tools.events[0].date} to ${tools.events.at(-1).date}; I cannot check live campus events.`, matches);
}
