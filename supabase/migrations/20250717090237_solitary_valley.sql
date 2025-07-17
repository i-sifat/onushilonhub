/*
  # User Progress Tracking Schema

  1. New Tables
    - `user_profiles`
      - `id` (uuid, primary key, references auth.users)
      - `email` (text)
      - `full_name` (text)
      - `avatar_url` (text, optional)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)
    
    - `topic_progress`
      - `id` (uuid, primary key)
      - `user_id` (uuid, references user_profiles)
      - `topic_name` (text) - e.g., 'modifier', 'connectors'
      - `level` (text) - 'hsc' or 'ssc'
      - `total_questions` (integer)
      - `completed_questions` (integer)
      - `correct_answers` (integer)
      - `accuracy_percentage` (decimal)
      - `time_spent_minutes` (integer)
      - `last_practiced_at` (timestamp)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)
    
    - `question_attempts`
      - `id` (uuid, primary key)
      - `user_id` (uuid, references user_profiles)
      - `question_id` (text) - matches question IDs from data files
      - `topic_name` (text)
      - `level` (text)
      - `is_correct` (boolean)
      - `time_spent_seconds` (integer)
      - `attempted_at` (timestamp)
    
    - `user_stats`
      - `id` (uuid, primary key)
      - `user_id` (uuid, references user_profiles)
      - `total_questions_attempted` (integer)
      - `total_correct_answers` (integer)
      - `overall_accuracy` (decimal)
      - `total_time_spent_minutes` (integer)
      - `current_streak` (integer)
      - `longest_streak` (integer)
      - `topics_completed` (integer)
      - `last_activity_at` (timestamp)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)

  2. Security
    - Enable RLS on all tables
    - Add policies for authenticated users to manage their own data
*/

-- Create user_profiles table
CREATE TABLE IF NOT EXISTS user_profiles (
  id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email text NOT NULL,
  full_name text,
  avatar_url text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create topic_progress table
CREATE TABLE IF NOT EXISTS topic_progress (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES user_profiles(id) ON DELETE CASCADE NOT NULL,
  topic_name text NOT NULL,
  level text NOT NULL CHECK (level IN ('hsc', 'ssc')),
  total_questions integer DEFAULT 0,
  completed_questions integer DEFAULT 0,
  correct_answers integer DEFAULT 0,
  accuracy_percentage decimal(5,2) DEFAULT 0.00,
  time_spent_minutes integer DEFAULT 0,
  last_practiced_at timestamptz,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  UNIQUE(user_id, topic_name, level)
);

-- Create question_attempts table
CREATE TABLE IF NOT EXISTS question_attempts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES user_profiles(id) ON DELETE CASCADE NOT NULL,
  question_id text NOT NULL,
  topic_name text NOT NULL,
  level text NOT NULL CHECK (level IN ('hsc', 'ssc')),
  is_correct boolean NOT NULL,
  time_spent_seconds integer DEFAULT 0,
  attempted_at timestamptz DEFAULT now()
);

-- Create user_stats table
CREATE TABLE IF NOT EXISTS user_stats (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES user_profiles(id) ON DELETE CASCADE NOT NULL,
  total_questions_attempted integer DEFAULT 0,
  total_correct_answers integer DEFAULT 0,
  overall_accuracy decimal(5,2) DEFAULT 0.00,
  total_time_spent_minutes integer DEFAULT 0,
  current_streak integer DEFAULT 0,
  longest_streak integer DEFAULT 0,
  topics_completed integer DEFAULT 0,
  last_activity_at timestamptz,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  UNIQUE(user_id)
);

-- Enable Row Level Security
ALTER TABLE user_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE topic_progress ENABLE ROW LEVEL SECURITY;
ALTER TABLE question_attempts ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_stats ENABLE ROW LEVEL SECURITY;

-- Create policies for user_profiles
CREATE POLICY "Users can view own profile"
  ON user_profiles
  FOR SELECT
  TO authenticated
  USING (auth.uid() = id);

CREATE POLICY "Users can update own profile"
  ON user_profiles
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = id);

CREATE POLICY "Users can insert own profile"
  ON user_profiles
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = id);

