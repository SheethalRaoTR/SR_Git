import { test, expect } from '@playwright/test';
//const { test, expect } = require('@playwright/test');

test('Registration of JC as an  advertiser',async ({page} )=>
{
//await page.goto("https://staging--deltaxjiocinema.netlify.app/start");
//await page.locator("#business").click();
await page.goto("https://staging--deltaxjiocinema.netlify.app/app/signup/userDetails?allowEmail=true");
await page.locator("//div[text()=' Create Your Account ']").isVisible();
await page.getByText('Use Email Instead').nth(1).click();
await page.getByPlaceholder('example@mail.com').isVisible();

await page.getByPlaceholder("example@mail.com").fill("sheethal.r+automation@deltax.com"); //change using naveen automation locators patterns
await page.getByRole('button', { name: 'Generate OTP' }).click();



});

test('otp api verification',async({request})=>{

    const postresponse= await request.post("https://stage-api.mediabuy.pro/v1.0/authentication/sendLoginOtp",{
        data:{
            
                "portal": "staging--deltaxjiocinema.netlify.app",
                "OTPChannels": [
                  1
                ],
                "emailAddress": "testautomationmailjc@gmail.com"
              }
    })

expect(postresponse.status()).toBe(200);
const text= await postresponse.text();
expect(text).toContain('testautomationmailjc@gmail.com');
console.log(await postresponse.json());

});