import { useEffect, useRef, useState } from 'react';
import { ArrowRight, BadgeCheck, Bookmark, CalendarDays, ChevronRight, House, LoaderCircle, MapPin, Megaphone, MessageCircle, Mic, Paperclip, Plus, RotateCcw, Send, ShieldCheck, Sparkles, Square, Trash2, UserRound, UsersRound, X } from 'lucide-react';
import events from '../../events.json';
import { WELCOME } from './assistant/engine.js';
import AssistantMessage from './assistant/Message';
import EventResults from './assistant/EventResults';
import { knownEvents } from './assistant/search';
import { conversationList } from './assistant/session';
import { useAssistant } from './assistant/use-assistant';
import './assistant.css';

const saved = () => window.campusAssistant?.getSaved() || [];
const defaultFilters = { category:'', date:'', location:'' };
const prompts = [
  { title:'Find events this week', detail:'Explore the campus calendar', question:'Find events this week', icon:CalendarDays },
  { title:"What's happening today?", detail:"See today's sample listings", question:"What's happening today?", icon:Megaphone },
  { title:'How do I save an event?', detail:'Keep your favorite plans', question:'How do I save an event?', icon:Bookmark },
];
const railLinks = [['Home',House,'dashboard'],['Events',CalendarDays,'discover'],['Clubs',UsersRound,'clubs'],['Saved',Bookmark,'saved'],['Feed',MessageCircle,'feed'],['Profile',UserRound,'profile']];
const titleOf = conversation => conversation.messages.find(message => message.role === 'user')?.text || 'Conversation';

