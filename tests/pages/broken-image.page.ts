import { type Page, type Locator } from '@playwright/test';

export class BrokenImagePage {
    readonly page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    async goto() {
        await this.page.goto('/broken_images');
    }

    getImages(): Locator {
        return this.page.locator('img');
    }

    async getAllImageSrcs(): Promise<string[]> {
        const images = await this.getImages().all();
        const srcs: string[] = [];
        for (const img of images) {
            const src = await img.getAttribute('src');
            if (src) srcs.push(src);
        }
        return srcs;
    }

    async getImageResponse(src: string) {
        return this.page.request.get('https://the-internet.herokuapp.com/' + src);
    }
}
