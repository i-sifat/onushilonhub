import BackButton from '@/components/common/BackButton';
import UniversalGrammarUI from '@/components/universal/UniversalGrammarUI';
import { transformationRules } from '@/data/grammar-rules/transformation';

export default function HSCTransformationGrammarPage() {
  return (
    <div className="min-h-screen bg-sf-bg pt-20">
      <div className="max-w-full mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Back Button */}
        <div className="mb-6">
          <BackButton />
        </div>

        {/* Universal Grammar UI */}
        <UniversalGrammarUI
          topic="Transformation"
          topicSlug="transformation"
          rules={transformationRules}
          level="HSC"
          showSearch={true}
          showFilters={true}
        />
      </div>
    </div>
  );
}