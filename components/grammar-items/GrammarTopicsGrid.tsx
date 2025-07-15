'use client';

import Link from 'next/link';
import { BookOpen, ArrowRight } from 'lucide-react';
import { formatTopicName } from '@/lib/content-loader';

interface GrammarTopicsGridProps {
  level: 'hsc' | 'ssc';
  topics: string[];
}

export default function GrammarTopicsGrid({ level, topics }: GrammarTopicsGridProps) {
  if (topics.length === 0) {
    return (
      <div className="text-center py-12">
        <BookOpen className="h-16 w-16 text-sf-text-muted mx-auto mb-4" />
        <h3 className="text-xl font-semibold text-sf-text-bold mb-2">No Grammar Topics Found</h3>
        <p className="text-sf-text-subtle mb-4">
          No grammar topics are available for {level.toUpperCase()} level yet.
        </p>
        <div className="text-sm text-sf-text-muted">
          <p>To add grammar topics:</p>
          <p>Upload your files to <code className="bg-sf-text-muted/20 px-2 py-1 rounded">/content/grammar-items/{level}/</code></p>
        </div>
      </div>
    );
  }

  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
      {topics.map((topic) => (
        <Link
          key={topic}
          href={`/grammar-items/${level}/${topic}`}
          className="group bg-sf-bg border border-sf-text-muted/20 rounded-lg p-6 hover:border-sf-button/50 transition-all duration-300 hover:shadow-lg hover:shadow-sf-button/10"
        >
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <div className="flex items-center space-x-2 mb-2">
                <BookOpen className="h-5 w-5 text-sf-button" />
                <h3 className="text-lg font-semibold text-sf-text-bold group-hover:text-sf-button transition-colors">
                  {formatTopicName(topic)}
                </h3>
              </div>
              <p className="text-sf-text-subtle text-sm mb-4">
                Learn comprehensive rules and examples for {formatTopicName(topic).toLowerCase()}
              </p>
              <div className="flex items-center text-sf-button text-sm font-medium">
                <span>View Rules</span>
                <ArrowRight className="h-4 w-4 ml-1 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}