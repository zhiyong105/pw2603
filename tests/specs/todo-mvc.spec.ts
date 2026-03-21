// TC11: Page Object Model- Todo MVC : Verify user able create a new todo
// Open browserNavigate to https://todomvc.com/examples/react/dist/
//  a new todo nameVerify a todo added
// TC12: Page Object Model- Todo MVC : Verify user able mark complete a todo
// Open browserNavigate to https://todomvc.com/examples/react/dist/Mark completed a exist todoVerify a todo is marked completed
// TC13: Page Object Model- Todo MVC : Verify user able delete a todo
// Open browserNavigate to https://todomvc.com/examples/react/dist/Delete a exist todoVerify a todo deleted
// TC14: Page Object Model- Todo MVC : Verify user able update a todo name
// Open browserNavigate to https://todomvc.com/examples/react/dist/Update a existed todo nameVerify a todo updated name successfully
import { test, expect } from '../fixtures/the-internal.fixture';

test('create a new todo', async ({ todoMvcPage }) => {
    await todoMvcPage.goto();
    await todoMvcPage.addTodo('New Todo');
    const todos = todoMvcPage.getTodos();
    await expect(todos).toHaveCount(1);
    await expect(todos.nth(0).locator('label')).toHaveText('New Todo');
});

test('mark complete a todo', async ({ todoMvcPage }) => {
    await todoMvcPage.goto();
    await todoMvcPage.addTodo('Complete Todo');
    const todos = todoMvcPage.getTodos();
    await todoMvcPage.completeTodo(todos.nth(0));
    await expect(todos.nth(0).locator('.toggle')).toBeChecked();
});

test('delete a todo', async ({ todoMvcPage }) => {
    await todoMvcPage.goto();
    await todoMvcPage.addTodo('Delete Todo');
    const todos = todoMvcPage.getTodos();
    await todoMvcPage.deleteTodo(todos.nth(0));
    await expect(todos).toHaveCount(0);
});

test('update a todo name', async ({ todoMvcPage }) => {
    await todoMvcPage.goto();
    await todoMvcPage.addTodo('Old Name');
    const todos = todoMvcPage.getTodos();
    await todoMvcPage.editTodo(todos.nth(0), 'Updated Name');
    await expect(todos.nth(0).locator('label')).toHaveText('Updated Name');
});     

