import { useEffect, useRef, useState } from 'react';
import { ArrowRight, BadgeCheck, Bookmark, CalendarDays, Check, Clock, Copy, GraduationCap, House, LockKeyhole, Mail, MapPin, MessageCircle, Pencil, Plus, Settings, Share2, Sparkles, UserRound, UsersRound, X } from 'lucide-react';
import events from '../../events.json';
import { cleanActivity, cleanProfile, loadProfile, PROFILE_INTERESTS, profileCompletion, profileSummary, saveProfile, STUDY_YEARS } from './profile-store';
import './profile.css';

const hosts = [...new Set(events.map(event => event.host))];
const rails = [['Home',House,'dashboard'],['Events',CalendarDays,'discover'],['Clubs',UsersRound,'hosts'],['Saved',Bookmark,'saved'],['Feed',MessageCircle,'feed'],['Profile',UserRound,'profile']];
const dateLabel = date => new Intl.DateTimeFormat('en-US',{ month:'short',day:'numeric',timeZone:'Asia/Seoul' }).format(new Date(`${date}T12:00:00Z`));
const activityLabel = item => ({ saved:'Saved',removed:'Removed',suggested:'Drafted' })[item.type];
function browserStorage() { try { return window.localStorage; } catch { return null; } }
function readSignals() {
  try { return { saved:window.campusProfile?.getSaved() || [],activity:cleanActivity(window.campusProfile?.getActivity()),drafts:window.campusProfile?.getDraftCount() || 0 }; }
  catch { return { saved:[],activity:[],drafts:0 }; }
}

