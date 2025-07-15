'use client';

import { useState, useEffect, use } from 'react';
import TopicList from '@/components/rules/TopicList';
import { BookOpen, Loader2 } from 'lucide-react';

export default function RulesLevelPage({ params }: { params: Promise<{ level: string }> }) {
  const resolvedParams = use(params);
  const level = resolvedParams.level as 'hsc' | 'ssc';
  
  const [topics, setTopics] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  // Simulate loading topics (in real app, this would scan the content directory)
  useEffect(() => {
    const loadTopics = async () => {
      setLoading(true);
      
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // This is where you would normally scan the /content/rules/[level] directory
      // For now, we'll show empty state to demonstrate the upload instructions
      setTopics([]);
      setLoading(false);
    };

    loadTopics();
  }, [level]);

  if (!['hsc', 'ssc'].includes(level)) {
    return (
      <div className="min-h-screen bg-sf-bg pt-20 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-sf-text-bold mb-4">Invalid Level</h1>
          <p className="text-sf-text-subtle">Please select either HSC or SSC level.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-sf-bg pt-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center space-x-3 mb-4">
            <div className="p-2 bg-sf-button/20 rounded-lg">
              <BookOpen className="h-6 w-6 text-sf-button" />
            </div>
            <h1 className="text-3xl font-bold text-sf-text-bold">
              {level.toUpperCase()} Grammar Rules
            </h1>
          </div>
          <p className="text-sf-text-subtle">
            Select a grammar topic to view comprehensive rules, explanations, and examples.
          </p>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="flex items-center justify-center py-12">
            <Loader2 className="h-8 w-8 animate-spin text-sf-button" />
            <span className="ml-2 text-sf-text-subtle">Loading topics...</span>
          </div>
        )}

        {/* Topics List */}
        {!loading && (
          <TopicList level={level} topics={topics} />
        )}

        {/* Upload Instructions */}
        {!loading && topics.length === 0 && (
          <div className="mt-8 bg-sf-highlight/10 rounded-lg p-6 border border-sf-button/20">
            <h3 className="text-lg font-semibold text-sf-text-bold mb-2">
              Ready to Add Grammar Rules?
            </h3>
            <p className="text-sf-text-subtle mb-4">
              To populate this section with grammar rules, create topic folders and upload your rules files:
            </p>
            <div className="space-y-2">
              <code className="block bg-sf-bg border border-sf-text-muted/20 rounded p-3 text-sm text-sf-text-subtle">
                /content/rules/{level}/[topic-name]/rules.json
              </code>
              <p className="text-sf-text-muted text-sm">
                Example: <code>/content/rules/{level}/tense/rules.json</code>
              </p>
              <p className="text-sf-text-muted text-sm">
                Example: <code>/content/rules/{level}/voice/rules.json</code>
              </p>
            </div>
            <div className="mt-4 p-4 bg-sf-bg border border-sf-text-muted/20 rounded">
              <h4 className="font-semibold text-sf-text-bold mb-2">Sample JSON Structure:</h4>
              <pre className="text-xs text-sf-text-subtle overflow-x-auto">
{`{
  "topic": "Tense",
  "rules": [
    {
      "title": "Present Simple Tense",
      "content": "Used for habitual actions and general truths...",
      "examples": [
        "I go to school every day.",
        "The sun rises in the east."
      ],
      "tips": [
        "Use base form of verb for I, you, we, they",
        "Add -s/-es for he, she, it"
      ]
    }
  ]
}`}
              </pre>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}