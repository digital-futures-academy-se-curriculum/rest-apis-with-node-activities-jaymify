import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import AddEditTodo from '../Components/AddEditTodo';

// Provide mock implementation for DateCreated component
jest.mock("../Components/utils/DateCreated", () => {
    return function MockDateCreated() {
        return <span data-testid="dateCreated">Date Created Component</span>
    }
});

jest.mock("../Components/utils/generateId", () => () => `test_id`);

describe(`Tests for AddEditTodo`, () => {

    const mockSubmitTodo = jest.fn();

    beforeEach(() => {
        render(<AddEditTodo submitTodo={mockSubmitTodo} />);
    });

    test(`it should render a div with classNames 'addEditTodo row'`, () => {
        const { container } = render(<AddEditTodo submitTodo={mockSubmitTodo} />);
        const addEditTodoRow = container.querySelector(`.addEditTodo.row`);

        expect(addEditTodoRow).toBeTruthy();
    });

    test(`it should render a TodoForm`, () => {
        const { container } = render(<AddEditTodo submitTodo={mockSubmitTodo} />);
        const form = container.querySelector(`form`);

        expect(form).toBeTruthy();
    });

    test(`it should call mockSubmitTodo when the form is submitted`, () => {
        const testDesc = `Test description`;
        const descInput = screen.getByPlaceholderText(/todo description/i);
        const submitBtn = screen.getByDisplayValue(/submit/i);
        const testTodo = {
            _id: `test_id`,
            todoDescription: testDesc,
            todoDateCreated: undefined,
            todoCompleted: false
        }

        userEvent.type(descInput, testDesc);
        userEvent.click(submitBtn);

        expect(mockSubmitTodo).toHaveBeenCalledTimes(1);
        expect(mockSubmitTodo).toHaveBeenCalledWith(testTodo);
    });
});
