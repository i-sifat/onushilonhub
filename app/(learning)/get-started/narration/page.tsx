import BackButton from '@/components/common/BackButton';
import SafeAreaWrapper from '@/components/common/SafeAreaWrapper';
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
      {/* Back Button - Fixed top-left position */}
      <BackButton />
      
      <SafeAreaWrapper>
        {/* Universal Combined UI */}
        <UniversalCombinedUI
          topic="Narration"
          topicSlug="narration"
          rules={narrationRules}
          questions={narrationQuestions}
          level="HSC"
        />
      </SafeAreaWrapper>
    </div>
  );
}