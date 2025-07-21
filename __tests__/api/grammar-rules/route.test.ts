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
jest.mock('@/data/grammar-rules', () => ({
  getAllGrammarRules: jest.fn(),
  getGrammarRulesByLevel: jest.fn(),
  grammarRulesStats: {
    total: 150,
    byLevel: { HSC: 90, SSC: 60 },
    byTopic: { transformation: 30, narration: 25 }
  }
}))

const mockRules = [
  {
    id: 1,
    title: 'Present Simple Tense',
    description: 'Basic present tense rules',
    bengali: 'বর্তমান কাল',
    level: 'HSC' as const,
    topic: 'transformation',
    structures: ['Subject + Verb + Object'],
    examples: ['I eat rice.', 'She plays football.']
  },
  {
    id: 2,
    title: 'Past Simple Tense',
    description: 'Basic past tense rules',
    bengali: 'অতীত কাল',
    level: 'SSC' as const,
    topic: 'transformation',
    structures: ['Subject + Verb(ed) + Object'],
    examples: ['I ate rice.', 'She played football.']
  }
]

describe('/api/grammar-rules', () => {
  const { getAllGrammarRules, getGrammarRulesByLevel } = require('@/data/grammar-rules')
  let GET: any

  beforeAll(async () => {
    // Import the route handler after mocks are set up
    const routeModule = await import('@/app/api/grammar-rules/route')
    GET = routeModule.GET
  })

  beforeEach(() => {
    jest.clearAllMocks()
    getAllGrammarRules.mockReturnValue(mockRules)
    getGrammarRulesByLevel.mockReturnValue(mockRules.filter(r => r.level === 'HSC'))
  })

  it('returns all grammar rules without filters', async () => {
    const { NextRequest } = require('next/server')
    const request = new NextRequest('http://localhost:3000/api/grammar-rules')
    const response = await GET(request)
    const data = await response.json()

    expect(response.status).toBe(200)
    expect(data.success).toBe(true)
    expect(data.data.rules).toHaveLength(2)
    expect(data.data.total).toBe(2)
    expect(getAllGrammarRules).toHaveBeenCalledTimes(1)
  })

  it('filters rules by level', async () => {
    const { NextRequest } = require('next/server')
    const request = new NextRequest('http://localhost:3000/api/grammar-rules?level=HSC')
    const response = await GET(request)
    const data = await response.json()

    expect(response.status).toBe(200)
    expect(data.success).toBe(true)
    expect(data.data.level).toBe('HSC')
    expect(getGrammarRulesByLevel).toHaveBeenCalledWith('HSC')
  })

  it('applies search filter', async () => {
    const { NextRequest } = require('next/server')
    const request = new NextRequest('http://localhost:3000/api/grammar-rules?search=Present')
    const response = await GET(request)
    const data = await response.json()

    expect(response.status).toBe(200)
    expect(data.data.rules).toHaveLength(1)
    expect(data.data.rules[0].title).toContain('Present')
  })

  it('handles errors gracefully', async () => {
    getAllGrammarRules.mockImplementation(() => {
      throw new Error('Database error')
    })

    const { NextRequest } = require('next/server')
    const request = new NextRequest('http://localhost:3000/api/grammar-rules')
    const response = await GET(request)
    const data = await response.json()

    expect(response.status).toBe(500)
    expect(data.success).toBe(false)
    expect(data.error.code).toBe('INTERNAL_SERVER_ERROR')
  })
})