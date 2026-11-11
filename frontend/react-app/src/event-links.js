export function validEventLinkId(id) {
  return (typeof id === 'number' || typeof id === 'string')
    && /^[1-9]\d*$/.test(String(id)) && Number.isSafeInteger(Number(id));
}

export function eventLinkHash(id) {
  if (!validEventLinkId(id)) throw new Error('This event link is invalid.');
  return `#/community/events/${id}`;
}

export function parseEventLink(hash) {
  const match = /^#\/community\/events\/([^/?#]+)$/.exec(hash);
  return match && validEventLinkId(match[1]) ? Number(match[1]) : null;
}

export function eventShareUrl(id, base) {
  const url = new URL(base);
  if (!['http:', 'https:'].includes(url.protocol) || url.username || url.password) throw new Error('This website cannot create an event link.');
  url.search = '';
  url.hash = eventLinkHash(id);
  return url.href;
}
