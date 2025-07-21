import { NextRequest, NextResponse } from 'next/server';

export const dynamic = 'force-static';

import { 
  allTopics,
  getTopicsByLevel,
  topicStats,
  TopicConfig
} from '@/data/topics';
import { GrammarLevel } from '@/types/grammar.types';
import { ApiResponse, ApiErrorCodes } from '@/types/api.types';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const level = searchParams.get('level') as GrammarLevel | null;
    const category = searchParams.get('category') as TopicConfig['category'] | null;
    const difficulty = searchParams.get('difficulty') as TopicConfig['difficulty'] | null;
    const active = searchParams.get('active');
    const search = searchParams.get('search');
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '50');

    // Start with all topics or filter by level
    let topics = level ? getTopicsByLevel(level) : allTopics;

    // Apply active filter
    if (active === 'true') {
      topics = topics.filter(topic => topic.isActive);
    } else if (active === 'false') {
      topics = topics.filter(topic => !topic.isActive);
    }

    // Apply category filter
    if (category) {
      topics = topics.filter(topic => topic.category === category || topic.category === 'both');
    }

    // Apply difficulty filter
    if (difficulty) {
      topics = topics.filter(topic => topic.difficulty === difficulty);
    }

    // Apply search filter if provided
    if (search) {
      const searchLower = search.toLowerCase();
      topics = topics.filter(topic => 
        topic.name.toLowerCase().includes(searchLower) ||
        topic.description.toLowerCase().includes(searchLower) ||
        topic.tags?.some(tag => tag.toLowerCase().includes(searchLower)) ||
        topic.slug.toLowerCase().includes(searchLower)
      );
    }

    // Sort topics by order
    topics.sort((a, b) => a.order - b.order);

    // Apply pagination
    const total = topics.length;
    const offset = (page - 1) * limit;
    const paginatedTopics = topics.slice(offset, offset + limit);

    // Calculate filtered stats
    const filteredStats = {
      total: topics.length,
      byLevel: topics.reduce((acc, topic) => {
        acc[topic.level] = (acc[topic.level] || 0) + 1;
        return acc;
      }, {} as Record<GrammarLevel, number>),
      byCategory: topics.reduce((acc, topic) => {
        acc[topic.category] = (acc[topic.category] || 0) + 1;
        return acc;
      }, {} as Record<TopicConfig['category'], number>),
      byDifficulty: topics.reduce((acc, topic) => {
        acc[topic.difficulty] = (acc[topic.difficulty] || 0) + 1;
        return acc;
      }, {} as Record<TopicConfig['difficulty'], number>),
      active: topics.filter(t => t.isActive).length,
      inactive: topics.filter(t => !t.isActive).length,
      averageEstimatedTime: topics.length > 0 
        ? Math.round(topics.reduce((sum, topic) => sum + (topic.estimatedTime || 0), 0) / topics.length)
        : 0,
      totalEstimatedTime: topics.reduce((sum, topic) => sum + (topic.estimatedTime || 0), 0)
    };

    const response: ApiResponse = {
      data: {
        topics: paginatedTopics,
        total,
        level,
        category,
        difficulty,
        active: active === 'true' ? true : active === 'false' ? false : undefined,
        stats: filteredStats,
        globalStats: topicStats
      },
      success: true,
      message: `Retrieved ${paginatedTopics.length} topics`,
      meta: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
        hasNext: offset + limit < total,
        hasPrev: page > 1
      }
    };

    return NextResponse.json(response);
  } catch (error) {
    console.error('Error fetching topics:', error);
    
    const errorResponse: ApiResponse = {
      data: null,
      success: false,
      error: {
        code: ApiErrorCodes.INTERNAL_SERVER_ERROR,
        message: 'Failed to fetch topics',
        timestamp: new Date().toISOString(),
        path: '/api/topics'
      }
    };

    return NextResponse.json(errorResponse, { status: 500 });
  }
}