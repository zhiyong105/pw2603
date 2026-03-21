import { test, expect } from '../fixtures/the-internal.fixture';

test('verify text in nested frames', async ({ framePage }) => {
    await framePage.goto();

    await expect(framePage.getLeftFrame().locator('body')).toHaveText('LEFT');
    await expect(framePage.getRightFrame().locator('body')).toHaveText('RIGHT');
    await expect(framePage.getMiddleFrame().locator('body')).toHaveText('MIDDLE');
    await expect(framePage.getBottomFrame().locator('body')).toHaveText('BOTTOM');
});
