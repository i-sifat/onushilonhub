// Grammar-related utility functions
// Provides consistent formatting, search, and validation for grammar rules

import { GrammarRule, GrammarLevel, GrammarTopicSlug, GrammarRuleData } from '@/types/grammar.types';

/**
 * Format a grammar rule for consistent display
 * @param rule - The grammar rule to format
 * @param options - Formatting options
 * @returns Formatted grammar rule object
 */
export function formatGrammarRule(
  rule: GrammarRule,
  options: {
    includeExamples?: boolean;
    includeStructures?: boolean;
    includeTips?: boolean;
    maxExamples?: number;
    maxStructures?: number;
  } = {}
): Partial<GrammarRule> {
  const {
    includeExamples = true,
    includeStructures = true,
    includeTips = true,
    maxExamples = 3,
    maxStructures = 2
  } = options;

  const formattedRule: Partial<GrammarRule> = {
    id: rule.id,
    ruleNo: rule.ruleNo,
    title: rule.title?.trim(),
    bengali: rule.bengali?.trim(),
    description: rule.description?.trim(),
    level: rule.level,
    topic: rule.topic
  };

  if (includeStructures && rule.structures) {
    formattedRule.structures = rule.structures
      .slice(0, maxStructures)
      .map(structure => structure.trim())
      .filter(Boolean);
  }

  if (includeExamples && rule.examples) {
    formattedRule.examples = rule.examples
      .slice(0, maxExamples)
      .map(example => example.trim())
      .filter(Boolean);
  }

  if (includeTips && rule.tips) {
    formattedRule.tips = rule.tips
      .map(tip => tip.trim())
      .filter(Boolean);
  }

  return formattedRule;
}

/**
 * Search grammar rules based on query string
 * @param rules - Array of grammar rules to search
 * @param query - Search query string
 * @param options - Search options
 * @returns Filtered array of grammar rules
 */
export function searchGrammarRules(
  rules: GrammarRule[],
  query: string,
  options: {
    searchFields?: ('title' | 'bengali' | 'description' | 'examples' | 'structures')[];
    caseSensitive?: boolean;
    exactMatch?: boolean;
  } = {}
): GrammarRule[] {
  if (!query.trim()) {
    return rules;
  }

  const {
    searchFields = ['title', 'bengali', 'description', 'examples'],
    caseSensitive = false,
    exactMatch = false
  } = options;

  const searchQuery = caseSensitive ? query.trim() : query.trim().toLowerCase();

  return rules.filter(rule => {
    return searchFields.some(field => {
      const fieldValue = rule[field];
      
      if (!fieldValue) return false;

      if (Array.isArray(fieldValue)) {
        // Handle arrays (examples, structures, tips)
        return fieldValue.some(item => {
          const itemValue = caseSensitive ? item : item.toLowerCase();
          return exactMatch 
            ? itemValue === searchQuery
            : itemValue.includes(searchQuery);
        });
      } else {
        // Handle strings (title, bengali, description)
        const stringValue = caseSensitive ? fieldValue : fieldValue.toLowerCase();
        return exactMatch 
          ? stringValue === searchQuery
          : stringValue.includes(searchQuery);
      }
    });
  });
}

/**
 * Filter grammar rules by level
 * @param rules - Array of grammar rules to filter
 * @param level - Grammar level to filter by
 * @returns Filtered array of grammar rules
 */
export function filterGrammarRulesByLevel(
  rules: GrammarRule[],
  level: GrammarLevel
): GrammarRule[] {
  return rules.filter(rule => 
    rule.level === level || rule.level === 'BOTH'
  );
}

/**
 * Filter grammar rules by topic
 * @param rules - Array of grammar rules to filter
 * @param topic - Grammar topic to filter by
 * @returns Filtered array of grammar rules
 */
export function filterGrammarRulesByTopic(
  rules: GrammarRule[],
  topic: GrammarTopicSlug
): GrammarRule[] {
  return rules.filter(rule => rule.topic === topic);
}

/**
 * Sort grammar rules by various criteria
 * @param rules - Array of grammar rules to sort
 * @param sortBy - Sort criteria
 * @param order - Sort order
 * @returns Sorted array of grammar rules
 */
export function sortGrammarRules(
  rules: GrammarRule[],
  sortBy: 'id' | 'title' | 'ruleNo' | 'level' = 'id',
  order: 'asc' | 'desc' = 'asc'
): GrammarRule[] {
  return [...rules].sort((a, b) => {
    let aValue: string | number;
    let bValue: string | number;

    switch (sortBy) {
      case 'id':
        aValue = a.id;
        bValue = b.id;
        break;
      case 'title':
        aValue = a.title?.toLowerCase() || '';
        bValue = b.title?.toLowerCase() || '';
        break;
      case 'ruleNo':
        aValue = a.ruleNo || '';
        bValue = b.ruleNo || '';
        break;
      case 'level':
        aValue = a.level || '';
        bValue = b.level || '';
        break;
      default:
        aValue = a.id;
        bValue = b.id;
    }

    if (aValue < bValue) {
      return order === 'asc' ? -1 : 1;
    }
    if (aValue > bValue) {
      return order === 'asc' ? 1 : -1;
    }
    return 0;
  });
}

