import { useEffect, useId, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { Award, Bell, Bookmark, CheckCheck, FileCheck2, Heart, LoaderCircle, MessageCircle, RefreshCw, Rss, UsersRound, X } from 'lucide-react';
import { cleanNotification, notificationCopy, notificationKey, notificationUnread, recentNotifications } from './notifications-model';
import { ensureSuggestionNotification, markNotificationsRead, notificationError, watchNotifications } from './notifications-store';
import { watchMySuggestions } from './suggestions-store';
import './notifications.css';

const DEMO_KEY = 'cv_notifications_demo';
const icons = { like: Heart, interested: Heart, comment: MessageCircle, message: MessageCircle, 'friend-request': UsersRound, 'friend-accepted': UsersRound,
  'post-published': Rss, 'event-saved': Bookmark, badge: Award, 'suggestion-sent': FileCheck2, 'suggestion-approved': FileCheck2, 'suggestion-declined': FileCheck2 };
const fullDate = value => new Intl.DateTimeFormat('en-US', { dateStyle: 'medium', timeStyle: 'short', timeZone: 'Asia/Seoul' }).format(new Date(value)) + ' KST';
function relativeTime(value, now) {
  const minutes = Math.max(0, Math.floor((now - value) / 60000));
  return minutes < 1 ? 'Just now' : minutes < 60 ? `${minutes}m ago` : minutes < 1440 ? `${Math.floor(minutes / 60)}h ago` : new Date(value).toLocaleDateString('en-US', { month: 'short', day: 'numeric', timeZone: 'Asia/Seoul' });
}

export default function Notifications({ user, onOpen }) {
  const demo = user.id === 'demo', panelId = useId();
  const [items, setItems] = useState([]), [open, setOpen] = useState(false), [workspace, setWorkspace] = useState('all');
  const [unreadOnly, setUnreadOnly] = useState(false), [failure, setFailure] = useState(''), [ready, setReady] = useState(demo);
  const [busy, setBusy] = useState(false), [retry, setRetry] = useState(0), [online, setOnline] = useState(navigator.onLine);
  const [now, setNow] = useState(Date.now()), [top, setTop] = useState(90);
  const trigger = useRef(null), dialog = useRef(null), alive = useRef(true), locked = useRef(false), current = useRef(items);
  current.current = items;
  const all = recentNotifications(items), unread = all.filter(notificationUnread), visible = recentNotifications(items, workspace, unreadOnly);

  useEffect(() => {
    alive.current = true;
    const connectivity = () => setOnline(navigator.onLine);
    window.addEventListener('online', connectivity); window.addEventListener('offline', connectivity);
    return () => { alive.current = false; window.removeEventListener('online', connectivity); window.removeEventListener('offline', connectivity); };
  }, []);
  useEffect(() => {
    if (!open) return;
    const timer = setInterval(() => setNow(Date.now()), 60000);
    return () => clearInterval(timer);
  }, [open]);
  useEffect(() => {
    if (!demo) return;
    try { setItems(recentNotifications(JSON.parse(localStorage.getItem(DEMO_KEY) || '[]'))); }
    catch { setFailure('Demo notification history could not be read.'); }
    const receive = event => {
      if (event.detail?.userId !== user.id) return;
      const source = event.detail.source;
      try {
        const value = cleanNotification({ ...source, id: notificationKey(source), actorId: user.id, actorName: user.name, createdAt: Date.now(), readAt: 0 });
        if (!value) return;
        const next = recentNotifications([value, ...current.current.filter(item => item.id !== value.id)]);
        current.current = next; setItems(next);
        try { localStorage.setItem(DEMO_KEY, JSON.stringify(next)); }
        catch { setFailure('Demo notifications are temporary because browser storage is unavailable.'); }
      } catch { /* Ignore malformed demo events, not signed-in server activity. */ }
    };
    const storage = event => {
      if (event.key !== DEMO_KEY) return;
      try { setItems(recentNotifications(JSON.parse(event.newValue || '[]'))); }
      catch { setFailure('Demo notification history could not be read.'); }
    };
    window.addEventListener('campus-local-notification', receive); window.addEventListener('storage', storage);
    return () => { window.removeEventListener('campus-local-notification', receive); window.removeEventListener('storage', storage); };
  }, [demo, user.id]);
  useEffect(() => {
    if (demo) return;
    let active = true;
    const reviews = new Set();
    setReady(false); setFailure('');
    const fail = message => { if (active) { setFailure(message); setReady(false); } };
    const timeout = setTimeout(() => fail('Notifications have not connected. Check your connection and retry.'), 15000);
    const stops = [];
    try {
      stops.push(watchNotifications(user, (rows, metadata) => {
        if (!active) return;
        setItems(rows);
        if (!metadata.fromCache) { clearTimeout(timeout); setReady(true); setFailure(''); }
      }, fail));
      stops.push(watchMySuggestions(user, rows => {
        for (const row of rows.filter(item => ['approved','declined'].includes(item.status))) {
          if (reviews.has(row.id)) continue;
          reviews.add(row.id);
          ensureSuggestionNotification(user, row).catch(error => { reviews.delete(row.id); if (active) setFailure(notificationError(error)); });
        }
      }, () => { if (active) setFailure('Suggestion notifications could not connect. Retry notifications.'); }));
    } catch (error) { fail(notificationError(error)); }
    return () => { active = false; clearTimeout(timeout); stops.forEach(stop => stop()); };
  }, [demo, user.id, retry]);
  useEffect(() => {
    if (open && !dialog.current.open) dialog.current.showModal();
    else if (!open && dialog.current.open) dialog.current.close();
  }, [open]);

  const close = () => { dialog.current?.close(); setOpen(false); trigger.current?.focus(); };
  async function markRead(values) {
    if (locked.current || (!demo && (!ready || !online))) return false;
    const ids = new Set(values.map(item => item.id));
    const captured = current.current.filter(item => ids.has(item.id) && notificationUnread(item));
    if (!captured.length) return true;
    locked.current = true; setBusy(true); setFailure('');
    try {
      if (!demo) await markNotificationsRead(user, captured);
      if (!alive.current) return false;
      const stamps = new Map(captured.map(item => [item.id, item.createdAt]));
      const next = current.current.map(item => stamps.has(item.id) ? { ...item, readAt: Math.max(item.readAt || 0, stamps.get(item.id)) } : item);
      if (demo) localStorage.setItem(DEMO_KEY, JSON.stringify(next));
      current.current = next; setItems(next); return true;
    } catch (error) { if (alive.current) setFailure(demo ? 'Read status could not be saved in this browser.' : notificationError(error)); return false; }
    finally { locked.current = false; if (alive.current) setBusy(false); }
  }
  async function follow(item) {
    if (await markRead([item])) { close(); onOpen(item); }
  }
  function toggle() {
    if (open) { close(); return; }
    setTop(Math.max(12, Math.min(trigger.current.getBoundingClientRect().bottom + 10, innerHeight - 360)));
    setNow(Date.now()); setOpen(true);
  }

  return <>
    <button ref={trigger} type="button" className="notification-trigger" aria-label={`Notifications${unread.length ? `, ${unread.length} unread recent` : ''}`}
      aria-haspopup="dialog" aria-expanded={open} aria-controls={panelId} title="Notifications" onClick={toggle}>
      <Bell size={21} />{unread.length > 0 && <span className="notification-count" aria-hidden="true">{unread.length > 9 ? '9+' : unread.length}</span>}
    </button>
    {createPortal(<dialog ref={dialog} id={panelId} className="notification-dialog" style={{ '--notification-top': `${top}px` }} aria-labelledby={`${panelId}-title`}
      onCancel={event => { event.preventDefault(); close(); }} onClose={() => setOpen(false)} onClick={event => { if (event.target === event.currentTarget) close(); }}>
      <div className="notification-content">
        <header className="notification-heading"><div><h2 id={`${panelId}-title`}>Notifications</h2><p>{unread.length} unread recent{demo ? ' · Demo' : ''}</p></div>
          <div className="notification-tools"><button type="button" className="notification-icon-button" title="Mark recent notifications as read" aria-label="Mark recent notifications as read" disabled={busy || !unread.length || (!demo && (!ready || !online))} onClick={() => markRead(unread)}>{busy ? <LoaderCircle size={18} className="notification-spinner" /> : <CheckCheck size={18} />}</button>
          <button type="button" className="notification-icon-button" title="Close notifications" aria-label="Close notifications" onClick={close}><X size={19} /></button></div>
        </header>
        <div className="notification-filters"><div className="notification-tabs" role="group" aria-label="Notification workspace">{[['all','All'],['community','Community'],['feed','Vibe-Feed']].map(([value,label]) => <button key={value} type="button" aria-pressed={workspace === value} onClick={() => setWorkspace(value)}>{label}</button>)}</div><label className="notification-unread-filter"><input type="checkbox" checked={unreadOnly} onChange={event => setUnreadOnly(event.target.checked)} />Unread only</label></div>
        {failure && <div className="notification-error" role="alert"><p>{failure}</p>{!demo && <button type="button" className="notification-icon-button" title="Retry notifications" aria-label="Retry notifications" onClick={() => setRetry(value => value + 1)}><RefreshCw size={17} /></button>}</div>}
        {!demo && !online && <p className="notification-connection" role="status">Offline. Read status has not synced.</p>}
        {!ready && !failure ? <div className="notification-empty" role="status"><LoaderCircle size={24} className="notification-spinner" /><p>Loading notifications...</p></div>
          : !visible.length ? <div className="notification-empty"><Bell size={27} /><p>{unreadOnly ? 'No unread notifications here.' : 'No recent notifications here.'}</p></div>
          : <ul className="notification-list">{visible.map(item => {
            const copy = notificationCopy(item), Icon = icons[item.kind];
            return <li key={item.id} data-notification-id={item.id} className={notificationUnread(item) ? 'is-unread' : ''}>
              <button type="button" className="notification-row" disabled={busy || (!demo && (!ready || !online))} onClick={() => follow(item)}>
                <span className={`notification-symbol is-${item.workspace}`}><Icon size={19} /></span><span className="notification-copy"><strong>{copy.heading}</strong><span>{copy.detail}</span><small><span>{item.workspace === 'community' ? 'Community' : 'Vibe-Feed'}{item.actorId !== user.id ? ` · Member ${item.actorId.slice(-6)}` : ''}</span><time dateTime={new Date(item.createdAt).toISOString()} title={fullDate(item.createdAt)}>{relativeTime(item.createdAt, now)}</time></small></span>
                {notificationUnread(item) && <span className="notification-unread-dot" aria-label="Unread" />}
              </button>
            </li>;
          })}</ul>}
        <footer className="notification-footer">{demo ? 'Demo activity · saved in this browser' : items.length >= 50 ? 'Latest 50 account notifications' : 'Private account notifications'}</footer>
      </div>
    </dialog>, document.body)}
  </>;
}
