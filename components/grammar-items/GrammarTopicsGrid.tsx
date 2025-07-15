'use client';

import Link from 'next/link';
import { BookOpen, ArrowRight, Clock } from 'lucide-react';
import { getAllGrammarTopics } from '@/lib/content-loader';

interface GrammarTopicsGridProps {
  level: 'hsc' | '
  ssc';
}

export default function GrammarTopicsGrid({ level }: GrammarTopicsGridProps) {
  const topics = getAllGrammarTopics(level);

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
      {topics.map((topic) => {
        const CardComponent = topic.available ? Link : 'div';
        const cardProps = topic.available 
          ? { href: `/grammar-items/${level}/${topic.id}` }
          : {};

        return (
          <CardComponent
            key={topic.id}
            {...cardProps}
            className={`group bg-sf-bg border rounded-xl p-6 transition-all duration-300 ${
              topic.available
                ? 'border-sf-text-muted/20 hover:border-sf-button/50 hover:shadow-lg hover:shadow-sf-button/10 cursor-pointer'
                : 'border-sf-text-muted/10 opacity-60 cursor-not-allowed'
            }`}
          >
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center space-x-2 mb-2">
                  <BookOpen className={`h-5 w-5 ${topic.available ? 'text-sf-button' : 'text-sf-text-muted'}`} />
                  <h3 className={`text-lg font-semibold transition-colors ${
                    topic.available 
                      ? 'text-sf-text-bold group-hover:text-sf-button' 
                      : 'text-sf-text-muted'
                  }`}>
                    {topic.name}
                  </h3>
                  {!topic.available && (
                    <div className="flex items-center space-x-1 bg-sf-text-muted/20 px-2 py-1 rounded-full">
                      <Clock className="h-3 w-3 text-sf-text-muted" />
                      <span className="text-xs text-sf-text-muted font-medium">Coming Soon</span>
                    
                    </div>
                  )}
                </div>
                <p className="text-sf-text-subtle text-sm mb-4">
                  {topic.description}
                </p>
                {topic.available && (
                  <div className="flex items-center text-sf-button text-sm font-medium">
                    <span>View Rules</span>
                    <ArrowRight className="h-4 w-4 ml-1 group-hover:translate-x-1 transition-transform" />
                  </div>
                )}
              </div>
            </div>
          </CardComponent>
        );
      })}
    </div>
  );
}