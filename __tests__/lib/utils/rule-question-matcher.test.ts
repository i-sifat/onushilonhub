// Tests for Rule-Question Matching Utility System

import { RuleQuestionMatcher, createRuleQuestionMatcher } from '@/lib/utils/rule-question-matcher';
import { ModifierRule } from '@/data/grammar-rules/modifier';
import { ModifierQuestion } from '@/data/questions/modifier';

// Mock data for testing
const mockRules: ModifierRule[] = [
  {
    id: 1,
    ruleNo: "Rule 1",
    title: "Use adjective to pre-modify the noun/pre-modify the noun",
    banglaDescription: "Adjective noun-এর গুণ বা বৈশিষ্ট্য বর্ণনা করে।",
    examples: ["Cricket is an [international] game."]
  },
  {
    id: 5,
    ruleNo: "Rule 5",
    title: "Use Possessive to pre-modify the noun/Pre-modify the noun",
    banglaDescription: "A possessive pronoun মালিকানা বা সম্পর্ক নির্দেশ করে।",
    examples: ["It is not a game of [our] country."]
  },
  {
    id: 13,
    ruleNo: "Rule 1p",
    title: "Use infinitive to post-modify the verb",
    banglaDescription: "Infinitive অর্থাৎ to + verb বসিয়ে verb-এর উদ্দেশ্য বোঝাতে হয়।",
    examples: ["He tried [to save] the boy."]
  },
  {
    id: 22,
    ruleNo: "Rule 10p",
    title: "Use appositive to post-modify the noun",
    banglaDescription: "Appositive মানে noun বা pronoun-এর পরে বসা একটি অতিরিক্ত noun।",
    examples: ["Amerigo, [a street child], lives alone."]
  }
];

const mockQuestions: ModifierQuestion[] = [
  {
    id: "q1",
    topic: "modifier",
    level: "HSC",
    question: "Cricket is an (a) --- (pre-modify the noun) game. It is not a game of (b) --- (use possessive to pre-modify the noun) country.",
    answer: "(a) international; (b) our",
    board: "Dhaka",
    year: 2023
  },
  {
    id: "q2", 
    topic: "modifier",
    level: "HSC",
    question: "Sometimes, a third umpire is required (g) --- (use an infinitive to post-modify the verb) an acute confusion.",
    answer: "(g) to resolve",
    board: "Dhaka",
    year: 2023
  },
  {
    id: "q3",
    topic: "modifier", 
    level: "HSC",
    question: "Amerigo, (a) --- (use noun in apposition) lives alone.",
    answer: "(a) a street child",
    board: "Cumilla",
    year: 2023
  },
  {
    id: "q4",
    topic: "modifier",
    level: "HSC", 
    question: "This is a test question without any hints in parentheses.",
    answer: "No specific answer",
    board: "Sample",
    year: 2023
  }
];

