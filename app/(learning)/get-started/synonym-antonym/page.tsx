import BackButton from '@/components/common/BackButton';
import UniversalCombinedUI from '@/components/universal/UniversalCombinedUI';
import { synonymAntonymRules } from '@/data/grammar-rules/synonym-antonym';
import { synonymAntonymQuestions } from '@/data/questions/synonym-antonym';

export const metadata = {
  title: 'HSC Synonym and Antonym - Grammar Rules & Board Questions | OnushilonHub',
  description: 'Master HSC synonym and antonym with comprehensive word lists and practice questions. Study rules and practice with real board questions side by side.',
};

export default function SynonymAntonymGetStartedPage() {
  return (
    <div className="min-h-screen bg-sf-bg pt-20">
      {/* Back Button - Fixed top-left position */}
      <BackButton />
      
      <div className="w-full">
        {/* Universal Combined UI */}
        <UniversalCombinedUI
          topic="Synonym & Antonym"
          topicSlug="synonym-antonym"
          rules={synonymAntonymRules}
          questions={synonymAntonymQuestions}
          level="HSC"
        />
      </div>
    </div>
  );
}