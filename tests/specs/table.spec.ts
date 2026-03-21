import { test, expect } from '../fixtures/the-internal.fixture';

test('verify fullname of min due person', async ({ tablePage }) => {
    await tablePage.goto();
    const dueAmounts = await tablePage.getDueAmounts();
    const minIndices = tablePage.getMinDueIndices(dueAmounts);
    const expectedNames = ['John Smith', 'Tim Conway'];
    for (let i = 0; i < minIndices.length; i++) {
        const fullName = await tablePage.getFullNameAtRow(minIndices[i]);
        console.log('Full name of person with min due:', fullName);
        expect(fullName).toBe(expectedNames[i]);
    }
});