import { render, screen } from '@testing-library/react';
import ExportCSVButton from './ExportCSVButton';

const props = {
  id: undefined,
  disabled: false,
  displayInTable: false,
  exportCSV: jest.fn()
};

describe('Export CSV component', () => {
  it('should render without crashing', () => {
    render(<ExportCSVButton {...props} />);
  });

  it('should render the correct button props if displayInTable is true', () => {
    render(<ExportCSVButton {...props} displayInTable={true} />);
    const button = screen.getByTestId('secondary');
    expect(button).toBeInTheDocument();
  });

  it('should display the auxiliary info in the tooltip if disabled is true', () => {
    render(<ExportCSVButton {...props} disabled={true} />);
    const tooltip = screen.getByRole('tooltip');
    expect(tooltip).toBeInTheDocument();
  });
});
