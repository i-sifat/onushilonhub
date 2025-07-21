// Question Service - API communication layer for questions
// Provides centralized API calls with error handling and retry logic

import { 
  Question, 
  QuestionLevel, 
  QuestionTopicSlug, 
  QuestionBoard,
  QuestionDifficulty,
  QuestionFilter,
  QuestionData,
  QuestionStats
} from '@/types/question.types';

// API Response types
interface ApiResponse<T> {
  data: T;
  success: boolean;
  message?: string;
  error?: string;
}

interface ApiError {
  message: string;
  status: number;
  code?: string;
}

interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    page: number;
    pageSize: number;
    total: number;
    totalPages: number;
  };
}

// Service configuration
interface ServiceConfig {
  baseUrl: string;
  timeout: number;
  retryAttempts: number;
  retryDelay: number;
}

class QuestionService {
  private config: ServiceConfig;

  constructor(config?: Partial<ServiceConfig>) {
    this.config = {
      baseUrl: '/api',
      timeout: 10000,
      retryAttempts: 3,
      retryDelay: 1000,
      ...config
    };
  }

  /**
   * Fetch all questions
   * @param options - Query options
   * @returns Promise with all questions
   */
  async getAllQuestions(options?: {
    level?: QuestionLevel;
    topic?: QuestionTopicSlug;
    board?: QuestionBoard;
    year?: number;
    difficulty?: QuestionDifficulty;
    search?: string;
    page?: number;
    pageSize?: number;
  }): Promise<PaginatedResponse<Question>> {
    const params = new URLSearchParams();
    
    if (options?.level) params.append('level', options.level);
    if (options?.topic) params.append('topic', options.topic);
    if (options?.board) params.append('board', options.board);
    if (options?.year) params.append('year', options.year.toString());
    if (options?.difficulty) params.append('difficulty', options.difficulty);
    if (options?.search) params.append('search', options.search);
    if (options?.page) params.append('page', options.page.toString());
    if (options?.pageSize) params.append('pageSize', options.pageSize.toString());

    const url = `${this.config.baseUrl}/questions${params.toString() ? `?${params.toString()}` : ''}`;
    
    const response = await this.fetchWithRetry<PaginatedResponse<Question>>(url);
    return response.data;
  }

  /**
   * Fetch questions by topic
   * @param topic - Question topic slug
   * @param options - Query options
   * @returns Promise with topic-specific questions
   */
  async getQuestionsByTopic(
    topic: QuestionTopicSlug,
    options?: {
      level?: QuestionLevel;
      board?: QuestionBoard;
      year?: number;
      difficulty?: QuestionDifficulty;
      search?: string;
      page?: number;
      pageSize?: number;
    }
  ): Promise<QuestionData> {
    const params = new URLSearchParams();
    
    if (options?.level) params.append('level', options.level);
    if (options?.board) params.append('board', options.board);
    if (options?.year) params.append('year', options.year.toString());
    if (options?.difficulty) params.append('difficulty', options.difficulty);
    if (options?.search) params.append('search', options.search);
    if (options?.page) params.append('page', options.page.toString());
    if (options?.pageSize) params.append('pageSize', options.pageSize.toString());

    const url = `${this.config.baseUrl}/questions/${topic}${params.toString() ? `?${params.toString()}` : ''}`;
    
    const response = await this.fetchWithRetry<QuestionData>(url);
    return response.data;
  }

