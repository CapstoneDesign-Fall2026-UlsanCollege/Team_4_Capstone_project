import { useEffect, useRef, useState } from 'react';
import { ArrowLeft, ArrowUp, CheckCheck, LoaderCircle, MessageCircle, Send, Trash2 } from 'lucide-react';
import { Avatar } from './Feed';
import { deleteMessage, loadOlderMessages, markConversationRead, messageError, sendMessage, watchLoadedMessage, watchMessages, watchReadReceipt } from './shared-messages-store';

function Conversation({ user, connection, profile, ready, draft, onDraft, onBack }) {
  const [result, setResult] = useState({ messages: [], fromCache: true });
  const [older, setOlder] = useState([]);
  const [cursor, setCursor] = useState(null);
  const [hasOlder, setHasOlder] = useState(false);
  const [loadingOlder, setLoadingOlder] = useState(false);
  const [peerRead, setPeerRead] = useState(0);
  const [busy, setBusy] = useState(false);
  const [failure, setFailure] = useState('');
  const [retry, setRetry] = useState(0);
  const [visible, setVisible] = useState(document.visibilityState === 'visible');
  const alive = useRef(true);
  const sendLock = useRef(false);
  const end = useRef(null);
  const lastRead = useRef(0);
  const peerId = connection.members.find(id => id !== user.id);
  const newest = result.messages.at(-1);
  const loadedIds = older.map(item => item.id).join('|');
  useEffect(() => {
    let active = true;
    const stops = older.map(item => watchLoadedMessage(user, connection.id, item.id, value => {
      if (active) setOlder(current => value ? current.map(existing => existing.id === item.id ? value : existing) : current.filter(existing => existing.id !== item.id));
    }, message => { if (active) setFailure(message); }));
    return () => { active = false; stops.forEach(stop => stop()); };
  }, [user.id, connection.id, loadedIds]);
  useEffect(() => {
    alive.current = true;
    setFailure('');
    const update = () => setVisible(document.visibilityState === 'visible');
    document.addEventListener('visibilitychange', update);
    const stopMessages = watchMessages(user, connection.id, setResult, setFailure);
    const stopReceipt = watchReadReceipt(user, connection.id, peerId, setPeerRead, setFailure);
    return () => { alive.current = false; document.removeEventListener('visibilitychange', update); stopMessages(); stopReceipt(); };
  }, [user.id, connection.id, peerId, retry]);
  useEffect(() => {
    if (!older.length) { setCursor(result.cursor); setHasOlder(result.hasOlder); }
  }, [result.cursor, result.hasOlder, older.length]);
  useEffect(() => { end.current?.scrollIntoView({ block: 'nearest' }); }, [newest?.id]);
  useEffect(() => {
    if (!visible || result.fromCache || !newest?.createdAt || newest.createdAt <= lastRead.current) return;
    const time = newest.createdAt;
    lastRead.current = time;
    markConversationRead(user, connection.id).catch(error => {
      if (alive.current) { lastRead.current = 0; setFailure(messageError(error)); }
    });
  }, [visible, result.fromCache, newest?.createdAt, connection.id, user.id]);
  const messages = [...new Map([...older, ...result.messages].map(item => [item.id, item])).values()].sort((a, b) => (a.createdAt || Infinity) - (b.createdAt || Infinity));
  const lastOwn = messages.filter(item => item.senderId === user.id).at(-1)?.id;
  const send = async event => {
    event.preventDefault();
    if (sendLock.current || !ready || !draft.trim()) return;
    sendLock.current = true;
    setBusy(true); setFailure('');
    try { await sendMessage(user, connection.id, draft); onDraft(''); }
    catch (error) { if (alive.current) setFailure(messageError(error)); }
    finally { sendLock.current = false; if (alive.current) setBusy(false); }
  };
  return <section className="feed-conversation" aria-label={`Conversation with ${profile?.name || 'your friend'}`}>
    <header><button type="button" className="feed-chat-back feed-icon-button" title="Back to conversations" aria-label="Back to conversations" onClick={onBack}><ArrowLeft size={18} /></button><Avatar name={profile?.name || 'Student'} small /><div><strong>{profile?.name || 'Student'}</strong><small>{profile?.college || 'Campus member'}</small></div></header>
    {failure && <div className="feed-error" role="alert"><p>{failure}</p><button type="button" onClick={() => setRetry(value => value + 1)}>Try again</button></div>}
    <div className="feed-message-history" aria-label="Message history" aria-live="polite">
      {hasOlder && <button type="button" className="feed-quiet-button feed-load-messages" disabled={loadingOlder} onClick={async () => {
        setLoadingOlder(true);
        try { const page = await loadOlderMessages(user, connection.id, cursor); if (alive.current) { setOlder(current => [...page.messages, ...current]); setCursor(page.cursor); setHasOlder(page.hasOlder); } }
        catch (error) { if (alive.current) setFailure(messageError(error)); }
        finally { if (alive.current) setLoadingOlder(false); }
      }}><ArrowUp size={14} />Earlier messages</button>}
      {!messages.length && <div className="feed-chat-empty"><MessageCircle size={28} /><p>{result.fromCache ? 'Loading messages...' : 'Start a conversation'}</p></div>}
      {messages.map(item => <div key={item.id} className={`feed-message-row ${item.senderId === user.id ? 'outgoing' : 'incoming'}`} data-message={item.id}>
        <div className="feed-message-bubble"><p>{item.body}</p><footer><time dateTime={item.createdAt ? new Date(item.createdAt).toISOString() : undefined}>{item.pending ? 'Sending...' : item.createdAt ? new Date(item.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : ''}</time>{item.id === lastOwn && item.createdAt && peerRead >= item.createdAt ? <span className="feed-message-seen"><CheckCheck size={13} />Seen</span> : null}</footer></div>
        {item.senderId === user.id && <button type="button" className="feed-icon-button feed-message-delete" title="Delete message" aria-label="Delete message" disabled={!ready || busy || item.pending} onClick={async () => {
          if (!window.confirm('Delete this message for both participants?')) return;
          try { await deleteMessage(user, connection.id, item.id); if (alive.current) setOlder(current => current.filter(value => value.id !== item.id)); }
          catch (error) { if (alive.current) setFailure(messageError(error)); }
        }}><Trash2 size={14} /></button>}
      </div>)}<div ref={end} />
    </div>
    <form className="feed-message-compose" onSubmit={send}><textarea aria-label="Message text" placeholder="Write a message..." value={draft} onChange={event => onDraft(event.target.value)} maxLength={2000} disabled={busy || !ready} rows={2} required /><button type="submit" className="feed-primary-button" title="Send message" aria-label="Send message" disabled={busy || !ready || !draft.trim()}>{busy ? <LoaderCircle className="feed-chat-spinner" size={18} /> : <Send size={18} />}</button></form>
  </section>;
}

export default function SharedMessages({ user, profiles, connections, query, ready, inbox, unread }) {
  const [selected, setSelected] = useState(null);
  const [drafts, setDrafts] = useState({});
  const friends = connections.filter(item => item.status === 'accepted');
  const active = friends.find(item => item.id === selected);
  const list = friends.filter(item => {
    const profile = profiles.find(value => value.id === item.members.find(id => id !== user.id));
    return `${profile?.name || ''} ${profile?.college || ''}`.toLowerCase().includes(query.toLowerCase());
  }).sort((a, b) => (inbox[b.id]?.latest?.createdAt || 0) - (inbox[a.id]?.latest?.createdAt || 0));
  return <div className={`feed-messenger ${active ? 'has-conversation' : ''}`}>
    <aside className="feed-message-inbox" aria-label="Conversations"><h2>Messages</h2>{list.map(item => {
      const profile = profiles.find(value => value.id === item.members.find(id => id !== user.id));
      return <button type="button" key={item.id} className={active?.id === item.id ? 'active' : ''} aria-label={`Message ${profile?.name || 'Student'}`} aria-current={active?.id === item.id ? 'page' : undefined} onClick={() => setSelected(item.id)}><Avatar name={profile?.name || 'Student'} small /><span><strong>{profile?.name || 'Student'}</strong><small>{inbox[item.id]?.error ? 'Unavailable' : inbox[item.id]?.latest?.body || profile?.college || 'Start a conversation'}</small></span>{unread(item.id) && <span className="feed-unread-dot" aria-label="Unread messages" />}</button>;
    })}{!list.length && <p className="feed-side-empty">{query ? 'No matching friends' : 'No accepted friends yet'}</p>}</aside>
    {active ? <Conversation key={active.id} user={user} connection={active} profile={profiles.find(value => value.id === active.members.find(id => id !== user.id))} ready={ready} draft={drafts[active.id] || ''} onDraft={value => setDrafts(current => ({ ...current, [active.id]: value }))} onBack={() => setSelected(null)} /> : <div className="feed-chat-empty"><MessageCircle size={32} /><p>{friends.length ? 'Select a conversation' : 'No conversations yet'}</p></div>}
  </div>;
}
