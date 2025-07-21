// Centralized Topic Configuration System
// This file defines all grammar topics with their metadata and routing information

import { GrammarLevel, GrammarTopicSlug } from '../../types/grammar.types';
import { QuestionTopicSlug } from '../../types/question.types';

export interface TopicConfig {
  id: string;
  name: string;
  slug: GrammarTopicSlug | QuestionTopicSlug;
  description: string;
  level: GrammarLevel;
  order: number;
  isActive: boolean;
  category: 'grammar-rules' | 'questions' | 'both';
  icon?: string;
  color?: string;
  difficulty: 'EASY' | 'MEDIUM' | 'HARD';
  estimatedTime?: number; // in minutes
  prerequisites?: string[];
  tags?: string[];
  routes: {
    grammarRules?: string;
    questions?: string;
    practice?: string;
  };
}

// HSC Topics Configuration
export const hscTopics: TopicConfig[] = [
  {
    id: 'completing-sentence',
    name: 'Completing Sentence',
    slug: 'completing-sentence',
    description: 'Learn to complete sentences using appropriate grammar rules and structures',
    level: 'HSC',
    order: 1,
    isActive: true,
    category: 'both',
    icon: '📝',
    color: '#3B82F6',
    difficulty: 'MEDIUM',
    estimatedTime: 45,
    prerequisites: [],
    tags: ['sentence-completion', 'grammar-rules', 'conditional', 'clauses'],
    routes: {
      grammarRules: '/grammar-items/hsc/completing-sentence',
      questions: '/board-questions/hsc/completing-sentence',
      practice: '/get-started/completing-sentence'
    }
  },
  {
    id: 'connectors',
    name: 'Connectors',
    slug: 'connectors',
    description: 'Master the use of linking words and connectors to create coherent texts',
    level: 'HSC',
    order: 2,
    isActive: true,
    category: 'both',
    icon: '🔗',
    color: '#10B981',
    difficulty: 'HARD',
    estimatedTime: 60,
    prerequisites: [],
    tags: ['linking-words', 'coherence', 'text-organization', 'transitions'],
    routes: {
      grammarRules: '/grammar-items/hsc/connectors',
      questions: '/board-questions/hsc/connectors',
      practice: '/get-started/connectors'
    }
  },
  {
    id: 'modifier',
    name: 'Modifier',
    slug: 'modifier',
    description: 'Learn to use pre-modifiers and post-modifiers to enhance sentence structure',
    level: 'HSC',
    order: 3,
    isActive: true,
    category: 'both',
    icon: '🎯',
    color: '#F59E0B',
    difficulty: 'MEDIUM',
    estimatedTime: 50,
    prerequisites: [],
    tags: ['pre-modifier', 'post-modifier', 'adjectives', 'adverbs', 'phrases'],
    routes: {
      grammarRules: '/grammar-items/hsc/modifier',
      questions: '/board-questions/hsc/modifier',
      practice: '/get-started/modifier'
    }
  },
  {
    id: 'narration',
    name: 'Narration',
    slug: 'narration',
    description: 'Convert between direct and indirect speech following proper narration rules',
    level: 'HSC',
    order: 4,
    isActive: true,
    category: 'both',
    icon: '💬',
    color: '#8B5CF6',
    difficulty: 'MEDIUM',
    estimatedTime: 40,
    prerequisites: [],
    tags: ['direct-speech', 'indirect-speech', 'reporting-verbs', 'tense-changes'],
    routes: {
      grammarRules: '/grammar-items/hsc/narration',
      questions: '/board-questions/hsc/narration',
      practice: '/get-started/narration'
    }
  },
  {
    id: 'transformation',
    name: 'Transformation',
    slug: 'transformation',
    description: 'Transform sentences between different structures while maintaining meaning',
    level: 'HSC',
    order: 5,
    isActive: true,
    category: 'both',
    icon: '🔄',
    color: '#EF4444',
    difficulty: 'HARD',
    estimatedTime: 55,
    prerequisites: ['completing-sentence'],
    tags: ['sentence-transformation', 'active-passive', 'simple-complex-compound', 'degrees'],
    routes: {
      grammarRules: '/grammar-items/hsc/transformation',
      questions: '/board-questions/hsc/transformation',
      practice: '/get-started/transformation'
    }
  },
  {
    id: 'use-of-verbs',
    name: 'Use of Verbs',
    slug: 'use-of-verbs',
    description: 'Master the correct forms and usage of verbs in different contexts',
    level: 'HSC',
    order: 6,
    isActive: true,
    category: 'both',
    icon: '⚡',
    color: '#06B6D4',
    difficulty: 'MEDIUM',
    estimatedTime: 45,
    prerequisites: [],
    tags: ['verb-forms', 'tenses', 'modal-verbs', 'subject-verb-agreement'],
    routes: {
      grammarRules: '/grammar-items/hsc/use-of-verbs',
      questions: '/board-questions/hsc/use-of-verbs',
      practice: '/get-started/use-of-verbs'
    }
  },
  {
    id: 'preposition',
    name: 'Preposition',
    slug: 'preposition',
    description: 'Learn the proper usage of prepositions in various contexts',
    level: 'HSC',
    order: 7,
    isActive: true,
    category: 'both',
    icon: '📍',
    color: '#84CC16',
    difficulty: 'EASY',
    estimatedTime: 30,
    prerequisites: [],
    tags: ['prepositions', 'prepositional-phrases', 'location', 'time', 'direction'],
    routes: {
      grammarRules: '/grammar-items/hsc/preposition',
      questions: '/board-questions/hsc/preposition',
      practice: '/get-started/preposition'
    }
  },
  {
    id: 'punctuation',
    name: 'Punctuation',
    slug: 'punctuation',
    description: 'Master the rules of punctuation and capitalization',
    level: 'HSC',
    order: 8,
    isActive: true,
    category: 'both',
    icon: '❗',
    color: '#F97316',
    difficulty: 'EASY',
    estimatedTime: 25,
    prerequisites: [],
    tags: ['punctuation-marks', 'capitalization', 'comma', 'full-stop', 'quotation'],
    routes: {
      grammarRules: '/grammar-items/hsc/punctuation',
      questions: '/board-questions/hsc/punctuation',
      practice: '/get-started/punctuation'
    }
  },
  {
    id: 'synonym-antonym',
    name: 'Synonym & Antonym',
    slug: 'synonym-antonym',
    description: 'Expand vocabulary through synonyms and antonyms',
    level: 'HSC',
    order: 9,
    isActive: true,
    category: 'both',
    icon: '📚',
    color: '#EC4899',
    difficulty: 'EASY',
    estimatedTime: 35,
    prerequisites: [],
    tags: ['vocabulary', 'synonyms', 'antonyms', 'word-meanings'],
    routes: {
      grammarRules: '/grammar-items/hsc/synonym-antonym',
      questions: '/board-questions/hsc/synonym-antonym',
      practice: '/get-started/synonym-antonym'
    }
  }
];

