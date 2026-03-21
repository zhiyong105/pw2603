import { type Page } from '@playwright/test';

export class TablePage {
    readonly page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    async goto() {
        await this.page.goto('https://the-internet.herokuapp.com/tables');
    }

    async getDueAmounts(): Promise<string[]> {
        return this.page.locator('#table1 tbody tr td:nth-child(4)').allTextContents();
    }

    async getFullNameAtRow(rowIndex: number): Promise<string> {
        const first = await this.page.locator(`#table1 tbody tr:nth-child(${rowIndex + 1}) td:nth-child(2)`).textContent();
        const last  = await this.page.locator(`#table1 tbody tr:nth-child(${rowIndex + 1}) td:nth-child(1)`).textContent();
        return `${first} ${last}`;
    }

    getMinDueIndices(amounts: string[]): number[] {
        const values = amounts.map(a => parseFloat(a.replace('$', '')));
        const min = Math.min(...values);
        return values.reduce((acc, val, i) => { if (val === min) acc.push(i); return acc; }, [] as number[]);
    }
}
