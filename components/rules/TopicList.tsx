'use client';

import Link from 'next/link';
import { BookOpen, ArrowRight } from 'lucide-react';

interface TopicListProps {
  level: 'hsc' | 'ssc';
  topics: string[];
}

export default function TopicList({ level, topics }: TopicListProps) {
  const formatTopicName = (topic: string) => {
    return topic
      .split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };

  if (topics.length === 0) {
    return (
      <div className="text-center py-12">
        <BookOpen className="h-16 w-16 text-sf-text-muted mx-auto mb-4" />
        <h3 className="text-xl font-semibold text-sf-text-bold mb-2">No Grammar Rules Available</h3>
        <p className="text-sf-text-subtle mb-4">
          No grammar rules have been uploaded for {level.toUpperCase()} level yet.
        </p>
        <div className="text-sm text-sf-text-muted">
          <p>To add rules:</p>
          <p>Upload your rules files to <code className="bg-sf-text-muted/20 px-2 py-1 rounded">/content/rules/{level}/[topic]/rules.json</code></p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-sf-text-bold mb-2">
          {level.toUpperCase()} Grammar Rules
        </h2>
        <p className="text-sf-text-subtle">
          Select a grammar topic to view detailed rules and examples.
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {topics.map((topic) => (
          <Link
            key={topic}
            href={`/rules/${level}/${topic}`}
            className="group bg-sf-bg border border-sf-text-muted/20 rounded-lg p-6 hover:border-sf-button/50 transition-all duration-300 hover:shadow-lg hover:shadow-sf-button/10"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-sf-button/20 rounded-lg">
                  <BookOpen className="h-5 w-5 text-sf-button" />
                </div>
                <div>
                  <h3 className="font-semibold text-sf-text-bold group-hover:text-sf-button transition-colors">
                    {formatTopicName(topic)}
                  </h3>
                  <p className="text-sm text-sf-text-muted">
                    Grammar rules and examples
                  </p>
                </div>
              </div>
              <ArrowRight className="h-5 w-5 text-sf-text-muted group-hover:text-sf-button transition-colors" />
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}