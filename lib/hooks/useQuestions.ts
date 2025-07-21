// Custom React hook for questions data management
'use client';

import { useState, useEffect, useMemo, useCallback } from 'react';
import { 
  Question, 
  QuestionLevel, 
  QuestionTopicSlug, 
  QuestionBoard,
  QuestionDifficulty,
  QuestionFilter,
  QuestionStats
} from '@/types/question.types';
import { 
  filterQuestions,
  searchQuestions,
  sortQuestions,
  getQuestionStats,
  groupQuestions,
  calculateQuestionScore
} from '@/lib/utils/question-helpers';
import { questionsData } from '@/data/questions';

interface UseQuestionsOptions {
  topic?: QuestionTopicSlug;
  level?: QuestionLevel;
  board?: QuestionBoard;
  year?: number;
  difficulty?: QuestionDifficulty;
  searchQuery?: string;
  sortBy?: 'id' | 'year' | 'board' | 'difficulty' | 'level' | 'topic';
  sortOrder?: 'asc' | 'desc';
  autoFetch?: boolean;
  pageSize?: number;
}

interface UseQuestionsReturn {
  // Data
  questions: Question[];
  allQuestions: Question[];
  loading: boolean;
  error: string | null;
  
  // Filtering and search
  filteredQuestions: Question[];
  filter: QuestionFilter;
  setFilter: (filter: Partial<QuestionFilter>) => void;
  resetFilter: () => void;
  
  // Search
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  
  // Sorting
  sortBy: 'id' | 'year' | 'board' | 'difficulty' | 'level' | 'topic';
  setSortBy: (sortBy: 'id' | 'year' | 'board' | 'difficulty' | 'level' | 'topic') => void;
  sortOrder: 'asc' | 'desc';
  setSortOrder: (order: 'asc' | 'desc') => void;
  
  // Pagination
  currentPage: number;
  setCurrentPage: (page: number) => void;
  pageSize: number;
  setPageSize: (size: number) => void;
  totalPages: number;
  paginatedQuestions: Question[];
  
  // Statistics
  stats: QuestionStats;
  
  // Grouping
  groupedQuestions: Record<string, Question[]>;
  setGroupBy: (field: keyof Question) => void;
  
  // Actions
  getQuestionById: (id: string) => Question | undefined;
  getQuestionsByTopic: (topic: QuestionTopicSlug) => Question[];
  getQuestionsByLevel: (level: QuestionLevel) => Question[];
  getQuestionsByBoard: (board: QuestionBoard) => Question[];
  getQuestionsByYear: (year: number) => Question[];
  searchQuestions: (query: string) => Question[];
  
  // Answer management
  userAnswers: Record<string, string>;
  setUserAnswer: (questionId: string, answer: string) => void;
  getUserAnswer: (questionId: string) => string;
  clearUserAnswers: () => void;
  calculateScore: (questionId: string) => ReturnType<typeof calculateQuestionScore> | null;
  
  // Utility
  refresh: () => void;
  getAvailableOptions: () => {
    topics: QuestionTopicSlug[];
    levels: QuestionLevel[];
    boards: QuestionBoard[];
    years: number[];
    difficulties: QuestionDifficulty[];
  };
}

