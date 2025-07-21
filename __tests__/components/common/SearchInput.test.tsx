import { render, screen, waitFor, act } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import SearchInput from '@/components/common/SearchInput'

describe('SearchInput', () => {
  const mockOnChange = jest.fn()

  beforeEach(() => {
    jest.clearAllMocks()
    jest.useFakeTimers()
  })

  afterEach(() => {
    jest.useRealTimers()
  })

  it('renders with default placeholder', () => {
    render(<SearchInput value="" onChange={mockOnChange} />)
    expect(screen.getByPlaceholderText('Search questions...')).toBeInTheDocument()
  })

  it('renders with custom placeholder', () => {
    render(<SearchInput value="" onChange={mockOnChange} placeholder="Custom placeholder" />)
    expect(screen.getByPlaceholderText('Custom placeholder')).toBeInTheDocument()
  })

  it('displays the provided value', () => {
    render(<SearchInput value="test value" onChange={mockOnChange} />)
    expect(screen.getByDisplayValue('test value')).toBeInTheDocument()
  })

  it('calls onChange with debounced value', async () => {
    const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime })
    render(<SearchInput value="" onChange={mockOnChange} />)
    
    const input = screen.getByRole('textbox')
    
    await act(async () => {
      await user.type(input, 'test')
      jest.advanceTimersByTime(300)
    })
    
    await waitFor(() => {
      expect(mockOnChange).toHaveBeenCalledWith('test')
    })
  })

  it('shows clear button when there is text', () => {
    render(<SearchInput value="test" onChange={mockOnChange} />)
    expect(screen.getByRole('button')).toBeInTheDocument()
  })

  it('does not show clear button when input is empty', () => {
    render(<SearchInput value="" onChange={mockOnChange} />)
    expect(screen.queryByRole('button')).not.toBeInTheDocument()
  })

  it('clears input when clear button is clicked', async () => {
    render(<SearchInput value="test" onChange={mockOnChange} />)
    
    const clearButton = screen.getByRole('button')
    
    await act(async () => {
      clearButton.click()
    })
    
    expect(mockOnChange).toHaveBeenCalledWith('')
  })

  it('renders search functionality', () => {
    render(<SearchInput value="" onChange={mockOnChange} />)
    // Just verify the component renders without errors
    expect(screen.getByPlaceholderText('Search questions...')).toBeInTheDocument()
  })
})