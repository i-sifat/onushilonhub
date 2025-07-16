import BackButton from '@/components/common/BackButton';
import HSCTopicsGrid from '@/components/grammar/HSCTopicsGrid';
import { BookOpen, GraduationCap } from 'lucide-react';

export default function HSCGrammarItemsPage() {
  return (
    <div className="min-h-screen bg-sf-bg pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Back Button */}
        <div className="mb-6">
          <BackButton />
        </div>
        
        {/* Header */}
        <div className="text-center mb-16">
          <div className="flex justify-center mb-6">
            <div className="p-4 bg-sf-button/20 rounded-full">
              <GraduationCap className="h-12 w-12 text-sf-button" />
            </div>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-sf-text-bold mb-6">
            HSC <span className="text-sf-button">Grammar Items</span>
          </h1>
          <p className="text-xl text-sf-text-subtle max-w-3xl mx-auto">
            Master HSC English grammar with comprehensive rules, detailed explanations, and practical examples. 
            Choose a topic to start learning grammar rules and structures.
          </p>
        </div>

        {/* Topics Grid */}
        <HSCTopicsGrid level="hsc" isGrammarItems={true} />

        {/* Info Section */}
        <div className="mt-16 bg-sf-highlight/10 rounded-xl p-8 border border-sf-button/20">
          <div className="flex items-start space-x-4">
            <BookOpen className="h-6 w-6 text-sf-button mt-1 flex-shrink-0" />
            <div>
              <h3 className="text-lg font-semibold text-sf-text-bold mb-2">
                About HSC Grammar Items
              </h3>
              <p className="text-sf-text-subtle mb-4">
                Learn comprehensive grammar rules with detailed explanations, structures, and examples. 
                Each topic contains rules organized systematically for effective learning.
              </p>
              <div className="grid md:grid-cols-3 gap-4 text-sm">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-sf-button rounded-full"></div>
                  <span className="text-sf-text-subtle">Detailed rule explanations</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-sf-button rounded-full"></div>
                  <span className="text-sf-text-subtle">Structure patterns</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-sf-button rounded-full"></div>
                  <span className="text-sf-text-subtle">Practical examples</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}