// SSC Topics Configuration (subset of HSC topics)
export const sscTopics: TopicConfig[] = [
  {
    id: 'preposition',
    name: 'Preposition',
    slug: 'preposition',
    description: 'Learn the basic usage of prepositions',
    level: 'SSC',
    order: 1,
    isActive: true,
    category: 'both',
    icon: '📍',
    color: '#84CC16',
    difficulty: 'EASY',
    estimatedTime: 25,
    prerequisites: [],
    tags: ['prepositions', 'basic-grammar'],
    routes: {
      grammarRules: '/grammar-items/ssc/preposition',
      questions: '/board-questions/ssc/preposition',
      practice: '/get-started/preposition'
    }
  },
  {
    id: 'punctuation',
    name: 'Punctuation',
    slug: 'punctuation',
    description: 'Basic punctuation and capitalization rules',
    level: 'SSC',
    order: 2,
    isActive: true,
    category: 'both',
    icon: '❗',
    color: '#F97316',
    difficulty: 'EASY',
    estimatedTime: 20,
    prerequisites: [],
    tags: ['punctuation-marks', 'capitalization', 'basic-grammar'],
    routes: {
      grammarRules: '/grammar-items/ssc/punctuation',
      questions: '/board-questions/ssc/punctuation',
      practice: '/get-started/punctuation'
    }
  },
  {
    id: 'synonym-antonym',
    name: 'Synonym & Antonym',
    slug: 'synonym-antonym',
    description: 'Basic vocabulary building through synonyms and antonyms',
    level: 'SSC',
    order: 3,
    isActive: true,
    category: 'both',
    icon: '📚',
    color: '#EC4899',
    difficulty: 'EASY',
    estimatedTime: 30,
    prerequisites: [],
    tags: ['vocabulary', 'synonyms', 'antonyms', 'basic-words'],
    routes: {
      grammarRules: '/grammar-items/ssc/synonym-antonym',
      questions: '/board-questions/ssc/synonym-antonym',
      practice: '/get-started/synonym-antonym'
    }
  }
];

