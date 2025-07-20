import BackButton from '@/components/common/BackButton';
import Link from 'next/link';
import { BookOpen, ArrowRight, GraduationCap } from 'lucide-react';

export default function GrammarItemsPage() {
  const levels = [
    {
      id: 'hsc',
      name: 'HSC (Higher Secondary Certificate)',
      description: 'Comprehensive HSC grammar items with detailed rules, examples, and explanations for advanced English grammar concepts.',
      features: [
        'Advanced grammar concepts',
        'Detailed rule explanations',
        'Comprehensive examples',
        'Topic-wise organization'
      ],
      stats: {
        topics: '12+',
        rules: '200+',
        examples: '500+'
      }
    },
    {
      id: 'ssc',
      name: 'SSC (Secondary School Certificate)',
      description: 'Essential SSC grammar items covering fundamental English grammar rules with clear explanations and practical examples.',
      features: [
        'Fundamental grammar rules',
        'Clear explanations',
        'Practical examples',
        'Easy-to-understand format'
      ],
      stats: {
        topics: '8+',
        rules: '150+',
        examples: '300+'
      }
    }
  ];

  return (
    <div className="min-h-screen bg-sf-bg pt-20">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Back Button */}
        <div className="mb-6">
          <BackButton />
        </div>
        
        {/* Header */}
        <div className="text-center mb-16">
          <div className="flex justify-center mb-6">
            <div className="p-4 bg-sf-button/20 rounded-full">
              <BookOpen className="h-12 w-12 text-sf-button" />
            </div>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-sf-text-bold mb-6">
            Grammar <span className="text-sf-button">Items</span>
          </h1>
          <p className="text-xl text-sf-text-subtle max-w-3xl mx-auto">
            Master English grammar with comprehensive items, detailed explanations, 
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
              <div className="mb-6">
                <div className="grid grid-cols-3 gap-4">
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
              </div>

              {/* Features */}
              <div className="mb-8">
                <h3 className="text-lg font-semibold text-sf-text-bold mb-3">Features:</h3>
                <ul className="space-y-2">
                  {level.features.map((feature, index) => (
                    <li key={index} className="flex items-center space-x-2 text-sf-text-subtle">
                      <div className="w-2 h-2 bg-sf-button rounded-full"></div>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Action Button */}
              {level.id === 'hsc' ? (
                <Link
                  href={`/grammar-items/${level.id}`}
                  className="inline-flex items-center justify-center w-full bg-sf-button hover:bg-sf-button/90 text-sf-bg px-6 py-3 rounded-lg font-semibold transition-all duration-200 hover:shadow-lg group"
                >
                  <span>Explore {level.id.toUpperCase()} Grammar Items</span>
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Link>
              ) : (
                <div className="inline-flex items-center justify-center w-full bg-sf-text-muted/20 text-sf-text-muted px-6 py-3 rounded-lg font-semibold cursor-not-allowed">
                  <span>Coming Soon</span>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* How to Use */}
        <div className="bg-sf-bg border border-sf-text-muted/20 rounded-xl p-8">
          <h2 className="text-2xl font-bold text-sf-text-bold mb-6 text-center">
            How to Use Grammar Items
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
                Browse through grammar topics and select the one you want to study
              </p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-sf-button/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-sf-button font-bold text-lg">3</span>
              </div>
              <h3 className="font-semibold text-sf-text-bold mb-2">Study & Practice</h3>
              <p className="text-sf-text-subtle text-sm">
                Learn the rules, study examples, and practice with board questions
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}