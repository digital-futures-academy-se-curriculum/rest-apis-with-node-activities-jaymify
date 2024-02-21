import { render, screen } from '@testing-library/react';
import Todo from '../Components/Todo';
import TodoModel from '../Components/utils/Todo.model';

jest.mock("../Components/utils/Todo.model", () => {

  return class TodoModel {
    constructor() {
      this.todoDescription = `Test Todo`;
      this.todoDateCreated = `2019-05-04T15:30:00.000Z`;
      this.todoCompleted = true;
    }
  }
});

describe(`Todo test suite`, () => {

  describe(`Testing render when todoCompleted is true`, () => {

    const testTodo = new TodoModel();
    const { todoDescription, todoDateCreated } = testTodo;

    test(`it should render 2 tds with className completed`, () => {

      const date = new Date(todoDateCreated).toUTCString();

      render(<table><tbody><Todo todo={testTodo} /></tbody></table>);

      const descriptionCell = screen.getByText(todoDescription);
      const createdCell = screen.getByText(date);

      expect(descriptionCell.className).toBe(`completed`);
      expect(createdCell.className).toBe(`completed`);
    });

    test(`it should render 'N/A' in the final td of the row`, () => {

      render(<table><tbody><Todo todo={testTodo} /></tbody></table>);

      expect(screen.getByText(`N/A`)).toBeInTheDocument();
    });
  });

  describe(`Testing render when todoCompleted is false`, () => {

    const testTodo = new TodoModel();

    beforeEach(() => {
      testTodo.todoCompleted = false;
    });

    test(`it should render 2 tds with no className`, () => {

      const date = new Date(testTodo.todoDateCreated).toUTCString();

      render(<table><tbody><Todo todo={testTodo} /></tbody></table>);

      const descriptionCell = screen.getByText(testTodo.todoDescription);
      const createdCell = screen.getByText(date);

      expect(descriptionCell.className).toBeFalsy();
      expect(createdCell.className).toBeFalsy();
    });

    test(`it should render 'Edit' in the final td of the row`, () => {

      render(<table><tbody><Todo todo={testTodo} /></tbody></table>);

      expect(screen.getByText(`Edit`)).toBeInTheDocument();
    });
  });
});