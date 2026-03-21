import { test, expect } from '../fixtures/the-internal.fixture';

test('should successfully login with valid credentials', async ({ loginPage }) => {
    await loginPage.goto();
    await loginPage.login('tomsmith', 'SuperSecretPassword!');

    await expect(await loginPage.getSuccessFlashMessage()).toContainText('You logged into a secure area!');
    await expect(await loginPage.getWelcomeMessage()).toContainText('Welcome to the Secure Area. When you are done click logout below.');
});

test('should show error message with invalid credentials', async ({ loginPage }) => {
    await loginPage.goto();
    await loginPage.login('invalidUser', 'invalidPassword');

    await expect(await loginPage.getSuccessFlashMessage()).toContainText('Your username is invalid!');
});
