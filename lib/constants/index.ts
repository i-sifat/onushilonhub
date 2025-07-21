// Application constants

import { GrammarLevel, GrammarTopicSlug } from '@/types/grammar.types';
import { QuestionLevel, QuestionBoard, QuestionDifficulty } from '@/types/question.types';

// Grammar Topics
export const GRAMMAR_TOPICS: Record<GrammarTopicSlug, { name: string; description: string }> = {
  'completing-sentence': {
    name: 'Completing Sentence',
    description: 'Learn to complete sentences using appropriate grammar rules'
  },
  'connectors': {
    name: 'Connectors',
    description: 'Master the use of connecting words and phrases'
  },
  'modifier': {
    name: 'Modifier',
    description: 'Understand how to use modifiers correctly'
  },
  'narration': {
    name: 'Narration',
    description: 'Learn direct and indirect speech conversion'
  },
  'transformation': {
    name: 'Transformation',
    description: 'Practice sentence transformation techniques'
  },
  'use-of-verbs': {
    name: 'Use of Verbs',
    description: 'Master correct verb usage and forms'
  },
  'preposition': {
    name: 'Preposition',
    description: 'Learn proper preposition usage'
  },
  'punctuation': {
    name: 'Punctuation',
    description: 'Master punctuation rules and usage'
  },
  'synonym-antonym': {
    name: 'Synonym & Antonym',
    description: 'Expand vocabulary with synonyms and antonyms'
  }
} as const;

// Education Levels
export const EDUCATION_LEVELS: Record<GrammarLevel, { name: string; description: string }> = {
  'HSC': {
    name: 'Higher Secondary Certificate',
    description: 'Advanced level grammar for HSC students'
  },
  'SSC': {
    name: 'Secondary School Certificate',
    description: 'Intermediate level grammar for SSC students'
  },
  'BOTH': {
    name: 'HSC & SSC',
    description: 'Grammar rules applicable to both levels'
  }
} as const;

// Question Boards
export const QUESTION_BOARDS: Record<QuestionBoard, { name: string; region: string }> = {
  'Dhaka': { name: 'Dhaka Board', region: 'Central' },
  'Chattogram': { name: 'Chattogram Board', region: 'Eastern' },
  'Rajshahi': { name: 'Rajshahi Board', region: 'Northern' },
  'Sylhet': { name: 'Sylhet Board', region: 'Northeastern' },
  'Barishal': { name: 'Barishal Board', region: 'Southern' },
  'Rangpur': { name: 'Rangpur Board', region: 'Northwestern' },
  'Mymensingh': { name: 'Mymensingh Board', region: 'North-central' },
  'Cumilla': { name: 'Cumilla Board', region: 'Eastern' },
  'Dinajpur': { name: 'Dinajpur Board', region: 'Northern' },
  'Jashore': { name: 'Jashore Board', region: 'Southwestern' },
  'Sample': { name: 'Sample Questions', region: 'General' }
} as const;

// Question Difficulty Levels
export const DIFFICULTY_LEVELS: Record<QuestionDifficulty, { name: string; color: string; description: string }> = {
  'EASY': {
    name: 'Easy',
    color: 'green',
    description: 'Basic level questions suitable for beginners'
  },
  'MEDIUM': {
    name: 'Medium',
    color: 'yellow',
    description: 'Intermediate level questions for regular practice'
  },
  'HARD': {
    name: 'Hard',
    color: 'red',
    description: 'Advanced level questions for exam preparation'
  }
} as const;

// API Endpoints
export const API_ENDPOINTS = {
  GRAMMAR_RULES: '/api/grammar-rules',
  GRAMMAR_RULES_BY_TOPIC: (topic: string) => `/api/grammar-rules/${topic}`,
  QUESTIONS: '/api/questions',
  QUESTIONS_BY_TOPIC: (topic: string) => `/api/questions/${topic}`,
  TOPICS: '/api/topics',
  SEARCH: '/api/search',
  STATS: '/api/stats'
} as const;

