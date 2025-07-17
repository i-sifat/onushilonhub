'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { TestResult } from '@/lib/testConfig';
import { Trophy, Target, Clock, CheckCircle, XCircle, RotateCcw, Home } from 'lucide-react';

interface TestResultsProps {
  result: TestResult;
  onRetakeTest: () => void;
  onGoHome: () => void;
  onReviewAnswers: () => void;
}

export default function TestResults({
  result,
  onRetakeTest,
  onGoHome,
  onReviewAnswers
}: TestResultsProps) {
  const passed = result.passed;
  const accuracy = (result.correctAnswers / result.totalQuestions) * 100;
  const timeSpentMinutes = Math.floor(result.timeSpent / 60);
  const timeSpentSeconds = result.timeSpent % 60;

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-600';
    if (score >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getScoreBadgeColor = (passed: boolean) => {
    return passed 
      ? 'bg-green-100 text-green-800 border-green-200'
      : 'bg-red-100 text-red-800 border-red-200';
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Results Header */}
      <Card className={`border-2 ${passed ? 'border-green-200 bg-green-50/10' : 'border-red-200 bg-red-50/10'}`}>
        <CardHeader className="text-center pb-4">
          <div className="flex justify-center mb-4">
            {passed ? (
              <div className="p-4 bg-green-100 rounded-full">
                <Trophy className="h-12 w-12 text-green-600" />
              </div>
            ) : (
              <div className="p-4 bg-red-100 rounded-full">
                <XCircle className="h-12 w-12 text-red-600" />
              </div>
            )}
          </div>
          
          <CardTitle className="text-3xl font-bold text-sf-text-bold mb-2">
            {passed ? 'Congratulations!' : 'Keep Practicing!'}
          </CardTitle>
          
          <p className="text-sf-text-subtle text-lg">
            {passed 
              ? 'You have successfully passed the test!' 
              : 'You can retake the test to improve your score.'
            }
          </p>
          
          <div className="flex justify-center mt-4">
            <Badge className={getScoreBadgeColor(passed)}>
              {passed ? 'PASSED' : 'FAILED'}
            </Badge>
          </div>
        </CardHeader>
      </Card>

      {/* Score Breakdown */}
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="border-sf-text-muted/20">
          <CardContent className="p-6 text-center">
            <div className="flex justify-center mb-3">
              <Target className="h-8 w-8 text-sf-button" />
            </div>
            <div className={`text-3xl font-bold mb-1 ${getScoreColor(result.score)}`}>
              {result.score}%
            </div>
            <p className="text-sf-text-muted text-sm">Final Score</p>
          </CardContent>
        </Card>

        <Card className="border-sf-text-muted/20">
          <CardContent className="p-6 text-center">
            <div className="flex justify-center mb-3">
              <CheckCircle className="h-8 w-8 text-green-600" />
            </div>
            <div className="text-3xl font-bold text-sf-text-bold mb-1">
              {result.correctAnswers}
            </div>
            <p className="text-sf-text-muted text-sm">Correct Answers</p>
          </CardContent>
        </Card>

        <Card className="border-sf-text-muted/20">
          <CardContent className="p-6 text-center">
            <div className="flex justify-center mb-3">
              <XCircle className="h-8 w-8 text-red-600" />
            </div>
            <div className="text-3xl font-bold text-sf-text-bold mb-1">
              {result.totalQuestions - result.correctAnswers}
            </div>
            <p className="text-sf-text-muted text-sm">Incorrect Answers</p>
          </CardContent>
        </Card>

        <Card className="border-sf-text-muted/20">
          <CardContent className="p-6 text-center">
            <div className="flex justify-center mb-3">
              <Clock className="h-8 w-8 text-sf-button" />
            </div>
            <div className="text-3xl font-bold text-sf-text-bold mb-1">
              {timeSpentMinutes}:{timeSpentSeconds.toString().padStart(2, '0')}
            </div>
            <p className="text-sf-text-muted text-sm">Time Spent</p>
          </CardContent>
        </Card>
      </div>

      {/* Detailed Analysis */}
      <Card className="border-sf-text-muted/20">
        <CardHeader>
          <CardTitle className="text-xl text-sf-text-bold">Performance Analysis</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold text-sf-text-bold mb-3">Question Breakdown</h4>
              <div className="space-y-2">
                {result.questionResults.slice(0, 5).map((qResult, index) => (
                  <div key={index} className="flex items-center justify-between p-2 rounded border border-sf-text-muted/20">
                    <span className="text-sm text-sf-text-subtle">Question {index + 1}</span>
                    <div className="flex items-center space-x-2">
                      {qResult.isCorrect ? (
                        <CheckCircle className="h-4 w-4 text-green-600" />
                      ) : (
                        <XCircle className="h-4 w-4 text-red-600" />
                      )}
                      <span className="text-xs text-sf-text-muted">
                        {Math.floor(qResult.timeSpent / 60)}:{(qResult.timeSpent % 60).toString().padStart(2, '0')}
                      </span>
                    </div>
                  </div>
                ))}
                {result.questionResults.length > 5 && (
                  <p className="text-xs text-sf-text-muted text-center">
                    ... and {result.questionResults.length - 5} more questions
                  </p>
                )}
              </div>
            </div>

            <div>
              <h4 className="font-semibold text-sf-text-bold mb-3">Performance Insights</h4>
              <div className="space-y-3">
                <div className="p-3 bg-sf-highlight/10 rounded-lg">
                  <p className="text-sm text-sf-text-bold">Accuracy Rate</p>
                  <p className="text-xs text-sf-text-subtle">
                    You answered {accuracy.toFixed(1)}% of questions correctly
                  </p>
                </div>
                
                <div className="p-3 bg-sf-highlight/10 rounded-lg">
                  <p className="text-sm text-sf-text-bold">Average Time per Question</p>
                  <p className="text-xs text-sf-text-subtle">
                    {Math.floor(result.timeSpent / result.totalQuestions / 60)}:
                    {(Math.floor(result.timeSpent / result.totalQuestions) % 60).toString().padStart(2, '0')} per question
                  </p>
                </div>

                {!passed && (
                  <div className="p-3 bg-yellow-100/20 border border-yellow-300/30 rounded-lg">
                    <p className="text-sm text-yellow-700 font-medium">💡 Tip</p>
                    <p className="text-xs text-yellow-600">
                      Review the grammar rules and practice more questions to improve your score.
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <Button
          onClick={onReviewAnswers}
          variant="outline"
          className="border-sf-button text-sf-button hover:bg-sf-button/10"
        >
          Review Answers
        </Button>
        
        <Button
          onClick={onRetakeTest}
          className="bg-sf-button hover:bg-sf-button/90 text-sf-bg"
        >
          <RotateCcw className="h-4 w-4 mr-2" />
          Retake Test
        </Button>
        
        <Button
          onClick={onGoHome}
          variant="outline"
          className="border-sf-text-muted/20 text-sf-text-subtle hover:border-sf-button/50"
        >
          <Home className="h-4 w-4 mr-2" />
          Back to Tests
        </Button>
      </div>
    </div>
  );
}