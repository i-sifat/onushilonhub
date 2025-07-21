// Centralized Synonym and Antonym Questions Data
// ADD MORE QUESTIONS HERE - just follow the same structure

import { Question, QuestionLevel, QuestionTopicSlug, QuestionBoard, QuestionDifficulty } from '../../types/question.types';

export interface SynonymAntonymQuestion extends Omit<Question, 'topic' | 'level'> {
  topic: 'synonym-antonym';
  level: QuestionLevel;
  words?: WordPair[];
  ruleId?: number;
}

export interface WordPair {
  word: string;
  synonym?: string;
  antonym?: string;
  ruleId?: number;
}

export const synonymAntonymQuestions: SynonymAntonymQuestion[] = [
  {
    id: "sample-2024-synonym-antonym",
    year: 2024,
    board: "Sample",
    question: "Find synonyms and antonyms of the following words",
    words: [
      { word: "Beautiful", synonym: "Pretty, Lovely, Attractive", antonym: "Ugly, Hideous", ruleId: 1 },
      { word: "Happy", synonym: "Joyful, Cheerful, Glad", antonym: "Sad, Unhappy, Miserable", ruleId: 1 },
      { word: "Big", synonym: "Large, Huge, Enormous", antonym: "Small, Tiny, Little", ruleId: 2 },
      { word: "Good", synonym: "Excellent, Fine, Great", antonym: "Bad, Poor, Terrible", ruleId: 1 },
      { word: "Fast", synonym: "Quick, Rapid, Swift", antonym: "Slow, Sluggish", ruleId: 2 }
    ],
    topic: 'synonym-antonym',
    level: 'HSC',
    difficulty: 'EASY'
  }
  // ADD MORE QUESTIONS HERE - copy from board question papers
  // Just follow the same structure as above
];

// Export metadata for the topic
export const synonymAntonymQuestionsMetadata = {
  topic: 'synonym-antonym' as const,
  slug: 'synonym-antonym' as const,
  level: 'HSC' as QuestionLevel,
  totalQuestions: synonymAntonymQuestions.length,
  lastUpdated: new Date().toISOString(),
  version: '1.0.0',
  yearRange: {
    from: Math.min(...synonymAntonymQuestions.filter(q => q.year).map(q => q.year!)),
    to: Math.max(...synonymAntonymQuestions.filter(q => q.year).map(q => q.year!))
  }
};