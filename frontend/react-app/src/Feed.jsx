import { useEffect, useRef, useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  ArrowUp,
  Bookmark,
  CalendarDays,
  Check,
  ChevronLeft,
  ChevronRight,
  Copy,
  GraduationCap,
  Heart,
  House,
  ImagePlus,
  MapPin,
  MessageCircle,
  MoreHorizontal,
  Pencil,
  Rss,
  Search,
  Send,
  Trash2,
  UserPlus,
  Users,
  X,
} from "lucide-react";
import { loadFeed, PEOPLE, preparePhoto, saveFeed } from "./feed-store";
import "./feed.css";
import { useProfilePhoto } from './profile-photo-store';
import MemberId from './MemberId';
import { feedPhotoMedia, prepareFeedPhoto } from './feed-photo';

const initials = (name) =>
  name
    .split(/\s+/)
    .filter(Boolean)
    .map((word) => word[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
const person = (id) => PEOPLE.find((item) => item.id === id);
const dateLabel = (value) =>
  new Date(value).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
  });
const relativeTime = (value) => {
  const minutes = Math.max(0, Math.floor((Date.now() - value) / 60000));
  return minutes < 1
    ? "Just now"
    : minutes < 60
      ? `${minutes}m ago`
      : minutes < 1440
        ? `${Math.floor(minutes / 60)}h ago`
        : dateLabel(value);
};

export function Avatar({ name = 'Student', color = "#9167cd", small = false, memberId }) {
  const { photo } = useProfilePhoto(memberId);
  const [broken, setBroken] = useState('');
  return (
    <span
      className={`feed-avatar ${small ? "small" : ""}`}
      style={{ "--avatar-color": color }}
      aria-hidden="true"
    >
      {photo && broken !== photo ? <img src={photo} alt="" onError={() => setBroken(photo)} /> : initials(name)}
    </span>
  );
}

export function Photo({ media, onOpen }) {
  const [source, setSource] = useState(media.src || "");
  useEffect(() => {
    if (!media.blob) {
      setSource(media.src || "");
      return;
    }
    const url = URL.createObjectURL(media.blob);
    setSource(url);
    return () => URL.revokeObjectURL(url);
  }, [media.blob, media.src]);
  const image = (
    <img
      src={source || undefined}
      alt={media.alt || "Shared campus photo"}
      loading="lazy"
      width={media.width}
      height={media.height}
    />
  );
  return onOpen ? (
    <button
      type="button"
      className="feed-photo"
      onClick={onOpen}
      aria-label={`Open photo: ${media.alt || "Campus photo"}`}
    >
      {image}
    </button>
  ) : (
    image
  );
}

