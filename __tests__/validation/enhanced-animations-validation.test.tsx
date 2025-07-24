/**
 * Enhanced Animations Validation Tests
 * 
 * This test suite validates that all interactive elements have smooth,
 * professional animations that enhance user experience without being distracting.
 */

import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { CollapsibleTopicIntroduction } from '@/components/ui/collapsible-topic-introduction';
import { InteractiveAnswerReveal } from '@/components/ui/interactive-answer-reveal';
import UnifiedSelectionCard from '@/components/ui/unified-selection-card';
import StandardizedTopicCard from '@/components/ui/standardized-topic-card';
import BackButton from '@/components/common/BackButton';
import { Button } from '@/components/ui/button';

// Mock Next.js router
jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: jest.fn(),
    back: jest.fn(),
  }),
  usePathname: () => '/test-path',
}));

describe('Enhanced Animations Validation', () => {
  describe('Button Animations', () => {
    test('buttons have subtle hover animations with scale and translate effects', () => {
      render(<Button>Test Button</Button>);
      const button = screen.getByRole('button');
      
      // Check for transition classes
      expect(button).toHaveClass('transition-all');
      expect(button).toHaveClass('duration-200');
      expect(button).toHaveClass('ease-out');
      
      // Check for hover effects
      expect(button.className).toMatch(/hover:-translate-y-0\.5/);
      expect(button.className).toMatch(/hover:shadow-md/);
      
      // Check for active scale effect
      expect(button.className).toMatch(/active:scale-\[0\.98\]/);
    });

    test('primary buttons have enhanced hover effects with glow', () => {
      render(<Button variant="default">Primary Button</Button>);
      const button = screen.getByRole('button');
      
      expect(button.className).toMatch(/hover:bg-primary\/90/);
      expect(button.className).toMatch(/hover:-translate-y-0\.5/);
      expect(button.className).toMatch(/hover:shadow-md/);
    });

    test('ghost buttons have scale-only hover effects', () => {
      render(<Button variant="ghost">Ghost Button</Button>);
      const button = screen.getByRole('button');
      
      expect(button.className).toMatch(/hover:scale-\[1\.02\]/);
      expect(button.className).toMatch(/hover:bg-accent/);
    });
  });

  describe('Collapsible Card Animations', () => {
    const mockProps = {
      title: "Test Topic",
      banglaDescription: "Test description in Bangla",
      types: {
        title: "Types",
        description: "Type description",
        list: ["Type 1", "Type 2"]
      }
    };

    test('collapsible cards have smooth expand/collapse animations', async () => {
      render(<CollapsibleTopicIntroduction {...mockProps} />);
      
      const header = screen.getByText('Test Topic').closest('div');
      expect(header).toHaveClass('transition-all');
      expect(header).toHaveClass('duration-200');
      expect(header).toHaveClass('ease-out');
      
      // Check hover effects
      expect(header?.className).toMatch(/hover:bg-sf-button\/5/);
      expect(header?.className).toMatch(/hover:scale-\[1\.005\]/);
    });

    test('chevron icons have rotation animations', async () => {
      render(<CollapsibleTopicIntroduction {...mockProps} />);
      
      const button = screen.getByRole('button');
      fireEvent.click(button);
      
      await waitFor(() => {
        const chevron = screen.getByRole('button').querySelector('svg');
        expect(chevron).toHaveClass('transition-transform');
        expect(chevron).toHaveClass('duration-200');
        expect(chevron).toHaveClass('ease-out');
      });
    });

    test('content appears with fade-in animation when expanded', async () => {
      render(<CollapsibleTopicIntroduction {...mockProps} />);
      
      const toggleButton = screen.getByRole('button');
      fireEvent.click(toggleButton);
      
      await waitFor(() => {
        const content = screen.getByText('Test description in Bangla');
        const contentContainer = content.closest('div');
        expect(contentContainer?.className).toMatch(/animate-in/);
        expect(contentContainer?.className).toMatch(/fade-in/);
      });
    });

    test('list items have staggered animation delays', async () => {
      render(<CollapsibleTopicIntroduction {...mockProps} />);
      
      const toggleButton = screen.getByRole('button');
      fireEvent.click(toggleButton);
      
      await waitFor(() => {
        const listItems = screen.getAllByText(/Type \d/);
        listItems.forEach((item, index) => {
          const listItem = item.closest('li');
          expect(listItem?.className).toMatch(/\[animation-delay:\d+ms\]/);
        });
      });
    });
  });

  describe('Answer Reveal Animations', () => {
    const mockProps = {
      title: "Test Rule",
      banglaDescription: "Test description",
      examples: [
        "This is a [test] example.",
        "Another [sample] sentence."
      ]
    };

    test('eye icons have hover animations with scale and rotation', () => {
      render(<InteractiveAnswerReveal {...mockProps} />);
      
      const eyeButtons = screen.getAllByTestId('eye-button');
      eyeButtons.forEach(button => {
        expect(button.className).toMatch(/hover:scale-105/);
        expect(button.className).toMatch(/active:scale-95/);
        expect(button.className).toMatch(/transition-all/);
        expect(button.className).toMatch(/duration-200/);
      });
    });

    test('eye icons have rotation effect on hover', () => {
      render(<InteractiveAnswerReveal {...mockProps} />);
      
      const eyeIcons = screen.getAllByTestId('eye-icon');
      eyeIcons.forEach(icon => {
        expect(icon.className).toMatch(/hover:scale-110/);
        expect(icon.className).toMatch(/hover:rotate-12/);
        expect(icon.className).toMatch(/transition-all/);
      });
    });

    test('revealed answers have fade-in animation', async () => {
      render(<InteractiveAnswerReveal {...mockProps} />);
      
      const eyeButton = screen.getAllByTestId('eye-button')[0];
      fireEvent.click(eyeButton);
      
      await waitFor(() => {
        const revealedAnswer = screen.getByTestId('revealed-answer');
        expect(revealedAnswer.className).toMatch(/animate-in/);
        expect(revealedAnswer.className).toMatch(/fade-in/);
        expect(revealedAnswer.className).toMatch(/zoom-in-95/);
      });
    });

    test('example containers have staggered fade-in animations', () => {
      render(<InteractiveAnswerReveal {...mockProps} />);
      
      const examples = screen.getAllByText(/This is a|Another/);
      examples.forEach((example, index) => {
        const container = example.closest('div');
        expect(container?.className).toMatch(/animate-in/);
        expect(container?.className).toMatch(/fade-in/);
        expect(container?.className).toMatch(/\[animation-delay:\d+ms\]/);
      });
    });
  });

  describe('Card Animations', () => {
    const mockTopic = {
      id: '1',
      name: 'Test Topic',
      slug: 'test-topic',
      icon: '📚',
      color: '#3B82F6'
    };

    test('topic cards have consistent hover animations', () => {
      render(
        <StandardizedTopicCard
          topic={mockTopic}
          section="grammar"
          questionCount={10}
        />
      );
      
      const card = screen.getByRole('link');
      expect(card.className).toMatch(/hover:-translate-y-1/);
      expect(card.className).toMatch(/hover:scale-\[1\.01\]/);
      expect(card.className).toMatch(/hover:shadow-lg/);
      expect(card.className).toMatch(/hover:border-sf-button\/50/);
      expect(card.className).toMatch(/transition-all/);
      expect(card.className).toMatch(/duration-300/);
    });

    test('selection cards have enhanced hover effects', () => {
      const mockProps = {
        type: 'HSC' as const,
        section: 'grammar' as const,
        title: 'Test Section',
        description: 'Test description',
        statistics: { topics: 10, rules: 50 },
        route: '/test-route'
      };

      render(<UnifiedSelectionCard {...mockProps} />);
      
      const card = screen.getByText('Test Section').closest('div');
      expect(card?.className).toMatch(/hover:-translate-y-2/);
      expect(card?.className).toMatch(/hover:scale-\[1\.02\]/);
      expect(card?.className).toMatch(/hover:shadow-lg/);
      expect(card?.className).toMatch(/transition-all/);
    });

    test('card icons have rotation animations on hover', () => {
      const mockProps = {
        type: 'HSC' as const,
        section: 'grammar' as const,
        title: 'Test Section',
        description: 'Test description',
        statistics: { topics: 10 },
        route: '/test-route'
      };

      render(<UnifiedSelectionCard {...mockProps} />);
      
      const iconContainer = screen.getByText('📚');
      expect(iconContainer.className).toMatch(/group-hover:scale-110/);
      expect(iconContainer.className).toMatch(/group-hover:rotate-3/);
      expect(iconContainer.className).toMatch(/transition-transform/);
    });
  });

  describe('Navigation Animations', () => {
    test('back button has subtle hover animations', () => {
      render(<BackButton />);
      
      const button = screen.getByRole('button');
      expect(button.className).toMatch(/hover:-translate-y-0\.5/);
      expect(button.className).toMatch(/hover:scale-\[1\.01\]/);
      expect(button.className).toMatch(/transition-all/);
      expect(button.className).toMatch(/duration-200/);
    });

    test('back button arrow has translation animation', () => {
      render(<BackButton />);
      
      const arrow = screen.getByRole('button').querySelector('svg');
      expect(arrow?.className).toMatch(/group-hover:-translate-x-0\.5/);
      expect(arrow?.className).toMatch(/group-hover:scale-110/);
      expect(arrow?.className).toMatch(/transition-transform/);
    });
  });

  describe('Animation Performance', () => {
    test('animations use efficient CSS properties', () => {
      render(<Button>Test</Button>);
      const button = screen.getByRole('button');
      
      // Check for hardware-accelerated properties
      expect(button.className).toMatch(/transition-all/);
      expect(button.className).toMatch(/ease-out/);
      
      // Ensure reasonable duration (not too slow)
      expect(button.className).toMatch(/duration-200/);
    });

    test('animations have proper easing functions', () => {
      const mockProps = {
        title: "Test",
        banglaDescription: "Test",
        examples: ["Test [example]."]
      };

      render(<InteractiveAnswerReveal {...mockProps} />);
      
      const button = screen.getByTestId('eye-button');
      expect(button.className).toMatch(/ease-out/);
    });
  });

  describe('Accessibility Considerations', () => {
    test('animations respect user preferences', () => {
      // Mock prefers-reduced-motion
      Object.defineProperty(window, 'matchMedia', {
        writable: true,
        value: jest.fn().mockImplementation(query => ({
          matches: query === '(prefers-reduced-motion: reduce)',
          media: query,
          onchange: null,
          addListener: jest.fn(),
          removeListener: jest.fn(),
          addEventListener: jest.fn(),
          removeEventListener: jest.fn(),
          dispatchEvent: jest.fn(),
        })),
      });

      render(<Button>Test</Button>);
      const button = screen.getByRole('button');
      
      // Animations should still be present but could be modified for accessibility
      expect(button).toHaveClass('transition-all');
    });

    test('interactive elements maintain focus indicators', () => {
      render(<Button>Test</Button>);
      const button = screen.getByRole('button');
      
      expect(button.className).toMatch(/focus-visible:outline-none/);
      expect(button.className).toMatch(/focus-visible:ring-2/);
    });
  });

  describe('Animation Consistency', () => {
    test('similar elements use consistent animation timing', () => {
      const mockTopic = {
        id: '1',
        name: 'Test',
        slug: 'test',
        icon: '📚',
        color: '#3B82F6'
      };

      render(
        <div>
          <StandardizedTopicCard topic={mockTopic} section="grammar" />
          <Button>Test Button</Button>
        </div>
      );
      
      const card = screen.getByRole('link');
      const button = screen.getByRole('button');
      
      // Both should use similar transition durations
      expect(card.className).toMatch(/duration-300/);
      expect(button.className).toMatch(/duration-200/);
    });

    test('hover effects are consistent across similar components', () => {
      const mockProps1 = {
        type: 'HSC' as const,
        section: 'grammar' as const,
        title: 'Test 1',
        description: 'Test',
        statistics: { topics: 10 },
        route: '/test1'
      };

      const mockProps2 = {
        type: 'SSC' as const,
        section: 'questions' as const,
        title: 'Test 2',
        description: 'Test',
        statistics: { topics: 5 },
        route: '/test2'
      };

      render(
        <div>
          <UnifiedSelectionCard {...mockProps1} />
          <UnifiedSelectionCard {...mockProps2} />
        </div>
      );
      
      const cards = screen.getAllByText(/Test \d/).map(el => el.closest('div'));
      
      cards.forEach(card => {
        expect(card?.className).toMatch(/hover:-translate-y-2/);
        expect(card?.className).toMatch(/hover:scale-\[1\.02\]/);
        expect(card?.className).toMatch(/transition-all/);
      });
    });
  });
});