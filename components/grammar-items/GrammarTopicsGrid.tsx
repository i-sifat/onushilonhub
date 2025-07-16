'use client';

import Link from 'next/link';
import { BookOpen, ArrowRight, Clock } from 'lucide-react';
import { formatTopicName } from '@/lib/utils';

interface GrammarTopic {
  id: string;
  name: string;
  description: string;
  available: boolean;
}

interface GrammarTopicsGridProps {
  level: 'hsc' | 'ssc';
  topics: GrammarTopic[];
}

export function GrammarTopicsGrid({ level, topics }: GrammarTopicsGridProps) {
  if (topics.length === 0) {
    return (
      <div className="text-center py-12">
        <BookOpen className="h-16 w-16 text-sf-text-muted mx-auto mb-4" />
        <h3 className="text-xl font-semibold text-sf-text-bold mb-2">No Grammar Topics Found</h3>
        <p className="text-sf-text-subtle mb-4">
          No grammar topics are available for {level.toUpperCase()} level yet.
        </p>
      </div>
    );
  }

  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
      {topics.map((topic) => (
        <div
          key={topic.id}
          className={`group bg-sf-bg border rounded-lg p-6 transition-all duration-300 ${
            topic.available 
              ? 'border-sf-text-muted/20 hover:border-sf-button/50 hover:shadow-lg hover:shadow-sf-button/10' 
              : 'border-sf-text-muted/10 opacity-75'
          }`}
        >
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <div className="flex items-center space-x-2 mb-2">
                {topic.available ? (
                  <BookOpen className="h-5 w-5 text-sf-button" />
                ) : (
                  <Clock className="h-5 w-5 text-sf-text-muted" />
                )}
                <h3 className={`text-lg font-semibold transition-colors ${
                  topic.available 
                    ? 'text-sf-text-bold group-hover:text-sf-button' 
                    : 'text-sf-text-muted'
                }`}>
                  {topic.name}
                </h3>
              </div>
              
              <p className={`text-sm mb-4 ${
                topic.available ? 'text-sf-text-subtle' : 'text-sf-text-muted'
              }`}>
                {topic.description}
              </p>
              
              {topic.available ? (
                <Link
                  href={`/grammar-items/${level}/${topic.id}`}
                  className="inline-flex items-center text-sf-button text-sm font-medium hover:text-sf-button/80 transition-colors"
                >
                  <span>Study Rules</span>
                  <ArrowRight className="h-4 w-4 ml-1 group-hover:translate-x-1 transition-transform" />
                </Link>
              ) : (
                <div className="inline-flex items-center text-sf-text-muted text-sm font-medium">
                  <Clock className="h-4 w-4 mr-1" />
                  <span>Coming Soon</span>
                </div>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}