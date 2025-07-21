import BackButton from '@/components/common/BackButton';
import UniversalQuestionsUI from '@/components/universal/UniversalQuestionsUI';
import { modifierQuestions } from '@/data/questions/modifier';

export default function HSCModifierPage() {
  return (
    <div className="min-h-screen bg-sf-bg pt-20">
      <div className="max-w-full mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Back Button */}
        <div className="mb-6">
          <BackButton />
        </div>

        {/* Universal Questions UI */}
        <UniversalQuestionsUI
          topic="Modifier"
          topicSlug="modifier"
          questions={modifierQuestions}
          level="HSC"
          showPagination={true}
          itemsPerPage={15}
        />
      </div>
    </div>
  );
}