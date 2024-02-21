import { render, screen } from '@testing-library/react';
import AllTodos from '../Components/AllTodos';
import sampleTodos from '../sampleTodos.json';

test(`it should render the correct number of Todo components based on the todo array supplied`, () => {

  const sampleTodosLength = sampleTodos.length;

  render(<AllTodos data={{ todos: sampleTodos }} />);

  // Test relies on all sample todo descriptions containing `sample` and it not appearing in any other text
  // May be better to use a unique string in test data!
  const numberOfRows = screen.getAllByText(/sample/i).length;

  expect(numberOfRows).toBe(sampleTodosLength);
});

test(`it should render a loading message before the todos are available`, async () => {
  const noData = { todos: [], error: `` };
  render(<AllTodos data={noData} />);

  expect(await screen.findByText(/loading/i)).toBeInTheDocument();
});

test(`it should render an error message if todos are not going to be available`, async () => {
  const errorData = { todos: [], error: `Error` };
  render(<AllTodos data={errorData} />);

  expect(await screen.findByText(/error/i)).toBeInTheDocument();
});

test(`it should render the correct number of Todo components based on the todo array supplied`, async () => {
  const todoData = { todos: sampleTodos, error: `` };
  render(<AllTodos data={todoData} />);

  const rows = await screen.findAllByText(/Sample Todo/i);
  expect(rows.length).toBe(4);
});

test(`it should render a single row when no todos are returned from the server without an error`, async () => {
  render(<AllTodos data={{ todos: [], error: `There are no todos previously stored` }} />);

  const rows = await screen.findByText(/there are no todos previously stored/i);
  expect(rows).toBeInTheDocument();
});