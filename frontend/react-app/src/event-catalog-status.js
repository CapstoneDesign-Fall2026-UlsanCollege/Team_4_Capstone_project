// A cache snapshot is a completed local read, not a server-confirmed empty catalogue.
export function catalogSnapshotStatus(events, cached) {
  return { loading: false, error: '', count: events.length, cached: Boolean(cached) };
}

export function catalogStatusText(status, demo = false) {
  if (demo) return 'Demo: sample listings. Sign in to see published campus events.';
  if (status.error) return status.error;
  if (status.loading) return 'Loading shared campus events...';
  if (status.cached && !status.count) return 'No shared campus events are cached in this browser. Reconnect to load them. 9 sample listings are available.';
  const count = status.count === 100 ? 'Latest 100' : status.count;
  const linked = status.linkedCount ? ` + ${status.linkedCount} linked ${status.linkedCount === 1 ? 'event' : 'events'}` : '';
  return `${count} published campus events${linked} · 9 sample listings${status.cached ? ' · Cached results; reconnect to check for updates.' : ''}`;
}
