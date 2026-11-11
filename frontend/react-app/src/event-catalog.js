import samples from '../../events.json' with { type: 'json' };

export const eventCatalog = samples.map(event => ({...event,source:'sample'}));
let latestPublished = [];
const linkedEvents = new Map();
function rebuildCatalog() {
  const seen = new Set(samples.map(event => event.id));
  const published = [...latestPublished, ...linkedEvents.values()].filter(event => !seen.has(event.id) && seen.add(event.id));
  eventCatalog.splice(0,eventCatalog.length,...published,...samples.map(event => ({...event,source:'sample'})));
}
export function replacePublishedEvents(events) {
  latestPublished = events;
  rebuildCatalog();
}
export function rememberLinkedEvent(event) {
  linkedEvents.set(event.id, event);
  rebuildCatalog();
}
export function clearLinkedEvents() {
  if (!linkedEvents.size) return;
  linkedEvents.clear();
  rebuildCatalog();
}
export function linkedEventCount() {
  const latest = new Set(latestPublished.map(event => event.id));
  return [...linkedEvents.keys()].filter(id => !latest.has(id)).length;
}
