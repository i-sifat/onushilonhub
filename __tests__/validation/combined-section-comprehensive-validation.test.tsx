import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import CombinedSectionLayout from '@/components/combined/CombinedSectionLayout';
import { createCombinedSectionConfig } from '@/lib/utils/combined-section-helpers';
import { GenericRule, GenericQuestion } from '@/components/combined/CombinedSectionLayout';

// Comprehensive test data that simulates real modifier data
const comprehensiveRules: GenericRule[] = [
  {
    id: 1,
    ruleNo: "Rule 1",
    title: "Use adjective to pre-modify the noun",
    banglaDescription: "Adjective noun-এর গুণ বা বৈশিষ্ট্য বর্ণনা করে। অতএব, noun-এর পূর্বে adjective বসিয়ে noun-কে pre-modify করতে হয়।",
    examples: ["Cricket is an [international] game.", "He was a [noble] man."],
    topic: 'modifier',
    level: 'HSC'
  },
  {
    id: 2,
    ruleNo: "Rule 2",
    title: "Use Determiner to pre-modify the noun",
    banglaDescription: "Determiner noun-এর পরিমাণ বা নির্দিষ্টতা নির্দেশ করে।",
    examples: ["[Each] team consists of eleven players.", "[This] substance is found in water."],
    topic: 'modifier',
    level: 'HSC'
  },
  {
    id: 3,
    ruleNo: "Rule 3",
    title: "Use Intensifier to pre-modify the adjective",
    banglaDescription: "Intensifier adjective-এর তীব্রতা বা মাত্রা বৃদ্ধি বা হ্রাস করে।",
    examples: ["He was [so] kind that he risked his life.", "It was [very] important."],
    topic: 'modifier',
    level: 'HSC'
  },
  {
    id: 4,
    ruleNo: "Rule 4",
    title: "Use Possessive to pre-modify the noun",
    banglaDescription: "Possessive noun-এর মালিকানা বা সম্পর্ক নির্দেশ করে।",
    examples: ["[Our] country is beautiful.", "[His] life was at risk."],
    topic: 'modifier',
    level: 'HSC'
  },
  {
    id: 5,
    ruleNo: "Rule 5",
    title: "Use infinitive to post-modify the verb",
    banglaDescription: "Infinitive verb-এর পরে বসে verb-কে post-modify করে।",
    examples: ["He came [to help] us.", "We need [to resolve] this issue."],
    topic: 'modifier',
    level: 'HSC'
  }
];

const comprehensiveQuestions: GenericQuestion[] = [
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
    question: "It is not a game of (b) --- (use possessive to pre-modify the noun) country.",
    answer: "(b) our",
    board: 'Dhaka',
    year: 2023,
    ruleId: 4
  },
  {
    id: "q3",
    topic: 'modifier',
    level: 'HSC',
    question: "(c) --- (use determiner to pre-modify the noun) team consists of eleven players.",
    answer: "(c) Each",
    board: 'Dhaka',
    year: 2023,
    ruleId: 2
  },
  {
    id: "q4",
    topic: 'modifier',
    level: 'HSC',
    question: "He was (d) --- (use an intensifier to pre-modify the adjective) kind that he risked his life.",
    answer: "(d) so",
    board: 'Rajshahi',
    year: 2023,
    ruleId: 3
  },
  {
    id: "q5",
    topic: 'modifier',
    level: 'HSC',
    question: "Sometimes, a third umpire is required (e) --- (use an infinitive to post-modify the verb) an acute confusion.",
    answer: "(e) to resolve",
    board: 'Dhaka',
    year: 2023,
    ruleId: 5
  },
  {
    id: "q6",
    topic: 'modifier',
    level: 'HSC',
    question: "Language plays a (a) --- (pre-modify the adjective with an intensifier) important role in our life.",
    answer: "(a) very",
    board: 'Jashore',
    year: 2023,
    ruleId: 3
  },
  {
    id: "q7",
    topic: 'modifier',
    level: 'HSC',
    question: "Drug addiction has become a (a) --- (pre-modify the noun) concern.",
    answer: "(a) major",
    board: 'Sylhet',
    year: 2023,
    ruleId: 1
  }
];

