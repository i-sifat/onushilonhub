// Data structure type definitions for grammar rules and questions

import { GrammarRule, GrammarLevel, GrammarTopicSlug } from './grammar.types';
import { Question, QuestionLevel, QuestionTopicSlug } from './question.types';

// Specific data structure interfaces for each grammar topic
export interface CompletingSentenceRule extends Omit<GrammarRule, 'topic'> {
  topic: 'completing-sentence';
}

export interface ConnectorsRule extends Omit<GrammarRule, 'topic'> {
  topic: 'connectors';
}

export interface ModifierRule extends Omit<GrammarRule, 'topic'> {
  topic: 'modifier';
}

export interface NarrationRule extends Omit<GrammarRule, 'topic'> {
  topic: 'narration';
}

export interface TransformationRule extends Omit<GrammarRule, 'topic'> {
  topic: 'transformation';
}

export interface UseOfVerbsRule extends Omit<GrammarRule, 'topic'> {
  topic: 'use-of-verbs';
}

export interface PrepositionRule extends Omit<GrammarRule, 'topic'> {
  topic: 'preposition';
}

export interface PunctuationRule extends Omit<GrammarRule, 'topic'> {
  topic: 'punctuation';
}

export interface SynonymAntonymRule extends Omit<GrammarRule, 'topic'> {
  topic: 'synonym-antonym';
}

// Specific question interfaces for each topic
export interface CompletingSentenceQuestion extends Omit<Question, 'topic'> {
  topic: 'completing-sentence';
}

export interface ConnectorsQuestion extends Omit<Question, 'topic'> {
  topic: 'connectors';
}

export interface ModifierQuestion extends Omit<Question, 'topic'> {
  topic: 'modifier';
}

export interface NarrationQuestion extends Omit<Question, 'topic'> {
  topic: 'narration';
}

export interface TransformationQuestion extends Omit<Question, 'topic'> {
  topic: 'transformation';
}

export interface UseOfVerbsQuestion extends Omit<Question, 'topic'> {
  topic: 'use-of-verbs';
}

export interface PrepositionQuestion extends Omit<Question, 'topic'> {
  topic: 'preposition';
}

export interface PunctuationQuestion extends Omit<Question, 'topic'> {
  topic: 'punctuation';
}

export interface SynonymAntonymQuestion extends Omit<Question, 'topic'> {
  topic: 'synonym-antonym';
}

// Data export interfaces
export interface GrammarRulesExport {
  completingSentenceRules: CompletingSentenceRule[];
  connectorsRules: ConnectorsRule[];
  modifierRules: ModifierRule[];
  narrationRules: NarrationRule[];
  transformationRules: TransformationRule[];
  useOfVerbsRules: UseOfVerbsRule[];
  prepositionRules: PrepositionRule[];
  punctuationRules: PunctuationRule[];
  synonymAntonymRules: SynonymAntonymRule[];
}

export interface QuestionsExport {
  completingSentenceQuestions: CompletingSentenceQuestion[];
  connectorsQuestions: ConnectorsQuestion[];
  modifierQuestions: ModifierQuestion[];
  narrationQuestions: NarrationQuestion[];
  transformationQuestions: TransformationQuestion[];
  useOfVerbsQuestions: UseOfVerbsQuestion[];
  prepositionQuestions: PrepositionQuestion[];
  punctuationQuestions: PunctuationQuestion[];
  synonymAntonymQuestions: SynonymAntonymQuestion[];
}

// Data validation interfaces
export interface DataValidationResult {
  isValid: boolean;
  errors: DataValidationError[];
  warnings: DataValidationWarning[];
}

export interface DataValidationError {
  type: 'MISSING_FIELD' | 'INVALID_TYPE' | 'INVALID_VALUE' | 'DUPLICATE_ID';
  field: string;
  message: string;
  item?: any;
}

export interface DataValidationWarning {
  type: 'MISSING_OPTIONAL_FIELD' | 'INCONSISTENT_FORMAT' | 'OUTDATED_DATA';
  field: string;
  message: string;
  item?: any;
}

// Data migration interfaces
export interface DataMigration {
  version: string;
  description: string;
  up: (data: any) => any;
  down: (data: any) => any;
}

export interface DataVersion {
  version: string;
  timestamp: string;
  description: string;
  changes: string[];
}