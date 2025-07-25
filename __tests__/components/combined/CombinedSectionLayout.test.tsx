import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import CombinedSectionLayout from '@/components/combined/CombinedSectionLayout';
import { ModifierRule } from '@/data/grammar-rules/modifier';
import { ModifierQuestion } from '@/data/questions/modifier';

// Mock data
const mockRules: ModifierRule[] = [
  {
    id: 1,
    ruleNo: "Rule 1",
    title: "Use adjective to pre-modify the noun",
    banglaDescription: "Adjective noun-এর গুণ বা বৈশিষ্ট্য বর্ণনা করে।",
    examples: ["Cricket is an [international] game."],
    topic: 'modifier',
    level: 'HSC'
  },
  {
    id: 2,
    ruleNo: "Rule 2", 
    title: "Use Determiner to pre-modify the noun",
    banglaDescription: "Determiner noun-এর পরিমাণ বা নির্দিষ্টতা নির্দেশ করে।",
    examples: ["[Each] team consists of eleven players."],
    topic: 'modifier',
    level: 'HSC'
  }
];

const mockQuestions: ModifierQuestion[] = [
  {
    id: "q1",
    topic: 'modifier',
    level: 'HSC',
    question: "Cricket is an (a) --- (pre-modify the noun) game.",
    answer: "(a) international",
    board: 'Dhaka',
    year: 2023,
    ruleId: 1
  },
  {
    id: "q2", 
    topic: 'modifier',
    level: 'HSC',
    question: "(b) --- (use determiner to pre-modify the noun) team consists of eleven players.",
    answer: "(b) Each",
    board: 'Rajshahi',
    year: 2023,
    ruleId: 2
  }
];

