import BackButton from '@/components/common/BackButton';
import SafeAreaWrapper from '@/components/common/SafeAreaWrapper';
import UniversalCombinedUI from '@/components/universal/UniversalCombinedUI';
import { completingSentenceRules } from '@/data/grammar-rules/completing-sentence';
import { completingSentenceQuestions } from '@/data/questions/completing-sentence';

export const metadata = {
  title: 'HSC Completing Sentence - Grammar Rules & Board Questions | OnushilonHub',
  description: 'Master HSC completing sentence with comprehensive grammar rules and practice questions. Study rules and practice with real board questions side by side.',
};

export default function CompletingSentenceGetStartedPage() {
  return (
    <div className="min-h-screen bg-sf-bg pt-20">
      {/* Back Button - Fixed top-left position */}
      <BackButton />
      
      <SafeAreaWrapper>
        {/* Universal Combined UI */}
        <UniversalCombinedUI
          topic="Completing Sentence"
          topicSlug="completing-sentence"
          rules={completingSentenceRules}
          questions={completingSentenceQuestions}
          level="HSC"
        />
      </SafeAreaWrapper>
    </div>
  );
}