import { ArrowUpRight, Bookmark, CalendarDays, MapPin } from 'lucide-react';

export default function EventResults({ events, pages, savedIds, onAction }) {
  const labels = { discover:'Discover events', saved:'Saved events', suggest:'Suggest an event', feed:'Campus Vibe-Feed', dashboard:'Dashboard', profile:'Profile' };
  return <>
    {!!events.length && <div className="assistant-event-results">{events.map(event => <div className="assistant-event-row" key={event.id} data-assistant-event={event.id}>
      <img src={`/assets/${event.photo}`} alt="" loading="lazy" /><div className="assistant-event-body"><h2>{event.title}</h2><p><CalendarDays size={12} />{event.date} &middot; {event.time}</p><p><MapPin size={12} />{event.location}</p><p className="assistant-event-host">{event.host} &middot; {event.interest}</p><button type="button" className="assistant-event-open" onClick={() => onAction('open',event.id)} aria-label={`View details: ${event.title}`}>View details<ArrowUpRight size={13} /></button></div><button type="button" className="assistant-icon-button assistant-event-bookmark" title={savedIds.includes(event.id) ? 'Remove from saved' : 'Save event'} aria-label={`${savedIds.includes(event.id) ? 'Remove from saved' : 'Save event'}: ${event.title}`} aria-pressed={savedIds.includes(event.id)} onClick={() => onAction('save',event.id)}><Bookmark size={16} fill={savedIds.includes(event.id) ? 'currentColor' : 'none'} /></button>
    </div>)}</div>}
    {!!pages?.length && <div className="assistant-page-actions">{pages.map(page => <button type="button" key={page} onClick={() => onAction('navigate',page)}>{labels[page]}<ArrowUpRight size={13} /></button>)}</div>}
  </>;
}
