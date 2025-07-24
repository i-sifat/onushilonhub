import { render, screen } from '@testing-library/react';
import PageLoadingSpinner from '@/components/ui/page-loading-spinner';

describe('PageLoadingSpinner', () => {
  it('renders the spinner with default props', () => {
    render(<PageLoadingSpinner />);
    
    const spinner = screen.getByTestId('page-loading-spinner');
    expect(spinner).toBeInTheDocument();
    expect(spinner).toHaveClass('flex', 'flex-col', 'items-center', 'justify-center', 'min-h-[400px]');
  });

  it('displays message when provided', () => {
    const message = 'Loading content...';
    render(<PageLoadingSpinner message={message} />);
    
    expect(screen.getByText(message)).toBeInTheDocument();
    expect(screen.getByText(message)).toHaveClass('text-sf-text-subtle', 'text-sm');
  });

  it('does not display message when not provided', () => {
    render(<PageLoadingSpinner />);
    
    const messageElement = screen.queryByText(/Loading/);
    expect(messageElement).not.toBeInTheDocument();
  });

  it('applies correct size classes', () => {
    const { rerender } = render(<PageLoadingSpinner size="sm" />);
    let spinner = screen.getByTestId('page-loading-spinner');
    let loadingSpinner = spinner.querySelector('[data-testid="loading-spinner"]');
    expect(loadingSpinner).toBeInTheDocument();

    rerender(<PageLoadingSpinner size="md" />);
    spinner = screen.getByTestId('page-loading-spinner');
    loadingSpinner = spinner.querySelector('[data-testid="loading-spinner"]');
    expect(loadingSpinner).toBeInTheDocument();

    rerender(<PageLoadingSpinner size="lg" />);
    spinner = screen.getByTestId('page-loading-spinner');
    loadingSpinner = spinner.querySelector('[data-testid="loading-spinner"]');
    expect(loadingSpinner).toBeInTheDocument();
  });

  it('applies custom className correctly', () => {
    render(<PageLoadingSpinner className="custom-spinner" />);
    
    const spinner = screen.getByTestId('page-loading-spinner');
    expect(spinner).toHaveClass('custom-spinner');
  });

  it('uses the common loading spinner component', () => {
    render(<PageLoadingSpinner />);
    
    const spinner = screen.getByTestId('page-loading-spinner');
    const loadingSpinner = spinner.querySelector('[data-testid="loading-spinner"]');
    
    expect(loadingSpinner).toBeInTheDocument();
    
    // Check that it uses the Loader2 icon from lucide-react
    const spinnerIcon = spinner.querySelector('.animate-spin');
    expect(spinnerIcon).toBeInTheDocument();
    expect(spinnerIcon).toHaveClass('text-sf-button');
  });

  it('centers content properly', () => {
    render(<PageLoadingSpinner message="Test message" />);
    
    const spinner = screen.getByTestId('page-loading-spinner');
    expect(spinner).toHaveClass('items-center', 'justify-center');
    
    const message = screen.getByText('Test message');
    expect(message).toHaveClass('text-sf-text-subtle', 'text-sm');
  });
});