/**
 * Get grammar rule statistics
 * @param rules - Array of grammar rules
 * @returns Statistics object
 */
export function getGrammarRuleStats(rules: GrammarRule[]) {
  const stats = {
    total: rules.length,
    byLevel: {} as Record<GrammarLevel, number>,
    byTopic: {} as Record<string, number>,
    withExamples: 0,
    withStructures: 0,
    withTips: 0,
    averageExamples: 0,
    averageStructures: 0
  };

  let totalExamples = 0;
  let totalStructures = 0;

  rules.forEach(rule => {
    // Count by level
    if (rule.level) {
      stats.byLevel[rule.level] = (stats.byLevel[rule.level] || 0) + 1;
    }

    // Count by topic
    if (rule.topic) {
      stats.byTopic[rule.topic] = (stats.byTopic[rule.topic] || 0) + 1;
    }

    // Count rules with examples
    if (rule.examples && rule.examples.length > 0) {
      stats.withExamples++;
      totalExamples += rule.examples.length;
    }

    // Count rules with structures
    if (rule.structures && rule.structures.length > 0) {
      stats.withStructures++;
      totalStructures += rule.structures.length;
    }

    // Count rules with tips
    if (rule.tips && rule.tips.length > 0) {
      stats.withTips++;
    }
  });

  // Calculate averages
  stats.averageExamples = stats.withExamples > 0 ? totalExamples / stats.withExamples : 0;
  stats.averageStructures = stats.withStructures > 0 ? totalStructures / stats.withStructures : 0;

  return stats;
}

/**
 * Validate grammar rule data structure
 * @param rule - Grammar rule to validate
 * @returns Validation result with errors if any
 */
export function validateGrammarRule(rule: any): {
  isValid: boolean;
  errors: string[];
} {
  const errors: string[] = [];

  // Required fields validation
  if (!rule.id || typeof rule.id !== 'number') {
    errors.push('Rule ID is required and must be a number');
  }

  if (!rule.title || typeof rule.title !== 'string' || rule.title.trim() === '') {
    errors.push('Rule title is required and must be a non-empty string');
  }

  if (!rule.bengali || typeof rule.bengali !== 'string' || rule.bengali.trim() === '') {
    errors.push('Bengali translation is required and must be a non-empty string');
  }

  if (!rule.description || typeof rule.description !== 'string' || rule.description.trim() === '') {
    errors.push('Rule description is required and must be a non-empty string');
  }

  // Optional fields validation
  if (rule.structures && !Array.isArray(rule.structures)) {
    errors.push('Structures must be an array');
  }

  if (rule.examples && !Array.isArray(rule.examples)) {
    errors.push('Examples must be an array');
  }

  if (rule.tips && !Array.isArray(rule.tips)) {
    errors.push('Tips must be an array');
  }

  if (rule.level && !['HSC', 'SSC', 'BOTH'].includes(rule.level)) {
    errors.push('Level must be one of: HSC, SSC, BOTH');
  }

  // Validate array contents
  if (rule.structures && Array.isArray(rule.structures)) {
    rule.structures.forEach((structure: any, index: number) => {
      if (typeof structure !== 'string' || structure.trim() === '') {
        errors.push(`Structure at index ${index} must be a non-empty string`);
      }
    });
  }

  if (rule.examples && Array.isArray(rule.examples)) {
    rule.examples.forEach((example: any, index: number) => {
      if (typeof example !== 'string' || example.trim() === '') {
        errors.push(`Example at index ${index} must be a non-empty string`);
      }
    });
  }

  return {
    isValid: errors.length === 0,
    errors
  };
}

/**
 * Validate an array of grammar rules
 * @param rules - Array of grammar rules to validate
 * @returns Validation summary
 */
export function validateGrammarRules(rules: any[]): {
  isValid: boolean;
  validCount: number;
  invalidCount: number;
  errors: Array<{ ruleId: number | string; errors: string[] }>;
} {
  const validationResults = rules.map((rule, index) => ({
    ruleId: rule.id || `index-${index}`,
    ...validateGrammarRule(rule)
  }));

  const validCount = validationResults.filter(result => result.isValid).length;
  const invalidCount = validationResults.length - validCount;
  const errors = validationResults
    .filter(result => !result.isValid)
    .map(result => ({
      ruleId: result.ruleId,
      errors: result.errors
    }));

  return {
    isValid: invalidCount === 0,
    validCount,
    invalidCount,
    errors
  };
}

/**
 * Generate a unique ID for a new grammar rule
 * @param existingRules - Array of existing grammar rules
 * @returns New unique ID
 */
export function generateGrammarRuleId(existingRules: GrammarRule[]): number {
  const existingIds = existingRules.map(rule => rule.id);
  const maxId = Math.max(...existingIds, 0);
  return maxId + 1;
}

/**
 * Create a grammar rule template
 * @param topic - Grammar topic
 * @param level - Grammar level
 * @returns Grammar rule template
 */
export function createGrammarRuleTemplate(
  topic: GrammarTopicSlug,
  level: GrammarLevel = 'HSC'
): Partial<GrammarRule> {
  return {
    id: 0, // Will be set when adding to collection
    ruleNo: '',
    title: '',
    bengali: '',
    description: '',
    structures: [],
    examples: [],
    tips: [],
    level,
    topic
  };
}