export default function Profile({ user }) {
  const [initial] = useState(() => loadProfile(browserStorage(),user,hosts));
  const [data,setData] = useState(initial.data);
  const [signals,setSignals] = useState(readSignals);
  const [modal,setModal] = useState('');
  const [draft,setDraft] = useState(data);
  const [customInterest,setCustomInterest] = useState('');
  const [includeEmail,setIncludeEmail] = useState(false);
  const [message,setMessage] = useState(initial.warning);
  const [failure,setFailure] = useState('');
  const [sharing,setSharing] = useState(false);
  const dialog = useRef(null);
  const savedEvents = events.filter(event => signals.saved.includes(event.id));
  const completion = profileCompletion(data,savedEvents.length);
  const suggestions = events.filter(event => !signals.saved.includes(event.id)).slice(0,3);
  const summary = profileSummary(user,data,includeEmail);
  useEffect(() => {
    const update = () => setSignals(readSignals());
    const storage = event => {
      update();
      if (event.key === null || event.key === `cv_profile_${user.email || user.id}`) {
        const result=loadProfile(browserStorage(),user,hosts); setData(result.data); if(result.warning) setMessage(result.warning);
      }
    };
    window.addEventListener('campus-profile-change',update); window.addEventListener('campus-saved-change',update); window.addEventListener('storage',storage);
    return () => { window.removeEventListener('campus-profile-change',update); window.removeEventListener('campus-saved-change',update); window.removeEventListener('storage',storage); };
  },[user.id,user.email]);
  useEffect(() => {
    if (modal && !dialog.current.open) dialog.current.showModal();
    if (!modal && dialog.current.open) dialog.current.close();
  },[modal]);
  function open(kind) { setDraft(data); setCustomInterest(''); setFailure(''); setIncludeEmail(false); setModal(kind); }
  function action(kind,value) {
    try {
      if (!window.campusProfile) throw new Error('Profile navigation is not ready. Retry in a moment.');
      if (kind === 'save') window.campusProfile.saveEvent(value);
      else if (kind === 'event') { setModal(''); window.campusProfile.openEvent(value); }
      else { setModal(''); window.campusProfile.navigate(value); }
      setFailure('');
    } catch (error) { setFailure(error.message || 'Could not complete this action.'); }
  }
  function persist(value,notice) {
    try { const next=saveProfile(browserStorage(),user,value,hosts); setData(next); setMessage(notice); setFailure(''); setModal(''); }
    catch (error) { setFailure(error.message); }
  }
  function changeInterest(interest) {
    if (!draft.interests.includes(interest) && draft.interests.length >= 12) { setFailure('Choose up to 12 interests.'); return; }
    setDraft(value => ({ ...value,interests:value.interests.includes(interest) ? value.interests.filter(item => item !== interest) : [...value.interests,interest] })); setFailure('');
  }
  function addInterest() {
    const label=customInterest.trim();
    if (!label || label.length > 32) { setFailure('Use an interest of 1 to 32 characters.'); return; }
    if (draft.interests.some(item => item.toLowerCase() === label.toLowerCase())) { setCustomInterest(''); return; }
    changeInterest(label); setCustomInterest('');
  }
  async function share(copyOnly = false) {
    setSharing(true); setFailure('');
    try {
      if (!copyOnly && navigator.share) await navigator.share({ title:'CampusVibes profile',text:summary });
      else await navigator.clipboard.writeText(summary);
      setMessage(copyOnly || !navigator.share ? 'Profile summary copied.' : 'Profile summary shared.'); setModal('');
    } catch (error) { if (error.name !== 'AbortError') setFailure('Sharing is unavailable. Select the profile summary text to copy it.'); }
    finally { setSharing(false); }
  }
  function eventRow(event,compact = false) {
    const isSaved=signals.saved.includes(event.id);
    return <article className={`cvp-event ${compact ? 'cvp-event-compact' : ''}`} key={event.id} data-profile-event={event.id}>
      <button className="cvp-event-open" type="button" onClick={() => action('event',event.id)} aria-label={`View details: ${event.title}`}><img src={`/assets/${event.photo}`} alt="" /><span><strong>{event.title}</strong>{!compact && <small><MapPin size={11} />{event.location}</small>}<small><CalendarDays size={11} />{dateLabel(event.date)}<Clock size={11} />{event.time}</small></span></button>
      <button className="cvp-icon-button cvp-bookmark" type="button" aria-pressed={isSaved} title={isSaved ? 'Remove from saved' : 'Save event'} aria-label={`${isSaved ? 'Remove from saved' : 'Save event'}: ${event.title}`} onClick={() => action('save',event.id)}><Bookmark size={17} fill={isSaved ? 'currentColor' : 'none'} /></button>
    </article>;
  }
  function activityList(list) {
    return list.length ? <ol className="cvp-activity-list">{list.map((item,index) => <li key={`${item.at}-${index}`}><span className={`cvp-activity-icon is-${item.type}`}>{item.type === 'suggested' ? <Sparkles size={17} /> : <Bookmark size={17} />}</span><div><strong>{activityLabel(item)} {item.title}</strong><small>{item.type === 'saved' ? 'to your events' : item.type === 'removed' ? 'from saved events' : 'in this browser'}</small><time dateTime={item.at}>{new Intl.DateTimeFormat('en-US',{ month:'short',day:'numeric',hour:'numeric',minute:'2-digit',timeZone:'Asia/Seoul' }).format(new Date(item.at))} KST</time></div></li>)}</ol> : <p className="cvp-empty">No recorded activity yet.</p>;
  }
  return <div className="cvp-workspace">
    <nav className="cvp-rail" aria-label="Profile workspace navigation">{rails.map(([title,Icon,page]) => <button key={page} type="button" title={page === 'hosts' ? 'Sample event hosts' : title} aria-current={page === 'profile' ? 'page' : undefined} onClick={() => page === 'hosts' ? open('hosts') : action('navigate',page)}><Icon size={21} /><span>{title}</span></button>)}<button className="cvp-rail-settings" type="button" title="Profile settings" onClick={() => open('settings')}><Settings size={21} /><span>Settings</span></button></nav>
    <header className="cvp-hero">
      <div className="cvp-hero-content"><div className="cvp-intro"><div className="cvp-avatar" id="profileAvatar" aria-label={`${user.name}'s avatar`}>{user.name?.trim().charAt(0).toUpperCase() || '?'}<span><GraduationCap size={17} /></span></div><div className="cvp-identity"><h1 id="profileName">{user.name}{user.emailVerified && <BadgeCheck size={17} aria-label="Email verified" />}</h1><p id="profileProgram">{data.program || 'Study program not added'}</p><p id="profileBio">{data.bio || 'No bio added yet.'}</p><p className="cvp-email" id="profileEmail"><Mail size={13} />{user.email}</p><div className="cvp-facts">{data.year && <span><GraduationCap size={13} />{data.year}</span>}{data.campus && <span><MapPin size={13} />{data.campus}</span>}<span><UsersRound size={13} />{user.id === 'demo' ? 'Demo student' : 'CampusVibes student'}</span></div></div></div>
        <div className="cvp-hero-actions"><button className="cvp-privacy" type="button" onClick={() => open('settings')}><LockKeyhole size={13} /><span>Profile visibility</span><strong>Only this browser</strong></button><div><button className="cvp-button" id="profileEdit" type="button" onClick={() => open('edit')}><Pencil size={13} />Edit profile</button><button className="cvp-button cvp-primary" type="button" onClick={() => open('share')}><Share2 size={13} />Share profile</button></div></div>
      </div>
      <div className="cvp-completion"><div><h2>Profile completion</h2><strong>{completion.percent}% complete</strong></div><progress aria-label="Profile completion" value={completion.percent} max={100} /><ul>{completion.tasks.map(task => <li key={task.label}><button type="button" onClick={() => task.action === 'discover' ? action('navigate','discover') : open(task.action)}><span className={task.done ? 'is-complete' : ''}><Check size={10} /></span>{task.label}</button></li>)}</ul></div>
      <figure className="cvp-campus-photo"><img src="/assets/campus-dashboard.jpg" alt="Illustrative university building and campus garden" /><figcaption>Campus inspiration</figcaption></figure>
    </header>
    <div className="cvp-data-note"><LockKeyhole size={12} />Profile edits and event saves are browser-local. Event listings are samples.</div>
    {message && <p className="cvp-notice" role="status">{message}</p>}{failure && !modal && <p className="cvp-error" role="alert">{failure}</p>}
    <div className="cvp-columns">
      <div className="cvp-stack"><section className="cvp-section"><div className="cvp-section-heading"><h2>Interests</h2><button type="button" onClick={() => open('interests')}><Pencil size={12} />Manage interests</button></div><div className="cvp-interests" id="profileInterests">{data.interests.map(interest => <span key={interest}>{interest}</span>)}<button type="button" onClick={() => open('interests')}><Plus size={12} />Add interest</button></div></section>
        <section className="cvp-section"><div className="cvp-section-heading"><h2>Study Program</h2><button className="cvp-icon-button" type="button" title="Edit study program" aria-label="Edit study program" onClick={() => open('edit')}><Pencil size={13} /></button></div><div className="cvp-study"><span><GraduationCap size={25} /></span><div><h3 id="profileStudy">{data.program || 'Not added yet'}</h3><p>{data.faculty || 'Faculty not added'}</p><p>Expected graduation: <strong>{data.graduation ? new Intl.DateTimeFormat('en-US',{month:'long',year:'numeric',timeZone:'UTC'}).format(new Date(`${data.graduation}-01T12:00:00Z`)) : 'Not set'}</strong></p></div></div></section>
        <section className="cvp-section"><div className="cvp-section-heading"><h2>Campus Involvement</h2><button type="button" onClick={() => open('hosts')}>Manage<ArrowRight size={12} /></button></div><p className="cvp-section-note">Following sample hosts &middot; Not club membership</p><div className="cvp-hosts">{data.followedHosts.length ? data.followedHosts.map(host => <div key={host}><UsersRound size={17} /><span><strong>{host}</strong><small>Following in this browser</small></span></div>) : <p className="cvp-empty">No followed hosts yet.</p>}</div></section></div>
      <section className="cvp-section cvp-saved"><div className="cvp-section-heading"><h2>Saved Events</h2><button type="button" onClick={() => action('navigate','saved')}>View all saved events</button></div><div id="profileSavedEvents">{savedEvents.length ? savedEvents.slice(0,3).map(event => eventRow(event)) : <div className="cvp-empty cvp-saved-empty"><Bookmark size={27} /><p>No saved events yet.</p><button className="cvp-button" type="button" onClick={() => action('navigate','discover')}>Explore events<ArrowRight size={13} /></button></div>}</div><button className="cvp-section-footer" type="button" onClick={() => action('navigate','discover')}>Explore more events<ArrowRight size={14} /></button></section>
      <section className="cvp-section cvp-activity"><div className="cvp-section-heading"><h2>Recent Activity</h2><button type="button" onClick={() => open('activity')}>View all activity</button></div><div id="profileActivity">{activityList(signals.activity.slice(0,4))}</div></section>
      <section className="cvp-section cvp-explore"><div className="cvp-section-heading"><h2>More on campus</h2><button type="button" onClick={() => action('navigate','discover')}>View all events</button></div><p className="cvp-section-note">Sample listings &middot; Illustrative photos</p><div>{suggestions.map(event => eventRow(event,true))}{!suggestions.length && <p className="cvp-empty">All sample events are saved.</p>}</div></section>
      <section className="cvp-section cvp-impact"><h2>Your CampusVibes Impact</h2><div><span><Bookmark size={18} /><strong>{savedEvents.length}</strong><small>Events saved</small></span><span><UsersRound size={18} /><strong>{data.followedHosts.length}</strong><small>Hosts followed</small></span><span><Sparkles size={18} /><strong>{signals.drafts}</strong><small>Ideas drafted</small></span></div><p className="cvp-section-note">Browser records &middot; Attendance not tracked</p></section>
    </div>
    <dialog className="cvp-dialog" ref={dialog} aria-labelledby="cvp-dialog-title" onClose={() => setModal('')} onClick={event => { if(event.target === event.currentTarget) setModal(''); }}><header><h2 id="cvp-dialog-title">{({ edit:'Edit profile',interests:'Manage interests',hosts:'Follow sample hosts',share:'Share profile summary',activity:'Your recorded activity',settings:'Profile settings',reset:'Reset local profile' })[modal]}</h2><button className="cvp-icon-button" type="button" aria-label="Close profile panel" title="Close" onClick={() => setModal('')}><X size={19} /></button></header>
      {failure && modal && <p className="cvp-error" role="alert">{failure}</p>}
      {modal === 'edit' && <form className="cvp-edit-form" id="profileEditor" onSubmit={event => { event.preventDefault(); persist(draft,'Profile saved in this browser.'); }}>
        <p className="cvp-section-note">Account name and email are unchanged. These details stay in this browser.</p>
        {[['program','Study program',80],['faculty','Faculty',80],['campus','Campus',80]].map(([key,label,maximum]) => <label key={key}>{label}<input id={key === 'program' ? 'editProgram' : undefined} value={draft[key]} maxLength={maximum} onChange={event => setDraft(value => ({ ...value,[key]:event.target.value }))} /></label>)}
        <div className="cvp-form-row"><label>Study year<select aria-label="Study year" value={draft.year} onChange={event => setDraft(value => ({ ...value,year:event.target.value }))}><option value="">Not specified</option>{STUDY_YEARS.map(year => <option key={year}>{year}</option>)}</select></label><label>Expected graduation<input aria-label="Expected graduation" type="month" min="2000-01" max="2099-12" value={draft.graduation} onChange={event => setDraft(value => ({ ...value,graduation:event.target.value }))} /></label></div>
        <label>About you<textarea aria-label="About you" id="editBio" rows={3} maxLength={240} value={draft.bio} onChange={event => setDraft(value => ({ ...value,bio:event.target.value }))} /><small aria-hidden="true">{draft.bio.length} / 240</small></label>
        <footer><button className="cvp-button" type="button" onClick={() => setModal('')}>Cancel</button><button className="cvp-button cvp-primary" type="submit"><Check size={14} />Save changes</button></footer>
      </form>}
      {modal === 'interests' && <div className="cvp-interest-editor"><div className="cvp-interest-options">{[...new Set([...PROFILE_INTERESTS,...draft.interests])].map(interest => <label key={interest}><input type="checkbox" checked={draft.interests.includes(interest)} onChange={() => changeInterest(interest)} />{interest}</label>)}</div><div className="cvp-add-interest"><label className="sr-only" htmlFor="cvp-custom-interest">Custom interest</label><input id="cvp-custom-interest" maxLength={32} placeholder="Another interest" value={customInterest} onChange={event => setCustomInterest(event.target.value)} onKeyDown={event => { if(event.key === 'Enter') { event.preventDefault(); addInterest(); } }} /><button className="cvp-icon-button" type="button" title="Add custom interest" aria-label="Add custom interest" onClick={addInterest}><Plus size={18} /></button></div><footer><span>{draft.interests.length} / 12 selected</span><button className="cvp-button cvp-primary" type="button" onClick={() => persist(draft,'Interests saved in this browser.')}><Check size={14} />Save interests</button></footer></div>}
      {modal === 'hosts' && <div className="cvp-host-editor"><p className="cvp-section-note">Sample event hosts only. Following does not join a club or send a request.</p>{hosts.map(host => <label key={host}><input type="checkbox" checked={draft.followedHosts.includes(host)} onChange={() => setDraft(value => ({ ...value,followedHosts:value.followedHosts.includes(host) ? value.followedHosts.filter(item => item !== host) : [...value.followedHosts,host] }))} />{host}</label>)}<footer><button className="cvp-button cvp-primary" type="button" onClick={() => persist(draft,'Followed hosts saved in this browser.')}><Check size={14} />Save followed hosts</button></footer></div>}
      {modal === 'share' && <div className="cvp-share"><p className="cvp-section-note">Text summary only &middot; No public profile URL</p><textarea readOnly aria-label="Profile summary to share" value={summary} rows={6} /><label><input type="checkbox" checked={includeEmail} onChange={event => setIncludeEmail(event.target.checked)} />Include my email address</label><footer><button className="cvp-button" type="button" disabled={sharing} onClick={() => share(true)}><Copy size={14} />Copy summary</button><button className="cvp-button cvp-primary" type="button" disabled={sharing} onClick={() => share()}><Share2 size={14} />Share summary</button></footer></div>}
      {modal === 'activity' && activityList(signals.activity)}
      {modal === 'settings' && <div className="cvp-settings"><p><LockKeyhole size={19} /><strong>Private to this browser</strong></p><p>Profile edits, interests, and followed hosts are not published to a shared directory. Photo uploads remain unavailable. Account name and email come from sign-in.</p><p>Saved Community events remain browser-local. Feed posts, friends, and Messages keep their existing shared-data behavior.</p><button className="cvp-button" type="button" onClick={() => setModal('reset')}>Reset local profile</button></div>}
      {modal === 'reset' && <div className="cvp-settings"><p>This clears your profile details and host follows in this browser. Your account, saved events, shared posts, friends, and messages are unchanged.</p><footer><button className="cvp-button" type="button" onClick={() => setModal('settings')}>Cancel</button><button className="cvp-button cvp-primary" type="button" onClick={() => persist(cleanProfile(null,user,hosts),'Local profile reset.')}><Check size={14} />Confirm reset</button></footer></div>}
    </dialog>
  </div>;
}
