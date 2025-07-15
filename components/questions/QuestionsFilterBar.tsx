'use client';

import { Filter, RotateCcw } from 'lucide-react';
import { formatBoardName } from '@/lib/content-loader';

interface QuestionsFilterBarProps {
  availableYears: number[];
  availableBoards: string[];
  filters: {
    year?: number;
    board?: string;
  };
  onFiltersChange: (filters: { year?: number; board?: string }) => void;
}

export default function QuestionsFilterBar({
  availableYears,
  availableBoards,
  filters,
  onFiltersChange
}: QuestionsFilterBarProps) {
  const handleFilterChange = (key: string, value: string | number | undefined) => {
    const newFilters = { ...filters };
    if (value === '' || value === undefined) {
      delete newFilters[key as keyof typeof newFilters];
    } else {
      (newFilters as any)[key] = value;
    }
    onFiltersChange(newFilters);
  };

  const clearAllFilters = () => {
    onFiltersChange({});
  };

  const hasActiveFilters = Object.keys(filters).length > 0;

  return (
    <div className="bg-sf-bg border border-sf-text-muted/20 rounded-lg p-4 mb-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          <Filter className="h-5 w-5 text-sf-button" />
          <h3 className="text-lg font-semibold text-sf-text-bold">Filter Questions</h3>
        </div>
        {hasActiveFilters && (
          <button
            onClick={clearAllFilters}
            className="flex items-center space-x-1 text-sf-text-muted hover:text-sf-button transition-colors text-sm"
          >
            <RotateCcw className="h-4 w-4" />
            <span>Clear All</span>
          </button>
        )}
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        {/* Year Filter */}
        <div>
          <label className="block text-sm font-medium text-sf-text-subtle mb-2">
            Year
          </label>
          <select
            value={filters.year ||''}
            onChange={(e) => handleFilterChange('year', e.target.value ? parseInt(e.target.value) : undefined)}
            className="w-full px-3 py-2 border border-sf-text-muted/20 rounded-lg bg-sf-bg text-sf-text-subtle focus:outline-none focus:ring-2 focus:ring-sf-button focus:border-transparent"
          
          >
            <option value="">All Years</option>
            {availableYears.map(year => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </select>
        </div>

        {/* Board Filter */}
        <div>
          <label className="block text-sm font-medium text-sf-text-subtle mb-2">
            Board
          </label>
          <select
            value={filters.board || ''}
            onChange={(e) => handleFilterChange('board', e.target.value)}
            className="w-full px-3 py-2 border border-sf-text-muted/20 rounded-lg bg-sf-bg text-sf-text-subtle focus:outline-none focus:ring-2 focus:ring-sf-button focus:border-transparent"
          >
            <option value="">All Boards</option>
            {availableBoards.map(board => (
              <option key={board} value={board}>
                {formatBoardName(board)}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Active Filters Display */}
      {hasActiveFilters && (
        <div className="mt-4 pt-4 border-t border-sf-text-muted/20">
          <div className="flex flex-wrap gap-2">
            <span className="text-sm text-sf-text-muted">Active filters:</span>
            {filters.year && (
              <span className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-sf-button/20 text-sf-button">
                Year: {filters.year}
                <button
                  onClick={() => handleFilterChange('year', undefined)}
                  className="ml-1 hover:text-sf-button/80"
                >
                  ×
                </button>
              </span>
            )}
            {filters.board && (
              <span className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-sf-button/20 text-sf-button">
                Board: {formatBoardName(filters.board)}
                <button
                  onClick={() => handleFilterChange('board', undefined)}
                  className="ml-1 hover:text-sf-button/80"
                >
                  ×
                </button>
              </span>
            )}
          </div>
        </div>
      )}
    </div>
  );
}