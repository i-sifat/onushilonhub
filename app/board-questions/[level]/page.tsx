'use client';

import { useState, useEffect, use } from 'react';
import { useSearchParams } from 'next/navigation';
import BackButton from '@/components/common/BackButton';
import SearchInput from '@/components/common/SearchInput';
import FilterBar from '@/components/questions/FilterBar';
import QuestionList from '@/components/questions/QuestionList';
import { FileText, Loader2 } from 'lucide-react';

// Required for static export
export function generateStaticParams() {
  return [
    { level: 'hsc' },
    { level: 'ssc' }
  ];
}

interface Question {
  id: string;
  topic: string;
  question: string;
  answer?: string;
  marks?: number;
  difficulty?: 'easy' | 'medium' | 'hard';
}

export default function QuestionsPage({ params }: { params: Promise<{ level: string }> }) {
  const resolvedParams = use(params);
  const searchParams = useSearchParams();
  const level = resolvedParams.level as 'hsc' | 'ssc';
  
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

  if (!['hsc', 'ssc'].includes(level)) {
    return (
      <div className="min-h-screen bg-sf-bg pt-20 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-sf-text-bold mb-4">Invalid Level</h1>
          <p className="text-sf-text-subtle">Please select either HSC or SSC level.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-sf-bg pt-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back Button */}
        <div className="mb-6">
          <BackButton />
        </div>
        
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center space-x-3 mb-4">
            <div className="p-2 bg-sf-button/20 rounded-lg">
              <FileText className="h-6 w-6 text-sf-button" />
            </div>
            <h1 className="text-3xl font-bold text-sf-text-bold">
              {level.toUpperCase()} Board Questions
            </h1>
          </div>
          <p className="text-sf-text-subtle">
            Search and filter through thousands of board questions to find exactly what you need for your preparation.
          </p>
        </div>

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
      </div>
    </div>
  );
}