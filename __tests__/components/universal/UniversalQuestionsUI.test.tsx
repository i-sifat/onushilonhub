import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import UniversalQuestionsUI from '@/components/universal/UniversalQuestionsUI';
import { Question } from '@/types/question.types';

// Mock data
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

describe('UniversalQuestionsUI Filter Configuration', () => {
  it('should hide question type filter for transformation topic', () => {
    render(
      <UniversalQuestionsUI
        topic="Transformation"
        topicSlug="transformation"
        questions={mockQuestions}
        level="HSC"
      />
    );

    // Check that the question type filter is not present
    const questionTypeSelect = screen.queryByDisplayValue('All Types');
    expect(questionTypeSelect).not.toBeInTheDocument();

    // Check that other filters are still present
    expect(screen.getByDisplayValue('All Boards')).toBeInTheDocument();
    expect(screen.getByDisplayValue('All Years')).toBeInTheDocument();
    expect(screen.getByDisplayValue('All Difficulties')).toBeInTheDocument();
  });

  it('should hide question type filter for connectors topic', () => {
    render(
      <UniversalQuestionsUI
        topic="Connectors"
        topicSlug="connectors"
        questions={mockQuestions}
        level="HSC"
      />
    );

    // Check that the question type filter is not present
    const questionTypeSelect = screen.queryByDisplayValue('All Types');
    expect(questionTypeSelect).not.toBeInTheDocument();
  });

  it('should hide question type filter for modifier topic', () => {
    render(
      <UniversalQuestionsUI
        topic="Modifier"
        topicSlug="modifier"
        questions={mockQuestions}
        level="HSC"
      />
    );

    // Check that the question type filter is not present
    const questionTypeSelect = screen.queryByDisplayValue('All Types');
    expect(questionTypeSelect).not.toBeInTheDocument();
  });

  it('should hide question type filter for narration topic', () => {
    render(
      <UniversalQuestionsUI
        topic="Narration"
        topicSlug="narration"
        questions={mockQuestions}
        level="HSC"
      />
    );

    // Check that the question type filter is not present
    const questionTypeSelect = screen.queryByDisplayValue('All Types');
    expect(questionTypeSelect).not.toBeInTheDocument();
  });

  it('should hide question type filter for completing-sentence topic', () => {
    render(
      <UniversalQuestionsUI
        topic="Completing Sentence"
        topicSlug="completing-sentence"
        questions={mockQuestions}
        level="HSC"
      />
    );

    // Check that the question type filter is not present
    const questionTypeSelect = screen.queryByDisplayValue('All Types');
    expect(questionTypeSelect).not.toBeInTheDocument();
  });

  it('should hide question type filter for use-of-verbs topic', () => {
    render(
      <UniversalQuestionsUI
        topic="Use of Verbs"
        topicSlug="use-of-verbs"
        questions={mockQuestions}
        level="HSC"
      />
    );

    // Check that the question type filter is not present
    const questionTypeSelect = screen.queryByDisplayValue('All Types');
    expect(questionTypeSelect).not.toBeInTheDocument();
  });

  it('should show question type filter for other topics like preposition', () => {
    render(
      <UniversalQuestionsUI
        topic="Preposition"
        topicSlug="preposition"
        questions={mockQuestions}
        level="HSC"
      />
    );

    // Check that the question type filter is present for non-specific topics
    expect(screen.getByDisplayValue('All Types')).toBeInTheDocument();
    expect(screen.getByDisplayValue('All Boards')).toBeInTheDocument();
    expect(screen.getByDisplayValue('All Years')).toBeInTheDocument();
    expect(screen.getByDisplayValue('All Difficulties')).toBeInTheDocument();
  });

  it('should adjust grid layout when question type filter is hidden', () => {
    const { container } = render(
      <UniversalQuestionsUI
        topic="Transformation"
        topicSlug="transformation"
        questions={mockQuestions}
        level="HSC"
      />
    );

    // Check that the grid has 4 columns instead of 5 when question type filter is hidden
    const filterGrid = container.querySelector('.grid-cols-4');
    expect(filterGrid).toBeInTheDocument();
    
    const fiveColumnGrid = container.querySelector('.grid-cols-5');
    expect(fiveColumnGrid).not.toBeInTheDocument();
  });

  it('should use 5-column grid layout when question type filter is shown', () => {
    const { container } = render(
      <UniversalQuestionsUI
        topic="Preposition"
        topicSlug="preposition"
        questions={mockQuestions}
        level="HSC"
      />
    );

    // Check that the grid has 5 columns when question type filter is shown
    const filterGrid = container.querySelector('.grid-cols-5');
    expect(filterGrid).toBeInTheDocument();
  });
});