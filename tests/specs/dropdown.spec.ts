import { test, expect } from '../fixtures/the-internal.fixture';

test('dropdown: select multiple options and validate selection', async ({ dropdownPage }) => {
    await dropdownPage.goto();
    await dropdownPage.selectOptions(['apple', 'banana']);
    const selectedValues = await dropdownPage.getSelectedValues();
    expect(selectedValues).toEqual(['banana', 'apple']);
    await expect(dropdownPage.getCheckedOptions()).toHaveText(['Banana', 'Apple']);
});
