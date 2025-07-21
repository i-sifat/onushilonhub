// Question-related utility functions
// Provides consistent formatting, filtering, and validation for questions

import { 
  Question, 
  QuestionLevel, 
  QuestionTopicSlug, 
  QuestionBoard, 
  QuestionDifficulty,
  QuestionFilter,
  QuestionStats
} from '@/types/question.types';

/**
 * Format a question for consistent display
 * @param question - The question to format
 * @param options - Formatting options
 * @returns Formatted question object
 */
export function formatQuestion(
  question: Question,
  options: {
    includeAnswer?: boolean;
    includeExplanation?: boolean;
    includeMetadata?: boolean;
    truncateQuestion?: number;
    truncateAnswer?: number;
  } = {}
): Partial<Question> {
  const {
    includeAnswer = false,
    includeExplanation = false,
    includeMetadata = false,
    truncateQuestion,
    truncateAnswer
  } = options;

  const formattedQuestion: Partial<Question> = {
    id: question.id,
    topic: question.topic,
    question: truncateQuestion 
      ? truncateText(question.question, truncateQuestion)
      : question.question?.trim(),
    level: question.level,
    board: question.board,
    year: question.year,
    difficulty: question.difficulty,
    marks: question.marks,
    ruleId: question.ruleId
  };

  if (includeAnswer && question.answer) {
    formattedQuestion.answer = truncateAnswer 
      ? truncateText(question.answer, truncateAnswer)
      : question.answer.trim();
  }

  if (includeExplanation && question.explanation) {
    formattedQuestion.explanation = question.explanation.trim();
  }

  if (includeMetadata && question.metadata) {
    formattedQuestion.metadata = question.metadata;
  }

  if (question.passage) {
    formattedQuestion.passage = question.passage.trim();
  }

  if (question.blanks) {
    formattedQuestion.blanks = question.blanks;
  }

  return formattedQuestion;
}

/**
 * Filter questions based on multiple criteria
 * @param questions - Array of questions to filter
 * @param filter - Filter criteria
 * @returns Filtered array of questions
 */
export function filterQuestions(
  questions: Question[],
  filter: QuestionFilter
): Question[] {
  let filteredQuestions = [...questions];

  // Filter by topic
  if (filter.topic) {
    filteredQuestions = filteredQuestions.filter(q => q.topic === filter.topic);
  }

  // Filter by level
  if (filter.level) {
    filteredQuestions = filteredQuestions.filter(q => q.level === filter.level);
  }

  // Filter by board
  if (filter.board) {
    filteredQuestions = filteredQuestions.filter(q => q.board === filter.board);
  }

  // Filter by year
  if (filter.year) {
    filteredQuestions = filteredQuestions.filter(q => q.year === filter.year);
  }

  // Filter by difficulty
  if (filter.difficulty) {
    filteredQuestions = filteredQuestions.filter(q => q.difficulty === filter.difficulty);
  }

  // Filter by rule ID
  if (filter.ruleId) {
    filteredQuestions = filteredQuestions.filter(q => q.ruleId === filter.ruleId);
  }

  // Filter by search query
  if (filter.searchQuery && filter.searchQuery.trim()) {
    const searchQuery = filter.searchQuery.toLowerCase().trim();
    filteredQuestions = filteredQuestions.filter(q => 
      q.question.toLowerCase().includes(searchQuery) ||
      (q.answer && q.answer.toLowerCase().includes(searchQuery)) ||
      (q.explanation && q.explanation.toLowerCase().includes(searchQuery)) ||
      (q.board && q.board.toLowerCase().includes(searchQuery))
    );
  }

  return filteredQuestions;
}

/**
 * Search questions based on query string
 * @param questions - Array of questions to search
 * @param query - Search query string
 * @param options - Search options
 * @returns Filtered array of questions
 */
export function searchQuestions(
  questions: Question[],
  query: string,
  options: {
    searchFields?: ('question' | 'answer' | 'explanation' | 'board')[];
    caseSensitive?: boolean;
    exactMatch?: boolean;
  } = {}
): Question[] {
  if (!query.trim()) {
    return questions;
  }

  const {
    searchFields = ['question', 'answer', 'explanation'],
    caseSensitive = false,
    exactMatch = false
  } = options;

  const searchQuery = caseSensitive ? query.trim() : query.trim().toLowerCase();

  return questions.filter(question => {
    return searchFields.some(field => {
      const fieldValue = question[field];
      
      if (!fieldValue) return false;

      const stringValue = caseSensitive ? fieldValue : fieldValue.toLowerCase();
      return exactMatch 
        ? stringValue === searchQuery
        : stringValue.includes(searchQuery);
    });
  });
}

/**
 * Sort questions by various criteria
 * @param questions - Array of questions to sort
 * @param sortBy - Sort criteria
 * @param order - Sort order
 * @returns Sorted array of questions
 */
