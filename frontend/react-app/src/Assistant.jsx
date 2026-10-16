import { useEffect, useRef, useState } from 'react';
import { LoaderCircle, Plus, RotateCcw, Send, Square } from 'lucide-react';
import events from '../../events.json';
import { WELCOME } from './assistant/engine.js';
import AssistantMessage from './assistant/Message';
import EventResults from './assistant/EventResults';
import { knownEvents } from './assistant/search';
import { useAssistant } from './assistant/use-assistant';
import './assistant.css';

const prompts = ['Show me music events','Where is the Indie Game Showcase?','How do I save an event?'];
const saved = () => window.campusAssistant?.getSaved() || [];

export default function Assistant({ user }) {
  const chat = useAssistant(user,events,saved);
  const [savedIds,setSavedIds] = useState(saved);
  const [actionError,setActionError] = useState('');
  const input = useRef(null), log = useRef(null), follow = useRef(true);
  useEffect(() => { if (follow.current && log.current) log.current.scrollTop = log.current.scrollHeight; },[chat.messages.length,chat.busy]);
  useEffect(() => {
    const update = () => setSavedIds(saved());
    window.addEventListener('campus-saved-change',update); window.addEventListener('storage',update);
    return () => { window.removeEventListener('campus-saved-change',update); window.removeEventListener('storage',update); };
  },[]);
  function act(kind,value) {
    try {
      if (!window.campusAssistant) throw new Error('Navigation is not ready. Please retry.');
      if (kind === 'save') window.campusAssistant.saveEvent(value);
      else if (kind === 'open') window.campusAssistant.openEvent(value);
      else window.campusAssistant.navigate(value);
      setActionError('');
    } catch (failure) { setActionError(failure.message || 'Could not complete the action.'); }
  }
  function send(text) { follow.current = true; chat.send(text); input.current?.focus(); }
  function clear() { chat.clear(); setActionError(''); follow.current = true; input.current?.focus(); }
  return <div className="campus-assistant">
    <header className="assistant-heading"><div><p className="assistant-eyebrow">ASK CAMPUSVIBES</p><h1>CampusVibes <span>Assistant</span></h1><p>Get help finding events and using CampusVibes.</p></div><button id="chatClear" type="button" className="assistant-new" onClick={clear}><Plus size={16} />New chat</button></header>
    <section className="assistant-panel" aria-label="CampusVibes local assistant">
      <div className="assistant-log" id="chatMessages" role="log" aria-label="Conversation" aria-live="polite" aria-relevant="additions" ref={log} onScroll={() => { const area=log.current; follow.current = area.scrollHeight-area.scrollTop-area.clientHeight < 70; }}>
        {!chat.messages.length && <AssistantMessage message={{ role:'assistant', text:WELCOME }} />}
        {chat.messages.map(message => {
          const matches = knownEvents(events,message.eventIds);
          const copyText = [message.text,...matches.map(event => `${event.title}\n${event.date} / ${event.time}\n${event.location}\n${event.host} / ${event.interest}\nSample event`)].join('\n\n');
          return <AssistantMessage key={message.id} message={message} copyText={copyText}><EventResults events={matches} pages={message.pages} savedIds={savedIds} onAction={act} /></AssistantMessage>;
        })}
        {chat.busy && <p className="assistant-working" role="status"><LoaderCircle size={16} className="assistant-spin" />Finding sample events...</p>}
      </div>
      {!chat.messages.length && <div className="assistant-prompts" aria-label="Suggested questions">{prompts.map((prompt,index) => <button type="button" key={prompt} onClick={() => send(prompt)}>{index === 1 ? 'Where is an event?' : prompt}</button>)}</div>}
      {chat.error && <div className="assistant-error" role="alert"><p>{chat.error}</p><button className="assistant-retry" type="button" disabled={chat.busy} onClick={chat.retry}><RotateCcw size={15} />Retry question</button></div>}
      {chat.warning && <p className="assistant-storage-warning" role="status">{chat.warning}</p>}
      {actionError && <p className="assistant-error" role="alert">{actionError}</p>}
      <form className="assistant-compose" id="chatForm" onSubmit={event => { event.preventDefault(); send(chat.draft); }}>
        <label className="sr-only" htmlFor="chatInput">Message CampusVibes Assistant</label>
        <textarea ref={input} id="chatInput" rows={2} maxLength={500} placeholder="Ask about events or CampusVibes..." value={chat.draft} onChange={event => chat.setDraft(event.target.value)} onKeyDown={event => { if(event.key === 'Enter' && !event.shiftKey && !event.nativeEvent.isComposing) { event.preventDefault(); if(!chat.busy && chat.draft.trim()) send(chat.draft); } }} />
        {chat.busy ? <button className="assistant-send" type="button" onClick={chat.stop} aria-label="Stop response" title="Stop response"><Square size={18} /></button> : <button className="assistant-send" id="chatSend" type="submit" disabled={!chat.draft.trim()} aria-label="Send message" title="Send message"><Send size={19} /></button>}
      </form>
      <div className="assistant-footnote"><p>Local helper &middot; Sample events &middot; No AI service or live campus information</p><span aria-hidden="true">{chat.draft.length} / 500</span></div>
    </section>
  </div>;
}
