import { renderHook, act } from '@testing-library/react'
import { useGrammarRules, useGrammarRulesByTopic, useGrammarRulesByLevel, useGrammarRule } from '@/lib/hooks/useGrammarRules'

// Mock the data
jest.mock('@/data/grammar-rules', () => ({
  grammarRulesData: {
    'use-of-verbs': {
      topic: 'use-of-verbs',
      rules: [
        {
          id: 1,
          ruleNo: 'Rule 1',
          title: 'Present Simple',
          bengali: 'বর্তমান সাধারণ',
          description: 'Used for habitual actions',
          structures: ['Subject + Verb'],
          examples: ['I eat rice'],
          level: 'HSC',
          topic: 'use-of-verbs'
        },
        {
          id: 2,
          ruleNo: 'Rule 2',
          title: 'Past Simple',
          bengali: 'অতীত সাধারণ',
          description: 'Used for past actions',
          structures: ['Subject + Verb (past)'],
          examples: ['I ate rice'],
          level: 'SSC',
          topic: 'use-of-verbs'
        }
      ]
    },
    'connectors': {
      topic: 'connectors',
      rules: [
        {
          id: 3,
          ruleNo: 'Rule 3',
          title: 'Connectors Usage',
          bengali: 'সংযোজক ব্যবহার',
          description: 'Words that connect sentences',
          structures: ['Sentence + connector + sentence'],
          examples: ['I was tired, but I continued working'],
          level: 'HSC',
          topic: 'connectors'
        }
      ]
    }
  }
}))

// Mock timers for loading states
jest.useFakeTimers()

