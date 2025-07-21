// Mock Next.js server APIs
jest.mock('next/server', () => ({
  NextRequest: class NextRequest {
    constructor(url) {
      this.url = url
      const urlObj = new URL(url)
      this.searchParams = urlObj.searchParams
    }
  },
  NextResponse: {
    json: (data, options = {}) => ({
      json: async () => data,
      status: options.status || 200
    })
  }
}))

// Mock the data functions
jest.mock('@/data/questions', () => ({
  getAllQuestions: jest.fn(),
  questionsStats: {
    total: 200,
    byLevel: { HSC: 120, SSC: 80 },
    byBoard: { dhaka: 50, chittagong: 40 },
    byDifficulty: { EASY: 60, MEDIUM: 80, HARD: 60 }
  }
}))

const mockQuestions = [
  {
    id: 'dhaka-2023-01',
    question: 'What is the correct form?',
    answer: 'correct answer',
    explanation: 'This is the explanation',
    topic: 'transformation',
    level: 'HSC' as const,
    board: 'dhaka' as const,
    year: 2023,
    difficulty: 'MEDIUM' as const
  },
  {
    id: 'chittagong-2022-02',
    question: 'Fill in the blanks',
    passage: 'This is a passage with blanks',
    topic: 'completing-sentence',
    level: 'SSC' as const,
    board: 'chittagong' as const,
    year: 2022,
    difficulty: 'EASY' as const
  }
]

describe('/api/questions', () => {
  const { getAllQuestions } = require('@/data/questions')
  let GET: any

  beforeAll(async () => {
    // Import the route handler after mocks are set up
    const routeModule = await import('@/app/api/questions/route')
    GET = routeModule.GET
  })

  beforeEach(() => {
    jest.clearAllMocks()
    getAllQuestions.mockReturnValue(mockQuestions)
  })

  it('returns all questions without filters', async () => {
    const { NextRequest } = require('next/server')
    const request = new NextRequest('http://localhost:3000/api/questions')
    const response = await GET(request)
    const data = await response.json()

    expect(response.status).toBe(200)
    expect(data.success).toBe(true)
    expect(data.data.questions).toHaveLength(2)
    expect(data.data.total).toBe(2)
    expect(getAllQuestions).toHaveBeenCalledTimes(1)
  })

  it('filters questions by level', async () => {
    const { NextRequest } = require('next/server')
    const request = new NextRequest('http://localhost:3000/api/questions?level=HSC')
    const response = await GET(request)
    const data = await response.json()

    expect(response.status).toBe(200)
    expect(data.success).toBe(true)
    expect(data.data.level).toBe('HSC')
    expect(data.data.questions).toHaveLength(1)
    expect(data.data.questions[0].level).toBe('HSC')
  })

  it('applies pagination correctly', async () => {
    const { NextRequest } = require('next/server')
    const request = new NextRequest('http://localhost:3000/api/questions?page=1&limit=1')
    const response = await GET(request)
    const data = await response.json()

    expect(response.status).toBe(200)
    expect(data.data.questions).toHaveLength(1)
    expect(data.meta.page).toBe(1)
    expect(data.meta.limit).toBe(1)
    expect(data.meta.total).toBe(2)
    expect(data.meta.totalPages).toBe(2)
    expect(data.meta.hasNext).toBe(true)
    expect(data.meta.hasPrev).toBe(false)
  })

  it('handles errors gracefully', async () => {
    getAllQuestions.mockImplementation(() => {
      throw new Error('Database error')
    })

    const { NextRequest } = require('next/server')
    const request = new NextRequest('http://localhost:3000/api/questions')
    const response = await GET(request)
    const data = await response.json()

    expect(response.status).toBe(500)
    expect(data.success).toBe(false)
    expect(data.error.code).toBe('INTERNAL_SERVER_ERROR')
    expect(data.error.message).toBe('Failed to fetch questions')
  })
})