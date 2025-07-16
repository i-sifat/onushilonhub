'use client';

import { useState, useEffect, useMemo } from 'react';
import { useSearchParams } from 'next/navigation';
import SearchInput from '@/components/common/SearchInput';
import QuestionsFilterBar from '@/components/questions/QuestionsFilterBar';
import QuestionsDisplay from '@/components/questions/QuestionsDisplay';
import { Loader2 } from 'lucide-react';
import { Question } from '@/types';

interface QuestionsBrowserProps {
  level: 'hsc' | 'ssc';
  topic: string;
  allQuestions: Question[];
}

export default function QuestionsBrowser({ 
  level, 
  topic, 
  allQuestions
}: QuestionsBrowserProps) {
  const searchParams = useSearchParams();
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState<{
    year?: number;
    board?: string;
  }>({});

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

  const filteredQuestions = useMemo(() => {
    let questions = allQuestions;

    if (filters.year) {
      questions = questions.filter(q => q.year === filters.year);
    }
    if (filters.board) {
      questions = questions.filter(q => q.board?.toLowerCase() === filters.board.toLowerCase());
    }

    if (searchTerm.trim()) {
      const searchLower = searchTerm.toLowerCase();
      questions = questions.filter(q => 
        q.question.toLowerCase().includes(searchLower) ||
        q.id.toLowerCase().includes(searchLower)
      );
    }

    return questions;
  }, [allQuestions, filters, searchTerm]);

  const availableYears = useMemo(() => {
    return [...new Set(allQuestions.map(q => q.year).filter(Boolean))] as number[];
  }, [allQuestions]);

  const availableBoards = useMemo(() => {
    return [...new Set(allQuestions.map(q => q.board).filter(Boolean))] as string[];
  }, [allQuestions]);

  const handleFiltersChange = (newFilters: typeof filters) => {
    setFilters(newFilters);
    const params = new URLSearchParams();
    if (newFilters.year) params.set('year', newFilters.year.toString());
    if (newFilters.board) params.set('board', newFilters.board);
    const newUrl = `${window.location.pathname}${params.toString() ? '?' + params.toString() : ''}`;
    window.history.replaceState({}, '', newUrl);
  };

  return (
    <>
      <div className="mb-6">
        <SearchInput
          placeholder={`Search ${topic} questions...`}
          value={searchTerm}
          onChange={setSearchTerm}
        />
      </div>

      <QuestionsFilterBar
        availableYears={availableYears}
        availableBoards={availableBoards}
        filters={filters}
        onFiltersChange={handleFiltersChange}
      />

      <QuestionsDisplay
        questions={filteredQuestions}
        level={level}
        topic={topic}
        searchTerm={searchTerm}
        filters={filters}
      />
    </>
  );
}
