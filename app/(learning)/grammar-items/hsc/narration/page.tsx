import BackButton from '@/components/common/BackButton';
import UniversalGrammarUI from '@/components/universal/UniversalGrammarUI';
import { narrationRules } from '@/data/grammar-rules/narration';

export default function HSCNarrationGrammarPage() {
  return (
    <div className="min-h-screen bg-sf-bg pt-20">
      <div className="w-full">
        {/* Back Button */}
        <div className="mb-6">
          <BackButton />
        </div>

        {/* Universal Grammar UI */}
        <UniversalGrammarUI
          topic="Narration"
          topicSlug="narration"
          rules={narrationRules}
          level="HSC"
          showSearch={true}
          showFilters={true}
        />
      </div>
    </div>
  );
}