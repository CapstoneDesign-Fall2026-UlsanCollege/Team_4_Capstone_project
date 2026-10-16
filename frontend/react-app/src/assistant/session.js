export const MAX_MESSAGES = 40;
export const assistantSessionKey = uid => `cv_assistant_session_${encodeURIComponent(uid)}`;
const pages = new Set(['dashboard','discover','saved','suggest','profile','feed']);
const cleanIds = (ids, known, maximum) => [...new Set(Array.isArray(ids) ? ids.filter(id => Number.isInteger(id) && known.has(id)) : [])].slice(0,maximum);

export function cleanContext(value, known) {
  const candidates = cleanIds(value?.candidates,known,100);
  return { eventIds: cleanIds(value?.eventIds,known,4), candidates, offset: Number.isInteger(value?.offset) ? Math.max(0,Math.min(value.offset,candidates.length)) : 0 };
}
export function cleanSession(value, events) {
  const known = new Set(events.map(event => event.id));
  const seen = new Set();
  const messages = (Array.isArray(value?.messages) ? value.messages : []).slice(-MAX_MESSAGES).flatMap(message => {
    if (!message || !['user','assistant'].includes(message.role) || typeof message.text !== 'string' || !message.text.trim() || message.text.length > (message.role === 'user' ? 500 : 6000)) return [];
    const id = typeof message.id === 'string' && /^[a-zA-Z0-9-]{1,80}$/.test(message.id) && !seen.has(message.id) ? message.id : crypto.randomUUID();
    seen.add(id);
    return [{ id, role: message.role, text: message.text, eventIds: message.role === 'assistant' ? cleanIds(message.eventIds,known,4) : [], pages: message.role === 'assistant' && Array.isArray(message.pages) ? [...new Set(message.pages.filter(page => pages.has(page)))] : [] }];
  });
  return { messages, draft: typeof value?.draft === 'string' ? value.draft.slice(0,500) : '', context: messages.some(message => message.role === 'assistant') ? cleanContext(value?.context,known) : cleanContext(null,known) };
}
export function loadSession(storage, key, events) {
  try {
    const value = JSON.parse(storage.getItem(key) || 'null');
    return cleanSession(value?.version === 1 ? value : null,events);
  } catch { return cleanSession(null,events); }
}
export function saveSession(storage, key, value, events) {
  try { storage.setItem(key,JSON.stringify({ version: 1, ...cleanSession(value,events) })); return true; }
  catch { return false; }
}
