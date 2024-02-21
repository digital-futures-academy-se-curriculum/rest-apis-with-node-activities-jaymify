import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';

describe(`Submit todo - add test`, () => {
  test(`it calls submitTodo with the todo when submit todo is clicked on TodoForm`, () => {

    render(<App />);

    const testDesc = `Sample Test description`; // Sample is important as the query looks for it
    const descInput = screen.getByPlaceholderText(/todo description/i);
    const submitBtn = screen.getByDisplayValue(/submit/i);

    userEvent.type(descInput, testDesc);
    userEvent.click(submitBtn);

    const numberOfTodoRows = screen.getAllByText(/sample/i).length

    expect(numberOfTodoRows).toBe(1);

  });
});