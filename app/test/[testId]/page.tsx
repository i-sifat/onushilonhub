'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useParams } from 'next/navigation';
import ProtectedRoute from '@/components/auth/ProtectedRoute';
import TestQuestion from '@/components/test/TestQuestion';
import TestTimer from '@/components/test/TestTimer';
import TestProgress from '@/components/test/TestProgress';
import TestResults from '@/components/test/TestResults';
import { useAuth } from '@/hooks/useAuth';
import { getTestConfigById, TestSession, TestResult } from '@/lib/testConfig';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';
import { Play, Home, AlertTriangle } from 'lucide-react';

function TestSessionContent() {
  const router = useRouter();
  const params = useParams();
  const { user } = useAuth();
  const testId = params.testId as string;

  const [testConfig, setTestConfig] = useState(() => getTestConfigById(testId));
  const [session, setSession] = useState<TestSession | null>(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [testResult, setTestResult] = useState<TestResult | null>(null);
  const [showResults, setShowResults] = useState(false);
  const [showReview, setShowReview] = useState(false);

  useEffect(() => {
    if (!testConfig) {
      router.push('/test');
      return;
    }

    // Initialize test session
    if (user && !session) {
      const newSession: TestSession = {
        id: `session-${Date.now()}`,
        userId: user.id,
        testConfigId: testId,
        startTime: new Date(),
        currentQuestionIndex: 0,
        answers: {},
        timeRemaining: testConfig.timeLimit * 60,
        status: 'not_started'
      };
      setSession(newSession);
    }
  }, [testConfig, user, session, testId, router]);

  const handleStartTest = () => {
    if (session) {
      setSession({
        ...session,
        status: 'in_progress',
        startTime: new Date()
      });
    }
  };

  const handleAnswerSelect = (answer: string) => {
    if (!testConfig || showResults) return;

    const currentQuestion = testConfig.questions[currentQuestionIndex];
    const newAnswers = {
      ...answers,
      [currentQuestion.id]: answer
    };
    setAnswers(newAnswers);

    if (session) {
      setSession({
        ...session,
        answers: newAnswers
      });
    }
  };

  const handleNextQuestion = () => {
    if (!testConfig) return;

    if (currentQuestionIndex < testConfig.questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    } else {
      // Finish test
      finishTest();
    }
  };

  const handlePreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prev => prev - 1);
    }
  };

  const finishTest = () => {
    if (!testConfig || !session || !user) return;

    // Calculate results
    let correctAnswers = 0;
    const questionResults = testConfig.questions.map(question => {
      const userAnswer = answers[question.id] || '';
      const isCorrect = userAnswer === question.correctAnswer;
      if (isCorrect) correctAnswers++;

      return {
        questionId: question.id,
        userAnswer,
        correctAnswer: question.correctAnswer,
        isCorrect,
        timeSpent: 60 // Default time spent per question
      };
    });

    const score = Math.round((correctAnswers / testConfig.questions.length) * 100);
    const passed = score >= testConfig.passingScore;
    const timeSpent = (testConfig.timeLimit * 60) - (session.timeRemaining || 0);

    const result: TestResult = {
      id: `result-${Date.now()}`,
      sessionId: session.id,
      userId: user.id,
      testConfigId: testConfig.id,
      score,
      totalQuestions: testConfig.questions.length,
      correctAnswers,
      timeSpent,
      passed,
      completedAt: new Date(),
      answers,
      questionResults
    };

    setTestResult(result);
    setShowResults(true);
    
    // Update session
    setSession({
      ...session,
      status: 'completed',
      endTime: new Date(),
      score,
      passed
    });
  };

  const handleTimeUp = () => {
    finishTest();
  };

  const handleRetakeTest = () => {
    setSession(null);
    setCurrentQuestionIndex(0);
    setAnswers({});
    setTestResult(null);
    setShowResults(false);
    setShowReview(false);
  };

  const handleGoHome = () => {
    router.push('/test');
  };

  const handleReviewAnswers = () => {
    setShowReview(true);
    setCurrentQuestionIndex(0);
  };

  const handleExitTest = () => {
    router.push('/test');
  };

  if (!testConfig) {
    return (
      <div className="min-h-screen bg-sf-bg flex items-center justify-center">
        <Card className="border-sf-text-muted/20">
          <CardContent className="p-8 text-center">
            <AlertTriangle className="h-12 w-12 text-red-500 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-sf-text-bold mb-2">Test Not Found</h3>
            <p className="text-sf-text-subtle mb-4">
              The requested test could not be found.
            </p>
            <Button onClick={() => router.push('/test')} className="bg-sf-button hover:bg-sf-button/90 text-sf-bg">
              <Home className="h-4 w-4 mr-2" />
              Back to Tests
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  // Show results page
  if (showResults && testResult && !showReview) {
    return (
      <div className="min-h-screen bg-sf-bg pt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <TestResults
            result={testResult}
            onRetakeTest={handleRetakeTest}
            onGoHome={handleGoHome}
            onReviewAnswers={handleReviewAnswers}
          />
        </div>
      </div>
    );
  }

  // Show test start screen
  if (!session || session.status === 'not_started') {
    return (
      <div className="min-h-screen bg-sf-bg pt-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <Card className="border-sf-text-muted/20">
            <CardContent className="p-8 text-center">
              <div className="flex justify-center mb-6">
                <div className="p-4 bg-sf-button/20 rounded-full">
                  <Play className="h-12 w-12 text-sf-button" />
                </div>
              </div>
              
              <h1 className="text-3xl font-bold text-sf-text-bold mb-4">
                {testConfig.name}
              </h1>
              
              <p className="text-sf-text-subtle mb-8 max-w-2xl mx-auto">
                {testConfig.description}
              </p>

              <div className="grid md:grid-cols-3 gap-6 mb-8">
                <div className="text-center">
                  <div className="text-2xl font-bold text-sf-button mb-1">
                    {testConfig.questionCount}
                  </div>
                  <p className="text-sf-text-muted text-sm">Questions</p>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-sf-button mb-1">
                    {testConfig.timeLimit}m
                  </div>
                  <p className="text-sf-text-muted text-sm">Time Limit</p>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-sf-button mb-1">
                    {testConfig.passingScore}%
                  </div>
                  <p className="text-sf-text-muted text-sm">Passing Score</p>
                </div>
              </div>

              <div className="space-y-4">
                <Button
                  onClick={handleStartTest}
                  className="bg-sf-button hover:bg-sf-button/90 text-sf-bg px-8 py-3 text-lg"
                >
                  <Play className="h-5 w-5 mr-2" />
                  Start Test
                </Button>
                
                <div>
                  <Button
                    onClick={handleGoHome}
                    variant="outline"
                    className="border-sf-text-muted/20 text-sf-text-subtle hover:border-sf-button/50"
                  >
                    Back to Test Selection
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  const currentQuestion = testConfig.questions[currentQuestionIndex];
  const isTestActive = session.status === 'in_progress' && !showResults;

  return (
    <div className="min-h-screen bg-sf-bg pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Left Sidebar - Timer and Progress */}
          <div className="lg:col-span-1 space-y-6">
            {/* Exit Test Button */}
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button 
                  variant="outline" 
                  className="w-full border-red-300 text-red-600 hover:bg-red-50"
                >
                  Exit Test
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Exit Test?</AlertDialogTitle>
                  <AlertDialogDescription>
                    Are you sure you want to exit the test? Your progress will be lost.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction onClick={handleExitTest}>
                    Exit Test
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>

            {/* Timer */}
            <TestTimer
              totalTimeMinutes={testConfig.timeLimit}
              onTimeUp={handleTimeUp}
              isActive={isTestActive}
            />

            {/* Progress */}
            <TestProgress
              currentQuestion={currentQuestionIndex + 1}
              totalQuestions={testConfig.questions.length}
              answers={answers}
              questions={testConfig.questions}
              showResults={showReview}
            />
          </div>

          {/* Main Content - Question */}
          <div className="lg:col-span-3">
            <TestQuestion
              question={currentQuestion}
              questionNumber={currentQuestionIndex + 1}
              totalQuestions={testConfig.questions.length}
              selectedAnswer={answers[currentQuestion.id]}
              onAnswerSelect={handleAnswerSelect}
              onNext={handleNextQuestion}
              onPrevious={handlePreviousQuestion}
              showResult={showReview}
              isLast={currentQuestionIndex === testConfig.questions.length - 1}
              isFirst={currentQuestionIndex === 0}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default function TestSessionPage() {
  return (
    <ProtectedRoute>
      <TestSessionContent />
    </ProtectedRoute>
  );
}