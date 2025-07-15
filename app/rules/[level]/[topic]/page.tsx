import { Suspense } from 'react';
import Link from 'next/link';
import BackButton from '@/components/common/BackButton';
import TopicRulesClient from '@/components/rules/TopicRulesClient';
import { BookOpen, Loader2 } from 'lucide-react';

export async function generateStaticParams() {
  const levels = ['hsc', 'ssc'];
  const topics = ['tense', 'voice', 'narration', 'modifiers', 'articles', 'prepositions', 'conditionals', 'clauses', 'completing-sentence', 'right-form-of-verbs', 'transformation', 'punctuation'];
  
  const params = [];
  for (const level of levels) {
    for (const topic of topics) {
      params.push({ level, topic });
    }
  }
  
  return params;
}

function formatTopicName(topic: string) {
  return topic
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
}

export default function TopicRulesPage({ params }: { params: { level: string; topic: string } }) {
  const { level, topic } = params;

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
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back Navigation */}
        <div className="mb-6">
          <Link
            href={`/rules/${level}`}
            className="inline-flex items-center text-sf-button hover:text-sf-button/80 transition-colors"
          >
            <svg className="h-4 w-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to {level.toUpperCase()} Rules
          </Link>
        </div>

        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center space-x-3 mb-4">
            <div className="p-2 bg-sf-button/20 rounded-lg">
              <BookOpen className="h-6 w-6 text-sf-button" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-sf-text-bold">
                {formatTopicName(topic)}
              </h1>
              <p className="text-sf-text-muted text-sm">
                {level.toUpperCase()} Level Grammar Rules
              </p>
            </div>
          </div>
        </div>

        {/* Client Content */}
        <Suspense fallback={
          <div className="flex items-center justify-center py-12">
            <Loader2 className="h-8 w-8 animate-spin text-sf-button" />
            <span className="ml-2 text-sf-text-subtle">Loading rules...</span>
          </div>
        }>
          <TopicRulesClient level={level} topic={topic} />
        </Suspense>
      </div>
    </div>
  );
}