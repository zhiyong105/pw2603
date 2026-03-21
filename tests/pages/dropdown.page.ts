import { type Page, type Locator } from '@playwright/test';

export class DropdownPage {
    readonly page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    async goto() {
        await this.page.goto('https://output.jsbin.com/osebed/2');
    }

    getDropdown(): Locator {
        return this.page.locator('#fruits');
    }

    async selectOptions(values: string[]) {
        await this.getDropdown().selectOption(values);
    }

    async getSelectedValues(): Promise<string[]> {
        return this.getDropdown().evaluate(el =>
            Array.from((el as HTMLSelectElement).selectedOptions).map(o => o.value)
        );
    }

    getCheckedOptions(): Locator {
        return this.getDropdown().locator('option:checked');
    }
}