export function Modal({ title, children, onClose, className = "" }) {
  const ref = useRef(null);
  useEffect(() => {
    const dialog = ref.current;
    if (!dialog.open) dialog.showModal();
    return () => {
      if (dialog.open) dialog.close();
    };
  }, []);
  return (
    <dialog
      ref={ref}
      className={`feed-dialog ${className}`}
      aria-label={title}
      onCancel={(event) => {
        event.preventDefault();
        onClose();
      }}
      onClick={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <header>
        <h2>{title}</h2>
        <button
          type="button"
          className="feed-icon-button"
          title="Close"
          aria-label="Close"
          onClick={onClose}
        >
          <X size={19} />
        </button>
      </header>
      {children}
    </dialog>
  );
}

export function Composer({ user, college, busy, disabled = false, onPublish, shared = false, initialPost = null }) {
  const blocked = busy || disabled;
  const [body, setBody] = useState(initialPost?.body || "");
  const [campus, setCampus] = useState(initialPost?.college || college);
  useEffect(() => {
    if (!initialPost) setCampus(current => current || college);
  }, [college, initialPost]);
  const [photos, setPhotos] = useState(() => shared ? feedPhotoMedia(initialPost?.photo) : []);
  const [withEvent, setWithEvent] = useState(!!initialPost?.event);
  const [event, setEvent] = useState(initialPost?.event || {
    title: "",
    date: "",
    time: "",
    location: "",
  });
  const [preparing, setPreparing] = useState(false);
  const [error, setError] = useState("");
  const fileInput = useRef(null);
  const attachmentLock = useRef(false);
  const submitLock = useRef(false);
  const alive = useRef(true);
  useEffect(() => {
    alive.current = true;
    return () => {
      alive.current = false;
    };
  }, []);
  useEffect(() => {
    if (college) setCampus(college);
  }, [college]);
  const attach = async (files) => {
    if (attachmentLock.current || blocked || !files.length) return;
    setError("");
    if (files.length + photos.length > (shared ? 1 : 4)) {
      setError(shared ? 'Add one photo per shared post.' : "You can add up to four photos to one post.");
      return;
    }
    attachmentLock.current = true;
    setPreparing(true);
    try {
      const prepared = await Promise.all(files.map(shared ? prepareFeedPhoto : preparePhoto));
      if (alive.current) setPhotos((current) => [...current, ...prepared]);
    } catch (failure) {
      if (alive.current) setError(failure.message);
    } finally {
      attachmentLock.current = false;
      if (alive.current) setPreparing(false);
    }
  };
  const submit = async (submission) => {
    submission.preventDefault();
    if (submitLock.current || attachmentLock.current || blocked) return;
    setError("");
    if (!body.trim() && !photos.length && !(shared && withEvent)) {
      setError(shared ? "Add post text, a photo, or an event before publishing." : "Add a thought or a photo before posting.");
      return;
    }
    if (!campus.trim()) {
      setError("Add your college so people know where your post is from.");
      return;
    }
    if (
      withEvent &&
      (!event.title.trim() || !event.date || !event.location.trim())
    ) {
      setError("Add an event name, date, and location.");
      return;
    }
    submitLock.current = true;
    let published;
    try { published = await onPublish({
      body: body.trim(),
      college: campus.trim(),
      images: photos,
      event: withEvent
        ? {
            ...event,
            title: event.title.trim(),
            location: event.location.trim(),
          }
        : null,
    }); } catch (failure) { setError(failure.message || 'Your post was not published. Please retry.'); }
    finally { submitLock.current = false; }
    if (published) {
      setBody("");
      setPhotos([]);
      setWithEvent(false);
      setEvent({ title: "", date: "", time: "", location: "" });
    }
  };
  return (
    <form className="feed-card feed-composer" onSubmit={submit}>
      <div className="feed-composer-heading">
        <Avatar name={user.name} memberId={shared ? user.id : undefined} />
        <div>
          <strong>{user.name}</strong>
          <span>{initialPost ? "Edit post" : "Share a campus moment"}</span>
        </div>
        <span className="feed-device-label">{shared ? "Shared" : "On this device"}</span>
      </div>
      <textarea
        aria-label="Post text"
        disabled={blocked}
        placeholder={`What's happening around your campus, ${user.name.split(" ")[0]}?`}
        value={body}
        onChange={(event) => setBody(event.target.value)}
        maxLength={2000}
        rows={3}
      />
      <label className="feed-campus-input">
        <GraduationCap size={17} />
        <input
          aria-label="Your college"
          disabled={blocked}
          placeholder="Your college or university"
          value={campus}
          onChange={(event) => setCampus(event.target.value)}
          maxLength={100}
        />
      </label>
      {withEvent && (
        <fieldset className="feed-event-fields" disabled={blocked}>
          <legend>Event details</legend>
          <label>
            Event name
            <input
              value={event.title}
              onChange={(change) =>
                setEvent({ ...event, title: change.target.value })
              }
              maxLength={100}
            />
          </label>
          <label>
            Date
            <input
              type="date"
              value={event.date}
              onChange={(change) =>
                setEvent({ ...event, date: change.target.value })
              }
            />
          </label>
          <label>
            Time
            <input
              type="time"
              value={event.time}
              onChange={(change) =>
                setEvent({ ...event, time: change.target.value })
              }
            />
          </label>
          <label>
            Location
            <input
              value={event.location}
              onChange={(change) =>
                setEvent({ ...event, location: change.target.value })
              }
              maxLength={120}
            />
          </label>
        </fieldset>
      )}
      {!!photos.length && (
        <div className="feed-attachment-previews">
          {photos.map((photo, index) => (
            <div key={photo.id}>
              <Photo media={photo} />
              {!(shared && initialPost) && <button
                type="button"
                className="feed-icon-button"
                title="Remove photo"
                aria-label={`Remove photo ${index + 1}`}
                disabled={blocked || preparing}
                onClick={() =>
                  setPhotos(photos.filter((item) => item.id !== photo.id))
                }
              >
                <X size={15} />
              </button>}
            </div>
          ))}
        </div>
      )}
      {preparing && (
        <p className="feed-form-status" role="status">
          Preparing your photos...
        </p>
      )}
      {error && (
        <p className="feed-form-error" role="alert">
          {error}
        </p>
      )}
      <footer>
        <div>
          <button
            type="button"
            className="feed-composer-action"
            disabled={blocked || preparing || (shared && (!!initialPost || photos.length > 0))}
            title={shared && initialPost ? 'Photos cannot be changed after publishing' : shared ? 'Attach one JPG, PNG, or WebP photo' : 'Attach photos'}
            onClick={() => fileInput.current.click()}
          >
            <ImagePlus size={18} />
            <span>Photos</span>
          </button>
          <button
            type="button"
            className="feed-composer-action event"
            aria-pressed={withEvent}
            disabled={blocked}
            onClick={() => setWithEvent(!withEvent)}
          >
            <CalendarDays size={18} />
            <span>Event</span>
          </button>
        </div>
        <input
          ref={fileInput}
          type="file"
          aria-label="Attach photos"
          accept={shared ? 'image/jpeg,image/png,image/webp' : 'image/jpeg,image/png,image/webp,image/gif'}
          multiple={!shared}
          disabled={blocked || preparing || (shared && !!initialPost)}
          hidden
          onChange={(event) => {
            attach(Array.from(event.target.files));
            event.target.value = "";
          }}
        />
        <button
          className="feed-primary-button"
          type="submit"
          disabled={blocked || preparing}
        >
          {busy ? (initialPost ? "Saving..." : "Posting...") : (initialPost ? "Save changes" : "Post")}
          <Send size={15} />
        </button>
      </footer>
    </form>
  );
}

export function Post({
  post,
  user,
  busy,
  onChange,
  onEdit,
  onDelete,
  onPhoto,
  onCopy,
  shared = false,
}) {
  const [showComments, setShowComments] = useState(false);
  const [comment, setComment] = useState("");
  const [commentPending, setCommentPending] = useState(false);
  const [commentFailure, setCommentFailure] = useState('');
  const commentRevision = useRef(0);
  const commentLock = useRef(false);
  const profile = person(post.authorId);
  const liked = post.likes.includes(user.id);
  const saved = post.savedBy.includes(user.id);
  const toggle = (field) =>
    onChange((current) => ({
      ...current,
      [field]: current[field].includes(user.id)
        ? current[field].filter((id) => id !== user.id)
        : [...current[field], user.id],
    }));
  return (
    <article className="feed-card feed-post" data-feed-post={post.id} data-shared-post={shared ? post.id : undefined}>
      <header>
        <Avatar name={post.authorName} color={profile?.color} memberId={shared ? post.authorId : undefined} />
        <div className="feed-post-identity">
          <strong>{post.authorName}</strong>
          {shared && <MemberId uid={post.authorId} />}
          <span>
            {post.college} <span aria-hidden="true">·</span>{" "}
            <time dateTime={new Date(post.createdAt).toISOString()}>
              {relativeTime(post.createdAt)}
            </time>
          </span>
        </div>
        <button
          type="button"
          className={`feed-icon-button ${saved ? "selected" : ""}`}
          aria-label={saved ? "Unsave post" : "Save post"}
          title={saved ? "Unsave post" : "Save post"}
          aria-pressed={saved}
          disabled={busy}
          onClick={() => toggle("savedBy")}
        >
          <Bookmark size={19} />
        </button>
        <details className="feed-post-menu">
          <summary aria-label="Post options" title="Post options">
            <MoreHorizontal size={20} />
          </summary>
          <div>
            <button
              type="button"
              onClick={(event) => {
                event.currentTarget.closest("details").open = false;
                onCopy(post);
              }}
            >
              <Copy size={15} />
              Copy post text
            </button>
            {post.authorId === user.id && (
              <>
                <button
                  type="button"
                  disabled={shared && !!post.deleting}
                  onClick={(event) => {
                    event.currentTarget.closest("details").open = false;
                    onEdit(post);
                  }}
                >
                  <Pencil size={15} />
                  {shared ? 'Edit post' : 'Edit text'}
                </button>
                <button
                  type="button"
                  onClick={(event) => {
                    event.currentTarget.closest("details").open = false;
                    onDelete(post);
                  }}
                >
                  <Trash2 size={15} />
                  Delete post
                </button>
              </>
            )}
          </div>
        </details>
      </header>
      {post.body && <p className="feed-post-body">{post.body}</p>}
      {shared && post.deleting && <p className="feed-loading" role="status">Deletion pending</p>}
      {!!post.images.length && (
        <div className="feed-post-photos" data-count={post.images.length}>
          {post.images.map((media, index) => (
            <Photo
              key={media.id}
              media={media}
              onOpen={() => onPhoto({ images: post.images, index })}
            />
          ))}
        </div>
      )}
      {post.event && (
        <div className="feed-event-attachment">
          <span className="feed-event-date">
            <CalendarDays size={19} />
            <strong>{dateLabel(`${post.event.date}T00:00:00`)}</strong>
          </span>
          <div>
            <h3>{post.event.title}</h3>
            <p>
              <MapPin size={13} />
              {post.event.location}
              {post.event.time && ` · ${post.event.time}`}
            </p>
          </div>
        </div>
      )}
      <div className="feed-post-counts">
        <span>
          {post.likes.length ? (
            <>
              <Heart size={13} />
              {post.likes.length} {post.likes.length === 1 ? "like" : "likes"}
            </>
          ) : (
            "Be the first to like this"
          )}
        </span>
        <button type="button" onClick={() => setShowComments(!showComments)}>
          {post.comments.length}{" "}
          {post.comments.length === 1 ? "comment" : "comments"}
        </button>
      </div>
      <div className="feed-post-actions">
        <button
          type="button"
          className={liked ? "is-liked" : ""}
          aria-pressed={liked}
          disabled={busy}
          onClick={() => toggle("likes")}
        >
          <Heart size={18} />
          {liked ? "Liked" : "Like"}
        </button>
        <button
          type="button"
          aria-expanded={showComments}
          onClick={() => setShowComments(!showComments)}
        >
          <MessageCircle size={18} />
          Comment
        </button>
        {post.event && (
          <button
            type="button"
            className={post.interested.includes(user.id) ? "is-interested" : ""}
            aria-pressed={post.interested.includes(user.id)}
            disabled={busy}
            onClick={() => toggle("interested")}
          >
            <Check size={17} />
            {post.interested.includes(user.id) ? "Interested" : "Interested?"}
          </button>
        )}
      </div>
      {showComments && (
        <section className="feed-comments" aria-label="Comments">
          {post.comments.map((item) => (
            <div className="feed-comment" key={item.id}>
              <Avatar
                name={item.name}
                color={person(item.authorId)?.color}
                memberId={shared ? item.authorId : undefined}
                small
              />
              <div>
                <strong>{item.name}</strong>
                {shared && <MemberId uid={item.authorId} />}
                <p>{item.body}</p>
              </div>
              {(item.authorId === user.id || (shared && post.authorId === user.id)) && (
                <button
                  type="button"
                  className="feed-icon-button"
                  aria-label="Delete comment"
                  title="Delete comment"
                  disabled={busy}
                  onClick={() =>
                    onChange((current) => ({
                      ...current,
                      comments: current.comments.filter(
                        (value) => value.id !== item.id,
                      ),
                    }))
                  }
                >
                  <X size={13} />
                </button>
              )}
            </div>
          ))}
          <form
            onSubmit={async (event) => {
              event.preventDefault();
              if (busy || commentLock.current || !comment.trim()) return;
              commentLock.current = true;
              setCommentPending(true);
              setCommentFailure('');
              const revision = commentRevision.current;
              const text = comment.trim();
              try {
                const changed = await onChange((current) => ({
                  ...current,
                  comments: [
                    ...current.comments,
                    {
                      id: crypto.randomUUID(),
                      authorId: user.id,
                      name: user.name,
                      body: text,
                      createdAt: Date.now(),
                    },
                  ],
                }));
                if (changed && revision === commentRevision.current) setComment('');
              } catch (error) {
                setCommentFailure(error.message || 'Could not send your comment. Your draft is unchanged.');
              } finally {
                commentLock.current = false;
                setCommentPending(false);
              }
            }}
          >
            <Avatar name={user.name} memberId={shared ? user.id : undefined} small />
            <input
              aria-label="Write a comment"
              placeholder="Write a comment..."
              value={comment}
              onChange={(event) => { commentRevision.current += 1; setComment(event.target.value); }}
              disabled={shared && !!post.deleting}
              maxLength={500}
              required
            />
            <button
              type="submit"
              className="feed-icon-button"
              aria-label="Send comment"
              title="Send comment"
              disabled={busy || commentPending || !comment.trim()}
            >
              <ArrowUp size={18} />
            </button>
          </form>
          {commentFailure && <p className="feed-error" role="alert">{commentFailure}</p>}
        </section>
      )}
    </article>
  );
}

function Friends({ data, query, busy, onChange }) {
  const profiles = PEOPLE.filter((profile) =>
    `${profile.name} ${profile.college}`
      .toLowerCase()
      .includes(query.toLowerCase()),
  );
  return (
    <section className="feed-card feed-friends-view">
      <header>
        <h2>Friends across campuses</h2>
        <span>{data.friends.length} friends</span>
      </header>
      {!!data.incoming.length && (
        <div className="feed-friend-requests">
          <h3>Friend requests</h3>
          {data.incoming.map((id) => {
            const profile = person(id);
            return (
              <div className="feed-person" key={id}>
                <Avatar name={profile.name} color={profile.color} />
                <div>
                  <strong>{profile.name}</strong>
                  <span>{profile.college}</span>
                </div>
                <div className="feed-request-actions">
                  <button
                    type="button"
                    className="feed-primary-button"
                    disabled={busy}
                    onClick={() =>
                      onChange((current) => ({
                        ...current,
                        incoming: current.incoming.filter(
                          (value) => value !== id,
                        ),
                        friends: [...new Set([...current.friends, id])],
                      }))
                    }
                  >
                    Accept
                  </button>
                  <button
                    type="button"
                    className="feed-quiet-button"
                    disabled={busy}
                    onClick={() =>
                      onChange((current) => ({
                        ...current,
                        incoming: current.incoming.filter(
                          (value) => value !== id,
                        ),
                      }))
                    }
                  >
                    Decline
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
      <h3>People you may know</h3>
      {profiles.map((profile) => {
        const friend = data.friends.includes(profile.id),
          pending = data.outgoing.includes(profile.id);
        return (
          <div className="feed-person" key={profile.id}>
            <Avatar name={profile.name} color={profile.color} />
            <div>
              <strong>{profile.name}</strong>
              <span>{profile.college}</span>
              <small>{profile.interest}</small>
            </div>
            <button
              type="button"
              className={`feed-friend-button ${friend ? "connected" : ""}`}
              disabled={busy}
              onClick={() =>
                onChange((current) =>
                  friend
                    ? {
                        ...current,
                        friends: current.friends.filter(
                          (id) => id !== profile.id,
                        ),
                      }
                    : pending
                      ? {
                          ...current,
                          outgoing: current.outgoing.filter(
                            (id) => id !== profile.id,
                          ),
                        }
                      : {
                          ...current,
                          outgoing: [...current.outgoing, profile.id],
                        },
                )
              }
            >
              {friend ? <Check size={15} /> : <UserPlus size={15} />}
              <span>
                {friend ? "Friends" : pending ? "Cancel request" : "Add friend"}
              </span>
            </button>
          </div>
        );
      })}
      {!profiles.length && (
        <p className="feed-empty">No people match your search.</p>
      )}
    </section>
  );
}

export default function Feed({ user, notification }) {
  const [data, setData] = useState(null);
  const [view, setView] = useState("home");
  const [filter, setFilter] = useState("all");
  const [query, setQuery] = useState("");
  const [busy, setBusy] = useState(false);
  const [failure, setFailure] = useState("");
  const [notice, setNotice] = useState("");
  const [photos, setPhotos] = useState(null);
  const [editing, setEditing] = useState(null);
  const [deleting, setDeleting] = useState(null);
  const current = useRef(null);
  const locked = useRef(false);
  const alive = useRef(true);
  const noticeTimer = useRef(null);
  useEffect(() => {
    if (notification?.userId === user.id && notification.item.workspace === 'feed') { setView('mine'); setFilter('all'); setQuery(''); }
  }, [notification?.requestId, user.id]);
  useEffect(() => {
    if (view !== 'mine' || !notification?.item || !data) return;
    const element = document.querySelector(`[data-feed-post="${CSS.escape(notification.item.sourceId)}"]`);
    if (element) { element.tabIndex = -1; element.scrollIntoView({ block: 'center' }); element.focus({ preventScroll: true }); }
  }, [view, data, notification?.requestId]);
  const notify = (message) => {
    setNotice(message);
    clearTimeout(noticeTimer.current);
    noticeTimer.current = setTimeout(() => setNotice(""), 3500);
  };
  const reload = async () => {
    setFailure("");
    try {
      const loaded = await loadFeed(user.id);
      if (alive.current) {
        current.current = loaded;
        setData(loaded);
      }
    } catch (error) {
      if (alive.current) setFailure(error.message);
    }
  };
  useEffect(() => {
    alive.current = true;
    reload();
    return () => {
      alive.current = false;
      clearTimeout(noticeTimer.current);
    };
  }, [user.id]);
  const change = async (update) => {
    if (locked.current || !current.current) return false;
    locked.current = true;
    setBusy(true);
    setFailure("");
    try {
      const next = update(current.current);
      await saveFeed(user.id, next);
      if (alive.current) {
        current.current = next;
        setData(next);
      }
      return true;
    } catch (error) {
      if (alive.current) setFailure(error.message);
      return false;
    } finally {
      locked.current = false;
      if (alive.current) setBusy(false);
    }
  };
  const changePost = (id, update) =>
    change((state) => ({
      ...state,
      posts: state.posts.map((post) => (post.id === id ? update(post) : post)),
    }));
  const selectView = (value) => {
    setView(value);
    setQuery("");
  };
  const publish = async (value) => {
    const postId = crypto.randomUUID();
    const published = await change((state) => ({
      ...state,
      college: value.college,
      posts: [
        {
          ...value,
          id: postId,
          authorId: user.id,
          authorName: user.name,
          createdAt: Date.now(),
          likes: [],
          savedBy: [],
          interested: [],
          comments: [],
        },
        ...state.posts,
      ],
    }));
    if (published) {
      selectView("home");
      setFilter("all");
      notify("Your post is saved to this device.");
      window.dispatchEvent(new CustomEvent('campus-local-notification', { detail: { userId: user.id, source: { kind: 'post-published', sourceId: postId } } }));
    }
    return published;
  };
  const copy = async (post) => {
    try {
      await navigator.clipboard.writeText(
        [post.body, post.event?.title, post.college].filter(Boolean).join("\n"),
      );
      notify("Post text copied.");
    } catch {
      setFailure(
        "Clipboard access is unavailable. You can select and copy the post text.",
      );
    }
  };
  const posts =
    data?.posts.filter(
      (post) =>
        (view !== "mine" || post.authorId === user.id) &&
        (view !== "saved" || post.savedBy.includes(user.id)) &&
        (filter !== "friends" ||
          view !== "home" ||
          data.friends.includes(post.authorId) ||
          post.authorId === user.id) &&
        `${post.body} ${post.authorName} ${post.college} ${post.event?.title || ""}`
          .toLowerCase()
          .includes(query.toLowerCase()),
    ) || [];
  return (
    <div className="feed-shell">
      <div className="feed-heading">
        <div>
          <span className="feed-eyebrow">
            <Rss size={14} />
            ACROSS CAMPUSES
          </span>
          <h1>Campus Vibe-Feed</h1>
        </div>
        <label className="feed-search">
          <Search size={17} />
          <input
            type="search"
            aria-label={view === "friends" ? "Search people" : "Search posts"}
            placeholder={
              view === "friends"
                ? "Search people or colleges..."
                : "Search posts or colleges..."
            }
            value={query}
            onChange={(event) => setQuery(event.target.value)}
          />
        </label>
      </div>
      <div className="feed-demo-banner">
        <span className="feed-demo-badge">Demo feed</span>
        <p>Sample profiles. Posts and photos stay on this device.</p>
      </div>
      <div className="feed-layout">
        <aside className="feed-left">
          <div className="feed-current-user">
            <Avatar name={user.name} />
            <div>
              <strong>{user.name}</strong>
              <span>{data?.college || "Your campus connection"}</span>
            </div>
          </div>
          <nav aria-label="Feed navigation">
            {[
              ["home", "Your feed", House],
              ["friends", "Friends", Users],
              ["saved", "Saved posts", Bookmark],
              ["mine", "My posts", ImagePlus],
            ].map(([id, label, Icon]) => (
              <button
                type="button"
                key={id}
                aria-label={label}
                className={view === id ? "active" : ""}
                aria-current={view === id ? "page" : undefined}
                onClick={() => selectView(id)}
              >
                <Icon size={19} />
                <span>{label}</span>
                {id === "friends" && !!data?.incoming.length && (
                  <small>{data.incoming.length}</small>
                )}
              </button>
            ))}
          </nav>
          <button
            type="button"
            className="feed-community-link"
            onClick={() => window.campusSwitchWorkspace("community")}
          >
            <ArrowLeft size={16} />
            Back to Community
          </button>
          <p className="feed-side-caption">
            Good moments travel beyond one campus.
          </p>
        </aside>
        <div className="feed-timeline">
          {failure && (
            <div className="feed-error" role="alert">
              <p>{failure}</p>
              {!data && (
                <button type="button" onClick={reload}>
                  Try again
                </button>
              )}
            </div>
          )}
          {!data && !failure && (
            <div className="feed-card feed-loading" role="status">
              Loading your feed...
            </div>
          )}
          {data &&
            (view === "friends" ? (
              <Friends
                data={data}
                query={query}
                busy={busy}
                onChange={change}
              />
            ) : (
              <>
                {view === "home" && (
                  <Composer
                    user={user}
                    college={data.college}
                    busy={busy}
                    onPublish={publish}
                  />
                )}
                <div className="feed-timeline-heading">
                  <h2>
                    {view === "mine"
                      ? "My posts"
                      : view === "saved"
                        ? "Saved posts"
                        : "Your feed"}
                  </h2>
                  {view === "home" && (
                    <div
                      className="feed-filter"
                      role="group"
                      aria-label="Post audience"
                    >
                      <button
                        type="button"
                        aria-pressed={filter === "all"}
                        onClick={() => setFilter("all")}
                      >
                        All posts
                      </button>
                      <button
                        type="button"
                        aria-pressed={filter === "friends"}
                        onClick={() => setFilter("friends")}
                      >
                        Friends
                      </button>
                    </div>
                  )}
                </div>
                {posts.map((post) => (
                  <Post
                    key={post.id}
                    post={post}
                    user={user}
                    busy={busy}
                    onChange={(update) => changePost(post.id, update)}
                    onEdit={setEditing}
                    onDelete={setDeleting}
                    onPhoto={setPhotos}
                    onCopy={copy}
                  />
                ))}
                {!posts.length && (
                  <div className="feed-card feed-empty">
                    <Rss size={28} />
                    <h3>
                      {query
                        ? "No posts found"
                        : view === "saved"
                          ? "Your saved moments belong here"
                          : "A new campus story starts with you"}
                    </h3>
                    <p>
                      {query
                        ? "Try another name, college, or event."
                        : view === "saved"
                          ? "Save a post to come back to it later."
                          : "Share a thought, an event, or a photo."}
                    </p>
                  </div>
                )}
              </>
            ))}
        </div>
        <aside className="feed-right">
          <section className="feed-card">
            <div className="feed-section-heading">
              <h2>Your friends</h2>
              <button
                type="button"
                onClick={() => selectView("friends")}
                aria-label="View friends"
                title="View friends"
              >
                <Users size={17} />
              </button>
            </div>
            {data?.friends.map((id) => {
              const profile = person(id);
              return (
                profile && (
                  <button
                    type="button"
                    className="feed-friend-shortcut"
                    key={id}
                    onClick={() => selectView("friends")}
                  >
                    <Avatar name={profile.name} color={profile.color} small />
                    <span>
                      <strong>{profile.name}</strong>
                      <small>{profile.college}</small>
                    </span>
                  </button>
                )
              );
            })}
            {data && !data.friends.length && (
              <p className="feed-side-empty">Find a few familiar faces.</p>
            )}
          </section>
          <section className="feed-card feed-campus-note">
            <span className="feed-note-icon">
              <GraduationCap size={24} />
            </span>
            <h2>
              Different campuses.
              <br />
              Shared good vibes.
            </h2>
            <p>
              Music nights, weekend projects, and the little moments in between.
            </p>
            <button
              type="button"
              className="feed-quiet-button"
              onClick={() => selectView("friends")}
            >
              Find people
              <ArrowRight size={14} />
            </button>
          </section>
        </aside>
      </div>
      {notice && (
        <div className="feed-notice" role="status">
          {notice}
        </div>
      )}
      {photos && (
        <Modal
          title={`Photo ${photos.index + 1} of ${photos.images.length}`}
          onClose={() => setPhotos(null)}
          className="feed-lightbox"
        >
          <Photo media={photos.images[photos.index]} />
          {photos.images.length > 1 && (
            <footer>
              <button
                type="button"
                className="feed-icon-button"
                aria-label="Previous photo"
                title="Previous photo"
                disabled={photos.index === 0}
                onClick={() =>
                  setPhotos({ ...photos, index: photos.index - 1 })
                }
              >
                <ChevronLeft />
              </button>
              <span>
                {photos.index + 1} / {photos.images.length}
              </span>
              <button
                type="button"
                className="feed-icon-button"
                aria-label="Next photo"
                title="Next photo"
                disabled={photos.index === photos.images.length - 1}
                onClick={() =>
                  setPhotos({ ...photos, index: photos.index + 1 })
                }
              >
                <ChevronRight />
              </button>
            </footer>
          )}
        </Modal>
      )}
      {editing && (
        <Modal title="Edit post text" onClose={() => setEditing(null)}>
          <form
            onSubmit={async (event) => {
              event.preventDefault();
              if (
                await changePost(editing.id, (current) => ({
                  ...current,
                  body: editing.body.trim(),
                }))
              )
                setEditing(null);
            }}
          >
            <label>
              Post text
              <textarea
                aria-label="Edit post text"
                value={editing.body}
                onChange={(event) =>
                  setEditing({ ...editing, body: event.target.value })
                }
                maxLength={2000}
                rows={5}
                required={!editing.images.length}
              />
            </label>
            <footer>
              <button
                type="button"
                className="feed-quiet-button"
                onClick={() => setEditing(null)}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="feed-primary-button"
                disabled={busy}
              >
                Save changes
              </button>
            </footer>
          </form>
        </Modal>
      )}
      {deleting && (
        <Modal title="Delete this post?" onClose={() => setDeleting(null)}>
          <p>Your post and its comments will be removed from this device.</p>
          <footer>
            <button
              type="button"
              className="feed-quiet-button"
              onClick={() => setDeleting(null)}
            >
              Keep post
            </button>
            <button
              type="button"
              className="feed-danger-button"
              disabled={busy}
              onClick={async () => {
                if (
                  await change((state) => ({
                    ...state,
                    posts: state.posts.filter(
                      (post) => post.id !== deleting.id,
                    ),
                  }))
                )
                  setDeleting(null);
              }}
            >
              Delete post
            </button>
          </footer>
        </Modal>
      )}
    </div>
  );
}
