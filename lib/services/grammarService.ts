// Grammar Service - API communication layer for grammar rules
// Provides centralized API calls with error handling and retry logic

import { 
  GrammarRule, 
  GrammarLevel, 
  GrammarTopicSlug, 
  GrammarRuleData 
} from '@/types/grammar.types';

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

// Service configuration
interface ServiceConfig {
  baseUrl: string;
  timeout: number;
  retryAttempts: number;
  retryDelay: number;
}

class GrammarService {
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
   * Fetch all grammar rules
   * @param options - Query options
   * @returns Promise with all grammar rules
   */
  async getAllRules(options?: {
    level?: GrammarLevel;
    topic?: GrammarTopicSlug;
    search?: string;
  }): Promise<GrammarRule[]> {
    const params = new URLSearchParams();
    
    if (options?.level) params.append('level', options.level);
    if (options?.topic) params.append('topic', options.topic);
    if (options?.search) params.append('search', options.search);

    const url = `${this.config.baseUrl}/grammar-rules${params.toString() ? `?${params.toString()}` : ''}`;
    
    const response = await this.fetchWithRetry<GrammarRule[]>(url);
    return response.data;
  }

  /**
   * Fetch grammar rules by topic
   * @param topic - Grammar topic slug
   * @param options - Query options
   * @returns Promise with topic-specific grammar rules
   */
  async getRulesByTopic(
    topic: GrammarTopicSlug,
    options?: {
      level?: GrammarLevel;
      search?: string;
    }
  ): Promise<GrammarRuleData> {
    const params = new URLSearchParams();
    
    if (options?.level) params.append('level', options.level);
    if (options?.search) params.append('search', options.search);

    const url = `${this.config.baseUrl}/grammar-rules/${topic}${params.toString() ? `?${params.toString()}` : ''}`;
    
    const response = await this.fetchWithRetry<GrammarRuleData>(url);
    return response.data;
  }

  /**
   * Fetch grammar rules by level
   * @param level - Grammar level
   * @param options - Query options
   * @returns Promise with level-specific grammar rules
   */
  async getRulesByLevel(
    level: GrammarLevel,
    options?: {
      topic?: GrammarTopicSlug;
      search?: string;
    }
  ): Promise<GrammarRule[]> {
    const params = new URLSearchParams();
    params.append('level', level);
    
    if (options?.topic) params.append('topic', options.topic);
    if (options?.search) params.append('search', options.search);

    const url = `${this.config.baseUrl}/grammar-rules?${params.toString()}`;
    
    const response = await this.fetchWithRetry<GrammarRule[]>(url);
    return response.data;
  }

  /**
   * Fetch a specific grammar rule by ID
   * @param id - Rule ID
   * @returns Promise with specific grammar rule
   */
  async getRuleById(id: number): Promise<GrammarRule | null> {
    try {
      const url = `${this.config.baseUrl}/grammar-rules/rule/${id}`;
      const response = await this.fetchWithRetry<GrammarRule>(url);
      return response.data;
    } catch (error) {
      if (this.isApiError(error) && error.status === 404) {
        return null;
      }
      throw error;
    }
  }

  /**
   * Search grammar rules
   * @param query - Search query
   * @param options - Search options
   * @returns Promise with search results
   */
  async searchRules(
    query: string,
    options?: {
      level?: GrammarLevel;
      topic?: GrammarTopicSlug;
      fields?: string[];
    }
  ): Promise<GrammarRule[]> {
    const params = new URLSearchParams();
    params.append('search', query);
    
    if (options?.level) params.append('level', options.level);
    if (options?.topic) params.append('topic', options.topic);
    if (options?.fields) params.append('fields', options.fields.join(','));

    const url = `${this.config.baseUrl}/grammar-rules/search?${params.toString()}`;
    
    const response = await this.fetchWithRetry<GrammarRule[]>(url);
    return response.data;
  }

  /**
   * Get grammar rules statistics
   * @param options - Filter options
   * @returns Promise with statistics
   */
  async getStatistics(options?: {
    level?: GrammarLevel;
    topic?: GrammarTopicSlug;
  }): Promise<{
    total: number;
    byLevel: Record<GrammarLevel, number>;
    byTopic: Record<string, number>;
    withExamples: number;
    withStructures: number;
  }> {
    const params = new URLSearchParams();
    
    if (options?.level) params.append('level', options.level);
    if (options?.topic) params.append('topic', options.topic);

    const url = `${this.config.baseUrl}/grammar-rules/stats${params.toString() ? `?${params.toString()}` : ''}`;
    
    const response = await this.fetchWithRetry<any>(url);
    return response.data;
  }

  /**
   * Create a new grammar rule (if API supports it)
   * @param rule - Grammar rule data
   * @returns Promise with created rule
   */
  async createRule(rule: Omit<GrammarRule, 'id'>): Promise<GrammarRule> {
    const url = `${this.config.baseUrl}/grammar-rules`;
    
    const response = await this.fetchWithRetry<GrammarRule>(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(rule),
    });
    
    return response.data;
  }

  /**
   * Update an existing grammar rule (if API supports it)
   * @param id - Rule ID
   * @param rule - Updated rule data
   * @returns Promise with updated rule
   */
  async updateRule(id: number, rule: Partial<GrammarRule>): Promise<GrammarRule> {
    const url = `${this.config.baseUrl}/grammar-rules/${id}`;
    
    const response = await this.fetchWithRetry<GrammarRule>(url, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(rule),
    });
    
    return response.data;
  }

  /**
   * Delete a grammar rule (if API supports it)
   * @param id - Rule ID
   * @returns Promise with deletion result
   */
  async deleteRule(id: number): Promise<{ success: boolean; message: string }> {
    const url = `${this.config.baseUrl}/grammar-rules/${id}`;
    
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
export const grammarService = new GrammarService();

// Export class for custom instances
export { GrammarService, ApiError };

// Export types
export type { ApiResponse, ApiError as ApiErrorType, ServiceConfig };