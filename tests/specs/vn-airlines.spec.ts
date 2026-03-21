/**
 * Navigate https://www.vietnamairlines.com/vn/vi/
 * Chon depart la SGN -> HAN, Ngay di 25/3/2026 -> 31/3/2026
 * Verify  từ: SGN đến là HAN, ngày đi là 25/3/2026, ngày về là 31/3/2026*/
import { test, expect, Page } from '@playwright/test';

async function selectAirport(page: Page, ariaLabel: string, code: string) {
    const btn = page.locator(`button[aria-label="${ariaLabel}"]`);

    // Chỉ click nếu popover chưa mở (tránh toggle đóng)
    const isOpen = await btn.evaluate((el: Element) => el.classList.contains('ant-popover-open'));
    if (!isOpen) {
        await btn.click();
        await page.waitForTimeout(800);
    }

    // Dùng .last() để lấy input đúng:
    // - departure: chỉ có 1 input → .last() = .nth(0)
    // - arrival: có 2 inputs (SGN + empty) → .last() = arrival input
    await page.locator('.default-regions input.frame-2').last().fill(code, { force: true });
    await page.waitForTimeout(800);

    // Click kết quả đầu tiên chứa code (dùng force vì offsetParent có thể null)
    await page.locator('.default-regions .location')
        .filter({ hasText: code })
        .first()
        .click({ force: true });
    await page.waitForTimeout(800);
}

async function navigateToMonth(page: Page, month: number, year: number) {
    // Calendar dùng class date-picker__next-btn và hiển thị tháng dạng "Tháng 3" + "2026"
    for (let i = 0; i < 24; i++) {
        const spans = await page.locator('.daterange-picker span.whitespace-nowrap').allInnerTexts().catch(() => [] as string[]);
        const text = spans.join(' ');
        if (text.includes(`Tháng ${month}`) && text.includes(`${year}`)) break;
        await page.locator('button.date-picker__next-btn').first().click({ force: true });
        await page.waitForTimeout(400);
    }
}

test('flight booking SGN to HAN round trip', async ({ page, context }) => {
    test.setTimeout(90000);

    const departure = 'DAD';
    const arrival = 'HAN';
    const departDate = '25/03/2026';
    const returnDate = '31/03/2026';
    // Set OneTrust consent cookies trước khi navigate để banner không bao giờ xuất hiện
    await context.addCookies([
        {
            name: 'OptanonAlertBoxClosed',
            value: new Date().toISOString(),
            domain: '.vietnamairlines.com',
            path: '/',
        },
        {
            name: 'OptanonConsent',
            value: 'isGpcEnabled=0&interactionCount=1&isAnonUser=1&isNonStandardReader=0&groups=C0001%3A1%2CC0002%3A1%2CC0003%3A1%2CC0004%3A1',
            domain: '.vietnamairlines.com',
            path: '/',
        },
    ]);

    // Dùng MutationObserver để remove overlay phòng trường hợp OneTrust vẫn inject
    await page.addInitScript(() => {
        const removeOverlay = () => {
            document.querySelectorAll(
                '#onetrust-consent-sdk, .onetrust-pc-dark-filter, #onetrust-pc-sdk'
            ).forEach(el => el.remove());
        };
        new MutationObserver(removeOverlay).observe(document.documentElement, {
            childList: true,
            subtree: true,
        });
    });

    await page.goto('https://www.vietnamairlines.com/vn/vi/', { waitUntil: 'domcontentloaded', timeout: 60000 });
    await page.waitForSelector('button[aria-label="Chọn điểm đi"]', { timeout: 20000 });
    await page.waitForTimeout(1000);

    // Chọn điểm đi: DAD
    await selectAirport(page, 'Chọn điểm đi', departure);

    // Chọn điểm đến: HAN (date picker tự mở sau bước này)
    await selectAirport(page, 'Chọn điểm đến', arrival);

    // Nếu date picker chưa mở, click trigger để mở
    const datePickerOpen = await page.locator('#booking-date-trigger-0').evaluate(
        (el: Element) => el.classList.contains('ant-popover-open')
    );
    if (!datePickerOpen) {
        await page.locator('#booking-date-trigger-0').click({ force: true });
        await page.waitForTimeout(800);
    }

    // Điều hướng đến tháng 3/2026 nếu cần
    await navigateToMonth(page, 3, 2026);

    // Chọn ngày đi: 25/03/2026 (button không bị disabled)
    await page.locator('button.date-picker__date:not([disabled])')
        .filter({ hasText: /^25$/ }).first().click({ force: true });
    await page.waitForTimeout(500);

    // Chọn ngày về: 31/03/2026
    await page.locator('button.date-picker__date:not([disabled])')
        .filter({ hasText: /^31$/ }).first().click({ force: true });
    await page.waitForTimeout(500);

    // Xác nhận chọn ngày
    await page.locator('button.date-picker__apply').click({ force: true });
    await page.waitForTimeout(500);

    // Verify điểm đi: SGN
    //await expect(page.locator('button[aria-label="Chọn điểm đi"] .country-code-label')).toContainText('SGN');
    await expect(page.getByRole('button', { name: 'Chọn điểm đi' }).getByText(departure)).toBeVisible();

    // Verify điểm đến: HAN
    // await expect(page.locator('button[aria-label="Chọn điểm đến"] .country-code-label')).toContainText('HAN');
    await expect(page.getByRole('button', { name: 'Chọn điểm đến' }).getByText(arrival)).toBeVisible();

    // Verify ngày đi 25/03/2026 và ngày về 31/03/2026
    await expect(page.locator('#booking-date-trigger-0')).toContainText('25/03/2026');
    await expect(page.locator('#booking-date-trigger-0')).toContainText('31/03/2026');
});