export function sortQuestions(
  questions: Question[],
  sortBy: 'id' | 'year' | 'board' | 'difficulty' | 'level' | 'topic' = 'id',
  order: 'asc' | 'desc' = 'asc'
): Question[] {
  return [...questions].sort((a, b) => {
    let aValue: string | number;
    let bValue: string | number;

    switch (sortBy) {
      case 'id':
        aValue = a.id;
        bValue = b.id;
        break;
      case 'year':
        aValue = a.year || 0;
        bValue = b.year || 0;
        break;
      case 'board':
        aValue = a.board || '';
        bValue = b.board || '';
        break;
      case 'difficulty':
        // Custom sort order for difficulty
        const difficultyOrder = { 'EASY': 1, 'MEDIUM': 2, 'HARD': 3 };
        aValue = difficultyOrder[a.difficulty as QuestionDifficulty] || 0;
        bValue = difficultyOrder[b.difficulty as QuestionDifficulty] || 0;
        break;
      case 'level':
        aValue = a.level || '';
        bValue = b.level || '';
        break;
      case 'topic':
        aValue = a.topic || '';
        bValue = b.topic || '';
        break;
      default:
        aValue = a.id;
        bValue = b.id;
    }

    if (aValue < bValue) {
      return order === 'asc' ? -1 : 1;
    }
    if (aValue > bValue) {
      return order === 'asc' ? 1 : -1;
    }
    return 0;
  });
}

/**
 * Get question statistics
 * @param questions - Array of questions
 * @returns Statistics object
 */
export function getQuestionStats(questions: Question[]): QuestionStats {
  const stats: QuestionStats = {
    total: questions.length,
    byLevel: {} as Record<QuestionLevel, number>,
    byBoard: {} as Record<QuestionBoard, number>,
    byYear: {} as Record<number, number>,
    byDifficulty: {} as Record<QuestionDifficulty, number>
  };

  questions.forEach(question => {
    // Count by level
    if (question.level) {
      stats.byLevel[question.level] = (stats.byLevel[question.level] || 0) + 1;
    }

    // Count by board
    if (question.board) {
      stats.byBoard[question.board] = (stats.byBoard[question.board] || 0) + 1;
    }

    // Count by year
    if (question.year) {
      stats.byYear[question.year] = (stats.byYear[question.year] || 0) + 1;
    }

    // Count by difficulty
    if (question.difficulty) {
      stats.byDifficulty[question.difficulty] = (stats.byDifficulty[question.difficulty] || 0) + 1;
    }
  });

  return stats;
}

/**
 * Group questions by a specific field
 * @param questions - Array of questions
 * @param groupBy - Field to group by
 * @returns Grouped questions object
 */
export function groupQuestions<T extends keyof Question>(
  questions: Question[],
  groupBy: T
): Record<string, Question[]> {
  return questions.reduce((groups, question) => {
    const key = String(question[groupBy] || 'unknown');
    if (!groups[key]) {
      groups[key] = [];
    }
    groups[key].push(question);
    return groups;
  }, {} as Record<string, Question[]>);
}

/**
 * Validate question data structure
 * @param question - Question to validate
 * @returns Validation result with errors if any
 */
export function validateQuestion(question: any): {
  isValid: boolean;
  errors: string[];
} {
  const errors: string[] = [];

  // Required fields validation
  if (!question.id || typeof question.id !== 'string' || question.id.trim() === '') {
    errors.push('Question ID is required and must be a non-empty string');
  }

  if (!question.question || typeof question.question !== 'string' || question.question.trim() === '') {
    errors.push('Question text is required and must be a non-empty string');
  }

  // Optional fields validation
  if (question.level && !['HSC', 'SSC'].includes(question.level)) {
    errors.push('Level must be one of: HSC, SSC');
  }

  if (question.difficulty && !['EASY', 'MEDIUM', 'HARD'].includes(question.difficulty)) {
    errors.push('Difficulty must be one of: EASY, MEDIUM, HARD');
  }

  if (question.year && (typeof question.year !== 'number' || question.year < 1900 || question.year > new Date().getFullYear() + 10)) {
    errors.push('Year must be a valid number between 1900 and current year + 10');
  }

  if (question.marks && (typeof question.marks !== 'number' || question.marks < 0)) {
    errors.push('Marks must be a non-negative number');
  }

  if (question.ruleId && (typeof question.ruleId !== 'number' || question.ruleId < 1)) {
    errors.push('Rule ID must be a positive number');
  }

  // Validate blanks array if present
  if (question.blanks && !Array.isArray(question.blanks)) {
    errors.push('Blanks must be an array');
  } else if (question.blanks && Array.isArray(question.blanks)) {
    question.blanks.forEach((blank: any, index: number) => {
      if (!blank.id || typeof blank.id !== 'string') {
        errors.push(`Blank at index ${index} must have a valid ID`);
      }
      if (!blank.answer || typeof blank.answer !== 'string') {
        errors.push(`Blank at index ${index} must have a valid answer`);
      }
    });
  }

  return {
    isValid: errors.length === 0,
    errors
  };
}

