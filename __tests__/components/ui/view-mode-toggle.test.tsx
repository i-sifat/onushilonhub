import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { ViewModeToggle, ViewMode } from '@/components/ui/view-mode-toggle';

describe('ViewModeToggle', () => {
  const mockOnViewModeChange = jest.fn();

  beforeEach(() => {
    mockOnViewModeChange.mockClear();
  });

  it('renders both list and grid buttons', () => {
    render(
      <ViewModeToggle 
        viewMode="list" 
        onViewModeChange={mockOnViewModeChange} 
      />
    );

    expect(screen.getByLabelText('List view')).toBeInTheDocument();
    expect(screen.getByLabelText('Grid view')).toBeInTheDocument();
  });

  it('highlights the active view mode', () => {
    render(
      <ViewModeToggle 
        viewMode="list" 
        onViewModeChange={mockOnViewModeChange} 
      />
    );

    const listButton = screen.getByLabelText('List view');
    const gridButton = screen.getByLabelText('Grid view');

    expect(listButton).toHaveAttribute('aria-pressed', 'true');
    expect(gridButton).toHaveAttribute('aria-pressed', 'false');
  });

  it('calls onViewModeChange when list button is clicked', () => {
    render(
      <ViewModeToggle 
        viewMode="grid" 
        onViewModeChange={mockOnViewModeChange} 
      />
    );

    const listButton = screen.getByLabelText('List view');
    fireEvent.click(listButton);

    expect(mockOnViewModeChange).toHaveBeenCalledWith('list');
  });

  it('calls onViewModeChange when grid button is clicked', () => {
    render(
      <ViewModeToggle 
        viewMode="list" 
        onViewModeChange={mockOnViewModeChange} 
      />
    );

    const gridButton = screen.getByLabelText('Grid view');
    fireEvent.click(gridButton);

    expect(mockOnViewModeChange).toHaveBeenCalledWith('grid');
  });

  it('applies theme-consistent styling for active state', () => {
    render(
      <ViewModeToggle 
        viewMode="list" 
        onViewModeChange={mockOnViewModeChange} 
      />
    );

    const listButton = screen.getByLabelText('List view');
    expect(listButton).toHaveClass('bg-sf-button');
    expect(listButton).toHaveClass('text-sf-bg');
  });

  it('applies theme-consistent styling for inactive state', () => {
    render(
      <ViewModeToggle 
        viewMode="list" 
        onViewModeChange={mockOnViewModeChange} 
      />
    );

    const gridButton = screen.getByLabelText('Grid view');
    expect(gridButton).toHaveClass('text-sf-text-subtle');
  });

  it('supports keyboard navigation', () => {
    render(
      <ViewModeToggle 
        viewMode="list" 
        onViewModeChange={mockOnViewModeChange} 
      />
    );

    const listButton = screen.getByLabelText('List view');
    const gridButton = screen.getByLabelText('Grid view');

    // Both buttons should be focusable (buttons are naturally focusable)
    listButton.focus();
    expect(listButton).toHaveFocus();
    
    gridButton.focus();
    expect(gridButton).toHaveFocus();
  });

  it('applies custom className when provided', () => {
    const { container } = render(
      <ViewModeToggle 
        viewMode="list" 
        onViewModeChange={mockOnViewModeChange}
        className="custom-class"
      />
    );

    const toggleContainer = container.firstChild;
    expect(toggleContainer).toHaveClass('custom-class');
  });
});