import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import UniversalQuestionsUI from '@/components/universal/UniversalQuestionsUI';
import UniversalGrammarUI from '@/components/universal/UniversalGrammarUI';
import { Question } from '@/types/question.types';
import { GrammarRule } from '@/types/grammar.types';

// Mock data for testing
const mockQuestions: Question[] = [
  {
    id: 'test-1',
    question: 'Test question 1',
    answer: 'Test answer 1',
    difficulty: 'EASY',
    level: 'HSC',
    board: 'Dhaka',
    year: 2024
  },
  {
    id: 'test-2',
    question: 'Test question 2',
    answer: 'Test answer 2',
    difficulty: 'MEDIUM',
    level: 'HSC',
    board: 'Chattogram',
    year: 2023
  }
];

const mockGrammarRules: GrammarRule[] = [
  {
    id: 1,
    ruleNo: 'Rule 1',
    title: 'Test Grammar Rule 1',
    description: 'Test description 1',
    structures: ['Structure 1', 'Structure 2'],
    examples: ['Example 1', 'Example 2'],
    level: 'HSC',
    topic: 'transformation'
  },
  {
    id: 2,
    ruleNo: 'Rule 2',
    title: 'Test Grammar Rule 2',
    description: 'Test description 2',
    structures: ['Structure 3', 'Structure 4'],
    examples: ['Example 3', 'Example 4'],
    level: 'HSC',
    topic: 'transformation'
  }
];

describe('Card Icon Functionality Validation', () => {
  describe('UniversalQuestionsUI View Mode Toggle', () => {
    it('renders list/grid toggle buttons with consistent styling', () => {
      render(
        <UniversalQuestionsUI
          topic="Test Questions"
          topicSlug="transformation"
          questions={mockQuestions}
          level="HSC"
        />
      );

      const listButton = screen.getByLabelText('List view');
      const gridButton = screen.getByLabelText('Grid view');

      expect(listButton).toBeInTheDocument();
      expect(gridButton).toBeInTheDocument();

      // Check theme-consistent styling
      expect(listButton).toHaveClass('bg-sf-button'); // Active by default
      expect(gridButton).toHaveClass('text-sf-text-subtle'); // Inactive
    });

    it('switches view modes correctly', () => {
      render(
        <UniversalQuestionsUI
          topic="Test Questions"
          topicSlug="transformation"
          questions={mockQuestions}
          level="HSC"
        />
      );

      const listButton = screen.getByLabelText('List view');
      const gridButton = screen.getByLabelText('Grid view');

      // Initially list view should be active
      expect(listButton).toHaveClass('bg-sf-button');
      expect(gridButton).toHaveClass('text-sf-text-subtle');

      // Click grid button
      fireEvent.click(gridButton);

      // Grid view should now be active
      expect(gridButton).toHaveClass('bg-sf-button');
      expect(listButton).toHaveClass('text-sf-text-subtle');

      // Click list button
      fireEvent.click(listButton);

      // List view should be active again
      expect(listButton).toHaveClass('bg-sf-button');
      expect(gridButton).toHaveClass('text-sf-text-subtle');
    });

    it('maintains accessibility attributes', () => {
      render(
        <UniversalQuestionsUI
          topic="Test Questions"
          topicSlug="transformation"
          questions={mockQuestions}
          level="HSC"
        />
      );

      const listButton = screen.getByLabelText('List view');
      const gridButton = screen.getByLabelText('Grid view');

      expect(listButton).toHaveAttribute('aria-pressed', 'true');
      expect(gridButton).toHaveAttribute('aria-pressed', 'false');
    });
  });

  describe('UniversalGrammarUI View Mode Toggle', () => {
    it('renders list/grid toggle buttons with consistent styling', () => {
      render(
        <UniversalGrammarUI
          topic="Test Grammar"
          topicSlug="transformation"
          rules={mockGrammarRules}
          level="HSC"
        />
      );

      const listButton = screen.getByLabelText('List view');
      const gridButton = screen.getByLabelText('Grid view');

      expect(listButton).toBeInTheDocument();
      expect(gridButton).toBeInTheDocument();

      // Check theme-consistent styling
      expect(listButton).toHaveClass('bg-sf-button'); // Active by default
      expect(gridButton).toHaveClass('text-sf-text-subtle'); // Inactive
    });

    it('switches view modes correctly', () => {
      render(
        <UniversalGrammarUI
          topic="Test Grammar"
          topicSlug="transformation"
          rules={mockGrammarRules}
          level="HSC"
        />
      );

      const listButton = screen.getByLabelText('List view');
      const gridButton = screen.getByLabelText('Grid view');

      // Initially list view should be active
      expect(listButton).toHaveClass('bg-sf-button');
      expect(gridButton).toHaveClass('text-sf-text-subtle');

      // Click grid button
      fireEvent.click(gridButton);

      // Grid view should now be active
      expect(gridButton).toHaveClass('bg-sf-button');
      expect(listButton).toHaveClass('text-sf-text-subtle');
    });

    it('maintains accessibility attributes', () => {
      render(
        <UniversalGrammarUI
          topic="Test Grammar"
          topicSlug="transformation"
          rules={mockGrammarRules}
          level="HSC"
        />
      );

      const listButton = screen.getByLabelText('List view');
      const gridButton = screen.getByLabelText('Grid view');

      expect(listButton).toHaveAttribute('aria-pressed', 'true');
      expect(gridButton).toHaveAttribute('aria-pressed', 'false');
    });
  });

  describe('Theme Consistency', () => {
    it('uses consistent sf-button colors across components', () => {
      const { rerender } = render(
        <UniversalQuestionsUI
          topic="Test Questions"
          topicSlug="transformation"
          questions={mockQuestions}
          level="HSC"
        />
      );

      const questionsListButton = screen.getByLabelText('List view');
      expect(questionsListButton).toHaveClass('bg-sf-button');

      rerender(
        <UniversalGrammarUI
          topic="Test Grammar"
          topicSlug="transformation"
          rules={mockGrammarRules}
          level="HSC"
        />
      );

      const grammarListButton = screen.getByLabelText('List view');
      expect(grammarListButton).toHaveClass('bg-sf-button');
    });

    it('applies consistent hover effects', () => {
      render(
        <UniversalQuestionsUI
          topic="Test Questions"
          topicSlug="transformation"
          questions={mockQuestions}
          level="HSC"
        />
      );

      const gridButton = screen.getByLabelText('Grid view');
      expect(gridButton).toHaveClass('hover:bg-sf-button/10');
      expect(gridButton).toHaveClass('hover:text-sf-button');
    });
  });

  describe('Interactive Elements', () => {
    it('provides visual feedback on interaction', () => {
      render(
        <UniversalQuestionsUI
          topic="Test Questions"
          topicSlug="transformation"
          questions={mockQuestions}
          level="HSC"
        />
      );

      const gridButton = screen.getByLabelText('Grid view');
      
      // Button should have transition classes for smooth interactions
      expect(gridButton).toHaveClass('transition-all');
      expect(gridButton).toHaveClass('duration-200');
    });

    it('maintains focus management', () => {
      render(
        <UniversalQuestionsUI
          topic="Test Questions"
          topicSlug="transformation"
          questions={mockQuestions}
          level="HSC"
        />
      );

      const listButton = screen.getByLabelText('List view');
      const gridButton = screen.getByLabelText('Grid view');

      listButton.focus();
      expect(listButton).toHaveFocus();

      gridButton.focus();
      expect(gridButton).toHaveFocus();
    });
  });
});