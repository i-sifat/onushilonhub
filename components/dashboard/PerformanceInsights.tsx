'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { TrendingUp, TrendingDown, Target, Clock, Award, Zap } from 'lucide-react';

interface PerformanceInsightsProps {
  insights: {
    bestTopic: string;
    worstTopic: string;
    averageAccuracy: number;
    totalStudyTime: number;
    improvementRate: number;
    currentStreak: number;
    recommendations: string[];
  };
}

export default function PerformanceInsights({ insights }: PerformanceInsightsProps) {
  const formatTime = (minutes: number) => {
    if (minutes < 60) return `${minutes}m`;
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;
    return `${hours}h ${remainingMinutes}m`;
  };

  const getAccuracyColor = (accuracy: number) => {
    if (accuracy >= 80) return 'text-green-500';
    if (accuracy >= 60) return 'text-yellow-500';
    return 'text-red-500';
  };

  const getImprovementIcon = (rate: number) => {
    if (rate > 0) return <TrendingUp className="h-4 w-4 text-green-500" />;
    if (rate < 0) return <TrendingDown className="h-4 w-4 text-red-500" />;
    return <Target className="h-4 w-4 text-sf-text-muted" />;
  };

  return (
    <div className="space-y-6">
      {/* Performance Metrics */}
      <div className="grid md:grid-cols-3 gap-4">
        <Card className="border-sf-text-muted/20">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-sf-text-muted">Best Topic</p>
                <p className="text-lg font-semibold text-sf-text-bold capitalize">
                  {insights.bestTopic.replace('-', ' ')}
                </p>
              </div>
              <Award className="h-8 w-8 text-sf-button" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-sf-text-muted/20">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-sf-text-muted">Study Time</p>
                <p className="text-lg font-semibold text-sf-text-bold">
                  {formatTime(insights.totalStudyTime)}
                </p>
              </div>
              <Clock className="h-8 w-8 text-sf-button" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-sf-text-muted/20">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-sf-text-muted">Current Streak</p>
                <p className="text-lg font-semibold text-sf-text-bold">
                  {insights.currentStreak}
                </p>
              </div>
              <Zap className="h-8 w-8 text-sf-button" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Accuracy Overview */}
      <Card className="border-sf-text-muted/20">
        <CardHeader>
          <CardTitle className="text-lg text-sf-text-bold">Accuracy Overview</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-sf-text-subtle">Overall Accuracy</span>
            <span className={`text-lg font-semibold ${getAccuracyColor(insights.averageAccuracy)}`}>
              {insights.averageAccuracy.toFixed(1)}%
            </span>
          </div>
          <Progress value={insights.averageAccuracy} className="h-2" />
          
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center space-x-2">
              {getImprovementIcon(insights.improvementRate)}
              <span className="text-sf-text-muted">
                {insights.improvementRate > 0 ? 'Improving' : 
                 insights.improvementRate < 0 ? 'Declining' : 'Stable'}
              </span>
            </div>
            <span className="text-sf-text-muted">
              {Math.abs(insights.improvementRate).toFixed(1)}% change
            </span>
          </div>
        </CardContent>
      </Card>

      {/* Areas for Improvement */}
      <Card className="border-sf-text-muted/20">
        <CardHeader>
          <CardTitle className="text-lg text-sf-text-bold">Areas for Improvement</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 bg-red-50/10 border border-red-200/30 rounded-lg">
              <div>
                <p className="font-medium text-sf-text-bold">Focus Topic</p>
                <p className="text-sm text-sf-text-subtle capitalize">
                  {insights.worstTopic.replace('-', ' ')}
                </p>
              </div>
              <Badge variant="outline" className="border-red-300 text-red-600">
                Needs Practice
              </Badge>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Recommendations */}
      <Card className="border-sf-text-muted/20">
        <CardHeader>
          <CardTitle className="text-lg text-sf-text-bold">Personalized Recommendations</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {insights.recommendations.map((recommendation, index) => (
              <div key={index} className="flex items-start space-x-3 p-3 bg-sf-highlight/10 rounded-lg">
                <div className="w-6 h-6 bg-sf-button/20 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                  <span className="text-sf-button font-bold text-xs">{index + 1}</span>
                </div>
                <p className="text-sf-text-subtle text-sm leading-relaxed">{recommendation}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}