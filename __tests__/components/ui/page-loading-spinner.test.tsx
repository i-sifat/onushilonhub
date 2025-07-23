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
    expect(screen.getByText(message)).toHaveClass('text-sf-text-subtle', 'animate-pulse');
  });

  it('does not display message when not provided', () => {
    render(<PageLoadingSpinner />);
    
    const messageElement = screen.queryByText(/Loading/);
    expect(messageElement).not.toBeInTheDocument();
  });

  it('applies correct size classes', () => {
    const { rerender } = render(<PageLoadingSpinner size="sm" />);
    let spinner = screen.getByTestId('page-loading-spinner');
    let outerRing = spinner.querySelector('.w-8.h-8');
    expect(outerRing).toBeInTheDocument();

    rerender(<PageLoadingSpinner size="md" />);
    spinner = screen.getByTestId('page-loading-spinner');
    outerRing = spinner.querySelector('.w-12.h-12');
    expect(outerRing).toBeInTheDocument();

    rerender(<PageLoadingSpinner size="lg" />);
    spinner = screen.getByTestId('page-loading-spinner');
    outerRing = spinner.querySelector('.w-16.h-16');
    expect(outerRing).toBeInTheDocument();
  });

  it('applies custom className correctly', () => {
    render(<PageLoadingSpinner className="custom-spinner" />);
    
    const spinner = screen.getByTestId('page-loading-spinner');
    expect(spinner).toHaveClass('custom-spinner');
  });

  it('has dual ring structure with correct animations', () => {
    render(<PageLoadingSpinner />);
    
    const spinner = screen.getByTestId('page-loading-spinner');
    const rings = spinner.querySelectorAll('.animate-spin');
    
    expect(rings).toHaveLength(2);
    
    // Check outer ring classes
    const outerRing = rings[0];
    expect(outerRing).toHaveClass('border-4', 'border-sf-text-muted/20', 'border-t-sf-button', 'rounded-full');
    
    // Check inner ring classes
    const innerRing = rings[1];
    expect(innerRing).toHaveClass('absolute', 'inset-0', 'border-4', 'border-transparent', 'border-r-sf-highlight', 'rounded-full');
  });

  it('centers content properly', () => {
    render(<PageLoadingSpinner message="Test message" />);
    
    const spinner = screen.getByTestId('page-loading-spinner');
    expect(spinner).toHaveClass('items-center', 'justify-center');
    
    const message = screen.getByText('Test message');
    expect(message).toHaveClass('text-center');
  });
});