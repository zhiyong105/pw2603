import { test, expect } from '../fixtures/the-internal.fixture';

test('hover over each figure shows caption', async ({ hoverPage }) => {
    await hoverPage.goto();

    await hoverPage.hoverFigure(0);
    await expect(hoverPage.getFigureCaption(0)).toBeVisible();
    await expect(hoverPage.getFigureCaption(0)).toContainText('name: user1');

    await hoverPage.hoverFigure(1);
    await expect(hoverPage.getFigureCaption(1)).toBeVisible();
    await expect(hoverPage.getFigureCaption(1)).toContainText('name: user2');

    await hoverPage.hoverFigure(2);
    await expect(hoverPage.getFigureCaption(2)).toBeVisible();
    await expect(hoverPage.getFigureCaption(2)).toContainText('name: user3');
});
