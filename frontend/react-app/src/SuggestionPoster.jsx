import { useEffect, useRef, useState } from 'react';
import { CloudUpload, LoaderCircle, X } from 'lucide-react';
import { prepareFeedPhoto } from './feed-photo';
import { discardSuggestionPoster, retireSuggestionPoster, uploadSuggestionPoster } from './suggestion-poster-store';

export default function SuggestionPoster({ user, draft, onChange, onBusy, onPending }) {
  const [busy, setBusy] = useState(false), [error, setError] = useState(''), [preview, setPreview] = useState('');
  const [pending, setPending] = useState(null), [cleanup, setCleanup] = useState(null), [broken, setBroken] = useState('');
  const input = useRef(null), lock = useRef(false), alive = useRef(true);
  useEffect(() => { alive.current = true; return () => { alive.current = false; if (window.campusSuggestionPhotoPending === draft.id) window.campusSuggestionPhotoPending = false; }; }, []);
  useEffect(() => () => { if (preview) URL.revokeObjectURL(preview); }, [preview]);
  function running(value) { lock.current = value; if (value) window.campusSuggestionPhotoPending = draft.id; else if (window.campusSuggestionPhotoPending === draft.id) window.campusSuggestionPhotoPending = false; if (alive.current) { setBusy(value); onBusy(value); } }
  async function upload(file, retry) {
    if (lock.current) return;
    running(true); setError('');
    try {
      const media = retry || await prepareFeedPhoto(file);
      if (!alive.current) return;
      if (!retry) { setPending(media); onPending(true); setPreview(URL.createObjectURL(media.blob)); }
      const poster = await uploadSuggestionPoster(user, media, draft.id);
      if (alive.current) { onChange(poster); setPending(null); onPending(false); setPreview(''); }
    } catch (failure) { if (alive.current) setError(failure.message); }
    finally { running(false); }
  }
  async function remove(retryCleanup = false) {
    if (lock.current) return;
    const poster = retryCleanup ? cleanup : draft.poster || pending;
    if (!poster) return;
    running(true); setError('');
    try {
      const claimed = retryCleanup || await retireSuggestionPoster(user, poster, draft.id);
      if (!alive.current) return;
      if (!retryCleanup) { onChange(null); setPending(null); onPending(false); setPreview(''); }
      if (claimed) {
        setCleanup(poster);
        await discardSuggestionPoster(user, poster, draft.id);
      }
      if (alive.current) setCleanup(null);
    } catch (failure) { if (alive.current) setError(failure.message); }
    finally { running(false); }
  }
  const source = draft.poster?.src || preview;
  return <div className="suggestion-poster-control">
    <span className="suggestion-field-title">Event poster <span>(optional)</span></span>
    {source && <figure className="suggestion-poster-preview">{broken !== source ? <img src={source} alt="Your suggestion poster" onError={() => setBroken(source)} /> : <p>Poster preview unavailable. Remove it or try again later.</p>}<button type="button" className="suggestion-secondary" disabled={busy} onClick={() => remove()}><X size={15} />Remove poster</button></figure>}
    {!source && <button type="button" className="suggestion-upload" disabled={busy || user.id === 'demo'} onClick={() => input.current.click()}><CloudUpload size={23} /><span>Upload poster<small>{user.id === 'demo' ? 'Sign in to attach a shared image' : 'JPG, PNG or WebP · Up to 10 MB'}</small></span></button>}
    <input ref={input} type="file" accept="image/jpeg,image/png,image/webp" aria-label="Choose suggestion poster" hidden style={{ display: 'none' }} disabled={busy || user.id === 'demo'} onChange={event => { const file = event.target.files?.[0]; event.target.value = ''; if (file) upload(file); }} />
    {busy && <p role="status"><LoaderCircle size={15} className="suggestion-spin" />Preparing your poster...</p>}
    {pending && !busy && <button type="button" className="suggestion-secondary" onClick={() => upload(null, pending)}>Retry poster upload</button>}
    {cleanup && !busy && <button type="button" className="suggestion-secondary" onClick={() => remove(true)}>Retry image cleanup</button>}
    {error && <p role="alert" className="suggestion-error">{error}</p>}
    {user.id !== 'demo' && <small className="suggestion-poster-help">Images are compressed before sharing. A poster is visible to anyone with its image link; avoid identifying details when submitting anonymously.</small>}
  </div>;
}
