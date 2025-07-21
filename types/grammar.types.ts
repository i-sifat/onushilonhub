// Grammar-related type definitions

export type GrammarLevel = 'HSC' | 'SSC' | 'BOTH';
export type GrammarTopicSlug = 
  | 'completing-sentence'
  | 'connectors'
  | 'modifier'
  | 'narration'
  | 'transformation'
  | 'use-of-verbs'
  | 'preposition'
  | 'punctuation'
  | 'synonym-antonym';

export interface GrammarRule {
  id: number;
  ruleNo?: string;
  title: string;
  bengali: string;
  description: string;
  structures: string[];
  examples: string[];
  tips?: string[];
  level?: GrammarLevel;
  topic?: GrammarTopicSlug;
}

export interface GrammarTopic {
  id: string;
  name: string;
  slug: GrammarTopicSlug;
  description: string;
  level: GrammarLevel;
  order: number;
  isActive: boolean;
  ruleCount?: number;
  questionCount?: number;
}

export interface GrammarRuleData {
  topic: string;
  slug: GrammarTopicSlug;
  level: GrammarLevel;
  rules: GrammarRule[];
  metadata?: {
    lastUpdated: string;
    version: string;
    totalRules: number;
  };
}

// Legacy interface for backward compatibility
export interface RulesData {
  topic: string;
  rules: GrammarRule[];
}

// Component prop types
export interface GrammarRuleCardProps {
  rule: GrammarRule;
  showTopic?: boolean;
  showLevel?: boolean;
  onRuleClick?: (rule: GrammarRule) => void;
}

export interface GrammarRulesListProps {
  rules: GrammarRule[];
  topic?: GrammarTopicSlug;
  level?: GrammarLevel;
  searchQuery?: string;
  onRuleSelect?: (rule: GrammarRule) => void;
}

export interface TopicSelectorProps {
  topics: GrammarTopic[];
  selectedTopic?: GrammarTopicSlug;
  onTopicSelect: (topic: GrammarTopicSlug) => void;
  level?: GrammarLevel;
}

export interface LevelSelectorProps {
  selectedLevel: GrammarLevel;
  onLevelSelect: (level: GrammarLevel) => void;
  showBoth?: boolean;
}