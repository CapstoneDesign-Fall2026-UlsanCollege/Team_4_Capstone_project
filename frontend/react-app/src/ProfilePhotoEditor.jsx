import { useEffect, useRef, useState } from 'react';
import { Check, ImagePlus, Trash2 } from 'lucide-react';
import { prepareProfilePhoto } from './profile-photo';
import { photoError, saveProfilePhoto } from './profile-photo-store';

export default function ProfilePhotoEditor({ user, photo, onBusy, onSaved, onCancel }) {
  const [draft, setDraft] = useState(photo);
  const [busy, setBusy] = useState(false);
  const [preparing, setPreparing] = useState(false);
  const [error, setError] = useState('');
  const [waiting, setWaiting] = useState(false);
  const input = useRef(null);
  const alive = useRef(true);
  useEffect(() => { alive.current = true; return () => { alive.current = false; }; }, []);
  useEffect(() => {
    if (!busy) return;
    const warn = event => { event.preventDefault(); event.returnValue = ''; };
    const timer = setTimeout(() => setWaiting(true), 12000);
    window.addEventListener('beforeunload', warn);
    return () => { clearTimeout(timer); window.removeEventListener('beforeunload', warn); };
  }, [busy]);
  async function choose(file) {
    if (!file) return;
    setPreparing(true); setError('');
    try { const value = await prepareProfilePhoto(file); if (alive.current) setDraft(value); }
    catch (failure) { if (alive.current) setError(failure.message); }
    finally { if (alive.current) setPreparing(false); }
  }
  async function save() {
    if (busy || preparing || draft === photo) return;
    setBusy(true); onBusy(true); setError(''); setWaiting(false);
    window.campusPhotoPending = true;
    try { await saveProfilePhoto(user, draft); if (alive.current) onSaved(); }
    catch (failure) { if (alive.current) setError(photoError(failure)); }
    finally { window.campusPhotoPending = false; onBusy(false); if (alive.current) setBusy(false); }
  }
  return <div className="cvp-photo-editor">
    <p className="cvp-section-note">Your photo is visible to signed-in CampusVibes members. Your email and private profile details are not shared.</p>
    <div className="cvp-photo-preview">{draft ? <img src={draft} alt="Profile photo preview" /> : <span aria-label="Initials preview">{user.name?.trim().charAt(0).toUpperCase() || '?'}</span>}</div>
    <p className="cvp-section-note">JPG, PNG or WebP &middot; Up to 5 MB &middot; Square thumbnail</p>
    <input ref={input} type="file" accept="image/jpeg,image/png,image/webp" aria-label="Choose profile photo" hidden disabled={busy || preparing} onChange={event => { choose(event.target.files?.[0]); event.target.value = ''; }} />
    <div className="cvp-photo-tools"><button className="cvp-button" type="button" disabled={busy || preparing} onClick={() => input.current.click()}><ImagePlus size={15} />{draft ? 'Replace photo' : 'Choose photo'}</button><button className="cvp-button" type="button" disabled={busy || preparing || !draft} onClick={() => { setDraft(''); setError(''); }}><Trash2 size={15} />Remove photo</button></div>
    {preparing && <p role="status">Preparing your thumbnail...</p>}
    {busy && <p role="status">{waiting ? 'Waiting for the server. Keep this page open and check your connection.' : 'Saving your profile photo...'}</p>}
    {error && <p className="cvp-error" role="alert">{error}</p>}
    <footer><button className="cvp-button" type="button" disabled={busy} onClick={onCancel}>Cancel</button><button className="cvp-button cvp-primary" type="button" disabled={busy || preparing || draft === photo} onClick={save}><Check size={14} />Save photo</button></footer>
  </div>;
}
