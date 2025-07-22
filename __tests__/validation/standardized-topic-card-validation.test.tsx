import React from 'react';
import { render, screen } from '@testing-library/react';
import { usePathname } from 'next/navigation';
import UniversalTopicNavigation from '@/components/universal/UniversalTopicNavigation';

// Mock Next.js navigation
jest.mock('next/navigation', () => ({
  usePathname: jest.fn(),
}));

const mockUsePathname = usePathname as jest.MockedFunction<typeof usePathname>;

describe('StandardizedTopicCard Integration Validation', () => {
  beforeEach(() => {
    mockUsePathname.mockReturnValue('/get-started/hsc');
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('Cross-Section Consistency Validation', () => {
    it('renders consistent topic cards across get-started section', () => {
      render(
        <UniversalTopicNavigation
          level="HSC"
          section="get-started"
          showSearch={false}
          showFilters={false}
          showStats={false}
        />
      );

      // Check that topic cards are rendered
      const topicCards = screen.getAllByRole('link');
      expect(topicCards.length).toBeGreaterThan(0);

      // Verify each card has consistent structure
      topicCards.forEach((link) => {
        const card = link.firstChild as HTMLElement;
        
        // Check consistent base classes
        expect(card).toHaveClass('group', 'relative', 'h-full', 'w-full');
        expect(card).toHaveClass('border', 'bg-neutral-800', 'rounded-xl');
        expect(card).toHaveClass('transition-all', 'duration-300', 'ease-out');
        expect(card).toHaveClass('min-h-[120px]');
      });
    });

    it('renders consistent topic cards across grammar-items section', () => {
      render(
        <UniversalTopicNavigation
          level="HSC"
          section="grammar-items"
          showSearch={false}
          showFilters={false}
          showStats={false}
        />
      );

      // Check that topic cards are rendered
      const topicCards = screen.getAllByRole('link');
      expect(topicCards.length).toBeGreaterThan(0);

      // Verify each card has consistent structure
      topicCards.forEach((link) => {
        const card = link.firstChild as HTMLElement;
        
        // Check consistent base classes
        expect(card).toHaveClass('group', 'relative', 'h-full', 'w-full');
        expect(card).toHaveClass('border', 'bg-neutral-800', 'rounded-xl');
        expect(card).toHaveClass('transition-all', 'duration-300', 'ease-out');
        expect(card).toHaveClass('min-h-[120px]');
      });

      // Verify question count is hidden for grammar-items section
      expect(screen.queryByText(/Questions$/)).not.toBeInTheDocument();
    });

    it('renders consistent topic cards across board-questions section', () => {
      render(
        <UniversalTopicNavigation
          level="HSC"
          section="board-questions"
          showSearch={false}
          showFilters={false}
          showStats={false}
        />
      );

      // Check that topic cards are rendered
      const topicCards = screen.getAllByRole('link');
      expect(topicCards.length).toBeGreaterThan(0);

      // Verify each card has consistent structure
      topicCards.forEach((link) => {
        const card = link.firstChild as HTMLElement;
        
        // Check consistent base classes
        expect(card).toHaveClass('group', 'relative', 'h-full', 'w-full');
        expect(card).toHaveClass('border', 'bg-neutral-800', 'rounded-xl');
        expect(card).toHaveClass('transition-all', 'duration-300', 'ease-out');
        expect(card).toHaveClass('min-h-[120px]');
      });

      // Verify question count is shown for board-questions section
      expect(screen.getAllByText(/Questions$/)).toHaveLength(9); // HSC has 9 topics
    });
  });

  describe('Visual Hierarchy Consistency', () => {
    it('maintains consistent typography across all sections', () => {
      const sections = ['get-started', 'grammar-items', 'board-questions'] as const;
      
      sections.forEach((section) => {
        const { unmount } = render(
          <UniversalTopicNavigation
            level="HSC"
            section={section}
            showSearch={false}
            showFilters={false}
            showStats={false}
          />
        );

        // Check that topic names have consistent typography
        const topicNames = screen.getAllByRole('heading', { level: 3 });
        topicNames.forEach((heading) => {
          expect(heading).toHaveClass(
            'text-lg', 'font-semibold', 'leading-tight', 'mb-2',
            'text-sf-text-bold', 'group-hover:text-sf-button',
            'transition-colors', 'duration-300', 'truncate'
          );
        });

        unmount();
      });
    });
  });

  describe('Routing Consistency', () => {
    it('generates correct routes for each section', () => {
      const sections = [
        { section: 'get-started', expectedPattern: '/get-started/' },
        { section: 'grammar-items', expectedPattern: '/grammar-items/hsc/' },
        { section: 'board-questions', expectedPattern: '/board-questions/hsc/' }
      ] as const;

      sections.forEach(({ section, expectedPattern }) => {
        const { unmount } = render(
          <UniversalTopicNavigation
            level="HSC"
            section={section}
            showSearch={false}
            showFilters={false}
            showStats={false}
          />
        );

        const topicLinks = screen.getAllByRole('link');
        topicLinks.forEach((link) => {
          const href = link.getAttribute('href');
          expect(href).toContain(expectedPattern);
        });

        unmount();
      });
    });
  });

  describe('Hover Effects Consistency', () => {
    it('applies consistent hover effects across all sections', () => {
      const sections = ['get-started', 'grammar-items', 'board-questions'] as const;
      
      sections.forEach((section) => {
        const { unmount } = render(
          <UniversalTopicNavigation
            level="HSC"
            section={section}
            showSearch={false}
            showFilters={false}
            showStats={false}
          />
        );

        const topicCards = screen.getAllByRole('link');
        topicCards.forEach((link) => {
          const card = link.firstChild as HTMLElement;
          
          // Check consistent hover effects
          expect(card).toHaveClass(
            'hover:border-sf-button/50',
            'hover:shadow-lg', 'hover:shadow-sf-button/10',
            'hover:-translate-y-1', 'hover:scale-[1.02]'
          );
        });

        unmount();
      });
    });
  });

  describe('Accessibility Consistency', () => {
    it('maintains consistent accessibility features across sections', () => {
      const sections = ['get-started', 'grammar-items', 'board-questions'] as const;
      
      sections.forEach((section) => {
        const { unmount } = render(
          <UniversalTopicNavigation
            level="HSC"
            section={section}
            showSearch={false}
            showFilters={false}
            showStats={false}
          />
        );

        // Check that all topic cards are accessible links
        const topicLinks = screen.getAllByRole('link');
        topicLinks.forEach((link) => {
          expect(link).toHaveAttribute('href');
          expect(link.getAttribute('href')).toBeTruthy();
        });

        unmount();
      });
    });
  });
});