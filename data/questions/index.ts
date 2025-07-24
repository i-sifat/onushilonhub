// Centralized Questions Index
// This file exports all questions with consistent interfaces

import { QuestionData, QuestionLevel, QuestionTopicSlug } from '@/types/question.types';

// Import all questions
import { completingSentenceQuestions, completingSentenceQuestionsMetadata } from '@/data/questions/completing-sentence';
import { connectorsQuestions, connectorsQuestionsMetadata } from '@/data/questions/connectors';
// import { modifierQuestions, modifierQuestionsMetadata } from '@/data/questions/modifier';
import { narrationQuestions, narrationQuestionsMetadata } from '@/data/questions/narration';
import { transformationQuestions, transformationQuestionsMetadata } from '@/data/questions/transformation';
import { useOfVerbsQuestions, useOfVerbsQuestionsMetadata } from '@/data/questions/use-of-verbs';
import { prepositionQuestions, prepositionQuestionsMetadata } from '@/data/questions/preposition';
import { punctuationQuestions, punctuationQuestionsMetadata } from '@/data/questions/punctuation';
import { synonymAntonymQuestions, synonymAntonymQuestionsMetadata } from '@/data/questions/synonym-antonym';

// Export individual question sets
export {
  completingSentenceQuestions,
  connectorsQuestions,
  // modifierQuestions,
  narrationQuestions,
  transformationQuestions,
  useOfVerbsQuestions,
  prepositionQuestions,
  punctuationQuestions,
  synonymAntonymQuestions
};

// Export metadata
export {
  completingSentenceQuestionsMetadata,
  connectorsQuestionsMetadata,
  // modifierQuestionsMetadata,
  narrationQuestionsMetadata,
  transformationQuestionsMetadata,
  useOfVerbsQuestionsMetadata,
  prepositionQuestionsMetadata,
  punctuationQuestionsMetadata,
  synonymAntonymQuestionsMetadata
};

