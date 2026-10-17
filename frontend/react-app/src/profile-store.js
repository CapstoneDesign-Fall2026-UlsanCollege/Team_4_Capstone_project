export const PROFILE_INTERESTS = ['Coding','AI & ML','Hackathons','Basketball','Photography','Music','Arts','Gaming','Volunteering','Research','Tech','Sports','Social','Academics'];
export const STUDY_YEARS = ['1st Year','2nd Year','3rd Year','4th Year','Graduate','Other'];
export const profileKey = user => `cv_profile_${user.email || user.id}`;
const text = (value, maximum) => typeof value === 'string' ? value.trim().slice(0,maximum) : '';

export function cleanProfile(value, user = {}, hosts = []) {
  const interests = Array.isArray(value?.interests) ? value.interests : user.interest ? [user.interest] : [];
  const unique = new Set();
  return {
    program:text(value?.program,80), bio:text(value?.bio,240), faculty:text(value?.faculty,80), campus:text(value?.campus,80),
    year:STUDY_YEARS.includes(value?.year) ? value.year : '',
    graduation:typeof value?.graduation === 'string' && /^(20\d{2})-(0[1-9]|1[0-2])$/.test(value.graduation) ? value.graduation : '',
    interests:interests.flatMap(item => { const label=text(item,32); if (!label || unique.has(label.toLowerCase())) return []; unique.add(label.toLowerCase()); return [label]; }).slice(0,12),
    followedHosts:[...new Set(Array.isArray(value?.followedHosts) ? value.followedHosts.filter(host => hosts.includes(host)) : [])].slice(0,20),
  };
}
export function loadProfile(storage, user, hosts) {
  try { return { data:cleanProfile(JSON.parse(storage.getItem(profileKey(user)) || 'null'),user,hosts), warning:'' }; }
  catch { return { data:cleanProfile(null,user,hosts), warning:'Profile storage is unavailable or unreadable in this browser.' }; }
}
export function saveProfile(storage, user, value, hosts) {
  const data = cleanProfile(value,user,hosts);
  try { storage.setItem(profileKey(user),JSON.stringify(data)); }
  catch { throw new Error('Could not save your profile in this browser. Your changes have not been applied.'); }
  return data;
}
export function profileCompletion(profile, savedCount) {
  const tasks = [
    { label:'Add your study program',done:!!profile.program,action:'edit' },
    { label:'Write a short bio',done:!!profile.bio,action:'edit' },
    { label:'Choose your interests',done:!!profile.interests.length,action:'interests' },
    { label:'Add your campus',done:!!profile.campus,action:'edit' },
    { label:'Add your study year',done:!!profile.year,action:'edit' },
    { label:'Save your first event',done:savedCount > 0,action:'discover' },
  ];
  return { tasks,percent:Math.round(tasks.filter(task => task.done).length/tasks.length*100) };
}
export function cleanActivity(value) {
  return (Array.isArray(value) ? value : []).filter(item => ['saved','removed','suggested'].includes(item?.type) && typeof item.at === 'string' && Number.isFinite(Date.parse(item.at)) && typeof item.title === 'string').slice(0,30).map(item => ({ type:item.type,title:text(item.title,150),at:item.at }));
}
export function profileSummary(user, profile, includeEmail = false) {
  return [user.name,profile.program,profile.bio,profile.interests.length && `Interests: ${profile.interests.join(', ')}`,includeEmail && user.email].filter(Boolean).join('\n');
}
