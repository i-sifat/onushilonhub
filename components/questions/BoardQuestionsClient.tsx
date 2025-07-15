'use client';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import SearchInput from '@/components/common/SearchInput';
import FilterBar from '@/components/questions/FilterBar';
import QuestionList from '@/components/questions/QuestionList';
import { Loader2 } from 'lucide-react';

interface Question {
  id: string;
  topic: string;
  question: string;
  answer?: string;
  marks?: number;
  difficulty?: 'easy' | 'medium' | 'hard';
}

interface BoardQuestionsClientProps {
  level: 'hsc' | 'ssc';
}

export default function BoardQuestionsClient({ level }: BoardQuestionsClientProps) {
  const searchParams = useSearchParams();
  const [questions, setQuestions] = useState<Question[]>([]);
  const [metadata, setMetadata] = useState<{ board: string; year: number }[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState<{
    topic?: string;
    board?: string;
    year?: number;
  }>({});

  // Available options for filters (these would normally come from scanning the content directory)
  const availableTopics = [
    'tense', 'voice', 'narration', 'modifiers', 'articles', 'prepositions',
    'conditionals', 'clauses', 'completing-sentence', 'right-form-of-verbs',
    'transformation', 'punctuation'
  ];

  const availableBoards = [
    'dhaka', 'rajshahi', 'chittagong', 'sylhet', 'barisal', 'comilla', 'jessore', 'dinajpur'
  ];

  const availableYears = Array.from({ length: 10 }, (_, i) => 2025 - i);

  // Initialize filters from URL params
  useEffect(() => {
    const initialFilters: typeof filters = {};
    
    if (searchParams.get('topic')) {
      initialFilters.topic = searchParams.get('topic')!;
    }
    if (searchParams.get('board')) {
      initialFilters.board = searchParams.get('board')!;
    }
    if (searchParams.get('year')) {
      initialFilters.year = parseInt(searchParams.get('year')!);
    }
    
    setFilters(initialFilters);
  }, [searchParams]);

  // Simulate loading questions (in real app, this would fetch from API or read files)
  useEffect(() => {
    const loadQuestions = async () => {
      setLoading(true);
      
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // This is where you would normally call your API or read from files
      // For now, we'll show placeholder data
      setQuestions([]);
      setMetadata([]);
      setLoading(false);
    };

    loadQuestions();
  }, [level, filters, searchTerm]);

  const handleFiltersChange = (newFilters: typeof filters) => {
    setFilters(newFilters);
    
    // Update URL params
    const params = new URLSearchParams();
    if (newFilters.topic) params.set('topic', newFilters.topic);
    if (newFilters.board) params.set('board', newFilters.board);
    if (newFilters.year) params.set('year', newFilters.year.toString());
    
    const newUrl = `${window.location.pathname}${params.toString() ? '?' + params.toString() : ''}`;
    window.history.replaceState({}, '', newUrl);
  };

  return (
    <>
      {/* Search */}
      <div className="mb-6">
        <SearchInput
          placeholder={`Search ${level.toUpperCase()} questions...`}
          value={searchTerm}
          onChange={setSearchTerm}
        />
      </div>

      {/* Filters */}
      <FilterBar
        level={level}
        availableTopics={availableTopics}
        availableBoards={availableBoards}
        availableYears={availableYears}
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

      {/* Questions List */}
      {!loading && (
        <QuestionList
          questions={questions}
          metadata={metadata}
          level={level}
        />
      )}

      {/* Upload Instructions */}
      {!loading && questions.length === 0 && (
        <div className="mt-8 bg-sf-highlight/10 rounded-lg p-6 border border-sf-button/20">
          <h3 className="text-lg font-semibold text-sf-text-bold mb-2">
            Ready to Add Questions?
          </h3>
          <p className="text-sf-text-subtle mb-4">
            To populate this section with real board questions, upload your JSON files to:
          </p>
          <code className="block bg-sf-bg border border-sf-text-muted/20 rounded p-3 text-sm text-sf-text-subtle">
            /content/questions/{level}/[year]/[board].json
          </code>
          <p className="text-sf-text-muted text-sm mt-2">
            Example: <code>/content/questions/{level}/2024/dhaka.json</code>
          </p>
        </div>
      )}
    </>
  );
}