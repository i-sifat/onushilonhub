import BackButton from '@/components/common/BackButton';
import SafeAreaWrapper from '@/components/common/SafeAreaWrapper';
import UniversalCombinedUI from '@/components/universal/UniversalCombinedUI';
import { rightFormVerbRules } from '@/data/grammar-rules/right-form-verb';
import { useOfVerbsQuestions } from '@/data/questions/use-of-verbs';

export const metadata = {
  title: 'HSC Use of Verbs - Grammar Rules & Board Questions | OnushilonHub',
  description: 'Master HSC use of verbs with comprehensive grammar rules and practice questions. Study rules and practice with real board questions side by side.',
};

export default function UseOfVerbsGetStartedPage() {
  return (
    <div className="min-h-screen bg-sf-bg pt-20">
      {/* Back Button - Fixed top-left position */}
      <BackButton />
      
      <SafeAreaWrapper>
        {/* Universal Combined UI */}
        <UniversalCombinedUI
          topic="Use of Verbs"
          topicSlug="use-of-verbs"
          rules={rightFormVerbRules}
          questions={useOfVerbsQuestions}
          level="HSC"
        />
      </SafeAreaWrapper>
    </div>
  );
}