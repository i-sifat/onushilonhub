import BackButton from '@/components/common/BackButton';
import UniversalGrammarUI from '@/components/universal/UniversalGrammarUI';
import { punctuationRules } from '@/data/grammar-rules/punctuation';

export default function HSCPunctuationGrammarPage() {
  return (
    <div className="min-h-screen bg-sf-bg pt-20">
      {/* Back Button - Fixed top-left position */}
      <BackButton />
      
      <div className="w-full">
        {/* Universal Grammar UI */}
        <UniversalGrammarUI
          topic="Punctuation"
          topicSlug="punctuation"
          rules={punctuationRules}
          level="HSC"
          showSearch={true}
          showFilters={true}
        />
      </div>
    </div>
  );
}