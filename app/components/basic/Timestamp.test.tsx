import { render, screen } from '@testing-library/react';
import Timestamp from './Timestamp';
import { getDate } from 'date-fns';

describe('Timestamp', () => {
  it('renders the current year', () => {
    render(<Timestamp></Timestamp>);
    const currentYear = new Date().getFullYear();
    expect(screen.getByText(currentYear.toString())).toBeInTheDocument();
  });
});
