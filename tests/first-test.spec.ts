import {test, expect } from '@playwright/test';

test('get started link works', async ({ page }) => {
  await page.goto('https://the-internet.herokuapp.com/login');
  await page.locator('#username').fill('tomsmith');
});

