import BackButton from '@/components/common/BackButton';
import SafeAreaWrapper from '@/components/common/SafeAreaWrapper';
import UniversalGrammarUI from '@/components/universal/UniversalGrammarUI';
import { completingSentenceRules } from '@/data/grammar-rules/completing-sentence';

export default function HSCCompletingSentenceGrammarPage() {
  return (
    <div className="min-h-screen bg-sf-bg pt-20">
      {/* Back Button - Fixed top-left position */}
      <BackButton />
      
      <SafeAreaWrapper>
        {/* Universal Grammar UI */}
        <UniversalGrammarUI
          topic="Completing Sentence"
          topicSlug="completing-sentence"
          rules={completingSentenceRules}
          level="HSC"
          showSearch={true}
          showFilters={true}
        />
      </SafeAreaWrapper>
    </div>
  );
}