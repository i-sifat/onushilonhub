import BackButton from '@/components/common/BackButton';
import SafeAreaWrapper from '@/components/common/SafeAreaWrapper';
import UniversalQuestionsUI from '@/components/universal/UniversalQuestionsUI';
// import { modifierQuestions } from '@/data/questions/modifier';

export default function HSCModifierPage() {
  // Temporary empty array until modifier questions data is fixed
  const modifierQuestions: any[] = [];

  return (
    <div className="min-h-screen bg-sf-bg pt-20">
      {/* Back Button - Fixed top-left position */}
      <BackButton />
      
      <SafeAreaWrapper>
        {/* Universal Questions UI */}
        <UniversalQuestionsUI
          topic="Modifier"
          topicSlug="modifier"
          questions={modifierQuestions}
          level="HSC"
          showPagination={true}
          itemsPerPage={15}
        />
      </SafeAreaWrapper>
    </div>
  );
}