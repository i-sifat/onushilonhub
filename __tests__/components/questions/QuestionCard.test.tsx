import React from 'react'
import { render, screen } from '@testing-library/react'
import QuestionCard from '../../../components/questions/QuestionCard'

const mockQuestionWithPassage = {
  id: 'dhaka-2023-01',
  passage: 'This is a sample passage with blanks to fill.',
  blanks: [
    { id: 'a', answer: 'answer1' },
    { id: 'b', answer: 'answer2' },
    { id: 'c', answer: 'answer3' }
  ],
  ruleId: '1'
}

const mockSimpleQuestion = {
  id: 'chittagong-2022-02',
  question: 'What is the correct form of the verb?'
}

const mockQuestionWithManyBlanks = {
  id: 'sylhet-2021-03',
  passage: 'Passage with many blanks',
  blanks: Array.from({ length: 10 }, (_, i) => ({
    id: String.fromCharCode(97 + i), // a, b, c, ...
    answer: `answer${i + 1}`
  }))
}

describe('QuestionCard', () => {
  it('renders question with passage and blanks', () => {
    render(<QuestionCard question={mockQuestionWithPassage} index={0} />)

    expect(screen.getByText('Question 1')).toBeInTheDocument()
    expect(screen.getByText('Passage:')).toBeInTheDocument()
    expect(screen.getByText('This is a sample passage with blanks to fill.')).toBeInTheDocument()
    expect(screen.getByText('Sample Answers:')).toBeInTheDocument()
    expect(screen.getByText('(a)')).toBeInTheDocument()
    expect(screen.getByText('answer1')).toBeInTheDocument()
    expect(screen.getByText('Rule 1')).toBeInTheDocument()
  })

  it('renders simple question without passage', () => {
    render(<QuestionCard question={mockSimpleQuestion} index={1} />)

    expect(screen.getByText('Question 2')).toBeInTheDocument()
    expect(screen.getByText('What is the correct form of the verb?')).toBeInTheDocument()
    expect(screen.queryByText('Passage:')).not.toBeInTheDocument()
    expect(screen.queryByText('Sample Answers:')).not.toBeInTheDocument()
  })

  it('extracts and displays metadata correctly', () => {
    render(<QuestionCard question={mockQuestionWithPassage} index={0} />)

    expect(screen.getByText('Dhaka')).toBeInTheDocument()
    expect(screen.getByText('2023')).toBeInTheDocument()
  })

  it('handles different board names correctly', () => {
    const question = { ...mockSimpleQuestion, id: 'chittagong-2022-02' }
    render(<QuestionCard question={question} index={0} />)

    expect(screen.getByText('Chittagong')).toBeInTheDocument()
    expect(screen.getByText('2022')).toBeInTheDocument()
  })

  it('does not render rule badge when ruleId is not provided', () => {
    render(<QuestionCard question={mockSimpleQuestion} index={0} />)

    expect(screen.queryByText(/Rule/)).not.toBeInTheDocument()
  })

  it('limits displayed blanks to 6 and shows count for remaining', () => {
    render(<QuestionCard question={mockQuestionWithManyBlanks} index={0} />)

    // Should show first 6 answers
    expect(screen.getByText('(a)')).toBeInTheDocument()
    expect(screen.getByText('answer1')).toBeInTheDocument()
    expect(screen.getByText('(f)')).toBeInTheDocument()
    expect(screen.getByText('answer6')).toBeInTheDocument()

    // Should show remaining count
    expect(screen.getByText('... and 4 more answers')).toBeInTheDocument()

    // Should not show 7th answer directly
    expect(screen.queryByText('(g)')).not.toBeInTheDocument()
    expect(screen.queryByText('answer7')).not.toBeInTheDocument()
  })

  it('applies custom className', () => {
    render(<QuestionCard question={mockSimpleQuestion} index={0} className="custom-class" />)

    const card = screen.getByText('Question 1').closest('[class*="custom-class"]')
    expect(card).toBeInTheDocument()
  })

  it('renders icons for metadata', () => {
    render(<QuestionCard question={mockQuestionWithPassage} index={0} />)

    const icons = document.querySelectorAll('svg')
    expect(icons.length).toBeGreaterThan(0)
  })

  it('handles question without blanks but with passage', () => {
    const questionWithoutBlanks = {
      id: 'rajshahi-2020-01',
      passage: 'This is a passage without blanks.'
    }

    render(<QuestionCard question={questionWithoutBlanks} index={0} />)

    expect(screen.getByText('Passage:')).toBeInTheDocument()
    expect(screen.getByText('This is a passage without blanks.')).toBeInTheDocument()
    expect(screen.queryByText('Sample Answers:')).not.toBeInTheDocument()
  })

  it('displays correct question number based on index', () => {
    render(<QuestionCard question={mockSimpleQuestion} index={4} />)

    expect(screen.getByText('Question 5')).toBeInTheDocument()
  })

  it('handles empty blanks array', () => {
    const questionWithEmptyBlanks = {
      ...mockQuestionWithPassage,
      blanks: []
    }

    render(<QuestionCard question={questionWithEmptyBlanks} index={0} />)

    expect(screen.getByText('Passage:')).toBeInTheDocument()
    expect(screen.queryByText('Sample Answers:')).not.toBeInTheDocument()
  })
})