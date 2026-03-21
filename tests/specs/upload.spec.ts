import { test, expect } from '../fixtures/the-internal.fixture';

test('upload a file', async ({ uploadPage }) => {
    await uploadPage.goto();
    await uploadPage.uploadFile('tests/resource/upload/bb.txt');
    await expect(uploadPage.getUploadedFiles()).toContainText('bb.txt');
});

// test('upload multiple files', async ({ uploadPage }) => {
//     await uploadPage.goto();
//     await uploadPage.uploadFiles(['tests/resource/upload/bb.txt', 'tests/resource/upload/cc.txt']);
//     await expect(uploadPage.getUploadedFiles()).toContainText('bb.txt');
//     await expect(uploadPage.getUploadedFiles()).toContainText('cc.txt');
// });
