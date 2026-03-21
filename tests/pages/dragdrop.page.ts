import { type Page } from '@playwright/test';

export class DragDropPage {
    readonly page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    async goto() {
        await this.page.goto('/drag_and_drop');
    }

    async dragAToB() {
        await this.page.locator('#column-a').dragTo(this.page.locator('#column-b'));
    }

    getColumnA() {
        return this.page.locator('#column-a');
    }

    getColumnB() {
        return this.page.locator('#column-b');
    }
}
