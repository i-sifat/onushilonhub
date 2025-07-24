// Integration tests for Rule-Question Matching with real data

import { createRuleQuestionMatcher } from '@/lib/utils/rule-question-matcher';
import { modifierRules } from '@/data/grammar-rules/modifier';
import { ModifierQuestion } from '@/data/questions/modifier';

// Sample questions based on the real data structure for testing
const sampleModifierQuestions: ModifierQuestion[] = [
  {
    id: "dhaka-2023-1",
    topic: "modifier",
    level: "HSC",
    question: "Cricket is an (a) --- (pre-modify the noun) game. It is not a game of (b) --- (use possessive to pre-modify the noun) country. A (c) ---- (use a noun adjective to pre-modify the noun) match is played between two teams.",
    answer: "(a) international; (b) our; (c) cricket",
    board: "Dhaka",
    year: 2023
  },
  {
    id: "rajshahi-2023-1",
    topic: "modifier",
    level: "HSC", 
    question: "People around were just watching as the (a) — (pre-modify the noun) boy started (b) — (post-modify the verb) into the canal. He was (g) — (use an intensifier to pre-modify the adjective) kind that he risked his life.",
    answer: "(a) young; (b) drowning; (g) so",
    board: "Rajshahi",
    year: 2023
  },
  {
    id: "cumilla-2023-1",
    topic: "modifier",
    level: "HSC",
    question: "Amerigo, (a) --- (use noun in apposition) lives alone. His parents now live separate and none of them wants (b) --- (use an infinitive to post modify the verb) his responsibility.",
    answer: "(a) a street child; (b) to take",
    board: "Cumilla", 
    year: 2023
  },
  {
    id: "dhaka-2019-1",
    topic: "modifier",
    level: "HSC",
    question: "Arsenic is a (a)---(pre-modify the noun) substance. (c)---(use a demonstrative to pre-modify the noun) substance is found in the water of the tube well. We should take proper measures (h)---(post-modify the verb with an infinitive phrase).",
    answer: "(a) harmful; (c) this; (h) to remain safe",
    board: "Dhaka",
    year: 2019
  },
  {
    id: "sample-mixed",
    topic: "modifier",
    level: "HSC",
    question: "The students (a) --- (use a participle) to all classes visit the library. There are about five thousand books which are arranged (e) — (post-modify the verb). Every student has a library (i) —- (use a noun) card.",
    answer: "(a) coming; (e) systematically; (i) library",
    board: "Sample",
    year: 2023
  }
];

