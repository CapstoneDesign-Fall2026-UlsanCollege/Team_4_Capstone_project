export const MAX_MESSAGES = 40;
export const MAX_CONVERSATIONS = 10;
export const MAX_ANSWERS = 20;
export const assistantSessionKey = uid => `cv_assistant_session_${encodeURIComponent(uid)}`;
const pages = new Set(['dashboard','discover','saved','suggest','profile','feed']);
const cleanIds = (ids, known, maximum) => [...new Set(Array.isArray(ids) ? ids.filter(id => Number.isInteger(id) && known.has(id)) : [])].slice(0,maximum);

export function cleanContext(value, known) {
  const candidates = cleanIds(value?.candidates,known,100);
  return { eventIds: cleanIds(value?.eventIds,known,4), candidates, offset: Number.isInteger(value?.offset) ? Math.max(0,Math.min(value.offset,candidates.length)) : 0 };
}
function cleanConversation(value, events) {
  const known = new Set(events.map(event => event.id));
  const seen = new Set();
  const messages = (Array.isArray(value?.messages) ? value.messages : []).slice(-MAX_MESSAGES).flatMap(message => {
    if (!message || !['user','assistant'].includes(message.role) || typeof message.text !== 'string' || !message.text.trim() || message.text.length > (message.role === 'user' ? 500 : 6000)) return [];
    const id = typeof message.id === 'string' && /^[a-zA-Z0-9-]{1,80}$/.test(message.id) && !seen.has(message.id) ? message.id : crypto.randomUUID();
    seen.add(id);
    return [{ id, role: message.role, text: message.text, eventIds: message.role === 'assistant' ? cleanIds(message.eventIds,known,4) : [], pages: message.role === 'assistant' && Array.isArray(message.pages) ? [...new Set(message.pages.filter(page => pages.has(page)))] : [], ...(['gemini','local'].includes(message.source) ? { source:message.source } : {}) }];
  });
  return { messages, draft: typeof value?.draft === 'string' ? value.draft.slice(0,500) : '', context: messages.some(message => message.role === 'assistant') ? cleanContext(value?.context,known) : cleanContext(null,known) };
}
const validId = id => typeof id === 'string' && /^[a-zA-Z0-9-]{1,80}$/.test(id);
export function cleanSession(value, events) {
  const activeId = validId(value?.activeId) ? value.activeId : crypto.randomUUID();
  const seen = new Set([activeId]);
  const conversations = (Array.isArray(value?.conversations) ? value.conversations : []).flatMap(item => {
    if (!validId(item?.id) || seen.has(item.id)) return [];
    seen.add(item.id);
    const conversation = cleanConversation(item,events);
    return conversation.messages.length ? [{ ...conversation, id:item.id }] : [];
  }).slice(0,MAX_CONVERSATIONS);
  const answers = new Set();
  const savedAnswers = (Array.isArray(value?.savedAnswers) ? value.savedAnswers : []).flatMap(item => {
    if (item?.role !== 'assistant' || !validId(item.id) || answers.has(item.id)) return [];
    const message = cleanConversation({ messages:[item] },events).messages[0];
    if (!message) return [];
    answers.add(message.id);
    return [{ ...message, question:typeof item.question === 'string' ? item.question.slice(0,500) : 'Saved answer' }];
  }).slice(0,MAX_ANSWERS);
  return { ...cleanConversation(value,events), activeId, conversations, savedAnswers };
}
export function conversationList(session) {
  const current = session.messages.length ? [{ id:session.activeId, messages:session.messages, draft:session.draft, context:session.context }] : [];
  return [...current,...session.conversations].slice(0,MAX_CONVERSATIONS);
}
export function startConversation(session, events, id) {
  if (id === session.activeId) return session;
  const selected = id ? session.conversations.find(item => item.id === id) : null;
  if (id && !selected) return session;
  return cleanSession({
    ...session, ...cleanConversation(selected,events), activeId:selected?.id || crypto.randomUUID(),
    conversations:conversationList(session).filter(item => item.id !== selected?.id),
  },events);
}
export function toggleSavedAnswer(session, messageId, events) {
  const existing = session.savedAnswers.find(item => item.id === messageId);
  if (existing) return { ...session, savedAnswers:session.savedAnswers.filter(item => item.id !== messageId) };
  const index = session.messages.findIndex(item => item.id === messageId && item.role === 'assistant');
  if (index < 0) return session;
  const question = session.messages.slice(0,index).findLast(item => item.role === 'user')?.text || 'Saved answer';
  return cleanSession({ ...session, savedAnswers:[{ ...session.messages[index], question },...session.savedAnswers] },events);
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