describe('CombinedSectionLayout', () => {
  const defaultProps = {
    topic: 'Modifier',
    level: 'HSC' as const,
    rules: mockRules,
    questions: mockQuestions
  };

  beforeEach(() => {
    // Mock window.matchMedia for responsive tests
    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      value: jest.fn().mockImplementation(query => ({
        matches: false,
        media: query,
        onchange: null,
        addListener: jest.fn(),
        removeListener: jest.fn(),
        addEventListener: jest.fn(),
        removeEventListener: jest.fn(),
        dispatchEvent: jest.fn(),
      })),
    });
  });

  it('renders the component with rules and questions panels', () => {
    render(<CombinedSectionLayout {...defaultProps} />);
    
    // Check if rules panel is rendered
    expect(screen.getByText('Grammar Rules')).toBeInTheDocument();
    expect(screen.getByText('Select a rule to see related questions')).toBeInTheDocument();
    
    // Check if rules are displayed
    expect(screen.getByText('Use adjective to pre-modify the noun')).toBeInTheDocument();
    expect(screen.getByText('Use Determiner to pre-modify the noun')).toBeInTheDocument();
    
    // Check if default state message is shown in questions panel
    expect(screen.getByText('Select a Grammar Rule')).toBeInTheDocument();
  });

  it('displays question counts for each rule', () => {
    render(<CombinedSectionLayout {...defaultProps} />);
    
    // Each rule should have a question count badge
    const badges = screen.getAllByText('1'); // Each rule has 1 question
    expect(badges).toHaveLength(2);
  });

  it('handles rule selection and displays related questions', async () => {
    render(<CombinedSectionLayout {...defaultProps} />);
    
    // Click on the first rule
    const firstRule = screen.getByText('Use adjective to pre-modify the noun');
    fireEvent.click(firstRule.closest('button')!);
    
    await waitFor(() => {
      // Check if rule details are displayed in the questions panel
      expect(screen.getByText('Related Questions')).toBeInTheDocument();
      
      // Check if related question is displayed
      expect(screen.getByText(/Cricket is an \(a\)/)).toBeInTheDocument();
      expect(screen.getByText('Dhaka 2023')).toBeInTheDocument();
    });
  });

  it('highlights selected rule', async () => {
    render(<CombinedSectionLayout {...defaultProps} />);
    
    const firstRuleButton = screen.getByText('Use adjective to pre-modify the noun').closest('button')!;
    
    // Initially not selected
    expect(firstRuleButton).not.toHaveClass('bg-sf-button/10');
    
    // Click to select
    fireEvent.click(firstRuleButton);
    
    await waitFor(() => {
      expect(firstRuleButton).toHaveClass('bg-sf-button/10');
    });
  });

  it('shows no questions message when rule has no related questions', async () => {
    const rulesWithoutQuestions = [
      {
        id: 3,
        ruleNo: "Rule 3",
        title: "Rule with no questions",
        banglaDescription: "This rule has no questions.",
        examples: [],
        topic: 'modifier' as const,
        level: 'HSC' as const
      }
    ];
    
    render(
      <CombinedSectionLayout 
        {...defaultProps} 
        rules={rulesWithoutQuestions}
        questions={[]}
      />
    );
    
    // Click on the rule
    const ruleButton = screen.getByText('Rule with no questions').closest('button')!;
    fireEvent.click(ruleButton);
    
    await waitFor(() => {
      expect(screen.getByText('No Questions Found')).toBeInTheDocument();
      expect(screen.getByText(/No practice questions are currently available/)).toBeInTheDocument();
    });
  });

  it('displays rule examples when rule is selected', async () => {
    render(<CombinedSectionLayout {...defaultProps} />);
    
    // Click on the first rule
    const firstRule = screen.getByText('Use adjective to pre-modify the noun');
    fireEvent.click(firstRule.closest('button')!);
    
    await waitFor(() => {
      expect(screen.getByText('Examples')).toBeInTheDocument();
      // The InteractiveAnswerReveal component parses the example and shows eye icons instead of brackets
      expect(screen.getByTestId('eye-button')).toBeInTheDocument();
    });
  });

  it('handles mobile responsive behavior', () => {
    render(<CombinedSectionLayout {...defaultProps} />);
    
    // Check if mobile toggle button exists
    const toggleButton = screen.getByText('Show Rules');
    expect(toggleButton).toBeInTheDocument();
    
    // Click to open mobile panel
    fireEvent.click(toggleButton);
    expect(screen.getByText('Hide Rules')).toBeInTheDocument();
  });

  it('displays correct question count in related questions section', async () => {
    render(<CombinedSectionLayout {...defaultProps} />);
    
    // Click on first rule
    const firstRule = screen.getByText('Use adjective to pre-modify the noun');
    fireEvent.click(firstRule.closest('button')!);
    
    await waitFor(() => {
      expect(screen.getByText('1 question')).toBeInTheDocument();
    });
  });

  it('shows question metadata (board and year)', async () => {
    render(<CombinedSectionLayout {...defaultProps} />);
    
    // Click on first rule
    const firstRule = screen.getByText('Use adjective to pre-modify the noun');
    fireEvent.click(firstRule.closest('button')!);
    
    await waitFor(() => {
      expect(screen.getByText('Dhaka 2023')).toBeInTheDocument();
      expect(screen.getByText('HSC')).toBeInTheDocument();
    });
  });

  it('displays question answers when available', async () => {
    render(<CombinedSectionLayout {...defaultProps} />);
    
    // Click on first rule
    const firstRule = screen.getByText('Use adjective to pre-modify the noun');
    fireEvent.click(firstRule.closest('button')!);
    
    // Wait for questions to load and find the eye icon
    await waitFor(() => {
      const eyeButton = screen.getByTitle('Show Answer');
      expect(eyeButton).toBeInTheDocument();
    });
    
    // Click the eye icon to show the answer
    const eyeButton = screen.getByTitle('Show Answer');
    fireEvent.click(eyeButton);
    
    await waitFor(() => {
      expect(screen.getByText('Answer:')).toBeInTheDocument();
      expect(screen.getByText('(a) international')).toBeInTheDocument();
    });
  });

  it('integrates InteractiveAnswerReveal for rule examples', async () => {
    render(<CombinedSectionLayout {...defaultProps} />);
    
    // Click on first rule
    const firstRule = screen.getByText('Use adjective to pre-modify the noun');
    fireEvent.click(firstRule.closest('button')!);
    
    // Wait for the rule details to load and verify InteractiveAnswerReveal is being used
    await waitFor(() => {
      // Check that eye button is present for interactive examples
      expect(screen.getByTestId('eye-button')).toBeInTheDocument();
      // Check that the help text from InteractiveAnswerReveal is present
      expect(screen.getByText(/Click on the eye icons to reveal answers/)).toBeInTheDocument();
    });
  });

  it('shows loading state when switching between rules', async () => {
    render(<CombinedSectionLayout {...defaultProps} />);
    
    // Click on first rule
    const firstRule = screen.getByText('Use adjective to pre-modify the noun');
    fireEvent.click(firstRule.closest('button')!);
    
    // Should briefly show loading state
    expect(screen.getByText('Loading questions...')).toBeInTheDocument();
    
    // Wait for loading to complete
    await waitFor(() => {
      expect(screen.queryByText('Loading questions...')).not.toBeInTheDocument();
      expect(screen.getByText('Related Questions')).toBeInTheDocument();
    });
  });
});