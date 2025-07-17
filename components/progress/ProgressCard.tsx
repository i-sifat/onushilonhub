'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { TopicProgress } from '@/lib/database';
import { formatTopicName } from '@/lib/utils';
import { Clock, Target, TrendingUp, Calendar } from 'lucide-react';

interface ProgressCardProps {
  progress: TopicProgress;
  onClick?: () => void;
}

export default function ProgressCard({ progress, onClick }: ProgressCardProps) {
  const accuracyColor = progress.accuracy_percentage >= 80 
    ? 'text-green-500' 
    : progress.accuracy_percentage >= 60 
    ? 'text-yellow-500' 
    : 'text-red-500';

  const formatTime = (minutes: number) => {
    if (minutes < 60) return `${minutes}m`;
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;
    return `${hours}h ${remainingMinutes}m`;
  };

  const formatDate = (dateString?: string) => {
    if (!dateString) return 'Never';
    return new Date(dateString).toLocaleDateString();
  };

  return (
    <Card 
      className={`border-sf-text-muted/20 transition-all duration-300 ${
        onClick ? 'hover:border-sf-button/50 cursor-pointer hover:shadow-lg' : ''
      }`}
      onClick={onClick}
    >
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg text-sf-text-bold">
            {formatTopicName(progress.topic_name)}
          </CardTitle>
          <Badge variant="outline" className="text-sf-button border-sf-button/30">
            {progress.level.toUpperCase()}
          </Badge>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-4">
        {/* Progress Bar */}
        <div>
          <div className="flex justify-between text-sm mb-2">
            <span className="text-sf-text-subtle">Progress</span>
            <span className="text-sf-text-bold">
              {progress.completed_questions} questions
            </span>
          </div>
          <Progress 
            value={progress.completed_questions > 0 ? Math.min((progress.completed_questions / 100) * 100, 100) : 0} 
            className="h-2"
          />
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 gap-4">
          <div className="flex items-center space-x-2">
            <Target className="h-4 w-4 text-sf-button" />
            <div>
              <p className={`text-sm font-semibold ${accuracyColor}`}>
                {progress.accuracy_percentage.toFixed(1)}%
              </p>
              <p className="text-xs text-sf-text-muted">Accuracy</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <Clock className="h-4 w-4 text-sf-button" />
            <div>
              <p className="text-sm font-semibold text-sf-text-bold">
                {formatTime(progress.time_spent_minutes)}
              </p>
              <p className="text-xs text-sf-text-muted">Time Spent</p>
            </div>
          </div>
        </div>

        {/* Additional Stats */}
        <div className="pt-2 border-t border-sf-text-muted/20">
          <div className="flex items-center justify-between text-xs text-sf-text-muted">
            <div className="flex items-center space-x-1">
              <TrendingUp className="h-3 w-3" />
              <span>{progress.correct_answers} correct</span>
            </div>
            <div className="flex items-center space-x-1">
              <Calendar className="h-3 w-3" />
              <span>Last: {formatDate(progress.last_practiced_at)}</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}