// Rule-Question Matching Utility System
// This system analyzes question hints and creates intelligent associations with grammar rules

import { ModifierRule, ModifierQuestion } from '@/data/grammar-rules/modifier';

export interface QuestionAnalysis {
  questionId: string;
  hints: string[];
  extractedKeywords: string[];
  suggestedRuleIds: number[];
  confidence: number; // 0-1 score for matching confidence
}

export interface RuleQuestionMapping {
  [ruleId: number]: string[]; // Array of question IDs
}

export interface MatchingResult {
  mapping: RuleQuestionMapping;
  questionCounts: Record<number, number>;
  unmatchedQuestions: string[];
  analysisResults: QuestionAnalysis[];
}

export class RuleQuestionMatcher {
  private rules: ModifierRule[];
  private questions: ModifierQuestion[];

  constructor(rules: ModifierRule[], questions: ModifierQuestion[]) {
    this.rules = rules;
    this.questions = questions;
  }

  /**
   * Main method to analyze questions and create rule-question mappings
   */
  public createMapping(): MatchingResult {
    const analysisResults = this.analyzeQuestions(this.questions);
    const mapping = this.matchRulesWithQuestions(this.rules, analysisResults);
    const questionCounts = this.calculateQuestionCounts(mapping);
    const unmatchedQuestions = this.findUnmatchedQuestions(analysisResults);

    return {
      mapping,
      questionCounts,
      unmatchedQuestions,
      analysisResults
    };
  }

  /**
   * Analyze questions to extract hints and keywords
   */
  public analyzeQuestions(questions: ModifierQuestion[]): QuestionAnalysis[] {
    return questions.map(question => {
      const hints = this.extractHints(question.question);
      const extractedKeywords = this.extractKeywords(hints);
      const suggestedRuleIds = this.suggestRules(extractedKeywords, hints);
      const confidence = this.calculateConfidence(suggestedRuleIds, hints, extractedKeywords);

      return {
        questionId: question.id,
        hints,
        extractedKeywords,
        suggestedRuleIds,
        confidence
      };
    });
  }

  /**
   * Extract hints from question text (content in parentheses)
   */
  private extractHints(questionText: string): string[] {
    const hintRegex = /\(([^)]+)\)/g;
    const hints: string[] = [];
    let match;

    while ((match = hintRegex.exec(questionText)) !== null) {
      const hint = match[1].trim().toLowerCase();
      // Filter out common non-hint parentheses content
      if (!this.isNonHint(hint)) {
        hints.push(hint);
      }
    }

