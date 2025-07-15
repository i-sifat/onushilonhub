import BackButton from '@/components/common/BackButton';
import GrammarItemsLevelClientContent from '@/components/grammar-items/GrammarItemsLevelClientContent';
import { BookOpen } from 'lucide-react';

export async function generateStaticParams() {
  return [
    { level: 'hsc' },
    { level: 'ssc' }
  ];
}

export default function GrammarItemsLevelPage({ params }: { params: { level: string } }) {
  const level = params.level as 'hsc' | 'ssc';

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

  // Define chapters for each level
  const hscChapters = [
    { id: 'tense', name: 'Tense', description: 'Master all tenses with comprehensive rules and examples' },
    { id: 'voice', name: 'Voice', description: 'Active and passive voice transformation techniques' },
    { id: 'narration', name: 'Narration', description: 'Direct and indirect speech conversion rules' },
    { id: 'modifiers', name: 'Modifiers', description: 'Adjective and adverb usage in sentences' },
    { id: 'articles', name: 'Articles', description: 'Proper usage of a, an, and the' },
    { id: 'prepositions', name: 'Prepositions', description: 'Correct preposition usage in context' },
    { id: 'conditionals', name: 'Conditionals', description: 'If-clauses and conditional sentences' },
    { id: 'clauses', name: 'Clauses', description: 'Independent and dependent clause structures' }
  ];

  const sscChapters = [
    { id: 'completing-sentence', name: 'Completing Sentence', description: 'Sentence completion techniques and patterns' },
    { id: 'right-form-of-verbs', name: 'Right Form of Verbs', description: 'Correct verb forms in different contexts' },
    { id: 'articles', name: 'Articles', description: 'Basic article usage rules and practice' },
    { id: 'prepositions', name: 'Prepositions', description: 'Common preposition usage patterns' },
    { id: 'transformation', name: 'Transformation', description: 'Sentence transformation techniques' },
    { id: 'punctuation', name: 'Punctuation', description: 'Proper punctuation mark usage' }
  ];

  const chapters = level === 'hsc' ? hscChapters : sscChapters;

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
            Explore comprehensive grammar items and chapters for {level.toUpperCase()} level students.
          </p>
        </div>

        {/* Client Content */}
        <GrammarItemsLevelClientContent level={level} chapters={chapters} />
      </div>
    </div>
  );
}