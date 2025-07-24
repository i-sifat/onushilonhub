import { GenericRule, GenericQuestion } from '@/components/combined/CombinedSectionLayout';

/**
 * Utility functions for creating combined sections for different grammar topics
 */

/**
 * Creates a rule-question mapping based on ruleId property
 * This is a generic approach that works with any topic
 */
export function createRuleQuestionMapping<TRule extends GenericRule, TQuestion extends GenericQuestion>(
  rules: TRule[],
  questions: TQuestion[]
): Record<number, TQuestion[]> {
  const mapping: Record<number, TQuestion[]> = {};
  
  // Initialize all rules with empty arrays
  rules.forEach(rule => {
    mapping[rule.id] = [];
  });
  
  // Group questions by ruleId
  questions.forEach(question => {
    if (question.ruleId && mapping[question.ruleId] !== undefined) {
      mapping[question.ruleId].push(question);
    }
  });
  
  return mapping;
}

/**
 * Calculates question counts for each rule
 */
export function calculateQuestionCounts<TRule extends GenericRule, TQuestion extends GenericQuestion>(
  rules: TRule[],
  questions: TQuestion[]
): Record<number, number> {
  const counts: Record<number, number> = {};
  
  // Initialize all rules with 0 count
  rules.forEach(rule => {
    counts[rule.id] = 0;
  });
  
  // Count questions for each rule
  questions.forEach(question => {
    if (question.ruleId && counts[question.ruleId] !== undefined) {
      counts[question.ruleId]++;
    }
  });
  
  return counts;
}

/**
 * Filters rules and questions by level
 * Rules with level 'BOTH' are included for both HSC and SSC
 */
export function filterByLevel<TRule extends GenericRule, TQuestion extends GenericQuestion>(
  rules: TRule[],
  questions: TQuestion[],
  level: 'HSC' | 'SSC'
): { rules: TRule[]; questions: TQuestion[] } {
  return {
    rules: rules.filter(rule => rule.level === level || rule.level === 'BOTH'),
    questions: questions.filter(question => question.level === level)
  };
}

/**
 * Validates that rules and questions have the required properties for combined section
 */
export function validateCombinedSectionData<TRule extends GenericRule, TQuestion extends GenericQuestion>(
  rules: TRule[],
  questions: TQuestion[]
): { isValid: boolean; errors: string[] } {
  const errors: string[] = [];
  
  // Validate rules
  rules.forEach((rule, index) => {
    if (!rule.id) errors.push(`Rule at index ${index} is missing id`);
    if (!rule.title) errors.push(`Rule at index ${index} is missing title`);
    if (!rule.banglaDescription) errors.push(`Rule at index ${index} is missing banglaDescription`);
  });
  
  // Validate questions
  questions.forEach((question, index) => {
    if (!question.id) errors.push(`Question at index ${index} is missing id`);
    if (!question.question) errors.push(`Question at index ${index} is missing question text`);
  });
  
  return {
    isValid: errors.length === 0,
    errors
  };
}

/**
 * Creates a combined section configuration for any topic
 */
export interface CombinedSectionConfig<TRule extends GenericRule, TQuestion extends GenericQuestion> {
  topic: string;
  level: 'HSC' | 'SSC';
  rules: TRule[];
  questions: TQuestion[];
  ruleQuestionMapping: Record<number, TQuestion[]>;
  questionCounts: Record<number, number>;
}

export function createCombinedSectionConfig<TRule extends GenericRule, TQuestion extends GenericQuestion>(
  topic: string,
  level: 'HSC' | 'SSC',
  allRules: TRule[],
  allQuestions: TQuestion[]
): CombinedSectionConfig<TRule, TQuestion> {
  // Filter by level
  const { rules, questions } = filterByLevel(allRules, allQuestions, level);
  
  // Validate data
  const validation = validateCombinedSectionData(rules, questions);
  if (!validation.isValid) {
    console.warn(`Combined section data validation failed for ${topic}:`, validation.errors);
  }
  
  // Create mappings
  const ruleQuestionMapping = createRuleQuestionMapping(rules, questions);
  const questionCounts = calculateQuestionCounts(rules, questions);
  
  return {
    topic,
    level,
    rules,
    questions,
    ruleQuestionMapping,
    questionCounts
  };
}