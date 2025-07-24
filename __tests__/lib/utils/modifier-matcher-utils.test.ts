// Tests for modifier matcher utility functions

import {
  createModifierMatcher,
  getModifierMatching,
  getQuestionsForModifierRule,
  getModifierQuestionCounts,
  getModifierMatchingStats,
  getUnmatchedModifierQuestions,
  getModifierRulesWithoutQuestions,
  getMostPopularModifierRules,
  searchModifierRulesByKeyword
} from '@/lib/utils/modifier-matcher-utils';
import { ModifierQuestion } from '@/data/questions/modifier';

// Sample test data
const testQuestions: ModifierQuestion[] = [
  {
    id: "test-1",
    topic: "modifier",
    level: "HSC",
    question: "Cricket is an (a) --- (pre-modify the noun) game. It is not a game of (b) --- (use possessive to pre-modify the noun) country.",
    answer: "(a) international; (b) our",
    board: "Dhaka",
    year: 2023
  },
  {
    id: "test-2",
    topic: "modifier",
    level: "HSC",
    question: "He tried (a) --- (use an infinitive to post-modify the verb) the boy from drowning.",
    answer: "(a) to save",
    board: "Rajshahi",
    year: 2023
  },
  {
    id: "test-3",
    topic: "modifier",
    level: "HSC",
    question: "The students were (a) --- (use an intensifier to pre-modify the adjective) happy with their results.",
    answer: "(a) very",
    board: "Chattogram",
    year: 2023
  }
];

