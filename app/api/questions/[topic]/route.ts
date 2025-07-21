import { NextRequest, NextResponse } from 'next/server';

export const dynamic = 'force-static';

import { getQuestionsByTopic, questionsData } from '@/data/questions';
import { QuestionTopicSlug, QuestionLevel, QuestionBoard, QuestionDifficulty } from '@/types/question.types';
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
    const level = searchParams.get('level') as QuestionLevel | null;
    const board = searchParams.get('board') as QuestionBoard | null;
    const year = searchParams.get('year') ? parseInt(searchParams.get('year')!) : null;
    const difficulty = searchParams.get('difficulty') as QuestionDifficulty | null;
    const ruleId = searchParams.get('ruleId') ? parseInt(searchParams.get('ruleId')!) : null;
    const search = searchParams.get('search');
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '20');

    // Validate topic slug
    const topicSlug = topic as QuestionTopicSlug;
    if (!questionsData[topicSlug]) {
      const errorResponse: ApiResponse = {
        data: null,
        success: false,
        error: {
          code: ApiErrorCodes.DATA_NOT_FOUND,
          message: `Question topic '${topic}' not found`,
          timestamp: new Date().toISOString(),
          path: `/api/questions/${topic}`
        }
      };
      return NextResponse.json(errorResponse, { status: 404 });
    }

    // Get questions for the specific topic
    const topicData = getQuestionsByTopic(topicSlug);
    let questions = topicData.questions;

    // Apply filters
    if (level) {
      questions = questions.filter(q => q.level === level);
    }

    if (board) {
      questions = questions.filter(q => q.board === board);
    }

    if (year) {
      questions = questions.filter(q => q.year === year);
    }

    if (difficulty) {
      questions = questions.filter(q => q.difficulty === difficulty);
    }

    if (ruleId) {
      questions = questions.filter(q => q.ruleId === ruleId);
    }

    // Apply search filter if provided
    if (search) {
      const searchLower = search.toLowerCase();
      questions = questions.filter(question => 
        question.question.toLowerCase().includes(searchLower) ||
        (question.answer && question.answer.toLowerCase().includes(searchLower)) ||
        (question.explanation && question.explanation.toLowerCase().includes(searchLower)) ||
        (question.passage && question.passage.toLowerCase().includes(searchLower))
      );
    }

    // Apply pagination
    const total = questions.length;
    const offset = (page - 1) * limit;
    const paginatedQuestions = questions.slice(offset, offset + limit);

    // Calculate topic-specific stats
    const topicStats = {
      total: topicData.questions.length,
      byLevel: topicData.questions.reduce((acc, q) => {
        if (q.level) {
          acc[q.level] = (acc[q.level] || 0) + 1;
        }
        return acc;
      }, {} as Record<QuestionLevel, number>),
      byBoard: topicData.questions.reduce((acc, q) => {
        if (q.board) {
          acc[q.board] = (acc[q.board] || 0) + 1;
        }
        return acc;
      }, {} as Record<QuestionBoard, number>),
      byYear: topicData.questions.reduce((acc, q) => {
        if (q.year) {
          acc[q.year] = (acc[q.year] || 0) + 1;
        }
        return acc;
      }, {} as Record<number, number>),
      byDifficulty: topicData.questions.reduce((acc, q) => {
        if (q.difficulty) {
          acc[q.difficulty] = (acc[q.difficulty] || 0) + 1;
        }
        return acc;
      }, {} as Record<QuestionDifficulty, number>)
    };

    const response: ApiResponse = {
      data: {
        questions: paginatedQuestions,
        topic: topicData.topic,
        slug: topicData.slug,
        level: topicData.level,
        total,
        metadata: topicData.metadata,
        stats: topicStats
      },
      success: true,
      message: `Retrieved ${paginatedQuestions.length} questions for ${topicData.topic}`,
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
    console.error('Error fetching questions for topic:', error);
    
    const errorResponse: ApiResponse = {
      data: null,
      success: false,
      error: {
        code: ApiErrorCodes.INTERNAL_SERVER_ERROR,
        message: 'Failed to fetch questions for topic',
        timestamp: new Date().toISOString(),
        path: `/api/questions/${params.topic}`
      }
    };

    return NextResponse.json(errorResponse, { status: 500 });
  }
}