describe('useGrammarRules', () => {
  beforeEach(() => {
    jest.clearAllTimers()
  })

  afterEach(() => {
    jest.runOnlyPendingTimers()
    jest.useRealTimers()
    jest.useFakeTimers()
  })

  it('loads all rules by default', () => {
    const { result } = renderHook(() => useGrammarRules())
    
    expect(result.current.loading).toBe(true)
    
    act(() => {
      jest.advanceTimersByTime(100)
    })
    
    expect(result.current.loading).toBe(false)
    expect(result.current.allRules).toHaveLength(3)
    expect(result.current.rules).toHaveLength(3)
  })

  it('filters rules by topic', () => {
    const { result } = renderHook(() => useGrammarRules({ topic: 'use-of-verbs' }))
    
    act(() => {
      jest.advanceTimersByTime(100)
    })
    
    expect(result.current.rules).toHaveLength(2)
    expect(result.current.selectedTopic).toBe('use-of-verbs')
    expect(result.current.rules.every(rule => rule.topic === 'use-of-verbs')).toBe(true)
  })

  it('filters rules by level', () => {
    const { result } = renderHook(() => useGrammarRules({ level: 'HSC' }))
    
    act(() => {
      jest.advanceTimersByTime(100)
    })
    
    expect(result.current.rules).toHaveLength(2)
    expect(result.current.selectedLevel).toBe('HSC')
    expect(result.current.rules.every(rule => rule.level === 'HSC')).toBe(true)
  })

  it('searches rules by query', () => {
    const { result } = renderHook(() => useGrammarRules({ searchQuery: 'Present' }))
    
    act(() => {
      jest.advanceTimersByTime(100)
    })
    
    expect(result.current.rules).toHaveLength(1)
    expect(result.current.searchQuery).toBe('Present')
    expect(result.current.rules[0].title).toBe('Present Simple')
  })

  it('sorts rules correctly', () => {
    const { result } = renderHook(() => useGrammarRules({ sortBy: 'title', sortOrder: 'asc' }))
    
    act(() => {
      jest.advanceTimersByTime(100)
    })
    
    expect(result.current.sortBy).toBe('title')
    expect(result.current.sortOrder).toBe('asc')
    expect(result.current.rules[0].title).toBe('Connectors Usage')
    expect(result.current.rules[1].title).toBe('Past Simple')
    expect(result.current.rules[2].title).toBe('Present Simple')
  })

  it('updates search query', () => {
    const { result } = renderHook(() => useGrammarRules())
    
    act(() => {
      jest.advanceTimersByTime(100)
    })
    
    act(() => {
      result.current.setSearchQuery('connectors')
    })
    
    expect(result.current.searchQuery).toBe('connectors')
    expect(result.current.rules).toHaveLength(1)
    expect(result.current.rules[0].topic).toBe('connectors')
  })

  it('updates selected topic', () => {
    const { result } = renderHook(() => useGrammarRules())
    
    act(() => {
      jest.advanceTimersByTime(100)
    })
    
    act(() => {
      result.current.setSelectedTopic('connectors')
    })
    
    expect(result.current.selectedTopic).toBe('connectors')
    expect(result.current.rules).toHaveLength(1)
    expect(result.current.rules[0].topic).toBe('connectors')
  })

  it('updates selected level', () => {
    const { result } = renderHook(() => useGrammarRules())
    
    act(() => {
      jest.advanceTimersByTime(100)
    })
    
    act(() => {
      result.current.setSelectedLevel('SSC')
    })
    
    expect(result.current.selectedLevel).toBe('SSC')
    expect(result.current.rules).toHaveLength(1)
    expect(result.current.rules[0].level).toBe('SSC')
  })

  it('updates sorting options', () => {
    const { result } = renderHook(() => useGrammarRules())
    
    act(() => {
      jest.advanceTimersByTime(100)
    })
    
    act(() => {
      result.current.setSortBy('title')
      result.current.setSortOrder('desc')
    })
    
    expect(result.current.sortBy).toBe('title')
    expect(result.current.sortOrder).toBe('desc')
    expect(result.current.rules[0].title).toBe('Present Simple')
  })

  it('gets rule by ID', () => {
    const { result } = renderHook(() => useGrammarRules())
    
    act(() => {
      jest.advanceTimersByTime(100)
    })
    
    const rule = result.current.getRuleById(1)
    expect(rule).toBeDefined()
    expect(rule?.id).toBe(1)
    expect(rule?.title).toBe('Present Simple')
    
    const nonExistentRule = result.current.getRuleById(999)
    expect(nonExistentRule).toBeUndefined()
  })

  it('gets rules by topic', () => {
    const { result } = renderHook(() => useGrammarRules())
    
    act(() => {
      jest.advanceTimersByTime(100)
    })
    
    const rules = result.current.getRulesByTopic('use-of-verbs')
    expect(rules).toHaveLength(2)
    expect(rules.every(rule => rule.topic === 'use-of-verbs')).toBe(true)
  })

  it('gets rules by level', () => {
    const { result } = renderHook(() => useGrammarRules())
    
    act(() => {
      jest.advanceTimersByTime(100)
    })
    
    const rules = result.current.getRulesByLevel('HSC')
    expect(rules).toHaveLength(2)
    expect(rules.every(rule => rule.level === 'HSC')).toBe(true)
  })

  it('searches rules', () => {
    const { result } = renderHook(() => useGrammarRules())
    
    act(() => {
      jest.advanceTimersByTime(100)
    })
    
    const rules = result.current.searchRules('Simple')
    expect(rules).toHaveLength(2)
    expect(rules.every(rule => rule.title.includes('Simple'))).toBe(true)
  })

  it('resets filters', () => {
    const { result } = renderHook(() => useGrammarRules({
      topic: 'connectors',
      level: 'HSC',
      searchQuery: 'test',
      sortBy: 'title',
      sortOrder: 'desc'
    }))
    
    act(() => {
      jest.advanceTimersByTime(100)
    })
    
    act(() => {
      result.current.resetFilters()
    })
    
    expect(result.current.searchQuery).toBe('')
    expect(result.current.selectedTopic).toBeUndefined()
    expect(result.current.selectedLevel).toBeUndefined()
    expect(result.current.sortBy).toBe('id')
    expect(result.current.sortOrder).toBe('asc')
  })

  it('refreshes data', () => {
    const { result } = renderHook(() => useGrammarRules())
    
    act(() => {
      jest.advanceTimersByTime(100)
    })
    
    expect(result.current.loading).toBe(false)
    
    act(() => {
      result.current.refresh()
    })
    
    expect(result.current.loading).toBe(true)
    
    act(() => {
      jest.advanceTimersByTime(100)
    })
    
    expect(result.current.loading).toBe(false)
  })

  it('calculates statistics', () => {
    const { result } = renderHook(() => useGrammarRules())
    
    act(() => {
      jest.advanceTimersByTime(100)
    })
    
    expect(result.current.stats.total).toBe(3)
    expect(result.current.stats.byLevel.HSC).toBe(2)
    expect(result.current.stats.byLevel.SSC).toBe(1)
    expect(result.current.stats.byTopic['use-of-verbs']).toBe(2)
    expect(result.current.stats.byTopic['connectors']).toBe(1)
  })

  it('disables auto-fetch when specified', () => {
    const { result } = renderHook(() => useGrammarRules({ autoFetch: false }))
    
    expect(result.current.loading).toBe(false)
    expect(result.current.allRules).toHaveLength(3) // Still loads static data
  })
})

describe('useGrammarRulesByTopic', () => {
  it('filters by specific topic', () => {
    const { result } = renderHook(() => useGrammarRulesByTopic('use-of-verbs'))
    
    act(() => {
      jest.advanceTimersByTime(100)
    })
    
    expect(result.current.selectedTopic).toBe('use-of-verbs')
    expect(result.current.rules).toHaveLength(2)
    expect(result.current.rules.every(rule => rule.topic === 'use-of-verbs')).toBe(true)
  })
})

describe('useGrammarRulesByLevel', () => {
  it('filters by specific level', () => {
    const { result } = renderHook(() => useGrammarRulesByLevel('HSC'))
    
    act(() => {
      jest.advanceTimersByTime(100)
    })
    
    expect(result.current.selectedLevel).toBe('HSC')
    expect(result.current.rules).toHaveLength(2)
    expect(result.current.rules.every(rule => rule.level === 'HSC')).toBe(true)
  })
})

describe('useGrammarRule', () => {
  it('gets single rule by ID', () => {
    const { result } = renderHook(() => useGrammarRule(1))
    
    expect(result.current.rule).toBeDefined()
    expect(result.current.rule?.id).toBe(1)
    expect(result.current.rule?.title).toBe('Present Simple')
    expect(result.current.exists).toBe(true)
  })

  it('handles non-existent rule', () => {
    const { result } = renderHook(() => useGrammarRule(999))
    
    expect(result.current.rule).toBeUndefined()
    expect(result.current.exists).toBe(false)
  })
})