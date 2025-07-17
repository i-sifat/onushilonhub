'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { testHistory, TestHistoryEntry, TestAnalytics } from '@/lib/testHistory';
import { useAuth } from '@/hooks/useAuth';
import { formatTopicName } from '@/lib/utils';
import { 
  Calendar, Clock, Target, TrendingUp, Award, 
  BarChart3, Filter, Search 
} from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';

export default function TestHistoryPage() {
  const { user } = useAuth();
  const [history, setHistory] = useState<TestHistoryEntry[]>([]);
  const [analytics, setAnalytics] = useState<TestAnalytics | null>(null);
  const [loading, setLoading] = useState(true);
  const [filterTopic, setFilterTopic] = useState('all');
  const [filterDifficulty, setFilterDifficulty] = useState('all');

  useEffect(() => {
    if (user) {
      loadTestHistory();
    }
  }, [user]);

  const loadTestHistory = async () => {
    if (!user) return;

    try {
      setLoading(true);
      const [historyData, analyticsData] = await Promise.all([
        testHistory.getUserTestHistory(user.id),
        testHistory.getTestAnalytics(user.id)
      ]);

      setHistory(historyData);
      setAnalytics(analyticsData);
    } catch (error) {
      console.error('Error loading test history:', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredHistory = history.filter(test => {
    const matchesTopic = filterTopic === 'all' || test.topic === filterTopic;
    const matchesDifficulty = filterDifficulty === 'all' || test.difficulty === filterDifficulty;
    return matchesTopic && matchesDifficulty;
  });

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-600';
    if (score >= 60) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'easy': return 'bg-green-100 text-green-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'hard': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-sf-bg pt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="animate-pulse space-y-8">
            <div className="h-8 bg-sf-text-muted/20 rounded w-1/3"></div>
            <div className="grid md:grid-cols-4 gap-6">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="h-32 bg-sf-text-muted/20 rounded"></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-sf-bg pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-sf-text-bold mb-2">
            Test History & Analytics
          </h1>
          <p className="text-sf-text-subtle">
            Track your test performance and progress over time
          </p>
        </div>

        {/* Analytics Overview */}
        {analytics && (
          <div className="grid md:grid-cols-4 gap-6 mb-8">
            <Card className="border-sf-text-muted/20">
              <CardContent className="p-6 text-center">
                <div className="flex justify-center mb-3">
                  <BarChart3 className="h-8 w-8 text-sf-button" />
                </div>
                <div className="text-3xl font-bold text-sf-text-bold mb-1">
                  {analytics.totalTests}
                </div>
                <p className="text-sf-text-muted text-sm">Total Tests</p>
              </CardContent>
            </Card>

            <Card className="border-sf-text-muted/20">
              <CardContent className="p-6 text-center">
                <div className="flex justify-center mb-3">
                  <Target className="h-8 w-8 text-sf-button" />
                </div>
                <div className="text-3xl font-bold text-sf-text-bold mb-1">
                  {analytics.averageScore}%
                </div>
                <p className="text-sf-text-muted text-sm">Average Score</p>
              </CardContent>
            </Card>

            <Card className="border-sf-text-muted/20">
              <CardContent className="p-6 text-center">
                <div className="flex justify-center mb-3">
                  <Award className="h-8 w-8 text-sf-button" />
                </div>
                <div className="text-3xl font-bold text-sf-text-bold mb-1">
                  {analytics.bestScore}%
                </div>
                <p className="text-sf-text-muted text-sm">Best Score</p>
              </CardContent>
            </Card>

            <Card className="border-sf-text-muted/20">
              <CardContent className="p-6 text-center">
                <div className="flex justify-center mb-3">
                  <Clock className="h-8 w-8 text-sf-button" />
                </div>
                <div className="text-3xl font-bold text-sf-text-bold mb-1">
                  {Math.floor(analytics.totalTimeSpent / 60)}h
                </div>
                <p className="text-sf-text-muted text-sm">Study Time</p>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Progress Chart */}
        {analytics && analytics.progressTrend.length > 0 && (
          <Card className="border-sf-text-muted/20 mb-8">
            <CardHeader>
              <CardTitle className="text-xl text-sf-text-bold flex items-center">
                <TrendingUp className="h-5 w-5 mr-2" />
                Progress Trend
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={analytics.progressTrend}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis domain={[0, 100]} />
                  <Tooltip />
                  <Line 
                    type="monotone" 
                    dataKey="score" 
                    stroke="#febc38" 
                    strokeWidth={2}
                    dot={{ fill: '#febc38' }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        )}

        {/* Topic Performance */}
        {analytics && Object.keys(analytics.topicBreakdown).length > 0 && (
          <Card className="border-sf-text-muted/20 mb-8">
            <CardHeader>
              <CardTitle className="text-xl text-sf-text-bold">Performance by Topic</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={Object.entries(analytics.topicBreakdown).map(([topic, data]) => ({
                  topic: formatTopicName(topic),
                  average: data.averageScore,
                  best: data.bestScore,
                  tests: data.testsCount
                }))}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="topic" />
                  <YAxis domain={[0, 100]} />
                  <Tooltip />
                  <Bar dataKey="average" fill="#febc38" name="Average Score" />
                  <Bar dataKey="best" fill="#10b981" name="Best Score" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        )}

        {/* Filters */}
        <Card className="border-sf-text-muted/20 mb-6">
          <CardContent className="p-4">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <Filter className="h-4 w-4 text-sf-button" />
                <span className="text-sm font-medium text-sf-text-bold">Filters:</span>
              </div>
              
              <select
                value={filterTopic}
                onChange={(e) => setFilterTopic(e.target.value)}
                className="px-3 py-1 text-sm border border-sf-text-muted/20 rounded bg-sf-bg text-sf-text-subtle"
              >
                <option value="all">All Topics</option>
                <option value="modifier">Modifier</option>
                <option value="connectors">Connectors</option>
                <option value="completing-sentence">Completing Sentence</option>
              </select>
              
              <select
                value={filterDifficulty}
                onChange={(e) => setFilterDifficulty(e.target.value)}
                className="px-3 py-1 text-sm border border-sf-text-muted/20 rounded bg-sf-bg text-sf-text-subtle"
              >
                <option value="all">All Difficulties</option>
                <option value="easy">Easy</option>
                <option value="medium">Medium</option>
                <option value="hard">Hard</option>
              </select>
            </div>
          </CardContent>
        </Card>

        {/* Test History List */}
        <div className="space-y-4">
          <h2 className="text-2xl font-bold text-sf-text-bold">
            Recent Tests ({filteredHistory.length})
          </h2>
          
          {filteredHistory.length === 0 ? (
            <Card className="border-sf-text-muted/20">
              <CardContent className="p-8 text-center">
                <BarChart3 className="h-12 w-12 text-sf-text-muted mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-sf-text-bold mb-2">No Tests Found</h3>
                <p className="text-sf-text-subtle">
                  {history.length === 0 
                    ? "You haven't taken any tests yet. Start with a practice test!"
                    : "No tests match your current filters."
                  }
                </p>
              </CardContent>
            </Card>
          ) : (
            <div className="grid gap-4">
              {filteredHistory.map((test) => (
                <Card key={test.id} className="border-sf-text-muted/20 hover:border-sf-button/50 transition-colors">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div className="flex flex-col">
                          <h3 className="text-lg font-semibold text-sf-text-bold">
                            {test.test_name}
                          </h3>
                          <div className="flex items-center space-x-2 text-sm text-sf-text-muted">
                            <span>{formatTopicName(test.topic)}</span>
                            <span>•</span>
                            <span>{test.level.toUpperCase()}</span>
                          </div>
                        </div>
                        
                        <div className="flex items-center space-x-2">
                          <Badge className={getDifficultyColor(test.difficulty)}>
                            {test.difficulty.charAt(0).toUpperCase() + test.difficulty.slice(1)}
                          </Badge>
                          <Badge className={test.passed ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}>
                            {test.passed ? 'PASSED' : 'FAILED'}
                          </Badge>
                        </div>
                      </div>
                      
                      <div className="text-right">
                        <div className={`text-2xl font-bold ${getScoreColor(test.score)}`}>
                          {test.score}%
                        </div>
                        <div className="text-sm text-sf-text-muted">
                          {test.correct_answers}/{test.total_questions} correct
                        </div>
                        <div className="text-xs text-sf-text-muted flex items-center">
                          <Calendar className="h-3 w-3 mr-1" />
                          {new Date(test.completed_at).toLocaleDateString()}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}