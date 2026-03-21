import { type Page, type Frame } from '@playwright/test';

export class FramePage {
    readonly page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    async goto() {
        await this.page.goto('/nested_frames');
    }

    getFrame(name: string): Frame {
        const frame = this.page.frame({ name });
        if (!frame) throw new Error(`Frame "${name}" not found`);
        return frame;
    }

    getLeftFrame()   { return this.getFrame('frame-left'); }
    getRightFrame()  { return this.getFrame('frame-right'); }
    getMiddleFrame() { return this.getFrame('frame-middle'); }
    getBottomFrame() { return this.getFrame('frame-bottom'); }
}
