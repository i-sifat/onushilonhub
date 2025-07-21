import { render, screen, fireEvent } from '@testing-library/react'
import BackButton from '@/components/common/BackButton'

// Mock next/navigation
const mockPush = jest.fn()
const mockBack = jest.fn()

jest.mock('next/navigation', () => ({
  useRouter: () => ({
    push: mockPush,
    back: mockBack,
  }),
}))

describe('BackButton', () => {
  beforeEach(() => {
    jest.clearAllMocks()
    // Mock window.history.length
    Object.defineProperty(window, 'history', {
      value: { length: 2 },
      writable: true,
    })
  })

  it('renders with default text', () => {
    render(<BackButton />)
    expect(screen.getByText('Back')).toBeInTheDocument()
  })

  it('renders with custom text', () => {
    render(<BackButton text="Go Back" />)
    expect(screen.getByText('Go Back')).toBeInTheDocument()
  })

  it('applies custom className', () => {
    render(<BackButton className="custom-class" />)
    const button = screen.getByRole('button')
    expect(button).toHaveClass('custom-class')
  })

  it('calls router.back() when history length > 1', () => {
    render(<BackButton />)
    const button = screen.getByRole('button')
    fireEvent.click(button)
    expect(mockBack).toHaveBeenCalledTimes(1)
    expect(mockPush).not.toHaveBeenCalled()
  })

  it('calls router.push("/") when history length <= 1', () => {
    Object.defineProperty(window, 'history', {
      value: { length: 1 },
      writable: true,
    })
    
    render(<BackButton />)
    const button = screen.getByRole('button')
    fireEvent.click(button)
    expect(mockPush).toHaveBeenCalledWith('/')
    expect(mockBack).not.toHaveBeenCalled()
  })

  it('has correct default styling classes', () => {
    render(<BackButton />)
    const button = screen.getByRole('button')
    expect(button).toHaveClass('inline-flex', 'items-center', 'space-x-2')
  })

  it('renders ArrowLeft icon', () => {
    render(<BackButton />)
    const button = screen.getByRole('button')
    const svg = button.querySelector('svg')
    expect(svg).toBeInTheDocument()
  })
})