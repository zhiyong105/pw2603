import { test, expect } from '../fixtures/the-internal.fixture';

test('drag and drop column A to column B', async ({ dragDropPage }) => {
    await dragDropPage.goto();

    await dragDropPage.dragAToB();

    await expect(dragDropPage.getColumnA()).toHaveText('B');
    await expect(dragDropPage.getColumnB()).toHaveText('A');
});
