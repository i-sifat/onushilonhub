import BackButton from '@/components/common/BackButton';
import CompletingSentenceCombinedPage from '@/components/combined/CompletingSentenceCombinedPage';
import { BookOpen } from 'lucide-react';

export const metadata = {
  title: 'HSC Completing Sentence - Grammar Rules & Board Questions | OnushilonHub',
  description: 'Master HSC completing sentence with comprehensive grammar rules and practice questions. Study rules and practice with real board questions side by side.',
};

export default function CompletingSentenceGetStartedPage() {
  return (
    <div className="min-h-screen bg-sf-bg pt-20">
      <div className="max-w-full mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Back Button */}
        <div className="mb-6">
          <BackButton />
        </div>
        
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex justify-center mb-6">
            <div className="p-4 bg-sf-button/20 rounded-full">
              <BookOpen className="h-12 w-12 text-sf-button" />
            </div>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-sf-text-bold mb-6">
            <span className="text-sf-button">Completing Sentence</span> Learning Hub
          </h1>
          <p className="text-xl text-sf-text-subtle max-w-3xl mx-auto">
            Master the art of completing sentences with comprehensive rules and practice questions. 
            Study grammar rules on the left and practice with filterable board questions on the right.
          </p>
        </div>

        {/* Combined Content */}
        <CompletingSentenceCombinedPage />
      </div>
    </div>
  );
}