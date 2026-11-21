import { validEventLinkId } from './react-app/src/event-links.js';

const DEMO_KEY = 'cv_rsvps_demo';

// Explicit lifecycle: the React entry creates this before any event dialog opens.
export function createRsvpController({ getUser, getAccount, getEvents, getStorage = () => window.localStorage }) {
  let container=null, event=null, actor=null, account=null, unsubscribe=null;
  let pending=false, failure='', intent=null, generation=0;
  injectStyles();

  function clear() {
    generation++;
    unsubscribe?.();unsubscribe=null;
    container?.querySelectorAll('[data-rsvp-event]').forEach(node=>node.remove());
    container=null;event=null;actor=null;account=null;pending=false;failure='';intent=null;
  }

  function snapshot() {
    if (actor === 'demo') {
      const stored=JSON.parse(getStorage().getItem(DEMO_KEY) || '[]');
      if (!Array.isArray(stored)) throw new Error('Unreadable RSVP data');
      return { ids:[...new Set(stored.filter(id=>typeof id==='number' && validEventLinkId(id)))],ready:true,pending:false,error:'' };
    }
    if (!account) return {ids:[],ready:false,pending:false,error:'Sign in again to load your RSVP.'};
    const section=account.sectionStatus('saved_rsvps');
    return { ids:account.read('saved_rsvps') || [],ready:account.ready(),pending:section.pending,error:section.error || (!account.ready() && account.status().error) || '' };
  }

  function render() {
    if (!container?.isConnected || !event) return;
    if (getUser()?.id !== actor || getAccount() !== account) { clear();return; }
    let state,readError=false;
    try { state=snapshot(); }
    catch { readError=true;state={ids:[],ready:false,pending:false,error:'RSVPs could not be read in this browser.'}; }
    let mount=container.querySelector('[data-rsvp-event]');
    if (!mount) {
      mount=document.createElement('div');
      const journey=container.querySelector('[data-event-journey]');
      if (journey?.parentElement) journey.before(mount);
      else container.append(mount);
    }
    mount.className='rsvp-block';mount.dataset.rsvpEvent=String(event.id);
    mount.setAttribute('role','region');mount.setAttribute('aria-label','Your RSVP');
    const problem=failure || state.error;
    const busy=pending || (state.pending && !problem);
    const going=state.ids.includes(event.id) && !busy && !problem;
    const label=busy ? 'Saving RSVP...' : problem ? 'Retry RSVP' : !state.ready ? 'Loading RSVP...' : going ? 'Cancel RSVP' : 'Join event';
    mount.innerHTML='<div class="rsvp-inner"><div class="rsvp-count"><span class="rsvp-count-icon" aria-hidden="true">🎟️</span><span class="rsvp-count-text"><strong>Your RSVP</strong><span class="rsvp-status" role="status" aria-live="polite"></span></span></div><button class="rsvp-btn" type="button"></button></div><p class="rsvp-note"></p>';
    const status=mount.querySelector('.rsvp-status'), button=mount.querySelector('button');
    status.textContent=problem ? 'Your RSVP is not confirmed. Reconnect or retry.' : busy ? 'Saving your RSVP...' : !state.ready ? 'Loading your account RSVP...' : going ? "You're planning to go." : 'You have not joined this event.';
    button.id='rsvp-btn-'+event.id;button.textContent=label;
    button.classList.add(going ? 'rsvp-btn--cancel' : 'rsvp-btn--join');
    button.disabled=busy || (!state.ready && !problem);
    button.setAttribute('aria-pressed',String(going));
    button.setAttribute('aria-label',problem ? 'Retry RSVP for '+event.title : going ? 'Cancel your RSVP for '+event.title : 'Join '+event.title);
    mount.querySelector('.rsvp-note').textContent=actor === 'demo'
      ? 'Sample event. Your RSVP stays in this browser; contact the host for registration or tickets.'
      : 'Your RSVP is private to your account; contact the host for registration or tickets.';
    button.addEventListener('click',async()=>{
      if (pending || getUser()?.id !== actor || getAccount() !== account) return;
      if (readError) { failure='';render();return; }
      if (!state.ready) { account?.retry();return; }
      const next=intent || (state.error ? state.ids : state.ids.includes(event.id) ? state.ids.filter(id=>id!==event.id) : [...state.ids,event.id]);
      const token=generation, userId=actor, currentAccount=account;
      intent=next;pending=true;failure='';render();
      const current=()=>generation===token && getUser()?.id===userId && getAccount()===currentAccount;
      try {
        if (userId==='demo') getStorage().setItem(DEMO_KEY,JSON.stringify(next));
        else await currentAccount.write('saved_rsvps',next);
        if (current()) intent=null;
      } catch { if(current()) failure='RSVP save failed'; }
      finally {
        if(current()) {
          pending=false;render();
          container?.querySelector('[data-rsvp-event] button:not(:disabled)')?.focus({preventScroll:true});
        }
      }
    });
  }

  function attach(body,candidate) {
    const id=candidate?.id ?? Number(body?.querySelector('[data-event-journey]')?.dataset.eventId || body?.closest('dialog')?.dataset.eventId);
    const actual=validEventLinkId(id) ? getEvents().find(row=>row.id===Number(id)) : null;
    const user=getUser(), nextAccount=getAccount();
    if (!body || !actual || !user) { clear();return; }
    if (event?.id!==actual.id || actor!==user.id || account!==nextAccount) clear();
    container=body;event=actual;actor=user.id;account=nextAccount;
    if (account && !unsubscribe) unsubscribe=account.subscribe(()=>{
      const section=account.sectionStatus('saved_rsvps');
      if (!pending && failure && !section.pending && !section.error) { failure='';intent=null; }
      render();
    });
    render();
  }

  const storageChanged=change=>{if(actor==='demo' && (change.key===DEMO_KEY || change.key===null))render();};
  window.addEventListener('storage',storageChanged);
  return {attach,clear,destroy(){clear();window.removeEventListener('storage',storageChanged);}};
}

