import { Check, UserPlus, Users, X } from 'lucide-react';
import { Avatar } from './Feed';
import { acceptFriend, removeConnection, requestFriend } from './shared-friends-store';
import MemberId from './MemberId';
import { memberLabel } from './profile-photo';

export default function SharedFriends({ user, profiles, connections, query, busy, act }) {
  const people = profiles.filter(profile => profile.id !== user.id && `${profile.name} ${profile.college} ${profile.id}`.toLowerCase().includes(query.toLowerCase()));
  const incoming = connections.filter(item => item.status === 'pending' && item.recipientId === user.id);
  return <section className="feed-card feed-friends-view">
    <div className="feed-section-heading"><h2>Friends across campuses</h2><span>{connections.filter(item => item.status === 'accepted').length} friends</span></div>
    {incoming.length > 0 && <div className="feed-friend-requests"><h3>Friend requests</h3>{incoming.map(item => {
      const profile = profiles.find(value => value.id === item.senderId);
      return <div className="feed-request" key={item.id} data-connection={item.id}><Avatar name={profile?.name || 'Student'} memberId={item.senderId} small /><span><strong>{profile?.name || 'Student'}</strong><MemberId uid={item.senderId} /><small>{profile?.college || 'Campus member'}</small></span><button type="button" disabled={busy} title="Accept request" aria-label={`Accept request from ${memberLabel(profile?.name, item.senderId)}`} onClick={() => act(() => acceptFriend(user, item), 'Friend request accepted.')}><Check size={16} /></button><button type="button" disabled={busy} title="Decline request" aria-label={`Decline request from ${memberLabel(profile?.name, item.senderId)}`} onClick={() => act(() => removeConnection(user, item), 'Friend request declined.')}><X size={16} /></button></div>;
    })}</div>}
    <div className="feed-people-grid">{people.map(profile => {
      const connection = connections.find(item => item.members.includes(profile.id));
      const accepted = connection?.status === 'accepted';
      const received = connection?.status === 'pending' && connection.recipientId === user.id;
      return <article className="feed-person" key={profile.id} data-person={profile.id}><Avatar name={profile.name} memberId={profile.id} /><h3>{profile.name}</h3><p>{profile.college || 'Campus member'}<MemberId uid={profile.id} /></p><button type="button" className={`feed-friend-button ${accepted ? 'connected' : ''}`} disabled={busy} onClick={() => act(() => received ? acceptFriend(user, connection) : connection ? removeConnection(user, connection) : requestFriend(user, profile.id), received ? 'Friend request accepted.' : accepted ? 'Friend removed.' : connection ? 'Request cancelled.' : 'Friend request sent.')}>
        {accepted ? <Check size={15} /> : <UserPlus size={15} />}{received ? 'Accept request' : accepted ? 'Remove friend' : connection ? 'Cancel request' : 'Add friend'}
      </button></article>;
    })}</div>
    {!people.length && <div className="feed-empty"><Users size={28} /><h3>{query ? 'No matching people' : 'No other campus profiles yet'}</h3></div>}
  </section>;
}
