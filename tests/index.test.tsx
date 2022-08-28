import Home from '../pages/index';
import '@testing-library/jest-dom';
import { fireEvent, render, screen } from '@testing-library/react';

describe('Home Page', () => {
  it('Renders home page with header, table, and footer', () => {
    render(<Home />);
    // check if all components are rendered
    const heading = screen.getByRole('heading', {
      name: /OXIO Skills Test/i,
    });

    expect(heading).toBeInTheDocument();
  });
});
