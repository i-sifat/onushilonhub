import { supabase } from './supabase';

// Types for database tables
export interface UserProfile {
  id: string;
  email: string;
  full_name?: string;
  avatar_url?: string;
  created_at: string;
  updated_at: string;
}

export interface TopicProgress {
  id: string;
  user_id: string;
  topic_name: string;
  level: 'hsc' | 'ssc';
  total_questions: number;
  completed_questions: number;
  correct_answers: number;
  accuracy_percentage: number;
  time_spent_minutes: number;
  last_practiced_at?: string;
  created_at: string;
  updated_at: string;
}

export interface QuestionAttempt {
  id: string;
  user_id: string;
  question_id: string;
  topic_name: string;
  level: 'hsc' | 'ssc';
  is_correct: boolean;
  time_spent_seconds: number;
  attempted_at: string;
}

export interface UserStats {
  id: string;
  user_id: string;
  total_questions_attempted: number;
  total_correct_answers: number;
  overall_accuracy: number;
  total_time_spent_minutes: number;
  current_streak: number;
  longest_streak: number;
  topics_completed: number;
  last_activity_at?: string;
  created_at: string;
  updated_at: string;
}

// Database functions
export const database = {
  // User Profile functions
  async getUserProfile(userId: string): Promise<UserProfile | null> {
    try {
      const { data, error } = await supabase
        .from('user_profiles')
        .select('*')
        .eq('id', userId)
        .single();

      if (error) {
        console.error('Error fetching user profile:', error);
        return null;
      }

      return data;
    } catch (error) {
      console.error('Unexpected error fetching user profile:', error);
      return null;
    }
  },

  async updateUserProfile(userId: string, updates: Partial<UserProfile>): Promise<boolean> {
    try {
      const { error } = await supabase
        .from('user_profiles')
        .update({ ...updates, updated_at: new Date().toISOString() })
        .eq('id', userId);

      if (error) {
        console.error('Error updating user profile:', error);
        return false;
      }

      return true;
    } catch (error) {
      console.error('Unexpected error updating user profile:', error);
      return false;
    }
  },

  // Topic Progress functions
  async getTopicProgress(userId: string, topicName?: string, level?: 'hsc' | 'ssc'): Promise<TopicProgress[]> {
    try {
      let query = supabase
        .from('topic_progress')
        .select('*')
        .eq('user_id', userId);

      if (topicName) {
        query = query.eq('topic_name', topicName);
      }

      if (level) {
        query = query.eq('level', level);
      }

      const { data, error } = await query.order('last_practiced_at', { ascending: false });

      if (error) {
        console.error('Error fetching topic progress:', error);
        return [];
      }

      return data || [];
    } catch (error) {
      console.error('Unexpected error fetching topic progress:', error);
      return [];
    }
  },

  async getTopicProgressSingle(userId: string, topicName: string, level: 'hsc' | 'ssc'): Promise<TopicProgress | null> {
    try {
      const { data, error } = await supabase
        .from('topic_progress')
        .select('*')
        .eq('user_id', userId)
        .eq('topic_name', topicName)
        .eq('level', level)
        .single();

      if (error) {
        if (error.code === 'PGRST116') {
          // No rows found, return null
          return null;
        }
        console.error('Error fetching topic progress:', error);
        return null;
      }

      return data;
    } catch (error) {
      console.error('Unexpected error fetching single topic progress:', error);
      return null;
    }
  },

  // Question Attempt functions
  async recordQuestionAttempt(attempt: Omit<QuestionAttempt, 'id' | 'attempted_at'>): Promise<boolean> {
    try {
      const { error } = await supabase
        .from('question_attempts')
        .insert([attempt]);

      if (error) {
        console.error('Error recording question attempt:', error);
        return false;
      }

      // Update topic progress using the database function
      const { error: progressError } = await supabase.rpc('update_topic_progress', {
        p_user_id: attempt.user_id,
        p_topic_name: attempt.topic_name,
        p_level: attempt.level,
        p_is_correct: attempt.is_correct,
        p_time_spent_seconds: attempt.time_spent_seconds
      });

      if (progressError) {
        console.error('Error updating topic progress:', progressError);
        return false;
      }

      return true;
    } catch (error) {
      console.error('Unexpected error recording question attempt:', error);
      return false;
    }
  },

  async getQuestionAttempts(
    userId: string, 
    topicName?: string, 
    level?: 'hsc' | 'ssc',
    limit?: number
  ): Promise<QuestionAttempt[]> {
    let query = supabase
      .from('question_attempts')
      .select('*')
      .eq('user_id', userId);

    if (topicName) {
      query = query.eq('topic_name', topicName);
    }

    if (level) {
      query = query.eq('level', level);
    }

    if (limit) {
      query = query.limit(limit);
    }

    const { data, error } = await query.order('attempted_at', { ascending: false });

    if (error) {
      console.error('Error fetching question attempts:', error);
      return [];
    }

    return data || [];
  },

  // User Stats functions
  async getUserStats(userId: string): Promise<UserStats | null> {
    const { data, error } = await supabase
      .from('user_stats')
      .select('*')
      .eq('user_id', userId)
      .single();

    if (error) {
      console.error('Error fetching user stats:', error);
      return null;
    }

    return data;
  },

  // Dashboard data functions
  async getDashboardData(userId: string) {
    try {
      const [userStats, topicProgress, recentAttempts] = await Promise.all([
        this.getUserStats(userId),
        this.getTopicProgress(userId),
        this.getQuestionAttempts(userId, undefined, undefined, 10)
      ]);

      return {
        userStats,
        topicProgress,
        recentAttempts
      };
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
      return {
        userStats: null,
        topicProgress: [],
        recentAttempts: []
      };
    }
  },

  // Analytics functions
  async getTopicAnalytics(userId: string, topicName: string, level: 'hsc' | 'ssc') {
    try {
      const [topicProgress, attempts] = await Promise.all([
        this.getTopicProgressSingle(userId, topicName, level),
        this.getQuestionAttempts(userId, topicName, level)
      ]);

      // Calculate daily progress for the last 7 days
      const last7Days = Array.from({ length: 7 }, (_, i) => {
        const date = new Date();
        date.setDate(date.getDate() - i);
        return date.toISOString().split('T')[0];
      }).reverse();

      const dailyProgress = last7Days.map(date => {
        const dayAttempts = attempts.filter(attempt => 
          attempt.attempted_at.split('T')[0] === date
        );
        
        return {
          date,
          attempts: dayAttempts.length,
          correct: dayAttempts.filter(a => a.is_correct).length,
          accuracy: dayAttempts.length > 0 
            ? (dayAttempts.filter(a => a.is_correct).length / dayAttempts.length) * 100 
            : 0
        };
      });

      return {
        topicProgress,
        attempts,
        dailyProgress,
        totalAttempts: attempts.length,
        correctAttempts: attempts.filter(a => a.is_correct).length,
        averageAccuracy: attempts.length > 0 
          ? (attempts.filter(a => a.is_correct).length / attempts.length) * 100 
          : 0
      };
    } catch (error) {
      console.error('Error fetching topic analytics:', error);
      return null;
    }
  }
};