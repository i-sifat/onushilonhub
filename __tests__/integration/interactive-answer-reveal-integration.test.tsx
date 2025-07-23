import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { InteractiveAnswerReveal } from '@/components/ui/interactive-answer-reveal';

describe('InteractiveAnswerReveal Integration', () => {
  const testProps = {
    title: 'Test Grammar Rule',
    banglaDescription: 'This is a test description in Bengali.',
    examples: [
      'Cricket is an [international] game. (Dhaka-2023)',
      'He was a [noble] man in our history. (Rajshahi-2023)',
    ]
  };

  it('renders the component with all required elements', () => {
    render(<InteractiveAnswerReveal {...testProps} />);
    
    // Check that the component renders
    expect(screen.getByText('Test Grammar Rule')).toBeInTheDocument();
    expect(screen.getByText('This is a test description in Bengali.')).toBeInTheDocument();
    expect(screen.getByText('Examples')).toBeInTheDocument();
    
    // Check that eye buttons are present
    const eyeButtons = screen.getAllByTestId('eye-button');
    expect(eyeButtons.length).toBeGreaterThan(0);
    
    // Check that help text is present
    expect(screen.getByText(/Click on the eye icons to reveal answers/)).toBeInTheDocument();
  });

  it('has clickable eye buttons', () => {
    render(<InteractiveAnswerReveal {...testProps} />);
    
    const eyeButtons = screen.getAllByTestId('eye-button');
    
    // Verify buttons are clickable
    eyeButtons.forEach(button => {
      expect(button).toBeInTheDocument();
      expect(button.tagName).toBe('BUTTON');
    });
  });

  it('parses examples correctly and shows eye icons initially', () => {
    render(<InteractiveAnswerReveal {...testProps} />);
    
    // Should not show the actual answers initially
    expect(screen.queryByText('international')).not.toBeInTheDocument();
    expect(screen.queryByText('noble')).not.toBeInTheDocument();
    
    // Should show eye icons
    const eyeIcons = screen.getAllByTestId('eye-icon');
    expect(eyeIcons.length).toBeGreaterThan(0);
  });
});