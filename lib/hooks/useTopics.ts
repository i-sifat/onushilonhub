// Custom React hook for topics configuration management
'use client';

import { useState, useEffect, useMemo, useCallback } from 'react';
import { 
  GrammarLevel, 
  GrammarTopicSlug, 
  GrammarTopic 
} from '@/types/grammar.types';
import { 
  QuestionLevel, 
  QuestionTopicSlug 
} from '@/types/question.types';
import { grammarRulesData } from '@/data/grammar-rules';
import { questionsData } from '@/data/questions';

// Topic configuration interface
export interface TopicConfig {
  id: string;
  name: string;
  slug: GrammarTopicSlug | QuestionTopicSlug;
  description: string;
  level: GrammarLevel | QuestionLevel;
  order: number;
  isActive: boolean;
  ruleCount: number;
  questionCount: number;
  category: 'grammar' | 'questions' | 'both';
  icon?: string;
  color?: string;
  difficulty?: 'EASY' | 'MEDIUM' | 'HARD';
}

interface UseTopicsOptions {
  level?: GrammarLevel | QuestionLevel;
  category?: 'grammar' | 'questions' | 'both';
  includeInactive?: boolean;
  sortBy?: 'order' | 'name' | 'ruleCount' | 'questionCount';
  sortOrder?: 'asc' | 'desc';
}

interface UseTopicsReturn {
  // Data
  topics: TopicConfig[];
  allTopics: TopicConfig[];
  loading: boolean;
  error: string | null;
  
  // Filtering
  filteredTopics: TopicConfig[];
  selectedLevel: GrammarLevel | QuestionLevel | undefined;
  setSelectedLevel: (level: GrammarLevel | QuestionLevel | undefined) => void;
  selectedCategory: 'grammar' | 'questions' | 'both' | undefined;
  setSelectedCategory: (category: 'grammar' | 'questions' | 'both' | undefined) => void;
  
  // Sorting
  sortBy: 'order' | 'name' | 'ruleCount' | 'questionCount';
  setSortBy: (sortBy: 'order' | 'name' | 'ruleCount' | 'questionCount') => void;
  sortOrder: 'asc' | 'desc';
  setSortOrder: (order: 'asc' | 'desc') => void;
  
  // Actions
  getTopicBySlug: (slug: string) => TopicConfig | undefined;
  getTopicsByLevel: (level: GrammarLevel | QuestionLevel) => TopicConfig[];
  getTopicsByCategory: (category: 'grammar' | 'questions' | 'both') => TopicConfig[];
  getActiveTopics: () => TopicConfig[];
  
  // Statistics
  stats: {
    total: number;
    active: number;
    inactive: number;
    byLevel: Record<string, number>;
    byCategory: Record<string, number>;
    totalRules: number;
    totalQuestions: number;
  };
  
  // Utility
  refresh: () => void;
}

