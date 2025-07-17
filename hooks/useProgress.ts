'use client';

import { useState, useEffect } from 'react';
import { useAuth } from './useAuth';
import { database, TopicProgress, UserStats, QuestionAttempt } from '@/lib/database';

export function useProgress() {
  const { user } = useAuth();
  const [userStats, setUserStats] = useState<UserStats | null>(null);
  const [topicProgress, setTopicProgress] = useState<TopicProgress[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      loadProgressData();
    } else {
      setUserStats(null);
      setTopicProgress([]);
      setLoading(false);
    }
  }, [user]);

  const loadProgressData = async () => {
    if (!user) return;

    try {
      setLoading(true);
      const data = await database.getDashboardData(user.id);
      setUserStats(data.userStats);
      setTopicProgress(data.topicProgress);
    } catch (error) {
      console.error('Error loading progress data:', error);
      setUserStats(null);
      setTopicProgress([]);
    } finally {
      setLoading(false);
    }
  };

  const recordQuestionAttempt = async (
    questionId: string,
    topicName: string,
    level: 'hsc' | 'ssc',
    isCorrect: boolean,
    timeSpentSeconds: number
  ) => {
    if (!user) return false;

    try {
    const attempt: Omit<QuestionAttempt, 'id' | 'attempted_at'> = {
      user_id: user.id,
      question_id: questionId,
      topic_name: topicName,
      level,
      is_correct: isCorrect,
      time_spent_seconds: timeSpentSeconds
    };

    const success = await database.recordQuestionAttempt(attempt);
    
    if (success) {
      // Reload progress data to reflect changes
      await loadProgressData();
    }

    return success;
    } catch (error) {
      console.error('Error recording question attempt:', error);
      return false;
    }
  };

  const getTopicProgress = (topicName: string, level: 'hsc' | 'ssc') => {
    return topicProgress.find(
      progress => progress.topic_name === topicName && progress.level === level
    );
  };

  return {
    userStats,
    topicProgress,
    loading,
    recordQuestionAttempt,
    getTopicProgress,
    refreshProgress: loadProgressData
  };
}

export function useTopicAnalytics(topicName: string, level: 'hsc' | 'ssc') {
  const { user } = useAuth();
  const [analytics, setAnalytics] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user && topicName && level) {
      loadAnalytics();
    } else {
      setAnalytics(null);
      setLoading(false);
    }
  }, [user, topicName, level]);

  const loadAnalytics = async () => {
    if (!user) return;

    try {
      setLoading(true);
      const data = await database.getTopicAnalytics(user.id, topicName, level);
      setAnalytics(data);
    } catch (error) {
      console.error('Error loading topic analytics:', error);
      setAnalytics(null);
    } finally {
      setLoading(false);
    }
  };

  return {
    analytics,
    loading,
    refreshAnalytics: loadAnalytics
  };
}