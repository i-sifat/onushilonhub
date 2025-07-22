import BackButton from '@/components/common/BackButton';
import UniversalGrammarUI from '@/components/universal/UniversalGrammarUI';
import { synonymAntonymRules } from '@/data/grammar-rules/synonym-antonym';

export default function HSCSynonymAntonymGrammarPage() {
  return (
    <div className="min-h-screen bg-sf-bg pt-20">
      {/* Back Button - Fixed top-left position */}
      <BackButton />
      
      <div className="w-full">
        {/* Universal Grammar UI */}
        <UniversalGrammarUI
          topic="Synonym & Antonym"
          topicSlug="synonym-antonym"
          rules={synonymAntonymRules}
          level="HSC"
          showSearch={true}
          showFilters={true}
        />
      </div>
    </div>
  );
}