export function useQuestions(options: UseQuestionsOptions = {}): UseQuestionsReturn {
  const {
    topic: initialTopic,
    level: initialLevel,
    board: initialBoard,
    year: initialYear,
    difficulty: initialDifficulty,
    searchQuery: initialSearchQuery = '',
    sortBy: initialSortBy = 'id',
    sortOrder: initialSortOrder = 'asc',
    autoFetch = true,
    pageSize: initialPageSize = 20
  } = options;

  // State management
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState(initialSearchQuery);
  const [sortBy, setSortBy] = useState<'id' | 'year' | 'board' | 'difficulty' | 'level' | 'topic'>(initialSortBy);
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>(initialSortOrder);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(initialPageSize);
  const [groupBy, setGroupBy] = useState<keyof Question>('topic');
  const [userAnswers, setUserAnswers] = useState<Record<string, string>>({});

  // Filter state
  const [filter, setFilterState] = useState<QuestionFilter>({
    topic: initialTopic,
    level: initialLevel,
    board: initialBoard,
    year: initialYear,
    difficulty: initialDifficulty,
    searchQuery: initialSearchQuery
  });

  // Get all questions from static data
  const allQuestions = useMemo(() => {
    try {
      return Object.values(questionsData).flatMap(data => data.questions);
    } catch (err) {
      setError('Failed to load questions');
      return [];
    }
  }, []);

  // Apply filters and search
  const filteredQuestions = useMemo(() => {
    let filtered = [...allQuestions];

    // Apply filter
    filtered = filterQuestions(filtered, { ...filter, searchQuery });

    // Apply sorting
    filtered = sortQuestions(filtered, sortBy, sortOrder);

    return filtered;
  }, [allQuestions, filter, searchQuery, sortBy, sortOrder]);

  // Current questions (alias for filteredQuestions)
  const questions = filteredQuestions;

  // Pagination
  const totalPages = Math.ceil(filteredQuestions.length / pageSize);
  const paginatedQuestions = useMemo(() => {
    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    return filteredQuestions.slice(startIndex, endIndex);
  }, [filteredQuestions, currentPage, pageSize]);

  // Statistics
  const stats = useMemo(() => {
    return getQuestionStats(filteredQuestions);
  }, [filteredQuestions]);

  // Grouping
  const groupedQuestions = useMemo(() => {
    return groupQuestions(filteredQuestions, groupBy);
  }, [filteredQuestions, groupBy]);

  // Filter management
  const setFilter = useCallback((newFilter: Partial<QuestionFilter>) => {
    setFilterState(prev => ({ ...prev, ...newFilter }));
    setCurrentPage(1); // Reset to first page when filter changes
  }, []);

  const resetFilter = useCallback(() => {
    setFilterState({});
    setSearchQuery('');
    setCurrentPage(1);
  }, []);

  // Action functions
  const getQuestionById = useCallback((id: string): Question | undefined => {
    return allQuestions.find(question => question.id === id);
  }, [allQuestions]);

  const getQuestionsByTopic = useCallback((topic: QuestionTopicSlug): Question[] => {
    return allQuestions.filter(question => question.topic === topic);
  }, [allQuestions]);

  const getQuestionsByLevel = useCallback((level: QuestionLevel): Question[] => {
    return allQuestions.filter(question => question.level === level);
  }, [allQuestions]);

  const getQuestionsByBoard = useCallback((board: QuestionBoard): Question[] => {
    return allQuestions.filter(question => question.board === board);
  }, [allQuestions]);

  const getQuestionsByYear = useCallback((year: number): Question[] => {
    return allQuestions.filter(question => question.year === year);
  }, [allQuestions]);

  const searchQuestionsFunc = useCallback((query: string): Question[] => {
    return searchQuestions(allQuestions, query);
  }, [allQuestions]);

  // Answer management
  const setUserAnswer = useCallback((questionId: string, answer: string) => {
    setUserAnswers(prev => ({ ...prev, [questionId]: answer }));
  }, []);

  const getUserAnswer = useCallback((questionId: string): string => {
    return userAnswers[questionId] || '';
  }, [userAnswers]);

  const clearUserAnswers = useCallback(() => {
    setUserAnswers({});
  }, []);

  const calculateScore = useCallback((questionId: string) => {
    const question = getQuestionById(questionId);
    const userAnswer = getUserAnswer(questionId);
    
    if (!question || !userAnswer) {
      return null;
    }
    
    return calculateQuestionScore(question, userAnswer);
  }, [getQuestionById, getUserAnswer]);

  // Utility functions
  const refresh = useCallback(() => {
    setLoading(true);
    setError(null);
    
    // Simulate refresh (since we're using static data)
    setTimeout(() => {
      setLoading(false);
    }, 100);
  }, []);

  const getAvailableOptions = useCallback(() => {
    const topics = [...new Set(allQuestions.filter(q => q.topic).map(q => q.topic!))] as QuestionTopicSlug[];
    const levels = [...new Set(allQuestions.filter(q => q.level).map(q => q.level!))] as QuestionLevel[];
    const boards = [...new Set(allQuestions.filter(q => q.board).map(q => q.board!))] as QuestionBoard[];
    const years = [...new Set(allQuestions.filter(q => q.year).map(q => q.year!))].sort((a, b) => b - a);
    const difficulties = [...new Set(allQuestions.filter(q => q.difficulty).map(q => q.difficulty!))] as QuestionDifficulty[];

    return { topics, levels, boards, years, difficulties };
  }, [allQuestions]);

  // Auto-fetch effect
  useEffect(() => {
    if (autoFetch) {
      setLoading(true);
      
      // Simulate loading time for static data
      const timer = setTimeout(() => {
        setLoading(false);
      }, 100);

      return () => clearTimeout(timer);
    }
  }, [autoFetch]);

  // Reset page when filters change
  useEffect(() => {
    setCurrentPage(1);
  }, [filter, searchQuery]);

  return {
    // Data
    questions,
    allQuestions,
    loading,
    error,
    
    // Filtering and search
    filteredQuestions,
    filter,
    setFilter,
    resetFilter,
    
    // Search
    searchQuery,
    setSearchQuery,
    
    // Sorting
    sortBy,
    setSortBy,
    sortOrder,
    setSortOrder,
    
    // Pagination
    currentPage,
    setCurrentPage,
    pageSize,
    setPageSize,
    totalPages,
    paginatedQuestions,
    
    // Statistics
    stats,
    
    // Grouping
    groupedQuestions,
    setGroupBy,
    
    // Actions
    getQuestionById,
    getQuestionsByTopic,
    getQuestionsByLevel,
    getQuestionsByBoard,
    getQuestionsByYear,
    searchQuestions: searchQuestionsFunc,
    
    // Answer management
    userAnswers,
    setUserAnswer,
    getUserAnswer,
    clearUserAnswers,
    calculateScore,
    
    // Utility
    refresh,
    getAvailableOptions
  };
}

