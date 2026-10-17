import { useEffect, useState } from 'react';
import { Post } from './Feed';
import { addComment, deleteComment, setReaction, watchComments, watchReactions } from './shared-social-store';
import { setSavedPost } from './shared-saved-store';

export default function SharedPost({ post, user, saved, busy, act, fail, onEdit, onDelete }) {
  const [reactions, setReactions] = useState([]);
  const [comments, setComments] = useState([]);
  useEffect(() => {
    const stopReactions = watchReactions(user, post.id, setReactions, fail);
    const stopComments = watchComments(user, post.id, setComments, fail);
    return () => { stopReactions(); stopComments(); };
  }, [user.id, post.id, fail]);
  const value = {
    ...post, images: [], createdAt: post.createdAt || Date.now(),
    likes: reactions.filter(item => item.kind === 'like').map(item => item.uid),
    interested: reactions.filter(item => item.kind === 'interested').map(item => item.uid),
    savedBy: saved ? [user.id] : [],
    comments: comments.map(item => ({ ...item, authorId: item.uid })),
  };
  const change = update => {
    const next = update(value);
    for (const [field, kind] of [['likes', 'like'], ['interested', 'interested']]) {
      if (next[field].includes(user.id) !== value[field].includes(user.id)) {
        return act(() => setReaction(user, post.id, kind, next[field].includes(user.id)), '');
      }
    }
    if (next.savedBy.includes(user.id) !== saved) return act(() => setSavedPost(user, post.id, !saved), saved ? 'Post removed from saved.' : 'Post saved.');
    const added = next.comments.find(item => !value.comments.some(existing => existing.id === item.id));
    if (added) return act(() => addComment(user, post.id, added.body), '');
    const removed = value.comments.find(item => !next.comments.some(existing => existing.id === item.id));
    if (removed) return act(() => deleteComment(user, post.id, removed.id), 'Comment deleted.');
    return false;
  };
  return <Post post={value} user={user} shared busy={busy || !!post.deleting} onChange={change} onEdit={onEdit} onDelete={onDelete} onPhoto={() => {}} onCopy={() => act(async () => {
    if (!navigator.clipboard) throw new Error('Clipboard access is unavailable.');
    await navigator.clipboard.writeText(post.body || post.event?.title || '');
  }, 'Post text copied.')} />;
}
