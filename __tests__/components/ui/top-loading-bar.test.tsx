import { render, screen } from '@testing-library/react';
import TopLoadingBar from '@/components/ui/top-loading-bar';

describe('TopLoadingBar', () => {
  it('renders the loading bar when visible', () => {
    render(<TopLoadingBar isVisible={true} />);
    
    const loadingBar = screen.getByTestId('top-loading-bar');
    expect(loadingBar).toBeInTheDocument();
    expect(loadingBar).toHaveClass('fixed', 'top-0', 'left-0', 'right-0', 'z-50');
  });

  it('does not render when not visible', () => {
    render(<TopLoadingBar isVisible={false} />);
    
    const loadingBar = screen.queryByTestId('top-loading-bar');
    expect(loadingBar).not.toBeInTheDocument();
  });

  it('renders by default when isVisible prop is not provided', () => {
    render(<TopLoadingBar />);
    
    const loadingBar = screen.getByTestId('top-loading-bar');
    expect(loadingBar).toBeInTheDocument();
  });

  it('applies custom className correctly', () => {
    render(<TopLoadingBar className="custom-class" />);
    
    const loadingBar = screen.getByTestId('top-loading-bar');
    expect(loadingBar).toHaveClass('custom-class');
  });

  it('has correct gradient structure', () => {
    render(<TopLoadingBar />);
    
    const loadingBar = screen.getByTestId('top-loading-bar');
    const gradientContainer = loadingBar.querySelector('.h-1.bg-gradient-to-r');
    const animatedElement = gradientContainer?.querySelector('.animate-pulse');
    
    expect(gradientContainer).toBeInTheDocument();
    expect(animatedElement).toBeInTheDocument();
  });

  it('maintains proper z-index for overlay positioning', () => {
    render(<TopLoadingBar />);
    
    const loadingBar = screen.getByTestId('top-loading-bar');
    expect(loadingBar).toHaveClass('z-50');
  });
});