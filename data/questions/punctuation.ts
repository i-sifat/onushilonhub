// Centralized Punctuation Questions Data
// ADD MORE QUESTIONS HERE - just follow the same structure

import { Question, QuestionLevel, QuestionTopicSlug, QuestionBoard, QuestionDifficulty } from '@/types/question.types';

export interface PunctuationQuestion extends Omit<Question, 'topic' | 'level'> {
  topic: 'punctuation';
  level: QuestionLevel;
  passage?: string;
  punctuatedPassage?: string;
  ruleId?: number;
}

export const punctuationQuestions: PunctuationQuestion[] = [
  {
    id: "sample-2024-punctuation",
    year: 2024,
    board: "Sample",
    question: "Use capitals and punctuation marks where necessary in the following text",
    passage: "once upon a time there lived a poor farmer named abu he had three sons they were very lazy one day abu called his sons and said my dear sons i am going to die soon i have hidden a treasure in our land if you can find it you will be rich the sons became very excited after their fathers death they started digging the land they could not find any treasure but the land became very fertile they sowed seeds and got a good harvest then they realized that hard work is the real treasure",
    punctuatedPassage: "Once upon a time, there lived a poor farmer named Abu. He had three sons. They were very lazy. One day, Abu called his sons and said, \"My dear sons, I am going to die soon. I have hidden a treasure in our land. If you can find it, you will be rich.\" The sons became very excited. After their father's death, they started digging the land. They could not find any treasure, but the land became very fertile. They sowed seeds and got a good harvest. Then they realized that hard work is the real treasure.",
    ruleId: 1,
    topic: 'punctuation',
    level: 'HSC',
    difficulty: 'MEDIUM'
  }
  // ADD MORE QUESTIONS HERE - copy from board question papers
  // Just follow the same structure as above
];

// Export metadata for the topic
export const punctuationQuestionsMetadata = {
  topic: 'punctuation' as const,
  slug: 'punctuation' as const,
  level: 'HSC' as QuestionLevel,
  totalQuestions: punctuationQuestions.length,
  lastUpdated: new Date().toISOString(),
  version: '1.0.0',
  yearRange: {
    from: Math.min(...punctuationQuestions.filter(q => q.year).map(q => q.year!)),
    to: Math.max(...punctuationQuestions.filter(q => q.year).map(q => q.year!))
  }
};