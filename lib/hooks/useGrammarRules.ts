// Custom React hook for grammar rules data management
'use client';

import { useState, useEffect, useMemo, useCallback } from 'react';
import { 
  GrammarRule, 
  GrammarLevel, 
  GrammarTopicSlug, 
  GrammarRuleData 
} from '@/types/grammar.types';
import { 
  searchGrammarRules, 
  filterGrammarRulesByLevel, 
  filterGrammarRulesByTopic,
  sortGrammarRules,
  getGrammarRuleStats
} from '@/lib/utils/grammar-helpers';
import { grammarRulesData } from '@/data/grammar-rules';

interface UseGrammarRulesOptions {
  topic?: GrammarTopicSlug;
  level?: GrammarLevel;
  searchQuery?: string;
  sortBy?: 'id' | 'title' | 'ruleNo' | 'level';
  sortOrder?: 'asc' | 'desc';
  autoFetch?: boolean;
}

interface UseGrammarRulesReturn {
  // Data
  rules: GrammarRule[];
  allRules: GrammarRule[];
  loading: boolean;
  error: string | null;
  
  // Filtering and search
  filteredRules: GrammarRule[];
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  
  // Topic and level management
  selectedTopic: GrammarTopicSlug | undefined;
  setSelectedTopic: (topic: GrammarTopicSlug | undefined) => void;
  selectedLevel: GrammarLevel | undefined;
  setSelectedLevel: (level: GrammarLevel | undefined) => void;
  
  // Sorting
  sortBy: 'id' | 'title' | 'ruleNo' | 'level';
  setSortBy: (sortBy: 'id' | 'title' | 'ruleNo' | 'level') => void;
  sortOrder: 'asc' | 'desc';
  setSortOrder: (order: 'asc' | 'desc') => void;
  
  // Statistics
  stats: ReturnType<typeof getGrammarRuleStats>;
  
  // Actions
  getRuleById: (id: number) => GrammarRule | undefined;
  getRulesByTopic: (topic: GrammarTopicSlug) => GrammarRule[];
  getRulesByLevel: (level: GrammarLevel) => GrammarRule[];
  searchRules: (query: string) => GrammarRule[];
  resetFilters: () => void;
  refresh: () => void;
}

export function useGrammarRules(options: UseGrammarRulesOptions = {}): UseGrammarRulesReturn {
  const {
    topic: initialTopic,
    level: initialLevel,
    searchQuery: initialSearchQuery = '',
    sortBy: initialSortBy = 'id',
    sortOrder: initialSortOrder = 'asc',
    autoFetch = true
  } = options;

  // State management
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState(initialSearchQuery);
  const [selectedTopic, setSelectedTopic] = useState<GrammarTopicSlug | undefined>(initialTopic);
  const [selectedLevel, setSelectedLevel] = useState<GrammarLevel | undefined>(initialLevel);
  const [sortBy, setSortBy] = useState<'id' | 'title' | 'ruleNo' | 'level'>(initialSortBy);
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>(initialSortOrder);

  // Get all rules from static data
  const allRules = useMemo(() => {
    try {
      return Object.values(grammarRulesData).flatMap(data => data.rules);
    } catch (err) {
      setError('Failed to load grammar rules');
      return [];
    }
  }, []);

  // Apply filters and search
  const filteredRules = useMemo(() => {
    let filtered = [...allRules];

    // Filter by topic
    if (selectedTopic) {
      filtered = filterGrammarRulesByTopic(filtered, selectedTopic);
    }

    // Filter by level
    if (selectedLevel) {
      filtered = filterGrammarRulesByLevel(filtered, selectedLevel);
    }

    // Apply search
    if (searchQuery.trim()) {
      filtered = searchGrammarRules(filtered, searchQuery);
    }

    // Apply sorting
    filtered = sortGrammarRules(filtered, sortBy, sortOrder);

    return filtered;
  }, [allRules, selectedTopic, selectedLevel, searchQuery, sortBy, sortOrder]);

  // Current rules (alias for filteredRules for backward compatibility)
  const rules = filteredRules;

  // Statistics
  const stats = useMemo(() => {
    return getGrammarRuleStats(filteredRules);
  }, [filteredRules]);

  // Action functions
  const getRuleById = useCallback((id: number): GrammarRule | undefined => {
    return allRules.find(rule => rule.id === id);
  }, [allRules]);

  const getRulesByTopic = useCallback((topic: GrammarTopicSlug): GrammarRule[] => {
    return filterGrammarRulesByTopic(allRules, topic);
  }, [allRules]);

  const getRulesByLevel = useCallback((level: GrammarLevel): GrammarRule[] => {
    return filterGrammarRulesByLevel(allRules, level);
  }, [allRules]);

  const searchRules = useCallback((query: string): GrammarRule[] => {
    return searchGrammarRules(allRules, query);
  }, [allRules]);

  const resetFilters = useCallback(() => {
    setSearchQuery('');
    setSelectedTopic(undefined);
    setSelectedLevel(undefined);
    setSortBy('id');
    setSortOrder('asc');
  }, []);

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
    if (autoFetch) {
      setLoading(true);
      
      // Simulate loading time for static data
      const timer = setTimeout(() => {
        setLoading(false);
      }, 100);

      return () => clearTimeout(timer);
    }
  }, [autoFetch]);

  return {
    // Data
    rules,
    allRules,
    loading,
    error,
    
    // Filtering and search
    filteredRules,
    searchQuery,
    setSearchQuery,
    
    // Topic and level management
    selectedTopic,
    setSelectedTopic,
    selectedLevel,
    setSelectedLevel,
    
    // Sorting
    sortBy,
    setSortBy,
    sortOrder,
    setSortOrder,
    
    // Statistics
    stats,
    
    // Actions
    getRuleById,
    getRulesByTopic,
    getRulesByLevel,
    searchRules,
    resetFilters,
    refresh
  };
}

// Specialized hook for a specific topic
export function useGrammarRulesByTopic(topic: GrammarTopicSlug) {
  return useGrammarRules({ topic });
}

// Specialized hook for a specific level
export function useGrammarRulesByLevel(level: GrammarLevel) {
  return useGrammarRules({ level });
}

// Hook for getting a single rule by ID
export function useGrammarRule(id: number) {
  const { getRuleById, loading, error } = useGrammarRules({ autoFetch: false });
  
  const rule = useMemo(() => {
    return getRuleById(id);
  }, [getRuleById, id]);

  return {
    rule,
    loading,
    error,
    exists: !!rule
  };
}