import { useSearchParams } from 'next/navigation';
import BackButton from '@/components/common/BackButton';
import Link from 'next/link';
import { BookOpen, ArrowRight, GraduationCap } from 'lucide-react';

export default function ChaptersPage() {
  const searchParams = useSearchParams();
  const level = searchParams.get('level') || 'both';
  
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

  const ChapterCard = ({ chapter, level }: { chapter: any; level: string }) => (
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
              href={`/rules/${level}/${chapter.id}`}
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
    <div className="min-h-screen bg-sf-bg pt-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Back Button */}
        <div className="mb-6">
          <BackButton />
        </div>
        
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex justify-center mb-6">
            <div className="p-4 bg-sf-button/20 rounded-full">
              <GraduationCap className="h-12 w-12 text-sf-button" />
            </div>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-sf-text-bold mb-6">
            Grammar <span className="text-sf-button">Chapters</span>
          </h1>
          <p className="text-xl text-sf-text-subtle max-w-3xl mx-auto">
            Explore comprehensive grammar chapters for both HSC and SSC levels. 
            Each chapter includes detailed rules, examples, and practice questions.
          </p>
        </div>

        {/* HSC Chapters */}
        {(level === 'both' || level === 'hsc') && (
        <div className={level === 'both' ? 'mb-16' : ''}>
          <div className="flex items-center space-x-3 mb-8">
            <div className="p-2 bg-sf-button/20 rounded-lg">
              <GraduationCap className="h-6 w-6 text-sf-button" />
            </div>
            <h2 className="text-2xl font-bold text-sf-text-bold">HSC Chapters</h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {hscChapters.map((chapter) => (
              <ChapterCard key={chapter.id} chapter={chapter} level="hsc" />
            ))}
          </div>
        </div>
        )}

        {/* SSC Chapters */}
        {(level === 'both' || level === 'ssc') && (
        <div>
          <div className="flex items-center space-x-3 mb-8">
            <div className="p-2 bg-sf-button/20 rounded-lg">
              <GraduationCap className="h-6 w-6 text-sf-button" />
            </div>
            <h2 className="text-2xl font-bold text-sf-text-bold">SSC Chapters</h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {sscChapters.map((chapter) => (
              <ChapterCard key={chapter.id} chapter={chapter} level="ssc" />
            ))}
          </div>
        </div>
        )}

        {/* Call to Action */}
        <div className="mt-16 text-center bg-sf-highlight/10 rounded-xl p-8">
          <h2 className="text-2xl font-bold text-sf-text-bold mb-4">
            Ready to Start Learning?
          </h2>
          <p className="text-sf-text-subtle mb-6">
            Choose your level and begin mastering English grammar with our comprehensive resources.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/board-questions/hsc"
              className="inline-flex items-center bg-sf-button hover:bg-sf-button/90 text-sf-bg px-6 py-3 rounded-lg font-semibold transition-all duration-200"
            >
              HSC Questions
            </Link>
            <Link
              href="/board-questions/ssc"
              className="inline-flex items-center bg-sf-button hover:bg-sf-button/90 text-sf-bg px-6 py-3 rounded-lg font-semibold transition-all duration-200"
            >
              SSC Questions
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}