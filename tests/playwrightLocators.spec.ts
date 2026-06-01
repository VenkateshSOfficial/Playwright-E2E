import { test, expect, Locator, chromium } from '@playwright/test';

/*
BUILT-IN LOCATORS IN PLAYWRIGHT
=======================================

Introduction
=============
Locators are the central piece of Playwright's auto-waiting and retry-ability. In a nutshell, locators represent a way to find element(s) on the page at any moment.

Quick Guide
=============
These are the recommended built-in locators.

1) page.getByRole() to locate by explicit and implicit accessibility attributes.
2) page.getByText() to locate by text content.
3) page.getByLabel() to locate a form control by associated label's text.
4) page.getByPlaceholder() to locate an input by placeholder.
5) page.getByAltText() to locate an element, usually image, by its text alternative.
6) page.getByTitle() to locate an element by its title attribute.
7) page.getByTestId() to locate an element based on its data-testid attribute (other attributes can be configured).

*/

test("built in locator => getByAltText()", async ({ page }) => {
    /* getByAltText() locator is used to locate only the images using the alt attribute */
    await page.goto("https://demo.nopcommerce.com/");
    const logo: Locator = page.getByAltText("nopCommerce demo store");
    await expect(logo).toBeVisible();
})

test("built in locator => getbyText()", async ({ page }) => {
    /* getByText() can be used to locate no-interactive elements */
    await page.goto("https://demo.nopcommerce.com/");
    let welcomeMessage: Locator = page.getByText("Welcome");
    await expect(welcomeMessage).toBeVisible();
    await page.waitForTimeout(3000);
})

test("built in locator => getByRole()", async ({ page }) => {
    /* getByRole() use to locate interactive elements */
    await page.goto("https://demo.nopcommerce.com/");
    let registerButton: Locator = page.getByRole("link", { name: "Register" });
    await registerButton.click();
    let registerHeading: Locator = page.getByRole("heading", { name: 'Register' });
    await expect(registerHeading).toBeVisible();
    await page.waitForTimeout(5000);
})

test("built in locator => getByLabel()", async ({ page }) => {
    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
    await page.getByLabel("Username:").fill("RahulShetty");
    await page.waitForTimeout(3000);
})

test("built in locator => getByPlaceHolder()", async ({ page }) => {
    /* place holder is an attribute using which we can locate elements */
    await page.goto("https://rahulshettyacademy.com/seleniumPractise/#/");
    await page.getByPlaceholder("Search for Vegetables and Fruits").fill("Tomato");
    await page.waitForTimeout(3000);
})

test("built in locator => getByTitle()", async ({ page }) => {
    /* title is an attribute which can be used to locate elements */
    await page.goto("http://127.0.0.1:5500/app/app.html");
    let html: Locator = page.getByTitle("HyperText Markup Language");
    expect(html).toHaveText("HTML");
    await html.click();
    await page.waitForTimeout(3000);
})

test.only("built in locator => getByTestId()", async ({ page }) => {
    await page.goto("http://127.0.0.1:5500/app/app.html");
    let mailId: Locator = page.getByTestId("profile-email");
    expect(mailId).toHaveText("john.doe@example.com");
    expect(mailId).toContainText("john");
    await page.waitForTimeout(3000);
})






