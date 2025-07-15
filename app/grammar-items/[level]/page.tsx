import { Suspense } from 'react';
import { Metadata } from 'next';
import BackButton from '@/components/common/BackButton';
import GrammarTopicsGrid from '@/components/grammar-items/GrammarTopicsGrid';
import { BookOpen, Loader2 } from 'lucide-react';
import { getGrammarTopics, formatTopicName } from '@/lib/content-loader';

export async function generateStaticParams() {
  return [
    { level: 'hsc' },
    { level: 'ssc' }
  ];
}

export async function generateMetadata({ params }: { params: Promise<{ level: string }> }): Promise<Metadata> {
  const { level } = await params;
  const levelUpper = level.toUpperCase();
  
  return {
    title: `Grammar Items - ${levelUpper} | OnushilonHub`,
    description: `Explore comprehensive ${levelUpper} grammar items with detailed rules, examples, and explanations. Master English grammar for ${levelUpper} examinations.`,
    openGraph: {
      title: `Grammar Items - ${levelUpper} | OnushilonHub`,
      description: `Explore comprehensive ${levelUpper} grammar items with detailed rules, examples, and explanations.`,
    },
  };
}

export default async function GrammarItemsLevelPage({ params }: { params: Promise<{ level: string }> }) {
  const { level } = await params;

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

  const topics = getGrammarTopics(level as 'hsc' | 'ssc');

  return (
    <div className="min-h-screen bg-sf-bg pt-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back Button */}
        <div className="mb-6">
          <BackButton />
        </div>
        
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center space-x-3 mb-4">
            <div className="p-2 bg-sf-button/20 rounded-lg">
              <BookOpen className="h-6 w-6 text-sf-button" />
            </div>
            <h1 className="text-3xl font-bold text-sf-text-bold">
              {level.toUpperCase()} Grammar Items
            </h1>
          </div>
          <p className="text-sf-text-subtle">
            Explore comprehensive grammar items and rules for {level.toUpperCase()} level students.
          </p>
        </div>

        {/* Grammar Topics Grid */}
        <Suspense fallback={
          <div className="flex items-center justify-center py-12">
            <Loader2 className="h-8 w-8 animate-spin text-sf-button" />
            <span className="ml-2 text-sf-text-subtle">Loading grammar topics...</span>
          </div>
        }>
          <GrammarTopicsGrid level={level as 'hsc' | 'ssc'} topics={topics} />
        </Suspense>

        {/* Upload Instructions */}
        {topics.length === 0 && (
          <div className="mt-8 bg-sf-highlight/10 rounded-lg p-6 border border-sf-button/20">
            <h3 className="text-lg font-semibold text-sf-text-bold mb-2">
              Ready to Add Grammar Topics?
            </h3>
            <p className="text-sf-text-subtle mb-4">
              To populate this section with grammar topics, create topic folders and upload your files:
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
          <a
            href={`/board-questions/${level}`}
            className="inline-flex items-center bg-sf-button hover:bg-sf-button/90 text-sf-bg px-6 py-3 rounded-lg font-semibold transition-all duration-200"
          >
            Practice with {level.toUpperCase()} Questions
          </a>
        </div>
      </div>
    </div>
  );
}