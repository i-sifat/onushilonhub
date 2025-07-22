import { render, screen } from '@testing-library/react'
import GrammarRuleCard from '@/components/grammar/GrammarRuleCard'

const mockGrammarRule = {
  id: 1,
  ruleNo: 'Rule 1',
  title: 'Present Simple Tense',
  bengali: 'বর্তমান সাধারণ কাল',
  description: 'Used for habitual actions and general truths',
  structures: ['Subject + Verb (base form) + Object', 'Subject + do/does + not + Verb + Object'],
  examples: ['I eat rice every day.', 'She does not like coffee.']
}

describe('GrammarRuleCard', () => {
  it('renders all basic information', () => {
    render(<GrammarRuleCard {...mockGrammarRule} />)
    
    expect(screen.getByText('Rule 1')).toBeInTheDocument()
    expect(screen.getByText('Present Simple Tense')).toBeInTheDocument()
    expect(screen.getByText('বর্তমান সাধারণ কাল')).toBeInTheDocument()
    // Description text removed as per task requirements
  })

  it('renders without optional fields', () => {
    const minimalRule = {
      id: 1,
      title: 'Test Rule',
      description: 'Test description',
      examples: ['Test example']
    }
    
    render(<GrammarRuleCard {...minimalRule} />)
    
    expect(screen.getByText('Rule 1')).toBeInTheDocument() // fallback rule number
    expect(screen.getByText('Test Rule')).toBeInTheDocument()
    // Description text removed as per task requirements
    expect(screen.getByText('Test example')).toBeInTheDocument()
  })

  it('renders structures when provided', () => {
    render(<GrammarRuleCard {...mockGrammarRule} />)
    
    expect(screen.getByText('Structures:')).toBeInTheDocument()
    expect(screen.getByText('Subject + Verb (base form) + Object')).toBeInTheDocument()
    expect(screen.getByText('Subject + do/does + not + Verb + Object')).toBeInTheDocument()
  })

  it('does not render structures section when not provided', () => {
    const ruleWithoutStructures = {
      ...mockGrammarRule,
      structures: undefined
    }
    
    render(<GrammarRuleCard {...ruleWithoutStructures} />)
    
    expect(screen.queryByText('Structures:')).not.toBeInTheDocument()
  })

  it('renders examples section', () => {
    render(<GrammarRuleCard {...mockGrammarRule} />)
    
    expect(screen.getByText('Examples:')).toBeInTheDocument()
    expect(screen.getByText('I eat rice every day.')).toBeInTheDocument()
    expect(screen.getByText('She does not like coffee.')).toBeInTheDocument()
  })

  it('applies custom className', () => {
    render(<GrammarRuleCard {...mockGrammarRule} className="custom-class" />)
    
    const card = screen.getByText('Present Simple Tense').closest('[class*="custom-class"]')
    expect(card).toBeInTheDocument()
    expect(card).toHaveClass('custom-class')
  })

  it('uses fallback rule number when ruleNo is not provided', () => {
    const ruleWithoutRuleNo = {
      ...mockGrammarRule,
      ruleNo: undefined
    }
    
    render(<GrammarRuleCard {...ruleWithoutRuleNo} />)
    
    expect(screen.getByText('Rule 1')).toBeInTheDocument()
  })

  it('does not render Bengali section when not provided', () => {
    const ruleWithoutBengali = {
      ...mockGrammarRule,
      bengali: undefined
    }
    
    render(<GrammarRuleCard {...ruleWithoutBengali} />)
    
    expect(screen.queryByText('Bengali:')).not.toBeInTheDocument()
  })

  it('has correct styling classes', () => {
    render(<GrammarRuleCard {...mockGrammarRule} />)
    
    // Find the root card element by looking for the container with the specific classes
    const card = screen.getByText('Present Simple Tense').closest('[class*="bg-sf-bg"]')
    expect(card).toBeInTheDocument()
    expect(card).toHaveClass('bg-sf-bg', 'border', 'rounded-lg', 'p-6')
  })

  it('renders multiple examples correctly', () => {
    const ruleWithManyExamples = {
      ...mockGrammarRule,
      examples: ['Example 1', 'Example 2', 'Example 3']
    }
    
    render(<GrammarRuleCard {...ruleWithManyExamples} />)
    
    expect(screen.getByText('Example 1')).toBeInTheDocument()
    expect(screen.getByText('Example 2')).toBeInTheDocument()
    expect(screen.getByText('Example 3')).toBeInTheDocument()
  })

  it('renders multiple structures correctly', () => {
    const ruleWithManyStructures = {
      ...mockGrammarRule,
      structures: ['Structure 1', 'Structure 2', 'Structure 3']
    }
    
    render(<GrammarRuleCard {...ruleWithManyStructures} />)
    
    expect(screen.getByText('Structure 1')).toBeInTheDocument()
    expect(screen.getByText('Structure 2')).toBeInTheDocument()
    expect(screen.getByText('Structure 3')).toBeInTheDocument()
  })
})