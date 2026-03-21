import { test, expect } from '../fixtures/the-internal.fixture';

test('change range slider value', async ({ sliderPage }) => {
    await sliderPage.goto();
    await sliderPage.slideToValue(3.5);
    const value = await sliderPage.getCurrentValue();
    expect(value).toBe(3.5);
});
