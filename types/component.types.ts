// Component-specific type definitions

import { ReactNode } from 'react';
import { BaseComponentProps } from './common.types';
import { GrammarRule, GrammarTopic, GrammarLevel, GrammarTopicSlug } from './grammar.types';
import { Question, QuestionFilter, QuestionLevel, QuestionBoard } from './question.types';

// Layout Component Props
export interface NavbarProps extends BaseComponentProps {
  isFixed?: boolean;
  showSearch?: boolean;
  onSearchToggle?: () => void;
}

export interface FooterProps extends BaseComponentProps {
  showSocialLinks?: boolean;
  showNewsletter?: boolean;
}

export interface SidebarProps extends BaseComponentProps {
  isOpen: boolean;
  onClose: () => void;
  navigation: NavItem[];
}

export interface BreadcrumbsProps extends BaseComponentProps {
  items: BreadcrumbItem[];
  separator?: ReactNode;
}

export interface BreadcrumbItem {
  label: string;
  href?: string;
  isActive?: boolean;
}

export interface NavItem {
  id: string;
  label: string;
  href: string;
  icon?: ReactNode;
  children?: NavItem[];
  isActive?: boolean;
  isExternal?: boolean;
}

// Grammar Component Props
export interface GrammarRuleCardProps extends BaseComponentProps {
  rule: GrammarRule;
  showTopic?: boolean;
  showLevel?: boolean;
  isExpanded?: boolean;
  onToggleExpand?: (ruleId: number) => void;
  onRuleClick?: (rule: GrammarRule) => void;
}

export interface GrammarRulesListProps extends BaseComponentProps {
  rules: GrammarRule[];
  topic?: GrammarTopicSlug;
  level?: GrammarLevel;
  searchQuery?: string;
  isLoading?: boolean;
  emptyMessage?: string;
  onRuleSelect?: (rule: GrammarRule) => void;
  showPagination?: boolean;
  itemsPerPage?: number;
}

export interface TopicSelectorProps extends BaseComponentProps {
  topics: GrammarTopic[];
  selectedTopic?: GrammarTopicSlug;
  onTopicSelect: (topic: GrammarTopicSlug) => void;
  level?: GrammarLevel;
  showCounts?: boolean;
  layout?: 'grid' | 'list' | 'dropdown';
}

export interface LevelSelectorProps extends BaseComponentProps {
  selectedLevel: GrammarLevel;
  onLevelSelect: (level: GrammarLevel) => void;
  showBoth?: boolean;
  variant?: 'tabs' | 'radio' | 'dropdown';
}

export interface TopicCardProps extends BaseComponentProps {
  topic: GrammarTopic;
  isSelected?: boolean;
  onClick?: (topic: GrammarTopic) => void;
  showStats?: boolean;
  variant?: 'default' | 'compact' | 'detailed';
}

// Question Component Props
export interface QuestionCardProps extends BaseComponentProps {
  question: Question;
  showAnswer?: boolean;
  showMetadata?: boolean;
  showRuleReference?: boolean;
  isBookmarked?: boolean;
  onQuestionClick?: (question: Question) => void;
  onAnswerToggle?: (questionId: string) => void;
  onBookmarkToggle?: (questionId: string) => void;
}

export interface QuestionsListProps extends BaseComponentProps {
  questions: Question[];
  filter?: QuestionFilter;
  isLoading?: boolean;
  emptyMessage?: string;
  onQuestionSelect?: (question: Question) => void;
  showPagination?: boolean;
  itemsPerPage?: number;
  groupBy?: 'none' | 'year' | 'board' | 'difficulty';
}

export interface QuestionFilterProps extends BaseComponentProps {
  filter: QuestionFilter;
  onFilterChange: (filter: QuestionFilter) => void;
  availableTopics?: GrammarTopicSlug[];
  availableBoards?: QuestionBoard[];
  availableYears?: number[];
  showAdvancedFilters?: boolean;
  isCollapsible?: boolean;
}

export interface AnswerInputProps extends BaseComponentProps {
  questionId: string;
  currentAnswer?: string;
  onAnswerSubmit: (questionId: string, answer: string) => void;
  onAnswerChange?: (questionId: string, answer: string) => void;
  placeholder?: string;
  disabled?: boolean;
  showHints?: boolean;
  maxLength?: number;
}

// Common UI Component Props
export interface SearchInputProps extends BaseComponentProps {
  value: string;
  onChange: (value: string) => void;
  onSearch?: (query: string) => void;
  placeholder?: string;
  disabled?: boolean;
  showSuggestions?: boolean;
  suggestions?: string[];
  debounceMs?: number;
}

export interface BackButtonProps extends BaseComponentProps {
  href?: string;
  onClick?: () => void;
  label?: string;
  showIcon?: boolean;
}

export interface LoadingSpinnerProps extends BaseComponentProps {
  size?: 'sm' | 'md' | 'lg';
  color?: string;
  message?: string;
}

export interface ErrorBoundaryProps extends BaseComponentProps {
  children: ReactNode;
  fallback?: ReactNode;
  onError?: (error: Error, errorInfo: any) => void;
}

export interface EmptyStateProps extends BaseComponentProps {
  title: string;
  description?: string;
  icon?: ReactNode;
  action?: {
    label: string;
    onClick: () => void;
  };
}

// Page Component Props
export interface PageLayoutProps extends BaseComponentProps {
  children: ReactNode;
  title?: string;
  description?: string;
  showBreadcrumbs?: boolean;
  showBackButton?: boolean;
  sidebar?: ReactNode;
  actions?: ReactNode;
}

export interface GrammarPageProps extends BaseComponentProps {
  topic: GrammarTopicSlug;
  level?: GrammarLevel;
  initialRules?: GrammarRule[];
}

export interface QuestionsPageProps extends BaseComponentProps {
  topic?: GrammarTopicSlug;
  level?: QuestionLevel;
  board?: QuestionBoard;
  year?: number;
  initialQuestions?: Question[];
}

export interface SearchPageProps extends BaseComponentProps {
  initialQuery?: string;
  initialResults?: {
    rules: GrammarRule[];
    questions: Question[];
  };
}

// Form Component Props
export interface FormProps extends BaseComponentProps {
  onSubmit: (data: any) => void;
  children: ReactNode;
  isLoading?: boolean;
  disabled?: boolean;
}

export interface FormFieldProps extends BaseComponentProps {
  name: string;
  label: string;
  type?: 'text' | 'email' | 'password' | 'number' | 'select' | 'textarea';
  placeholder?: string;
  required?: boolean;
  disabled?: boolean;
  error?: string;
  helperText?: string;
  options?: Array<{ label: string; value: string }>;
}

// Modal Component Props
export interface ModalProps extends BaseComponentProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: ReactNode;
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
  closeOnOverlayClick?: boolean;
  closeOnEsc?: boolean;
  showCloseButton?: boolean;
}

export interface ConfirmDialogProps extends ModalProps {
  message: string;
  confirmText?: string;
  cancelText?: string;
  onConfirm: () => void;
  variant?: 'default' | 'danger' | 'warning';
  isLoading?: boolean;
}

// Statistics Component Props
export interface StatsCardProps extends BaseComponentProps {
  title: string;
  value: string | number;
  description?: string;
  icon?: ReactNode;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  color?: string;
}

export interface ChartProps extends BaseComponentProps {
  data: any[];
  type: 'line' | 'bar' | 'pie' | 'area';
  title?: string;
  height?: number;
  showLegend?: boolean;
  showTooltip?: boolean;
}