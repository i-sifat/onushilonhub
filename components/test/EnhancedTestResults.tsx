'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { TestResult, TestConfig } from '@/lib/testConfig';
import { testEngine } from '@/lib/testEngine';
import { testHistory, TestAnalytics } from '@/lib/testHistory';
import { 
  Trophy, Target, Clock, CheckCircle, XCircle, RotateCcw, Home, 
  TrendingUp, BookOpen, Award, Lightbulb, BarChart3 
} from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';

interface EnhancedTestResultsProps {
  result: TestResult;
  testConfig: TestConfig;
  onRetakeTest: () => void;
  onGoHome: () => void;
  onReviewAnswers: () => void;
}

export default function EnhancedTestResults({
  result,
  testConfig,
  onRetakeTest,
  onGoHome,
  onReviewAnswers
}: EnhancedTestResultsProps) {
  const [analytics, setAnalytics] = useState<TestAnalytics | null>(null);
  const [recommendations, setRecommendations] = useState<string[]>([]);
  const [performanceAnalysis, setPerformanceAnalysis] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadAnalytics = async () => {
      try {
        setLoading(true);
        
        // Get recommendations and analysis
        const recs = testEngine.generateRecommendations(result, testConfig);
        const analysis = testEngine.getPerformanceAnalysis(result);
        
        setRecommendations(recs);
        setPerformanceAnalysis(analysis);

        // Get test analytics
        const testAnalytics = await testHistory.getTestAnalytics(result.userId);
        setAnalytics(testAnalytics);
      } catch (error) {
        console.error('Error loading analytics:', error);
      } finally {
        setLoading(false);
      }
    };

    loadAnalytics();
  }, [result, testConfig]);

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

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto space-y-8">
        <div className="animate-pulse space-y-4">
          <div className="h-32 bg-sf-text-muted/20 rounded"></div>
          <div className="h-64 bg-sf-text-muted/20 rounded"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto space-y-8">
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

      {/* Detailed Results Tabs */}
      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="analysis">Analysis</TabsTrigger>
          <TabsTrigger value="recommendations">Recommendations</TabsTrigger>
          <TabsTrigger value="history">History</TabsTrigger>
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview" className="space-y-6">
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

          {/* Question Results */}
          <Card className="border-sf-text-muted/20">
            <CardHeader>
              <CardTitle className="text-xl text-sf-text-bold">Question Breakdown</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-4">
                {result.questionResults.slice(0, 8).map((qResult, index) => (
                  <div key={index} className="flex items-center justify-between p-3 rounded border border-sf-text-muted/20">
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
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Analysis Tab */}
        <TabsContent value="analysis" className="space-y-6">
          {performanceAnalysis && (
            <div className="grid md:grid-cols-2 gap-6">
              <Card className="border-sf-text-muted/20">
                <CardHeader>
                  <CardTitle className="text-lg text-sf-text-bold flex items-center">
                    <TrendingUp className="h-5 w-5 mr-2 text-green-600" />
                    Strengths
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {performanceAnalysis.strengths.map((strength: string, index: number) => (
                      <li key={index} className="flex items-center space-x-2">
                        <CheckCircle className="h-4 w-4 text-green-600" />
                        <span className="text-sf-text-subtle">{strength}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>

              <Card className="border-sf-text-muted/20">
                <CardHeader>
                  <CardTitle className="text-lg text-sf-text-bold flex items-center">
                    <Target className="h-5 w-5 mr-2 text-red-600" />
                    Areas for Improvement
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {performanceAnalysis.weaknesses.map((weakness: string, index: number) => (
                      <li key={index} className="flex items-center space-x-2">
                        <XCircle className="h-4 w-4 text-red-600" />
                        <span className="text-sf-text-subtle">{weakness}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </div>
          )}

          <Card className="border-sf-text-muted/20">
            <CardHeader>
              <CardTitle className="text-lg text-sf-text-bold">Overall Assessment</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sf-text-subtle leading-relaxed">
                {performanceAnalysis?.overallAssessment}
              </p>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Recommendations Tab */}
        <TabsContent value="recommendations" className="space-y-6">
          <Card className="border-sf-text-muted/20">
            <CardHeader>
              <CardTitle className="text-lg text-sf-text-bold flex items-center">
                <Lightbulb className="h-5 w-5 mr-2 text-sf-button" />
                Personalized Recommendations
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recommendations.map((recommendation, index) => (
                  <div key={index} className="flex items-start space-x-3 p-4 bg-sf-highlight/10 rounded-lg">
                    <div className="w-6 h-6 bg-sf-button/20 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-sf-button font-bold text-sm">{index + 1}</span>
                    </div>
                    <p className="text-sf-text-subtle leading-relaxed">{recommendation}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Study Plan */}
          <Card className="border-sf-text-muted/20">
            <CardHeader>
              <CardTitle className="text-lg text-sf-text-bold flex items-center">
                <BookOpen className="h-5 w-5 mr-2 text-sf-button" />
                Suggested Study Plan
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center space-x-3 p-3 border border-sf-text-muted/20 rounded-lg">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                    <span className="text-blue-600 font-bold text-sm">1</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-sf-text-bold">Review Grammar Rules</h4>
                    <p className="text-sm text-sf-text-subtle">Study the {testConfig.topic} rules thoroughly</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3 p-3 border border-sf-text-muted/20 rounded-lg">
                  <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                    <span className="text-green-600 font-bold text-sm">2</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-sf-text-bold">Practice More Questions</h4>
                    <p className="text-sm text-sf-text-subtle">Take additional practice tests</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3 p-3 border border-sf-text-muted/20 rounded-lg">
                  <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                    <span className="text-purple-600 font-bold text-sm">3</span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-sf-text-bold">Retake Test</h4>
                    <p className="text-sm text-sf-text-subtle">Test your improved knowledge</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* History Tab */}
        <TabsContent value="history" className="space-y-6">
          {analytics && (
            <>
              {/* Overall Stats */}
              <div className="grid md:grid-cols-4 gap-4">
                <Card className="border-sf-text-muted/20">
                  <CardContent className="p-4 text-center">
                    <div className="text-2xl font-bold text-sf-text-bold">{analytics.totalTests}</div>
                    <p className="text-xs text-sf-text-muted">Total Tests</p>
                  </CardContent>
                </Card>
                
                <Card className="border-sf-text-muted/20">
                  <CardContent className="p-4 text-center">
                    <div className="text-2xl font-bold text-sf-text-bold">{analytics.averageScore}%</div>
                    <p className="text-xs text-sf-text-muted">Average Score</p>
                  </CardContent>
                </Card>
                
                <Card className="border-sf-text-muted/20">
                  <CardContent className="p-4 text-center">
                    <div className="text-2xl font-bold text-sf-text-bold">{analytics.bestScore}%</div>
                    <p className="text-xs text-sf-text-muted">Best Score</p>
                  </CardContent>
                </Card>
                
                <Card className="border-sf-text-muted/20">
                  <CardContent className="p-4 text-center">
                    <div className="text-2xl font-bold text-sf-text-bold">
                      {Math.floor(analytics.totalTimeSpent / 60)}h
                    </div>
                    <p className="text-xs text-sf-text-muted">Study Time</p>
                  </CardContent>
                </Card>
              </div>

              {/* Progress Chart */}
              {analytics.progressTrend.length > 0 && (
                <Card className="border-sf-text-muted/20">
                  <CardHeader>
                    <CardTitle className="text-lg text-sf-text-bold">Progress Trend</CardTitle>
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
              <Card className="border-sf-text-muted/20">
                <CardHeader>
                  <CardTitle className="text-lg text-sf-text-bold">Performance by Topic</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {Object.entries(analytics.topicBreakdown).map(([topic, data]) => (
                      <div key={topic} className="space-y-2">
                        <div className="flex justify-between items-center">
                          <span className="text-sf-text-bold capitalize">{topic.replace('-', ' ')}</span>
                          <span className="text-sf-text-muted text-sm">
                            {data.testsCount} tests • {data.averageScore}% avg
                          </span>
                        </div>
                        <Progress value={data.averageScore} className="h-2" />
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </>
          )}
        </TabsContent>
      </Tabs>

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