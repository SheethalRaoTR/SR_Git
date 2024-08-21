import { test, expect, BrowserContext } from '@playwright/test';

test.only('login into email and fetch otp', async ({ browser }) => {

    const context1 = await browser.newContext();
    const page1 = await context1.newPage();

    const context2 = await browser.newContext();
    const page2 = await context1.newPage();


    await page2.goto("https://staging--deltaxjiocinema.netlify.app/app/signup/userDetails?allowEmail=true");
    await page2.getByText('Use Email Instead').nth(1).click();
    await page2.getByPlaceholder("example@mail.com").fill("testautomationmailjc@gmail.com");
    await page2.getByRole('button', { name: 'Generate OTP' }).click();




    await page1.goto("https://mail.google.com/");
    await page1.locator('#identifierId').fill("testautomationmailjc@gmail.com");
    await page1.locator('div.VfPpkd-RLmnJb').nth(1).click();
    await page1.locator('[type="password"]').nth(0).fill("SRtestAutomation1");
    await page1.locator('input.VfPpkd-muHVFf-bMcfAe').check()
    await page1.locator('div.VfPpkd-RLmnJb').nth(1).click();
    await expect(page1).toHaveURL(/mail/);
    await page1.locator('[aria-label="Refresh"]').click();
    //await page1.locator('[aria-label="Promotions"]').click();
    await page1.locator('[jsaction="Tnvr6c:RNc9jf;PG1zDd:eyrEaf;WGbBt:UL4Ddb;nVvxM:UL4Ddb;"]').click();
    await page1.locator('div h4').isVisible();
    //await page1.locator('div h4').screenshot({ path: 'scenario1.png' });
    const OTP = page1.locator('p.m_-1937155174357307173').isVisible();//.press('Control+C');
    console.log(OTP);
    //await new Promise(() =>{});



});