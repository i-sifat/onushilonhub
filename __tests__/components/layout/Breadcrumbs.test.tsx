import { render, screen } from '@testing-library/react'
import Breadcrumbs from '@/components/layout/Breadcrumbs'

// Mock next/navigation
const mockPathname = jest.fn()
jest.mock('next/navigation', () => ({
  usePathname: () => mockPathname(),
}))

// Mock next/link
jest.mock('next/link', () => {
  return function MockLink({ children, href }: { children: React.ReactNode; href: string }) {
    return <a href={href}>{children}</a>
  }
})

describe('Breadcrumbs', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('returns null for root path', () => {
    mockPathname.mockReturnValue('/')
    const { container } = render(<Breadcrumbs />)
    expect(container.firstChild).toBeNull()
  })

  it('renders breadcrumbs for nested path', () => {
    mockPathname.mockReturnValue('/learning/grammar-items/hsc')
    render(<Breadcrumbs />)
    
    expect(screen.getByText('Home')).toBeInTheDocument()
    expect(screen.getByText('Learning')).toBeInTheDocument()
    expect(screen.getByText('Grammar Items')).toBeInTheDocument()
    expect(screen.getByText('Hsc')).toBeInTheDocument()
  })

  it('converts kebab-case to Title Case', () => {
    mockPathname.mockReturnValue('/board-questions/completing-sentence')
    render(<Breadcrumbs />)
    
    expect(screen.getByText('Board Questions')).toBeInTheDocument()
    expect(screen.getByText('Completing Sentence')).toBeInTheDocument()
  })

  it('marks last item as active (not clickable)', () => {
    mockPathname.mockReturnValue('/learning/grammar-items')
    render(<Breadcrumbs />)
    
    const homeLink = screen.getByText('Home')
    const learningLink = screen.getByText('Learning')
    const grammarItemsSpan = screen.getByText('Grammar Items')
    
    expect(homeLink.closest('a')).toHaveAttribute('href', '/')
    expect(learningLink.closest('a')).toHaveAttribute('href', '/learning')
    expect(grammarItemsSpan.closest('a')).toBeNull() // Should be a span, not a link
  })

  it('renders custom items when provided', () => {
    const customItems = [
      { label: 'Custom Home', href: '/' },
      { label: 'Custom Page', href: '/custom', isActive: true }
    ]
    
    render(<Breadcrumbs customItems={customItems} />)
    
    expect(screen.getByText('Custom Home')).toBeInTheDocument()
    expect(screen.getByText('Custom Page')).toBeInTheDocument()
  })

  it('applies custom className', () => {
    mockPathname.mockReturnValue('/test/path')
    render(<Breadcrumbs className="custom-class" />)
    
    const nav = screen.getByRole('navigation')
    expect(nav).toHaveClass('custom-class')
  })

  it('renders home icon for first item', () => {
    mockPathname.mockReturnValue('/test')
    render(<Breadcrumbs />)
    
    const homeIcon = document.querySelector('svg')
    expect(homeIcon).toBeInTheDocument()
  })

  it('renders chevron separators between items', () => {
    mockPathname.mockReturnValue('/learning/grammar-items')
    render(<Breadcrumbs />)
    
    const chevrons = document.querySelectorAll('svg')
    // Should have home icon + chevron separators
    expect(chevrons.length).toBeGreaterThan(1)
  })

  it('generates correct href for each breadcrumb', () => {
    mockPathname.mockReturnValue('/learning/grammar-items/hsc')
    render(<Breadcrumbs />)
    
    const homeLink = screen.getByText('Home').closest('a')
    const learningLink = screen.getByText('Learning').closest('a')
    const grammarItemsLink = screen.getByText('Grammar Items').closest('a')
    
    expect(homeLink).toHaveAttribute('href', '/')
    expect(learningLink).toHaveAttribute('href', '/learning')
    expect(grammarItemsLink).toHaveAttribute('href', '/learning/grammar-items')
  })

  it('handles single level path', () => {
    mockPathname.mockReturnValue('/about')
    render(<Breadcrumbs />)
    
    expect(screen.getByText('Home')).toBeInTheDocument()
    expect(screen.getByText('About')).toBeInTheDocument()
  })

  it('handles deep nested paths', () => {
    mockPathname.mockReturnValue('/learning/board-questions/hsc/transformation/question-1')
    render(<Breadcrumbs />)
    
    expect(screen.getByText('Home')).toBeInTheDocument()
    expect(screen.getByText('Learning')).toBeInTheDocument()
    expect(screen.getByText('Board Questions')).toBeInTheDocument()
    expect(screen.getByText('Hsc')).toBeInTheDocument()
    expect(screen.getByText('Transformation')).toBeInTheDocument()
    expect(screen.getByText('Question 1')).toBeInTheDocument()
  })

  it('has proper aria-label for accessibility', () => {
    mockPathname.mockReturnValue('/test')
    render(<Breadcrumbs />)
    
    const nav = screen.getByRole('navigation')
    expect(nav).toHaveAttribute('aria-label', 'Breadcrumb')
  })
})