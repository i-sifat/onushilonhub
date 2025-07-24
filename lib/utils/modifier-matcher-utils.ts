// Utility functions for working with modifier rule-question matching

import { createRuleQuestionMatcher, MatchingResult } from './rule-question-matcher';
import { modifierRules } from '@/data/grammar-rules/modifier';
import { ModifierQuestion } from '@/data/questions/modifier';

/**
 * Create a pre-configured matcher for modifier rules and questions
 */
export function createModifierMatcher(questions: ModifierQuestion[]): ReturnType<typeof createRuleQuestionMatcher> {
  return createRuleQuestionMatcher(modifierRules, questions);
}

/**
 * Get a complete matching result for modifier data
 */
export function getModifierMatching(questions: ModifierQuestion[]): MatchingResult {
  const matcher = createModifierMatcher(questions);
  return matcher.createMapping();
}

/**
 * Get questions for a specific modifier rule
 */
export function getQuestionsForModifierRule(
  ruleId: number, 
  questions: ModifierQuestion[]
): ModifierQuestion[] {
  const matcher = createModifierMatcher(questions);
  const result = matcher.createMapping();
  return matcher.getQuestionsForRule(ruleId, result.mapping);
}

/**
 * Get question counts for all modifier rules
 */
export function getModifierQuestionCounts(questions: ModifierQuestion[]): Record<number, number> {
  const result = getModifierMatching(questions);
  return result.questionCounts;
}

/**
 * Get matching statistics for modifier data
 */
export function getModifierMatchingStats(questions: ModifierQuestion[]) {
  const matcher = createModifierMatcher(questions);
  const result = matcher.createMapping();
  return matcher.getMatchingStats(result);
}

/**
 * Find unmatched modifier questions
 */
export function getUnmatchedModifierQuestions(questions: ModifierQuestion[]): ModifierQuestion[] {
  const result = getModifierMatching(questions);
  return questions.filter(q => result.unmatchedQuestions.includes(q.id));
}

/**
 * Get rules that have no associated questions
 */
export function getModifierRulesWithoutQuestions(questions: ModifierQuestion[]) {
  const result = getModifierMatching(questions);
  return modifierRules.filter(rule => result.questionCounts[rule.id] === 0);
}

/**
 * Get the most popular modifier rules (by question count)
 */
export function getMostPopularModifierRules(questions: ModifierQuestion[], limit: number = 10) {
  const result = getModifierMatching(questions);
  
  return modifierRules
    .map(rule => ({
      rule,
      questionCount: result.questionCounts[rule.id] || 0
    }))
    .sort((a, b) => b.questionCount - a.questionCount)
    .slice(0, limit);
}

/**
 * Search for rules by keyword in question hints
 */
export function searchModifierRulesByKeyword(
  keyword: string, 
  questions: ModifierQuestion[]
): Array<{ rule: typeof modifierRules[0], matchingQuestions: ModifierQuestion[] }> {
  const matcher = createModifierMatcher(questions);
  const result = matcher.createMapping();
  
  const matchingRules: Array<{ rule: typeof modifierRules[0], matchingQuestions: ModifierQuestion[] }> = [];
  
  modifierRules.forEach(rule => {
    const ruleQuestions = matcher.getQuestionsForRule(rule.id, result.mapping);
    const keywordMatches = ruleQuestions.filter(q => 
      q.question.toLowerCase().includes(keyword.toLowerCase())
    );
    
    if (keywordMatches.length > 0) {
      matchingRules.push({
        rule,
        matchingQuestions: keywordMatches
      });
    }
  });
  
  return matchingRules.sort((a, b) => b.matchingQuestions.length - a.matchingQuestions.length);
}

// Export types for convenience
export type { MatchingResult } from './rule-question-matcher';