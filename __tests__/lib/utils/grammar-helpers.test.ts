import {
  formatGrammarRule,
  searchGrammarRules,
  filterGrammarRulesByLevel,
  filterGrammarRulesByTopic,
  sortGrammarRules,
  getGrammarRuleStats,
  validateGrammarRule,
  validateGrammarRules,
  generateGrammarRuleId,
  createGrammarRuleTemplate
} from '@/lib/utils/grammar-helpers'

const mockGrammarRules = [
  {
    id: 1,
    ruleNo: 'Rule 1',
    title: 'Present Simple Tense',
    bengali: 'বর্তমান সাধারণ কাল',
    description: 'Used for habitual actions and general truths',
    structures: ['Subject + Verb (base form)', 'Subject + do/does + not + Verb'],
    examples: ['I eat rice every day.', 'She does not like coffee.', 'They play football.'],
    tips: ['Use base form for I, you, we, they'],
    level: 'HSC' as const,
    topic: 'use-of-verbs' as const
  },
  {
    id: 2,
    ruleNo: 'Rule 2',
    title: 'Past Simple Tense',
    bengali: 'অতীত সাধারণ কাল',
    description: 'Used for completed actions in the past',
    structures: ['Subject + Verb (past form)', 'Subject + did + not + Verb'],
    examples: ['I ate rice yesterday.', 'She did not come to school.'],
    level: 'SSC' as const,
    topic: 'use-of-verbs' as const
  },
  {
    id: 3,
    ruleNo: 'Rule 3',
    title: 'Connectors Usage',
    bengali: 'সংযোজক ব্যবহার',
    description: 'Words that connect sentences and clauses',
    structures: ['Sentence + connector + sentence'],
    examples: ['I was tired, but I continued working.'],
    level: 'BOTH' as const,
    topic: 'connectors' as const
  }
]

