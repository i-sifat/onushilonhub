'use client';

import { useState, useEffect } from 'react';
import { useProgress } from '@/hooks/useProgress';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle, XCircle, Clock } from 'lucide-react';

interface QuestionTrackerProps {
  questionId: string;
  topicName: string;
  level: 'hsc' | 'ssc';
  children: React.ReactNode;
}

export default function QuestionTracker({ 
  questionId, 
  topicName, 
  level, 
  children 
}: QuestionTrackerProps) {
  const { recordQuestionAttempt } = useProgress();
  const [startTime, setStartTime] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [userAnswer, setUserAnswer] = useState<boolean | null>(null);

  useEffect(() => {
    // Start timing when component mounts
    setStartTime(Date.now());
    setIsAnswered(false);
    setUserAnswer(null);
  }, [questionId]);

  const handleAnswer = async (isCorrect: boolean) => {
    if (isAnswered || !startTime) return;

    const timeSpent = Math.floor((Date.now() - startTime) / 1000);
    setUserAnswer(isCorrect);
    setIsAnswered(true);

    // Record the attempt
    await recordQuestionAttempt(questionId, topicName, level, isCorrect, timeSpent);
  };

  const resetQuestion = () => {
    setStartTime(Date.now());
    setIsAnswered(false);
    setUserAnswer(null);
  };

  const getTimeSpent = () => {
    if (!startTime) return 0;
    return Math.floor((Date.now() - startTime) / 1000);
  };

  return (
    <Card className="border-sf-text-muted/20">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg text-sf-text-bold">
            Practice Question
          </CardTitle>
          <div className="flex items-center space-x-2 text-sm text-sf-text-muted">
            <Clock className="h-4 w-4" />
            <span>{Math.floor(getTimeSpent() / 60)}:{(getTimeSpent() % 60).toString().padStart(2, '0')}</span>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-6">
        {/* Question Content */}
        <div>
          {children}
        </div>

        {/* Answer Buttons */}
        {!isAnswered && (
          <div className="flex space-x-4">
            <Button
              onClick={() => handleAnswer(true)}
              className="flex-1 bg-green-600 hover:bg-green-700 text-white"
            >
              <CheckCircle className="h-4 w-4 mr-2" />
              Correct
            </Button>
            <Button
              onClick={() => handleAnswer(false)}
              variant="destructive"
              className="flex-1"
            >
              <XCircle className="h-4 w-4 mr-2" />
              Incorrect
            </Button>
          </div>
        )}

        {/* Result Display */}
        {isAnswered && (
          <div className="space-y-4">
            <div className={`p-4 rounded-lg border ${
              userAnswer 
                ? 'bg-green-50 border-green-200 text-green-800' 
                : 'bg-red-50 border-red-200 text-red-800'
            }`}>
              <div className="flex items-center space-x-2">
                {userAnswer ? (
                  <CheckCircle className="h-5 w-5 text-green-600" />
                ) : (
                  <XCircle className="h-5 w-5 text-red-600" />
                )}
                <span className="font-medium">
                  {userAnswer ? 'Correct!' : 'Incorrect'}
                </span>
                <span className="text-sm">
                  Time: {Math.floor(getTimeSpent() / 60)}:{(getTimeSpent() % 60).toString().padStart(2, '0')}
                </span>
              </div>
            </div>
            
            <Button onClick={resetQuestion} variant="outline" className="w-full">
              Try Another Question
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}