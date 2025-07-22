import React from 'react';
import { render, screen } from '@testing-library/react';
import { usePathname } from 'next/navigation';
import { StandardizedTopicCard } from '@/components/ui/standardized-topic-card';

// Mock Next.js navigation
jest.mock('next/navigation', () => ({
  usePathname: jest.fn(),
}));

const mockUsePathname = usePathname as jest.MockedFunction<typeof usePathname>;

describe('StandardizedTopicCard', () => {
  const mockTopic = {
    id: 'completing-sentence',
    name: 'Completing Sentence',
    slug: 'completing-sentence',
    icon: '📝',
    color: '#3B82F6'
  };

  beforeEach(() => {
    mockUsePathname.mockReturnValue('/get-started/hsc');
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('Consistent Design Across Sections', () => {
    it('renders with consistent styling for grammar section', () => {
      render(
        <StandardizedTopicCard
          topic={mockTopic}
          section="grammar"
          size="standard"
          showHoverEffects={true}
        />
      );

      const link = screen.getByRole('link');
      const card = link.firstChild as HTMLElement;
      expect(card).toHaveClass('group', 'relative', 'h-full', 'w-full');
      expect(card).toHaveClass('border', 'border-sf-text-muted/20', 'bg-neutral-800');
      expect(card).toHaveClass('rounded-xl', 'transition-all', 'duration-300', 'ease-out');
    });

    it('renders with consistent styling for questions section', () => {
      render(
        <StandardizedTopicCard
          topic={mockTopic}
          section="questions"
          questionCount={45}
          size="standard"
          showHoverEffects={true}
        />
      );

      const link = screen.getByRole('link');
      const card = link.firstChild as HTMLElement;
      expect(card).toHaveClass('group', 'relative', 'h-full', 'w-full');
      expect(card).toHaveClass('border', 'border-sf-text-muted/20', 'bg-neutral-800');
      expect(card).toHaveClass('rounded-xl', 'transition-all', 'duration-300', 'ease-out');
    });

    it('renders with consistent styling for combined section', () => {
      render(
        <StandardizedTopicCard
          topic={mockTopic}
          section="combined"
          questionCount={45}
          size="standard"
          showHoverEffects={true}
        />
      );

      const link = screen.getByRole('link');
      const card = link.firstChild as HTMLElement;
      expect(card).toHaveClass('group', 'relative', 'h-full', 'w-full');
      expect(card).toHaveClass('border', 'border-sf-text-muted/20', 'bg-neutral-800');
      expect(card).toHaveClass('rounded-xl', 'transition-all', 'duration-300', 'ease-out');
    });
  });

  describe('Same Card Dimensions', () => {
    it('maintains standard size across all sections', () => {
      const { rerender } = render(
        <StandardizedTopicCard
          topic={mockTopic}
          section="grammar"
          size="standard"
        />
      );

      let link = screen.getByRole('link');
      let card = link.firstChild as HTMLElement;
      expect(card).toHaveClass('min-h-[120px]');

      rerender(
        <StandardizedTopicCard
          topic={mockTopic}
          section="questions"
          size="standard"
        />
      );

      link = screen.getByRole('link');
      card = link.firstChild as HTMLElement;
      expect(card).toHaveClass('min-h-[120px]');

      rerender(
        <StandardizedTopicCard
          topic={mockTopic}
          section="combined"
          size="standard"
        />
      );

      link = screen.getByRole('link');
      card = link.firstChild as HTMLElement;
      expect(card).toHaveClass('min-h-[120px]');
    });
  });

  describe('Shared Component with Different Topic Names', () => {
    const topics = [
      {
        id: 'completing-sentence',
        name: 'Completing Sentence',
        slug: 'completing-sentence',
        icon: '📝',
        color: '#3B82F6'
      },
      {
        id: 'connectors',
        name: 'Connectors',
        slug: 'connectors',
        icon: '🔗',
        color: '#10B981'
      },
      {
        id: 'modifier',
        name: 'Modifier',
        slug: 'modifier',
        icon: '🎯',
        color: '#F59E0B'
      }
    ];

    it('renders different topic names while maintaining layout', () => {
      topics.forEach((topic) => {
        const { unmount } = render(
          <StandardizedTopicCard
            topic={topic}
            section="combined"
            questionCount={45}
            size="standard"
          />
        );

        expect(screen.getByText(topic.name)).toBeInTheDocument();
        expect(screen.getByText(topic.icon)).toBeInTheDocument();
        
        const link = screen.getByRole('link');
        const card = link.firstChild as HTMLElement;
        expect(card).toHaveClass('min-h-[120px]');
        
        unmount();
      });
    });
  });

  describe('Consistent Typography and Visual Hierarchy', () => {
    it('applies consistent typography to topic names', () => {
      render(
        <StandardizedTopicCard
          topic={mockTopic}
          section="combined"
          questionCount={45}
          size="standard"
        />
      );

      const topicName = screen.getByText('Completing Sentence');
      expect(topicName).toHaveClass(
        'text-lg', 'font-semibold', 'leading-tight', 'mb-2',
        'text-sf-text-bold', 'group-hover:text-sf-button',
        'transition-colors', 'duration-300', 'truncate'
      );
    });

    it('applies consistent styling to question count', () => {
      render(
        <StandardizedTopicCard
          topic={mockTopic}
          section="questions"
          questionCount={45}
          size="standard"
        />
      );

      const questionCount = screen.getByText('45 Questions');
      expect(questionCount).toHaveClass(
        'text-sm', 'text-sf-text-subtle', 
        'group-hover:text-sf-text-bold', 'transition-colors', 'duration-300'
      );
    });

    it('hides question count for grammar sections', () => {
      render(
        <StandardizedTopicCard
          topic={mockTopic}
          section="grammar"
          questionCount={45}
          size="standard"
        />
      );

      expect(screen.queryByText('45 Questions')).not.toBeInTheDocument();
    });

    it('hides question count for grammar-items sections', () => {
      render(
        <StandardizedTopicCard
          topic={mockTopic}
          section="grammar-items"
          questionCount={45}
          size="standard"
        />
      );

      expect(screen.queryByText('45 Questions')).not.toBeInTheDocument();
    });
  });

  describe('Visual Consistency', () => {
    it('applies hover effects when enabled', () => {
      render(
        <StandardizedTopicCard
          topic={mockTopic}
          section="combined"
          questionCount={45}
          size="standard"
          showHoverEffects={true}
        />
      );

      const link = screen.getByRole('link');
      const card = link.firstChild as HTMLElement;
      expect(card).toHaveClass(
        'hover:border-sf-button/50',
        'hover:shadow-lg', 'hover:shadow-sf-button/10',
        'hover:-translate-y-1', 'hover:scale-[1.02]'
      );
    });

    it('does not apply hover effects when disabled', () => {
      render(
        <StandardizedTopicCard
          topic={mockTopic}
          section="combined"
          questionCount={45}
          size="standard"
          showHoverEffects={false}
        />
      );

      const link = screen.getByRole('link');
      const card = link.firstChild as HTMLElement;
      expect(card).not.toHaveClass(
        'hover:border-sf-button/50',
        'hover:shadow-lg', 'hover:shadow-sf-button/10',
        'hover:-translate-y-1', 'hover:scale-[1.02]'
      );
    });

    it('shows active state when current path matches', () => {
      mockUsePathname.mockReturnValue('/get-started/completing-sentence');
      
      render(
        <StandardizedTopicCard
          topic={mockTopic}
          section="get-started"
          questionCount={45}
          size="standard"
        />
      );

      const link = screen.getByRole('link');
      const card = link.firstChild as HTMLElement;
      expect(card).toHaveClass(
        'ring-2', 'ring-sf-button/50',
        'border-sf-button/50',
        'bg-neutral-800/80'
      );

      expect(screen.getByTestId('check-circle')).toBeInTheDocument();
    });
  });

  describe('Routing Consistency', () => {
    it('generates correct routes for different sections', () => {
      const sections = [
        { section: 'grammar-items', expectedHref: '/grammar-items/hsc/completing-sentence' },
        { section: 'board-questions', expectedHref: '/board-questions/hsc/completing-sentence' },
        { section: 'get-started', expectedHref: '/get-started/completing-sentence' },
        { section: 'combined', expectedHref: '/get-started/completing-sentence' }
      ];

      sections.forEach(({ section, expectedHref }) => {
        const { unmount } = render(
          <StandardizedTopicCard
            topic={mockTopic}
            section={section as any}
            questionCount={45}
            size="standard"
          />
        );

        const link = screen.getByRole('link');
        expect(link).toHaveAttribute('href', expectedHref);
        
        unmount();
      });
    });

    it('handles SSC level routing correctly', () => {
      mockUsePathname.mockReturnValue('/get-started/ssc');
      
      render(
        <StandardizedTopicCard
          topic={mockTopic}
          section="grammar-items"
          questionCount={45}
          size="standard"
        />
      );

      const link = screen.getByRole('link');
      expect(link).toHaveAttribute('href', '/grammar-items/ssc/completing-sentence');
    });
  });

  describe('Accessibility', () => {
    it('provides proper link accessibility', () => {
      render(
        <StandardizedTopicCard
          topic={mockTopic}
          section="combined"
          questionCount={45}
          size="standard"
        />
      );

      const link = screen.getByRole('link');
      expect(link).toBeInTheDocument();
      expect(link).toHaveAttribute('href');
    });

    it('maintains proper color contrast', () => {
      render(
        <StandardizedTopicCard
          topic={mockTopic}
          section="combined"
          questionCount={45}
          size="standard"
        />
      );

      const topicName = screen.getByText('Completing Sentence');
      expect(topicName).toHaveClass('text-sf-text-bold');
      
      const questionCount = screen.getByText('45 Questions');
      expect(questionCount).toHaveClass('text-sf-text-subtle');
    });
  });
});