const text = value => typeof value === 'string' ? value.trim() : '';

export function mapCoordinates(value) {
  const latitude = value?.latitude;
  const longitude = value?.longitude;
  return typeof latitude === 'number' && Number.isFinite(latitude) && Math.abs(latitude) <= 90
    && typeof longitude === 'number' && Number.isFinite(longitude) && Math.abs(longitude) <= 180
    ? { latitude, longitude } : null;
}

export function parseMapCoordinates(value) {
  const parts = text(value).split(',');
  if (parts.length !== 2 || parts.some(part => !/^[+-]?(?:\d+(?:\.\d*)?|\.\d+)$/.test(part.trim()))) return null;
  return mapCoordinates({ latitude: Number(parts[0]), longitude: Number(parts[1]) });
}

export function straightLineDistanceKm(origin, destination) {
  const start = mapCoordinates(origin), end = mapCoordinates(destination);
  if (!start || !end) return null;
  const radians = degrees => degrees * Math.PI / 180;
  const a = Math.sin(radians(end.latitude - start.latitude) / 2) ** 2
    + Math.cos(radians(start.latitude)) * Math.cos(radians(end.latitude))
    * Math.sin(radians(end.longitude - start.longitude) / 2) ** 2;
  return 6371.0088 * 2 * Math.asin(Math.sqrt(Math.min(1, Math.max(0, a))));
}

export const JOURNEY_MODES = [
  { id: 'transit', label: 'Bus & train', action: 'See bus & train routes' },
  { id: 'walking', label: 'Walk', action: 'See walking route' },
  { id: 'driving', label: 'Drive', action: 'See driving route' },
  { id: 'bicycling', label: 'Cycle', action: 'See cycling route' },
];

export function getJourneyLinks({ origin, destination, mode = 'transit' } = {}) {
  const start = text(origin), end = text(destination);
  if (!end || !JOURNEY_MODES.some(item => item.id === mode)) return null;
  const route = new URL('https://www.google.com/maps/dir/');
  route.search = new URLSearchParams({ api: '1', destination: end, travelmode: mode }).toString();
  if (start) route.searchParams.set('origin', start);
  const stops = new URL('https://www.google.com/maps/search/');
  stops.search = new URLSearchParams({ api: '1', query: `bus stops near ${end}` }).toString();
  if (route.href.length > 2048 || stops.href.length > 2048) return null;
  return { route: route.href, stops: stops.href };
}

export function getEventMapLinks(event) {
  const venue = text(event?.location);
  const details = event?.mapLocation;
  const address = text(details?.address);
  const pin = mapCoordinates(details);
  const hasPin = Boolean(pin);
  const query = pin ? `${pin.latitude},${pin.longitude}` : address || venue;
  if (!query) return null;

  const search = new URL('https://www.google.com/maps/search/');
  search.search = new URLSearchParams({ api: '1', query }).toString();
  const directions = new URL('https://www.google.com/maps/dir/');
  directions.search = new URLSearchParams({ api: '1', destination: query }).toString();
  if (search.href.length > 2048 || directions.href.length > 2048) return null;

  return {
    venue: venue || address || 'Event location',
    address,
    search: search.href,
    directions: hasPin || address ? directions.href : null,
    status: hasPin ? 'Organizer-provided pin' : address ? 'Organizer-provided address' : 'Venue name only - address not confirmed',
  };
}
