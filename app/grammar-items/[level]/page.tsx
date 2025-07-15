import { Suspense } from 'react';
import { Metadata } from 'next';
import BackButton from '@/components/common/BackButton';
import { GrammarTopicsGrid } from '@/components/grammar-items/GrammarTopicsGrid';
import { BookOpen, Loader2 } from 'lucide-react';
import { getAllGrammarTopics } from '@/lib/content-loader';

export async function generateStaticParams() {
  return [
    { level: 'hsc' },
    { level: 'ssc' }
  ];
}

export async function generateMetadata({ params }: { params: Promise<{ level: string }> }): Promise<Metadata> {
  const { level } = await params;
  
  const levelName = level === 'hsc' ? 'HSC' : 'SSC';
  
  return {
    title: `${levelName} Grammar Items - StudyForge`,
    description: `Comprehensive grammar topics and rules for ${levelName} students. Master essential grammar concepts with detailed explanations and examples.`,
    keywords: `${levelName} grammar, grammar rules, English grammar, ${levelName} English, grammar topics, StudyForge`,
    openGraph: {
      title: `${levelName} Grammar Items - StudyForge`,
      description: `Comprehensive grammar topics and rules for ${levelName} students`,
      type: 'website',
    },
  };
}

export default async function GrammarItemsLevelPage({ params }: { params: Promise<{ level: string }> }) {
  const { level } = await params;
  
  // Validate level parameter
  if (!['hsc', 'ssc'].includes(level)) {
    return (
      <div className="min-h-screen bg-sf-bg pt-20">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-sf-text-bold mb-4">Invalid Level</h1>
            <p className="text-sf-text-subtle">Please select a valid level (HSC or SSC).</p>
            <BackButton />
          </div>
        </div>
      </div>
    );
  }

  const allTopics = getAllGrammarTopics(level as 'hsc' | 'ssc');

  return (
    <div className="min-h-screen bg-sf-bg pt-20">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <BackButton />
          <div className="flex items-center gap-3 mb-4">
            <BookOpen className="h-8 w-8 text-sf-button" />
            <h1 className="text-3xl font-bold text-sf-text-bold">
              {level.toUpperCase()} Grammar Items
            </h1>
          </div>
          <p className="text-sf-text-subtle text-lg max-w-3xl">
            Master essential grammar concepts with comprehensive rules, examples, and practice materials 
            tailored for {level.toUpperCase()} students.
          </p>
        </div>

        {/* Grammar Topics Grid */}
        <Suspense fallback={
          <div className="flex items-center justify-center py-12">
            <Loader2 className="h-8 w-8 animate-spin text-sf-button" />
            <span className="ml-2 text-sf-text-subtle">Loading grammar topics...</span>
          </div>
        }>
          <GrammarTopicsGrid level={level as 'hsc' | 'ssc'} topics={allTopics} />
        </Suspense>

        {/* Call to Action */}
        <div className="mt-16 text-center bg-sf-highlight/10 rounded-xl p-8">
          <h2 className="text-2xl font-bold text-sf-text-bold mb-4">
            Ready to Master Grammar?
          </h2>
          <p className="text-sf-text-subtle mb-6 max-w-2xl mx-auto">
            Explore our comprehensive grammar topics designed specifically for {level.toUpperCase()} students. 
            Each topic includes detailed rules, examples, and practice exercises.
          </p>
        </div>
      </div>
    </div>
  );
}