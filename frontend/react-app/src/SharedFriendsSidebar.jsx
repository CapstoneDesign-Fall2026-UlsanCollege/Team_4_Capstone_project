import { useState } from 'react';
import { Search, Users, X } from 'lucide-react';
import { Avatar } from './Feed';
import { matchesPublicMember, publicMemberLabel } from './member-identity';
import { removeConnection } from './shared-friends-store';

export default function SharedFriendsSidebar({ user, profiles, connections, busy, act }) {
  const [expanded, setExpanded] = useState(false);
  const [search, setSearch] = useState('');
  const friends = connections.filter(item => item.status === 'accepted').map(connection => {
    const id = connection.members.find(value => value !== user.id);
    return { connection, profile: profiles.find(profile => profile.id === id) || { id, name: 'Student', college: 'Campus member' } };
  });
  const visible = expanded ? friends.filter(({ profile }) => matchesPublicMember(profile, search)) : friends.slice(0, 5);
  return <section className="feed-card feed-friends-sidebar" aria-label="Your friends">
    <div className="feed-section-heading"><h2>Your friends <small>({friends.length})</small></h2><Users size={17} /></div>
    {expanded && <label className="feed-search feed-sidebar-search"><Search size={15} /><input type="search" aria-label="Search your friends" placeholder="Search friends..." value={search} onChange={event => setSearch(event.target.value)} /></label>}
    <div className="feed-sidebar-friends-list">{visible.map(({ profile, connection }) => <div className="feed-friend-shortcut" key={profile.id}>
      <Avatar name={profile.name} memberId={profile.id} small /><span><strong>{profile.name}</strong><small>{profile.college || 'Campus member'}</small></span>
      {expanded && <button type="button" className="feed-icon-button" disabled={busy} title={`Remove ${publicMemberLabel(profile)} from friends`} aria-label={`Remove friend ${publicMemberLabel(profile)}`} onClick={() => act(() => removeConnection(user, connection), 'Friend removed.')}><X size={15} /></button>}
    </div>)}</div>
    {!friends.length && <p className="feed-side-empty">No friends yet.</p>}
    {expanded && friends.length > 0 && !visible.length && <p className="feed-side-empty">No matching friends.</p>}
    {friends.length > 0 && <button type="button" className="feed-quiet-button feed-view-all-friends" aria-expanded={expanded} onClick={() => { setExpanded(value => !value); setSearch(''); }}>{expanded ? 'Show fewer friends' : `View all friends (${friends.length})`}</button>}
  </section>;
}
