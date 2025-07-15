import { Suspense } from 'react';
import { Metadata } from 'next';
import BackButton from '@/components/common/BackButton';
import QuestionTopicsGrid from '@/components/questions/QuestionTopicsGrid';
import { FileText, Loader2 } from 'lucide-react';
import { getQuestionTopics } from '@/lib/content-loader';

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
    title: `Board Questions - ${levelUpper} | OnushilonHub`,
    description: `Access thousands of ${levelUpper} board questions from all major education boards in Bangladesh. Practice with real examination questions.`,
    openGraph: {
      title: `Board Questions - ${levelUpper} | OnushilonHub`,
      description: `Access thousands of ${levelUpper} board questions from all major education boards in Bangladesh.`,
    },
  };
}

export default async function BoardQuestionsLevelPage({ params }: { params: Promise<{ level: string }> }) {
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

  const topics = getQuestionTopics(level as 'hsc' | 'ssc');

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
              <FileText className="h-6 w-6 text-sf-button" />
            </div>
            <h1 className="text-3xl font-bold text-sf-text-bold">
              {level.toUpperCase()} Board Questions
            </h1>
          </div>
          <p className="text-sf-text-subtle">
            Search and filter through thousands of board questions to find exactly what you need for your preparation.
          </p>
        </div>

        {/* Question Topics Grid */}
        <Suspense fallback={
          <div className="flex items-center justify-center py-12">
            <Loader2 className="h-8 w-8 animate-spin text-sf-button" />
            <span className="ml-2 text-sf-text-subtle">Loading question topics...</span>
          </div>
        }>
          <QuestionTopicsGrid level={level as 'hsc' | 'ssc'} topics={topics} />
        </Suspense>

        {/* Upload Instructions */}
        {topics.length === 0 && (
          <div className="mt-8 bg-sf-highlight/10 rounded-lg p-6 border border-sf-button/20">
            <h3 className="text-lg font-semibold text-sf-text-bold mb-2">
              Ready to Add Board Questions?
            </h3>
            <p className="text-sf-text-subtle mb-4">
              To populate this section with board questions, upload your JSON files to:
            </p>
            <code className="block bg-sf-bg border border-sf-text-muted/20 rounded p-3 text-sm text-sf-text-subtle">
              /content/questions/{level}/[topic]/[year]/[board].json
            </code>
            <p className="text-sf-text-muted text-sm mt-2">
              Example: <code>/content/questions/{level}/modifier/2024/dhaka.json</code>
            </p>
          </div>
        )}

        {/* Call to Action */}
        <div className="mt-16 text-center bg-sf-highlight/10 rounded-xl p-8">
          <h2 className="text-2xl font-bold text-sf-text-bold mb-4">
            Ready to Start Practicing?
          </h2>
          <p className="text-sf-text-subtle mb-6">
            Choose a topic above to access thousands of {level.toUpperCase()} board questions.
          </p>
          <a
            href={`/grammar-items/${level}`}
            className="inline-flex items-center bg-sf-button hover:bg-sf-button/90 text-sf-bg px-6 py-3 rounded-lg font-semibold transition-all duration-200"
          >
            Study Grammar Rules First
          </a>
        </div>
      </div>
    </div>
  );
}