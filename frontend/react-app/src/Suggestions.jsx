import { useEffect, useRef, useState } from 'react';
import { BookOpen, CalendarDays, Check, CheckCircle2, ChevronDown, CloudUpload, FileCheck2, Lightbulb, LoaderCircle, MapPin, Monitor, Music, Paintbrush, Save, Send, ShieldCheck, Star, Trophy, UsersRound, X } from 'lucide-react';
import { SUGGESTION_CATEGORIES, reviewSuggestion, submitSuggestion, suggestionError, watchMySuggestions, watchReviewer, watchReviewQueue } from './suggestions-store';
import './suggestions.css';

const freshDraft = () => ({ id: crypto.randomUUID(), name: '', host: '', category: 'All', date: '', location: '', description: '', anonymous: false });
const draftKey = user => `cv_suggestion_draft_${user.id}`;
const icons = { All: Star, Tech: Monitor, Arts: Paintbrush, Music, Sports: Trophy, Social: UsersRound, Academics: BookOpen };

function loadDraft(user) {
  try {
    const data = JSON.parse(localStorage.getItem(draftKey(user)) || 'null');
    if (!data || typeof data.id !== 'string' || !/^[a-zA-Z0-9-]{1,80}$/.test(data.id)) return freshDraft();
    return { ...freshDraft(), ...Object.fromEntries(['id','name','host','date','location','description'].map(key => [key, String(data[key] || '')])), category: SUGGESTION_CATEGORIES.includes(data.category) ? data.category : 'All', anonymous: data.anonymous === true };
  } catch { return freshDraft(); }
}

function ReviewItem({ item, user, canReview }) {
  const [note, setNote] = useState('');
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');
  const lock = useRef(false);
  async function decide(status) {
    if (lock.current) return;
    lock.current = true; setBusy(true); setError('');
    try { await reviewSuggestion(user, item.id, status, note); }
    catch (failure) { setError(suggestionError(failure)); }
    finally { lock.current = false; setBusy(false); }
  }
  return <article className="suggestion-receipt" data-suggestion-id={item.id}>
    <div className="suggestion-receipt-heading"><h3>{item.name}</h3><span className={`suggestion-status ${item.status}`}>{item.status}</span></div>
    <p className="suggestion-receipt-meta">{item.category} &middot; {item.anonymous ? 'Anonymous student' : `${item.authorName} / ${item.host}`}</p>
    <p className="suggestion-description">{item.description}</p>
    {(item.date || item.location) && <p className="suggestion-receipt-meta">{item.date}{item.date && item.location ? ' / ' : ''}{item.location}</p>}
    {item.reviewNote && <p className="suggestion-review-note"><strong>Review note:</strong> {item.reviewNote}</p>}
    {canReview && item.status === 'pending' && <div className="suggestion-decision">
      <label>Review note (optional)<textarea aria-label={`Review note for ${item.name}`} value={note} maxLength={500} onChange={event => setNote(event.target.value)} disabled={busy} rows={2} /></label>
      <div><button type="button" className="suggestion-secondary" disabled={busy} onClick={() => decide('declined')}><X size={16} />Decline</button><button type="button" className="suggestion-primary" disabled={busy} onClick={() => decide('approved')}>{busy ? <LoaderCircle size={16} className="suggestion-spin" /> : <Check size={16} />}Approve idea</button></div>
    </div>}
    {error && <p role="alert" className="suggestion-error">{error}</p>}
  </article>;
}

