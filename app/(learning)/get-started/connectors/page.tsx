import BackButton from '@/components/common/BackButton';
import UniversalCombinedUI from '@/components/universal/UniversalCombinedUI';
import { connectorsRules } from '@/data/grammar-rules/connectors';
import { connectorsQuestions } from '@/data/questions/connectors';

export const metadata = {
  title: 'HSC Connectors - Grammar Rules & Board Questions | OnushilonHub',
  description: 'Master HSC connectors with comprehensive grammar rules and practice questions. Study rules and practice with real board questions side by side.',
};

export default function ConnectorsGetStartedPage() {
  return (
    <div className="min-h-screen bg-sf-bg pt-20">
      {/* Back Button - Fixed top-left position */}
      <BackButton />
      
      <div className="w-full">
        {/* Universal Combined UI */}
        <UniversalCombinedUI
          topic="Connectors"
          topicSlug="connectors"
          rules={connectorsRules}
          questions={connectorsQuestions}
          level="HSC"
        />
      </div>
    </div>
  );
}