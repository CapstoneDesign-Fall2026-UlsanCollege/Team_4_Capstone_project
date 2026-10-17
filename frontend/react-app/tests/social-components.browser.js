import { chromium } from 'playwright';
import { expect as baseExpect } from '@playwright/test';
import assert from 'node:assert/strict';

const url=process.env.ACCOUNT_TEST_URL || 'http://127.0.0.1:5186';
if(!/^http:\/\/(127\.0\.0\.1|localhost):\d+\/?$/.test(url))throw new Error('Use a local Vite preview for component checks.');
const expect=baseExpect.configure({timeout:20000}),browser=await chromium.launch({channel:'chrome'}),errors=[];
try{
  const context=await browser.newContext();
  await context.route('**/*',route=>['127.0.0.1','localhost'].includes(new URL(route.request().url()).hostname) ? route.continue() : route.abort());
  await context.route('**/social-component-test.html',route=>route.fulfill({contentType:'text/html',body:'<!doctype html><html><body><main id="test"></main></body></html>'}));
  const page=await context.newPage();page.on('pageerror',error=>errors.push(error.message));
  await page.goto(`${url}/social-component-test.html`);
  await page.evaluate(async()=>{
    const {default:refresh}=await import('/@react-refresh');refresh.injectIntoGlobalHook(window);window.$RefreshReg$=()=>{};window.$RefreshSig$=()=>type=>type;window.__vite_plugin_react_preamble_installed__=true;
    const react=await import('/node_modules/.vite/deps/react.js'),client=await import('/node_modules/.vite/deps/react-dom_client.js');
    const {createElement}=react.default || react,{createRoot}=client.default || client,{Post}=await import('/src/Feed.jsx');
    const root=createRoot(document.getElementById('test'));
    const post={id:'test-post',authorId:'test-alice',authorName:'Alice',college:'Test Campus',body:'Test post',createdAt:Date.now(),images:[],event:null,comments:[],likes:[],interested:[],savedBy:[]};
    window.commentCalls=0;
    const render=busy=>root.render(createElement(Post,{post,user:{id:'test-alice',name:'Alice'},shared:true,busy,onChange:()=>{
      window.commentCalls+=1;render(true);return new Promise((resolve,reject)=>{window.commentResolve=value=>{render(false);resolve(value);};window.commentReject=()=>{render(false);reject(new Error('Simulated comment failure'));};});
    },onPhoto:()=>{},onCopy:()=>{},onEdit:()=>{},onDelete:()=>{}}));
    render(false);
  });
  await page.getByRole('button',{name:'Comment',exact:true}).click();
  const input=page.getByRole('textbox',{name:'Write a comment',exact:true}),send=page.getByRole('button',{name:'Send comment',exact:true});
  await input.fill('First submitted comment');await send.click();await expect(send).toBeDisabled();await expect(input).toBeEnabled();
  await input.fill('A second unsent comment');await page.locator('.feed-comments form').evaluate(form=>form.requestSubmit());
  assert.equal(await page.evaluate(()=>window.commentCalls),1);
  await page.evaluate(()=>window.commentResolve(true));await expect(input).toHaveValue('A second unsent comment');await expect(send).toBeEnabled();
  await send.click();await page.evaluate(()=>window.commentReject());await expect(input).toHaveValue('A second unsent comment');await expect(page.getByRole('alert')).toContainText('Simulated comment failure');await expect(send).toBeEnabled();
  await send.click();await page.evaluate(()=>window.commentResolve(true));await expect(input).toHaveValue('');
  await input.fill('Repeated text');await send.click();await input.fill('Edited text');await input.fill('Repeated text');await page.evaluate(()=>window.commentResolve(true));await expect(input).toHaveValue('Repeated text');
  assert.equal(await page.evaluate(()=>window.commentCalls),4);assert.deepEqual(errors,[]);
  console.log('PASS: delayed comment success retains newer edits, failed sends retain text, unchanged successful text clears, and duplicate submits are ignored.');
}finally{await browser.close();}
