import { render } from '@testing-library/react';
import Footer from '../Components/Footer';

test(`Footer matches snapshot`, () => {
  const footerComponent = render(<Footer />);

  expect(footerComponent).toMatchSnapshot();
});