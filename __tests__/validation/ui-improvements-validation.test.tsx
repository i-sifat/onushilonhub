import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { useRouter, usePathname } from 'next/navigation';

// Mock Next.js hooks
jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
  usePathname: jest.fn(),
}));

// Import components to test
import UniversalTopicNavigation from '@/components/universal/UniversalTopicNavigation';
import UniversalQuestionsUI from '@/components/universal/UniversalQuestionsUI';
import UniversalGrammarUI from '@/components/universal/UniversalGrammarUI';
import BackButton from '@/components/common/BackButton';

// Mock data
const mockQuestions = [
  {
    id: 'test-1',
    question: 'Test question 1',
    answer: 'Test answer 1',
    difficulty: 'EASY' as const,
    level: 'HSC' as const,
    board: 'Dhaka',
    year: 2024
  }
];

const mockGrammarRules = [
  {
    id: 1,
    ruleNo: 'Rule 1',
    title: 'Test Grammar Rule 1',
    description: 'Test description 1',
    structures: ['Structure 1', 'Structure 2'],
    examples: ['Example 1', 'Example 2'],
    level: 'HSC' as const,
    topic: 'transformation' as const
  }
];

describe('UI Improvements Validation', () => {
  const mockPush = jest.fn();
  const mockBack = jest.fn();

  beforeEach(() => {
    (useRouter as jest.Mock).mockReturnValue({
      push: mockPush,
      back: mockBack,
    });
    (usePathname as jest.Mock).mockReturnValue('/test-path');
    
    // Mock window.history
    Object.defineProperty(window, 'history', {
      value: { length: 2 },
      writable: true
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('1. Full-width layout validation', () => {
    test('UniversalTopicNavigation uses full-width layout', () => {
      render(
        <UniversalTopicNavigation 
          level="HSC" 
          section="board-questions"
        />
      );
      
      // Check that the main container doesn't have restrictive max-width classes
      const container = document.querySelector('[class*="space-y-8"]');
      expect(container).toBeTruthy();
      expect(container).not.toHaveClass('max-w-7xl');
      expect(container).not.toHaveClass('mx-auto');
    });

    test('UniversalQuestionsUI uses full-width layout', () => {
      render(
        <UniversalQuestionsUI
          topic="Test Questions"
          topicSlug="transformation"
          questions={mockQuestions}
          level="HSC"
        />
      );
      
      // Check that the main container uses full width
      const container = document.querySelector('[class*="space-y-6"]');
      expect(container).not.toHaveClass('max-w-7xl');
      expect(container).not.toHaveClass('mx-auto');
    });

    test('UniversalGrammarUI uses full-width layout', () => {
      render(
        <UniversalGrammarUI
          topic="Test Grammar"
          topicSlug="transformation"
          rules={mockGrammarRules}
          level="HSC"
        />
      );
      
      // Check that the main container uses full width
      const container = document.querySelector('[class*="space-y-6"]');
      expect(container).not.toHaveClass('max-w-7xl');
      expect(container).not.toHaveClass('mx-auto');
    });
  });

  describe('2. Back button positioning validation', () => {
    test('BackButton has consistent top-left positioning', () => {
      render(<BackButton />);
      
      const backButton = screen.getByRole('button', { name: /go back/i });
      expect(backButton).toHaveClass('fixed');
      expect(backButton).toHaveClass('top-4');
      expect(backButton).toHaveClass('left-4');
      expect(backButton).toHaveClass('z-50');
    });

    test('BackButton functionality works correctly', () => {
      render(<BackButton />);
      
      const backButton = screen.getByRole('button', { name: /go back/i });
      fireEvent.click(backButton);
      
      expect(mockBack).toHaveBeenCalledTimes(1);
    });
  });

  describe('3. Header section prominence validation', () => {
    test('UniversalTopicNavigation displays header section prominently', () => {
      render(
        <UniversalTopicNavigation 
          level="HSC" 
          section="board-questions"
          showStats={true}
        />
      );
      
      // Check for prominent header
      expect(screen.getByText('HSC Board Questions & Practice')).toBeInTheDocument();
      expect(screen.getByText('Practice with real board questions from previous years and mock tests')).toBeInTheDocument();
      
      // Check for statistics display
      expect(screen.getByText('9')).toBeInTheDocument();
      expect(screen.getByText('Topics')).toBeInTheDocument();
      expect(screen.getByText('112')).toBeInTheDocument();
      expect(screen.getByText('Rules')).toBeInTheDocument();
      expect(screen.getByText('74')).toBeInTheDocument();
      expect(screen.getByText('Questions')).toBeInTheDocument();
    });

    test('Grammar section hides questions card correctly', () => {
      render(
        <UniversalTopicNavigation 
          level="HSC" 
          section="grammar-items"
          showStats={true}
        />
      );
      
      // Should show Topics and Rules but not Questions
      expect(screen.getByText('9')).toBeInTheDocument();
      expect(screen.getByText('Topics')).toBeInTheDocument();
      expect(screen.getByText('112')).toBeInTheDocument();
      expect(screen.getByText('Rules')).toBeInTheDocument();
      
      // Questions card should not be present in grammar-items section
      const questionsCards = screen.queryAllByText('Questions');
      expect(questionsCards).toHaveLength(0);
    });
  });

  describe('4. Simplified topic cards validation', () => {
    test('Topic cards show only essential information', () => {
      render(
        <UniversalTopicNavigation 
          level="HSC" 
          section="board-questions"
        />
      );
      
      // Should not contain difficulty indicators, descriptions, rule counts, or tags
      expect(screen.queryByText('MEDIUM')).not.toBeInTheDocument();
      expect(screen.queryByText('45m')).not.toBeInTheDocument();
      expect(screen.queryByText('sentence-completion')).not.toBeInTheDocument();
      expect(screen.queryByText('grammar-rules')).not.toBeInTheDocument();
      expect(screen.queryByText('conditional')).not.toBeInTheDocument();
      
      // Should show question count in correct format
      const questionCounts = screen.queryAllByText(/\d+ Questions/);
      expect(questionCounts.length).toBeGreaterThan(0);
    });
  });

  describe('5. Contextual filters validation', () => {
    test('Topic-specific pages hide "All Types" filter', () => {
      render(
        <UniversalQuestionsUI
          topic="Transformation"
          topicSlug="transformation"
          questions={mockQuestions}
          level="HSC"
        />
      );
      
      // Should not show question type filter for transformation
      expect(screen.queryByDisplayValue('All Types')).not.toBeInTheDocument();
      
      // Should show other filters
      expect(screen.getByDisplayValue('All Boards')).toBeInTheDocument();
      expect(screen.getByDisplayValue('All Years')).toBeInTheDocument();
      expect(screen.getByDisplayValue('All Difficulties')).toBeInTheDocument();
    });

    test('General pages show all filters including question types', () => {
      render(
        <UniversalQuestionsUI
          topic="General Questions"
          topicSlug="general"
          questions={mockQuestions}
          level="HSC"
        />
      );
      
      // Should show all filters including question type
      expect(screen.getByDisplayValue('All Types')).toBeInTheDocument();
      expect(screen.getByDisplayValue('All Boards')).toBeInTheDocument();
      expect(screen.getByDisplayValue('All Years')).toBeInTheDocument();
      expect(screen.getByDisplayValue('All Difficulties')).toBeInTheDocument();
    });
  });

  describe('6. Grammar rules simplification validation', () => {
    test('Grammar rules do not show complexity badges', () => {
      render(
        <UniversalGrammarUI
          topic="Test Grammar"
          topicSlug="transformation"
          rules={mockGrammarRules}
          level="HSC"
        />
      );
      
      // Should not show complexity badges
      expect(screen.queryByText('Complex')).not.toBeInTheDocument();
      expect(screen.queryByText('Simple')).not.toBeInTheDocument();
      expect(screen.queryByText('Moderate')).not.toBeInTheDocument();
      
      // Should not show difficulty indicators
      expect(screen.queryByText('MEDIUM')).not.toBeInTheDocument();
      expect(screen.queryByText('45m')).not.toBeInTheDocument();
    });
  });

  describe('7. Theme-consistent button styling validation', () => {
    test('List/Grid toggle buttons use theme colors', () => {
      render(
        <UniversalQuestionsUI
          topic="Test Questions"
          topicSlug="transformation"
          questions={mockQuestions}
          level="HSC"
        />
      );
      
      // Find the view mode toggle buttons
      const listButton = document.querySelector('[class*="bg-sf-button"]');
      const gridButton = document.querySelector('[class*="hover:bg-sf-button"]');
      
      // At least one should have theme colors applied
      expect(listButton || gridButton).toBeTruthy();
    });

    test('Filter buttons use consistent theme styling', () => {
      render(
        <UniversalTopicNavigation 
          level="HSC" 
          section="board-questions"
          showFilters={true}
        />
      );
      
      // Check for theme-consistent filter button
      const filterButton = screen.getByText('Filters');
      expect(filterButton.closest('button')).toHaveClass('hover:bg-sf-button/10');
      expect(filterButton.closest('button')).toHaveClass('hover:border-sf-button/50');
      expect(filterButton.closest('button')).toHaveClass('hover:text-sf-button');
    });
  });

  describe('8. Responsive layout validation', () => {
    test('Components maintain responsive behavior', () => {
      // Test mobile viewport
      Object.defineProperty(window, 'innerWidth', {
        writable: true,
        configurable: true,
        value: 375,
      });

      render(
        <UniversalTopicNavigation 
          level="HSC" 
          section="board-questions"
          showStats={true}
        />
      );
      
      // Should still display content properly on mobile
      expect(screen.getByText('HSC Board Questions & Practice')).toBeInTheDocument();
      expect(screen.getByText('9')).toBeInTheDocument();
      expect(screen.getByText('Topics')).toBeInTheDocument();
    });
  });

  describe('9. Accessibility validation', () => {
    test('Back button maintains accessibility', () => {
      render(<BackButton />);
      
      const backButton = screen.getByRole('button', { name: /go back/i });
      expect(backButton).toHaveAttribute('aria-label', 'Go back to previous page');
    });

    test('Filter controls are accessible', () => {
      render(
        <UniversalQuestionsUI
          topic="Test Questions"
          topicSlug="transformation"
          questions={mockQuestions}
          level="HSC"
        />
      );
      
      // Check that filter inputs are accessible
      const searchInput = screen.getByPlaceholderText('Search questions...');
      expect(searchInput).toBeInTheDocument();
      expect(searchInput).toHaveAttribute('type', 'text');
    });
  });

  describe('10. Grammar Rules page size validation', () => {
    test('Grammar Rules & Concepts card is appropriately sized', () => {
      render(
        <UniversalTopicNavigation 
          level="HSC" 
          section="grammar-items"
          showStats={true}
        />
      );
      
      // Check that the grammar section doesn't show the large questions card
      expect(screen.queryByText('74 Questions in HSC Grammar Rules & Concepts')).not.toBeInTheDocument();
      
      // Should show compact statistics
      expect(screen.getByText('9')).toBeInTheDocument();
      expect(screen.getByText('Topics')).toBeInTheDocument();
      expect(screen.getByText('112')).toBeInTheDocument();
      expect(screen.getByText('Rules')).toBeInTheDocument();
      
      // Questions card should not be present
      const questionsCards = screen.queryAllByText('Questions');
      expect(questionsCards).toHaveLength(0);
    });
  });

  describe('11. All grammar rules pages validation', () => {
    const grammarTopics = [
      'completing-sentence',
      'connectors', 
      'modifier',
      'narration',
      'transformation',
      'use-of-verbs',
      'preposition',
      'punctuation',
      'synonym-antonym'
    ];

    grammarTopics.forEach(topic => {
      test(`${topic} grammar page uses full-width layout`, () => {
        render(
          <UniversalGrammarUI
            topic={topic.replace('-', ' ')}
            topicSlug={topic as any}
            rules={mockGrammarRules}
            level="HSC"
          />
        );
        
        // Check that the main container uses full width
        const container = document.querySelector('[class*="space-y-6"]');
        expect(container).not.toHaveClass('max-w-7xl');
        expect(container).not.toHaveClass('mx-auto');
      });
    });
  });

  describe('12. Learning sections removal validation', () => {
    test('Learning sections navigation should not be present', () => {
      render(
        <UniversalTopicNavigation 
          level="HSC" 
          section="board-questions"
        />
      );
      
      // These learning section labels should not appear
      expect(screen.queryByText('Learning Sections')).not.toBeInTheDocument();
      expect(screen.queryByText('Get Started')).not.toBeInTheDocument();
      expect(screen.queryByText('Grammar Items')).not.toBeInTheDocument();
      expect(screen.queryByText('Board Questions')).not.toBeInTheDocument();
    });
  });

  describe('13. Performance validation', () => {
    test('Components render without performance issues', async () => {
      const startTime = performance.now();
      
      render(
        <UniversalTopicNavigation 
          level="HSC" 
          section="board-questions"
          showStats={true}
          showFilters={true}
        />
      );
      
      const endTime = performance.now();
      const renderTime = endTime - startTime;
      
      // Should render within reasonable time (less than 100ms)
      expect(renderTime).toBeLessThan(100);
    });
  });
});