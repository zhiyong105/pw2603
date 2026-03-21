import { test as base } from '@playwright/test';
import { LoginPage } from '../pages/login.page';
import { CheckboxesPage } from '../pages/checkboxes.page';
import { DragDropPage } from '../pages/dragdrop.page';
import { FramePage } from '../pages/frame.page';
import { HoverPage } from '../pages/hover.page';
import { BrokenImagePage } from '../pages/broken-image.page';
import { SliderPage } from '../pages/slider.page';
import { JsAlertPage } from '../pages/js-alert.page';
import { DropdownPage } from '../pages/dropdown.page';
import { TablePage } from '../pages/table.page';
import { UploadPage } from '../pages/upload.page';
import { DownloadPage } from '../pages/download.page';
import { TodoMvcPage } from '../pages/todo-mvc.page';

type TheInternetFixtures = {
    loginPage: LoginPage,
    checkboxesPage: CheckboxesPage,
    dragDropPage: DragDropPage,
    todoMvcPage: TodoMvcPage,
    framePage: FramePage,
    hoverPage: HoverPage,
    brokenImagePage: BrokenImagePage,
    sliderPage: SliderPage,
    jsAlertPage: JsAlertPage,
    dropdownPage: DropdownPage,
    tablePage: TablePage,
    uploadPage: UploadPage,
    downloadPage: DownloadPage,
}

export const test = base.extend<TheInternetFixtures>({
    loginPage:       async ({ page }, use) => { await use(new LoginPage(page)); },
    checkboxesPage:  async ({ page }, use) => { await use(new CheckboxesPage(page)); },
    dragDropPage:    async ({ page }, use) => { await use(new DragDropPage(page)); },
    framePage:       async ({ page }, use) => { await use(new FramePage(page)); },
    hoverPage:       async ({ page }, use) => { await use(new HoverPage(page)); },
    brokenImagePage: async ({ page }, use) => { await use(new BrokenImagePage(page)); },
    sliderPage:      async ({ page }, use) => { await use(new SliderPage(page)); },
    jsAlertPage:     async ({ page }, use) => { await use(new JsAlertPage(page)); },
    dropdownPage:    async ({ page }, use) => { await use(new DropdownPage(page)); },
    tablePage:       async ({ page }, use) => { await use(new TablePage(page)); },
    uploadPage:      async ({ page }, use) => { await use(new UploadPage(page)); },
    downloadPage:    async ({ page }, use) => { await use(new DownloadPage(page)); },
    todoMvcPage:     async ({ page }, use) => { await use(new TodoMvcPage(page)); },
});

export { expect } from '@playwright/test';
