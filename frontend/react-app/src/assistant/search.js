import Fuse from 'fuse.js';

export const normalize = value => String(value || '').normalize('NFKC').toLowerCase().replace(/[^a-z0-9]+/g, ' ').trim();
const stopWords = new Set('a an the me my please show find tell about is are where when what which who at in on of for event events listing listings campus details do does i can you it and or'.split(' '));

export function createEventSearch(events) {
  const index = new Fuse(events, {
    keys: [{ name: 'title', weight: 0.55 }, { name: 'host', weight: 0.2 }, { name: 'location', weight: 0.15 }, { name: 'desc', weight: 0.1 }],
    threshold: 0.28, ignoreLocation: true, includeScore: true, minMatchCharLength: 3,
  });
  return value => {
    const terms = normalize(value).split(' ').filter(term => term.length >= 3 && !stopWords.has(term));
    if (!terms.length) return [];
    const direct = events.filter(event => [event.title, event.host].some(field => {
      const name = normalize(field);
      return name.includes(terms.join(' ')) || normalize(value).includes(name);
    }));
    if (direct.length) return direct;
    const full = index.search(terms.join(' ')).map(result => result.item);
    if (full.length) return full;
    const matches = new Map();
    for (const term of terms) for (const result of index.search(term)) {
      const previous = matches.get(result.item.id);
      matches.set(result.item.id, { item: result.item, hits: (previous?.hits || 0) + 1, score: (previous?.score || 0) + result.score });
    }
    return [...matches.values()].sort((a,b) => b.hits - a.hits || a.score - b.score).map(result => result.item);
  };
}

export function knownEvents(events, ids) {
  const valid = [...new Set(Array.isArray(ids) ? ids.filter(Number.isInteger) : [])];
  const index = new Map(events.map(event => [event.id,event]));
  return valid.map(id => index.get(id)).filter(Boolean);
}

export function reply(text, matches = [], extra = {}) {
  const ids = matches.map(event => event.id);
  return { text, eventIds: ids.slice(0,4), context: { eventIds: ids.slice(0,4), candidates: ids, offset: Math.min(4, ids.length) }, ...extra };
}
