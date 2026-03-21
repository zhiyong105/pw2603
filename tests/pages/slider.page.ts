import { type Page, type Locator } from '@playwright/test';

export class SliderPage {
    readonly page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    async goto() {
        await this.page.goto('/horizontal_slider');
    }

    getSlider(): Locator {
        return this.page.locator('.sliderContainer input');
    }

    async getCurrentValue(): Promise<number> {
        return Number(await this.page.locator('#range').innerText());
    }

    async slideToValue(target: number) {
        let current = await this.getCurrentValue();
        const key = current < target ? 'ArrowRight' : 'ArrowLeft';
        while (current !== target) {
            await this.getSlider().press(key);
            current = await this.getCurrentValue();
        }
    }
}
