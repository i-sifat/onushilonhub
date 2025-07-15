import Link from 'next/link';
import { FileText, ArrowRight, GraduationCap } from 'lucide-react';

export default function BoardQuestionsPage() {
  const levels = [
    {
      id: 'hsc',
      name: 'HSC (Higher Secondary Certificate)',
      description: 'Access comprehensive HSC board questions from all major boards across Bangladesh. Filter by year, board, and grammar topic.',
      features: [
        'Questions from 2016-2025',
        'All major boards included',
        'Advanced filtering options',
        'Topic-wise organization'
      ],
      stats: {
        questions: '3000+',
        boards: '8',
        years: '10'
      }
    },
    {
      id: 'ssc',
      name: 'SSC (Secondary School Certificate)',
      description: 'Comprehensive SSC board questions collection with smart filtering and search capabilities for effective preparation.',
      features: [
        'Complete question database',
        'Board-wise categorization',
        'Year-wise filtering',
        'Grammar topic sorting'
      ],
      stats: {
        questions: '2000+',
        boards: '8',
        years: '10'
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
              <FileText className="h-12 w-12 text-sf-button" />
            </div>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-sf-text-bold mb-6">
            Board <span className="text-sf-button">Questions</span>
          </h1>
          <p className="text-xl text-sf-text-subtle max-w-3xl mx-auto">
            Access thousands of board questions from HSC and SSC examinations. 
            Practice with real questions from all major education boards in Bangladesh.
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
                    {level.stats.questions}
                  </div>
                  <div className="text-sm text-sf-text-muted">Questions</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-sf-button">
                    {level.stats.boards}
                  </div>
                  <div className="text-sm text-sf-text-muted">Boards</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-sf-button">
                    {level.stats.years}
                  </div>
                  <div className="text-sm text-sf-text-muted">Years</div>
                </div>
              </div>

              {/* Features */}
              <div className="mb-6">
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
              <Link
                href={`/board-questions/${level.id}`}
                className="inline-flex items-center justify-center w-full bg-sf-button hover:bg-sf-button/90 text-sf-bg px-6 py-3 rounded-lg font-semibold transition-all duration-200 hover:shadow-lg group"
              >
                <span>Explore {level.id.toUpperCase()} Questions</span>
                <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          ))}
        </div>

        {/* How to Use */}
        <div className="bg-sf-bg border border-sf-text-muted/20 rounded-xl p-8">
          <h2 className="text-2xl font-bold text-sf-text-bold mb-6 text-center">
            How to Use Board Questions
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
              <h3 className="font-semibold text-sf-text-bold mb-2">Apply Filters</h3>
              <p className="text-sf-text-subtle text-sm">
                Filter by grammar topic, board, year, or search for specific content
              </p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-sf-button/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-sf-button font-bold text-lg">3</span>
              </div>
              <h3 className="font-semibold text-sf-text-bold mb-2">Practice</h3>
              <p className="text-sf-text-subtle text-sm">
                Study the questions and answers to improve your grammar skills
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}