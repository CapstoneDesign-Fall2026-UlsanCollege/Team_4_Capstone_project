import { cleanActivity, cleanProfile } from './profile-store.js';
import { cleanSession } from './assistant/session.js';
import { BADGES } from './progress-badges.js';

export const ACCOUNT_SECTIONS = ['profile','saved','dashboard','badges','suggestion','assistant'];
export const sectionLimit = name => name === 'assistant' ? 200000 : 20000;
export const freshSuggestion = () => ({ id:crypto.randomUUID(),name:'',host:'',category:'All',date:'',location:'',description:'',anonymous:false });
const text = (value,max) => typeof value === 'string' ? value.slice(0,max) : '';

export function mergeBadges(...values) {
  const earned=new Map();
  for (const value of values) for (const row of Array.isArray(value?.earned) ? value.earned.slice(0,50) : []) {
    if (!BADGES.some(badge=>badge.id === row?.id) || typeof row.earnedAt !== 'string' || !Number.isFinite(Date.parse(row.earnedAt))) continue;
    const date=new Date(row.earnedAt).toISOString();
    if (!earned.has(row.id) || date<earned.get(row.id)) earned.set(row.id,date);
  }
  return { version:1,earned:BADGES.flatMap(badge=>earned.has(badge.id) ? [{id:badge.id,earnedAt:earned.get(badge.id)}] : []) };
}

export function mergeSavedEvents(base,next,remote) {
  const before=new Set(base),after=new Set(next);
  const removed=new Set(base.filter(id=>!after.has(id)));
  return [...new Set([...remote.filter(id=>!removed.has(id)),...next.filter(id=>!before.has(id))])];
}

export function mergeDashboard(previous,next) {
  const activity=new Map([...cleanActivity(previous?.activity),...cleanActivity(next.activity)].map(row=>[JSON.stringify(row),row]));
  return {activity:[...activity.values()].sort((a,b)=>Date.parse(b.at)-Date.parse(a.at)).slice(0,30),drafts:previous?.drafts || next.drafts};
}

export function cleanAccountSection(name,value,user,events) {
  if (name === 'profile') return cleanProfile(value,user,[...new Set(events.map(event=>event.host))]);
  if (name === 'saved') return [...new Set(Array.isArray(value) ? value.filter(id=>events.some(event=>event.id === id)) : [])];
  if (name === 'badges') return mergeBadges(value);
  if (name === 'dashboard') return { activity:cleanActivity(value?.activity),drafts:Array.isArray(value?.drafts) ? value.drafts.slice(0,50) : [] };
  if (name === 'assistant') return cleanSession(value,events);
  if (name === 'suggestion') return {
    id:typeof value?.id === 'string' && /^[a-zA-Z0-9-]{1,80}$/.test(value.id) ? value.id : crypto.randomUUID(),
    name:text(value?.name,100),host:text(value?.host,100),date:text(value?.date,10),location:text(value?.location,120),description:text(value?.description,500),
    category:['All','Tech','Arts','Music','Sports','Social','Academics'].includes(value?.category) ? value.category : 'All',anonymous:value?.anonymous === true,
  };
  throw new Error('Unknown account data section.');
}

export function encodeAccountSection(name,value,user,events) {
  const data=cleanAccountSection(name,value,user,events), json=JSON.stringify(data);
  if (new TextEncoder().encode(json).length>sectionLimit(name)) throw new Error('This account record is too large to save. Remove older content and retry.');
  return {data,json};
}

export function legacyAccountData(name,user,local,session) {
  // The old cv_saved list was shared by every browser user, so never import it automatically.
  const key={profile:`cv_profile_${user.email || user.id}`,dashboard:`cv_dashboard_${user.email}`,badges:`cv_progress_badges_${encodeURIComponent(user.id)}`,suggestion:`cv_suggestion_draft_${user.id}`,assistant:`cv_assistant_session_${encodeURIComponent(user.id)}`}[name];
  try {
    const value=key ? JSON.parse((name === 'assistant' ? session : local)?.getItem(key) || 'null') : null;
    const interest=name === 'profile' && !value ? local?.getItem(`cv_interest_${user.id}`) : '';
    return interest ? {interests:[interest]} : value;
  }
  catch { return null; }
}
