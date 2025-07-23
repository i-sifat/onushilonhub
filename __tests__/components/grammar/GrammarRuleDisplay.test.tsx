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

  it('renders title correctly', () => {
    render(<GrammarRuleDisplay {...mockProps} />);
    
    expect(screen.getByText('Test Grammar Rule')).toBeInTheDocument();
    expect(screen.getByText('Test Grammar Rule')).toHaveClass('text-xl', 'font-semibold', 'text-sf-text-bold');
  });

  it('renders bangla description correctly', () => {
    render(<GrammarRuleDisplay {...mockProps} />);
    
    expect(screen.getByText('এটি একটি পরীক্ষার নিয়ম।')).toBeInTheDocument();
    expect(screen.getByText('এটি একটি পরীক্ষার নিয়ম।')).toHaveClass('text-sf-text-subtle');
  });

  it('renders examples label by default', () => {
    render(<GrammarRuleDisplay {...mockProps} />);
    
    expect(screen.getByText('Examples:')).toBeInTheDocument();
  });

  it('hides examples label when showExamplesLabel is false', () => {
    render(<GrammarRuleDisplay {...mockProps} showExamplesLabel={false} />);
    
    expect(screen.queryByText('Examples:')).not.toBeInTheDocument();
  });

  it('renders examples with toggle functionality', () => {
    render(<GrammarRuleDisplay {...mockProps} />);
    
    // Examples should be hidden initially
    expect(screen.queryByText('Example 1: This is a test.')).not.toBeInTheDocument();
    expect(screen.queryByText('Example 2: Another test example.')).not.toBeInTheDocument();
    
    // Click show answer button
    const showButton = screen.getByRole('button', { name: /show answer/i });
    fireEvent.click(showButton);
    
    // Examples should now be visible
    expect(screen.getByText('Example 1: This is a test.')).toBeInTheDocument();
    expect(screen.getByText('Example 2: Another test example.')).toBeInTheDocument();
  });

  it('handles empty examples array', () => {
    render(<GrammarRuleDisplay {...mockProps} examples={[]} />);
    
    expect(screen.queryByText('Examples:')).not.toBeInTheDocument();
    expect(screen.queryByRole('button', { name: /show answer/i })).not.toBeInTheDocument();
  });

  it('applies custom className', () => {
    const { container } = render(
      <GrammarRuleDisplay {...mockProps} className="custom-class" />
    );
    
    expect(container.firstChild).toHaveClass('custom-class');
  });

  it('renders with proper structure and spacing', () => {
    const { container } = render(<GrammarRuleDisplay {...mockProps} />);
    
    expect(container.firstChild).toHaveClass('space-y-4');
  });

  it('handles single example correctly', () => {
    const singleExampleProps = {
      ...mockProps,
      examples: ['Single example test.']
    };
    
    render(<GrammarRuleDisplay {...singleExampleProps} />);
    
    const showButton = screen.getByRole('button', { name: /show answer/i });
    fireEvent.click(showButton);
    
    expect(screen.getByText('Single example test.')).toBeInTheDocument();
  });
});