// Create standardized question data objects
export const questionsData: Record<QuestionTopicSlug, QuestionData> = {
  'completing-sentence': {
    topic: 'Completing Sentence',
    slug: 'completing-sentence',
    level: 'HSC',
    questions: completingSentenceQuestions,
    metadata: {
      lastUpdated: completingSentenceQuestionsMetadata.lastUpdated,
      version: completingSentenceQuestionsMetadata.version,
      totalQuestions: completingSentenceQuestionsMetadata.totalQuestions,
      yearRange: completingSentenceQuestionsMetadata.yearRange
    }
  },
  'connectors': {
    topic: 'Connectors',
    slug: 'connectors',
    level: 'HSC',
    questions: connectorsQuestions,
    metadata: {
      lastUpdated: connectorsQuestionsMetadata.lastUpdated,
      version: connectorsQuestionsMetadata.version,
      totalQuestions: connectorsQuestionsMetadata.totalQuestions,
      yearRange: connectorsQuestionsMetadata.yearRange
    }
  },
  // 'modifier': {
  //   topic: 'Modifier',
  //   slug: 'modifier',
  //   level: 'HSC',
  //   questions: modifierQuestions,
  //   metadata: {
  //     lastUpdated: modifierQuestionsMetadata.lastUpdated,
  //     version: modifierQuestionsMetadata.version,
  //     totalQuestions: modifierQuestionsMetadata.totalQuestions,
  //     yearRange: modifierQuestionsMetadata.yearRange
  //   }
  // },
  'narration': {
    topic: 'Narration',
    slug: 'narration',
    level: 'HSC',
    questions: narrationQuestions,
    metadata: {
      lastUpdated: narrationQuestionsMetadata.lastUpdated,
      version: narrationQuestionsMetadata.version,
      totalQuestions: narrationQuestionsMetadata.totalQuestions,
      yearRange: narrationQuestionsMetadata.yearRange
    }
  },
  'transformation': {
    topic: 'Transformation',
    slug: 'transformation',
    level: 'HSC',
    questions: transformationQuestions,
    metadata: {
      lastUpdated: transformationQuestionsMetadata.lastUpdated,
      version: transformationQuestionsMetadata.version,
      totalQuestions: transformationQuestionsMetadata.totalQuestions,
      yearRange: transformationQuestionsMetadata.yearRange
    }
  },
  'use-of-verbs': {
    topic: 'Use of Verbs',
    slug: 'use-of-verbs',
    level: 'HSC',
    questions: useOfVerbsQuestions,
    metadata: {
      lastUpdated: useOfVerbsQuestionsMetadata.lastUpdated,
      version: useOfVerbsQuestionsMetadata.version,
      totalQuestions: useOfVerbsQuestionsMetadata.totalQuestions,
      yearRange: useOfVerbsQuestionsMetadata.yearRange
    }
  },
  'preposition': {
    topic: 'Preposition',
    slug: 'preposition',
    level: 'HSC',
    questions: prepositionQuestions,
    metadata: {
      lastUpdated: prepositionQuestionsMetadata.lastUpdated,
      version: prepositionQuestionsMetadata.version,
      totalQuestions: prepositionQuestionsMetadata.totalQuestions,
      yearRange: prepositionQuestionsMetadata.yearRange
    }
  },
  'punctuation': {
    topic: 'Punctuation',
    slug: 'punctuation',
    level: 'HSC',
    questions: punctuationQuestions,
    metadata: {
      lastUpdated: punctuationQuestionsMetadata.lastUpdated,
      version: punctuationQuestionsMetadata.version,
      totalQuestions: punctuationQuestionsMetadata.totalQuestions,
      yearRange: punctuationQuestionsMetadata.yearRange
    }
  },
  'synonym-antonym': {
    topic: 'Synonym & Antonym',
    slug: 'synonym-antonym',
    level: 'HSC',
    questions: synonymAntonymQuestions,
    metadata: {
      lastUpdated: synonymAntonymQuestionsMetadata.lastUpdated,
      version: synonymAntonymQuestionsMetadata.version,
      totalQuestions: synonymAntonymQuestionsMetadata.totalQuestions,
      yearRange: synonymAntonymQuestionsMetadata.yearRange
    }
  }
};

// Helper functions for accessing questions
export const getQuestionsByTopic = (topic: QuestionTopicSlug) => {
  return questionsData[topic];
};

export const getAllQuestions = () => {
  return Object.values(questionsData).flatMap(data => data.questions);
};

export const getQuestionsByLevel = (level: QuestionLevel) => {
  return Object.values(questionsData)
    .filter(data => data.level === level)
    .flatMap(data => data.questions);
};

export const getQuestionsByBoard = (board: string) => {
  return getAllQuestions().filter(question => question.board === board);
};

export const getQuestionsByYear = (year: number) => {
  return getAllQuestions().filter(question => question.year === year);
};

export const getQuestionTopics = () => {
  return Object.keys(questionsData) as QuestionTopicSlug[];
};

export const getQuestionById = (id: string) => {
  return getAllQuestions().find(question => question.id === id);
};

export const getQuestionsByRuleId = (ruleId: number) => {
  return getAllQuestions().filter(question => question.ruleId === ruleId);
};

// Export total counts and statistics
export const questionsStats = {
  totalQuestions: getAllQuestions().length,
  totalTopics: Object.keys(questionsData).length,
  questionsByTopic: Object.fromEntries(
    Object.entries(questionsData).map(([topic, data]) => [topic, data.questions.length])
  ),
  questionsByLevel: Object.fromEntries(
    ['HSC', 'SSC'].map(level => [
      level, 
      getQuestionsByLevel(level as QuestionLevel).length
    ])
  ),
  availableBoards: [...new Set(getAllQuestions().filter(q => q.board).map(q => q.board!))],
  availableYears: [...new Set(getAllQuestions().filter(q => q.year).map(q => q.year!))].sort((a, b) => b - a)
};