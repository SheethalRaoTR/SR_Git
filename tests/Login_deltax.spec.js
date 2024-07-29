const { test, expect } = require('@playwright/test');
const { afterEach } = require('node:test');
const path = require('path');

        test('Verify the Login Home page UI', async ({ page }) => 
        {
            await page.goto("https://staging3.adbox.pro/App/Login");
            await page.locator('#loginForm').screenshot({ path: 'scenario1.png' });
            expect (await page.screenshot()).toMatchSnapshot('PW.png');
        });

        test('Verify that user should be able to fill the two text boxes and click on password show hide button', async ({ page }) => 
        {
        await page.goto("https://staging3.adbox.pro/App/Login");
        await page.locator("#txtUsername").fill("sheethal.r@deltax.com");
        await page.locator("#txtPassword").fill("ads4good");
        await page.locator("#spnShowHide").click();
        await page.locator("#txtPassword").screenshot({path:'scenario2.png'});
        
        });

        test('Verify the placeholder text of the textboxes and then user should be able to enter the Input in the textboxes', async ({ page }) => 
        {
            await page.goto("https://staging3.adbox.pro/App/Login");
            const placeholder1=  await page.locator("#txtUsername").getAttribute("placeholder");
            expect(placeholder1).toBe("Username"); //it will fail if its not the same 
            const placeholder2=  await page.locator("#txtPassword").getAttribute("placeholder");
            expect(placeholder2).toBe("Password"); //it will fail if its not the same 
            await page.locator("#txtUsername").fill("sheethal.r@deltax.com");
            await page.locator("#txtPassword").fill("ads4good");
            await page.screenshot({path:"scenario3.png", fullPage:true}) 
        }); 

        test('With valid credentials , User should be able to Login successfully', async ({ page }) => 
        {
            await page.goto("https://staging3.adbox.pro/App/Login");
            console.log(await page.title());    
            await page.locator("#txtUsername").fill("sheethal.r@deltax.com");
            await page.locator("#txtPassword").fill("ads4good");
            await page.locator("#btnLogin").click(); 
            await expect(page).toHaveURL(/Avertisers/);
            await page.screenshot({path:"scenario4a.png", fullPage:true}) 
        });

        test.only('verify that user should be able to click on microsoft option', async ({ page }) => 
            {
            await page.goto("https://staging3.adbox.pro/App/Login");    
            await page.locator("#txtUsername").fill("sheethal.r@deltax.com");
            await page.locator("#txtPassword").fill("ads4good");
            await page.locator(".m-signin-div").click();
            await page.screenshot({path:"scenario5a.png", fullPage:true}) 
            });


        test('Verify user try login with invalid creds and error msg should be displayed , then clicking on forgot password user should reach forgot password page', async ({ page }) => 
        {
            await page.goto("https://staging3.adbox.pro/App/Login");
            console.log(await page.title());    
            await page.locator("#txtUsername").fill("sheethal.r@deltax.com");
            await page.locator("#txtPassword").fill("adsgood"); // Incorrect password
            await page.locator("#btnLogin").click();
            const validation = page.getByTitle('Invalid attempts shall result in your account getting locked.'); 
            //Console.log(validation);
          //  expect(validation).toContain('Invalid attempts');
            await page.locator("//a[text()='Forgot your password?']").click();
            await expect(page).toHaveURL(/ForgotPassword/);
            await page.screenshot({path:"scenario6.png", fullPage:true}) 
        });
//test case:
        test('Verify the login and logout flow for a valid user', async ({ page }) => 
        {
            await page.goto("https://staging3.adbox.pro/App/Login");
            console.log(await page.title());    
            await page.locator("#txtUsername").fill("sheethal.r@deltax.com");
            await page.locator("#txtPassword").fill("ads4good");
            await page.locator("#btnLogin").click();
            await page.locator("span.layout-user-initials-background").click();
            await page.screenshot({ path: 'scenario7.png' });
            await page.getByRole('link', { name: ' Logout' }).click();
            await expect (page).toHaveURL(/Login/);
        });
 
        test('Verify validation the for invalid password', async ({ page }) => 
        {
            await page.goto("https://staging3.adbox.pro/App/Login");
            console.log(await page.title());    
            await page.locator("#txtUsername").fill("sheethal.r@deltax.com");
            await page.locator("#txtPassword").fill("testpswd");
            await page.locator("#btnLogin").click();
            await page.getByText("Invalid attempts shall result in your account getting locked.").isVisible
            await page.locator('.alert-danger').screenshot({ path: 'scenario8.png' });  
        })

        test('Verify the restricted user access for google signup and validation ', async ({ page }) => 
        {
            await page.goto("https://staging3.adbox.pro/App/Login");
            console.log(await page.title());    
            await page.locator(".g-signin-div").click();
            await page.locator('.alert-danger').screenshot({ path: 'scenario9.png' });
        });


        test('Verify placeholder texts and validation for empty textboxes', async ({ page }) => 
        {
            await page.goto("https://staging3.adbox.pro/App/Login");
            console.log(await page.title());    
           // await page.locator("#txtUsername").fill("sheethal.r@deltax.com");
           // await page.locator("#txtPassword").fill("ads4good");
           await page.locator("#btnLogin").click();
           const placeholder1=  await page.locator("#txtUsername").getAttribute("placeholder");
            expect(placeholder1).toBe("Please enter your username"); //it will fail if its not the same 
            const placeholder2=  await page.locator("#txtPassword").getAttribute("placeholder");
            expect(placeholder2).toBe("Please enter your password"); //it will fail if its not the same 
            await page.screenshot({ path: 'scenario10.png' });

        });  
