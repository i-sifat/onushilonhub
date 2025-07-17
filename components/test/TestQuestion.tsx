'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { TestQuestion as TestQuestionType } from '@/lib/testConfig';
import { CheckCircle, XCircle, Clock } from 'lucide-react';

interface TestQuestionProps {
  question: TestQuestionType;
  questionNumber: number;
  totalQuestions: number;
  selectedAnswer?: string;
  onAnswerSelect: (answer: string) => void;
  onNext: () => void;
  onPrevious: () => void;
  showResult?: boolean;
  isLast: boolean;
  isFirst: boolean;
  timeRemaining?: number;
}

export default function TestQuestion({
  question,
  questionNumber,
  totalQuestions,
  selectedAnswer,
  onAnswerSelect,
  onNext,
  onPrevious,
  showResult = false,
  isLast,
  isFirst,
  timeRemaining
}: TestQuestionProps) {
  const [hasAnswered, setHasAnswered] = useState(!!selectedAnswer);

  const handleAnswerSelect = (answer: string) => {
    if (showResult) return; // Don't allow changes if showing results
    
    setHasAnswered(true);
    onAnswerSelect(answer);
  };

  const isCorrect = selectedAnswer === question.correctAnswer;

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return 'bg-green-100 text-green-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'hard': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      {/* Question Header */}
      <Card className="border-sf-text-muted/20">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Badge variant="outline" className="text-sf-button border-sf-button/30">
                Question {questionNumber} of {totalQuestions}
              </Badge>
              <Badge className={getDifficultyColor(question.difficulty)}>
                {question.difficulty.charAt(0).toUpperCase() + question.difficulty.slice(1)}
              </Badge>
            </div>
            {timeRemaining !== undefined && (
              <div className="flex items-center space-x-1 text-sm text-sf-text-muted">
                <Clock className="h-4 w-4" />
                <span>{Math.floor(timeRemaining / 60)}:{(timeRemaining % 60).toString().padStart(2, '0')}</span>
              </div>
            )}
          </div>
        </CardHeader>
      </Card>

      {/* Question Content */}
      <Card className="border-sf-text-muted/20">
        <CardContent className="p-6">
          <CardTitle className="text-xl text-sf-text-bold mb-6 leading-relaxed">
            {question.question}
          </CardTitle>

          {/* Answer Options */}
          {question.options && (
            <div className="space-y-3">
              {question.options.map((option, index) => {
                const isSelected = selectedAnswer === option;
                const isCorrectOption = option === question.correctAnswer;
                
                let buttonClass = 'w-full text-left p-4 border rounded-lg transition-all duration-200 ';
                
                if (showResult) {
                  if (isCorrectOption) {
                    buttonClass += 'border-green-500 bg-green-50 text-green-800';
                  } else if (isSelected && !isCorrectOption) {
                    buttonClass += 'border-red-500 bg-red-50 text-red-800';
                  } else {
                    buttonClass += 'border-sf-text-muted/20 text-sf-text-subtle';
                  }
                } else {
                  if (isSelected) {
                    buttonClass += 'border-sf-button bg-sf-button/10 text-sf-text-bold';
                  } else {
                    buttonClass += 'border-sf-text-muted/20 hover:border-sf-button/50 text-sf-text-subtle hover:bg-sf-button/5';
                  }
                }

                return (
                  <button
                    key={index}
                    onClick={() => handleAnswerSelect(option)}
                    disabled={showResult}
                    className={buttonClass}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="w-6 h-6 rounded-full border-2 flex items-center justify-center text-xs font-bold">
                          {String.fromCharCode(65 + index)}
                        </div>
                        <span>{option}</span>
                      </div>
                      {showResult && (
                        <div>
                          {isCorrectOption && <CheckCircle className="h-5 w-5 text-green-600" />}
                          {isSelected && !isCorrectOption && <XCircle className="h-5 w-5 text-red-600" />}
                        </div>
                      )}
                    </div>
                  </button>
                );
              })}
            </div>
          )}

          {/* Explanation (shown after answering or in review) */}
          {showResult && question.explanation && (
            <div className="mt-6 p-4 bg-sf-highlight/10 border-l-4 border-sf-button rounded-r-lg">
              <h4 className="font-semibold text-sf-text-bold mb-2">Explanation:</h4>
              <p className="text-sf-text-subtle leading-relaxed">
                {question.explanation}
              </p>
            </div>
          )}

          {/* Answer Status */}
          {hasAnswered && !showResult && (
            <div className="mt-4 p-3 bg-sf-button/10 border border-sf-button/30 rounded-lg">
              <p className="text-sf-text-bold text-sm">
                ✓ Answer selected: {selectedAnswer}
              </p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Navigation */}
      <div className="flex justify-between">
        <Button
          onClick={onPrevious}
          disabled={isFirst}
          variant="outline"
          className="border-sf-text-muted/20 text-sf-text-subtle hover:border-sf-button/50"
        >
          Previous
        </Button>
        
        <div className="flex space-x-2">
          {!isLast ? (
            <Button
              onClick={onNext}
              disabled={!hasAnswered && !showResult}
              className="bg-sf-button hover:bg-sf-button/90 text-sf-bg"
            >
              Next Question
            </Button>
          ) : (
            <Button
              onClick={onNext}
              disabled={!hasAnswered && !showResult}
              className="bg-green-600 hover:bg-green-700 text-white"
            >
              Finish Test
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}