import { render, screen } from '@testing-library/react'
import LoadingSpinner from '@/components/common/LoadingSpinner'

describe('LoadingSpinner', () => {
  it('renders without text by default', () => {
    render(<LoadingSpinner />)
    const svg = document.querySelector('svg')
    expect(svg).toBeInTheDocument()
  })

  it('renders with custom text', () => {
    render(<LoadingSpinner text="Loading..." />)
    expect(screen.getByText('Loading...')).toBeInTheDocument()
  })

  it('applies small size class', () => {
    render(<LoadingSpinner size="sm" />)
    const svg = document.querySelector('svg')
    expect(svg).toHaveClass('h-4', 'w-4')
  })

  it('applies medium size class by default', () => {
    render(<LoadingSpinner />)
    const svg = document.querySelector('svg')
    expect(svg).toHaveClass('h-6', 'w-6')
  })

  it('applies large size class', () => {
    render(<LoadingSpinner size="lg" />)
    const svg = document.querySelector('svg')
    expect(svg).toHaveClass('h-8', 'w-8')
  })

  it('applies custom className', () => {
    render(<LoadingSpinner className="custom-class" />)
    const container = screen.getByTestId('loading-spinner')
    expect(container).toHaveClass('custom-class')
  })

  it('has animate-spin class on icon', () => {
    render(<LoadingSpinner />)
    const svg = document.querySelector('svg')
    expect(svg).toHaveClass('animate-spin')
  })

  it('has correct default classes', () => {
    render(<LoadingSpinner />)
    const container = screen.getByTestId('loading-spinner')
    expect(container).toHaveClass('flex', 'items-center', 'justify-center')
  })
})