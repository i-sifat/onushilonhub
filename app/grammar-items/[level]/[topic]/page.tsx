import { Suspense } from 'react';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import BackButton from '@/components/common/BackButton';
import GrammarRulesDisplay from '@/components/grammar-items/GrammarRulesDisplay';
import { BookOpen, Loader2 } from 'lucide-react';
import { getGrammarTopics, getGrammarRules, formatTopicName } from '@/lib/content-loader';

export async function generateStaticParams() {
  // Only generate static params for the 3 available topics
  return [
    { level: 'hsc', topic: 'completing-sentence' },
    { level: 'hsc', topic: 'modifier' },
    { level: 'hsc', topic: 'connector' },
    // SSC topics when available
    // { level: 'ssc', topic: 'completing-sentence' },
  ];
}

export async function generateMetadata({ params }: { params: Promise<{ level: string; topic: string }> }): Promise<Metadata> {
  const { level, topic } = await params;
  const levelUpper = level.toUpperCase();
  const topicFormatted = formatTopicName(topic);
  
  return {
    title: `${topicFormatted} - Grammar Rules - ${levelUpper} | OnushilonHub`,
    description: `Master ${topicFormatted} grammar rules for ${levelUpper} examinations. Comprehensive explanations, examples, and practice materials.`,
    openGraph: {
      title: `${topicFormatted} - Grammar Rules - ${levelUpper} | OnushilonHub`,
      description: `Master ${topicFormatted} grammar rules for ${levelUpper} examinations.`,
    },
  };
}

export default async function TopicGrammarRulesPage({ params }: { params: Promise<{ level: string; topic: string }> }) {
  const { level, topic } = await params;

  if (!['hsc', 'ssc'].includes(level)) {
    notFound();
  }

  // Check if topic is one of the 3 available topics
  const availableTopics = getGrammarTopics(level as 'hsc' | 'ssc');
  if (!availableTopics.includes(topic)) {
    notFound();
  }
  
  const grammarData = await getGrammarRules(level as 'hsc' | 'ssc', topic);
  
  if (!grammarData) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-sf-bg pt-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Back Navigation */}
        <div className="mb-6">
          <BackButton />
        </div>

        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center space-x-3 mb-4">
            <div className="p-2 bg-sf-button/20 rounded-lg">
              <BookOpen className="h-6 w-6 text-sf-button" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-sf-text-bold">
                {grammarData.topic}
              </h1>
              <p className="text-sf-text-muted text-sm">
                {level.toUpperCase()} Level Grammar Rules
              </p>
            </div>
          </div>
        </div>

        {/* Grammar Rules Content */}
        <Suspense fallback={
          <div className="flex items-center justify-center py-12">
            <Loader2 className="h-8 w-8 animate-spin text-sf-button" />
            <span className="ml-2 text-sf-text-subtle">Loading grammar rules...</span>
          </div>
        }>
          <GrammarRulesDisplay grammarData={grammarData} level={level} topic={topic} />
        </Suspense>
      </div>
    </div>
  );
}