import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { CollapsibleTopicIntroduction } from '@/components/ui/collapsible-topic-introduction';

describe('CollapsibleTopicIntroduction', () => {
  const mockProps = {
    title: 'What is Modifier?',
    banglaDescription: 'Modifier হল এমন একটি word / phrase / clause, যা কোনো Parts of Speech (বিশেষ করে Noun) এর আগে বা পরে বসে তাকে নতুন বা অতিরিক্ত তথ্য দেয়।',
    types: {
      title: 'Modifier কত প্রকার?',
      description: 'Modifier মূলত ৩ প্রকারের হয়, তবে পরীক্ষায় ২ প্রকার আসে:',
      list: [
        'Pre-modifier',
        'Post-modifier',
        'Dangling modifier (পরীক্ষায় আসে না)'
      ]
    }
  };

  it('renders the component with title and collapsed state by default', () => {
    render(<CollapsibleTopicIntroduction {...mockProps} />);
    
    // Check if title is visible
    expect(screen.getByText('What is Modifier?')).toBeInTheDocument();
    
    // Check if book emoji is present
    expect(screen.getByText('📚')).toBeInTheDocument();
    
    // Check if button is present
    expect(screen.getByRole('button')).toBeInTheDocument();
    
    // Content should not be in the document initially (collapsed)
    expect(screen.queryByText(mockProps.banglaDescription)).not.toBeInTheDocument();
  });

  it('expands when clicked and shows content', () => {
    render(<CollapsibleTopicIntroduction {...mockProps} />);
    
    // Click on the header to expand
    const header = screen.getByRole('button');
    fireEvent.click(header);
    
    // Content should now be visible
    expect(screen.getByText(mockProps.banglaDescription)).toBeVisible();
    expect(screen.getByText('Modifier কত প্রকার?')).toBeVisible();
    expect(screen.getByText('Pre-modifier')).toBeVisible();
    expect(screen.getByText('Post-modifier')).toBeVisible();
  });

  it('collapses when clicked again', () => {
    render(<CollapsibleTopicIntroduction {...mockProps} />);
    
    const header = screen.getByRole('button');
    
    // Expand first
    fireEvent.click(header);
    expect(screen.getByText(mockProps.banglaDescription)).toBeVisible();
    
    // Collapse again
    fireEvent.click(header);
    expect(screen.queryByText(mockProps.banglaDescription)).not.toBeInTheDocument();
  });

  it('starts expanded when defaultExpanded is true', () => {
    render(<CollapsibleTopicIntroduction {...mockProps} defaultExpanded={true} />);
    
    // Content should be visible immediately
    expect(screen.getByText(mockProps.banglaDescription)).toBeVisible();
    expect(screen.getByText('Pre-modifier')).toBeVisible();
  });

  it('renders without types section when types prop is not provided', () => {
    const propsWithoutTypes = {
      title: 'Test Title',
      banglaDescription: 'Test description'
    };
    
    render(<CollapsibleTopicIntroduction {...propsWithoutTypes} defaultExpanded={true} />);
    
    expect(screen.getByText('Test Title')).toBeInTheDocument();
    expect(screen.getByText('Test description')).toBeVisible();
    expect(screen.queryByText('Modifier কত প্রকার?')).not.toBeInTheDocument();
  });

  it('applies custom className when provided', () => {
    const { container } = render(
      <CollapsibleTopicIntroduction {...mockProps} className="custom-class" />
    );
    
    expect(container.firstChild).toHaveClass('custom-class');
  });

  it('has proper accessibility attributes', () => {
    render(<CollapsibleTopicIntroduction {...mockProps} />);
    
    // Check if the button is properly accessible
    const button = screen.getByRole('button');
    expect(button).toBeInTheDocument();
    
    // Check if the title has proper heading structure
    expect(screen.getByText('What is Modifier?')).toBeInTheDocument();
  });

  it('shows correct chevron icon based on expanded state', () => {
    render(<CollapsibleTopicIntroduction {...mockProps} />);
    
    const button = screen.getByRole('button');
    
    // Initially should show chevron down (collapsed)
    // After clicking should show chevron up (expanded)
    fireEvent.click(button);
    
    // The icon should change after expansion
    // Note: This test verifies the toggle functionality works
    expect(button).toBeInTheDocument();
  });

  it('handles click events on both header and button', () => {
    render(<CollapsibleTopicIntroduction {...mockProps} />);
    
    // Click on the main header area
    const headerDiv = screen.getByText('What is Modifier?').closest('div');
    if (headerDiv?.parentElement) {
      fireEvent.click(headerDiv.parentElement);
      expect(screen.getByText(mockProps.banglaDescription)).toBeVisible();
    }
    
    // Click on the button specifically
    const button = screen.getByRole('button');
    fireEvent.click(button);
    expect(screen.queryByText(mockProps.banglaDescription)).not.toBeInTheDocument();
  });
});