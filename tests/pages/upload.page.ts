import { type Page, type Locator } from '@playwright/test';

export class UploadPage {
    readonly page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    async goto() {
        await this.page.goto('/upload');
    }

    async uploadFile(filePath: string) {
        await this.page.setInputFiles('input[type="file"]', filePath);
        await this.page.getByRole('button', { name: 'Upload' }).click();
    }

    async uploadFiles(filePaths: string[]) {
        await this.page.setInputFiles('input[type="file"]', filePaths);
        await this.page.getByRole('button', { name: 'Upload' }).click();
    }

    getUploadedFiles(): Locator {
        return this.page.locator('#uploaded-files');
    }
}