describe('RuleQuestionMatcher', () => {
  let matcher: RuleQuestionMatcher;

  beforeEach(() => {
    matcher = new RuleQuestionMatcher(mockRules, mockQuestions);
  });

  describe('extractHints', () => {
    it('should extract hints from parentheses in question text', () => {
      const question = mockQuestions[0];
      const analyses = matcher.analyzeQuestions([question]);
      
      expect(analyses[0].hints).toContain('pre-modify the noun');
      expect(analyses[0].hints).toContain('use possessive to pre-modify the noun');
    });

    it('should filter out non-hint parentheses content', () => {
      const testQuestion: ModifierQuestion = {
        id: "test",
        topic: "modifier",
        level: "HSC",
        question: "This is (a) test with (Dhaka-2023) and (use adjective to pre-modify the noun).",
        answer: "test answer"
      };
      
      const analyses = matcher.analyzeQuestions([testQuestion]);
      
      expect(analyses[0].hints).not.toContain('a');
      expect(analyses[0].hints).not.toContain('dhaka-2023');
      expect(analyses[0].hints).toContain('use adjective to pre-modify the noun');
    });
  });

  describe('extractKeywords', () => {
    it('should extract relevant keywords from hints', () => {
      const analyses = matcher.analyzeQuestions(mockQuestions);
      const firstAnalysis = analyses[0];
      
      expect(firstAnalysis.extractedKeywords).toContain('pre-modify');
      expect(firstAnalysis.extractedKeywords).toContain('noun');
      expect(firstAnalysis.extractedKeywords).toContain('possessive');
    });
  });

  describe('suggestRules', () => {
    it('should suggest appropriate rules based on hints', () => {
      const analyses = matcher.analyzeQuestions(mockQuestions);
      
      // Question with "pre-modify the noun" should suggest rule 1
      const q1Analysis = analyses.find(a => a.questionId === 'q1');
      expect(q1Analysis?.suggestedRuleIds).toContain(1);
      expect(q1Analysis?.suggestedRuleIds).toContain(5); // possessive rule
      
      // Question with "infinitive to post-modify the verb" should suggest rule 13
      const q2Analysis = analyses.find(a => a.questionId === 'q2');
      expect(q2Analysis?.suggestedRuleIds).toContain(13);
      
      // Question with "apposition" should suggest rule 22
      const q3Analysis = analyses.find(a => a.questionId === 'q3');
      expect(q3Analysis?.suggestedRuleIds).toContain(22);
    });
  });

  describe('calculateConfidence', () => {
    it('should assign higher confidence to questions with clear hints', () => {
      const analyses = matcher.analyzeQuestions(mockQuestions);
      
      const q1Analysis = analyses.find(a => a.questionId === 'q1');
      const q4Analysis = analyses.find(a => a.questionId === 'q4');
      
      expect(q1Analysis?.confidence).toBeGreaterThan(0.5);
      expect(q4Analysis?.confidence).toBeLessThan(0.5);
    });
  });

  describe('createMapping', () => {
    it('should create a complete mapping result', () => {
      const result = matcher.createMapping();
      
      expect(result.mapping).toBeDefined();
      expect(result.questionCounts).toBeDefined();
      expect(result.unmatchedQuestions).toBeDefined();
      expect(result.analysisResults).toBeDefined();
      
      // Should have entries for all rules
      expect(Object.keys(result.mapping)).toHaveLength(mockRules.length);
      expect(Object.keys(result.questionCounts)).toHaveLength(mockRules.length);
    });

    it('should correctly assign questions to rules', () => {
      const result = matcher.createMapping();
      
      // Rule 1 should have questions about pre-modifying nouns with adjectives
      expect(result.mapping[1]).toContain('q1');
      
      // Rule 5 should have questions about possessive pre-modification
      expect(result.mapping[5]).toContain('q1');
      
      // Rule 13 should have questions about infinitive post-modification
      expect(result.mapping[13]).toContain('q2');
      
      // Rule 22 should have questions about appositive
      expect(result.mapping[22]).toContain('q3');
    });

    it('should calculate correct question counts', () => {
      const result = matcher.createMapping();
      
      // Count should match the number of assigned questions
      Object.entries(result.mapping).forEach(([ruleId, questionIds]) => {
        expect(result.questionCounts[parseInt(ruleId)]).toBe(questionIds.length);
      });
    });
  });

  describe('getQuestionsForRule', () => {
    it('should return correct questions for a given rule', () => {
      const result = matcher.createMapping();
      const questionsForRule1 = matcher.getQuestionsForRule(1, result.mapping);
      
      expect(questionsForRule1).toHaveLength(result.questionCounts[1]);
      expect(questionsForRule1.every(q => q.topic === 'modifier')).toBe(true);
    });
  });

  describe('addManualMapping', () => {
    it('should allow manual override of rule-question associations', () => {
      const result = matcher.createMapping();
      const originalMapping = result.mapping;
      
      // Manually assign question q4 to rule 1
      const updatedMapping = matcher.addManualMapping(1, 'q4', originalMapping);
      
      expect(updatedMapping[1]).toContain('q4');
      
      // Should remove from other rules
      Object.entries(updatedMapping).forEach(([ruleId, questionIds]) => {
        if (parseInt(ruleId) !== 1) {
          expect(questionIds).not.toContain('q4');
        }
      });
    });
  });

  describe('getMatchingStats', () => {
    it('should provide accurate statistics about matching results', () => {
      const result = matcher.createMapping();
      const stats = matcher.getMatchingStats(result);
      
      expect(stats.totalQuestions).toBe(mockQuestions.length);
      expect(stats.matchedQuestions + stats.unmatchedQuestions).toBe(stats.totalQuestions);
      expect(stats.averageConfidence).toBeGreaterThanOrEqual(0);
      expect(stats.averageConfidence).toBeLessThanOrEqual(1);
      expect(stats.rulesWithQuestions + stats.rulesWithoutQuestions).toBe(mockRules.length);
    });
  });

  describe('createRuleQuestionMatcher utility function', () => {
    it('should create a matcher instance', () => {
      const utilityMatcher = createRuleQuestionMatcher(mockRules, mockQuestions);
      expect(utilityMatcher).toBeInstanceOf(RuleQuestionMatcher);
    });
  });

  describe('edge cases', () => {
    it('should handle empty questions array', () => {
      const emptyMatcher = new RuleQuestionMatcher(mockRules, []);
      const result = emptyMatcher.createMapping();
      
      expect(result.analysisResults).toHaveLength(0);
      expect(result.unmatchedQuestions).toHaveLength(0);
      Object.values(result.questionCounts).forEach(count => {
        expect(count).toBe(0);
      });
    });

    it('should handle empty rules array', () => {
      const emptyMatcher = new RuleQuestionMatcher([], mockQuestions);
      const result = emptyMatcher.createMapping();
      
      expect(Object.keys(result.mapping)).toHaveLength(0);
      expect(Object.keys(result.questionCounts)).toHaveLength(0);
      expect(result.unmatchedQuestions).toHaveLength(mockQuestions.length);
    });

    it('should handle questions with no hints', () => {
      const noHintQuestion: ModifierQuestion = {
        id: "no-hint",
        topic: "modifier",
        level: "HSC",
        question: "This question has no hints at all.",
        answer: "No answer"
      };
      
      const analyses = matcher.analyzeQuestions([noHintQuestion]);
      const analysis = analyses[0];
      
      expect(analysis.hints).toHaveLength(0);
      expect(analysis.extractedKeywords).toHaveLength(0);
      expect(analysis.suggestedRuleIds).toHaveLength(0);
      expect(analysis.confidence).toBeLessThan(0.5);
    });
  });
});