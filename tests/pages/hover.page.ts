import { type Page, type Locator } from '@playwright/test';

export class HoverPage {
    readonly page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    async goto() {
        await this.page.goto('/hovers');
    }

    getFigure(index: number): Locator {
        return this.page.locator('div.figure').nth(index);
    }

    async hoverFigure(index: number) {
        await this.getFigure(index).hover();
    }

    getFigureCaption(index: number): Locator {
        return this.getFigure(index).locator('h5');
    }
}
