import Link from 'next/link';
import { BookOpen, ArrowRight, GraduationCap } from 'lucide-react';

export default function RulesPage() {
  const levels = [
    {
      id: 'hsc',
      name: 'HSC (Higher Secondary Certificate)',
      description: 'Comprehensive grammar rules for HSC level students. Master advanced grammar concepts with detailed explanations and examples.',
      topics: [
        'Tense', 'Voice', 'Narration', 'Modifiers', 'Articles', 
        'Prepositions', 'Conditionals', 'Clauses'
      ],
      stats: {
        topics: '15+',
        rules: '200+',
        examples: '500+'
      }
    },
    {
      id: 'ssc',
      name: 'SSC (Secondary School Certificate)',
      description: 'Essential grammar rules for SSC level students. Build strong foundations with clear explanations and practical examples.',
      topics: [
        'Completing Sentence', 'Right Form of Verbs', 'Articles', 
        'Prepositions', 'Transformation', 'Punctuation'
      ],
      stats: {
        topics: '12+',
        rules: '150+',
        examples: '300+'
      }
    }
  ];

  return (
    <div className="min-h-screen bg-sf-bg pt-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="flex justify-center mb-6">
            <div className="p-4 bg-sf-button/20 rounded-full">
              <BookOpen className="h-12 w-12 text-sf-button" />
            </div>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-sf-text-bold mb-6">
            Grammar <span className="text-sf-button">Rules</span>
          </h1>
          <p className="text-xl text-sf-text-subtle max-w-3xl mx-auto">
            Master English grammar with comprehensive rules, detailed explanations, 
            and practical examples for both HSC and SSC levels.
          </p>
        </div>

        {/* Level Cards */}
        <div className="grid lg:grid-cols-2 gap-8 mb-16">
          {levels.map((level) => (
            <div
              key={level.id}
              className="bg-sf-bg border border-sf-text-muted/20 rounded-xl p-8 hover:border-sf-button/50 transition-all duration-300 hover:shadow-lg hover:shadow-sf-button/10"
            >
              <div className="flex items-center space-x-3 mb-4">
                <div className="p-2 bg-sf-button/20 rounded-lg">
                  <GraduationCap className="h-6 w-6 text-sf-button" />
                </div>
                <h2 className="text-2xl font-bold text-sf-text-bold">
                  {level.name}
                </h2>
              </div>

              <p className="text-sf-text-subtle mb-6 leading-relaxed">
                {level.description}
              </p>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-4 mb-6">
                <div className="text-center">
                  <div className="text-2xl font-bold text-sf-button">
                    {level.stats.topics}
                  </div>
                  <div className="text-sm text-sf-text-muted">Topics</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-sf-button">
                    {level.stats.rules}
                  </div>
                  <div className="text-sm text-sf-text-muted">Rules</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-sf-button">
                    {level.stats.examples}
                  </div>
                  <div className="text-sm text-sf-text-muted">Examples</div>
                </div>
              </div>

              {/* Sample Topics */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-sf-text-bold mb-3">Sample Topics:</h3>
                <div className="flex flex-wrap gap-2">
                  {level.topics.slice(0, 6).map((topic, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-sf-button/20 text-sf-button rounded-full text-sm"
                    >
                      {topic}
                    </span>
                  ))}
                  {level.topics.length > 6 && (
                    <span className="px-3 py-1 bg-sf-text-muted/20 text-sf-text-muted rounded-full text-sm">
                      +{level.topics.length - 6} more
                    </span>
                  )}
                </div>
              </div>

              {/* Action Button */}
              <Link
                href={`/rules/${level.id}`}
                className="inline-flex items-center justify-center w-full bg-sf-button hover:bg-sf-button/90 text-sf-bg px-6 py-3 rounded-lg font-semibold transition-all duration-200 hover:shadow-lg group"
              >
                <span>Explore {level.id.toUpperCase()} Rules</span>
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          ))}
        </div>

        {/* How to Use */}
        <div className="bg-sf-bg border border-sf-text-muted/20 rounded-xl p-8">
          <h2 className="text-2xl font-bold text-sf-text-bold mb-6 text-center">
            How to Use Grammar Rules
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="w-12 h-12 bg-sf-button/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-sf-button font-bold text-lg">1</span>
              </div>
              <h3 className="font-semibold text-sf-text-bold mb-2">Choose Level</h3>
              <p className="text-sf-text-subtle text-sm">
                Select HSC or SSC based on your current academic level
              </p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-sf-button/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-sf-button font-bold text-lg">2</span>
              </div>
              <h3 className="font-semibold text-sf-text-bold mb-2">Select Topic</h3>
              <p className="text-sf-text-subtle text-sm">
                Browse through available grammar topics and select what you want to study
              </p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-sf-button/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-sf-button font-bold text-lg">3</span>
              </div>
              <h3 className="font-semibold text-sf-text-bold mb-2">Study & Practice</h3>
              <p className="text-sf-text-subtle text-sm">
                Read the rules, study examples, and practice with related board questions
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}