// Default topic configurations
const defaultTopicConfigs: Omit<TopicConfig, 'ruleCount' | 'questionCount'>[] = [
  {
    id: 'completing-sentence',
    name: 'Completing Sentence',
    slug: 'completing-sentence',
    description: 'Complete sentences using appropriate grammar rules and structures',
    level: 'HSC',
    order: 1,
    isActive: true,
    category: 'both',
    icon: '📝',
    color: '#3B82F6',
    difficulty: 'MEDIUM'
  },
  {
    id: 'connectors',
    name: 'Connectors',
    slug: 'connectors',
    description: 'Learn to use connecting words and phrases effectively',
    level: 'HSC',
    order: 2,
    isActive: true,
    category: 'both',
    icon: '🔗',
    color: '#10B981',
    difficulty: 'MEDIUM'
  },
  {
    id: 'modifier',
    name: 'Modifier',
    slug: 'modifier',
    description: 'Understand and use modifiers correctly in sentences',
    level: 'HSC',
    order: 3,
    isActive: true,
    category: 'both',
    icon: '✏️',
    color: '#F59E0B',
    difficulty: 'HARD'
  },
  {
    id: 'narration',
    name: 'Narration',
    slug: 'narration',
    description: 'Master direct and indirect speech conversion',
    level: 'HSC',
    order: 4,
    isActive: true,
    category: 'both',
    icon: '💬',
    color: '#EF4444',
    difficulty: 'HARD'
  },
  {
    id: 'transformation',
    name: 'Transformation',
    slug: 'transformation',
    description: 'Transform sentences while maintaining meaning',
    level: 'HSC',
    order: 5,
    isActive: true,
    category: 'both',
    icon: '🔄',
    color: '#8B5CF6',
    difficulty: 'HARD'
  },
  {
    id: 'use-of-verbs',
    name: 'Use of Verbs',
    slug: 'use-of-verbs',
    description: 'Learn proper verb forms and usage in different contexts',
    level: 'HSC',
    order: 6,
    isActive: true,
    category: 'both',
    icon: '⚡',
    color: '#06B6D4',
    difficulty: 'MEDIUM'
  },
  {
    id: 'preposition',
    name: 'Preposition',
    slug: 'preposition',
    description: 'Master the use of prepositions in various contexts',
    level: 'HSC',
    order: 7,
    isActive: true,
    category: 'both',
    icon: '📍',
    color: '#84CC16',
    difficulty: 'EASY'
  },
  {
    id: 'punctuation',
    name: 'Punctuation',
    slug: 'punctuation',
    description: 'Learn proper punctuation rules and usage',
    level: 'HSC',
    order: 8,
    isActive: true,
    category: 'both',
    icon: '❓',
    color: '#F97316',
    difficulty: 'EASY'
  },
  {
    id: 'synonym-antonym',
    name: 'Synonym & Antonym',
    slug: 'synonym-antonym',
    description: 'Expand vocabulary with synonyms and antonyms',
    level: 'HSC',
    order: 9,
    isActive: true,
    category: 'both',
    icon: '📚',
    color: '#EC4899',
    difficulty: 'EASY'
  }
];

