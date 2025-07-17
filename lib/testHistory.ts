// Test History and Analytics Management
import { supabase } from './supabase';
import { TestResult, TestSession } from './testConfig';

export interface TestHistoryEntry {
  id: string;
  user_id: string;
  test_config_id: string;
  test_name: string;
  topic: string;
  level: 'hsc' | 'ssc';
  difficulty: 'easy' | 'medium' | 'hard';
  score: number;
  total_questions: number;
  correct_answers: number;
  time_spent: number;
  passed: boolean;
  completed_at: string;
  created_at: string;
}

export interface TestAnalytics {
  totalTests: number;
  averageScore: number;
  bestScore: number;
  totalTimeSpent: number;
  topicBreakdown: Record<string, {
    testsCount: number;
    averageScore: number;
    bestScore: number;
  }>;
  difficultyBreakdown: Record<string, {
    testsCount: number;
    averageScore: number;
  }>;
  recentTests: TestHistoryEntry[];
  progressTrend: Array<{
    date: string;
    score: number;
    topic: string;
  }>;
}

export const testHistory = {
  // Save test result to history
  async saveTestResult(result: TestResult, testConfigId: string, testName: string, topic: string, level: 'hsc' | 'ssc', difficulty: 'easy' | 'medium' | 'hard'): Promise<boolean> {
    try {
      const { error } = await supabase
        .from('test_history')
        .insert([{
          user_id: result.userId,
          test_config_id: testConfigId,
          test_name: testName,
          topic,
          level,
          difficulty,
          score: result.score,
          total_questions: result.totalQuestions,
          correct_answers: result.correctAnswers,
          time_spent: result.timeSpent,
          passed: result.passed,
          completed_at: result.completedAt.toISOString()
        }]);

      if (error) {
        console.error('Error saving test result:', error);
        return false;
      }

      return true;
    } catch (error) {
      console.error('Unexpected error saving test result:', error);
      return false;
    }
  },

  // Get user's test history
  async getUserTestHistory(userId: string, limit?: number): Promise<TestHistoryEntry[]> {
    try {
      let query = supabase
        .from('test_history')
        .select('*')
        .eq('user_id', userId)
        .order('completed_at', { ascending: false });

      if (limit) {
        query = query.limit(limit);
      }

      const { data, error } = await query;

      if (error) {
        console.error('Error fetching test history:', error);
        return [];
      }

      return data || [];
    } catch (error) {
      console.error('Unexpected error fetching test history:', error);
      return [];
    }
  },

  // Get test analytics for user
  async getTestAnalytics(userId: string): Promise<TestAnalytics | null> {
    try {
      const history = await this.getUserTestHistory(userId);
      
      if (history.length === 0) {
        return {
          totalTests: 0,
          averageScore: 0,
          bestScore: 0,
          totalTimeSpent: 0,
          topicBreakdown: {},
          difficultyBreakdown: {},
          recentTests: [],
          progressTrend: []
        };
      }

      // Calculate basic stats
      const totalTests = history.length;
      const averageScore = history.reduce((sum, test) => sum + test.score, 0) / totalTests;
      const bestScore = Math.max(...history.map(test => test.score));
      const totalTimeSpent = history.reduce((sum, test) => sum + test.time_spent, 0);

      // Topic breakdown
      const topicBreakdown: Record<string, { testsCount: number; averageScore: number; bestScore: number }> = {};
      history.forEach(test => {
        if (!topicBreakdown[test.topic]) {
          topicBreakdown[test.topic] = { testsCount: 0, averageScore: 0, bestScore: 0 };
        }
        topicBreakdown[test.topic].testsCount++;
        topicBreakdown[test.topic].bestScore = Math.max(topicBreakdown[test.topic].bestScore, test.score);
      });

      // Calculate average scores for topics
      Object.keys(topicBreakdown).forEach(topic => {
        const topicTests = history.filter(test => test.topic === topic);
        topicBreakdown[topic].averageScore = topicTests.reduce((sum, test) => sum + test.score, 0) / topicTests.length;
      });

      // Difficulty breakdown
      const difficultyBreakdown: Record<string, { testsCount: number; averageScore: number }> = {};
      history.forEach(test => {
        if (!difficultyBreakdown[test.difficulty]) {
          difficultyBreakdown[test.difficulty] = { testsCount: 0, averageScore: 0 };
        }
        difficultyBreakdown[test.difficulty].testsCount++;
      });

      // Calculate average scores for difficulties
      Object.keys(difficultyBreakdown).forEach(difficulty => {
        const difficultyTests = history.filter(test => test.difficulty === difficulty);
        difficultyBreakdown[difficulty].averageScore = difficultyTests.reduce((sum, test) => sum + test.score, 0) / difficultyTests.length;
      });

      // Progress trend (last 10 tests)
      const progressTrend = history.slice(0, 10).reverse().map(test => ({
        date: new Date(test.completed_at).toLocaleDateString(),
        score: test.score,
        topic: test.topic
      }));

      return {
        totalTests,
        averageScore: Math.round(averageScore),
        bestScore,
        totalTimeSpent,
        topicBreakdown,
        difficultyBreakdown,
        recentTests: history.slice(0, 5),
        progressTrend
      };
    } catch (error) {
      console.error('Error calculating test analytics:', error);
      return null;
    }
  },

  // Get performance comparison
  async getPerformanceComparison(userId: string, topic: string): Promise<{
    userAverage: number;
    globalAverage: number;
    userRank: number;
    totalUsers: number;
  } | null> {
    try {
      // Get user's average for the topic
      const userHistory = await this.getUserTestHistory(userId);
      const userTopicTests = userHistory.filter(test => test.topic === topic);
      
      if (userTopicTests.length === 0) {
        return null;
      }

      const userAverage = userTopicTests.reduce((sum, test) => sum + test.score, 0) / userTopicTests.length;

      // Get global statistics (this would require aggregation queries in a real implementation)
      // For now, we'll return mock data
      return {
        userAverage: Math.round(userAverage),
        globalAverage: 75, // Mock global average
        userRank: Math.floor(Math.random() * 100) + 1, // Mock rank
        totalUsers: 1000 // Mock total users
      };
    } catch (error) {
      console.error('Error getting performance comparison:', error);
      return null;
    }
  }
};