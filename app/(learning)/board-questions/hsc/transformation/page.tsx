import BackButton from '@/components/common/BackButton';
import UniversalQuestionsUI from '@/components/universal/UniversalQuestionsUI';
import { transformationQuestions } from '@/data/questions/transformation';

export default function HSCTransformationPage() {
  return (
    <div className="min-h-screen bg-sf-bg pt-20">
      {/* Back Button - Fixed top-left position */}
      <BackButton />
      
      <div className="w-full">
        {/* Universal Questions UI */}
        <UniversalQuestionsUI
          topic="Transformation"
          topicSlug="transformation"
          questions={transformationQuestions}
          level="HSC"
          showPagination={true}
          itemsPerPage={15}
        />
      </div>
    </div>
  );
}