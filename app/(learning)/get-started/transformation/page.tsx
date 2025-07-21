import BackButton from '@/components/common/BackButton';
import UniversalCombinedUI from '@/components/universal/UniversalCombinedUI';
import { transformationRules } from '@/data/grammar-rules/transformation';
import { transformationQuestions } from '@/data/questions/transformation';

export const metadata = {
  title: 'HSC Transformation - Grammar Rules & Board Questions | OnushilonHub',
  description: 'Master HSC transformation of sentences with comprehensive grammar rules and practice questions. Study rules and practice with real board questions side by side.',
};

export default function TransformationGetStartedPage() {
  return (
    <div className="min-h-screen bg-sf-bg pt-20">
      <div className="max-w-full mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Back Button */}
        <div className="mb-6">
          <BackButton />
        </div>

        {/* Universal Combined UI */}
        <UniversalCombinedUI
          topic="Transformation"
          topicSlug="transformation"
          rules={transformationRules}
          questions={transformationQuestions}
          level="HSC"
        />
      </div>
    </div>
  );
}