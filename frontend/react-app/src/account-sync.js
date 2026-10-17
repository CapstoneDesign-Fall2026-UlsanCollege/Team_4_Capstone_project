import { ACCOUNT_SECTIONS,cleanAccountSection,encodeAccountSection } from './account-data.js';

export function createAccountSync({user,events,watch,commit,legacy=()=>null,online=()=>true}) {
  const values=new Map(ACCOUNT_SECTIONS.map(name=>[name,cleanAccountSection(name,null,user,events)]));
  const loaded=new Set(), dirty=new Set(), bases=new Map(), errors=new Map(), listeners=new Set(), timers=new Map(), queues=new Map(), revisions=new Map(), stops=new Map();
  let active=true;
  const emit=() => {if(active) for(const listener of listeners) listener();};
  function connect(name) {
    stops.get(name)?.();
    stops.set(name,watch(name,async snapshot=>{
      if (!active || snapshot.pending || snapshot.fromCache) return;
      try {
        let value=snapshot.exists ? JSON.parse(snapshot.value) : null;
        if (!snapshot.exists && !loaded.has(name)) {
          const previous=legacy(name);
          if (previous !== null) {
            let imported;
            try{imported=encodeAccountSection(name,previous,user,events).data;}
            catch{errors.set(`migration:${name}`,'Older browser data is too large to import. Its browser copy has been kept.');}
            if(imported !== undefined)value=await commit(name,imported,{ifMissing:true});
          }
        }
        if (!active) return;
        if (!dirty.has(name)) values.set(name,cleanAccountSection(name,value,user,events));
        loaded.add(name); errors.delete(`read:${name}`);if(store.ready()){errors.delete('load');clearTimeout(loadTimer);} emit();
      } catch (error) { errors.set(`read:${name}`,error.message || 'Account data could not be loaded.');emit(); }
    },error=>{errors.set(`read:${name}`,error.message || 'Account data could not be loaded.');emit();}));
  }
  function stage(name,value,delay=500) {
    if (!active || !loaded.has(name)) throw new Error('Account data is still loading. Please retry.');
    const next=encodeAccountSection(name,value,user,events).data;
    if (JSON.stringify(next) === JSON.stringify(values.get(name))) return;
    if(!dirty.has(name))bases.set(name,values.get(name));
    values.set(name,next);dirty.add(name);errors.delete(name);
    clearTimeout(timers.get(name));
    timers.set(name,setTimeout(()=>{timers.delete(name);write(name,values.get(name)).catch(()=>{});},delay));emit();
  }
  function write(name,value) {
    if (!active || !loaded.has(name)) return Promise.reject(new Error('Account data is still loading. Please retry.'));
    let next;
    try {next=encodeAccountSection(name,value,user,events).data;} catch(error){return Promise.reject(error);}
    clearTimeout(timers.get(name));timers.delete(name);
    if(!dirty.has(name))bases.set(name,values.get(name));
    const base=bases.get(name);
    values.set(name,next);dirty.add(name);errors.delete(name);
    const revision=(revisions.get(name) || 0)+1;revisions.set(name,revision);emit();
    const task=(queues.get(name) || Promise.resolve()).catch(()=>{}).then(async()=>{
      if (!active) throw new Error('Sign in again before saving.');
      if (!online()) throw new Error('Offline: changes are not saved to your account yet. Reconnect and retry.');
      const result=await commit(name,next,{base});
      if (active && revisions.get(name) === revision && !timers.has(name)) { values.set(name,cleanAccountSection(name,result,user,events));dirty.delete(name);bases.delete(name);errors.delete(name); }
      emit();return result;
    }).catch(error=>{if(active && revisions.get(name) === revision) errors.set(name,error.message || 'Account save failed. Retry to keep your changes.');emit();throw error;});
    queues.set(name,task);return task;
  }
  const store={
    user,read:name=>values.get(name),ready:()=>ACCOUNT_SECTIONS.every(name=>loaded.has(name)),
    status:()=>({ready:store.ready(),pending:dirty.size>0,error:[...errors.values()][0] || ''}),
    sectionStatus:name=>({pending:dirty.has(name),error:errors.get(name) || ''}),
    subscribe(listener){listeners.add(listener);return()=>listeners.delete(listener);},write,stage,
    retry(){for(const name of ACCOUNT_SECTIONS) if(!loaded.has(name) || errors.has(`read:${name}`)) connect(name);for(const name of dirty) write(name,values.get(name)).catch(()=>{});},
    close(){active=false;clearTimeout(loadTimer);for(const stop of stops.values())stop();for(const timer of timers.values())clearTimeout(timer);listeners.clear();},
  };
  const loadTimer=setTimeout(()=>{if(!store.ready()){errors.set('load','Account data is still unavailable. Check your connection and retry.');emit();}},12000);
  for(const name of ACCOUNT_SECTIONS) connect(name);
  return store;
}
