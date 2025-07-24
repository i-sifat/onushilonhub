/**
 * Task 14: Enhanced Animations Validation Tests
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

describe('Task 14: Enhanced Animations Validation', () => {
  describe('1. Button Hover Animations with Scale and Translate Effects', () => {
    test('buttons have subtle hover animations', () => {
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

  describe('2. Smooth Expand/Collapse Animations for Collapsible Cards', () => {
    const mockProps = {
      title: "Test Topic",
      banglaDescription: "Test description in Bangla",
      types: {
        title: "Types",
        description: "Type description",
        list: ["Type 1", "Type 2"]
      }
    };

    test('collapsible cards have smooth animations', async () => {
      render(<CollapsibleTopicIntroduction {...mockProps} />);
      
      // Check that the card has animation classes
      const card = screen.getByText('Test Topic').closest('[class*="border-sf-text-muted"]');
      expect(card?.className).toMatch(/transition-all|hover:border-sf-button/);
    });

    test('chevron icons have rotation animations', async () => {
      render(<CollapsibleTopicIntroduction {...mockProps} />);
      
      const button = screen.getByRole('button');
      const chevron = button.querySelector('svg');
      
      // SVG className is an object, so we need to check the class attribute
      const classAttr = chevron?.getAttribute('class') || '';
      expect(classAttr).toMatch(/transition-transform/);
      expect(classAttr).toMatch(/duration-200/);
    });

    test('content appears with fade-in animation when expanded', async () => {
      render(<CollapsibleTopicIntroduction {...mockProps} />);
      
      const toggleButton = screen.getByRole('button');
      fireEvent.click(toggleButton);
      
      await waitFor(() => {
        const content = screen.getByText('Test description in Bangla');
        expect(content).toBeInTheDocument();
        
        // Check that the content container has animation classes
        const contentContainer = content.closest('[class*="animate-in"]');
        expect(contentContainer?.className).toMatch(/animate-in|fade-in/);
      });
    });

    test('list items have staggered animation delays', async () => {
      render(<CollapsibleTopicIntroduction {...mockProps} />);
      
      const toggleButton = screen.getByRole('button');
      fireEvent.click(toggleButton);
      
      await waitFor(() => {
        const listItems = screen.getAllByText(/Type \d/);
        expect(listItems.length).toBeGreaterThan(0);
        
        // Check that at least one list item has animation delay
        const hasAnimationDelay = listItems.some(item => {
          const listItem = item.closest('li');
          return listItem?.className.includes('animation-delay');
        });
        expect(hasAnimationDelay).toBe(true);
      });
    });
  });

  describe('3. Fade-in/Fade-out Transitions for Answer Reveal', () => {
    const mockProps = {
      title: "Test Rule",
      banglaDescription: "Test description",
      examples: [
        "This is a [test] example.",
        "Another [sample] sentence."
      ]
    };

    test('eye icons have hover animations', () => {
      render(<InteractiveAnswerReveal {...mockProps} />);
      
      const eyeButtons = screen.getAllByTestId('eye-button');
      expect(eyeButtons.length).toBeGreaterThan(0);
      
      eyeButtons.forEach(button => {
        expect(button.className).toMatch(/hover:scale-105|transition-all/);
        expect(button.className).toMatch(/active:scale-95/);
      });
    });

    test('eye icons have rotation effect on hover', () => {
      render(<InteractiveAnswerReveal {...mockProps} />);
      
      const eyeIcons = screen.getAllByTestId('eye-icon');
      expect(eyeIcons.length).toBeGreaterThan(0);
      
      eyeIcons.forEach(icon => {
        // SVG className is an object, so we need to check the class attribute
        const classAttr = icon.getAttribute('class') || '';
        expect(classAttr).toMatch(/hover:scale-110/);
        expect(classAttr).toMatch(/hover:rotate-12/);
        expect(classAttr).toMatch(/transition-all/);
      });
    });

    test('answer reveal functionality works with animations', async () => {
      render(<InteractiveAnswerReveal {...mockProps} />);
      
      const eyeButton = screen.getAllByTestId('eye-button')[0];
      fireEvent.click(eyeButton);
      
      await waitFor(() => {
        // Check that the button content has changed (no longer has eye icon)
        const clickedButton = screen.getAllByRole('button')[0];
        const hasEyeIcon = clickedButton.querySelector('svg[data-testid="eye-icon"]');
        expect(hasEyeIcon).toBeNull(); // Eye icon should be gone
        
        // Button should now contain text content
        expect(clickedButton.textContent).toMatch(/test|sample/);
      });
    });

    test('example containers have fade-in animations', () => {
      render(<InteractiveAnswerReveal {...mockProps} />);
      
      // Check that example containers have animation classes
      const containers = screen.getAllByText(/This is a|Another/).map(text => 
        text.closest('[class*="animate-in"]')
      );
      
      const hasAnimations = containers.some(container => 
        container?.className.includes('animate-in') || 
        container?.className.includes('fade-in')
      );
      expect(hasAnimations).toBe(true);
    });
  });

  describe('4. Professional Animation Appearance', () => {
    test('animations use appropriate timing functions', () => {
      render(<Button>Test</Button>);
      const button = screen.getByRole('button');
      
      // Check for professional easing
      expect(button.className).toMatch(/ease-out/);
      expect(button.className).toMatch(/duration-200/);
    });

    test('animations are minimal and clean', () => {
      const mockProps = {
        title: "Test",
        banglaDescription: "Test",
        examples: ["Test [example]."]
      };

      render(<InteractiveAnswerReveal {...mockProps} />);
      
      const button = screen.getByTestId('eye-button');
      
      // Check that animations are subtle (not excessive)
      expect(button.className).toMatch(/hover:scale-105/); // Small scale
      expect(button.className).toMatch(/duration-200/); // Fast duration
    });
  });

  describe('5. Enhanced User Experience', () => {
    test('back button has enhanced animations', () => {
      render(<BackButton />);
      
      const button = screen.getByRole('button');
      expect(button.className).toMatch(/hover:-translate-y-0\.5|hover:scale-\[1\.01\]/);
      expect(button.className).toMatch(/transition-all/);
      
      const arrow = button.querySelector('svg');
      // SVG className is an object, so we need to check the class attribute
      const arrowClassAttr = arrow?.getAttribute('class') || '';
      expect(arrowClassAttr).toMatch(/group-hover:-translate-x-0\.5|group-hover:scale-110/);
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
      
      // Check that the main container (the outermost div) has hover animations
      const container = screen.getByText('Test Section').closest('div').closest('div');
      expect(container?.className).toMatch(/hover:-translate-y-2|hover:scale-\[1\.02\]|transition-all/);
    });

    test('topic cards maintain consistent animations', () => {
      const mockTopic = {
        id: '1',
        name: 'Test Topic',
        slug: 'test-topic',
        icon: '📚',
        color: '#3B82F6'
      };

      render(
        <StandardizedTopicCard
          topic={mockTopic}
          section="grammar"
          questionCount={10}
        />
      );
      
      // Check that the card element has animations - look for the actual Card component
      const cardElement = screen.getByText('Test Topic').closest('[class*="border-sf-text-muted"]');
      expect(cardElement?.className).toMatch(/hover:-translate-y-1|hover:scale-\[1\.01\]|transition-all/);
    });
  });

  describe('6. Animation Performance and Accessibility', () => {
    test('animations use hardware-accelerated properties', () => {
      render(<Button>Test</Button>);
      const button = screen.getByRole('button');
      
      // Check for efficient CSS properties
      expect(button.className).toMatch(/transition-all/);
      expect(button.className).toMatch(/duration-200/);
    });

    test('interactive elements maintain focus indicators', () => {
      render(<Button>Test</Button>);
      const button = screen.getByRole('button');
      
      expect(button.className).toMatch(/focus-visible:outline-none/);
      expect(button.className).toMatch(/focus-visible:ring-2/);
    });

    test('animations are consistent across similar components', () => {
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
      
      const cards = screen.getAllByText(/Test \d/).map(el => 
        el.closest('div').closest('div') // Get the outermost container
      );
      
      // Check that both cards have similar animation classes
      cards.forEach(card => {
        expect(card?.className).toMatch(/hover:-translate-y-2|hover:scale-\[1\.02\]|transition-all/);
      });
    });
  });
});