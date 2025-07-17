// Test Configuration System
export interface TestQuestion {
  id: string;
  topic: string;
  level: 'hsc' | 'ssc';
  difficulty: 'easy' | 'medium' | 'hard';
  question: string;
  options?: string[];
  correctAnswer: string;
  explanation?: string;
  timeLimit?: number; // in seconds
}

export interface TestConfig {
  id: string;
  name: string;
  description: string;
  topic: string;
  level: 'hsc' | 'ssc';
  difficulty: 'easy' | 'medium' | 'hard';
  questionCount: number;
  timeLimit: number; // in minutes
  passingScore: number; // percentage
  questions: TestQuestion[];
}

export interface TestSession {
  id: string;
  userId: string;
  testConfigId: string;
  startTime: Date;
  endTime?: Date;
  currentQuestionIndex: number;
  answers: Record<string, string>;
  score?: number;
  passed?: boolean;
  timeRemaining: number; // in seconds
  status: 'not_started' | 'in_progress' | 'completed' | 'abandoned';
}

export interface TestResult {
  id: string;
  sessionId: string;
  userId: string;
  testConfigId: string;
  score: number;
  totalQuestions: number;
  correctAnswers: number;
  timeSpent: number; // in seconds
  passed: boolean;
  completedAt: Date;
  answers: Record<string, string>;
  questionResults: {
    questionId: string;
    userAnswer: string;
    correctAnswer: string;
    isCorrect: boolean;
    timeSpent: number;
  }[];
}

// Predefined test configurations
export const testConfigs: TestConfig[] = [
  {
    id: 'modifier-easy-hsc',
    name: 'HSC Modifier - Easy Level',
    description: 'Basic modifier questions for HSC students',
    topic: 'modifier',
    level: 'hsc',
    difficulty: 'easy',
    questionCount: 10,
    timeLimit: 15, // 15 minutes
    passingScore: 70,
    questions: [
      {
        id: 'mod-easy-1',
        topic: 'modifier',
        level: 'hsc',
        difficulty: 'easy',
        question: 'Choose the correct pre-modifier: "She is a ___ student."',
        options: ['brilliant', 'brilliantly', 'brilliance', 'brillianted'],
        correctAnswer: 'brilliant',
        explanation: 'Adjectives are used as pre-modifiers before nouns.',
        timeLimit: 90
      },
      {
        id: 'mod-easy-2',
        topic: 'modifier',
        level: 'hsc',
        difficulty: 'easy',
        question: 'Identify the post-modifier: "The man walking slowly is my father."',
        options: ['The man', 'walking slowly', 'is my father', 'slowly'],
        correctAnswer: 'walking slowly',
        explanation: 'Present participle phrases can post-modify nouns.',
        timeLimit: 90
      }
    ]
  },
  {
    id: 'connectors-medium-hsc',
    name: 'HSC Connectors - Medium Level',
    description: 'Intermediate connector questions for HSC students',
    topic: 'connectors',
    level: 'hsc',
    difficulty: 'medium',
    questionCount: 15,
    timeLimit: 20,
    passingScore: 75,
    questions: [
      {
        id: 'conn-med-1',
        topic: 'connectors',
        level: 'hsc',
        difficulty: 'medium',
        question: 'Fill in the blank: "He studied hard ___ he could pass the exam."',
        options: ['so that', 'because', 'although', 'unless'],
        correctAnswer: 'so that',
        explanation: 'So that is used to express purpose.',
        timeLimit: 120
      }
    ]
  },
  {
    id: 'completing-sentence-hard-hsc',
    name: 'HSC Completing Sentence - Hard Level',
    description: 'Advanced completing sentence questions for HSC students',
    topic: 'completing-sentence',
    level: 'hsc',
    difficulty: 'hard',
    questionCount: 20,
    timeLimit: 30,
    passingScore: 80,
    questions: [
      {
        id: 'comp-hard-1',
        topic: 'completing-sentence',
        level: 'hsc',
        difficulty: 'hard',
        question: 'Complete: "Had I been rich, ___"',
        options: [
          'I would help the poor',
          'I will help the poor', 
          'I helped the poor',
          'I am helping the poor'
        ],
        correctAnswer: 'I would help the poor',
        explanation: 'Third conditional uses would have + past participle in the main clause.',
        timeLimit: 150
      }
    ]
  }
];

// Difficulty settings
export const difficultySettings = {
  easy: {
    name: 'Easy',
    description: 'Basic questions for beginners',
    color: 'green',
    timeMultiplier: 1.5,
    passingScore: 60
  },
  medium: {
    name: 'Medium', 
    description: 'Intermediate questions for practice',
    color: 'yellow',
    timeMultiplier: 1.0,
    passingScore: 70
  },
  hard: {
    name: 'Hard',
    description: 'Advanced questions for mastery',
    color: 'red',
    timeMultiplier: 0.8,
    passingScore: 80
  }
};

// Helper functions
export const getTestConfigById = (id: string): TestConfig | undefined => {
  return testConfigs.find(config => config.id === id);
};

export const getTestConfigsByTopic = (topic: string): TestConfig[] => {
  return testConfigs.filter(config => config.topic === topic);
};

export const getTestConfigsByLevel = (level: 'hsc' | 'ssc'): TestConfig[] => {
  return testConfigs.filter(config => config.level === level);
};

export const getTestConfigsByDifficulty = (difficulty: 'easy' | 'medium' | 'hard'): TestConfig[] => {
  return testConfigs.filter(config => config.difficulty === difficulty);
};