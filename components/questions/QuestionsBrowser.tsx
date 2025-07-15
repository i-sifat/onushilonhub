'use client';

import { useState, useEffect, useMemo } from 'react';
import { useSearchParams } from 'next/navigation';
import SearchInput from '@/components/common/SearchInput';
import QuestionsFilterBar from '@/components/questions/QuestionsFilterBar';
import QuestionsDisplay from '@/components/questions/QuestionsDisplay';
import { Loader2 } from 'lucide-react';
import { getQuestions, searchQuestions, Question } from '@/lib/content-loader';

interface QuestionsBrowserProps {
  level: 'hsc' | 'ssc';
  topic: string;
  availableYears: number[];
  availableBoards: string[];
}

export default function QuestionsBrowser({ 
  level, 
  topic, 
  availableYears, 
  availableBoards 
}: QuestionsBrowserProps) {
  const searchParams = useSearchParams();
  const [questions, setQuestions] = useState<Question[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState<{
    year?: number;
    board?: string;
  }>({});

  // Initialize filters from URL params
  useEffect(() => {
    const initialFilters: typeof filters = {};
    
    if (searchParams.get('year')) {
      const year = parseInt(searchParams.get('year')!);
      if (!isNaN(year)) {
        initialFilters.year = year;
      }
    }
    if (searchParams.get('board')) {
      initialFilters.board = searchParams.get('board')!;
    }
    
    setFilters(initialFilters);
  }, [searchParams]);

  // Load questions when filters change
  useEffect(() => {
    const loadQuestions = async () => {
      setLoading(true);
      
      try {
        let result: Question[];
        
        if (searchTerm.trim()) {
          result = await searchQuestions(level, topic, searchTerm, filters.year, filters.board);
        } else {
          result = await getQuestions(level, topic, filters.year, filters.board);
        }
        
        setQuestions(result);
      } catch (error) {
        console.error('Error loading questions:', error);
        setQuestions([]);
      } finally {
        setLoading(false);
      }
    };

    loadQuestions();
  }, [level, topic, filters, searchTerm]);

  const handleFiltersChange = (newFilters: typeof filters) => {
    setFilters(newFilters);
    
    // Update URL params
    const params = new URLSearchParams();
    if (newFilters.year) params.set('year', newFilters.year.toString());
    if (newFilters.board) params.set('board', newFilters.board);
    
    const newUrl = `${window.location.pathname}${params.toString() ? '?' + params.toString() : ''}`;
    window.history.replaceState({}, '', newUrl);
  };

  // Get filtered boards based on selected year
  const filteredBoards = useMemo(() => {
    if (!filters.year) return availableBoards;
    
    // Get boards available for the selected year
    const yearQuestions = getQuestions(level, topic, filters.year);
    const yearBoards = new Set(yearQuestions.map(q => q.board).filter(Boolean));
    
    return availableBoards.filter(board => yearBoards.has(board));
  }, [availableBoards, filters.year, level, topic]);

  return (
    <>
      {/* Search */}
      <div className="mb-6">
        <SearchInput
          placeholder={`Search ${topic} questions...`}
          value={searchTerm}
          onChange={setSearchTerm}
        />
      </div>

      {/* Filters */}
      <QuestionsFilterBar
        availableYears={availableYears}
        availableBoards={filteredBoards}
        filters={filters}
        onFiltersChange={handleFiltersChange}
      />

      {/* Loading State */}
      {loading && (
        <div className="flex items-center justify-center py-12">
          <Loader2 className="h-8 w-8 animate-spin text-sf-button" />
          <span className="ml-2 text-sf-text-subtle">Loading questions...</span>
        </div>
      )}

      {/* Questions Display */}
      {!loading && (
        <QuestionsDisplay
          questions={questions}
          level={level}
          topic={topic}
          searchTerm={searchTerm}
          filters={filters}
        />
      )}
    </>
  );
}