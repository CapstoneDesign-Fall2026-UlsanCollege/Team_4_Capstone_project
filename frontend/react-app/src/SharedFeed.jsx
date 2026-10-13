import { useEffect, useRef, useState } from "react";
import { ArrowLeft, CalendarDays, GraduationCap, House, MapPin, Pencil, Rss, Search, Trash2, UserRound } from "lucide-react";
import { Avatar, Composer, Modal } from "./Feed";
import { deleteSharedPost, editSharedPost, feedError, FEED_PAGE_SIZE, publishSharedPost, watchSharedPosts } from "./shared-feed-store";
import "./shared-feed.css";

export default function SharedFeed({ user }) {
  const [posts, setPosts] = useState([]);
  const [mine, setMine] = useState(false);
  const [query, setQuery] = useState("");
  const [college, setCollege] = useState("");
  const [connected, setConnected] = useState(false);
  const [online, setOnline] = useState(navigator.onLine);
  const [failure, setFailure] = useState("");
  const [busy, setBusy] = useState(false);
  const [notice, setNotice] = useState("");
  const [retry, setRetry] = useState(0);
  const [editing, setEditing] = useState(null);
  const [deleting, setDeleting] = useState(null);
  const locked = useRef(false);
  const alive = useRef(true);
  const ready = connected && online;
  useEffect(() => {
    alive.current = true;
    const updateOnline = () => setOnline(navigator.onLine);
    window.addEventListener("online", updateOnline);
    window.addEventListener("offline", updateOnline);
    return () => {
      alive.current = false;
      window.removeEventListener("online", updateOnline);
      window.removeEventListener("offline", updateOnline);
    };
  }, []);
  useEffect(() => {
    if (!notice) return;
    const timer = setTimeout(() => setNotice(""), 4000);
    return () => clearTimeout(timer);
  }, [notice]);
  useEffect(() => {
    let active = true;
    setConnected(false);
    setPosts([]);
    setFailure("");
    const timeout = setTimeout(() => {
      if (active) setFailure("The shared feed has not connected to Firestore. Check your connection or ask the project administrator to finish setup.");
    }, 15000);
    let unsubscribe;
    try {
      unsubscribe = watchSharedPosts(user, mine, (items, metadata) => {
        if (!active) return;
        setPosts(items);
        setConnected(!metadata.fromCache);
        setCollege(value => value || items.find(post => post.authorId === user.id)?.college || "");
        if (!metadata.fromCache) { clearTimeout(timeout); setFailure(""); }
      }, message => {
        if (active) { clearTimeout(timeout); setConnected(false); setFailure(message); }
      });
    } catch (error) {
      clearTimeout(timeout);
      setFailure(feedError(error));
    }
    return () => { active = false; clearTimeout(timeout); unsubscribe?.(); };
  }, [user.id, mine, retry]);

  const act = async (operation, message) => {
    if (locked.current) return false;
    if (!ready) { setFailure("Connect to the shared feed before publishing changes."); return false; }
    locked.current = true;
    setBusy(true);
    setFailure("");
    try {
      await operation();
      if (alive.current) setNotice(message);
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
    const success = await act(() => publishSharedPost(user, value), "Your post is published.");
    if (success && alive.current) { setCollege(value.college); setMine(false); setQuery(""); }
    return success;
  };
  const visible = posts.filter(post => `${post.body} ${post.college} ${post.authorName} ${post.event?.title || ""}`.toLowerCase().includes(query.toLowerCase()));
  return <div className="feed-shell shared-feed-shell">
    <div className="feed-heading">
      <div><span className="feed-eyebrow"><Rss size={14} />ACROSS CAMPUSES</span><h1>Campus Vibe-Feed</h1></div>
      <label className="feed-search"><Search size={17} /><input type="search" aria-label="Search shared posts" placeholder="Search posts or colleges..." value={query} onChange={event => setQuery(event.target.value)} /></label>
    </div>
    <div className="shared-feed-status" role="status"><span className={ready ? "connected" : ""}>{ready ? "Online" : !online ? "Offline" : "Connecting"}</span>{!ready && busy && <span>Waiting for server confirmation</span>}</div>
    <div className="feed-layout shared-feed-layout">
      <aside className="feed-left">
        <div className="feed-current-user"><Avatar name={user.name} /><div><strong>{user.name}</strong><span>{college || "Your campus connection"}</span></div></div>
        <nav aria-label="Shared feed navigation">{[[false, "Latest posts", House], [true, "My posts", UserRound]].map(([own, title, Icon]) => <button key={title} type="button" className={mine === own ? "active" : ""} aria-current={mine === own ? "page" : undefined} onClick={() => { setMine(own); setQuery(""); }}><Icon size={19} /><span>{title}</span></button>)}</nav>
        <button type="button" className="feed-community-link" onClick={() => window.campusSwitchWorkspace("community")}><ArrowLeft size={16} />Back to Community</button>
      </aside>
      <div className="feed-timeline">
        {failure && <div className="feed-error" role="alert"><p>{failure}</p><button type="button" disabled={busy} onClick={() => setRetry(value => value + 1)}>Try again</button></div>}
        <Composer user={user} college={college} busy={busy || !ready} shared onPublish={publish} />
        <div className="feed-timeline-heading"><h2>{mine ? "My posts" : "Latest posts"}</h2><span className="shared-feed-count">{visible.length}{posts.length === FEED_PAGE_SIZE ? ` / latest ${FEED_PAGE_SIZE}` : ""}</span></div>
        {!ready && !posts.length && !failure && <p className="feed-loading" role="status">Connecting to the shared feed...</p>}
        {visible.map(post => <article className="feed-card feed-post shared-feed-post" key={post.id} data-shared-post={post.id}>
          <header className="feed-post-header"><Avatar name={post.authorName} /><div className="feed-post-identity"><strong>{post.authorName}</strong><span>{post.college}</span><time dateTime={post.createdAt ? new Date(post.createdAt).toISOString() : undefined}>{post.createdAt ? new Date(post.createdAt).toLocaleString() : "Sending..."}</time></div>
            {post.authorId === user.id && <div className="shared-post-tools"><button type="button" className="feed-icon-button" title="Edit post" aria-label="Edit post" disabled={busy || !ready} onClick={() => setEditing(post)}><Pencil size={16} /></button><button type="button" className="feed-icon-button" title="Delete post" aria-label="Delete post" disabled={busy || !ready} onClick={() => setDeleting(post)}><Trash2 size={16} /></button></div>}
          </header>
          {post.body && <p className="feed-post-body">{post.body}</p>}
          {post.event && <section className="feed-event-attachment"><CalendarDays size={22} /><div><h3>{post.event.title}</h3><p>{new Date(`${post.event.date}T12:00:00`).toLocaleDateString()} {post.event.time}</p><p><MapPin size={14} />{post.event.location}</p></div></section>}
        </article>)}
        {ready && !visible.length && <div className="feed-card feed-empty"><Rss size={28} /><h3>{query ? "No matching posts" : mine ? "No posts from you yet" : "No posts yet"}</h3></div>}
      </div>
      <aside className="feed-right shared-feed-right"><section className="feed-campus-note"><GraduationCap size={26} /><h2>Different campuses.<br />Shared good vibes.</h2></section></aside>
    </div>
    {notice && <div className="feed-notice" role="status">{notice}</div>}
    {editing && <Modal title="Edit post" onClose={() => { if (!busy) setEditing(null); }}><Composer key={editing.id} user={user} college={editing.college} initialPost={editing} shared busy={busy || !ready} onPublish={async value => { const success = await act(() => editSharedPost(user, editing, value), "Post updated."); if (success && alive.current) setEditing(null); return success; }} /></Modal>}
    {deleting && <Modal title="Delete this post?" onClose={() => { if (!busy) setDeleting(null); }}><p>This removes the post from the shared feed for everyone.</p><footer><button type="button" className="feed-quiet-button" disabled={busy} onClick={() => setDeleting(null)}>Keep post</button><button type="button" className="feed-danger-button" disabled={busy || !ready} onClick={async () => { const success = await act(() => deleteSharedPost(user, deleting), "Post deleted."); if (success && alive.current) setDeleting(null); }}>Delete post</button></footer></Modal>}
  </div>;
}
