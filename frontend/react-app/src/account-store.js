import { doc,onSnapshot,runTransaction,serverTimestamp,setDoc } from 'firebase/firestore';
import { auth } from './firebase';
import { db } from './shared-feed-store';
import { cleanAccountSection,encodeAccountSection,legacyAccountData,mergeBadges,mergeDashboard,mergeSavedEvents } from './account-data.js';
import { createAccountSync } from './account-sync.js';

export function createAccountStore(user,events) {
  function owner() {
    if(!auth.currentUser || auth.currentUser.isAnonymous || auth.currentUser.uid !== user.id) throw new Error('Sign in to save your account data.');
  }
  return createAccountSync({user,events,online:()=>navigator.onLine,
    legacy:name=>{try{return legacyAccountData(name,user,localStorage,sessionStorage);}catch{return null;}},
    watch(name,receive,fail){
      owner();return onSnapshot(doc(db,'campusAccountData',user.id,'state',name),{includeMetadataChanges:true},snapshot=>receive({exists:snapshot.exists(),value:snapshot.data()?.value,pending:snapshot.metadata.hasPendingWrites,fromCache:snapshot.metadata.fromCache}),fail);
    },
    async commit(name,value,{ifMissing=false,base}) {
      owner();
      const reference=doc(db,'campusAccountData',user.id,'state',name);
      const payload=data=>({version:1,value:encodeAccountSection(name,data,user,events).json,updatedAt:serverTimestamp()});
      if(ifMissing || ['badges','saved','dashboard'].includes(name)) return runTransaction(db,async transaction=>{
        const snapshot=await transaction.get(reference);
        const previous=snapshot.exists() ? cleanAccountSection(name,JSON.parse(snapshot.data().value),user,events) : null;
        if(ifMissing && snapshot.exists()) return previous;
        const data=name === 'badges' ? mergeBadges(previous,value) : name === 'saved' ? mergeSavedEvents(base || [],value,previous || []) : name === 'dashboard' ? mergeDashboard(previous,value) : value;
        transaction.set(reference,payload(data));return data;
      });
      await setDoc(reference,payload(value));return value;
    },
  });
}
