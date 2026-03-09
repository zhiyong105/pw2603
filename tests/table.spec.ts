import { test, expect } from '@playwright/test';

// test('table1: largest due belongs to Doe Jacson', async ({ page }) => {
//     await page.goto('https://the-internet.herokuapp.com/tables');

//     // const rows = page.locator('#table1 tbody tr');
//     // const rowCount = await rows.count();
//     // expect(rowCount).toBeGreaterThan(0);

//     // let maxDue = -Infinity;
//     // let maxName = '';

//     // for (let i = 0; i < rowCount; i++) {
//     //     const row = rows.nth(i);
//     //     const last = (await row.locator('td').nth(0).textContent())?.trim() ?? '';
//     //     const first = (await row.locator('td').nth(1).textContent())?.trim() ?? '';
//     //     const dueText = (await row.locator('td').nth(3).textContent())?.trim() ?? '';
//     //     const amount = parseFloat(dueText.replace(/[^0-9.-]+/g, '')) || 0;

//     //     if (amount > maxDue) {
//     //         maxDue = amount;
//     //         maxName = `${last} ${first}`;
//     //     }
//     // }

//     // expect(maxName).toBe('Doe Jacson');
    
// });

test('verify fullname of max due person', async ({page}) =>{

    await page.goto('https://the-internet.herokuapp.com/tables');

    // const tableContents =  await page.locator("#table1 tbody tr td").allTextContents();
    // //print table content
    // console.log(tableContents);

    const dueAmounts = await page.locator("#table1 tbody tr td:nth-child(4)").allTextContents();
    // console.log(dueAmounts);
    //Give array  [ '$50.00', '$51.00', '$100.00', '$50.00' ]  find the index of item has max value?
    // const maxDueValue = Math.max(...dueAmounts.map(amount => parseFloat(amount.replace('$', ''))));
    // const maxDueIndex = dueAmounts.indexOf('$' + maxDueValue.toFixed(2));
    const numericValues = dueAmounts.map(a => parseFloat(a.replace('$', '')));
    const maxDueValue = 50.00;
    const allMaxIndices = numericValues.reduce((indices, val, index) => {
    if (val === maxDueValue) {
        indices.push(index);
    }
    return indices;
    }, [] as number[]);
    // console.log(maxDueIndex);
    const fullnames = ['John Smith', 'Tim Conway'];
    for (let index = 0; index < allMaxIndices.length; index++) {
        const element = allMaxIndices[index];
        const firstName = await page.locator(`#table1 tbody tr:nth-child(${element + 1}) td:nth-child(2)`).textContent();
        const lastName = await page.locator(`#table1 tbody tr:nth-child(${element + 1}) td:nth-child(1)`).textContent();
        console.log(`Full name of person with due: ${firstName} ${lastName}`);
        expect(`${firstName} ${lastName}`).toBe(fullnames[index]);

    }
    
    // console.log(`Full name of person with max due: ${firstName} ${lastName}`);

});