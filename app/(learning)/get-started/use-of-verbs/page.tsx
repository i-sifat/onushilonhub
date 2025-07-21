import BackButton from '@/components/common/BackButton';
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
      <div className="max-w-full mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Back Button */}
        <div className="mb-6">
          <BackButton />
        </div>

        {/* Universal Combined UI */}
        <UniversalCombinedUI
          topic="Use of Verbs"
          topicSlug="use-of-verbs"
          rules={rightFormVerbRules}
          questions={useOfVerbsQuestions}
          level="HSC"
        />
      </div>
    </div>
  );
}