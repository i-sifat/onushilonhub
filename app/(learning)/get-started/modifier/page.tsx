import BackButton from '@/components/common/BackButton';
import UniversalCombinedUI from '@/components/universal/UniversalCombinedUI';
import { modifierRules } from '@/data/grammar-rules/modifier';
import { modifierQuestions } from '@/data/questions/modifier';

export const metadata = {
  title: 'HSC Modifier - Grammar Rules & Board Questions | OnushilonHub',
  description: 'Master HSC modifier with comprehensive grammar rules and practice questions. Study rules and practice with real board questions side by side.',
};

export default function ModifierGetStartedPage() {
  return (
    <div className="min-h-screen bg-sf-bg pt-20">
      <div className="w-full">
        {/* Back Button */}
        <div className="mb-6">
          <BackButton />
        </div>

        {/* Universal Combined UI */}
        <UniversalCombinedUI
          topic="Modifier"
          topicSlug="modifier"
          rules={modifierRules}
          questions={modifierQuestions}
          level="HSC"
        />
      </div>
    </div>
  );
}