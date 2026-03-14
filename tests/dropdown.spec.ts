import {test, expect } from '@playwright/test';

// Add a test that selects option 1 from the dropdown and validates the selection
/*test('dropdown: select option 1 and validate selection', async ({ page }) => {
  await page.goto('https://the-internet.herokuapp.com/dropdown');
  const dropdown = page.locator('#dropdown');
  await dropdown.selectOption('1'); // select by value
  await expect(dropdown).toHaveValue('1');
  await expect(dropdown.locator('option:checked')).toHaveText('Option 1');
});*/


test('dropdown: select option 1 and validate selection', async ({ page }) => {
  await page.goto('https://output.jsbin.com/osebed/2');
  const dropdown = page.locator('#fruits');
  await dropdown.selectOption(['apple','banana']); // select by value
  // Read selected values from the multi-select and assert the array
  const selectedValues = await dropdown.evaluate(el => Array.from((el as HTMLSelectElement).selectedOptions).map(o => o.value));
  await expect(selectedValues).toEqual(['banana','apple']);
  await expect(dropdown.locator('option:checked')).toHaveText(['Banana','Apple']);
});
