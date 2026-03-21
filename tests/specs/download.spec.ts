import { test, expect } from '../fixtures/the-internal.fixture';

test('download a file', async ({ downloadPage }) => {
    await downloadPage.goto();
    const savePath = 'tests/resource/download/Jpeg_with_exif.jpeg';
    const filename = await downloadPage.downloadFile('Jpeg_with_exif.jpeg', savePath);
    expect(filename).toBe('Jpeg_with_exif.jpeg');
    expect(downloadPage.fileExists(savePath)).toBeTruthy();
});
