'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { TestConfig, difficultySettings } from '@/lib/testConfig';
import { Clock, Target, BookOpen, Users } from 'lucide-react';

interface TestCardProps {
  testConfig: TestConfig;
  onStartTest: (testId: string) => void;
  disabled?: boolean;
}

export default function TestCard({ testConfig, onStartTest, disabled = false }: TestCardProps) {
  const difficultyInfo = difficultySettings[testConfig.difficulty];
  
  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return 'bg-green-100 text-green-800 border-green-200';
      case 'medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'hard': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const formatTopic = (topic: string) => {
    return topic.split('-').map(word => 
      word.charAt(0).toUpperCase() + word.slice(1)
    ).join(' ');
  };

  return (
    <Card className={`border-sf-text-muted/20 transition-all duration-300 ${
      disabled ? 'opacity-50 cursor-not-allowed' : 'hover:border-sf-button/50 hover:shadow-lg'
    }`}>
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex items-center space-x-2">
            <BookOpen className="h-5 w-5 text-sf-button" />
            <CardTitle className="text-lg text-sf-text-bold">
              {testConfig.name}
            </CardTitle>
          </div>
          <div className="flex flex-col items-end space-y-1">
            <Badge 
              variant="outline" 
              className={getDifficultyColor(testConfig.difficulty)}
            >
              {difficultyInfo.name}
            </Badge>
            <Badge variant="secondary" className="bg-sf-button/20 text-sf-button text-xs">
              {testConfig.level.toUpperCase()}
            </Badge>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        <p className="text-sf-text-subtle text-sm leading-relaxed">
          {testConfig.description}
        </p>

        {/* Test Stats */}
        <div className="grid grid-cols-2 gap-4">
          <div className="flex items-center space-x-2">
            <Users className="h-4 w-4 text-sf-button" />
            <div>
              <p className="text-sm font-semibold text-sf-text-bold">
                {testConfig.questionCount}
              </p>
              <p className="text-xs text-sf-text-muted">Questions</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <Clock className="h-4 w-4 text-sf-button" />
            <div>
              <p className="text-sm font-semibold text-sf-text-bold">
                {testConfig.timeLimit}m
              </p>
              <p className="text-xs text-sf-text-muted">Time Limit</p>
            </div>
          </div>
        </div>

        {/* Passing Score */}
        <div className="flex items-center justify-between text-xs">
          <div className="flex items-center space-x-1">
            <Target className="h-3 w-3 text-sf-button" />
            <span className="text-sf-text-muted">Passing Score:</span>
          </div>
          <span className="text-sf-text-bold font-semibold">
            {testConfig.passingScore}%
          </span>
        </div>

        {/* Topic */}
        <div className="pt-2 border-t border-sf-text-muted/20">
          <p className="text-xs text-sf-text-muted mb-2">Topic:</p>
          <Badge variant="outline" className="text-sf-button border-sf-button/30">
            {formatTopic(testConfig.topic)}
          </Badge>
        </div>

        {/* Start Button */}
        <Button
          onClick={() => onStartTest(testConfig.id)}
          disabled={disabled}
          className="w-full bg-sf-button hover:bg-sf-button/90 text-sf-bg"
        >
          Start Test
        </Button>
      </CardContent>
    </Card>
  );
}