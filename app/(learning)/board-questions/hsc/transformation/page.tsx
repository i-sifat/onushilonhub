import BackButton from '@/components/common/BackButton';
import SafeAreaWrapper from '@/components/common/SafeAreaWrapper';
import UniversalQuestionsUI from '@/components/universal/UniversalQuestionsUI';
import { transformationQuestions } from '@/data/questions/transformation';

export default function HSCTransformationPage() {
  return (
    <div className="min-h-screen bg-sf-bg pt-20">
      {/* Back Button - Fixed top-left position */}
      <BackButton />
      
      <SafeAreaWrapper>
        {/* Universal Questions UI */}
        <UniversalQuestionsUI
          topic="Transformation"
          topicSlug="transformation"
          questions={transformationQuestions}
          level="HSC"
          showPagination={true}
          itemsPerPage={15}
        />
      </SafeAreaWrapper>
    </div>
  );
}