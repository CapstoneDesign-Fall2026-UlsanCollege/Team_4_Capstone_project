import { test,expect } from '@playwright/test';
async function enter(page) {
  await page.goto('/'); await page.locator('#landingDemo').click();
  await page.locator('#mainNav [data-page=profile]').click();
  await expect(page.locator('#profileName')).toHaveText('Alex Rivera');
  const rail=await page.locator('.cvp-rail').boundingBox(), hero=await page.locator('.cvp-hero').boundingBox();
  if (page.viewportSize().width > 640) expect(rail.x+rail.width).toBeLessThan(hero.x);
}
async function edit(page) {
  await page.getByRole('button',{name:'Edit profile',exact:true}).click();
  await page.getByLabel('Study program',{exact:true}).fill('BSc in Computer Science');
  await page.getByLabel('Faculty',{exact:true}).fill('Faculty of Engineering');
  await page.getByLabel('Campus',{exact:true}).fill('North Campus');
  await page.getByLabel('Study year',{exact:true}).selectOption('2nd Year');
  await page.getByLabel('Expected graduation',{exact:true}).fill('2028-05');
  await page.getByLabel('About you',{exact:true}).fill('Curious builder who loves tech, teamwork, and campus events.');
  await page.getByRole('button',{name:'Save changes',exact:true}).click();
}

test('profile edits and interests persist without inventing account details',async ({page},testInfo) => {
  const errors=[]; page.on('pageerror',error=>errors.push(error.message));
  await enter(page);
  await expect(page.locator('#profileStudy')).toHaveText('Not added yet');
  await expect(page.locator('#profileName').getByLabel('Email verified')).toHaveCount(0);
  await expect(page.locator('.cvp-workspace')).toContainText('Not club membership');
  await edit(page);
  await expect(page.getByRole('progressbar',{name:'Profile completion'})).toHaveAttribute('value','83');
  await page.getByRole('button',{name:'Manage interests',exact:true}).click();
  await page.getByRole('checkbox',{name:'Coding',exact:true}).check();
  await page.getByRole('checkbox',{name:'Photography',exact:true}).check();
  await page.getByRole('textbox',{name:'Custom interest',exact:true}).fill('Robotics');
  await page.getByRole('button',{name:'Add custom interest',exact:true}).click();
  await page.getByRole('button',{name:'Save interests',exact:true}).click();
  await expect(page.locator('#profileInterests')).toContainText('Robotics');
  await page.reload(); await page.evaluate(()=>document.querySelector('#demoLogin').click());
  await expect(page.locator('#profileProgram')).toHaveText('BSc in Computer Science');
  await expect(page.locator('#profileInterests')).toContainText('Photography');
  await page.getByRole('button',{name:'Edit profile',exact:true}).click();
  await page.getByLabel('Study program',{exact:true}).fill('Should not persist');
  await page.getByRole('button',{name:'Cancel',exact:true}).click();
  await expect(page.locator('#profileProgram')).toHaveText('BSc in Computer Science');
  await page.mouse.move(0,0); await page.evaluate(()=>window.scrollTo(0,0)); await page.screenshot({path:testInfo.outputPath('profile-edited.png'),fullPage:true,animations:'disabled'});
  expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBe(true);
  expect(errors).toEqual([]);
});

test('saved events, real activity and followed hosts update the reference panels',async ({page},testInfo) => {
  await enter(page); await edit(page);
  await page.locator('.cvp-explore').getByRole('button',{name:'Save event: HackNight: Build-a-Thon',exact:true}).click();
  await expect(page.locator('#profileSavedEvents')).toContainText('HackNight');
  await expect(page.locator('#profileActivity')).toContainText('Saved HackNight');
  await expect(page.getByRole('progressbar',{name:'Profile completion'})).toHaveAttribute('value','100');
  await page.locator('#profileSavedEvents').getByRole('button',{name:'View details: HackNight: Build-a-Thon',exact:true}).click();
  await expect(page.locator('#dashboardDialogTitle')).toHaveText('HackNight: Build-a-Thon');
  await page.locator('#closeDashboardDialog').click();
  await page.getByRole('navigation',{name:'Profile workspace navigation'}).getByRole('button',{name:'Clubs',exact:true}).click();
  await page.getByRole('checkbox',{name:'Code Collective',exact:true}).check();
  await page.getByRole('button',{name:'Save followed hosts',exact:true}).click();
  await expect(page.locator('.cvp-hosts')).toContainText('Code Collective');
  await page.mouse.move(0,0); await page.evaluate(()=>window.scrollTo(0,0)); await page.screenshot({path:testInfo.outputPath('profile-saved.png'),fullPage:true,animations:'disabled'});
  await page.locator('#profileSavedEvents').getByRole('button',{name:'Remove from saved: HackNight: Build-a-Thon',exact:true}).click();
  await expect(page.locator('#profileSavedEvents')).toContainText('No saved events yet');
  await expect(page.locator('#profileActivity')).toContainText('Removed HackNight');
  await page.getByRole('button',{name:'View all activity',exact:true}).click();
  await expect(page.getByRole('dialog')).toContainText('Saved HackNight');
  await expect(page.getByRole('dialog')).toContainText('Removed HackNight');
  await page.keyboard.press('Escape');
  await page.getByRole('navigation',{name:'Profile workspace navigation'}).getByRole('button',{name:'Events',exact:true}).click();
  await expect(page.locator('#page-discover')).toBeVisible(); await page.goBack();
  await expect(page.locator('#page-profile')).toBeVisible();
});

test('profile sharing protects email and reset requires explicit confirmation',async ({page}) => {
  await enter(page); await edit(page);
  await page.evaluate(()=>{ Object.defineProperty(navigator,'clipboard',{configurable:true,value:{writeText:async text=>{window.profileCopied=text;}}}); });
  await page.getByRole('button',{name:'Share profile',exact:true}).click();
  await expect(page.getByRole('textbox',{name:'Profile summary to share'})).not.toHaveValue(/alex@campus.edu/);
  await page.getByRole('checkbox',{name:'Include my email address',exact:true}).check();
  await expect(page.getByRole('textbox',{name:'Profile summary to share'})).toHaveValue(/alex@campus.edu/);
  await page.getByRole('checkbox',{name:'Include my email address',exact:true}).uncheck();
  await page.getByRole('button',{name:'Copy summary',exact:true}).click();
  expect(await page.evaluate(()=>window.profileCopied)).toContain('BSc in Computer Science');
  expect(await page.evaluate(()=>window.profileCopied)).not.toContain('alex@campus.edu');
  await page.getByRole('navigation',{name:'Profile workspace navigation'}).getByRole('button',{name:'Settings',exact:true}).click();
  await page.getByRole('button',{name:'Reset local profile',exact:true}).click();
  await expect(page.locator('#profileProgram')).toHaveText('BSc in Computer Science');
  await page.getByRole('button',{name:'Confirm reset',exact:true}).click();
  await expect(page.locator('#profileStudy')).toHaveText('Not added yet');
  await expect(page.locator('#profileName')).toHaveText('Alex Rivera');
  await page.getByRole('button',{name:'Log out',exact:true}).click();
  await expect(page.locator('#authLanding')).toBeVisible();
});
