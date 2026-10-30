const text = value => typeof value === 'string' ? value.trim() : '';

export function getEventMapLinks(event) {
  const venue = text(event?.location);
  const details = event?.mapLocation;
  const address = text(details?.address);
  const latitude = details?.latitude;
  const longitude = details?.longitude;
  const hasPin = typeof latitude === 'number' && Number.isFinite(latitude) && Math.abs(latitude) <= 90
    && typeof longitude === 'number' && Number.isFinite(longitude) && Math.abs(longitude) <= 180;
  const query = hasPin ? `${latitude},${longitude}` : address || venue;
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