describe('RuleQuestionMatcher Integration Tests', () => {
  let matcher: ReturnType<typeof createRuleQuestionMatcher>;
  let result: ReturnType<typeof matcher.createMapping>;

  beforeAll(() => {
    matcher = createRuleQuestionMatcher(modifierRules, sampleModifierQuestions);
    result = matcher.createMapping();
  });

  it('should process all modifier rules and questions', () => {
    expect(result.analysisResults).toHaveLength(sampleModifierQuestions.length);
    expect(Object.keys(result.mapping)).toHaveLength(modifierRules.length);
    expect(Object.keys(result.questionCounts)).toHaveLength(modifierRules.length);
  });

  it('should match questions with appropriate confidence levels', () => {
    const highConfidenceAnalyses = result.analysisResults.filter(a => a.confidence > 0.7);
    const mediumConfidenceAnalyses = result.analysisResults.filter(a => a.confidence > 0.4 && a.confidence <= 0.7);
    const lowConfidenceAnalyses = result.analysisResults.filter(a => a.confidence <= 0.4);

    console.log(`High confidence matches: ${highConfidenceAnalyses.length}`);
    console.log(`Medium confidence matches: ${mediumConfidenceAnalyses.length}`);
    console.log(`Low confidence matches: ${lowConfidenceAnalyses.length}`);

    // Should have some high confidence matches
    expect(highConfidenceAnalyses.length).toBeGreaterThan(0);
  });

  it('should assign questions to multiple rules when appropriate', () => {
    const totalAssignments = Object.values(result.mapping)
      .reduce((sum, questionIds) => sum + questionIds.length, 0);
    
    // Total assignments should be >= number of matched questions since some questions can match multiple rules
    expect(totalAssignments).toBeGreaterThanOrEqual(result.analysisResults.length - result.unmatchedQuestions.length);
  });

  it('should identify common modifier patterns correctly', () => {
    // Test specific pattern matching
    const preModifyNounQuestions = result.analysisResults.filter(a => 
      a.hints.some(hint => hint.includes('pre-modify the noun'))
    );
    
    const postModifyVerbQuestions = result.analysisResults.filter(a => 
      a.hints.some(hint => hint.includes('post-modify the verb'))
    );

    const possessiveQuestions = result.analysisResults.filter(a => 
      a.hints.some(hint => hint.includes('possessive'))
    );

    expect(preModifyNounQuestions.length).toBeGreaterThan(0);
    expect(postModifyVerbQuestions.length).toBeGreaterThan(0);
    expect(possessiveQuestions.length).toBeGreaterThan(0);

    console.log(`Pre-modify noun questions: ${preModifyNounQuestions.length}`);
    console.log(`Post-modify verb questions: ${postModifyVerbQuestions.length}`);
    console.log(`Possessive questions: ${possessiveQuestions.length}`);
  });

  it('should provide meaningful statistics', () => {
    const stats = matcher.getMatchingStats(result);
    
    expect(stats.totalQuestions).toBe(sampleModifierQuestions.length);
    expect(stats.matchedQuestions + stats.unmatchedQuestions).toBe(stats.totalQuestions);
    expect(stats.rulesWithQuestions + stats.rulesWithoutQuestions).toBe(modifierRules.length);
    expect(stats.averageConfidence).toBeGreaterThan(0);
    expect(stats.averageConfidence).toBeLessThanOrEqual(1);

    console.log('Matching Statistics:', stats);
  });

  it('should handle specific rule types correctly', () => {
    // Test Rule 1: Use adjective to pre-modify the noun
    const rule1Questions = matcher.getQuestionsForRule(1, result.mapping);
    expect(rule1Questions.length).toBeGreaterThan(0);

    // Test Rule 5: Use Possessive to pre-modify the noun
    const rule5Questions = matcher.getQuestionsForRule(5, result.mapping);
    expect(rule5Questions.length).toBeGreaterThan(0);

    // Test Rule 13: Use infinitive to post-modify the verb
    const rule13Questions = matcher.getQuestionsForRule(13, result.mapping);
    expect(rule13Questions.length).toBeGreaterThan(0);

    console.log(`Rule 1 (adjective pre-modify): ${rule1Questions.length} questions`);
    console.log(`Rule 5 (possessive pre-modify): ${rule5Questions.length} questions`);
    console.log(`Rule 13 (infinitive post-modify): ${rule13Questions.length} questions`);
  });

  it('should extract hints correctly from real questions', () => {
    const sampleAnalyses = result.analysisResults.slice(0, 5);
    
    sampleAnalyses.forEach((analysis, index) => {
      const question = sampleModifierQuestions.find(q => q.id === analysis.questionId);
      console.log(`\nQuestion ${index + 1}: ${question?.question.substring(0, 100)}...`);
      console.log(`Hints: ${analysis.hints.join(', ')}`);
      console.log(`Keywords: ${analysis.extractedKeywords.join(', ')}`);
      console.log(`Suggested Rules: ${analysis.suggestedRuleIds.join(', ')}`);
      console.log(`Confidence: ${analysis.confidence.toFixed(2)}`);
    });

    // Should extract meaningful hints
    expect(sampleAnalyses.some(a => a.hints.length > 0)).toBe(true);
  });

  it('should handle edge cases in real data', () => {
    // Check for questions that might not have clear hints
    const noHintQuestions = result.analysisResults.filter(a => a.hints.length === 0);
    const lowConfidenceQuestions = result.analysisResults.filter(a => a.confidence < 0.3);

    console.log(`Questions with no hints: ${noHintQuestions.length}`);
    console.log(`Low confidence questions: ${lowConfidenceQuestions.length}`);
    console.log(`Unmatched questions: ${result.unmatchedQuestions.length}`);

    // These should be handled gracefully
    expect(result.unmatchedQuestions).toEqual(
      expect.arrayContaining(lowConfidenceQuestions.map(a => a.questionId))
    );
  });

  it('should demonstrate manual mapping functionality', () => {
    // Test manual override
    const originalMapping = result.mapping;
    const testQuestionId = result.analysisResults[0].questionId;
    const targetRuleId = 1;

    const updatedMapping = matcher.addManualMapping(targetRuleId, testQuestionId, originalMapping);
    
    expect(updatedMapping[targetRuleId]).toContain(testQuestionId);
    
    // Should remove from other rules
    Object.entries(updatedMapping).forEach(([ruleId, questionIds]) => {
      if (parseInt(ruleId) !== targetRuleId) {
        expect(questionIds).not.toContain(testQuestionId);
      }
    });
  });
});