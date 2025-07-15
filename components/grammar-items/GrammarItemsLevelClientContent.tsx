'use client';

import { useState, useEffect } from 'react';
import TopicList from '@/components/rules/TopicList';
import { BookOpen, Loader2, GraduationCap, ArrowRight } from 'lucide-react';
import Link from 'next/link';

interface GrammarItemsLevelClientContentProps {
  level: 'hsc' | 'ssc';
  chapters: Array<{
    id: string;
    name: string;
    description: string;
  }>;
}

export default function GrammarItemsLevelClientContent({ 
  level, 
  chapters 
}: GrammarItemsLevelClientContentProps) {
  const [topics, setTopics] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);

  // Simulate loading topics (in real app, this would scan the content directory)
  useEffect(() => {
    const loadTopics = async () => {
      setLoading(true);
      
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // This is where you would normally scan the /content/grammar-items/[level] directory
      // For now, we'll show empty state to demonstrate the upload instructions
      setTopics([]);
      setLoading(false);
    };

    loadTopics();
  }, [level]);

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
      {/* Loading State */}
      {loading && (
        <div className="flex items-center justify-center py-12">
          <Loader2 className="h-8 w-8 animate-spin text-sf-button" />
          <span className="ml-2 text-sf-text-subtle">Loading content...</span>
        </div>
      )}

      {!loading && (
        <div className="space-y-12">
          {/* Grammar Topics Section */}
          <div>
            <div className="flex items-center space-x-3 mb-6">
              <div className="p-2 bg-sf-button/20 rounded-lg">
                <BookOpen className="h-5 w-5 text-sf-button" />
              </div>
              <h2 className="text-2xl font-bold text-sf-text-bold">Grammar Topics</h2>
            </div>
            
            <TopicList level={level} topics={topics} />
          </div>

          {/* Chapters Section */}
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
      )}

      {/* Upload Instructions for Grammar Topics */}
      {!loading && topics.length === 0 && (
        <div className="mt-8 bg-sf-highlight/10 rounded-lg p-6 border border-sf-button/20">
          <h3 className="text-lg font-semibold text-sf-text-bold mb-2">
            Ready to Add Grammar Topics?
          </h3>
          <p className="text-sf-text-subtle mb-4">
            To populate the grammar topics section, create topic folders and upload your files:
          </p>
          <div className="space-y-2">
            <code className="block bg-sf-bg border border-sf-text-muted/20 rounded p-3 text-sm text-sf-text-subtle">
              /content/grammar-items/{level}/[topic-name]/rules.json
            </code>
            <p className="text-sf-text-muted text-sm">
              Example: <code>/content/grammar-items/{level}/tense/rules.json</code>
            </p>
            <p className="text-sf-text-muted text-sm">
              Example: <code>/content/grammar-items/{level}/voice/rules.json</code>
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

      {/* Call to Action */}
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