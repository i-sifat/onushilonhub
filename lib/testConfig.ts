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
    questions: [] // Questions will be selected dynamically by TestEngine
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
    questions: [] // Questions will be selected dynamically by TestEngine
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
    questions: [] // Questions will be selected dynamically by TestEngine
  },
  // Add more test configurations
  {
    id: 'modifier-medium-hsc',
    name: 'HSC Modifier - Medium Level',
    description: 'Intermediate modifier questions for HSC students',
    topic: 'modifier',
    level: 'hsc',
    difficulty: 'medium',
    questionCount: 12,
    timeLimit: 18,
    passingScore: 75,
    questions: []
  },
  {
    id: 'modifier-hard-hsc',
    name: 'HSC Modifier - Hard Level',
    description: 'Advanced modifier questions for HSC students',
    topic: 'modifier',
    level: 'hsc',
    difficulty: 'hard',
    questionCount: 15,
    timeLimit: 25,
    passingScore: 80,
    questions: []
  },
  {
    id: 'connectors-easy-hsc',
    name: 'HSC Connectors - Easy Level',
    description: 'Basic connector questions for HSC students',
    topic: 'connectors',
    level: 'hsc',
    difficulty: 'easy',
    questionCount: 10,
    timeLimit: 15,
    passingScore: 70,
    questions: []
  },
  {
    id: 'connectors-hard-hsc',
    name: 'HSC Connectors - Hard Level',
    description: 'Advanced connector questions for HSC students',
    topic: 'connectors',
    level: 'hsc',
    difficulty: 'hard',
    questionCount: 18,
    timeLimit: 25,
    passingScore: 80,
    questions: []
  },
  {
    id: 'completing-sentence-easy-hsc',
    name: 'HSC Completing Sentence - Easy Level',
    description: 'Basic completing sentence questions for HSC students',
    topic: 'completing-sentence',
    level: 'hsc',
    difficulty: 'easy',
    questionCount: 10,
    timeLimit: 15,
    passingScore: 70,
    questions: []
  },
  {
    id: 'completing-sentence-medium-hsc',
    name: 'HSC Completing Sentence - Medium Level',
    description: 'Intermediate completing sentence questions for HSC students',
    topic: 'completing-sentence',
    level: 'hsc',
    difficulty: 'medium',
    questionCount: 15,
    timeLimit: 20,
    passingScore: 75,
    questions: []
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