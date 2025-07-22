'use client';

import { Search, Filter, RotateCcw } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

interface SimplifiedFilterProps {
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

const BOARDS = [
  'All Boards', 'Dhaka', 'Chattogram', 'Rajshahi', 'Sylhet', 
  'Barishal', 'Rangpur', 'Mymensingh', 'Cumilla', 'Dinajpur', 'Jashore'
];

const YEARS = [
  'All Years', '2024', '2023', '2022', '2021', '2020', 
  '2019', '2018', '2017', '2016', '2015'
];

export default function SimplifiedFilter({
  searchTerm,
  onSearchChange,
  selectedBoard,
  onBoardChange,
  selectedYear,
  onYearChange,
  boards = BOARDS,
  years = YEARS,
  onClearFilters,
  className = ''
}: SimplifiedFilterProps) {
  const hasActiveFilters = searchTerm || selectedBoard !== 'All Boards' || selectedYear !== 'All Years';

  return (
    <div className={`bg-sf-bg border border-sf-text-muted/20 rounded-lg p-4 ${className}`}>
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          <Filter className="h-4 w-4 text-sf-button" />
          <h4 className="text-md font-semibold text-sf-text-bold">Filter</h4>
        </div>
        {hasActiveFilters && (
          <button
            onClick={onClearFilters}
            className="flex items-center space-x-1 text-sf-text-muted hover:text-sf-button transition-colors text-sm"
          >
            <RotateCcw className="h-3 w-3" />
            <span>Clear All</span>
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        {/* Search */}
        <div className="relative">
          <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 h-3 w-3 text-sf-text-muted" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search..."
            className="w-full pl-6 pr-2 py-2 text-sm border border-sf-text-muted/20 rounded bg-sf-bg text-sf-text-subtle focus:outline-none focus:ring-1 focus:ring-sf-button"
          />
        </div>

        {/* Board Filter */}
        <select
          value={selectedBoard}
          onChange={(e) => onBoardChange(e.target.value)}
          className="px-2 py-2 text-sm border border-sf-text-muted/20 rounded bg-sf-bg text-sf-text-subtle focus:outline-none focus:ring-1 focus:ring-sf-button"
        >
          {boards.map(board => (
            <option key={board} value={board}>{board}</option>
          ))}
        </select>

        {/* Year Filter */}
        <select
          value={selectedYear}
          onChange={(e) => onYearChange(e.target.value)}
          className="px-2 py-2 text-sm border border-sf-text-muted/20 rounded bg-sf-bg text-sf-text-subtle focus:outline-none focus:ring-1 focus:ring-sf-button"
        >
          {years.map(year => (
            <option key={year} value={year}>{year}</option>
          ))}
        </select>
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