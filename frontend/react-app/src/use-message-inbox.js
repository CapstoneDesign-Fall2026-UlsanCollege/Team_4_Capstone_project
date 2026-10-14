import { useEffect, useState } from 'react';
import { watchMessages, watchReadReceipt } from './shared-messages-store';

export default function useMessageInbox(user, connections) {
  const [inbox, setInbox] = useState({});
  useEffect(() => {
    let active = true;
    const state = {};
    setInbox({});
    const update = (id, value) => {
      state[id] = { ...state[id], ...value };
      if (active) setInbox({ ...state });
    };
    const stops = connections.filter(item => item.status === 'accepted').flatMap(item => [
      watchMessages(user, item.id, result => update(item.id, { latest: result.messages.at(-1), error: '' }), error => update(item.id, { error }), 1),
      watchReadReceipt(user, item.id, user.id, readAt => update(item.id, { readAt }), error => update(item.id, { error })),
    ]);
    return () => { active = false; stops.forEach(stop => stop()); };
  }, [user.id, connections]);
  const unread = id => {
    const value = inbox[id];
    return Boolean(value?.latest?.createdAt && value.latest.senderId !== user.id && value.latest.createdAt > (value.readAt || 0));
  };
  return { inbox, unread, unreadCount: Object.keys(inbox).filter(unread).length };
}