  /**
   * Fetch questions by level
   * @param level - Question level
   * @param options - Query options
   * @returns Promise with level-specific questions
   */
  async getQuestionsByLevel(
    level: QuestionLevel,
    options?: {
      topic?: QuestionTopicSlug;
      board?: QuestionBoard;
      year?: number;
      difficulty?: QuestionDifficulty;
      search?: string;
      page?: number;
      pageSize?: number;
    }
  ): Promise<PaginatedResponse<Question>> {
    const params = new URLSearchParams();
    params.append('level', level);
    
    if (options?.topic) params.append('topic', options.topic);
    if (options?.board) params.append('board', options.board);
    if (options?.year) params.append('year', options.year.toString());
    if (options?.difficulty) params.append('difficulty', options.difficulty);
    if (options?.search) params.append('search', options.search);
    if (options?.page) params.append('page', options.page.toString());
    if (options?.pageSize) params.append('pageSize', options.pageSize.toString());

    const url = `${this.config.baseUrl}/questions?${params.toString()}`;
    
    const response = await this.fetchWithRetry<PaginatedResponse<Question>>(url);
    return response.data;
  }

  /**
   * Fetch questions by board and year
   * @param board - Question board
   * @param year - Question year
   * @param options - Query options
   * @returns Promise with board and year specific questions
   */
  async getQuestionsByBoardAndYear(
    board: QuestionBoard,
    year: number,
    options?: {
      topic?: QuestionTopicSlug;
      level?: QuestionLevel;
      difficulty?: QuestionDifficulty;
      search?: string;
    }
  ): Promise<Question[]> {
    const params = new URLSearchParams();
    params.append('board', board);
    params.append('year', year.toString());
    
    if (options?.topic) params.append('topic', options.topic);
    if (options?.level) params.append('level', options.level);
    if (options?.difficulty) params.append('difficulty', options.difficulty);
    if (options?.search) params.append('search', options.search);

    const url = `${this.config.baseUrl}/questions/board/${board}/year/${year}?${params.toString()}`;
    
    const response = await this.fetchWithRetry<Question[]>(url);
    return response.data;
  }

  /**
   * Fetch a specific question by ID
   * @param id - Question ID
   * @returns Promise with specific question
   */
  async getQuestionById(id: string): Promise<Question | null> {
    try {
      const url = `${this.config.baseUrl}/questions/question/${id}`;
      const response = await this.fetchWithRetry<Question>(url);
      return response.data;
    } catch (error) {
      if (this.isApiError(error) && error.status === 404) {
        return null;
      }
      throw error;
    }
  }

  /**
   * Fetch questions by rule ID
   * @param ruleId - Grammar rule ID
   * @param options - Query options
   * @returns Promise with questions related to the rule
   */
  async getQuestionsByRuleId(
    ruleId: number,
    options?: {
      level?: QuestionLevel;
      board?: QuestionBoard;
      year?: number;
      difficulty?: QuestionDifficulty;
    }
  ): Promise<Question[]> {
    const params = new URLSearchParams();
    params.append('ruleId', ruleId.toString());
    
    if (options?.level) params.append('level', options.level);
    if (options?.board) params.append('board', options.board);
    if (options?.year) params.append('year', options.year.toString());
    if (options?.difficulty) params.append('difficulty', options.difficulty);

    const url = `${this.config.baseUrl}/questions/rule/${ruleId}?${params.toString()}`;
    
    const response = await this.fetchWithRetry<Question[]>(url);
    return response.data;
  }

  /**
   * Search questions
   * @param query - Search query
   * @param options - Search options
   * @returns Promise with search results
   */
  async searchQuestions(
    query: string,
    options?: {
      level?: QuestionLevel;
      topic?: QuestionTopicSlug;
      board?: QuestionBoard;
      year?: number;
      difficulty?: QuestionDifficulty;
      fields?: string[];
      page?: number;
      pageSize?: number;
    }
  ): Promise<PaginatedResponse<Question>> {
    const params = new URLSearchParams();
    params.append('search', query);
    
    if (options?.level) params.append('level', options.level);
    if (options?.topic) params.append('topic', options.topic);
    if (options?.board) params.append('board', options.board);
    if (options?.year) params.append('year', options.year.toString());
    if (options?.difficulty) params.append('difficulty', options.difficulty);
    if (options?.fields) params.append('fields', options.fields.join(','));
    if (options?.page) params.append('page', options.page.toString());
    if (options?.pageSize) params.append('pageSize', options.pageSize.toString());

    const url = `${this.config.baseUrl}/questions/search?${params.toString()}`;
    
    const response = await this.fetchWithRetry<PaginatedResponse<Question>>(url);
    return response.data;
  }

