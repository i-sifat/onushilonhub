'use client';

import { Search, Filter, RotateCcw } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

interface QuestionFilterProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  selectedBoard: string;
  onBoardChange: (value: string) => void;
  selectedYear: string;
  onYearChange: (value: string) => void;
  boards: string[];
  years: string[];
  onClearFilters: () => void;
  className?: string;
}

export default function QuestionFilter({
  searchTerm,
  onSearchChange,
  selectedBoard,
  onBoardChange,
  selectedYear,
  onYearChange,
  boards,
  years,
  onClearFilters,
  className = ''
}: QuestionFilterProps) {
  const hasActiveFilters = searchTerm || selectedBoard !== 'All Boards' || selectedYear !== 'All Years';

  return (
    <div className={`bg-sf-bg border border-sf-text-muted/20 rounded-lg p-6 ${className}`}>
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          <Filter className="h-5 w-5 text-sf-button" />
          <h3 className="text-lg font-semibold text-sf-text-bold">Filter Questions</h3>
        </div>
        {hasActiveFilters && (
          <button
            onClick={onClearFilters}
            className="flex items-center space-x-1 text-sf-text-muted hover:text-sf-button transition-colors text-sm"
          >
            <RotateCcw className="h-4 w-4" />
            <span>Clear All</span>
          </button>
        )}
      </div>

      <div className="grid md:grid-cols-3 gap-4">
        {/* Search */}
        <div>
          <label className="block text-sm font-medium text-sf-text-subtle mb-2">
            Search Questions
          </label>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-sf-text-muted" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="Search in questions..."
              className="w-full pl-10 pr-4 py-2 border border-sf-text-muted/20 rounded-lg bg-sf-bg text-sf-text-subtle focus:outline-none focus:ring-2 focus:ring-sf-button focus:border-transparent"
            />
          </div>
        </div>

        {/* Board Filter */}
        <div>
          <label className="block text-sm font-medium text-sf-text-subtle mb-2">
            Board
          </label>
          <select
            value={selectedBoard}
            onChange={(e) => onBoardChange(e.target.value)}
            className="w-full px-3 py-2 border border-sf-text-muted/20 rounded-lg bg-sf-bg text-sf-text-subtle focus:outline-none focus:ring-2 focus:ring-sf-button focus:border-transparent"
          >
            {boards.map(board => (
              <option key={board} value={board}>{board}</option>
            ))}
          </select>
        </div>

        {/* Year Filter */}
        <div>
          <label className="block text-sm font-medium text-sf-text-subtle mb-2">
            Year
          </label>
          <select
            value={selectedYear}
            onChange={(e) => onYearChange(e.target.value)}
            className="w-full px-3 py-2 border border-sf-text-muted/20 rounded-lg bg-sf-bg text-sf-text-subtle focus:outline-none focus:ring-2 focus:ring-sf-button focus:border-transparent"
          >
            {years.map(year => (
              <option key={year} value={year}>{year}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Active Filters Display */}
      {hasActiveFilters && (
        <div className="mt-4 pt-4 border-t border-sf-text-muted/20">
          <div className="flex flex-wrap gap-2">
            <span className="text-sm text-sf-text-muted">Active filters:</span>
            {searchTerm && (
              <Badge variant="secondary" className="bg-sf-button/20 text-sf-button">
                Search: "{searchTerm}"
              </Badge>
            )}
            {selectedBoard !== 'All Boards' && (
              <Badge variant="secondary" className="bg-sf-button/20 text-sf-button">
                Board: {selectedBoard}
              </Badge>
            )}
            {selectedYear !== 'All Years' && (
              <Badge variant="secondary" className="bg-sf-button/20 text-sf-button">
                Year: {selectedYear}
              </Badge>
            )}
          </div>
        </div>
      )}
    </div>
  );
}