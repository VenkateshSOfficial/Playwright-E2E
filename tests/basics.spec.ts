import{test,expect} from '@playwright/test'

test("basics",async({page})=>{
    await page.goto("https://rahulshettyacademy.com/client/#/auth/login");
    const title=await page.title();
    console.log(`Title : ${title}`);
    await page.waitForTimeout(3000);
    await expect(page).toHaveTitle("Let's Shop");
})