  /**
   * Filter questions with advanced criteria
   * @param filter - Filter criteria
   * @param options - Additional options
   * @returns Promise with filtered questions
   */
  async filterQuestions(
    filter: QuestionFilter,
    options?: {
      page?: number;
      pageSize?: number;
      sortBy?: string;
      sortOrder?: 'asc' | 'desc';
    }
  ): Promise<PaginatedResponse<Question>> {
    const params = new URLSearchParams();
    
    if (filter.topic) params.append('topic', filter.topic);
    if (filter.level) params.append('level', filter.level);
    if (filter.board) params.append('board', filter.board);
    if (filter.year) params.append('year', filter.year.toString());
    if (filter.difficulty) params.append('difficulty', filter.difficulty);
    if (filter.searchQuery) params.append('search', filter.searchQuery);
    if (filter.ruleId) params.append('ruleId', filter.ruleId.toString());
    
    if (options?.page) params.append('page', options.page.toString());
    if (options?.pageSize) params.append('pageSize', options.pageSize.toString());
    if (options?.sortBy) params.append('sortBy', options.sortBy);
    if (options?.sortOrder) params.append('sortOrder', options.sortOrder);

    const url = `${this.config.baseUrl}/questions/filter?${params.toString()}`;
    
    const response = await this.fetchWithRetry<PaginatedResponse<Question>>(url);
    return response.data;
  }

  /**
   * Get question statistics
   * @param options - Filter options
   * @returns Promise with statistics
   */
  async getStatistics(options?: {
    level?: QuestionLevel;
    topic?: QuestionTopicSlug;
    board?: QuestionBoard;
    year?: number;
  }): Promise<QuestionStats> {
    const params = new URLSearchParams();
    
    if (options?.level) params.append('level', options.level);
    if (options?.topic) params.append('topic', options.topic);
    if (options?.board) params.append('board', options.board);
    if (options?.year) params.append('year', options.year.toString());

    const url = `${this.config.baseUrl}/questions/stats${params.toString() ? `?${params.toString()}` : ''}`;
    
    const response = await this.fetchWithRetry<QuestionStats>(url);
    return response.data;
  }

  /**
   * Get available filter options
   * @returns Promise with available options
   */
  async getAvailableOptions(): Promise<{
    topics: QuestionTopicSlug[];
    levels: QuestionLevel[];
    boards: QuestionBoard[];
    years: number[];
    difficulties: QuestionDifficulty[];
  }> {
    const url = `${this.config.baseUrl}/questions/options`;
    
    const response = await this.fetchWithRetry<{
      topics: QuestionTopicSlug[];
      levels: QuestionLevel[];
      boards: QuestionBoard[];
      years: number[];
      difficulties: QuestionDifficulty[];
    }>(url);
    
    return response.data;
  }

