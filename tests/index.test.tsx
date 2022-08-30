import Home from '../pages/index';
import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';

describe('Home Page', () => {
  it('Renders home page with header, table, and footer', () => {
    render(<Home />);

    const header = screen.getByRole('banner');
    const main = screen.getByRole('main');
    const footer = screen.getByRole('contentinfo');
    const search = screen.getByRole('search');

    expect(header).toBeInTheDocument();
    expect(main).toBeInTheDocument();
    expect(footer).toBeInTheDocument();
    expect(search).toBeInTheDocument();
  });
});

describe('Table', () => {
  it('Table with list of SIMs', () => {
    render(<Home />);

    const table = screen.getByTestId('sims-table');
    const tableBody = screen.getByTestId('sims-table-body');

    expect(screen.getByTestId('add-sim-button')).toBeInTheDocument();
    expect(table).toBeInTheDocument();
    expect(tableBody).toBeInTheDocument();
  });
});