describe('grammar-helpers', () => {
  describe('formatGrammarRule', () => {
    it('formats rule with default options', () => {
      const formatted = formatGrammarRule(mockGrammarRules[0])
      
      expect(formatted.id).toBe(1)
      expect(formatted.title).toBe('Present Simple Tense')
      expect(formatted.structures).toHaveLength(2)
      expect(formatted.examples).toHaveLength(3)
      expect(formatted.tips).toHaveLength(1)
    })

    it('limits examples when maxExamples is set', () => {
      const formatted = formatGrammarRule(mockGrammarRules[0], { maxExamples: 2 })
      
      expect(formatted.examples).toHaveLength(2)
      expect(formatted.examples).toEqual([
        'I eat rice every day.',
        'She does not like coffee.'
      ])
    })

    it('limits structures when maxStructures is set', () => {
      const formatted = formatGrammarRule(mockGrammarRules[0], { maxStructures: 1 })
      
      expect(formatted.structures).toHaveLength(1)
      expect(formatted.structures).toEqual(['Subject + Verb (base form)'])
    })

    it('excludes examples when includeExamples is false', () => {
      const formatted = formatGrammarRule(mockGrammarRules[0], { includeExamples: false })
      
      expect(formatted.examples).toBeUndefined()
    })

    it('excludes structures when includeStructures is false', () => {
      const formatted = formatGrammarRule(mockGrammarRules[0], { includeStructures: false })
      
      expect(formatted.structures).toBeUndefined()
    })

    it('excludes tips when includeTips is false', () => {
      const formatted = formatGrammarRule(mockGrammarRules[0], { includeTips: false })
      
      expect(formatted.tips).toBeUndefined()
    })

    it('trims whitespace from string fields', () => {
      const ruleWithWhitespace = {
        ...mockGrammarRules[0],
        title: '  Present Simple Tense  ',
        bengali: '  বর্তমান সাধারণ কাল  ',
        description: '  Used for habitual actions  '
      }
      
      const formatted = formatGrammarRule(ruleWithWhitespace)
      
      expect(formatted.title).toBe('Present Simple Tense')
      expect(formatted.bengali).toBe('বর্তমান সাধারণ কাল')
      expect(formatted.description).toBe('Used for habitual actions')
    })
  })

  describe('searchGrammarRules', () => {
    it('returns all rules when query is empty', () => {
      const result = searchGrammarRules(mockGrammarRules, '')
      expect(result).toHaveLength(3)
    })

    it('searches by title', () => {
      const result = searchGrammarRules(mockGrammarRules, 'Present')
      expect(result).toHaveLength(1)
      expect(result[0].title).toBe('Present Simple Tense')
    })

    it('searches by bengali text', () => {
      const result = searchGrammarRules(mockGrammarRules, 'বর্তমান')
      expect(result).toHaveLength(1)
      expect(result[0].bengali).toContain('বর্তমান')
    })

    it('searches by description', () => {
      const result = searchGrammarRules(mockGrammarRules, 'habitual')
      expect(result).toHaveLength(1)
      expect(result[0].description).toContain('habitual')
    })

    it('searches in examples', () => {
      const result = searchGrammarRules(mockGrammarRules, 'coffee')
      expect(result).toHaveLength(1)
      expect(result[0].examples?.some(ex => ex.includes('coffee'))).toBe(true)
    })

    it('performs case-insensitive search by default', () => {
      const result = searchGrammarRules(mockGrammarRules, 'PRESENT')
      expect(result).toHaveLength(1)
    })

    it('performs case-sensitive search when specified', () => {
      const result = searchGrammarRules(mockGrammarRules, 'PRESENT', { caseSensitive: true })
      expect(result).toHaveLength(0)
    })

    it('performs exact match when specified', () => {
      const result = searchGrammarRules(mockGrammarRules, 'Present Simple Tense', { exactMatch: true })
      expect(result).toHaveLength(1)
      
      const partialResult = searchGrammarRules(mockGrammarRules, 'Present', { exactMatch: true })
      expect(partialResult).toHaveLength(0)
    })

    it('searches only in specified fields', () => {
      const result = searchGrammarRules(mockGrammarRules, 'coffee', { 
        searchFields: ['title', 'description'] 
      })
      expect(result).toHaveLength(0) // coffee is only in examples
    })
  })

  describe('filterGrammarRulesByLevel', () => {
    it('filters rules by HSC level', () => {
      const result = filterGrammarRulesByLevel(mockGrammarRules, 'HSC')
      expect(result).toHaveLength(2) // HSC + BOTH
      expect(result.every(rule => rule.level === 'HSC' || rule.level === 'BOTH')).toBe(true)
    })

    it('filters rules by SSC level', () => {
      const result = filterGrammarRulesByLevel(mockGrammarRules, 'SSC')
      expect(result).toHaveLength(2) // SSC + BOTH
      expect(result.every(rule => rule.level === 'SSC' || rule.level === 'BOTH')).toBe(true)
    })
  })

  describe('filterGrammarRulesByTopic', () => {
    it('filters rules by topic', () => {
      const result = filterGrammarRulesByTopic(mockGrammarRules, 'use-of-verbs')
      expect(result).toHaveLength(2)
      expect(result.every(rule => rule.topic === 'use-of-verbs')).toBe(true)
    })

    it('returns empty array for non-existent topic', () => {
      const result = filterGrammarRulesByTopic(mockGrammarRules, 'non-existent' as any)
      expect(result).toHaveLength(0)
    })
  })

  describe('sortGrammarRules', () => {
    it('sorts by id in ascending order by default', () => {
      const shuffled = [mockGrammarRules[2], mockGrammarRules[0], mockGrammarRules[1]]
      const result = sortGrammarRules(shuffled)
      
      expect(result[0].id).toBe(1)
      expect(result[1].id).toBe(2)
      expect(result[2].id).toBe(3)
    })

    it('sorts by id in descending order', () => {
      const result = sortGrammarRules(mockGrammarRules, 'id', 'desc')
      
      expect(result[0].id).toBe(3)
      expect(result[1].id).toBe(2)
      expect(result[2].id).toBe(1)
    })

    it('sorts by title', () => {
      const result = sortGrammarRules(mockGrammarRules, 'title')
      
      expect(result[0].title).toBe('Connectors Usage')
      expect(result[1].title).toBe('Past Simple Tense')
      expect(result[2].title).toBe('Present Simple Tense')
    })

    it('sorts by level', () => {
      const result = sortGrammarRules(mockGrammarRules, 'level')
      
      expect(result[0].level).toBe('BOTH')
      expect(result[1].level).toBe('HSC')
      expect(result[2].level).toBe('SSC')
    })

    it('does not mutate original array', () => {
      const original = [...mockGrammarRules]
      sortGrammarRules(mockGrammarRules, 'id', 'desc')
      
      expect(mockGrammarRules).toEqual(original)
    })
  })

  describe('getGrammarRuleStats', () => {
    it('calculates correct statistics', () => {
      const stats = getGrammarRuleStats(mockGrammarRules)
      
      expect(stats.total).toBe(3)
      expect(stats.byLevel.HSC).toBe(1)
      expect(stats.byLevel.SSC).toBe(1)
      expect(stats.byLevel.BOTH).toBe(1)
      expect(stats.byTopic['use-of-verbs']).toBe(2)
      expect(stats.byTopic['connectors']).toBe(1)
      expect(stats.withExamples).toBe(3)
      expect(stats.withStructures).toBe(3)
      expect(stats.withTips).toBe(1)
    })

    it('calculates averages correctly', () => {
      const stats = getGrammarRuleStats(mockGrammarRules)
      
      // (3 + 2 + 1) / 3 = 2
      expect(stats.averageExamples).toBe(2)
      // (2 + 2 + 1) / 3 = 1.67
      expect(stats.averageStructures).toBeCloseTo(1.67, 2)
    })

    it('handles empty array', () => {
      const stats = getGrammarRuleStats([])
      
      expect(stats.total).toBe(0)
      expect(stats.averageExamples).toBe(0)
      expect(stats.averageStructures).toBe(0)
    })
  })

  describe('validateGrammarRule', () => {
    it('validates correct rule', () => {
      const result = validateGrammarRule(mockGrammarRules[0])
      
      expect(result.isValid).toBe(true)
      expect(result.errors).toHaveLength(0)
    })

    it('detects missing required fields', () => {
      const invalidRule = { id: 1 }
      const result = validateGrammarRule(invalidRule)
      
      expect(result.isValid).toBe(false)
      expect(result.errors).toContain('Rule title is required and must be a non-empty string')
      expect(result.errors).toContain('Bengali translation is required and must be a non-empty string')
      expect(result.errors).toContain('Rule description is required and must be a non-empty string')
    })

    it('detects invalid field types', () => {
      const invalidRule = {
        id: 'not-a-number',
        title: 123,
        bengali: null,
        description: '',
        structures: 'not-an-array',
        examples: {},
        level: 'INVALID'
      }
      const result = validateGrammarRule(invalidRule)
      
      expect(result.isValid).toBe(false)
      expect(result.errors).toContain('Rule ID is required and must be a number')
      expect(result.errors).toContain('Structures must be an array')
      expect(result.errors).toContain('Examples must be an array')
      expect(result.errors).toContain('Level must be one of: HSC, SSC, BOTH')
    })

    it('validates array contents', () => {
      const invalidRule = {
        id: 1,
        title: 'Test',
        bengali: 'Test',
        description: 'Test',
        structures: ['valid', '', null],
        examples: ['valid', 123, '']
      }
      const result = validateGrammarRule(invalidRule)
      
      expect(result.isValid).toBe(false)
      expect(result.errors.some(error => error.includes('Structure at index'))).toBe(true)
      expect(result.errors.some(error => error.includes('Example at index'))).toBe(true)
    })
  })

  describe('validateGrammarRules', () => {
    it('validates array of rules', () => {
      const result = validateGrammarRules(mockGrammarRules)
      
      expect(result.isValid).toBe(true)
      expect(result.validCount).toBe(3)
      expect(result.invalidCount).toBe(0)
      expect(result.errors).toHaveLength(0)
    })

    it('identifies invalid rules', () => {
      const mixedRules = [
        mockGrammarRules[0],
        { id: 'invalid' },
        mockGrammarRules[1]
      ]
      const result = validateGrammarRules(mixedRules)
      
      expect(result.isValid).toBe(false)
      expect(result.validCount).toBe(2)
      expect(result.invalidCount).toBe(1)
      expect(result.errors).toHaveLength(1)
      expect(result.errors[0].ruleId).toBe('invalid')
    })
  })

  describe('generateGrammarRuleId', () => {
    it('generates next available ID', () => {
      const id = generateGrammarRuleId(mockGrammarRules)
      expect(id).toBe(4) // max ID is 3, so next is 4
    })

    it('handles empty array', () => {
      const id = generateGrammarRuleId([])
      expect(id).toBe(1)
    })

    it('handles non-sequential IDs', () => {
      const rules = [
        { ...mockGrammarRules[0], id: 1 },
        { ...mockGrammarRules[1], id: 5 },
        { ...mockGrammarRules[2], id: 3 }
      ]
      const id = generateGrammarRuleId(rules)
      expect(id).toBe(6) // max ID is 5, so next is 6
    })
  })

  describe('createGrammarRuleTemplate', () => {
    it('creates template with default level', () => {
      const template = createGrammarRuleTemplate('connectors')
      
      expect(template.id).toBe(0)
      expect(template.level).toBe('HSC')
      expect(template.topic).toBe('connectors')
      expect(template.structures).toEqual([])
      expect(template.examples).toEqual([])
      expect(template.tips).toEqual([])
    })

    it('creates template with specified level', () => {
      const template = createGrammarRuleTemplate('use-of-verbs', 'SSC')
      
      expect(template.level).toBe('SSC')
      expect(template.topic).toBe('use-of-verbs')
    })
  })
})