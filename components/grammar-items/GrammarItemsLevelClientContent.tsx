'use client';

import { GrammarTopicsGrid } from '@/components/grammar-items/GrammarTopicsGrid';
import { BookOpen, GraduationCap, ArrowRight } from 'lucide-react';
import Link from 'next/link';

interface GrammarItemsLevelClientContentProps {
  level: 'hsc' | 'ssc';
  chapters: Array<{
    id: string;
    name: string;
    description: string;
    available: boolean;
  }>;
  topics: Array<{
    id: string;
    name: string;
    description: string;
    available: boolean;
  }>;
}

export default function GrammarItemsLevelClientContent({ 
  level, 
  chapters,
  topics
}: GrammarItemsLevelClientContentProps) {

  const ChapterCard = ({ chapter }: { chapter: any }) => (
    <div className="bg-sf-bg border border-sf-text-muted/20 rounded-lg p-6 hover:border-sf-button/50 transition-all duration-300 hover:shadow-lg hover:shadow-sf-button/10">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <div className="flex items-center space-x-2 mb-2">
            <BookOpen className="h-5 w-5 text-sf-button" />
            <h3 className="text-lg font-semibold text-sf-text-bold">
              {chapter.name}
            </h3>
          </div>
          <p className="text-sf-text-subtle mb-4">
            {chapter.description}
          </p>
          <div className="flex space-x-3">
            <Link
              href={`/board-questions/${level}?topic=${chapter.id}`}
              className="text-sm text-sf-button hover:text-sf-button/80 transition-colors font-medium"
            >
              View Questions
            </Link>
            <Link
              href={`/grammar-items/${level}/${chapter.id}`}
              className="text-sm text-sf-button hover:text-sf-button/80 transition-colors font-medium"
            >
              Study Rules
            </Link>
          </div>
        </div>
        <ArrowRight className="h-5 w-5 text-sf-text-muted ml-4 flex-shrink-0" />
      </div>
    </div>
  );

  return (
    <>
      <div className="space-y-12">
        <div>
          <div className="flex items-center space-x-3 mb-6">
            <div className="p-2 bg-sf-button/20 rounded-lg">
              <BookOpen className="h-5 w-5 text-sf-button" />
            </div>
            <h2 className="text-2xl font-bold text-sf-text-bold">Grammar Topics</h2>
          </div>
          
          <GrammarTopicsGrid level={level} topics={topics} />
        </div>

        <div>
          <div className="flex items-center space-x-3 mb-6">
            <div className="p-2 bg-sf-button/20 rounded-lg">
              <GraduationCap className="h-5 w-5 text-sf-button" />
            </div>
            <h2 className="text-2xl font-bold text-sf-text-bold">
              {level.toUpperCase()} Chapters
            </h2>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {chapters.map((chapter) => (
              <ChapterCard key={chapter.id} chapter={chapter} />
            ))}
          </div>
        </div>
      </div>

      <div className="mt-16 text-center bg-sf-highlight/10 rounded-xl p-8">
        <h2 className="text-2xl font-bold text-sf-text-bold mb-4">
          Ready to Start Learning?
        </h2>
        <p className="text-sf-text-subtle mb-6">
          Explore {level.toUpperCase()} grammar topics and practice with board questions.
        </p>
        <Link
          href={`/board-questions/${level}`}
          className="inline-flex items-center bg-sf-button hover:bg-sf-button/90 text-sf-bg px-6 py-3 rounded-lg font-semibold transition-all duration-200"
        >
          Practice with {level.toUpperCase()} Questions
        </Link>
      </div>
    </>
  );
}
