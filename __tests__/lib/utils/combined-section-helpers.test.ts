import {
  createRuleQuestionMapping,
  calculateQuestionCounts,
  filterByLevel,
  validateCombinedSectionData,
  createCombinedSectionConfig
} from '@/lib/utils/combined-section-helpers';
import { GenericRule, GenericQuestion } from '@/components/combined/CombinedSectionLayout';

// Test data
const testRules: GenericRule[] = [
  {
    id: 1,
    ruleNo: "Rule 1",
    title: "Test Rule 1",
    banglaDescription: "Test description 1",
    examples: ["Example 1"],
    topic: 'test',
    level: 'HSC'
  },
  {
    id: 2,
    ruleNo: "Rule 2",
    title: "Test Rule 2",
    banglaDescription: "Test description 2",
    examples: ["Example 2"],
    topic: 'test',
    level: 'SSC'
  }
];

const testQuestions: GenericQuestion[] = [
  {
    id: "q1",
    topic: 'test',
    level: 'HSC',
    question: "Test question 1",
    answer: "Test answer 1",
    ruleId: 1
  },
  {
    id: "q2",
    topic: 'test',
    level: 'HSC',
    question: "Test question 2",
    answer: "Test answer 2",
    ruleId: 1
  },
  {
    id: "q3",
    topic: 'test',
    level: 'SSC',
    question: "Test question 3",
    answer: "Test answer 3",
    ruleId: 2
  }
];

describe('Combined Section Helpers', () => {
  describe('createRuleQuestionMapping', () => {
    it('should create correct rule-question mapping', () => {
      const mapping = createRuleQuestionMapping(testRules, testQuestions);
      
      expect(mapping[1]).toHaveLength(2);
      expect(mapping[2]).toHaveLength(1);
      expect(mapping[1][0].id).toBe("q1");
      expect(mapping[1][1].id).toBe("q2");
      expect(mapping[2][0].id).toBe("q3");
    });

    it('should handle rules with no questions', () => {
      const rulesWithNoQuestions = [
        ...testRules,
        {
          id: 3,
          ruleNo: "Rule 3",
          title: "Test Rule 3",
          banglaDescription: "Test description 3",
          examples: [],
          topic: 'test',
          level: 'HSC'
        }
      ];
      
      const mapping = createRuleQuestionMapping(rulesWithNoQuestions, testQuestions);
      expect(mapping[3]).toHaveLength(0);
    });
  });

  describe('calculateQuestionCounts', () => {
    it('should calculate correct question counts', () => {
      const counts = calculateQuestionCounts(testRules, testQuestions);
      
      expect(counts[1]).toBe(2);
      expect(counts[2]).toBe(1);
    });

    it('should return 0 for rules with no questions', () => {
      const rulesWithNoQuestions = [
        ...testRules,
        {
          id: 3,
          ruleNo: "Rule 3",
          title: "Test Rule 3",
          banglaDescription: "Test description 3",
          examples: [],
          topic: 'test',
          level: 'HSC'
        }
      ];
      
      const counts = calculateQuestionCounts(rulesWithNoQuestions, testQuestions);
      expect(counts[3]).toBe(0);
    });
  });

  describe('filterByLevel', () => {
    it('should filter rules and questions by HSC level', () => {
      const { rules, questions } = filterByLevel(testRules, testQuestions, 'HSC');
      
      expect(rules).toHaveLength(1);
      expect(questions).toHaveLength(2);
      expect(rules[0].level).toBe('HSC');
      expect(questions.every(q => q.level === 'HSC')).toBe(true);
    });

    it('should filter rules and questions by SSC level', () => {
      const { rules, questions } = filterByLevel(testRules, testQuestions, 'SSC');
      
      expect(rules).toHaveLength(1);
      expect(questions).toHaveLength(1);
      expect(rules[0].level).toBe('SSC');
      expect(questions.every(q => q.level === 'SSC')).toBe(true);
    });
  });

  describe('validateCombinedSectionData', () => {
    it('should validate correct data', () => {
      const validation = validateCombinedSectionData(testRules, testQuestions);
      
      expect(validation.isValid).toBe(true);
      expect(validation.errors).toHaveLength(0);
    });

    it('should detect missing rule properties', () => {
      const invalidRules = [
        {
          id: 1,
          ruleNo: "Rule 1",
          title: "",
          banglaDescription: "Test description",
          examples: [],
          topic: 'test',
          level: 'HSC' as const
        }
      ];
      
      const validation = validateCombinedSectionData(invalidRules, testQuestions);
      
      expect(validation.isValid).toBe(false);
      expect(validation.errors).toContain("Rule at index 0 is missing title");
    });

    it('should detect missing question properties', () => {
      const invalidQuestions = [
        {
          id: "",
          topic: 'test',
          level: 'HSC' as const,
          question: "Test question",
          answer: "Test answer"
        }
      ];
      
      const validation = validateCombinedSectionData(testRules, invalidQuestions);
      
      expect(validation.isValid).toBe(false);
      expect(validation.errors).toContain("Question at index 0 is missing id");
    });
  });

  describe('createCombinedSectionConfig', () => {
    it('should create complete configuration for HSC level', () => {
      const config = createCombinedSectionConfig('test', 'HSC', testRules, testQuestions);
      
      expect(config.topic).toBe('test');
      expect(config.level).toBe('HSC');
      expect(config.rules).toHaveLength(1);
      expect(config.questions).toHaveLength(2);
      expect(config.questionCounts[1]).toBe(2);
      expect(config.ruleQuestionMapping[1]).toHaveLength(2);
    });

    it('should create complete configuration for SSC level', () => {
      const config = createCombinedSectionConfig('test', 'SSC', testRules, testQuestions);
      
      expect(config.topic).toBe('test');
      expect(config.level).toBe('SSC');
      expect(config.rules).toHaveLength(1);
      expect(config.questions).toHaveLength(1);
      expect(config.questionCounts[2]).toBe(1);
      expect(config.ruleQuestionMapping[2]).toHaveLength(1);
    });
  });
});