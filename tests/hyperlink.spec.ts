import { test, expect } from '@playwright/test';

test('status code links navigate correctly', async ({ page }) => {
    const base = 'https://the-internet.herokuapp.com/status_codes';
    await page.goto(base);

    const checkStatusFlow = async (code: string) => {
        // Click the status code link using getByRole
        await page.getByRole('link', { name: code }).click();

        // Verify the URL shows the expected status code page
        await expect(page).toHaveURL(`${base}/${code}`);

        // Click the "here" link to go back using getByRole
        await page.getByRole('link', { name: 'here' }).click();

        // Verify we're back on the main page
        await expect(page).toHaveURL(base);
    };

    await checkStatusFlow('200');
    await checkStatusFlow('301');
    await checkStatusFlow('404');
    await checkStatusFlow('500');
});
