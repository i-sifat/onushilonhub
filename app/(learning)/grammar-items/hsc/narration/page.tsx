import BackButton from '@/components/common/BackButton';
import SafeAreaWrapper from '@/components/common/SafeAreaWrapper';
import UniversalGrammarUI from '@/components/universal/UniversalGrammarUI';
import { narrationRules } from '@/data/grammar-rules/narration';

export default function HSCNarrationGrammarPage() {
  return (
    <div className="min-h-screen bg-sf-bg pt-20">
      {/* Back Button - Fixed top-left position */}
      <BackButton />
      
      <SafeAreaWrapper>
        {/* Universal Grammar UI */}
        <UniversalGrammarUI
          topic="Narration"
          topicSlug="narration"
          rules={narrationRules}
          level="HSC"
          showSearch={true}
          showFilters={true}
        />
      </SafeAreaWrapper>
    </div>
  );
}