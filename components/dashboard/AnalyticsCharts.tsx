'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, AreaChart, Area, PieChart, Pie, Cell } from 'recharts';
import { TrendingUp, BarChart3, Target, Calendar } from 'lucide-react';

interface AnalyticsChartsProps {
  progressData: Array<{
    date: string;
    attempts: number;
    correct: number;
    accuracy: number;
  }>;
  topicPerformance: Array<{
    topic: string;
    accuracy: number;
    attempts: number;
  }>;
  weeklyActivity: Array<{
    day: string;
    tests: number;
    score: number;
  }>;
}

const COLORS = ['#febc38', '#10b981', '#3b82f6', '#ef4444', '#8b5cf6', '#f59e0b'];

export default function AnalyticsCharts({ 
  progressData, 
  topicPerformance, 
  weeklyActivity 
}: AnalyticsChartsProps) {
  return (
    <div className="grid lg:grid-cols-2 gap-6">
      {/* Progress Chart */}
      <Card className="border-sf-text-muted/20">
        <CardHeader>
          <CardTitle className="text-lg text-sf-text-bold flex items-center">
            <TrendingUp className="h-5 w-5 mr-2 text-sf-button" />
            Daily Progress
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={progressData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#b8b8b8" opacity={0.3} />
              <XAxis 
                dataKey="date" 
                stroke="#e8e8e8"
                fontSize={12}
              />
              <YAxis 
                stroke="#e8e8e8"
                fontSize={12}
              />
              <Tooltip 
                contentStyle={{
                  backgroundColor: '#212121',
                  border: '1px solid #febc38',
                  borderRadius: '8px',
                  color: '#e8e8e8'
                }}
              />
              <Line 
                type="monotone" 
                dataKey="attempts" 
                stroke="#febc38" 
                strokeWidth={2}
                dot={{ fill: '#febc38', strokeWidth: 2, r: 4 }}
                name="Questions Attempted"
              />
              <Line 
                type="monotone" 
                dataKey="correct" 
                stroke="#10b981" 
                strokeWidth={2}
                dot={{ fill: '#10b981', strokeWidth: 2, r: 4 }}
                name="Correct Answers"
              />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Accuracy Chart */}
      <Card className="border-sf-text-muted/20">
        <CardHeader>
          <CardTitle className="text-lg text-sf-text-bold flex items-center">
            <Target className="h-5 w-5 mr-2 text-sf-button" />
            Accuracy Trend
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={progressData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#b8b8b8" opacity={0.3} />
              <XAxis 
                dataKey="date" 
                stroke="#e8e8e8"
                fontSize={12}
              />
              <YAxis 
                domain={[0, 100]}
                stroke="#e8e8e8"
                fontSize={12}
              />
              <Tooltip 
                contentStyle={{
                  backgroundColor: '#212121',
                  border: '1px solid #febc38',
                  borderRadius: '8px',
                  color: '#e8e8e8'
                }}
                formatter={(value) => [`${value}%`, 'Accuracy']}
              />
              <Area 
                type="monotone" 
                dataKey="accuracy" 
                stroke="#febc38" 
                fill="#febc38"
                fillOpacity={0.3}
                strokeWidth={2}
              />
            </AreaChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Topic Performance */}
      <Card className="border-sf-text-muted/20">
        <CardHeader>
          <CardTitle className="text-lg text-sf-text-bold flex items-center">
            <BarChart3 className="h-5 w-5 mr-2 text-sf-button" />
            Topic Performance
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={topicPerformance} layout="horizontal">
              <CartesianGrid strokeDasharray="3 3" stroke="#b8b8b8" opacity={0.3} />
              <XAxis 
                type="number"
                domain={[0, 100]}
                stroke="#e8e8e8"
                fontSize={12}
              />
              <YAxis 
                type="category"
                dataKey="topic"
                stroke="#e8e8e8"
                fontSize={12}
                width={100}
              />
              <Tooltip 
                contentStyle={{
                  backgroundColor: '#212121',
                  border: '1px solid #febc38',
                  borderRadius: '8px',
                  color: '#e8e8e8'
                }}
                formatter={(value) => [`${value}%`, 'Accuracy']}
              />
              <Bar 
                dataKey="accuracy" 
                fill="#febc38"
                radius={[0, 4, 4, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Weekly Activity */}
      <Card className="border-sf-text-muted/20">
        <CardHeader>
          <CardTitle className="text-lg text-sf-text-bold flex items-center">
            <Calendar className="h-5 w-5 mr-2 text-sf-button" />
            Weekly Activity
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={weeklyActivity}>
              <CartesianGrid strokeDasharray="3 3" stroke="#b8b8b8" opacity={0.3} />
              <XAxis 
                dataKey="day" 
                stroke="#e8e8e8"
                fontSize={12}
              />
              <YAxis 
                stroke="#e8e8e8"
                fontSize={12}
              />
              <Tooltip 
                contentStyle={{
                  backgroundColor: '#212121',
                  border: '1px solid #febc38',
                  borderRadius: '8px',
                  color: '#e8e8e8'
                }}
              />
              <Bar 
                dataKey="tests" 
                fill="#febc38"
                radius={[4, 4, 0, 0]}
                name="Tests Taken"
              />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
}