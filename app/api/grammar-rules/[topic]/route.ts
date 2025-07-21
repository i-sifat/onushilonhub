import { NextRequest, NextResponse } from 'next/server';
import { getGrammarRulesByTopic, grammarRulesData } from '@/data/grammar-rules';
import { GrammarTopicSlug } from '@/types/grammar.types';
import { ApiResponse, ApiErrorCodes } from '@/types/api.types';

interface RouteParams {
  params: {
    topic: string;
  };
}

export async function GET(request: NextRequest, { params }: RouteParams) {
  try {
    const { topic } = params;
    const { searchParams } = new URL(request.url);
    const search = searchParams.get('search');
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '50');

    // Validate topic slug
    const topicSlug = topic as GrammarTopicSlug;
    if (!grammarRulesData[topicSlug]) {
      const errorResponse: ApiResponse = {
        data: null,
        success: false,
        error: {
          code: ApiErrorCodes.DATA_NOT_FOUND,
          message: `Grammar topic '${topic}' not found`,
          timestamp: new Date().toISOString(),
          path: `/api/grammar-rules/${topic}`
        }
      };
      return NextResponse.json(errorResponse, { status: 404 });
    }

    // Get rules for the specific topic
    const topicData = getGrammarRulesByTopic(topicSlug);
    let rules = topicData.rules;

    // Apply search filter if provided
    if (search) {
      const searchLower = search.toLowerCase();
      rules = rules.filter(rule => 
        rule.title.toLowerCase().includes(searchLower) ||
        rule.description.toLowerCase().includes(searchLower) ||
        rule.bengali.toLowerCase().includes(searchLower) ||
        rule.structures.some(structure => structure.toLowerCase().includes(searchLower)) ||
        rule.examples.some(example => example.toLowerCase().includes(searchLower))
      );
    }

    // Apply pagination
    const total = rules.length;
    const offset = (page - 1) * limit;
    const paginatedRules = rules.slice(offset, offset + limit);

    const response: ApiResponse = {
      data: {
        rules: paginatedRules,
        topic: topicData.topic,
        slug: topicData.slug,
        level: topicData.level,
        total,
        metadata: topicData.metadata
      },
      success: true,
      message: `Retrieved ${paginatedRules.length} grammar rules for ${topicData.topic}`,
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
    console.error('Error fetching grammar rules for topic:', error);
    
    const errorResponse: ApiResponse = {
      data: null,
      success: false,
      error: {
        code: ApiErrorCodes.INTERNAL_SERVER_ERROR,
        message: 'Failed to fetch grammar rules for topic',
        timestamp: new Date().toISOString(),
        path: `/api/grammar-rules/${params.topic}`
      }
    };

    return NextResponse.json(errorResponse, { status: 500 });
  }
}