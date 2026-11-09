import test from 'node:test';
import assert from 'node:assert/strict';
import {validSuggestionPoster} from '../src/suggestion-poster.js';
import {cleanAccountSection} from '../src/account-data.js';
import {publicationPayload,publishedEvent} from '../src/published-events-model.js';
const id='test-idea',imageId='01234567890123456789';
const publicId=`campusvibe-suggestions/${id}/${imageId}`;
const poster={id:imageId,publicId,src:`https://res.cloudinary.com/ghr7xnsl/image/upload/v123/${publicId}.jpg`,width:800,height:600};
test('poster metadata is constrained to its suggestion, Cloudinary image folder and compressed dimensions',()=>{
 assert.ok(validSuggestionPoster(poster,id));
 for(const value of [{...poster,id:'../bad'},{...poster,src:'javascript:alert(1)'},{...poster,src:poster.src.replace('ghr7xnsl','other')},{...poster,width:1281},{...poster,height:0},{...poster,uid:'private-user'},{...poster,publicId:'campusvibe-feed/user/image'}])assert.equal(validSuggestionPoster(value,id),false);
 assert.equal(validSuggestionPoster(poster,'other-idea'),false);
});
test('account draft reload preserves the poster but drops invalid media and file data',()=>{
 const draft=cleanAccountSection('suggestion',{id,poster,file:'large private blob'}, {}, []);
 assert.deepEqual(draft.poster,poster);assert.equal(draft.file,undefined);
 assert.equal(cleanAccountSection('suggestion',{id:'other',poster},{},[]).poster,undefined);
});
test('publication carries the poster without putting author identity into its public path',()=>{
 const idea={name:'Film night',category:'Arts',description:'A film.',host:'Private Club',authorName:'Private Student',anonymous:true,poster};
 const value=publicationPayload(idea,id,1000,{date:'2026-11-20',location:'Campus lawn',time:''},{toMillis:()=>1});
 assert.deepEqual(value.poster,poster);assert.equal(value.host,'Campus community');assert.ok(!('authorName' in value));
 assert.deepEqual(publishedEvent(id,value).poster,poster);
 assert.throws(()=>publicationPayload({...idea,poster:{...poster,src:'https://evil.test/poster.jpg'}},id,1000,{date:'2026-11-20',location:'Campus lawn'},{}));
});
test('old text-only drafts and events retain the existing placeholder behavior',()=>{
 assert.equal(cleanAccountSection('suggestion',{id},{},[]).poster,undefined);
 const value=publicationPayload({name:'No poster',category:'All',description:'Text only.',host:'Club'},id,1000,{date:'2026-11-20',location:'Campus lawn'},{toMillis:()=>1});
 assert.equal(publishedEvent(id,value).photo,'event-placeholder.svg');assert.equal(value.poster,undefined);
});