  /**
   * Submit answer for a question
   * @param questionId - Question ID
   * @param answer - User's answer
   * @returns Promise with score and feedback
   */
  async submitAnswer(
    questionId: string,
    answer: string
  ): Promise<{
    isCorrect: boolean;
    score: number;
    maxScore: number;
    feedback: string;
    correctAnswer?: string;
  }> {
    const url = `${this.config.baseUrl}/questions/${questionId}/answer`;
    
    const response = await this.fetchWithRetry<{
      isCorrect: boolean;
      score: number;
      maxScore: number;
      feedback: string;
      correctAnswer?: string;
    }>(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ answer }),
    });
    
    return response.data;
  }

  /**
   * Create a new question (if API supports it)
   * @param question - Question data
   * @returns Promise with created question
   */
  async createQuestion(question: Omit<Question, 'id'>): Promise<Question> {
    const url = `${this.config.baseUrl}/questions`;
    
    const response = await this.fetchWithRetry<Question>(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(question),
    });
    
    return response.data;
  }

  /**
   * Update an existing question (if API supports it)
   * @param id - Question ID
   * @param question - Updated question data
   * @returns Promise with updated question
   */
  async updateQuestion(id: string, question: Partial<Question>): Promise<Question> {
    const url = `${this.config.baseUrl}/questions/${id}`;
    
    const response = await this.fetchWithRetry<Question>(url, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(question),
    });
    
    return response.data;
  }

  /**
   * Delete a question (if API supports it)
   * @param id - Question ID
   * @returns Promise with deletion result
   */
  async deleteQuestion(id: string): Promise<{ success: boolean; message: string }> {
    const url = `${this.config.baseUrl}/questions/${id}`;
    
    const response = await this.fetchWithRetry<{ success: boolean; message: string }>(url, {
      method: 'DELETE',
    });
    
    return response.data;
  }

  /**
   * Fetch with retry logic and error handling
   * @param url - Request URL
   * @param options - Fetch options
   * @returns Promise with API response
   */
  private async fetchWithRetry<T>(
    url: string,
    options?: RequestInit,
    attempt: number = 1
  ): Promise<ApiResponse<T>> {
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), this.config.timeout);

      const response = await fetch(url, {
        ...options,
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      if (!response.ok) {
        throw new ApiError({
          message: `HTTP ${response.status}: ${response.statusText}`,
          status: response.status,
        });
      }

      const data = await response.json();
      
      // Handle API response format
      if (data.success === false) {
        throw new ApiError({
          message: data.error || data.message || 'API request failed',
          status: response.status,
          code: data.code,
        });
      }

      // Return data in consistent format
      return {
        data: data.data || data,
        success: true,
        message: data.message,
      };

    } catch (error) {
      // Retry logic
      if (attempt < this.config.retryAttempts && this.shouldRetry(error)) {
        await this.delay(this.config.retryDelay * attempt);
        return this.fetchWithRetry<T>(url, options, attempt + 1);
      }

      // Convert to ApiError if needed
      if (error instanceof ApiError) {
        throw error;
      }

      if (error instanceof Error) {
        if (error.name === 'AbortError') {
          throw new ApiError({
            message: 'Request timeout',
            status: 408,
            code: 'TIMEOUT',
          });
        }

        throw new ApiError({
          message: error.message,
          status: 0,
          code: 'NETWORK_ERROR',
        });
      }

      throw new ApiError({
        message: 'Unknown error occurred',
        status: 0,
        code: 'UNKNOWN_ERROR',
      });
    }
  }

  /**
   * Determine if error should trigger a retry
   * @param error - Error object
   * @returns Whether to retry
   */
  private shouldRetry(error: any): boolean {
    if (error instanceof ApiError) {
      // Retry on server errors and network errors
      return error.status >= 500 || error.status === 0;
    }
    
    if (error instanceof Error) {
      // Retry on network errors but not on abort
      return error.name !== 'AbortError';
    }
    
    return false;
  }

  /**
   * Delay utility for retry logic
   * @param ms - Milliseconds to delay
   * @returns Promise that resolves after delay
   */
  private delay(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  /**
   * Type guard for ApiError
   * @param error - Error object
   * @returns Whether error is ApiError
   */
  private isApiError(error: any): error is ApiError {
    return error instanceof ApiError;
  }
}

// Custom ApiError class
class ApiError extends Error {
  public status: number;
  public code?: string;

  constructor({ message, status, code }: { message: string; status: number; code?: string }) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
    this.code = code;
  }
}

// Export singleton instance
export const questionService = new QuestionService();

// Export class for custom instances
export { QuestionService, ApiError };

// Export types
export type { ApiResponse, ApiError as ApiErrorType, ServiceConfig, PaginatedResponse };