// Specialized hook for a specific topic
export function useQuestionsByTopic(topic: QuestionTopicSlug) {
  return useQuestions({ topic });
}

// Specialized hook for a specific level
export function useQuestionsByLevel(level: QuestionLevel) {
  return useQuestions({ level });
}

// Specialized hook for a specific board and year
export function useQuestionsByBoardAndYear(board: QuestionBoard, year: number) {
  return useQuestions({ board, year });
}

// Hook for getting a single question by ID
export function useQuestion(id: string) {
  const { getQuestionById, loading, error } = useQuestions({ autoFetch: false });
  
  const question = useMemo(() => {
    return getQuestionById(id);
  }, [getQuestionById, id]);

  return {
    question,
    loading,
    error,
    exists: !!question
  };
}

// Hook for question practice/quiz functionality
export function useQuestionPractice(questions: Question[]) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState<Record<string, string>>({});
  const [showAnswers, setShowAnswers] = useState(false);

  const currentQuestion = questions[currentIndex];
  const isLastQuestion = currentIndex === questions.length - 1;
  const isFirstQuestion = currentIndex === 0;

  const nextQuestion = useCallback(() => {
    if (!isLastQuestion) {
      setCurrentIndex(prev => prev + 1);
    }
  }, [isLastQuestion]);

  const previousQuestion = useCallback(() => {
    if (!isFirstQuestion) {
      setCurrentIndex(prev => prev - 1);
    }
  }, [isFirstQuestion]);

  const goToQuestion = useCallback((index: number) => {
    if (index >= 0 && index < questions.length) {
      setCurrentIndex(index);
    }
  }, [questions.length]);

  const setAnswer = useCallback((answer: string) => {
    if (currentQuestion) {
      setUserAnswers(prev => ({ ...prev, [currentQuestion.id]: answer }));
    }
  }, [currentQuestion]);

  const getAnswer = useCallback((questionId: string) => {
    return userAnswers[questionId] || '';
  }, [userAnswers]);

  const calculateTotalScore = useCallback(() => {
    let totalScore = 0;
    let maxScore = 0;

    questions.forEach(question => {
      const userAnswer = userAnswers[question.id];
      if (userAnswer) {
        const score = calculateQuestionScore(question, userAnswer);
        totalScore += score.score;
        maxScore += score.maxScore;
      } else {
        maxScore += question.marks || 1;
      }
    });

    return { totalScore, maxScore, percentage: maxScore > 0 ? (totalScore / maxScore) * 100 : 0 };
  }, [questions, userAnswers]);

  const reset = useCallback(() => {
    setCurrentIndex(0);
    setUserAnswers({});
    setShowAnswers(false);
  }, []);

  return {
    currentQuestion,
    currentIndex,
    totalQuestions: questions.length,
    isLastQuestion,
    isFirstQuestion,
    nextQuestion,
    previousQuestion,
    goToQuestion,
    setAnswer,
    getAnswer,
    userAnswers,
    showAnswers,
    setShowAnswers,
    calculateTotalScore,
    reset
  };
}