export default function Suggestions({ user }) {
  const [draft, setDraft] = useState(() => loadDraft(user));
  const [saved, setSaved] = useState('');
  const [error, setError] = useState('');
  const [notice, setNotice] = useState('');
  const [busy, setBusy] = useState(false);
  const [more, setMore] = useState(false);
  const [tab, setTab] = useState('new');
  const [reviewer, setReviewer] = useState(false);
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(false);
  const [filter, setFilter] = useState('pending');
  const sendLock = useRef(false);
  const latestDraft = useRef(draft);
  latestDraft.current = draft;
  const alive = useRef(true);
  const demo = user.id === 'demo';

  useEffect(() => { alive.current = true; return () => { alive.current = false; }; }, []);
  useEffect(() => {
    const flush = () => {
      const value = latestDraft.current;
      if (value.name || value.host || value.description || value.date || value.location || value.category !== 'All' || value.anonymous) {
        try { localStorage.setItem(draftKey(user), JSON.stringify(value)); } catch { /* The visible autosave state reports storage errors. */ }
      }
    };
    window.addEventListener('pagehide', flush);
    return () => { window.removeEventListener('pagehide', flush); flush(); };
  }, [user.id]);
  useEffect(() => {
    if (demo) return;
    return watchReviewer(user, allowed => { setReviewer(allowed); if (!allowed) setTab(current => current === 'review' ? 'new' : current); }, setError);
  }, [user.id, demo]);
  useEffect(() => {
    if (tab === 'new' || demo || (tab === 'review' && !reviewer)) { setRows([]); return; }
    setLoading(true); setError('');
    const receive = value => { setRows(value); setLoading(false); };
    const fail = value => { setError(value); setLoading(false); };
    return tab === 'mine' ? watchMySuggestions(user, receive, fail) : watchReviewQueue(user, receive, fail);
  }, [tab, user.id, reviewer, demo]);
  useEffect(() => {
    if (!draft.name && !draft.host && !draft.description && !draft.date && !draft.location && draft.category === 'All' && !draft.anonymous) return;
    setSaved('Saving draft...');
    const timer = setTimeout(() => persist(draft), 450);
    return () => clearTimeout(timer);
  }, [draft]);

  function persist(value) {
    try { localStorage.setItem(draftKey(user), JSON.stringify(value)); setSaved('Draft saved in this browser'); return true; }
    catch { setSaved('Draft could not be saved'); setError('Browser storage is unavailable. Keep this page open to avoid losing your draft.'); return false; }
  }
  function change(key, value) { setDraft(current => ({ ...current, [key]: value })); setNotice(''); setError(''); }
  function save() {
    if (persist(draft)) setNotice('Draft saved successfully. You can continue in this browser anytime.');
  }
  async function send(event) {
    event.preventDefault();
    if (sendLock.current) return;
    setError(''); setNotice('');
    if (demo) { persist(draft); setError('Sign in to send to the team review queue. Demo ideas remain private drafts in this browser.'); return; }
    sendLock.current = true; setBusy(true);
    try {
      await submitSuggestion(user, draft);
      if (!alive.current) return;
      try { localStorage.removeItem(draftKey(user)); } catch { /* A confirmed submission must not be reported as a failed send. */ }
      setDraft(freshDraft()); setSaved(''); setNotice('Suggestion sent. It is pending team review.'); setTab('mine');
    } catch (failure) { if (alive.current) setError(suggestionError(failure)); }
    finally { sendLock.current = false; if (alive.current) setBusy(false); }
  }

  return <div className="suggestion-page">
    <header className="suggestion-heading"><div><p className="suggestion-eyebrow">ADD TO THE VIBE</p><h1>Suggest an event</h1><p>Share your idea and help shape campus life.</p></div>
      <div className="suggestion-save-state" role="status" aria-live="polite">{(saved || notice) && <><CheckCircle2 size={25} /><span>{notice || saved}</span></>}</div>
    </header>
    <nav className="suggestion-tabs" aria-label="Event suggestions"><button type="button" aria-current={tab === 'new' ? 'page' : undefined} onClick={() => setTab('new')}><Lightbulb size={16} />New idea</button><button type="button" aria-current={tab === 'mine' ? 'page' : undefined} onClick={() => setTab('mine')}><FileCheck2 size={16} />My suggestions</button>{reviewer && <button type="button" aria-current={tab === 'review' ? 'page' : undefined} onClick={() => setTab('review')}><ShieldCheck size={16} />Team review</button>}</nav>
    {error && <p className="suggestion-error" role="alert">{error}</p>}
    {tab === 'new' ? <div className="suggestion-layout">
      <form id="suggestForm" className="suggestion-form" onSubmit={send}>
        <fieldset disabled={busy} className="suggestion-fields">
          <div className="suggestion-pair"><label htmlFor="suggestName">Event name<input id="suggestName" name="name" required maxLength={100} placeholder="e.g. Film night under the stars" value={draft.name} onChange={event => change('name', event.target.value)} /></label><label htmlFor="suggestHost">Host or club<input id="suggestHost" name="host" required={!draft.anonymous} disabled={draft.anonymous || busy} maxLength={100} placeholder={draft.anonymous ? 'Hidden for anonymous suggestions' : 'Your club name or organization'} value={draft.anonymous ? '' : draft.host} onChange={event => change('host', event.target.value)} /></label></div>
          <fieldset className="suggestion-categories"><legend>Event category</legend><div className="suggestion-category-row">{SUGGESTION_CATEGORIES.slice(0,5).map(category => { const Icon = icons[category]; return <button key={category} type="button" aria-pressed={draft.category === category} onClick={() => change('category', category)}><Icon size={16} />{category}</button>; })}<button type="button" aria-expanded={more} aria-controls="suggestMoreCategories" aria-pressed={['Social','Academics'].includes(draft.category)} onClick={() => setMore(value => !value)}><ChevronDown size={16} />{['Social','Academics'].includes(draft.category) ? draft.category : 'More'}</button></div>{more && <div id="suggestMoreCategories" className="suggestion-more">{SUGGESTION_CATEGORIES.slice(5).map(category => { const Icon = icons[category]; return <button key={category} type="button" aria-pressed={draft.category === category} onClick={() => { change('category', category); setMore(false); }}><Icon size={16} />{category}</button>; })}</div>}</fieldset>
          <div className="suggestion-pair"><label htmlFor="suggestDate">Date <span>(optional)</span><div className="suggestion-input-icon"><CalendarDays size={17} /><input id="suggestDate" type="date" max="9999-12-31" value={draft.date} onChange={event => change('date', event.target.value)} /></div></label><label htmlFor="suggestLocation">Location <span>(optional)</span><div className="suggestion-input-icon"><MapPin size={17} /><input id="suggestLocation" maxLength={120} placeholder="Add a location or venue" value={draft.location} onChange={event => change('location', event.target.value)} /></div></label></div>
          <label htmlFor="suggestDescription">What&apos;s happening?<textarea id="suggestDescription" name="description" required rows={3} maxLength={500} placeholder="Tell students why they should come..." value={draft.description} onChange={event => change('description', event.target.value)} /><span className="suggestion-counter" aria-live="off">{draft.description.length} / 500</span></label>
          <div className="suggestion-pair suggestion-extras"><div><span className="suggestion-field-title">Poster or attachment <span>(optional)</span></span><button type="button" className="suggestion-upload" disabled title="Photo and file uploads are deferred while billing stays off"><CloudUpload size={23} /><span>Attachments unavailable<small>Text suggestions are open</small></span></button></div><div><label className="suggestion-toggle-label" htmlFor="suggestAnonymous">Submit anonymously</label><div className="suggestion-anonymous"><input id="suggestAnonymous" type="checkbox" role="switch" checked={draft.anonymous} onChange={event => change('anonymous', event.target.checked)} aria-describedby="suggestPrivacy" /><p id="suggestPrivacy">Your name and club won&apos;t be shown to reviewers.<span title="Project administrators can access ownership records. Avoid identifying details in your description."> Not anonymous to project administrators.</span></p></div></div></div>
        </fieldset>
        <footer className="suggestion-actions"><button type="button" className="suggestion-secondary" disabled={busy} onClick={save}><Save size={16} />Save draft</button><span>{saved || 'Drafts stay in this browser.'}</span><button type="submit" className="suggestion-primary" disabled={busy}>{busy ? <LoaderCircle size={16} className="suggestion-spin" /> : <Send size={16} />}{busy ? 'Sending...' : 'Send suggestion'}</button></footer>
      </form>
      <aside className="suggestion-tips"><div className="suggestion-tip-heading"><span><Lightbulb size={24} /></span><div><h2>Make it a standout idea</h2><p>Great suggestions help build an amazing campus.</p></div></div><ul>{[['Be clear and specific', 'Include what, when, where, and who it is for.'],['Explain the impact', 'Share how it benefits students or the community.'],['Think inclusive', 'Ideas that welcome everyone tend to get the most support.'],['Make it memorable', 'Give your idea a name students will remember.']].map(([title, text]) => <li key={title}><CheckCircle2 size={19} /><div><strong>{title}</strong><p>{text}</p></div></li>)}</ul><div className="suggestion-tip-photo"><img src="/assets/campus-login.jpg" alt="University campus" /><span><CalendarDays size={28} />Your next campus moment</span></div></aside>
    </div> : <section className="suggestion-list" aria-label={tab === 'review' ? 'Team review queue' : 'My submitted suggestions'}>
<div className="suggestion-list-heading"><h2>{tab === 'review' ? 'Team review queue' : 'My suggestions'}</h2>{tab === 'review' && <label>Status<select aria-label="Review status" value={filter} onChange={event => setFilter(event.target.value)}><option value="pending">Pending</option><option value="approved">Approved</option><option value="declined">Declined</option><option value="all">All</option></select></label>}</div>
      {tab === 'review' && <p className="suggestion-scope">Review decisions do not publish events to Discover.</p>}
      {loading ? <p role="status">Loading suggestions...</p> : !rows.filter(item => tab !== 'review' || filter === 'all' || item.status === filter).length ? <div className="suggestion-empty"><FileCheck2 size={28} /><p>{demo ? 'Sign in to send and track suggestions.' : 'No suggestions yet.'}</p></div> : rows.filter(item => tab !== 'review' || filter === 'all' || item.status === filter).map(item => <ReviewItem key={item.id} item={item} user={user} canReview={tab === 'review'} />)}
    </section>}
  </div>;
}
