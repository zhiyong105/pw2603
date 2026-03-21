import { type Page } from '@playwright/test';
import fs from 'fs';

export class DownloadPage {
    readonly page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    async goto() {
        await this.page.goto('/download');
    }

    async downloadFile(fileName: string, savePath: string): Promise<string> {
        const dir = savePath.substring(0, savePath.lastIndexOf('/'));
        if (dir) fs.mkdirSync(dir, { recursive: true });
        const [download] = await Promise.all([
            this.page.waitForEvent('download'),
            this.page.getByRole('link', { name: fileName }).first().click(),
        ]);
        await download.saveAs(savePath);
        return download.suggestedFilename();
    }

    fileExists(filePath: string): boolean {
        return fs.existsSync(filePath);
    }
}
