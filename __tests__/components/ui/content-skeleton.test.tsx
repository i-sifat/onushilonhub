import { render, screen } from '@testing-library/react';
import ContentSkeleton from '@/components/ui/content-skeleton';

describe('ContentSkeleton', () => {
  it('renders default variant with correct structure', () => {
    render(<ContentSkeleton />);
    
    const skeleton = screen.getByTestId('content-skeleton-default');
    expect(skeleton).toBeInTheDocument();
    expect(skeleton).toHaveClass('space-y-4', 'animate-pulse');
    
    // Should have 3 lines by default
    const lines = skeleton.querySelectorAll('.h-4.bg-sf-text-muted\\/20.rounded-lg');
    expect(lines).toHaveLength(3);
  });

  it('renders custom number of lines', () => {
    render(<ContentSkeleton lines={5} />);
    
    const skeleton = screen.getByTestId('content-skeleton-default');
    const lines = skeleton.querySelectorAll('.h-4.bg-sf-text-muted\\/20.rounded-lg');
    expect(lines).toHaveLength(5);
  });

  it('renders card variant with proper structure', () => {
    render(<ContentSkeleton variant="card" />);
    
    const skeleton = screen.getByTestId('content-skeleton-card');
    expect(skeleton).toBeInTheDocument();
    expect(skeleton).toHaveClass('rounded-xl', 'border', 'border-sf-text-muted/20', 'bg-neutral-800', 'p-6');
    
    // Should have avatar placeholder
    const avatar = skeleton.querySelector('.w-10.h-10.bg-sf-text-muted\\/20.rounded-full');
    expect(avatar).toBeInTheDocument();
  });

  it('renders list variant with multiple items', () => {
    render(<ContentSkeleton variant="list" lines={4} />);
    
    const skeleton = screen.getByTestId('content-skeleton-list');
    expect(skeleton).toBeInTheDocument();
    expect(skeleton).toHaveClass('space-y-4');
    
    // Should have 4 list items
    const listItems = skeleton.querySelectorAll('.flex.items-center.space-x-4');
    expect(listItems).toHaveLength(4);
    
    // Each item should have an icon placeholder
    const icons = skeleton.querySelectorAll('.w-12.h-12.bg-sf-text-muted\\/20.rounded-lg');
    expect(icons).toHaveLength(4);
  });

  it('renders topic variant with grid layout', () => {
    render(<ContentSkeleton variant="topic" />);
    
    const skeleton = screen.getByTestId('content-skeleton-topic');
    expect(skeleton).toBeInTheDocument();
    expect(skeleton).toHaveClass('grid', 'grid-cols-1', 'sm:grid-cols-2', 'lg:grid-cols-3', 'gap-6');
    
    // Should have 6 topic cards by default
    const topicCards = skeleton.querySelectorAll('.aspect-square.rounded-xl');
    expect(topicCards).toHaveLength(6);
    
    // Each card should have a circular icon placeholder
    const icons = skeleton.querySelectorAll('.w-16.h-16.bg-sf-text-muted\\/20.rounded-full');
    expect(icons).toHaveLength(6);
  });

  it('applies custom className correctly', () => {
    render(<ContentSkeleton className="custom-skeleton" />);
    
    const skeleton = screen.getByTestId('content-skeleton-default');
    expect(skeleton).toHaveClass('custom-skeleton');
  });

  it('has proper animation classes', () => {
    render(<ContentSkeleton />);
    
    const skeleton = screen.getByTestId('content-skeleton-default');
    expect(skeleton).toHaveClass('animate-pulse');
    
    const lines = skeleton.querySelectorAll('.animate-pulse');
    expect(lines.length).toBeGreaterThan(0);
  });

  it('uses theme-consistent colors', () => {
    render(<ContentSkeleton variant="card" />);
    
    const skeleton = screen.getByTestId('content-skeleton-card');
    expect(skeleton).toHaveClass('bg-neutral-800', 'border-sf-text-muted/20');
    
    const skeletonElements = skeleton.querySelectorAll('.bg-sf-text-muted\\/20');
    expect(skeletonElements.length).toBeGreaterThan(0);
  });

  it('maintains responsive design in topic variant', () => {
    render(<ContentSkeleton variant="topic" />);
    
    const skeleton = screen.getByTestId('content-skeleton-topic');
    expect(skeleton).toHaveClass('grid-cols-1', 'sm:grid-cols-2', 'lg:grid-cols-3');
  });

  it('centers content in topic cards', () => {
    render(<ContentSkeleton variant="topic" />);
    
    const skeleton = screen.getByTestId('content-skeleton-topic');
    const centerContainers = skeleton.querySelectorAll('.flex.items-center.justify-center');
    expect(centerContainers).toHaveLength(6);
    
    const textCenters = skeleton.querySelectorAll('.text-center');
    expect(textCenters).toHaveLength(6);
  });
});