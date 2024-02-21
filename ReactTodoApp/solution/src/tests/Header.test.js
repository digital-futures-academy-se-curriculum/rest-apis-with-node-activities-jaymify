import { render } from '@testing-library/react';
import Header from '../Components/Header';

test(`Header matches snapshot`, () => {
  // const headerComponent = render(<Header />);

  // expect(headerComponent).toMatchSnapshot();
  expect(render(<Header />)).toMatchSnapshot();
});