function injectStyles() {
  if(document.getElementById('rsvp-styles'))return;
  const style=document.createElement('style');style.id='rsvp-styles';
  style.textContent=`
      /* ── RSVP block ── */
      .rsvp-block {
        margin: 1rem 0;
        padding: 1rem 1.25rem;
        border-radius: 14px;
        background: color-mix(in srgb, var(--accent, #7c3aed) 8%, var(--surface, #1e1b2e) 92%);
        border: 1.5px solid color-mix(in srgb, var(--accent, #7c3aed) 20%, transparent);
      }

      .rsvp-inner {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 1rem;
        flex-wrap: wrap;
      }

      .rsvp-count {
        display: flex;
        align-items: center;
        gap: 0.6rem;
        color: var(--text, #e2e0f0);
      }

      .rsvp-count-icon {
        font-size: 1.3rem;
        line-height: 1;
      }

      .rsvp-count-text {
        font-size: 0.95rem;
        line-height: 1.3;
      }

      .rsvp-count-text strong {
        display: block;
        font-size: 1.4rem;
        font-weight: 700;
        color: var(--accent, #a78bfa);
        line-height: 1;
      }

      .rsvp-you-badge {
        display: inline-block;
        padding: 0.2em 0.65em;
        border-radius: 99px;
        font-size: 0.75rem;
        font-weight: 600;
        background: color-mix(in srgb, #22c55e 15%, transparent);
        color: #4ade80;
        border: 1px solid color-mix(in srgb, #22c55e 30%, transparent);
        letter-spacing: 0.01em;
      }

      /* ── RSVP button ── */
      .rsvp-btn {
        display: inline-flex;
        align-items: center;
        gap: 0.45rem;
        padding: 0.6rem 1.25rem;
        border-radius: 10px;
        font-size: 0.92rem;
        font-weight: 600;
        cursor: pointer;
        border: none;
        transition: transform 0.15s ease, opacity 0.15s ease, box-shadow 0.15s ease;
        font-family: inherit;
        white-space: nowrap;
      }

      .rsvp-btn:hover {
        transform: translateY(-1px);
        opacity: 0.92;
      }

      .rsvp-btn:active {
        transform: scale(0.97);
      }

      .rsvp-btn--join {
        background: var(--accent, #7c3aed);
        color: #fff;
        box-shadow: 0 2px 12px color-mix(in srgb, var(--accent, #7c3aed) 40%, transparent);
      }

      .rsvp-btn--cancel {
        background: color-mix(in srgb, #ef4444 12%, var(--surface, #1e1b2e) 88%);
        color: #f87171;
        border: 1.5px solid color-mix(in srgb, #ef4444 30%, transparent);
      }

      .rsvp-btn-icon {
        font-size: 1rem;
        line-height: 1;
      }

      @media (max-width: 480px) {
        .rsvp-inner {
          flex-direction: column;
          align-items: flex-start;
        }
        .rsvp-btn {
          width: 100%;
          justify-content: center;
        }
      }

      .rsvp-block{background:#f6f1fc;border-color:#dfd0ee}
      .rsvp-count{color:#574767;min-width:0}
      .rsvp-count-text{font-size:12px;line-height:1.5;overflow-wrap:anywhere}
      .rsvp-count-text strong{font-size:14px;line-height:1.7;color:#573181}
      .rsvp-btn{min-height:44px}
      .rsvp-btn--join{background:#7541db;color:#fff}
      .rsvp-btn--cancel{background:#fff;color:#6b348f;border-color:#c8b2db}
      .rsvp-btn:disabled{opacity:.65;cursor:wait;transform:none}
      .rsvp-btn:focus-visible{outline:3px solid #269b9d;outline-offset:3px}
      .rsvp-note{font:11px/1.6 Inter,Arial,sans-serif;color:#6b5d79;margin:12px 0 0}
      html[data-theme="dark"] .rsvp-block{background:#2b213b;border-color:#58426e}
      html[data-theme="dark"] .rsvp-count,html[data-theme="dark"] .rsvp-note{color:#dfd2ee}
      html[data-theme="dark"] .rsvp-count-text strong{color:#d2b4f9}
      html[data-theme="dark"] .rsvp-btn--cancel{background:#3b284a;color:#ebcffb;border-color:#9470aa}
`;
  document.head.append(style);
}