describe('Modifier Matcher Utilities', () => {
  describe('createModifierMatcher', () => {
    it('should create a matcher instance', () => {
      const matcher = createModifierMatcher(testQuestions);
      expect(matcher).toBeDefined();
      expect(typeof matcher.createMapping).toBe('function');
    });
  });

  describe('getModifierMatching', () => {
    it('should return complete matching result', () => {
      const result = getModifierMatching(testQuestions);
      
      expect(result.mapping).toBeDefined();
      expect(result.questionCounts).toBeDefined();
      expect(result.unmatchedQuestions).toBeDefined();
      expect(result.analysisResults).toBeDefined();
      
      expect(result.analysisResults).toHaveLength(testQuestions.length);
    });
  });

  describe('getQuestionsForModifierRule', () => {
    it('should return questions for a specific rule', () => {
      // Rule 1: Use adjective to pre-modify the noun
      const rule1Questions = getQuestionsForModifierRule(1, testQuestions);
      expect(Array.isArray(rule1Questions)).toBe(true);
      
      // Rule 5: Use possessive to pre-modify the noun
      const rule5Questions = getQuestionsForModifierRule(5, testQuestions);
      expect(Array.isArray(rule5Questions)).toBe(true);
      
      // Rule 13: Use infinitive to post-modify the verb
      const rule13Questions = getQuestionsForModifierRule(13, testQuestions);
      expect(Array.isArray(rule13Questions)).toBe(true);
      expect(rule13Questions.length).toBeGreaterThan(0);
    });
  });

  describe('getModifierQuestionCounts', () => {
    it('should return question counts for all rules', () => {
      const counts = getModifierQuestionCounts(testQuestions);
      
      expect(typeof counts).toBe('object');
      expect(Object.keys(counts).length).toBeGreaterThan(0);
      
      // Should have counts for all rules (some may be 0)
      Object.values(counts).forEach(count => {
        expect(typeof count).toBe('number');
        expect(count).toBeGreaterThanOrEqual(0);
      });
    });
  });

  describe('getModifierMatchingStats', () => {
    it('should return meaningful statistics', () => {
      const stats = getModifierMatchingStats(testQuestions);
      
      expect(stats.totalQuestions).toBe(testQuestions.length);
      expect(stats.matchedQuestions + stats.unmatchedQuestions).toBe(stats.totalQuestions);
      expect(stats.averageConfidence).toBeGreaterThanOrEqual(0);
      expect(stats.averageConfidence).toBeLessThanOrEqual(1);
      expect(stats.rulesWithQuestions).toBeGreaterThanOrEqual(0);
      expect(stats.rulesWithoutQuestions).toBeGreaterThanOrEqual(0);
    });
  });

  describe('getUnmatchedModifierQuestions', () => {
    it('should return unmatched questions', () => {
      const unmatched = getUnmatchedModifierQuestions(testQuestions);
      
      expect(Array.isArray(unmatched)).toBe(true);
      // With our test data, all questions should match
      expect(unmatched.length).toBe(0);
    });

    it('should handle questions with no hints', () => {
      const questionsWithNoHints: ModifierQuestion[] = [
        ...testQuestions,
        {
          id: "no-hints",
          topic: "modifier",
          level: "HSC",
          question: "This question has no hints in parentheses.",
          answer: "No answer",
          board: "Sample",
          year: 2023
        }
      ];

      const unmatched = getUnmatchedModifierQuestions(questionsWithNoHints);
      expect(unmatched.some(q => q.id === "no-hints")).toBe(true);
    });
  });

  describe('getModifierRulesWithoutQuestions', () => {
    it('should return rules that have no questions', () => {
      const rulesWithoutQuestions = getModifierRulesWithoutQuestions(testQuestions);
      
      expect(Array.isArray(rulesWithoutQuestions)).toBe(true);
      // Should be some rules without questions in our small test set
      expect(rulesWithoutQuestions.length).toBeGreaterThan(0);
    });
  });

  describe('getMostPopularModifierRules', () => {
    it('should return rules sorted by question count', () => {
      const popularRules = getMostPopularModifierRules(testQuestions, 5);
      
      expect(Array.isArray(popularRules)).toBe(true);
      expect(popularRules.length).toBeLessThanOrEqual(5);
      
      // Should be sorted by question count (descending)
      for (let i = 1; i < popularRules.length; i++) {
        expect(popularRules[i-1].questionCount).toBeGreaterThanOrEqual(popularRules[i].questionCount);
      }
      
      // Each item should have rule and questionCount
      popularRules.forEach(item => {
        expect(item.rule).toBeDefined();
        expect(typeof item.questionCount).toBe('number');
        expect(item.questionCount).toBeGreaterThanOrEqual(0);
      });
    });
  });

  describe('searchModifierRulesByKeyword', () => {
    it('should find rules by keyword in questions', () => {
      const results = searchModifierRulesByKeyword('infinitive', testQuestions);
      
      expect(Array.isArray(results)).toBe(true);
      expect(results.length).toBeGreaterThan(0);
      
      // Should find the infinitive question
      const infinitiveResult = results.find(r => 
        r.matchingQuestions.some(q => q.question.includes('infinitive'))
      );
      expect(infinitiveResult).toBeDefined();
    });

    it('should return empty array for non-existent keywords', () => {
      const results = searchModifierRulesByKeyword('nonexistent', testQuestions);
      expect(results).toHaveLength(0);
    });

    it('should be case insensitive', () => {
      const lowerResults = searchModifierRulesByKeyword('infinitive', testQuestions);
      const upperResults = searchModifierRulesByKeyword('INFINITIVE', testQuestions);
      
      expect(lowerResults.length).toBe(upperResults.length);
    });

    it('should sort results by number of matching questions', () => {
      const results = searchModifierRulesByKeyword('pre-modify', testQuestions);
      
      if (results.length > 1) {
        for (let i = 1; i < results.length; i++) {
          expect(results[i-1].matchingQuestions.length).toBeGreaterThanOrEqual(
            results[i].matchingQuestions.length
          );
        }
      }
    });
  });

  describe('integration with real data structure', () => {
    it('should handle questions with multiple hints correctly', () => {
      const complexQuestion: ModifierQuestion[] = [{
        id: "complex",
        topic: "modifier",
        level: "HSC",
        question: "The (a) --- (pre-modify the noun) student was (b) --- (use an intensifier to pre-modify the adjective) happy to receive (c) --- (use an infinitive to post-modify the verb) the award.",
        answer: "(a) brilliant; (b) very; (c) to get",
        board: "Sample",
        year: 2023
      }];

      const result = getModifierMatching(complexQuestion);
      const analysis = result.analysisResults[0];
      
      expect(analysis.hints.length).toBeGreaterThan(2);
      expect(analysis.suggestedRuleIds.length).toBeGreaterThan(0);
      expect(analysis.confidence).toBeGreaterThan(0.5);
    });
  });
});