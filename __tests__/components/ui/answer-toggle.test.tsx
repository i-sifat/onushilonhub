import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { AnswerToggle } from '@/components/ui/answer-toggle';

describe('AnswerToggle', () => {
  const mockContent = <div>Test answer content</div>;

  it('renders with default hidden state', () => {
    render(<AnswerToggle>{mockContent}</AnswerToggle>);
    
    expect(screen.getByRole('button', { name: /show answer/i })).toBeInTheDocument();
    expect(screen.queryByText('Test answer content')).not.toBeInTheDocument();
  });

  it('renders with visible state when defaultVisible is true', () => {
    render(<AnswerToggle defaultVisible={true}>{mockContent}</AnswerToggle>);
    
    expect(screen.getByRole('button', { name: /hide answer/i })).toBeInTheDocument();
    expect(screen.getByText('Test answer content')).toBeInTheDocument();
  });

  it('toggles visibility when button is clicked', () => {
    render(<AnswerToggle>{mockContent}</AnswerToggle>);
    
    const toggleButton = screen.getByRole('button', { name: /show answer/i });
    
    // Initially hidden
    expect(screen.queryByText('Test answer content')).not.toBeInTheDocument();
    
    // Click to show
    fireEvent.click(toggleButton);
    expect(screen.getByText('Test answer content')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /hide answer/i })).toBeInTheDocument();
    
    // Click to hide
    fireEvent.click(screen.getByRole('button', { name: /hide answer/i }));
    expect(screen.queryByText('Test answer content')).not.toBeInTheDocument();
    expect(screen.getByRole('button', { name: /show answer/i })).toBeInTheDocument();
  });

  it('applies custom className', () => {
    const { container } = render(
      <AnswerToggle className="custom-class">{mockContent}</AnswerToggle>
    );
    
    expect(container.firstChild).toHaveClass('custom-class');
  });

  it('applies custom button className', () => {
    render(
      <AnswerToggle buttonClassName="custom-button-class">{mockContent}</AnswerToggle>
    );
    
    expect(screen.getByRole('button')).toHaveClass('custom-button-class');
  });

  it('has proper accessibility attributes', () => {
    render(<AnswerToggle>{mockContent}</AnswerToggle>);
    
    const button = screen.getByRole('button');
    expect(button).toHaveAttribute('aria-label', 'Show answer');
    
    fireEvent.click(button);
    expect(screen.getByRole('button')).toHaveAttribute('aria-label', 'Hide answer');
  });

  it('displays correct icons for show/hide states', () => {
    render(<AnswerToggle>{mockContent}</AnswerToggle>);
    
    // Check for Eye icon (show state)
    expect(screen.getByText('Show Answer')).toBeInTheDocument();
    
    fireEvent.click(screen.getByRole('button'));
    
    // Check for EyeOff icon (hide state)
    expect(screen.getByText('Hide Answer')).toBeInTheDocument();
  });
});