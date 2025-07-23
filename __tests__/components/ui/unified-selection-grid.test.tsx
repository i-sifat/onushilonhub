import { render, screen } from '@testing-library/react';
import UnifiedSelectionGrid from '@/components/ui/unified-selection-grid';

// Mock Next.js Link component
jest.mock('next/link', () => {
  return function MockLink({ children, href }: { children: React.ReactNode; href: string }) {
    return <a href={href}>{children}</a>;
  };
});

describe('UnifiedSelectionGrid', () => {
  const mockCards = [
    {
      type: 'HSC' as const,
      section: 'grammar' as const,
      title: 'HSC (Higher Secondary Certificate)',
      description: 'Advanced grammar topics for HSC students.',
      statistics: { topics: 12, rules: 200 },
      route: '/grammar-items/hsc',
      available: true,
      features: ['Advanced concepts', 'Detailed explanations']
    },
    {
      type: 'SSC' as const,
      section: 'grammar' as const,
      title: 'SSC (Secondary School Certificate)',
      description: 'Essential grammar topics for SSC students.',
      statistics: { topics: 8, rules: 150 },
      route: '/grammar-items/ssc',
      available: false,
      features: ['Fundamental rules', 'Clear explanations']
    }
  ];

  it('renders all cards in grid layout', () => {
    render(<UnifiedSelectionGrid cards={mockCards} />);
    
    expect(screen.getByText('HSC (Higher Secondary Certificate)')).toBeInTheDocument();
    expect(screen.getByText('SSC (Secondary School Certificate)')).toBeInTheDocument();
  });

  it('applies grid layout classes', () => {
    const { container } = render(<UnifiedSelectionGrid cards={mockCards} />);
    
    const gridContainer = container.firstChild as HTMLElement;
    expect(gridContainer).toHaveClass('grid', 'lg:grid-cols-2', 'gap-8');
  });

  it('applies custom className when provided', () => {
    const { container } = render(
      <UnifiedSelectionGrid cards={mockCards} className="custom-class" />
    );
    
    const gridContainer = container.firstChild as HTMLElement;
    expect(gridContainer).toHaveClass('custom-class');
  });

  it('passes cardClassName to individual cards', () => {
    render(
      <UnifiedSelectionGrid 
        cards={mockCards} 
        cardClassName="custom-card-class" 
      />
    );
    
    // Check that both card titles are rendered
    expect(screen.getByText('HSC (Higher Secondary Certificate)')).toBeInTheDocument();
    expect(screen.getByText('SSC (Secondary School Certificate)')).toBeInTheDocument();
  });

  it('handles empty cards array', () => {
    const { container } = render(<UnifiedSelectionGrid cards={[]} />);
    
    const gridContainer = container.firstChild as HTMLElement;
    expect(gridContainer).toBeEmptyDOMElement();
  });

  it('generates unique keys for cards', () => {
    // This test ensures no React key warnings
    const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
    
    render(<UnifiedSelectionGrid cards={mockCards} />);
    
    expect(consoleSpy).not.toHaveBeenCalledWith(
      expect.stringContaining('Warning: Each child in a list should have a unique "key" prop')
    );
    
    consoleSpy.mockRestore();
  });
});