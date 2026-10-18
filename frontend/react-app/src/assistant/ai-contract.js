export const GEMINI_MODEL = 'gemini-3.8-flash';
export const AI_DAILY_LIMIT = 20;
export const AI_OUTPUT_TOKENS = 3072;
export const AI_CONSENT_VERSION = 'gemini-free-v1';
export const aiConsentKey = uid => `cv_assistant_ai_${encodeURIComponent(uid)}`;
const pages = new Set(['dashboard', 'discover', 'saved', 'suggest', 'profile', 'feed']);

export function sensitivePrompt(text) {
  return /[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}/i.test(text)
    || /\b(?:AIza[A-Za-z0-9_-]{20,}|AQ\.[A-Za-z0-9_-]{20,}|sk-[A-Za-z0-9_-]{16,})\b/.test(text)
    || /\bBearer\s+[A-Za-z0-9._-]{16,}/i.test(text)
    || /\b(?:password|api[ _-]?key|secret)\s*[:=]\s*\S{6,}/i.test(text)
    || /(?:\+?\d[ ()-]*){10,16}/.test(text);
}

export function aiHistory(messages = []) {
  const pairs = []; let question;
  for (const message of messages) {
    if (message.role === 'user') question = message.source === 'gemini' ? message : null;
    else if (message.role === 'assistant') {
      if (question && message.source === 'gemini') pairs.push({ role: 'user', text: question.text.slice(0, 500) }, { role: 'assistant', text: message.text.slice(0, 1500) });
      question = null;
    }
  }
  return pairs.slice(-6);
}

export function cleanAiReply(value, events) {
  if (!value || typeof value.text !== 'string' || !value.text.trim() || value.text.length > 6000) throw new Error('Gemini returned an invalid answer.');
  const known = new Set(events.map(event => event.id));
  const eventIds = [...new Set(Array.isArray(value.eventIds) ? value.eventIds.filter(id => Number.isInteger(id) && known.has(id)) : [])].slice(0, 4);
  return { text: value.text.trim(), eventIds, pages: [...new Set(Array.isArray(value.pages) ? value.pages.filter(page => pages.has(page)) : [])].slice(0, 3), context: { eventIds, candidates: eventIds, offset: eventIds.length }, source: 'gemini' };
}
