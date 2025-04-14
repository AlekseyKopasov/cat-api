import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Button } from './Button';

describe('Button component', () => {
  it('renders button with text', () => {
    render(<Button text="Click me" />);
    expect(screen.getByText('Click me')).toBeInTheDocument();
  });

  it('shows loading state', () => {
    render(<Button text="Submit" loading={true} />);
    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  it('is disabled when disabled prop is true', () => {
    render(<Button text="Submit" disabled={true} />);
    expect(screen.getByRole('button')).toBeDisabled();
  });
});
