// Centralized Narration Questions Data
// ADD MORE QUESTIONS HERE - just follow the same structure

import { Question, QuestionLevel, QuestionTopicSlug, QuestionBoard, QuestionDifficulty } from '@/types/question.types';

export interface NarrationQuestion extends Omit<Question, 'topic' | 'level'> {
  topic: 'narration';
  level: QuestionLevel;
  directSpeech?: string;
  indirectSpeech?: string;
  ruleId?: number;
  type: 'direct-to-indirect' | 'indirect-to-direct';
}

export const narrationQuestions: NarrationQuestion[] = [
  {
    id: "dhaka-2022-narration-1",
    year: 2022,
    board: "Dhaka",
    question: "Change the narration: He said to me, 'I am reading a book.'",
    directSpeech: "He said to me, 'I am reading a book.'",
    indirectSpeech: "He told me that he was reading a book.",
    ruleId: 1,
    type: "direct-to-indirect",
    topic: 'narration',
    level: 'HSC',
    difficulty: 'EASY'
  },
  {
    id: "dhaka-2022-narration-2",
    year: 2022,
    board: "Dhaka",
    question: "Change the narration: The teacher asked the student if he had done his homework.",
    directSpeech: "The teacher said to the student, 'Have you done your homework?'",
    indirectSpeech: "The teacher asked the student if he had done his homework.",
    ruleId: 1,
    type: "indirect-to-direct",
    topic: 'narration',
    level: 'HSC',
    difficulty: 'MEDIUM'
  },
  {
    id: "rajshahi-2022-narration-1",
    year: 2022,
    board: "Rajshahi",
    question: "Change the narration: She said, 'What a beautiful flower it is!'",
    directSpeech: "She said, 'What a beautiful flower it is!'",
    indirectSpeech: "She exclaimed with joy that it was a very beautiful flower.",
    ruleId: 1,
    type: "direct-to-indirect",
    topic: 'narration',
    level: 'HSC',
    difficulty: 'MEDIUM'
  },
  {
    id: "chittagong-2022-narration-1",
    year: 2022,
    board: "Chattogram",
    question: "Change the narration: The mother said to her son, 'Do not tell a lie.'",
    directSpeech: "The mother said to her son, 'Do not tell a lie.'",
    indirectSpeech: "The mother advised her son not to tell a lie.",
    ruleId: 1,
    type: "direct-to-indirect",
    topic: 'narration',
    level: 'HSC',
    difficulty: 'MEDIUM'
  },
  {
    id: "sylhet-2022-narration-1",
    year: 2022,
    board: "Sylhet",
    question: "Change the narration: He wished that he might pass the examination.",
    directSpeech: "He said, 'May I pass the examination.'",
    indirectSpeech: "He wished that he might pass the examination.",
    ruleId: 1,
    type: "indirect-to-direct",
    topic: 'narration',
    level: 'HSC',
    difficulty: 'MEDIUM'
  },
  {
    id: "barisal-2023-narration-1",
    year: 2023,
    board: "Barishal",
    question: "Change the narration: 'Where are you going?' he asked me.",
    directSpeech: "'Where are you going?' he asked me.",
    indirectSpeech: "He asked me where I was going.",
    ruleId: 1,
    type: "direct-to-indirect",
    topic: 'narration',
    level: 'HSC',
    difficulty: 'EASY'
  },
  {
    id: "cumilla-2023-narration-1",
    year: 2023,
    board: "Cumilla",
    question: "Change the narration: The father told his son that honesty was the best policy.",
    directSpeech: "The father said to his son, 'Honesty is the best policy.'",
    indirectSpeech: "The father told his son that honesty was the best policy.",
    ruleId: 6,
    type: "indirect-to-direct",
    topic: 'narration',
    level: 'HSC',
    difficulty: 'EASY'
  },
  {
    id: "mymensingh-2023-narration-1",
    year: 2023,
    board: "Mymensingh",
    question: "Change the narration: 'Let us go for a walk,' he said to me.",
    directSpeech: "'Let us go for a walk,' he said to me.",
    indirectSpeech: "He proposed to me that we should go for a walk.",
    ruleId: 1,
    type: "direct-to-indirect",
    topic: 'narration',
    level: 'HSC',
    difficulty: 'MEDIUM'
  },
  {
    id: "jashore-2023-narration-1",
    year: 2023,
    board: "Jashore",
    question: "Change the narration: The teacher said, 'The sun rises in the east.'",
    directSpeech: "The teacher said, 'The sun rises in the east.'",
    indirectSpeech: "The teacher said that the sun rises in the east.",
    ruleId: 6,
    type: "direct-to-indirect",
    topic: 'narration',
    level: 'HSC',
    difficulty: 'EASY'
  },
  {
    id: "dinajpur-2024-narration-1",
    year: 2024,
    board: "Dinajpur",
    question: "Change the narration: She exclaimed with sorrow that she was undone.",
    directSpeech: "She said, 'Alas! I am undone.'",
    indirectSpeech: "She exclaimed with sorrow that she was undone.",
    ruleId: 1,
    type: "indirect-to-direct",
    topic: 'narration',
    level: 'HSC',
    difficulty: 'MEDIUM'
  }
];

// Export metadata for the topic
export const narrationQuestionsMetadata = {
  topic: 'narration' as const,
  slug: 'narration' as const,
  level: 'HSC' as QuestionLevel,
  totalQuestions: narrationQuestions.length,
  lastUpdated: new Date().toISOString(),
  version: '1.0.0',
  yearRange: {
    from: Math.min(...narrationQuestions.filter(q => q.year).map(q => q.year!)),
    to: Math.max(...narrationQuestions.filter(q => q.year).map(q => q.year!))
  }
};