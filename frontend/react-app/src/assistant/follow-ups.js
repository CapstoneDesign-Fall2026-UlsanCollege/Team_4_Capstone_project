import { knownEvents, normalize, reply } from './search.js';

export function handleFollowUp(tools) {
  const previous = knownEvents(tools.events, tools.context.eventIds);
  if (/^(show |any )?(more|more events|other options|next|next events|what else)$/.test(tools.normalized)) {
    const candidates = knownEvents(tools.events, tools.context.candidates);
    const offset = Number.isInteger(tools.context.offset) ? Math.max(0, Math.min(candidates.length, tools.context.offset)) : previous.length;
    const next = candidates.slice(offset, offset + 4);
    if (!candidates.length) return reply('Ask for an interest or a list of events first, then ask for more.');
    if (!next.length) return reply('That is the end of this matching sample list. Try another interest or open Discover.', [], { context: tools.context, pages: ['discover'] });
    const result = reply('Here are the next matching sample listings.', next);
    return { ...result, context: { ...result.context, candidates: candidates.map(event => event.id), offset: offset + next.length } };
  }
  if (!/\b(it|that one|this one|first|second|third|fourth|last one|those|these)\b/.test(tools.normalized) || tools.events.some(event => tools.normalized.includes(normalize(event.title)))) return null;
  if (!previous.length) return reply('Which event do you mean? Give its name or ask for a category first.');
  const order = [['first',0],['second',1],['third',2],['fourth',3]];
  const ordinal = order.find(([word]) => tools.normalized.includes(word))?.[1];
  const index = /\blast one\b/.test(tools.normalized) ? previous.length - 1 : ordinal;
  if (index !== undefined && !previous[index]) return reply('That position is not in the last list. Choose one of the events shown above.');
  const selected = index !== undefined ? previous[index] : previous.length === 1 ? previous[0] : null;
  if (!selected) return reply('More than one event was shown. Name an event or say first, second, third, or fourth so I do not guess.', previous, { context: tools.context });
  return reply(`Here are the listed details for ${selected.title}. It is sample data; confirm with ${selected.host} before attending.`, [selected]);
}
