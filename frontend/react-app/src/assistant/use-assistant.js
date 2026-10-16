import { useEffect, useRef, useState } from 'react';
import { todayInSeoul } from './dates.js';
import { createAssistantRunner } from './runner.js';
import { assistantSessionKey, cleanSession, loadSession, MAX_MESSAGES, saveSession } from './session.js';

export function useAssistant(user, events, getSaved) {
  const key = assistantSessionKey(user.id);
  const storage = useRef(null);
  try { storage.current = window.sessionStorage; } catch { storage.current = null; }
  const [session,setSession] = useState(() => loadSession(storage.current,key,events));
  const [busy,setBusy] = useState(false);
  const [error,setError] = useState('');
  const [warning,setWarning] = useState('');
  const runner = useRef(null), lock = useRef(false), alive = useRef(true), failed = useRef(null), latest = useRef(session), generation = useRef(0);
  latest.current = session;
  useEffect(() => {
    alive.current = true;
    const flush = () => saveSession(storage.current,key,latest.current,events);
    const logout = event => { if (!event.detail || event.detail.id !== user.id) { generation.current++; runner.current?.stop(); try { sessionStorage.removeItem(key); } catch { /* Storage errors are already surfaced by autosave. */ } } };
    window.addEventListener('pagehide',flush); window.addEventListener('campus-session-change',logout);
    return () => { alive.current = false; runner.current?.stop(); window.removeEventListener('pagehide',flush); window.removeEventListener('campus-session-change',logout); };
  }, [key]);
  useEffect(() => { if (!saveSession(storage.current,key,session,events)) setWarning('Chat history could not be saved in this tab.'); },[session,key]);

  async function run(text, retry = false) {
    if (lock.current || !text.trim() || text.length > 500) return;
    lock.current = true; setBusy(true); setError('');
    const turn = generation.current;
    const prior = latest.current;
    failed.current = text;
    if (!retry) setSession(value => ({ ...value, draft: '', messages: [...value.messages,{ id: crypto.randomUUID(), role:'user', text: text.trim(), eventIds: [], pages: [] }].slice(-MAX_MESSAGES) }));
    runner.current ||= createAssistantRunner();
    try {
      const result = await runner.current.ask({ text: text.trim(), savedIds: getSaved(), context: prior.context, interest: user.interest, today: todayInSeoul() });
      if (!alive.current || turn !== generation.current) return;
      const message = { ...result, id: crypto.randomUUID(), role:'assistant' };
      setSession(value => cleanSession({ ...value, messages: [...value.messages,message].slice(-MAX_MESSAGES), context: result.context },events));
      failed.current = null;
    } catch (failure) { if (alive.current && turn === generation.current) setError(failure.message || 'The local helper could not finish. Retry your question.'); }
    finally { if (turn === generation.current) { lock.current = false; if (alive.current) setBusy(false); } }
  }
  function clear() {
    generation.current++; runner.current?.stop(); failed.current = null; lock.current = false;
    setBusy(false); setError(''); setSession(cleanSession(null,events));
    try { sessionStorage.removeItem(key); } catch { setWarning('Chat history could not be cleared from browser storage.'); }
  }
  return { ...session, busy, error, warning, send: text => run(text), retry: () => failed.current && run(failed.current,true), stop: () => runner.current?.stop(), clear, setDraft: draft => setSession(value => ({ ...value, draft: draft.slice(0,500) })) };
}
