export const POINTS_PER_LEVEL = 100;
export const BADGES = [
  { id:'explorer',name:'Explorer',level:1,icon:'compass',color:'#9467d3',tint:'#f3ecfc' },
  { id:'scout',name:'Campus Scout',level:2,icon:'shield-check',color:'#258f91',tint:'#eaf8f5' },
  { id:'pathfinder',name:'Pathfinder',level:3,icon:'medal',color:'#477fbc',tint:'#edf4fc' },
  { id:'vibe-maker',name:'Vibe Maker',level:5,icon:'award',color:'#c46f84',tint:'#fff0f4' },
  { id:'campus-legend',name:'Campus Legend',level:10,icon:'crown',color:'#b58b34',tint:'#fff7e5' },
].map(badge => Object.freeze({ ...badge,points:(badge.level-1)*POINTS_PER_LEVEL }));
export const badgeKey = id => `cv_progress_badges_${encodeURIComponent(id)}`;
const safePoints = value => Number.isSafeInteger(value) && value >= 0 ? value : 0;

export function badgeProgress(value, earned = []) {
  const points=safePoints(value), level=Math.floor(points/POINTS_PER_LEVEL)+1;
  const records=new Map(earned.map(item => [item.id,item]));
  const badges=BADGES.map(badge => ({ ...badge,earned:records.has(badge.id),earnedAt:records.get(badge.id)?.earnedAt || '' }));
  const nextBadge=badges.find(badge => !badge.earned) || null;
  return { points,level,levelPercent:points%POINTS_PER_LEVEL,currentBadge:BADGES.findLast(badge => badge.level<=level),badges,earnedCount:badges.filter(badge => badge.earned).length,nextBadge,pointsToNextBadge:nextBadge ? Math.max(0,nextBadge.points-points) : 0 };
}

export function createBadgeTracker(getStorage = () => window.localStorage) {
  const memory=new Map();
  return function track(user, value, now = new Date().toISOString()) {
    const points=safePoints(value);
    if (!user?.id) return { ...badgeProgress(points),newlyEarned:[],warning:'' };
    const key=badgeKey(user.id), known=new Set(BADGES.map(badge => badge.id));
    const records=new Map((memory.get(key) || []).map(item => [item.id,item]));
    let storage,raw=null,warning='';
    try {
      storage=getStorage(); raw=storage.getItem(key);
      const stored=raw ? JSON.parse(raw) : null;
      if (stored?.version === 1 && Array.isArray(stored.earned)) {
        for (const item of stored.earned.slice(0,50)) {
          if (!known.has(item?.id) || typeof item.earnedAt !== 'string' || !Number.isFinite(Date.parse(item.earnedAt))) continue;
          const earnedAt=new Date(item.earnedAt).toISOString(), previous=records.get(item.id);
          if (!previous || earnedAt<previous.earnedAt) records.set(item.id,{ id:item.id,earnedAt });
        }
      } else if (raw) warning='Old badge history could not be read. Current progress is still available.';
    } catch { warning='Badge history could not be read in this browser.'; }
    const newlyEarned=[];
    const earnedAt=Number.isFinite(Date.parse(now)) ? new Date(now).toISOString() : new Date().toISOString();
    for (const badge of BADGES) {
      if (points>=badge.points && !records.has(badge.id)) {
        records.set(badge.id,{ id:badge.id,earnedAt }); newlyEarned.push(badge);
      }
    }
    const earned=BADGES.flatMap(badge => records.has(badge.id) ? [records.get(badge.id)] : []);
    memory.set(key,earned);
    try {
      const serialized=JSON.stringify({ version:1,earned });
      if (serialized!==raw) storage.setItem(key,serialized);
    } catch { warning='Badges are temporary: browser storage is unavailable. They may be lost after reload.'; }
    return { ...badgeProgress(points,earned),newlyEarned,warning };
  };
}
