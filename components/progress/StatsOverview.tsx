'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { UserStats } from '@/lib/database';
import { BarChart3, Target, Clock, Zap } from 'lucide-react';

interface StatsOverviewProps {
  stats: UserStats | null;
}

export default function StatsOverview({ stats }: StatsOverviewProps) {
  if (!stats) {
    return (
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[...Array(4)].map((_, i) => (
          <Card key={i} className="border-sf-text-muted/20">
            <CardContent className="p-6">
              <div className="animate-pulse">
                <div className="h-4 bg-sf-text-muted/20 rounded mb-2"></div>
                <div className="h-8 bg-sf-text-muted/20 rounded"></div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  const formatTime = (minutes: number) => {
    if (minutes < 60) return `${minutes}m`;
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;
    return `${hours}h ${remainingMinutes}m`;
  };

  const statsData = [
    {
      title: "Questions Attempted",
      value: stats.total_questions_attempted.toString(),
      icon: BarChart3,
      description: "Total practice questions"
    },
    {
      title: "Overall Accuracy",
      value: `${stats.overall_accuracy.toFixed(1)}%`,
      icon: Target,
      description: "Correct answers percentage"
    },
    {
      title: "Time Spent",
      value: formatTime(stats.total_time_spent_minutes),
      icon: Clock,
      description: "Total study time"
    },
    {
      title: "Current Streak",
      value: stats.current_streak.toString(),
      icon: Zap,
      description: "Consecutive correct answers"
    }
  ];

  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
      {statsData.map((stat, index) => (
        <Card key={index} className="border-sf-text-muted/20">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-sf-text-subtle">
              {stat.title}
            </CardTitle>
            <stat.icon className="h-4 w-4 text-sf-button" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-sf-text-bold mb-1">
              {stat.value}
            </div>
            <p className="text-xs text-sf-text-muted">
              {stat.description}
            </p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}