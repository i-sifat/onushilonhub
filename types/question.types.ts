// Question-related type definitions

export type QuestionDifficulty = 'EASY' | 'MEDIUM' | 'HARD';
export type QuestionLevel = 'HSC' | 'SSC';
export type QuestionBoard = 
  | 'Dhaka'
  | 'Chattogram'
  | 'Rajshahi'
  | 'Sylhet'
  | 'Barishal'
  | 'Rangpur'
  | 'Mymensingh'
  | 'Cumilla'
  | 'Dinajpur'
  | 'Jashore'
  | 'Sample';

export type QuestionTopicSlug = 
  | 'completing-sentence'
  | 'connectors'
  | 'modifier'
  | 'narration'
  | 'transformation'
  | 'use-of-verbs'
  | 'preposition'
  | 'punctuation'
  | 'synonym-antonym';

export interface Question {
  id: string;
  topic?: QuestionTopicSlug;
  question: string;
  answer?: string;
  explanation?: string;
  marks?: number;
  difficulty?: QuestionDifficulty;
  level?: QuestionLevel;
  board?: QuestionBoard;
  year?: number;
  ruleId?: number;
  passage?: string;
  blanks?: QuestionBlank[];
  metadata?: QuestionMetadata;
}

export interface QuestionBlank {
  id: string;
  answer: string;
  position?: number;
  hints?: string[];
}

export interface QuestionMetadata {
  createdAt?: string;
  updatedAt?: string;
  tags?: string[];
  category?: string;
  source?: string;
}

export interface YearQuestions {
  year: number;
  board?: QuestionBoard;
  level: QuestionLevel;
  questions: Question[];
}

export interface QuestionData {
  topic: string;
  slug: QuestionTopicSlug;
  level: QuestionLevel;
  questions: Question[];
  metadata?: {
    lastUpdated: string;
    version: string;
    totalQuestions: number;
    yearRange?: {
      from: number;
      to: number;
    };
  };
}

export interface QuestionFilter {
  topic?: QuestionTopicSlug;
  level?: QuestionLevel;
  board?: QuestionBoard;
  year?: number;
  difficulty?: QuestionDifficulty;
  searchQuery?: string;
  ruleId?: number;
}

export interface QuestionStats {
  total: number;
  byLevel: Record<QuestionLevel, number>;
  byBoard: Record<QuestionBoard, number>;
  byYear: Record<number, number>;
  byDifficulty: Record<QuestionDifficulty, number>;
}

// Component prop types
export interface QuestionCardProps {
  question: Question;
  showAnswer?: boolean;
  showMetadata?: boolean;
  onQuestionClick?: (question: Question) => void;
  onAnswerToggle?: (questionId: string) => void;
}

export interface QuestionsListProps {
  questions: Question[];
  filter?: QuestionFilter;
  onQuestionSelect?: (question: Question) => void;
  showPagination?: boolean;
  itemsPerPage?: number;
}

export interface QuestionFilterProps {
  filter: QuestionFilter;
  onFilterChange: (filter: QuestionFilter) => void;
  availableTopics?: QuestionTopicSlug[];
  availableBoards?: QuestionBoard[];
  availableYears?: number[];
}

export interface AnswerInputProps {
  questionId: string;
  onAnswerSubmit: (questionId: string, answer: string) => void;
  placeholder?: string;
  disabled?: boolean;
}