import {test,expect} from '@playwright/test';

async function enter(page){
 await page.goto('/');await page.locator('#landingDemo').click();
 await page.locator('#mainNav [data-page=suggest]').click();
 await expect(page.locator('#suggestForm')).toBeVisible();
 return page.getByLabel('Choose suggestion poster',{exact:true});
}

test('poster controls hide the native input and require sign-in before sharing',async({page})=>{
 const errors=[],requests=[];page.on('pageerror',error=>errors.push(error.message));
 page.on('request',request=>{if(new URL(request.url()).pathname==='/api/suggestion-photo')requests.push(request.url());});
 const input=await enter(page);
 await expect(input).toBeHidden();await expect(input).toBeDisabled();
 await expect(input).toHaveAttribute('accept','image/jpeg,image/png,image/webp');
 expect(await input.evaluate(element=>element.multiple)).toBe(false);
 await expect(page.getByRole('button',{name:/Upload poster/})).toBeDisabled();
 await expect(page.locator('.suggestion-poster-control')).toContainText('Sign in to attach a shared image');
 expect(requests).toEqual([]);expect(errors).toEqual([]);
});

test('poster input protection withstands the reconstructed pre-release form-style bug',async({page},testInfo)=>{
 const input=await enter(page);await expect(input).toBeHidden();
 // Controlled local reconstruction: this is not a production incident or a new defect.
 await input.evaluate(element=>element.style.removeProperty('display'));
 await expect(input).toBeVisible();await expect(input).toHaveAttribute('hidden','');
 await input.scrollIntoViewIfNeeded();
 await page.screenshot({path:testInfo.outputPath('reconstructed-native-input.png')});
 await input.evaluate(element=>{element.style.display='none';});
 await expect(input).toBeHidden();
 await expect(page.getByRole('button',{name:/Upload poster/})).toBeDisabled();
 await page.screenshot({path:testInfo.outputPath('protected-native-input.png')});
 expect(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth)).toBe(true);
});
