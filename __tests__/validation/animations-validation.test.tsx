import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { StandardizedTopicCard } from '@/components/ui/standardized-topic-card';
import { ViewModeToggle } from '@/components/ui/view-mode-toggle';
import SearchInput from '@/components/common/SearchInput';
import LevelSelectionCard from '@/components/common/LevelSelectionCard';
import { animations } from '@/lib/utils/animations';

// Mock Next.js navigation
jest.mock('next/navigation', () => ({
  usePathname: jest.fn(() => '/test'),
}));

describe('Animation System Validation', () => {
  describe('Animation Utilities', () => {
    it('provides consistent animation base classes', () => {
      expect(animations.base.transition).toBe('transition-all duration-200 ease-out');
      expect(animations.base.transitionSlow).toBe('transition-all duration-300 ease-out');
      expect(animations.base.transitionFast).toBe('transition-all duration-150 ease-out');
    });

    it('provides button animation presets', () => {
      expect(animations.button.subtle).toContain('transition-all');
      expect(animations.button.subtle).toContain('hover:-translate-y-0.5');
      expect(animations.button.subtle).toContain('hover:scale-[1.02]');
      expect(animations.button.subtle).toContain('active:scale-[0.98]');
    });

    it('provides card animation presets', () => {
      expect(animations.card.subtle).toContain('transition-all');
      expect(animations.card.subtle).toContain('hover:-translate-y-1');
      expect(animations.card.subtle).toContain('hover:scale-[1.01]');
      expect(animations.card.subtle).toContain('hover:shadow-lg');
    });

    it('provides icon animation utilities', () => {
      expect(animations.icon.subtle).toContain('transition-all');
      expect(animations.icon.subtle).toContain('hover:scale-110');
      expect(animations.icon.arrow).toContain('group-hover:translate-x-1');
    });
  });

  describe('Button Animations', () => {
    it('applies hover animations to default buttons', () => {
      render(<Button>Test Button</Button>);
      const button = screen.getByRole('button');
      
      expect(button).toHaveClass('transition-all');
      expect(button).toHaveClass('hover:-translate-y-0.5');
      expect(button).toHaveClass('active:scale-[0.98]');
    });

    it('applies different animations for different variants', () => {
      const { rerender } = render(<Button variant="outline">Outline</Button>);
      let button = screen.getByRole('button');
      expect(button).toHaveClass('hover:-translate-y-0.5');

      rerender(<Button variant="ghost">Ghost</Button>);
      button = screen.getByRole('button');
      expect(button).toHaveClass('hover:scale-[1.02]');
    });
  });

  describe('Card Animations', () => {
    it('applies base transition to all cards', () => {
      render(<Card data-testid="test-card">Test Card</Card>);
      const card = screen.getByTestId('test-card');
      
      expect(card).toHaveClass('transition-all');
      expect(card).toHaveClass('duration-300');
      expect(card).toHaveClass('ease-out');
    });
  });

  describe('StandardizedTopicCard Animations', () => {
    const mockTopic = {
      id: 'test-topic',
      name: 'Test Topic',
      slug: 'test-topic',
      icon: '📚',
      color: '#3B82F6'
    };

    it('applies animation preset for topic cards', () => {
      render(
        <StandardizedTopicCard
          topic={mockTopic}
          section="combined"
          showHoverEffects={true}
        />
      );

      const link = screen.getByRole('link');
      const card = link.firstChild as HTMLElement;
      
      expect(card).toHaveClass('transition-all');
      expect(card).toHaveClass('duration-300');
      expect(card).toHaveClass('ease-out');
      expect(card).toHaveClass('hover:-translate-y-1');
      expect(card).toHaveClass('hover:scale-[1.01]');
      expect(card).toHaveClass('hover:shadow-lg');
      expect(card).toHaveClass('hover:border-sf-button/50');
    });

    it('disables hover effects when showHoverEffects is false', () => {
      render(
        <StandardizedTopicCard
          topic={mockTopic}
          section="combined"
          showHoverEffects={false}
        />
      );

      const link = screen.getByRole('link');
      const card = link.firstChild as HTMLElement;
      
      expect(card).toHaveClass('hover:transform-none');
      expect(card).toHaveClass('hover:shadow-none');
    });
  });

  describe('ViewModeToggle Animations', () => {
    it('applies button animations to toggle buttons', () => {
      const mockOnChange = jest.fn();
      render(
        <ViewModeToggle 
          viewMode="list" 
          onViewModeChange={mockOnChange}
        />
      );

      const buttons = screen.getAllByRole('button');
      buttons.forEach(button => {
        expect(button).toHaveClass('transition-all');
        expect(button).toHaveClass('duration-200');
      });
    });
  });

  describe('SearchInput Animations', () => {
    it('applies input animations to search field', () => {
      const mockOnChange = jest.fn();
      render(
        <SearchInput 
          value="" 
          onChange={mockOnChange}
          placeholder="Search..."
        />
      );

      const input = screen.getByPlaceholderText('Search...');
      expect(input).toHaveClass('transition-all');
      expect(input).toHaveClass('duration-200');
      expect(input).toHaveClass('ease-out');
    });
  });

  describe('LevelSelectionCard Animations', () => {
    const mockLevel = {
      id: 'hsc' as const,
      name: 'HSC Level',
      description: 'Test description',
      features: ['Feature 1', 'Feature 2'],
      stats: { topics: '9', rules: '112' },
      available: true
    };

    it('applies card animations to level selection', () => {
      render(
        <LevelSelectionCard 
          level={mockLevel}
          basePath="/test"
        />
      );

      // Find the main card container (should be the outermost div)
      const cardContainer = screen.getByText('HSC Level').closest('div[class*="transition-all"]');
      expect(cardContainer).toHaveClass('transition-all');
      expect(cardContainer).toHaveClass('duration-300');
      expect(cardContainer).toHaveClass('ease-out');
      expect(cardContainer).toHaveClass('hover:-translate-y-2');
      expect(cardContainer).toHaveClass('hover:scale-[1.02]');
    });

    it('applies button animations to action button', () => {
      render(
        <LevelSelectionCard 
          level={mockLevel}
          basePath="/test"
        />
      );

      const actionButton = screen.getByRole('link', { name: /Start HSC Learning/ });
      expect(actionButton).toHaveClass('transition-all');
      expect(actionButton).toHaveClass('duration-200');
      expect(actionButton).toHaveClass('ease-out');
      expect(actionButton).toHaveClass('hover:-translate-y-0.5');
      expect(actionButton).toHaveClass('hover:scale-[1.02]');
    });
  });

  describe('Animation Performance', () => {
    it('uses hardware-accelerated properties', () => {
      // Test that animations use transform properties (hardware accelerated)
      expect(animations.card.hoverLift).toBe('hover:-translate-y-1');
      expect(animations.card.hoverScale).toBe('hover:scale-[1.01]');
      expect(animations.button.hoverLift).toBe('hover:-translate-y-0.5 hover:shadow-md');
    });

    it('uses consistent timing functions', () => {
      expect(animations.base.easeOut).toBe('ease-out');
      expect(animations.base.transition).toContain('ease-out');
      expect(animations.base.transitionSlow).toContain('ease-out');
    });

    it('uses appropriate durations', () => {
      expect(animations.base.fast).toBe('duration-150');
      expect(animations.base.normal).toBe('duration-200');
      expect(animations.base.slow).toBe('duration-300');
    });
  });

  describe('Theme Consistency', () => {
    it('uses theme colors in animations', () => {
      expect(animations.card.hoverGlow).toBe('hover:shadow-lg hover:shadow-sf-button/10');
      expect(animations.card.hoverBorder).toBe('hover:border-sf-button/50');
    });

    it('maintains accessibility with proper contrast', () => {
      // Animation utilities should not interfere with color contrast
      expect(animations.card.subtle).not.toContain('text-');
      expect(animations.button.subtle).not.toContain('bg-');
    });
  });

  describe('Animation Presets', () => {
    it('provides complete preset combinations', () => {
      expect(animations.presets.topicCard).toContain('transition-all');
      expect(animations.presets.topicCard).toContain('duration-300');
      expect(animations.presets.topicCard).toContain('hover:-translate-y-1');
      expect(animations.presets.topicCard).toContain('hover:scale-[1.01]');
      expect(animations.presets.topicCard).toContain('cursor-pointer');
    });

    it('provides different presets for different components', () => {
      expect(animations.presets.questionCard).toBeDefined();
      expect(animations.presets.levelCard).toBeDefined();
      expect(animations.presets.primaryButton).toBeDefined();
      expect(animations.presets.searchInput).toBeDefined();
    });
  });

  describe('Conditional Animations', () => {
    it('provides conditional animation utility', () => {
      const result = animations.conditional(true, 'hover:scale-110', 'hover:scale-100');
      expect(result).toBe('hover:scale-110');

      const result2 = animations.conditional(false, 'hover:scale-110', 'hover:scale-100');
      expect(result2).toBe('hover:scale-100');
    });

    it('handles missing false condition', () => {
      const result = animations.conditional(false, 'hover:scale-110');
      expect(result).toBe('');
    });
  });

  describe('Stagger Animations', () => {
    it('provides stagger delay utility', () => {
      const delay1 = animations.staggerDelay(0, 100);
      expect(delay1).toBe('[animation-delay:0ms]');

      const delay2 = animations.staggerDelay(2, 150);
      expect(delay2).toBe('[animation-delay:300ms]');
    });

    it('provides predefined stagger items', () => {
      expect(animations.stagger.item1).toBe('[animation-delay:0ms]');
      expect(animations.stagger.item2).toBe('[animation-delay:100ms]');
      expect(animations.stagger.item3).toBe('[animation-delay:200ms]');
    });
  });
});