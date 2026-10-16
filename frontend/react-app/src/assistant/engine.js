import { createEventSearch, knownEvents, normalize, reply } from './search.js';

export const WELCOME = 'Hi! I can help you explore campus events, find listings by interest, check event details, or explain how to save one.';

export function createAssistant(events) {
  const search = createEventSearch(events);
  return function answer(request) {
    if (!request || typeof request.text !== 'string' || !request.text.trim() || request.text.length > 500) throw new Error('Write a question of 1 to 500 characters.');
    const text = request.text.trim(), normalized = normalize(text);
    const tools = { events, search, text, normalized, context: request.context || {}, saved: knownEvents(events, request.savedIds), interest: request.interest || '', today: request.today };
    if (/^(hi|hello|hey|good morning|good afternoon)$/.test(normalized)) return reply(WELCOME);
    if (/\b(how|can i)\b.*\b(save|bookmark)\b/.test(normalized)) return reply('Use the bookmark on an event card, then open Saved. Saved events stay in this browser. I only change your saved list when you choose a bookmark button.', [], { pages: ['saved','discover'] });
    if (/\b(suggest|submit|propose)\b/.test(normalized)) return reply('Open Suggest to draft an idea. Signed-in students can send it to the team review queue; demo drafts stay in this browser. Approval does not automatically publish an event.', [], { pages: ['suggest'] });
    if (/\b(how|where)\b.*\b(message|friends|feed)\b/.test(normalized)) return reply('Open Campus Vibe-Feed and Friends to connect with another account. Private Messages are available after the friendship is accepted. This local helper cannot read your private conversations.', [], { pages: ['feed'] });
    if (/^(help|what can you do|who are you|are you ai)$/.test(normalized)) return reply('I am a free local CampusVibes helper, not a generative AI service. I can search the sample listings, check dates and locations, compare events, and help with Saved and Suggest. I do not have live campus information.', [], { pages: ['discover','saved','suggest'] });
    if (/\b(book|rsvp|buy|purchase|register|ticket|price|cost|free entry)\b/.test(normalized)) return reply('I cannot book places or verify tickets, prices, or availability. Check the listed host before attending. The event listings here are samples.', search(text));
    const found = search(text);
    if (found.length) return reply(found.length === 1 ? 'Here is the matching sample event. Its listed date, time, location, and host are shown below.' : 'These sample listings match your question. Choose an event for its full details.', found);
    if (/^(show |find |list |browse )?(all )?(campus )?(events|activities|listings)$/.test(normalized)) return reply('Here are the sample events. Ask for more to continue the list.', events);
    return reply('I could not match that to the sample listings. Try an event title, host, location, or interest. I cannot answer general questions or check live campus news.', [], { pages: ['discover'] });
  };
}
