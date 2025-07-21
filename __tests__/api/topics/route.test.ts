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
jest.mock('@/data/topics', () => ({
  allTopics: [
    {
      id: 'transformation',
      name: 'Transformation',
      slug: 'transformation',
      description: 'Transform sentences',
      level: 'HSC' as const,
      category: 'grammar' as const,
      difficulty: 'MEDIUM' as const,
      isActive: true,
      order: 1,
      estimatedTime: 30
    },
    {
      id: 'narration',
      name: 'Narration',
      slug: 'narration',
      description: 'Direct and indirect speech',
      level: 'SSC' as const,
      category: 'grammar' as const,
      difficulty: 'EASY' as const,
      isActive: true,
      order: 2,
      estimatedTime: 25
    }
  ],
  getTopicsByLevel: jest.fn(),
  topicStats: {
    total: 10,
    byLevel: { HSC: 6, SSC: 4 },
    byCategory: { grammar: 8, questions: 2 }
  }
}))

describe('/api/topics', () => {
  const { allTopics, getTopicsByLevel } = require('@/data/topics')
  let GET: any

  beforeAll(async () => {
    // Import the route handler after mocks are set up
    const routeModule = await import('@/app/api/topics/route')
    GET = routeModule.GET
  })

  beforeEach(() => {
    jest.clearAllMocks()
    getTopicsByLevel.mockReturnValue(allTopics.filter(t => t.level === 'HSC'))
  })

  it('returns all topics without filters', async () => {
    const { NextRequest } = require('next/server')
    const request = new NextRequest('http://localhost:3000/api/topics')
    const response = await GET(request)
    const data = await response.json()

    expect(response.status).toBe(200)
    expect(data.success).toBe(true)
    expect(data.data.topics).toHaveLength(2)
    expect(data.data.total).toBe(2)
  })

  it('filters topics by level', async () => {
    const { NextRequest } = require('next/server')
    const request = new NextRequest('http://localhost:3000/api/topics?level=HSC')
    const response = await GET(request)
    const data = await response.json()

    expect(response.status).toBe(200)
    expect(data.success).toBe(true)
    expect(data.data.level).toBe('HSC')
    expect(getTopicsByLevel).toHaveBeenCalledWith('HSC')
  })

  it('filters topics by active status', async () => {
    const { NextRequest } = require('next/server')
    const request = new NextRequest('http://localhost:3000/api/topics?active=true')
    const response = await GET(request)
    const data = await response.json()

    expect(response.status).toBe(200)
    expect(data.data.topics.every(t => t.isActive)).toBe(true)
  })

  it('handles errors gracefully', async () => {
    getTopicsByLevel.mockImplementation(() => {
      throw new Error('Database error')
    })

    const { NextRequest } = require('next/server')
    const request = new NextRequest('http://localhost:3000/api/topics?level=HSC')
    const response = await GET(request)
    const data = await response.json()

    expect(response.status).toBe(500)
    expect(data.success).toBe(false)
    expect(data.error.code).toBe('INTERNAL_SERVER_ERROR')
  })
})