import BackButton from '@/components/common/BackButton';
import SafeAreaWrapper from '@/components/common/SafeAreaWrapper';
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
      {/* Back Button - Fixed top-left position */}
      <BackButton />
      
      <SafeAreaWrapper>
        {/* Universal Combined UI */}
        <UniversalCombinedUI
          topic="Transformation"
          topicSlug="transformation"
          rules={transformationRules}
          questions={transformationQuestions}
          level="HSC"
        />
      </SafeAreaWrapper>
    </div>
  );
}