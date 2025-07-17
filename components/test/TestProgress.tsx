'use client';

import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { CheckCircle, Circle, XCircle } from 'lucide-react';

interface TestProgressProps {
  currentQuestion: number;
  totalQuestions: number;
  answers: Record<string, string>;
  questions: Array<{ id: string; correctAnswer: string }>;
  showResults?: boolean;
}

export default function TestProgress({
  currentQuestion,
  totalQuestions,
  answers,
  questions,
  showResults = false
}: TestProgressProps) {
  const progressPercentage = (currentQuestion / totalQuestions) * 100;
  const answeredCount = Object.keys(answers).length;

  const getQuestionStatus = (questionIndex: number) => {
    const question = questions[questionIndex];
    const userAnswer = answers[question.id];
    
    if (!userAnswer) return 'unanswered';
    if (!showResults) return 'answered';
    
    return userAnswer === question.correctAnswer ? 'correct' : 'incorrect';
  };

  const getStatusIcon = (status: string, isCurrent: boolean) => {
    const size = isCurrent ? 'h-6 w-6' : 'h-4 w-4';
    
    switch (status) {
      case 'correct':
        return <CheckCircle className={`${size} text-green-600`} />;
      case 'incorrect':
        return <XCircle className={`${size} text-red-600`} />;
      case 'answered':
        return <CheckCircle className={`${size} text-sf-button`} />;
      default:
        return <Circle className={`${size} text-sf-text-muted`} />;
    }
  };

  return (
    <Card className="border-sf-text-muted/20">
      <CardContent className="p-4">
        <div className="space-y-4">
          {/* Progress Header */}
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-sf-text-bold">
              Test Progress
            </h3>
            <Badge variant="outline" className="text-sf-button border-sf-button/30">
              {currentQuestion} / {totalQuestions}
            </Badge>
          </div>

          {/* Progress Bar */}
          <div className="space-y-2">
            <Progress value={progressPercentage} className="h-2" />
            <div className="flex justify-between text-xs text-sf-text-muted">
              <span>Progress: {Math.round(progressPercentage)}%</span>
              <span>Answered: {answeredCount}/{totalQuestions}</span>
            </div>
          </div>

          {/* Question Grid */}
          <div className="grid grid-cols-5 gap-2">
            {questions.map((question, index) => {
              const questionNumber = index + 1;
              const isCurrent = questionNumber === currentQuestion;
              const status = getQuestionStatus(index);
              
              return (
                <div
                  key={question.id}
                  className={`
                    flex items-center justify-center p-2 rounded-lg border transition-all duration-200
                    ${isCurrent 
                      ? 'border-sf-button bg-sf-button/10 scale-110' 
                      : 'border-sf-text-muted/20'
                    }
                  `}
                >
                  <div className="flex flex-col items-center space-y-1">
                    {getStatusIcon(status, isCurrent)}
                    <span className={`text-xs font-medium ${
                      isCurrent ? 'text-sf-button' : 'text-sf-text-muted'
                    }`}>
                      {questionNumber}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Legend */}
          <div className="flex flex-wrap gap-3 text-xs">
            <div className="flex items-center space-x-1">
              <Circle className="h-3 w-3 text-sf-text-muted" />
              <span className="text-sf-text-muted">Not Answered</span>
            </div>
            <div className="flex items-center space-x-1">
              <CheckCircle className="h-3 w-3 text-sf-button" />
              <span className="text-sf-text-muted">Answered</span>
            </div>
            {showResults && (
              <>
                <div className="flex items-center space-x-1">
                  <CheckCircle className="h-3 w-3 text-green-600" />
                  <span className="text-sf-text-muted">Correct</span>
                </div>
                <div className="flex items-center space-x-1">
                  <XCircle className="h-3 w-3 text-red-600" />
                  <span className="text-sf-text-muted">Incorrect</span>
                </div>
              </>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}