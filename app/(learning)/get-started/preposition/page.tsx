import BackButton from '@/components/common/BackButton';
import UniversalCombinedUI from '@/components/universal/UniversalCombinedUI';
import { prepositionRules } from '@/data/grammar-rules/preposition';
import { prepositionQuestions } from '@/data/questions/preposition';

export const metadata = {
  title: 'HSC Preposition - Grammar Rules & Board Questions | OnushilonHub',
  description: 'Master HSC preposition with comprehensive grammar rules and practice questions. Study rules and practice with real board questions side by side.',
};

export default function PrepositionGetStartedPage() {
  return (
    <div className="min-h-screen bg-sf-bg pt-20">
      {/* Back Button - Fixed top-left position */}
      <BackButton />
      
      <div className="w-full">
        {/* Universal Combined UI */}
        <UniversalCombinedUI
          topic="Preposition"
          topicSlug="preposition"
          rules={prepositionRules}
          questions={prepositionQuestions}
          level="HSC"
        />
      </div>
    </div>
  );
}