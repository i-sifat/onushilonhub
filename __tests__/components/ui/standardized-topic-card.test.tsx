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

  describe('Identical Card Dimensions Across All Sections', () => {
    it('maintains identical fixed dimensions across all sections', () => {
      const sections = ['grammar', 'questions', 'combined', 'grammar-items', 'board-questions', 'get-started'];
      
      sections.forEach((section) => {
        const { unmount } = render(
          <StandardizedTopicCard
            topic={mockTopic}
            section={section as any}
            size="standard"
          />
        );

        const link = screen.getByRole('link');
        const card = link.firstChild as HTMLElement;
        
        // Test identical dimensions
        expect(card).toHaveClass('min-h-[120px]', 'max-h-[120px]');
        expect(card).toHaveClass('h-full', 'w-full');
        
        // Test consistent padding
        const content = card.querySelector('[class*="p-6"]');
        expect(content).toHaveClass('p-6');
        
        unmount();
      });
    });

    it('maintains consistent content layout structure', () => {
      const sections = ['grammar', 'questions', 'combined'];
      
      sections.forEach((section) => {
        const { unmount } = render(
          <StandardizedTopicCard
            topic={mockTopic}
            section={section as any}
            questionCount={45}
            size="standard"
          />
        );

        const link = screen.getByRole('link');
        const content = link.querySelector('[class*="p-6"]');
        
        // Test consistent content layout
        expect(content).toHaveClass('p-6', 'h-full', 'flex', 'items-center', 'space-x-4');
        
        unmount();
      });
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
    it('applies consistent typography to topic names across all sections', () => {
      const sections = ['grammar', 'questions', 'combined', 'grammar-items', 'board-questions', 'get-started'];
      
      sections.forEach((section) => {
        const { unmount } = render(
          <StandardizedTopicCard
            topic={mockTopic}
            section={section as any}
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
        
        unmount();
      });
    });

    it('applies consistent styling to question count for non-grammar sections', () => {
      const nonGrammarSections = ['questions', 'combined', 'board-questions', 'get-started'];
      
      nonGrammarSections.forEach((section) => {
        const { unmount } = render(
          <StandardizedTopicCard
            topic={mockTopic}
            section={section as any}
            questionCount={45}
            size="standard"
          />
        );

        const questionCountContainer = screen.getByText('45 Questions').parentElement;
        expect(questionCountContainer).toHaveClass(
          'text-sm', 'text-sf-text-subtle', 
          'group-hover:text-sf-text-bold', 'transition-colors', 'duration-300'
        );
        
        unmount();
      });
    });

    it('shows grammar rules indicator for grammar sections', () => {
      const grammarSections = ['grammar', 'grammar-items'];
      
      grammarSections.forEach((section) => {
        const { unmount } = render(
          <StandardizedTopicCard
            topic={mockTopic}
            section={section as any}
            questionCount={45}
            size="standard"
          />
        );

        expect(screen.queryByText('45 Questions')).not.toBeInTheDocument();
        expect(screen.getByText('Grammar Rules')).toBeInTheDocument();
        
        unmount();
      });
    });

    it('maintains consistent icon sizing and positioning', () => {
      const sections = ['grammar', 'questions', 'combined'];
      
      sections.forEach((section) => {
        const { unmount } = render(
          <StandardizedTopicCard
            topic={mockTopic}
            section={section as any}
            questionCount={45}
            size="standard"
          />
        );

        const link = screen.getByRole('link');
        const iconContainer = link.querySelector('[style*="color"]');
        expect(iconContainer).toHaveClass(
          'text-3xl', 'flex-shrink-0', 'w-12', 'h-12', 
          'flex', 'items-center', 'justify-center'
        );
        
        unmount();
      });
    });
  });

  describe('Enhanced Visual Consistency', () => {
    it('applies identical hover effects across all sections when enabled', () => {
      const sections = ['grammar', 'questions', 'combined', 'grammar-items', 'board-questions', 'get-started'];
      
      sections.forEach((section) => {
        const { unmount } = render(
          <StandardizedTopicCard
            topic={mockTopic}
            section={section as any}
            questionCount={45}
            size="standard"
            showHoverEffects={true}
          />
        );

        const link = screen.getByRole('link');
        const card = link.firstChild as HTMLElement;
        expect(card).toHaveClass(
          'transition-all', 'duration-300', 'ease-out',
          'hover:border-sf-button/50',
          'hover:shadow-lg', 'hover:shadow-sf-button/10',
          'hover:-translate-y-1', 'hover:scale-[1.01]',
          'cursor-pointer'
        );
        
        unmount();
      });
    });

    it('consistently disables hover effects across all sections when disabled', () => {
      const sections = ['grammar', 'questions', 'combined'];
      
      sections.forEach((section) => {
        const { unmount } = render(
          <StandardizedTopicCard
            topic={mockTopic}
            section={section as any}
            questionCount={45}
            size="standard"
            showHoverEffects={false}
          />
        );

        const link = screen.getByRole('link');
        const card = link.firstChild as HTMLElement;
        expect(card).toHaveClass(
          'transition-all', 'duration-300', 'ease-out',
          'hover:transform-none', 'hover:shadow-none', 'hover:border-sf-text-muted/20'
        );
        
        unmount();
      });
    });

    it('shows consistent active state styling across all sections', () => {
      const testCases = [
        { section: 'grammar-items', path: '/grammar-items/hsc/completing-sentence' },
        { section: 'board-questions', path: '/board-questions/hsc/completing-sentence' },
        { section: 'get-started', path: '/get-started/completing-sentence' }
      ];
      
      testCases.forEach(({ section, path }) => {
        mockUsePathname.mockReturnValue(path);
        
        const { unmount } = render(
          <StandardizedTopicCard
            topic={mockTopic}
            section={section as any}
            questionCount={45}
            size="standard"
          />
        );

        const link = screen.getByRole('link');
        const card = link.firstChild as HTMLElement;
        expect(card).toHaveClass(
          'ring-2', 'ring-sf-button/50',
          'border-sf-button/50',
          'bg-neutral-800/80',
          'animate-in', 'zoom-in-95', 'duration-200'
        );

        expect(screen.getByTestId('check-circle')).toBeInTheDocument();
        
        unmount();
      });
    });

    it('maintains consistent background gradient effects', () => {
      const sections = ['grammar', 'questions', 'combined'];
      
      sections.forEach((section) => {
        const { unmount } = render(
          <StandardizedTopicCard
            topic={mockTopic}
            section={section as any}
            questionCount={45}
            size="standard"
          />
        );

        const link = screen.getByRole('link');
        const card = link.firstChild as HTMLElement;
        
        // Check for background gradient elements
        const gradients = card.querySelectorAll('[class*="bg-gradient-to-r"]');
        expect(gradients.length).toBeGreaterThan(0);
        
        unmount();
      });
    });

    it('applies consistent icon hover animations across sections', () => {
      const sections = ['grammar', 'questions', 'combined'];
      
      sections.forEach((section) => {
        const { unmount } = render(
          <StandardizedTopicCard
            topic={mockTopic}
            section={section as any}
            questionCount={45}
            size="standard"
            showHoverEffects={true}
          />
        );

        const link = screen.getByRole('link');
        const iconContainer = link.querySelector('[style*="color"]');
        expect(iconContainer).toHaveClass(
          'transition-transform', 'duration-300', 'ease-out',
          'group-hover:scale-110'
        );
        
        unmount();
      });
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

  describe('Grid Layout Consistency', () => {
    it('maintains consistent appearance when displaying multiple cards in grid layouts', () => {
      const multipleTopics = [
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
          id: 'modifier-with-very-long-name',
          name: 'Modifier with Very Long Name That Should Truncate',
          slug: 'modifier',
          icon: '🎯',
          color: '#F59E0B'
        }
      ];

      const { container } = render(
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {multipleTopics.map((topic) => (
            <StandardizedTopicCard
              key={topic.id}
              topic={topic}
              section="combined"
              questionCount={45}
              size="standard"
              showHoverEffects={true}
            />
          ))}
        </div>
      );

      const cards = container.querySelectorAll('[class*="min-h-[120px]"]');
      expect(cards).toHaveLength(3);

      // Verify all cards have identical dimensions
      cards.forEach((card) => {
        expect(card).toHaveClass('min-h-[120px]', 'max-h-[120px]');
        expect(card).toHaveClass('h-full', 'w-full');
      });

      // Verify all cards have consistent styling
      cards.forEach((card) => {
        expect(card).toHaveClass(
          'border', 'border-sf-text-muted/20', 'bg-neutral-800',
          'rounded-xl', 'transition-all', 'duration-300', 'ease-out'
        );
      });
    });

    it('handles different topic data while maintaining standardized appearance', () => {
      const diverseTopics = [
        {
          id: 'short',
          name: 'Short',
          slug: 'short',
          icon: '📚',
          color: '#EF4444'
        },
        {
          id: 'medium-length-topic',
          name: 'Medium Length Topic Name',
          slug: 'medium',
          icon: '🎓',
          color: '#8B5CF6'
        },
        {
          id: 'extremely-long-topic-name',
          name: 'Extremely Long Topic Name That Should Definitely Truncate Because It Is Too Long',
          slug: 'long',
          icon: '🔬',
          color: '#06B6D4'
        }
      ];

      diverseTopics.forEach((topic) => {
        const { unmount } = render(
          <StandardizedTopicCard
            topic={topic}
            section="grammar"
            size="standard"
            showHoverEffects={true}
          />
        );

        // Verify consistent structure regardless of content length
        const link = screen.getByRole('link');
        const card = link.firstChild as HTMLElement;
        expect(card).toHaveClass('min-h-[120px]', 'max-h-[120px]');

        // Verify title truncation works
        const title = screen.getByText(topic.name);
        expect(title).toHaveClass('truncate');

        // Verify consistent icon styling
        const iconContainer = link.querySelector('[style*="color"]');
        expect(iconContainer).toHaveClass('w-12', 'h-12');

        unmount();
      });
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
      
      const questionCountContainer = screen.getByText('45 Questions').parentElement;
      expect(questionCountContainer).toHaveClass('text-sf-text-subtle');
    });
  });
});