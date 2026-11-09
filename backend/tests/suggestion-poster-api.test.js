import test from 'node:test';
import assert from 'node:assert/strict';
import {createPhotoHandler} from '../src/feed-photo.js';
const suggestionId='test-idea',photoId='01234567890123456789',image='data:image/jpeg;base64,/9j/AAAA';
const env={CLOUDINARY_API_KEY:'test-key',CLOUDINARY_API_SECRET:'test-secret'};
function setup({uid='alice',claimUid=uid,claimStatus='active',claimIdea=suggestionId,submitted=false,count=0,providerError=false}={}){
 const calls={upload:[],destroy:[],budget:0};
 const request=async(url,init)=>{
  if(url.includes('accounts:lookup'))return Response.json({users:[{localId:uid,providerUserInfo:[{providerId:'password'}]}]});
  if(url.includes('/campusSuggestionPhotos/'))return Response.json({fields:{uid:{stringValue:claimUid},suggestionId:{stringValue:claimIdea},status:{stringValue:claimStatus}}});
  if(url.includes('/campusSuggestionOwners/'))return submitted?Response.json({fields:{uid:{stringValue:uid}}}):Response.json({},{status:404});
  if(url.includes('/campusSuggestions/'))return Response.json({fields:{poster:{mapValue:{fields:{id:{stringValue:photoId}}}}}});
  if(url.includes('/campusFeedPhotoUploads/'))return Response.json({fields:{count:{integerValue:String(count)},windowStart:{timestampValue:new Date().toISOString()}},updateTime:new Date().toISOString()});
  if(url.endsWith(':commit')){calls.budget++;return Response.json({});}
  throw new Error('Unexpected test request.');
 };
 const media={uploader:{upload:async(file,options)=>{calls.upload.push(options);if(providerError)throw new Error(env.CLOUDINARY_API_SECRET);return{public_id:options.public_id,secure_url:`https://res.cloudinary.com/ghr7xnsl/image/upload/v123/${options.public_id}.jpg`,width:800,height:600};},destroy:async(id)=>{calls.destroy.push(id);return{result:'ok'};}}};
 const handler=createPhotoHandler({env,request,media,purpose:'suggestion'});
 const invoke=async(body={action:'upload',suggestionId,photoId,image},headers={})=>{
  const res={setHeader(){},end(value){this.body=JSON.parse(value);}};
  await handler({method:'POST',body,headers:{host:'campus.test',origin:'https://campus.test',authorization:'Bearer token','content-type':'application/json',...headers}},res);return res;
 };return{calls,invoke};
}
test('poster uploads require a private matching active claim and never expose the author UID in the public URL',async()=>{
 const {calls,invoke}=setup();const result=await invoke();assert.equal(result.statusCode,200);
 assert.equal(result.body.photo.publicId,`campusvibe-suggestions/${suggestionId}/${photoId}`);
 assert.ok(!result.body.photo.src.includes('alice'));assert.equal(calls.upload[0].overwrite,false);assert.equal(calls.budget,1);
 for(const options of [{claimUid:'bob'},{claimIdea:'other'},{claimStatus:'discarded'}]){const denied=setup(options);assert.equal((await denied.invoke()).statusCode,403);assert.equal(denied.calls.upload.length,0);}
});
test('submitted suggestion images cannot be replaced or deleted through the upload API',async()=>{
 const own=setup({submitted:true});assert.equal((await own.invoke()).statusCode,409);assert.equal(own.calls.upload.length,0);
 const retired=setup({submitted:true,claimStatus:'discarded'});assert.equal((await retired.invoke({action:'discard',suggestionId,photoId})).statusCode,409);assert.equal(retired.calls.destroy.length,0);
});
test('cleanup requires a retired claim and cannot call the feed delete path',async()=>{
 const active=setup();assert.equal((await active.invoke({action:'discard',suggestionId,photoId})).statusCode,403);
 const retired=setup({claimStatus:'discarded'});assert.equal((await retired.invoke({action:'discard',suggestionId,photoId})).statusCode,200);
 assert.deepEqual(retired.calls.destroy,[`campusvibe-suggestions/${suggestionId}/${photoId}`]);assert.equal((await retired.invoke({action:'delete',suggestionId,photoId})).statusCode,400);
});
test('the existing account photo quota covers suggestions and the API rejects unsafe media and IDs',async()=>{
 assert.equal((await setup({count:20}).invoke()).statusCode,429);
 for(const body of [{action:'upload',suggestionId:'../bad',photoId,image},{action:'upload',suggestionId,photoId:'bad',image},{action:'upload',suggestionId,photoId,image:'data:image/svg+xml;base64,AAAA'}]){const test=setup();assert.equal((await test.invoke(body)).statusCode,400);assert.equal(test.calls.upload.length,0);}
});
test('failed providers keep credentials private and reject cross-origin requests',async()=>{
 const result=await setup({providerError:true}).invoke();assert.equal(result.statusCode,503);assert.ok(!JSON.stringify(result.body).includes('test-secret'));
 assert.equal((await setup().invoke(undefined,{origin:'https://other.test'})).statusCode,403);
});
