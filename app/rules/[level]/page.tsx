import { Suspense } from 'react';
import RulesLevelClient from '@/components/rules/RulesLevelClient';
import { BookOpen, Loader2 } from 'lucide-react';

export async function generateStaticParams() {
  return [
    { level: 'hsc' },
    { level: 'ssc' }
  ];
}

export default async function RulesLevelPage({ params }: { params: Promise<{ level: string }> }) {
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

  return (
    <div className="min-h-screen bg-sf-bg pt-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center space-x-3 mb-4">
            <div className="p-2 bg-sf-button/20 rounded-lg">
              <BookOpen className="h-6 w-6 text-sf-button" />
            </div>
            <h1 className="text-3xl font-bold text-sf-text-bold">
              {level.toUpperCase()} Grammar Rules
            </h1>
          </div>
          <p className="text-sf-text-subtle">
            Select a grammar topic to view comprehensive rules, explanations, and examples.
          </p>
        </div>

        {/* Client Content */}
        <Suspense fallback={
          <div className="flex items-center justify-center py-12">
            <Loader2 className="h-8 w-8 animate-spin text-sf-button" />
            <span className="ml-2 text-sf-text-subtle">Loading topics...</span>
          </div>
        }>
          <RulesLevelClient level={level as 'hsc' | 'ssc'} />
        </Suspense>
      </div>
    </div>
  );
}