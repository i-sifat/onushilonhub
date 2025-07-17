/*
  # Test History and Analytics Schema

  1. New Tables
    - `test_history`
      - `id` (uuid, primary key)
      - `user_id` (uuid, references user_profiles)
      - `test_config_id` (text)
      - `test_name` (text)
      - `topic` (text)
      - `level` (text) - 'hsc' or 'ssc'
      - `difficulty` (text) - 'easy', 'medium', 'hard'
      - `score` (integer)
      - `total_questions` (integer)
      - `correct_answers` (integer)
      - `time_spent` (integer) - in seconds
      - `passed` (boolean)
      - `completed_at` (timestamp)
      - `created_at` (timestamp)

  2. Security
    - Enable RLS on test_history table
    - Add policies for authenticated users to manage their own data
*/

-- Create test_history table
CREATE TABLE IF NOT EXISTS test_history (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES user_profiles(id) ON DELETE CASCADE NOT NULL,
  test_config_id text NOT NULL,
  test_name text NOT NULL,
  topic text NOT NULL,
  level text NOT NULL CHECK (level IN ('hsc', 'ssc')),
  difficulty text NOT NULL CHECK (difficulty IN ('easy', 'medium', 'hard')),
  score integer NOT NULL CHECK (score >= 0 AND score <= 100),
  total_questions integer NOT NULL CHECK (total_questions > 0),
  correct_answers integer NOT NULL CHECK (correct_answers >= 0),
  time_spent integer NOT NULL CHECK (time_spent >= 0),
  passed boolean NOT NULL,
  completed_at timestamptz NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE test_history ENABLE ROW LEVEL SECURITY;

-- Create policies for test_history
CREATE POLICY "Users can view own test history"
  ON test_history
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own test history"
  ON test_history
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_test_history_user_id ON test_history(user_id);
CREATE INDEX IF NOT EXISTS idx_test_history_topic ON test_history(topic);
CREATE INDEX IF NOT EXISTS idx_test_history_completed_at ON test_history(completed_at);
CREATE INDEX IF NOT EXISTS idx_test_history_user_topic ON test_history(user_id, topic);