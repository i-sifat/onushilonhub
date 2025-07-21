import BackButton from '@/components/common/BackButton';
import UniversalCombinedUI from '@/components/universal/UniversalCombinedUI';
import { narrationRules } from '@/data/grammar-rules/narration';
import { narrationQuestions } from '@/data/questions/narration';

export const metadata = {
  title: 'HSC Narration - Grammar Rules & Board Questions | OnushilonHub',
  description: 'Master HSC narration with comprehensive grammar rules and practice questions. Study rules and practice with real board questions side by side.',
};

export default function NarrationGetStartedPage() {
  return (
    <div className="min-h-screen bg-sf-bg pt-20">
      <div className="max-w-full mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Back Button */}
        <div className="mb-6">
          <BackButton />
        </div>

        {/* Universal Combined UI */}
        <UniversalCombinedUI
          topic="Narration"
          topicSlug="narration"
          rules={narrationRules}
          questions={narrationQuestions}
          level="HSC"
        />
      </div>
    </div>
  );
}