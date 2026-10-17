import { createEventSearch, knownEvents, normalize, reply } from './search.js';
import { handleComparison, handleInterests } from './interests.js';
import { handleSaved } from './saved.js';
import { handleDates } from './dates.js';
import { handleFollowUp } from './follow-ups.js';
import { filterCatalog } from './filters.js';
import { cleanContext } from './session.js';

export const WELCOME = 'Hi! I can help you explore campus events, find listings by interest, check event details, or explain how to save one.';

export function createAssistant(events) {
  const catalogSearch = createEventSearch(events);
  return function answer(request) {
    if (!request || typeof request.text !== 'string' || !request.text.trim() || request.text.length > 500) throw new Error('Write a question of 1 to 500 characters.');
    const text = request.text.trim(), normalized = normalize(text);
    const catalog = filterCatalog(events,request.filters,request.today);
    const search = request.filters ? createEventSearch(catalog) : catalogSearch;
    const tools = { events:catalog, search, text, normalized, context: cleanContext(request.context,new Set(catalog.map(event => event.id))), saved: knownEvents(catalog, request.savedIds), interest: request.interest || '', today: request.today };
    if (/^(hi|hello|hey|good morning|good afternoon)$/.test(normalized)) return reply(WELCOME);
    if (/\b(how|can i)\b.*\b(save|bookmark)\b/.test(normalized)) return reply('Use the bookmark on an event card, then open Saved. Signed-in saves sync to your account; demo saves stay in this browser. I only change your saved list when you choose a bookmark button.', [], { pages: ['saved','discover'] });
    if (/\b(submit|propose|suggest an event|how.*suggest)\b/.test(normalized)) return reply('Open Suggest to draft an idea. Signed-in students can send it to the team review queue; demo drafts stay in this browser. Approval does not automatically publish an event.', [], { pages: ['suggest'] });
    if (/\b(how|where)\b.*\b(message|friends|feed)\b/.test(normalized)) return reply('Open Campus Vibe-Feed and Friends to connect with another account. Private Messages are available after the friendship is accepted. This local helper cannot read your private conversations.', [], { pages: ['feed'] });
    if (/\b(clubs?|societ|hosts?)\b/.test(normalized) && /\b(join|how|browse|show|find)\b/.test(normalized)) return reply('The sample listings name their hosts, but there is no verified club directory or membership signup here. Open an event to see its listed host; joining requires contacting the actual organizer.', catalog, { pages:['discover'] });
    if (/^(help|what can you do|who are you|are you ai)$/.test(normalized)) return reply('I am a free local CampusVibes helper, not a generative AI service. I can search the sample listings, check dates and locations, compare events, and help with Saved and Suggest. I do not have live campus information.', [], { pages: ['discover','saved','suggest'] });
    if (/\b(book|rsvp|buy|purchase|register|ticket|price|cost|free entry)\b/.test(normalized)) return reply('I cannot book places or verify tickets, prices, or availability. Check the listed host before attending. The event listings here are samples.', search(text));
    if (!catalog.length) return reply('No sample events match the selected filters. Clear a category, date, or location to broaden your search. This is not a live campus schedule.');
    const special = handleDates(tools) || handleSaved(tools) || handleComparison(tools) || handleFollowUp(tools) || handleInterests(tools);
    if (special) return special;
    if (/^(show |find |list |browse )?(all )?(campus )?(events|activities|listings)$/.test(normalized)) return reply('Here are the sample events. Ask for more to continue the list.', catalog);
    const found = search(text);
    if (found.length) return reply(found.length === 1 ? 'Here is the matching sample event. Its listed date, time, location, and host are shown below.' : 'These sample listings match your question. Choose an event for its full details.', found);
    return reply('I could not match that to the sample listings. Try an event title, host, location, or interest. I cannot answer general questions or check live campus news.', [], { pages: ['discover'] });
  };
}
