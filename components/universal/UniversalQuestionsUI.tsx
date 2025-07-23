'use client';

import { useState, useMemo, useCallback } from 'react';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  Search, 
  Filter, 
  Calendar, 
  MapPin, 
  BookOpen, 
  RotateCcw, 
  EyeOff,
  Eye,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import { ViewModeToggle, ViewMode } from '@/components/ui/view-mode-toggle';
import { Question, QuestionTopicSlug, QuestionBoard, QuestionDifficulty } from '@/types/question.types';

interface UniversalQuestionsUIProps {
  topic: string;
  topicSlug: QuestionTopicSlug;
  questions: Question[];
  level?: 'HSC' | 'SSC';
  showPagination?: boolean;
  itemsPerPage?: number;
}

interface FilterConfiguration {
  showQuestionTypeFilter: boolean;
  availableBoards: string[];
  availableYears: string[];
}

interface FilterState {
  searchTerm: string;
  selectedBoard: string;
  selectedYear: string;
  selectedQuestionType: string;
}

const BOARDS = [
  'All Boards', 'Dhaka', 'Chattogram', 'Rajshahi', 'Sylhet', 
  'Barishal', 'Rangpur', 'Mymensingh', 'Cumilla', 'Dinajpur', 'Jashore'
];

const YEARS = [
  'All Years', '2024', '2023', '2022', '2021', '2020', 
  '2019', '2018', '2017', '2016', '2015'
];

const QUESTION_TYPES = [
  'All Types', 'Passage', 'Direct Question', 'Transformation', 
  'Narration', 'Multiple Choice', 'Fill in Blanks'
];

// Filter configuration for topic-specific pages
const getFilterConfiguration = (topicSlug: QuestionTopicSlug): FilterConfiguration => {
  const topicSpecificPages: QuestionTopicSlug[] = [
    'transformation', 
    'connectors', 
    'modifier', 
    'narration', 
    'completing-sentence', 
    'use-of-verbs'
  ];
  
  return {
    showQuestionTypeFilter: !topicSpecificPages.includes(topicSlug),
    availableBoards: BOARDS,
    availableYears: YEARS
  };
};

