'use client';

import { useState, useEffect, useCallback } from 'react';
import { TestConfig, TestSession, TestResult } from '@/lib/testConfig';
import { testEngine } from '@/lib/testEngine';
import { testHistory } from '@/lib/testHistory';
import { useAuth } from '@/hooks/useAuth';
import { useProgress } from '@/hooks/useProgress';

interface TestSessionManagerProps {
  testConfig: TestConfig;
  onSessionComplete: (result: TestResult) => void;
  onSessionExit: () => void;
  children: (sessionData: {
    session: TestSession;
    currentQuestion: any;
    currentQuestionIndex: number;
    answers: Record<string, string>;
    timeRemaining: number;
    handleAnswerSelect: (answer: string) => void;
    handleNextQuestion: () => void;
    handlePreviousQuestion: () => void;
    handleSubmitTest: () => void;
    canGoNext: boolean;
    canGoPrevious: boolean;
    isLastQuestion: boolean;
  }) => React.ReactNode;
}

export default function TestSessionManager({
  testConfig,
  onSessionComplete,
  onSessionExit,
  children
}: TestSessionManagerProps) {
  const { user } = useAuth();
  const { recordQuestionAttempt } = useProgress();
  
  const [session, setSession] = useState<TestSession | null>(null);
  const [questions, setQuestions] = useState<any[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [timeRemaining, setTimeRemaining] = useState(0);
  const [questionStartTime, setQuestionStartTime] = useState<number>(Date.now());

  // Initialize session
  useEffect(() => {
    if (!user || session) return;

    // Select questions using test engine
    const selectedQuestions = testEngine.selectQuestions({
      difficulty: testConfig.difficulty,
      topic: testConfig.topic,
      level: testConfig.level,
      questionCount: testConfig.questionCount,
      randomize: true
    });

    const newSession: TestSession = {
      id: `session-${Date.now()}`,
      userId: user.id,
      testConfigId: testConfig.id,
      startTime: new Date(),
      currentQuestionIndex: 0,
      answers: {},
      timeRemaining: testConfig.timeLimit * 60,
      status: 'in_progress'
    };

    setSession(newSession);
    setQuestions(selectedQuestions);
    setTimeRemaining(testConfig.timeLimit * 60);
    setQuestionStartTime(Date.now());
  }, [user, testConfig, session]);

  // Timer effect
  useEffect(() => {
    if (!session || session.status !== 'in_progress') return;

    const timer = setInterval(() => {
      setTimeRemaining(prev => {
        if (prev <= 1) {
          handleSubmitTest();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [session]);

  const handleAnswerSelect = useCallback((answer: string) => {
    if (!session || !questions[currentQuestionIndex]) return;

    const currentQuestion = questions[currentQuestionIndex];
    const newAnswers = {
      ...answers,
      [currentQuestion.id]: answer
    };

    setAnswers(newAnswers);
    
    // Update session
    setSession(prev => prev ? {
      ...prev,
      answers: newAnswers
    } : null);

    // Record the attempt for progress tracking
    const timeSpent = Math.floor((Date.now() - questionStartTime) / 1000);
    const isCorrect = answer === currentQuestion.correctAnswer;
    
    recordQuestionAttempt(
      currentQuestion.id,
      testConfig.topic,
      testConfig.level,
      isCorrect,
      timeSpent
    );
  }, [session, questions, currentQuestionIndex, answers, questionStartTime, testConfig, recordQuestionAttempt]);

  const handleNextQuestion = useCallback(() => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
      setQuestionStartTime(Date.now());
    }
  }, [currentQuestionIndex, questions.length]);

  const handlePreviousQuestion = useCallback(() => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prev => prev - 1);
      setQuestionStartTime(Date.now());
    }
  }, [currentQuestionIndex]);

  const handleSubmitTest = useCallback(async () => {
    if (!session || !user) return;

    // Calculate results
    const scoreData = testEngine.calculateScore(answers, questions);
    const passed = scoreData.score >= testConfig.passingScore;
    const totalTimeSpent = (testConfig.timeLimit * 60) - timeRemaining;

    const result: TestResult = {
      id: `result-${Date.now()}`,
      sessionId: session.id,
      userId: user.id,
      testConfigId: testConfig.id,
      score: scoreData.score,
      totalQuestions: scoreData.totalQuestions,
      correctAnswers: scoreData.correctAnswers,
      timeSpent: totalTimeSpent,
      passed,
      completedAt: new Date(),
      answers,
      questionResults: scoreData.questionResults
    };

    // Save to test history
    await testHistory.saveTestResult(
      result,
      testConfig.id,
      testConfig.name,
      testConfig.topic,
      testConfig.level,
      testConfig.difficulty
    );

    // Update session status
    setSession(prev => prev ? {
      ...prev,
      status: 'completed',
      endTime: new Date(),
      score: scoreData.score,
      passed
    } : null);

    onSessionComplete(result);
  }, [session, user, answers, questions, testConfig, timeRemaining, onSessionComplete]);

  if (!session || questions.length === 0) {
    return <div>Loading test session...</div>;
  }

  const currentQuestion = questions[currentQuestionIndex];
  const canGoNext = currentQuestionIndex < questions.length - 1;
  const canGoPrevious = currentQuestionIndex > 0;
  const isLastQuestion = currentQuestionIndex === questions.length - 1;

  return (
    <>
      {children({
        session,
        currentQuestion,
        currentQuestionIndex,
        answers,
        timeRemaining,
        handleAnswerSelect,
        handleNextQuestion,
        handlePreviousQuestion,
        handleSubmitTest,
        canGoNext,
        canGoPrevious,
        isLastQuestion
      })}
    </>
  );
}