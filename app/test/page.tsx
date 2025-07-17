'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import BackButton from '@/components/common/BackButton';
import TestCard from '@/components/test/TestCard';
import ProtectedRoute from '@/components/auth/ProtectedRoute';
import { testConfigs, difficultySettings } from '@/lib/testConfig';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Target, Filter, BookOpen } from 'lucide-react';

function TestSelectionContent() {
  const router = useRouter();
  const [selectedTopic, setSelectedTopic] = useState<string>('all');
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('all');
  const [selectedLevel, setSelectedLevel] = useState<string>('all');

  // Get unique topics from test configs
  const topics = Array.from(new Set(testConfigs.map(config => config.topic)));
  const difficulties = Object.keys(difficultySettings);
  const levels = ['hsc', 'ssc'];

  // Filter test configs based on selections
  const filteredTests = testConfigs.filter(config => {
    const matchesTopic = selectedTopic === 'all' || config.topic === selectedTopic;
    const matchesDifficulty = selectedDifficulty === 'all' || config.difficulty === selectedDifficulty;
    const matchesLevel = selectedLevel === 'all' || config.level === selectedLevel;
    
    return matchesTopic && matchesDifficulty && matchesLevel;
  });

  const handleStartTest = (testId: string) => {
    router.push(`/test/${testId}`);
  };

  const formatTopicName = (topic: string) => {
    return topic.split('-').map(word => 
      word.charAt(0).toUpperCase() + word.slice(1)
    ).join(' ');
  };

  return (
    <div className="min-h-screen bg-sf-bg pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Back Button */}
        <div className="mb-6">
          <BackButton />
        </div>
        
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex justify-center mb-6">
            <div className="p-4 bg-sf-button/20 rounded-full">
              <Target className="h-12 w-12 text-sf-button" />
            </div>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-sf-text-bold mb-6">
            Test <span className="text-sf-button">Yourself</span>
          </h1>
          <p className="text-xl text-sf-text-subtle max-w-3xl mx-auto">
            Challenge yourself with timed tests on various grammar topics. 
            Choose your difficulty level and track your progress.
          </p>
        </div>

        {/* Filters */}
        <Card className="border-sf-text-muted/20 mb-8">
          <CardContent className="p-6">
            <div className="flex items-center space-x-2 mb-4">
              <Filter className="h-5 w-5 text-sf-button" />
              <h3 className="text-lg font-semibold text-sf-text-bold">Filter Tests</h3>
            </div>
            
            <div className="grid md:grid-cols-4 gap-4">
              <div>
                <label className="block text-sm font-medium text-sf-text-subtle mb-2">
                  Topic
                </label>
                <Select value={selectedTopic} onValueChange={setSelectedTopic}>
                  <SelectTrigger className="bg-sf-bg border-sf-text-muted/20">
                    <SelectValue placeholder="Select topic" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Topics</SelectItem>
                    {topics.map(topic => (
                      <SelectItem key={topic} value={topic}>
                        {formatTopicName(topic)}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="block text-sm font-medium text-sf-text-subtle mb-2">
                  Difficulty
                </label>
                <Select value={selectedDifficulty} onValueChange={setSelectedDifficulty}>
                  <SelectTrigger className="bg-sf-bg border-sf-text-muted/20">
                    <SelectValue placeholder="Select difficulty" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Difficulties</SelectItem>
                    {difficulties.map(difficulty => (
                      <SelectItem key={difficulty} value={difficulty}>
                        {difficultySettings[difficulty as keyof typeof difficultySettings].name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <label className="block text-sm font-medium text-sf-text-subtle mb-2">
                  Level
                </label>
                <Select value={selectedLevel} onValueChange={setSelectedLevel}>
                  <SelectTrigger className="bg-sf-bg border-sf-text-muted/20">
                    <SelectValue placeholder="Select level" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Levels</SelectItem>
                    {levels.map(level => (
                      <SelectItem key={level} value={level}>
                        {level.toUpperCase()}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="flex items-end">
                <button
                  onClick={() => {
                    setSelectedTopic('all');
                    setSelectedDifficulty('all');
                    setSelectedLevel('all');
                  }}
                  className="w-full px-4 py-2 text-sm border border-sf-text-muted/20 rounded-lg text-sf-text-subtle hover:border-sf-button/50 transition-colors"
                >
                  Clear Filters
                </button>
              </div>
            </div>

            {/* Active Filters */}
            {(selectedTopic !== 'all' || selectedDifficulty !== 'all' || selectedLevel !== 'all') && (
              <div className="mt-4 pt-4 border-t border-sf-text-muted/20">
                <div className="flex flex-wrap gap-2">
                  <span className="text-sm text-sf-text-muted">Active filters:</span>
                  {selectedTopic !== 'all' && (
                    <Badge variant="secondary" className="bg-sf-button/20 text-sf-button">
                      Topic: {formatTopicName(selectedTopic)}
                    </Badge>
                  )}
                  {selectedDifficulty !== 'all' && (
                    <Badge variant="secondary" className="bg-sf-button/20 text-sf-button">
                      Difficulty: {difficultySettings[selectedDifficulty as keyof typeof difficultySettings].name}
                    </Badge>
                  )}
                  {selectedLevel !== 'all' && (
                    <Badge variant="secondary" className="bg-sf-button/20 text-sf-button">
                      Level: {selectedLevel.toUpperCase()}
                    </Badge>
                  )}
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Results Summary */}
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-bold text-sf-text-bold">
            Available Tests ({filteredTests.length})
          </h2>
        </div>

        {/* Test Cards */}
        {filteredTests.length === 0 ? (
          <Card className="border-sf-text-muted/20">
            <CardContent className="p-8 text-center">
              <BookOpen className="h-12 w-12 text-sf-text-muted mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-sf-text-bold mb-2">No Tests Found</h3>
              <p className="text-sf-text-subtle">
                No tests match your current filters. Try adjusting your selection criteria.
              </p>
            </CardContent>
          </Card>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredTests.map((testConfig) => (
              <TestCard
                key={testConfig.id}
                testConfig={testConfig}
                onStartTest={handleStartTest}
              />
            ))}
          </div>
        )}

        {/* How Tests Work */}
        <div className="mt-16 bg-sf-highlight/10 rounded-xl p-8 border border-sf-button/20">
          <h3 className="text-xl font-bold text-sf-text-bold mb-6 text-center">
            How Tests Work
          </h3>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="w-12 h-12 bg-sf-button/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-sf-button font-bold text-lg">1</span>
              </div>
              <h4 className="font-semibold text-sf-text-bold mb-2">Choose Test</h4>
              <p className="text-sf-text-subtle text-sm">
                Select a test based on topic, difficulty, and level
              </p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-sf-button/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-sf-button font-bold text-lg">2</span>
              </div>
              <h4 className="font-semibold text-sf-text-bold mb-2">Take Test</h4>
              <p className="text-sf-text-subtle text-sm">
                Answer questions within the time limit
              </p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-sf-button/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-sf-button font-bold text-lg">3</span>
              </div>
              <h4 className="font-semibold text-sf-text-bold mb-2">Review Results</h4>
              <p className="text-sf-text-subtle text-sm">
                See your score and review correct answers
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function TestSelectionPage() {
  return (
    <ProtectedRoute>
      <TestSelectionContent />
    </ProtectedRoute>
  );
}