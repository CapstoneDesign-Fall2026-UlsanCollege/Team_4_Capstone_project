import { useEffect, useRef, useState } from 'react';
import { todayInSeoul } from './dates.js';
import { createAssistantRunner } from './runner.js';
import { assistantSessionKey, cleanSession, loadSession, MAX_MESSAGES, saveSession, startConversation, toggleSavedAnswer } from './session.js';
import { auth } from '../firebase';
import { AI_CONSENT_VERSION, aiConsentKey, aiHistory, cleanAiReply } from './ai-contract.js';
import { createRemoteAssistantRunner } from './remote-runner.js';

export function useAssistant(user, events, getSaved, account) {
  const key = assistantSessionKey(user.id);
  const storage = useRef(null);
  try { storage.current = window.sessionStorage; } catch { storage.current = null; }
  const [session,setSession] = useState(() => account ? account.read('assistant') : loadSession(storage.current,key,events));
  const [busy,setBusy] = useState(false);
  const [error,setError] = useState('');
  const [warning,setWarning] = useState('');
  const [mode,setMode] = useState(() => { try { return user.id !== 'demo' && sessionStorage.getItem(aiConsentKey(user.id)) === AI_CONSENT_VERSION ? 'gemini' : 'local'; } catch { return 'local'; } });
  const [available,setAvailable] = useState(false);
  const [providerNotice,setProviderNotice] = useState('');
  const aiRunner = useRef(null);
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
    const logout = event => { if (!event.detail || event.detail.id !== user.id) { generation.current++; runner.current?.stop(); aiRunner.current?.stop(); try { sessionStorage.removeItem(aiConsentKey(user.id)); if(!account)sessionStorage.removeItem(key); } catch { /* Storage errors are already surfaced by autosave. */ } } };
    window.addEventListener('pagehide',flush); window.addEventListener('campus-session-change',logout);
    return () => { alive.current = false; runner.current?.stop(); aiRunner.current?.stop(); window.removeEventListener('pagehide',flush); window.removeEventListener('campus-session-change',logout); };
  }, [key]);
  useEffect(() => {
    if (user.id === 'demo') return;
    const controller = new AbortController();
    fetch('/api/assistant', { signal:controller.signal }).then(response => response.ok ? response.json() : null).then(value => { if (!controller.signal.aborted) { setAvailable(value?.available === true); if (!value?.available) setMode('local'); } }).catch(() => { if (!controller.signal.aborted) setAvailable(false); });
    return () => controller.abort();
  },[user.id]);
  useEffect(() => {
    if(account){try{account.stage('assistant',session);}catch(error){setWarning(error.message);}}
    else if (!saveSession(storage.current,key,session,events)) setWarning('Chat history could not be saved in this tab.');
  },[session,key,account]);

  async function run(text, retry = false, filters = {}) {
    if (lock.current || !text.trim() || text.length > 500) return;
    lock.current = true; setBusy(true); setError('');
    setProviderNotice('');
    const turn = generation.current;
    const prior = latest.current;
    failed.current = { text, filters };
    if (!retry) setSession(value => ({ ...value, draft: '', messages: [...value.messages,{ id: crypto.randomUUID(), role:'user', text: text.trim(), eventIds: [], pages: [], source:mode }].slice(-MAX_MESSAGES) }));
    runner.current ||= createAssistantRunner();
    try {
      const localRequest = { text:text.trim(), savedIds:getSaved(), context:prior.context, filters, interest:user.interest, today:todayInSeoul() };
      let result;
      if (mode === 'gemini') {
        aiRunner.current ||= createRemoteAssistantRunner({ getToken:async () => {
          const current=auth.currentUser;
          if (!current || current.isAnonymous || current.uid !== user.id) throw new Error('Sign in again to use Gemini AI.');
          const token=await current.getIdToken();
          if (auth.currentUser?.uid !== user.id) throw new Error('Your account changed. Sign in again.');
          return token;
        } });
        try { result=cleanAiReply(await aiRunner.current.ask({ text:text.trim(), history:aiHistory(prior.messages), filters, consent:true, adult:true }),events); }
        catch (failure) {
          if (!alive.current || turn !== generation.current) return;
          if (!failure.fallback || failure.name === 'AbortError') throw failure;
          setProviderNotice(`${failure.message} Showing a local-helper answer.`);
          result={...await runner.current.ask(localRequest),source:'local'};
        }
      } else result={...await runner.current.ask(localRequest),source:'local'};
      if (!alive.current || turn !== generation.current) return;
      const message = { ...result, id: crypto.randomUUID(), role:'assistant' };
      setSession(value => cleanSession({ ...value, messages: [...value.messages,message].slice(-MAX_MESSAGES), context: result.context },events));
      failed.current = null;
    } catch (failure) { if (alive.current && turn === generation.current) setError(failure.message || 'The Assistant could not finish. Retry your question.'); }
    finally { if (turn === generation.current) { lock.current = false; if (alive.current) setBusy(false); } }
  }
  function changeConversation(id) {
    if (id === latest.current.activeId) return;
    generation.current++; runner.current?.stop(); aiRunner.current?.stop(); failed.current = null; lock.current = false; setProviderNotice('');
    const fresh = startConversation(latest.current,events,id); latest.current = fresh;
    setBusy(false); setError(''); setSession(fresh);
  }
  function removeConversation(id) {
    if (id === latest.current.activeId) {
      generation.current++; runner.current?.stop(); aiRunner.current?.stop(); failed.current = null; lock.current = false; setProviderNotice('');
      setBusy(false); setError('');
      const fresh = cleanSession({ ...latest.current, activeId:crypto.randomUUID(), messages:[], draft:'', context:null },events);
      latest.current = fresh; setSession(fresh);
    } else setSession(value => ({ ...value, conversations:value.conversations.filter(item => item.id !== id) }));
  }
  function chooseMode(next) {
    if (next === 'gemini' && (!available || user.id === 'demo')) return;
    if (next === mode) return;
    changeConversation(); setMode(next);
    try { if (next === 'gemini') sessionStorage.setItem(aiConsentKey(user.id),AI_CONSENT_VERSION); else sessionStorage.removeItem(aiConsentKey(user.id)); } catch { setWarning('AI consent will not be remembered in this tab.'); }
  }
  return { ...session, busy, error, warning, mode, available, providerNotice, chooseMode, send: (text,filters) => run(text,false,filters), retry: () => failed.current && run(failed.current.text,true,failed.current.filters), stop: () => { runner.current?.stop(); aiRunner.current?.stop(); }, clear: () => changeConversation(), openConversation:changeConversation, removeConversation, toggleAnswer: id => setSession(value => toggleSavedAnswer(value,id,events)), setDraft: draft => setSession(value => ({ ...value, draft: draft.slice(0,500) })) };
}
