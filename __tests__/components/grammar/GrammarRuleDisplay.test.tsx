import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { GrammarRuleDisplay } from '@/components/grammar/GrammarRuleDisplay';

describe('GrammarRuleDisplay', () => {
  const mockProps = {
    title: 'Test Grammar Rule',
    banglaDescription: 'এটি একটি পরীক্ষার নিয়ম।',
    examples: [
      'Example 1: This is a test.',
      'Example 2: Another test example.'
    ]
  };

  const mockPropsWithAnswers = {
    title: 'Test Grammar Rule',
    banglaDescription: 'এটি একটি পরীক্ষার নিয়ম।',
    examples: [
      'Cricket is an [international] game. (Dhaka-2023)',
      'She is a [beautiful] girl. (Chittagong-2022)'
    ]
  };

  it('renders title correctly', () => {
    render(<GrammarRuleDisplay {...mockProps} />);
    
    expect(screen.getByText('Test Grammar Rule')).toBeInTheDocument();
    expect(screen.getByText('Test Grammar Rule')).toHaveClass('text-2xl', 'font-bold', 'text-sf-text-bold', 'leading-tight');
  });

  it('renders bangla description correctly', () => {
    render(<GrammarRuleDisplay {...mockProps} />);
    
    expect(screen.getByText('এটি একটি পরীক্ষার নিয়ম।')).toBeInTheDocument();
    expect(screen.getByText('এটি একটি পরীক্ষার নিয়ম।')).toHaveClass('text-sf-text-subtle');
  });

  it('renders examples label by default', () => {
    render(<GrammarRuleDisplay {...mockProps} />);
    
    expect(screen.getByText('Examples')).toBeInTheDocument();
  });

  it('hides examples label when showExamplesLabel is false', () => {
    render(<GrammarRuleDisplay {...mockProps} showExamplesLabel={false} />);
    
    expect(screen.queryByText('Examples')).not.toBeInTheDocument();
  });

  it('renders examples with interactive answer reveal functionality', () => {
    render(<GrammarRuleDisplay {...mockPropsWithAnswers} />);
    
    // Examples should be visible by default
    expect(screen.getByText(/Cricket is an/)).toBeInTheDocument();
    expect(screen.getByText(/She is a/)).toBeInTheDocument();
    
    // Eye icons should be present for hidden answers
    const eyeButtons = screen.getAllByTestId('eye-button');
    expect(eyeButtons).toHaveLength(2);
    
    // Click first eye icon to reveal answer
    fireEvent.click(eyeButtons[0]);
    
    // Answer should now be revealed
    expect(screen.getByTestId('revealed-answer')).toBeInTheDocument();
    expect(screen.getByText('international')).toBeInTheDocument();
  });

  it('handles examples without bracketed answers', () => {
    render(<GrammarRuleDisplay {...mockProps} />);
    
    // Examples should be visible
    expect(screen.getByText('Example 1: This is a test.')).toBeInTheDocument();
    expect(screen.getByText('Example 2: Another test example.')).toBeInTheDocument();
    
    // No eye icons should be present
    expect(screen.queryByTestId('eye-button')).not.toBeInTheDocument();
  });

  it('handles empty examples array', () => {
    render(<GrammarRuleDisplay {...mockProps} examples={[]} />);
    
    expect(screen.queryByText('Examples:')).not.toBeInTheDocument();
    expect(screen.queryByTestId('eye-button')).not.toBeInTheDocument();
  });

  it('applies custom className', () => {
    const { container } = render(
      <GrammarRuleDisplay {...mockProps} className="custom-class" />
    );
    
    expect(container.firstChild).toHaveClass('custom-class');
  });

  it('renders with proper structure and spacing', () => {
    const { container } = render(<GrammarRuleDisplay {...mockProps} />);
    
    expect(container.firstChild).toHaveClass('space-y-6');
  });

  it('handles single example with interactive answers correctly', () => {
    const singleExampleProps = {
      ...mockProps,
      examples: ['This is a [simple] test.']
    };
    
    render(<GrammarRuleDisplay {...singleExampleProps} />);
    
    // Example should be visible
    expect(screen.getByText(/This is a/)).toBeInTheDocument();
    
    // Eye icon should be present
    const eyeButton = screen.getByTestId('eye-button');
    expect(eyeButton).toBeInTheDocument();
    
    // Click to reveal answer
    fireEvent.click(eyeButton);
    
    // Answer should be revealed
    expect(screen.getByText('simple')).toBeInTheDocument();
  });

  it('toggles answer visibility when clicking revealed answer', () => {
    render(<GrammarRuleDisplay {...mockPropsWithAnswers} />);
    
    const eyeButtons = screen.getAllByTestId('eye-button');
    
    // Click to reveal answer
    fireEvent.click(eyeButtons[0]);
    expect(screen.getByText('international')).toBeInTheDocument();
    
    // Click revealed answer to hide it
    const revealedAnswer = screen.getByTestId('revealed-answer');
    fireEvent.click(revealedAnswer);
    
    // Answer should be hidden again, eye icon should be back
    expect(screen.queryByText('international')).not.toBeInTheDocument();
    expect(screen.getAllByTestId('eye-button')).toHaveLength(2);
  });

  it('displays help text for interactive functionality', () => {
    render(<GrammarRuleDisplay {...mockPropsWithAnswers} />);
    
    expect(screen.getByText(/Click on the eye icons to reveal answers/)).toBeInTheDocument();
  });
});