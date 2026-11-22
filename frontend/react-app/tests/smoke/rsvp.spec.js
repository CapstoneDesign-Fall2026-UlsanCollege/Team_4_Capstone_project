import {test,expect} from './sample-fixture.js';
import {fileURLToPath} from 'node:url';

async function enter(page) {
  await page.goto('/#/community/events/1');await page.locator('#landingDemo').click();
  await expect(page.locator('#dashboardDialogTitle')).toHaveText('HackNight: Build-a-Thon');
}
const region=page=>page.getByRole('region',{name:'Your RSVP',exact:true});

test('RSVP appears on first open, persists across reopening and cancels without duplicate blocks',async({page},testInfo)=>{
  const errors=[];page.on('pageerror',error=>errors.push(error.message));
  await enter(page);
  await expect(region(page)).toHaveCount(1);
  await page.locator('#rsvp-btn-1').click();await expect(page.locator('#rsvp-btn-1')).toHaveText('Remove plan');
  await expect(region(page)).toContainText("You're planning to go.");
  await expect(region(page)).not.toContainText(/people going|person going/);
  await page.locator('#closeDashboardDialog').click();await expect(region(page)).toHaveCount(0);
  await page.locator('#eventsGrid [data-discover-event="1"]').click();
  await expect(region(page)).toHaveCount(1);await expect(page.locator('#rsvp-btn-1')).toHaveText('Remove plan');
  // Rebuilding the dialog to save the event keeps the RSVP and the trip planner available.
  await page.locator('#dashboardDialog [data-save="1"]').click();
  await expect(region(page)).toHaveCount(1);await expect(page.locator('#rsvp-btn-1')).toHaveText('Remove plan');
  await expect(page.getByRole('region',{name:'Plan your trip',exact:true})).toHaveCount(1);
  await page.reload();await page.locator('#landingDemo').click();
  await expect(page.locator('#rsvp-btn-1')).toHaveText('Remove plan');
  await page.locator('#rsvp-btn-1').click();await expect(page.locator('#rsvp-btn-1')).toHaveText('Plan to go');
  await expect(page.locator('#rsvp-btn-1')).toHaveAttribute('aria-pressed','false');
  expect(await page.evaluate(()=>document.querySelectorAll('#rsvp-styles').length)).toBe(1);
  expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBe(true);
  await page.screenshot({path:testInfo.outputPath('rsvp-ready.png'),fullPage:true,animations:'disabled'});
  expect(errors).toEqual([]);
});

test('blocked demo storage shows an unconfirmed save and retries the intended join',async({page})=>{
  await page.addInitScript(()=>{
    window.blockRsvp=true;
    const write=Storage.prototype.setItem;
    Storage.prototype.setItem=function(key,value){if(key==='cv_rsvps_demo'&&window.blockRsvp)throw new Error('blocked');return write.call(this,key,value);};
    localStorage.setItem('cv_rsvps','[1]');
  });
  await enter(page);await expect(page.locator('#rsvp-btn-1')).toHaveText('Plan to go');
  await page.locator('#rsvp-btn-1').click();await expect(page.locator('#rsvp-btn-1')).toHaveText('Retry RSVP');
  await expect(region(page)).toContainText('not confirmed');
  await expect(page.locator('#rsvp-btn-1')).toHaveAttribute('aria-pressed','false');
  await page.evaluate(()=>{window.blockRsvp=false;});
  await page.locator('#rsvp-btn-1').click();await expect(page.locator('#rsvp-btn-1')).toHaveText('Remove plan');
});

test('missing event data has no invented RSVP and event titles are handled as text',async({page})=>{
  await enter(page);
  await page.evaluate(()=>{
    window.campusEventCatalog[0].title='A "quoted" <img src=x onerror="window.rsvpInjected=true"> event';
    window.campusRsvp.attach(document.querySelector('#dashboardDialogBody'),window.campusEventCatalog[0]);
  });
  await expect(page.locator('#rsvp-btn-1')).toHaveAttribute('aria-label',/A "quoted" <img/);
  expect(await page.evaluate(()=>window.rsvpInjected)).toBeUndefined();
  await page.evaluate(()=>{location.hash='#/community/events/999';});
  await expect(page.locator('#dashboardDialogTitle')).toHaveText('Event unavailable');
  await expect(region(page)).toHaveCount(0);
});

test('RSVP attachment does not depend on a trip planner mount or duplicate an existing block',async({page})=>{
  await enter(page);
  await page.evaluate(()=>{
    const body=document.querySelector('#dashboardDialogBody');
    body.querySelector('[data-event-journey]').remove();
    window.campusRsvp.attach(body,window.campusEventCatalog[0]);
    window.campusRsvp.attach(body,window.campusEventCatalog[0]);
  });
  await expect(region(page)).toHaveCount(1);await expect(page.locator('#rsvp-btn-1')).toHaveText('Plan to go');
});

test('an old account save cannot change the RSVP displayed for another account',async({page})=>{
  await enter(page);
  const module='/@fs/'+fileURLToPath(new URL('../../../rsvp.js',import.meta.url)).replaceAll('\\','/');
  await page.evaluate(async module=>{
    const {createRsvpController}=await import(module);
    window.campusRsvp.destroy();
    window.rsvpActor={id:'fixture-alice'};
    const alice={ready:()=>true,read:()=>[],sectionStatus:()=>({pending:false,error:''}),subscribe:()=>()=>{},write:()=>new Promise(resolve=>{window.finishOldRsvp=()=>resolve([1]);})};
    const bob={...alice,write:async value=>value};
    const accounts={'fixture-alice':alice,'fixture-bob':bob};
    window.rsvpFixture=createRsvpController({getUser:()=>window.rsvpActor,getAccount:()=>accounts[window.rsvpActor.id],getEvents:()=>window.campusEventCatalog});
    window.rsvpFixture.attach(document.querySelector('#dashboardDialogBody'),window.campusEventCatalog[0]);
  },module);
  await page.locator('#rsvp-btn-1').click();await expect(page.locator('#rsvp-btn-1')).toBeDisabled();
  await page.evaluate(()=>{
    window.rsvpFixture.clear();window.rsvpActor={id:'fixture-bob'};
    window.rsvpFixture.attach(document.querySelector('#dashboardDialogBody'),window.campusEventCatalog[0]);
    window.finishOldRsvp();
  });
  await expect(page.locator('#rsvp-btn-1')).toHaveText('Plan to go');
  await expect(region(page)).not.toContainText("You're planning to go.");
});
