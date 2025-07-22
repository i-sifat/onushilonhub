import BackButton from '@/components/common/BackButton';
import SafeAreaWrapper from '@/components/common/SafeAreaWrapper';
import UniversalGrammarUI from '@/components/universal/UniversalGrammarUI';
import { transformationRules } from '@/data/grammar-rules/transformation';

export default function HSCTransformationGrammarPage() {
  return (
    <div className="min-h-screen bg-sf-bg pt-20">
      {/* Back Button - Fixed top-left position */}
      <BackButton />
      
      <SafeAreaWrapper>
        {/* Universal Grammar UI */}
        <UniversalGrammarUI
          topic="Transformation"
          topicSlug="transformation"
          rules={transformationRules}
          level="HSC"
          showSearch={true}
          showFilters={true}
        />
      </SafeAreaWrapper>
    </div>
  );
}