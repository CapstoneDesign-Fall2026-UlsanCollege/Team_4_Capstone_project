import { useEffect, useRef, useState } from 'react';
import { todayInSeoul } from './dates.js';
import { createAssistantRunner } from './runner.js';
import { assistantSessionKey, cleanSession, loadSession, MAX_MESSAGES, saveSession, startConversation, toggleSavedAnswer } from './session.js';

export function useAssistant(user, events, getSaved, account) {
  const key = assistantSessionKey(user.id);
  const storage = useRef(null);
  try { storage.current = window.sessionStorage; } catch { storage.current = null; }
  const [session,setSession] = useState(() => account ? account.read('assistant') : loadSession(storage.current,key,events));
  const [busy,setBusy] = useState(false);
  const [error,setError] = useState('');
  const [warning,setWarning] = useState('');
  const runner = useRef(null), lock = useRef(false), alive = useRef(true), failed = useRef(null), latest = useRef(session), generation = useRef(0);
  latest.current = session;
  const remote=useRef(account ? JSON.stringify(account.read('assistant')) : '');
  useEffect(()=>account?.subscribe(()=>{
    const value=account.read('assistant'),json=JSON.stringify(value);
    if(json !== remote.current){remote.current=json;if(json !== JSON.stringify(latest.current) && !lock.current){latest.current=value;setSession(value);}}
    if(!account.status().error)setWarning('');
  }),[account]);
  useEffect(() => {
    alive.current = true;
    const flush = () => {if(!account)saveSession(storage.current,key,latest.current,events);};
    const logout = event => { if (!event.detail || event.detail.id !== user.id) { generation.current++; runner.current?.stop(); if(!account)try { sessionStorage.removeItem(key); } catch { /* Storage errors are already surfaced by autosave. */ } } };
    window.addEventListener('pagehide',flush); window.addEventListener('campus-session-change',logout);
    return () => { alive.current = false; runner.current?.stop(); window.removeEventListener('pagehide',flush); window.removeEventListener('campus-session-change',logout); };
  }, [key]);
  useEffect(() => {
    if(account){try{account.stage('assistant',session);}catch(error){setWarning(error.message);}}
    else if (!saveSession(storage.current,key,session,events)) setWarning('Chat history could not be saved in this tab.');
  },[session,key,account]);

  async function run(text, retry = false, filters = {}) {
    if (lock.current || !text.trim() || text.length > 500) return;
    lock.current = true; setBusy(true); setError('');
    const turn = generation.current;
    const prior = latest.current;
    failed.current = { text, filters };
    if (!retry) setSession(value => ({ ...value, draft: '', messages: [...value.messages,{ id: crypto.randomUUID(), role:'user', text: text.trim(), eventIds: [], pages: [] }].slice(-MAX_MESSAGES) }));
    runner.current ||= createAssistantRunner();
    try {
      const result = await runner.current.ask({ text: text.trim(), savedIds: getSaved(), context: prior.context, filters, interest: user.interest, today: todayInSeoul() });
      if (!alive.current || turn !== generation.current) return;
      const message = { ...result, id: crypto.randomUUID(), role:'assistant' };
      setSession(value => cleanSession({ ...value, messages: [...value.messages,message].slice(-MAX_MESSAGES), context: result.context },events));
      failed.current = null;
    } catch (failure) { if (alive.current && turn === generation.current) setError(failure.message || 'The local helper could not finish. Retry your question.'); }
    finally { if (turn === generation.current) { lock.current = false; if (alive.current) setBusy(false); } }
  }
  function changeConversation(id) {
    if (id === latest.current.activeId) return;
    generation.current++; runner.current?.stop(); failed.current = null; lock.current = false;
    const fresh = startConversation(latest.current,events,id); latest.current = fresh;
    setBusy(false); setError(''); setSession(fresh);
  }
  function removeConversation(id) {
    if (id === latest.current.activeId) {
      generation.current++; runner.current?.stop(); failed.current = null; lock.current = false;
      setBusy(false); setError('');
      const fresh = cleanSession({ ...latest.current, activeId:crypto.randomUUID(), messages:[], draft:'', context:null },events);
      latest.current = fresh; setSession(fresh);
    } else setSession(value => ({ ...value, conversations:value.conversations.filter(item => item.id !== id) }));
  }
  return { ...session, busy, error, warning, send: (text,filters) => run(text,false,filters), retry: () => failed.current && run(failed.current.text,true,failed.current.filters), stop: () => runner.current?.stop(), clear: () => changeConversation(), openConversation:changeConversation, removeConversation, toggleAnswer: id => setSession(value => toggleSavedAnswer(value,id,events)), setDraft: draft => setSession(value => ({ ...value, draft: draft.slice(0,500) })) };
}
