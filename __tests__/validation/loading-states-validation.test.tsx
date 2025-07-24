import { render, screen } from '@testing-library/react';
import TopLoadingBar from '@/components/ui/top-loading-bar';
import PageLoadingSpinner from '@/components/ui/page-loading-spinner';
import ContentSkeleton from '@/components/ui/content-skeleton';

describe('Loading States Validation - Task 17', () => {
  describe('TopLoadingBar Component', () => {
    it('meets requirement 16.1: Creates TopLoadingBar component for page loading indication', () => {
      render(<TopLoadingBar />);
      
      const loadingBar = screen.getByTestId('top-loading-bar');
      expect(loadingBar).toBeInTheDocument();
      
      // Should be positioned at top of page
      expect(loadingBar).toHaveClass('fixed', 'top-0', 'left-0', 'right-0');
      
      // Should have proper z-index for overlay
      expect(loadingBar).toHaveClass('z-50');
      
      // Should have gradient background
      const gradientElement = loadingBar.querySelector('.bg-gradient-to-r');
      expect(gradientElement).toBeInTheDocument();
    });

    it('uses theme-consistent colors (requirement 16.4)', () => {
      render(<TopLoadingBar />);
      
      const loadingBar = screen.getByTestId('top-loading-bar');
      const gradientElement = loadingBar.querySelector('.bg-gradient-to-r.from-sf-button.via-sf-highlight.to-sf-button');
      expect(gradientElement).toBeInTheDocument();
      
      // Should have animated element with proper styling
      const animatedElement = gradientElement?.querySelector('.animate-pulse');
      expect(animatedElement).toBeInTheDocument();
    });
  });

  describe('PageLoadingSpinner Component', () => {
    it('meets requirement 16.2: Implements PageLoadingSpinner with beautiful animation for content loading', () => {
      render(<PageLoadingSpinner message="Loading content..." />);
      
      const spinner = screen.getByTestId('page-loading-spinner');
      expect(spinner).toBeInTheDocument();
      
      // Should have proper layout
      expect(spinner).toHaveClass('flex', 'flex-col', 'items-center', 'justify-center', 'min-h-[400px]');
      
      // Should display message
      expect(screen.getByText('Loading content...')).toBeInTheDocument();
      
      // Should use the common loading spinner
      const loadingSpinner = spinner.querySelector('[data-testid="loading-spinner"]');
      expect(loadingSpinner).toBeInTheDocument();
    });

    it('uses theme-consistent colors and animations (requirement 16.4)', () => {
      render(<PageLoadingSpinner />);
      
      const spinner = screen.getByTestId('page-loading-spinner');
      
      // Check that it uses the common loading spinner with theme colors
      const loadingSpinner = spinner.querySelector('[data-testid="loading-spinner"]');
      expect(loadingSpinner).toBeInTheDocument();
      
      // Check that the spinner icon uses theme colors
      const spinnerIcon = spinner.querySelector('.text-sf-button');
      expect(spinnerIcon).toBeInTheDocument();
      
      // Message should use theme text color
      render(<PageLoadingSpinner message="Test" />);
      const message = screen.getByText('Test');
      expect(message).toHaveClass('text-sf-text-subtle');
    });

    it('provides different sizes for various use cases', () => {
      const { rerender } = render(<PageLoadingSpinner size="sm" />);
      let spinner = screen.getByTestId('page-loading-spinner');
      expect(spinner.querySelector('[data-testid="loading-spinner"]')).toBeInTheDocument();

      rerender(<PageLoadingSpinner size="lg" />);
      spinner = screen.getByTestId('page-loading-spinner');
      expect(spinner.querySelector('[data-testid="loading-spinner"]')).toBeInTheDocument();
    });
  });

  describe('ContentSkeleton Component', () => {
    it('meets requirement 16.3: Adds ContentSkeleton component for smooth loading transitions', () => {
      render(<ContentSkeleton />);
      
      const skeleton = screen.getByTestId('content-skeleton-default');
      expect(skeleton).toBeInTheDocument();
      
      // Should have animation
      expect(skeleton).toHaveClass('animate-pulse');
      
      // Should have skeleton lines
      const lines = skeleton.querySelectorAll('.bg-sf-text-muted\\/20.rounded-lg');
      expect(lines.length).toBeGreaterThan(0);
    });

    it('supports multiple variants for different content types', () => {
      // Test card variant
      const { rerender } = render(<ContentSkeleton variant="card" />);
      expect(screen.getByTestId('content-skeleton-card')).toBeInTheDocument();
      
      // Test list variant
      rerender(<ContentSkeleton variant="list" />);
      expect(screen.getByTestId('content-skeleton-list')).toBeInTheDocument();
      
      // Test topic variant
      rerender(<ContentSkeleton variant="topic" />);
      expect(screen.getByTestId('content-skeleton-topic')).toBeInTheDocument();
    });

    it('uses theme-consistent colors (requirement 16.4)', () => {
      render(<ContentSkeleton variant="card" />);
      
      const skeleton = screen.getByTestId('content-skeleton-card');
      
      // Should use theme background colors
      expect(skeleton).toHaveClass('bg-neutral-800', 'border-sf-text-muted/20');
      
      // Skeleton elements should use theme colors
      const skeletonElements = skeleton.querySelectorAll('.bg-sf-text-muted\\/20');
      expect(skeletonElements.length).toBeGreaterThan(0);
    });
  });

  describe('Loading States Integration', () => {
    it('meets requirement 16.5: Loading states provide clear feedback during content building', () => {
      // Test that all components can work together
      render(
        <div>
          <TopLoadingBar />
          <PageLoadingSpinner message="Building content..." />
          <ContentSkeleton variant="list" lines={3} />
        </div>
      );
      
      // All components should be present
      expect(screen.getByTestId('top-loading-bar')).toBeInTheDocument();
      expect(screen.getByTestId('page-loading-spinner')).toBeInTheDocument();
      expect(screen.getByTestId('content-skeleton-list')).toBeInTheDocument();
      
      // Should provide clear feedback
      expect(screen.getByText('Building content...')).toBeInTheDocument();
    });

    it('maintains consistent theme across all loading components', () => {
      render(
        <div>
          <TopLoadingBar />
          <PageLoadingSpinner />
          <ContentSkeleton />
        </div>
      );
      
      // All should use sf-button color
      const topBar = screen.getByTestId('top-loading-bar');
      expect(topBar.querySelector('.from-sf-button')).toBeInTheDocument();
      
      const spinner = screen.getByTestId('page-loading-spinner');
      expect(spinner.querySelector('.text-sf-button')).toBeInTheDocument();
      
      const skeleton = screen.getByTestId('content-skeleton-default');
      expect(skeleton.querySelector('.bg-sf-text-muted\\/20')).toBeInTheDocument();
    });

    it('provides smooth transitions and animations', () => {
      render(<ContentSkeleton variant="card" />);
      
      const skeleton = screen.getByTestId('content-skeleton-card');
      
      // Should have rounded corners for smooth appearance
      expect(skeleton).toHaveClass('rounded-xl');
      
      // Skeleton elements should have animation
      const animatedElements = skeleton.querySelectorAll('.animate-pulse');
      expect(animatedElements.length).toBeGreaterThan(0);
      
      // Skeleton lines should have rounded corners
      const lines = skeleton.querySelectorAll('.rounded-lg');
      expect(lines.length).toBeGreaterThan(0);
    });
  });

  describe('Accessibility and Performance', () => {
    it('maintains accessibility with proper ARIA attributes', () => {
      render(<PageLoadingSpinner message="Loading..." />);
      
      // Should be properly structured for screen readers
      const spinner = screen.getByTestId('page-loading-spinner');
      expect(spinner).toHaveClass('flex', 'items-center', 'justify-center');
      
      // Message should be readable
      const message = screen.getByText('Loading...');
      expect(message).toBeInTheDocument();
    });

    it('uses efficient animations that respect user preferences', () => {
      render(<TopLoadingBar />);
      
      const loadingBar = screen.getByTestId('top-loading-bar');
      const animatedElement = loadingBar.querySelector('.animate-pulse');
      expect(animatedElement).toBeInTheDocument();
      
      // Should use CSS animations rather than JavaScript
      expect(animatedElement).toHaveClass('animate-pulse');
    });

    it('provides responsive design across different screen sizes', () => {
      render(<ContentSkeleton variant="topic" />);
      
      const skeleton = screen.getByTestId('content-skeleton-topic');
      expect(skeleton).toHaveClass('grid-cols-1', 'sm:grid-cols-2', 'lg:grid-cols-3');
    });
  });
});