// Route Paths
export const ROUTES = {
  HOME: '/',
  ABOUT: '/about',
  GRAMMAR_ITEMS: '/grammar-items',
  GRAMMAR_TOPIC: (topic: string) => `/grammar-items/${topic}`,
  BOARD_QUESTIONS: '/board-questions',
  BOARD_QUESTIONS_TOPIC: (topic: string) => `/board-questions/${topic}`,
  GET_STARTED: '/get-started',
  GET_STARTED_TOPIC: (topic: string) => `/get-started/${topic}`,
  SEARCH: '/search'
} as const;

// Local Storage Keys
export const STORAGE_KEYS = {
  THEME: 'grammar-app-theme',
  USER_PREFERENCES: 'grammar-app-preferences',
  RECENT_TOPICS: 'grammar-app-recent-topics',
  BOOKMARKS: 'grammar-app-bookmarks',
  PROGRESS: 'grammar-app-progress'
} as const;

// Application Configuration
export const APP_CONFIG = {
  NAME: 'Grammar Learning Platform',
  DESCRIPTION: 'Comprehensive English grammar learning platform for HSC and SSC students',
  VERSION: '1.0.0',
  AUTHOR: 'Grammar Learning Team',
  CONTACT_EMAIL: 'support@grammarlearning.com',
  GITHUB_URL: 'https://github.com/grammar-learning/platform',
  ITEMS_PER_PAGE: 20,
  MAX_SEARCH_RESULTS: 100,
  DEBOUNCE_DELAY: 300,
  CACHE_DURATION: 5 * 60 * 1000, // 5 minutes
  MAX_RECENT_TOPICS: 10
} as const;

// Validation Rules
export const VALIDATION_RULES = {
  MIN_SEARCH_LENGTH: 2,
  MAX_SEARCH_LENGTH: 100,
  MIN_QUESTION_LENGTH: 10,
  MAX_QUESTION_LENGTH: 500,
  MIN_ANSWER_LENGTH: 1,
  MAX_ANSWER_LENGTH: 200,
  VALID_YEARS: {
    MIN: 2015,
    MAX: new Date().getFullYear()
  }
} as const;

// UI Constants
export const UI_CONSTANTS = {
  BREAKPOINTS: {
    SM: 640,
    MD: 768,
    LG: 1024,
    XL: 1280,
    '2XL': 1536
  },
  ANIMATION_DURATION: {
    FAST: 150,
    NORMAL: 300,
    SLOW: 500
  },
  Z_INDEX: {
    DROPDOWN: 1000,
    MODAL: 1050,
    TOOLTIP: 1100,
    TOAST: 1200
  }
} as const;

// Error Messages
export const ERROR_MESSAGES = {
  NETWORK_ERROR: 'Network error occurred. Please check your connection.',
  DATA_NOT_FOUND: 'Requested data not found.',
  VALIDATION_ERROR: 'Please check your input and try again.',
  PERMISSION_DENIED: 'You do not have permission to perform this action.',
  RATE_LIMIT_EXCEEDED: 'Too many requests. Please try again later.',
  INTERNAL_SERVER_ERROR: 'Internal server error. Please try again later.',
  SEARCH_TOO_SHORT: `Search query must be at least ${VALIDATION_RULES.MIN_SEARCH_LENGTH} characters long.`,
  SEARCH_TOO_LONG: `Search query cannot exceed ${VALIDATION_RULES.MAX_SEARCH_LENGTH} characters.`,
  INVALID_YEAR: `Year must be between ${VALIDATION_RULES.VALID_YEARS.MIN} and ${VALIDATION_RULES.VALID_YEARS.MAX}.`
} as const;

// Success Messages
export const SUCCESS_MESSAGES = {
  DATA_LOADED: 'Data loaded successfully.',
  SEARCH_COMPLETED: 'Search completed successfully.',
  BOOKMARK_ADDED: 'Bookmark added successfully.',
  BOOKMARK_REMOVED: 'Bookmark removed successfully.',
  PREFERENCES_SAVED: 'Preferences saved successfully.'
} as const;