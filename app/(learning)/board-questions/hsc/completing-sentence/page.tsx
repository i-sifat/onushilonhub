import BackButton from '@/components/common/BackButton';
import SafeAreaWrapper from '@/components/common/SafeAreaWrapper';
import UniversalQuestionsUI from '@/components/universal/UniversalQuestionsUI';
import { completingSentenceQuestions } from '@/data/questions/completing-sentence';

export default function HSCCompletingSentencePage() {
  return (
    <div className="min-h-screen bg-sf-bg pt-20">
      {/* Back Button - Fixed top-left position */}
      <BackButton />
      
      <SafeAreaWrapper>
        {/* Universal Questions UI */}
        <UniversalQuestionsUI
          topic="Completing Sentence"
          topicSlug="completing-sentence"
          questions={completingSentenceQuestions}
          level="HSC"
          showPagination={true}
          itemsPerPage={15}
        />
      </SafeAreaWrapper>
    </div>
  );
}