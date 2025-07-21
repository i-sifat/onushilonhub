import BackButton from '@/components/common/BackButton';
import UniversalQuestionsUI from '@/components/universal/UniversalQuestionsUI';
import { connectorsQuestions } from '@/data/questions/connectors';

export default function HSCConnectorsPage() {
  return (
    <div className="min-h-screen bg-sf-bg pt-20">
      <div className="w-full">
        {/* Back Button */}
        <div className="mb-6">
          <BackButton />
        </div>

        {/* Universal Questions UI */}
        <UniversalQuestionsUI
          topic="Connectors"
          topicSlug="connectors"
          questions={connectorsQuestions}
          level="HSC"
          showPagination={true}
          itemsPerPage={15}
        />
      </div>
    </div>
  );
}