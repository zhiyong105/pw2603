
// Open browser

// Navigate to https://the-internet.herokuapp.com/nested_frames

// Verify Text present:

// Copy


// Copy
//           LEFT

//           RIGHT

//           MIDDLE

//           BOTTOM
import { test, expect } from '@playwright/test';

test('verify text in nested frames', async ({ page }) => {
    await page.goto('https://the-internet.herokuapp.com/nested_frames');

    const leftFrame = page.frame({ name: 'frame-left' });
    const rightFrame = page.frame({ name: 'frame-right' });
    const middleFrame = page.frame({ name: 'frame-middle' });
    const bottomFrame = page.frame({ name: 'frame-bottom' });

    // if (!leftFrame || !rightFrame || !middleFrame || !bottomFrame) {
    //     throw new Error('One or more frames not found on the page');
    // }

    await expect(leftFrame.locator('body')).toHaveText('LEFT');
    await expect(rightFrame.locator('body')).toHaveText('RIGHT');
    await expect(middleFrame.locator('body')).toHaveText('MIDDLE');
    await expect(bottomFrame.locator('body')).toHaveText('BOTTOM');
});