'use client';

import { useState, useEffect } from 'react';
import BackButton from '@/components/common/BackButton';
import TopicList from '@/components/rules/TopicList';
import { Loader2 } from 'lucide-react';

interface RulesLevelClientProps {
  level: 'hsc' | 'ssc';
}

export default function RulesLevelClient({ level }: RulesLevelClientProps) {
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

  return (
    <>
      {/* Back Button */}
      <div className="mb-6">
        <BackButton />
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
    </>
  );
}