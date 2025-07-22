import BackButton from '@/components/common/BackButton';
import UniversalCombinedUI from '@/components/universal/UniversalCombinedUI';
import { punctuationRules } from '@/data/grammar-rules/punctuation';
import { punctuationQuestions } from '@/data/questions/punctuation';

export const metadata = {
  title: 'HSC Punctuation - Grammar Rules & Board Questions | OnushilonHub',
  description: 'Master HSC punctuation with comprehensive grammar rules and practice questions. Study rules and practice with real board questions side by side.',
};

export default function PunctuationGetStartedPage() {
  return (
    <div className="min-h-screen bg-sf-bg pt-20">
      {/* Back Button - Fixed top-left position */}
      <BackButton />
      
      <div className="w-full">
        {/* Universal Combined UI */}
        <UniversalCombinedUI
          topic="Punctuation"
          topicSlug="punctuation"
          rules={punctuationRules}
          questions={punctuationQuestions}
          level="HSC"
        />
      </div>
    </div>
  );
}