    return hints;
  }

  /**
   * Check if parentheses content is not a hint
   */
  private isNonHint(content: string): boolean {
    const nonHintPatterns = [
      /^[a-j]$/,  // Single letters like (a), (b), etc.
      /^\d+$/,    // Numbers
      /^dhaka|rajshahi|chattogram|sylhet|barishal|cumilla|dinajpur|jashore|mymensingh/i, // Board names
      /^\d{4}$/,  // Years like (2023)
      /^board/i   // Board references
    ];

    return nonHintPatterns.some(pattern => pattern.test(content));
  }

  /**
   * Extract keywords from hints for matching
   */
  private extractKeywords(hints: string[]): string[] {
    const keywords: string[] = [];
    
    hints.forEach(hint => {
      // Extract key terms that indicate rule types
      const keywordPatterns = [
        /pre-modify/g,
        /post-modify/g,
        /adjective/g,
        /noun/g,
        /verb/g,
        /adverb/g,
        /infinitive/g,
        /participle/g,
        /possessive/g,
        /determiner/g,
        /intensifier/g,
        /quantifier/g,
        /demonstrative/g,
        /article/g,
        /appositive/g,
        /relative clause/g,
        /prepositional phrase/g,
        /adverbial phrase/g,
        /present participle/g,
        /past participle/g,
        /numeral/g,
        /gerund/g
      ];

      keywordPatterns.forEach(pattern => {
        const matches = hint.match(pattern);
        if (matches) {
          keywords.push(...matches);
        }
      });
    });

    return [...new Set(keywords)]; // Remove duplicates
  }

  /**
   * Suggest rules based on extracted keywords and hints
   */
  private suggestRules(keywords: string[], hints: string[]): number[] {
    const suggestions: { ruleId: number; score: number }[] = [];

    this.rules.forEach(rule => {
      let score = 0;
      const ruleTitle = rule.title.toLowerCase();
      const ruleDescription = rule.banglaDescription.toLowerCase();

      // Direct keyword matching with rule titles
      keywords.forEach(keyword => {
        if (ruleTitle.includes(keyword)) {
          score += 3; // High score for title matches
        }
        if (ruleDescription.includes(keyword)) {
          score += 1; // Lower score for description matches
        }
      });

      // Specific pattern matching for common hint patterns
      hints.forEach(hint => {
        score += this.getPatternMatchScore(hint, rule);
      });

      if (score > 0) {
        suggestions.push({ ruleId: rule.id, score });
      }
    });

    // Sort by score and return top suggestions
    return suggestions
      .sort((a, b) => b.score - a.score)
      .slice(0, 3) // Top 3 suggestions
      .map(s => s.ruleId);
  }

  /**
   * Calculate pattern match score for specific hint patterns
   */
  private getPatternMatchScore(hint: string, rule: ModifierRule): number {
    let score = 0;
    const ruleTitle = rule.title.toLowerCase();

    // Pre-modify patterns
    if (hint.includes('pre-modify the noun') && ruleTitle.includes('pre-modify the noun')) {
      score += 5;
    }
    if (hint.includes('pre-modify the adjective') && ruleTitle.includes('pre-modify the adjective')) {
      score += 5;
    }
    if (hint.includes('pre-modify the verb') && ruleTitle.includes('pre-modify the verb')) {
      score += 5;
    }

    // Post-modify patterns
    if (hint.includes('post-modify the verb') && ruleTitle.includes('post-modify the verb')) {
      score += 5;
    }
    if (hint.includes('post-modify the noun') && ruleTitle.includes('post-modify the noun')) {
      score += 5;
    }

    // Specific modifier type patterns
    if (hint.includes('use possessive') && ruleTitle.includes('possessive')) {
      score += 4;
    }
    if (hint.includes('use adjective') && ruleTitle.includes('adjective')) {
      score += 4;
    }
    if (hint.includes('use infinitive') && ruleTitle.includes('infinitive')) {
      score += 4;
    }
    if (hint.includes('use participle') && ruleTitle.includes('participle')) {
      score += 4;
    }
    if (hint.includes('use determiner') && ruleTitle.includes('determiner')) {
      score += 4;
    }
    if (hint.includes('use intensifier') && ruleTitle.includes('intensifier')) {
      score += 4;
    }
    if (hint.includes('use quantifier') && ruleTitle.includes('quantifier')) {
      score += 4;
    }
    if (hint.includes('use demonstrative') && ruleTitle.includes('demonstrative')) {
      score += 4;
    }
    if (hint.includes('use article') && ruleTitle.includes('article')) {
      score += 4;
    }
    if (hint.includes('use appositive') && ruleTitle.includes('appositive')) {
      score += 4;
    }
    if (hint.includes('relative clause') && ruleTitle.includes('relative clause')) {
      score += 4;
    }
    if (hint.includes('prepositional phrase') && ruleTitle.includes('prepositional phrase')) {
      score += 4;
    }
    if (hint.includes('adverbial phrase') && ruleTitle.includes('adverbial phrase')) {
      score += 4;
    }
    if (hint.includes('present participle') && ruleTitle.includes('present participle')) {
      score += 4;
    }
    if (hint.includes('numeral') && ruleTitle.includes('numeral')) {
      score += 4;
    }

    // Noun adjective specific pattern
    if (hint.includes('noun adjective') && ruleTitle.includes('noun adjective')) {
      score += 5;
    }

    return score;
  }

  /**
   * Calculate confidence score for rule suggestions
   */
  private calculateConfidence(suggestedRuleIds: number[], hints: string[], keywords: string[]): number {
    if (suggestedRuleIds.length === 0) return 0;
    
    let confidence = 0;
    
    // Base confidence from having suggestions
    confidence += 0.3;
    
    // Boost confidence based on number of hints
    confidence += Math.min(hints.length * 0.1, 0.3);
    
    // Boost confidence based on number of keywords
    confidence += Math.min(keywords.length * 0.05, 0.2);
    
    // Boost confidence if we have strong matches (multiple suggestions)
    if (suggestedRuleIds.length > 1) {
      confidence += 0.2;
    }
    
    return Math.min(confidence, 1.0);
  }

  /**
   * Create rule-question mapping from analysis results
   */
  public matchRulesWithQuestions(rules: ModifierRule[], analyses: QuestionAnalysis[]): RuleQuestionMapping {
    const mapping: RuleQuestionMapping = {};

    // Initialize mapping for all rules
    rules.forEach(rule => {
      mapping[rule.id] = [];
    });

    // Assign questions to rules based on analysis
    analyses.forEach(analysis => {
      if (analysis.suggestedRuleIds.length > 0 && analysis.confidence > 0.3) {
        // For questions with multiple hints, assign to all matching rules
        analysis.suggestedRuleIds.forEach(ruleId => {
          if (!mapping[ruleId].includes(analysis.questionId)) {
            mapping[ruleId].push(analysis.questionId);
          }
        });
      }
    });

    return mapping;
  }

  /**
   * Calculate question counts for each rule
   */
  private calculateQuestionCounts(mapping: RuleQuestionMapping): Record<number, number> {
    const counts: Record<number, number> = {};
    
    Object.entries(mapping).forEach(([ruleId, questionIds]) => {
      counts[parseInt(ruleId)] = questionIds.length;
    });
    
    return counts;
  }

  /**
   * Find questions that couldn't be matched to any rule
   */
  private findUnmatchedQuestions(analyses: QuestionAnalysis[]): string[] {
    return analyses
      .filter(analysis => analysis.suggestedRuleIds.length === 0 || analysis.confidence <= 0.3)
      .map(analysis => analysis.questionId);
  }

  /**
   * Get questions for a specific rule
   */
  public getQuestionsForRule(ruleId: number, mapping: RuleQuestionMapping): ModifierQuestion[] {
    const questionIds = mapping[ruleId] || [];
    return this.questions.filter(question => questionIds.includes(question.id));
  }

  /**
   * Get analysis for a specific question
   */
  public getQuestionAnalysis(questionId: string, analyses: QuestionAnalysis[]): QuestionAnalysis | undefined {
    return analyses.find(analysis => analysis.questionId === questionId);
  }

  /**
   * Manual override for rule-question associations
   * Useful for handling edge cases or improving accuracy
   */
  public addManualMapping(ruleId: number, questionId: string, mapping: RuleQuestionMapping): RuleQuestionMapping {
    const updatedMapping = { ...mapping };
    
    // Remove question from other rules first
    Object.keys(updatedMapping).forEach(key => {
      const rId = parseInt(key);
      updatedMapping[rId] = updatedMapping[rId].filter(qId => qId !== questionId);
    });
    
    // Add to specified rule
    if (!updatedMapping[ruleId]) {
      updatedMapping[ruleId] = [];
    }
    updatedMapping[ruleId].push(questionId);
    
    return updatedMapping;
  }

  /**
   * Get statistics about the matching results
   */
  public getMatchingStats(result: MatchingResult): {
    totalQuestions: number;
    matchedQuestions: number;
    unmatchedQuestions: number;
    averageConfidence: number;
    rulesWithQuestions: number;
    rulesWithoutQuestions: number;
  } {
    const totalQuestions = this.questions.length;
    const unmatchedQuestions = result.unmatchedQuestions.length;
    const matchedQuestions = totalQuestions - unmatchedQuestions;
    
    const averageConfidence = result.analysisResults.reduce((sum, analysis) => 
      sum + analysis.confidence, 0) / result.analysisResults.length;
    
    const rulesWithQuestions = Object.values(result.questionCounts)
      .filter(count => count > 0).length;
    const rulesWithoutQuestions = this.rules.length - rulesWithQuestions;

    return {
      totalQuestions,
      matchedQuestions,
      unmatchedQuestions,
      averageConfidence,
      rulesWithQuestions,
      rulesWithoutQuestions
    };
  }
}

// Utility function to create a matcher instance
export function createRuleQuestionMatcher(
  rules: ModifierRule[], 
  questions: ModifierQuestion[]
): RuleQuestionMatcher {
  return new RuleQuestionMatcher(rules, questions);
}

// Export types for use in other components
export type { QuestionAnalysis, RuleQuestionMapping, MatchingResult };