export default function UniversalQuestionsUI({ 
  topic, 
  topicSlug, 
  questions, 
  level = 'HSC',
  showPagination = true,
  itemsPerPage = 10
}: UniversalQuestionsUIProps) {
  const [showAnswers, setShowAnswers] = useState<{[key: string]: boolean}>({});
  const [currentPage, setCurrentPage] = useState(1);
  const [viewMode, setViewMode] = useState<ViewMode>('list');
  const [filters, setFilters] = useState<FilterState>({
    searchTerm: '',
    selectedBoard: 'All Boards',
    selectedYear: 'All Years',
    selectedQuestionType: 'All Types'
  });

  // Get filter configuration for current topic
  const filterConfig = useMemo(() => getFilterConfiguration(topicSlug), [topicSlug]);

  // Update filter state
  const updateFilter = useCallback((key: keyof FilterState, value: string) => {
    setFilters(prev => ({ ...prev, [key]: value }));
    setCurrentPage(1); // Reset to first page when filtering
  }, []);

  // Determine question type
  const getQuestionType = useCallback((question: Question) => {
    const questionAny = question as any;
    
    if (question.passage && question.blanks) return 'Passage';
    if (questionAny.directSpeech && questionAny.indirectSpeech) return 'Narration';
    if (questionAny.sentence && questionAny.transformedSentence) return 'Transformation';
    if (question.answer) return 'Direct Question';
    if (question.blanks) return 'Fill in Blanks';
    
    return 'Direct Question';
  }, []);

  // Filter questions based on all criteria
  const filteredQuestions = useMemo(() => {
    return questions.filter(question => {
      // Search filter
      const matchesSearch = !filters.searchTerm || 
        question.question?.toLowerCase().includes(filters.searchTerm.toLowerCase()) ||
        question.passage?.toLowerCase().includes(filters.searchTerm.toLowerCase()) ||
        (question as any).directSpeech?.toLowerCase().includes(filters.searchTerm.toLowerCase()) ||
        (question as any).indirectSpeech?.toLowerCase().includes(filters.searchTerm.toLowerCase());

      // Board filter
      const matchesBoard = filters.selectedBoard === 'All Boards' || 
        question.board?.toLowerCase().includes(filters.selectedBoard.toLowerCase()) ||
        question.id?.toLowerCase().includes(filters.selectedBoard.toLowerCase());

      // Year filter
      const matchesYear = filters.selectedYear === 'All Years' || 
        question.year?.toString() === filters.selectedYear ||
        question.id?.includes(filters.selectedYear);



      // Question type filter - only apply if showQuestionTypeFilter is true
      let matchesType = true;
      if (filterConfig.showQuestionTypeFilter) {
        const questionType = getQuestionType(question);
        matchesType = filters.selectedQuestionType === 'All Types' ||
          questionType === filters.selectedQuestionType;
      }

      return matchesSearch && matchesBoard && matchesYear && matchesType;
    });
  }, [questions, filters, getQuestionType, filterConfig.showQuestionTypeFilter]);

  // Pagination
  const totalPages = Math.ceil(filteredQuestions.length / itemsPerPage);
  const paginatedQuestions = useMemo(() => {
    if (!showPagination) return filteredQuestions;
    
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return filteredQuestions.slice(startIndex, endIndex);
  }, [filteredQuestions, currentPage, itemsPerPage, showPagination]);

  // Clear all filters
  const clearFilters = useCallback(() => {
    setFilters({
      searchTerm: '',
      selectedBoard: 'All Boards',
      selectedYear: 'All Years',
      selectedQuestionType: 'All Types'
    });
    setCurrentPage(1);
  }, []);

  // Check if any filters are active
  const hasActiveFilters = useMemo(() => {
    const baseFiltersActive = filters.searchTerm || 
           filters.selectedBoard !== 'All Boards' || 
           filters.selectedYear !== 'All Years';
    
    const questionTypeFilterActive = filterConfig.showQuestionTypeFilter && 
           filters.selectedQuestionType !== 'All Types';
    
    return baseFiltersActive || questionTypeFilterActive;
  }, [filters, filterConfig.showQuestionTypeFilter]);

  // Get question metadata from ID
  const getQuestionMetadata = useCallback((questionId: string) => {
    const parts = questionId.split('-');
    return {
      board: parts[0] ? parts[0].charAt(0).toUpperCase() + parts[0].slice(1) : 'Sample',
      year: parts[1] || '2024',
      questionNumber: parts[2] || ''
    };
  }, []);

  // Toggle answer visibility
  const toggleAnswer = useCallback((questionId: string, blankId?: string) => {
    const key = blankId ? `${questionId}-${blankId}` : questionId;
    setShowAnswers(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  }, []);

  // Render question content based on type
  const renderQuestionContent = useCallback((question: Question) => {
    const questionAny = question as any;

    // Handle passage with blanks
    if (question.passage && question.blanks) {
      let passageWithBlanks = question.passage;
      
      question.blanks.forEach((blank: any) => {
        const key = `${question.id}-${blank.id}`;
        const isAnswerVisible = showAnswers[key];
        const blankPattern = new RegExp(`\\[${blank.id}\\]`, 'g');
        
        const answer = blank.ans || blank.answer || '';
        const blankElement = isAnswerVisible 
          ? `<span class="inline-flex items-center bg-success-500/20 text-success-600 border border-success-500/30 px-2 py-1 rounded text-sm font-medium cursor-pointer hover:bg-success-500/30 hover:text-success-700 hover:border-success-500/50 hover:scale-105 hover:-translate-y-0.5 hover:shadow-sm hover:shadow-success-500/10 transition-all duration-200 ease-out active:scale-95" data-blank="${blank.id}" data-question="${question.id}">${answer}</span>`
          : `<span class="inline-flex items-center bg-sf-button/20 text-sf-button border border-sf-button/30 px-2 py-1 rounded text-sm font-medium cursor-pointer hover:bg-sf-button/30 hover:text-sf-button hover:border-sf-button/50 hover:scale-105 hover:-translate-y-0.5 hover:shadow-sm hover:shadow-sf-button/10 transition-all duration-200 ease-out active:scale-95" data-blank="${blank.id}" data-question="${question.id}">[${blank.id}]</span>`;
        
        passageWithBlanks = passageWithBlanks.replace(blankPattern, blankElement);
      });

      return (
        <div className="space-y-4">
          <div>
            <h4 className="text-md font-semibold text-sf-text-bold mb-3">Passage:</h4>
            <div 
              className="text-sf-text-subtle leading-relaxed cursor-pointer"
              dangerouslySetInnerHTML={{ __html: passageWithBlanks }}
              onClick={(e) => {
                const target = e.target as HTMLElement;
                const blankId = target.getAttribute('data-blank');
                const questionId = target.getAttribute('data-question');
                if (blankId && questionId) {
                  toggleAnswer(questionId, blankId);
                }
              }}
            />
          </div>
          
          <div className="text-xs text-sf-text-muted">
            <p>💡 Click on any blank to reveal the answer</p>
          </div>
        </div>
      );
    }

    // Handle narration questions
    if (questionAny.directSpeech && questionAny.indirectSpeech) {
      return (
        <div className="space-y-3">
          <p className="text-sf-text-subtle text-sm leading-relaxed">
            <span className="font-medium">Question:</span> {question.question}
          </p>
          
          <div className="grid grid-cols-1 gap-2">
            <div className="bg-blue-500/10 border-l-4 border-blue-500 p-3 rounded-r-lg">
              <p className="text-xs font-medium text-blue-400 mb-1">Direct Speech:</p>
              <p className="text-sf-text-subtle text-sm leading-relaxed">
                {questionAny.directSpeech}
              </p>
            </div>
            
            <div className="bg-success-500/10 border-l-4 border-success-500 p-3 rounded-r-lg hover:bg-success-500/15 hover:border-success-600 transition-all duration-200">
              <p className="text-xs font-medium text-success-600 mb-1">Indirect Speech:</p>
              <p className="text-sf-text-subtle text-sm leading-relaxed">
                {questionAny.indirectSpeech}
              </p>
            </div>
          </div>
        </div>
      );
    }

    // Handle transformation questions
    if (questionAny.sentence && questionAny.transformedSentence) {
      return (
        <div className="space-y-3">
          <p className="text-sf-text-subtle text-sm leading-relaxed">
            <span className="font-medium">Transform:</span> {question.question}
          </p>
          
          <div className="grid grid-cols-1 gap-2">
            <div className="bg-orange-500/10 border-l-4 border-orange-500 p-3 rounded-r-lg">
              <p className="text-xs font-medium text-orange-400 mb-1">Original:</p>
              <p className="text-sf-text-subtle text-sm leading-relaxed">
                {questionAny.sentence}
              </p>
            </div>
            
            <div className="bg-success-500/10 border-l-4 border-success-500 p-3 rounded-r-lg hover:bg-success-500/15 hover:border-success-600 transition-all duration-200">
              <p className="text-xs font-medium text-success-600 mb-1">Transformed:</p>
              <p className="text-sf-text-subtle text-sm leading-relaxed">
                {questionAny.transformedSentence}
              </p>
            </div>
          </div>
        </div>
      );
    }

    // Handle simple questions with answers
    if (question.answer) {
      const isAnswerVisible = showAnswers[question.id];
      
      return (
        <div className="space-y-3">
          <p className="text-sf-text-subtle leading-relaxed">
            {question.question}
          </p>
          
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => toggleAnswer(question.id)}
              className="text-xs"
            >
              {isAnswerVisible ? (
                <>
                  <EyeOff className="h-3 w-3 mr-1" />
                  Hide Answer
                </>
              ) : (
                <>
                  <Eye className="h-3 w-3 mr-1" />
                  Show Answer
                </>
              )}
            </Button>
          </div>
          
          {isAnswerVisible && (
            <div className="bg-success-500/10 border-l-4 border-success-500 p-3 rounded-r-lg hover:bg-success-500/15 hover:border-success-600 transition-all duration-200">
              <p className="text-xs font-medium text-success-600 mb-1">Answer:</p>
              <p className="text-sf-text-subtle text-sm leading-relaxed">
                {question.answer}
              </p>
              {question.explanation && (
                <div className="mt-2 pt-2 border-t border-success-500/20">
                  <p className="text-xs font-medium text-success-600 mb-1">Explanation:</p>
                  <p className="text-sf-text-subtle text-xs leading-relaxed">
                    {question.explanation}
                  </p>
                </div>
              )}
            </div>
          )}
        </div>
      );
    }

    // Default simple question format
    return (
      <div className="prose prose-invert max-w-none">
        <p className="text-sf-text-subtle leading-relaxed">
          {question.question}
        </p>
      </div>
    );
  }, [showAnswers, toggleAnswer]);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-sf-text-bold">{topic} Questions</h1>
          <p className="text-sf-text-muted">
            {filteredQuestions.length} of {questions.length} questions • {level} Level
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <Badge variant="secondary" className="bg-sf-button/20 text-sf-button">
            Questions Only
          </Badge>
          <ViewModeToggle 
            viewMode={viewMode} 
            onViewModeChange={setViewMode}
          />
        </div>
      </div>

      {/* Filter Bar */}
      <div className="bg-sf-bg border border-sf-text-muted/20 rounded-lg p-4">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2">
            <Filter className="h-4 w-4 text-sf-button" />
            <h4 className="text-md font-semibold text-sf-text-bold">Filter Questions</h4>
          </div>
          {hasActiveFilters && (
            <Button
              variant="ghost"
              size="sm"
              onClick={clearFilters}
              className="text-sf-text-muted hover:text-sf-button"
            >
              <RotateCcw className="h-3 w-3 mr-1" />
              Clear All
            </Button>
          )}
        </div>

        <div className={`grid gap-3 ${filterConfig.showQuestionTypeFilter ? 'grid-cols-4' : 'grid-cols-3'}`}>
          <div className="relative">
            <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 h-3 w-3 text-sf-text-muted" />
            <input
              type="text"
              value={filters.searchTerm}
              onChange={(e) => updateFilter('searchTerm', e.target.value)}
              placeholder="Search questions..."
              className="w-full pl-6 pr-2 py-2 text-sm border border-sf-text-muted/20 rounded bg-sf-bg text-sf-text-subtle focus:outline-none focus:ring-1 focus:ring-sf-button"
            />
          </div>
          
          <select
            value={filters.selectedBoard}
            onChange={(e) => updateFilter('selectedBoard', e.target.value)}
            className="px-2 py-2 text-sm border border-sf-text-muted/20 rounded bg-sf-bg text-sf-text-subtle focus:outline-none focus:ring-1 focus:ring-sf-button"
          >
            {BOARDS.map(board => (
              <option key={board} value={board}>{board}</option>
            ))}
          </select>
          
          <select
            value={filters.selectedYear}
            onChange={(e) => updateFilter('selectedYear', e.target.value)}
            className="px-2 py-2 text-sm border border-sf-text-muted/20 rounded bg-sf-bg text-sf-text-subtle focus:outline-none focus:ring-1 focus:ring-sf-button"
          >
            {YEARS.map(year => (
              <option key={year} value={year}>{year}</option>
            ))}
          </select>



          {filterConfig.showQuestionTypeFilter && (
            <select
              value={filters.selectedQuestionType}
              onChange={(e) => updateFilter('selectedQuestionType', e.target.value)}
              className="px-2 py-2 text-sm border border-sf-text-muted/20 rounded bg-sf-bg text-sf-text-subtle focus:outline-none focus:ring-1 focus:ring-sf-button"
            >
              {QUESTION_TYPES.map(type => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
          )}
        </div>
      </div>

      {/* Questions List */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h4 className="text-lg font-semibold text-sf-text-bold">
            Questions ({filteredQuestions.length})
          </h4>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setShowAnswers({})}
            className="text-sf-text-muted hover:text-sf-button"
          >
            <EyeOff className="h-3 w-3 mr-1" />
            Hide All Answers
          </Button>
        </div>

        {paginatedQuestions.length === 0 ? (
          <Card className="border-sf-text-muted/20">
            <CardContent className="p-6 text-center">
              <BookOpen className="h-8 w-8 text-sf-text-muted mx-auto mb-2" />
              <h5 className="text-md font-semibold text-sf-text-bold mb-1">No Questions Found</h5>
              <p className="text-sf-text-subtle text-sm">
                Try adjusting your filters to see more questions.
              </p>
            </CardContent>
          </Card>
        ) : (
          <div className={viewMode === 'grid' ? 'grid grid-cols-1 lg:grid-cols-2 gap-4' : 'space-y-4'}>
            {paginatedQuestions.map((question, index) => {
              const metadata = getQuestionMetadata(question.id);
              const globalIndex = showPagination ? (currentPage - 1) * itemsPerPage + index : index;
              
              return (
                <Card 
                  key={question.id} 
                  className="border-sf-text-muted/20 hover:border-sf-button/50 transition-all duration-300"
                >
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center space-x-2">
                        <Badge variant="outline" className="text-sf-button border-sf-button/30 text-xs">
                          Q{globalIndex + 1}
                        </Badge>
                        <Badge 
                          variant="secondary" 
                          className="bg-sf-highlight/20 text-sf-text-bold text-xs"
                        >
                          {getQuestionType(question)}
                        </Badge>
                      </div>
                      <div className="flex items-center space-x-3 text-xs text-sf-text-muted">
                        <div className="flex items-center space-x-1">
                          <MapPin className="h-3 w-3" />
                          <span>{question.board || metadata.board}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Calendar className="h-3 w-3" />
                          <span>{question.year || metadata.year}</span>
                        </div>
                      </div>
                    </div>
                    
                    {renderQuestionContent(question)}
                  </CardContent>
                </Card>
              );
            })}
          </div>
        )}

        {/* Pagination */}
        {showPagination && totalPages > 1 && (
          <div className="flex items-center justify-between">
            <p className="text-sm text-sf-text-muted">
              Showing {((currentPage - 1) * itemsPerPage) + 1} to {Math.min(currentPage * itemsPerPage, filteredQuestions.length)} of {filteredQuestions.length} questions
            </p>
            
            <div className="flex items-center space-x-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                disabled={currentPage === 1}
              >
                <ChevronLeft className="h-4 w-4 mr-1" />
                Previous
              </Button>
              
              <div className="flex items-center space-x-1">
                {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                  const pageNum = i + 1;
                  return (
                    <Button
                      key={pageNum}
                      variant={currentPage === pageNum ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => setCurrentPage(pageNum)}
                      className="w-8 h-8 p-0"
                    >
                      {pageNum}
                    </Button>
                  );
                })}
                {totalPages > 5 && (
                  <>
                    <span className="text-sf-text-muted">...</span>
                    <Button
                      variant={currentPage === totalPages ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => setCurrentPage(totalPages)}
                      className="w-8 h-8 p-0"
                    >
                      {totalPages}
                    </Button>
                  </>
                )}
              </div>
              
              <Button
                variant="outline"
                size="sm"
                onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                disabled={currentPage === totalPages}
              >
                Next
                <ChevronRight className="h-4 w-4 ml-1" />
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}