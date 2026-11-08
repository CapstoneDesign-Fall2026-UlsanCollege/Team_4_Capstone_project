import samples from '../../events.json';

export const eventCatalog = samples.map(event => ({...event,source:'sample'}));
export function replacePublishedEvents(events) {
  const seen = new Set(samples.map(event => event.id));
  const published = events.filter(event => !seen.has(event.id) && seen.add(event.id));
  eventCatalog.splice(0,eventCatalog.length,...published,...samples.map(event => ({...event,source:'sample'})));
}
