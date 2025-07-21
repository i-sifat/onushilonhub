import { NextRequest, NextResponse } from 'next/server';
import { 
  getAllGrammarRules, 
  getGrammarRulesByLevel, 
  grammarRulesStats
} from '@/data/grammar-rules';
import { GrammarLevel } from '@/types/grammar.types';
import { ApiResponse, ApiErrorCodes } from '@/types/api.types';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const level = searchParams.get('level') as GrammarLevel | null;
    const search = searchParams.get('search');
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '50');

    // Get rules based on level filter
    let rules = level ? getGrammarRulesByLevel(level) : getAllGrammarRules();

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
        total,
        level,
        stats: grammarRulesStats
      },
      success: true,
      message: `Retrieved ${paginatedRules.length} grammar rules`,
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
    console.error('Error fetching grammar rules:', error);
    
    const errorResponse: ApiResponse = {
      data: null,
      success: false,
      error: {
        code: ApiErrorCodes.INTERNAL_SERVER_ERROR,
        message: 'Failed to fetch grammar rules',
        timestamp: new Date().toISOString(),
        path: '/api/grammar-rules'
      }
    };

    return NextResponse.json(errorResponse, { status: 500 });
  }
}