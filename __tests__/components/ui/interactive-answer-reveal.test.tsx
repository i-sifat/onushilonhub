import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { InteractiveAnswerReveal } from '@/components/ui/interactive-answer-reveal';

// Mock the lucide-react Eye icon
jest.mock('lucide-react', () => ({
  Eye: ({ className }: { className?: string }) => (
    <svg data-testid="eye-icon" className={className}>
      <title>Eye</title>
    </svg>
  ),
}));

describe('InteractiveAnswerReveal', () => {
  const mockProps = {
    title: 'Test Grammar Rule',
    banglaDescription: 'This is a test description in Bengali.',
    examples: [
      'Cricket is an [international] game. (Dhaka-2023)',
      'He was a [noble] man in our history. (Rajshahi-2023)',
      'The [quick] brown fox jumps over the [lazy] dog.'
    ]
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders the component with title and description', () => {
    render(<InteractiveAnswerReveal {...mockProps} />);
    
    expect(screen.getByText('Test Grammar Rule')).toBeInTheDocument();
    expect(screen.getByText('This is a test description in Bengali.')).toBeInTheDocument();
    expect(screen.getByText('Examples')).toBeInTheDocument();
  });

  it('displays examples with eye icons instead of answers initially', () => {
    render(<InteractiveAnswerReveal {...mockProps} />);
    
    // Should show eye buttons instead of answers (excluding the help text eye icon)
    const eyeButtons = screen.getAllByTestId('eye-button');
    expect(eyeButtons).toHaveLength(4); // 3 examples with 4 total answers
    
    // Should not show the actual answers initially
    expect(screen.queryByText('international')).not.toBeInTheDocument();
    expect(screen.queryByText('noble')).not.toBeInTheDocument();
    expect(screen.queryByText('quick')).not.toBeInTheDocument();
    expect(screen.queryByText('lazy')).not.toBeInTheDocument();
  });

  it('reveals answer when eye icon is clicked', async () => {
    render(<InteractiveAnswerReveal {...mockProps} />);
    
    const eyeButtons = screen.getAllByTestId('eye-button');
    const firstEyeButton = eyeButtons[0];
    
    expect(firstEyeButton).toBeInTheDocument();
    expect(screen.queryByText('international')).not.toBeInTheDocument();
    
    // Click the first eye button
    fireEvent.click(firstEyeButton);
    
    // Answer should now be revealed
    await waitFor(() => {
      expect(screen.getByText('international')).toBeInTheDocument();
    });
    
    // Eye button count should decrease by 1
    const remainingEyeButtons = screen.queryAllByTestId('eye-button');
    expect(remainingEyeButtons).toHaveLength(3);
  });

  it('hides answer when revealed answer is clicked again', async () => {
    render(<InteractiveAnswerReveal {...mockProps} />);
    
    const eyeButtons = screen.getAllByTestId('eye-button');
    const firstEyeButton = eyeButtons[0];
    
    // Click to reveal
    fireEvent.click(firstEyeButton);
    
    await waitFor(() => {
      expect(screen.getByText('international')).toBeInTheDocument();
    });
    
    // Click the revealed answer to hide it
    const revealedAnswerButton = screen.getByTestId('revealed-answer');
    fireEvent.click(revealedAnswerButton);
    
    // Answer should be hidden again
    await waitFor(() => {
      expect(screen.queryByText('international')).not.toBeInTheDocument();
    });
    
    // Eye button should be back
    const eyeButtonsAfterHide = screen.getAllByTestId('eye-button');
    expect(eyeButtonsAfterHide).toHaveLength(4);
  });

  it('handles multiple answers in the same example independently', async () => {
    render(<InteractiveAnswerReveal {...mockProps} />);
    
    const eyeButtons = screen.getAllByTestId('eye-button');
    
    // Click the third and fourth eye buttons (from the third example with two answers)
    fireEvent.click(eyeButtons[2]);
    fireEvent.click(eyeButtons[3]);
    
    // Both answers should be revealed
    await waitFor(() => {
      expect(screen.getByText('quick')).toBeInTheDocument();
      expect(screen.getByText('lazy')).toBeInTheDocument();
    });
    
    // Other answers should still be hidden
    expect(screen.queryByText('international')).not.toBeInTheDocument();
    expect(screen.queryByText('noble')).not.toBeInTheDocument();
  });

  it('preserves text around answers correctly', () => {
    render(<InteractiveAnswerReveal {...mockProps} />);
    
    // Check that the text around answers is preserved
    expect(screen.getByText(/Cricket is an/)).toBeInTheDocument();
    expect(screen.getByText(/game\. \(Dhaka-2023\)/)).toBeInTheDocument();
    expect(screen.getByText(/He was a/)).toBeInTheDocument();
    expect(screen.getByText(/man in our history\. \(Rajshahi-2023\)/)).toBeInTheDocument();
  });

  it('applies correct styling to eye icons and revealed answers', async () => {
    render(<InteractiveAnswerReveal {...mockProps} />);
    
    const eyeButtons = screen.getAllByTestId('eye-button');
    const firstEyeButton = eyeButtons[0];
    
    // Check initial eye button styling
    expect(firstEyeButton).toHaveClass('bg-sf-button/20', 'text-sf-button');
    
    // Click to reveal
    fireEvent.click(firstEyeButton);
    
    // Wait for the revealed answer button to appear
    const revealedAnswerButton = await waitFor(() => 
      screen.getByTestId('revealed-answer')
    );
    
    // Check revealed answer styling
    expect(revealedAnswerButton).toHaveClass('bg-success-500/20', 'text-success-600');
  });

  it('provides proper accessibility attributes', async () => {
    render(<InteractiveAnswerReveal {...mockProps} />);
    
    const eyeButtons = screen.getAllByTestId('eye-button');
    const firstEyeButton = eyeButtons[0];
    
    // Check initial aria-label
    expect(firstEyeButton).toHaveAttribute('aria-label', 'Reveal answer');
    
    // Click to reveal
    fireEvent.click(firstEyeButton);
    
    // Wait for the revealed answer button to appear
    const revealedAnswerButton = await waitFor(() => 
      screen.getByTestId('revealed-answer')
    );
    
    // Check revealed answer aria-label
    expect(revealedAnswerButton).toHaveAttribute('aria-label', 'Hide answer: international');
  });

  it('displays help text with instructions', () => {
    render(<InteractiveAnswerReveal {...mockProps} />);
    
    expect(screen.getByText(/Click on the eye icons to reveal answers/)).toBeInTheDocument();
    expect(screen.getByText(/Click revealed answers to hide them again/)).toBeInTheDocument();
  });

  it('handles examples with no answers gracefully', () => {
    const propsWithNoAnswers = {
      ...mockProps,
      examples: ['This is a simple sentence with no answers.']
    };
    
    render(<InteractiveAnswerReveal {...propsWithNoAnswers} />);
    
    // Should not show any eye buttons for answers
    expect(screen.queryAllByTestId('eye-button')).toHaveLength(0);
    
    // Should still show the text
    expect(screen.getByText('This is a simple sentence with no answers.')).toBeInTheDocument();
  });

  it('applies custom className when provided', () => {
    const { container } = render(
      <InteractiveAnswerReveal {...mockProps} className="custom-class" />
    );
    
    expect(container.firstChild).toHaveClass('custom-class');
  });
});