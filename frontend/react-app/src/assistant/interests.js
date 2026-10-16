import { knownEvents, normalize, reply } from './search.js';

const interests = {
  Tech: /\b(tech|technology|coding|programming|gaming)\b/,
  Arts: /\b(art|arts|painting|photography|creative)\b/,
  Music: /\b(music|musical|concerts?)\b/,
  Sports: /\b(sport|sports|basketball|fitness)\b/,
  Social: /\b(social|bonfire|meet people|make friends)\b/,
  Academics: /\b(academic|academics|research|study|studying)\b/,
};

export const requestedInterests = text => Object.entries(interests).filter(([, pattern]) => pattern.test(normalize(text))).map(([name]) => name);
export function filterInterests(events, text) {
  const categories = requestedInterests(text);
  if (!categories.length) return events;
  const excluded = /\b(not|except|without|exclude)\b/.test(normalize(text));
  return events.filter(event => excluded ? !categories.includes(event.interest) : categories.includes(event.interest));
}

export function handleInterests(tools) {
  if (tools.events.some(event => tools.normalized.includes(normalize(event.title)))) return null;
  const categories = requestedInterests(tools.text);
  if (!categories.length) return null;
  const results = filterInterests(tools.events, tools.text);
  return reply(results.length ? 'Here are sample listings for those interests. Their listed dates may be in the past; they are not live event announcements.' : 'No sample listings match those interests.', results);
}

export function handleComparison(tools) {
  if (!/\b(compare|versus|vs|difference between)\b/.test(tools.normalized)) return null;
  const fragments = tools.normalized.replace(/^(compare|difference between)\s+/, '').split(/\s+(and|versus|vs)\s+/).filter(value => !['and','versus','vs'].includes(value));
  const matches = fragments.length === 2 ? fragments.map(fragment => tools.search(fragment)[0]).filter(Boolean) : knownEvents(tools.events, tools.context.eventIds);
  const pair = [...new Map(matches.map(event => [event.id, event])).values()];
  if (pair.length !== 2) return reply('Name two events to compare, for example Jazz Under the Stars and Open Mic. I will compare only their listed details.');
  const sameDate = pair[0].date === pair[1].date;
  return reply(`These sample events are in ${pair[0].interest === pair[1].interest ? `the same category (${pair[0].interest})` : `different categories (${pair[0].interest} and ${pair[1].interest})`}. They have ${sameDate ? 'the same listed date' : 'different listed dates'}. Compare their times, locations, and hosts below; attendance and availability are not verified.`, pair);
}
