export const CAMPUS_TIME_ZONE = 'Asia/Seoul';
export const EVENT_DATE_FILTERS = ['all', 'today', 'weekend', 'upcoming', 'past'];

export function campusDateKey(now = Date.now()) {
  const parts = new Intl.DateTimeFormat('en-US', {
    timeZone: CAMPUS_TIME_ZONE, year: 'numeric', month: '2-digit', day: '2-digit',
  }).formatToParts(now);
  const value = type => parts.find(part => part.type === type).value;
  return `${value('year')}-${value('month')}-${value('day')}`;
}

export function matchesEventDate(date, filter, now = Date.now()) {
  if (!EVENT_DATE_FILTERS.includes(filter) || filter === 'all') return true;
  if (typeof date !== 'string' || !/^\d{4}-\d{2}-\d{2}$/.test(date)) return false;
  const parsed = new Date(`${date}T00:00:00Z`);
  if (!Number.isFinite(parsed.getTime()) || parsed.toISOString().slice(0, 10) !== date) return false;
  const today = campusDateKey(now);
  if (filter === 'today') return date === today;
  if (filter === 'upcoming') return date >= today;
  if (filter === 'past') return date < today;
  // Calendar-only arithmetic avoids changing the campus day with the browser's zone.
  const saturday = new Date(`${today}T00:00:00Z`);
  const weekday = saturday.getUTCDay();
  saturday.setUTCDate(saturday.getUTCDate() + (weekday === 0 ? -1 : 6 - weekday));
  const sunday = new Date(saturday);
  sunday.setUTCDate(sunday.getUTCDate() + 1);
  return date >= saturday.toISOString().slice(0, 10) && date <= sunday.toISOString().slice(0, 10);
}
