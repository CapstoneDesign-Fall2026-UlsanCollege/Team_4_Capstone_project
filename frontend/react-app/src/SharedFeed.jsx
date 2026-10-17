import { useEffect, useRef, useState } from 'react';
import { ArrowLeft, ArrowRight, Bookmark, GraduationCap, House, MessageCircle, Rss, Search, UserRound, Users } from 'lucide-react';
import { Avatar, Composer, Modal } from './Feed';
import { deleteSharedPost, editSharedPost, feedError, FEED_PAGE_SIZE, publishSharedPost, watchSharedPosts } from './shared-feed-store';
import { ensureFeedProfile, saveFeedProfile, watchFeedProfile, watchFeedProfiles } from './shared-profile-store';
import MemberId from './MemberId';
import { watchConnections } from './shared-friends-store';
import { watchSavedPostContent, watchSavedPosts } from './shared-saved-store';
import SharedFriends from './SharedFriends';
import SharedPost from './SharedPost';
import SharedMessages from './SharedMessages';
import useMessageInbox from './use-message-inbox';
import './shared-feed.css';

export default function SharedFeed({ user }) {
  const [posts, setPosts] = useState([]);
  const [directory, setProfiles] = useState([]);
  const [extraProfiles, setExtraProfiles] = useState({});
  const [connections, setConnections] = useState([]);
  const [savedIds, setSavedIds] = useState([]);
  const [savedContent, setSavedContent] = useState({});
  const [view, setView] = useState('feed');
  const [filter, setFilter] = useState('all');
  const [query, setQuery] = useState('');
  const [college, setCollege] = useState('');
  const [connected, setConnected] = useState(false);
  const [online, setOnline] = useState(navigator.onLine);
  const [failure, setFailure] = useState('');
  const [busy, setBusy] = useState(false);
  const [notice, setNotice] = useState('');
  const [retry, setRetry] = useState(0);
  const [editing, setEditing] = useState(null);
  const [deleting, setDeleting] = useState(null);
  const [messageDrafts, setMessageDrafts] = useState({});
  const locked = useRef(false);
  const alive = useRef(true);
  const mine = view === 'mine';
  const ready = connected && online;
  const messaging = useMessageInbox(user, connections);
  const friends = connections.filter(item => item.status === 'accepted').map(item => item.members.find(id => id !== user.id));
  const incoming = connections.filter(item => item.status === 'pending' && item.recipientId === user.id);
  // Resolve contacts and exact member-ID searches even outside the first 100 directory entries.
  const searchedId = /^[A-Za-z0-9_-]{20,128}$/.test(query.trim()) ? query.trim() : '';
  const neededIds = [...new Set([user.id, ...connections.flatMap(item => item.members), ...posts.map(item => item.authorId), ...Object.values(savedContent).filter(Boolean).map(item => item.authorId), searchedId].filter(Boolean))].filter(id => !directory.some(item => item.id === id)).sort();
  const profiles = [...directory, ...neededIds.map(id => extraProfiles[id]).filter(Boolean)];
  useEffect(() => {
    let active = true;
    const stops = neededIds.map(id => watchFeedProfile(user, id, profile => {
      if (active) setExtraProfiles(current => ({ ...current, [id]: profile }));
    }, message => { if (active) setFailure(message); }));
    return () => { active = false; stops.forEach(stop => stop()); };
  }, [user.id, JSON.stringify(neededIds), retry]);
  useEffect(() => {
    alive.current = true;
    const updateOnline = () => setOnline(navigator.onLine);
    window.addEventListener('online', updateOnline);
    window.addEventListener('offline', updateOnline);
    return () => {
      alive.current = false;
      window.removeEventListener('online', updateOnline);
      window.removeEventListener('offline', updateOnline);
    };
  }, []);
  useEffect(() => {
    let active = true;
    const guarded = setter => value => { if (active) setter(value); };
    ensureFeedProfile(user).catch(error => { if (active) setFailure(feedError(error)); });
    const stops = [
      watchFeedProfiles(user, guarded(setProfiles), guarded(setFailure)),
      watchConnections(user, guarded(setConnections), guarded(setFailure)),
      watchSavedPosts(user, guarded(setSavedIds), guarded(setFailure)),
    ];
    return () => { active = false; stops.forEach(stop => stop()); };
  }, [user.id, user.name, retry]);
  useEffect(() => {
    const own = profiles.find(profile => profile.id === user.id);
    if (own) setCollege(own.college);
  }, [profiles, user.id]);
  useEffect(() => {
    let active = true;
    setSavedContent({});
    const stops = savedIds.map(id => watchSavedPostContent(user, id, post => {
      if (active) setSavedContent(current => ({ ...current, [id]: post }));
    }, message => { if (active) setFailure(message); }));
    return () => { active = false; stops.forEach(stop => stop()); };
  }, [user.id, savedIds]);
  useEffect(() => {
    if (!notice) return;
    const timer = setTimeout(() => setNotice(''), 4000);
    return () => clearTimeout(timer);
  }, [notice]);
  useEffect(() => {
    let active = true;
    setConnected(false);
    setPosts([]);
    setFailure('');
    const timeout = setTimeout(() => {
      if (active) setFailure('The shared feed has not connected. Check your connection and retry.');
    }, 15000);
    let unsubscribe;
    try {
      unsubscribe = watchSharedPosts(user, mine, (items, metadata) => {
        if (!active) return;
        setPosts(items);
        setConnected(!metadata.fromCache);
        if (!metadata.fromCache) { clearTimeout(timeout); setFailure(''); }
      }, message => {
        if (active) { clearTimeout(timeout); setConnected(false); setFailure(message); }
      });
    } catch (error) { clearTimeout(timeout); setFailure(feedError(error)); }
    return () => { active = false; clearTimeout(timeout); unsubscribe?.(); };
  }, [user.id, mine, retry]);

  const act = async (operation, message) => {
    if (locked.current) return false;
    if (!ready) { setFailure('Connect to the shared feed before making changes.'); return false; }
    locked.current = true;
    setBusy(true);
    setFailure('');
    try {
      await operation();
      if (alive.current && message) setNotice(message);
      return true;
    } catch (error) {
      if (alive.current) setFailure(feedError(error));
      return false;
    } finally {
      locked.current = false;
      if (alive.current) setBusy(false);
    }
  };
  const publish = async value => {
    const success = await act(async () => {
      await saveFeedProfile(user, value.college);
      await publishSharedPost(user, value);
    }, 'Your post is published.');
    if (success && alive.current) { setCollege(value.college); setView('feed'); setQuery(''); }
    return success;
  };
  const selectView = value => { setView(value); setQuery(''); };
  const updateMessageDraft = (id, value, submitted) => setMessageDrafts(current => {
    if (submitted !== undefined && current[id] !== submitted) return current;
    return { ...current, [id]: value };
  });
  const source = view === 'saved' ? savedIds.map(id => savedContent[id]).filter(Boolean) : posts;
  const visible = source.filter(post =>
    (view !== 'feed' || filter !== 'friends' || post.authorId === user.id || friends.includes(post.authorId)) &&
    [post.body, post.college, post.authorName, post.event?.title, post.event?.location].join(' ').toLowerCase().includes(query.toLowerCase()));
  const heading = { feed: 'Latest posts', mine: 'My posts', saved: 'Saved posts' }[view];
  return <div className="feed-shell shared-feed-shell">
    <div className="feed-heading">
      <div><span className="feed-eyebrow"><Rss size={14} />ACROSS CAMPUSES</span><h1>Campus Vibe-Feed</h1></div>
      <label className="feed-search"><Search size={17} /><input type="search" aria-label={view === 'messages' ? 'Search conversations' : view === 'friends' ? 'Search people' : 'Search shared posts'} placeholder={view === 'messages' ? 'Search conversations...' : view === 'friends' ? 'Search people or colleges...' : 'Search posts or colleges...'} value={query} onChange={event => setQuery(event.target.value)} /></label>
    </div>
    <div className="shared-feed-status" role="status"><span className={ready ? 'connected' : ''}>{ready ? 'Online' : !online ? 'Offline' : failure ? 'Unavailable' : 'Connecting'}</span>{!ready && busy && <span>Waiting for server confirmation</span>}</div>
    <div className={`feed-layout shared-feed-layout ${view === 'messages' ? 'is-messages' : ''}`}>
      <aside className="feed-left">
        <div className="feed-current-user"><Avatar name={user.name} memberId={user.id} /><div><strong>{user.name}</strong><span>{college || 'Your campus connection'}</span><MemberId uid={user.id} /></div></div>
        <nav aria-label="Shared feed navigation">{[['feed', 'Latest posts', House], ['friends', 'Friends', Users], ['messages', 'Messages', MessageCircle], ['saved', 'Saved posts', Bookmark], ['mine', 'My posts', UserRound]].map(([id, title, Icon]) => <button key={id} type="button" aria-label={title} aria-describedby={id === 'messages' && messaging.unreadCount > 0 ? 'feed-messages-unread' : undefined} className={view === id ? 'active' : ''} aria-current={view === id ? 'page' : undefined} onClick={() => selectView(id)}><Icon size={19} /><span>{title}</span>{id === 'friends' && incoming.length > 0 && <span className="feed-nav-badge">{incoming.length}</span>}{id === 'messages' && messaging.unreadCount > 0 && <span id="feed-messages-unread" className="feed-nav-badge" aria-label={`${messaging.unreadCount} unread conversations`}>{messaging.unreadCount}</span>}</button>)}</nav>
        <button type="button" className="feed-community-link" onClick={() => window.campusSwitchWorkspace('community')}><ArrowLeft size={16} />Back to Community</button>
      </aside>
      <div className="feed-timeline">
        {failure && <div className="feed-error" role="alert"><p>{failure}</p><button type="button" disabled={busy} onClick={() => setRetry(value => value + 1)}>Try again</button></div>}
        {view === 'messages' ? <SharedMessages user={user} profiles={profiles} connections={connections} query={query} ready={ready} drafts={messageDrafts} onDraft={updateMessageDraft} {...messaging} /> : view === 'friends' ? <SharedFriends user={user} profiles={profiles} connections={connections} query={query} busy={busy || !ready} act={act} /> : <>
          {view !== 'saved' && <Composer user={user} college={college} busy={busy} disabled={!ready} shared onPublish={publish} />}
          <div className="feed-timeline-heading"><h2>{heading}</h2><span className="shared-feed-count">{visible.length}{view !== 'saved' && posts.length === FEED_PAGE_SIZE ? ' / latest 50' : ''}</span></div>
          {view === 'feed' && <div className="feed-filter-tabs" role="group" aria-label="Post audience"><button type="button" aria-pressed={filter === 'all'} className={filter === 'all' ? 'active' : ''} onClick={() => setFilter('all')}>All posts</button><button type="button" aria-pressed={filter === 'friends'} className={filter === 'friends' ? 'active' : ''} onClick={() => setFilter('friends')}>Friends</button></div>}
          {!ready && !posts.length && !failure && <p className="feed-loading" role="status">Connecting to the shared feed...</p>}
          {visible.map(post => <SharedPost key={post.id} post={post} user={user} saved={savedIds.includes(post.id)} busy={busy || !ready} act={act} fail={setFailure} onEdit={setEditing} onDelete={setDeleting} />)}
          {ready && !visible.length && <div className="feed-card feed-empty"><Rss size={28} /><h3>{query ? 'No matching posts' : view === 'saved' ? 'No saved posts yet' : view === 'mine' ? 'No posts from you yet' : filter === 'friends' ? 'No posts from your friends yet' : 'No posts yet'}</h3></div>}
        </>}
      </div>
      <aside className="feed-right">
        <section className="feed-card"><div className="feed-section-heading"><h2>Your friends</h2><button type="button" aria-label="View friends" title="View friends" onClick={() => selectView('friends')}><Users size={17} /></button></div>
          {friends.map(id => { const profile = profiles.find(item => item.id === id); return <button type="button" className="feed-friend-shortcut" key={id} onClick={() => selectView('friends')}><Avatar name={profile?.name || 'Student'} memberId={id} small /><span><strong>{profile?.name || 'Student'}</strong><small>{profile?.college || 'Campus member'}</small><MemberId uid={id} /></span></button>; })}
          {!friends.length && <p className="feed-side-empty">No friends yet.</p>}
        </section>
        <section className="feed-card feed-campus-note"><span className="feed-note-icon"><GraduationCap size={24} /></span><h2>Different campuses.<br />Shared good vibes.</h2><button type="button" className="feed-quiet-button" onClick={() => selectView('friends')}>Find people<ArrowRight size={14} /></button></section>
      </aside>
    </div>
    {notice && <div className="feed-notice" role="status">{notice}</div>}
    {editing && <Modal title="Edit post" onClose={() => { if (!busy) setEditing(null); }}><Composer key={editing.id} user={user} college={editing.college} initialPost={editing} shared busy={busy} disabled={!ready} onPublish={async value => { const success = await act(() => editSharedPost(user, editing, value), 'Post updated.'); if (success && alive.current) setEditing(null); return success; }} /></Modal>}
    {deleting && <Modal title="Delete this post?" onClose={() => { if (!busy) setDeleting(null); }}><p>This removes the post from the shared feed for everyone.</p><footer><button type="button" className="feed-quiet-button" disabled={busy} onClick={() => setDeleting(null)}>Keep post</button><button type="button" className="feed-danger-button" disabled={busy || !ready} onClick={async () => { const success = await act(() => deleteSharedPost(user, deleting), 'Post deleted.'); if (success && alive.current) setDeleting(null); }}>Delete post</button></footer></Modal>}
  </div>;
}
