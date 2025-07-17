// Test Engine for Question Selection and Session Management
import { TestConfig, TestQuestion, TestSession, TestResult } from './testConfig';

export interface QuestionSelectionOptions {
  difficulty?: 'easy' | 'medium' | 'hard';
  topic?: string;
  level?: 'hsc' | 'ssc';
  questionCount: number;
  randomize?: boolean;
}

export class TestEngine {
  private static instance: TestEngine;
  private questionPool: TestQuestion[] = [];

  private constructor() {
    this.initializeQuestionPool();
  }

  static getInstance(): TestEngine {
    if (!TestEngine.instance) {
      TestEngine.instance = new TestEngine();
    }
    return TestEngine.instance;
  }

  private initializeQuestionPool() {
    // Initialize with sample questions - in a real app, this would come from a database
    this.questionPool = [
      // Modifier questions
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
      },
      {
        id: 'mod-medium-1',
        topic: 'modifier',
        level: 'hsc',
        difficulty: 'medium',
        question: 'Complete with appropriate modifier: "The book ___ on the table belongs to me."',
        options: ['lying', 'lies', 'lay', 'laid'],
        correctAnswer: 'lying',
        explanation: 'Present participle "lying" post-modifies the noun "book".',
        timeLimit: 120
      },
      {
        id: 'mod-hard-1',
        topic: 'modifier',
        level: 'hsc',
        difficulty: 'hard',
        question: 'Choose the correct modifier structure: "The students ___ in the library are preparing for exams."',
        options: ['studied', 'studying', 'to study', 'study'],
        correctAnswer: 'studying',
        explanation: 'Present participle "studying" is used as a post-modifier to describe which students.',
        timeLimit: 150
      },
      // Connectors questions
      {
        id: 'conn-easy-1',
        topic: 'connectors',
        level: 'hsc',
        difficulty: 'easy',
        question: 'Fill in the blank: "He studied hard ___ he could pass the exam."',
        options: ['so that', 'because', 'although', 'unless'],
        correctAnswer: 'so that',
        explanation: 'So that is used to express purpose.',
        timeLimit: 90
      },
      {
        id: 'conn-medium-1',
        topic: 'connectors',
        level: 'hsc',
        difficulty: 'medium',
        question: 'Choose the appropriate connector: "It was raining heavily. ___, we decided to go out."',
        options: ['Therefore', 'However', 'Because', 'So that'],
        correctAnswer: 'However',
        explanation: 'However shows contrast between the rain and the decision to go out.',
        timeLimit: 120
      },
      {
        id: 'conn-hard-1',
        topic: 'connectors',
        level: 'hsc',
        difficulty: 'hard',
        question: 'Complete: "___ he worked hard, he could not achieve his goal."',
        options: ['Although', 'Because', 'So that', 'Therefore'],
        correctAnswer: 'Although',
        explanation: 'Although introduces a contrasting clause showing effort vs. result.',
        timeLimit: 150
      },
      // Completing sentence questions
      {
        id: 'comp-easy-1',
        topic: 'completing-sentence',
        level: 'hsc',
        difficulty: 'easy',
        question: 'Complete: "If I were rich, ___"',
        options: [
          'I will help the poor',
          'I would help the poor', 
          'I helped the poor',
          'I am helping the poor'
        ],
        correctAnswer: 'I would help the poor',
        explanation: 'Second conditional uses would + base verb in the main clause.',
        timeLimit: 90
      },
      {
        id: 'comp-medium-1',
        topic: 'completing-sentence',
        level: 'hsc',
        difficulty: 'medium',
        question: 'Complete: "It is high time ___"',
        options: [
          'we go home',
          'we went home',
          'we will go home',
          'we are going home'
        ],
        correctAnswer: 'we went home',
        explanation: 'After "It is high time", we use past tense.',
        timeLimit: 120
      },
      {
        id: 'comp-hard-1',
        topic: 'completing-sentence',
        level: 'hsc',
        difficulty: 'hard',
        question: 'Complete: "Had I been rich, ___"',
        options: [
          'I would help the poor',
          'I will help the poor', 
          'I would have helped the poor',
          'I am helping the poor'
        ],
        correctAnswer: 'I would have helped the poor',
        explanation: 'Third conditional uses would have + past participle in the main clause.',
        timeLimit: 150
      }
    ];
  }

  selectQuestions(options: QuestionSelectionOptions): TestQuestion[] {
    let filteredQuestions = [...this.questionPool];

    // Filter by criteria
    if (options.difficulty) {
      filteredQuestions = filteredQuestions.filter(q => q.difficulty === options.difficulty);
    }

    if (options.topic) {
      filteredQuestions = filteredQuestions.filter(q => q.topic === options.topic);
    }

    if (options.level) {
      filteredQuestions = filteredQuestions.filter(q => q.level === options.level);
    }

    // Randomize if requested
    if (options.randomize !== false) {
      filteredQuestions = this.shuffleArray(filteredQuestions);
    }

    // Return requested number of questions
    return filteredQuestions.slice(0, options.questionCount);
  }

  private shuffleArray<T>(array: T[]): T[] {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  }

  calculateScore(answers: Record<string, string>, questions: TestQuestion[]): {
    score: number;
    correctAnswers: number;
    totalQuestions: number;
    questionResults: Array<{
      questionId: string;
      userAnswer: string;
      correctAnswer: string;
      isCorrect: boolean;
      timeSpent: number;
    }>;
  } {
    const questionResults = questions.map(question => {
      const userAnswer = answers[question.id] || '';
      const isCorrect = userAnswer === question.correctAnswer;
      
      return {
        questionId: question.id,
        userAnswer,
        correctAnswer: question.correctAnswer,
        isCorrect,
        timeSpent: question.timeLimit || 120 // Default time if not specified
      };
    });

    const correctAnswers = questionResults.filter(result => result.isCorrect).length;
    const totalQuestions = questions.length;
    const score = Math.round((correctAnswers / totalQuestions) * 100);

    return {
      score,
      correctAnswers,
      totalQuestions,
      questionResults
    };
  }

  generateRecommendations(result: TestResult, testConfig: TestConfig): string[] {
    const recommendations: string[] = [];
    const accuracy = (result.correctAnswers / result.totalQuestions) * 100;

    // Performance-based recommendations
    if (accuracy < 50) {
      recommendations.push("Focus on understanding basic grammar rules before attempting more questions.");
      recommendations.push(`Review the ${testConfig.topic} grammar rules thoroughly.`);
      recommendations.push("Practice with easier questions first to build confidence.");
    } else if (accuracy < 70) {
      recommendations.push("Good progress! Focus on areas where you made mistakes.");
      recommendations.push("Practice more questions of similar difficulty level.");
      recommendations.push("Review explanations for incorrect answers carefully.");
    } else if (accuracy < 90) {
      recommendations.push("Excellent work! You're almost there.");
      recommendations.push("Focus on the specific areas where you lost points.");
      recommendations.push("Try harder difficulty levels to challenge yourself.");
    } else {
      recommendations.push("Outstanding performance! You've mastered this topic.");
      recommendations.push("Consider helping others or teaching this topic.");
      recommendations.push("Move on to more advanced topics or different grammar areas.");
    }

    // Time-based recommendations
    const avgTimePerQuestion = result.timeSpent / result.totalQuestions;
    const expectedTime = testConfig.timeLimit * 60 / testConfig.questionCount;
    
    if (avgTimePerQuestion > expectedTime * 1.5) {
      recommendations.push("Work on improving your speed while maintaining accuracy.");
      recommendations.push("Practice time management during tests.");
    } else if (avgTimePerQuestion < expectedTime * 0.5) {
      recommendations.push("Take more time to read questions carefully.");
      recommendations.push("Double-check your answers before submitting.");
    }

    // Topic-specific recommendations
    if (testConfig.topic === 'modifier') {
      recommendations.push("Practice identifying pre-modifiers and post-modifiers in sentences.");
      recommendations.push("Focus on understanding the difference between adjectives and adverbs as modifiers.");
    } else if (testConfig.topic === 'connectors') {
      recommendations.push("Study the meaning and usage of different types of connectors.");
      recommendations.push("Practice connecting ideas logically in sentences.");
    } else if (testConfig.topic === 'completing-sentence') {
      recommendations.push("Focus on understanding conditional sentences and their structures.");
      recommendations.push("Practice identifying the correct tense and form for sentence completion.");
    }

    return recommendations.slice(0, 5); // Return top 5 recommendations
  }

  getPerformanceAnalysis(result: TestResult): {
    strengths: string[];
    weaknesses: string[];
    overallAssessment: string;
  } {
    const accuracy = (result.correctAnswers / result.totalQuestions) * 100;
    const strengths: string[] = [];
    const weaknesses: string[] = [];
    let overallAssessment = '';

    // Analyze performance
    if (accuracy >= 90) {
      overallAssessment = 'Excellent performance! You have a strong grasp of this topic.';
      strengths.push('High accuracy rate');
      strengths.push('Consistent correct answers');
      strengths.push('Strong understanding of grammar rules');
    } else if (accuracy >= 70) {
      overallAssessment = 'Good performance with room for improvement.';
      strengths.push('Above average accuracy');
      strengths.push('Good foundation in grammar');
      weaknesses.push('Some areas need more practice');
    } else if (accuracy >= 50) {
      overallAssessment = 'Fair performance. Focus on strengthening your basics.';
      strengths.push('Basic understanding present');
      weaknesses.push('Need to review grammar rules');
      weaknesses.push('Practice more questions');
    } else {
      overallAssessment = 'Needs significant improvement. Start with basic concepts.';
      weaknesses.push('Low accuracy rate');
      weaknesses.push('Need to study grammar rules thoroughly');
      weaknesses.push('Requires more practice');
    }

    // Time analysis
    const avgTimePerQuestion = result.timeSpent / result.totalQuestions;
    if (avgTimePerQuestion < 60) {
      strengths.push('Good time management');
    } else if (avgTimePerQuestion > 180) {
      weaknesses.push('Need to improve speed');
    }

    return {
      strengths,
      weaknesses,
      overallAssessment
    };
  }
}

export const testEngine = TestEngine.getInstance();