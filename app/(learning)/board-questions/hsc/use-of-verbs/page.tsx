import BackButton from '@/components/common/BackButton';
import SafeAreaWrapper from '@/components/common/SafeAreaWrapper';
import UniversalQuestionsUI from '@/components/universal/UniversalQuestionsUI';
import { useOfVerbsQuestions } from '@/data/questions/use-of-verbs';

export default function HSCUseOfVerbsPage() {
  return (
    <div className="min-h-screen bg-sf-bg pt-20">
      {/* Back Button - Fixed top-left position */}
      <BackButton />
      
      <SafeAreaWrapper>
        {/* Universal Questions UI */}
        <UniversalQuestionsUI
          topic="Use of Verbs"
          topicSlug="use-of-verbs"
          questions={useOfVerbsQuestions}
          level="HSC"
          showPagination={true}
          itemsPerPage={15}
        />
      </SafeAreaWrapper>
    </div>
  );
}