import BackButton from '@/components/common/BackButton';
import UniversalGrammarUI from '@/components/universal/UniversalGrammarUI';
import { connectorsRules } from '@/data/grammar-rules/connectors';

export default function HSCConnectorsGrammarPage() {
  return (
    <div className="min-h-screen bg-sf-bg pt-20">
      {/* Back Button - Fixed top-left position */}
      <BackButton />
      
      <div className="w-full">
        {/* Universal Grammar UI */}
        <UniversalGrammarUI
          topic="Connectors"
          topicSlug="connectors"
          rules={connectorsRules}
          level="HSC"
          showSearch={true}
          showFilters={true}
        />
      </div>
    </div>
  );
}