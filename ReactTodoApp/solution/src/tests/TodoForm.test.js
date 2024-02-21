import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import TodoForm from '../Components/TodoForm';

// Provide mock implementation for DateCreated component
jest.mock("../Components/utils/DateCreated", () => {
    return function MockDateCreated() {
        return <span data-testid="dateCreated">Date Created Component</span>
    }
});

describe(`TodoForm test suite`, () => {

    const mockSubmitTodo = jest.fn();

    beforeEach(() => {
        render(<TodoForm submitTodo={mockSubmitTodo} />);
    });

    describe(`Todo form render tests`, () => {

        test(`it should render a Description input and label`, () => {
            expect(screen.getByPlaceholderText(/todo description/i)).toBeInTheDocument();
        });

        test(`it should render a Completed input and label`, () => {
            expect(screen.getByRole(/checkbox/)).toBeInTheDocument();
        });

        test(`it should render a DateCreated component a date`, () => {

            expect(screen.getByTestId(`dateCreated`).textContent).toContain(`Date Created Component`);
        });

        test(`it should render a Submit button`, () => {
            expect(screen.getByText(`Submit`)).toBeInTheDocument();
        });
    });

    describe(`Form manipulation tests`, () => {

        test(`it should render the new value in the input when the todoDescription is updated`, () => {
            const testDesc = `Test description`;
            const descInput = screen.getByPlaceholderText(/todo description/i);

            expect(descInput).toHaveValue(``);

            userEvent.type(descInput, testDesc);

            expect(descInput).toHaveValue(testDesc);
        });

        test(`it should render the new value in the checkbox when the todoCompleted onChange function is activated`, () => {

            const completedCkbx = screen.getByRole(/checkbox/);
            expect(completedCkbx).not.toBeChecked();

            userEvent.click(completedCkbx);

            expect(completedCkbx).toBeChecked();

        });

        test(`should enable the submit button when the todo description is populated`, () => {
            const testDesc = `Test description`;
            const descInput = screen.getByPlaceholderText(/todo description/i);
            const submitBtn = screen.getByDisplayValue(/submit/i);

            expect(submitBtn).toBeDisabled();

            userEvent.type(descInput, testDesc);

            expect(submitBtn).not.toBeDisabled();
        });

    });

    describe(`Form submission tests`, () => {

        test(`test the submitTodo prop function is called when submit button is clicked`, () => {
            const testDesc = `Test description`;
            const descInput = screen.getByPlaceholderText(/todo description/i);
            const submitBtn = screen.getByDisplayValue(/submit/i);

            userEvent.type(descInput, testDesc);
            userEvent.click(submitBtn);

            expect(mockSubmitTodo).toHaveBeenCalledTimes(1);
            expect(mockSubmitTodo).toHaveBeenCalledWith(testDesc, null, false);
        });
    });
});