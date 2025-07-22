import { LevelData } from '@/components/common/LevelSelectionCard';

export const GET_STARTED_LEVELS: LevelData[] = [
  {
    id: 'hsc',
    name: 'HSC (Higher Secondary Certificate)',
    description: 'Advanced grammar topics for HSC students with comprehensive rules, examples, and board questions.',
    features: [
      'Advanced grammar concepts',
      'Detailed rule explanations',
      'Real board questions',
      'Topic-wise organization'
    ],
    stats: {
      topics: '12+',
      rules: '200+',
      questions: '3000+'
    },
    available: true
  },
  {
    id: 'ssc',
    name: 'SSC (Secondary School Certificate)',
    description: 'Essential grammar topics for SSC students with clear explanations and practical examples.',
    features: [
      'Fundamental grammar rules',
      'Clear explanations',
      'Board questions',
      'Easy-to-understand format'
    ],
    stats: {
      topics: '8+',
      rules: '150+',
      questions: '2000+'
    },
    available: false
  }
];

export const GRAMMAR_ITEMS_LEVELS: LevelData[] = [
  {
    id: 'hsc',
    name: 'HSC (Higher Secondary Certificate)',
    description: 'Comprehensive HSC grammar items with detailed rules, examples, and explanations for advanced English grammar concepts.',
    features: [
      'Advanced grammar concepts',
      'Detailed rule explanations',
      'Comprehensive examples',
      'Topic-wise organization'
    ],
    stats: {
      topics: '12+',
      rules: '200+',
      examples: '500+'
    },
    available: true
  },
  {
    id: 'ssc',
    name: 'SSC (Secondary School Certificate)',
    description: 'Essential SSC grammar items covering fundamental English grammar rules with clear explanations and practical examples.',
    features: [
      'Fundamental grammar rules',
      'Clear explanations',
      'Practical examples',
      'Easy-to-understand format'
    ],
    stats: {
      topics: '8+',
      rules: '150+',
      examples: '300+'
    },
    available: false
  }
];

export const BOARD_QUESTIONS_LEVELS: LevelData[] = [
  {
    id: 'hsc',
    name: 'HSC (Higher Secondary Certificate)',
    description: 'Access comprehensive HSC board questions from all major boards across Bangladesh. Filter by year, board, and grammar topic.',
    features: [
      'Questions from 2016-2025',
      'All major boards included',
      'Advanced filtering options',
      'Topic-wise organization'
    ],
    stats: {
      questions: '3000+',
      boards: '8',
      years: '10'
    },
    available: true
  },
  {
    id: 'ssc',
    name: 'SSC (Secondary School Certificate)',
    description: 'Comprehensive SSC board questions collection with smart filtering and search capabilities for effective preparation.',
    features: [
      'Complete question database',
      'Board-wise categorization',
      'Year-wise filtering',
      'Grammar topic sorting'
    ],
    stats: {
      questions: '2000+',
      boards: '8',
      years: '10'
    },
    available: false
  }
];