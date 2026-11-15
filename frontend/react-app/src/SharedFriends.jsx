import { useState } from 'react';
import { Check, ChevronLeft, ChevronRight, Search, UserPlus, Users, X } from 'lucide-react';
import { Avatar } from './Feed';
import { acceptFriend, removeConnection, requestFriend } from './shared-friends-store';
import { matchesPublicMember, publicMemberLabel } from './member-identity';

const PAGE_SIZE = 10;

export default function SharedFriends({ user, profiles, connections, query, busy, act, initialTab = 'discover', onTabChange }) {
  const [tab, setTab] = useState(initialTab === 'requests' ? 'requests' : 'discover');
  const [search, setSearch] = useState('');
  const [pagination, setPagination] = useState({ key: '', page: 1 });
  const byMember = new Map(connections.map(item => [item.members.find(id => id !== user.id), item]));
  const pending = connections.filter(item => item.status === 'pending');
  const term = search || query;
  const candidates = tab === 'discover'
    ? profiles.filter(profile => profile.id !== user.id && !byMember.has(profile.id))
    : pending.map(item => {
      const id = item.members.find(value => value !== user.id);
      return profiles.find(profile => profile.id === id) || { id, name: 'Student', college: 'Campus member' };
    });
  const people = candidates.filter(profile => matchesPublicMember(profile, term)).sort((a, b) => a.name.localeCompare(b.name) || a.id.localeCompare(b.id));
  const pageKey = `${tab}:${term}`;
  const totalPages = Math.max(1, Math.ceil(people.length / PAGE_SIZE));
  const page = Math.min(pagination.key === pageKey ? pagination.page : 1, totalPages);
  const changePage = value => setPagination({ key: pageKey, page: value });
  const selectTab = value => { setTab(value); setSearch(''); onTabChange?.(value); };
  return <section className="feed-card feed-friends-view">
    <div className="feed-section-heading"><h2>Find people across campuses</h2></div>
    <p className="feed-friends-intro">Meet new people from your campus and beyond.</p>
    <div className="feed-filter-tabs feed-people-tabs" role="group" aria-label="People views">
      {[['discover', 'Find people', null], ['requests', 'Requests', pending.length]].map(([id, label, count]) => <button key={id} type="button" className={tab === id ? 'active' : ''} aria-pressed={tab === id} onClick={() => selectTab(id)}>{label}{count !== null && <span>{count}</span>}</button>)}
    </div>
    <label className="feed-search feed-people-search"><Search size={17} /><input type="search" aria-label={tab === 'requests' ? 'Search friend requests' : 'Search people'} placeholder={'Search names or colleges...'} value={term} onChange={event => { setSearch(event.target.value); onTabChange?.(tab); }} /></label>
    <div className="feed-people-grid">{people.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE).map(profile => {
      const connection = byMember.get(profile.id);
      const received = connection?.status === 'pending' && connection.recipientId === user.id;
      return <article className="feed-person" key={profile.id} data-person="" data-friend-request={received ? '' : undefined}>
        <Avatar name={profile.name} memberId={profile.id} /><h3>{profile.name}</h3><p>{profile.college || 'Campus member'}{tab === 'requests' && <small className="feed-request-direction">{received ? 'Wants to be your friend' : 'Request sent'}</small>}</p>
        <div className="feed-person-actions"><button type="button" className="feed-friend-button" disabled={busy} aria-label={received ? `Accept request from ${publicMemberLabel(profile)}` : undefined} onClick={() => act(() => received ? acceptFriend(user, connection) : connection ? removeConnection(user, connection) : requestFriend(user, profile.id), received ? 'Friend request accepted.' : connection ? 'Request cancelled.' : 'Friend request sent.')}>
          {received ? <Check size={15} /> : <UserPlus size={15} />}{received ? 'Accept request' : connection ? 'Cancel request' : 'Add friend'}
        </button>{received && <button type="button" className="feed-quiet-button" disabled={busy} aria-label={`Decline request from ${publicMemberLabel(profile)}`} onClick={() => act(() => removeConnection(user, connection), 'Friend request declined.')}><X size={15} />Decline</button>}</div>
      </article>;
    })}</div>
    {!people.length && <div className="feed-empty"><Users size={28} /><h3>{term ? 'No matching people' : tab === 'requests' ? 'No pending requests' : 'You’re all caught up'}</h3><p>{term ? 'Try another name or college.' : tab === 'requests' ? 'New invitations and requests you send will appear here.' : 'Check back for more campus members.'}</p></div>}
    {people.length > 0 && <nav className="feed-people-pagination" aria-label="People pages"><span role="status">{(page - 1) * PAGE_SIZE + 1}–{Math.min(page * PAGE_SIZE, people.length)} of {people.length}</span><div><button type="button" aria-label="Previous people page" disabled={page === 1} onClick={() => changePage(page - 1)}><ChevronLeft size={17} /></button><span>Page {page} of {totalPages}</span><button type="button" aria-label="Next people page" disabled={page === totalPages} onClick={() => changePage(page + 1)}><ChevronRight size={17} /></button></div></nav>}
  </section>;
}
