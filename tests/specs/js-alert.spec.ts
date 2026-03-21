import { test, expect } from '../fixtures/the-internal.fixture';

test('js alert', async ({ jsAlertPage }) => {
    await jsAlertPage.goto();
    jsAlertPage.page.on('dialog', async (dialog) => {
        expect(dialog.message()).toEqual('I am a JS Alert');
        await dialog.accept();
    });
    await jsAlertPage.clickJsAlert();
    await expect(jsAlertPage.getResult()).toContainText('You successfully clicked an alert');
});

test('js confirm => cancel', async ({ jsAlertPage }) => {
    await jsAlertPage.goto();
    jsAlertPage.page.on('dialog', async (dialog) => {
        expect(dialog.message()).toEqual('I am a JS Confirm');
        await dialog.dismiss();
    });
    await jsAlertPage.clickJsConfirm();
    await expect(jsAlertPage.getResult()).toContainText('You clicked: Cancel');
});

test('js confirm => OK', async ({ jsAlertPage }) => {
    await jsAlertPage.goto();
    jsAlertPage.page.on('dialog', async (dialog) => {
        expect(dialog.message()).toEqual('I am a JS Confirm');
        await dialog.accept();
    });
    await jsAlertPage.clickJsConfirm();
    await expect(jsAlertPage.getResult()).toContainText('You clicked: Ok');
});

test('js prompt', async ({ jsAlertPage }) => {
    await jsAlertPage.goto();
    jsAlertPage.page.on('dialog', async (dialog) => {
        expect(dialog.message()).toEqual('I am a JS prompt');
        await dialog.accept('Hello World/n');
    });
    await jsAlertPage.clickJsPrompt();
    await expect(jsAlertPage.getResult()).toContainText('You entered: Hello World');
});