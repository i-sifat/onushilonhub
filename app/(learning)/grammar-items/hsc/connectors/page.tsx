import BackButton from '@/components/common/BackButton';
import { ConnectorsGrammarRules } from '@/components/grammar';
import { BookOpen } from 'lucide-react';

export default function HSCConnectorsGrammarPage() {
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
              <BookOpen className="h-12 w-12 text-sf-button" />
            </div>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-sf-text-bold mb-6">
            HSC <span className="text-sf-button">Connectors</span> Rules
          </h1>
          <p className="text-xl text-sf-text-subtle max-w-3xl mx-auto">
            Master the art of connecting ideas with appropriate linking words and phrases. 
            Learn the patterns and techniques used in HSC board examinations.
          </p>
        </div>

        {/* Grammar Rules Component */}
        <ConnectorsGrammarRules />
      </div>
    </div>
  );
}