// Combined topics configuration
export const allTopics: TopicConfig[] = [...hscTopics, ...sscTopics];

// Helper functions
export const getTopicsByLevel = (level: GrammarLevel): TopicConfig[] => {
  if (level === 'BOTH') {
    return allTopics;
  }
  return allTopics.filter(topic => topic.level === level);
};

export const getTopicBySlug = (slug: string): TopicConfig | undefined => {
  return allTopics.find(topic => topic.slug === slug);
};

export const getActiveTopics = (level?: GrammarLevel): TopicConfig[] => {
  const topics = level ? getTopicsByLevel(level) : allTopics;
  return topics.filter(topic => topic.isActive);
};

export const getTopicsByCategory = (category: TopicConfig['category'], level?: GrammarLevel): TopicConfig[] => {
  const topics = level ? getTopicsByLevel(level) : allTopics;
  return topics.filter(topic => topic.category === category || topic.category === 'both');
};

export const getTopicsByDifficulty = (difficulty: TopicConfig['difficulty'], level?: GrammarLevel): TopicConfig[] => {
  const topics = level ? getTopicsByLevel(level) : allTopics;
  return topics.filter(topic => topic.difficulty === difficulty);
};

export const getTopicsWithPrerequisites = (level?: GrammarLevel): TopicConfig[] => {
  const topics = level ? getTopicsByLevel(level) : allTopics;
  return topics.filter(topic => topic.prerequisites && topic.prerequisites.length > 0);
};

export const getTopicsByTag = (tag: string, level?: GrammarLevel): TopicConfig[] => {
  const topics = level ? getTopicsByLevel(level) : allTopics;
  return topics.filter(topic => topic.tags?.includes(tag));
};

export const getTopicRoute = (slug: string, type: 'grammarRules' | 'questions' | 'practice'): string | undefined => {
  const topic = getTopicBySlug(slug);
  return topic?.routes[type];
};

// Topic statistics
export const topicStats = {
  totalTopics: allTopics.length,
  hscTopics: hscTopics.length,
  sscTopics: sscTopics.length,
  activeTopics: getActiveTopics().length,
  topicsByDifficulty: {
    EASY: getTopicsByDifficulty('EASY').length,
    MEDIUM: getTopicsByDifficulty('MEDIUM').length,
    HARD: getTopicsByDifficulty('HARD').length
  },
  topicsByCategory: {
    'grammar-rules': getTopicsByCategory('grammar-rules').length,
    'questions': getTopicsByCategory('questions').length,
    'both': getTopicsByCategory('both').length
  },
  averageEstimatedTime: Math.round(
    allTopics.reduce((sum, topic) => sum + (topic.estimatedTime || 0), 0) / allTopics.length
  ),
  totalEstimatedTime: allTopics.reduce((sum, topic) => sum + (topic.estimatedTime || 0), 0)
};

// Export default configuration
export const topicConfig = {
  hscTopics,
  sscTopics,
  allTopics,
  stats: topicStats,
  helpers: {
    getTopicsByLevel,
    getTopicBySlug,
    getActiveTopics,
    getTopicsByCategory,
    getTopicsByDifficulty,
    getTopicsWithPrerequisites,
    getTopicsByTag,
    getTopicRoute
  }
};