-- Create policies for topic_progress
CREATE POLICY "Users can view own topic progress"
  ON topic_progress
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can manage own topic progress"
  ON topic_progress
  FOR ALL
  TO authenticated
  USING (auth.uid() = user_id);

-- Create policies for question_attempts
CREATE POLICY "Users can view own question attempts"
  ON question_attempts
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own question attempts"
  ON question_attempts
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

-- Create policies for user_stats
CREATE POLICY "Users can view own stats"
  ON user_stats
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can manage own stats"
  ON user_stats
  FOR ALL
  TO authenticated
  USING (auth.uid() = user_id);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_topic_progress_user_id ON topic_progress(user_id);
CREATE INDEX IF NOT EXISTS idx_topic_progress_topic_level ON topic_progress(topic_name, level);
CREATE INDEX IF NOT EXISTS idx_question_attempts_user_id ON question_attempts(user_id);
CREATE INDEX IF NOT EXISTS idx_question_attempts_topic ON question_attempts(topic_name, level);
CREATE INDEX IF NOT EXISTS idx_user_stats_user_id ON user_stats(user_id);

-- Create function to automatically create user profile on signup
CREATE OR REPLACE FUNCTION create_user_profile()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO user_profiles (id, email, full_name)
  VALUES (NEW.id, NEW.email, NEW.raw_user_meta_data->>'full_name');
  
  INSERT INTO user_stats (user_id)
  VALUES (NEW.id);
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create trigger to automatically create user profile
DROP TRIGGER IF EXISTS create_user_profile_trigger ON auth.users;
CREATE TRIGGER create_user_profile_trigger
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION create_user_profile();

-- Create function to update topic progress
CREATE OR REPLACE FUNCTION update_topic_progress(
  p_user_id uuid,
  p_topic_name text,
  p_level text,
  p_is_correct boolean,
  p_time_spent_seconds integer
)
RETURNS void AS $$
DECLARE
  v_total_questions integer;
  v_completed_questions integer;
  v_correct_answers integer;
  v_accuracy decimal(5,2);
BEGIN
  -- Insert or update topic progress
  INSERT INTO topic_progress (
    user_id, topic_name, level, completed_questions, correct_answers, 
    time_spent_minutes, last_practiced_at
  )
  VALUES (
    p_user_id, p_topic_name, p_level, 1, 
    CASE WHEN p_is_correct THEN 1 ELSE 0 END,
    CEIL(p_time_spent_seconds / 60.0), now()
  )
  ON CONFLICT (user_id, topic_name, level)
  DO UPDATE SET
    completed_questions = topic_progress.completed_questions + 1,
    correct_answers = topic_progress.correct_answers + CASE WHEN p_is_correct THEN 1 ELSE 0 END,
    time_spent_minutes = topic_progress.time_spent_minutes + CEIL(p_time_spent_seconds / 60.0),
    last_practiced_at = now(),
    updated_at = now();

  -- Calculate accuracy
  SELECT completed_questions, correct_answers
  INTO v_completed_questions, v_correct_answers
  FROM topic_progress
  WHERE user_id = p_user_id AND topic_name = p_topic_name AND level = p_level;

  v_accuracy := CASE 
    WHEN v_completed_questions > 0 THEN (v_correct_answers::decimal / v_completed_questions) * 100
    ELSE 0
  END;

  -- Update accuracy
  UPDATE topic_progress
  SET accuracy_percentage = v_accuracy
  WHERE user_id = p_user_id AND topic_name = p_topic_name AND level = p_level;

  -- Update user stats
  UPDATE user_stats
  SET
    total_questions_attempted = total_questions_attempted + 1,
    total_correct_answers = total_correct_answers + CASE WHEN p_is_correct THEN 1 ELSE 0 END,
    overall_accuracy = CASE 
      WHEN (total_questions_attempted + 1) > 0 
      THEN ((total_correct_answers + CASE WHEN p_is_correct THEN 1 ELSE 0 END)::decimal / (total_questions_attempted + 1)) * 100
      ELSE 0
    END,
    total_time_spent_minutes = total_time_spent_minutes + CEIL(p_time_spent_seconds / 60.0),
    last_activity_at = now(),
    updated_at = now()
  WHERE user_id = p_user_id;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;