import { type Page, type Locator } from '@playwright/test';

export class TodoMvcPage {
    constructor(private page: Page) {}

    async goto() {
        await this.page.goto('https://todomvc.com/examples/react/dist/');
    }

    async addTodo(name: string) {
        const input = this.page.locator('.new-todo');
        await input.fill(name);
        await input.press('Enter');
    }

    getTodos(): Locator {
        return this.page.locator('.todo-list li');
    }

    async completeTodo(todo: Locator) {
        await todo.locator('.toggle').check();
    }

    async deleteTodo(todo: Locator) {
        await todo.hover();
        await todo.locator('.destroy').click();
    }

    async editTodo(todo: Locator, newName: string) {
        await todo.locator('label').dblclick({ force: true });
        const input = todo.getByRole('textbox');
        await input.waitFor({ state: 'visible' });
        await input.fill(newName);
        await input.press('Enter');
    }
}