export default function Assistant({ user }) {
  const chat = useAssistant(user,events,saved);
  const [savedIds,setSavedIds] = useState(saved);
  const [actionError,setActionError] = useState('');
  const [filters,setFilters] = useState(defaultFilters);
  const [dialog,setDialog] = useState(null);
  const input = useRef(null), log = useRef(null), follow = useRef(true), modal = useRef(null);
  const conversations = conversationList(chat);
  const locations = [...new Set(events.map(event => event.location))];
  const hasFilters = Object.values(filters).some(Boolean);
  useEffect(() => { if (follow.current && log.current) log.current.scrollTop = log.current.scrollHeight; },[chat.messages.length,chat.busy,chat.activeId]);
  useEffect(() => {
    const update = () => setSavedIds(saved());
    window.addEventListener('campus-saved-change',update); window.addEventListener('storage',update);
    return () => { window.removeEventListener('campus-saved-change',update); window.removeEventListener('storage',update); };
  },[]);
  useEffect(() => {
    if (dialog && !modal.current.open) modal.current.showModal();
    if (!dialog && modal.current.open) modal.current.close();
  },[dialog]);
  function act(kind,value) {
    try {
      if (!window.campusAssistant) throw new Error('Navigation is not ready. Please retry.');
      if (kind === 'save') window.campusAssistant.saveEvent(value);
      else if (kind === 'open') window.campusAssistant.openEvent(value);
      else window.campusAssistant.navigate(value);
      setActionError('');
    } catch (failure) { setActionError(failure.message || 'Could not complete the action.'); }
  }
  function send(text) { follow.current = true; chat.send(text,filters); input.current?.focus(); }
  function clear() { chat.clear(); setFilters(defaultFilters); setActionError(''); follow.current = true; input.current?.focus(); }
  function restore(id) { chat.openConversation(id); setFilters(defaultFilters); setDialog(null); follow.current = true; input.current?.focus(); }
  function renderMessage(message, allowSave = true) {
    const matches = knownEvents(events,message.eventIds);
    const copyText = [message.text,...matches.map(event => `${event.title}\n${event.date} / ${event.time}\n${event.location}\n${event.host} / ${event.interest}\nSample event`)].join('\n\n');
    return <AssistantMessage key={message.id} message={message} copyText={copyText} onSave={allowSave && message.role === 'assistant' ? () => chat.toggleAnswer(message.id) : undefined} saved={chat.savedAnswers.some(item => item.id === message.id)}><EventResults events={matches} pages={message.pages} savedIds={savedIds} onAction={(kind,value) => { setDialog(null); act(kind,value); }} /></AssistantMessage>;
  }
  return <div className="campus-assistant">
    <nav className="assistant-rail" aria-label="Assistant workspace navigation">{railLinks.map(([name,Icon,page]) => <button key={page} type="button" title={name === 'Clubs' ? 'Sample event hosts' : name} onClick={() => page === 'clubs' ? setDialog({ type:'clubs' }) : act('navigate',page)}><Icon size={21} /><span>{name}</span></button>)}</nav>
    <header className="assistant-heading"><div><h1>CampusVibes <span>Assistant</span></h1><p>Get help finding events and using CampusVibes.</p></div><button id="chatClear" type="button" className="assistant-new" onClick={clear}><Plus size={17} />New chat</button></header>
    <div className="assistant-workspace">
      <div className="assistant-main-column">
        <section className={`assistant-panel ${chat.messages.length ? 'has-conversation' : ''}`} aria-label="CampusVibes local assistant">
          <div className="assistant-log" id="chatMessages" role="log" aria-label="Conversation" aria-live="polite" aria-relevant="additions" ref={log} onScroll={() => { const area=log.current; follow.current = area.scrollHeight-area.scrollTop-area.clientHeight < 70; }}>
            {!chat.messages.length && <div className="assistant-greeting"><div className="assistant-greeting-copy"><div className="assistant-greeting-title"><img src="/assets/campusvibes-logo.png" alt="" /><strong>CampusVibes Assistant</strong><span><Sparkles size={10} />Local</span></div><p>{WELCOME}</p></div><img className="assistant-mascot" src="/assets/assistant-mascot.png" alt="" /></div>}
            {chat.messages.map(message => renderMessage(message))}
            {chat.busy && <p className="assistant-working" role="status"><LoaderCircle size={16} className="assistant-spin" />Finding sample events...</p>}
          </div>
          {!chat.messages.length && <div className="assistant-prompts" aria-label="Suggested questions">{prompts.map(({ title,detail,question,icon:Icon }) => <button type="button" key={question} onClick={() => send(question)}><span className="assistant-prompt-icon"><Icon size={22} /></span><span className="assistant-prompt-copy"><strong>{title}</strong><small>{detail}</small></span><ArrowRight size={17} /></button>)}</div>}
          <div className="assistant-filters" aria-label="Event search filters">
            <div className="assistant-categories" role="group" aria-label="Filter by category">{['','Music','Sports','Arts','Tech'].map(category => <button type="button" key={category} aria-label={category === 'Music' ? 'Filter music events' : undefined} aria-pressed={filters.category === category} onClick={() => setFilters(value => ({ ...value, category }))}>{category || 'All events'}</button>)}<button type="button" onClick={() => setDialog({ type:'clubs' })}>Clubs</button></div>
            <div className="assistant-select-filters"><label><CalendarDays size={14} /><select aria-label="Filter by date" value={filters.date} onChange={event => setFilters(value => ({ ...value, date:event.target.value }))}><option value="">Any date</option><option value="today">Today</option><option value="week">This week</option><option value="weekend">This weekend</option></select></label><label><MapPin size={14} /><select aria-label="Filter by location" value={filters.location} onChange={event => setFilters(value => ({ ...value, location:event.target.value }))}><option value="">Any location</option>{locations.map(location => <option key={location}>{location}</option>)}</select></label></div>
          </div>
          {hasFilters && <div className="assistant-filter-summary"><span>{[filters.category,filters.date && ({ today:'Today',week:'This week',weekend:'This weekend' }[filters.date]),filters.location].filter(Boolean).join(' / ')}</span><button type="button" onClick={() => setFilters(defaultFilters)} title="Clear search filters" aria-label="Clear search filters"><X size={14} /></button></div>}
          {chat.error && <div className="assistant-error" role="alert"><p>{chat.error}</p><button className="assistant-retry" type="button" disabled={chat.busy} onClick={chat.retry}><RotateCcw size={15} />Retry question</button></div>}
          {chat.warning && <p className="assistant-storage-warning" role="status">{chat.warning}</p>}
          {actionError && <p className="assistant-error" role="alert">{actionError}</p>}
          <form className="assistant-compose" id="chatForm" onSubmit={event => { event.preventDefault(); send(chat.draft); }}>
            <label className="sr-only" htmlFor="chatInput">Message CampusVibes Assistant</label>
            <textarea ref={input} id="chatInput" rows={2} maxLength={500} placeholder="Ask about events or CampusVibes..." value={chat.draft} onChange={event => chat.setDraft(event.target.value)} onKeyDown={event => { if(event.key === 'Enter' && !event.shiftKey && !event.nativeEvent.isComposing) { event.preventDefault(); if(!chat.busy && chat.draft.trim()) send(chat.draft); } }} />
            <div className="assistant-composer-tools"><div className="assistant-input-modes"><span title="Attachments are unavailable in the local helper"><button type="button" disabled aria-label="Attach file (unavailable)"><Paperclip size={16} />Attach</button></span><span title="Voice input is unavailable in the local helper"><button type="button" disabled aria-label="Voice input (unavailable)"><Mic size={17} />Voice</button></span></div><span className="assistant-character-count" aria-hidden="true">{chat.draft.length} / 500</span>{chat.busy ? <button className="assistant-send" type="button" onClick={chat.stop} aria-label="Stop response" title="Stop response"><Square size={17} />Stop</button> : <button className="assistant-send" id="chatSend" type="submit" disabled={!chat.draft.trim()} aria-label="Send message" title="Send message"><Send size={17} />Send</button>}</div>
          </form>
        </section>
        <div className="assistant-footnote"><ShieldCheck size={22} /><p>Local helper &middot; Sample events &middot; History in this tab only<br />No external AI service or live campus information.</p></div>
      </div>
      <aside className="assistant-sidebar" aria-label="Assistant activity">
        <section className="assistant-ready"><BadgeCheck size={29} /><div><h2>{chat.busy ? 'Working locally' : 'Assistant ready'}</h2><p>CampusVibes sample catalog<br />Private to this browser tab</p></div><span aria-hidden="true" /></section>
        <section className="assistant-sidebar-section"><h2><MessageCircle size={16} />Recent conversations</h2><div className="assistant-sidebar-list">{conversations.length ? conversations.slice(0,5).map(item => <button type="button" key={item.id} onClick={() => restore(item.id)} aria-current={item.id === chat.activeId ? 'true' : undefined}><span>{titleOf(item)}</span><ChevronRight size={15} /></button>) : <p className="assistant-sidebar-empty">No conversations yet</p>}</div><button className="assistant-view-all" type="button" onClick={() => setDialog({ type:'conversations' })}>View all conversations<ArrowRight size={13} /></button></section>
        <section className="assistant-sidebar-section"><h2><Bookmark size={17} />Saved answers</h2><div className="assistant-sidebar-list">{chat.savedAnswers.length ? chat.savedAnswers.slice(0,2).map(item => <button type="button" key={item.id} onClick={() => setDialog({ type:'answer', id:item.id })}><span>{item.question}</span><ChevronRight size={15} /></button>) : <p className="assistant-sidebar-empty">No saved answers yet</p>}</div><button className="assistant-view-all" type="button" onClick={() => setDialog({ type:'answers' })}>View all saved answers<ArrowRight size={13} /></button></section>
      </aside>
    </div>
    <dialog className="assistant-dialog" ref={modal} onClose={() => setDialog(null)} onClick={event => { if (event.target === event.currentTarget) setDialog(null); }} aria-labelledby="assistant-dialog-title">
      <header><h2 id="assistant-dialog-title">{({ conversations:'Recent conversations',answers:'Saved answers',answer:'Saved answer',clubs:'Sample event hosts' })[dialog?.type]}</h2><button type="button" className="assistant-icon-button" title="Close" aria-label="Close assistant panel" onClick={() => setDialog(null)}><X size={19} /></button></header>
      {dialog?.type === 'conversations' && <div className="assistant-history-list">{conversations.length ? conversations.map(item => <div key={item.id}><button type="button" onClick={() => restore(item.id)}>{titleOf(item)}<ChevronRight size={16} /></button><button type="button" className="assistant-icon-button" title="Delete conversation" aria-label={`Delete conversation: ${titleOf(item)}`} onClick={() => chat.removeConversation(item.id)}><Trash2 size={16} /></button></div>) : <p>No conversations yet.</p>}</div>}
      {dialog?.type === 'answers' && <div className="assistant-history-list">{chat.savedAnswers.length ? chat.savedAnswers.map(item => <div key={item.id}><button type="button" onClick={() => setDialog({ type:'answer',id:item.id })}>{item.question}<ChevronRight size={16} /></button><button type="button" className="assistant-icon-button" title="Remove saved answer" aria-label={`Remove saved answer: ${item.question}`} onClick={() => chat.toggleAnswer(item.id)}><Trash2 size={16} /></button></div>) : <p>No saved answers yet.</p>}</div>}
      {dialog?.type === 'answer' && chat.savedAnswers.filter(item => item.id === dialog.id).map(message => renderMessage(message,false))}
      {dialog?.type === 'clubs' && <><p className="assistant-dialog-note">Hosts from sample event listings. Membership and contact details are not verified.</p><div className="assistant-history-list">{[...new Set(events.map(event => event.host))].map(host => <div key={host}><button type="button" onClick={() => { setDialog(null); setFilters(defaultFilters); chat.send(`Events by ${host}`,defaultFilters); }}>{host}<ChevronRight size={16} /></button></div>)}</div></>}
    </dialog>
  </div>;
}