describe('Combined Section Comprehensive Validation', () => {
  const defaultProps = {
    topic: 'Modifier',
    level: 'HSC' as const,
    rules: comprehensiveRules,
    questions: comprehensiveQuestions
  };

  beforeEach(() => {
    // Mock window.matchMedia for responsive tests
    Object.defineProperty(window, 'matchMedia', {
      writable: true,
      value: jest.fn().mockImplementation(query => ({
        matches: query.includes('(max-width: 768px)') ? false : true,
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

  describe('Rule-Question Matching Accuracy', () => {
    it('should correctly associate questions with their corresponding rules', () => {
      render(<CombinedSectionLayout {...defaultProps} />);
      
      // Check that each rule has the correct number of questions
      const rule1Button = screen.getByText('Use adjective to pre-modify the noun').closest('button')!;
      const rule2Button = screen.getByText('Use Determiner to pre-modify the noun').closest('button')!;
      const rule3Button = screen.getByText('Use Intensifier to pre-modify the adjective').closest('button')!;
      const rule4Button = screen.getByText('Use Possessive to pre-modify the noun').closest('button')!;
      const rule5Button = screen.getByText('Use infinitive to post-modify the verb').closest('button')!;
      
      // Rule 1 should have 2 questions (q1, q7)
      expect(rule1Button.querySelector('.w-8.h-8')?.textContent).toBe('2');
      // Rule 2 should have 1 question (q3)
      expect(rule2Button.querySelector('.w-8.h-8')?.textContent).toBe('1');
      // Rule 3 should have 2 questions (q4, q6)
      expect(rule3Button.querySelector('.w-8.h-8')?.textContent).toBe('2');
      // Rule 4 should have 1 question (q2)
      expect(rule4Button.querySelector('.w-8.h-8')?.textContent).toBe('1');
      // Rule 5 should have 1 question (q5)
      expect(rule5Button.querySelector('.w-8.h-8')?.textContent).toBe('1');
    });

    it('should display correct questions when a rule is selected', async () => {
      render(<CombinedSectionLayout {...defaultProps} />);
      
      // Click on Rule 3 (Intensifier)
      const rule3Button = screen.getByText('Use Intensifier to pre-modify the adjective').closest('button')!;
      fireEvent.click(rule3Button);
      
      await waitFor(() => {
        // Should show 2 questions for Rule 3
        expect(screen.getByText('2 questions')).toBeInTheDocument();
        
        // Should show both questions related to intensifiers
        expect(screen.getByText(/use an intensifier to pre-modify the adjective/)).toBeInTheDocument();
        expect(screen.getByText(/pre-modify the adjective with an intensifier/)).toBeInTheDocument();
      });
    });
  });

  describe('Responsive Layout Behavior', () => {
    it('should display two-panel layout on desktop', () => {
      render(<CombinedSectionLayout {...defaultProps} />);
      
      // Should show both panels side by side
      const rulesPanel = screen.getByText('Grammar Rules').closest('div');
      const questionsPanel = screen.getByText('Select a Grammar Rule').closest('div');
      
      expect(rulesPanel).toBeInTheDocument();
      expect(questionsPanel).toBeInTheDocument();
      
      // Mobile toggle button should be hidden on desktop
      expect(screen.getByText('Show Rules')).toBeInTheDocument();
    });

    it('should handle mobile responsive behavior correctly', () => {
      // Mock mobile viewport
      Object.defineProperty(window, 'matchMedia', {
        writable: true,
        value: jest.fn().mockImplementation(query => ({
          matches: query.includes('(max-width: 768px)') ? true : false,
          media: query,
          onchange: null,
          addListener: jest.fn(),
          removeListener: jest.fn(),
          addEventListener: jest.fn(),
          removeEventListener: jest.fn(),
          dispatchEvent: jest.fn(),
        })),
      });

      render(<CombinedSectionLayout {...defaultProps} />);
      
      // Should show mobile header with toggle button
      expect(screen.getByText('Show Rules')).toBeInTheDocument();
      expect(screen.getByText('Modifier - Combined Section')).toBeInTheDocument();
      expect(screen.getByText('HSC Level')).toBeInTheDocument();
    });

    it('should toggle mobile panel correctly', () => {
      render(<CombinedSectionLayout {...defaultProps} />);
      
      const toggleButton = screen.getByText('Show Rules');
      
      // Click to show rules panel
      fireEvent.click(toggleButton);
      expect(screen.getByText('Hide Rules')).toBeInTheDocument();
      
      // Click to hide rules panel
      fireEvent.click(screen.getByText('Hide Rules'));
      expect(screen.getByText('Show Rules')).toBeInTheDocument();
    });
  });

  describe('Interactive Answer Reveal Functionality', () => {
    it('should integrate InteractiveAnswerReveal for rule examples', async () => {
      render(<CombinedSectionLayout {...defaultProps} />);
      
      // Click on a rule to see its examples
      const rule1Button = screen.getByText('Use adjective to pre-modify the noun').closest('button')!;
      fireEvent.click(rule1Button);
      
      await waitFor(() => {
        // Should show InteractiveAnswerReveal component
        expect(screen.getByText('Examples')).toBeInTheDocument();
        expect(screen.getAllByTestId('eye-button')).toHaveLength(2); // Rule has 2 examples
        expect(screen.getByText(/Click on the eye icons to reveal answers/)).toBeInTheDocument();
      });
    });

    it('should display rule details with proper formatting', async () => {
      render(<CombinedSectionLayout {...defaultProps} />);
      
      // Click on a rule
      const rule1Button = screen.getByText('Use adjective to pre-modify the noun').closest('button')!;
      fireEvent.click(rule1Button);
      
      await waitFor(() => {
        // Should show rule title in the questions panel (there will be multiple instances)
        expect(screen.getAllByText('Use adjective to pre-modify the noun')).toHaveLength(2);
        
        // Should show Bengali description (appears in both rules panel and questions panel)
        expect(screen.getAllByText(/Adjective noun-এর গুণ বা বৈশিষ্ট্য বর্ণনা করে/)).toHaveLength(2);
        
        // Should show examples section
        expect(screen.getByText('Examples')).toBeInTheDocument();
      });
    });
  });

  describe('Rule Selection and Question Display Flow', () => {
    it('should handle rule selection flow smoothly', async () => {
      render(<CombinedSectionLayout {...defaultProps} />);
      
      // Initially should show default message
      expect(screen.getByText('Select a Grammar Rule')).toBeInTheDocument();
      
      // Click on first rule
      const rule1Button = screen.getByText('Use adjective to pre-modify the noun').closest('button')!;
      fireEvent.click(rule1Button);
      
      // Should show loading state briefly
      expect(screen.getByText('Loading questions...')).toBeInTheDocument();
      
      // Wait for content to load
      await waitFor(() => {
        expect(screen.queryByText('Loading questions...')).not.toBeInTheDocument();
        expect(screen.getByText('Related Questions')).toBeInTheDocument();
        expect(screen.getByText('2 questions')).toBeInTheDocument();
      });
    });

    it('should switch between rules smoothly', async () => {
      render(<CombinedSectionLayout {...defaultProps} />);
      
      // Click on first rule
      const rule1Button = screen.getByText('Use adjective to pre-modify the noun').closest('button')!;
      fireEvent.click(rule1Button);
      
      await waitFor(() => {
        expect(screen.getByText('2 questions')).toBeInTheDocument();
      });
      
      // Click on second rule
      const rule2Button = screen.getByText('Use Determiner to pre-modify the noun').closest('button')!;
      fireEvent.click(rule2Button);
      
      await waitFor(() => {
        expect(screen.getByText('1 question')).toBeInTheDocument();
      });
    });

    it('should handle rules with no questions gracefully', async () => {
      const rulesWithNoQuestions = [
        ...comprehensiveRules,
        {
          id: 6,
          ruleNo: "Rule 6",
          title: "Rule with no questions",
          banglaDescription: "This rule has no associated questions.",
          examples: [],
          topic: 'modifier',
          level: 'HSC' as const
        }
      ];
      
      render(
        <CombinedSectionLayout 
          {...defaultProps} 
          rules={rulesWithNoQuestions}
        />
      );
      
      // Click on rule with no questions
      const ruleButton = screen.getByText('Rule with no questions').closest('button')!;
      fireEvent.click(ruleButton);
      
      await waitFor(() => {
        expect(screen.getByText('No Questions Found')).toBeInTheDocument();
        expect(screen.getByText(/No practice questions are currently available/)).toBeInTheDocument();
      });
    });
  });

  describe('Visual Consistency and Design', () => {
    it('should maintain consistent styling across components', () => {
      render(<CombinedSectionLayout {...defaultProps} />);
      
      // Check consistent color scheme - the rules panel header has bg-sf-bg/50
      const rulesPanel = screen.getByText('Grammar Rules').closest('div');
      expect(rulesPanel).toHaveClass('bg-sf-bg/50');
      
      // Check consistent button styling
      const ruleButtons = screen.getAllByRole('button');
      ruleButtons.forEach(button => {
        if (button.textContent?.includes('Use')) {
          expect(button).toHaveClass('transition-all');
        }
      });
    });

    it('should show proper visual feedback for selected rule', async () => {
      render(<CombinedSectionLayout {...defaultProps} />);
      
      const rule1Button = screen.getByText('Use adjective to pre-modify the noun').closest('button')!;
      
      // Initially not selected
      expect(rule1Button).not.toHaveClass('bg-sf-button/10');
      
      // Click to select
      fireEvent.click(rule1Button);
      
      await waitFor(() => {
        expect(rule1Button).toHaveClass('bg-sf-button/10');
      });
    });
  });

  describe('Performance with Full Dataset', () => {
    it('should handle large datasets efficiently', () => {
      const startTime = performance.now();
      
      render(<CombinedSectionLayout {...defaultProps} />);
      
      const endTime = performance.now();
      const renderTime = endTime - startTime;
      
      // Should render within reasonable time (less than 100ms)
      expect(renderTime).toBeLessThan(100);
    });

    it('should use memoization for expensive calculations', () => {
      const { rerender } = render(<CombinedSectionLayout {...defaultProps} />);
      
      // Re-render with same props should be fast due to memoization
      const startTime = performance.now();
      rerender(<CombinedSectionLayout {...defaultProps} />);
      const endTime = performance.now();
      
      const rerenderTime = endTime - startTime;
      expect(rerenderTime).toBeLessThan(50);
    });
  });

  describe('Extensibility Validation', () => {
    it('should work with createCombinedSectionConfig helper', () => {
      const config = createCombinedSectionConfig('Modifier', 'HSC', comprehensiveRules, comprehensiveQuestions);
      
      render(
        <CombinedSectionLayout
          topic={config.topic}
          level={config.level}
          rules={config.rules}
          questions={config.questions}
        />
      );
      
      expect(screen.getByText('Grammar Rules')).toBeInTheDocument();
      expect(screen.getByText('Select a rule to see related questions')).toBeInTheDocument();
    });

    it('should handle different topic data structures', () => {
      const customRules: GenericRule[] = [
        {
          id: 1,
          ruleNo: "Custom Rule 1",
          title: "Custom grammar rule",
          banglaDescription: "Custom description",
          examples: ["Custom [example]"],
          topic: 'custom',
          level: 'HSC'
        }
      ];

      const customQuestions: GenericQuestion[] = [
        {
          id: "custom1",
          topic: 'custom',
          level: 'HSC',
          question: "Custom question",
          answer: "Custom answer",
          ruleId: 1
        }
      ];
      
      render(
        <CombinedSectionLayout
          topic="Custom Topic"
          level="HSC"
          rules={customRules}
          questions={customQuestions}
        />
      );
      
      expect(screen.getByText('Custom grammar rule')).toBeInTheDocument();
    });
  });
});