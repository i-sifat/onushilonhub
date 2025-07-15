'use client';

import { useState, useEffect } from 'react';
import { Filter, RotateCcw } from 'lucide-react';

interface FilterBarProps {
  level: 'hsc' | 'ssc';
  availableTopics: string[];
  availableBoards: string[];
  availableYears: number[];
  filters: {
    topic?: string;
    board?: string;
    year?: number;
  };
  onFiltersChange: (filters: { topic?: string; board?: string; year?: number }) => void;
}

export default function FilterBar({
  level,
  availableTopics,
  availableBoards,
  availableYears,
  filters,
  onFiltersChange
}: FilterBarProps) {
  const [isOpen, setIsOpen] = useState(false);

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

  const formatTopicName = (topic: string) => {
    return topic
      .split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };

  const formatBoardName = (board: string) => {
    return board.charAt(0).toUpperCase() + board.slice(1);
  };

  return (
    <div className="bg-sf-bg border border-sf-text-muted/20 rounded-lg p-4 mb-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          <Filter className="h-5 w-5 text-sf-button" />
          <h3 className="text-lg font-semibold text-sf-text-bold">Filter Questions</h3>
        </div>
        <div className="flex items-center space-x-2">
          {hasActiveFilters && (
            <button
              onClick={clearAllFilters}
              className="flex items-center space-x-1 text-sf-text-muted hover:text-sf-button transition-colors text-sm"
            >
              <RotateCcw className="h-4 w-4" />
              <span>Clear All</span>
            </button>
          )}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-sf-button hover:text-sf-button/80 transition-colors"
          >
            {isOpen ? 'Hide Filters' : 'Show Filters'}
          </button>
        </div>
      </div>

      <div className={`grid md:grid-cols-3 gap-4 ${isOpen ? 'block' : 'hidden md:grid'}`}>
        {/* Grammar Topic Filter */}
        <div>
          <label className="block text-sm font-medium text-sf-text-subtle mb-2">
            Grammar Topic
          </label>
          <select
            value={filters.topic || ''}
            onChange={(e) => handleFilterChange('topic', e.target.value)}
            className="w-full px-3 py-2 border border-sf-text-muted/20 rounded-lg bg-sf-bg text-sf-text-subtle focus:outline-none focus:ring-2 focus:ring-sf-button focus:border-transparent"
          >
            <option value="">All Topics</option>
            {availableTopics.map(topic => (
              <option key={topic} value={topic}>
                {formatTopicName(topic)}
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

        {/* Year Filter */}
        <div>
          <label className="block text-sm font-medium text-sf-text-subtle mb-2">
            Year
          </label>
          <select
            value={filters.year || ''}
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
      </div>

      {/* Active Filters Display */}
      {hasActiveFilters && (
        <div className="mt-4 pt-4 border-t border-sf-text-muted/20">
          <div className="flex flex-wrap gap-2">
            <span className="text-sm text-sf-text-muted">Active filters:</span>
            {filters.topic && (
              <span className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-sf-button/20 text-sf-button">
                Topic: {formatTopicName(filters.topic)}
                <button
                  onClick={() => handleFilterChange('topic', undefined)}
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
          </div>
        </div>
      )}
    </div>
  );
}