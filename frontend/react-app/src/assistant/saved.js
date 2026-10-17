import { filterInterests } from './interests.js';
import { reply } from './search.js';

export function handleSaved(tools) {
  const recommend = /\b(recommend|suggest something|something new|not saved|unsaved|not bookmarked)\b/.test(tools.normalized);
  if (!recommend && /\b(saved|bookmarked|shortlist|what did i save)\b/.test(tools.normalized)) {
    const matches = filterInterests(tools.saved, tools.text);
    return reply(matches.length ? 'These sample events are saved in this browser. You can open or remove them using their bookmark buttons.' : 'There are no saved sample events matching that request in this browser.', matches, { pages: ['saved','discover'] });
  }
  if (!recommend) return null;
  const saved = new Set(tools.saved.map(event => event.id));
  const interestText = tools.text.replace(/\b(not saved|unsaved|not bookmarked)\b/gi,'');
  const matches = filterInterests(tools.events, interestText).filter(event => !saved.has(event.id)).sort((a,b) => Number(b.interest === tools.interest) - Number(a.interest === tools.interest));
  return reply(matches.length ? 'These sample ideas are not on your saved list. Your selected interest is prioritized where available; this is a local match, not an AI prediction.' : 'You have already saved all matching sample events. Try another interest.', matches);
}
