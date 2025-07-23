import { render, screen } from '@testing-library/react';
import UnifiedSelectionCard from '@/components/ui/unified-selection-card';

// Mock Next.js Link component
jest.mock('next/link', () => {
  return function MockLink({ children, href }: { children: React.ReactNode; href: string }) {
    return <a href={href}>{children}</a>;
  };
});

describe('UnifiedSelectionCard', () => {
  const mockProps = {
    type: 'HSC' as const,
    section: 'grammar' as const,
    title: 'HSC (Higher Secondary Certificate)',
    description: 'Advanced grammar topics for HSC students with comprehensive rules, examples, and board questions.',
    statistics: {
      topics: 12,
      rules: 200,
      questions: 3000
    },
    route: '/grammar-items/hsc',
    available: true,
    features: [
      'Advanced grammar concepts',
      'Detailed rule explanations',
      'Real board questions'
    ]
  };

  it('renders card with correct title and description', () => {
    render(<UnifiedSelectionCard {...mockProps} />);
    
    expect(screen.getByText('HSC (Higher Secondary Certificate)')).toBeInTheDocument();
    expect(screen.getByText('Advanced grammar topics for HSC students with comprehensive rules, examples, and board questions.')).toBeInTheDocument();
  });

  it('displays correct statistics', () => {
    render(<UnifiedSelectionCard {...mockProps} />);
    
    expect(screen.getByText('12+')).toBeInTheDocument();
    expect(screen.getByText('200+')).toBeInTheDocument();
    expect(screen.getByText('3k+')).toBeInTheDocument();
    expect(screen.getByText('Topics')).toBeInTheDocument();
    expect(screen.getByText('Rules')).toBeInTheDocument();
    expect(screen.getByText('Questions')).toBeInTheDocument();
  });

  it('shows features when provided', () => {
    render(<UnifiedSelectionCard {...mockProps} />);
    
    expect(screen.getByText('Features:')).toBeInTheDocument();
    expect(screen.getByText('Advanced grammar concepts')).toBeInTheDocument();
    expect(screen.getByText('Detailed rule explanations')).toBeInTheDocument();
    expect(screen.getByText('Real board questions')).toBeInTheDocument();
  });

  it('displays correct section badge and icon', () => {
    render(<UnifiedSelectionCard {...mockProps} />);
    
    expect(screen.getByText('HSC')).toBeInTheDocument();
    expect(screen.getByText('grammar')).toBeInTheDocument();
    expect(screen.getByText('📚')).toBeInTheDocument();
  });

  it('shows action button with correct text for available card', () => {
    render(<UnifiedSelectionCard {...mockProps} />);
    
    expect(screen.getByText('Explore HSC Grammar')).toBeInTheDocument();
  });

  it('shows coming soon for unavailable card', () => {
    const unavailableProps = { ...mockProps, available: false };
    render(<UnifiedSelectionCard {...unavailableProps} />);
    
    expect(screen.getAllByText('Coming Soon')).toHaveLength(2); // Badge and button
  });

  it('formats large statistics correctly', () => {
    const largeStatsProps = {
      ...mockProps,
      statistics: {
        topics: 1500,
        rules: 2500,
        questions: 5000
      }
    };
    
    render(<UnifiedSelectionCard {...largeStatsProps} />);
    
    expect(screen.getByText('1k+')).toBeInTheDocument();
    expect(screen.getByText('2k+')).toBeInTheDocument();
    expect(screen.getByText('5k+')).toBeInTheDocument();
  });

  it('renders different section types correctly', () => {
    const questionsProps = { ...mockProps, section: 'questions' as const };
    render(<UnifiedSelectionCard {...questionsProps} />);
    
    expect(screen.getByText('📝')).toBeInTheDocument();
    expect(screen.getByText('questions')).toBeInTheDocument();
    expect(screen.getByText('Explore HSC Questions')).toBeInTheDocument();
  });

  it('renders combined section correctly', () => {
    const combinedProps = { ...mockProps, section: 'combined' as const };
    render(<UnifiedSelectionCard {...combinedProps} />);
    
    expect(screen.getByText('🚀')).toBeInTheDocument();
    expect(screen.getByText('combined')).toBeInTheDocument();
    expect(screen.getByText('Explore HSC Learning')).toBeInTheDocument();
  });
});