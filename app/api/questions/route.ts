import { NextRequest, NextResponse } from 'next/server';
import { 
  getAllQuestions, 
  questionsStats 
} from '@/data/questions';
import { QuestionLevel, QuestionBoard, QuestionDifficulty } from '@/types/question.types';
import { ApiResponse, ApiErrorCodes } from '@/types/api.types';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const level = searchParams.get('level') as QuestionLevel | null;
    const board = searchParams.get('board') as QuestionBoard | null;
    const year = searchParams.get('year') ? parseInt(searchParams.get('year')!) : null;
    const difficulty = searchParams.get('difficulty') as QuestionDifficulty | null;
    const search = searchParams.get('search');
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '20');

    // Start with all questions
    let questions = getAllQuestions();

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

    const response: ApiResponse = {
      data: {
        questions: paginatedQuestions,
        total,
        level,
        board,
        year,
        difficulty,
        stats: questionsStats
      },
      success: true,
      message: `Retrieved ${paginatedQuestions.length} questions`,
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
    console.error('Error fetching questions:', error);
    
    const errorResponse: ApiResponse = {
      data: null,
      success: false,
      error: {
        code: ApiErrorCodes.INTERNAL_SERVER_ERROR,
        message: 'Failed to fetch questions',
        timestamp: new Date().toISOString(),
        path: '/api/questions'
      }
    };

    return NextResponse.json(errorResponse, { status: 500 });
  }
}