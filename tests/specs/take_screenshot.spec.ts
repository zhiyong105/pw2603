import { test, expect } from '../fixtures/the-internal.fixture';

test('visual test - take full page screenshot', async ({ page }) => {
    await page.goto('https://example.com');
    await page.screenshot({ path: 'screenshot.png', fullPage: true });
    try {
        await expect(page.locator('h1')).toHaveText('Example Domain');
    } catch (error) {
        await page.screenshot({ path: `failure-${test.info().title}.png` });
        throw error;
    }
});
