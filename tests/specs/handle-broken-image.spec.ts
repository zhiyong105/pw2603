import { test, expect } from '../fixtures/the-internal.fixture';

test('verify broken images have valid src and check response status', async ({ brokenImagePage }) => {
    await brokenImagePage.goto();
    const srcs = await brokenImagePage.getAllImageSrcs();
    for (const src of srcs) {
        expect(src.length).toBeGreaterThan(1);
        const res = await brokenImagePage.getImageResponse(src);
        console.log('Image src:', src, '| Status:', res.status());
        expect(res.status()).toBe(200);
    }
});
