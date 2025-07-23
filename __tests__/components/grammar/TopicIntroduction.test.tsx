import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { TopicIntroduction } from '@/components/grammar/TopicIntroduction';

describe('TopicIntroduction', () => {
  const mockProps = {
    title: 'What is Modifier?',
    banglaDescription: 'Modifier হল এমন একটি word / phrase / clause, যা কোনো Parts of Speech এর আগে বা পরে বসে।',
    types: {
      title: 'Modifier কত প্রকার?',
      description: 'Modifier মূলত ৩ প্রকারের হয়:',
      list: ['Pre-modifier', 'Post-modifier', 'Dangling modifier']
    }
  };

  it('renders title correctly with emoji', () => {
    render(<TopicIntroduction {...mockProps} />);
    
    expect(screen.getByText('📚 What is Modifier?')).toBeInTheDocument();
    expect(screen.getByText('📚 What is Modifier?')).toHaveClass('text-2xl', 'font-bold', 'text-sf-text-bold');
  });

  it('renders bangla description correctly', () => {
    render(<TopicIntroduction {...mockProps} />);
    
    expect(screen.getByText(mockProps.banglaDescription)).toBeInTheDocument();
    expect(screen.getByText(mockProps.banglaDescription)).toHaveClass('text-sf-text-subtle', 'text-lg');
  });

  it('renders types section when provided', () => {
    render(<TopicIntroduction {...mockProps} />);
    
    expect(screen.getByText('Modifier কত প্রকার?')).toBeInTheDocument();
    expect(screen.getByText('Modifier মূলত ৩ প্রকারের হয়:')).toBeInTheDocument();
    
    // Check all list items
    expect(screen.getByText('Pre-modifier')).toBeInTheDocument();
    expect(screen.getByText('Post-modifier')).toBeInTheDocument();
    expect(screen.getByText('Dangling modifier')).toBeInTheDocument();
  });

  it('renders without types section when not provided', () => {
    const propsWithoutTypes = {
      title: 'Test Title',
      banglaDescription: 'Test description'
    };
    
    render(<TopicIntroduction {...propsWithoutTypes} />);
    
    expect(screen.getByText('📚 Test Title')).toBeInTheDocument();
    expect(screen.getByText('Test description')).toBeInTheDocument();
    expect(screen.queryByText('Modifier কত প্রকার?')).not.toBeInTheDocument();
  });

  it('applies custom className', () => {
    const { container } = render(
      <TopicIntroduction {...mockProps} className="custom-class" />
    );
    
    expect(container.firstChild).toHaveClass('custom-class');
  });

  it('has proper styling and structure', () => {
    const { container } = render(<TopicIntroduction {...mockProps} />);
    
    expect(container.firstChild).toHaveClass(
      'rounded-2xl',
      'border',
      'border-sf-text-muted/20',
      'bg-neutral-800/50',
      'p-6',
      'mb-8'
    );
  });

  it('renders list items with bullet points', () => {
    render(<TopicIntroduction {...mockProps} />);
    
    // Check that list items are rendered as list elements
    const listItems = screen.getAllByRole('listitem');
    expect(listItems).toHaveLength(3);
    
    // Check that each list item contains the expected text
    expect(listItems[0]).toHaveTextContent('Pre-modifier');
    expect(listItems[1]).toHaveTextContent('Post-modifier');
    expect(listItems[2]).toHaveTextContent('Dangling modifier');
  });

  it('handles empty types list', () => {
    const propsWithEmptyList = {
      ...mockProps,
      types: {
        title: 'Test Types',
        description: 'Test description',
        list: []
      }
    };
    
    render(<TopicIntroduction {...propsWithEmptyList} />);
    
    expect(screen.getByText('Test Types')).toBeInTheDocument();
    expect(screen.getByText('Test description')).toBeInTheDocument();
    expect(screen.queryByRole('listitem')).not.toBeInTheDocument();
  });
});