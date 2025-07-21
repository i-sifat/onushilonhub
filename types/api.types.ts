// API-related type definitions

export interface ApiResponse<T = any> {
  data: T;
  success: boolean;
  message?: string;
  error?: ApiError;
  meta?: ApiMeta;
}

export interface ApiError {
  code: string;
  message: string;
  details?: any;
  timestamp: string;
  path?: string;
}

export interface ApiMeta {
  page?: number;
  limit?: number;
  total?: number;
  totalPages?: number;
  hasNext?: boolean;
  hasPrev?: boolean;
}

export interface PaginationParams {
  page?: number;
  limit?: number;
  offset?: number;
}

export interface SortParams {
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

export interface SearchParams {
  query?: string;
  fields?: string[];
}

// Grammar Rules API types
export interface GrammarRulesApiResponse extends ApiResponse {
  data: {
    rules: import('./grammar.types').GrammarRule[];
    topic?: string;
    level?: import('./grammar.types').GrammarLevel;
    total: number;
  };
}

export interface GrammarTopicsApiResponse extends ApiResponse {
  data: {
    topics: import('./grammar.types').GrammarTopic[];
    total: number;
  };
}

// Questions API types
export interface QuestionsApiResponse extends ApiResponse {
  data: {
    questions: import('./question.types').Question[];
    topic?: string;
    level?: import('./question.types').QuestionLevel;
    total: number;
    stats?: import('./question.types').QuestionStats;
  };
}

export interface QuestionStatsApiResponse extends ApiResponse {
  data: import('./question.types').QuestionStats;
}

// API Request types
export interface GrammarRulesRequest {
  topic?: string;
  level?: import('./grammar.types').GrammarLevel;
  search?: string;
  pagination?: PaginationParams;
  sort?: SortParams;
}

export interface QuestionsRequest {
  topic?: string;
  level?: import('./question.types').QuestionLevel;
  board?: import('./question.types').QuestionBoard;
  year?: number;
  difficulty?: import('./question.types').QuestionDifficulty;
  ruleId?: number;
  search?: string;
  pagination?: PaginationParams;
  sort?: SortParams;
}

export interface TopicsRequest {
  level?: import('./grammar.types').GrammarLevel;
  active?: boolean;
  sort?: SortParams;
}

// Error types
export enum ApiErrorCodes {
  NETWORK_ERROR = 'NETWORK_ERROR',
  DATA_NOT_FOUND = 'DATA_NOT_FOUND',
  VALIDATION_ERROR = 'VALIDATION_ERROR',
  PERMISSION_DENIED = 'PERMISSION_DENIED',
  RATE_LIMIT_EXCEEDED = 'RATE_LIMIT_EXCEEDED',
  INTERNAL_SERVER_ERROR = 'INTERNAL_SERVER_ERROR',
  BAD_REQUEST = 'BAD_REQUEST',
  UNAUTHORIZED = 'UNAUTHORIZED',
  FORBIDDEN = 'FORBIDDEN'
}

export interface ValidationError {
  field: string;
  message: string;
  code: string;
}

export interface ApiValidationError extends ApiError {
  details: ValidationError[];
}

// HTTP method types
export type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';

// API endpoint configuration
export interface ApiEndpoint {
  path: string;
  method: HttpMethod;
  requiresAuth?: boolean;
  rateLimit?: {
    requests: number;
    window: number; // in seconds
  };
}