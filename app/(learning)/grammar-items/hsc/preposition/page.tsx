import BackButton from '@/components/common/BackButton';
import SafeAreaWrapper from '@/components/common/SafeAreaWrapper';
import UniversalGrammarUI from '@/components/universal/UniversalGrammarUI';
import { prepositionRules } from '@/data/grammar-rules/preposition';

export default function HSCPrepositionGrammarPage() {
  return (
    <div className="min-h-screen bg-sf-bg pt-20">
      {/* Back Button - Fixed top-left position */}
      <BackButton />
      
      <SafeAreaWrapper>
        {/* Universal Grammar UI */}
        <UniversalGrammarUI
          topic="Preposition"
          topicSlug="preposition"
          rules={prepositionRules}
          level="HSC"
          showSearch={true}
          showFilters={true}
        />
      </SafeAreaWrapper>
    </div>
  );
}