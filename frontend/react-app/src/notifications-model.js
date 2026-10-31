import { BADGES } from './progress-badges.js';

export const NOTIFICATION_LIMIT = 50;
export const NOTIFICATION_KINDS = Object.freeze({
  like: 'feed', interested: 'feed', comment: 'feed', message: 'feed',
  'friend-request': 'feed', 'friend-accepted': 'feed', 'post-published': 'feed',
  'event-saved': 'community', badge: 'community', 'suggestion-sent': 'community',
  'suggestion-approved': 'community', 'suggestion-declined': 'community',
});
const text = (value, max) => typeof value === 'string' ? value.trim().slice(0, max) : '';
export const notificationTime = value => typeof value?.toMillis === 'function' ? value.toMillis() : Number.isFinite(value) ? value : 0;
export const notificationUnread = item => item.createdAt > (item.readAt || 0);

export function notificationKey({ kind, parentId = '', sourceId }) {
  if (!Object.hasOwn(NOTIFICATION_KINDS, kind) || !/^[A-Za-z0-9_-]{1,200}$/.test(sourceId || '') || !/^[A-Za-z0-9_-]{0,200}$/.test(parentId)) throw new Error('Invalid notification source.');
  return `${kind}_${parentId}_${sourceId}`;
}

export function cleanNotification(value) {
  if (!value || !Object.hasOwn(NOTIFICATION_KINDS, value.kind) || !text(value.id, 500) || !text(value.actorId, 128)) return null;
  const createdAt = notificationTime(value.createdAt);
  if (createdAt <= 0) return null;
  try { notificationKey(value); } catch { return null; }
  return { id: value.id, kind: value.kind, workspace: NOTIFICATION_KINDS[value.kind], actorId: text(value.actorId, 128),
    actorName: text(value.actorName, 120) || 'Campus member', sourceId: value.sourceId, parentId: value.parentId || '',
    title: text(value.title, 140), createdAt, readAt: Math.max(0, notificationTime(value.readAt)) };
}

export function notificationCopy(item) {
  const name = item.actorName;
  const titles = {
    like: `${name} liked your post`, interested: `${name} is interested in your event`, comment: `${name} commented on your post`,
    message: `${name} sent you a message`, 'friend-request': `${name} sent you a friend request`, 'friend-accepted': `${name} accepted your friend request`,
    'post-published': 'Your post was published', 'event-saved': 'Event saved', badge: 'New badge earned',
    'suggestion-sent': 'Suggestion received', 'suggestion-approved': 'Your suggestion was approved', 'suggestion-declined': 'Your suggestion was declined',
  };
  return { heading: titles[item.kind] || 'Campus update', detail: item.title || (item.kind === 'message' ? 'Private conversation' : item.workspace === 'feed' ? 'Campus Vibe-Feed' : 'Community') };
}

export function recentNotifications(values, workspace = 'all', unreadOnly = false) {
  return [...new Map(values.map(cleanNotification).filter(Boolean).map(item => [item.id, item])).values()]
    .filter(item => (workspace === 'all' || item.workspace === workspace) && (!unreadOnly || notificationUnread(item)))
    .sort((a,b) => b.createdAt - a.createdAt || a.id.localeCompare(b.id)).slice(0, NOTIFICATION_LIMIT);
}

export function accountNotifications(section, previous, next, events) {
  if (section === 'dashboard') {
    const known = new Set((previous?.activity || []).map(item => JSON.stringify(item)));
    return (next?.activity || []).filter(item => item.type === 'saved' && !known.has(JSON.stringify(item))).flatMap(item => {
      const event = events.find(value => value.title === item.title), time = Date.parse(item.at);
      return event && Number.isFinite(time) ? [{ kind: 'event-saved', parentId: 'dashboard', sourceId: `${event.id}_${time}`, title: event.title }] : [];
    });
  }
  if (section === 'badges') {
    const known = new Set((previous?.earned || []).map(item => item.id));
    return (next?.earned || []).filter(item => !known.has(item.id)).flatMap(item => {
      const badge = BADGES.find(value => value.id === item.id && value.level > 1);
      return badge ? [{ kind: 'badge', parentId: 'badges', sourceId: badge.id, title: badge.name }] : [];
    });
  }
  return [];
}
