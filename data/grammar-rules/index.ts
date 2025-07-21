// Centralized Grammar Rules Index
// This file exports all grammar rules with consistent interfaces

import { GrammarRuleData, GrammarLevel, GrammarTopicSlug } from '../../types/grammar.types';

// Import all grammar rules
import { completingSentenceRules, completingSentenceMetadata } from './completing-sentence';
import { connectorsRules, connectorsMetadata } from './connectors';
import { modifierRules, modifierMetadata } from './modifier';
import { narrationRules, narrationMetadata } from './narration';
import { transformationRules, transformationMetadata } from './transformation';
import { rightFormVerbRules, rightFormVerbMetadata } from './right-form-verb';
import { prepositionRules, prepositionMetadata } from './preposition';
import { punctuationRules, punctuationMetadata } from './punctuation';
import { synonymAntonymRules, synonymAntonymMetadata } from './synonym-antonym';

// Export individual rule sets
export {
  completingSentenceRules,
  connectorsRules,
  modifierRules,
  narrationRules,
  transformationRules,
  rightFormVerbRules,
  prepositionRules,
  punctuationRules,
  synonymAntonymRules
};

// Export metadata
export {
  completingSentenceMetadata,
  connectorsMetadata,
  modifierMetadata,
  narrationMetadata,
  transformationMetadata,
  rightFormVerbMetadata,
  prepositionMetadata,
  punctuationMetadata,
  synonymAntonymMetadata
};

// Create standardized grammar rule data objects
export const grammarRulesData: Record<GrammarTopicSlug, GrammarRuleData> = {
  'completing-sentence': {
    topic: 'Completing Sentence',
    slug: 'completing-sentence',
    level: 'HSC',
    rules: completingSentenceRules,
    metadata: {
      lastUpdated: completingSentenceMetadata.lastUpdated,
      version: completingSentenceMetadata.version,
      totalRules: completingSentenceMetadata.totalRules
    }
  },
  'connectors': {
    topic: 'Connectors',
    slug: 'connectors',
    level: 'HSC',
    rules: connectorsRules,
    metadata: {
      lastUpdated: connectorsMetadata.lastUpdated,
      version: connectorsMetadata.version,
      totalRules: connectorsMetadata.totalRules
    }
  },
  'modifier': {
    topic: 'Modifier',
    slug: 'modifier',
    level: 'HSC',
    rules: modifierRules,
    metadata: {
      lastUpdated: modifierMetadata.lastUpdated,
      version: modifierMetadata.version,
      totalRules: modifierMetadata.totalRules
    }
  },
  'narration': {
    topic: 'Narration',
    slug: 'narration',
    level: 'HSC',
    rules: narrationRules,
    metadata: {
      lastUpdated: narrationMetadata.lastUpdated,
      version: narrationMetadata.version,
      totalRules: narrationMetadata.totalRules
    }
  },
  'transformation': {
    topic: 'Transformation',
    slug: 'transformation',
    level: 'HSC',
    rules: transformationRules,
    metadata: {
      lastUpdated: transformationMetadata.lastUpdated,
      version: transformationMetadata.version,
      totalRules: transformationMetadata.totalRules
    }
  },
  'use-of-verbs': {
    topic: 'Use of Verbs',
    slug: 'use-of-verbs',
    level: 'HSC',
    rules: rightFormVerbRules,
    metadata: {
      lastUpdated: rightFormVerbMetadata.lastUpdated,
      version: rightFormVerbMetadata.version,
      totalRules: rightFormVerbMetadata.totalRules
    }
  },
  'preposition': {
    topic: 'Preposition',
    slug: 'preposition',
    level: 'HSC',
    rules: prepositionRules,
    metadata: {
      lastUpdated: prepositionMetadata.lastUpdated,
      version: prepositionMetadata.version,
      totalRules: prepositionMetadata.totalRules
    }
  },
  'punctuation': {
    topic: 'Punctuation',
    slug: 'punctuation',
    level: 'HSC',
    rules: punctuationRules,
    metadata: {
      lastUpdated: punctuationMetadata.lastUpdated,
      version: punctuationMetadata.version,
      totalRules: punctuationMetadata.totalRules
    }
  },
  'synonym-antonym': {
    topic: 'Synonym & Antonym',
    slug: 'synonym-antonym',
    level: 'HSC',
    rules: synonymAntonymRules,
    metadata: {
      lastUpdated: synonymAntonymMetadata.lastUpdated,
      version: synonymAntonymMetadata.version,
      totalRules: synonymAntonymMetadata.totalRules
    }
  }
};

// Helper functions for accessing grammar rules
export const getGrammarRulesByTopic = (topic: GrammarTopicSlug) => {
  return grammarRulesData[topic];
};

export const getAllGrammarRules = () => {
  return Object.values(grammarRulesData).flatMap(data => data.rules);
};

export const getGrammarRulesByLevel = (level: GrammarLevel) => {
  return Object.values(grammarRulesData)
    .filter(data => data.level === level || data.level === 'BOTH')
    .flatMap(data => data.rules);
};

export const getGrammarTopics = () => {
  return Object.keys(grammarRulesData) as GrammarTopicSlug[];
};

export const getGrammarRuleById = (id: number) => {
  return getAllGrammarRules().find(rule => rule.id === id);
};

// Export total counts
export const grammarRulesStats = {
  totalRules: getAllGrammarRules().length,
  totalTopics: Object.keys(grammarRulesData).length,
  rulesByTopic: Object.fromEntries(
    Object.entries(grammarRulesData).map(([topic, data]) => [topic, data.rules.length])
  )
};