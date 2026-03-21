import { type Page, type Locator } from '@playwright/test';

export class JsAlertPage {
    readonly page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    async goto() {
        await this.page.goto('/javascript_alerts');
    }

    async clickJsAlert() {
        await this.page.getByRole('button', { name: 'Click for JS Alert' }).click();
    }

    async clickJsConfirm() {
        await this.page.getByRole('button', { name: 'Click for JS Confirm' }).click();
    }

    async clickJsPrompt() {
        await this.page.getByRole('button', { name: 'Click for JS Prompt' }).click();
    }

    getResult(): Locator {
        return this.page.locator('#result');
    }
}