export function useTopics(options: UseTopicsOptions = {}): UseTopicsReturn {
  const {
    level: initialLevel,
    category: initialCategory,
    includeInactive = false,
    sortBy: initialSortBy = 'order',
    sortOrder: initialSortOrder = 'asc'
  } = options;

  // State management
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedLevel, setSelectedLevel] = useState<GrammarLevel | QuestionLevel | undefined>(initialLevel);
  const [selectedCategory, setSelectedCategory] = useState<'grammar' | 'questions' | 'both' | undefined>(initialCategory);
  const [sortBy, setSortBy] = useState<'order' | 'name' | 'ruleCount' | 'questionCount'>(initialSortBy);
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>(initialSortOrder);

  // Generate topics with counts
  const allTopics = useMemo((): TopicConfig[] => {
    try {
      return defaultTopicConfigs.map(config => {
        const ruleCount = grammarRulesData[config.slug as GrammarTopicSlug]?.rules.length || 0;
        const questionCount = questionsData[config.slug as QuestionTopicSlug]?.questions.length || 0;

        return {
          ...config,
          ruleCount,
          questionCount
        };
      });
    } catch (err) {
      setError('Failed to load topics');
      return [];
    }
  }, []);

  // Apply filters and sorting
  const filteredTopics = useMemo(() => {
    let filtered = [...allTopics];

    // Filter by active status
    if (!includeInactive) {
      filtered = filtered.filter(topic => topic.isActive);
    }

    // Filter by level
    if (selectedLevel) {
      filtered = filtered.filter(topic => topic.level === selectedLevel);
    }

    // Filter by category
    if (selectedCategory) {
      filtered = filtered.filter(topic => 
        topic.category === selectedCategory || topic.category === 'both'
      );
    }

    // Apply sorting
    filtered.sort((a, b) => {
      let aValue: string | number;
      let bValue: string | number;

      switch (sortBy) {
        case 'order':
          aValue = a.order;
          bValue = b.order;
          break;
        case 'name':
          aValue = a.name.toLowerCase();
          bValue = b.name.toLowerCase();
          break;
        case 'ruleCount':
          aValue = a.ruleCount;
          bValue = b.ruleCount;
          break;
        case 'questionCount':
          aValue = a.questionCount;
          bValue = b.questionCount;
          break;
        default:
          aValue = a.order;
          bValue = b.order;
      }

      if (aValue < bValue) {
        return sortOrder === 'asc' ? -1 : 1;
      }
      if (aValue > bValue) {
        return sortOrder === 'asc' ? 1 : -1;
      }
      return 0;
    });

    return filtered;
  }, [allTopics, includeInactive, selectedLevel, selectedCategory, sortBy, sortOrder]);

  // Current topics (alias for filteredTopics)
  const topics = filteredTopics;

  // Action functions
  const getTopicBySlug = useCallback((slug: string): TopicConfig | undefined => {
    return allTopics.find(topic => topic.slug === slug);
  }, [allTopics]);

  const getTopicsByLevel = useCallback((level: GrammarLevel | QuestionLevel): TopicConfig[] => {
    return allTopics.filter(topic => topic.level === level);
  }, [allTopics]);

  const getTopicsByCategory = useCallback((category: 'grammar' | 'questions' | 'both'): TopicConfig[] => {
    return allTopics.filter(topic => topic.category === category || topic.category === 'both');
  }, [allTopics]);

  const getActiveTopics = useCallback((): TopicConfig[] => {
    return allTopics.filter(topic => topic.isActive);
  }, [allTopics]);

  // Statistics
  const stats = useMemo(() => {
    const active = allTopics.filter(topic => topic.isActive).length;
    const inactive = allTopics.length - active;

    const byLevel = allTopics.reduce((acc, topic) => {
      acc[topic.level] = (acc[topic.level] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    const byCategory = allTopics.reduce((acc, topic) => {
      acc[topic.category] = (acc[topic.category] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    const totalRules = allTopics.reduce((sum, topic) => sum + topic.ruleCount, 0);
    const totalQuestions = allTopics.reduce((sum, topic) => sum + topic.questionCount, 0);

    return {
      total: allTopics.length,
      active,
      inactive,
      byLevel,
      byCategory,
      totalRules,
      totalQuestions
    };
  }, [allTopics]);

  // Utility functions
  const refresh = useCallback(() => {
    setLoading(true);
    setError(null);
    
    // Simulate refresh (since we're using static data)
    setTimeout(() => {
      setLoading(false);
    }, 100);
  }, []);

  // Auto-fetch effect
  useEffect(() => {
    setLoading(true);
    
    // Simulate loading time for static data
    const timer = setTimeout(() => {
      setLoading(false);
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  return {
    // Data
    topics,
    allTopics,
    loading,
    error,
    
    // Filtering
    filteredTopics,
    selectedLevel,
    setSelectedLevel,
    selectedCategory,
    setSelectedCategory,
    
    // Sorting
    sortBy,
    setSortBy,
    sortOrder,
    setSortOrder,
    
    // Actions
    getTopicBySlug,
    getTopicsByLevel,
    getTopicsByCategory,
    getActiveTopics,
    
    // Statistics
    stats,
    
    // Utility
    refresh
  };
}

// Specialized hook for grammar topics only
export function useGrammarTopics(level?: GrammarLevel) {
  return useTopics({ category: 'grammar', level });
}

// Specialized hook for question topics only
export function useQuestionTopics(level?: QuestionLevel) {
  return useTopics({ category: 'questions', level });
}

// Hook for getting a single topic by slug
export function useTopic(slug: string) {
  const { getTopicBySlug, loading, error } = useTopics();
  
  const topic = useMemo(() => {
    return getTopicBySlug(slug);
  }, [getTopicBySlug, slug]);

  return {
    topic,
    loading,
    error,
    exists: !!topic
  };
}

// Hook for topic navigation
export function useTopicNavigation(currentSlug: string) {
  const { topics } = useTopics();
  
  const currentIndex = topics.findIndex(topic => topic.slug === currentSlug);
  const currentTopic = topics[currentIndex];
  const previousTopic = currentIndex > 0 ? topics[currentIndex - 1] : null;
  const nextTopic = currentIndex < topics.length - 1 ? topics[currentIndex + 1] : null;

  return {
    currentTopic,
    previousTopic,
    nextTopic,
    currentIndex,
    totalTopics: topics.length,
    isFirst: currentIndex === 0,
    isLast: currentIndex === topics.length - 1
  };
}