/**
 * Validate an array of questions
 * @param questions - Array of questions to validate
 * @returns Validation summary
 */
export function validateQuestions(questions: any[]): {
  isValid: boolean;
  validCount: number;
  invalidCount: number;
  errors: Array<{ questionId: string; errors: string[] }>;
} {
  const validationResults = questions.map((question, index) => ({
    questionId: question.id || `index-${index}`,
    ...validateQuestion(question)
  }));

  const validCount = validationResults.filter(result => result.isValid).length;
  const invalidCount = validationResults.length - validCount;
  const errors = validationResults
    .filter(result => !result.isValid)
    .map(result => ({
      questionId: result.questionId,
      errors: result.errors
    }));

  return {
    isValid: invalidCount === 0,
    validCount,
    invalidCount,
    errors
  };
}

/**
 * Calculate question score based on difficulty
 * @param question - Question to score
 * @param userAnswer - User's answer
 * @param correctAnswer - Correct answer
 * @returns Score object
 */
export function calculateQuestionScore(
  question: Question,
  userAnswer: string,
  correctAnswer?: string
): {
  isCorrect: boolean;
  score: number;
  maxScore: number;
  feedback?: string;
} {
  const answer = correctAnswer || question.answer;
  if (!answer) {
    return {
      isCorrect: false,
      score: 0,
      maxScore: question.marks || 1,
      feedback: 'No correct answer available'
    };
  }

  const isCorrect = normalizeAnswer(userAnswer) === normalizeAnswer(answer);
  
  // Base score from marks or default difficulty-based scoring
  let maxScore = question.marks || getDifficultyScore(question.difficulty);
  let score = isCorrect ? maxScore : 0;

  // Partial credit for close answers (optional enhancement)
  if (!isCorrect && userAnswer.trim() !== '') {
    const similarity = calculateAnswerSimilarity(userAnswer, answer);
    if (similarity > 0.7) {
      score = Math.floor(maxScore * 0.5); // 50% for close answers
    }
  }

  return {
    isCorrect,
    score,
    maxScore,
    feedback: isCorrect ? 'Correct!' : `Incorrect. The correct answer is: ${answer}`
  };
}

/**
 * Generate a unique ID for a new question
 * @param existingQuestions - Array of existing questions
 * @param prefix - Optional prefix for the ID
 * @returns New unique ID
 */
export function generateQuestionId(
  existingQuestions: Question[],
  prefix: string = 'q'
): string {
  const existingIds = existingQuestions.map(q => q.id);
  let counter = 1;
  let newId = `${prefix}-${counter}`;
  
  while (existingIds.includes(newId)) {
    counter++;
    newId = `${prefix}-${counter}`;
  }
  
  return newId;
}

/**
 * Create a question template
 * @param topic - Question topic
 * @param level - Question level
 * @returns Question template
 */
export function createQuestionTemplate(
  topic: QuestionTopicSlug,
  level: QuestionLevel = 'HSC'
): Partial<Question> {
  return {
    id: '', // Will be set when adding to collection
    topic,
    question: '',
    answer: '',
    explanation: '',
    level,
    difficulty: 'MEDIUM',
    marks: 1
  };
}

/**
 * Get available filter options from questions array
 * @param questions - Array of questions
 * @returns Available filter options
 */
export function getAvailableFilterOptions(questions: Question[]) {
  const topics = [...new Set(questions.filter(q => q.topic).map(q => q.topic!))];
  const levels = [...new Set(questions.filter(q => q.level).map(q => q.level!))];
  const boards = [...new Set(questions.filter(q => q.board).map(q => q.board!))];
  const years = [...new Set(questions.filter(q => q.year).map(q => q.year!))].sort((a, b) => b - a);
  const difficulties = [...new Set(questions.filter(q => q.difficulty).map(q => q.difficulty!))];

  return {
    topics,
    levels,
    boards,
    years,
    difficulties
  };
}

// Helper functions

/**
 * Truncate text to specified length
 */
function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength).trim() + '...';
}

/**
 * Normalize answer for comparison
 */
function normalizeAnswer(answer: string): string {
  return answer.toLowerCase().trim().replace(/[^\w\s]/g, '');
}

/**
 * Get default score based on difficulty
 */
function getDifficultyScore(difficulty?: QuestionDifficulty): number {
  switch (difficulty) {
    case 'EASY': return 1;
    case 'MEDIUM': return 2;
    case 'HARD': return 3;
    default: return 1;
  }
}

/**
 * Calculate similarity between two answers (simple implementation)
 */
function calculateAnswerSimilarity(answer1: string, answer2: string): number {
  const normalized1 = normalizeAnswer(answer1);
  const normalized2 = normalizeAnswer(answer2);
  
  if (normalized1 === normalized2) return 1;
  
  // Simple word-based similarity
  const words1 = normalized1.split(/\s+/);
  const words2 = normalized2.split(/\s+/);
  const commonWords = words1.filter(word => words2.includes(word));
  
  return commonWords.length / Math.max(words1.length, words2.length);
}